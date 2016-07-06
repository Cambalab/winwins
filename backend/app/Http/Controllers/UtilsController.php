<?php namespace Winwins\Http\Controllers;

use Winwins\Http\Controllers\Controller;

class UtilsController extends Controller {

	const WINWINS_TEAM_MAIL = "equipo@winwin.org";

	function camelCaseToSnakeCase($camelCaseString) {
	  preg_match_all('!([A-Z][A-Z0-9]*(?=$|[A-Z][a-z0-9])|[A-Za-z][a-z0-9]+)!', $camelCaseString, $matches);
	  $ret = $matches[0];
	  foreach ($ret as &$match) {
	    $match = $match == strtoupper($match) ? strtolower($match) : lcfirst($match);
	  }

	  return implode('_', $ret);
	}

}