
import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import ToolCard from '../src/components/ToolCard';
import { Button } from '../src/components/ui/button';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function Tools() {
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
              <span className="text-lg sm:text-xl mr-2">🔧</span>
              <span className="text-sm sm:text-base font-bold" style={{ color: '#FF5E14' }}>
                Rent Quality Tools
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
                Tools
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"></div>
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-center mb-8 sm:mb-10 max-w-4xl mx-auto leading-relaxed font-medium" 
             style={{ color: theme === 'dark' ? '#B3B5BC' : '#4B5563' }}>
            Rent professional tools for your projects at affordable prices
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-10">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black mb-1" style={{ color: '#FF5E14' }}>
                200+
              </div>
              <div className="text-sm sm:text-base font-medium" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                Available Tools
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black mb-1" style={{ color: '#001554' }}>
                24/7
              </div>
              <div className="text-sm sm:text-base font-medium" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                Pick-up Available
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black mb-1" style={{ color: '#FF5E14' }}>
                500+
              </div>
              <div className="text-sm sm:text-base font-medium" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                Happy Renters
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="py-4 sm:py-6" style={{ backgroundColor: theme === 'dark' ? '#0C0F16' : '#F2F3F5' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Compact Search Bar Container */}
          <div className="rounded-xl p-4 sm:p-5 shadow-lg border" 
               style={{ 
                 backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF',
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
                  placeholder="Search tools, brands, categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none text-sm sm:text-base font-medium shadow-sm transition-all duration-300"
                  style={{ 
                    borderColor: theme === 'dark' ? '#4B5563' : '#E2E8F0',
                    backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF',
                    color: theme === 'dark' ? '#FFFFFF' : '#1A1818'
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
          <div className="text-center mt-4">
            <p className="text-sm font-medium" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
              {getFilteredTools().length} {getFilteredTools().length === 1 ? 'tool' : 'tools'} found
            </p>
          </div>
          
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="py-8 sm:py-12 lg:py-16" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
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
      </div>

      <Footer />
    </div>
  );
}
