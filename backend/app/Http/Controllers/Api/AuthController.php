<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Services\Auth\AuthService;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\SignUpRequest;
use App\Http\Requests\SellerSignUpRequest;
use App\Http\Requests\AffiliateSignupRequest;

class AuthController extends Controller
{
    protected \App\Services\Auth\AuthService $service;

    public function __construct(AuthService $authService)
    {
        $this->service = $authService;
    }

    public function login(LoginRequest $request)
    {
        return $this->service->login($request);
    }

    public function loginVerify(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'code' => 'required|string',
        ]);

        return $this->service->loginVerify($request);
    }

    public function signup(SignUpRequest $request)
    {
        return $this->service->signup($request);
    }

    public function verify(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'code' => 'required|string',
        ]);

        return $this->service->verify($request);
    }

    public function resendCode(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        return $this->service->resendCode($request);
    }

    public function forgot(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email', 'email:rfc:dns']
        ]);

        return $this->service->forgot($request);
    }

    public function reset(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|confirmed|min:8',
            'token' => 'required|string',
        ]);

        return $this->service->reset($request);
    }

    public function logout()
    {
        return $this->service->logout();
    }

    public function affiliateSignup(AffiliateSignupRequest $request)
    {
        return $this->service->affiliateSignup($request);
    }

    public function sellerSignup(SellerSignUpRequest $request)
    {
        return $this->service->sellerSignup($request);
    }
}
