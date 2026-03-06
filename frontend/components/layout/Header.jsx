'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container-custom py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">Q</span>
          </div>
          <span className="text-gray-900">QuickHire</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-gray-700 hover:text-primary transition-colors">
            Find Jobs
          </Link>
          <Link href="/jobs" className="text-gray-700 hover:text-primary transition-colors">
            Browse Companies
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Login
            </Link>
            <button className="btn-primary text-sm">
              Sign Up
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white border-t border-gray-200 md:hidden">
            <div className="container-custom py-4 flex flex-col gap-4">
              <Link href="/" className="text-gray-700 hover:text-primary transition-colors">
                Find Jobs
              </Link>
              <Link href="/jobs" className="text-gray-700 hover:text-primary transition-colors">
                Browse Companies
              </Link>
              <Link href="/auth/login" className="text-gray-700 hover:text-primary transition-colors">
                Login
              </Link>
              <button className="btn-primary text-sm w-full">
                Sign Up
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
