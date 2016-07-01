<?php namespace Winwins;

use Illuminate\Database\Eloquent\Model;

class Report extends Model {

    public function user() {
        return $this->belongsTo('Winwins\User');
    }

    public function scopeWinwins($query) {
        return $query->where('type', 'WINWIN');
    }

    public function scopeGroups($query) {
        return $query->where('type', 'GROUP');
    }

}