import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import ToolsTasksChatAgent from '../src/components/ToolsTasksChatAgent';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
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
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop&auto=format'
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
    image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=400&h=300&fit=crop&auto=format'
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
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop&auto=format'
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
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop&auto=format'
  },
  {
    id: 'tool5',
    title: 'Angle Grinder',
    description: 'Heavy-duty angle grinder for metal cutting and grinding projects.',
    price: '$20/day',
    time: '1-3 days',
    location: 'Bronx, NY',
    category: 'power-tools',
    type: 'available',
    position: 'Hardware Store',
    timeframe: 'days',
    experience: 'Power tool experience required',
    contact: 'hardware@tools.com',
    postedBy: 'Metro Hardware',
    duration: '1-3',
    details: 'Professional-grade angle grinder with multiple discs. Safety equipment included.',
    isUrgent: false,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop&auto=format'
  },
  {
    id: 'tool6',
    title: 'Welding Equipment',
    description: 'Complete welding setup with all safety gear and accessories.',
    price: '$60/day',
    time: '1-5 days',
    location: 'Queens, NY',
    category: 'power-tools',
    type: 'available',
    position: 'Welding Shop',
    timeframe: 'days',
    experience: 'Certified welder only',
    contact: 'weld@shop.com',
    postedBy: 'Pro Welding Co.',
    duration: '1-5',
    details: 'Professional welding equipment with all safety gear. Certification verification required.',
    isUrgent: false,
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop&auto=format'
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
  },
  {
    id: 'treq4',
    title: 'Looking for Scaffolding',
    description: 'Need scaffolding system for exterior house painting project.',
    price: '$80-120/day',
    time: '5-7 days',
    location: 'Staten Island, NY',
    category: 'construction',
    type: 'requested',
    position: 'Residential Property',
    timeframe: 'days',
    experience: 'Scaffolding setup knowledge',
    contact: 'paint@project.com',
    postedBy: 'HomeOwner Mike',
    duration: '5-7',
    details: 'Exterior painting project. Need complete scaffolding system with safety equipment.',
    isUrgent: false,
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop'
  }
];

export default function Tools() {
  const [activeFilter, setActiveFilter] = useState<'available' | 'requested'>('available');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [tools] = useState<Tool[]>(mockTools);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

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
        tool.details.toLowerCase().includes(searchTerm.toLowerCase())
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
                  placeholder="Search tools by title, location, category, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 pr-12 border rounded-lg focus:outline-none text-base font-medium shadow-sm transition-all duration-300"
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
                {/* Clear Button */}
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors duration-200"
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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                  {getFilteredTools().length} {getFilteredTools().length === 1 ? 'tool' : 'tools'} found
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
              </div>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
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
                  Clear search
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

      {/* Tools Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getFilteredTools().map((tool) => (
            <Link key={tool.id} href={`/tools/${tool.id}_enhanced`}>
              <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 border border-gray-100 dark:border-gray-700 cursor-pointer"
                   style={{ 
                     borderColor: tool.type === 'available' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                     boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' 
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
                   }}>
              
              {/* Only show images for available tools */}
              {tool.type === 'available' && tool.image && (
                <div className="relative overflow-hidden">
                  <Image 
                    src={tool.image} 
                    alt={tool.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full shadow-lg">
                      Available
                    </span>
                  </div>
                  {tool.isUrgent && (
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full shadow-lg animate-pulse">
                        Urgent
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* For requested tools, show header with status */}
              {tool.type === 'requested' && (
                <div className="p-4 border-b" style={{ backgroundColor: theme === 'dark' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(245, 158, 11, 0.05)' }}>
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full shadow-lg">
                      Requested
                    </span>
                    {tool.isUrgent && (
                      <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full shadow-lg animate-pulse">
                        Urgent
                      </span>
                    )}
                  </div>
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-500 transition-colors duration-300" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1E293B' }}>
                  {tool.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                  {tool.description}
                </p>
                
                {/* Tool Details */}
                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex items-center gap-3 p-2 rounded-lg" style={{ 
                    backgroundColor: tool.type === 'available' 
                      ? (theme === 'dark' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(34, 197, 94, 0.05)')
                      : (theme === 'dark' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(245, 158, 11, 0.05)')
                  }}>
                    <span className="text-lg">💰</span>
                    <span className="text-xl font-bold" style={{ 
                      color: tool.type === 'available' ? '#22C55E' : '#F59E0B' 
                    }}>{tool.price}</span>
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
                  {tool.type === 'requested' && (
                    <div className="flex items-center gap-2">
                      <span>👨‍�</span>
                      <span>Posted by: {tool.postedBy}</span>
                    </div>
                  )}
                </div>
                
                <div className={`rounded-lg p-3 mb-4 ${
                  tool.type === 'available' 
                    ? 'bg-gray-50 dark:bg-gray-700' 
                    : 'bg-yellow-50 dark:bg-yellow-900'
                }`}>
                  <p className={`text-sm ${
                    tool.type === 'available' 
                      ? 'text-gray-700 dark:text-gray-300' 
                      : 'text-yellow-800 dark:text-yellow-200'
                  }`}>
                    <strong>Details:</strong> {tool.details}
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <button
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    {tool.type === 'available' ? 'Rent Tool' : 'Offer Tool'}
                  </button>
                  <button
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    💬 Chat
                  </button>
                </div>
              </div>
              </div>
            </Link>
          ))}
        </div>
        
        {getFilteredTools().length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No tools match your filters. Try adjusting your search criteria.
            </p>
          </div>
        )}
      </div>

      {/* Chat Agent */}
      <ToolsTasksChatAgent pageType="tools" />

      <Footer />
    </div>
  );
}
