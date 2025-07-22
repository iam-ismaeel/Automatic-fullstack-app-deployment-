<?php

namespace App\Services;

use App\Http\Resources\CartResource;
use App\Models\Cart;
use App\Models\Product;
use App\Trait\HttpResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartService
{
    use HttpResponse;

    public function addToCart($request)
    {
        $currentUserId = userAuth()->id;

        if ($currentUserId != $request->user_id) {
            return $this->error(null, 'Unauthorized action.', 401);
        }

        session(['cart_id' => session_id()]);
        $sessionId = session('cart_id');
        $quantity = $request->quantity;

        if($quantity <= 0){
            return $this->error(null, 'Quantity should be 1 or more.', 403);
        }

        $product = Product::findOrFail($request->product_id);

        if($quantity > $product->minimum_order_quantity) {
            return $this->error(null, "You can only order a maximum of {$product->minimum_order_quantity} of this product.", 400);
        }

        Cart::updateOrCreate([
            'user_id' => $currentUserId ?: null,
            'session_id' => $sessionId,
            'product_id' => $request->product_id,
        ], [
            'quantity' => $quantity,
        ]);

        return $this->success(null, "Item added to cart");
    }

    public function getCartItems($userId)
    {
        $currentUserId = userAuth()->id;

        if ($currentUserId != $userId) {
            return $this->error(null, 'Unauthorized action.', 401);
        }

        $sessionId = session('cart_id');

        $cartItemsQuery = Cart::with([
            'product.user',
            'product.category',
            'product.subCategory',
            'product.color',
            'product.size',
            'product.unit',
            'product.brand',
            'product.shopCountry',
        ]);

        if (Auth::check()) {
            $cartItemsQuery->where('user_id', $userId);
        } else {
            $cartItemsQuery->where('session_id', $sessionId);
        }

        $cartItems = $cartItemsQuery->get();

        $localItems = $cartItems->filter(function ($cartItem): bool {
            return $cartItem->product->country_id == 160;
        });

        $internationalItems = $cartItems->filter(function ($cartItem): bool {
            return $cartItem->product->country_id != 160;
        });

        $defaultCurrency = userAuth()->default_currency;

        $totalLocalPrice = $localItems->sum(function ($item) use ($defaultCurrency): float {
            $price = optional($item->product)->price * $item->quantity;
            return currencyConvert(optional($item->product->shopCountry)->currency, $price, $defaultCurrency);
        });

        $totalInternationalPrice = $internationalItems->sum(function ($item) use ($defaultCurrency): float {
            $price = optional($item->product)->price * $item->quantity;
            return currencyConvert(optional($item->product->shopCountry)->currency, $price, $defaultCurrency);
        });

        return $this->success([
            'local_items' => CartResource::collection($localItems),
            'international_items' => CartResource::collection($internationalItems),
            'total_local_price' => $totalLocalPrice,
            'total_international_price' => $totalInternationalPrice,
        ], "Cart items");
    }

    public function removeCartItem($userId, $cartId)
    {
        $currentUserId = userAuth()->id;

        if ($currentUserId != $userId) {
            return $this->error(null, 'Unauthorized action.', 401);
        }

        Cart::where('user_id', $userId)
        ->where('id', $cartId)
        ->delete();

        return $this->success(null, "Item removed from cart");
    }

    public function clearCart($userId)
    {
        $currentUserId = userAuth()->id;

        if ($currentUserId != $userId) {
            return $this->error(null, 'Unauthorized action.', 401);
        }

        $sessionId = session('cart_id');

        if (Auth::check()) {
            Cart::where('user_id', $userId)->delete();
        } else {
            Cart::where('session_id', $sessionId)->delete();
        }

        session()->forget('cart_id');

        return $this->success(null, "Items cleared from cart");
    }

    public function updateCart(Request $request)
    {
        $currentUserId = userAuth()->id;

        if ($currentUserId != $request->user_id) {
            return $this->error(null, 'Unauthorized action.', 401);
        }

        $productId = $request->product_id;
        $quantity = $request->quantity;

        if($quantity <= 0) {
            return $this->error(null, 'Quantity should be 1 or more.', 403);
        }

        $product = Product::findOrFail($request->product_id);

        if($quantity > $product->minimum_order_quantity) {
            return $this->error(null, 'You have exceeded the minimum order quantity', 400);
        }

        $cartItem = Cart::where('user_id', $currentUserId)
        ->where('product_id', $productId)
        ->firstOrFail();
        $cartItem->update(['quantity' => $quantity]);

        return $this->success(null, 'Cart quantity updated successfully');
    }
}




