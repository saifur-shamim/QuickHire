import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-purple-50 pt-12 md:pt-20 pb-16 md:pb-24">
      <div className="container-custom flex flex-col md:flex-row items-center md:gap-0 relative">
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left md:pr-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Discover<br />
            <span className="text-gradient">more than<br />5000+</span>
            {' '}Jobs
          </h1>
          <p className="text-gray-600 text-lg mb-8 max-w-lg">
            Great platform for the job seeker that searching for new career heights and passionate about startups.
          </p>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-2 mb-6 items-stretch md:items-center">
            <div className="flex-1 flex items-center gap-2 bg-white rounded-lg px-4 py-3 shadow-sm border border-gray-200">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Job title or keyword"
                className="flex-1 outline-none text-gray-700 bg-transparent"
              />
            </div>
            <div className="flex-1 flex items-center gap-2 bg-white rounded-lg px-4 py-3 shadow-sm border border-gray-200">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input
                type="text"
                placeholder="Florence, Italy"
                className="flex-1 outline-none text-gray-700 bg-transparent"
              />
            </div>
            {/* Search Button */}
            <Link href="/jobs" className="btn-primary whitespace-nowrap">
              Search my job
            </Link>
          </div>

          {/* Categories Popular */}
          <p className="text-sm text-gray-600 mb-4">
            Popular: <span className="inline-flex gap-2 flex-wrap">
              <span className="text-blue-600 hover:underline cursor-pointer">UI Designer</span>
              <span className="text-blue-600 hover:underline cursor-pointer">UX Researcher</span>
              <span className="text-blue-600 hover:underline cursor-pointer">Android</span>
              <span className="text-blue-600 hover:underline cursor-pointer">Admin</span>
            </span>
          </p>
        </div>

        {/* Right Image - Man Picture */}
        <div className="flex-1 hidden md:flex items-center justify-start -mr-12">
          <div className="relative w-full h-[500px]">
            <img 
              src="/images/man2.png"
              alt="Professional man in work environment"
              className="w-full h-full object-cover rounded-3xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
