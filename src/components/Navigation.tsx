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
    <nav className="shadow-lg sticky top-0 z-50 border-b border-opacity-20" style={{ backgroundColor: '#FFF', borderColor: '#B3B5BC' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-xl sm:text-2xl font-bold" style={{ color: '#1A1818' }}>
              Tool<span style={{ color: '#FFE514' }}>N</span>Task
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link href="/" className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105" style={{ color: '#B3B5BC' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FE5F16'} onMouseLeave={(e) => e.currentTarget.style.color = '#B3B5BC'}>Home</Link>
            <Link href="/Tasks" className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105" style={{ color: '#B3B5BC' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FE5F16'} onMouseLeave={(e) => e.currentTarget.style.color = '#B3B5BC'}>Tasks</Link>
            <Link href="/Tools" className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105" style={{ color: '#B3B5BC' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FE5F16'} onMouseLeave={(e) => e.currentTarget.style.color = '#B3B5BC'}>Tools</Link>
            <Link href="/About" className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105" style={{ color: '#B3B5BC' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FE5F16'} onMouseLeave={(e) => e.currentTarget.style.color = '#B3B5BC'}>About Us</Link>
            <Link href="/Contact" className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105" style={{ color: '#B3B5BC' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FE5F16'} onMouseLeave={(e) => e.currentTarget.style.color = '#B3B5BC'}>Contact</Link>
          </div>

          {/* Right side - Theme toggle and Auth buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg transition-colors duration-200 hover:scale-105"
              style={{ backgroundColor: '#F2F3F5' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#B3B5BC'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F2F3F5'}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" style={{ color: '#FFE514' }} />
              ) : (
                <Moon className="h-5 w-5" style={{ color: '#1A1818' }} />
              )}
            </button>

            {/* Auth Buttons - Hidden on small screens */}
            <div className="hidden sm:flex items-center space-x-2">
              <Link href="/SignIn" 
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 shadow-md text-white border-0" 
                style={{ backgroundColor: '#FE5F16' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FF5D13'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FE5F16'}
              >
                Sign In
              </Link>
              <Link href="/SignUp" 
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 shadow-md text-white border-0" 
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
              className="lg:hidden p-2 rounded-lg transition-colors duration-200 hover:scale-105"
              style={{ backgroundColor: '#F2F3F5' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#B3B5BC'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F2F3F5'}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" style={{ color: '#1A1818' }} /> : <Menu className="h-6 w-6" style={{ color: '#1A1818' }} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-opacity-20" style={{ borderColor: '#B3B5BC' }}>
            <div className="flex flex-col space-y-2">
              <Link href="/" className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300" style={{ color: '#B3B5BC' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FE5F16'} onMouseLeave={(e) => e.currentTarget.style.color = '#B3B5BC'} onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link href="/Tasks" className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300" style={{ color: '#B3B5BC' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FE5F16'} onMouseLeave={(e) => e.currentTarget.style.color = '#B3B5BC'} onClick={() => setMobileMenuOpen(false)}>Tasks</Link>
              <Link href="/Tools" className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300" style={{ color: '#B3B5BC' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FE5F16'} onMouseLeave={(e) => e.currentTarget.style.color = '#B3B5BC'} onClick={() => setMobileMenuOpen(false)}>Tools</Link>
              <Link href="/About" className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300" style={{ color: '#B3B5BC' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FE5F16'} onMouseLeave={(e) => e.currentTarget.style.color = '#B3B5BC'} onClick={() => setMobileMenuOpen(false)}>About Us</Link>
              <Link href="/Contact" className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300" style={{ color: '#B3B5BC' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FE5F16'} onMouseLeave={(e) => e.currentTarget.style.color = '#B3B5BC'} onClick={() => setMobileMenuOpen(false)}>Contact</Link>
              <div className="flex flex-col space-y-2 pt-2 border-t border-opacity-20" style={{ borderColor: '#B3B5BC' }}>
                <Link href="/SignIn" 
                  className="px-4 py-2 rounded-full text-sm font-medium text-center transition-all duration-300 text-white border-0" 
                  style={{ backgroundColor: '#FE5F16' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FF5D13'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FE5F16'}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link href="/SignUp" 
                  className="px-4 py-2 rounded-full text-sm font-medium text-center transition-all duration-300 text-white border-0" 
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