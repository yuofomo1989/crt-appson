<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupportTicket extends Model
{
    use HasFactory;

    protected $table = 'support_tickets';

    protected $fillable = [
        'ticket_number',
        'user_id',
        'name',
        'email',
        'phone',
        'request_type',
        'related_to',
        'subject',
        'description',
        'attachment_url',
        'source_path',
        'priority',
        'status',
        'admin_notes',
        'messages'
    ];

    protected $casts = [
        'messages' => 'array'
    ];
}
