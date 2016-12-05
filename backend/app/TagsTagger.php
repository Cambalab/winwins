<?php namespace Winwins;

use Illuminate\Database\Eloquent\Model;

class InterestsInterested extends Model {

  protected $table = 'tags_tagger';

  protected $fillable = [ 'tag_id', 'tagger_id', 'type'];

  public function interest() {
    return $this->hasOne('Winwins\Tags');
  }


}
