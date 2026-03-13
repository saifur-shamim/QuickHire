'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { categoriesAPI, jobsAPI } from '@/services/api';
import { FaPalette, FaChartBar, FaBullseye, FaCoins, FaLaptopCode, FaCode, FaBriefcase, FaUsers } from 'react-icons/fa';

export default function CategoriesSection() {
  const [categories, setCategories] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategoriesAndCounts();
  }, []);

  const fetchCategoriesAndCounts = async () => {
    try {
      setLoading(true);
      // Fetch all categories
      const categoriesResponse = await categoriesAPI.getAll();
      const cats = categoriesResponse.data || [];
      setCategories(cats);

      // Fetch all jobs to count per category
      const jobsResponse = await jobsAPI.getAll({ per_page: 1000 });
      const allJobs = jobsResponse.data || [];

      // Count jobs per category
      const counts = {};
      cats.forEach(cat => {
        counts[cat.id] = allJobs.filter(job => job.category_id === cat.id).length;
      });
      setCategoryCounts(counts);
    } catch (err) {
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (categoryName) => {
    const iconMap = {
      'design': FaPalette,
      'sales': FaChartBar,
      'marketing': FaBullseye,
      'finance': FaCoins,
      'technology': FaLaptopCode,
      'engineering': FaCode,
      'business': FaBriefcase,
      'human resource': FaUsers,
    };
    return iconMap[categoryName.toLowerCase()] || FaBriefcase;
  };

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Explore by <span className="text-gradient">category</span>
          </h2>
          <Link href="/jobs" className="text-primary hover:text-purple-700 font-semibold flex items-center gap-2 transition-colors">
            Show all jobs
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const jobCount = categoryCounts[category.id] || 0;
            const IconComponent = getCategoryIcon(category.name);
            
            return (
              <Link
                key={category.id}
                href={`/jobs?category=${category.name.toLowerCase()}`}
                className="p-6 rounded-xl transition-all duration-300 bg-gray-50 text-gray-900 hover:bg-gradient-to-br hover:from-primary hover:to-secondary hover:text-white hover:shadow-lg cursor-pointer transform hover:scale-105"
              >
                <div className="text-4xl mb-4">
                  <IconComponent className="w-10 h-10" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                <div className="text-gray-600 hover:text-white/80">
                  {jobCount} {jobCount === 1 ? 'job available' : 'jobs available'}
                </div>
                <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
