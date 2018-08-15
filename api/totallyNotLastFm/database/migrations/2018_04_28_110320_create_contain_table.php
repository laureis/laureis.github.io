<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContainTable extends Migration
{
  /**
     * Run the migrations.
     *
     * @return void
     */
  public function up()
  {
    Schema::create('contain', function (Blueprint $table) {
      $table->engine = 'InnoDB';
      $table->unsignedBigInteger('music_id_music');
      $table->unsignedInteger('history_id_history');
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
    Schema::dropIfExists('contain');
    DB::statement('SET FOREIGN_KEY_CHECKS = 1');
  }
}
