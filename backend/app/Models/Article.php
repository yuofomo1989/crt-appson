<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'category_name',
        'title',
        'slug',
        'author',
        'image',
        'description',
        'tags',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'read_time',
        'course_id',
        'views',
        'is_featured'
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'views' => 'integer'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
