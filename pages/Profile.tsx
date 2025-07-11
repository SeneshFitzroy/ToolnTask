
import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import Logo from '../src/components/Logo';
import { Button } from '../src/components/ui/button';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import { updateProfile, updatePassword, onAuthStateChanged, User } from 'firebase/auth';
import { doc, updateDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../src/lib/firebase';
import { Sun, Moon } from 'lucide-react';

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
        <div className="max-w-4xl mx-auto"
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl sm:text-3xl font-bold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>My Profile</span>
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
              <nav className="flex">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'profile'
                      ? 'border-orange-500 text-orange-500'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                  style={{ color: activeTab === 'profile' ? '#FF5E14' : (theme === 'dark' ? '#CCCCCC' : '#6B7280') }}
                >
                  Profile Information
                </button>
                <button
                  onClick={() => setActiveTab('password')}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'password'
                      ? 'border-orange-500 text-orange-500'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                  style={{ color: activeTab === 'password' ? '#FF5E14' : (theme === 'dark' ? '#CCCCCC' : '#6B7280') }}
                >
                  Change Password
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'settings'
                      ? 'border-orange-500 text-orange-500'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                  style={{ color: activeTab === 'settings' ? '#FF5E14' : (theme === 'dark' ? '#CCCCCC' : '#6B7280') }}
                >
                  Settings
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
                    <h3 className="text-lg font-semibold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
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
