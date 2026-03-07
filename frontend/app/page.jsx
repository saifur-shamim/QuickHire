'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import FeaturedJobsSection from '@/components/home/FeaturedJobsSection';
import LatestJobsSection from '@/components/home/LatestJobsSection';
import AdminPromoBanner from '@/components/home/AdminPromoBanner';
import { jobsAPI } from '@/services/api';

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await jobsAPI.getAll({ per_page: 50 });
      setJobs(response.data || []);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full">
      <Header />
      <HeroSection />
      <CategoriesSection />
      <FeaturedJobsSection jobs={jobs} loading={loading} />
      <AdminPromoBanner />
      <LatestJobsSection jobs={jobs} loading={loading} />
      <Footer />
    </main>
  );
}
