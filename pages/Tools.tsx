import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import ToolCard from '../src/components/ToolCard';
import { Button } from '../src/components/ui/button';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { collection, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '../src/lib/firebase';

interface Tool {
  id: string;
  title: string;
  description: string;
  price: string;
  brand: string;
  condition: string;
  available: boolean;
  isPromoted?: boolean;
  image: string;
  category: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  status?: string;
}

export default function Tools() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showFilterDropdown, setShowFilterDropdown] = useState<boolean>(false);
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    loadTools();
  }, []);

  const loadTools = async () => {
    try {
      setLoading(true);
      const toolsCollection = collection(db, 'tools');
      // First, get all tools ordered by createdAt, then filter active ones in client
      const toolsQuery = query(toolsCollection, orderBy('createdAt', 'desc'));
      const toolsSnapshot = await getDocs(toolsQuery);
      
      const loadedTools: Tool[] = [];
      toolsSnapshot.forEach((doc) => {
        const toolData = doc.data() as Tool;
        // Only add active tools (or tools without status field for backwards compatibility)
        if (!toolData.status || toolData.status === 'active') {
          loadedTools.push({
            ...toolData,
            id: doc.id
          });
        }
      });
      
      setTools(loadedTools);
    } catch (error) {
      console.error('Error loading tools:', error);
    } finally {
      setLoading(false);
    }
  };

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
    { key: 'all', label: 'All Tools', count: tools.length },
    { key: 'power', label: 'Power Tools', count: tools.filter(t => t.category === 'power').length },
    { key: 'garden', label: 'Garden Tools', count: tools.filter(t => t.category === 'garden').length },
    { key: 'hand', label: 'Hand Tools', count: tools.filter(t => t.category === 'hand').length },
    { key: 'equipment', label: 'Equipment', count: tools.filter(t => t.category === 'equipment').length }
  ];

  const getFilteredTools = () => {
    let filtered = tools;
    
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
    <div className="min-h-screen" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F2F3F5' }}>
      <Navigation />
      
      {/* Hero Header Section */}
      <div className="py-12 sm:py-16 lg:py-20 relative overflow-hidden" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F2F3F5' }}>
        {/* Enhanced Background Elements with Interactive Tool Animations */}
        <div className="absolute inset-0 opacity-10">
          {/* Floating Tool Icons */}
          <div className="absolute top-10 left-10 w-20 h-20 rounded-full animate-bounce flex items-center justify-center text-3xl" style={{ backgroundColor: '#FF5E14', animationDelay: '0s', animationDuration: '3s' }}>
            🔨
          </div>
          <div className="absolute top-20 right-20 w-16 h-16 rounded-full animate-pulse flex items-center justify-center text-2xl" style={{ backgroundColor: '#1a1a1a', animationDelay: '1s', animationDuration: '4s' }}>
            🪚
          </div>
          <div className="absolute bottom-20 left-20 w-12 h-12 rounded-full animate-spin flex items-center justify-center text-xl" style={{ backgroundColor: '#FF5E14', animationDelay: '2s', animationDuration: '8s' }}>
            🔧
          </div>
          <div className="absolute bottom-10 right-10 w-14 h-14 rounded-full animate-bounce flex items-center justify-center text-xl" style={{ backgroundColor: '#1a1a1a', animationDelay: '3s', animationDuration: '4.5s' }}>
            ⚡
          </div>
          
          {/* Animated Toolbox */}
          <div className="absolute top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-28 h-20 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg shadow-lg animate-float opacity-20 flex flex-col items-center justify-center text-white border-2 border-orange-400">
              <span className="text-xs font-bold">TOOLBOX</span>
              <div className="flex gap-1 mt-1">
                <span className="text-xs">🔨</span>
                <span className="text-xs">🔧</span>
                <span className="text-xs">⚙️</span>
              </div>
            </div>
          </div>
          <div className="absolute bottom-1/3 right-1/4 transform translate-x-1/2 translate-y-1/2">
            <div className="w-24 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg shadow-lg animate-float-reverse opacity-20 flex items-center justify-center text-white font-bold text-xs" style={{ animationDelay: '2s' }}>
              POWER
            </div>
          </div>
          
          {/* Animated Tool Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-6 gap-6 h-full w-full">
              {Array.from({ length: 24 }).map((_, i) => (
                <div 
                  key={i}
                  className="border-2 border-gray-400 rounded-lg animate-pulse flex items-center justify-center text-2xl"
                  style={{ 
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: '4s'
                  }}
                >
                  {['🔨', '🔧', '⚙️', '🪚', '⚡', '🔩'][i % 6]}
                </div>
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
              <span className="text-lg sm:text-xl mr-2 animate-spin" style={{ animationDuration: '3s' }}>🔧</span>
              <span className="text-sm sm:text-base font-bold" style={{ color: '#FF5E14' }}>
                Rent Quality Tools
              </span>
              <span className="ml-2 animate-bounce text-lg">🛠️</span>
            </div>
          </div>
          
          {/* Enhanced Interactive Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-center mb-4 sm:mb-6 leading-tight tracking-tight">
            <span className="inline-block hover:scale-110 transition-transform duration-300" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
              Explore{' '}
            </span>
            <span className="relative inline-block group">
              <span className="relative z-10 hover:scale-110 transition-transform duration-300 inline-block" style={{ color: '#FF5E14', textShadow: '0 2px 8px rgba(255, 94, 20, 0.3)' }}>
                Tools
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full group-hover:h-2 transition-all duration-300"></div>
              {/* Animated tool icons around Tools */}
              <div className="absolute -top-2 -right-2 text-gray-400 animate-ping opacity-75">🔨</div>
              <div className="absolute -bottom-1 -left-2 text-gray-400 animate-pulse opacity-50" style={{ animationDelay: '0.5s' }}>⚙️</div>
              <div className="absolute top-1 -right-6 text-gray-400 animate-bounce opacity-60" style={{ animationDelay: '1s' }}>🔧</div>
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-center mb-8 sm:mb-10 max-w-4xl mx-auto leading-relaxed font-medium" 
             style={{ color: theme === 'dark' ? '#B3B5BC' : '#4B5563' }}>
            Rent professional tools for your projects at affordable prices
          </p>
          
          {/* Interactive Animated Stats */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-10">
            <div className="text-center group hover:scale-110 transition-transform duration-300 cursor-pointer">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black mb-1 group-hover:animate-bounce" style={{ color: '#FF5E14' }}>
                200+
              </div>
              <div className="text-sm sm:text-base font-medium flex items-center justify-center gap-1" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                <span className="group-hover:animate-spin" style={{ animationDuration: '2s' }}>🔧</span>
                Available Tools
              </div>
            </div>
            <div className="text-center group hover:scale-110 transition-transform duration-300 cursor-pointer">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black mb-1 group-hover:animate-pulse" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                24/7
              </div>
              <div className="text-sm sm:text-base font-medium flex items-center justify-center gap-1" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                <span className="group-hover:animate-bounce">📦</span>
                Pick-up Available
              </div>
            </div>
            <div className="text-center group hover:scale-110 transition-transform duration-300 cursor-pointer">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black mb-1 group-hover:animate-bounce" style={{ color: '#FF5E14' }}>
                500+
              </div>
              <div className="text-sm sm:text-base font-medium flex items-center justify-center gap-1" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                <span className="group-hover:animate-pulse">⭐</span>
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
                  placeholder="Search tools, brands, categories..."
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
          <div className="text-center mt-4">
            <p className="text-sm font-medium" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
              {getFilteredTools().length} {getFilteredTools().length === 1 ? 'tool' : 'tools'} found
            </p>
          </div>
          
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="py-8 sm:py-12 lg:py-16" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F2F3F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {loading ? (
              <div className="col-span-full text-center py-8">
                <p className="text-lg sm:text-xl font-medium" style={{ color: theme === 'dark' ? '#B3B5BC' : '#4B5563' }}>
                  Loading tools...
                </p>
              </div>
            ) : (
              getFilteredTools().map((tool) => (
                <ToolCard
                  key={tool.id}
                  id={tool.id}
                  title={tool.title}
                  description={tool.description}
                  price={tool.price}
                  brand={tool.brand}
                  condition={tool.condition}
                  available={tool.available}
                  isPromoted={tool.isPromoted}
                  image={tool.image}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
