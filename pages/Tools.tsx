import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import ToolsTasksChatAgent from '../src/components/ToolsTasksChatAgent';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';

interface Tool {
  id: string;
  title: string;
  description: string;
  price: string;
  time: string;
  location: string;
  isUrgent?: boolean;
  isPromoted?: boolean;
  image?: string;
  category: string;
  status?: string;
  type: 'available' | 'requested';
  position: string;
  timeframe: 'hours' | 'days' | 'weeks';
  experience: string;
  contact: string;
  postedBy: string;
  duration: string;
  details: string;
}

// Empty tools array - will be populated when users create tools
const mockTools: Tool[] = [];

export default function Tools() {
  const [activeFilter, setActiveFilter] = useState<'available' | 'requested'>('available');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [tools] = useState<Tool[]>(mockTools);
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

  const getFilteredTools = () => {
    let filtered = tools.filter(tool => tool.type === activeFilter);
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(tool => 
        tool.category?.toLowerCase() === categoryFilter.toLowerCase()
      );
    }
    
    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(tool => 
        tool.title?.toLowerCase().includes(searchLower) ||
        tool.description?.toLowerCase().includes(searchLower) ||
        tool.location?.toLowerCase().includes(searchLower) ||
        tool.category?.toLowerCase().includes(searchLower) ||
        tool.details?.toLowerCase().includes(searchLower)
      );
    }
    
    return filtered;
  };

  const filteredTools = getFilteredTools();

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F2F3F5' }}>
      <Navigation />
      
      {/* Hero Header Section */}
      <div className="py-12 sm:py-16 lg:py-20 relative overflow-hidden" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F2F3F5' }}>
        {/* Enhanced Background Elements with Interactive Animations */}
        <div className="absolute inset-0 opacity-10">
          {/* Floating Tool Icons */}
          <div className="absolute top-10 left-10 w-20 h-20 rounded-full animate-bounce flex items-center justify-center text-3xl" style={{ backgroundColor: '#FF5E14', animationDelay: '0s', animationDuration: '3s' }}>
            🔧
          </div>
          <div className="absolute top-20 right-20 w-16 h-16 rounded-full animate-pulse flex items-center justify-center text-2xl" style={{ backgroundColor: '#1a1a1a', animationDelay: '1s', animationDuration: '4s' }}>
            🛠️
          </div>
          <div className="absolute bottom-20 left-20 w-12 h-12 rounded-full animate-spin flex items-center justify-center text-xl" style={{ backgroundColor: '#FF5E14', animationDelay: '2s', animationDuration: '8s' }}>
            ⚙️
          </div>
          <div className="absolute bottom-10 right-10 w-14 h-14 rounded-full animate-bounce flex items-center justify-center text-xl" style={{ backgroundColor: '#1a1a1a', animationDelay: '3s', animationDuration: '4.5s' }}>
            🔨
          </div>
          
          {/* Floating Tool Cards */}
          <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-24 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg shadow-lg animate-float opacity-20 flex items-center justify-center text-white font-bold text-xs">
              DRILL
            </div>
          </div>
          <div className="absolute top-3/4 right-1/4 transform translate-x-1/2 translate-y-1/2">
            <div className="w-20 h-12 bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg shadow-lg animate-float-reverse opacity-20 flex items-center justify-center text-white font-bold text-xs" style={{ animationDelay: '2s' }}>
              SAW
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Main Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            <span style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
              Rent & Share Tools in{' '}
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              Sri Lanka
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-center mb-8 sm:mb-10 max-w-4xl mx-auto leading-relaxed font-medium" 
             style={{ color: theme === 'dark' ? '#B3B5BC' : '#4B5563' }}>
            Connect with your community and discover meaningful opportunities to earn extra income
          </p>
          
          {/* Professional Statistics */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-10">
            <div className="text-center group hover:scale-105 transition-transform duration-300 cursor-pointer">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2" style={{ color: '#FF5E14' }}>
                100+ Tools
              </div>
              <div className="text-sm sm:text-base md:text-lg font-semibold" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                Available Now
              </div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300 cursor-pointer">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                24/7 Support
              </div>
              <div className="text-sm sm:text-base md:text-lg font-semibold" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                Always Here
              </div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300 cursor-pointer">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2" style={{ color: '#FF5E14' }}>
                50+ Members
              </div>
              <div className="text-sm sm:text-base md:text-lg font-semibold" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                Active Community
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Search & Filter Section */}
      <div className="py-6 sm:py-8" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Search & Filter Container */}
          <div className="rounded-2xl p-6 sm:p-8 shadow-xl border-2" 
               style={{ 
                 backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF',
                 borderColor: theme === 'dark' ? 'rgba(255, 94, 20, 0.3)' : 'rgba(255, 94, 20, 0.2)',
                 boxShadow: theme === 'dark' 
                   ? '0 25px 50px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 94, 20, 0.1)'
                   : '0 25px 50px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 94, 20, 0.05)'
               }}>
            
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl" style={{ backgroundColor: theme === 'dark' ? 'rgba(255, 94, 20, 0.1)' : 'rgba(255, 94, 20, 0.05)' }}>
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#FF5E14' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-1" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                    Find Perfect Tools
                  </h2>
                  <p className="text-sm" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                    Search and filter to discover tools that fit your project needs
                  </p>
                </div>
              </div>
              
              {/* Results Count */}
              <div className="text-right">
                <div className="text-2xl font-bold" style={{ color: '#FF5E14' }}>
                  {filteredTools.length}
                </div>
                <div className="text-sm font-medium" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                  Tools Found
                </div>
              </div>
            </div>

            {/* Search and Filter Controls */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Professional Search Input */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                  Search Tools
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by name, description, location, or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-5 py-4 pl-14 pr-12 border-2 rounded-xl focus:outline-none text-base font-medium shadow-sm transition-all duration-300"
                    style={{ 
                      borderColor: searchTerm ? '#FF5E14' : (theme === 'dark' ? '#374151' : '#E2E8F0'),
                      backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF',
                      color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#FF5E14';
                      e.currentTarget.style.boxShadow = '0 0 0 4px rgba(255, 94, 20, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = searchTerm ? '#FF5E14' : (theme === 'dark' ? '#374151' : '#E2E8F0');
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                  {/* Search Icon */}
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: searchTerm ? '#FF5E14' : (theme === 'dark' ? '#9CA3AF' : '#6B7280') }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  {/* Clear Search */}
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-all duration-200 hover:scale-110"
                      style={{ 
                        color: theme === 'dark' ? '#9CA3AF' : '#6B7280',
                        backgroundColor: theme === 'dark' ? '#4B5563' : '#F3F4F6'
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Professional Filter Dropdown */}
              <div>
                <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                  Filter by Category
                </label>
                <div className="relative">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="w-full px-5 py-4 border-2 rounded-xl text-left font-medium shadow-sm transition-all duration-300 hover:scale-105"
                    style={{ 
                      borderColor: categoryFilter !== 'all' ? '#FF5E14' : (theme === 'dark' ? '#374151' : '#E2E8F0'),
                      backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF',
                      color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: categoryFilter !== 'all' ? '#FF5E14' : (theme === 'dark' ? '#9CA3AF' : '#6B7280') }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
                        </svg>
                        <span>
                          {categoryFilter === 'all' ? 'All Categories' : 
                           categoryFilter === 'power-tools' ? 'Power Tools' :
                           categoryFilter === 'hand-tools' ? 'Hand Tools' :
                           categoryFilter === 'garden' ? 'Garden Tools' :
                           categoryFilter === 'automotive' ? 'Automotive' :
                           categoryFilter === 'construction' ? 'Construction' :
                           categoryFilter === 'electronics' ? 'Electronics' : categoryFilter}
                        </span>
                      </div>
                      <svg className={`w-5 h-5 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: theme === 'dark' ? '#9CA3AF' : '#6B7280' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  
                  {/* Filter Dropdown Menu */}
                  {showFilters && (
                    <div 
                      className="absolute top-full left-0 right-0 mt-2 p-4 rounded-xl shadow-2xl border-2 z-50"
                      style={{ 
                        backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF',
                        borderColor: theme === 'dark' ? '#374151' : '#E2E8F0',
                        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)'
                      }}
                    >
                      <div className="space-y-2">
                        {['all', 'power-tools', 'hand-tools', 'garden', 'automotive', 'construction', 'electronics'].map((category) => (
                          <button
                            key={category}
                            onClick={() => {
                              setCategoryFilter(category);
                              setShowFilters(false);
                            }}
                            className="w-full px-4 py-3 rounded-lg text-left font-medium transition-all duration-200 hover:scale-105"
                            style={{
                              backgroundColor: categoryFilter === category 
                                ? '#FF5E14' 
                                : (theme === 'dark' ? '#374151' : '#F8F9FA'),
                              color: categoryFilter === category 
                                ? '#FFFFFF' 
                                : (theme === 'dark' ? '#FFFFFF' : '#2D3748'),
                              border: `2px solid ${categoryFilter === category ? '#FF5E14' : 'transparent'}`
                            }}
                          >
                            {category === 'all' ? 'All Categories' : 
                             category === 'power-tools' ? 'Power Tools' :
                             category === 'hand-tools' ? 'Hand Tools' :
                             category === 'garden' ? 'Garden Tools' :
                             category === 'automotive' ? 'Automotive' :
                             category === 'construction' ? 'Construction' :
                             category === 'electronics' ? 'Electronics' : category}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Available/Requested Toggle */}
            <div className="mt-8 pt-6 border-t" style={{ borderColor: theme === 'dark' ? '#374151' : '#E2E8F0' }}>
              <label className="block text-sm font-semibold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                Tool Type
              </label>
              <div className="relative">
                <div className="p-1.5 rounded-full shadow-lg border-2" style={{ 
                  backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF',
                  borderColor: theme === 'dark' ? '#4B5563' : '#E2E8F0'
                }}>
                  <div className="flex justify-between gap-1 relative">
                    {/* Sliding background indicator */}
                    <div 
                      className="absolute top-0 left-0 h-full transition-all duration-300 ease-in-out rounded-full"
                      style={{
                        width: '50%',
                        backgroundColor: '#FF5E14',
                        transform: activeFilter === 'requested' ? 'translateX(100%)' : 'translateX(0)',
                        boxShadow: '0 4px 12px rgba(255, 94, 20, 0.3)'
                      }}
                    />
                    <button
                      onClick={() => handleFilterChange('available')}
                      className="flex-1 relative px-4 sm:px-6 py-3 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 group z-10"
                      style={{
                        color: activeFilter === 'available' ? '#FFFFFF' : (theme === 'dark' ? '#B3B5BC' : '#6B7280'),
                      }}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Available Tools
                      </span>
                    </button>
                    <button
                      onClick={() => handleFilterChange('requested')}
                      className="flex-1 relative px-4 sm:px-6 py-3 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 group z-10"
                      style={{
                        color: activeFilter === 'requested' ? '#FFFFFF' : (theme === 'dark' ? '#B3B5BC' : '#6B7280'),
                      }}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Requested Tools
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {(searchTerm || categoryFilter !== 'all') && (
              <div className="flex flex-wrap items-center gap-3 mt-6 pt-6 border-t" style={{ borderColor: theme === 'dark' ? '#374151' : '#E2E8F0' }}>
                <span className="text-sm font-semibold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                  Active Filters:
                </span>
                {searchTerm && (
                  <span className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium" 
                        style={{ 
                          backgroundColor: theme === 'dark' ? 'rgba(255, 94, 20, 0.2)' : 'rgba(255, 94, 20, 0.1)',
                          color: '#FF5E14',
                          border: '1px solid rgba(255, 94, 20, 0.3)'
                        }}>
                    Search: &ldquo;{searchTerm}&rdquo;
                    <button
                      onClick={() => setSearchTerm('')}
                      className="ml-1 hover:scale-110 transition-transform"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
                {categoryFilter !== 'all' && (
                  <span className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium" 
                        style={{ 
                          backgroundColor: theme === 'dark' ? 'rgba(255, 94, 20, 0.2)' : 'rgba(255, 94, 20, 0.1)',
                          color: '#FF5E14',
                          border: '1px solid rgba(255, 94, 20, 0.3)'
                        }}>
                    Category: {categoryFilter === 'power-tools' ? 'Power Tools' :
                             categoryFilter === 'hand-tools' ? 'Hand Tools' :
                             categoryFilter === 'garden' ? 'Garden Tools' :
                             categoryFilter === 'automotive' ? 'Automotive' :
                             categoryFilter === 'construction' ? 'Construction' :
                             categoryFilter === 'electronics' ? 'Electronics' : categoryFilter}
                    <button
                      onClick={() => setCategoryFilter('all')}
                      className="ml-1 hover:scale-110 transition-transform"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setCategoryFilter('all');
                  }}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
                  style={{ 
                    color: '#FFFFFF',
                    backgroundColor: '#FF5E14'
                  }}
                >
                  Clear All
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tools List Section */}
      <div className="py-8" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F2F3F5' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {getFilteredTools().length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <div className="mb-6">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
                  <span className="text-4xl">🔧</span>
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                {searchTerm ? 'No tools found' : `No ${activeFilter} tools yet`}
              </h3>
              <p className="text-base sm:text-lg mb-8 max-w-md mx-auto" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                {searchTerm 
                  ? `Try adjusting your search or browse all ${activeFilter} tools.`
                  : `Be the first to ${activeFilter === 'available' ? 'list a tool for rent' : 'request a tool'}!`
                }
              </p>
              {!searchTerm && (
                <Link
                  href="/CreateTool"
                  className="inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 text-white hover:scale-105"
                  style={{ backgroundColor: '#FF5E14' }}
                >
                  <span className="mr-2">🔧</span>
                  {activeFilter === 'available' ? 'List Your Tool' : 'Request a Tool'}
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredTools().map((tool) => (
                <div key={tool.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                  {/* Tool card content would go here */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{tool.title}</h3>
                    <p className="text-gray-600 mb-4">{tool.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-orange-600 font-bold">{tool.price}</span>
                      <span className="text-sm text-gray-500">{tool.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <ToolsTasksChatAgent pageType="tools" />
      <Footer />
    </div>
  );
}
