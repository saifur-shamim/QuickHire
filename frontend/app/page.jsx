'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import FeaturedJobsSection from '@/components/home/FeaturedJobsSection';
import LatestJobsSection from '@/components/home/LatestJobsSection';
import AdminPromoBanner from '@/components/home/AdminPromoBanner';

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Jobs will be fetched from API when backend is ready
    setLoading(false);
  }, []);

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
