
import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import ToolCard from '../src/components/ToolCard';
import { Button } from '../src/components/ui/button';
import { useState } from 'react';

export default function Tools() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showFilterDropdown, setShowFilterDropdown] = useState<boolean>(false);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setShowFilterDropdown(false);
  };

  const handleSearch = () => {
    // Search functionality can be implemented here
    console.log('Searching for:', searchTerm);
  };

  const filterOptions = [
    { key: 'all', label: 'All Tools', count: 6 },
    { key: 'power', label: 'Power Tools', count: 3 },
    { key: 'garden', label: 'Garden Tools', count: 1 },
    { key: 'hand', label: 'Hand Tools', count: 1 },
    { key: 'equipment', label: 'Equipment', count: 1 }
  ];

  const allTools = [
    {
      title: "Power Drill Set",
      description: "Professional Bosch power drill with multiple bits. Perfect for home improvement projects.",
      price: "Rs. 1,500/day",
      brand: "Bosch",
      condition: "Excellent",
      available: true,
      isPromoted: true,
      image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=300&fit=crop",
      category: "power"
    },
    {
      title: "Lawn Mower",
      description: "Electric lawn mower in great condition. Ideal for medium to large gardens.",
      price: "Rs. 2,000/day",
      brand: "Honda",
      condition: "Good",
      available: true,
      image: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=400&h=300&fit=crop",
      category: "garden"
    },
    {
      title: "Angle Grinder",
      description: "Heavy-duty angle grinder for metal cutting and grinding projects.",
      price: "Rs. 1,200/day",
      brand: "Makita",
      condition: "Excellent",
      available: false,
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
      category: "power"
    },
    {
      title: "Circular Saw",
      description: "Professional circular saw for woodworking and construction projects.",
      price: "Rs. 1,800/day",
      brand: "DeWalt",
      condition: "Good",
      available: true,
      image: "https://images.unsplash.com/photo-1609010697446-11f2155278f0?w=400&h=300&fit=crop",
      category: "power"
    },
    {
      title: "Pressure Washer",
      description: "High-pressure washer for cleaning driveways, decks, and exterior surfaces.",
      price: "Rs. 2,500/day",
      brand: "Karcher",
      condition: "Excellent",
      available: true,
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=300&fit=crop",
      category: "equipment"
    },
    {
      title: "Tile Cutter",
      description: "Professional tile cutting machine for bathroom and kitchen renovations.",
      price: "Rs. 1,000/day",
      brand: "Rubi",
      condition: "Good",
      available: false,
      image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop",
      category: "hand"
    }
  ];

  const getFilteredTools = () => {
    let filtered = allTools;
    
    // Apply category filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(tool => tool.category === activeFilter);
    }
    
    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(tool => 
        tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const getCurrentFilterLabel = () => {
    const currentFilter = filterOptions.find(option => option.key === activeFilter);
    return currentFilter ? currentFilter.label : 'All Tools';
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme === 'dark' ? '#0C0F16' : '#F2F3F5' }}>
      <Navigation />
      
      {/* Search Section */}
      <div className="py-10 sm:py-12 lg:py-16" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-center mb-6 sm:mb-8" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>Rent Tools</h1>
          
          {/* Search Bar with Filter */}
          <div className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search for tools..."
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
                  <span className="sm:hidden text-sm">Filter</span>
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
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
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
              {getFilteredTools().length} {getFilteredTools().length === 1 ? 'tool' : 'tools'} found
              {searchTerm && ` for "${searchTerm}"`}
              {activeFilter !== 'all' && ` in ${getCurrentFilterLabel()}`}
            </p>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {getFilteredTools().map((tool, index) => (
            <ToolCard
              key={index}
              title={tool.title}
              description={tool.description}
              price={tool.price}
              brand={tool.brand}
              condition={tool.condition}
              available={tool.available}
              isPromoted={tool.isPromoted}
              image={tool.image}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
