'use client';

import { useState } from 'react';
import { applicationsAPI } from '@/services/api';

export default function ApplicationForm({ job, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resume_link: '',
    cover_note: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate form data
      if (!formData.name.trim()) {
        throw new Error('Name is required');
      }
      if (!formData.email.trim() || !formData.email.includes('@')) {
        throw new Error('Valid email is required');
      }
      if (!formData.resume_link.trim()) {
        throw new Error('Resume link is required');
      }
      if (!isValidUrl(formData.resume_link)) {
        throw new Error('Resume link must be a valid URL');
      }
      if (!formData.cover_note.trim()) {
        throw new Error('Cover note is required');
      }

      // Submit application to API
      const response = await applicationsAPI.create({
        ...formData,
        job_listing_id: job.id,
      });

      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to submit application. Please try again.');
      console.error('Application error:', err);
    } finally {
      setLoading(false);
    }
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Sent!</h2>
          <p className="text-gray-600">
            Thank you for applying. We will review your application and get back to you soon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Apply for {job.title}</h2>
            <p className="text-gray-600 text-sm">{job.company}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* Resume Link */}
          <div>
            <label htmlFor="resume_link" className="block text-sm font-semibold text-gray-900 mb-2">
              Resume Link (URL) *
            </label>
            <input
              type="url"
              id="resume_link"
              name="resume_link"
              value={formData.resume_link}
              onChange={handleChange}
              placeholder="https://example.com/resume.pdf"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <p className="text-xs text-gray-600 mt-2">
              Provide a link to your resume (PDF, Google Drive, etc.)
            </p>
          </div>

          {/* Cover Note */}
          <div>
            <label htmlFor="cover_note" className="block text-sm font-semibold text-gray-900 mb-2">
              Cover Note *
            </label>
            <textarea
              id="cover_note"
              name="cover_note"
              value={formData.cover_note}
              onChange={handleChange}
              placeholder="Tell us why you're interested in this position..."
              rows="5"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              required
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
