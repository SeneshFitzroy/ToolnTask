import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { 
  Users, 
  FileText, 
  Eye, 
  EyeOff, 
  Trash2, 
  Search,
  BarChart3,
  TrendingUp,
  MapPin,
  Clock,
  DollarSign,
  Star,
  Phone,
  CheckCircle,
  XCircle,
  ExternalLink
} from 'lucide-react';

interface Advertisement {
  id: string;
  title: string;
  url: string;
  category: 'tools' | 'tasks' | 'general';
  isActive: boolean;
  isApproved: boolean;
  createdAt: string;
  deadline: string;
  views: number;
  clicks: number;
  budget: number;
  userId: string;
  userName: string;
  userEmail: string;
  timezone: string;
  description: string;
  imageUrl?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  role: 'user' | 'admin';
  isActive: boolean;
  joinedAt: string;
  toolsPosted: number;
  tasksPosted: number;
  location: string;
  phone: string;
}

interface Gig {
  id: string;
  title: string;
  type: 'tool' | 'task';
  status: 'available' | 'requested';
  position: string;
  description: string;
  duration: string;
  timeframe: 'day' | 'week' | 'month';
  amount: number;
  experience: string;
  contact: string;
  postedBy: string;
  createdAt: string;
  isActive: boolean;
  location: string;
  timezone: string;
}

const AdminDashboard = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [ageFilter, setAgeFilter] = useState('all');

  // Mock data - replace with actual API calls
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([
    {
      id: '1',
      title: 'Premium Tool Rental Service',
      url: 'https://example.com/tool-rental',
      category: 'tools',
      isActive: true,
      isApproved: true,
      createdAt: '2025-01-10',
      deadline: '2025-01-25',
      views: 1250,
      clicks: 89,
      budget: 500,
      userId: 'user1',
      userName: 'John Smith',
      userEmail: 'john@example.com',
      timezone: 'UTC-5',
      description: 'Professional tool rental service with premium equipment',
      imageUrl: '/api/placeholder/300/200'
    },
    {
      id: '2',
      title: 'Home Renovation Tasks',
      url: 'https://example.com/renovation',
      category: 'tasks',
      isActive: false,
      isApproved: false,
      createdAt: '2025-01-08',
      deadline: '2025-01-20',
      views: 890,
      clicks: 45,
      budget: 300,
      userId: 'user2',
      userName: 'Jane Doe',
      userEmail: 'jane@example.com',
      timezone: 'UTC-8',
      description: 'Complete home renovation services for residential properties'
    }
  ]);

  const [users, setUsers] = useState<User[]>([
    {
      id: 'user1',
      name: 'John Smith',
      email: 'john@example.com',
      age: 25,
      role: 'user',
      isActive: true,
      joinedAt: '2024-12-15',
      toolsPosted: 5,
      tasksPosted: 3,
      location: 'New York',
      phone: '+1-555-0123'
    },
    {
      id: 'user2',
      name: 'Jane Doe',
      email: 'jane@example.com',
      age: 17,
      role: 'user',
      isActive: true,
      joinedAt: '2024-12-20',
      toolsPosted: 2,
      tasksPosted: 7,
      location: 'Los Angeles',
      phone: '+1-555-0456'
    }
  ]);

  const [gigs, setGigs] = useState<Gig[]>([
    {
      id: 'gig1',
      title: 'Power Drill Rental',
      type: 'tool',
      status: 'available',
      position: 'Downtown Area',
      description: 'Professional grade power drill available for rent',
      duration: '3',
      timeframe: 'day',
      amount: 25,
      experience: 'Basic tool knowledge required',
      contact: '+1-555-0123',
      postedBy: 'John Smith',
      createdAt: '2025-01-12',
      isActive: true,
      location: 'New York',
      timezone: 'UTC-5'
    },
    {
      id: 'gig2',
      title: 'House Cleaning Service',
      type: 'task',
      status: 'requested',
      position: 'Suburb Area',
      description: 'Need professional house cleaning service',
      duration: '1',
      timeframe: 'week',
      amount: 150,
      experience: '2+ years experience',
      contact: '+1-555-0456',
      postedBy: 'Jane Doe',
      createdAt: '2025-01-10',
      isActive: true,
      location: 'Los Angeles',
      timezone: 'UTC-8'
    }
  ]);

  const toggleAdvertisementStatus = (id: string) => {
    setAdvertisements(prev => prev.map(ad => 
      ad.id === id ? { ...ad, isActive: !ad.isActive } : ad
    ));
  };

  const toggleAdvertisementApproval = (id: string) => {
    setAdvertisements(prev => prev.map(ad => 
      ad.id === id ? { ...ad, isApproved: !ad.isApproved } : ad
    ));
  };

  const toggleUserStatus = (id: string) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, isActive: !user.isActive } : user
    ));
  };

  const toggleGigStatus = (id: string) => {
    setGigs(prev => prev.map(gig => 
      gig.id === id ? { ...gig, isActive: !gig.isActive } : gig
    ));
  };

  const deleteAdvertisement = (id: string) => {
    setAdvertisements(prev => prev.filter(ad => ad.id !== id));
  };

  const isDeadlinePassed = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    return deadlineDate < now;
  };

  const isWithinGracePeriod = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const gracePeriodEnd = new Date(deadlineDate.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days
    const now = new Date();
    return now <= gracePeriodEnd;
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAge = ageFilter === 'all' || 
                      (ageFilter === 'under18' && user.age < 18) ||
                      (ageFilter === 'over18' && user.age >= 18);
    return matchesSearch && matchesAge;
  });

  const filteredGigs = gigs.filter(gig => {
    const matchesSearch = gig.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || gig.type === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredAds = advertisements.filter(ad => {
    const matchesSearch = ad.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || ad.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.isActive).length,
    totalAds: advertisements.length,
    activeAds: advertisements.filter(ad => ad.isActive).length,
    totalGigs: gigs.length,
    activeGigs: gigs.filter(g => g.isActive).length,
    revenue: advertisements.reduce((sum, ad) => sum + ad.budget, 0)
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme === 'dark' ? '#0f172a' : '#f8fafc' }}>
      {/* Header */}
      <div className="border-b" style={{ 
        backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
        borderColor: theme === 'dark' ? '#334155' : '#e2e8f0'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold" style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}>
              Admin Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" 
                       style={{ color: theme === 'dark' ? '#64748b' : '#64748b' }} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-lg border"
                  style={{
                    backgroundColor: theme === 'dark' ? '#334155' : '#ffffff',
                    borderColor: theme === 'dark' ? '#475569' : '#d1d5db',
                    color: theme === 'dark' ? '#f1f5f9' : '#1e293b'
                  }}
                />
              </div>
              <button
                onClick={() => router.push('/')}
                className="px-4 py-2 rounded-lg transition-colors duration-200"
                style={{
                  backgroundColor: '#FF5E14',
                  color: '#ffffff'
                }}
              >
                Back to Site
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-6">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'advertisements', label: 'Advertisements', icon: FileText },
            { id: 'users', label: 'Users', icon: Users },
            { id: 'gigs', label: 'Gigs', icon: Star }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                  activeTab === tab.id ? 'bg-orange-100 text-orange-600' : ''
                }`}
                style={{
                  backgroundColor: activeTab === tab.id ? 
                    (theme === 'dark' ? 'rgba(255, 94, 20, 0.1)' : 'rgba(255, 94, 20, 0.1)') : 
                    'transparent',
                  color: activeTab === tab.id ? '#FF5E14' : (theme === 'dark' ? '#cbd5e1' : '#475569')
                }}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-lg border" style={{
                backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                borderColor: theme === 'dark' ? '#334155' : '#e2e8f0'
              }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                      Total Users
                    </p>
                    <p className="text-2xl font-bold" style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}>
                      {stats.totalUsers}
                    </p>
                  </div>
                  <Users className="h-8 w-8" style={{ color: '#FF5E14' }} />
                </div>
              </div>

              <div className="p-6 rounded-lg border" style={{
                backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                borderColor: theme === 'dark' ? '#334155' : '#e2e8f0'
              }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                      Active Ads
                    </p>
                    <p className="text-2xl font-bold" style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}>
                      {stats.activeAds}
                    </p>
                  </div>
                  <FileText className="h-8 w-8" style={{ color: '#10b981' }} />
                </div>
              </div>

              <div className="p-6 rounded-lg border" style={{
                backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                borderColor: theme === 'dark' ? '#334155' : '#e2e8f0'
              }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                      Active Gigs
                    </p>
                    <p className="text-2xl font-bold" style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}>
                      {stats.activeGigs}
                    </p>
                  </div>
                  <Star className="h-8 w-8" style={{ color: '#3b82f6' }} />
                </div>
              </div>

              <div className="p-6 rounded-lg border" style={{
                backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                borderColor: theme === 'dark' ? '#334155' : '#e2e8f0'
              }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                      Total Revenue
                    </p>
                    <p className="text-2xl font-bold" style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}>
                      ${stats.revenue}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8" style={{ color: '#f59e0b' }} />
                </div>
              </div>
            </div>

            {/* Charts Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-6 rounded-lg border" style={{
                backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                borderColor: theme === 'dark' ? '#334155' : '#e2e8f0'
              }}>
                <h3 className="text-lg font-semibold mb-4" style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}>
                  Advertisement Performance
                </h3>
                <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-lg"
                     style={{ borderColor: theme === 'dark' ? '#475569' : '#d1d5db' }}>
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto mb-2" style={{ color: theme === 'dark' ? '#64748b' : '#9ca3af' }} />
                    <p style={{ color: theme === 'dark' ? '#64748b' : '#9ca3af' }}>Chart will be here</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-lg border" style={{
                backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                borderColor: theme === 'dark' ? '#334155' : '#e2e8f0'
              }}>
                <h3 className="text-lg font-semibold mb-4" style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}>
                  User Growth
                </h3>
                <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-lg"
                     style={{ borderColor: theme === 'dark' ? '#475569' : '#d1d5db' }}>
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 mx-auto mb-2" style={{ color: theme === 'dark' ? '#64748b' : '#9ca3af' }} />
                    <p style={{ color: theme === 'dark' ? '#64748b' : '#9ca3af' }}>Chart will be here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Advertisements Tab */}
        {activeTab === 'advertisements' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold" style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}>
                Advertisements Management
              </h2>
              <div className="flex items-center space-x-4">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 rounded-lg border"
                  style={{
                    backgroundColor: theme === 'dark' ? '#334155' : '#ffffff',
                    borderColor: theme === 'dark' ? '#475569' : '#d1d5db',
                    color: theme === 'dark' ? '#f1f5f9' : '#1e293b'
                  }}
                >
                  <option value="all">All Categories</option>
                  <option value="tools">Tools</option>
                  <option value="tasks">Tasks</option>
                  <option value="general">General</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full rounded-lg overflow-hidden" style={{
                backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff'
              }}>
                <thead style={{ backgroundColor: theme === 'dark' ? '#334155' : '#f8fafc' }}>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                        style={{ color: theme === 'dark' ? '#cbd5e1' : '#374151' }}>
                      Advertisement
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                        style={{ color: theme === 'dark' ? '#cbd5e1' : '#374151' }}>
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                        style={{ color: theme === 'dark' ? '#cbd5e1' : '#374151' }}>
                      Performance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                        style={{ color: theme === 'dark' ? '#cbd5e1' : '#374151' }}>
                      Deadline
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                        style={{ color: theme === 'dark' ? '#cbd5e1' : '#374151' }}>
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                        style={{ color: theme === 'dark' ? '#cbd5e1' : '#374151' }}>
                      Approval
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                        style={{ color: theme === 'dark' ? '#cbd5e1' : '#374151' }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ 
                  backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                  borderColor: theme === 'dark' ? '#334155' : '#e5e7eb'
                }}>
                  {filteredAds.map((ad) => {
                    const deadlinePassed = isDeadlinePassed(ad.deadline);
                    const withinGracePeriod = isWithinGracePeriod(ad.deadline);
                    const canToggle = !deadlinePassed || withinGracePeriod;
                    
                    return (
                      <tr key={ad.id} className={deadlinePassed && !withinGracePeriod ? 'opacity-50' : ''}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium" style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}>
                              {ad.title}
                            </div>
                            <div className="text-sm" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                              by {ad.userName} ({ad.userEmail})
                            </div>
                            <a href={ad.url} target="_blank" rel="noopener noreferrer" 
                               className="text-sm text-blue-500 hover:text-blue-700 flex items-center space-x-1">
                              <span>{ad.url}</span>
                              <ExternalLink className="h-3 w-3" />
                            </a>
                            <div className="text-xs" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                              {ad.description}
                            </div>
                            <div className="text-xs mt-1" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                              Timezone: {ad.timezone}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                                style={{
                                  backgroundColor: ad.category === 'tools' ? '#fef3c7' : 
                                                  ad.category === 'tasks' ? '#dbeafe' : '#f3e8ff',
                                  color: ad.category === 'tools' ? '#92400e' : 
                                         ad.category === 'tasks' ? '#1e40af' : '#7c3aed'
                                }}>
                            {ad.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: theme === 'dark' ? '#cbd5e1' : '#374151' }}>
                          <div>{ad.views} views</div>
                          <div>{ad.clicks} clicks</div>
                          <div>${ad.budget} budget</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: theme === 'dark' ? '#cbd5e1' : '#374151' }}>
                          <div>{ad.deadline}</div>
                          {deadlinePassed && (
                            <div className="text-xs text-red-500">
                              {withinGracePeriod ? 'Grace period' : 'Auto-deleted'}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => toggleAdvertisementStatus(ad.id)}
                            disabled={!canToggle}
                            className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${
                              ad.isActive 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            } ${!canToggle ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            {ad.isActive ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                            <span>{ad.isActive ? 'Active' : 'Inactive'}</span>
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => toggleAdvertisementApproval(ad.id)}
                            className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${
                              ad.isApproved 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {ad.isApproved ? <CheckCircle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                            <span>{ad.isApproved ? 'Approved' : 'Pending'}</span>
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => toggleAdvertisementStatus(ad.id)}
                              disabled={!canToggle}
                              className={`p-1 rounded-lg transition-colors ${!canToggle ? 'opacity-50 cursor-not-allowed' : ''}`}
                              style={{ backgroundColor: theme === 'dark' ? '#334155' : '#f1f5f9' }}
                            >
                              {ad.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                            <button
                              onClick={() => deleteAdvertisement(ad.id)}
                              className="p-1 rounded-lg transition-colors text-red-500 hover:text-red-700"
                              style={{ backgroundColor: theme === 'dark' ? '#334155' : '#f1f5f9' }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold" style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}>
                Users Management
              </h2>
              <div className="flex items-center space-x-4">
                <select
                  value={ageFilter}
                  onChange={(e) => setAgeFilter(e.target.value)}
                  className="px-3 py-2 rounded-lg border"
                  style={{
                    backgroundColor: theme === 'dark' ? '#334155' : '#ffffff',
                    borderColor: theme === 'dark' ? '#475569' : '#d1d5db',
                    color: theme === 'dark' ? '#f1f5f9' : '#1e293b'
                  }}
                >
                  <option value="all">All Ages</option>
                  <option value="under18">Under 18</option>
                  <option value="over18">18 and Over</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full rounded-lg overflow-hidden" style={{
                backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff'
              }}>
                <thead style={{ backgroundColor: theme === 'dark' ? '#334155' : '#f8fafc' }}>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                        style={{ color: theme === 'dark' ? '#cbd5e1' : '#374151' }}>
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                        style={{ color: theme === 'dark' ? '#cbd5e1' : '#374151' }}>
                      Age
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                        style={{ color: theme === 'dark' ? '#cbd5e1' : '#374151' }}>
                      Activity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                        style={{ color: theme === 'dark' ? '#cbd5e1' : '#374151' }}>
                      Joined
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                        style={{ color: theme === 'dark' ? '#cbd5e1' : '#374151' }}>
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                        style={{ color: theme === 'dark' ? '#cbd5e1' : '#374151' }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ 
                  backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                  borderColor: theme === 'dark' ? '#334155' : '#e5e7eb'
                }}>
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium" style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}>
                            {user.name}
                          </div>
                          <div className="text-sm" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                            {user.email}
                          </div>
                          <div className="text-sm" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                            {user.phone} • {user.location}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.age < 18 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {user.age} years
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: theme === 'dark' ? '#cbd5e1' : '#374151' }}>
                        <div>{user.toolsPosted} tools</div>
                        <div>{user.tasksPosted} tasks</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: theme === 'dark' ? '#cbd5e1' : '#374151' }}>
                        {user.joinedAt}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleUserStatus(user.id)}
                          className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${
                            user.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {user.isActive ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                          <span>{user.isActive ? 'Active' : 'Inactive'}</span>
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => toggleUserStatus(user.id)}
                          className="p-1 rounded-lg transition-colors"
                          style={{ backgroundColor: theme === 'dark' ? '#334155' : '#f1f5f9' }}
                        >
                          {user.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Gigs Tab */}
        {activeTab === 'gigs' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold" style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}>
                Gigs Management
              </h2>
              <div className="flex items-center space-x-4">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 rounded-lg border"
                  style={{
                    backgroundColor: theme === 'dark' ? '#334155' : '#ffffff',
                    borderColor: theme === 'dark' ? '#475569' : '#d1d5db',
                    color: theme === 'dark' ? '#f1f5f9' : '#1e293b'
                  }}
                >
                  <option value="all">All Types</option>
                  <option value="tool">Tools</option>
                  <option value="task">Tasks</option>
                </select>
              </div>
            </div>

            {/* Separate Tools and Tasks */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Available Tools */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold" style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}>
                  Available Tools
                </h3>
                {filteredGigs.filter(gig => gig.type === 'tool' && gig.status === 'available').map((gig) => (
                  <div key={gig.id} className="p-4 rounded-lg border border-green-200" style={{
                    backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                    borderColor: theme === 'dark' ? '#065f46' : '#10b981'
                  }}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold" style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}>
                          {gig.title}
                        </h4>
                        <p className="text-sm text-gray-600">{gig.description}</p>
                      </div>
                      <button
                        onClick={() => toggleGigStatus(gig.id)}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          gig.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {gig.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm" style={{ color: theme === 'dark' ? '#cbd5e1' : '#374151' }}>
                      <div><MapPin className="h-4 w-4 inline mr-1" />{gig.position}</div>
                      <div><Clock className="h-4 w-4 inline mr-1" />{gig.duration} {gig.timeframe}</div>
                      <div><DollarSign className="h-4 w-4 inline mr-1" />${gig.amount}</div>
                      <div><Phone className="h-4 w-4 inline mr-1" />{gig.contact}</div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      <span>{gig.experience} • {gig.location} • {gig.timezone}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Requested Tools */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold" style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}>
                  Requested Tools
                </h3>
                {filteredGigs.filter(gig => gig.type === 'tool' && gig.status === 'requested').map((gig) => (
                  <div key={gig.id} className="p-4 rounded-lg border border-orange-200" style={{
                    backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                    borderColor: theme === 'dark' ? '#ea580c' : '#f97316'
                  }}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold" style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}>
                          {gig.title}
                        </h4>
                        <p className="text-sm text-gray-600">{gig.description}</p>
                      </div>
                      <button
                        onClick={() => toggleGigStatus(gig.id)}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          gig.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {gig.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm" style={{ color: theme === 'dark' ? '#cbd5e1' : '#374151' }}>
                      <div><MapPin className="h-4 w-4 inline mr-1" />{gig.position}</div>
                      <div><Clock className="h-4 w-4 inline mr-1" />{gig.duration} {gig.timeframe}</div>
                      <div><DollarSign className="h-4 w-4 inline mr-1" />${gig.amount}</div>
                      <div><Phone className="h-4 w-4 inline mr-1" />{gig.contact}</div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      <span>{gig.experience} • {gig.location} • {gig.timezone}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Tasks */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold" style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}>
                  Available Tasks
                </h3>
                {filteredGigs.filter(gig => gig.type === 'task' && gig.status === 'available').map((gig) => (
                  <div key={gig.id} className="p-4 rounded-lg border border-blue-200" style={{
                    backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                    borderColor: theme === 'dark' ? '#1e40af' : '#3b82f6'
                  }}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold" style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}>
                          {gig.title}
                        </h4>
                        <p className="text-sm text-gray-600">{gig.description}</p>
                      </div>
                      <button
                        onClick={() => toggleGigStatus(gig.id)}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          gig.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {gig.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm" style={{ color: theme === 'dark' ? '#cbd5e1' : '#374151' }}>
                      <div><MapPin className="h-4 w-4 inline mr-1" />{gig.position}</div>
                      <div><Clock className="h-4 w-4 inline mr-1" />{gig.duration} {gig.timeframe}</div>
                      <div><DollarSign className="h-4 w-4 inline mr-1" />${gig.amount}</div>
                      <div><Phone className="h-4 w-4 inline mr-1" />{gig.contact}</div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      <span>{gig.experience} • {gig.location} • {gig.timezone}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Requested Tasks */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold" style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}>
                  Requested Tasks
                </h3>
                {filteredGigs.filter(gig => gig.type === 'task' && gig.status === 'requested').map((gig) => (
                  <div key={gig.id} className="p-4 rounded-lg border border-purple-200" style={{
                    backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                    borderColor: theme === 'dark' ? '#7c3aed' : '#8b5cf6'
                  }}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold" style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}>
                          {gig.title}
                        </h4>
                        <p className="text-sm text-gray-600">{gig.description}</p>
                      </div>
                      <button
                        onClick={() => toggleGigStatus(gig.id)}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          gig.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {gig.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm" style={{ color: theme === 'dark' ? '#cbd5e1' : '#374151' }}>
                      <div><MapPin className="h-4 w-4 inline mr-1" />{gig.position}</div>
                      <div><Clock className="h-4 w-4 inline mr-1" />{gig.duration} {gig.timeframe}</div>
                      <div><DollarSign className="h-4 w-4 inline mr-1" />${gig.amount}</div>
                      <div><Phone className="h-4 w-4 inline mr-1" />{gig.contact}</div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      <span>{gig.experience} • {gig.location} • {gig.timezone}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
