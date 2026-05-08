<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cheque_guarantees', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cheque_id')->constrained()->cascadeOnDelete();
            $table->foreignId('account_id')->constrained()->restrictOnDelete();
            $table->foreignId('issuer_id')->constrained('users')->restrictOnDelete();
            $table->string('public_reference')->unique();
            $table->string('verification_code_hash', 128)->unique();
            $table->decimal('cheque_amount', 15, 2);
            $table->decimal('verifiable_amount', 15, 2);
            $table->string('payable_to')->nullable();
            $table->date('cheque_date')->nullable();
            $table->boolean('verification_enabled')->default(true);
            $table->enum('status', ['active', 'disabled', 'expired', 'cancelled'])->default('active');
            $table->timestamp('code_expires_at')->nullable();
            $table->timestamp('last_verified_at')->nullable();
            $table->timestamps();

            $table->index(['issuer_id', 'status']);
            $table->index(['account_id', 'status']);
            $table->index('code_expires_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cheque_guarantees');
    }
};
