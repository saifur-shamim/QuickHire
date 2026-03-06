<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Job;

class Application extends Model
{
    protected $fillable = [
        'job_id',
        'name',
        'email',
        'resume_link',
        'cover_note',
    ];

    /**
     * Get the job this application belongs to
     */
    public function job(): BelongsTo
    {
        return $this->belongsTo(Job::class);
    }}