'use client';

import Link from 'next/link';
import { useState } from 'react';
import ApplicationForm from './ApplicationForm';

// Sample job detail data
const sampleJob = {
  id: 1,
  title: 'Senior UI/UX Designer',
  company: 'Dropbox',
  location: 'San Francisco, USA',
  type: 'Full Time',
  categories: ['Design'],
  logo: '🎨',
  salary: '$80,000 - $120,000',
  description: `
    We are looking for an experienced Senior UI/UX Designer to join our team. 
    You will be responsible for designing and improving user experiences across our platform.
  `,
  requirements: [
    '5+ years of experience in UI/UX design',
    'Proficiency in Figma and design tools',
    'Strong understanding of design principles',
    'Experience with user research and testing',
    'Excellent communication skills',
  ],
  benefits: [
    'Competitive salary',
    'Health insurance',
    'Remote work options',
    'Professional development',
    'Flexible working hours',
  ],
  about: 'Dropbox is a leading cloud storage and collaboration platform...',
};

export default function JobDetailView({ job = null, loading = false, error = null }) {
  const jobData = job || sampleJob;
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  if (loading) {
    return (
      <section className="py-12 bg-gray-50 min-h-[calc(100vh-200px)]">
        <div className="container-custom text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-gray-50 min-h-[calc(100vh-200px)]">
        <div className="container-custom text-center">
          <p className="text-red-600">{error}</p>
          <Link href="/jobs" className="btn-primary mt-6 inline-block">
            Back to Jobs
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50 min-h-[calc(100vh-200px)]">
      <div className="container-custom">
        {/* Back Button */}
        <Link href="/jobs" className="inline-flex items-center gap-2 text-primary hover:text-purple-700 font-semibold mb-8 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Jobs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Job Header */}
            <div className="bg-white rounded-xl p-8 mb-8 shadow-sm">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-4xl">
                    {jobData.logo || '💼'}
                  </div>
                  <div className="flex-1">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      {jobData.title}
                    </h1>
                    <p className="text-gray-600 text-lg mb-2">{jobData.company}</p>
                    <div className="flex items-center gap-4 text-gray-600">
                      <div className="flex items-center gap-1">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {jobData.location}
                      </div>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        {jobData.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowApplicationForm(true)}
                  className="btn-primary flex-1"
                >
                  Apply Now
                </button>
                <button className="btn-outline flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Save Job
                </button>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-xl p-8 mb-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About this job</h2>
              <p className="text-gray-600 whitespace-pre-line mb-8">{jobData.description}</p>

              <h3 className="text-xl font-bold text-gray-900 mb-4">Requirements</h3>
              <ul className="space-y-3 mb-8">
                {jobData.requirements?.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-4">Benefits</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {jobData.benefits?.map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-secondary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* About Company */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About the company</h2>
              <p className="text-gray-600 mb-4">{jobData.about}</p>
              <Link href="#" className="text-primary hover:text-purple-700 font-semibold flex items-center gap-2 transition-colors">
                Visit company page
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Quick Info */}
            <div className="bg-white rounded-xl p-6 sticky top-20 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Job Details</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Salary</p>
                  <p className="font-semibold text-gray-900">${jobData.salary_min} - ${jobData.salary_max}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Job Type</p>
                  <p className="font-semibold text-gray-900">{jobData.type}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Location</p>
                  <p className="font-semibold text-gray-900">{jobData.location}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Category</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                      {jobData.category?.name || 'Uncategorized'}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowApplicationForm(true)}
                className="btn-primary w-full mt-6"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>

        {/* Application Form Modal */}
        {showApplicationForm && (
          <ApplicationForm
            job={jobData}
            onClose={() => setShowApplicationForm(false)}
          />
        )}
      </div>
    </section>
  );
}
