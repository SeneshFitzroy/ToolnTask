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
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        await fetchUserProfile(user);
        await fetchUserListings(user);
        await fetchSavedGigs(user);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserProfile = async (currentUser: User) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        const profile: UserProfile = {
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || currentUser.email || '',
          phone: data.phone || '',
          displayName: data.displayName || currentUser.displayName || '',
          language: data.language || 'English',
          createdAt: data.createdAt?.toDate() || null,
          profileComplete: data.profileComplete || false
        };
        setUserProfile(profile);
        setEditProfile(profile);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchUserListings = async (currentUser: User) => {
    try {
      const listingsQuery = query(
        collection(db, 'listings'),
        where('createdBy', '==', currentUser.uid),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(listingsQuery);
      const listings: UserListing[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        listings.push({
          id: doc.id,
          title: data.title,
          description: data.description,
          type: data.type,
          category: data.category,
          price: data.price,
          status: data.status || 'active',
          createdAt: data.createdAt?.toDate() || null,
          views: data.views || 0,
          saves: data.saves || 0
        });
      });
      
      setUserListings(listings);
    } catch (error) {
      console.error('Error fetching user listings:', error);
    }
  };

  const fetchSavedGigs = async (currentUser: User) => {
    try {
      // For now, return empty array. In a real app, you'd fetch from a savedGigs collection
      console.log('Fetching saved gigs for user:', currentUser.uid);
      setSavedGigs([]);
    } catch (error) {
      console.error('Error fetching saved gigs:', error);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleSaveProfile = async () => {
    if (!user || !userProfile) return;

    try {
      await updateDoc(doc(db, 'users', user.uid), {
        ...editProfile,
        updatedAt: new Date()
      });
      
      setUserProfile({ ...userProfile, ...editProfile });
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
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
      showMessage('error', 'Failed to sign out');
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'Unknown';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading || !mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F2F3F5' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F2F3F5' }}>
        <div className="max-w-md mx-auto p-8 rounded-3xl shadow-xl text-center" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
          <h1 className="text-2xl font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
            Please Sign In
          </h1>
          <p className="mb-6" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
            You need to be signed in to view your profile.
          </p>
          <Button onClick={() => router.push('/SignIn')} className="bg-blue-500 hover:bg-blue-600 text-white">
            Sign In
          </Button>
        </div>
      </div>
    );
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

        {/* Header */}
        <div className="rounded-3xl shadow-xl p-8 mb-8" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                👤 My Profile
              </h1>
              <p className="text-lg" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                Manage your account and listings
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                Member since {formatDate(userProfile?.createdAt || null)}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="rounded-3xl shadow-xl mb-8" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
          <div className="flex border-b" style={{ borderColor: theme === 'dark' ? '#444444' : '#E2E8F0' }}>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-8 py-4 font-semibold rounded-tl-3xl ${
                activeTab === 'profile'
                  ? 'bg-blue-500 text-white'
                  : theme === 'dark'
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Profile Information
            </button>
            <button
              onClick={() => setActiveTab('listings')}
              className={`px-8 py-4 font-semibold ${
                activeTab === 'listings'
                  ? 'bg-blue-500 text-white'
                  : theme === 'dark'
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              My Listings ({userListings.length})
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`px-8 py-4 font-semibold rounded-tr-3xl ${
                activeTab === 'saved'
                  ? 'bg-blue-500 text-white'
                  : theme === 'dark'
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Saved Gigs ({savedGigs.length})
            </button>
          </div>
        </div>

        {/* Profile Information Tab */}
        {activeTab === 'profile' && (
          <div className="rounded-3xl shadow-xl p-8" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                Profile Information
              </h2>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant="outline"
                className="px-6 py-2"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </Button>
            </div>

            {isEditing ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                      First Name
                    </label>
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
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                      Last Name
                    </label>
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
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={editProfile.phone || ''}
                      onChange={(e) => setEditProfile(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-3 border-2 rounded-xl"
                      style={{
                        borderColor: theme === 'dark' ? '#444444' : '#E2E8F0',
                        backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                        color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                      Language
                    </label>
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
                  </div>
                </div>
                <div>
                  <Button
                    onClick={handleSaveProfile}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 mr-4"
                  >
                    Save Changes
                  </Button>
                  <Button
                    onClick={() => setIsEditing(false)}
                    variant="outline"
                    className="px-8 py-3"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                      Full Name
                    </label>
                    <p className="text-lg" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                      {userProfile?.firstName} {userProfile?.lastName}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                      Language
                    </label>
                    <p className="text-lg" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                      {userProfile?.language || 'English'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  </div>
                </div>
              </div>
            )}

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
                {userListings.map((listing) => (
                  <div
                    key={listing.id}
                    className="border-2 rounded-xl p-6 cursor-pointer transition-all hover:shadow-lg"
                    style={{
                      borderColor: theme === 'dark' ? '#444444' : '#E2E8F0',
                      backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF'
                    }}
                    onClick={() => router.push(`/${listing.type}s/${listing.id}`)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        listing.type === 'tool' 
                          ? 'bg-orange-100 text-orange-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {listing.type === 'tool' ? '🔧 Tool' : '📋 Task'}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        listing.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {listing.status}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                      {listing.title}
                    </h3>
                    <p className="text-sm mb-4 line-clamp-2" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                      {listing.description}
                    </p>
                    <div className="flex items-center justify-between text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                      <span className="font-semibold text-lg text-green-600">
                        LKR {listing.price.toLocaleString()}
                      </span>
                      <div className="flex gap-4">
                        <span>👁️ {listing.views}</span>
                        <span>❤️ {listing.saves}</span>
                      </div>
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
            
            <div className="text-center py-12">
              <div className="text-6xl mb-4">💾</div>
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
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}
