<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Application;
use App\Models\Category;

class Job extends Model
{
    protected $table = 'job_listings';

    protected $fillable = [
        'title',
        'company',
        'location',
        'category_id',
        'type',
        'salary_min',
        'salary_max',
        'description',
        'requirements',
        'benefits',
        'logo',
        'is_featured',
    ];

    protected $casts = [
        'requirements' => 'array',
        'benefits' => 'array',
        'is_featured' => 'boolean',
    ];

    /**
     * Get the category of this job
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    /**
     * Get all applications for this job
     */
    public function applications(): HasMany
    {
        return $this->hasMany(Application::class, 'job_listing_id');
    }

}
