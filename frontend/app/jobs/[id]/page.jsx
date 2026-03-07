'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import JobDetailView from '@/components/jobs/JobDetailView';
import { jobsAPI } from '@/services/api';

export default function JobDetailPage() {
  const params = useParams();
  const jobId = params?.id;
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (jobId) {
      fetchJobDetail();
    }
  }, [jobId]);

  const fetchJobDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await jobsAPI.getById(jobId);
      setJob(response.data);
    } catch (err) {
      console.error('Error fetching job:', err);
      setError('Failed to load job details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full">
      <Header />
      <JobDetailView job={job} loading={loading} error={error} />
      <Footer />
    </main>
  );
}
