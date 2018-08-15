<?php namespace App;

namespace App;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

class Hold extends Model implements AuthenticatableContract, AuthorizableContract
{
  use Authenticatable, Authorizable;

  protected $table = 'hold';
  /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
  protected $fillable = ['nationality_id_nationality', 'artist_id_artist'];

  protected $hidden = ['updated_at','created_at'];

  public function nationality(){
    return $this->hasMany('App/Nationality.php');
  }

  public function artist(){
    return $this->hasMany('App/Music.php');
  }
  
}
?>
