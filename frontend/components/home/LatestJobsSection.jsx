import Link from 'next/link';
import JobCard from '@/components/jobs/JobCard';

// Sample latest jobs data
const latestJobsData = [
  {
    id: 1,
    title: 'Social Media Assistant',
    company: 'Nomad',
    location: 'Paris, France',
    type: 'Full Time',
    categories: ['Marketing'],
    logo: '📱',
  },
  {
    id: 2,
    title: 'Social Media Assistant',
    company: 'Notify',
    location: 'Paris, France',
    type: 'Full Time',
    categories: ['Marketing'],
    logo: '📢',
  },
  {
    id: 3,
    title: 'Brand Designer',
    company: 'Dropbox',
    location: 'San Francisco, USA',
    type: 'Full Time',
    categories: ['Design'],
    logo: '🎨',
  },
  {
    id: 4,
    title: 'Brand Designer',
    company: 'Musk',
    location: 'San Francisco, USA',
    type: 'Full Time',
    categories: ['Design'],
    logo: '✨',
  },
  {
    id: 5,
    title: 'Interactive Developer',
    company: 'Terraform',
    location: 'Hamburg, Germany',
    type: 'Full Time',
    categories: ['Technology', 'Engineering'],
    logo: '💻',
  },
  {
    id: 6,
    title: 'Interactive Developer',
    company: 'Terraform',
    location: 'Hamburg, Germany',
    type: 'Full Time',
    categories: ['Technology'],
    logo: 'Md Morshed',
  },
  {
    id: 7,
    title: 'HR Manager',
    company: 'Postier',
    location: 'Lusern, Switzerland',
    type: 'Full Time',
    categories: ['Human Resource', 'Business'],
    logo: '👥',
  },
  {
    id: 8,
    title: 'Social Media Assistant',
    company: 'Notify',
    location: 'Paris, France',
    type: 'Full Time',
    categories: ['Marketing'],
    logo: '📲',
  },
];

export default function LatestJobsSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Latest <span className="text-gradient">jobs</span> open
          </h2>
          <Link href="/jobs" className="text-primary hover:text-purple-700 font-semibold flex items-center gap-2 transition-colors">
            Show all jobs
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Jobs List */}
        <div className="grid grid-cols-1 gap-4 md:gap-6">
          {latestJobsData.map((job) => (
            <JobCard key={job.id} job={job} featured={false} />
          ))}
        </div>
      </div>
    </section>
  );
}
