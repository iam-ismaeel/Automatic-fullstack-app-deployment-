<?php

namespace App\Services\Admin;

use App\Http\Resources\SellerProductResource;
use App\Models\Admin;
use App\Models\Product;
use App\Trait\HttpResponse;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductService
{
    use HttpResponse;

    public function addProduct($request)
    {
        $auth = auth()->user();
        $admin = Admin::with('products')->findOrFail($auth->id);
        $slug = Str::slug($request->name);
        if (Product::where('slug', $slug)->exists()) {
            $slug = $slug . '-' . uniqid();
        }
        $price = $request->product_price;
        if($request->discount_price > 0){
            $price = (int)$request->product_price - (int)$request->discount_price;
        }
        if($request->filled('seller_id')) {
            $id = $request->seller_id;
        } else {
            $ids = $admin->id;
        }
        $folder = null;
        $frontImage = null;
        $name = 'azany';
        if(App::environment('production')){
            $folder = "/prod/product/{$name}";
            $frontImage = "/prod/product/{$name}/front_image";
        } elseif(App::environment(['staging', 'local'])) {
            $folder = "/stag/product/{$name}";
            $frontImage = "/stag/product/{$name}/front_image";
        }
        if ($request->hasFile('front_image')) {
            $path = $request->file('front_image')->store($frontImage, 's3');
            $url = Storage::disk('s3')->url($path);
        }
        $product = Product::create([
            'admin_id' => $ids ?? null,
            'user_id' => $id ?? null,
            'name' => $request->name,
            'slug' => $slug,
            'description' => $request->description,
            'category_id' => $request->category_id,
            'sub_category_id' => $request->sub_category_id,
            'brand_id' => $request->brand_id,
            'color_id' => $request->color_id,
            'unit_id' => $request->unit_id,
            'size_id' => $request->size_id,
            'product_sku' => $request->product_sku,
            'product_price' => $request->product_price,
            'discount_price' => $request->discount_price,
            'price' => $price,
            'current_stock_quantity' => $request->current_stock_quantity,
            'minimum_order_quantity' => $request->minimum_order_quantity,
            'image' => $url,
            'added_by' => $admin->first_name . ' ' . $admin->last_name,
            'country_id' => 160,
            'status' => 'active',
        ]);
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store($folder, 's3');
                $url = Storage::disk('s3')->url($path);

                $product->productimages()->create([
                    'image' => $url,
                ]);
            }
        }
        return $this->success(null, "Added successfully");
    }

    public function getProducts(): array
    {
        $query = Product::query();

        if (request()->filled('seller_id')) {
            $query->where('user_id', request('seller_id'));
        }

        if (request()->filled('search')) {
            $query->where('name', 'like', '%' . request('search') . '%');
        }

        $query->with([
            'productimages',
            'category',
            'subCategory',
            'brand',
            'color',
            'unit',
            'size',
            'shopCountry',
            'orders',
            'productReviews',
        ]);

        $products = $query->paginate(25);

        $data = SellerProductResource::collection($products);

        return [
            'status' => 'true',
            'message' => 'All products',
            'data' => $data,
            'pagination' => [
                'current_page' => $products->currentPage(),
                'last_page' => $products->lastPage(),
                'per_page' => $products->perPage(),
                'prev_page_url' => $products->previousPageUrl(),
                'next_page_url' => $products->nextPageUrl(),
            ],
        ];
    }

    public function getOneProduct($slug)
    {
        $product = Product::where('slug', $slug)->first();

        if(!$product){
            return $this->error(null, "Product not found", 404);
        }

        $data = new SellerProductResource($product);

        return $this->success($data, "Product retrieved successfully");
    }

    public function changeFeatured($request)
    {
        $product = Product::findOrFail($request->product_id);
        $product->is_featured = !$product->is_featured;

        $product->save();
        $status = $product->is_featured ? "Approved successfully" : "Disapproved successfully";

        return $this->success(null, $status);
    }
}





