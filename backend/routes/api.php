<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\ScheduleController;
use App\Http\Controllers\Api\LeadController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\InstructorController;
use App\Http\Controllers\Api\SupportTicketController;
use App\Http\Controllers\Api\EmailController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public APIs
Route::get('/courses', [CourseController::class, 'index']);
Route::get('/courses/{slug}', [CourseController::class, 'show']);
Route::get('/categories', [CourseController::class, 'categories']);
Route::get('/articles', [AdminController::class, 'getArticles']);
Route::get('/article-categories', [AdminController::class, 'getArticleCategories']);
Route::get('/popups', [AdminController::class, 'getMarketingPopups']);
Route::get('/brochures', [AdminController::class, 'getCourseBrochures']);
Route::get('/testimonials', [AdminController::class, 'getTestimonials']);
Route::get('/instructors', [InstructorController::class, 'index']);
Route::get('/settings', [AdminController::class, 'getSettings']);

Route::get('/schedules', [ScheduleController::class, 'index']);

Route::post('/consultations', [LeadController::class, 'store']);
Route::post('/leads', [LeadController::class, 'store']);
Route::post('/orders/checkout', [OrderController::class, 'store']);

// Auth APIs
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/change-password', [AuthController::class, 'changePassword']);
Route::get('/auth/notification-settings', [AuthController::class, 'getNotificationSettings']);
Route::post('/auth/notification-settings', [AuthController::class, 'updateNotificationSettings']);

// Admin APIs (For Local Testing & Management)
Route::prefix('admin')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboardMetrics']);
    Route::get('/leads', [AdminController::class, 'getLeads']);
    Route::patch('/leads/{id}/status', [AdminController::class, 'updateLeadStatus']);
    Route::post('/leads/{id}/send-brochure', [AdminController::class, 'sendBrochureEmail']);
    Route::delete('/leads/{id}', [AdminController::class, 'deleteLead']);
    Route::get('/orders', [AdminController::class, 'getOrders']);
    Route::post('/orders', [AdminController::class, 'storeOrder']);
    Route::patch('/orders/{id}/status', [AdminController::class, 'updateOrderStatus']);
    Route::delete('/orders/{id}', [AdminController::class, 'deleteOrder']);
    // Module 5: User Management Routes
    Route::get('/users', [AdminController::class, 'getUsers']);
    Route::post('/users', [AdminController::class, 'storeUser']);
    Route::put('/users/{id}', [AdminController::class, 'updateUserRole']);
    Route::patch('/users/{id}/toggle', [AdminController::class, 'toggleUserStatus']);
    Route::post('/users/change-password', [AdminController::class, 'changePassword']);
    Route::delete('/users/{id}', [AdminController::class, 'deleteUser']);
    // Module 6: Site Settings Routes
    Route::get('/settings', [AdminController::class, 'getSettings']);
    Route::post('/settings', [AdminController::class, 'updateSettings']);

    // Module 8: Email Notifications & SMTP Routes
    Route::get('/email-settings', [EmailController::class, 'getSettings']);
    Route::post('/email-settings', [EmailController::class, 'saveSettings']);
    Route::post('/email-templates', [EmailController::class, 'saveTemplates']);
    Route::post('/email-test', [EmailController::class, 'testEmail']);
    Route::get('/email-logs', [EmailController::class, 'getLogs']);
    Route::post('/email-logs/{id}/resend', [EmailController::class, 'resend']);

    // Category Routes
    Route::get('/categories', [CourseController::class, 'categories']);
    Route::post('/categories', [AdminController::class, 'storeCategory']);
    Route::put('/categories/{id}', [AdminController::class, 'updateCategory']);
    Route::delete('/categories/{id}', [AdminController::class, 'deleteCategory']);

    Route::post('/courses', [AdminController::class, 'storeCourse']);
    Route::put('/courses/{id}', [AdminController::class, 'updateCourse']);
    Route::delete('/courses/{id}', [AdminController::class, 'deleteCourse']);

    // Module 2: Schedule Routes
    Route::post('/schedules', [AdminController::class, 'storeSchedule']);
    Route::put('/schedules/{id}', [AdminController::class, 'updateSchedule']);
    Route::delete('/schedules/{id}', [AdminController::class, 'deleteSchedule']);

    // Module 7: Coupon Code Routes
    Route::get('/coupons', [AdminController::class, 'getCoupons']);
    Route::post('/coupons', [AdminController::class, 'storeCoupon']);
    Route::delete('/coupons/{id}', [AdminController::class, 'deleteCoupon']);

    // Module 8: SEO Meta Engine Routes
    Route::get('/seo', [AdminController::class, 'getSeoSettings']);
    Route::post('/seo', [AdminController::class, 'updateSeoSettings']);
    // Module 9: Blog & Article Routes
    Route::get('/articles', [AdminController::class, 'getArticles']);
    Route::post('/articles', [AdminController::class, 'storeArticle']);
    Route::put('/articles/{id}', [AdminController::class, 'updateArticle']);
    Route::delete('/articles/{id}', [AdminController::class, 'deleteArticle']);
    Route::get('/article-categories', [AdminController::class, 'getArticleCategories']);
    Route::post('/article-categories', [AdminController::class, 'storeArticleCategory']);
    Route::delete('/article-categories/{id}', [AdminController::class, 'deleteArticleCategory']);

    // Module 10: Marketing Popups Engine Routes
    Route::get('/popups', [AdminController::class, 'getMarketingPopups']);
    Route::post('/popups', [AdminController::class, 'storeMarketingPopup']);
    Route::put('/popups/{id}', [AdminController::class, 'updateMarketingPopup']);
    Route::delete('/popups/{id}', [AdminController::class, 'deleteMarketingPopup']);

    // Module 11: Course Brochures & Documents Library Routes
    Route::get('/brochures', [AdminController::class, 'getCourseBrochures']);
    Route::post('/brochures', [AdminController::class, 'storeCourseBrochure']);
    Route::delete('/brochures/{id}', [AdminController::class, 'deleteCourseBrochure']);

    // Module 12: Success Stories & Testimonials Manager Routes
    Route::get('/testimonials', [AdminController::class, 'getTestimonials']);
    Route::post('/testimonials', [AdminController::class, 'storeTestimonial']);
    Route::put('/testimonials/{id}', [AdminController::class, 'updateTestimonial']);
    Route::delete('/testimonials/{id}', [AdminController::class, 'deleteTestimonial']);

    // Module 13: Industry Experts & Instructors Routes
    Route::get('/instructors', [InstructorController::class, 'index']);
    Route::post('/instructors', [InstructorController::class, 'store']);
    Route::put('/instructors/{id}', [InstructorController::class, 'update']);
    Route::delete('/instructors/{id}', [InstructorController::class, 'destroy']);

    // Module 14: Dedicated Support Tickets CRM Routes
    Route::get('/support-tickets', [SupportTicketController::class, 'index']);
    Route::patch('/support-tickets/{id}/status', [SupportTicketController::class, 'updateStatus']);
    Route::post('/support-tickets/{id}/notes', [SupportTicketController::class, 'updateNotes']);
    Route::post('/support-tickets/{id}/reply', [SupportTicketController::class, 'addReply']);
    Route::delete('/support-tickets/{id}', [SupportTicketController::class, 'destroy']);
});

// Public Support Ticket Submission & Student Status Tracking & Replies
Route::post('/support-tickets', [SupportTicketController::class, 'store']);
Route::get('/support-tickets', [SupportTicketController::class, 'index']);
Route::post('/support-tickets/{id}/reply', [SupportTicketController::class, 'addReply']);

// Protected APIs (Sanctum)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/user', [AuthController::class, 'user']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);
});
