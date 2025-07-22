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
        Schema::create('pickup_stations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('collation_center_id');
            $table->string('name');
            $table->text('location');
            $table->longText('note')->nullable();
            $table->text('city')->nullable();
            $table->integer('country_id')->nullable();
            $table->string('status')->default('active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pickup_stations');
    }
};
