<?php namespace Winwins;

use Illuminate\Database\Eloquent\Model;

class UserSkills extends Model {

	protected $fillable = array('user_id', 'skill_id');

    public function user() {
        return $this->hasOne('Winwins\User');
    }

    public function skill() {
        return $this->hasOne('Winwins\Skill');
    }

}