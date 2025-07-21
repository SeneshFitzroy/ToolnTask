import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import ToolsTasksChatAgent from '../src/components/ToolsTasksChatAgent';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { db } from '../src/lib/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

interface Tool {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  category: string;
  status: string;
  createdAt: Date | null;
  createdByName: string;
  urgency?: string;
  duration?: string;
  contactInfo?: string;
  skills?: string;
  requirements?: string;
  deliverables?: string;
  views: number;
  saves: number;
}

export default function Tools() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'featured'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      const toolsQuery = query(
        collection(db, 'listings'),
        where('type', '==', 'tool'),
        where('status', '==', 'active'),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(toolsQuery);
      const toolsList: Tool[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        toolsList.push({
          id: doc.id,
          title: data.title,
          description: data.description,
          price: data.price,
          location: data.location,
          category: data.category,
          status: data.status,
          createdAt: data.createdAt?.toDate() || null,
          createdByName: data.createdByName,
          urgency: data.urgency,
          duration: data.duration,
          contactInfo: data.contactInfo,
          skills: data.skills,
          requirements: data.requirements,
          deliverables: data.deliverables,
          views: data.views || 0,
          saves: data.saves || 0
        });
      });
      
      setTools(toolsList);
    } catch (error) {
      console.error('Error fetching tools:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  const handleFilterChange = (filter: 'all' | 'featured') => {
    setActiveFilter(filter);
  };

  const handleCategoryChange = (category: string) => {
    setCategoryFilter(category);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || tool.category === categoryFilter;
    const matchesFilter = activeFilter === 'all' || (activeFilter === 'featured' && tool.saves > 0);
    
    return matchesSearch && matchesCategory && matchesFilter;
  });

  const categories = [
    'Construction Tools',
    'Garden & Outdoor',
    'Automotive',
    'Power Tools',
    'Hand Tools',
    'Kitchen Appliances',
    'Electronics',
    'Sports Equipment',
    'Musical Instruments',
    'Photography',
    'Cleaning Equipment',
    'Other'
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F2F3F5' }}>
      <Navigation />
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="rounded-3xl shadow-xl p-8 mb-8" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
          <h1 className="text-4xl font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
            🔧 Tools & Equipment
          </h1>
          <p className="text-lg mb-6" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
            Rent or lend tools and equipment in your area
          </p>
          
          {/* Search Bar */}
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              placeholder="Search tools..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="flex-1 px-6 py-3 border-2 rounded-xl"
              style={{
                borderColor: theme === 'dark' ? '#444444' : '#E2E8F0',
                backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
              }}
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
            >
              Filters
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="border-t pt-6" style={{ borderColor: theme === 'dark' ? '#444444' : '#E2E8F0' }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                    Type
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleFilterChange('all')}
                      className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                        activeFilter === 'all'
                          ? 'bg-blue-500 text-white border-blue-500'
                          : theme === 'dark'
                          ? 'border-gray-600 text-gray-300 hover:border-blue-400'
                          : 'border-gray-300 text-gray-700 hover:border-blue-400'
                      }`}
                    >
                      All Tools
                    </button>
                    <button
                      onClick={() => handleFilterChange('featured')}
                      className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                        activeFilter === 'featured'
                          ? 'bg-blue-500 text-white border-blue-500'
                          : theme === 'dark'
                          ? 'border-gray-600 text-gray-300 hover:border-blue-400'
                          : 'border-gray-300 text-gray-700 hover:border-blue-400'
                      }`}
                    >
                      Popular
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                    Category
                  </label>
                  <select
                    value={categoryFilter}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full px-4 py-2 border-2 rounded-lg"
                    style={{
                      borderColor: theme === 'dark' ? '#444444' : '#E2E8F0',
                      backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                      color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                    }}
                  >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
            {filteredTools.length} {filteredTools.length === 1 ? 'Tool' : 'Tools'} Available
          </h2>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-lg" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>Loading tools...</p>
          </div>
        )}

        {/* Tools Grid */}
        {!loading && (
          <>
            {filteredTools.length === 0 ? (
              <div className="text-center py-16">
                <div className="rounded-3xl shadow-xl p-12" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
                  <div className="text-6xl mb-6">🔧</div>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                    No tools found
                  </h3>
                  <p className="text-lg mb-8" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                    {searchTerm || categoryFilter !== 'all' 
                      ? 'Try adjusting your search or filters' 
                      : 'Be the first to list a tool for rent or sharing!'
                    }
                  </p>
                  <Link 
                    href="/CreateTool"
                    className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl transition-colors"
                  >
                    List a Tool
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map((tool) => (
                  <Link href={`/tools/${tool.id}`} key={tool.id}>
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden transition-all hover:shadow-2xl hover:scale-105 cursor-pointer"
                         style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
                      
                      {/* Tool Image Placeholder */}
                      <div className="h-48 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                        <span className="text-4xl">🔧</span>
                      </div>
                      
                      <div className="p-6">
                        {/* Category and Status */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
                            {tool.category}
                          </span>
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                            Available
                          </span>
                        </div>
                        
                        {/* Title */}
                        <h3 className="font-bold text-xl mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                          {tool.title}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-sm mb-4 line-clamp-2" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                          {tool.description}
                        </p>
                        
                        {/* Location */}
                        <div className="flex items-center mb-4" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                          <span className="mr-2">📍</span>
                          <span className="text-sm">{tool.location || 'Location not specified'}</span>
                        </div>
                        
                        {/* Footer */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                            <span className="text-sm mr-4">👁️ {tool.views}</span>
                            <span className="text-sm">❤️ {tool.saves}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg text-green-600">
                              LKR {tool.price.toLocaleString()}
                            </div>
                            <div className="text-xs" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                              per day
                            </div>
                          </div>
                        </div>
                        
                        {/* Posted by */}
                        <div className="mt-4 pt-4 border-t" style={{ borderColor: theme === 'dark' ? '#444444' : '#E2E8F0' }}>
                          <div className="flex items-center justify-between">
                            <span className="text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                              By {tool.createdByName}
                            </span>
                            <span className="text-xs" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                              {tool.createdAt?.toLocaleDateString() || 'Recently'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <ToolsTasksChatAgent pageType="tools" />
      <Footer />
    </div>
  );
}
