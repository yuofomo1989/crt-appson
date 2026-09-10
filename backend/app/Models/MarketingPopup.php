<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MarketingPopup extends Model
{
    use HasFactory;

    protected $table = 'marketing_popups';

    protected $fillable = [
        'name',
        'title',
        'subtitle',
        'coupon_code',
        'cta_text',
        'trigger_type',
        'delay_seconds',
        'target_type',
        'target_course_ids',
        'target_category_names',
        'theme_color',
        'banner_image',
        'status'
    ];
}
