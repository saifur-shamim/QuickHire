'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import JobCard from './JobCard';
import { categoriesAPI } from '@/services/api';

export default function JobsListingView({
  jobs = [],
  loading = false,
  error = null,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedLocation,
  setSelectedLocation,
}) {
  const [showFilters, setShowFilters] = useState(false);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);

  // Fetch categories from API on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoriesAPI.getAll();
      setCategories(response.data || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  // Extract unique locations from jobs
  useEffect(() => {
    if (jobs && jobs.length > 0) {
      const uniqueLocations = [...new Set(jobs.map(job => job.location))].sort();
      setLocations(uniqueLocations);
    }
  }, [jobs]);

  // Filter jobs based on search and selected filters
  const filteredJobs = jobs.filter(job => {
    const matchSearch = !searchTerm || 
      job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Location filtering (category already filtered by API)
    const matchLocation = !selectedLocation || job.location?.toLowerCase() === selectedLocation?.toLowerCase();
    
    return matchSearch && matchLocation;
  });

  return (
    <section className="py-12 bg-gray-50 min-h-[calc(100vh-200px)]">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Find your dream job
          </h1>
          <p className="text-gray-600">
            {loading ? 'Loading jobs...' : `Showing ${filteredJobs.length} of ${jobs.length} jobs`}
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          {/* Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by job title, company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              className="btn-primary"
              onClick={() => setShowFilters(!showFilters)}
            >
              <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">Location</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">All Locations</option>
                  {locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Active Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory('')}
              className="bg-primary text-white px-4 py-2 rounded-full text-sm flex items-center gap-2 hover:bg-opacity-90"
            >
              {selectedCategory}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          {selectedLocation && (
            <button
              onClick={() => setSelectedLocation('')}
              className="bg-primary text-white px-4 py-2 rounded-full text-sm flex items-center gap-2 hover:bg-opacity-90"
            >
              {selectedLocation}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
          </div>
        )}

        {/* Jobs List */}
        {!loading && filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {filteredJobs.map(job => (
              <JobCard key={job.id} job={job} featured={false} />
            ))}
          </div>
        ) : !loading ? (
          <div className="text-center py-16">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600 mb-6">
              {jobs.length === 0 
                ? 'No jobs available right now. Check back soon!'
                : 'Try adjusting your search or filters to find more jobs.'}
            </p>
            {jobs.length > 0 && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                  setSelectedLocation('');
                }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}
