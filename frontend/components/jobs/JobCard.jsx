import Link from 'next/link';

export default function JobCard({ job, featured = false }) {
  const getJobTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'full time':
        return 'bg-green-100 text-green-700';
      case 'part time':
        return 'bg-blue-100 text-blue-700';
      case 'internship':
        return 'bg-orange-100 text-orange-700';
      case 'freelance':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryColor = (category) => {
    const colors = [
      'bg-green-100 text-green-700',
      'bg-cyan-100 text-cyan-700',
      'bg-orange-100 text-orange-700',
      'bg-purple-100 text-purple-700',
      'bg-pink-100 text-pink-700',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  if (featured) {
    return (
      <Link href={`/jobs/${job.id}`}>
        <div className="card p-6 border border-gray-100 hover:border-primary transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xl flex-shrink-0">
                {job.logo}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 hover:text-primary transition-colors text-sm">
                  {job.title}
                </h3>
                <p className="text-xs text-gray-600 mt-1">{job.company}</p>
              </div>
            </div>
            <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${getJobTypeColor(job.type)}`}>
              {job.type}
            </span>
          </div>

          <div className="flex items-center gap-1 text-gray-600 mb-4 text-xs">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            {job.location}
          </div>

          <div className="flex gap-2 flex-wrap">
            {job.categories?.map((cat, idx) => (
              <span key={idx} className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(cat)}`}>
                {cat}
              </span>
            ))}
          </div>
        </div>
      </Link>
    );
  }

  // Latest jobs card (list view style)
  return (
    <Link href={`/jobs/${job.id}`}>
      <div className="card p-6 border border-gray-100 hover:border-primary transition-all duration-300">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl flex-shrink-0">
            {job.logo}
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-gray-900 hover:text-primary transition-colors">
                {job.title}
              </h3>
              <span className={`px-3 py-1 rounded text-xs font-medium whitespace-nowrap ${getJobTypeColor(job.type)}`}>
                {job.type}
              </span>
            </div>

            <div className="flex items-center gap-4 text-gray-600 text-sm mb-3">
              <span>{job.company}</span>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                {job.location}
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              {job.categories?.map((cat, idx) => (
                <span key={idx} className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(cat)}`}>
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
