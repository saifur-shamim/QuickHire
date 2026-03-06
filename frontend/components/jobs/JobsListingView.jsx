'use client';

import { useState } from 'react';
import Link from 'next/link';
import JobCard from './JobCard';

// Sample jobs data for demo
const allJobsData = [
  {
    id: 1,
    title: 'Email Marketing',
    company: 'Recruit',
    location: 'Madrid, Spain',
    type: 'Full Time',
    categories: ['Marketing'],
    logo: '📧',
  },
  {
    id: 2,
    title: 'Senior Designer',
    company: 'Dropbox',
    location: 'San Francisco, US',
    type: 'Full Time',
    categories: ['Design'],
    logo: '🎨',
  },
  {
    id: 3,
    title: 'Email Marketing',
    company: 'Pitch',
    location: 'Berlin, Germany',
    type: 'Full Time',
    categories: ['Marketing'],
    logo: '✉️',
  },
  {
    id: 4,
    title: 'Visual Designer',
    company: 'Blinket',
    location: 'Granada, Spain',
    type: 'Full Time',
    categories: ['Design'],
    logo: '👁️',
  },
  {
    id: 5,
    title: 'Product Designer',
    company: 'ClassPass',
    location: 'Manchester, UK',
    type: 'Full Time',
    categories: ['Design'],
    logo: '🎯',
  },
  {
    id: 6,
    title: 'Social Media Assistant',
    company: 'Nomad',
    location: 'Paris, France',
    type: 'Full Time',
    categories: ['Marketing'],
    logo: '📱',
  },
];

const categories = ['Design', 'Marketing', 'Sales', 'Finance', 'Technology', 'Engineering', 'Business', 'Human Resource'];
const locations = ['Madrid, Spain', 'San Francisco, US', 'Berlin, Germany', 'Granada, Spain', 'Manchester, UK', 'Paris, France'];

export default function JobsListingView({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedLocation,
  setSelectedLocation,
}) {
  const [showFilters, setShowFilters] = useState(false);

  // Filter jobs
  const filteredJobs = allJobsData.filter(job => {
    const matchSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = !selectedCategory || job.categories.includes(selectedCategory);
    const matchLocation = !selectedLocation || job.location === selectedLocation;
    
    return matchSearch && matchCategory && matchLocation;
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
            Showing {filteredJobs.length} of {allJobsData.length} jobs
          </p>
        </div>

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
                    <option key={cat} value={cat}>{cat}</option>
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

        {/* Jobs List */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {filteredJobs.map(job => (
              <JobCard key={job.id} job={job} featured={false} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filters to find more jobs.
            </p>
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
          </div>
        )}
      </div>
    </section>
  );
}
