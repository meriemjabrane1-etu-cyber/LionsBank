<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('credit_request_documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('credit_request_id')->constrained()->cascadeOnDelete();
            $table->string('document_type');
            $table->string('label');
            $table->string('disk')->default('local');
            $table->string('path');
            $table->string('original_name');
            $table->string('mime_type');
            $table->unsignedBigInteger('size');
            $table->string('verification_status')->default('pending');
            $table->unsignedTinyInteger('confidence')->default(0);
            $table->json('ai_feedback')->nullable();
            $table->timestamp('verified_at')->nullable();
            $table->timestamps();

            $table->unique(['credit_request_id', 'document_type']);
            $table->index(['verification_status', 'document_type']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('credit_request_documents');
    }
};
