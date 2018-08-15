<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSpotifyTable extends Migration
{
  /**
     * Run the migrations.
     *
     * @return void
     */
  public function up()
  {
    Schema::create('spotify', function (Blueprint $table) {
      $table->engine = 'InnoDB';
      $table->increments('spotify_user_id');
      $table->unsignedBigInteger('user_id_user');
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
    Schema::dropIfExists('spotify');
    DB::statement('SET FOREIGN_KEY_CHECKS = 1');
  }
}
