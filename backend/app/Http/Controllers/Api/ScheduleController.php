<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Schedule;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{
    public function index(Request $request)
    {
        $query = Schedule::query();

        if ($request->has('country') && $request->country) {
            $query->where('country', $request->country);
        }

        if ($request->has('city') && $request->city) {
            $query->where('city', $request->city);
        }

        if ($request->has('format') && $request->format) {
            $query->where('format', $request->format);
        }

        $schedules = $query->latest()->get();

        return response()->json([
            'status' => 'success',
            'data' => $schedules
        ]);
    }
}
