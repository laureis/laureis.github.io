<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model; //allow us to query & insert data in your tables
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Model implements AuthenticatableContract, AuthorizableContract, JWTSubject
{
  use Authenticatable, Authorizable;
  protected $table = 'user';
  /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
  protected $fillable = [
    'id', 'email', 'username', 'user_birthday', 'password'
  ];

  /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
  protected $hidden = ['updated_at','created_at','password'];

  public function getJWTIdentifier()
  {
    return $this->getKey();
  }

  public function getJWTCustomClaims()
  {
    return [];
  }

  /**
  * An history can have one user
  */
  public function history(){
    return $this->hasOne('App/History.php');
  }

  /**
     * A user can have one spotify
     */
  public function spotify(){
    return $this->hasOne('App/Spotify.php');
  }

  /**
     * A user can have many playlist
     */
  public function playlist(){
    return $this->hasMany('App/Playlist.php');
  }
}
