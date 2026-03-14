<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JobController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\CategoryController;

// Categories endpoints
Route::get('/categories', [CategoryController::class, 'index']);

// Jobs endpoints
Route::get('/jobs', [JobController::class, 'index']);
Route::post('/jobs', [JobController::class, 'store']);
Route::get('/jobs/{id}', [JobController::class, 'show']);
Route::put('/jobs/{id}', [JobController::class, 'update']);
Route::delete('/jobs/{id}', [JobController::class, 'destroy']);

// Applications endpoints
Route::post('/applications', [ApplicationController::class, 'store']);
Route::get('/applications', [ApplicationController::class, 'index']);
Route::get('/applications/{id}', [ApplicationController::class, 'show']);
Route::delete('/applications/{id}', [ApplicationController::class, 'destroy']);
Route::get('/jobs/{jobId}/applications', [ApplicationController::class, 'jobApplications']);


