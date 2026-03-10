'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { jobsAPI, applicationsAPI } from '@/services/api';

export default function AdminPage() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobsAndApplications();
  }, []);

  const fetchJobsAndApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      const jobsResponse = await jobsAPI.getAll({ per_page: 100 });
      const appsResponse = await applicationsAPI.getAll();
      setJobs(jobsResponse.data || []);
      setApplications(appsResponse.data || []);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddJob = async (jobData) => {
    try {
      await jobsAPI.create(jobData);
      await fetchJobsAndApplications();
      alert('Job added successfully!');
    } catch (err) {
      console.error('Error adding job:', err);
      alert('Failed to add job');
    }
  };

  const handleEditJob = async (jobId, jobData) => {
    try {
      await jobsAPI.update(jobId, jobData);
      await fetchJobsAndApplications();
      alert('Job updated successfully!');
    } catch (err) {
      console.error('Error updating job:', err);
      alert('Failed to update job');
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (confirm('Are you sure you want to delete this job?')) {
      try {
        await jobsAPI.delete(jobId);
        await fetchJobsAndApplications();
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
        applications={applications}
        loading={loading}
        error={error}
        onAddJob={handleAddJob}
        onEditJob={handleEditJob}
        onDeleteJob={handleDeleteJob}
        onRefresh={fetchJobsAndApplications}
      />
      <Footer />
    </main>
  );
}
