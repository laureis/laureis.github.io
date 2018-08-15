<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePlaylistsTable extends Migration
{
  /**
     * Run the migrations.
     *
     * @return void
     */
  public function up()
  {
    Schema::create('playlist', function (Blueprint $table) {
      $table->engine = 'InnoDB';
      $table->increments('playlist_id_playlist');
      $table->unsignedBigInteger('user_id_user');
      $table->string('playlist_description');
      $table->string('playlist_name');
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
    Schema::dropIfExists('playlist');
    DB::statement('SET FOREIGN_KEY_CHECKS = 1');
  }
}
