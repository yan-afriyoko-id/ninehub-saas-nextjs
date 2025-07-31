'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <header className="bg-gray-800 border-b border-gray-700 shadow-lg py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 
          className="text-xl font-bold text-white cursor-pointer hover:text-blue-400 transition-colors"
          onClick={() => isHomePage ? scrollToSection('home') : window.location.href = '/'}
        >
          Analytics Pro
        </h1>
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li>
              {isHomePage ? (
                <button 
                  onClick={() => scrollToSection('home')}
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Home
                </button>
              ) : (
                <Link 
                  href="/"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Home
                </Link>
              )}
            </li>
            <li>
              {isHomePage ? (
                <button 
                  onClick={() => scrollToSection('features')}
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Features
                </button>
              ) : (
                <Link 
                  href="/features"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Features
                </Link>
              )}
            </li>
            <li>
              {isHomePage ? (
                <button 
                  onClick={() => scrollToSection('pricing')}
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Pricing
                </button>
              ) : (
                <Link 
                  href="/pricing"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Pricing
                </Link>
              )}
            </li>
            <li>
              {isHomePage ? (
                <button 
                  onClick={() => scrollToSection('testimonials')}
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Testimonials
                </button>
              ) : (
                <Link 
                  href="/testimonials"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Testimonials
                </Link>
              )}
            </li>
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          <Link 
            href="/login"
            className="text-gray-300 hover:text-blue-400 transition-colors"
          >
            Login
          </Link>
          <Link 
            href="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}