<?php

namespace App\Http\Controllers\Api\B2B;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Gate;
use App\Http\Requests\CategoryRequest;
use App\Http\Requests\SubCategoryRequest;
use App\Services\B2B\ProductCategoryService;

class ProductCategoryController extends Controller
{
    const MESSAGE = '403 Forbidden';

    protected \App\Services\B2B\ProductCategoryService $service;

    public function __construct(ProductCategoryService $categoryService)
    {
        $this->service = $categoryService;
    }

    public function createCategory(CategoryRequest $request)
    {
        abort_if(Gate::denies('category_create'), Response::HTTP_FORBIDDEN, self::MESSAGE);

        return $this->service->createCategory($request);
    }
    public function updateCategory(CategoryRequest $request,$id)
    {
        abort_if(Gate::denies('category_create'), Response::HTTP_FORBIDDEN, self::MESSAGE);

        return $this->service->updateCategory($request,$id);
    }

    public function categories()
    {
        return $this->service->categories();
    }

    public function adminCategories()
    {
        abort_if(Gate::denies('categories'), Response::HTTP_FORBIDDEN, self::MESSAGE);

        return $this->service->adminCategories();
    }

    public function createSubCategory(SubCategoryRequest $request)
    {
        abort_if(Gate::denies('sub_category_create'), Response::HTTP_FORBIDDEN, self::MESSAGE);

        return $this->service->createSubCategory($request);
    }

    public function getSubcategory($id)
    {
        return $this->service->getSubcategory($id);
    }

    public function featuredStatus(Request $request, $id)
    {
        abort_if(Gate::denies('category_featured_status'), Response::HTTP_FORBIDDEN, self::MESSAGE);

        return $this->service->featuredStatus($request, $id);
    }

    public function categoryAnalytic()
    {
        return $this->service->categoryAnalytic();
    }

    public function getAdminSubcategory()
    {
        abort_if(Gate::denies('sub_category'), Response::HTTP_FORBIDDEN, self::MESSAGE);

        return $this->service->getAdminSubcategory();
    }

    public function subStatus(Request $request, $id)
    {
        return $this->service->subStatus($request, $id);
    }

    public function deleteCategory($id)
    {
        return $this->service->deleteCategory($id);
    }

    public function deleteSubCategory($id)
    {
        return $this->service->deleteSubCategory($id);
    }
}
