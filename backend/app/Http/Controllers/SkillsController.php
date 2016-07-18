<?php namespace Winwins\Http\Controllers;

use JWT;
use Auth;
use Log;
use DB;
use Config;
use Carbon;
use Storage;
use Validator;
use Response;
use Illuminate\Support\Collection;
use Winwins\Http\Requests;
use Winwins\Http\Controllers\Controller;
use Winwins\Winwin;
use Winwins\User;
use Winwins\Skill;


use Illuminate\Http\Request;

class SkillsController extends Controller {

    public function __construct() {
        $this->middleware('auth', ['except' => ['index']]);
    }

    public function index() {
    	$skills = Skill::all();
    	return $skills;
    }

    public function search(Request $request) {
    	$q = $request->input('q');

    	$skills = Skill::where('name', 'LIKE', $q.'%')->get();

    	return $skills;
    }
}
