import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import ToolsTasksChatAgent from '../src/components/ToolsTasksChatAgent';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

interface Task {
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

// Empty tasks array - will be populated when users create tasks
const mockTasks: Task[] = [];

export default function Tasks() {
  const [activeFilter, setActiveFilter] = useState<'available' | 'requested'>('available');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [tasks] = useState<Task[]>(mockTasks);
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

  const getFilteredTasks = () => {
    let filtered = tasks.filter(task => task.type === activeFilter);
    
    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.details.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(task => 
        task.category?.toLowerCase() === categoryFilter.toLowerCase()
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
          <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-center mb-8 sm:mb-10 max-w-4xl mx-auto leading-relaxed font-medium" 
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
                <span className="group-hover:animate-spin text-lg" style={{ animationDuration: '2s' }}>⏰</span>
                Support Available
              </div>
            </div>
            <div className="text-center group hover:scale-110 transition-transform duration-300 cursor-pointer">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 group-hover:animate-bounce" style={{ color: '#FF5E14' }}>
                100+
              </div>
              <div className="text-sm sm:text-base md:text-lg font-semibold flex items-center justify-center gap-2" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                <span className="group-hover:animate-pulse text-lg">😊</span>
                Community Members
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
                <input
                  type="text"
                  placeholder="Search tasks by title, location, category, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 pr-24 border rounded-lg focus:outline-none text-base font-medium shadow-sm transition-all duration-300"
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
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: theme === 'dark' ? '#9CA3AF' : '#6B7280' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                {/* Filter Icon */}
                <div className="absolute right-10 top-1/2 transform -translate-y-1/2 relative">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="p-2 rounded-lg border transition-all duration-200 hover:scale-105"
                    style={{ 
                      backgroundColor: showFilters ? '#FF5E14' : (theme === 'dark' ? '#374151' : '#FFFFFF'),
                      color: showFilters ? '#FFFFFF' : (theme === 'dark' ? '#D1D5DB' : '#6B7280'),
                      borderColor: showFilters ? '#FF5E14' : (theme === 'dark' ? '#4B5563' : '#E2E8F0')
                    }}
                    title="Filter tasks"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
                    </svg>
                  </button>
                  
                  {/* Filter Dropdown */}
                  {showFilters && (
                    <div 
                      className="absolute top-full right-0 mt-2 w-72 p-4 rounded-lg shadow-lg border z-50"
                      style={{ 
                        backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF',
                        borderColor: theme === 'dark' ? '#4B5563' : '#E2E8F0',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)'
                      }}
                    >
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                            Filter by Category
                          </span>
                          <button
                            onClick={() => {
                              setCategoryFilter('all');
                              setShowFilters(false);
                            }}
                            className="text-xs px-2 py-1 rounded transition-colors"
                            style={{ 
                              backgroundColor: theme === 'dark' ? '#374151' : '#F3F4F6',
                              color: theme === 'dark' ? '#9CA3AF' : '#6B7280'
                            }}
                          >
                            Clear
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          {['all', 'cleaning', 'gardening', 'handyman', 'delivery', 'tutoring', 'other'].map((category) => (
                            <button
                              key={category}
                              onClick={() => {
                                setCategoryFilter(category);
                                setShowFilters(false);
                              }}
                              className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
                              style={{
                                backgroundColor: categoryFilter === category 
                                  ? '#FF5E14' 
                                  : (theme === 'dark' ? '#374151' : '#F8F9FA'),
                                color: categoryFilter === category 
                                  ? '#FFFFFF' 
                                  : (theme === 'dark' ? '#D1D5DB' : '#6B7280'),
                                border: `1px solid ${categoryFilter === category ? '#FF5E14' : (theme === 'dark' ? '#4B5563' : '#E2E8F0')}`
                              }}
                            >
                              {category === 'all' ? 'All Tasks' : 
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
                    </div>
                  )}
                </div>
                {/* Clear Button */}
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-16 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors duration-200"
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
            </div>
            
            {/* Results Summary with improved styling */}
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                  {getFilteredTasks().length} {getFilteredTasks().length === 1 ? 'task' : 'tasks'} found
                </span>
                {searchTerm && (
                  <span className="text-sm px-2 py-1 rounded-full" 
                        style={{ 
                          backgroundColor: theme === 'dark' ? 'rgba(255, 94, 20, 0.1)' : 'rgba(255, 94, 20, 0.05)',
                          color: '#FF5E14'
                        }}>
                    &ldquo;{searchTerm}&rdquo;
                  </span>
                )}
                {categoryFilter !== 'all' && (
                  <span className="text-sm px-2 py-1 rounded-full" 
                        style={{ 
                          backgroundColor: theme === 'dark' ? 'rgba(255, 94, 20, 0.1)' : 'rgba(255, 94, 20, 0.05)',
                          color: '#FF5E14'
                        }}>
                    {categoryFilter === 'cleaning' ? 'Cleaning' :
                     categoryFilter === 'gardening' ? 'Gardening' :
                     categoryFilter === 'handyman' ? 'Handyman' :
                     categoryFilter === 'delivery' ? 'Delivery' :
                     categoryFilter === 'tutoring' ? 'Tutoring' :
                     categoryFilter === 'other' ? 'Other' : categoryFilter}
                  </span>
                )}
              </div>
              {(searchTerm || categoryFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setCategoryFilter('all');
                  }}
                  className="text-sm font-medium px-3 py-1 rounded-lg transition-colors duration-200"
                  style={{ 
                    color: '#FF5E14',
                    backgroundColor: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255, 94, 20, 0.1)' : 'rgba(255, 94, 20, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  Clear all filters
                </button>
              )}
            </div>
            </div>
          </div>
        </div>

        {/* Enhanced Filter Toggle Section */}
        <div className="py-6" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#FFFFFF' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Available/Requested Toggle Filter with improved design */}
            <div className="relative">
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
        </div>
      </div>

      {/* Tasks Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Available Tasks Section - Only show when activeFilter is 'available' */}
        {activeFilter === 'available' && (
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredTasks().map((task) => (
              <Link key={task.id} href={`/tasks/${task.id}_enhanced`}>
                <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-orange-200 dark:hover:border-orange-800 cursor-pointer"
                     style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
                     }}>
                <div className="relative overflow-hidden">
                  {task.image && (
                    <Image 
                      src={task.image} 
                      alt={task.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full shadow-lg">
                      Available
                    </span>
                  </div>
                  {task.isUrgent && (
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full shadow-lg animate-pulse">
                        Urgent
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-orange-500 transition-colors duration-300" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1E293B' }}>
                    {task.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                    {task.description}
                  </p>
                  
                  {/* Task Details */}
                  <div className="space-y-2 mb-4 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-3 p-2 rounded-lg" style={{ backgroundColor: theme === 'dark' ? 'rgba(255, 94, 20, 0.1)' : 'rgba(255, 94, 20, 0.05)' }}>
                      <span className="text-lg">💰</span>
                      <span className="text-xl font-bold" style={{ color: '#FF5E14' }}>{task.price}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>📍</span>
                      <span>{task.position} • {task.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>⏱️</span>
                      <span>{task.duration} {task.timeframe}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>👤</span>
                      <span>{task.experience}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>�</span>
                      <span>{task.contact}</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-4">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Details:</strong> {task.details}
                    </p>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      className="flex-1 font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                      style={{ 
                        background: 'linear-gradient(135deg, #FF5E14 0%, #FF4500 100%)', 
                        color: '#FFFFFF',
                        boxShadow: '0 4px 15px rgba(255, 94, 20, 0.3)'
                      }}
                    >
                      Apply Now
                    </button>
                    <button
                      className="px-6 py-3 border-2 rounded-xl hover:scale-105 transition-all duration-300 font-semibold"
                      style={{ 
                        borderColor: theme === 'dark' ? '#4B5563' : '#D1D5DB',
                        color: theme === 'dark' ? '#D1D5DB' : '#4B5563',
                        backgroundColor: theme === 'dark' ? 'transparent' : '#FFFFFF'
                      }}
                    >
                      💬
                    </button>
                  </div>
                </div>
                </div>
              </Link>
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
                <div key={request.id} className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-yellow-200 dark:hover:border-yellow-800"
                     style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
                     }}>
                  <div className="relative overflow-hidden">
                    {request.image && (
                      <Image 
                        src={request.image} 
                        alt={request.title}
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full shadow-lg">
                        Requested
                      </span>
                    </div>
                    {request.isUrgent && (
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full shadow-lg animate-pulse">
                          Urgent
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-yellow-500 transition-colors duration-300" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1E293B' }}>
                      {request.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                      {request.description}
                    </p>
                  
                  {/* Request Details */}
                  <div className="space-y-3 mb-6 text-sm">
                    <div className="flex items-center gap-3 p-2 rounded-lg" style={{ backgroundColor: theme === 'dark' ? 'rgba(234, 179, 8, 0.1)' : 'rgba(234, 179, 8, 0.05)' }}>
                      <span className="text-lg">💰</span>
                      <span className="text-xl font-bold" style={{ color: '#EAB308' }}>{request.price}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>📍</span>
                      <span>{request.position} • {request.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>⏱️</span>
                      <span>{request.duration} {request.timeframe}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>👤</span>
                      <span>{request.experience}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>📧</span>
                      <span>{request.contact}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>👨‍💼</span>
                      <span>Posted by: {request.postedBy}</span>
                    </div>
                  </div>
                  
                  <div className="rounded-xl p-4 mb-6" style={{ backgroundColor: theme === 'dark' ? 'rgba(133, 77, 14, 0.2)' : 'rgba(254, 252, 232, 1)' }}>
                    <p className="text-sm leading-relaxed" style={{ color: theme === 'dark' ? '#FDE68A' : '#92400E' }}>
                      <strong style={{ color: theme === 'dark' ? '#FBBF24' : '#78350F' }}>Details:</strong> {request.details}
                    </p>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      className="flex-1 font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                      style={{ 
                        background: 'linear-gradient(135deg, #EAB308 0%, #D97706 100%)', 
                        color: '#FFFFFF',
                        boxShadow: '0 4px 15px rgba(234, 179, 8, 0.3)'
                      }}
                    >
                      Offer Service
                    </button>
                    <button
                      className="px-6 py-3 border-2 rounded-xl hover:scale-105 transition-all duration-300 font-semibold"
                      style={{ 
                        borderColor: theme === 'dark' ? '#4B5563' : '#D1D5DB',
                        color: theme === 'dark' ? '#D1D5DB' : '#4B5563',
                        backgroundColor: theme === 'dark' ? 'transparent' : '#FFFFFF'
                      }}
                    >
                      💬
                    </button>
                  </div>
                </div>
              </div>
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
