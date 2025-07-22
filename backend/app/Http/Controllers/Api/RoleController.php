<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AddPermissionRequest;
use App\Http\Requests\Admin\AddRoleRequest;
use App\Http\Requests\Admin\AssignPermissionRequest;
use App\Services\Admin\RolePermissionService;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    protected \App\Services\Admin\RolePermissionService $service;

    public function __construct(RolePermissionService $service)
    {
        $this->service = $service;
    }

    public function addRole(AddRoleRequest $request)
    {
        return $this->service->addRole($request);
    }

    public function getRole()
    {
        return $this->service->getRole();
    }

    public function addPermission(AddPermissionRequest $request)
    {
        return $this->service->addPermission($request);
    }

    public function getPermission()
    {
        return $this->service->getPermission();
    }

    public function assignPermission(AssignPermissionRequest $request)
    {
        return $this->service->assignPermission($request);
    }
}
