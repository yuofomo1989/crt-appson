<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\User;
use App\Services\EmailService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'total_amount' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        $orderNumber = 'CP-' . strtoupper(Str::random(8));

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
            'customer_phone' => $request->customer_phone,
            'company_name' => $request->company_name,
            'address' => $request->address,
            'city' => $request->city,
            'state' => $request->state,
            'country' => $request->country ?? 'United States',
            'zip_code' => $request->zip_code,
            'total_amount' => $request->total_amount,
            'payment_status' => 'completed', // Mocked checkout success
            'payment_method' => $request->payment_method ?? 'card'
        ]);

        if ($request->has('items') && is_array($request->items)) {
            foreach ($request->items as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'course_name' => $item['course_name'] ?? ($item['course'] ?? 'PMP® Certification'),
                    'format' => $item['format'] ?? 'Live Online Classroom',
                    'date_range' => $item['date'] ?? null,
                    'price' => $item['price'] ?? $request->total_amount,
                    'quantity' => $item['quantity'] ?? 1
                ]);
            }
        } else {
            OrderItem::create([
                'order_id' => $order->id,
                'course_name' => $request->course_name ?? 'PMP® Certification',
                'format' => 'Live Online Classroom',
                'date_range' => null,
                'price' => $request->total_amount,
                'quantity' => 1
            ]);
        }

        // Auto trigger Order & Tax Invoice Receipt email to student + Sales alert to admin
        try {
            $firstItem = $order->items()->first();
            $courseTitle = $firstItem ? $firstItem->course_name : ($request->course_name ?? 'Certification Course');
            $format = $firstItem ? $firstItem->format : 'Live Online Classroom';
            $dateRange = $firstItem && $firstItem->date_range ? $firstItem->date_range : 'Scheduled Batch';
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
            \Illuminate\Support\Facades\Log::error("Order email error: " . $e->getMessage());
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Order placed successfully',
            'data' => $order->load('items')
        ], 201);
    }
}
