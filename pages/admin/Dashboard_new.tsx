import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import Navigation from '../../src/components/Navigation';
import Footer from '../../src/components/Footer';
import { Button } from '../../src/components/ui/button';
import { auth, db } from '../../src/lib/firebase';
import { onAuthStateChanged, User as FirebaseUser, signOut } from 'firebase/auth';
import { collection, query, getDocs, orderBy, where, doc, updateDoc } from 'firebase/firestore';

interface AdminStats {
  totalUsers: number;
  totalListings: number;
  activeListings: number;
  totalViews: number;
  totalEarnings: number;
}

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
  lastLogin?: Date;
}

interface ListingData {
  id: string;
  title: string;
  type: 'tool' | 'task';
  category: string;
  price: number;
  status: 'active' | 'inactive';
  createdBy: string;
  createdAt: Date;
  views: number;
  saves: number;
}

export default function AdminDashboard() {
  const { theme } = useTheme();
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'listings' | 'analytics'>('overview');
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalListings: 0,
    activeListings: 0,
    totalViews: 0,
    totalEarnings: 0
  });
  const [users, setUsers] = useState<UserData[]>([]);
  const [listings, setListings] = useState<ListingData[]>([]);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // Admin credentials - you can change these
  const ADMIN_EMAIL = 'admin@toolntask.com';
  const ADMIN_PASSWORD = 'AdminToolNTask2025!';

  useEffect(() => {
    setMounted(true);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoading(false);
      
      if (user) {
        // Check if user is admin
        const isUserAdmin = await checkAdminStatus(user);
        setIsAdmin(isUserAdmin);
        
        if (isUserAdmin) {
          await loadDashboardData();
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const checkAdminStatus = async (user: FirebaseUser): Promise<boolean> => {
    try {
      // Check if user email matches admin email
      if (user.email === ADMIN_EMAIL) {
        return true;
      }
      
      // You can also check Firestore for admin role
      const userDoc = await getDocs(
        query(collection(db, 'users'), where('email', '==', user.email))
      );
      
      if (!userDoc.empty) {
        const userData = userDoc.docs[0].data();
        return userData.role === 'admin';
      }
      
      return false;
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  };

  const loadDashboardData = async () => {
    try {
      // Load users
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const usersData = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as UserData[];
      setUsers(usersData);

      // Load listings
      const listingsSnapshot = await getDocs(
        query(collection(db, 'listings'), orderBy('createdAt', 'desc'))
      );
      const listingsData = listingsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ListingData[];
      setListings(listingsData);

      // Calculate stats
      const activeListings = listingsData.filter(l => l.status === 'active').length;
      const totalViews = listingsData.reduce((sum, l) => sum + (l.views || 0), 0);
      const totalEarnings = listingsData.reduce((sum, l) => sum + l.price, 0);

      setStats({
        totalUsers: usersData.length,
        totalListings: listingsData.length,
        activeListings,
        totalViews,
        totalEarnings
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  const toggleUserStatus = async (userId: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'users', userId), {
        isActive: !currentStatus,
        updatedAt: new Date()
      });
      
      // Refresh users data
      setUsers(prev => prev.map(user => 
        user.id === userId ? { ...user, isActive: !currentStatus } : user
      ));
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const toggleListingStatus = async (listingId: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      await updateDoc(doc(db, 'listings', listingId), {
        status: newStatus,
        updatedAt: new Date()
      });
      
      // Refresh listings data
      setListings(prev => prev.map(listing => 
        listing.id === listingId ? { ...listing, status: newStatus as 'active' | 'inactive' } : listing
      ));
      
      // Update stats
      loadDashboardData();
    } catch (error) {
      console.error('Error updating listing status:', error);
    }
  };

  if (loading || !mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F2F3F5' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-lg" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F2F3F5' }}>
        <div className="max-w-md mx-auto p-8 rounded-3xl shadow-xl" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
          <h1 className="text-2xl font-bold mb-6 text-center" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
            Admin Login Required
          </h1>
          <p className="text-center mb-6" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
            Please sign in with admin credentials to access the dashboard.
          </p>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
            <p className="text-sm font-semibold mb-2">Admin Credentials:</p>
            <p className="text-sm">Email: {ADMIN_EMAIL}</p>
            <p className="text-sm">Password: {ADMIN_PASSWORD}</p>
          </div>
          <Button 
            onClick={() => router.push('/SignIn')} 
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          >
            Go to Sign In
          </Button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F2F3F5' }}>
        <div className="max-w-md mx-auto p-8 rounded-3xl shadow-xl text-center" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
          <div className="text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
            Access Denied
          </h1>
          <p className="mb-6" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
            You don't have permission to access the admin dashboard.
          </p>
          <Button 
            onClick={() => router.push('/')} 
            className="bg-orange-500 hover:bg-orange-600 text-white"
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
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Admin Header */}
        <div className="rounded-3xl shadow-xl p-8 mb-8" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                🔧 ToolNTask Admin Dashboard
              </h1>
              <p className="text-lg" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                Welcome back, Administrator
              </p>
            </div>
            <Button 
              onClick={() => signOut(auth)}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Sign Out
            </Button>
          </div>
        </div>

        {/* Admin Instructions */}
        <div className="rounded-3xl shadow-xl p-6 mb-8 bg-gradient-to-r from-orange-50 to-blue-50 dark:from-orange-900/20 dark:to-blue-900/20">
          <h2 className="text-xl font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
            📋 Admin Credentials & Instructions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold mb-2 text-orange-600">Admin Login Details:</h3>
              <p className="text-sm mb-1"><strong>Email:</strong> {ADMIN_EMAIL}</p>
              <p className="text-sm"><strong>Password:</strong> {ADMIN_PASSWORD}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold mb-2 text-blue-600">Dashboard Features:</h3>
              <ul className="text-sm space-y-1">
                <li>• Real-time user & listing management</li>
                <li>• Analytics and performance tracking</li>
                <li>• Activate/Deactivate users & listings</li>
                <li>• Complete platform oversight</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="rounded-2xl p-6 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="text-3xl mb-2">👥</div>
            <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
            <p className="text-blue-100">Total Users</p>
          </div>
          
          <div className="rounded-2xl p-6 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
            <div className="text-3xl mb-2">📋</div>
            <h3 className="text-2xl font-bold">{stats.totalListings}</h3>
            <p className="text-green-100">Total Listings</p>
          </div>
          
          <div className="rounded-2xl p-6 shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
            <div className="text-3xl mb-2">✅</div>
            <h3 className="text-2xl font-bold">{stats.activeListings}</h3>
            <p className="text-emerald-100">Active Listings</p>
          </div>
          
          <div className="rounded-2xl p-6 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <div className="text-3xl mb-2">👁️</div>
            <h3 className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</h3>
            <p className="text-purple-100">Total Views</p>
          </div>
          
          <div className="rounded-2xl p-6 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <div className="text-3xl mb-2">💰</div>
            <h3 className="text-2xl font-bold">${stats.totalEarnings.toLocaleString()}</h3>
            <p className="text-orange-100">Total Value</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-4 mb-8">
          {[
            { key: 'overview', label: 'Overview', icon: '📊' },
            { key: 'users', label: 'Users Management', icon: '👥' },
            { key: 'listings', label: 'Listings Management', icon: '📋' },
            { key: 'analytics', label: 'Analytics', icon: '📈' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeTab === tab.key
                  ? 'bg-orange-500 text-white shadow-lg'
                  : theme === 'dark'
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-3xl shadow-xl p-8" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
              <h2 className="text-2xl font-bold mb-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                🆕 Recent Users
              </h2>
              {users.length === 0 ? (
                <p className="text-center py-8" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                  No users registered yet
                </p>
              ) : (
                <div className="space-y-4">
                  {users.slice(0, 5).map(user => (
                    <div key={user.id} className="flex justify-between items-center p-4 rounded-lg" style={{ backgroundColor: theme === 'dark' ? '#2a2a2a' : '#F8F9FA' }}>
                      <div>
                        <p className="font-semibold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                          {user.email}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-3xl shadow-xl p-8" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
              <h2 className="text-2xl font-bold mb-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                🆕 Recent Listings
              </h2>
              {listings.length === 0 ? (
                <p className="text-center py-8" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                  No listings created yet
                </p>
              ) : (
                <div className="space-y-4">
                  {listings.slice(0, 5).map(listing => (
                    <div key={listing.id} className="p-4 rounded-lg" style={{ backgroundColor: theme === 'dark' ? '#2a2a2a' : '#F8F9FA' }}>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                          {listing.title}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          listing.type === 'tool' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {listing.type}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-orange-500">${listing.price}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          listing.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {listing.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Users Management Tab */}
        {activeTab === 'users' && (
          <div className="rounded-3xl shadow-xl p-8" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
            <h2 className="text-2xl font-bold mb-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
              👥 Users Management ({users.length})
            </h2>
            
            {users.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">👥</div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                  No Users Yet
                </h3>
                <p className="text-gray-500">Users will appear here once they register</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b" style={{ borderColor: theme === 'dark' ? '#444444' : '#E2E8F0' }}>
                      <th className="text-left py-3 px-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>Name</th>
                      <th className="text-left py-3 px-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>Email</th>
                      <th className="text-left py-3 px-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>Phone</th>
                      <th className="text-left py-3 px-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>Role</th>
                      <th className="text-left py-3 px-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>Status</th>
                      <th className="text-left py-3 px-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id} className="border-b" style={{ borderColor: theme === 'dark' ? '#444444' : '#E2E8F0' }}>
                        <td className="py-3 px-4" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                          {user.firstName} {user.lastName}
                        </td>
                        <td className="py-3 px-4" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                          {user.email}
                        </td>
                        <td className="py-3 px-4" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                          {user.phone || 'N/A'}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user.role || 'user'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {user.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Button
                            onClick={() => toggleUserStatus(user.id, user.isActive)}
                            className={`text-xs px-3 py-1 ${
                              user.isActive 
                                ? 'bg-red-500 hover:bg-red-600' 
                                : 'bg-green-500 hover:bg-green-600'
                            } text-white`}
                          >
                            {user.isActive ? 'Deactivate' : 'Activate'}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Listings Management Tab */}
        {activeTab === 'listings' && (
          <div className="rounded-3xl shadow-xl p-8" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
            <h2 className="text-2xl font-bold mb-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
              📋 Listings Management ({listings.length})
            </h2>
            
            {listings.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                  No Listings Yet
                </h3>
                <p className="text-gray-500">Tools and tasks will appear here once users create them</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map(listing => (
                  <div key={listing.id} className="border rounded-xl p-6" style={{ borderColor: theme === 'dark' ? '#444444' : '#E2E8F0' }}>
                    <div className="flex justify-between items-start mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        listing.type === 'tool' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {listing.type.charAt(0).toUpperCase() + listing.type.slice(1)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        listing.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {listing.status}
                      </span>
                    </div>
                    
                    <h3 className="font-bold text-lg mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                      {listing.title}
                    </h3>
                    
                    <p className="text-sm mb-4" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                      Category: {listing.category}
                    </p>
                    
                    <div className="flex justify-between items-center mb-4 text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                      <span>👁️ {listing.views || 0} views</span>
                      <span>❤️ {listing.saves || 0} saves</span>
                      <span className="font-bold text-orange-500">${listing.price}</span>
                    </div>
                    
                    <Button
                      onClick={() => toggleListingStatus(listing.id, listing.status)}
                      className={`w-full text-xs ${
                        listing.status === 'active' 
                          ? 'bg-red-500 hover:bg-red-600' 
                          : 'bg-green-500 hover:bg-green-600'
                      } text-white`}
                    >
                      {listing.status === 'active' ? 'Deactivate' : 'Activate'}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-3xl shadow-xl p-8" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
              <h2 className="text-2xl font-bold mb-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                📊 Platform Analytics
              </h2>
              
              {listings.length === 0 ? (
                <p className="text-center py-8" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                  Analytics will appear once listings are created
                </p>
              ) : (
                <div className="space-y-6">
                  <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                    <h3 className="font-semibold mb-2 text-blue-600">Tools vs Tasks Distribution</h3>
                    {['tool', 'task'].map(type => {
                      const count = listings.filter(l => l.type === type).length;
                      const percentage = Math.round((count / listings.length) * 100);
                      return (
                        <div key={type} className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span>{type.charAt(0).toUpperCase() + type.slice(1)}s</span>
                            <span>{count} ({percentage}%)</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${type === 'tool' ? 'bg-orange-500' : 'bg-blue-500'}`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                    <h3 className="font-semibold mb-2 text-green-600">Activity Status</h3>
                    {['active', 'inactive'].map(status => {
                      const count = listings.filter(l => l.status === status).length;
                      const percentage = Math.round((count / listings.length) * 100);
                      return (
                        <div key={status} className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
                            <span>{count} ({percentage}%)</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-3xl shadow-xl p-8" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
              <h2 className="text-2xl font-bold mb-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                🏷️ Category Breakdown
              </h2>
              
              {listings.length === 0 ? (
                <p className="text-center py-8" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                  Category data will appear once listings are created
                </p>
              ) : (
                <div className="space-y-4">
                  {Array.from(new Set(listings.map(l => l.category))).map(category => {
                    const count = listings.filter(l => l.category === category).length;
                    const percentage = Math.round((count / listings.length) * 100);
                    const totalValue = listings.filter(l => l.category === category).reduce((sum, l) => sum + l.price, 0);
                    
                    return (
                      <div key={category} className="p-4 rounded-lg" style={{ backgroundColor: theme === 'dark' ? '#2a2a2a' : '#F8F9FA' }}>
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-semibold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                            {category}
                          </h3>
                          <span className="text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                            {count} listings
                          </span>
                        </div>
                        <div className="flex justify-between text-sm mb-2" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                          <span>Total Value: ${totalValue.toLocaleString()}</span>
                          <span>{percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-orange-500 h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}
