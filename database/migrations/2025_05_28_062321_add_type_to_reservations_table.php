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
    Schema::table('reservations', function (Blueprint $table) {
        $table->string('type')->default('day'); // e.g., 'day', 'half-day'
    });
}

public function down(): void
{
    Schema::table('reservations', function (Blueprint $table) {
        $table->dropColumn('type');
    });
}

};
