<?php

use Illuminate\Database\Seeder;
use App\Album;
use App\Artist;
use App\Genre;
use App\History;
use App\Music;
use App\Nationality;
use App\Playlist;
use App\Spotify;
use App\User;

class DatabaseSeeder extends Seeder
{
  /**
     * Run the database seeds.
     *
     * @return void
     */
  public function run()
  {
    // $this->call('UsersTableSeeder');
    DB::statement('SET FOREIGN_KEY_CHECKS = 0');

    factory(App\Album::class,150)->create();
    factory(App\Artist::class,150)->create();
    factory(App\Be::class,150)->create();
    factory(App\Belong::class,150)->create();
    factory(App\Compose::class,150)->create();
    factory(App\Contain::class,150)->create();
    factory(App\Genre::class,150)->create();
    factory(App\History::class,150)->create();
    factory(App\Hold::class,150)->create();
    factory(App\Includes::class,150)->create();
    factory(App\Music::class,150)->create();
    factory(App\Nationality::class,150)->create();
    factory(App\Playlist::class,150)->create();
    factory(App\Produce::class,150)->create();
    factory(App\Spotify::class,150)->create();
    factory(App\User::class,150)->create();

    DB::statement('SET FOREIGN_KEY_CHECKS = 1');
  }
}
