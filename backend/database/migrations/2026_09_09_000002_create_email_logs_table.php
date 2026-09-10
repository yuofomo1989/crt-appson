<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (!Schema::hasTable('email_logs')) {
            Schema::create('email_logs', function (Blueprint $table) {
                $table->id();
                $table->string('event_type', 50)->index(); // student_registration, ticket_created, order_invoice, website_inquiry, consultation_booking, test_email
                $table->string('recipient_email', 255)->index();
                $table->string('recipient_name', 255)->nullable();
                $table->string('subject', 255);
                $table->text('content_preview')->nullable();
                $table->string('status', 20)->default('sent'); // sent, failed
                $table->text('error_message')->nullable();
                $table->boolean('admin_notified')->default(false);
                $table->string('admin_email', 255)->nullable();
                $table->timestamp('sent_at')->nullable();
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('email_logs');
    }
};
