import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-purple-50 pt-12 md:pt-20 pb-16 md:pb-24">
      <div className="container-custom flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Discover<br />
            <span className="text-gradient">more than<br />5000+</span>
            {' '}Jobs
          </h1>
          <p className="text-gray-600 text-lg mb-8 max-w-lg">
            Great platform for the job seeker that searching for new career heights and passionate about startups.
          </p>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 mb-4">
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
            <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-3 shadow-sm border border-gray-200">
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

          {/* Search Button */}
          <Link href="/jobs" className="btn-primary inline-block mt-2">
            Search my job
          </Link>
        </div>

        {/* Right Image */}
        <div className="flex-1 hidden md:flex items-center justify-center">
          <div className="relative w-full h-96">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-200/50 to-blue-200/50 rounded-3xl"></div>
            <div className="relative h-full flex items-center justify-center text-gray-400">
              <svg className="w-full h-full p-4" fill="none" stroke="currentColor" viewBox="0 0 400 400">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M200 100c55.228 0 100 44.772 100 100s-44.772 100-100 100-100-44.772-100-100 44.772-100 100-100z" />
                <circle cx="200" cy="150" r="30" fill="currentColor" opacity="0.3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
