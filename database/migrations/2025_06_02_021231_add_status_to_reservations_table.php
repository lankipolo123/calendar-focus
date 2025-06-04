<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  public function up()
{
    if (!Schema::hasColumn('reservations', 'status')) {
        Schema::table('reservations', function (Blueprint $table) {
            $table->enum('status', ['active', 'expired'])->default('active');
        });
    }
}

 
};
