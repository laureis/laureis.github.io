<?php namespace App;

namespace App;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

class Be extends Model implements AuthenticatableContract, AuthorizableContract
{
  use Authenticatable, Authorizable;

  protected $table = 'be';
  /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
  protected $fillable = ['genre_id_genre', 'music_id_music'];

  protected $hidden = ['updated_at','created_at'];

  public function genre(){
    return $this->hasMany('App/Genre.php');
  }

  public function music(){
    return $this->hasMany('App/Music.php');
  }
  
}
?>
