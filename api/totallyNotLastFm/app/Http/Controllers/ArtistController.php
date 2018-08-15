<?php

namespace App\Http\Controllers;

use App\Artist;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ArtistController extends Controller{
	/*
	//Artist constructor
	public function __construct(){
		$this->middleware('oauth', ['except' => ['getAllArtists', 'getArtist']]);
		$this->middleware('authorize:' . __CLASS__, ['except' => ['getAllArtists', 'getArtist', 'createArtist']]);
	}
	*/

	/*----------------------------Basic functions--------------------------*/

	//get All Artists
	public function getAllArtists(){
		$artists = Artist::all();

        return response()->json(['data' => $artists], 200);
	}

	//create Artist
	public function createArtist(Request $request){
		$this->validateRequestArtist($request);

		$artist = Artist::create([
			'artist_name' => $request->get('artist_name'),
			'artist_birth_year' => $request->get('artist_birth_year'),
			'artist_death_year' => $request->get('artist_death_year')
		]);

        return response()->json(['data' => "The artist with id {$artist->artist_id_artist} has been created"], 201);
	}

	//get Artist
	public function getArtist($id){
		$artists = DB::table('artists')
		->where('artist_id', '=', $id)
		->get();

		if(!$artists)
            return response()->json(['message' => "The artist with id {$id} doesn't exist"], 404);

        return response()->json(['data' => $artists], 200);
	}

	//update Artist
	public function updateArtist(Request $request, $id){
		$nbArtists = DB::table('artists')->max('artist_id');

		if($id > $nbArtists || $id < 0 )
		  return response()->json(['data' => "The artist with id $id doesn't exist"],200);

		$artists = DB::table('artists')
		->where('artist_id', '=', $id)
		->update([
		  'artist_name'=>$request->input('artist_name'),
		  'artist_birth_year'=>$request->input('artist_birth_year'),
		  'artist_death_year'=>$request->input('artist_death_year')
		]);

	    return response()->json(['data' => "The artist with id $id has been updated"], 200);
	}

	//delete Artist
	public function deleteArtist($id){
		$nbArtists = DB::table('artists')->max('artist_id');

		if($id > $nbArtists || $id < 0 )
		  return response()->json(['data' => "The artist with id $id doesn't exist"],200);

		$artists = DB::table('artists')
		->where('artist_id', '=', $id)
		->delete();

		return response()->json(['data' => "The artist with id $id has been deleted"], 200);
	}

	/*----------------------------Stats functions--------------------------*/
	//Get the list of all albums of one Artist
	public function getAlbumListOfArtist($id_artist){
		$albums = DB::table('albums')
		->join('produce', 'albums.album_id_album', '=', 'produce.album_id_album')
		->join('artists', 'artists.artist_id', '=', 'produce.artist_id_artist')
		->select('albums.*', 'artists.artist_id', 'artists.artist_name')
		->where('artists.artist_id', '=', $id_artist)
		->get();

		return $this->success($albums, 200);
	}

	//Get the artists the most listened by all users
	public function getArtistsMostListened(){
		$artists = DB::table('user')
		->join('histories', 'user.id', '=', 'histories.user_id_user')
		->join('contain', 'histories.history_id_history', '=', 'contain.history_id_history')
		->join('music', 'contain.music_id_music', '=', 'music.music_id_music')
		->join('compose', 'music.music_id_music', '=', 'compose.music_id_music')
		->join('artists', 'compose.artist_id_artist', '=', 'artists.artist_id')
		->select(DB::raw('count(artists.artist_id) as nbListening'), 'artists.artist_name')
		->groupBy('artists.artist_id')
		->orderBy('nbListening', 'DESC')
		->get();

		return $this->success($artists, 200);
	}

	//Get the artists the most listened by a specific user
	public function getArtistsMostListenedByUser($id_user){
		$artists = DB::table('user')
		->join('histories', 'user.id', '=', 'histories.user_id_user')
		->join('contain', 'histories.history_id_history', '=', 'contain.history_id_history')
		->join('music', 'contain.music_id_music', '=', 'music.music_id_music')
		->join('compose', 'music.music_id_music', '=', 'compose.music_id_music')
		->join('artists', 'compose.artist_id_artist', '=', 'artists.artist_id')
		->select(DB::raw('count(artists.artist_id) as nbListening'), 'user.username', 'user.id')
		->where('user.id', '=', $id_user)
		->groupBy('artists.artist_id')
		->orderBy('nbListening', 'DESC')
		->get();

		return $this->success($artists, 200);
	}

	//Get the artists the most listened in a specific genre by all user
	public function getArtistsMostListenedOfGenre($id_genre){
		$artists = DB::table('genre')
		->join('be', 'genre.genre_id_genre', '=', 'be.genre_id_genre')
		->join('music', 'be.music_id_music', '=', 'music.music_id_music')
		->join('compose', 'music.music_id_music', '=', 'compose.music_id_music')
		->join('artists', 'compose.artist_id_artist', '=', 'artists.artist_id')
		->select(DB::raw('count(artists.artist_id) as nbListening'), 'artists.artist_name')
		->where('genre.genre_id_genre', '=', $id_genre)
		->groupBy('artists.artist_name')
		->orderBy('nbListening', 'DESC')
		->get();

		return $this->success($artists, 200);
	}

	//Suggestions of artists of a specific genre
	public function suggestArtistsOfGenre($id_genre){
		$artists = DB::table('user')
		->join('histories', 'user.id', '=', 'histories.user_id_user')
		->join('contain', 'histories.history_id_history', '=', 'contain.history_id_history')
		->join('music', 'contain.music_id_music', '=', 'music.music_id_music')
		->join('compose', 'music.music_id_music', '=', 'compose.music_id_music')
		->join('artists', 'compose.artist_id_artist', '=', 'artists.artist_id')
		->join('be', 'music.music_id_music', '=', 'be.music_id_music')
		->join('genre', 'be.genre_id_genre', '=', 'genre.genre_id_genre')
		->select('artists.artist_name', 'genre.genre_name_genre')
		->where('genre.genre_id_genre', '=', $id_genre)
		->groupBy('artists.artist_id')
		->get();

		return $this->success($artists, 200);
	}

	public function getListeningDurationOfArtistBySeasonByUser($artist_id, $id_season, $id){
		if ($id_season == 1){ /*HIVER */
			$artists = DB::table('user')
			->join('histories','user.id', '=', 'histories.user_id_user')
			->join('contain', 'histories.history_id_history', '=', 'contain.history_id_history')
			->join('music', 'contain.music_id_music', '=', 'music.music_id_music')
			->join('compose', 'music.music_id_music', '=', 'compose.music_id_music')
			->join('artists', 'compose.artist_id_artist', '=', 'artists.artist_id')
			->select('artists.artist_name', DB::raw('SEC_TO_TIME(SUM(hour(music.music_duration)*3600 + minute(music.music_duration)*60 + second(music.music_duration))) as duration)');
			->where('user.id', '=', $id)
			->where('artists.artist_id', '=', $artist_id)
			->whereBetween(DB::raw('MONTH(TIMESTAMP(histories.created_at))'), array(1, 2))
			->orWhere(DB::raw('MONTH(TIMESTAMP(histories.created_at))'), '=', 12)
			->get();
		}
		else{
			if ($id_season == 2){ /* SPRING */
				$month1 = 3;
				$month2 = 5;
			}
			if ($id_season == 3){ /* SUMMER */
				$month1 = 6;
				$month2 = 8;
			}
			if ($id_season == 4){ /* AUTUMN */
				$month1 = 9;
				$month2 = 11;
			}
			$artists = DB::table('user')
			->join('histories','user.id', '=', 'histories.user_id_user')
			->join('contain', 'histories.history_id_history', '=', 'contain.history_id_history')
			->join('music', 'contain.music_id_music', '=', 'music.music_id_music')
			->join('compose', 'music.music_id_music', '=', 'compose.music_id_music')
			->join('artists', 'compose.artist_id_artist', '=', 'artists.artist_id')
			->select('artists.artist_name', DB::raw('SEC_TO_TIME(SUM(hour(music.music_duration)*3600 + minute(music.music_duration)*60 + second(music.music_duration))) as duration)');
			->where('user.id', '=', $id)
			->where('artists.artist_id', '=', $artist_id)
			->whereBetween(DB::raw('MONTH(TIMESTAMP(histories.created_at))'), array($month1, $month2))
			->get();
		}
	}
	/*----------------------------Annex functions--------------------------*/

	//validate request artist
	public function validateRequestArtist(Request $request){
		$rules = [
			'artist_name' => 'required',
			'artist_birth_year' => 'required|numeric',
			'artist_death_year' => 'required|numeric'
		];

		$this->validate($request, $rules);
	}

	//is authorized
	public function isAuthorizedArtist(Request $request){
		$resource = "artists";
		$artist = Artist::find($this->getArgs($request)["artist_id_artist"]);

		return $this->authorizeUser($request, $resource, $artist);
	}
	//

}

?>
