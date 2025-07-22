<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AddRewardPointRequest;
use App\Services\RewardPoint\RewardPointService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Gate;

class RewardPointController extends Controller
{
    protected \App\Services\RewardPoint\RewardPointService $service;
    const MESSAGE = '403 Forbidden';

    public function __construct(RewardPointService $service)
    {
        $this->service = $service;
    }

    public function addPoints(AddRewardPointRequest $request)
    {
        abort_if(Gate::denies('points_management'), Response::HTTP_FORBIDDEN, self::MESSAGE);
        return $this->service->addPoints($request);
    }

    public function getPoints()
    {
        abort_if(Gate::denies('points_management'), Response::HTTP_FORBIDDEN, self::MESSAGE);
        return $this->service->getPoints();
    }

    public function getOnePoints($id)
    {
        abort_if(Gate::denies('points_management'), Response::HTTP_FORBIDDEN, self::MESSAGE);
        return $this->service->getOnePoints($id);
    }

    public function editPoints(Request $request, $id)
    {
        abort_if(Gate::denies('points_management'), Response::HTTP_FORBIDDEN, self::MESSAGE);
        return $this->service->editPoints($request, $id);
    }

    public function deletePoints($id)
    {
        abort_if(Gate::denies('points_management'), Response::HTTP_FORBIDDEN, self::MESSAGE);
        return $this->service->deletePoints($id);
    }
}
