'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import JobsListingView from '@/components/jobs/JobsListingView';
import { jobsAPI, categoriesAPI } from '@/services/api';

export default function JobsPage() {
  const searchParams = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);

  // Fetch categories on mount (FIRST, before reading URL params)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesAPI.getAll();
        setCategories(response.data || []);
        setCategoriesLoaded(true);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setCategoriesLoaded(true); // Still mark as loaded even if error
      }
    };
    fetchCategories();
  }, []);

  // Read URL parameters AFTER categories are loaded
  useEffect(() => {
    if (!categoriesLoaded) return;

    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      // Normalize the category name to match database case
      const normalizedCategory = categoryParam
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      setSelectedCategory(normalizedCategory);
    }
    
    const searchParam = searchParams.get('search');
    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, [searchParams, categoriesLoaded]);

  // Fetch jobs when filters change (but NOT when categories list changes)
  useEffect(() => {
    if (!categoriesLoaded || categories.length === 0) return;
    fetchJobs();
  }, [selectedCategory, searchTerm, selectedLocation]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Find category_id from category name
      let categoryId = '';
      if (selectedCategory && categories.length > 0) {
        const category = categories.find(
          cat => cat.name.toLowerCase() === selectedCategory.toLowerCase()
        );
        if (category) {
          categoryId = category.id;
        }
      }

      const response = await jobsAPI.getAll({
        search: searchTerm,
        category_id: categoryId, // Send numeric ID to API
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

  return (
    <main className="w-full">
      <Header />
      <JobsListingView
        jobs={jobs}
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
