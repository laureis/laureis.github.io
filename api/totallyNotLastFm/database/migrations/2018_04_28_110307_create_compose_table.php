<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateComposeTable extends Migration
{
  /**
     * Run the migrations.
     *
     * @return void
     */
  public function up()
  {
    Schema::create('compose', function (Blueprint $table) {
      $table->engine = 'InnoDB';
      $table->unsignedInteger('artist_id_artist');
      $table->unsignedBigInteger('music_id_music');
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
    Schema::dropIfExists('compose');
    DB::statement('SET FOREIGN_KEY_CHECKS = 1');
  }
}
