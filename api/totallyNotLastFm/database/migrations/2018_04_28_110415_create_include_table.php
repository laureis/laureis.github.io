<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateIncludeTable extends Migration
{
  /**
     * Run the migrations.
     *
     * @return void
     */
  public function up()
  {
    Schema::create('include', function (Blueprint $table) {
      $table->engine = 'InnoDB';
      $table->bigIncrements('include_id');
      $table->unsignedInteger('album_id_album');
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
    Schema::dropIfExists('include');
    DB::statement('SET FOREIGN_KEY_CHECKS = 1');
  }
}
