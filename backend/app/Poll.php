<?php namespace Winwins;

use Illuminate\Database\Eloquent\Model;

class Poll extends Model {

    protected $dates = ['closing_date'];

    public function answers() {
        return $this->hasMany('Winwins\PollAnswer');
    }

    public function scopeWinwins($query) {
        return $query->where('type', 'WINWIN');
    }

    public function scopeGroups($query) {
        return $query->where('type', 'GROUP');
    }

}
