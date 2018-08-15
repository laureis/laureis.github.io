<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBeTable extends Migration
{
  /**
     * Run the migrations.
     *
     * @return void
     */
  public function up()
  {
    Schema::create('be', function (Blueprint $table) {
      $table->engine = 'InnoDB';
      $table->unsignedBigInteger('genre_id_genre');
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
    Schema::dropIfExists('be');
    DB::statement('SET FOREIGN_KEY_CHECKS = 1');
  }
}
