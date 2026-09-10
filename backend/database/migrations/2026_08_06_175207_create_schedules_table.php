<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->nullable()->constrained()->nullOnDelete();
            $table->string('course_title');
            $table->string('country')->default('United States');
            $table->string('city')->default('New York, NY');
            $table->string('format')->default('Live Online'); // Live Online, In-Person, Self-Paced
            $table->string('batch_date'); // May 27
            $table->string('day'); // Mon
            $table->string('date_range'); // May 27 – May 30, 2026
            $table->string('label'); // Mon - Thu
            $table->string('time')->default('9:00 AM – 5:00 PM');
            $table->string('duration')->default('4 Days');
            $table->string('contact_hours')->default('35');
            $table->string('location')->nullable();
            $table->decimal('price', 10, 2)->default(1095.00);
            $table->integer('seats_left')->default(8);
            $table->string('status')->default('Open');
            $table->boolean('is_alert')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('schedules');
    }
};
