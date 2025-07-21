import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import { Button } from '../src/components/ui/button';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { doc, updateDoc, getDoc, serverTimestamp, collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { auth, db } from '../src/lib/firebase';
import { useLanguage } from '../src/contexts/LanguageContext';
import { User as UserIcon, Bookmark, Bell, LogOut, Edit3, Eye, Share2, Trash2, Plus, Calendar, MapPin, DollarSign, Clock, CheckCircle, XCircle } from 'lucide-react';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  displayName: string;
  createdAt: any;
  isActive: boolean;
  role: string;
  profileComplete: boolean;
  totalListings?: number;
  totalTasks?: number;
  totalTools?: number;
}

interface Listing {
  id: string;
  title: string;
  description: string;
  type: 'task' | 'tool';
  category: string;
  price: string;
  location: string;
  status: 'active' | 'inactive' | 'completed';
  createdAt: any;
  updatedAt: any;
  userId: string;
  userDisplayName: string;
  views?: number;
  saved?: number;
}

interface Notification {
  id: string;
  type: 'gig_match' | 'request' | 'approval' | 'general';
  title: string;
  message: string;
  timestamp: any;
  isRead: boolean;
  relatedGig?: string;
  createdAt: any;
}

export default function Profile() {
  const { theme } = useTheme();
  const { t, language, setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    displayName: '',
    createdAt: null,
    isActive: true,
    role: 'user',
    profileComplete: false
  });
  const [activeTab, setActiveTab] = useState('profile');
  const [myListings, setMyListings] = useState<Listing[]>([]);
  const [savedGigs, setSavedGigs] = useState<Listing[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        await loadUserProfile(user.uid);
        await loadUserListings(user.uid);
        await loadSavedGigs(user.uid);
        await loadNotifications(user.uid);
      } else {
        router.push('/SignIn');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const loadUserProfile = async (userId: string) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserProfile({
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          email: userData.email || '',
          phone: userData.phone || '',
          displayName: userData.displayName || '',
          createdAt: userData.createdAt,
          isActive: userData.isActive || true,
          role: userData.role || 'user',
          profileComplete: userData.profileComplete || false,
          totalListings: userData.totalListings || 0,
          totalTasks: userData.totalTasks || 0,
          totalTools: userData.totalTools || 0
        });
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
      setError(t('error'));
    }
  };

  const loadUserListings = async (userId: string) => {
    try {
      const tasksQuery = query(
        collection(db, 'tasks'), 
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const toolsQuery = query(
        collection(db, 'tools'), 
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );

      const [tasksSnapshot, toolsSnapshot] = await Promise.all([
        getDocs(tasksQuery),
        getDocs(toolsQuery)
      ]);

      const listings: Listing[] = [];
      
      tasksSnapshot.forEach(doc => {
        listings.push({ id: doc.id, type: 'task', ...doc.data() } as Listing);
      });
      
      toolsSnapshot.forEach(doc => {
        listings.push({ id: doc.id, type: 'tool', ...doc.data() } as Listing);
      });

      // Sort by creation date
      listings.sort((a, b) => {
        if (a.createdAt?.seconds && b.createdAt?.seconds) {
          return b.createdAt.seconds - a.createdAt.seconds;
        }
        return 0;
      });

      setMyListings(listings);
    } catch (error) {
      console.error('Error loading user listings:', error);
    }
  };

  const loadSavedGigs = async (userId: string) => {
    try {
      const savedQuery = query(
        collection(db, 'savedGigs'), 
        where('userId', '==', userId),
        orderBy('savedAt', 'desc')
      );
      
      const savedSnapshot = await getDocs(savedQuery);
      const saved: Listing[] = [];
      
      for (const savedDoc of savedSnapshot.docs) {
        const savedData = savedDoc.data();
        const gigId = savedData.gigId;
        const gigType = savedData.gigType;
        
        // Get the actual gig data
        const gigDoc = await getDoc(doc(db, gigType === 'task' ? 'tasks' : 'tools', gigId));
        if (gigDoc.exists()) {
          saved.push({ 
            id: gigDoc.id, 
            type: gigType as 'task' | 'tool', 
            ...gigDoc.data(),
            savedAt: savedData.savedAt
          } as Listing);
        }
      }
      
      setSavedGigs(saved);
    } catch (error) {
      console.error('Error loading saved gigs:', error);
    }
  };

  const loadNotifications = async (userId: string) => {
    try {
      const notificationsQuery = query(
        collection(db, 'notifications'), 
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(20)
      );
      
      const snapshot = await getDocs(notificationsQuery);
      const notificationsList: Notification[] = [];
      let unread = 0;
      
      snapshot.forEach(doc => {
        const notification = { id: doc.id, ...doc.data() } as Notification;
        notificationsList.push(notification);
        if (!notification.isRead) unread++;
      });
      
      setNotifications(notificationsList);
      setUnreadCount(unread);
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  };

  const handleProfileUpdate = async () => {
    if (!user) return;
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        firstName: userProfile.firstName.trim(),
        lastName: userProfile.lastName.trim(),
        displayName: `${userProfile.firstName.trim()} ${userProfile.lastName.trim()}`,
        updatedAt: serverTimestamp(),
        profileComplete: true
      });
      
      setSuccess(t('updateSuccess'));
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(t('updateError'));
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const markNotificationAsRead = async (notificationId: string) => {
    try {
      await updateDoc(doc(db, 'notifications', notificationId), {
        isRead: true,
        readAt: serverTimestamp()
      });
      
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllNotificationsAsRead = async () => {
    if (!user) return;
    
    try {
      const unreadNotifications = notifications.filter(n => !n.isRead);
      const promises = unreadNotifications.map(n => 
        updateDoc(doc(db, 'notifications', n.id), {
          isRead: true,
          readAt: serverTimestamp()
        })
      );
      
      await Promise.all(promises);
      
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString(language === 'si' ? 'si-LK' : language === 'ta' ? 'ta-LK' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTimeAgo = (timestamp: any) => {
    if (!timestamp) return '';
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return t('justNow') || 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  if (!mounted) {
    return null;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F2F3F5' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2" style={{ borderColor: '#FF5E14' }}></div>
          <p className="mt-4 text-lg" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>{t('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F2F3F5' }}>
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <div className="rounded-3xl shadow-xl p-8 mb-8" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold text-white" style={{ backgroundColor: '#FF5E14' }}>
                  {userProfile.firstName.charAt(0).toUpperCase()}{userProfile.lastName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                    {userProfile.displayName || `${userProfile.firstName} ${userProfile.lastName}`}
                  </h1>
                  <p className="text-lg mb-2" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                    {userProfile.email || userProfile.phone}
                  </p>
                  <p className="text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                    {t('memberSince')}: {formatDate(userProfile.createdAt)}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => router.push('/CreateTask')}
                  className="flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                  style={{ backgroundColor: '#FF5E14' }}
                >
                  <Plus className="h-5 w-5" />
                  {t('createTask')}
                </Button>
                <Button
                  onClick={() => router.push('/CreateTool')}
                  className="flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                  style={{ backgroundColor: '#28a745' }}
                >
                  <Plus className="h-5 w-5" />
                  {t('createTool')}
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="rounded-2xl shadow-lg p-6 text-center" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
              <div className="text-3xl font-bold mb-2" style={{ color: '#FF5E14' }}>{myListings.length}</div>
              <div className="text-lg" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>{t('totalListings')}</div>
            </div>
            <div className="rounded-2xl shadow-lg p-6 text-center" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
              <div className="text-3xl font-bold mb-2" style={{ color: '#28a745' }}>{myListings.filter(l => l.type === 'task').length}</div>
              <div className="text-lg" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>{t('totalTasks')}</div>
            </div>
            <div className="rounded-2xl shadow-lg p-6 text-center" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
              <div className="text-3xl font-bold mb-2" style={{ color: '#007bff' }}>{myListings.filter(l => l.type === 'tool').length}</div>
              <div className="text-lg" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>{t('totalTools')}</div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="rounded-2xl shadow-lg mb-8" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
            <div className="flex overflow-x-auto border-b" style={{ borderColor: theme === 'dark' ? '#2a2a2a' : '#e5e7eb' }}>
              {['profile', 'myListings', 'savedGigs', 'notifications'].map((tab) => (
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
                    {tab === 'profile' && <UserIcon className="h-5 w-5" />}
                    {tab === 'myListings' && <Edit3 className="h-5 w-5" />}
                    {tab === 'savedGigs' && <Bookmark className="h-5 w-5" />}
                    {tab === 'notifications' && (
                      <div className="relative">
                        <Bell className="h-5 w-5" />
                        {unreadCount > 0 && (
                          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {unreadCount > 9 ? '9+' : unreadCount}
                          </span>
                        )}
                      </div>
                    )}
                    {t(tab === 'myListings' ? 'myListings' : tab === 'savedGigs' ? 'savedGigs' : tab === 'notifications' ? 'notifications' : 'profileInformation')}
                  </div>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {/* Profile Information Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                      {t('profileInformation')}
                    </h2>
                    <div className="flex gap-3">
                      {editMode ? (
                        <>
                          <Button
                            onClick={handleProfileUpdate}
                            disabled={loading}
                            className="px-6 py-2 text-white font-semibold rounded-lg"
                            style={{ backgroundColor: '#28a745' }}
                          >
                            {loading ? t('loading') : t('save_changes')}
                          </Button>
                          <Button
                            onClick={() => setEditMode(false)}
                            className="px-6 py-2 font-semibold rounded-lg"
                            style={{ 
                              backgroundColor: 'transparent',
                              border: `1px solid ${theme === 'dark' ? '#444444' : '#d1d5db'}`,
                              color: theme === 'dark' ? '#CCCCCC' : '#6B7280'
                            }}
                          >
                            {t('cancel')}
                          </Button>
                        </>
                      ) : (
                        <Button
                          onClick={() => setEditMode(true)}
                          className="flex items-center gap-2 px-6 py-2 font-semibold rounded-lg"
                          style={{ 
                            backgroundColor: 'transparent',
                            border: `1px solid #FF5E14`,
                            color: '#FF5E14'
                          }}
                        >
                          <Edit3 className="h-4 w-4" />
                          {t('edit')}
                        </Button>
                      )}
                    </div>
                  </div>

                  {error && (
                    <div className="p-4 rounded-lg border-2 border-red-200 bg-red-50 text-red-700">
                      {error}
                    </div>
                  )}

                  {success && (
                    <div className="p-4 rounded-lg border-2 border-green-200 bg-green-50 text-green-700">
                      {success}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                        {t('firstName')}
                      </label>
                      {editMode ? (
                        <input
                          type="text"
                          value={userProfile.firstName}
                          onChange={(e) => setUserProfile(prev => ({ ...prev, firstName: e.target.value }))}
                          className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors"
                          style={{ 
                            borderColor: theme === 'dark' ? '#444444' : '#E2E8F0',
                            backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                            color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                          }}
                        />
                      ) : (
                        <div className="px-4 py-3 rounded-lg" style={{ backgroundColor: theme === 'dark' ? '#2a2a2a' : '#f9fafb', color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                          {userProfile.firstName}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                        {t('lastName')}
                      </label>
                      {editMode ? (
                        <input
                          type="text"
                          value={userProfile.lastName}
                          onChange={(e) => setUserProfile(prev => ({ ...prev, lastName: e.target.value }))}
                          className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors"
                          style={{ 
                            borderColor: theme === 'dark' ? '#444444' : '#E2E8F0',
                            backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                            color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                          }}
                        />
                      ) : (
                        <div className="px-4 py-3 rounded-lg" style={{ backgroundColor: theme === 'dark' ? '#2a2a2a' : '#f9fafb', color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                          {userProfile.lastName}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                        {t('email')}
                      </label>
                      <div className="px-4 py-3 rounded-lg" style={{ backgroundColor: theme === 'dark' ? '#2a2a2a' : '#f9fafb', color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                        {userProfile.email}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                        {t('phone')}
                      </label>
                      <div className="px-4 py-3 rounded-lg" style={{ backgroundColor: theme === 'dark' ? '#2a2a2a' : '#f9fafb', color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                        {userProfile.phone}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                        {t('language')}
                      </label>
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value as any)}
                        className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors"
                        style={{ 
                          borderColor: theme === 'dark' ? '#444444' : '#E2E8F0',
                          backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                          color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                        }}
                      >
                        <option value="en">{t('english')}</option>
                        <option value="si">{t('sinhala')}</option>
                        <option value="ta">{t('tamil')}</option>
                      </select>
                    </div>
                  </div>

                  {/* Sign Out Button */}
                  <div className="pt-6 border-t" style={{ borderColor: theme === 'dark' ? '#2a2a2a' : '#e5e7eb' }}>
                    <Button
                      onClick={handleSignOut}
                      className="flex items-center gap-2 px-6 py-3 font-semibold rounded-lg"
                      style={{ 
                        backgroundColor: '#dc3545',
                        color: '#FFFFFF'
                      }}
                    >
                      <LogOut className="h-5 w-5" />
                      {t('signOut')}
                    </Button>
                  </div>
                </div>
              )}

              {/* My Listings Tab */}
              {activeTab === 'myListings' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                      {t('myListings')} ({myListings.length})
                    </h2>
                    <div className="flex gap-3">
                      <Button
                        onClick={() => router.push('/CreateTask')}
                        className="flex items-center gap-2 px-6 py-2 text-white font-semibold rounded-lg"
                        style={{ backgroundColor: '#FF5E14' }}
                      >
                        <Plus className="h-4 w-4" />
                        {t('createTask')}
                      </Button>
                      <Button
                        onClick={() => router.push('/CreateTool')}
                        className="flex items-center gap-2 px-6 py-2 text-white font-semibold rounded-lg"
                        style={{ backgroundColor: '#28a745' }}
                      >
                        <Plus className="h-4 w-4" />
                        {t('createTool')}
                      </Button>
                    </div>
                  </div>

                  {myListings.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">📝</div>
                      <h3 className="text-xl font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                        No listings yet
                      </h3>
                      <p className="mb-6" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                        Start by creating your first task or tool listing
                      </p>
                      <div className="flex gap-3 justify-center">
                        <Button
                          onClick={() => router.push('/CreateTask')}
                          className="px-6 py-2 text-white font-semibold rounded-lg"
                          style={{ backgroundColor: '#FF5E14' }}
                        >
                          {t('createTask')}
                        </Button>
                        <Button
                          onClick={() => router.push('/CreateTool')}
                          className="px-6 py-2 text-white font-semibold rounded-lg"
                          style={{ backgroundColor: '#28a745' }}
                        >
                          {t('createTool')}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {myListings.map((listing) => (
                        <div
                          key={listing.id}
                          className="rounded-xl shadow-lg p-6 transition-transform duration-200 hover:scale-105"
                          style={{ backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF' }}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              listing.type === 'task' 
                                ? 'bg-orange-100 text-orange-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {t(listing.type)}
                            </span>
                            <div className="flex items-center gap-1">
                              {listing.status === 'active' ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              ) : (
                                <XCircle className="h-5 w-5 text-red-500" />
                              )}
                              <span className={`text-sm ${listing.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>
                                {t(listing.status)}
                              </span>
                            </div>
                          </div>
                          
                          <h3 className="text-lg font-bold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                            {listing.title}
                          </h3>
                          
                          <p className="text-sm mb-4 line-clamp-3" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                            {listing.description}
                          </p>
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                              <DollarSign className="h-4 w-4" />
                              {listing.price}
                            </div>
                            <div className="flex items-center gap-2 text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                              <MapPin className="h-4 w-4" />
                              {listing.location}
                            </div>
                            <div className="flex items-center gap-2 text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                              <Calendar className="h-4 w-4" />
                              {formatDate(listing.createdAt)}
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button
                              onClick={() => router.push(`/${listing.type}s/${listing.id}`)}
                              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg"
                              style={{ 
                                backgroundColor: 'transparent',
                                border: `1px solid #FF5E14`,
                                color: '#FF5E14'
                              }}
                            >
                              <Eye className="h-4 w-4" />
                              {t('view')}
                            </Button>
                            <Button
                              onClick={() => {
                                navigator.share({
                                  title: listing.title,
                                  text: listing.description,
                                  url: `${window.location.origin}/${listing.type}s/${listing.id}`
                                });
                              }}
                              className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg"
                              style={{ 
                                backgroundColor: 'transparent',
                                border: `1px solid ${theme === 'dark' ? '#444444' : '#d1d5db'}`,
                                color: theme === 'dark' ? '#CCCCCC' : '#6B7280'
                              }}
                            >
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Saved Gigs Tab */}
              {activeTab === 'savedGigs' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                    {t('savedGigs')} ({savedGigs.length})
                  </h2>

                  {savedGigs.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">🔖</div>
                      <h3 className="text-xl font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                        No saved gigs yet
                      </h3>
                      <p className="mb-6" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                        Browse tasks and tools to save items you're interested in
                      </p>
                      <div className="flex gap-3 justify-center">
                        <Button
                          onClick={() => router.push('/Tasks')}
                          className="px-6 py-2 text-white font-semibold rounded-lg"
                          style={{ backgroundColor: '#FF5E14' }}
                        >
                          Browse {t('tasks')}
                        </Button>
                        <Button
                          onClick={() => router.push('/Tools')}
                          className="px-6 py-2 text-white font-semibold rounded-lg"
                          style={{ backgroundColor: '#28a745' }}
                        >
                          Browse {t('tools')}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {savedGigs.map((gig) => (
                        <div
                          key={gig.id}
                          className="rounded-xl shadow-lg p-6 transition-transform duration-200 hover:scale-105"
                          style={{ backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF' }}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              gig.type === 'task' 
                                ? 'bg-orange-100 text-orange-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {t(gig.type)}
                            </span>
                            <Bookmark className="h-5 w-5 text-yellow-500 fill-current" />
                          </div>
                          
                          <h3 className="text-lg font-bold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                            {gig.title}
                          </h3>
                          
                          <p className="text-sm mb-4 line-clamp-3" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                            {gig.description}
                          </p>
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                              <DollarSign className="h-4 w-4" />
                              {gig.price}
                            </div>
                            <div className="flex items-center gap-2 text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                              <MapPin className="h-4 w-4" />
                              {gig.location}
                            </div>
                            <div className="flex items-center gap-2 text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                              <Clock className="h-4 w-4" />
                              Saved {formatTimeAgo(gig.savedAt)}
                            </div>
                          </div>
                          
                          <Button
                            onClick={() => router.push(`/${gig.type}s/${gig.id}`)}
                            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg"
                            style={{ 
                              backgroundColor: '#FF5E14',
                              color: '#FFFFFF'
                            }}
                          >
                            <Eye className="h-4 w-4" />
                            {t('view')}
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                      {t('notifications')} ({notifications.length})
                    </h2>
                    {unreadCount > 0 && (
                      <Button
                        onClick={markAllNotificationsAsRead}
                        className="px-4 py-2 text-sm font-semibold rounded-lg"
                        style={{ 
                          backgroundColor: 'transparent',
                          border: `1px solid #FF5E14`,
                          color: '#FF5E14'
                        }}
                      >
                        {t('markAllAsRead')}
                      </Button>
                    )}
                  </div>

                  {notifications.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">🔔</div>
                      <h3 className="text-xl font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                        No notifications yet
                      </h3>
                      <p style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                        We'll notify you about new opportunities and updates
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-6 rounded-xl border transition-all duration-200 ${
                            notification.isRead ? 'opacity-75' : 'ring-2 ring-orange-200'
                          }`}
                          style={{ 
                            backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                            borderColor: notification.isRead 
                              ? (theme === 'dark' ? '#444444' : '#e5e7eb')
                              : '#FF5E14'
                          }}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <div className={`w-3 h-3 rounded-full ${notification.isRead ? 'bg-gray-400' : 'bg-orange-500'}`}></div>
                                <h4 className="font-semibold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                                  {notification.title}
                                </h4>
                                <span className="text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                                  {formatTimeAgo(notification.createdAt)}
                                </span>
                              </div>
                              <p className="mb-3" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                                {notification.message}
                              </p>
                            </div>
                            {!notification.isRead && (
                              <Button
                                onClick={() => markNotificationAsRead(notification.id)}
                                className="ml-4 px-3 py-1 text-xs font-semibold rounded-lg"
                                style={{ 
                                  backgroundColor: 'transparent',
                                  border: `1px solid #FF5E14`,
                                  color: '#FF5E14'
                                }}
                              >
                                Mark Read
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
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
