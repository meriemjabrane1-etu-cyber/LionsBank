<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('credit_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('tracking_code')->unique();
            $table->string('status')->default('ai_verification_in_progress');
            $table->string('credit_type');
            $table->decimal('amount', 14, 2);
            $table->unsignedSmallInteger('duration_months');
            $table->string('purpose');
            $table->string('employment_status');
            $table->decimal('monthly_income', 14, 2)->nullable();
            $table->string('full_name');
            $table->string('cin_number');
            $table->string('phone');
            $table->string('email');
            $table->text('notes')->nullable();
            $table->json('ai_summary')->nullable();
            $table->timestamp('submitted_at')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'status']);
            $table->index('tracking_code');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('credit_requests');
    }
};
