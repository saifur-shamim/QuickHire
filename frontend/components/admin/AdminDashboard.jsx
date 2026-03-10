'use client';

import { useState } from 'react';
import JobsList from './JobsList';
import JobForm from './JobForm';
import ApplicationsList from './ApplicationsList';

export default function AdminDashboard({ 
  jobs = [], 
  applications = [],
  loading = false,
  error = null,
  onAddJob,
  onEditJob,
  onDeleteJob,
  onRefresh
}) {
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [activeTab, setActiveTab] = useState('jobs');

  const featuredJobs = jobs.filter(job => job.is_featured === true).length;
  const activeJobs = jobs.length;
  const totalApplications = applications.length;

  const handleAddOrEditJob = async (formData) => {
    if (editingJob) {
      await onEditJob(editingJob.id, formData);
    } else {
      await onAddJob(formData);
    }
    setShowJobForm(false);
    setEditingJob(null);
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    setShowJobForm(true);
  };

  const handleDeleteJob = (jobId) => {
    onDeleteJob(jobId);
  };

  return (
    <section className="py-12 bg-gray-50 min-h-[calc(100vh-200px)]">
      <div className="container-custom">
        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-8">
            {error}
            <button 
              onClick={onRefresh}
              className="ml-4 underline font-semibold hover:text-red-800"
            >
              Retry
            </button>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Manage job listings and applications
            </p>
          </div>
          <button
            onClick={() => {
              setEditingJob(null);
              setShowJobForm(true);
            }}
            className="btn-primary flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Post New Job
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Jobs Posted</p>
                <p className="text-4xl font-bold text-gray-900 mt-2">{activeJobs}</p>
              </div>
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
                📋
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Featured Jobs</p>
                <p className="text-4xl font-bold text-purple-600 mt-2">{featuredJobs}</p>
              </div>
              <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center text-2xl">
                ⭐
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Applications</p>
                <p className="text-4xl font-bold text-green-600 mt-2">{totalApplications}</p>
              </div>
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center text-2xl">
                📧
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="border-b border-gray-200 flex">
            <button
              onClick={() => setActiveTab('jobs')}
              className={`flex-1 py-4 px-6 font-semibold text-center transition-colors ${
                activeTab === 'jobs'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🏢 Job Listings ({activeJobs})
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`flex-1 py-4 px-6 font-semibold text-center transition-colors ${
                activeTab === 'applications'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📨 Applications ({totalApplications})
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
              </div>
            ) : activeTab === 'jobs' ? (
              <div>
                {activeJobs > 0 ? (
                  <JobsList
                    jobs={jobs}
                    onEdit={handleEditJob}
                    onDelete={handleDeleteJob}
                  />
                ) : (
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-gray-600 text-lg font-medium">No jobs posted yet</p>
                    <p className="text-gray-500 mt-1">Start by posting your first job</p>
                  </div>
                )}
              </div>
            ) : (
              <ApplicationsList applications={applications} />
            )}
          </div>
        </div>

        {/* Job Form Modal */}
        {showJobForm && (
          <JobForm
            job={editingJob}
            onSubmit={handleAddOrEditJob}
            onClose={() => {
              setShowJobForm(false);
              setEditingJob(null);
            }}
          />
        )}
      </div>
    </section>
  );
}
