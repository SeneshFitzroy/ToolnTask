import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import ChatAgent from '../src/components/ChatAgent';
import { Button } from '../src/components/ui/button';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';

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

// Mock data for tools - both available and requested
const mockTools: Tool[] = [
  // Available Tools
  {
    id: 'tool1',
    title: 'Power Drill Set',
    description: 'Professional cordless drill with various bits and attachments. Perfect for home renovation projects.',
    price: '$25/day',
    time: '1-7 days',
    location: 'Queens, NY',
    category: 'power-tools',
    type: 'available',
    position: 'Tool Rental Shop',
    timeframe: 'days',
    experience: 'Basic tool handling knowledge',
    contact: 'tools@rental.com',
    postedBy: 'ProTools Rental',
    duration: '1-7',
    details: 'Includes drill, charger, carrying case, and 20-piece bit set. Perfect for drilling holes and driving screws.',
    isUrgent: false,
    image: '/api/placeholder/400/250'
  },
  {
    id: 'tool2',
    title: 'Lawn Mower',
    description: 'Self-propelled gas lawn mower, perfect for medium to large yards.',
    price: '$40/day',
    time: '1-3 days',
    location: 'Brooklyn, NY',
    category: 'garden-tools',
    type: 'available',
    position: 'Garden Center',
    timeframe: 'days',
    experience: 'Lawn mower operation experience',
    contact: 'garden@tools.com',
    postedBy: 'Green Garden Tools',
    duration: '1-3',
    details: 'Gas-powered, self-propelled. Includes fuel and oil. Perfect for yards up to 1/2 acre.',
    isUrgent: false,
    image: '/api/placeholder/400/250'
  },
  {
    id: 'tool3',
    title: 'Professional Ladder',
    description: 'Extendable aluminum ladder, reaches up to 20 feet. Great for painting and maintenance.',
    price: '$15/day',
    time: '1-5 days',
    location: 'Manhattan, NY',
    category: 'construction',
    type: 'available',
    position: 'Construction Supply',
    timeframe: 'days',
    experience: 'Ladder safety knowledge required',
    contact: 'safety@construct.com',
    postedBy: 'SafeHeight Equipment',
    duration: '1-5',
    details: 'Professional-grade aluminum ladder. Safety equipment included. Must demonstrate proper usage.',
    isUrgent: false,
    image: '/api/placeholder/400/250'
  },
  {
    id: 'tool4',
    title: 'Carpet Cleaner',
    description: 'Professional carpet cleaning machine for deep cleaning carpets and upholstery.',
    price: '$35/day',
    time: '1-2 days',
    location: 'Staten Island, NY',
    category: 'cleaning',
    type: 'available',
    position: 'Cleaning Supply Store',
    timeframe: 'days',
    experience: 'Carpet cleaning experience preferred',
    contact: 'clean@supply.com',
    postedBy: 'CleanMaster Equipment',
    duration: '1-2',
    details: 'Professional carpet cleaner with attachments. Cleaning solution included. Training available.',
    isUrgent: true,
    image: '/api/placeholder/400/250'
  },
  // Requested Tools
  {
    id: 'treq1',
    title: 'Need Circular Saw',
    description: 'Looking for circular saw for weekend DIY project. Need for deck building.',
    price: '$30-40/day',
    time: '2-3 days',
    location: 'Queens, NY',
    category: 'power-tools',
    type: 'requested',
    position: 'Home Workshop',
    timeframe: 'days',
    experience: 'Experienced with power tools',
    contact: 'john@email.com',
    postedBy: 'John Smith',
    duration: '2-3',
    details: 'Weekend project building deck. Need quality circular saw with guide. Can pick up Friday evening.',
    isUrgent: false
  },
  {
    id: 'treq2',
    title: 'Pressure Washer Needed',
    description: 'Need pressure washer for driveway and patio cleaning. One-day rental.',
    price: '$20-30/day',
    time: '1 day',
    location: 'Brooklyn, NY',
    category: 'cleaning',
    type: 'requested',
    position: 'Residential Property',
    timeframe: 'days',
    experience: 'Basic pressure washer knowledge',
    contact: 'maria@email.com',
    postedBy: 'Maria Rodriguez',
    duration: '1',
    details: 'Spring cleaning project. Need pressure washer with various nozzles. Flexible on pickup time.',
    isUrgent: false
  },
  {
    id: 'treq3',
    title: 'Tile Saw Required',
    description: 'Need tile saw for bathroom renovation project. Wet saw preferred.',
    price: '$40-60/day',
    time: '3-4 days',
    location: 'Manhattan, NY',
    category: 'construction',
    type: 'requested',
    position: 'Apartment Renovation',
    timeframe: 'days',
    experience: 'Tile cutting experience required',
    contact: 'david@email.com',
    postedBy: 'David Chen',
    duration: '3-4',
    details: 'Bathroom renovation. Need wet tile saw with diamond blade. Can provide deposit.',
    isUrgent: true
  }
];

export default function Tools() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showFilterDropdown, setShowFilterDropdown] = useState<boolean>(false);
  const [tools] = useState<Tool[]>(mockTools);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setShowFilterDropdown(false);
  };

  const handleSearch = () => {
    // Search functionality can be implemented here
    console.log('Searching for:', searchTerm);
  };

  const filterOptions = [
    { key: 'all', label: 'All Categories', count: tools.length },
    { key: 'power-tools', label: 'Power Tools', count: tools.filter(t => t.category === 'power-tools').length },
    { key: 'garden-tools', label: 'Garden Tools', count: tools.filter(t => t.category === 'garden-tools').length },
    { key: 'construction', label: 'Construction', count: tools.filter(t => t.category === 'construction').length },
    { key: 'cleaning', label: 'Cleaning', count: tools.filter(t => t.category === 'cleaning').length },
    { key: 'other', label: 'Other', count: tools.filter(t => t.category === 'other').length }
  ];

  const getFilteredTools = (type?: 'available' | 'requested') => {
    let filtered = tools;
    
    // Filter by type if specified
    if (type) {
      filtered = filtered.filter(tool => tool.type === type);
    }
    
    // Apply category filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(tool => tool.category === activeFilter);
    }
    
    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(tool => 
        tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.details.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const getCurrentFilterLabel = () => {
    const currentFilter = filterOptions.find(option => option.key === activeFilter);
    return currentFilter ? currentFilter.label : 'All Categories';
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
            🔨
          </div>
          <div className="absolute bottom-20 left-20 w-12 h-12 rounded-full animate-spin flex items-center justify-center text-xl" style={{ backgroundColor: '#FF5E14', animationDelay: '2s', animationDuration: '8s' }}>
            ⚡
          </div>
          <div className="absolute bottom-10 right-10 w-14 h-14 rounded-full animate-bounce flex items-center justify-center text-xl" style={{ backgroundColor: '#1a1a1a', animationDelay: '3s', animationDuration: '4.5s' }}>
            🛠️
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
          {/* Enhanced Interactive Badge */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg border-2 transition-all duration-300 hover:scale-110 hover:shadow-2xl animate-pulse" 
                 style={{ 
                   backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF',
                   borderColor: theme === 'dark' ? 'rgba(255, 94, 20, 0.3)' : 'rgba(255, 94, 20, 0.2)',
                   animationDuration: '2s'
                 }}>
              <span className="text-lg sm:text-xl mr-2 animate-bounce">🔧</span>
              <span className="text-sm sm:text-base font-bold" style={{ color: '#FF5E14' }}>
                Find Your Perfect Tool
              </span>
              <span className="ml-2 animate-spin text-lg">⚡</span>
            </div>
          </div>
          
          {/* Enhanced Interactive Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-center mb-4 sm:mb-6 leading-tight tracking-tight">
            <span className="inline-block hover:scale-110 transition-transform duration-300" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
              Discover{' '}
            </span>
            <span className="relative inline-block group">
              <span className="relative z-10 hover:scale-110 transition-transform duration-300 inline-block" style={{ color: '#FF5E14', textShadow: '0 2px 8px rgba(255, 94, 20, 0.3)' }}>
                Tools
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full group-hover:h-2 transition-all duration-300"></div>
              {/* Animated sparkles around Tools */}
              <div className="absolute -top-2 -right-2 text-yellow-400 animate-ping opacity-75">✨</div>
              <div className="absolute -bottom-1 -left-2 text-yellow-400 animate-pulse opacity-50" style={{ animationDelay: '0.5s' }}>⭐</div>
              <div className="absolute top-1 -right-6 text-yellow-400 animate-bounce opacity-60" style={{ animationDelay: '1s' }}>💫</div>
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-center mb-8 sm:mb-10 max-w-4xl mx-auto leading-relaxed font-medium" 
             style={{ color: theme === 'dark' ? '#B3B5BC' : '#4B5563' }}>
            Rent quality tools for your projects or earn income by sharing your equipment
          </p>
          
          {/* Interactive Animated Stats */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-10">
            <div className="text-center group hover:scale-110 transition-transform duration-300 cursor-pointer">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black mb-1 group-hover:animate-bounce" style={{ color: '#FF5E14' }}>
                300+
              </div>
              <div className="text-sm sm:text-base font-medium flex items-center justify-center gap-1" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                <span className="group-hover:animate-pulse">🔧</span>
                Available Tools
              </div>
            </div>
            <div className="text-center group hover:scale-110 transition-transform duration-300 cursor-pointer">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black mb-1 group-hover:animate-pulse" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                24/7
              </div>
              <div className="text-sm sm:text-base font-medium flex items-center justify-center gap-1" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                <span className="group-hover:animate-spin" style={{ animationDuration: '2s' }}>⏰</span>
                New Listings
              </div>
            </div>
            <div className="text-center group hover:scale-110 transition-transform duration-300 cursor-pointer">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black mb-1 group-hover:animate-bounce" style={{ color: '#FF5E14' }}>
                800+
              </div>
              <div className="text-sm sm:text-base font-medium flex items-center justify-center gap-1" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                <span className="group-hover:animate-pulse">😊</span>
                Happy Renters
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="py-4 sm:py-6" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#FFFFFF' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Compact Search Bar Container */}
          <div className="rounded-xl p-4 sm:p-5 shadow-lg border" 
               style={{ 
                 backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF',
                 borderColor: theme === 'dark' ? 'rgba(255, 94, 20, 0.2)' : 'rgba(255, 94, 20, 0.15)',
                 boxShadow: theme === 'dark' 
                   ? '0 8px 25px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 94, 20, 0.08)'
                   : '0 8px 25px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 94, 20, 0.03)'
               }}>
          
          {/* Search Bar with Filter */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col lg:flex-row gap-2 sm:gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search tools, locations, categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none text-sm sm:text-base font-medium shadow-sm transition-all duration-300"
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
                <div className="absolute right-2.5 sm:right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: theme === 'dark' ? '#9CA3AF' : '#6B7280' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              
              {/* Compact Filter Dropdown */}
              <div className="relative lg:w-auto">
                <button
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  className="w-full lg:w-auto flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg font-medium shadow-sm transition-all duration-300 text-sm sm:text-base"
                  style={{ 
                    borderColor: theme === 'dark' ? '#4B5563' : '#E2E8F0',
                    backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF',
                    color: theme === 'dark' ? '#D1D5DB' : '#4B5563'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#3B82F6';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = theme === 'dark' ? '#4B5563' : '#E2E8F0';
                    e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.08)';
                  }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
                  </svg>
                  <span className="font-semibold">{getCurrentFilterLabel()}</span>
                  <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${showFilterDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showFilterDropdown && (
                  <div className="absolute right-0 mt-2 w-64 sm:w-72 border rounded-xl shadow-lg z-50" 
                       style={{ 
                         backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF', 
                         borderColor: theme === 'dark' ? '#4B5563' : '#E2E8F0' 
                       }}>
                    <div className="p-3 sm:p-4">
                      {filterOptions.map((option) => (
                        <button
                          key={option.key}
                          onClick={() => handleFilterChange(option.key)}
                          className={`w-full flex items-center justify-between p-3 rounded-lg mb-1.5 font-medium text-sm sm:text-base transition-all duration-300 ${
                            activeFilter === option.key 
                              ? 'shadow-md' 
                              : 'hover:shadow-sm'
                          }`}
                          style={{
                            backgroundColor: activeFilter === option.key ? '#FF5E14' : 'transparent',
                            color: activeFilter === option.key ? '#FFFFFF' : (theme === 'dark' ? '#D1D5DB' : '#374151')
                          }}
                        >
                          <span className="font-semibold">{option.label}</span>
                          <span className="text-xs sm:text-sm px-2 py-1 rounded-full font-medium" style={{ 
                            backgroundColor: activeFilter === option.key ? 'rgba(255,255,255,0.2)' : (theme === 'dark' ? '#4B5563' : '#F3F4F6'),
                            color: activeFilter === option.key ? '#FFFFFF' : (theme === 'dark' ? '#9CA3AF' : '#6B7280')
                          }}>
                            {option.count}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Compact Search Button */}
            <Button 
              onClick={handleSearch}
              className="w-full text-base sm:text-lg font-bold px-6 py-3 sm:py-4 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-102"
              style={{ 
                background: 'linear-gradient(135deg, #FF5E14 0%, #FF5D13 50%, #FF4500 100%)',
                borderColor: '#FF5E14',
                color: '#FFFFFF',
                textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                boxShadow: '0 6px 20px rgba(255, 94, 20, 0.3)'
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLButtonElement;
                target.style.transform = 'scale(1.02) translateY(-2px)';
                target.style.boxShadow = '0 8px 25px rgba(255, 94, 20, 0.4)';
                target.style.background = 'linear-gradient(135deg, #FF5D13 0%, #FF4500 50%, #FF3300 100%)';
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLButtonElement;
                target.style.transform = 'scale(1) translateY(0px)';
                target.style.boxShadow = '0 6px 20px rgba(255, 94, 20, 0.3)';
                target.style.background = 'linear-gradient(135deg, #FF5E14 0%, #FF5D13 50%, #FF4500 100%)';
              }}
            >
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Search Tools</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </Button>
          </div>
          
          {/* Results Summary */}
          <div className="text-center">
            <p className="text-sm sm:text-base" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
              {getFilteredTools().length} {getFilteredTools().length === 1 ? 'tool' : 'tools'} found
              {searchTerm && ` for "${searchTerm}"`}
              {activeFilter !== 'all' && ` in ${getCurrentFilterLabel()}`}
            </p>
          </div>
          </div>
        </div>
      </div>

      {/* Enhanced Filter Section */}
      <div className="py-6" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border" 
               style={{ borderColor: theme === 'dark' ? '#374151' : '#e5e7eb' }}>
            <h3 className="text-lg font-semibold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1E293B' }}>
              Filter Tools
            </h3>
            <div className="flex flex-wrap gap-3">
              {filterOptions.map((option) => (
                <button
                  key={option.key}
                  onClick={() => handleFilterChange(option.key)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    activeFilter === option.key 
                      ? 'shadow-md transform scale-105' 
                      : 'hover:shadow-sm'
                  }`}
                  style={{
                    backgroundColor: activeFilter === option.key ? '#FF5E14' : (theme === 'dark' ? '#374151' : '#f3f4f6'),
                    color: activeFilter === option.key ? '#FFFFFF' : (theme === 'dark' ? '#D1D5DB' : '#374151')
                  }}
                >
                  {option.label} ({option.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tools Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Available Tools Section */}
        <div className="mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-green-200 dark:border-green-800 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🔧</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1E293B' }}>
                    Available Tools ({getFilteredTools('available').length})
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Ready to rent from trusted owners
                  </p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Available Now</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFilteredTools('available').map((tool) => (
              <div key={tool.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-green-200">
                <div className="relative">
                  {tool.image && (
                    <Image 
                      src={tool.image} 
                      alt={tool.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                      Available
                    </span>
                  </div>
                  {tool.isUrgent && (
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                        Urgent
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1E293B' }}>
                    {tool.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3 text-sm">
                    {tool.description}
                  </p>
                  
                  {/* Tool Details */}
                  <div className="space-y-2 mb-4 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span>💰</span>
                      <span className="text-lg font-bold text-orange-500">{tool.price}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>📍</span>
                      <span>{tool.position} • {tool.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>⏱️</span>
                      <span>{tool.duration} {tool.timeframe}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>👤</span>
                      <span>{tool.experience}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>📧</span>
                      <span>{tool.contact}</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-4">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Details:</strong> {tool.details}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Rent Tool
                    </button>
                    <button
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      💬 Chat
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {getFilteredTools('available').length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No available tools match your filters. Try adjusting your search criteria.
              </p>
            </div>
          )}
        </div>

        {/* Requested Tools Section */}
        <div className="mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-yellow-200 dark:border-yellow-800 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🔍</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1E293B' }}>
                    Tool Requests ({getFilteredTools('requested').length})
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    People looking for specific tools to rent
                  </p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2 text-sm text-yellow-600 dark:text-yellow-400">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>Seeking Tools</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFilteredTools('requested').map((request) => (
              <div key={request.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-yellow-200">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1E293B' }}>
                      {request.title}
                    </h3>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-yellow-500 text-white text-xs rounded-full">
                        Requested
                      </span>
                      {request.isUrgent && (
                        <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                          Urgent
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-3 text-sm">
                    {request.description}
                  </p>
                  
                  {/* Request Details */}
                  <div className="space-y-2 mb-4 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span>💰</span>
                      <span className="text-lg font-bold text-orange-500">{request.price}</span>
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
                  
                  <div className="bg-yellow-50 dark:bg-yellow-900 rounded-lg p-3 mb-4">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      <strong>Details:</strong> {request.details}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Offer Tool
                    </button>
                    <button
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      💬 Chat
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {getFilteredTools('requested').length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No tool requests match your filters. Try adjusting your search criteria.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Chat Agent */}
      <ChatAgent pageType="tools" />

      <Footer />
    </div>
  );
}
