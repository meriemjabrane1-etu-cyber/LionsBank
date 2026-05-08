<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cheque_verification_attempts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cheque_guarantee_id')->nullable()->constrained()->nullOnDelete();
            $table->string('code_fingerprint', 128)->index();
            $table->enum('result', ['success', 'expired', 'invalid', 'disabled', 'rate_limited']);
            $table->ipAddress('ip_address')->nullable();
            $table->string('user_agent', 500)->nullable();
            $table->boolean('suspicious')->default(false);
            $table->json('metadata')->nullable();
            $table->timestamps();

            $table->index(['ip_address', 'created_at']);
            $table->index(['result', 'created_at']);
            $table->index(['suspicious', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cheque_verification_attempts');
    }
};
