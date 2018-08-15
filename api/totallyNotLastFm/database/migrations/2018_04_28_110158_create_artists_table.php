<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateArtistsTable extends Migration
{
  /**
     * Run the migrations.
     *
     * @return void
     */
  public function up()
  {
    Schema::create('artists', function (Blueprint $table) {
      $table->engine = 'InnoDB';
      $table->increments('artist_id');
      $table->char('artist_name',255);
      $table->date('artist_birth_year');
      $table->date('artist_death_year');
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
    Schema::dropIfExists('artists');
    DB::statement('SET FOREIGN_KEY_CHECKS = 1');
  }
}
