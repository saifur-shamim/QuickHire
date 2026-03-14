'use client';

import { useState } from 'react';
import JobsList from './JobsList';
import JobForm from './JobForm';
import ApplicationsList from './ApplicationsList';

export default function AdminDashboard({
  jobs = [],
  applications = [],
  categories = [],
  loading = false,
  error = null,
  search = '',
  categoryId = '',
  page = 1,
  pagination = null,
  onSearchChange,
  onCategoryChange,
  onPageChange,
  onAddJob,
  onEditJob,
  onDeleteJob,
  onRefresh,
}) {
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [activeTab, setActiveTab] = useState('jobs');

  const totalJobs = pagination?.total ?? jobs.length;
  const featuredJobs = jobs.filter((j) => j.is_featured === true).length;
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

  // ── Pagination helpers ──────────────────────────────────────────────────────
  const lastPage = pagination?.last_page ?? 1;
  const from = pagination?.from ?? (jobs.length > 0 ? 1 : 0);
  const to = pagination?.to ?? jobs.length;

  const pageNumbers = () => {
    const pages = [];
    const delta = 2;
    const left = Math.max(1, page - delta);
    const right = Math.min(lastPage, page + delta);
    if (left > 1) { pages.push(1); if (left > 2) pages.push('...'); }
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < lastPage) { if (right < lastPage - 1) pages.push('...'); pages.push(lastPage); }
    return pages;
  };

  return (
    <section className="py-12 bg-gray-50 min-h-[calc(100vh-200px)]">
      <div className="container-custom">
        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-8">
            {error}
            <button onClick={onRefresh} className="ml-4 underline font-semibold hover:text-red-800">
              Retry
            </button>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage job listings and applications</p>
          </div>
          <button
            onClick={() => { setEditingJob(null); setShowJobForm(true); }}
            className="btn-primary flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Job
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Jobs Posted</p>
                <p className="text-4xl font-bold text-gray-900 mt-2">{totalJobs}</p>
              </div>
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">📋</div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Featured Jobs</p>
                <p className="text-4xl font-bold text-purple-600 mt-2">{featuredJobs}</p>
              </div>
              <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center text-2xl">⭐</div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Applications</p>
                <p className="text-4xl font-bold text-green-600 mt-2">{totalApplications}</p>
              </div>
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center text-2xl">📧</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="border-b border-gray-200 flex">
            <button
              onClick={() => setActiveTab('jobs')}
              className={`flex-1 py-4 px-6 font-semibold text-center transition-colors ${
                activeTab === 'jobs' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🏢 Job Listings ({totalJobs})
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`flex-1 py-4 px-6 font-semibold text-center transition-colors ${
                activeTab === 'applications' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📨 Applications ({totalApplications})
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'jobs' && (
              <>
                {/* Search + Filter bar */}
                <div className="flex flex-col sm:flex-row gap-3 mb-5">
                  {/* Search input */}
                  <div className="relative flex-1">
                    <svg
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z" />
                    </svg>
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => onSearchChange?.(e.target.value)}
                      placeholder="Search by job title or company..."
                      className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                    {search && (
                      <button
                        onClick={() => onSearchChange?.('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Category filter */}
                  <select
                    value={categoryId}
                    onChange={(e) => onCategoryChange?.(e.target.value)}
                    className="sm:w-52 px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white"
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                {/* Jobs table or empty state */}
                {loading ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
                  </div>
                ) : jobs.length > 0 ? (
                  <>
                    <JobsList jobs={jobs} onEdit={handleEditJob} onDelete={onDeleteJob} />

                    {/* Pagination */}
                    {lastPage > 1 && (
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-5 pt-4 border-t border-gray-100">
                        <p className="text-sm text-gray-500">
                          Showing {from}–{to} of {pagination?.total} jobs
                        </p>
                        <div className="flex items-center gap-1">
                          {/* Prev */}
                          <button
                            onClick={() => onPageChange?.(page - 1)}
                            disabled={page === 1}
                            className="px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                          >
                            ← Prev
                          </button>

                          {pageNumbers().map((p, i) =>
                            p === '...' ? (
                              <span key={`ellipsis-${i}`} className="px-2 text-gray-400">…</span>
                            ) : (
                              <button
                                key={p}
                                onClick={() => onPageChange?.(p)}
                                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                                  p === page
                                    ? 'bg-primary text-white border border-primary'
                                    : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                                }`}
                              >
                                {p}
                              </button>
                            )
                          )}

                          {/* Next */}
                          <button
                            onClick={() => onPageChange?.(page + 1)}
                            disabled={page === lastPage}
                            className="px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                          >
                            Next →
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-gray-600 text-lg font-medium">
                      {search || categoryId ? 'No jobs match your search' : 'No jobs posted yet'}
                    </p>
                    <p className="text-gray-500 mt-1">
                      {search || categoryId ? 'Try different keywords or clear the filter' : 'Start by posting your first job'}
                    </p>
                  </div>
                )}
              </>
            )}

            {activeTab === 'applications' && (
              loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
                </div>
              ) : (
                <ApplicationsList applications={applications} />
              )
            )}
          </div>
        </div>

        {/* Job Form Modal */}
        {showJobForm && (
          <JobForm
            job={editingJob}
            onSubmit={handleAddOrEditJob}
            onClose={() => { setShowJobForm(false); setEditingJob(null); }}
          />
        )}
      </div>
    </section>
  );
}
