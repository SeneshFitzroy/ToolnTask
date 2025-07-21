import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import ToolsTasksChatAgent from '../src/components/ToolsTasksChatAgent';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';

export default function Tools() {
  const [activeFilter, setActiveFilter] = useState<'available' | 'requested'>('available');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleFilterChange = (filter: 'available' | 'requested') => {
    setActiveFilter(filter);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F2F3F5' }}>
      <Navigation />
      
      {/* Hero Section */}
      <div className="py-8 sm:py-12 md:py-16" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F2F3F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full mb-4" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
              <span className="text-sm font-semibold" style={{ color: '#FF5E14' }}>🔧 Tool Rental Hub</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
              Find & Share{' '}
              <span style={{ color: '#FF5E14' }}>Professional Tools</span>
            </h1>
            <p className="text-lg sm:text-xl max-w-3xl mx-auto" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
              Discover quality tools for rent or offer your tools to the community. From power tools to garden equipment.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-lg p-1" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
              <button
                onClick={() => handleFilterChange('available')}
                className={`px-6 py-3 rounded-md font-semibold transition-all duration-200 ${
                  activeFilter === 'available'
                    ? 'text-white shadow-lg'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                style={{
                  backgroundColor: activeFilter === 'available' ? '#FF5E14' : 'transparent'
                }}
              >
                Available Tools
              </button>
              <button
                onClick={() => handleFilterChange('requested')}
                className={`px-6 py-3 rounded-md font-semibold transition-all duration-200 ${
                  activeFilter === 'requested'
                    ? 'text-white shadow-lg'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                style={{
                  backgroundColor: activeFilter === 'requested' ? '#FF5E14' : 'transparent'
                }}
              >
                Requested Tools
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tools by name, description, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 rounded-full text-lg border-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200"
                style={{
                  backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF',
                  borderColor: theme === 'dark' ? '#333333' : '#E5E7EB',
                  color: theme === 'dark' ? '#FFFFFF' : '#001554'
                }}
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#FF5E14' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Empty State */}
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#F3F4F6' }}>
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#FF5E14' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
              No {activeFilter} tools yet
            </h3>
            <p className="text-lg mb-6" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
              {activeFilter === 'available' 
                ? 'Be the first to list a tool for rent in your community!'
                : 'No tool requests at the moment. Check back later!'}
            </p>
            {activeFilter === 'available' && (
              <Link 
                href="/CreateTool"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white transition-all duration-200 hover:scale-105"
                style={{ backgroundColor: '#FF5E14' }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                List Your Tool
              </Link>
            )}
          </div>

        </div>
      </div>

      <ToolsTasksChatAgent pageType="tools" />
      <Footer />
    </div>
  );
}
