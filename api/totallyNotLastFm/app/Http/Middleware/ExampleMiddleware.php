<?php

namespace App\Http\Middleware;

use Closure;

class ExampleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        return $next($request);
    }

    /* $app->get('/post/{id}', ['middleware' => 'auth', function (Request $request, $id) {
    $user = Auth::user();

    $user = $request->user();

    }]);   -> Stella Shitwork */

}
