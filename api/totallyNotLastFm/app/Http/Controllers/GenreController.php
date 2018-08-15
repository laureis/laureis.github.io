<?php

namespace App\Http\Controllers;

use App\Genre;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class GenreController extends Controller{
	/*
	//Genre constructor
	public function __construct(){
		$this->middleware('oauth', ['except' => ['getAllGenres', 'getGenre']]);
		$this->middleware('authorize:' . __CLASS__, ['except' => ['getAllGenres', 'getGenre', 'createGenre']]);
	}
	*/

	/*----------------------------Basic functions--------------------------*/

	//get all Genres
	public function getAllGenres(){
		$genres = Genre::all();

        return response()->json(['data' => $genres], 200);
	}

	//create Genre
	public function createGenre(Request $request){
		$this->validateRequestGenre($request);

		$genre = Genre::create([
			'genre_name_genre' => $request->get('genre_name_genre')
		]);

        return response()->json(['data' => "The genre with id {$genre->genre_id_genre} has been created"], 201);
	}

	//get Genre
	public function getGenre($id){
		$genre = DB::table('genre')
		->where('genre_id_genre', '=', $id)
		->get();

		if(!$genre)
            return response()->json(['message' => "The genre with id {$id} doesn't exist"], 404);

        return response()->json(['data' => $genre], 200);
	}
	//update genre
	public function updateGenre(Request $request, $id){
		$nbGenres = DB::table('genre')->max('genre_id_genre');

		if($id > $nbGenres || $id < 0 )
		  return response()->json(['data' => "The genre with id $id doesn't exist"],200);

		$genre = DB::table('genre')
		->where('genre_id_genre', '=', $id)
		->update([
          'genre_name_genre'=>$request->input('genre_name_genre')
        ]);

        return response()->json(['data' => "The genre with id $id has been updated"], 200);
	}

	//delete Genre
	public function deleteGenre($id){
		$nbGenres = DB::table('genre')->max('genre_id_genre');

		if($id > $nbGenres || $id < 0 )
		  return response()->json(['data' => "The genre with id $id doesn't exist"],200);

		$genre = DB::table('genre')
		->where('genre_id_genre', '=', $id)
		->delete();

		return response()->json(['data' => "The genre with id $id has been deleted"], 200);
	}

	/*----------------------------Stats functions--------------------------*/
	//Get the genres the most listened by all users
	public function getGenresMostListened(){
		$genres = DB::table('user')
		->join('histories', 'user.id', '=', 'histories.user_id_user')
		->join('contain', 'histories.history_id_history', '=', 'contain.history_id_history')
		->join('music', 'contain.music_id_music', '=', 'music.music_id_music')
		->join('be', 'music.music_id_music', '=', 'be.music_id_music')
		->join('genre', 'be.genre_id_genre', '=', 'be.genre_id_genre')
		->select(DB::raw('count(genre.genre_id_genre) as nbListening'), 'genre.genre_name_genre')
		->groupBy('genre.genre_id_genre')
		->orderBy('nbListening', 'DESC')
		->get();

		return $this->success($genres, 200);
	}

	//Get the genres the most listened by a specific user
	public function getGenresMostListenedByUser($id_user){
		$genres = DB::table('user')
		->join('histories', 'user.id', '=', 'histories.user_id_user')
		->join('contain', 'histories.history_id_history', '=', 'contain.history_id_history')
		->join('music', 'contain.music_id_music', '=', 'music.music_id_music')
		->join('be', 'music.music_id_music', '=', 'be.music_id_music')
		->join('genre', 'be.genre_id_genre', '=', 'be.genre_id_genre')
		->select(DB::raw('count(genre.genre_id_genre) as nbListening'), 'user.id', 'user.username', 'genre.genre_name_genre', 'genre.genre_id_genre')
		->where('user.id', '=', $id_user)
		->groupBy('genre.genre_id_genre')
		->orderBy('nbListening', 'DESC')
		->get();

		return $this->success($genres, 200);
	}

	/*----------------------------Annex functions--------------------------*/


	//validate request
	public function validateRequestGenre(Request $request){
		$rules = [
			'genre_name_genre' => 'required|alpha'
		];

		$this->validate($request, $rules);
	}

	//is authorized
	public function isAuthorizedGenre(Request $request){
		$resource = "genres";
		$genre = Genre::find($this->getArgs($request)["genre_id_genre"]);

		return $this->authorizeUser($request, $resource, $genre);
	}

}

?>
