<?php

namespace App\Services;

use App\Models\EmailLog;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Symfony\Component\Mailer\Transport\Dsn;
use Symfony\Component\Mailer\Transport\Smtp\EsmtpTransport;

class EmailService
{
    /**
     * Get stored SMTP settings with sensible defaults
     */
    public static function getSmtpSettings(): array
    {
        $path = storage_path('app/smtp_settings.json');
        $default = [
            'mail_driver' => 'smtp',
            'smtp_host' => env('MAIL_HOST', 'smtp.gmail.com'),
            'smtp_port' => env('MAIL_PORT', 587),
            'smtp_encryption' => env('MAIL_ENCRYPTION', 'tls'),
            'smtp_username' => env('MAIL_USERNAME', ''),
            'smtp_password' => env('MAIL_PASSWORD', ''),
            'from_address' => env('MAIL_FROM_ADDRESS', 'notifications@certificationplanner.com'),
            'from_name' => env('MAIL_FROM_NAME', 'Certification Planner'),
            'admin_notification_email' => 'admin@certificationplanner.com',
            'sales_notification_email' => 'sales@certificationplanner.com',
            'support_notification_email' => 'support@certificationplanner.com',
            'leads_notification_email' => 'leads@certificationplanner.com',
            'preset' => 'custom',
            'is_active' => true
        ];

        if (file_exists($path)) {
            $data = json_decode(file_get_contents($path), true);
            if (is_array($data)) {
                return array_merge($default, $data);
            }
        }

        return $default;
    }

    /**
     * Save updated SMTP settings
     */
    public static function saveSmtpSettings(array $data): array
    {
        $existing = self::getSmtpSettings();
        $merged = array_merge($existing, $data);
        $path = storage_path('app/smtp_settings.json');

        if (!file_exists(dirname($path))) {
            mkdir(dirname($path), 0755, true);
        }

        file_put_contents($path, json_encode($merged, JSON_PRETTY_PRINT));
        return $merged;
    }

    /**
     * Get all 5 email templates
     */
    public static function getEmailTemplates(): array
    {
        $path = storage_path('app/email_templates.json');
        $defaultTemplates = [
            'student_registration' => [
                'id' => 'student_registration',
                'name' => 'Student Registration & Portal Access',
                'description' => 'Sent automatically when a new student creates an account or completes their first enrollment.',
                'enabled' => true,
                'send_admin_copy' => true,
                'subject' => 'Welcome to Certification Planner - Your Student Portal Access',
                'body' => "<p>Hello <strong>{student_name}</strong>,</p>\n<p>Welcome to <strong>Certification Planner</strong>! Your student portal account has been activated.</p>\n<p>You can now log in to track your course enrollments, access live virtual class schedules, download exam prep materials, and submit support inquiries directly.</p>\n<div style=\"background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px;margin:16px 0;\">\n  <p style=\"margin:0 0 8px 0;font-size:13px;\"><strong>Login Email:</strong> {student_email}</p>\n  <p style=\"margin:0;font-size:13px;\"><strong>Student Portal URL:</strong> <a href=\"{login_url}\" style=\"color:#0284c7;font-weight:bold;\">{login_url}</a></p>\n</div>\n<p>If you have any questions or need help navigating your portal, our student support advisors are here to assist you 24/7.</p>",
                'cta_text' => 'Access Student Portal',
                'cta_url' => '{login_url}',
                'placeholders' => ['{student_name}', '{student_email}', '{login_url}', '{portal_url}']
            ],
            'ticket_created' => [
                'id' => 'ticket_created',
                'name' => 'Support Ticket Confirmation',
                'description' => 'Sent when a student or website visitor submits a new support request.',
                'enabled' => true,
                'send_admin_copy' => true,
                'subject' => 'Support Ticket #{ticket_number} Received - Certification Planner',
                'body' => "<p>Dear <strong>{student_name}</strong>,</p>\n<p>Thank you for contacting Certification Planner Support. We have received your query regarding <strong>{related_to}</strong>.</p>\n<p>Your unique tracking ticket ID is <span style=\"background:#e0f2fe;color:#0369a1;padding:3px 8px;border-radius:6px;font-weight:bold;\">#{ticket_number}</span>.</p>\n<div style=\"background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px;margin:16px 0;\">\n  <p style=\"margin:0 0 8px 0;font-size:13px;\"><strong>Subject:</strong> {subject}</p>\n  <p style=\"margin:0;font-size:13px;\"><strong>Description:</strong> {description}</p>\n</div>\n<p>Our dedicated support team is currently reviewing your inquiry and will respond shortly. You can track this ticket and chat with our team in your student portal.</p>",
                'cta_text' => 'Track Support Ticket',
                'cta_url' => '{portal_url}',
                'placeholders' => ['{student_name}', '{student_email}', '{ticket_number}', '{subject}', '{description}', '{related_to}', '{portal_url}']
            ],
            'order_invoice' => [
                'id' => 'order_invoice',
                'name' => 'Enrollment & Payment Tax Invoice Receipt',
                'description' => 'Sent immediately after checkout or manual admin enrollment with itemized tax invoice receipt.',
                'enabled' => true,
                'send_admin_copy' => true,
                'subject' => 'Order Confirmed #{order_number}: Tax Invoice & Training Access',
                'body' => "<p>Dear <strong>{student_name}</strong>,</p>\n<p>Thank you for your enrollment with <strong>Certification Planner</strong>. Your payment of <strong>\${order_amount}</strong> has been successfully processed.</p>\n<div style=\"background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px;margin:16px 0;\">\n  <table style=\"width:100%;font-size:13px;border-collapse:collapse;\">\n    <tr style=\"border-bottom:1px solid #e2e8f0;\"><td style=\"padding:6px 0;color:#64748b;\">Order Number:</td><td style=\"padding:6px 0;font-weight:bold;text-align:right;\">{order_number}</td></tr>\n    <tr style=\"border-bottom:1px solid #e2e8f0;\"><td style=\"padding:6px 0;color:#64748b;\">Enrolled Course:</td><td style=\"padding:6px 0;font-weight:bold;text-align:right;\">{course_title}</td></tr>\n    <tr style=\"border-bottom:1px solid #e2e8f0;\"><td style=\"padding:6px 0;color:#64748b;\">Training Format:</td><td style=\"padding:6px 0;font-weight:bold;text-align:right;\">{training_format}</td></tr>\n    <tr style=\"border-bottom:1px solid #e2e8f0;\"><td style=\"padding:6px 0;color:#64748b;\">Scheduled Dates:</td><td style=\"padding:6px 0;font-weight:bold;text-align:right;\">{date_range}</td></tr>\n    <tr><td style=\"padding:10px 0 0 0;font-weight:bold;color:#0f172a;font-size:14px;\">Total Paid:</td><td style=\"padding:10px 0 0 0;font-weight:bold;color:#0284c7;font-size:16px;text-align:right;\">\${order_amount}</td></tr>\n  </table>\n</div>\n<p>You can download and print your official itemized tax invoice receipt at any time using the link below.</p>",
                'cta_text' => 'View Printable Tax Invoice',
                'cta_url' => '{invoice_url}',
                'placeholders' => ['{student_name}', '{student_email}', '{order_number}', '{order_amount}', '{course_title}', '{training_format}', '{date_range}', '{invoice_url}', '{portal_url}']
            ],
            'website_inquiry' => [
                'id' => 'website_inquiry',
                'name' => 'Brochure & Course Inquiry Acknowledgment',
                'description' => 'Sent when a visitor submits a lead form or requests a course brochure.',
                'enabled' => true,
                'send_admin_copy' => true,
                'subject' => 'Course Syllabus & Information - Certification Planner',
                'body' => "<p>Hello <strong>{student_name}</strong>,</p>\n<p>Thank you for your interest in <strong>{course_title}</strong> with Certification Planner.</p>\n<p>We have logged your request. A senior education advisor is preparing your customized syllabus, batch schedules, and promotional pricing.</p>\n<div style=\"background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px;margin:16px 0;\">\n  <p style=\"margin:0 0 6px 0;font-size:13px;\"><strong>Requested Course:</strong> {course_title}</p>\n  <p style=\"margin:0;font-size:13px;\"><strong>Phone Contact:</strong> {phone}</p>\n</div>\n<p>Need urgent guidance? Feel free to reply directly to this email or speak with an advisor at <strong>(888) 745-7575</strong>.</p>",
                'cta_text' => 'View Course Catalog',
                'cta_url' => '{catalog_url}',
                'placeholders' => ['{student_name}', '{student_email}', '{course_title}', '{phone}', '{catalog_url}']
            ],
            'consultation_booking' => [
                'id' => 'consultation_booking',
                'name' => '1-on-1 Consultation & Callback Booking',
                'description' => 'Sent when someone books an advisory consultation or callback slot.',
                'enabled' => true,
                'send_admin_copy' => true,
                'subject' => 'Confirmed: 1-on-1 Certification Consultation on {booking_date}',
                'body' => "<p>Dear <strong>{student_name}</strong>,</p>\n<p>Your 1-on-1 training advisory session has been successfully booked for <strong>{booking_date}</strong>.</p>\n<div style=\"background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px;margin:16px 0;\">\n  <p style=\"margin:0 0 8px 0;font-size:13px;\"><strong>Appointment Slot:</strong> {booking_date}</p>\n  <p style=\"margin:0 0 8px 0;font-size:13px;\"><strong>Discussion Topic:</strong> {consultation_topic}</p>\n  <p style=\"margin:0;font-size:13px;\"><strong>Contact Phone:</strong> {phone}</p>\n</div>\n<p>Our senior certification counselor will call you at your preferred time. If you wish to reschedule or have specific questions in advance, please reply to this email.</p>",
                'cta_text' => 'Open Student Portal',
                'cta_url' => '{portal_url}',
                'placeholders' => ['{student_name}', '{student_email}', '{booking_date}', '{consultation_topic}', '{phone}', '{portal_url}']
            ]
        ];

        if (file_exists($path)) {
            $data = json_decode(file_get_contents($path), true);
            if (is_array($data)) {
                return array_merge($defaultTemplates, $data);
            }
        }

        return $defaultTemplates;
    }

    /**
     * Save updated templates
     */
    public static function saveEmailTemplates(array $templates): array
    {
        $existing = self::getEmailTemplates();
        $merged = array_merge($existing, $templates);
        $path = storage_path('app/email_templates.json');

        if (!file_exists(dirname($path))) {
            mkdir(dirname($path), 0755, true);
        }

        file_put_contents($path, json_encode($merged, JSON_PRETTY_PRINT));
        return $merged;
    }

    /**
     * Replace template placeholders with real dynamic variables
     */
    public static function replacePlaceholders(string $text, array $data): string
    {
        foreach ($data as $key => $val) {
            $needle = '{' . $key . '}';
            $text = str_replace($needle, (string) $val, $text);
        }
        return $text;
    }

    /**
     * Master responsive HTML layout with Certification Planner corporate branding
     */
    public static function buildHtmlEmail(string $subject, string $bodyContent, ?string $ctaText = null, ?string $ctaUrl = null): string
    {
        $ctaHtml = '';
        if (!empty($ctaText) && !empty($ctaUrl)) {
            $ctaHtml = "
            <div style=\"text-align: center; margin: 30px 0 10px 0;\">
                <a href=\"{$ctaUrl}\" target=\"_blank\" style=\"background-color: #0284c7; color: #ffffff; text-decoration: none; padding: 12px 28px; font-size: 14px; font-weight: 700; border-radius: 10px; display: inline-block; box-shadow: 0 4px 6px -1px rgba(2,132,199,0.2);\">
                    {$ctaText} &rarr;
                </a>
            </div>";
        }

        return "<!DOCTYPE html>
<html lang=\"en\">
<head>
    <meta charset=\"UTF-8\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
    <title>{$subject}</title>
</head>
<body style=\"margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #1e293b;\">
    <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"background-color: #f1f5f9; padding: 30px 15px;\">
        <tr>
            <td align=\"center\">
                <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;\">
                    
                    <!-- Navy Header with Brand Branding -->
                    <tr>
                        <td style=\"background-color: #122c54; padding: 24px 30px; text-align: left;\">
                            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">
                                <tr>
                                    <td>
                                        <div style=\"display: inline-block; vertical-align: middle;\">
                                            <span style=\"font-size: 22px; font-weight: 900; color: #ffffff; letter-spacing: -0.5px;\">
                                                Certification<span style=\"color: #f97316;\">Planner</span>
                                            </span>
                                            <span style=\"display: block; font-size: 10px; color: #93c5fd; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-top: 2px;\">
                                                Authorized Training Partner
                                            </span>
                                        </div>
                                    </td>
                                    <td align=\"right\" style=\"color: #93c5fd; font-size: 11px; font-weight: 600;\">
                                        📞 (888) 745-7575
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Email Headline Ribbon -->
                    <tr>
                        <td style=\"background: linear-gradient(90deg, #0284c7 0%, #0369a1 100%); height: 4px;\"></td>
                    </tr>

                    <!-- Main Body Content -->
                    <tr>
                        <td style=\"padding: 35px 30px 25px 30px; font-size: 14px; line-height: 1.6; color: #334155;\">
                            <h2 style=\"margin: 0 0 18px 0; color: #0f172a; font-size: 20px; font-weight: 800; letter-spacing: -0.3px;\">
                                {$subject}
                            </h2>
                            {$bodyContent}
                            {$ctaHtml}
                        </td>
                    </tr>

                    <!-- Footer & Support Notice -->
                    <tr>
                        <td style=\"background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 30px; text-align: center; font-size: 11px; color: #64748b;\">
                            <p style=\"margin: 0 0 6px 0; font-weight: 600;\">
                                &copy; " . date('Y') . " Certification Planner LLC. All rights reserved.
                            </p>
                            <p style=\"margin: 0; line-height: 1.4;\">
                                Need help? Email us at <a href=\"mailto:support@certificationplanner.com\" style=\"color: #0284c7; text-decoration: none;\">support@certificationplanner.com</a> or visit our <a href=\"https://certificationplanner.com/policies\" style=\"color: #0284c7; text-decoration: none;\">Policy & Guarantee Page</a>.
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>";
    }

    /**
     * Configure runtime mail transport dynamically
     */
    public static function configureRuntimeMailer(): void
    {
        $settings = self::getSmtpSettings();

        // If explicitly set to log or no host configured
        if (($settings['mail_driver'] ?? 'smtp') === 'log' || empty($settings['smtp_host'])) {
            Config::set('mail.default', 'log');
            return;
        }

        Config::set('mail.default', 'smtp');
        Config::set('mail.mailers.smtp.transport', 'smtp');
        Config::set('mail.mailers.smtp.host', $settings['smtp_host']);
        Config::set('mail.mailers.smtp.port', (int) ($settings['smtp_port'] ?? 587));
        Config::set('mail.mailers.smtp.encryption', ($settings['smtp_encryption'] === 'none' ? null : ($settings['smtp_encryption'] ?? 'tls')));
        Config::set('mail.mailers.smtp.username', $settings['smtp_username'] ?? null);
        Config::set('mail.mailers.smtp.password', $settings['smtp_password'] ?? null);
        Config::set('mail.mailers.smtp.timeout', 10);

        Config::set('mail.from.address', $settings['from_address'] ?? 'notifications@certificationplanner.com');
        Config::set('mail.from.name', $settings['from_name'] ?? 'Certification Planner');
    }

    /**
     * Send an event-driven template email to student + optional admin alert copy
     */
    public static function sendTemplateEmail(string $eventType, string $recipientEmail, ?string $recipientName = null, array $data = []): array
    {
        $templates = self::getEmailTemplates();
        $template = $templates[$eventType] ?? null;

        if (!$template) {
            return ['status' => 'error', 'message' => "Unknown template event: {$eventType}"];
        }

        if (empty($template['enabled'])) {
            Log::info("Email template {$eventType} is currently disabled. Skipping dispatch.");
            return ['status' => 'skipped', 'message' => "Template {$eventType} is disabled."];
        }

        // Setup common dynamic variables
        $frontendUrl = env('FRONTEND_URL', 'http://localhost:3000');
        $data['login_url'] = $data['login_url'] ?? ($frontendUrl . '/login');
        $data['portal_url'] = $data['portal_url'] ?? ($frontendUrl . '/profile');
        $data['catalog_url'] = $data['catalog_url'] ?? ($frontendUrl . '/courses');
        $data['student_name'] = $data['student_name'] ?? ($recipientName ?: 'Student');
        $data['student_email'] = $recipientEmail;

        $subject = self::replacePlaceholders($template['subject'], $data);
        $bodyHtml = self::replacePlaceholders($template['body'], $data);
        $ctaText = !empty($template['cta_text']) ? self::replacePlaceholders($template['cta_text'], $data) : null;
        $ctaUrl = !empty($template['cta_url']) ? self::replacePlaceholders($template['cta_url'], $data) : null;

        $fullHtml = self::buildHtmlEmail($subject, $bodyHtml, $ctaText, $ctaUrl);
        $smtpSettings = self::getSmtpSettings();

        // Determine smart department routing for admin copy
        $adminAlertEmail = match ($eventType) {
            'order_invoice' => $smtpSettings['sales_notification_email'] ?? $smtpSettings['admin_notification_email'],
            'ticket_created' => $smtpSettings['support_notification_email'] ?? $smtpSettings['admin_notification_email'],
            'website_inquiry', 'consultation_booking' => $smtpSettings['leads_notification_email'] ?? $smtpSettings['admin_notification_email'],
            default => $smtpSettings['admin_notification_email'] ?? 'admin@certificationplanner.com'
        };

        $shouldNotifyAdmin = !empty($template['send_admin_copy']) && !empty($adminAlertEmail);

        try {
            self::configureRuntimeMailer();

            // 1. Send to Student / Recipient
            Mail::html($fullHtml, function ($message) use ($recipientEmail, $recipientName, $subject, $smtpSettings) {
                $message->to($recipientEmail, $recipientName ?: '')
                        ->subject($subject);
                if (!empty($smtpSettings['from_address'])) {
                    $message->from($smtpSettings['from_address'], $smtpSettings['from_name'] ?? 'Certification Planner');
                }
            });

            // 2. Send Admin Alert Copy if enabled
            if ($shouldNotifyAdmin) {
                $adminSubject = "[ADMIN ALERT] " . $subject . " (" . ($recipientName ?: $recipientEmail) . ")";
                Mail::html($fullHtml, function ($message) use ($adminAlertEmail, $adminSubject, $smtpSettings) {
                    $message->to($adminAlertEmail)
                            ->subject($adminSubject);
                    if (!empty($smtpSettings['from_address'])) {
                        $message->from($smtpSettings['from_address'], $smtpSettings['from_name'] ?? 'Certification Planner');
                    }
                });
            }

            // 3. Record Successful Audit Log
            EmailLog::create([
                'event_type' => $eventType,
                'recipient_email' => $recipientEmail,
                'recipient_name' => $recipientName,
                'subject' => $subject,
                'content_preview' => strip_tags(substr($bodyHtml, 0, 300)),
                'status' => 'sent',
                'error_message' => null,
                'admin_notified' => $shouldNotifyAdmin,
                'admin_email' => $shouldNotifyAdmin ? $adminAlertEmail : null,
                'sent_at' => now()
            ]);

            return [
                'status' => 'success',
                'message' => 'Email dispatched successfully',
                'recipient' => $recipientEmail,
                'admin_notified' => $shouldNotifyAdmin
            ];
        } catch (\Throwable $e) {
            Log::error("Failed to send email [{$eventType}] to {$recipientEmail}: " . $e->getMessage());

            // Record Failed Audit Log
            EmailLog::create([
                'event_type' => $eventType,
                'recipient_email' => $recipientEmail,
                'recipient_name' => $recipientName,
                'subject' => $subject,
                'content_preview' => strip_tags(substr($bodyHtml, 0, 300)),
                'status' => 'failed',
                'error_message' => $e->getMessage(),
                'admin_notified' => false,
                'admin_email' => $adminAlertEmail,
                'sent_at' => now()
            ]);

            // Graceful return - never throw so customer transactions are preserved
            return [
                'status' => 'failed',
                'message' => $e->getMessage(),
                'recipient' => $recipientEmail
            ];
        }
    }

    /**
     * Test live SMTP server connectivity
     */
    public static function testSmtp(string $testEmail, ?array $overrideSettings = null): array
    {
        if ($overrideSettings) {
            self::saveSmtpSettings($overrideSettings);
        }

        $subject = "Certification Planner SMTP Test Connection Successful";
        $body = "<p>Congratulations!</p><p>Your SMTP mail configuration is connected and functioning properly with <strong>Certification Planner</strong>.</p><div style=\"background:#ecfdf5;border:1px solid #a7f3d0;color:#065f46;padding:12px;border-radius:8px;font-weight:bold;font-size:13px;\">✓ Live SMTP Handshake Verified on " . date('Y-m-d H:i:s') . "</div>";
        $fullHtml = self::buildHtmlEmail($subject, $body, "Open Admin Portal", env('FRONTEND_URL', 'http://localhost:3000') . '/admin');

        try {
            self::configureRuntimeMailer();
            $smtpSettings = self::getSmtpSettings();

            Mail::html($fullHtml, function ($message) use ($testEmail, $subject, $smtpSettings) {
                $message->to($testEmail)
                        ->subject($subject);
                if (!empty($smtpSettings['from_address'])) {
                    $message->from($smtpSettings['from_address'], $smtpSettings['from_name'] ?? 'Certification Planner');
                }
            });

            EmailLog::create([
                'event_type' => 'test_email',
                'recipient_email' => $testEmail,
                'recipient_name' => 'System Tester',
                'subject' => $subject,
                'content_preview' => 'SMTP Test Verification Email',
                'status' => 'sent',
                'error_message' => null,
                'admin_notified' => false,
                'sent_at' => now()
            ]);

            return [
                'status' => 'success',
                'message' => "Test email successfully sent to {$testEmail}!"
            ];
        } catch (\Throwable $e) {
            Log::error("SMTP Test failed: " . $e->getMessage());

            EmailLog::create([
                'event_type' => 'test_email',
                'recipient_email' => $testEmail,
                'recipient_name' => 'System Tester',
                'subject' => $subject,
                'content_preview' => 'SMTP Test Verification Email',
                'status' => 'failed',
                'error_message' => $e->getMessage(),
                'admin_notified' => false,
                'sent_at' => now()
            ]);

            return [
                'status' => 'error',
                'message' => "SMTP Connection Failed: " . $e->getMessage()
            ];
        }
    }
}
