<?php

namespace App\Http\Controllers;

use App\Nationality;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class NationalityController extends Controller{
  /*
	//Constructor
	public function __construct(){
		$this->middleware('oauth', ['except' => ['getAllNationalities', 'getNationality']]);
		$this->middleware('authorize:' . __CLASS__, ['except' => ['getAllNationalities', 'getNationality', 'createNationality']]);
	}
	*/

  /*----------------------------Basic functions--------------------------*/

  //get All Nationalities
  public function getAllNationalities(){
    $nationalities = Nationality::all();

    return response()->json(['data' => $nationalities], 200);
  }

  //create Nationality
  public function createnationality(Request $request){
    $this->validateRequestNationality($request);

    $nationality = Nationality::create([
      'nationality_code' => $request->get('nationality_code')
    ]);

    return response()->json(['data' => "The nationality with id {$nationality->nationality_id_nationality} has been created"], 201);
  }

  //get Nationality
  public function getNationality($id){
    $nationality = DB::table('nationalities')
      ->where('nationality_id_nationality', '=', $id)
      ->get();

    if(!$nationality)
      return response()->json(['message' => "The nationality with id {$id} doesn't exist"], 404);

    return response()->json(['data' => $nationality], 200);
  }

  //update Nationality
  public function updateNationality(Request $request, $id){
    $nbNationalities = DB::table('nationalities')->max('nationality_id_nationality');

    if($id > $nbNationalities || $id < 0 )
      return response()->json(['data' => "The nationality with id $id doesn't exist"],200);
    
    $nationality = DB::table('nationalities')
      ->where('nationality_id_nationality', '=', $id)
      ->update([
        'nationality_code'=>$request->input('nationality_code')
      ]);


    return response()->json(['data' => "The nationality with id $id has been updated"], 200);
  }

  /*----------------------------Stats functions--------------------------*/

  //Get the nationalities the most listened by all users
  public function getNationalitesMostListened(){
    $nationalities = DB::table('user')
      ->join('histories', 'user.id', '=', 'histories.user_id_user')
      ->join('contain', 'histories.history_id_history', '=', 'contain.history_id_history')
      ->join('music', 'contain.music_id_music', '=', 'music.music_id_music')
      ->join('compose', 'music.music_id_music', '=', 'compose.music_id_music')
      ->join('artists', 'compose.artist_id_artist', '=', 'artists.artist_id')
      ->join('hold', 'artists.artist_id', '=', 'hold.artist_id_artist')
      ->join('nationalities', 'hold.nationality_id_nationality', '=', 'nationalities.nationality_id_nationality')
      ->select(DB::raw('count(nationalities.nationality_id_nationality) as nbListening'), 'nationalities.nationality_code')
      ->groupBy('nationalities.nationality_id_nationality')
      ->orderBy('nbListening', 'DESC')
      ->get();

    return $this->success($nationalities, 200);
  }

  //Get the nationalities the most listened by a specific user
  public function getNationalitesMostListenedByUser($id_user){
    $nationalities = DB::table('user')
      ->join('histories', 'user.id', '=', 'histories.user_id_user')
      ->join('contain', 'histories.history_id_history', '=', 'contain.history_id_history')
      ->join('music', 'contain.music_id_music', '=', 'music.music_id_music')
      ->join('compose', 'music.music_id_music', '=', 'compose.music_id_music')
      ->join('artists', 'compose.artist_id_artist', '=', 'artists.artist_id')
      ->join('hold', 'artists.artist_id', '=', 'hold.artist_id_artist')
      ->join('nationalities', 'hold.nationality_id_nationality', '=', 'nationalities.nationality_id_nationality')
      ->select(DB::raw('count(nationalities.nationality_id_nationality) as nbListening'), 'nationalities.nationality_code', 'user.username')
      ->where('user.id', '=', $id_user)
      ->groupBy('nationalities.nationality_id_nationality')
      ->orderBy('nbListening', 'DESC')
      ->get();

    return $this->success($nationalities, 200);
  }
  /*----------------------------Annex functions--------------------------*/

  //delete Nationality
  public function deleteNationality($id){
    $nbNationalities = DB::table('nationalities')->max('nationality_id_nationality');

    if($id > $nbNationalities || $id < 0 )
      return response()->json(['data' => "The nationality with id $id doesn't exist"],200);

    $nationality = DB::table('nationalities')
      ->where('nationality_id_nationality', '=', $id)
      ->delete();

    return response()->json(['data' => "The nationality with id $id has been deleted"], 200);
  }

  //validate request
  public function validateRequestNationality(Request $request){
    $rules = [
      'nationality_code' => 'required|alpha'
    ];

    $this->validate($request, $rules);
  }

  //is authorized
  public function isAuthorizedNationality(Request $request){
    $resource = "nationalities";
    $nationality = Nationality::find($this->getArgs($request)["nationality_id_nationality"]);

    return $this->autorizeUser($request, $resource, $nationality);
  }


}

?>
