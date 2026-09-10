<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\EmailService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'student'
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        // Auto trigger welcome & portal access email
        EmailService::sendTemplateEmail('student_registration', $user->email, $user->name, [
            'student_name' => $user->name,
            'student_email' => $user->email
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'User registered successfully',
            'data' => [
                'user' => $user,
                'access_token' => $token,
                'token_type' => 'Bearer'
            ]
        ], 201);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid email or password'
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'message' => 'Logged in successfully',
            'data' => [
                'user' => $user,
                'access_token' => $token,
                'token_type' => 'Bearer'
            ]
        ]);
    }

    public function user(Request $request)
    {
        return response()->json([
            'status' => 'success',
            'data' => $request->user()
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Logged out successfully'
        ]);
    }

    public function changePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'new_password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()->first()
            ], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            $user = User::create([
                'name' => $request->input('name', explode('@', $request->email)[0]),
                'email' => $request->email,
                'password' => Hash::make($request->new_password),
                'role' => 'student'
            ]);
            return response()->json([
                'status' => 'success',
                'message' => 'Password created successfully!'
            ]);
        }

        // If current password is provided, verify it
        if ($request->filled('current_password')) {
            if (!Hash::check($request->current_password, $user->password)) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Current password is incorrect. Please check and try again.'
                ], 400);
            }
        }

        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Password updated successfully!'
        ]);
    }

    public function getNotificationSettings(Request $request)
    {
        $email = $request->query('email') ?? ($request->user() ? $request->user()->email : null);

        if (!$email) {
            return response()->json([
                'status' => 'error',
                'message' => 'Email is required'
            ], 400);
        }

        $user = User::where('email', $email)->first();

        $defaultSettings = [
            'class_alerts' => true,
            'promotions' => true,
            'sms_alerts' => false
        ];

        return response()->json([
            'status' => 'success',
            'data' => $user && $user->notification_settings ? $user->notification_settings : $defaultSettings
        ]);
    }

    public function updateNotificationSettings(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'class_alerts' => 'boolean',
            'promotions' => 'boolean',
            'sms_alerts' => 'boolean'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()->first()
            ], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            $user = User::create([
                'name' => explode('@', $request->email)[0],
                'email' => $request->email,
                'password' => Hash::make('Student@123'),
                'role' => 'student'
            ]);
        }

        $settings = [
            'class_alerts' => (bool) $request->input('class_alerts', true),
            'promotions' => (bool) $request->input('promotions', true),
            'sms_alerts' => (bool) $request->input('sms_alerts', false)
        ];

        $user->notification_settings = $settings;
        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Notification preferences saved successfully!',
            'data' => $settings
        ]);
    }
}
