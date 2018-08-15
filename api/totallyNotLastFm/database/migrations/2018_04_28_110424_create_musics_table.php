<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMusicsTable extends Migration
{
  /**
     * Run the migrations.
     *
     * @return void
     */
  public function up()
  {
    Schema::create('music', function (Blueprint $table) {
      $table->engine = 'InnoDB';
      $table->bigIncrements('music_id_music');
      $table->string('music_title', 255);
      $table->time('music_duration');
      $table->dateTime('music_release_date');
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
    Schema::dropIfExists('music');
    DB::statement('SET FOREIGN_KEY_CHECKS = 1');
  }
}
