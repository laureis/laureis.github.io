<?php namespace App;

namespace App;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

class Belong extends Model implements AuthenticatableContract, AuthorizableContract
{
  use Authenticatable, Authorizable;

  protected $table = 'belong';
  /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
  protected $fillable = ['playlist_id_playlist', 'music_id_music'];

  protected $hidden = ['updated_at','created_at'];

  public function playlist(){
    return $this->hasMany('App/Playlist.php');
  }

  public function music(){
    return $this->hasMany('App/Music.php');
  }
  
}
?>
