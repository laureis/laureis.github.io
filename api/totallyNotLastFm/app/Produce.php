<?php namespace App;

namespace App;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

class Produce extends Model implements AuthenticatableContract, AuthorizableContract
{
  use Authenticatable, Authorizable;

  protected $table = 'produce';
  /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
  protected $fillable = ['artist_id_artist', 'album_id_album'];

  protected $hidden = ['updated_at','created_at'];

  public function artist(){
    return $this->hasMany('App/Artist.php');
  }

  public function music(){
    return $this->hasMany('App/Music.php');
  }
  
}
?>
