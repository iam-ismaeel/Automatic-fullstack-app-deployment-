<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'user_id' => ['required', 'integer', 'exists:users,id'],
            'name' => ['required', 'string', 'max:200'],
            'description' => ['required', 'string'],
            'category_id' => ['required', 'integer', 'exists:categories,id'],
            'product_price' => ['required', 'integer'],
            'current_stock_quantity' => ['required', 'integer'],
            'minimum_order_quantity' => ['required', 'integer'],
            'front_image' => ['required', 'image', 'mimes:png,jpg,jpeg'],
            'images' => ['required', 'array'],
            'images.*' => ['required', 'image'],
        ];
    }
}
