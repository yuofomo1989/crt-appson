<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'role',
        'location',
        'cert',
        'quote',
        'badge',
        'target_pages',
        'status'
    ];

    protected $casts = [
        'target_pages' => 'array'
    ];
}
