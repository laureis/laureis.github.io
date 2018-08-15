<?php namespace App;

namespace App;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model; //allow us to query & insert data in your tables
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

class Genre extends Model implements AuthenticatableContract, AuthorizableContract
{
  use Authenticatable, Authorizable;

    protected $table = 'genre';
  /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
  protected $fillable = ['genre_id_genre', 'genre_name_genre'];
  
  protected $hidden = ['updated_at','created_at'];
  /**
     * A genre can have many musics
     */
  public function music(){
    return $this->hasMany('App/Music.php');
  }

}
?>
