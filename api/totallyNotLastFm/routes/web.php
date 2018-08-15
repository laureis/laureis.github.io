<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $app->version();
});

/*
$router->get('/user/{name}', function ($name) {
    return $name;
});

*/



/*-----------------------------Albums--------------------------------*/
Route::group([
  'prefix'=> 'albums'
],function($router){
  Route::get('all','AlbumController@getAllAlbums');
  Route::post('create','AlbumController@createAlbum');
  Route::get('get/{album_id_album}','AlbumController@getAlbum');

  Route::put('update/{album_id_album}','AlbumController@updateAlbum');
  Route::delete('delete/{album_id_album}','AlbumController@deleteAlbum');

  Route::get('allMostListened','AlbumController@getAlbumsMostListened');
  Route::get('userMostListened/{id}','AlbumController@getAlbumsMostListenedByUser');
  Route::get('artistMostListened/{artist_id}','AlbumController@getAlbumsMostListenedOfArtist');
  Route::get('userMostListenedArtist/{artist_id}/{id}','AlbumController@getAlbumsMostListenedOfArtistByUser');
  Route::get('suggestion/{genre_id}','AlbumController@suggestAlbumsOfGenre');
  Route::get('listeningDuration/{album_id_album}/{id}', 'AlbumController@getListeningDurationOfAlbumByUser');

});

/* GetAllAlbums
 * return all the albums
 */


/* CreateAlbum
Rules:
  $rules = [
        'album_title_album' => 'required',
        'album_nb_tracks' => 'required|numeric'
    ];
*/

 /* GetAlbum
 * return a specific album
 */

/* UpdateAlbum
* return modified album
Rules:
	$rules = [
        'album_title_album' => 'required',
        'album_nb_tracks' => 'required|numeric'
    ];
*/

/* DeleteAlbum
*/

/* Get the albums the most listened by all users
* return array of albums
*/

/* Get the albums the most listened by a specific user
* return array of albums
*/

/* Get the albums the most listened of a specific artist by all users
* return array of albums
*/

/* Get the albums the most listened of a specific artist by a specific user
* return array of albums
*/

/* Suggestions of albums of a specific genre
* return array of albums
*/


/*-----------------------------Artists--------------------------------*/
/* GetAllArtists
 * return all the artists
 */

Route::group([
  'prefix'=> 'artist'
],function($router){
  Route::get('all','ArtistController@getAllArtists');
  Route::post('create','ArtistController@createArtist');
  Route::get('get/{artist_id}','ArtistController@getArtist');
  Route::put('update/{artist_id}','ArtistController@updateArtist');
  Route::delete('delete/{artist_id}','ArtistController@deleteArtist');
  Route::get('artistListAlbum/{artist_id}','ArtistController@getAlbumListOfArtist');
  Route::get('mostListened','ArtistController@getArtistsMostListened');
  Route::get('userMostListened/{id}','ArtistController@getArtistsMostListenedByUser');
  Route::get('genreMostListened/{genre_id_genre}','ArtistController@getArtistsMostListenedOfGenre');
  Route::get('suggestions/{genre_id_genre}','ArtistController@suggestArtistsOfGenre');
  Route::get('season/{$artist_id}/{$id_season}/{$id}', 'ArtistController@getListeningDurationOfArtistBySeasonByUser');
});


/* CreateArtist
Rules:
  $rules = [
        'artist_name' => 'required',
        'artist_birth_year' => 'required|date',
        'artist_death_year' => 'required|date', OR NULL
    ];
*/

 /* GetArtist
 * return a specific artist */

/* UpdateArtist
* return modified artist
Rules:
	 $rules = [
        'artist_name' => 'required',
        'artist_birth_year' => 'required|numeric',
        'artist_death_year' => 'required|numeric', OR NULL
    ];
*/


/* DeleteArtist
*/


/* Suggestions of artists of a specific genre
* return array of artists
*/



///*-----------------------------Genres--------------------------------*/

Route::group([
  'prefix'=> 'genre'
],function($router){
  Route::get('all','GenreController@getAllGenres');
  Route::post('create','GenreController@createGenre');
  Route::get('get/{genre_id_genre}','GenreController@getGenre');
  Route::put('update/{genre_id_genre}','GenreController@updateGenre');
  Route::delete('delete/{genre_id_genre}','GenreController@deleteGenre');

  Route::get('mostListened','GenreController@getGenresMostListened');
  Route::get('userMostListened/{id}','GenreController@getGenresMostListenedByUser');

});
/* GetAllGenres
 * return all the genres
 */

/* CreateGenre
Rules:
    $rules = [
        'genre_name_genre' => 'required|alpha'
    ];
*/

/* GetGenre
* return a specific genre */

/* UpdateGenre
* return modified genre
Rules:
	$rules = [
        'genre_name_genre' => 'required|alpha'
    ];
*/

/* DeleteGenre */

/* Get the genres the most listened by all users
* return array of genres
*/

/* Get the genres the most listened by a specific user
* return array of genres
*/

/*-----------------------------Histories--------------------------------*/

Route::group([
  'prefix'=> 'history'
],function($router){
  Route::get('all','HistoryController@getAllHistories');
  Route::post('create','HistoryController@createHistory');
  Route::get('get/{history_id_history}','HistoryController@getHistory');
  Route::put('update/{history_id_history}','HistoryController@updateHistory');
  Route::delete('delete/{history_id_history}','HistoryController@deleteHistory');
  Route::get('playtime/{id}','HistoryController@gethistoryPlaytime');
  Route::get('listeningPeriods/{id}','HistoryController@getListeningPeriodsOfUser');
});
/* GetAllHistories
 * return all the histories
 */

/* CreateHistory
Rules:
    $rules = [
        'history_play_time' => 'required|time',
        'user_id_user' => 'required|numeric'
    ];
*/

/* GetHistory
* return a specific history */

/* UpdateHistory
* return modified history
Rules:
	$rules = [
        'history_play_time' => 'required|time',
        'user_id_user' => 'required|numeric'
    ];
*/

/* DeleteHistory
*/


/*-----------------------------Musics--------------------------------*/
Route::group([
  'prefix'=> 'music'
],function($router){
  Route::get('all','MusicController@getAllMusics');
  Route::post('create','MusicController@createMusic'); //To fix validate doesn't exist
  Route::get('get/{music_id_music}','MusicController@getMusic');
  Route::put('update/{music_id_music}','MusicController@updateMusic');
  Route::delete('delete/{music_id_music}','MusicController@deleteMusic');
  Route::get('userNbListeningMusic/{music_id_music}/{id}','MusicController@getNbListeningMusic');
  Route::get('tracklistMusicAlbum/{id_album}','MusicController@getTrackListofAlbum');
  Route::get('mostListened','MusicController@getMusicsMostListened');
  Route::get('userMostListened/{id}','MusicController@getMusicsMostListenedByUser');
  Route::get('artistAllMostListened/{artist_id}','MusicController@getMusicsMostListenedOfArtist');
  Route::get('mostListenedOfArtistByUser/{artist_id}/{id}','MusicController@getMusicsMostListenedOfArtistByUser');
  Route::get('nbListeningByYear/{id}', 'MusicController@getNbListeningMusicByYearByUser');
});

/* GetAllMusics
 * return all the musics
 */

/* CreateMusic
Rules:
    $rules = [
        'music_title' => 'required',
        'music_duration' => 'required|time',
       'music_release_date' => 'required|date'
    ];
*/

 /* GetMusic
 * return a specific music */

/* UpdateMusic
* return modified music
Rules:
    $rules = [
        'music_title' => 'required',
        'music_duration' => 'required|time',
        'music_release_date' => 'required|date'
   ];
*/


/* DeleteMusic
*/

/* Get number of listening of one music by a specific user
* return number of listening
*/

/* Get the list of all music titles of one Album
* return array of musics
*/

/* Get the musics the most listened by all users
* return array of musics
*/

/* Get the musics the most listened by a specific user
* return array of musics
*/

/* Get the musics the most listened of a specific artist by all users
* return array of musics
*/

/* Get the musics the most listened of a specific artist by a specific user
* return array of musics
*/


/*-----------------------------Nationalities--------------------------------*/
Route::group([
  'prefix'=> 'nationality'
],function($router){
  Route::get('all','NationalityController@getAllNationalities');
  Route::post('create','NationalityController@createNationality');
  Route::get('get/{nationality_id_nationality}','NationalityController@getNationality');
  Route::put('update/{nationality_id_nationality}','NationalityController@updateNationality');
  Route::delete('delete/{nationality_id_nationality}','NationalityController@deleteNationality');

});
/* GetAllNationalities
 * return all the nationaloties
 */

/* CreateNationality
Rules:
    $rules = [
        'nationality_code' => 'required|alpha'
    ];
*/

 /* GetNationality
 * return a specific nationality */

/* UpdateNationality
* return modified nationality
Rules:
    $rules = [
        'nationality_code' => 'required|alpha'
    ];
*/

/* DeleteNationality
*/



/*-----------------------------Playlists--------------------------------*/
Route::group([
  'prefix'=> 'playlist'
],function($router){
  Route::get('all','PlaylistController@getAllPlaylists');
  Route::post('create','PlaylistController@createPlaylist');  // Pb bc foreign keys
  Route::get('get/{playlist_id_playlist}','PlaylistController@getPlaylist');
  Route::put('update/{playlist_id_playlist}','PlaylistController@updatePlaylist');
  Route::delete('delete/{playlist_id_playlist}','PlaylistController@deletePlaylist');

});
/* GetAllPlaylists
 * return all the playlists
 */

/* CreatePlaylist
Rules:
    $rules = [
        'playlist_name' => 'required',
        'playlist_description' => 'required',
        'user_id_user' => 'required|numeric'
    ];
*/

 /* GetPlaylist
 * return a specific playlist */

/* UpdatePlaylist
* return modified playlist
Rules:
    $rules = [
        'playlist_name' => 'required',
        'playlist_description' => 'required',
        'user_id_user' => 'required|numeric'
    ];
*/

/* DeletePlaylist
*/


/*-----------------------------Spotify--------------------------------*/
Route::group([
  'prefix'=> 'spotify'
],function($router){
  Route::get('all','SpotifyController@getAllSpotify');
  Route::post('create','SpotifyController@createSpotify');
  Route::get('get/{spotify_id_spotify}','SpotifyController@getSpotify');
  Route::put('update/{spotify_id_spotify}','SpotifyController@updateSpotify');
  Route::delete('delete/{spotify_id_spotify}','SpotifyController@deleteSpotify');

});
/* GetAllSpotify
 * return all the spotify
 */

/* CreateSpotify
Rules:
    $rules = [
        'spotify_our_id' => 'required|numeric',
        'user_id_user' => 'required|numeric'
    ];
*/
//$router->post('/spotify', 'SpotifyController@createSpotify');

 /* GetSpotify
 * return a specific spotify */

/* UpdateSpotify
* return modified spotify
Rules:
    $rules = [
        'spotify_our_id' => 'required|numeric',
        'user_id_user' => 'required|numeric'
    ];
*/

/* DeleteSpotify
*/



///*-----------------------------Users--------------------------------*/
Route::group([
  'prefix'=> 'user'
],function($router){
  Route::get('all','UserController@getAllUsers');
  Route::post('create','UserController@createUser');
  Route::get('get/{id}','UserController@getUser');
  Route::put('update/{id}','UserController@updateUser');
  Route::put('name/{id}','UserController@changeUserName');
  Route::put('password/{id}','UserController@changeUserPassword');
  Route::put('email/{id}','UserController@changeUserEmail');
  Route::delete('delete/{id}','UserController@deleteUser');
  Route::post('mailExist', 'UserController@mailExist');
});
/* GetAllUsers
 * return all the users
 */

/* CreateUser
Rules:
    $rules = [
        'user_username' => 'required',
        'user_birthday' => 'required|date',
        'user_mail' => 'required|email',
       'user_password' => 'required|min:6'
    ];
*/

 /* GetUser
 * return a specific user*/

/* UpdateUser
* return modified user
Rules:
    $rules = [
        'user_username' => 'required',
        'user_birthday' => 'required|date',
        'user_mail' => 'required|email',
        'user_password' => 'required|min:6'
    ];
*/

/* DeleteUser
*/


/*$router->group(['prefix' => 'auth'], function($router) {
	$router->post('/login', 'AuthController@login');
	$router->post('/logout', 'AuthController@logout');
});*/

Route::group([
    'prefix' => 'auth'

], function ($router) {
    Route::post('login', 'AuthController@login');
    Route::get('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::get('me', 'AuthController@me');

});
