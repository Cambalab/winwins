<?php namespace Winwins\Http\Controllers;

use Auth;
use Log;
use DB;
use Response;
use Config;
use Illuminate\Support\Collection;
use Winwins\Http\Requests;
use Winwins\Http\Controllers\Controller;
use Winwins\Winwin;
use Winwins\Group;
use Winwins\User;
use Winwins\Report;
use Winwins\Message\Mailer;
use Winwins\Message\Message;
use Illuminate\Http\Request;

class ReportController extends Controller {

    public function __construct() {
        $this->middleware('auth');
    }

    public function sendReport(Request $request, Mailer $mailer){        
    	$user = User::find($request['user']['sub']);

    	$report = new Report();
    	DB::transaction(function() use ($request, $report, $user, $mailer) {
    		$report->reference_id = $request->input('reference_id');
    		$report->type = $request->input('type');
    		$report->reason = $request->input('reason');
    		$report->user_id = $user->id;

    		switch ($report->type) {
    			case Report::WINWIN_TYPE:
                    $winwin = Winwin::find($report->reference_id);
                    $report->winwin_id;
                    $this->sendReportEmail($report->type, $report, $user, $winwin, $mailer);
    				$report->save();
    				break;
    			case Report::GROUP_TYPE:
    				$report->save();
    				break;
    			default:
    				return response()->json(['message' => 'Report type dont exist'], 404); 
    				break;
    		}
    	});

    	return $report;
    }

    public function sendReportEmail($type, $report, $user, $winwin, Mailer $mailer) {
    	Log::info("Enviando mail de report");
    	// $templateName = UtilsController::camelCaseToSnakeCase($type)."_report";
        $templateName = "winwin_report";
    	$recipient = UtilsController::WINWINS_TEAM_MAIL;
    	if (isset($recipient)) {
    		$message = new Message($templateName, array(
    				'meta' => array(
                        'base_url' => Config::get('app.url'),
                        // TODO agregar link a reporte en backend
                        'winwin_link' => Config::get('app.url').'/#/winwin/'.$winwin->id,
                        //'logo_url' => 'http://winwins.org/assets/imgs/logo-winwins_es.gif'
                        'logo_url' => 'http://dev-winwins.net/assets/imgs/logo-winwins_es.gif'
    				),
                    'sender' => array(  
                        'username' => $user->username,
                        'name' => "Reporte",
                        'photo' => Config::get('app.url_images').'/72x72/smart/'.$user->photo,
                    ),
                    'report' => array(
                        'id' => $report->id,
                        'reason' => $report->reason,
                        'type' => $type,
                        'reference_id' => $report->reference_id,
                        'winwin' => $winwin 
                    )
    		));

            $message->subject('WW - REPORTE');
            $message->to(null, $recipient);
            $message_sent = $mailer->send($message);
            Log::info("Mail enviado");
    	}	
    }
}

