<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHoldTable extends Migration
{
  /**
     * Run the migrations.
     *
     * @return void
     */
  public function up()
  {
    Schema::create('hold', function (Blueprint $table) {
      $table->engine = 'InnoDB';
      $table->unsignedInteger('nationality_id_nationality');
      $table->unsignedInteger('artist_id_artist');
      $table->nullableTimestamps();
    });
  }

  /**
     * Reverse the migrations.
     *
     * @return void
     */
  public function down()
  {
    DB::statement('SET FOREIGN_KEY_CHECKS = 0');
    Schema::dropIfExists('hold');
    DB::statement('SET FOREIGN_KEY_CHECKS = 1');
  }
}
