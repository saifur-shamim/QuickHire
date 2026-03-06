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
              <Link href="/admin" className="btn-primary bg-white text-primary hover:bg-gray-100 w-fit">
                Sign Up For Free
              </Link>
            </div>

            {/* Right Illustration */}
            <div className="hidden md:flex items-center justify-center">
              <div className="relative w-full h-64 bg-white/20 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-32 h-32 text-white/40 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-white/60 text-sm">Admin Dashboard</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
