<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Application;

class Job extends Model
{
    protected $fillable = [
        'title',
        'company',
        'location',
        'category',
        'type',
        'salary_min',
        'salary_max',
        'description',
        'requirements',
        'benefits',
        'logo',
    ];

    protected $casts = [
        'requirements' => 'array',
        'benefits' => 'array',
    ];

    /**
     * Get all applications for this job
     */
    public function applications(): HasMany
    {
        return $this->hasMany(Application::class);
    }}