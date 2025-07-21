import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import ToolsTasksChatAgent from '../src/components/ToolsTasksChatAgent';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { db } from '../src/lib/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

interface Task {
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

export default function Tasks() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'urgent'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const tasksQuery = query(
        collection(db, 'listings'),
        where('type', '==', 'task'),
        where('status', '==', 'active'),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(tasksQuery);
      const tasksList: Task[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        tasksList.push({
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
      
      setTasks(tasksList);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  const handleFilterChange = (filter: 'all' | 'urgent') => {
    setActiveFilter(filter);
  };

  const handleCategoryChange = (category: string) => {
    setCategoryFilter(category);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || task.category === categoryFilter;
    const matchesFilter = activeFilter === 'all' || (activeFilter === 'urgent' && task.urgency && task.urgency.includes('24 Hours'));
    
    return matchesSearch && matchesCategory && matchesFilter;
  });

  const categories = [
    'Home Improvement',
    'Cleaning Services',
    'Gardening & Landscaping',
    'Moving & Delivery',
    'Handyman Services',
    'Tutoring & Education',
    'Pet Care',
    'Event Services',
    'Technology Support',
    'Creative Services',
    'Business Services',
    'Other'
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F2F3F5' }}>
      <Navigation />
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="rounded-3xl shadow-xl p-8 mb-8" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
          <h1 className="text-4xl font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
            📋 Tasks & Services
          </h1>
          <p className="text-lg mb-6" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
            Find work opportunities and offer your services
          </p>
          
          {/* Search Bar */}
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              placeholder="Search tasks..."
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
                      All Tasks
                    </button>
                    <button
                      onClick={() => handleFilterChange('urgent')}
                      className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                        activeFilter === 'urgent'
                          ? 'bg-blue-500 text-white border-blue-500'
                          : theme === 'dark'
                          ? 'border-gray-600 text-gray-300 hover:border-blue-400'
                          : 'border-gray-300 text-gray-700 hover:border-blue-400'
                      }`}
                    >
                      Urgent
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
            {filteredTasks.length} {filteredTasks.length === 1 ? 'Task' : 'Tasks'} Available
          </h2>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-lg" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>Loading tasks...</p>
          </div>
        )}

        {/* Tasks Grid */}
        {!loading && (
          <>
            {filteredTasks.length === 0 ? (
              <div className="text-center py-16">
                <div className="rounded-3xl shadow-xl p-12" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
                  <div className="text-6xl mb-6">📋</div>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                    No tasks found
                  </h3>
                  <p className="text-lg mb-8" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                    {searchTerm || categoryFilter !== 'all' 
                      ? 'Try adjusting your search or filters' 
                      : 'Be the first to post a task!'
                    }
                  </p>
                  <Link 
                    href="/CreateTask"
                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-xl transition-colors"
                  >
                    Post a Task
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTasks.map((task) => (
                  <Link href={`/tasks/${task.id}`} key={task.id}>
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden transition-all hover:shadow-2xl hover:scale-105 cursor-pointer"
                         style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
                      
                      {/* Task Header */}
                      <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                        <span className="text-4xl">📋</span>
                      </div>
                      
                      <div className="p-6">
                        {/* Category and Urgency */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                            {task.category}
                          </span>
                          {task.urgency && task.urgency.includes('24 Hours') && (
                            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                              Urgent
                            </span>
                          )}
                          {(!task.urgency || !task.urgency.includes('24 Hours')) && (
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                              Open
                            </span>
                          )}
                        </div>
                        
                        {/* Title */}
                        <h3 className="font-bold text-xl mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                          {task.title}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-sm mb-4 line-clamp-2" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                          {task.description}
                        </p>
                        
                        {/* Location and Duration */}
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                            <span className="mr-2">📍</span>
                            <span className="text-sm">{task.location || 'Location not specified'}</span>
                          </div>
                          {task.duration && (
                            <div className="flex items-center" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                              <span className="mr-2">⏱️</span>
                              <span className="text-sm">{task.duration}</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Footer */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                            <span className="text-sm mr-4">👁️ {task.views}</span>
                            <span className="text-sm">❤️ {task.saves}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg text-green-600">
                              LKR {task.price.toLocaleString()}
                            </div>
                            <div className="text-xs" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                              budget
                            </div>
                          </div>
                        </div>
                        
                        {/* Posted by */}
                        <div className="mt-4 pt-4 border-t" style={{ borderColor: theme === 'dark' ? '#444444' : '#E2E8F0' }}>
                          <div className="flex items-center justify-between">
                            <span className="text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                              By {task.createdByName}
                            </span>
                            <span className="text-xs" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                              {task.createdAt?.toLocaleDateString() || 'Recently'}
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

      <ToolsTasksChatAgent pageType="tasks" />
      <Footer />
    </div>
  );
}
