
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

export default function Profile() {
  const { theme } = useTheme();
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
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: theme === 'dark' ? '#0C0F16' : '#F2F3F5' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme === 'dark' ? '#0C0F16' : '#F2F3F5' }}>
      <Navigation />
      
      <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl sm:text-3xl font-bold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>My Profile</span>
              <Logo size="large" />
            </div>
            <p style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
              Manage your account settings and preferences
            </p>
          </div>

          {/* Profile Card */}
          <div className="rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
            
            {/* Profile Header */}
            <div className="p-6 sm:p-8 border-b" style={{ borderColor: theme === 'dark' ? '#374151' : '#E5E7EB' }}>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl font-bold" style={{ backgroundColor: '#FF5E14' }}>
                  {userProfile.firstName ? userProfile.firstName.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                    {userProfile.displayName || user?.displayName || 'User'}
                  </h2>
                  <p style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                    {userProfile.email || user?.email}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
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
                  style={{ color: activeTab === 'profile' ? '#FF5E14' : (theme === 'dark' ? '#B3B5BC' : '#6B7280') }}
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
                  style={{ color: activeTab === 'password' ? '#FF5E14' : (theme === 'dark' ? '#B3B5BC' : '#6B7280') }}
                >
                  Change Password
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
                      <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#B3B5BC' : '#374151' }}>
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={userProfile.firstName}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors"
                        style={{ 
                          borderColor: theme === 'dark' ? '#4B5563' : '#E2E8F0',
                          backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF',
                          color: theme === 'dark' ? '#FFFFFF' : '#1A1818'
                        }}
                        onFocus={(e) => e.currentTarget.style.borderColor = '#FF5E14'}
                        onBlur={(e) => e.currentTarget.style.borderColor = theme === 'dark' ? '#4B5563' : '#E2E8F0'}
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#B3B5BC' : '#374151' }}>
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={userProfile.lastName}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors"
                        style={{ 
                          borderColor: theme === 'dark' ? '#4B5563' : '#E2E8F0',
                          backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF',
                          color: theme === 'dark' ? '#FFFFFF' : '#1A1818'
                        }}
                        onFocus={(e) => e.currentTarget.style.borderColor = '#FF5E14'}
                        onBlur={(e) => e.currentTarget.style.borderColor = theme === 'dark' ? '#4B5563' : '#E2E8F0'}
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#B3B5BC' : '#374151' }}>
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={userProfile.email}
                      className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors opacity-50 cursor-not-allowed"
                      style={{ 
                        borderColor: theme === 'dark' ? '#4B5563' : '#E2E8F0',
                        backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF',
                        color: theme === 'dark' ? '#FFFFFF' : '#1A1818'
                      }}
                      disabled
                    />
                    <p className="text-xs mt-1" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                      Email cannot be changed
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#B3B5BC' : '#374151' }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={userProfile.phone}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors"
                      style={{ 
                        borderColor: theme === 'dark' ? '#4B5563' : '#E2E8F0',
                        backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF',
                        color: theme === 'dark' ? '#FFFFFF' : '#1A1818'
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#FF5E14'}
                      onBlur={(e) => e.currentTarget.style.borderColor = theme === 'dark' ? '#4B5563' : '#E2E8F0'}
                      placeholder="+94 71 234 5678"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#B3B5BC' : '#374151' }}>
                        Account Status
                      </label>
                      <div className="flex items-center gap-2 px-4 py-3 border-2 rounded-xl" style={{ 
                        borderColor: theme === 'dark' ? '#4B5563' : '#E2E8F0',
                        backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF'
                      }}>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                          {userProfile.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#B3B5BC' : '#374151' }}>
                        Account Role
                      </label>
                      <div className="px-4 py-3 border-2 rounded-xl" style={{ 
                        borderColor: theme === 'dark' ? '#4B5563' : '#E2E8F0',
                        backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF',
                        color: theme === 'dark' ? '#FFFFFF' : '#1A1818'
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
                    <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#B3B5BC' : '#374151' }}>
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors"
                      style={{ 
                        borderColor: theme === 'dark' ? '#4B5563' : '#E2E8F0',
                        backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF',
                        color: theme === 'dark' ? '#FFFFFF' : '#1A1818'
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#FF5E14'}
                      onBlur={(e) => e.currentTarget.style.borderColor = theme === 'dark' ? '#4B5563' : '#E2E8F0'}
                      placeholder="Enter new password"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#B3B5BC' : '#374151' }}>
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors"
                      style={{ 
                        borderColor: theme === 'dark' ? '#4B5563' : '#E2E8F0',
                        backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF',
                        color: theme === 'dark' ? '#FFFFFF' : '#1A1818'
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#FF5E14'}
                      onBlur={(e) => e.currentTarget.style.borderColor = theme === 'dark' ? '#4B5563' : '#E2E8F0'}
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
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme === 'dark' ? '#0C0F16' : '#F2F3F5' }}>
      <Navigation />
      
      <div className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
            {/* Profile Header */}
            <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12" style={{ background: 'linear-gradient(135deg, #001554 0%, #031C56 100%)' }}>
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FF5E14' }}>
                  <span className="text-white text-xl sm:text-2xl lg:text-3xl font-bold">JS</span>
                </div>
                <div className="text-white text-center sm:text-left">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">John Silva</h1>
                  <p style={{ color: '#FF5E14' }}>Member since January 2024</p>
                  <div className="flex items-center justify-center sm:justify-start mt-2">
                    <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                    <span className="ml-2 text-gray-300 text-sm sm:text-base">4.8 (24 reviews)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                {/* Personal Information */}
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mb-6">Personal Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                      <input
                        type="text"
                        value="John Silva"
                        className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:border-orange-600 focus:outline-none bg-white dark:bg-gray-700 text-slate-800 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value="+94 71 234 5678"
                        className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:border-orange-600 focus:outline-none bg-white dark:bg-gray-700 text-slate-800 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Gender</label>
                      <select className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:border-orange-600 focus:outline-none bg-white dark:bg-gray-700 text-slate-800 dark:text-white">
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Location</label>
                      <input
                        type="text"
                        value="Colombo 03"
                        className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:border-orange-600 focus:outline-none bg-white dark:bg-gray-700 text-slate-800 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Highest Education Level</label>
                      <select className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:border-orange-600 focus:outline-none bg-white dark:bg-gray-700 text-slate-800 dark:text-white">
                        <option>Bachelor&apos;s Degree</option>
                        <option>Master&apos;s Degree</option>
                        <option>High School</option>
                        <option>Diploma</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mb-6">Professional Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Total Years of Experience</label>
                      <input
                        type="number"
                        value="8"
                        className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:border-orange-600 focus:outline-none bg-white dark:bg-gray-700 text-slate-800 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Current Job</label>
                      <input
                        type="text"
                        value="Software Engineer"
                        className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:border-orange-600 focus:outline-none bg-white dark:bg-gray-700 text-slate-800 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Date of Birth</label>
                      <input
                        type="date"
                        value="1990-05-15"
                        className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:border-orange-600 focus:outline-none bg-white dark:bg-gray-700 text-slate-800 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Additional Info</label>
                      <textarea
                        rows={4}
                        placeholder="Tell us more about yourself..."
                        className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:border-orange-600 focus:outline-none bg-white dark:bg-gray-700 text-slate-800 dark:text-white"
                        value="Experienced in web development and home repairs. Available for weekend projects."
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Past Employments */}
              <div className="lg:col-span-2 mt-6 lg:mt-8">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mb-6">Past Employments</h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Senior Developer</h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">2020 - 2024</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">Tech Solutions Ltd.</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Led development team and managed multiple web projects.</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Junior Developer</h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">2018 - 2020</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">Digital Agency</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Developed responsive websites and mobile applications.</p>
                  </div>
                </div>
              </div>

              {/* Activity Stats */}
              <div className="lg:col-span-2 mt-6 lg:mt-8">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mb-6">Activity Stats</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 sm:p-6 text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">12</div>
                    <div className="text-gray-600 dark:text-gray-300">Tasks Completed</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 sm:p-6 text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">5</div>
                    <div className="text-gray-600 dark:text-gray-300">Tools Rented</div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 sm:p-6 text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400 mb-2">4.8</div>
                    <div className="text-gray-600 dark:text-gray-300">Average Rating</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="lg:col-span-2 mt-6 lg:mt-8 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white px-6 sm:px-8 py-3 rounded-xl font-semibold">
                  Save Changes
                </Button>
                <Button className="border-2 border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-600 px-6 sm:px-8 py-3 rounded-xl font-semibold">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
