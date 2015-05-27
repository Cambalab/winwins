<?php namespace Winwins;

use Hash;
use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

class User extends Model implements AuthenticatableContract, CanResetPasswordContract {

	use Authenticatable, CanResetPassword;

	protected $table = 'users';

	protected $fillable = ['username', 'email', 'password'];

	protected $hidden = ['password', 'facebook', 'google', 'yahoo', 'twitter', 'canceled', 'suspend', 'active', 'accept_terms', 'created_at', 'updated_at' ];

    /*
	public function setPasswordAttribute($password) {
		$this->attributes['password'] = Hash::make($password);
	}
    */

    public function detail() {
        return $this->hasOne('Winwins\Model\UserDetail');
    }

    public function winwins() {
        return $this->belongsToMany('Winwins\Winwin', 'winwins_users');
    }

}
