<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('instructors')) {
            Schema::create('instructors', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('certs')->nullable();
                $table->string('exp_years')->default('10+ Yrs Exp');
                $table->decimal('rating', 3, 2)->default(4.9);
                $table->integer('students_count')->default(250);
                $table->text('bio')->nullable();
                $table->string('image_url')->nullable();
                $table->json('assigned_course_ids')->nullable();
                $table->string('status')->default('active');
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('instructors');
    }
};
