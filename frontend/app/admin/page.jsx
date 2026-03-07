'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { jobsAPI } from '@/services/api';

export default function AdminPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await jobsAPI.getAll({ per_page: 100 });
      setJobs(response.data || []);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleAddJob = async (jobData) => {
    try {
      await jobsAPI.create(jobData);
      fetchJobs();
      alert('Job added successfully!');
    } catch (err) {
      console.error('Error adding job:', err);
      alert('Failed to add job');
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (confirm('Are you sure you want to delete this job?')) {
      try {
        await jobsAPI.delete(jobId);
        fetchJobs();
        alert('Job deleted successfully!');
      } catch (err) {
        console.error('Error deleting job:', err);
        alert('Failed to delete job');
      }
    }
  };

  return (
    <main className="w-full">
      <Header />
      <AdminDashboard
        jobs={jobs}
        loading={loading}
        onAddJob={handleAddJob}
        onDeleteJob={handleDeleteJob}
      />
      <Footer />
    </main>
  );
}
