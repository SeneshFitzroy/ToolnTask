import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import ToolsTasksChatAgent from '../src/components/ToolsTasksChatAgent';
import UniversalCard from '../src/components/UniversalCard';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../src/lib/firebase';

interface Tool {
  id: string;
  title: string;
  description: string;
  price?: string;
  maxRentalPrice?: string;
  time?: string;
  location: string;
  isUrgent?: boolean;
  urgency?: string;
  isPromoted?: boolean;
  image?: string;
  category: string;
  status?: string;
  type: 'available' | 'requested';
  position?: string;
  timeframe?: 'hours' | 'days' | 'weeks';
  experience?: string;
  contact?: string;
  postedBy?: string;
  requestedBy?: string;
  duration?: string;
  details?: string;
  neededDate?: string;
  returnDate?: string;
  createdAt?: Date | { toDate: () => Date };
  specifications?: string[];
  condition?: string;
  additionalInfo?: Record<string, unknown>;
}

export default function Tools() {
  const [activeFilter, setActiveFilter] = useState<'available' | 'requested'>('available');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    const fetchTools = () => {
      // Fetch provided tools (from tools collection)
      const toolsQuery = query(
        collection(db, 'tools'),
        orderBy('createdAt', 'desc')
      );

      // Fetch requested tools (from toolRequests collection)
      const requestsQuery = query(
        collection(db, 'toolRequests'),
        orderBy('createdAt', 'desc')
      );

      const unsubscribeTools = onSnapshot(toolsQuery, (snapshot) => {
        const providedTools = snapshot.docs.map(doc => ({
          id: doc.id,
          type: 'available' as const,
          ...doc.data()
        })) as Tool[];

        const unsubscribeRequests = onSnapshot(requestsQuery, (snapshot) => {
          const requestedTools = snapshot.docs.map(doc => ({
            id: doc.id,
            type: 'requested' as const,
            ...doc.data()
          })) as Tool[];

          // Combine both types and sort promoted posts first
          const allTools = [...providedTools, ...requestedTools];
          
          // Sort tools: promoted first, then by creation date
          allTools.sort((a, b) => {
            // First, sort by promotion status
            if (a.isPromoted && !b.isPromoted) {
              return -1;
            }
            if (!a.isPromoted && b.isPromoted) {
              return 1;
            }
            
            // If both are promoted or both are not promoted, sort by creation date
            const aDate = a.createdAt ? 
              (a.createdAt instanceof Date ? a.createdAt.getTime() : a.createdAt.toDate().getTime()) : 0;
            const bDate = b.createdAt ? 
              (b.createdAt instanceof Date ? b.createdAt.getTime() : b.createdAt.toDate().getTime()) : 0;
            return bDate - aDate;
          });
          
          setTools(allTools);
          setLoading(false);
        });

        return () => unsubscribeRequests();
      });

      return () => unsubscribeTools();
    };

    return fetchTools();
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  const handleFilterChange = (filter: 'available' | 'requested') => {
    setActiveFilter(filter);
  };

  const getFilteredTools = () => {
    let filtered = tools.filter(tool => tool.type === activeFilter);
    
    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(tool => 
        tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (tool.details && tool.details.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(tool => 
        tool.category?.toLowerCase() === categoryFilter.toLowerCase()
      );
    }
    
    return filtered;
  };

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
            ⚡
          </div>
          <div className="absolute bottom-20 left-20 w-12 h-12 rounded-full animate-spin flex items-center justify-center text-xl" style={{ backgroundColor: '#FF5E14', animationDelay: '2s', animationDuration: '8s' }}>
            🛠️
          </div>
          <div className="absolute bottom-10 right-10 w-14 h-14 rounded-full animate-bounce flex items-center justify-center text-xl" style={{ backgroundColor: '#1a1a1a', animationDelay: '3s', animationDuration: '4.5s' }}>
            🔨
          </div>
          
          {/* Floating Tool Cards Animation */}
          <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-24 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg shadow-lg animate-float opacity-20 flex items-center justify-center text-white font-bold text-xs">
              TOOL
            </div>
          </div>
          <div className="absolute top-3/4 right-1/4 transform translate-x-1/2 translate-y-1/2">
            <div className="w-20 h-12 bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg shadow-lg animate-float-reverse opacity-20 flex items-center justify-center text-white font-bold text-xs" style={{ animationDelay: '2s' }}>
              RENT
            </div>
          </div>
          
          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-8 gap-4 h-full w-full">
              {Array.from({ length: 32 }).map((_, i) => (
                <div 
                  key={i}
                  className="border border-orange-300 rounded animate-pulse"
                  style={{ 
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '3s'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Enhanced Interactive Main Heading - Professional & Clean */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center mb-6 sm:mb-8 leading-tight tracking-tight">
            <span className="inline-block hover:scale-105 transition-transform duration-300" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
              Rent & Share Tools in{' '}
            </span>
            <span className="relative inline-block group">
              <span className="relative z-10 hover:scale-105 transition-transform duration-300 inline-block" style={{ color: '#FF5E14', textShadow: '0 2px 8px rgba(255, 94, 20, 0.3)' }}>
                Sri Lanka
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full group-hover:h-2 transition-all duration-300"></div>
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

      {/* Search Section */}
      <div className="py-4 sm:py-6" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#FFFFFF' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Search Bar Container */}
          <div className="rounded-xl p-4 sm:p-5 shadow-lg border" 
               style={{ 
                 backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF',
                 borderColor: theme === 'dark' ? 'rgba(255, 94, 20, 0.2)' : 'rgba(255, 94, 20, 0.15)',
                 boxShadow: theme === 'dark' 
                   ? '0 8px 25px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 94, 20, 0.08)'
                   : '0 8px 25px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 94, 20, 0.03)'
               }}>
          
          {/* Enhanced Search Bar with Real-time Search */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row gap-3">
              <div className="flex-1 relative">
                <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                  Search Tools
                </label>
                <input
                  type="text"
                  placeholder="Search by name, description, location, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 pr-20 border rounded-lg focus:outline-none text-base font-medium shadow-sm transition-all duration-300"
                  style={{ 
                    borderColor: theme === 'dark' ? '#4B5563' : '#E2E8F0',
                    backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF',
                    color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#FF5E14';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 94, 20, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = theme === 'dark' ? '#4B5563' : '#E2E8F0';
                    e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.08)';
                  }}
                />
                {/* Search Icon */}
                <div className="absolute left-3 bottom-3 transform pointer-events-none">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: theme === 'dark' ? '#9CA3AF' : '#6B7280' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                {/* Clear Button */}
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 bottom-3 transform p-1 rounded-full transition-colors duration-200"
                    style={{ 
                      color: theme === 'dark' ? '#9CA3AF' : '#6B7280',
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = theme === 'dark' ? '#4B5563' : '#F3F4F6';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              <div className="lg:w-80">
                <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                  Filter by Category
                </label>
                <div className="relative">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="w-full px-4 py-3 border rounded-lg text-left font-medium shadow-sm transition-all duration-300 hover:scale-105"
                    style={{ 
                      borderColor: categoryFilter !== 'all' ? '#FF5E14' : (theme === 'dark' ? '#4B5563' : '#E2E8F0'),
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
          </div>
        </div>
      </div>

        {/* Enhanced Filter Toggle Section */}
        <div className="py-6" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#FFFFFF' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Available/Requested Toggle Filter with improved design */}
            <div className="relative">
              <label className="block text-sm font-semibold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                Tool Type
              </label>
              <div className="p-1.5 rounded-full shadow-lg border" style={{ 
                backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF',
                borderColor: theme === 'dark' ? '#333333' : '#E5E7EB'
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
                      <span className="text-lg">🔧</span>
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
                      <span className="text-lg">🔍</span>
                      Requested Tools
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tools List Section */}
      <div className="py-8" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F2F3F5' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
              <span className={`ml-4 text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Loading tools...
              </span>
            </div>
          ) : getFilteredTools().length === 0 ? (
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
                <UniversalCard
                  key={tool.id}
                  id={tool.id}
                  title={tool.title || 'Untitled Tool'}
                  description={tool.description || tool.details || 'No description available'}
                  type={tool.type === 'available' ? 'tool' : tool.type === 'requested' ? 'toolRequest' : 'tool'}
                  category={tool.category || 'Other'}
                  price={tool.price}
                  location={tool.location}
                  image={tool.image}
                  isActive={true}
                  postedBy={tool.postedBy}
                  condition={tool.condition}
                  specifications={tool.specifications}
                  urgency={tool.urgency}
                  isUrgent={tool.isUrgent}
                  isPromoted={tool.isPromoted}
                  maxRentalPrice={tool.maxRentalPrice}
                  neededDate={tool.neededDate}
                  returnDate={tool.returnDate}
                  requestedBy={tool.requestedBy}
                  time={tool.time}
                  duration={tool.duration}
                  contact={tool.contact}
                  showActions={true}
                />
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
