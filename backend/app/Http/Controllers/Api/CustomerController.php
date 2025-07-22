<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\User\CustomerService;
use App\Http\Requests\OrderRateRequest;
use App\Http\Requests\CustomerSupportRequest;

class CustomerController extends Controller
{
    protected \App\Services\User\CustomerService $service;

    public function __construct(CustomerService $service)
    {
        $this->service = $service;
    }

    public function dashboardAnalytics(int $userId)
    {
        return $this->service->dashboardAnalytics($userId);
    }

    public function acountOverview(int $userId)
    {
        return $this->service->acountOverview($userId);
    }

    public function recentOrders(int $userId)
    {
        return $this->service->recentOrders($userId);
    }

    public function getOrders(int $userId)
    {
        return $this->service->getOrders($userId);
    }

    public function getOrderDetail($orderNo)
    {
        return $this->service->getOrderDetail($orderNo);
    }

    public function rateOrder(OrderRateRequest $request)
    {
        return $this->service->rateOrder($request);
    }

    public function support(CustomerSupportRequest $request)
    {
        return $this->service->support($request);
    }

    public function wishlist(Request $request)
    {
        $request->validate([
            'user_id' => ['required', 'integer', 'exists:users,id'],
            'product_id' => ['required', 'integer']
        ]);

        return $this->service->wishlist($request);
    }

    public function getWishlist(int $userId)
    {
        return $this->service->getWishlist($userId);
    }

    public function getSingleWishlist(int $userId, $id)
    {
        return $this->service->getSingleWishlist($userId, $id);
    }

    public function removeWishlist(int $userId, $id)
    {
        return $this->service->removeWishlist($userId, $id);
    }

    public function rewardDashboard(int $userId)
    {
        return $this->service->rewardDashboard($userId);
    }

    public function activity(int $userId)
    {
        return $this->service->activity($userId);
    }

    public function redeemPoint(Request $request)
    {
        return $this->service->redeemPoint($request);
    }
}
