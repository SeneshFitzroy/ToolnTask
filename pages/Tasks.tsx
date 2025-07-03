
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
      
      {/* Search Section */}
      <div className="py-10 sm:py-12 lg:py-16" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-center mb-6 sm:mb-8" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>Find Tasks</h1>
          
          {/* Search Bar with Filter */}
          <div className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search for tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 border-2 rounded-lg sm:rounded-xl focus:outline-none text-base sm:text-lg shadow-sm transition-colors"
                  style={{ 
                    borderColor: theme === 'dark' ? '#4B5563' : '#E2E8F0',
                    backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF',
                    color: theme === 'dark' ? '#FFFFFF' : '#1A1818'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#FF5E14'}
                  onBlur={(e) => e.currentTarget.style.borderColor = theme === 'dark' ? '#4B5563' : '#E2E8F0'}
                />
              </div>
              
              {/* Filter Dropdown */}
              <div className="relative sm:w-auto">
                <button
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 border-2 rounded-lg sm:rounded-xl font-medium shadow-sm transition-colors"
                  style={{ 
                    borderColor: theme === 'dark' ? '#4B5563' : '#E2E8F0',
                    backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF',
                    color: theme === 'dark' ? '#D1D5DB' : '#4B5563'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = '#3B82F6'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = theme === 'dark' ? '#4B5563' : '#E2E8F0'}
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
                  </svg>
                  <span className="hidden sm:inline text-sm sm:text-base">{getCurrentFilterLabel()}</span>
                  <span className="sm:hidden text-sm">Category</span>
                  <svg className={`w-4 h-4 ml-1 transition-transform ${showFilterDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showFilterDropdown && (
                  <div className="absolute right-0 mt-2 w-48 sm:w-64 border rounded-lg sm:rounded-xl shadow-lg z-50" style={{ backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF', borderColor: theme === 'dark' ? '#4B5563' : '#E2E8F0' }}>
                    <div className="p-2">
                      {filterOptions.map((option) => (
                        <button
                          key={option.key}
                          onClick={() => handleFilterChange(option.key)}
                          className={`w-full flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-left transition-colors text-sm sm:text-base ${
                            activeFilter === option.key
                              ? 'text-white'
                              : 'hover:opacity-80'
                          }`}
                          style={{
                            backgroundColor: activeFilter === option.key ? '#FF5E14' : 'transparent',
                            color: activeFilter === option.key ? '#FFFFFF' : (theme === 'dark' ? '#D1D5DB' : '#374151')
                          }}
                        >
                          <span className="font-medium">{option.label}</span>
                          <span className="text-xs px-2 py-1 rounded-full" style={{ 
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
                className="flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 bg-white dark:bg-gray-800 border-2 border-slate-200 dark:border-gray-600 rounded-xl hover:border-orange-300 dark:hover:border-orange-500 text-slate-700 dark:text-gray-300 font-medium shadow-sm transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
                </svg>
                <span className="hidden sm:inline">{getCurrentFilterLabel()}</span>
                <span className="sm:hidden">Filter</span>
                <svg className={`w-4 h-4 transition-transform ${showFilterDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showFilterDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50">
                  <div className="p-2">
                    {filterOptions.map((option) => (
                      <button
                        key={option.key}
                        onClick={() => handleFilterChange(option.key)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${
                          activeFilter === option.key
                            ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300'
                            : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <span className="font-medium">{option.label}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                          {option.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <Button 
              onClick={handleSearch}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl font-semibold shadow-lg"
            >
              Search
            </Button>
          </div>
          
          {/* Results Summary */}
          <div className="text-center">
            <p className="text-slate-600 dark:text-gray-400">
              {getFilteredTasks().length} {getFilteredTasks().length === 1 ? 'task' : 'tasks'} found
              {searchTerm && ` for "${searchTerm}"`}
              {activeFilter !== 'all' && ` in ${getCurrentFilterLabel()}`}
            </p>
          </div>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
