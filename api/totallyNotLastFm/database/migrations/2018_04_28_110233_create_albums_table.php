<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAlbumsTable extends Migration
{
  /**
     * Run the migrations.
     *
     * @return void
     */
  public function up()
  {
    Schema::create('albums', function (Blueprint $table) {
      $table->engine = 'InnoDB';
      
      $table->increments('album_id_album');
      $table->string('album_title_album', 255);
      $table->integer('album_nb_tracks');
      $table->date('album_updated_at');
      $table->date('album_created_at');
      
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
    Schema::dropIfExists('albums');
    DB::statement('SET FOREIGN_KEY_CHECKS = 1');
  }
}
