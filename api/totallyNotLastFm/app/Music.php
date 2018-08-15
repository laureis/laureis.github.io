<?php namespace App;

namespace App;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model; //allow us to query & insert data in your tables
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

class Music extends Model implements AuthenticatableContract, AuthorizableContract
{
  use Authenticatable, Authorizable;

    protected $table = 'music';
  /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
  protected $fillable = ['music_id_music', 'music_title', 'music_duration', 'music_release_date'];
  protected $hidden = ['updated_at','created_at'];

  /**
     * A Music can have many historie
     */
  public function history(){
    return $this->belongsToMany('App/History.php');
  }


  /**
     * A music belong to many playlist
     */
  public function playlist(){
    return $this->belongsToMany('App/Music.php');
  }

  /**
     * A music belong to many genre
     */
  public function genre(){
    return $this->belongsToMany('App/Genre.php');
  }

  /**
     * A music belong to many album
     */
  public function album(){
    return $this->belongsToMany('App/Album.php');
  }

  /**
     * A music belong to many artist
     */
  public function artist(){
    return $this->belongsToMany('App/Artist.php');
  }
}
?>
