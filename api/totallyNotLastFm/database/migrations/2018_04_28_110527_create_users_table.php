<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
  /**
     * Run the migrations.
     *
     * @return void
     */

  public function up()
  {
    Schema::create('user', function (Blueprint $table) {
      $table->engine = 'InnoDB';
      $table->bigIncrements('id');
      $table->string('email');
      $table->string('username');
      $table->string('password');
      $table->date('user_birthday');
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
    Schema::dropIfExists('user');
    DB::statement('SET FOREIGN_KEY_CHECKS = 1');
  }
}
