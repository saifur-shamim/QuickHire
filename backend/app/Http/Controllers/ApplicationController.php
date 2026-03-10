<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Job;
use App\Http\Requests\StoreApplicationRequest;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ApplicationController extends Controller
{
    /**
     * Display all applications (Admin)
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = Application::with('job');

            // Filter by job_listing_id
            if ($request->has('job_listing_id')) {
                $query->where('job_listing_id', $request->input('job_listing_id'));
            }

            $per_page = $request->input('per_page', 20);
            $applications = $query->orderByDesc('created_at')->paginate($per_page);

            return response()->json([
                'success' => true,
                'message' => 'Applications retrieved successfully',
                'data' => $applications->items(),
                'pagination' => [
                    'total' => $applications->total(),
                    'per_page' => $applications->perPage(),
                    'current_page' => $applications->currentPage(),
                    'last_page' => $applications->lastPage(),
                ],
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving applications',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Store a newly created application
     */
    public function store(StoreApplicationRequest $request): JsonResponse
    {
        try {
            $validated = $request->validated();
            $application = Application::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Application submitted successfully',
                'data' => $application,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error submitting application',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified application
     */
    public function show(string $id): JsonResponse
    {
        try {
            $application = Application::with('job')->find($id);

            if (!$application) {
                return response()->json([
                    'success' => false,
                    'message' => 'Application not found',
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Application retrieved successfully',
                'data' => $application,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving application',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get applications for a specific job
     */
    public function jobApplications(string $jobId): JsonResponse
    {
        try {
            $job = Job::find($jobId);

            if (!$job) {
                return response()->json([
                    'success' => false,
                    'message' => 'Job not found',
                ], 404);
            }

            $applications = Application::where('job_listing_id', $jobId)
                ->orderByDesc('created_at')
                ->get();

            return response()->json([
                'success' => true,
                'message' => 'Job applications retrieved successfully',
                'data' => $applications,
                'count' => count($applications),
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving job applications',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified application
     */
    public function destroy(string $id): JsonResponse
    {
        try {
            $application = Application::find($id);

            if (!$application) {
                return response()->json([
                    'success' => false,
                    'message' => 'Application not found',
                ], 404);
            }

            $application->delete();

            return response()->json([
                'success' => true,
                'message' => 'Application deleted successfully',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error deleting application',
                'error' => $e->getMessage(),
            ], 500);
        }    }
}