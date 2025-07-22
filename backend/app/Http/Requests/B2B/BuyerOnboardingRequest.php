<?php

namespace App\Http\Requests\B2B;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class BuyerOnboardingRequest extends FormRequest
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
            'name' => ['required', 'string'],
            'email' => ['required', 'email', 'email:rfc,dns', 'unique:users,email'],
            'service_type' => ['required', 'string'],
            'average_spend' => ['required', 'string'],
            'company_name' => ['required', 'string'],
            'company_size' => ['required', 'string'],
            'country_id' => ['required', 'integer', 'exists:countries,id'],
            'password' => ['required', 'string', 'confirmed', Password::defaults()]
        ];
    }
}
