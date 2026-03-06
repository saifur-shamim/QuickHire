import Link from 'next/link';

const categories = [
  { name: 'Design', icon: '✨', count: '208 jobs available' },
  { name: 'Sales', icon: '📊', count: '196 jobs available' },
  { name: 'Marketing', icon: '🎯', count: '140 jobs available', highlighted: true },
  { name: 'Finance', icon: '💰', count: '30+ jobs available' },
  { name: 'Technology', icon: '💻', count: '435 jobs available' },
  { name: 'Engineering', icon: '</>', count: '548 jobs available' },
  { name: 'Business', icon: '💼', count: '211 jobs available' },
  { name: 'Human Resource', icon: '👥', count: '340 jobs available' },
];

export default function CategoriesSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Explore by <span className="text-gradient">category</span>
          </h2>
          <Link href="/jobs" className="text-primary hover:text-purple-700 font-semibold flex items-center gap-2 transition-colors">
            Show all jobs
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={`/jobs?category=${category.name.toLowerCase()}`}
              className={`p-6 rounded-xl transition-all duration-300 hover:shadow-lg cursor-pointer transform hover:scale-105 ${
                category.highlighted
                  ? 'bg-gradient-to-br from-primary to-secondary text-white'
                  : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
              }`}
            >
              <div className="text-4xl mb-4">{category.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
              <div className={category.highlighted ? 'text-white/80' : 'text-gray-600'}>
                {category.count}
              </div>
              <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
