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

export default function ProfileNew() {
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
