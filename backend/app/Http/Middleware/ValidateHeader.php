<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ValidateHeader
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $headerName = config('security.header_key', 'X-SHPAZY-AUTH');
        $expectedValue = config('security.header_value');

        $receivedValue = $request->header($headerName);

        if (!$receivedValue) {
            return response()->json(['error' => 'Unauthorized access. Missing required header.'], 401);
        }

        if ($receivedValue !== $expectedValue) {
            return response()->json(['error' => 'Unauthorized access. Invalid header value.'], 401);
        }

        return $next($request);
    }
}
