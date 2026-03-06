import Link from 'next/link';
import JobCard from '@/components/jobs/JobCard';

// Sample featured jobs data
const jobsData = [
  {
    id: 1,
    title: 'Email Marketing',
    company: 'Recruit',
    location: 'Madrid, Spain',
    type: 'Full Time',
    categories: ['Marketing', 'Design'],
    logo: '📧',
  },
  {
    id: 2,
    title: 'Senior Designer',
    company: 'Dropbox',
    location: 'San Francisco, US',
    type: 'Full Time',
    categories: ['Design'],
    logo: '🎨',
  },
  {
    id: 3,
    title: 'Email Marketing',
    company: 'Pitch',
    location: 'Berlin, Germany',
    type: 'Full Time',
    categories: ['Marketing', 'Sales'],
    logo: '✉️',
  },
  {
    id: 4,
    title: 'Visual Designer',
    company: 'Blinket',
    location: 'Granada, Spain',
    type: 'Full Time',
    categories: ['Design'],
    logo: '👁️',
  },
  {
    id: 5,
    title: 'Product Designer',
    company: 'ClassPass',
    location: 'Manchester, UK',
    type: 'Full Time',
    categories: ['Design', 'Marketing'],
    logo: '🎯',
  },
  {
    id: 6,
    title: 'Lead Designer',
    company: 'Canva',
    location: 'Ontario, Canada',
    type: 'Full Time',
    categories: ['Design'],
    logo: '🖼️',
  },
  {
    id: 7,
    title: 'Brand Strategist',
    company: 'Coloway',
    location: 'Monccle, France',
    type: 'Full Time',
    categories: ['Marketing', 'Business'],
    logo: '💡',
  },
  {
    id: 8,
    title: 'Data Analyst',
    company: 'Twitter',
    location: 'San Diego, US',
    type: 'Full Time',
    categories: ['Technology'],
    logo: '📊',
  },
];

export default function FeaturedJobsSection() {
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

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {jobsData.map((job) => (
            <JobCard key={job.id} job={job} featured={true} />
          ))}
        </div>
      </div>
    </section>
  );
}
