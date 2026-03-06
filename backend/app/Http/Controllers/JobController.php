<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Http\Requests\StoreJobRequest;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class JobController extends Controller
{
    /**
     * Display a listing of all jobs with pagination and filtering
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = Job::query();

            // Search by title, company, or description
            if ($request->has('search')) {
                $search = $request->input('search');
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhere('company', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%");
                });
            }

            // Filter by category
            if ($request->has('category')) {
                $query->where('category', $request->input('category'));
            }

            // Filter by location
            if ($request->has('location')) {
                $query->where('location', $request->input('location'));
            }

            // Filter by job type
            if ($request->has('type')) {
                $query->where('type', $request->input('type'));
            }

            // Pagination
            $per_page = $request->input('per_page', 15);
            $jobs = $query->orderByDesc('created_at')->paginate($per_page);

            return response()->json([
                'success' => true,
                'message' => 'Jobs retrieved successfully',
                'data' => $jobs->items(),
                'pagination' => [
                    'total' => $jobs->total(),
                    'per_page' => $jobs->perPage(),
                    'current_page' => $jobs->currentPage(),
                    'last_page' => $jobs->lastPage(),
                    'from' => $jobs->firstItem(),
                    'to' => $jobs->lastItem(),
                ],
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving jobs',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Store a newly created job in storage
     */
    public function store(StoreJobRequest $request): JsonResponse
    {
        try {
            $validated = $request->validated();
            $job = Job::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Job created successfully',
                'data' => $job,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error creating job',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified job
     */
    public function show(string $id): JsonResponse
    {
        try {
            $job = Job::find($id);

            if (!$job) {
                return response()->json([
                    'success' => false,
                    'message' => 'Job not found',
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Job retrieved successfully',
                'data' => $job,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving job',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update the specified job in storage
     */
    public function update(StoreJobRequest $request, string $id): JsonResponse
    {
        try {
            $job = Job::find($id);

            if (!$job) {
                return response()->json([
                    'success' => false,
                    'message' => 'Job not found',
                ], 404);
            }

            $validated = $request->validated();
            $job->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Job updated successfully',
                'data' => $job,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating job',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified job from storage
     */
    public function destroy(string $id): JsonResponse
    {
        try {
            $job = Job::find($id);

            if (!$job) {
                return response()->json([
                    'success' => false,
                    'message' => 'Job not found',
                ], 404);
            }

            $job->delete();

            return response()->json([
                'success' => true,
                'message' => 'Job deleted successfully',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error deleting job',
                'error' => $e->getMessage(),
            ], 500);
        }    }
}