<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'title',
        'slug',
        'category_name',
        'level',
        'rating',
        'reviews_count',
        'duration',
        'next_date',
        'price',
        'original_price',
        'badge',
        'image',
        'brochure_pdf',
        'faqs',
        'curriculum',
        'video_url',
        'description',
        'features',
        'who_should_take',
        'impact_stats',
        'hiring_companies',
        'roadmap_steps',
        'learning_experience',
        'section_visibility',
        'instructors',
        'pre_footer_cta'
    ];

    protected $casts = [
        'features' => 'array',
        'faqs' => 'array',
        'curriculum' => 'array',
        'who_should_take' => 'array',
        'impact_stats' => 'array',
        'hiring_companies' => 'array',
        'roadmap_steps' => 'array',
        'learning_experience' => 'array',
        'section_visibility' => 'array',
        'instructors' => 'array',
        'pre_footer_cta' => 'array',
        'price' => 'float',
        'original_price' => 'float',
        'rating' => 'float',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function schedules()
    {
        return $this->hasMany(Schedule::class);
    }
}
