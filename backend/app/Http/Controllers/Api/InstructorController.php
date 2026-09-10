<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Instructor;
use Illuminate\Http\Request;

class InstructorController extends Controller
{
    public function index(Request $request)
    {
        $query = Instructor::query();
        
        if ($request->has('course_id')) {
            $courseId = (int)$request->query('course_id');
            $query->where(function($q) use ($courseId) {
                $q->whereJsonContains('assigned_course_ids', $courseId)
                  ->orWhereNull('assigned_course_ids');
            });
        }

        $instructors = $query->orderBy('id', 'asc')->get();

        return response()->json([
            'status' => 'success',
            'data' => $instructors
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'certs' => 'nullable|string|max:255',
            'exp_years' => 'nullable|string|max:255',
            'rating' => 'nullable|numeric',
            'students_count' => 'nullable|integer',
            'bio' => 'nullable|string',
            'image_url' => 'nullable|string',
            'assigned_course_ids' => 'nullable|array',
            'status' => 'nullable|string'
        ]);

        $instructor = Instructor::create($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Instructor created successfully',
            'data' => $instructor
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $instructor = Instructor::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'certs' => 'nullable|string|max:255',
            'exp_years' => 'nullable|string|max:255',
            'rating' => 'nullable|numeric',
            'students_count' => 'nullable|integer',
            'bio' => 'nullable|string',
            'image_url' => 'nullable|string',
            'assigned_course_ids' => 'nullable|array',
            'status' => 'nullable|string'
        ]);

        $instructor->update($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Instructor updated successfully',
            'data' => $instructor
        ]);
    }

    public function destroy($id)
    {
        $instructor = Instructor::findOrFail($id);
        $instructor->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Instructor deleted successfully'
        ]);
    }
}
