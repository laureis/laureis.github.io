<?php

namespace App\Http\Controllers;

use App\Album;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AlbumController extends Controller{
  /*
	//Constructor
	public function __construct(){
		$this->middleware('oauth', ['except' => ['getAllAlbums', 'getAlbum']]);
		$this->middleware('authorize:' . __CLASS__, ['except' => ['getAllAlbums', 'getAlbum', 'createAlbum']]);
	}
	*/

  /*----------------------------Basic functions--------------------------*/

  //get All Albums
  public function getAllAlbums(){
    $albums = Album::all();

    return response()->json(['data' => $albums], 200);

  }

  //create Album
  public function createAlbum(Request $request){
    $this->validateRequestAlbum($request);

    $albums = Album::create([
      'album_title_album' => $request->get('album_title_album'),
      'album_nb_tracks' => $request->get('album_nb_tracks')
    ]);

    return response()->json(['data' => "The album with id {$albums->album_id_album} has been created"], 201);
  }

  //get Album
  public function getAlbum($id){
    $albums = DB::table('albums')
      ->where('album_id_album', '=', $id)
      ->get();

    if(!$albums)
      return response()->json(['message' => "The album with id {$id} doesn't exist"], 404);

    return response()->json(['data' => $albums], 200);
  }

  //update Album
  public function updateAlbum(Request $request, $id){
    $nbAlbums = DB::table('albums')->max('album_id_album');

    if($id > $nbAlbums || $id < 0 )
      return response()->json(['data' => "The album with id $id doesn't exist"],200);

    $albums = DB::table('albums')
      ->where('album_id_album', '=', $id)
      ->update([
        'album_title_album'=>$request->input('album_title_album'),
        'album_nb_tracks'=>$request->input('album_nb_tracks')

      ]);

    return response()->json(['data' => "The album with id $id has been updated"], 200);
  }

  //delete Album
  public function deleteAlbum($id){
    $nbAlbums = DB::table('albums')->max('album_id_album');

    if($id > $nbAlbums || $id < 0 )
      return response()->json(['data' => "The album with id $id doesn't exist"],200);

    $albums = DB::table('albums')
      ->where('album_id_album', '=', $id)
      ->delete();

    return response()->json(['data' => "The album with id {$id} has been deleted"], 200);
  }

  /*----------------------------Stats functions--------------------------*/

  //Get the albums the most listened by all users
  public function getAlbumsMostListened(){
    $albums = DB::table('user')
      ->join('histories', 'user.id', '=', 'histories.user_id_user')
      ->join('contain', 'histories.history_id_history', '=', 'contain.history_id_history')
      ->join('music', 'contain.music_id_music', '=', 'music.music_id_music')
      ->join('include', 'music.music_id_music', '=', 'include.music_id_music')
      ->join('albums', 'include.album_id_album', '=', 'albums.album_id_album')
      ->select(DB::raw('count(albums.album_id_album) as nbListening'), 'albums.album_title_album')
      ->groupBy('albums.album_id_album')
      ->orderBy('nbListening','DESC')
      ->get();

    return $this->success($albums, 200);
  }

  //Get the albums the most listened by a specific user
  public function getAlbumsMostListenedByUser($id_user){
    $albums = DB::table('user')
      ->join('histories', 'user.id', '=', 'histories.user_id_user')
      ->join('contain', 'histories.history_id_history', '=', 'contain.history_id_history')
      ->join('music', 'contain.music_id_music', '=', 'music.music_id_music')
      ->join('include', 'music.music_id_music', '=', 'include.music_id_music')
      ->join('albums', 'include.album_id_album', '=', 'albums.album_id_album')
      ->select(DB::raw('count(albums.album_id_album) as nbListening'),'user.username', 'user.id')
      ->where('user.id', '=', $id_user)
      ->groupBy('albums.album_id_album')
      ->orderBy('nbListening','DESC')
      ->get();

    return $this->success($albums, 200);
  }

  //Get the albums the most listened of a specific artist by all users
  public function getAlbumsMostListenedOfArtist($id_artist){
    $albums = DB::table('user')
      ->join('histories', 'user.id', '=', 'histories.user_id_user')
      ->join('contain', 'histories.history_id_history', '=', 'contain.history_id_history')
      ->join('music', 'contain.music_id_music', '=', 'music.music_id_music')
      ->join('include', 'music.music_id_music', '=', 'include.music_id_music')
      ->join('albums', 'include.album_id_album', '=', 'albums.album_id_album')
      ->join('produce', 'albums.album_id_album', '=', 'produce.album_id_album')
      ->join('artists', 'produce.artist_id_artist', '=', 'artists.artist_id')
      ->select(DB::raw('count(albums.album_id_album) as nbListening'), 'artists.artist_name', 'albums.album_title_album')
      ->where('artists.artist_id', '=', $id_artist)
      ->groupBy('albums.album_id_album')
      ->orderBy('nbListening', 'DESC')
      ->get();

    return $this->success($albums, 200);
  }

  //Get the albums the most listened of a specific artist by a specific user
  public function getAlbumsMostListenedOfArtistByUser($id_artist, $id_user){
    $albums = DB::table('user')
      ->join('histories', 'user.id', '=', 'histories.user_id_user')
      ->join('contain', 'histories.history_id_history', '=', 'contain.history_id_history')
      ->join('music', 'contain.music_id_music', '=', 'music.music_id_music')
      ->join('include', 'music.music_id_music', '=', 'include.music_id_music')
      ->join('albums', 'include.album_id_album', '=', 'albums.album_id_album')
      ->join('produce', 'albums.album_id_album', '=', 'produce.album_id_album')
      ->join('artists', 'produce.artist_id_artist', '=', 'artists.artist_id')
      ->select(DB::raw('count(albums.album_id_album) as nbListening'), 'artists.artist_name', 'albums.album_title_album')
      ->where([
        ['artists.artist_id', '=', $id_artist],
        ['user.id', '=', $id_user]
      ])
      ->groupBy('albums.album_id_album')
      ->orderBy('nbListening', 'DESC')
      ->get();

    return $this->success($albums, 200);
  }

  //Suggestions of albums of a specific genre
  public function suggestAlbumsOfGenre($id_genre){
    $albums = DB::table('user')
      ->join('histories', 'user.id', '=', 'histories.user_id_user')
      ->join('contain', 'histories.history_id_history', '=', 'contain.history_id_history')
      ->join('music', 'contain.music_id_music', '=', 'music.music_id_music')
      ->join('be', 'music.music_id_music', '=', 'be.music_id_music')
      ->join('genre', 'be.music_id_music', '=', 'genre.genre_id_genre')
      ->join('include', 'music.music_id_music', '=', 'include.music_id_music')
      ->join('albums', 'include.album_id_album', '=', 'albums.album_id_album')
      ->select('albums.album_title_album', 'genre.genre_name_genre')
      ->where('genre.genre_id_genre', '=', $id_genre)
      ->groupBy('albums.album_id_album')
      ->get();

    return $this->success($albums, 200);
  }

  //Get the total duration of listening of a specific album by a specific user
  public function getListeningDurationOfAlbumByUser($id_album, $id_user){
    $duration = DB::table('user')
    ->join('histories', 'user.id', '=', 'histories.user_id_user')
    ->join('contain', 'histories.history_id_history', '=', 'contain.history_id_history')
    ->join('music', 'contain.music_id_music', '=', 'music.music_id_music')
    ->join('include', 'music.music_id_music', '=', 'include.music_id_music')
    ->join('albums', 'include.album_id_album', '=', 'albums.album_id_album')
    ->select(DB::raw('sec_to_time(sum(hour(music.music_duration)*3600+minute(music.music_duration)*60+second(music.music_duration))) as time'), 'albums.album_title_album', 'user.username')
    ->where([
      ['user.id', '=', $id_user],
      ['albums.album_id_album', '=', $id_album]
    ])
    ->get();

    return $this->success($duration, 200);

  }


  /*----------------------------Annex functions--------------------------*/

  //validate request
  public function validateRequestAlbum(Request $request){
    $rules = [
      'album_title_album' => 'required',
      'album_nb_tracks' => 'required|numeric'
    ];

    $this->validate($request, $rules);
  }

  //is authorized
  public function isAuthorizedAlbum(Request $request){
    $resource = "albums";
    $albums = Album::find($this->getArgs($request)["album_id_album"]);

    return $this->autorizeUser($request, $resource, $albums);
  }

}



?>
