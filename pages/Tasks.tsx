import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import ChatAgent from '../src/components/ChatAgent';
import { Button } from '../src/components/ui/button';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';

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

// Mock data for tasks - both available and requested
const mockTasks: Task[] = [
  // Available Tasks
  {
    id: 'task1',
    title: 'House Cleaning Service',
    description: 'Professional deep cleaning service for 3-bedroom home. Kitchen, bathrooms, living areas.',
    price: '$120-150',
    time: '6 hours',
    location: 'Queens, NY',
    category: 'cleaning',
    type: 'available',
    position: 'Residential Property',
    timeframe: 'hours',
    experience: '3+ years cleaning experience',
    contact: 'cleaning@email.com',
    postedBy: 'CleanPro Services',
    duration: '6',
    details: 'Includes all cleaning supplies. Deep cleaning of kitchen appliances, bathroom sanitization, dusting, vacuuming.',
    isUrgent: false,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop'
  },
  {
    id: 'task2',
    title: 'Garden Maintenance',
    description: 'Weekly garden upkeep including weeding, watering, and basic pruning.',
    price: '$80-100',
    time: '4 hours',
    location: 'Brooklyn, NY',
    category: 'gardening',
    type: 'available',
    position: 'Private Garden',
    timeframe: 'hours',
    experience: 'Basic gardening knowledge required',
    contact: 'garden@email.com',
    postedBy: 'Green Thumb Co.',
    duration: '4',
    details: 'Weekly maintenance service. Must provide own tools. Knowledge of seasonal plants preferred.',
    isUrgent: false,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop'
  },
  {
    id: 'task3',
    title: 'Plumbing Repair',
    description: 'Fix leaky bathroom faucet and replace kitchen sink drain.',
    price: '$150-200',
    time: '3 hours',
    location: 'Manhattan, NY',
    category: 'repairs',
    type: 'available',
    position: 'Apartment Building',
    timeframe: 'hours',
    experience: 'Licensed plumber preferred',
    contact: 'repair@email.com',
    postedBy: 'FixIt Services',
    duration: '3',
    details: 'Materials provided. Must be licensed and insured. Evening availability preferred.',
    isUrgent: true,
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=300&fit=crop'
  },
  {
    id: 'task4',
    title: 'Babysitting Service',
    description: 'Evening babysitting for 2 children (ages 5 and 8). Homework help included.',
    price: '$60-80',
    time: '4 hours',
    location: 'Staten Island, NY',
    category: 'babysitting',
    type: 'available',
    position: 'Family Home',
    timeframe: 'hours',
    experience: 'Childcare experience and references required',
    contact: 'family@email.com',
    postedBy: 'Johnson Family',
    duration: '4',
    details: 'Light meal preparation. Help with homework. Bedtime routine assistance.',
    isUrgent: false,
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop'
  },
  // Requested Tasks
  {
    id: 'treq1',
    title: 'Need House Cleaning Help',
    description: 'Looking for reliable house cleaning service for weekly maintenance of 2-bedroom apartment.',
    price: '$100-130',
    time: '4-5 hours',
    location: 'Queens, NY',
    category: 'cleaning',
    type: 'requested',
    position: 'Apartment Complex',
    timeframe: 'hours',
    experience: 'Professional cleaning experience preferred',
    contact: 'sarah@example.com',
    postedBy: 'Sarah Johnson',
    duration: '4-5',
    details: 'Weekly service needed. Flexible scheduling. Pet-friendly cleaner preferred.',
    isUrgent: false,
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=300&fit=crop'
  },
  {
    id: 'treq2',
    title: 'Garden Setup Required',
    description: 'Need help setting up vegetable garden in backyard. Soil preparation and planting.',
    price: '$200-250',
    time: '8 hours',
    location: 'Brooklyn, NY',
    category: 'gardening',
    type: 'requested',
    position: 'Backyard Garden',
    timeframe: 'hours',
    experience: 'Experienced gardener with vegetable growing knowledge',
    contact: 'mike@example.com',
    postedBy: 'Mike Wilson',
    duration: '8',
    details: 'Spring garden setup. Soil testing and amendment. Plant selection guidance needed.',
    isUrgent: false,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop'
  },
  {
    id: 'treq3',
    title: 'Furniture Assembly Needed',
    description: 'Need help assembling IKEA furniture for new apartment. Multiple pieces.',
    price: '$80-120',
    time: '4-6 hours',
    location: 'Manhattan, NY',
    category: 'repairs',
    type: 'requested',
    position: 'Apartment',
    timeframe: 'hours',
    experience: 'Furniture assembly experience required',
    contact: 'lisa@example.com',
    postedBy: 'Lisa Chen',
    duration: '4-6',
    details: 'Multiple IKEA pieces including bed, dresser, and desk. Tools provided.',
    isUrgent: true,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop'
  }
];

export default function Tasks() {
  const [activeFilter, setActiveFilter] = useState<'available' | 'requested'>('available');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [tasks] = useState<Task[]>(mockTasks);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleFilterChange = (filter: 'available' | 'requested') => {
    setActiveFilter(filter);
  };

  const handleSearch = () => {
    // Search functionality can be implemented here
    console.log('Searching for:', searchTerm);
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
          {/* Enhanced Interactive Badge */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg border-2 transition-all duration-300 hover:scale-110 hover:shadow-2xl animate-pulse" 
                 style={{ 
                   backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF',
                   borderColor: theme === 'dark' ? 'rgba(255, 94, 20, 0.3)' : 'rgba(255, 94, 20, 0.2)',
                   animationDuration: '2s'
                 }}>
              <span className="text-lg sm:text-xl mr-2 animate-bounce">🎯</span>
              <span className="text-sm sm:text-base font-bold" style={{ color: '#FF5E14' }}>
                Find Your Perfect Task
              </span>
              <span className="ml-2 animate-spin text-lg">⚡</span>
            </div>
          </div>
          
          {/* Enhanced Interactive Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-center mb-4 sm:mb-6 leading-tight tracking-tight">
            <span className="inline-block hover:scale-110 transition-transform duration-300" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
              Explore{' '}
            </span>
            <span className="relative inline-block group">
              <span className="relative z-10 hover:scale-110 transition-transform duration-300 inline-block" style={{ color: '#FF5E14', textShadow: '0 2px 8px rgba(255, 94, 20, 0.3)' }}>
                Tasks
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full group-hover:h-2 transition-all duration-300"></div>
              {/* Animated sparkles around Tasks */}
              <div className="absolute -top-2 -right-2 text-yellow-400 animate-ping opacity-75">✨</div>
              <div className="absolute -bottom-1 -left-2 text-yellow-400 animate-pulse opacity-50" style={{ animationDelay: '0.5s' }}>⭐</div>
              <div className="absolute top-1 -right-6 text-yellow-400 animate-bounce opacity-60" style={{ animationDelay: '1s' }}>💫</div>
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-center mb-8 sm:mb-10 max-w-4xl mx-auto leading-relaxed font-medium" 
             style={{ color: theme === 'dark' ? '#B3B5BC' : '#4B5563' }}>
            Discover opportunities to help your community while earning extra income
          </p>
          
          {/* Interactive Animated Stats */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-10">
            <div className="text-center group hover:scale-110 transition-transform duration-300 cursor-pointer">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black mb-1 group-hover:animate-bounce" style={{ color: '#FF5E14' }}>
                500+
              </div>
              <div className="text-sm sm:text-base font-medium flex items-center justify-center gap-1" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                <span className="group-hover:animate-pulse">📋</span>
                Available Tasks
              </div>
            </div>
            <div className="text-center group hover:scale-110 transition-transform duration-300 cursor-pointer">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black mb-1 group-hover:animate-pulse" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                24/7
              </div>
              <div className="text-sm sm:text-base font-medium flex items-center justify-center gap-1" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                <span className="group-hover:animate-spin" style={{ animationDuration: '2s' }}>⏰</span>
                New Postings
              </div>
            </div>
            <div className="text-center group hover:scale-110 transition-transform duration-300 cursor-pointer">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black mb-1 group-hover:animate-bounce" style={{ color: '#FF5E14' }}>
                1000+
              </div>
              <div className="text-sm sm:text-base font-medium flex items-center justify-center gap-1" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                <span className="group-hover:animate-pulse">😊</span>
                Happy Helpers
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
                  placeholder="Search tasks, locations, categories..."
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
                  <span>Search Tasks</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </Button>
            </div>
            
            {/* Results Summary */}
            <div className="text-center">
              <p className="text-sm sm:text-base" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                {getFilteredTasks().length} {getFilteredTasks().length === 1 ? 'task' : 'tasks'} found
                {searchTerm && ` for "${searchTerm}"`}
              </p>
            </div>
            </div>
          </div>
        </div>

        {/* Filter Toggle Section */}
        <div className="py-6" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#FFFFFF' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Available/Requested Toggle Filter */}
            <div className="p-1.5 rounded-full shadow-lg border" style={{ 
              backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF',
              borderColor: theme === 'dark' ? '#333333' : '#E5E7EB'
            }}>
              <div className="flex justify-between gap-1">
                <button
                  onClick={() => handleFilterChange('available')}
                  className="flex-1 relative px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 group transform-gpu active:scale-95 cursor-pointer"
                  style={{
                    backgroundColor: activeFilter === 'available' ? '#FF5E14' : 'transparent',
                    color: activeFilter === 'available' ? '#FFFFFF' : (theme === 'dark' ? '#B3B5BC' : '#6B7280'),
                    boxShadow: activeFilter === 'available' 
                      ? '0 4px 12px rgba(255, 94, 20, 0.3)' 
                      : 'none',
                    border: 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (activeFilter !== 'available') {
                      e.currentTarget.style.color = '#FF5E14';
                      e.currentTarget.style.backgroundColor = theme === 'dark' ? '#2A2A2A' : '#F8F9FA';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeFilter !== 'available') {
                      e.currentTarget.style.color = theme === 'dark' ? '#B3B5BC' : '#6B7280';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <span className="flex items-center justify-center relative z-10">
                    Available Tasks
                  </span>
                </button>
                <button
                  onClick={() => handleFilterChange('requested')}
                  className="flex-1 relative px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 group transform-gpu active:scale-95 cursor-pointer"
                  style={{
                    backgroundColor: activeFilter === 'requested' ? '#FF5E14' : 'transparent',
                    color: activeFilter === 'requested' ? '#FFFFFF' : (theme === 'dark' ? '#B3B5BC' : '#6B7280'),
                    boxShadow: activeFilter === 'requested' 
                      ? '0 4px 12px rgba(255, 94, 20, 0.3)' 
                      : 'none',
                    border: 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (activeFilter !== 'requested') {
                      e.currentTarget.style.color = '#FF5E14';
                      e.currentTarget.style.backgroundColor = theme === 'dark' ? '#2A2A2A' : '#F8F9FA';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeFilter !== 'requested') {
                      e.currentTarget.style.color = theme === 'dark' ? '#B3B5BC' : '#6B7280';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <span className="flex items-center justify-center relative z-10">
                    Requested Tasks
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Available Tasks Section */}
        <div className="mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-green-200 dark:border-green-800 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1E293B' }}>
                    Available Tasks ({getFilteredTasks().filter(task => task.type === 'available').length})
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Ready to be completed by skilled helpers
                  </p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Open for Applications</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFilteredTasks().filter(task => task.type === 'available').map((task) => (
              <div key={task.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-green-200">
                <div className="relative">
                  {task.image && (
                    <Image 
                      src={task.image} 
                      alt={task.title}
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
                  {task.isUrgent && (
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                        Urgent
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1E293B' }}>
                    {task.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3 text-sm">
                    {task.description}
                  </p>
                  
                  {/* Task Details */}
                  <div className="space-y-2 mb-4 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span>💰</span>
                      <span className="text-lg font-bold text-orange-500">{task.price}</span>
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
                  
                  <div className="flex gap-2">
                    <button
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Apply for Task
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
          
          {getFilteredTasks().filter(task => task.type === 'available').length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No available tasks match your filters. Try adjusting your search criteria.
              </p>
            </div>
          )}
        </div>

        {/* Requested Tasks Section */}
        <div className="mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-yellow-200 dark:border-yellow-800 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🔍</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1E293B' }}>
                    Task Requests ({getFilteredTasks().filter(task => task.type === 'requested').length})
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    People looking for help with various tasks
                  </p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2 text-sm text-yellow-600 dark:text-yellow-400">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>Seeking Help</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFilteredTasks().filter(task => task.type === 'requested').map((request) => (
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
                      Offer Service
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
          
          {getFilteredTasks().filter(task => task.type === 'requested').length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No task requests match your filters. Try adjusting your search criteria.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Chat Agent */}
      <ChatAgent pageType="tasks" />

      <Footer />
    </div>
  );
}
