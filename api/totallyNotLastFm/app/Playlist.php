<?php namespace App;

namespace App;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model; //allow us to query & insert data in your tables
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

class Playlist extends Model implements AuthenticatableContract, AuthorizableContract
{
  use Authenticatable, Authorizable;
protected $table = 'playlist';
  /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
  protected $fillable = ['playlist_id_playlist','playlist_description','playlist_name'];
  protected $hidden = ['updated_at','created_at'];
  /**
     * A playlist can have one user
     */
  public function user(){
    return $this->belongsTo('App/User.php');
  }

  /**
     * A playlist has many music
     */
  public function music(){
    return $this->hasMany('App/Music.php');
  }
}
?>
