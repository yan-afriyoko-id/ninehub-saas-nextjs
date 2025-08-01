'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    // Close mobile menu after navigation
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
        
        {/* Desktop Navigation */}
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

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link 
            href="/dashboard"
            className="text-gray-300 hover:text-blue-400 transition-colors"
          >
            Dashboard
          </Link>
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

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
          aria-label="Toggle mobile menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <nav className="py-4 border-t border-gray-700">
          <ul className="space-y-4">
            <li>
              {isHomePage ? (
                <button 
                  onClick={() => scrollToSection('home')}
                  className="block w-full text-left text-gray-300 hover:text-blue-400 transition-colors py-2"
                >
                  Home
                </button>
              ) : (
                <Link 
                  href="/"
                  className="block w-full text-left text-gray-300 hover:text-blue-400 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
              )}
            </li>
            <li>
              {isHomePage ? (
                <button 
                  onClick={() => scrollToSection('features')}
                  className="block w-full text-left text-gray-300 hover:text-blue-400 transition-colors py-2"
                >
                  Features
                </button>
              ) : (
                <Link 
                  href="/features"
                  className="block w-full text-left text-gray-300 hover:text-blue-400 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Features
                </Link>
              )}
            </li>
            <li>
              {isHomePage ? (
                <button 
                  onClick={() => scrollToSection('pricing')}
                  className="block w-full text-left text-gray-300 hover:text-blue-400 transition-colors py-2"
                >
                  Pricing
                </button>
              ) : (
                <Link 
                  href="/pricing"
                  className="block w-full text-left text-gray-300 hover:text-blue-400 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
              )}
            </li>
            <li>
              {isHomePage ? (
                <button 
                  onClick={() => scrollToSection('testimonials')}
                  className="block w-full text-left text-gray-300 hover:text-blue-400 transition-colors py-2"
                >
                  Testimonials
                </button>
              ) : (
                <Link 
                  href="/testimonials"
                  className="block w-full text-left text-gray-300 hover:text-blue-400 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Testimonials
                </Link>
              )}
            </li>
            <li className="border-t border-gray-700 pt-4">
              <Link 
                href="/dashboard"
                className="block w-full text-left text-gray-300 hover:text-blue-400 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link 
                href="/login"
                className="block w-full text-left text-gray-300 hover:text-blue-400 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            </li>
            <li>
              <Link 
                href="/register"
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}