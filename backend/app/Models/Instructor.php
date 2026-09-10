<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Instructor extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'certs',
        'exp_years',
        'rating',
        'students_count',
        'bio',
        'image_url',
        'assigned_course_ids',
        'status'
    ];

    protected $casts = [
        'assigned_course_ids' => 'array',
        'rating' => 'float',
        'students_count' => 'integer'
    ];
}
