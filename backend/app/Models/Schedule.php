<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'course_id',
        'course_title',
        'country',
        'city',
        'format',
        'batch_date',
        'day',
        'date_range',
        'label',
        'time',
        'timezone',
        'start_time',
        'end_time',
        'day_type',
        'duration',
        'contact_hours',
        'location',
        'price',
        'seats_left',
        'status',
        'is_alert'
    ];

    protected $casts = [
        'price' => 'float',
        'is_alert' => 'boolean',
        'seats_left' => 'integer'
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
