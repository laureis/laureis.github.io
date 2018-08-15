<?php namespace App;

namespace App;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model; //allow us to query & insert data in your tables
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

class Album extends Model implements AuthenticatableContract, AuthorizableContract
{
  use Authenticatable, Authorizable;

  /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
  protected $fillable = ['album_id_album', 'album_title_album', 'album_nb_tracks','album_updated_at','album_created_at'];

  protected $hidden = ['updated_at','created_at'];
  /**
     * An Album can have many musics
     */
  public function music(){
    return $this->hasMany('App/Music.php');
  }

  /**
     * A music belong to many album
     */
  public function artist(){
    return $this->belongsToMany('App/Artist.php');
  }
}
?>
