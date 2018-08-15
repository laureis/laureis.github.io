<?php namespace App;

namespace App;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

class Contain extends Model implements AuthenticatableContract, AuthorizableContract
{
  use Authenticatable, Authorizable;

  protected $table = 'contain';
  /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
  protected $fillable = [ 'music_id_music','history_id_history'];

  protected $hidden = ['updated_at','created_at'];

  public function history(){
    return $this->hasMany('App/Genre.php');
  }

  public function music(){
    return $this->hasMany('App/Music.php');
  }
  
}
?>
