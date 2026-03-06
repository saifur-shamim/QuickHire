'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AdminDashboard from '@/components/admin/AdminDashboard';

export default function AdminPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch jobs from API when backend is ready
    setLoading(false);
  }, []);

  const handleAddJob = async (jobData) => {
    // Call API to add job
    console.log('Adding job:', jobData);
  };

  const handleDeleteJob = async (jobId) => {
    // Call API to delete job
    console.log('Deleting job:', jobId);
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
