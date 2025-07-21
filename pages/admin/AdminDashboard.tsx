import Navigation from '../../src/components/Navigation';
import Footer from '../../src/components/Footer';
import { Button } from '../../src/components/ui/button';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../../src/lib/firebase';
import { useLanguage } from '../../src/contexts/LanguageContext';
import { 
  Users, 
  ClipboardList, 
  Wrench, 
  TrendingUp, 
  Eye, 
  ToggleLeft, 
  ToggleRight, 
  Star,
  Calendar,
  MapPin,
  DollarSign,
  Search,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';
import { getAllListings, getAllUsers, getSystemStats } from '../../src/lib/listingService';

interface AdminStats {
  totalUsers: number;
  totalTasks: number;
  totalTools: number;
  totalListings: number;
  activeUsers: number;
  activeTasks: number;
  activeTools: number;
}

interface AdminUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  displayName: string;
  isActive: boolean;
  role: string;
  createdAt: any;
  totalListings?: number;
}

interface AdminListing {
  id: string;
  title: string;
  description: string;
  type: 'task' | 'tool';
  category: string;
  price: string;
  location: string;
  status: 'active' | 'inactive' | 'completed';
  userId: string;
  userDisplayName: string;
  createdAt: any;
  views?: number;
  saved?: number;
  featured?: boolean;
}

export default function AdminDashboard() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalTasks: 0,
    totalTools: 0,
    totalListings: 0,
    activeUsers: 0,
    activeTasks: 0,
    activeTools: 0
  });
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [listings, setListings] = useState<AdminListing[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'task' | 'tool'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'completed'>('all');
  const router = useRouter();

  // Admin credentials - in production, this should be managed more securely
  const ADMIN_EMAIL = 'admin@toolntask.com';
  const ADMIN_PASSWORD = 'AdminToolnTask2025!';

  useEffect(() => {
    setMounted(true);
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        
        // Check if user is admin
        if (user.email === ADMIN_EMAIL) {
          setIsAdmin(true);
          await loadDashboardData();
        } else {
          setIsAdmin(false);
          router.push('/');
        }
      } else {
        router.push('/SignIn');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const loadDashboardData = async () => {
    try {
      const [systemStats, allUsers, allListings] = await Promise.all([
        getSystemStats(),
        getAllUsers(),
        getAllListings()
      ]);

      setStats(systemStats);
      setUsers(allUsers);
      setListings(allListings);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  const toggleUserStatus = async (userId: string, currentStatus: boolean) => {
    console.log(`Toggle user ${userId} status from ${currentStatus} to ${!currentStatus}`);
  };

  const toggleListingStatus = async (listingId: string, type: 'task' | 'tool', currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    console.log(`Toggle listing ${listingId} status from ${currentStatus} to ${newStatus}`);
  };

  const toggleListingFeatured = async (listingId: string, type: 'task' | 'tool', currentFeatured: boolean) => {
    console.log(`Toggle listing ${listingId} featured from ${currentFeatured} to ${!currentFeatured}`);
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredListings = listings.filter(listing => {
    const matchesSearch = !searchTerm || 
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.userDisplayName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || listing.type === filterType;
    const matchesStatus = filterStatus === 'all' || listing.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = !searchTerm || 
      user.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  if (!mounted) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F2F3F5' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2" style={{ borderColor: '#FF5E14' }}></div>
          <p className="mt-4 text-lg" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F2F3F5' }}>
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
            Access Denied
          </h1>
          <p className="mb-6" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
            You do not have permission to access the admin dashboard.
          </p>
          <Button
            onClick={() => router.push('/')}
            className="px-6 py-3 text-white font-semibold rounded-lg"
            style={{ backgroundColor: '#FF5E14' }}
          >
            Go to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F2F3F5' }}>
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Admin Header */}
          <div className="rounded-3xl shadow-xl p-8 mb-8" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                  {t('adminDashboard')}
                </h1>
                <p className="text-lg" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                  Welcome back, Administrator
                </p>
                <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: theme === 'dark' ? '#2a2a2a' : '#f3f4f6' }}>
                  <h3 className="font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                    Admin Credentials:
                  </h3>
                  <div className="space-y-1 text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                    <div><strong>Email:</strong> {ADMIN_EMAIL}</div>
                    <div><strong>Password:</strong> {ADMIN_PASSWORD}</div>
                  </div>
                </div>
              </div>
              <div className="text-6xl">🛠️</div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="rounded-2xl shadow-lg p-6 text-center" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
              <Users className="h-12 w-12 mx-auto mb-4" style={{ color: '#FF5E14' }} />
              <div className="text-3xl font-bold mb-2" style={{ color: '#FF5E14' }}>{stats.totalUsers}</div>
              <div className="text-lg" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>{t('totalUsers')}</div>
              <div className="text-sm mt-2" style={{ color: theme === 'dark' ? '#888' : '#9CA3AF' }}>
                {stats.activeUsers} active
              </div>
            </div>
            
            <div className="rounded-2xl shadow-lg p-6 text-center" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
              <ClipboardList className="h-12 w-12 mx-auto mb-4" style={{ color: '#28a745' }} />
              <div className="text-3xl font-bold mb-2" style={{ color: '#28a745' }}>{stats.totalTasks}</div>
              <div className="text-lg" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>{t('totalTasks')}</div>
              <div className="text-sm mt-2" style={{ color: theme === 'dark' ? '#888' : '#9CA3AF' }}>
                {stats.activeTasks} active
              </div>
            </div>
            
            <div className="rounded-2xl shadow-lg p-6 text-center" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
              <Wrench className="h-12 w-12 mx-auto mb-4" style={{ color: '#007bff' }} />
              <div className="text-3xl font-bold mb-2" style={{ color: '#007bff' }}>{stats.totalTools}</div>
              <div className="text-lg" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>{t('totalTools')}</div>
              <div className="text-sm mt-2" style={{ color: theme === 'dark' ? '#888' : '#9CA3AF' }}>
                {stats.activeTools} active
              </div>
            </div>
            
            <div className="rounded-2xl shadow-lg p-6 text-center" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
              <TrendingUp className="h-12 w-12 mx-auto mb-4" style={{ color: '#ffc107' }} />
              <div className="text-3xl font-bold mb-2" style={{ color: '#ffc107' }}>{stats.totalListings}</div>
              <div className="text-lg" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>Total Listings</div>
              <div className="text-sm mt-2" style={{ color: theme === 'dark' ? '#888' : '#9CA3AF' }}>
                {stats.activeTasks + stats.activeTools} active
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="rounded-2xl shadow-lg mb-8" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
            <div className="flex overflow-x-auto border-b" style={{ borderColor: theme === 'dark' ? '#2a2a2a' : '#e5e7eb' }}>
              {['overview', 'users', 'listings', 'analytics'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-semibold transition-colors duration-200 border-b-2 ${
                    activeTab === tab 
                      ? 'border-orange-500 text-orange-500' 
                      : 'border-transparent'
                  }`}
                  style={{ 
                    color: activeTab === tab ? '#FF5E14' : (theme === 'dark' ? '#CCCCCC' : '#6B7280'),
                    borderBottomColor: activeTab === tab ? '#FF5E14' : 'transparent'
                  }}
                >
                  <div className="flex items-center gap-2">
                    {tab === 'overview' && <TrendingUp className="h-5 w-5" />}
                    {tab === 'users' && <Users className="h-5 w-5" />}
                    {tab === 'listings' && <ClipboardList className="h-5 w-5" />}
                    {tab === 'analytics' && <BarChart3 className="h-5 w-5" />}
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </div>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                    System Overview
                  </h2>
                  
                  {/* Quick Actions */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="rounded-xl p-6 border-2 border-dashed" style={{ borderColor: theme === 'dark' ? '#444444' : '#d1d5db' }}>
                      <h3 className="text-lg font-semibold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                        Quick Actions
                      </h3>
                      <div className="space-y-3">
                        <Button
                          onClick={() => setActiveTab('users')}
                          className="w-full text-left px-4 py-2 rounded-lg"
                          style={{ 
                            backgroundColor: 'transparent',
                            border: `1px solid #FF5E14`,
                            color: '#FF5E14'
                          }}
                        >
                          {t('manageUsers')}
                        </Button>
                        <Button
                          onClick={() => setActiveTab('listings')}
                          className="w-full text-left px-4 py-2 rounded-lg"
                          style={{ 
                            backgroundColor: 'transparent',
                            border: `1px solid #28a745`,
                            color: '#28a745'
                          }}
                        >
                          Manage Listings
                        </Button>
                        <Button
                          onClick={() => setActiveTab('analytics')}
                          className="w-full text-left px-4 py-2 rounded-lg"
                          style={{ 
                            backgroundColor: 'transparent',
                            border: `1px solid #007bff`,
                            color: '#007bff'
                          }}
                        >
                          View {t('analytics')}
                        </Button>
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="rounded-xl p-6" style={{ backgroundColor: theme === 'dark' ? '#2a2a2a' : '#f9fafb' }}>
                      <h3 className="text-lg font-semibold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                        Recent Activity
                      </h3>
                      <div className="space-y-3 text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                        <div>New user registered</div>
                        <div>Task listing created</div>
                        <div>Tool rental completed</div>
                        <div>User profile updated</div>
                      </div>
                    </div>

                    {/* System Health */}
                    <div className="rounded-xl p-6" style={{ backgroundColor: theme === 'dark' ? '#2a2a2a' : '#f9fafb' }}>
                      <h3 className="text-lg font-semibold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                        System Health
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>Database</span>
                          <span className="text-green-500 text-sm font-semibold">Healthy</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>Authentication</span>
                          <span className="text-green-500 text-sm font-semibold">Healthy</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>Storage</span>
                          <span className="text-green-500 text-sm font-semibold">Healthy</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Users Tab */}
              {activeTab === 'users' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                      User Management ({users.length})
                    </h2>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: theme === 'dark' ? '#888' : '#9CA3AF' }} />
                        <input
                          type="text"
                          placeholder="Search users..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 pr-4 py-2 border rounded-lg"
                          style={{ 
                            borderColor: theme === 'dark' ? '#444444' : '#d1d5db',
                            backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                            color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b" style={{ borderColor: theme === 'dark' ? '#2a2a2a' : '#e5e7eb' }}>
                          <th className="text-left py-3 px-4 font-semibold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>User</th>
                          <th className="text-left py-3 px-4 font-semibold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>Contact</th>
                          <th className="text-left py-3 px-4 font-semibold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>Role</th>
                          <th className="text-left py-3 px-4 font-semibold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>Joined</th>
                          <th className="text-left py-3 px-4 font-semibold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>Status</th>
                          <th className="text-left py-3 px-4 font-semibold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((user) => (
                          <tr key={user.id} className="border-b" style={{ borderColor: theme === 'dark' ? '#2a2a2a' : '#e5e7eb' }}>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold" style={{ backgroundColor: '#FF5E14' }}>
                                  {user.firstName?.charAt(0) || 'U'}{user.lastName?.charAt(0) || ''}
                                </div>
                                <div>
                                  <div className="font-semibold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                                    {user.displayName || `${user.firstName} ${user.lastName}`}
                                  </div>
                                  <div className="text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                                    ID: {user.id.substring(0, 8)}...
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="text-sm">
                                <div style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>{user.email}</div>
                                {user.phone && (
                                  <div style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>{user.phone}</div>
                                )}
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                user.role === 'admin' 
                                  ? 'bg-purple-100 text-purple-800' 
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                              {formatDate(user.createdAt)}
                            </td>
                            <td className="py-4 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                user.isActive 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {user.isActive ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <button
                                onClick={() => toggleUserStatus(user.id, user.isActive)}
                                className="p-2 rounded-lg hover:bg-gray-100"
                              >
                                {user.isActive ? (
                                  <ToggleRight className="h-5 w-5 text-green-500" />
                                ) : (
                                  <ToggleLeft className="h-5 w-5 text-gray-400" />
                                )}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Listings Tab */}
              {activeTab === 'listings' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                      Listing Management ({listings.length})
                    </h2>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: theme === 'dark' ? '#888' : '#9CA3AF' }} />
                        <input
                          type="text"
                          placeholder="Search listings..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 pr-4 py-2 border rounded-lg"
                          style={{ 
                            borderColor: theme === 'dark' ? '#444444' : '#d1d5db',
                            backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                            color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                          }}
                        />
                      </div>
                      <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value as 'all' | 'task' | 'tool')}
                        className="px-4 py-2 border rounded-lg"
                        style={{ 
                          borderColor: theme === 'dark' ? '#444444' : '#d1d5db',
                          backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                          color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                        }}
                      >
                        <option value="all">All Types</option>
                        <option value="task">Tasks</option>
                        <option value="tool">Tools</option>
                      </select>
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive' | 'completed')}
                        className="px-4 py-2 border rounded-lg"
                        style={{ 
                          borderColor: theme === 'dark' ? '#444444' : '#d1d5db',
                          backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                          color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                        }}
                      >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredListings.map((listing) => (
                      <div
                        key={listing.id}
                        className="rounded-xl shadow-lg p-6"
                        style={{ backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF' }}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              listing.type === 'task' 
                                ? 'bg-orange-100 text-orange-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {listing.type}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              listing.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : listing.status === 'completed'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {listing.status}
                            </span>
                            {listing.featured && (
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            )}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => toggleListingFeatured(listing.id, listing.type, listing.featured || false)}
                              className="p-2 rounded-lg hover:bg-gray-100"
                              title="Toggle Featured"
                            >
                              <Star className={`h-4 w-4 ${listing.featured ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                            </button>
                            <button
                              onClick={() => toggleListingStatus(listing.id, listing.type, listing.status)}
                              className="p-2 rounded-lg hover:bg-gray-100"
                              title="Toggle Status"
                            >
                              {listing.status === 'active' ? (
                                <ToggleRight className="h-4 w-4 text-green-500" />
                              ) : (
                                <ToggleLeft className="h-4 w-4 text-gray-400" />
                              )}
                            </button>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-bold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                          {listing.title}
                        </h3>
                        
                        <p className="text-sm mb-4 line-clamp-2" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                          {listing.description}
                        </p>
                        
                        <div className="space-y-2 mb-4 text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4" />
                            {listing.price}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {listing.location}
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {formatDate(listing.createdAt)}
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            {listing.userDisplayName}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: theme === 'dark' ? '#444444' : '#e5e7eb' }}>
                          <div className="flex items-center gap-4 text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              {listing.views || 0}
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4" />
                              {listing.saved || 0}
                            </div>
                          </div>
                          <Button
                            onClick={() => router.push(`/${listing.type}s/${listing.id}`)}
                            className="px-4 py-2 text-sm font-semibold rounded-lg"
                            style={{ 
                              backgroundColor: 'transparent',
                              border: `1px solid #FF5E14`,
                              color: '#FF5E14'
                            }}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Analytics Tab */}
              {activeTab === 'analytics' && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                    {t('analytics')} & Reports
                  </h2>
                  
                  {/* Analytics Charts Placeholder */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="rounded-xl p-6" style={{ backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF' }}>
                      <div className="flex items-center gap-3 mb-6">
                        <LineChart className="h-6 w-6" style={{ color: '#FF5E14' }} />
                        <h3 className="text-lg font-semibold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                          User Growth
                        </h3>
                      </div>
                      <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-lg" style={{ borderColor: theme === 'dark' ? '#444444' : '#d1d5db' }}>
                        <div className="text-center" style={{ color: theme === 'dark' ? '#888' : '#9CA3AF' }}>
                          <BarChart3 className="h-12 w-12 mx-auto mb-3" />
                          <p>User growth chart would go here</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="rounded-xl p-6" style={{ backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF' }}>
                      <div className="flex items-center gap-3 mb-6">
                        <PieChart className="h-6 w-6" style={{ color: '#28a745' }} />
                        <h3 className="text-lg font-semibold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                          Listing Distribution
                        </h3>
                      </div>
                      <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-lg" style={{ borderColor: theme === 'dark' ? '#444444' : '#d1d5db' }}>
                        <div className="text-center" style={{ color: theme === 'dark' ? '#888' : '#9CA3AF' }}>
                          <PieChart className="h-12 w-12 mx-auto mb-3" />
                          <p>Task vs Tool distribution chart</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Performance Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="rounded-xl p-6 text-center" style={{ backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF' }}>
                      <div className="text-2xl font-bold mb-2" style={{ color: '#FF5E14' }}>
                        {((stats.activeUsers / stats.totalUsers) * 100).toFixed(1)}%
                      </div>
                      <div className="text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>User Activity Rate</div>
                    </div>
                    
                    <div className="rounded-xl p-6 text-center" style={{ backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF' }}>
                      <div className="text-2xl font-bold mb-2" style={{ color: '#28a745' }}>
                        {(((stats.activeTasks + stats.activeTools) / stats.totalListings) * 100).toFixed(1)}%
                      </div>
                      <div className="text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>Active Listings Rate</div>
                    </div>
                    
                    <div className="rounded-xl p-6 text-center" style={{ backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF' }}>
                      <div className="text-2xl font-bold mb-2" style={{ color: '#007bff' }}>
                        {stats.totalUsers > 0 ? (stats.totalListings / stats.totalUsers).toFixed(1) : '0'}
                      </div>
                      <div className="text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>Avg Listings per User</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
