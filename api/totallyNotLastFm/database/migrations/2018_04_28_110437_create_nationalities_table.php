<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNationalitiesTable extends Migration
{
  /**
     * Run the migrations.
     *
     * @return void
     */
  public function up()
  {
    Schema::create('nationalities', function (Blueprint $table) {
      $table->engine = 'InnoDB';
      $table->increments('nationality_id_nationality');
      $table->char('nationality_code', 255);
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
    Schema::dropIfExists('nationalities');
    DB::statement('SET FOREIGN_KEY_CHECKS = 1');
  }
}
