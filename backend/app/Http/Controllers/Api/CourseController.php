<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Category;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index(Request $request)
    {
        $query = Course::with('category');

        if ($request->has('category') && $request->category !== 'All') {
            $query->where('category_name', $request->category);
        }

        $courses = $query->latest()->get();

        return response()->json([
            'status' => 'success',
            'data' => $courses
        ]);
    }

    public function show($slug)
    {
        $course = Course::with(['category', 'schedules'])->where('slug', $slug)->first();

        if (!$course) {
            return response()->json([
                'status' => 'error',
                'message' => 'Course not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $course
        ]);
    }

    public function categories()
    {
        $categories = Category::all();
        return response()->json([
            'status' => 'success',
            'data' => $categories
        ]);
    }
}
