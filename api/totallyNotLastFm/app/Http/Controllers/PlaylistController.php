<?php

namespace App\Http\Controllers;

use App\Playlist;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PlaylistController extends Controller{
	/*
	//Constructor
	public function __construct(){
		$this->middleware('oauth', ['except' => ['getAllPlaylists', 'getPlaylist']]);
		$this->middleware('authorize:' . __CLASS__, ['except' => ['getAllPlaylists', 'getPlaylist', 'createPlaylist']]);
	}
	*/

	/*----------------------------Basic functions--------------------------*/


	//get All Playlists
	public function getAllPlaylists(){
		$playlists = Playlist::all();

        return response()->json(['data' => $playlists], 200);
	}

	//create Playlist
	public function createPlaylist(Request $request){
	    DB::statement('SET FOREIGN_KEY_CHECKS = 0');

		$this->validateRequestPlaylist($request);

		$playlist = Playlist::create([
			'user_id_user' => $request->get('user_id_user'),
			'playlist_description' => $request->get('playlist_description'),
			'playlist_name' => $request->get('playlist_name')
		]);

	    DB::statement('SET FOREIGN_KEY_CHECKS = 1');

		return response()->json(['data' => "The playlist with id {$playlist->playlist_id_playlist} has been created"], 201);
	}

	//get Playlist
	public function getPlaylist($id){
		$playlist = DB::table('playlist')
		->where('playlist_id_playlist', '=', $id)
		->get();

		if(!$playlist)
			return response()->json(['message' => "The playlist with id {$id} doesn't exist"], 404);

        return response()->json(['data' => $playlist], 200);
	}

	//update Playlist
	public function updatePlaylist(Request $request, $id){
		$nbPlaylists = DB::table('playlist')->max('playlist_id_playlist');

		if($id > $nbPlaylists || $id < 0 )
		  return response()->json(['data' => "The playlist with id $id doesn't exist"],200);

		$playlist = DB::table('playlist')
		->where('playlist_id_playlist', '=', $id)
		->update([
          'user_id_user'=>$request->input('user_id_user'),
          'playlist_description'=>$request->input('playlist_description'),
		  'playlist_name'=>$request->input('playlist_name')
        ]);

        return response()->json(['data' => "The playlist with id $id has been updated"], 200);
	}

	//delete Playlist
	public function deletePlaylist($id){
		$nbPlaylists = DB::table('playlist')->max('playlist_id_playlist');

		if($id > $nbPlaylists || $id < 0 )
		  return response()->json(['data' => "The playlist with id $id doesn't exist"],200);

		$playlist = DB::table('playlist')
		->where('playlist_id_playlist', '=', $id)
		->delete();

		return response()->json(['data' => "The playlist with id $id has been deleted"], 200);
	}

	/*----------------------------Stats functions--------------------------*/


	/*----------------------------Annex functions--------------------------*/


	//validate request
	public function validateRequestPlaylist(Request $request){
		$rules = [
			'user_id_user' => 'required|numeric',
			'playlist_description' => 'required',
			'playlist_name' => 'required'
		];

		$this->validate($request, $rules);
	}

	//is authorized
	public function isAuthorizedPlaylist(Request $request){
		$resource = "playlists";
		$playlist = Playlist::find($this->getArgs($request)["playlist_id_playlist"]);

		return $this->autorizeUser($request, $resource, $playlist);
	}

}


?>
