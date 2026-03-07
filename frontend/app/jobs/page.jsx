'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import JobsListingView from '@/components/jobs/JobsListingView';
import { jobsAPI } from '@/services/api';

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await jobsAPI.getAll({
        search: searchTerm,
        category: selectedCategory,
        location: selectedLocation,
        per_page: 50,
      });
      setJobs(response.data || []);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('Failed to load jobs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    delayedSearch();
  }, [searchTerm, selectedCategory, selectedLocation]);

  const delayedSearch = () => {
    const timer = setTimeout(() => {
      fetchJobs();
    }, 500);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    // Local filter jobs based on API response
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
        error={error}
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
