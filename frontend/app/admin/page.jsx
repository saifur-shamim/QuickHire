'use client';

import { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { jobsAPI, applicationsAPI, categoriesAPI } from '@/services/api';

const PER_PAGE = 10;

export default function AdminPage() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [applicationSearch, setApplicationSearch] = useState('');
  const [applicationPage, setApplicationPage] = useState(1);
  const [applicationPagination, setApplicationPagination] = useState(null);

  // Search / filter / pagination state
  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  // Debounce search: reset to page 1 and fetch after 400ms idle
  const debounceRef = useRef(null);
  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchJobs(1, value, categoryId), 400);
  };

  const handleCategoryChange = (value) => {
    setCategoryId(value);
    setPage(1);
    fetchJobs(1, search, value);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchJobs(newPage, search, categoryId);
  };

  const fetchJobs = async (p = page, s = search, cat = categoryId) => {
    try {
      setLoading(true);
      setError(null);
      const params = { page: p, per_page: PER_PAGE };
      if (s) params.search = s;
      if (cat) params.category_id = cat;
      const res = await jobsAPI.getAll(params);
      setJobs(res.data || []);
      setPagination(res.pagination || null);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async (p, s) => {
    const currentPage = p ?? applicationPage;
    const currentSearch = s ?? applicationSearch;
    try {
      const params = { page: currentPage, per_page: 20 };
      if (currentSearch) params.search = currentSearch;
      const res = await applicationsAPI.getAll(params);
      setApplications(res.data || []);
      setApplicationPagination(res.pagination || null);
    } catch (err) {
      console.error('Error fetching applications:', err);
    }
  };
  const fetchCategories = async () => {
    try {
      const res = await categoriesAPI.getAll();
      setCategories(res.data || res || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  useEffect(() => {
    fetchJobs(1, '', '');
    fetchApplications(1, '');
    fetchCategories();
  }, []);

  const debounceApplicationRef = useRef(null);

  const handleApplicationSearch = (value) => {
    setApplicationSearch(value);
    setApplicationPage(1);

    clearTimeout(debounceApplicationRef.current);

    debounceApplicationRef.current = setTimeout(() => {
      fetchApplications(1, value);
    }, 400);
  };
  const handleAddJob = async (jobData) => {
    try {
      await jobsAPI.create(jobData);
      await fetchJobs();
      await Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Job added successfully!',
        confirmButtonColor: '#6f42c1',
        confirmButtonText: 'OK',
        timer: 2000,
        timerProgressBar: true,
        buttonsStyling: true,
      });
    } catch (err) {
      console.error('Error adding job:', err);
      await Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to add job. Please try again.',
        confirmButtonColor: '#dc3545',
        confirmButtonText: 'OK',
        buttonsStyling: true,
      });
    }
  };

  const handleEditJob = async (jobId, jobData) => {
    try {
      await jobsAPI.update(jobId, jobData);
      await fetchJobs();
      await Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Job updated successfully!',
        confirmButtonColor: '#6f42c1',
        confirmButtonText: 'OK',
        timer: 2000,
        timerProgressBar: true,
        buttonsStyling: true,
      });
    } catch (err) {
      console.error('Error updating job:', err);
      await Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to update job. Please try again.',
        confirmButtonColor: '#dc3545',
        confirmButtonText: 'OK',
        buttonsStyling: true,
      });
    }
  };

  const handleDeleteJob = async (jobId) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: 'Delete Job?',
      text: 'Are you sure you want to delete this job? This action cannot be undone.',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel',
      buttonsStyling: true,
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await jobsAPI.delete(jobId);
        await fetchJobs();
        await Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Job deleted successfully!',
          confirmButtonColor: '#6f42c1',
          confirmButtonText: 'OK',
          timer: 2000,
          timerProgressBar: true,
          buttonsStyling: true,
        });
      } catch (err) {
        console.error('Error deleting job:', err);
        await Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to delete job. Please try again.',
          confirmButtonColor: '#dc3545',
          confirmButtonText: 'OK',
          buttonsStyling: true,
        });
      }
    }
  };

  return (
    <main className="w-full">
      <Header />
      <AdminDashboard
        jobs={jobs}
        applications={applications}
        categories={categories}
        loading={loading}
        error={error}
        search={search}
        categoryId={categoryId}
        page={page}
        pagination={pagination}

        applicationSearch={applicationSearch}
        onApplicationSearch={handleApplicationSearch}

        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        onPageChange={handlePageChange}

        onAddJob={handleAddJob}
        onEditJob={handleEditJob}
        onDeleteJob={handleDeleteJob}
        onRefresh={() => fetchJobs()}

        applicationPagination={applicationPagination}
      />
      <Footer />
    </main>
  );
}
