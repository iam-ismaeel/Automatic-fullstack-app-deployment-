<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdminOrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => (int)$this->id,
            'order_no' => (string)$this->order_no,
            'quantity' => (string)$this->product_quantity,
            'order_date' => (string)$this->order_date,
            'total_amount' => (string)$this->total_amount,
            'payment_method' => (string)$this->payment_method,
            'status' => (string)$this->status,
            'products' => $this->products ? $this->products->map(function ($product): array {
                return [
                    'name' => $product?->name,
                    'category' => $product?->category?->name,
                    'image' => $product?->image,
                ];
            })->toArray() : [],
            'seller' => (object) [
                'name' => optional($this->seller)->first_name . ' ' . optional($this->seller)->last_name,
                'location' => optional($this->seller)->address,
                'state' => $this->seller?->state?->name,
                'country' => $this->seller?->userCountry?->name,
            ],
            'customer' => (object) [
                'name' => optional($this->user)->first_name . ' ' . optional($this->user)->last_name,
                'phone' => optional($this->user)->phone,
                'email' => optional($this->user)->email,
            ],
        ];
    }
}
