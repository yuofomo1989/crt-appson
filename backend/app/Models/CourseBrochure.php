<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseBrochure extends Model
{
    use HasFactory;

    protected $table = 'course_brochures';

    protected $fillable = [
        'course_id',
        'course_title',
        'document_title',
        'file_url',
        'file_type',
        'file_size',
        'downloads_count',
        'status'
    ];
}
