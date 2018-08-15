<?php namespace App;

namespace App;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model; //allow us to query & insert data in your tables
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

class Nationality extends Model implements AuthenticatableContract, AuthorizableContract
{
  use Authenticatable, Authorizable;

  /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
  protected $fillable = ['nationality_id_nationality', 'nationality_code'];
  protected $hidden = ['updated_at','created_at'];
  /**
      * A nationality belong to many artist
      */
  public function artist(){
    return $this->belongsToMany('App/Artist.php');
  }
}
?>
