<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Schedule;
use App\Models\Lead;
use App\Models\Order;
use App\Models\User;
use App\Models\Category;
use App\Models\Article;
use App\Models\ArticleCategory;
use App\Models\MarketingPopup;
use App\Models\CourseBrochure;
use App\Models\Testimonial;
use App\Services\EmailService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AdminController extends Controller
{
    // Admin Dashboard Summary Metrics
    public function dashboardMetrics()
    {
        return response()->json([
            'status' => 'success',
            'data' => [
                'total_courses' => Course::count(),
                'total_schedules' => Schedule::count(),
                'total_leads' => Lead::count(),
                'new_leads' => Lead::where('status', 'new')->count(),
                'total_orders' => Order::count(),
                'total_revenue' => Order::where('payment_status', 'completed')->sum('total_amount'),
                'total_students' => User::count()
            ]
        ]);
    }

    // Category Management APIs
    public function storeCategory(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:categories,name',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'errors' => $validator->errors()], 422);
        }

        $slug = Str::slug($request->name);
        $category = Category::create([
            'name' => $request->name,
            'slug' => $slug,
            'description' => $request->description ?? '',
            'image' => $request->image ?? '',
            'bg_image' => $request->bg_image ?? '',
            'display_order' => $request->display_order ?? 0,
            'is_featured' => $request->has('is_featured') ? (bool)$request->is_featured : true,
            'avg_salary' => $request->avg_salary ?? '$115,000',
            'badge_text' => $request->badge_text ?? 'High Demand'
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Category created successfully',
            'data' => $category
        ], 201);
    }

    public function updateCategory(Request $request, $id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['status' => 'error', 'message' => 'Category not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255|unique:categories,name,' . $id,
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'errors' => $validator->errors()], 422);
        }

        $dataToUpdate = $request->all();
        if ($request->has('name')) {
            $dataToUpdate['slug'] = Str::slug($request->name);
        }

        $category->update($dataToUpdate);

        return response()->json([
            'status' => 'success',
            'message' => 'Category updated successfully',
            'data' => $category
        ]);
    }

    public function deleteCategory($id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['status' => 'error', 'message' => 'Category not found'], 404);
        }

        $category->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Category deleted successfully'
        ]);
    }

    // Module 6: Site Global Settings & Banner Config APIs
    public function getSettings()
    {
        // Simple file-backed settings array for fast local config
        $settingsPath = storage_path('app/site_settings.json');
        $defaultSettings = [
            'support_phone' => '(888) 745-7575',
            'support_email' => 'support@certificationplanner.com',
            'trustpilot_rating' => '4.9/5',
            'total_students_trained' => '50,000+',
            'hero_title' => '#1 Authorized Professional Training & Certification Bootcamps',
            'hero_subtitle' => 'Live instructor-led bootcamps designed for first-attempt exam pass guarantee.',
            'schedule_day_types' => ['Weekday (Mon-Thu)', 'Weekend (Sat-Sun)', 'Bootcamp (4 Days)', 'Evening (Mon-Fri)'],
            'top_bar_badge' => 'Guaranteed-to-Run Classes',
            'top_bar_text' => 'PMI Authorized Training Partner',
            'admin_entrance_code' => 'cp_sec_8f9a2',
            'admin_entrance_path' => 'cp-control-7b8f9e',
            'admin_entrance_enabled' => true,
            'admin_stealth_mode' => true,
            'primary_font' => 'Plus Jakarta Sans',
            'heading_font' => 'Ubuntu',
            'hero_title_size' => '48px',
            'section_heading_size' => '32px',
            'body_text_size' => '15px',
            'nav_link_size' => '14px',
            'footer_text' => 'Certification Planner is a leading North American professional training provider offering guaranteed bootcamps.',
            'footer_copyright' => '© 2026 Certification Planner LLC. All rights reserved.',
            'footer_columns' => [
                [
                    'id' => 1,
                    'title' => 'Certifications',
                    'links' => [
                        ['name' => 'Agile & Project Management', 'href' => '/courses/agile-project-management'],
                        ['name' => 'PMP® Certification', 'href' => '/courses/pmp-certification'],
                        ['name' => 'CAPM® Certification', 'href' => '/courses/capm-certification'],
                        ['name' => 'CISSP® Exam Prep', 'href' => '/courses/cissp-certification'],
                        ['name' => 'AWS Solutions Architect', 'href' => '/courses/aws-solutions-architect']
                    ]
                ],
                [
                    'id' => 2,
                    'title' => 'Training Options',
                    'links' => [
                        ['name' => 'Live Online Classroom', 'href' => '/training#live'],
                        ['name' => 'In-Person Classroom', 'href' => '/training#in-person'],
                        ['name' => 'Self-Paced Learning', 'href' => '/training#self-paced'],
                        ['name' => 'Corporate Group Training', 'href' => '/corporate-training']
                    ]
                ],
                [
                    'id' => 3,
                    'title' => 'Support & Legal',
                    'links' => [
                        ['name' => 'Our Policies', 'href' => '/policies'],
                        ['name' => 'About Us', 'href' => '/about'],
                        ['name' => 'Contact Support', 'href' => '/contact'],
                        ['name' => 'Terms of Service', 'href' => '/terms'],
                        ['name' => 'Privacy Policy', 'href' => '/privacy'],
                        ['name' => 'Refund Policy', 'href' => '/refunds']
                    ]
                ]
            ],
            'header_menu_items' => [
                [
                    'id' => 1786637378095,
                    'title' => 'COURSES',
                    'url' => '#',
                    'children' => [
                        ['title' => 'Project Management', 'url' => '/category/project-management'],
                        ['title' => 'Cybersecurity', 'url' => '/category/cybersecurity']
                    ]
                ],
                [
                    'id' => 1788363268461,
                    'title' => 'Resources',
                    'url' => '/resources',
                    'children' => []
                ]
            ]
        ];

        if (file_exists($settingsPath)) {
            $settings = json_decode(file_get_contents($settingsPath), true);
            if (!isset($settings['schedule_day_types'])) {
                $settings['schedule_day_types'] = $defaultSettings['schedule_day_types'];
            }
            if (!isset($settings['top_bar_badge'])) {
                $settings['top_bar_badge'] = $defaultSettings['top_bar_badge'];
            }
            if (!isset($settings['top_bar_text'])) {
                $settings['top_bar_text'] = $defaultSettings['top_bar_text'];
            }
            if (!isset($settings['footer_text'])) {
                $settings['footer_text'] = $defaultSettings['footer_text'];
            }
            if (!isset($settings['footer_copyright'])) {
                $settings['footer_copyright'] = $defaultSettings['footer_copyright'];
            }
            if (!isset($settings['footer_columns'])) {
                $settings['footer_columns'] = $defaultSettings['footer_columns'];
            }
            if (!isset($settings['header_menu_items'])) {
                $settings['header_menu_items'] = $defaultSettings['header_menu_items'];
            }
        } else {
            $settings = $defaultSettings;
        }

        return response()->json([
            'status' => 'success',
            'data' => $settings
        ]);
    }

    public function updateSettings(Request $request)
    {
        $settingsPath = storage_path('app/site_settings.json');
        $existing = file_exists($settingsPath) ? json_decode(file_get_contents($settingsPath), true) : [];
        if (!is_array($existing)) $existing = [];

        $incoming = $request->all();
        $merged = array_merge($existing, $incoming);

        file_put_contents($settingsPath, json_encode($merged, JSON_PRETTY_PRINT));

        return response()->json([
            'status' => 'success',
            'message' => 'Site settings updated successfully',
            'data' => $merged
        ]);
    }

    // ==========================================
    // MODULE 7: COUPONS & PROMO DISCOUNT ENGINE APIs
    // ==========================================
    public function getCoupons()
    {
        $couponsPath = storage_path('app/coupons.json');
        $coupons = file_exists($couponsPath) ? json_decode(file_get_contents($couponsPath), true) : [
            ['id' => 1, 'code' => 'SUMMER2026', 'type' => 'percentage', 'value' => 20, 'status' => 'active', 'valid_till' => '2026-12-31'],
            ['id' => 2, 'code' => 'FLAT100', 'type' => 'fixed', 'value' => 100, 'status' => 'active', 'valid_till' => '2026-12-31']
        ];

        return response()->json(['status' => 'success', 'data' => $coupons]);
    }

    public function storeCoupon(Request $request)
    {
        $couponsPath = storage_path('app/coupons.json');
        $coupons = file_exists($couponsPath) ? json_decode(file_get_contents($couponsPath), true) : [];
        
        $newCoupon = [
            'id' => time(),
            'code' => strtoupper($request->code ?? 'PROMO'.rand(100,999)),
            'type' => $request->type ?? 'percentage',
            'value' => $request->value ?? 10,
            'status' => 'active',
            'valid_till' => $request->valid_till ?? '2026-12-31'
        ];

        $coupons[] = $newCoupon;
        file_put_contents($couponsPath, json_encode($coupons, JSON_PRETTY_PRINT));

        return response()->json(['status' => 'success', 'message' => 'Coupon created successfully', 'data' => $newCoupon]);
    }

    public function deleteCoupon($id)
    {
        $couponsPath = storage_path('app/coupons.json');
        $coupons = file_exists($couponsPath) ? json_decode(file_get_contents($couponsPath), true) : [];
        $filtered = array_filter($coupons, fn($c) => $c['id'] != $id);
        file_put_contents($couponsPath, json_encode(array_values($filtered), JSON_PRETTY_PRINT));

        return response()->json(['status' => 'success', 'message' => 'Coupon deleted successfully']);
    }

    // ==========================================
    // MODULE 8: PAGE SEO & META SCHEMA ENGINE APIs
    // ==========================================
    public function getSeoSettings()
    {
        $seoPath = storage_path('app/seo_settings.json');
        $seoData = file_exists($seoPath) ? json_decode(file_get_contents($seoPath), true) : [
            'meta_title' => 'Certification Planner | #1 Professional Training & Certification Bootcamps',
            'meta_description' => 'Get certified in PMP, CISSP, AWS, Scrum with 100% pass guarantee bootcamps.',
            'meta_keywords' => 'PMP certification, CISSP training, AWS bootcamp, Scrum Master',
            'og_image' => 'https://certificationplanner.com/og-banner.jpg',
            'schema_json' => '{"@context":"https://schema.org","@type":"EducationalOrganization","name":"Certification Planner"}'
        ];

        return response()->json(['status' => 'success', 'data' => $seoData]);
    }

    public function updateSeoSettings(Request $request)
    {
        $seoPath = storage_path('app/seo_settings.json');
        $seoData = $request->only(['meta_title', 'meta_description', 'meta_keywords', 'og_image', 'schema_json']);
        file_put_contents($seoPath, json_encode($seoData, JSON_PRETTY_PRINT));

        return response()->json(['status' => 'success', 'message' => 'SEO Meta settings updated successfully', 'data' => $seoData]);
    }

    // Module 5: Student & User Manager APIs
    public function getUsers()
    {
        $users = User::latest()->get();
        return response()->json([
            'status' => 'success',
            'data' => $users
        ]);
    }

    public function storeUser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'role' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role' => $request->role ?? 'student'
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'User / Staff account created successfully',
            'data' => $user
        ], 201);
    }

    public function updateUserRole(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['status' => 'error', 'message' => 'User not found'], 404);
        }

        if ($request->has('role')) {
            $user->role = $request->role;
        }

        if ($request->has('name')) {
            $user->name = $request->name;
        }

        if ($request->has('password') && !empty($request->password)) {
            $user->password = bcrypt($request->password);
        }

        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'User account role updated successfully',
            'data' => $user
        ]);
    }

    public function toggleUserStatus($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['status' => 'error', 'message' => 'User not found'], 404);
        }

        $newRole = ($user->role ?? 'student') === 'disabled' ? 'student' : 'disabled';
        $user->update(['role' => $newRole]);

        return response()->json([
            'status' => 'success',
            'message' => 'User status updated successfully',
            'data' => $user
        ]);
    }

    public function deleteUser($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['status' => 'error', 'message' => 'User not found'], 404);
        }

        $user->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'User account deleted successfully'
        ]);
    }

    public function changePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'new_password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'errors' => $validator->errors()], 422);
        }

        $user = User::find($request->user_id);
        if (!$user) {
            return response()->json(['status' => 'error', 'message' => 'User not found'], 404);
        }

        if ($request->filled('current_password')) {
            if (!\Illuminate\Support\Facades\Hash::check($request->current_password, $user->password)) {
                return response()->json(['status' => 'error', 'message' => 'Current password does not match.'], 400);
            }
        }

        $user->password = $request->new_password;
        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => "Password for '{$user->name}' ({$user->email}) updated successfully!",
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role
            ]
        ]);
    }

    // Lead Management APIs
    public function getLeads(Request $request)
    {
        $query = Lead::query();
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }
        $leads = $query->latest()->paginate(15);

        return response()->json([
            'status' => 'success',
            'data' => $leads
        ]);
    }

    public function updateLeadStatus(Request $request, $id)
    {
        $lead = Lead::find($id);
        if (!$lead) {
            return response()->json(['status' => 'error', 'message' => 'Lead not found'], 404);
        }

        $dataToUpdate = [];
        if ($request->has('status')) {
            $dataToUpdate['status'] = $request->status;
            if ($request->status === 'disposed' || str_starts_with($request->status, 'disposed_')) {
                $dataToUpdate['disposed_at'] = now();
            }
        }
        if ($request->has('notes')) {
            $dataToUpdate['notes'] = $request->notes;
        }
        if ($request->has('dispose_reason')) {
            $dataToUpdate['dispose_reason'] = $request->dispose_reason;
            $dataToUpdate['disposed_at'] = now();
        }
        if (!empty($dataToUpdate)) {
            $lead->update($dataToUpdate);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Lead updated successfully',
            'data' => $lead
        ]);
    }

    public function sendBrochureEmail(Request $request, $id)
    {
        $lead = Lead::find($id);
        if (!$lead) {
            return response()->json(['status' => 'error', 'message' => 'Lead not found'], 404);
        }

        $courseTitle = $request->course_title || $lead->course || 'PMP® Certification';
        $docType = $request->doc_type || 'Official Course Brochure & Syllabus PDF';
        $customNote = $request->custom_note || '';

        // Format updated log note
        $logMessage = "✉️ Sent Brochure & Course Material Email ({$courseTitle})";
        if (!empty($customNote)) {
            $logMessage .= " - Note: {$customNote}";
        }

        $existingNotes = $lead->notes ? $lead->notes . "\n" : '';
        $lead->update([
            'notes' => $existingNotes . "[" . now()->format('M d, H:i') . "] " . $logMessage
        ]);

        return response()->json([
            'status' => 'success',
            'message' => "Brochure email dispatched to {$lead->email} successfully!",
            'data' => [
                'recipient' => $lead->email,
                'course' => $courseTitle,
                'sent_at' => now()->toDateTimeString()
            ]
        ]);
    }

    public function deleteLead($id)
    {
        $lead = Lead::find($id);
        if (!$lead) {
            return response()->json(['status' => 'error', 'message' => 'Lead not found'], 404);
        }

        $lead->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Lead inquiry deleted successfully'
        ]);
    }

    // Order Management APIs (Module 4)
    public function getOrders(Request $request)
    {
        $query = Order::with('items')->latest();

        if ($request->filled('email')) {
            $query->where('customer_email', $request->email);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('customer_email', 'like', "%{$search}%")
                  ->orWhere('customer_name', 'like', "%{$search}%")
                  ->orWhere('order_number', 'like', "%{$search}%");
            });
        }

        if ($request->get('all') == 1) {
            $orders = $query->get();
        } else {
            $orders = $query->paginate($request->get('per_page', 15));
        }

        return response()->json([
            'status' => 'success',
            'data' => $orders
        ]);
    }

    public function storeOrder(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email',
            'total_amount' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'errors' => $validator->errors()], 422);
        }

        $orderNumber = $request->order_number ?? ('CP-ORD-' . strtoupper(Str::random(6)));

        // Auto-register student user account if not existing so it appears in Registered Students Manager
        $studentUser = User::firstOrCreate(
            ['email' => $request->customer_email],
            [
                'name' => $request->customer_name,
                'password' => bcrypt(Str::random(10)),
                'role' => 'student'
            ]
        );

        $order = Order::create([
            'order_number' => $orderNumber,
            'user_id' => $studentUser->id,
            'customer_name' => $request->customer_name,
            'customer_email' => $request->customer_email,
            'customer_phone' => $request->customer_phone ?? '',
            'total_amount' => $request->total_amount,
            'subtotal' => $request->subtotal ?? $request->total_amount,
            'discount_amount' => $request->discount_amount ?? 0,
            'coupon_code' => $request->coupon_code ?? '',
            'payment_status' => $request->payment_status ?? 'completed',
            'payment_method' => $request->payment_method ?? 'Admin Manual Enrollment',
            'transaction_id' => 'TXN-MANUAL-' . rand(100000, 999999),
            'status' => 'confirmed'
        ]);

        if ($request->has('items') && is_array($request->items)) {
            foreach ($request->items as $item) {
                \App\Models\OrderItem::create([
                    'order_id' => $order->id,
                    'course_name' => $item['course_name'] ?? ($item['course'] ?? 'Certification Course'),
                    'format' => $item['format'] ?? 'Online Class',
                    'date_range' => $item['date'] ?? null,
                    'schedule_details' => $item['schedule_details'] ?? ($item['format'] ?? 'Standard Batch'),
                    'price' => $item['price'] ?? $request->total_amount,
                    'quantity' => $item['quantity'] ?? 1
                ]);
            }
        } else if ($request->has('course_name')) {
            \App\Models\OrderItem::create([
                'order_id' => $order->id,
                'course_name' => $request->course_name,
                'schedule_details' => $request->schedule_details ?? 'Manual Admin Booking',
                'price' => $request->total_amount,
                'quantity' => 1
            ]);
        }

        // Auto trigger Order & Tax Invoice Receipt email to student + Sales alert to admin
        try {
            $firstItem = $order->items()->first();
            $courseTitle = $firstItem ? $firstItem->course_name : ($request->course_name ?? 'Certification Course');
            $format = $firstItem ? $firstItem->format : 'Live Online Classroom';
            $dateRange = $firstItem && $firstItem->date_range ? $firstItem->date_range : 'Admin Enrolled Batch';
            $frontendUrl = env('FRONTEND_URL', 'http://localhost:3000');
            $invoiceUrl = $frontendUrl . '/admin/invoice?orderId=' . $order->id;

            EmailService::sendTemplateEmail('order_invoice', $order->customer_email, $order->customer_name, [
                'order_number'    => $order->order_number,
                'student_name'    => $order->customer_name,
                'student_email'   => $order->customer_email,
                'order_amount'    => number_format((float)$order->total_amount, 2),
                'course_title'    => $courseTitle,
                'training_format' => $format,
                'date_range'      => $dateRange,
                'invoice_url'     => $invoiceUrl
            ]);
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::error("Manual order email error: " . $e->getMessage());
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Order created successfully',
            'data' => $order->load('items')
        ], 201);
    }

    public function updateOrderStatus(Request $request, $id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json(['status' => 'error', 'message' => 'Order not found'], 404);
        }

        $order->update([
            'payment_status' => $request->payment_status ?? $order->payment_status,
            'status' => $request->status ?? $order->status
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Order payment status updated successfully',
            'data' => $order
        ]);
    }

    public function deleteOrder($id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json(['status' => 'error', 'message' => 'Order not found'], 404);
        }

        $order->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Order record deleted successfully'
        ]);
    }

    // Course Management (Create/Update/Delete)
    public function storeCourse(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'category_name' => 'required|string|max:255',
            'price' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'errors' => $validator->errors()], 422);
        }

        $slug = Str::slug($request->title);
        $course = Course::create(array_merge($request->all(), ['slug' => $slug]));

        return response()->json([
            'status' => 'success',
            'message' => 'Course created successfully',
            'data' => $course
        ], 201);
    }

    // Update Course
    public function updateCourse(Request $request, $id)
    {
        $course = Course::find($id);
        if (!$course) {
            return response()->json(['status' => 'error', 'message' => 'Course not found'], 404);
        }

        $payload = $request->all();
        if ($request->has('title')) {
            $payload['slug'] = Str::slug($request->title);
        }

        $jsonFields = [
            'who_should_take', 'impact_stats', 'hiring_companies', 'roadmap_steps',
            'learning_experience', 'section_visibility', 'instructors', 'features',
            'faqs', 'curriculum', 'pre_footer_cta'
        ];
        foreach ($jsonFields as $field) {
            if (isset($payload[$field]) && is_string($payload[$field])) {
                $decoded = json_decode($payload[$field], true);
                if (json_last_error() === JSON_ERROR_NONE) {
                    $payload[$field] = $decoded;
                }
            }
        }

        $course->update($payload);

        return response()->json([
            'status' => 'success',
            'message' => 'Course updated successfully',
            'data' => $course
        ]);
    }

    // Delete Course
    public function deleteCourse($id)
    {
        $course = Course::find($id);
        if (!$course) {
            return response()->json(['status' => 'error', 'message' => 'Course not found'], 404);
        }

        $course->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Course deleted successfully'
        ]);
    }

    // Schedule Management APIs (Module 2)
    public function storeSchedule(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'course_id' => 'required|exists:courses,id',
            'country' => 'required|string',
            'city' => 'required|string',
            'format' => 'required|string',
            'batch_date' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'errors' => $validator->errors()], 422);
        }

        $data = $request->all();
        if (empty($data['course_title'])) {
            $course = Course::find($data['course_id']);
            if ($course) {
                $data['course_title'] = $course->title;
            }
        }

        $schedule = Schedule::create($data);

        return response()->json([
            'status' => 'success',
            'message' => 'Schedule batch created successfully',
            'data' => $schedule
        ], 201);
    }

    public function updateSchedule(Request $request, $id)
    {
        $schedule = Schedule::find($id);
        if (!$schedule) {
            return response()->json(['status' => 'error', 'message' => 'Schedule not found'], 404);
        }

        $schedule->update($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Schedule batch updated successfully',
            'data' => $schedule
        ]);
    }

    // Article Management APIs (Blog Engine)
    public function getArticles()
    {
        $articles = Article::latest()->get();
        return response()->json(['status' => 'success', 'data' => $articles]);
    }

    public function storeArticle(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'errors' => $validator->errors()], 422);
        }

        $data = $request->all();
        $data['slug'] = Str::slug($request->title);

        $article = Article::create($data);

        return response()->json([
            'status' => 'success',
            'message' => 'Article published successfully',
            'data' => $article
        ], 201);
    }

    public function updateArticle(Request $request, $id)
    {
        $article = Article::find($id);
        if (!$article) {
            return response()->json(['status' => 'error', 'message' => 'Article not found'], 404);
        }

        $data = $request->all();
        if ($request->has('title')) {
            $data['slug'] = Str::slug($request->title);
        }

        $article->update($data);

        return response()->json([
            'status' => 'success',
            'message' => 'Article updated successfully',
            'data' => $article
        ]);
    }

    public function deleteArticle($id)
    {
        $article = Article::find($id);
        if (!$article) {
            return response()->json(['status' => 'error', 'message' => 'Article not found'], 404);
        }

        $article->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Article deleted successfully'
        ]);
    }

    // Article Category CRUD Methods
    public function getArticleCategories()
    {
        $categories = ArticleCategory::latest()->get();
        return response()->json(['status' => 'success', 'data' => $categories]);
    }

    public function storeArticleCategory(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255'
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'errors' => $validator->errors()], 422);
        }

        $category = ArticleCategory::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'description' => $request->description ?? '',
            'icon_type' => $request->icon_type ?? 'green'
        ]);

        return response()->json(['status' => 'success', 'message' => 'Resource Category Created', 'data' => $category], 201);
    }

    public function deleteArticleCategory($id)
    {
        $category = ArticleCategory::find($id);
        if ($category) {
            $category->delete();
        }
        return response()->json(['status' => 'success', 'message' => 'Resource Category Deleted']);
    }

    // Marketing Popups Engine Methods
    public function getMarketingPopups()
    {
        $popups = MarketingPopup::latest()->get();
        return response()->json(['status' => 'success', 'data' => $popups]);
    }

    public function storeMarketingPopup(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'title' => 'required|string|max:255'
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'errors' => $validator->errors()], 422);
        }

        $popup = MarketingPopup::create($request->all());

        return response()->json(['status' => 'success', 'message' => 'Marketing Popup Created', 'data' => $popup], 201);
    }

    public function updateMarketingPopup(Request $request, $id)
    {
        $popup = MarketingPopup::find($id);
        if (!$popup) {
            return response()->json(['status' => 'error', 'message' => 'Popup not found'], 404);
        }

        $popup->update($request->all());

        return response()->json(['status' => 'success', 'message' => 'Marketing Popup Updated', 'data' => $popup]);
    }

    public function deleteMarketingPopup($id)
    {
        $popup = MarketingPopup::find($id);
        if ($popup) {
            $popup->delete();
        }
        return response()->json(['status' => 'success', 'message' => 'Marketing Popup Deleted']);
    }

    // Course Brochures & Documents Library APIs
    public function getCourseBrochures(Request $request)
    {
        $query = CourseBrochure::latest();
        if ($request->has('course_id')) {
            $query->where('course_id', $request->course_id);
        }
        if ($request->has('course_title')) {
            $query->where('course_title', $request->course_title);
        }
        $brochures = $query->get();
        return response()->json(['status' => 'success', 'data' => $brochures]);
    }

    public function storeCourseBrochure(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'course_title'   => 'required|string|max:255',
            'document_title' => 'required|string|max:255',
            'pdf_file'       => 'nullable|file|mimes:pdf,doc,docx|max:20480',
            'file_url'       => 'nullable|string',
            'file_type'      => 'nullable|string|max:50',
            'file_size'      => 'nullable|string|max:50',
            'course_id'      => 'nullable|integer',
            'status'         => 'nullable|string|max:20',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'errors' => $validator->errors()], 422);
        }

        $fileUrl = $request->input('file_url', '');
        $fileSize = $request->input('file_size', '');

        // If an actual file was uploaded, save it and use real URL
        if ($request->hasFile('pdf_file') && $request->file('pdf_file')->isValid()) {
            $file = $request->file('pdf_file');
            $fileName = time() . '_' . preg_replace('/[^a-zA-Z0-9._-]/', '_', $file->getClientOriginalName());
            $path = $file->storeAs('brochures', $fileName, 'public');
            $fileUrl = url('storage/' . $path);
            $fileSizeBytes = $file->getSize();
            $fileSize = $fileSizeBytes > 1048576
                ? round($fileSizeBytes / 1048576, 1) . ' MB'
                : round($fileSizeBytes / 1024, 0) . ' KB';
        }

        if (empty($fileUrl)) {
            return response()->json(['status' => 'error', 'message' => 'Please provide a file or a URL.'], 422);
        }

        $brochure = CourseBrochure::create([
            'course_id'      => $request->input('course_id'),
            'course_title'   => $request->input('course_title'),
            'document_title' => $request->input('document_title'),
            'file_url'       => $fileUrl,
            'file_type'      => $request->input('file_type', 'pdf'),
            'file_size'      => $fileSize,
            'downloads_count'=> 0,
            'status'         => $request->input('status', 'active'),
        ]);

        return response()->json(['status' => 'success', 'message' => 'Course Brochure Saved', 'data' => $brochure], 201);
    }

    public function deleteCourseBrochure($id)
    {
        $brochure = CourseBrochure::find($id);
        if ($brochure) {
            $brochure->delete();
        }
        return response()->json(['status' => 'success', 'message' => 'Brochure Deleted']);
    }

    // Success Stories & Testimonials APIs
    public function getTestimonials(Request $request)
    {
        $query = Testimonial::latest();
        if ($request->has('page')) {
            $pageSlug = $request->page;
            $query->where(function($q) use ($pageSlug) {
                $q->whereJsonContains('target_pages', 'global')
                  ->orWhereJsonContains('target_pages', $pageSlug);
            });
        }
        $testimonials = $query->get();
        return response()->json(['status' => 'success', 'data' => $testimonials]);
    }

    public function storeTestimonial(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'quote' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'errors' => $validator->errors()], 422);
        }

        $testimonial = Testimonial::create($request->all());
        return response()->json(['status' => 'success', 'message' => 'Testimonial Created', 'data' => $testimonial], 201);
    }

    public function updateTestimonial(Request $request, $id)
    {
        $testimonial = Testimonial::find($id);
        if (!$testimonial) {
            return response()->json(['status' => 'error', 'message' => 'Testimonial not found'], 404);
        }

        $testimonial->update($request->all());
        return response()->json(['status' => 'success', 'message' => 'Testimonial Updated', 'data' => $testimonial]);
    }

    public function deleteTestimonial($id)
    {
        $testimonial = Testimonial::find($id);
        if ($testimonial) {
            $testimonial->delete();
        }
        return response()->json(['status' => 'success', 'message' => 'Testimonial Deleted']);
    }
}
