'use client';

import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
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
      await fetchJobsAndApplications();
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
      customClass: {
        confirmButton: 'swal-btn-delete',
        cancelButton: 'swal-btn-cancel',
      },
    });

    if (result.isConfirmed) {
      try {
        await jobsAPI.delete(jobId);
        await fetchJobsAndApplications();
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
