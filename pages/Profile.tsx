import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import { Button } from '../src/components/ui/button';
import { auth, db } from '../src/lib/firebase';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { doc, getDoc, updateDoc, collection, query, where, getDocs, orderBy } from 'firebase/firestore';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  displayName: string;
  language: string;
  createdAt: Date | null;
  profileComplete: boolean;
}

interface UserListing {
  id: string;
  title: string;
  description: string;
  type: 'task' | 'tool';
  category: string;
  price: number;
  status: 'active' | 'inactive';
  createdAt: Date | null;
  views: number;
  saves: number;
}

export default function Profile() {
  const { theme } = useTheme();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userListings, setUserListings] = useState<UserListing[]>([]);
  const [savedGigs, setSavedGigs] = useState<UserListing[]>([]);
  const [activeTab, setActiveTab] = useState<'profile' | 'listings' | 'saved'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editProfile, setEditProfile] = useState<Partial<UserProfile>>({});
  const [mounted, setMounted] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        fetchUserProfile(user);
        fetchUserListings(user);
        fetchSavedGigs(user);
      }
    });

    return () => unsubscribe();
  }, []);

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const fetchUserProfile = async (currentUser: User) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      if (userDoc.exists()) {
        const data = userDoc.data() as UserProfile;
        setUserProfile(data);
        setEditProfile(data);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      showMessage('error', 'Failed to load profile information');
    }
  };

  const fetchUserListings = async (currentUser: User) => {
    try {
      const listingsQuery = query(
        collection(db, 'listings'),
        where('createdBy', '==', currentUser.uid),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(listingsQuery);
      const listings = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as UserListing[];
      setUserListings(listings);
    } catch (error) {
      console.error('Error fetching user listings:', error);
    }
  };

  const fetchSavedGigs = async (currentUser: User) => {
    try {
      const savedQuery = query(
        collection(db, 'savedGigs'),
        where('userId', '==', currentUser.uid),
        orderBy('savedAt', 'desc')
      );
      const snapshot = await getDocs(savedQuery);
      const savedIds = snapshot.docs.map(doc => doc.data().listingId);
      
      if (savedIds.length > 0) {
        const listingsQuery = query(
          collection(db, 'listings'),
          where('__name__', 'in', savedIds)
        );
        const listingsSnapshot = await getDocs(listingsQuery);
        const saved = listingsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as UserListing[];
        setSavedGigs(saved);
      }
    } catch (error) {
      console.error('Error fetching saved gigs:', error);
    }
  };

  const handleProfileUpdate = async () => {
    if (!user || !editProfile) return;
    
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        ...editProfile,
        updatedAt: new Date()
      });
      
      setUserProfile(prev => ({ ...prev, ...editProfile } as UserProfile));
      setIsEditing(false);
      showMessage('success', 'Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      showMessage('error', 'Failed to update profile');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      showMessage('success', 'Signed out successfully');
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
      showMessage('error', 'Failed to sign out');
    }
  };

  if (loading || !mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F2F3F5' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-lg" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    router.push('/SignIn');
    return null;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F2F3F5' }}>
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Message Display */}
        {message && (
          <div className={`mb-6 p-4 rounded-xl border-2 ${
            message.type === 'success' 
              ? 'bg-green-50 border-green-300 text-green-800' 
              : 'bg-red-50 border-red-300 text-red-800'
          }`}>
            {message.text}
          </div>
        )}

        {/* Profile Header */}
        <div className="rounded-3xl shadow-xl p-8 mb-8" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {userProfile?.firstName?.[0]}{userProfile?.lastName?.[0]}
              </span>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                {userProfile?.displayName || `${userProfile?.firstName} ${userProfile?.lastName}`}
              </h1>
              <p className="text-lg" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                {userProfile?.email}
              </p>
              <p className="text-sm mt-1" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                Member since {userProfile?.createdAt?.toLocaleDateString?.() || 'Recently'}
              </p>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => router.push('/CreateTool')} className="bg-orange-500 hover:bg-orange-600 text-white">
                Create Tool
              </Button>
              <Button onClick={() => router.push('/CreateTask')} className="bg-blue-500 hover:bg-blue-600 text-white">
                Create Task
              </Button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-4 mb-8">
          {[
            { key: 'profile', label: 'Profile Information', icon: '👤' },
            { key: 'listings', label: 'My Listings', icon: '📋' },
            { key: 'saved', label: 'Saved Gigs', icon: '❤️' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as 'profile' | 'listings' | 'saved')}
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

        {/* Profile Information Tab */}
        {activeTab === 'profile' && (
          <div className="rounded-3xl shadow-xl p-8" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                Profile Information
              </h2>
              <div className="flex gap-3">
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)} className="bg-blue-500 hover:bg-blue-600 text-white">
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button onClick={handleProfileUpdate} className="bg-green-500 hover:bg-green-600 text-white">
                      Save Changes
                    </Button>
                    <Button onClick={() => setIsEditing(false)} variant="outline">
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                    First Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editProfile.firstName || ''}
                      onChange={(e) => setEditProfile(prev => ({ ...prev, firstName: e.target.value }))}
                      className="w-full px-4 py-3 border-2 rounded-xl"
                      style={{
                        borderColor: theme === 'dark' ? '#444444' : '#E2E8F0',
                        backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                        color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                      }}
                    />
                  ) : (
                    <p className="text-lg" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                      {userProfile?.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                    Last Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editProfile.lastName || ''}
                      onChange={(e) => setEditProfile(prev => ({ ...prev, lastName: e.target.value }))}
                      className="w-full px-4 py-3 border-2 rounded-xl"
                      style={{
                        borderColor: theme === 'dark' ? '#444444' : '#E2E8F0',
                        backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                        color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                      }}
                    />
                  ) : (
                    <p className="text-lg" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                      {userProfile?.lastName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                    Language
                  </label>
                  {isEditing ? (
                    <select
                      value={editProfile.language || 'English'}
                      onChange={(e) => setEditProfile(prev => ({ ...prev, language: e.target.value }))}
                      className="w-full px-4 py-3 border-2 rounded-xl"
                      style={{
                        borderColor: theme === 'dark' ? '#444444' : '#E2E8F0',
                        backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                        color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                      }}
                    >
                      <option value="English">English</option>
                      <option value="Sinhala">සිංහල (Sinhala)</option>
                      <option value="Tamil">தமிழ் (Tamil)</option>
                    </select>
                  ) : (
                    <p className="text-lg" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                      {userProfile?.language || 'English'}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                    Email Address
                  </label>
                  <p className="text-lg" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                    {userProfile?.email}
                  </p>
                  <p className="text-sm text-gray-500">Email cannot be changed</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                    Phone Number
                  </label>
                  <p className="text-lg" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                    {userProfile?.phone || 'Not provided'}
                  </p>
                  <p className="text-sm text-gray-500">Phone number cannot be changed</p>
                </div>
              </div>
            </div>

            {/* Sign Out Button */}
            <div className="mt-8 pt-6 border-t" style={{ borderColor: theme === 'dark' ? '#444444' : '#E2E8F0' }}>
              <Button 
                onClick={handleSignOut}
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-3"
              >
                Sign Out
              </Button>
            </div>
          </div>
        )}

        {/* My Listings Tab */}
        {activeTab === 'listings' && (
          <div className="rounded-3xl shadow-xl p-8" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
            <h2 className="text-2xl font-bold mb-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
              My Listings ({userListings.length})
            </h2>
            
            {userListings.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                  No listings yet
                </h3>
                <p className="text-gray-500 mb-6">Start by creating your first tool or task</p>
                <div className="flex gap-4 justify-center">
                  <Button onClick={() => router.push('/CreateTool')} className="bg-orange-500 hover:bg-orange-600 text-white">
                    Create Tool
                  </Button>
                  <Button onClick={() => router.push('/CreateTask')} className="bg-blue-500 hover:bg-blue-600 text-white">
                    Create Task
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userListings.map(listing => (
                  <div key={listing.id} className="border rounded-xl p-6 hover:shadow-lg transition-all duration-300" style={{ borderColor: theme === 'dark' ? '#444444' : '#E2E8F0' }}>
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
                      {listing.description.substring(0, 100)}...
                    </p>
                    
                    <div className="flex justify-between items-center text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                      <span>👁️ {listing.views || 0} views</span>
                      <span>❤️ {listing.saves || 0} saves</span>
                      <span>${listing.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Saved Gigs Tab */}
        {activeTab === 'saved' && (
          <div className="rounded-3xl shadow-xl p-8" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
            <h2 className="text-2xl font-bold mb-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
              Saved Gigs ({savedGigs.length})
            </h2>
            
            {savedGigs.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">❤️</div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                  No saved gigs yet
                </h3>
                <p className="text-gray-500 mb-6">Browse tools and tasks to save your favorites</p>
                <div className="flex gap-4 justify-center">
                  <Button onClick={() => router.push('/Tools')} className="bg-orange-500 hover:bg-orange-600 text-white">
                    Browse Tools
                  </Button>
                  <Button onClick={() => router.push('/Tasks')} className="bg-blue-500 hover:bg-blue-600 text-white">
                    Browse Tasks
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedGigs.map(gig => (
                  <div key={gig.id} className="border rounded-xl p-6 hover:shadow-lg transition-all duration-300" style={{ borderColor: theme === 'dark' ? '#444444' : '#E2E8F0' }}>
                    <div className="flex justify-between items-start mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        gig.type === 'tool' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {gig.type.charAt(0).toUpperCase() + gig.type.slice(1)}
                      </span>
                    </div>
                    
                    <h3 className="font-bold text-lg mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                      {gig.title}
                    </h3>
                    
                    <p className="text-sm mb-4" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                      {gig.description.substring(0, 100)}...
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg text-orange-500">${gig.price}</span>
                      <Button 
                        onClick={() => router.push(`/${gig.type}s/${gig.id}`)}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}
import Footer from '../src/components/Footer';
import Logo from '../src/components/Logo';
import { Button } from '../src/components/ui/button';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import { updateProfile, updatePassword, onAuthStateChanged, User, signOut } from 'firebase/auth';
import { doc, updateDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../src/lib/firebase';
import { Sun, Moon, Bookmark, Settings, User as UserIcon, Key, MapPin, Clock, DollarSign, Bell, LogOut } from 'lucide-react';

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
}

interface Notification {
  id: string;
  type: 'gig_match' | 'request' | 'approval' | 'general';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  relatedGig?: string;
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
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [activeTab, setActiveTab] = useState('profile');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [mockNotifications, setMockNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'gig_match',
      title: 'New Task Match Found!',
      message: 'A construction task in Colombo matches your skills and location preferences.',
      timestamp: '2 hours ago',
      isRead: false,
      relatedGig: 'task_123'
    },
    {
      id: '2',
      type: 'request',
      title: 'Tool Rental Request',
      message: 'Someone has requested to rent your drill from Kandy.',
      timestamp: '1 day ago',
      isRead: false,
      relatedGig: 'tool_456'
    },
    {
      id: '3',
      type: 'approval',
      title: 'Task Application Approved',
      message: 'Your application for "Garden Cleaning in Galle" has been approved!',
      timestamp: '2 days ago',
      isRead: true,
      relatedGig: 'task_789'
    },
    {
      id: '4',
      type: 'general',
      title: 'Platform Update',
      message: 'New features have been added to improve your experience on ToolnTask.',
      timestamp: '1 week ago',
      isRead: true
    }
  ]);
  // Empty saved gigs array - will be populated when users save gigs
  const [savedGigs, setSavedGigs] = useState<SavedGig[]>([]);
  
  // Mock notifications for future implementation
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'gig_match',
      title: 'New Tool Match',
      message: 'A power drill matching your search criteria is now available in your area.',
      timestamp: '2025-01-14T10:30:00Z',
      isRead: false,
      relatedGig: 'tool_123'
    },
    {
      id: '2',
      type: 'request',
      title: 'Task Request',
      message: 'Someone has requested your house cleaning services.',
      timestamp: '2025-01-14T09:15:00Z',
      isRead: false,
      relatedGig: 'task_456'
    },
    {
      id: '3',
      type: 'approval',
      title: 'Listing Approved',
      message: 'Your tool listing has been approved and is now live.',
      timestamp: '2025-01-13T16:45:00Z',
      isRead: true,
      relatedGig: 'tool_789'
    }
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'si', name: 'සිංහල', flag: '🇱🇰' }
  ];
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchUserProfile(user);
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
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
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

    if (!user) return;

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

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!user) return;

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      setLoading(false);
      setTimeout(() => setError(''), 3000);
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      setTimeout(() => setError(''), 3000);
      return;
    }

    try {
      await updatePassword(user, passwordData.newPassword);
      setSuccess('Password updated successfully!');
      setPasswordData({
        newPassword: '',
        confirmPassword: ''
      });
      setTimeout(() => setSuccess(''), 3000);
    } catch (error: unknown) {
      console.error('Error updating password:', error);
      const errorMessage = error instanceof Error ? error.message : 'An error occurred while updating password';
      setError(errorMessage);
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

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
                  onClick={() => setActiveTab('password')}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === 'password'
                      ? 'border-orange-500 text-orange-500'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                  style={{ color: activeTab === 'password' ? '#FF5E14' : (theme === 'dark' ? '#CCCCCC' : '#6B7280') }}
                >
                  <Key className="h-4 w-4" />
                  Change Password
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

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-8 py-3 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: loading ? '#9CA3AF' : '#FF5E14' }}
                  >
                    {loading ? 'Updating...' : 'Update Profile'}
                  </Button>
                </form>
              )}

              {activeTab === 'password' && (
                <form onSubmit={handlePasswordUpdate} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors"
                      style={{ 
                        borderColor: theme === 'dark' ? '#444444' : '#E2E8F0',
                        backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                        color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#FF5E14'}
                      onBlur={(e) => e.currentTarget.style.borderColor = theme === 'dark' ? '#444444' : '#E2E8F0'}
                      placeholder="Enter new password"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors"
                      style={{ 
                        borderColor: theme === 'dark' ? '#444444' : '#E2E8F0',
                        backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                        color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#FF5E14'}
                      onBlur={(e) => e.currentTarget.style.borderColor = theme === 'dark' ? '#444444' : '#E2E8F0'}
                      placeholder="Confirm new password"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-8 py-3 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: loading ? '#9CA3AF' : '#FF5E14' }}
                  >
                    {loading ? 'Updating...' : 'Update Password'}
                  </Button>
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

                  <div>
                    <h3 className="text-lg font-semibold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                      Language Settings
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-3" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                          Select Language
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
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

                  {/* Account Management Section */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                      Account Management
                    </h3>
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg border" style={{ 
                        backgroundColor: theme === 'dark' ? '#1f1f1f' : '#F9FAFB',
                        borderColor: theme === 'dark' ? '#444444' : '#E5E7EB'
                      }}>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                              Sign Out
                            </h4>
                            <p className="text-sm mt-1" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                              Sign out of your account securely
                            </p>
                          </div>
                          <button
                            onClick={handleSignOut}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
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
                      </div>
                      <div className="pt-4 border-t" style={{ borderColor: theme === 'dark' ? '#444444' : '#E5E7EB' }}>
                        <p className="text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                          After signing out, you&apos;ll need to log in again to access your account.
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
                                onClick={() => setSavedGigs(prev => prev.filter(g => g.id !== gig.id))}
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

                  {/* Sample Notifications */}
                  <div className="space-y-4">
                    {mockNotifications.map((notification) => (
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
                                {notification.timestamp}
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
                                onClick={() => setMockNotifications(prev => 
                                  prev.map(n => n.id === notification.id ? { ...n, isRead: true } : n)
                                )}
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
                    ))}
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
