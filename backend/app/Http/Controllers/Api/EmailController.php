<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\EmailLog;
use App\Services\EmailService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EmailController extends Controller
{
    /**
     * Get email configuration, templates, and delivery statistics
     */
    public function getSettings()
    {
        $smtp = EmailService::getSmtpSettings();
        $templates = EmailService::getEmailTemplates();
        
        $totalSent = EmailLog::where('status', 'sent')->count();
        $totalFailed = EmailLog::where('status', 'failed')->count();
        $totalLogged = $totalSent + $totalFailed;
        $deliveryRate = $totalLogged > 0 ? round(($totalSent / $totalLogged) * 100, 1) : 100.0;

        return response()->json([
            'status' => 'success',
            'data' => [
                'smtp' => $smtp,
                'templates' => array_values($templates),
                'metrics' => [
                    'total_sent' => $totalSent,
                    'total_failed' => $totalFailed,
                    'delivery_rate' => $deliveryRate . '%'
                ]
            ]
        ]);
    }

    /**
     * Save SMTP server settings
     */
    public function saveSettings(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'mail_driver' => 'nullable|string',
            'smtp_host' => 'required|string',
            'smtp_port' => 'required|numeric',
            'smtp_encryption' => 'nullable|string',
            'from_address' => 'required|email',
            'from_name' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()->first()
            ], 422);
        }

        $saved = EmailService::saveSmtpSettings($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'SMTP Server settings saved successfully! 🚀',
            'data' => $saved
        ]);
    }

    /**
     * Save customized email templates
     */
    public function saveTemplates(Request $request)
    {
        $templates = $request->input('templates', []);
        if (!is_array($templates)) {
            return response()->json(['status' => 'error', 'message' => 'Invalid templates data'], 422);
        }

        // Convert array to keyed dictionary if needed
        $keyed = [];
        foreach ($templates as $key => $tpl) {
            $id = $tpl['id'] ?? $key;
            $keyed[$id] = $tpl;
        }

        $saved = EmailService::saveEmailTemplates($keyed);

        return response()->json([
            'status' => 'success',
            'message' => 'Email notification templates updated successfully! ✨',
            'data' => array_values($saved)
        ]);
    }

    /**
     * Test live SMTP connection
     */
    public function testEmail(Request $request)
    {
        $testEmail = $request->input('test_email') ?: $request->input('recipient_email');

        if (!$testEmail || !filter_var($testEmail, FILTER_VALIDATE_EMAIL)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Please provide a valid recipient email to test.'
            ], 422);
        }

        $override = $request->input('settings', null);
        $result = EmailService::testSmtp($testEmail, $override);

        return response()->json($result, $result['status'] === 'success' ? 200 : 400);
    }

    /**
     * Fetch searchable email audit logs
     */
    public function getLogs(Request $request)
    {
        $query = EmailLog::latest();

        if ($request->filled('event_type') && $request->event_type !== 'all') {
            $query->where('event_type', $request->event_type);
        }

        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $s = $request->search;
            $query->where(function($q) use ($s) {
                $q->where('recipient_email', 'like', "%{$s}%")
                  ->orWhere('recipient_name', 'like', "%{$s}%")
                  ->orWhere('subject', 'like', "%{$s}%");
            });
        }

        $logs = $query->limit(100)->get();

        return response()->json([
            'status' => 'success',
            'data' => $logs
        ]);
    }

    /**
     * Resend an email from logs
     */
    public function resend($id)
    {
        $log = EmailLog::find($id);
        if (!$log) {
            return response()->json(['status' => 'error', 'message' => 'Log record not found'], 404);
        }

        // Re-dispatch using template
        $res = EmailService::sendTemplateEmail(
            $log->event_type,
            $log->recipient_email,
            $log->recipient_name,
            [
                'subject' => $log->subject,
                'student_name' => $log->recipient_name ?: 'Student',
                'student_email' => $log->recipient_email
            ]
        );

        return response()->json([
            'status' => 'success',
            'message' => "Email re-dispatched to {$log->recipient_email}!",
            'result' => $res
        ]);
    }
}
