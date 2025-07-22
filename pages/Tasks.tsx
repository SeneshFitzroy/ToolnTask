import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import ToolsTasksChatAgent from '../src/components/ToolsTasksChatAgent';
import UniversalCard from '../src/components/UniversalCard';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../src/lib/firebase';

interface Task {
  id: string;
  title: string;
  description: string;
  price?: string;
  budget?: string;
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
  deadline?: string;
  createdAt?: Date;
  requirements?: string[];
  additionalInfo?: Record<string, unknown>;
}

export default function Tasks() {
  const [activeFilter, setActiveFilter] = useState<'available' | 'requested'>('available');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    const fetchTasks = () => {
      // Fetch provided tasks (from tasks collection)
      const tasksQuery = query(
        collection(db, 'tasks'),
        orderBy('createdAt', 'desc')
      );

      // Fetch requested tasks (from taskRequests collection)
      const requestsQuery = query(
        collection(db, 'taskRequests'),
        orderBy('createdAt', 'desc')
      );

      const unsubscribeTasks = onSnapshot(tasksQuery, (snapshot) => {
        const providedTasks = snapshot.docs.map(doc => ({
          id: doc.id,
          type: 'available' as const,
          ...doc.data()
        })) as Task[];

        const unsubscribeRequests = onSnapshot(requestsQuery, (snapshot) => {
          const requestedTasks = snapshot.docs.map(doc => ({
            id: doc.id,
            type: 'requested' as const,
            ...doc.data()
          })) as Task[];

          // Combine both types
          setTasks([...providedTasks, ...requestedTasks]);
          // Data loading completed
        });

        return () => unsubscribeRequests();
      });

      return () => unsubscribeTasks();
    };

    return fetchTasks();
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  const handleFilterChange = (filter: 'available' | 'requested') => {
    setActiveFilter(filter);
  };

  const getFilteredTasks = () => {
    let filtered = tasks.filter(task => task.type === activeFilter);
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(task => 
        task.category?.toLowerCase() === categoryFilter.toLowerCase()
      );
    }
    
    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(task => 
        task.title?.toLowerCase().includes(searchLower) ||
        task.description?.toLowerCase().includes(searchLower) ||
        task.location?.toLowerCase().includes(searchLower) ||
        task.category?.toLowerCase().includes(searchLower) ||
        task.details?.toLowerCase().includes(searchLower)
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
          {/* Floating Task Icons */}
          <div className="absolute top-10 left-10 w-20 h-20 rounded-full animate-bounce flex items-center justify-center text-3xl" style={{ backgroundColor: '#FF5E14', animationDelay: '0s', animationDuration: '3s' }}>
            🧹
          </div>
          <div className="absolute top-20 right-20 w-16 h-16 rounded-full animate-pulse flex items-center justify-center text-2xl" style={{ backgroundColor: '#1a1a1a', animationDelay: '1s', animationDuration: '4s' }}>
            🌱
          </div>
          <div className="absolute bottom-20 left-20 w-12 h-12 rounded-full animate-spin flex items-center justify-center text-xl" style={{ backgroundColor: '#FF5E14', animationDelay: '2s', animationDuration: '8s' }}>
            🔧
          </div>
          <div className="absolute bottom-10 right-10 w-14 h-14 rounded-full animate-bounce flex items-center justify-center text-xl" style={{ backgroundColor: '#1a1a1a', animationDelay: '3s', animationDuration: '4.5s' }}>
            👶
          </div>
          
          {/* Floating Task Cards Animation */}
          <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-24 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg shadow-lg animate-float opacity-20 flex items-center justify-center text-white font-bold text-xs">
              TASK
            </div>
          </div>
          <div className="absolute top-3/4 right-1/4 transform translate-x-1/2 translate-y-1/2">
            <div className="w-20 h-12 bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg shadow-lg animate-float-reverse opacity-20 flex items-center justify-center text-white font-bold text-xs" style={{ animationDelay: '2s' }}>
              HELP
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
              Find Your Perfect{' '}
            </span>
            <span className="relative inline-block group">
              <span className="relative z-10 hover:scale-105 transition-transform duration-300 inline-block" style={{ color: '#FF5E14', textShadow: '0 2px 8px rgba(255, 94, 20, 0.3)' }}>
                Task
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full group-hover:h-2 transition-all duration-300"></div>
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center mb-8 sm:mb-10 max-w-5xl mx-auto leading-relaxed font-medium" 
             style={{ color: theme === 'dark' ? '#B3B5BC' : '#4B5563' }}>
            Connect with your community and discover meaningful opportunities to earn extra income
          </p>
          
          {/* Interactive Animated Stats */}
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12 lg:gap-16 mb-8 sm:mb-10">
            <div className="text-center group hover:scale-110 transition-transform duration-300 cursor-pointer">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 group-hover:animate-bounce" style={{ color: '#FF5E14' }}>
                50+
              </div>
              <div className="text-sm sm:text-base md:text-lg font-semibold flex items-center justify-center gap-2" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                <svg className="w-4 h-4 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Active Tasks
              </div>
            </div>
            <div className="text-center group hover:scale-110 transition-transform duration-300 cursor-pointer">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 group-hover:animate-pulse" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                24/7
              </div>
              <div className="text-sm sm:text-base md:text-lg font-semibold flex items-center justify-center gap-2" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                <svg className="w-4 h-4 group-hover:animate-spin" style={{ animationDuration: '2s' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Support Available
              </div>
            </div>
            <div className="text-center group hover:scale-110 transition-transform duration-300 cursor-pointer">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 group-hover:animate-bounce" style={{ color: '#FF5E14' }}>
                100+
              </div>
              <div className="text-sm sm:text-base md:text-lg font-semibold flex items-center justify-center gap-2" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                <svg className="w-4 h-4 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Community Members
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Search & Filter Section */}
      <div className="py-2" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Search & Filter Container */}
          <div className="rounded-2xl p-3 sm:p-4 shadow-xl border-2" 
               style={{ 
                 backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF',
                 borderColor: theme === 'dark' ? 'rgba(255, 94, 20, 0.3)' : 'rgba(255, 94, 20, 0.2)',
                 boxShadow: theme === 'dark' 
                   ? '0 25px 50px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 94, 20, 0.1)'
                   : '0 25px 50px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 94, 20, 0.05)'
               }}>
            
            {/* Search and Filter Controls */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Professional Search Input */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                  Search Tasks
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by title, description, location, or skills needed..."
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
                           categoryFilter === 'cleaning' ? 'Cleaning' :
                           categoryFilter === 'gardening' ? 'Gardening' :
                           categoryFilter === 'handyman' ? 'Handyman' :
                           categoryFilter === 'delivery' ? 'Delivery' :
                           categoryFilter === 'tutoring' ? 'Tutoring' :
                           categoryFilter === 'other' ? 'Other' : categoryFilter}
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
                        {['all', 'cleaning', 'gardening', 'handyman', 'delivery', 'tutoring', 'other'].map((category) => (
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
                             category === 'cleaning' ? 'Cleaning' :
                             category === 'gardening' ? 'Gardening' :
                             category === 'handyman' ? 'Handyman' :
                             category === 'delivery' ? 'Delivery' :
                             category === 'tutoring' ? 'Tutoring' :
                             category === 'other' ? 'Other' : category}
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
                Task Type
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
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Available Tasks
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
                        Requested Tasks
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
                    Category: {categoryFilter === 'cleaning' ? 'Cleaning' :
                             categoryFilter === 'gardening' ? 'Gardening' :
                             categoryFilter === 'handyman' ? 'Handyman' :
                             categoryFilter === 'delivery' ? 'Delivery' :
                             categoryFilter === 'tutoring' ? 'Tutoring' :
                             categoryFilter === 'other' ? 'Other' : categoryFilter}
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

      {/* Tasks Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Available Tasks Section - Only show when activeFilter is 'available' */}
        {activeFilter === 'available' && (
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredTasks().map((task) => (
                <UniversalCard
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  description={task.description || task.details || 'No description available'}
                  type="task"
                  category={task.category}
                  price={task.price}
                  location={task.location}
                  image={task.image}
                  postedBy={task.postedBy}
                  urgency={task.urgency}
                  isUrgent={task.isUrgent}
                  isPromoted={task.isPromoted}
                  budget={task.budget}
                  time={task.time}
                  duration={task.duration}
                  contact={task.contact}
                  showActions={true}
                />
              ))}
            </div>
            
            {getFilteredTasks().length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No available tasks match your filters. Try adjusting your search criteria.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Requested Tasks Section - Only show when activeFilter is 'requested' */}
        {activeFilter === 'requested' && (
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredTasks().map((request) => (
                <UniversalCard
                  key={request.id}
                  id={request.id}
                  title={request.title}
                  description={request.description || request.details || 'No description available'}
                  type="taskRequest"
                  category={request.category}
                  price={request.price}
                  location={request.location}
                  image={request.image}
                  postedBy={request.postedBy}
                  requestedBy={request.requestedBy}
                  urgency={request.urgency}
                  isUrgent={request.isUrgent}
                  isPromoted={request.isPromoted}
                  budget={request.budget}
                  time={request.time}
                  duration={request.duration}
                  contact={request.contact}
                  timeframe={request.timeframe}
                  experience={request.experience}
                  showActions={true}
                />
              ))}
            </div>
          
          {getFilteredTasks().length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No task requests match your filters. Try adjusting your search criteria.
              </p>
            </div>
          )}
        </div>
        )}
      </div>

      {/* Chat Agent */}
      <ToolsTasksChatAgent pageType="tasks" />

      <Footer />
    </div>
  );
}
