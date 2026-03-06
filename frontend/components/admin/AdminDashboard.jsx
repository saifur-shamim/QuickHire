'use client';

import { useState } from 'react';
import JobsList from './JobsList';
import JobForm from './JobForm';

// Sample jobs data
const jobsData = [
  {
    id: 1,
    title: 'Senior UI Designer',
    company: 'Dropbox',
    location: 'San Francisco, USA',
    category: 'Design',
    type: 'Full Time',
  },
  {
    id: 2,
    title: 'Data Analyst',
    company: 'Tesla',
    location: 'Austin, USA',
    category: 'Technology',
    type: 'Full Time',
  },
];

export default function AdminDashboard({ onAddJob, onDeleteJob }) {
  const [jobs, setJobs] = useState(jobsData);
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  const handleAddJob = async (formData) => {
    // API call will be implemented when backend is ready
    const newJob = {
      id: Math.max(...jobs.map(j => j.id), 0) + 1,
      ...formData,
    };
    setJobs([...jobs, newJob]);
    setShowJobForm(false);
    setEditingJob(null);
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      setJobs(jobs.filter(j => j.id !== jobId));
      onDeleteJob(jobId);
    }
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    setShowJobForm(true);
  };

  return (
    <section className="py-12 bg-gray-50 min-h-[calc(100vh-200px)]">
      <div className="container-custom">
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

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Jobs</p>
                <p className="text-3xl font-bold text-gray-900">{jobs.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-xl">
                📋
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Applications</p>
                <p className="text-3xl font-bold text-gray-900">24</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-xl">
                📧
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Users</p>
                <p className="text-3xl font-bold text-gray-900">156</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-xl">
                👥
              </div>
            </div>
          </div>
        </div>

        {/* Jobs List */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">All Job Listings</h2>
          </div>
          <JobsList
            jobs={jobs}
            onEdit={handleEditJob}
            onDelete={handleDeleteJob}
          />
        </div>

        {/* Job Form Modal */}
        {showJobForm && (
          <JobForm
            job={editingJob}
            onSubmit={handleAddJob}
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
