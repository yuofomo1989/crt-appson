<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmailLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_type',
        'recipient_email',
        'recipient_name',
        'subject',
        'content_preview',
        'status',
        'error_message',
        'admin_notified',
        'admin_email',
        'sent_at'
    ];

    protected $casts = [
        'admin_notified' => 'boolean',
        'sent_at' => 'datetime'
    ];
}
