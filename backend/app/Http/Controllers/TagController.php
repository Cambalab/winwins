<?php namespace Winwins\Http\Controllers;

use Winwins\Http\Requests;
use Winwins\Http\Controllers\Controller;
use Winwins\Tag;

use Illuminate\Http\Request;

class TagController extends Controller {

  public function index() {
    $tags = Tag::all();
    return $tags;
  }

  public function store() {
    $tag = Tag::create(Request::all());
    return $tag;
  }

  public function show($id) {
    $tag = Tag::find($id);
    return $tag;
  }


  public function update($id) {
    $tag = Tag::find($id);
    //Set updated
    $tag->save();
    return $tag;
  }

  public function destroy($id) {
    Tag::destroy($id);
  }

  public function create() {
  }

  public function edit($id) {
    //
  }
}
