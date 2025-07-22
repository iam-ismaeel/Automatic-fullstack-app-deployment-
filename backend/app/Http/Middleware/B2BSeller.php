<?php

namespace App\Http\Middleware;

use Closure;
use App\Enum\UserType;
use App\Trait\HttpResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class B2BSeller
{
    use HttpResponse;
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user) {
            return $this->error(null, "Unauthorized action.", 401);
        }

        if ($user && $user->type !== UserType::B2B_SELLER) {
            return $this->error(null, "Unauthorized action.", 401);
        }

        return $next($request);
    }
}
