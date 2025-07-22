<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AddBannerRequest;
use App\Http\Requests\Admin\AddPromoRequest;
use App\Services\Admin\BannerPromoService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Gate;

class BannerPromoController extends Controller
{
    protected \App\Services\Admin\BannerPromoService $service;
    const MESSAGE = '403 Forbidden';

    public function __construct(BannerPromoService $service)
    {
        $this->service = $service;
    }

    public function addBanner(AddBannerRequest $request)
    {
        abort_if(Gate::denies('banner_promo'), Response::HTTP_FORBIDDEN, self::MESSAGE);
        return $this->service->addBanner($request);
    }

    public function banners()
    {
        abort_if(Gate::denies('banner_promo'), Response::HTTP_FORBIDDEN, self::MESSAGE);
        return $this->service->banners();
    }

    public function getOneBanner($id)
    {
        abort_if(Gate::denies('banner_promo'), Response::HTTP_FORBIDDEN, self::MESSAGE);
        return $this->service->getOneBanner($id);
    }

    public function editBanner(Request $request, $id)
    {
        abort_if(Gate::denies('banner_promo'), Response::HTTP_FORBIDDEN, self::MESSAGE);
        return $this->service->editBanner($request, $id);
    }

    public function deleteBanner($id)
    {
        abort_if(Gate::denies('banner_promo'), Response::HTTP_FORBIDDEN, self::MESSAGE);
        return $this->service->deleteBanner($id);
    }

    public function addPromo(AddPromoRequest $request)
    {
        abort_if(Gate::denies('banner_promo'), Response::HTTP_FORBIDDEN, self::MESSAGE);
        return $this->service->addPromo($request);
    }

    public function promos()
    {
        abort_if(Gate::denies('banner_promo'), Response::HTTP_FORBIDDEN, self::MESSAGE);
        return $this->service->promos();
    }

    public function deletePromo($id)
    {
        abort_if(Gate::denies('banner_promo'), Response::HTTP_FORBIDDEN, self::MESSAGE);
        return $this->service->deletePromo($id);
    }

}
