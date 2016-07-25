<?php namespace Winwins;

use Illuminate\Database\Eloquent\Model;

class Report extends Model {

	const GROUP_TYPE = "GROUP";
	const WINWIN_TYPE = "WINWIN";

    public function user() {
        return $this->belongsTo('Winwins\User');
    }

    public function scopeWinwins($query) {
        return $query->where('type', WINWIN_TYPE);
    }

    public function scopeGroups($query) {
        return $query->where('type', GROUP_TYPE);
    }

}