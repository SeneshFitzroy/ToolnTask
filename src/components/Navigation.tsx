import React from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navigation = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">
              Tool<span className="text-orange-500">N</span>Task
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link href="/" className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-slate-600 dark:text-gray-300 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-gray-800">Home</Link>
            <Link href="/Tasks" className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-slate-600 dark:text-gray-300 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-gray-800">Tasks</Link>
            <Link href="/Tools" className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-slate-600 dark:text-gray-300 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-gray-800">Tools</Link>
            <Link href="/About" className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-slate-600 dark:text-gray-300 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-gray-800">About Us</Link>
            <Link href="/Contact" className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-slate-600 dark:text-gray-300 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-gray-800">Contact</Link>
          </div>

          {/* Right side - Theme toggle and Auth buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>

            {/* Auth Buttons - Hidden on small screens */}
            <div className="hidden sm:flex items-center space-x-2">
              <Link href="/SignIn" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 shadow-md">Sign In</Link>
              <Link href="/SignUp" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 shadow-md">Sign Up</Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-2">
              <Link href="/" className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-gray-300 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-gray-800" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link href="/Tasks" className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-gray-300 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-gray-800" onClick={() => setMobileMenuOpen(false)}>Tasks</Link>
              <Link href="/Tools" className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-gray-300 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-gray-800" onClick={() => setMobileMenuOpen(false)}>Tools</Link>
              <Link href="/About" className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-gray-300 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-gray-800" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
              <Link href="/Contact" className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-gray-300 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-gray-800" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
              <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                <Link href="/SignIn" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium text-center transition-all duration-300" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
                <Link href="/SignUp" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium text-center transition-all duration-300" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;