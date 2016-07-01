<?php namespace Winwins\Http\Controllers;

use Auth;
use Log;
use DB;
use Response;
use Illuminate\Support\Collection;
use Winwins\Http\Requests;
use Winwins\Http\Controllers\Controller;
use Winwins\Winwin;
use Winwins\Group;
use Winwins\User;

use Illuminate\Http\Request;

class ReportController extends Controller {

    public function __construct() {
        $this->middleware('auth');
    }

    public function sendReport(Request $request){        
        
    }

}

