<?php

namespace App\Http\Controllers;

use App\Spotify;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SpotifyController extends Controller{

	/*
	//Constructor
	public function __construct(){
		$this->middleware('oauth', ['except' => ['getAllSpotify', 'getSpotify']]);
		$this->middleware('authorize:' . __CLASS__, ['except' => ['getAllSpotify', 'getSpotify', 'createSpotify']]);
	}
	*/

	/*----------------------------Basic functions--------------------------*/


	//get All Spotify of our database
	public function getAllSpotify(){
		$spotify = Spotify::all();

        return response()->json(['data' => $spotify], 200);
	}

	//create Spotify account in our database
	public function createSpotify(Request $request){
		$this->validateRequestSpotify($request);

		$spotify = Spotify::create([
			'user_id_user' => $request->get('user_id_user')
		]);

		return response()->json(['data' => "The spotify account with this id has been created"], 201);
	}

	//get one Spotify account in our database
	public function getSpotify($id){
		$spotify = DB::table('spotify')
		->where('spotify_user_id', '=', $id)
		->get();

		if(!$spotify)
            return response()->json(['message' => "The spotify account with id {$id} doesn't exist"], 404);

        return response()->json(['data' => $spotify], 200);
	}

	//update Spotify account in our database
	public function updateSpotify(Request $request, $id){
		$nbSpotify = DB::table('spotify')->max('spotify_user_id');

		if($id > $nbSpotify || $id < 0 )
		  return response()->json(['data' => "The spotify account with id $id doesn't exist"],200);

		$spotify = DB::table('spotify')
		->where('spotify_user_id', '=', $id)
		->update([
		  'user_id_user'=>$request->input('user_id_user')
		]);

        return response()->json(['data' => "The spotify account with id $id has been updated"], 200);
	}

	//delete Spotify account in our database
	public function deleteSpotify($id){
		$nbSpotify = DB::table('spotify')->max('spotify_user_id');

		if($id > $nbSpotify || $id < 0 )
		  return response()->json(['data' => "The spotify account with id $id doesn't exist"],200);

		$spotify = DB::table('spotify')
		->where('spotify_user_id', '=', $id)
		->delete();

		return response()->json(['data' => "The spotify account with id $id has been deleted"], 200);
	}

	/*----------------------------Stats functions--------------------------*/

	/*----------------------------Annex functions--------------------------*/


	//validate request
	public function validateRequestSpotify(Request $request){
		$rules = [
			'user_id_user' => 'required|numeric'
		];

		$this->validate($request, $rules);
	}

	//is authorized
	public function isAuthorizedSpotify(Request $request){
		$resource = "spotify";
		$spotify = Spotify::find($this->getArgs($request)["spotify_user_id"]);

		return $this->autorizeUser($request, $resource, $spotify);
	}


}

?>
