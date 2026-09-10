<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use App\Services\EmailService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LeadController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:50',
            'course' => 'nullable|string|max:255',
            'format' => 'nullable|string|max:255',
            'preferred_date' => 'nullable|string|max:255',
            'type' => 'nullable|string|max:100',
            'source' => 'nullable|string|max:255',
            'message' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        $lead = Lead::create($request->all());

        // Auto trigger email based on lead request type
        try {
            $typeLower = strtolower($lead->type ?? '');
            $isConsultation = in_array($typeLower, ['consultation', 'consultation booking', 'callback request', 'callback', 'appointment', '1-on-1 consultation'])
                || str_contains($typeLower, 'consultation')
                || str_contains($typeLower, 'callback');

            if ($isConsultation) {
                EmailService::sendTemplateEmail('consultation_booking', $lead->email, $lead->name, [
                    'student_name'       => $lead->name,
                    'student_email'      => $lead->email,
                    'booking_date'      => $lead->preferred_date ?: 'Next Available Business Day Slot',
                    'consultation_topic'=> $lead->course ?: 'Career & Certification Guidance',
                    'phone'             => $lead->phone ?: 'Not provided'
                ]);
            } else {
                EmailService::sendTemplateEmail('website_inquiry', $lead->email, $lead->name, [
                    'student_name'  => $lead->name,
                    'student_email' => $lead->email,
                    'course_title'  => $lead->course ?: 'Professional Certification',
                    'phone'         => $lead->phone ?: 'Not provided'
                ]);
            }
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::error("Lead email dispatch error: " . $e->getMessage());
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Your request has been submitted successfully. An advisor will contact you shortly.',
            'data' => $lead
        ], 201);
    }
}
