<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class B2BPaymentRequest extends FormRequest
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
            'email' => ['required', 'email', 'email:rfc,dns'],
            'amount' => ['required', 'integer'],
            'currency' => ['required', 'string', 'in:NGN,USD'],
            'payment_redirect_url' => ['required', 'url'],
            'items' => ['required', 'array'],
            'items.*.product_id' => ['required', 'integer', 'exists:b2b_products,id'],
        ];
    }
}
