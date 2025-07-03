import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
    <nav 
      className="shadow-lg sticky top-0 z-50 border-b border-opacity-20 transition-colors duration-300" 
      style={{ 
        backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF', 
        borderColor: theme === 'dark' ? '#333333' : '#B3B5BC' 
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0 group">
            <div className="relative">
              {/* Official Logo Image */}
              <Image 
                src="/toolntask-logo.png" 
                alt="ToolNTask Logo" 
                width={160}
                height={48}
                className="h-8 sm:h-10 md:h-12 w-auto transition-all duration-300 group-hover:scale-105 drop-shadow-lg"
                style={{ 
                  filter: theme === 'dark' ? 'brightness(1.1) contrast(1.1)' : 'brightness(1) contrast(1)',
                  maxWidth: '200px'
                }}
                priority
                onError={() => {
                  // Fallback handled by showing text logo below
                  console.log('Logo image failed to load, using fallback text logo');
                }}
              />
            </div>
            {/* Optional: Text fallback (can be removed if logo always loads) */}
            <div className="hidden">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold transition-all duration-300 group-hover:scale-105">
                <span style={{ color: '#FF5E14' }}>Tool</span>
                <span style={{ color: '#001554' }}>N</span>
                <span style={{ color: '#FF5E14' }}>Task</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-5 xl:space-x-7">
            <Link 
              href="/" 
              className="px-3 xl:px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 hover:scale-105" 
              style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }} 
              onMouseEnter={(e) => e.currentTarget.style.color = '#FF5E14'} 
              onMouseLeave={(e) => e.currentTarget.style.color = theme === 'dark' ? '#FFFFFF' : '#1A1818'}
            >
              Home
            </Link>
            <Link 
              href="/Tasks" 
              className="px-3 xl:px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 hover:scale-105" 
              style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }} 
              onMouseEnter={(e) => e.currentTarget.style.color = '#FF5E14'} 
              onMouseLeave={(e) => e.currentTarget.style.color = theme === 'dark' ? '#FFFFFF' : '#1A1818'}
            >
              Tasks
            </Link>
            <Link 
              href="/Tools" 
              className="px-3 xl:px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 hover:scale-105" 
              style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }} 
              onMouseEnter={(e) => e.currentTarget.style.color = '#FF5E14'} 
              onMouseLeave={(e) => e.currentTarget.style.color = theme === 'dark' ? '#FFFFFF' : '#1A1818'}
            >
              Tools
            </Link>
            <Link 
              href="/About" 
              className="px-3 xl:px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 hover:scale-105" 
              style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }} 
              onMouseEnter={(e) => e.currentTarget.style.color = '#FF5E14'} 
              onMouseLeave={(e) => e.currentTarget.style.color = theme === 'dark' ? '#FFFFFF' : '#1A1818'}
            >
              About Us
            </Link>
            <Link 
              href="/Contact" 
              className="px-3 xl:px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 hover:scale-105" 
              style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }} 
              onMouseEnter={(e) => e.currentTarget.style.color = '#FF5E14'} 
              onMouseLeave={(e) => e.currentTarget.style.color = theme === 'dark' ? '#FFFFFF' : '#1A1818'}
            >
              Contact
            </Link>
          </div>

          {/* Right side - Theme toggle and Auth buttons */}
          <div className="flex items-center space-x-3 sm:space-x-3 flex-shrink-0">
            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 rounded-lg transition-all duration-300 hover:scale-105"
              style={{ 
                backgroundColor: theme === 'dark' ? '#333333' : '#F2F3F5',
                border: `1px solid ${theme === 'dark' ? '#444444' : 'transparent'}`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = theme === 'dark' ? '#444444' : '#B3B5BC';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = theme === 'dark' ? '#333333' : '#F2F3F5';
              }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" style={{ color: '#FF5E14' }} />
              ) : (
                <Moon className="h-5 w-5" style={{ color: '#001554' }} />
              )}
            </button>

            {/* Auth Buttons - Hidden on small screens */}
            <div className="hidden sm:flex items-center space-x-3">
              <Link href="/SignIn" 
                className="px-6 py-3 rounded-full text-base font-semibold transition-all duration-300 hover:scale-105 shadow-lg text-white border-0" 
                style={{ backgroundColor: '#FE5F16' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FF5D13'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FE5F16'}
              >
                Sign In
              </Link>
              <Link href="/SignUp" 
                className="px-6 py-3 rounded-full text-base font-semibold transition-all duration-300 hover:scale-105 shadow-lg text-white border-0" 
                style={{ backgroundColor: '#001554' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#011659'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#001554'}
              >
                Sign Up
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-lg transition-colors duration-200 hover:scale-105"
              style={{ backgroundColor: theme === 'dark' ? '#333333' : '#F2F3F5' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme === 'dark' ? '#444444' : '#B3B5BC'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme === 'dark' ? '#333333' : '#F2F3F5'}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }} />
              ) : (
                <Menu className="h-6 w-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-opacity-20" style={{ borderColor: theme === 'dark' ? '#444444' : '#B3B5BC' }}>
            <div className="flex flex-col space-y-3">
              <Link href="/" className="px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FF5E14'} onMouseLeave={(e) => e.currentTarget.style.color = theme === 'dark' ? '#FFFFFF' : '#1A1818'} onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link href="/Tasks" className="px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FF5E14'} onMouseLeave={(e) => e.currentTarget.style.color = theme === 'dark' ? '#FFFFFF' : '#1A1818'} onClick={() => setMobileMenuOpen(false)}>Tasks</Link>
              <Link href="/Tools" className="px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FF5E14'} onMouseLeave={(e) => e.currentTarget.style.color = theme === 'dark' ? '#FFFFFF' : '#1A1818'} onClick={() => setMobileMenuOpen(false)}>Tools</Link>
              <Link href="/About" className="px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FF5E14'} onMouseLeave={(e) => e.currentTarget.style.color = theme === 'dark' ? '#FFFFFF' : '#1A1818'} onClick={() => setMobileMenuOpen(false)}>About Us</Link>
              <Link href="/Contact" className="px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FF5E14'} onMouseLeave={(e) => e.currentTarget.style.color = theme === 'dark' ? '#FFFFFF' : '#1A1818'} onClick={() => setMobileMenuOpen(false)}>Contact</Link>
              <div className="flex flex-col space-y-3 pt-3 border-t border-opacity-20" style={{ borderColor: theme === 'dark' ? '#444444' : '#B3B5BC' }}>
                <Link href="/SignIn" 
                  className="px-5 py-3 rounded-full text-base font-semibold text-center transition-all duration-300 text-white border-0" 
                  style={{ backgroundColor: '#FE5F16' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FF5D13'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FE5F16'}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link href="/SignUp" 
                  className="px-5 py-3 rounded-full text-base font-semibold text-center transition-all duration-300 text-white border-0" 
                  style={{ backgroundColor: '#001554' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#011659'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#001554'}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;