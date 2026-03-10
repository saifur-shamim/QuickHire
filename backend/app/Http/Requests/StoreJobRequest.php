<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreJobRequest extends FormRequest
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
            'title' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'category_id' => 'required|integer|exists:categories,id',
            'type' => 'required|string|in:Full Time,Part Time,Internship,Freelance',
            'salary_min' => 'nullable|numeric|min:0',
            'salary_max' => 'nullable|numeric|min:0|gte:salary_min',
            'description' => 'required|string',
            'requirements' => 'nullable|array',
            'requirements.*' => 'string',
            'benefits' => 'nullable|array',
            'benefits.*' => 'string',
            'logo' => 'nullable|string|max:255',
            'is_featured' => 'nullable|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Job title is required',
            'company.required' => 'Company name is required',
            'location.required' => 'Job location is required',
            'category_id.required' => 'Job category is required',
            'category_id.exists' => 'Selected category does not exist',
            'type.required' => 'Job type is required',
            'type.in' => 'Job type must be one of: Full Time, Part Time, Internship, Freelance',
            'description.required' => 'Job description is required',
            'salary_max.gte' => 'Maximum salary must be greater than or equal to minimum salary',
        ];
    }
}
