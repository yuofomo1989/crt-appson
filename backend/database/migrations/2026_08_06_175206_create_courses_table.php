<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->nullable()->constrained()->nullOnDelete();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('category_name')->default('Project Management');
            $table->string('level')->default('Intermediate');
            $table->decimal('rating', 3, 2)->default(4.9);
            $table->integer('reviews_count')->default(120);
            $table->string('duration')->default('4 Days (35 Contact Hours)');
            $table->string('next_date')->nullable();
            $table->decimal('price', 10, 2)->default(1095.00);
            $table->decimal('original_price', 10, 2)->default(1495.00);
            $table->string('badge')->nullable();
            $table->string('image')->nullable();
            $table->text('description')->nullable();
            $table->json('features')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
