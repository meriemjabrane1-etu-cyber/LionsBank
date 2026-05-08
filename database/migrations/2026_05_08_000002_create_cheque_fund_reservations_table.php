<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cheque_fund_reservations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cheque_guarantee_id')->constrained()->cascadeOnDelete();
            $table->foreignId('account_id')->constrained()->restrictOnDelete();
            $table->decimal('amount', 15, 2);
            $table->enum('status', ['active', 'released', 'expired', 'cancelled'])->default('active');
            $table->timestamp('reserved_at');
            $table->timestamp('expires_at');
            $table->timestamp('released_at')->nullable();
            $table->string('release_reason')->nullable();
            $table->timestamps();

            $table->index(['account_id', 'status', 'expires_at']);
            $table->index(['cheque_guarantee_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cheque_fund_reservations');
    }
};
