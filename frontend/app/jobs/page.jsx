'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import JobsListingView from '@/components/jobs/JobsListingView';

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    // Load jobs from API when backend is ready
    setLoading(false);
  }, []);

  useEffect(() => {
    // Filter jobs based on search and filters
    let filtered = jobs.filter(job => {
      const matchSearch = job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = !selectedCategory || job.category === selectedCategory;
      const matchLocation = !selectedLocation || job.location === selectedLocation;
      
      return matchSearch && matchCategory && matchLocation;
    });
    
    setFilteredJobs(filtered);
  }, [jobs, searchTerm, selectedCategory, selectedLocation]);

  return (
    <main className="w-full">
      <Header />
      <JobsListingView
        jobs={filteredJobs}
        loading={loading}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />
      <Footer />
    </main>
  );
}
