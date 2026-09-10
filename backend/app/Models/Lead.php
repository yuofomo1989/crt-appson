<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'course',
        'format',
        'preferred_date',
        'type',
        'source',
        'message',
        'notes',
        'dispose_reason',
        'disposed_at',
        'status'
    ];
}
