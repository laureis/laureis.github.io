<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGenresTable extends Migration
{
  /**
     * Run the migrations.
     *
     * @return void
     */
  public function up()
  {
    Schema::create('genre', function (Blueprint $table) {
      $table->engine = 'InnoDB';
      $table->unsignedBigInteger('genre_id_genre', 255);
      $table->string('genre_name_genre', 255);
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
    Schema::dropIfExists('genre');
    DB::statement('SET FOREIGN_KEY_CHECKS = 1');
  }
}
