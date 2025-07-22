<?php

namespace App\Services\User;

use App\Enum\CategoryStatus;
use App\Http\Resources\AdminCategoryResource;
use App\Http\Resources\AdminSubCategoryResource;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\SubCategoryResource;
use App\Models\Category;
use App\Models\Product;
use App\Models\SubCategory;
use App\Trait\HttpResponse;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CategoryService
{
    use HttpResponse;

    public function createCategory($request)
    {
        try {
            $folder = null;

            if(App::environment('production')){
                $folder = '/prod/category';
            } elseif(App::environment(['staging', 'local'])) {
                $folder = '/stag/category';
            }

            if ($request->file('image')) {
                $path = $request->file('image')->store($folder, 's3');
                $url = Storage::disk('s3')->url($path);
            }

            $slug = Str::slug($request->name);
            if (Category::where('slug', $slug)->exists()) {
                $slug = $slug . '-' . uniqid();
            }

            Category::create([
                'name' => $request->name,
                'slug' => $slug,
                'image' => $url,
                'featured' => 1,
            ]);

            return $this->success(null, "Created successfully");
        } catch (\Exception $e) {
            return $this->error(null, $e->getMessage(), 500);
        }
    }

    public function categories()
    {
        $categories = Category::where('featured', 1)
        ->get();

        $data = CategoryResource::collection($categories);

        return $this->success($data, "Categories");
    }

    public function adminCategories()
    {
        $search = request()->query('search');

        $categories = Category::with(['products', 'subcategory'])
            ->withCount(['products', 'subcategory'])
            ->when($search, function ($query, string $search): void {
                $query->where('name', 'like', '%' . $search . '%');
            })
            ->get();

        $data = AdminCategoryResource::collection($categories);

        return $this->success($data, "Categories retrieved successfully");
    }

    public function createSubCategory($request)
    {
        $category = Category::with('subcategory')->find($request->category_id);

        if(!$category){
            return $this->error(null, "Not found", 404);
        }

        try {
            $folder = null;
            $url = null;

            if(App::environment('production')){
                $folder = '/prod/category/subcategory';
            } elseif(App::environment(['staging', 'local'])) {
                $folder = '/stag/category/subcategory';
            }

            if ($request->hasFile('image')) {
                $path = $request->file('image')->store($folder, 's3');
                $url = Storage::disk('s3')->url($path);
            }

            $category->subcategory()->create([
                'name' => $request->name,
                'slug' => Str::slug($request->name),
                'image' => $url
            ]);

            return $this->success(null, "Created successfully");
        } catch (\Exception $e) {
            return $this->error(null, $e->getMessage(), 500);
        }
    }

    public function getSubcategory($id)
    {
        $subcats = SubCategory::with(['products', 'category'])
        ->where('category_id', $id)
        ->get();

        $data = SubCategoryResource::collection($subcats);

        return $this->success($data, "Sub categories");
    }

    public function featuredStatus($request, $id)
    {
        $category = Category::findOrFail($id);

        if ($request->has('featured')) {
            $category->featured = $request->input('featured') ? 1 : 0;
        }

        if ($request->has('status')) {
            $category->status = $request->input('status') == 1 ? CategoryStatus::ACTIVE : CategoryStatus::INACTIVE;
        }

        $category->save();

        return $this->success(null, "Category updated successfully");
    }

    public function categoryAnalytic()
    {
        $categories = Category::withCount(['subcategory', 'products'])
            ->get();

        $totalActive = $categories->where('status', CategoryStatus::ACTIVE)->count();
        $subCategoryActiveCount = Subcategory::where('status', CategoryStatus::ACTIVE)->count();
        $productActiveCount = Product::where('status', CategoryStatus::ACTIVE)->count();
        $productInactiveCount = Product::where('status', CategoryStatus::INACTIVE)->count();

        $data = [
            'total_count' => $categories->count(),
            'total_active' => $totalActive,
            'sub_category_count' => $categories->sum('subcategory_count'),
            'sub_category_active_count' => $subCategoryActiveCount,
            'product_count' => $productActiveCount,
            'product_inactive_count' => $productInactiveCount,
        ];

        return $this->success($data, "Category analytics");
    }

    public function getAdminSubcategory()
    {
        $search = request()->query('search');

        $subcats = SubCategory::with(['product', 'category'])
            ->withCount(['product', 'category'])
            ->when($search, function ($query, string $search): void {
                $query->where('name', 'like', '%' . $search . '%');
            })
            ->get();

        $data = AdminSubCategoryResource::collection($subcats);

        return $this->success($data, "Sub categories");
    }

    public function subStatus($request, $id)
    {
        $sub = SubCategory::findOrFail($id);

        if ($request->has('status')) {
            $sub->status = $request->input('status') == 1 ? CategoryStatus::ACTIVE : CategoryStatus::INACTIVE;
        }

        $sub->save();

        return $this->success(null, "Category updated successfully");
    }

    public function editCategory($request)
    {
        $category = Category::findOrFail($request->id);
        $folder = App::environment('production') ? '/prod/category' : '/stag/category';

        $url = $category->image;
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store($folder, 's3');
            $url = Storage::disk('s3')->url($path);
        }

        $slug = $category->slug;
        if ($request->has('name')) {
            $slug = Str::slug($request->name);
            if (Category::where('slug', $slug)->where('id', '!=', $request->id)->exists()) {
                $slug = $slug . '-' . uniqid();
            }
        }

        $category->update([
            'name' => $request->name ?? $category->name,
            'slug' => $slug,
            'image' => $url
        ]);

        return $this->success(null, "Updated successfully");
    }

    public function deleteCategory($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();

        return $this->success(null, 'Deleted successfully');
    }

    public function deleteSubCategory($id)
    {
        $subcat = SubCategory::findOrFail($id);
        $subcat->delete();

        return $this->success(null, 'Deleted successfully');
    }
}


