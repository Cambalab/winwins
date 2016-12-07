<?php namespace Winwins;

use Illuminate\Database\Eloquent\Model;

class TagsTagger extends Model {

  protected $table = 'tags_tagger';

  protected $fillable = [ 'tag_id', 'tagger_id', 'type'];

  public function tag () {
    return $this->hasOne('Winwins\Tag');
  }


}
