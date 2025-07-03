
import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import TaskCard from '../src/components/TaskCard';
import { Button } from '../src/components/ui/button';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function Tasks() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showFilterDropdown, setShowFilterDropdown] = useState<boolean>(false);
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
    { key: 'all', label: 'All Categories', count: 6 },
    { key: 'cleaning', label: 'Cleaning', count: 1 },
    { key: 'gardening', label: 'Gardening', count: 1 },
    { key: 'repairs', label: 'Repairs', count: 1 },
    { key: 'babysitting', label: 'Babysitting', count: 1 },
    { key: 'other', label: 'Other', count: 2 }
  ];

  const allTasks = [
    {
      title: "Garden Maintenance",
      description: "Looking for someone to help with weekly garden maintenance including weeding, pruning, and lawn care.",
      price: "Rs. 5,000",
      time: "2-3 hours",
      location: "Colombo 03",
      isUrgent: true,
      isPromoted: true,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
      category: "gardening"
    },
    {
      title: "House Cleaning",
      description: "Need help with deep cleaning of 3-bedroom house. All supplies provided.",
      price: "Rs. 8,000",
      time: "4-5 hours",
      location: "Kandy",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      category: "cleaning"
    },
    {
      title: "Babysitting Service",
      description: "Reliable babysitting for 2 kids (ages 5 and 8) for weekend evenings.",
      price: "Rs. 3,000",
      time: "4 hours",
      location: "Galle",
      image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop",
      category: "babysitting"
    },
    {
      title: "Furniture Assembly",
      description: "Need help assembling IKEA furniture including wardrobe and desk.",
      price: "Rs. 4,500",
      time: "3 hours",
      location: "Colombo 07",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      category: "repairs"
    },
    {
      title: "Pet Walking",
      description: "Looking for someone to walk my dog twice a day for a week.",
      price: "Rs. 2,500",
      time: "1 hour/day",
      location: "Mount Lavinia",
      image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400&h=300&fit=crop",
      category: "other"
    },
    {
      title: "Cooking Assistance",
      description: "Need help preparing meals for a family gathering of 20 people.",
      price: "Rs. 6,000",
      time: "5-6 hours",
      location: "Negombo",
      isUrgent: true,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      category: "other"
    }
  ];

  const getFilteredTasks = () => {
    let filtered = allTasks;
    
    // Apply category filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(task => task.category === activeFilter);
    }
    
    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const getCurrentFilterLabel = () => {
    const currentFilter = filterOptions.find(option => option.key === activeFilter);
    return currentFilter ? currentFilter.label : 'All Categories';
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme === 'dark' ? '#0C0F16' : '#F2F3F5' }}>
      <Navigation />
      
      {/* Hero Header Section */}
      <div className="py-12 sm:py-16 lg:py-20 relative overflow-hidden" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 rounded-full animate-pulse" style={{ backgroundColor: '#FF5E14', animationDelay: '0s', animationDuration: '3s' }}></div>
          <div className="absolute top-20 right-20 w-16 h-16 rounded-full animate-pulse" style={{ backgroundColor: '#001554', animationDelay: '1s', animationDuration: '4s' }}></div>
          <div className="absolute bottom-20 left-20 w-12 h-12 rounded-full animate-pulse" style={{ backgroundColor: '#FF5E14', animationDelay: '2s', animationDuration: '3.5s' }}></div>
          <div className="absolute bottom-10 right-10 w-14 h-14 rounded-full animate-pulse" style={{ backgroundColor: '#001554', animationDelay: '3s', animationDuration: '4.5s' }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Badge */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg border-2" 
                 style={{ 
                   backgroundColor: theme === 'dark' ? '#1F1F1F' : '#FFFFFF',
                   borderColor: theme === 'dark' ? 'rgba(255, 94, 20, 0.3)' : 'rgba(255, 94, 20, 0.2)'
                 }}>
              <span className="text-lg sm:text-xl mr-2">🎯</span>
              <span className="text-sm sm:text-base font-bold" style={{ color: '#FF5E14' }}>
                Find Your Perfect Task
              </span>
            </div>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-center mb-4 sm:mb-6 leading-tight tracking-tight">
            <span style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
              Explore{' '}
            </span>
            <span className="relative inline-block">
              <span style={{ color: '#FF5E14', textShadow: '0 2px 8px rgba(255, 94, 20, 0.3)' }}>
                Tasks
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"></div>
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-center mb-8 sm:mb-10 max-w-4xl mx-auto leading-relaxed font-medium" 
             style={{ color: theme === 'dark' ? '#B3B5BC' : '#4B5563' }}>
            Discover opportunities to help your community while earning extra income
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-10">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black mb-1" style={{ color: '#FF5E14' }}>
                500+
              </div>
              <div className="text-sm sm:text-base font-medium" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                Available Tasks
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black mb-1" style={{ color: '#001554' }}>
                24/7
              </div>
              <div className="text-sm sm:text-base font-medium" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                New Postings
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black mb-1" style={{ color: '#FF5E14' }}>
                1000+
              </div>
              <div className="text-sm sm:text-base font-medium" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                Happy Helpers
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="py-6 sm:py-8" style={{ backgroundColor: theme === 'dark' ? '#0C0F16' : '#F2F3F5' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Search Bar Container */}
          <div className="rounded-2xl p-6 sm:p-8 shadow-xl border-2" 
               style={{ 
                 backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF',
                 borderColor: theme === 'dark' ? 'rgba(255, 94, 20, 0.3)' : 'rgba(255, 94, 20, 0.2)',
                 boxShadow: theme === 'dark' 
                   ? '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 94, 20, 0.1)'
                   : '0 20px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 94, 20, 0.05)'
               }}>
          
          {/* Search Bar with Filter */}
          <div className="flex flex-col gap-4 sm:gap-5">
            <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search for tasks, locations, or categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 border-2 rounded-xl focus:outline-none text-base sm:text-lg font-medium shadow-md transition-all duration-300"
                  style={{ 
                    borderColor: theme === 'dark' ? '#4B5563' : '#E2E8F0',
                    backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF',
                    color: theme === 'dark' ? '#FFFFFF' : '#1A1818'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#FF5E14';
                    e.currentTarget.style.transform = 'scale(1.01)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 94, 20, 0.25)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = theme === 'dark' ? '#4B5563' : '#E2E8F0';
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
                  }}
                />
                {/* Search Icon */}
                <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: theme === 'dark' ? '#9CA3AF' : '#6B7280' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              
              {/* Enhanced Filter Dropdown */}
              <div className="relative lg:w-auto">
                <button
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  className="w-full lg:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 border-2 rounded-xl font-semibold shadow-md transition-all duration-300 transform hover:scale-102 text-base sm:text-lg"
                  style={{ 
                    borderColor: theme === 'dark' ? '#4B5563' : '#E2E8F0',
                    backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF',
                    color: theme === 'dark' ? '#D1D5DB' : '#4B5563'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#3B82F6';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = theme === 'dark' ? '#4B5563' : '#E2E8F0';
                    e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
                  </svg>
                  <span className="font-bold">{getCurrentFilterLabel()}</span>
                  <svg className={`w-4 h-4 transition-transform duration-300 ${showFilterDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showFilterDropdown && (
                  <div className="absolute right-0 mt-4 w-72 sm:w-80 border-4 rounded-2xl shadow-2xl z-50" 
                       style={{ 
                         backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF', 
                         borderColor: theme === 'dark' ? '#4B5563' : '#E2E8F0' 
                       }}>
                    <div className="p-4 sm:p-6">
                      {filterOptions.map((option) => (
                        <button
                          key={option.key}
                          onClick={() => handleFilterChange(option.key)}
                          className={`w-full flex items-center justify-between p-4 rounded-xl mb-2 font-bold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 ${
                            activeFilter === option.key 
                              ? 'shadow-lg' 
                              : 'hover:shadow-md'
                          }`}
                          style={{
                            backgroundColor: activeFilter === option.key ? '#FF5E14' : 'transparent',
                            color: activeFilter === option.key ? '#FFFFFF' : (theme === 'dark' ? '#D1D5DB' : '#374151')
                          }}
                        >
                          <span className="font-black">{option.label}</span>
                          <span className="text-sm sm:text-base px-3 py-1.5 rounded-full font-bold" style={{ 
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
            
            {/* Enhanced Search Button */}
            <Button 
              onClick={handleSearch}
              className="w-full text-xl sm:text-2xl font-black px-8 sm:px-12 py-6 sm:py-8 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 border-4"
              style={{ 
                background: 'linear-gradient(135deg, #FF5E14 0%, #FF5D13 50%, #FF4500 100%)',
                borderColor: '#FF5E14',
                color: '#FFFFFF',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                boxShadow: '0 12px 40px rgba(255, 94, 20, 0.4)'
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLButtonElement;
                target.style.transform = 'scale(1.05) translateY(-4px)';
                target.style.boxShadow = '0 20px 60px rgba(255, 94, 20, 0.6)';
                target.style.background = 'linear-gradient(135deg, #FF5D13 0%, #FF4500 50%, #FF3300 100%)';
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLButtonElement;
                target.style.transform = 'scale(1) translateY(0px)';
                target.style.boxShadow = '0 12px 40px rgba(255, 94, 20, 0.4)';
                target.style.background = 'linear-gradient(135deg, #FF5E14 0%, #FF5D13 50%, #FF4500 100%)';
              }}
            >
              <div className="flex items-center justify-center gap-3 sm:gap-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>SEARCH TASKS</span>
                <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </Button>
          </div>
          
          {/* Results Summary */}
          <div className="text-center">
            <p className="text-sm sm:text-base" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
              {getFilteredTasks().length} {getFilteredTasks().length === 1 ? 'task' : 'tasks'} found
              {searchTerm && ` for "${searchTerm}"`}
              {activeFilter !== 'all' && ` in ${getCurrentFilterLabel()}`}
            </p>
          </div>
          </div>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {getFilteredTasks().map((task, index) => (
            <TaskCard
              key={index}
              title={task.title}
              description={task.description}
              price={task.price}
              time={task.time}
              location={task.location}
              isUrgent={task.isUrgent}
              isPromoted={task.isPromoted}
              image={task.image}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
