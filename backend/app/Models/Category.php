<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug', 'description', 'image', 'bg_image', 'display_order', 'is_featured', 'avg_salary', 'badge_text'];

    public function courses()
    {
        return $this->hasMany(Course::class);
    }
}
