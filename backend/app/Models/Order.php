<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_number',
        'user_id',
        'customer_name',
        'customer_email',
        'customer_phone',
        'company_name',
        'address',
        'city',
        'state',
        'country',
        'zip_code',
        'total_amount',
        'subtotal',
        'discount_amount',
        'coupon_code',
        'payment_status',
        'payment_method',
        'transaction_id',
        'status'
    ];

    protected $casts = [
        'total_amount' => 'float'
    ];

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
