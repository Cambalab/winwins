<?php namespace Winwins\Http\Middleware;

use Closure;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as BaseVerifier;

class VerifyCsrfToken extends BaseVerifier {

	public function handle($request, Closure $next)
	{
		return parent::handle($request, $next);
	}

}
