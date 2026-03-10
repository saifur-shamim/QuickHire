import Link from 'next/link';
import JobCard from '@/components/jobs/JobCard';

export default function FeaturedJobsSection({ jobs = [], loading = false }) {
  // Filter jobs to show only featured ones
  const featuredJobs = jobs.filter(job => job.is_featured === true).slice(0, 8);

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Featured <span className="text-gradient">jobs</span>
          </h2>
          <Link href="/jobs" className="text-primary hover:text-purple-700 font-semibold flex items-center gap-2 transition-colors">
            Show all jobs
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
          </div>
        )}

        {/* Jobs Grid */}
        {!loading && featuredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} featured={true} />
            ))}
          </div>
        ) : !loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No featured jobs available right now</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
