import Navigation from '../src/components/Navigation';
imp  //   // Simplified language options: English, Sinhala, Tamil only
  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'si', name: 'සිංහල', flag: '🇱🇰' },
    { code: 'ta', name: 'தமிழ்', flag: '🇱🇰' }
  ];fied language options: English, Sinhala, Tamil only
  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'si', name: 'සිංහල', flag: '🇱🇰' },
    { code: 'ta', name: 'தமிழ்', flag: '🇱🇰' }
  ];oter from '../src/components/Footer';
import Logo from '../src/components/Logo';
import { Button } from '../src/components/ui/button';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import { updateProfile, onAuthStateChanged, User, signOut } from 'firebase/auth';
import { doc, updateDoc, getDoc, collection, query, where, getDocs, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../src/lib/firebase';
import { Sun, Moon, Bookmark, Settings, User as UserIcon, MapPin, Clock, DollarSign, Bell, LogOut } from 'lucide-react';

interface SavedGig {
  id: string;
  title: string;
  type: 'tool' | 'task';
  price: string;
  location: string;
  savedAt: string;
  description?: string;
  postedBy?: string;
  status?: 'available' | 'requested';
  originalGigId?: string;
}

interface Notification {
  id: string;
  type: 'gig_match' | 'request' | 'approval' | 'general';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  relatedGig?: string;
  userId: string;
}

export default function Profile() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    displayName: '',
    createdAt: null,
    isActive: true,
    role: 'user'
  });
  const [activeTab, setActiveTab] = useState('profile');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [savedGigs, setSavedGigs] = useState<SavedGig[]>([]);
  
  // Simplified language options: English, Sinhala, Tamil only
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'si', name: 'සිංහල', flag: '��' },
    { code: 'ta', name: 'தமிழ்', flag: '🇱🇰' }
  ];
  
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchUserProfile(user);
        fetchSavedGigs(user.uid);
        fetchNotifications(user.uid);
      } else {
        router.push('/SignIn');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const fetchUserProfile = async (user: User) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserProfile({
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          email: userData.email || user.email || '',
          phone: userData.phone || '',
          displayName: userData.displayName || user.displayName || '',
          createdAt: userData.createdAt,
          isActive: userData.isActive || true,
          role: userData.role || 'user'
        });
        // Load saved language preference
        if (userData.preferredLanguage) {
          setSelectedLanguage(userData.preferredLanguage);
        }
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchSavedGigs = async (userId: string) => {
    try {
      const savedGigsRef = collection(db, 'savedGigs');
      const q = query(savedGigsRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      
      const gigsData: SavedGig[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        gigsData.push({
          id: doc.id,
          title: data.title,
          type: data.type,
          price: data.price,
          location: data.location,
          savedAt: data.savedAt,
          description: data.description,
          postedBy: data.postedBy,
          status: data.status || 'available',
          originalGigId: data.originalGigId
        });
      });
      
      setSavedGigs(gigsData);
    } catch (error) {
      console.error('Error fetching saved gigs:', error);
    }
  };

  const fetchNotifications = async (userId: string) => {
    try {
      const notificationsRef = collection(db, 'notifications');
      const q = query(notificationsRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      
      const notificationsData: Notification[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        notificationsData.push({
          id: doc.id,
          type: data.type,
          title: data.title,
          message: data.message,
          timestamp: data.timestamp,
          isRead: data.isRead || false,
          relatedGig: data.relatedGig,
          userId: data.userId
        });
      });
      
      // Sort by timestamp (newest first)
      notificationsData.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setNotifications(notificationsData);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('User signed out successfully');
      // Redirect will happen automatically due to auth state change
    } catch (error) {
      console.error('Error signing out:', error);
      setError('Failed to sign out. Please try again.');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!user) {
      setLoading(false);
      return;
    }

    try {
      // Update Firebase Auth profile
      await updateProfile(user, {
        displayName: `${userProfile.firstName} ${userProfile.lastName}`
      });

      // Update Firestore document
      await updateDoc(doc(db, 'users', user.uid), {
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        phone: userProfile.phone,
        displayName: `${userProfile.firstName} ${userProfile.lastName}`,
        preferredLanguage: selectedLanguage,
        updatedAt: serverTimestamp()
      });

      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error: unknown) {
      console.error('Error updating profile:', error);
      const errorMessage = error instanceof Error ? error.message : 'An error occurred while updating profile';
      setError(errorMessage);
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const removeSavedGig = async (gigId: string) => {
    try {
      await deleteDoc(doc(db, 'savedGigs', gigId));
      setSavedGigs(prev => prev.filter(g => g.id !== gigId));
      setSuccess('Saved gig removed successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error removing saved gig:', error);
      setError('Failed to remove saved gig. Please try again.');
      setTimeout(() => setError(''), 3000);
    }
  };

  const markNotificationAsRead = async (notificationId: string) => {
    try {
      await updateDoc(doc(db, 'notifications', notificationId), {
        isRead: true,
        updatedAt: serverTimestamp()
      });
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  if (!mounted) {
    return null;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F2F3F5' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F2F3F5' }}>
      <Navigation />
      
      <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl sm:text-3xl font-bold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>My Profile</span>
              <Logo size="large" />
            </div>
            <p style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
              Manage your account settings and preferences
            </p>
          </div>

          {/* Profile Card */}
          <div className="rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
            
            {/* Profile Header */}
            <div className="p-6 sm:p-8 border-b" style={{ borderColor: theme === 'dark' ? '#444444' : '#E5E7EB' }}>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl font-bold" style={{ backgroundColor: '#FF5E14' }}>
                  {userProfile.firstName ? userProfile.firstName.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                    {userProfile.displayName || user?.displayName || 'User'}
                  </h2>
                  <p style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                    {userProfile.email || user?.email}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                      {userProfile.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-b" style={{ borderColor: theme === 'dark' ? '#374151' : '#E5E7EB' }}>
              <nav className="flex overflow-x-auto">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === 'profile'
                      ? 'border-orange-500 text-orange-500'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                  style={{ color: activeTab === 'profile' ? '#FF5E14' : (theme === 'dark' ? '#CCCCCC' : '#6B7280') }}
                >
                  <UserIcon className="h-4 w-4" />
                  Profile Information
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === 'settings'
                      ? 'border-orange-500 text-orange-500'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                  style={{ color: activeTab === 'settings' ? '#FF5E14' : (theme === 'dark' ? '#CCCCCC' : '#6B7280') }}
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </button>
                <button
                  onClick={() => setActiveTab('saved')}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === 'saved'
                      ? 'border-orange-500 text-orange-500'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                  style={{ color: activeTab === 'saved' ? '#FF5E14' : (theme === 'dark' ? '#CCCCCC' : '#6B7280') }}
                >
                  <Bookmark className="h-4 w-4" />
                  Saved Gigs
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === 'notifications'
                      ? 'border-orange-500 text-orange-500'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                  style={{ color: activeTab === 'notifications' ? '#FF5E14' : (theme === 'dark' ? '#CCCCCC' : '#6B7280') }}
                >
                  <Bell className="h-4 w-4" />
                  Notifications
                  {notifications.filter(n => !n.isRead).length > 0 && (
                    <span className="ml-1 px-2 py-1 text-xs rounded-full bg-orange-500 text-white">
                      {notifications.filter(n => !n.isRead).length}
                    </span>
                  )}
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6 sm:p-8">
              {success && (
                <div className="mb-6 p-4 rounded-lg text-sm" style={{ backgroundColor: '#DEF7EC', color: '#03543F' }}>
                  {success}
                </div>
              )}
              {error && (
                <div className="mb-6 p-4 rounded-lg text-sm" style={{ backgroundColor: '#FEE2E2', color: '#DC2626' }}>
                  {error}
                </div>
              )}

              {activeTab === 'profile' && (
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={userProfile.firstName}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors"
                        style={{ 
                          borderColor: theme === 'dark' ? '#444444' : '#E2E8F0',
                          backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                          color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                        }}
                        onFocus={(e) => e.currentTarget.style.borderColor = '#FF5E14'}
                        onBlur={(e) => e.currentTarget.style.borderColor = theme === 'dark' ? '#444444' : '#E2E8F0'}
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={userProfile.lastName}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors"
                        style={{ 
                          borderColor: theme === 'dark' ? '#444444' : '#E2E8F0',
                          backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                          color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                        }}
                        onFocus={(e) => e.currentTarget.style.borderColor = '#FF5E14'}
                        onBlur={(e) => e.currentTarget.style.borderColor = theme === 'dark' ? '#4B5563' : '#E2E8F0'}
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={userProfile.email}
                      className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors opacity-50 cursor-not-allowed"
                      style={{ 
                        borderColor: theme === 'dark' ? '#444444' : '#E2E8F0',
                        backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                        color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                      }}
                      disabled
                    />
                    <p className="text-xs mt-1" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                      Email cannot be changed
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={userProfile.phone}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors"
                      style={{ 
                        borderColor: theme === 'dark' ? '#444444' : '#E2E8F0',
                        backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                        color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#FF5E14'}
                      onBlur={(e) => e.currentTarget.style.borderColor = theme === 'dark' ? '#444444' : '#E2E8F0'}
                      placeholder="+94 71 234 5678"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                        Account Status
                      </label>
                      <div className="flex items-center gap-2 px-4 py-3 border-2 rounded-xl" style={{ 
                        borderColor: theme === 'dark' ? '#444444' : '#E2E8F0',
                        backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF'
                      }}>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                          {userProfile.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                        Account Role
                      </label>
                      <div className="px-4 py-3 border-2 rounded-xl" style={{ 
                        borderColor: theme === 'dark' ? '#444444' : '#E2E8F0',
                        backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                        color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                      }}>
                        {userProfile.role.charAt(0).toUpperCase() + userProfile.role.slice(1)}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="px-8 py-3 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ backgroundColor: loading ? '#9CA3AF' : '#FF5E14' }}
                    >
                      {loading ? 'Updating...' : 'Update Profile'}
                    </Button>
                    
                    {/* Sign Out Button */}
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105"
                      style={{ 
                        backgroundColor: '#dc2626',
                        color: '#FFFFFF',
                        border: 'none'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#b91c1c';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#dc2626';
                      }}
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </form>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                      Theme Settings
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-3" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                          Appearance
                        </label>
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => setTheme('light')}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                              theme === 'light' ? 'ring-2 ring-orange-500' : ''
                            }`}
                            style={{ 
                              backgroundColor: theme === 'light' ? '#FFF7ED' : (theme === 'dark' ? '#2a2a2a' : '#FFFFFF'),
                              borderColor: theme === 'light' ? '#FF5E14' : (theme === 'dark' ? '#444444' : '#E2E8F0'),
                              color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                            }}
                          >
                            <Sun className="h-5 w-5" style={{ color: '#FF5E14' }} />
                            <span className="font-medium">Light Mode</span>
                          </button>
                          <button
                            onClick={() => setTheme('dark')}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                              theme === 'dark' ? 'ring-2 ring-orange-500' : ''
                            }`}
                            style={{ 
                              backgroundColor: theme === 'dark' ? '#2a2a2a' : (theme === 'light' ? '#F9FAFB' : '#FFFFFF'),
                              borderColor: theme === 'dark' ? '#FF5E14' : (theme === 'light' ? '#444444' : '#E2E8F0'),
                              color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                            }}
                          >
                            <Moon className="h-5 w-5" style={{ color: '#FF5E14' }} />
                            <span className="font-medium">Dark Mode</span>
                          </button>
                        </div>
                      </div>
                      <div className="pt-4 border-t" style={{ borderColor: theme === 'dark' ? '#444444' : '#E5E7EB' }}>
                        <p className="text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                          Choose your preferred theme for the best experience. Your selection will be saved automatically.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Language Settings Section */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                      Language Settings
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-3" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                          Select Language
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {languages.map((language) => (
                            <button
                              key={language.code}
                              onClick={() => setSelectedLanguage(language.code)}
                              className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                                selectedLanguage === language.code ? 'ring-2 ring-orange-500' : ''
                              }`}
                              style={{ 
                                backgroundColor: selectedLanguage === language.code ? '#FFF7ED' : (theme === 'dark' ? '#2a2a2a' : '#FFFFFF'),
                                borderColor: selectedLanguage === language.code ? '#FF5E14' : (theme === 'dark' ? '#444444' : '#E2E8F0'),
                                color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                              }}
                            >
                              <span className="text-lg">{language.flag}</span>
                              <span className="font-medium text-sm">{language.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="pt-4 border-t" style={{ borderColor: theme === 'dark' ? '#444444' : '#E5E7EB' }}>
                        <p className="text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                          Choose your preferred language for the interface. Changes will be applied immediately.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Saved Gigs Tab */}
              {activeTab === 'saved' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                      Saved Gigs
                    </h3>
                    <p className="text-sm mb-6" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                      View and manage your saved tools and tasks. You can remove items or contact the posters directly.
                    </p>
                  </div>

                  {savedGigs.length === 0 ? (
                    <div className="text-center py-12">
                      <Bookmark className="h-12 w-12 mx-auto mb-4" style={{ color: theme === 'dark' ? '#666666' : '#9CA3AF' }} />
                      <p className="text-lg font-medium mb-2" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                        No saved gigs yet
                      </p>
                      <p className="text-sm" style={{ color: theme === 'dark' ? '#999999' : '#9CA3AF' }}>
                        Start browsing tools and tasks to save your favorites here.
                      </p>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {savedGigs.map((gig) => (
                        <div key={gig.id} className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
                          gig.status === 'requested' ? 'opacity-75' : ''
                        }`} style={{
                          backgroundColor: gig.status === 'requested' 
                            ? (theme === 'dark' ? '#2a2426' : '#fef7f0') 
                            : (theme === 'dark' ? '#2a2a2a' : '#FFFFFF'),
                          borderColor: gig.status === 'requested' 
                            ? (theme === 'dark' ? '#6b5b47' : '#f59e0b') 
                            : (theme === 'dark' ? '#444444' : '#E2E8F0'),
                          borderWidth: gig.status === 'requested' ? '2px' : '1px'
                        }}>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className={`text-lg font-semibold ${
                                  gig.status === 'requested' ? 'opacity-80' : ''
                                }`} style={{ 
                                  color: gig.status === 'requested' 
                                    ? (theme === 'dark' ? '#d69e2e' : '#92400e') 
                                    : (theme === 'dark' ? '#FFFFFF' : '#1E293B') 
                                }}>
                                  {gig.title}
                                  {gig.status === 'requested' && (
                                    <span className="ml-2 text-sm font-normal opacity-75">
                                      (Temporarily Unavailable)
                                    </span>
                                  )}
                                </h4>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  gig.type === 'tool' 
                                    ? (gig.status === 'requested' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800')
                                    : (gig.status === 'requested' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800')
                                }`}>
                                  {gig.type}
                                </span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  gig.status === 'available' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-orange-100 text-orange-800'
                                }`}>
                                  {gig.status === 'available' ? 'Available' : 'Unavailable'}
                                </span>
                              </div>
                              
                              {gig.description && (
                                <p className="text-sm mb-3" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                                  {gig.description}
                                </p>
                              )}
                              
                              <div className="flex items-center gap-4 text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                                <div className="flex items-center gap-1">
                                  <DollarSign className="h-4 w-4" />
                                  <span>{gig.price}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  <span>{gig.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  <span>Saved {gig.savedAt}</span>
                                </div>
                              </div>
                              
                              {gig.postedBy && (
                                <div className="mt-2 text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                                  Posted by {gig.postedBy}
                                </div>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => removeSavedGig(gig.id)}
                                className="px-3 py-1 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                                style={{ backgroundColor: theme === 'dark' ? '#3a1f1f' : '#FEF2F2' }}
                              >
                                Remove
                              </button>
                              <button
                                disabled={gig.status === 'requested'}
                                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                                  gig.status === 'requested' 
                                    ? 'opacity-50 cursor-not-allowed' 
                                    : 'hover:opacity-90'
                                }`}
                                style={{ 
                                  backgroundColor: gig.status === 'requested' ? '#9CA3AF' : '#FF5E14',
                                  color: '#FFFFFF'
                                }}
                                title={gig.status === 'requested' ? 'This gig is temporarily unavailable' : 'Contact the poster'}
                              >
                                {gig.status === 'requested' ? 'Unavailable' : 'Contact'}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                      Notifications
                    </h3>
                    <p className="text-sm mb-6" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                      Stay updated with task matches, requests, and important announcements.
                    </p>
                  </div>

                  {/* Real Notifications */}
                  <div className="space-y-4">
                    {notifications.length === 0 ? (
                      <div className="text-center py-12">
                        <Bell className="h-12 w-12 mx-auto mb-4" style={{ color: theme === 'dark' ? '#666666' : '#9CA3AF' }} />
                        <p className="text-lg font-medium mb-2" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                          No notifications yet
                        </p>
                        <p className="text-sm" style={{ color: theme === 'dark' ? '#999999' : '#9CA3AF' }}>
                          You&apos;ll see notifications here when you have new activity.
                        </p>
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 rounded-lg border transition-colors ${
                            notification.isRead ? 'opacity-75' : ''
                          }`}
                          style={{ 
                            backgroundColor: theme === 'dark' ? '#262626' : '#F9FAFB',
                            borderColor: theme === 'dark' ? '#444444' : '#E5E7EB'
                          }}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                                  {notification.title}
                                </h4>
                                {!notification.isRead && (
                                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                                )}
                              </div>
                              <p className="text-sm mb-2" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                                {notification.message}
                              </p>
                              <div className="flex items-center gap-4 text-xs" style={{ color: theme === 'dark' ? '#9CA3AF' : '#9CA3AF' }}>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {new Date(notification.timestamp).toLocaleDateString()} {new Date(notification.timestamp).toLocaleTimeString()}
                                </span>
                                <span className="capitalize px-2 py-1 rounded-full text-xs" style={{ 
                                  backgroundColor: notification.type === 'gig_match' ? '#DEF7EC' : '#EBF4FF',
                                  color: notification.type === 'gig_match' ? '#03543F' : '#1E40AF'
                                }}>
                                  {notification.type.replace('_', ' ')}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                              {!notification.isRead && (
                                <button
                                  onClick={() => markNotificationAsRead(notification.id)}
                                  className="px-3 py-1 rounded-lg text-sm font-medium transition-colors"
                                  style={{ 
                                    backgroundColor: '#FF5E14',
                                    color: '#FFFFFF'
                                  }}
                                >
                                  Mark Read
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Notification Settings */}
                  <div className="pt-6 border-t" style={{ borderColor: theme === 'dark' ? '#444444' : '#E5E7EB' }}>
                    <h4 className="font-semibold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                      Notification Settings
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                            Task Matches
                          </p>
                          <p className="text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                            Get notified when new tasks match your profile
                          </p>
                        </div>
                        <input type="checkbox" defaultChecked className="toggle" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                            Tool Requests
                          </p>
                          <p className="text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                            Receive notifications for tool rental requests
                          </p>
                        </div>
                        <input type="checkbox" defaultChecked className="toggle" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                            General Updates
                          </p>
                          <p className="text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                            Platform updates and important announcements
                          </p>
                        </div>
                        <input type="checkbox" defaultChecked className="toggle" />
                      </div>
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
