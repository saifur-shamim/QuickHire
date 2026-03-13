import Link from 'next/link';

export default function AdminPromoBanner() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 p-8 md:p-16">
            {/* Left Content */}
            <div className="flex flex-col justify-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Start posting<br />jobs today
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Start posting jobs for only $10.
              </p>
              <Link href="/admin" className="px-8 py-3 rounded-lg font-semibold w-fit bg-white text-primary hover:bg-gray-100 transition-colors">
                Sign Up For Free
              </Link>
            </div>

            {/* Right Illustration */}
            <div className="hidden md:flex items-center justify-center">
              <div className="relative w-full h-64 rounded-2xl overflow-hidden">
                <img 
                  src="/images/dashboard.png" 
                  alt="Admin Dashboard"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
