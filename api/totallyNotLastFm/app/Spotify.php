<?php namespace App;

namespace App;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model; //allow us to query & insert data in your tables
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

class Spotify extends Model implements AuthenticatableContract, AuthorizableContract
{
  use Authenticatable, Authorizable;
  
  protected $table = 'spotify';

  /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
  protected $fillable = ['spotify_user_id', 'user_id_user'];
  protected $hidden = ['updated_at','created_at'];
  
  
  /**
      * A spotify can have one user
      */
  public function user(){
    return $this->belongsTo('App/User.php');
  }
}
?>
