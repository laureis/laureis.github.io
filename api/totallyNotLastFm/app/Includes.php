<?php namespace App;

namespace App;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

class Includes extends Model implements AuthenticatableContract, AuthorizableContract
{
  use Authenticatable, Authorizable;

  protected $table = 'include';
  /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
  protected $fillable = ['include_id', 'album_id_album','music_id_music'];

  protected $hidden = ['updated_at','created_at'];

  public function album(){
    return $this->hasMany('App/Album.php');
  }

  public function music(){
    return $this->hasMany('App/Music.php');
  }
  
}
?>
