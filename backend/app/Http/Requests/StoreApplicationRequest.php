<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreApplicationRequest extends FormRequest
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
            'job_listing_id' => 'required|integer|exists:job_listings,id',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'resume_link' => 'required|url',
            'cover_note' => 'required|string',
        ];
    }

    public function messages(): array
    {
        return [
            'job_listing_id.required' => 'Job ID is required',
            'job_listing_id.exists' => 'The selected job does not exist',
            'name.required' => 'Your name is required',
            'email.required' => 'Email address is required',
            'email.email' => 'Please provide a valid email address',
            'resume_link.required' => 'Resume link is required',
            'resume_link.url' => 'Resume link must be a valid URL',
            'cover_note.required' => 'Cover note is required',
        ];
    }
}
