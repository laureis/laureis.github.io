<?php

use Illuminate\Support\Facades\Hash;
/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

$factory->define(App\Album::class, function (Faker\Generator $faker) {
  return [
    'album_title_album' => $faker->text,
    'album_nb_tracks' => mt_rand(5,15),
    'album_updated_at'=> $faker->date("Y-m-d",mt_rand(1262055681,1262455681)),
    'album_created_at'=> $faker->date("Y-m-d",mt_rand(1262055681,1262455681))
  ];
});

$factory->define(App\Artist::class, function(Faker\Generator $faker){
  return [
    'artist_name' => $faker->name,
    'artist_birth_year' => date("Y-m-d",mt_rand(1262055681,1262455681)),
    'artist_death_year' => 'NULL'
  ];
});
$factory->define(App\Be::class, function(Faker\Generator $faker){
  return [
    'genre_id_genre' => $faker->randomDigit,
    'music_id_music' => $faker->randomDigit
  ];
});

$factory->define(App\Belong::class, function(Faker\Generator $faker){
  return [
    'playlist_id_playlist' => $faker->randomDigit,
    'music_id_music' => $faker->randomDigit
  ];
});
$factory->define(App\Compose::class, function(Faker\Generator $faker){
  return [
    'artist_id_artist' => $faker->randomDigit,
    'music_id_music' => $faker->randomDigit
  ];
});

$factory->define(App\Contain::class, function(Faker\Generator $faker){
  return [
    'music_id_music' => $faker->randomDigit,
    'history_id_history' => $faker->randomDigit
  ];
});


$factory->define(App\Genre::class, function(Faker\Generator $faker){
  return [
    'genre_name_genre' => $faker->name
  ];
});

$factory->define(App\History::class, function(Faker\Generator $faker){
  return [
    'user_id_user' => $faker->randomDigit,
    'history_play_time' => $faker->time()
  ];
});

$factory->define(App\Hold::class, function(Faker\Generator $faker){
  return [
    'nationality_id_nationality' => $faker->randomDigit,
    'artist_id_artist' => $faker->randomDigit 
  ];
});

$factory->define(App\Includes::class, function(Faker\Generator $faker){
  return [
    'album_id_album' => $faker->randomDigit,
    'music_id_music' => $faker->randomDigit 
  ];
});

$factory->define(App\Music::class, function(Faker\Generator $faker){
  return [
    'music_title' => $faker->title,
    'music_duration' => '04:50',
    'music_release_date' => date("Y-m-d",mt_rand(1262055681,1262455681)),
  ];
});

$factory->define(App\Nationality::class, function(Faker\Generator $faker){
  return [
    'nationality_code' => 'FR',
  ];
});

$factory->define(App\Playlist::class, function(Faker\Generator $faker){
  return [
    'playlist_description' => $faker->name,
    'user_id_user' => $faker->randomDigit,
    'playlist_name'=>$faker->name
    ];
});

$factory->define(App\Produce::class, function(Faker\Generator $faker){
  return [
    'artist_id_artist' => $faker->randomDigit,
    'album_id_album' => $faker->randomDigit 
    ];
});

$factory->define(App\Spotify::class, function(Faker\Generator $faker){
  return [
    'user_id_user' => $faker->randomDigit
  ];
});

$factory->define(App\User::class, function(Faker\Generator $faker){
  return [
    'email' => $faker->email,
    'username' => $faker->name,
    'password' => Hash::make('12345'),
  ];
});
