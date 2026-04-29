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
        Schema::create('agencies', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->enum('product_type', ['car', 'gold', 'house', 'other']);
            $table->text('description');
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->decimal('starting_price', 15, 2);
            $table->decimal('current_price', 15, 2)->nullable();
            $table->enum('status', ['upcoming', 'live', 'ended']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('agencies');
    }
};
