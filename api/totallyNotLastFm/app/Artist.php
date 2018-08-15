<?php namespace App;

namespace App;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model; //allow us to query & insert data in your tables
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

class Artist extends Model implements AuthenticatableContract, AuthorizableContract
{
  use Authenticatable, Authorizable;

  /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
  protected $fillable = ['artist_id', 'artist_name', 'artist_birth_year', 'artist_death_year'];

  protected $hidden = ['updated_at','created_at'];
  /**
     * An artist can have many nationalities
     */
  public function nationality(){
    return $this->hasMany('App/Nationality.php');
  }

  /**
     * An artist can have many musics
     */
  public function music(){
    return $this->hasMany('App/Music.php');
  }

  /**
     * An artist can have many albums
     */
  public function album(){
    return $this->hasMany('App/Album.php');
  }
}
?>
