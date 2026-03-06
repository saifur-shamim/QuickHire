'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import JobDetailView from '@/components/jobs/JobDetailView';

export default function JobDetailPage() {
  const params = useParams();
  const jobId = params?.id;
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (jobId) {
      // Fetch job detail from API when backend is ready
      setLoading(false);
    }
  }, [jobId]);

  return (
    <main className="w-full">
      <Header />
      <JobDetailView job={job} loading={loading} error={error} />
      <Footer />
    </main>
  );
}
