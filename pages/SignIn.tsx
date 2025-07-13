// src/pages/SignIn.tsx

import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import Logo from '../src/components/Logo';
import { Button } from '../src/components/ui/button';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
// --- CHANGE: Import fetchSignInMethodsForEmail ---
import { signInWithEmailAndPassword, sendPasswordResetEmail, fetchSignInMethodsForEmail } from 'firebase/auth';
import { auth } from '../src/lib/firebase';

export default function SignIn() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    
    if (router.query.message === 'registration-success') {
      setSuccessMessage('Account created successfully! Please login to continue.');
    }
  }, [router.query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // --- CHANGE: The handleSubmit function is updated for more specific errors ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // --- Step 1: Basic validation (no change) ---
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      const email = formData.email.trim();
      const password = formData.password;

      // --- Step 2: Check if a user with this email exists ---
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);

      if (signInMethods.length === 0) {
        // User does not exist, so we can give a specific error.
        setError('No account found with this email. Please sign up first.');
        setLoading(false);
        return;
      }

      // --- Step 3: If user exists, try to sign in ---
      // If this fails, we can now be confident it's a password issue.
      try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('User signed in successfully');
        router.push('/');
      } catch (innerError: any) {
         // This catch block handles the signInWithEmailAndPassword failure.
         // Since we know the user exists, the most likely error is an incorrect password.
        if (innerError.code === 'auth/wrong-password' || innerError.code === 'auth/invalid-credential') {
            setError('Incorrect password. Please try again.');
        } else if (innerError.code === 'auth/user-disabled') {
            setError('This account has been disabled. Please contact support.');
        } else {
            setError('An unexpected error occurred. Please try again.');
            console.error('Sign-in error after user check:', innerError);
        }
      }

    } catch (outerError: any) {
      // This catch block handles errors from fetchSignInMethodsForEmail or other unexpected issues.
      console.error('Error during sign-in process:', outerError);
      let errorMessage = 'An error occurred during sign in';
      if (outerError.code === 'auth/network-request-failed') {
          errorMessage = 'Network error. Please check your internet connection.';
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };


  // --- No changes to the rest of the file ---

  const handleDemoLogin = async () => {
    // ... (rest of the function is unchanged)
  };

  const handleForgotPassword = async () => {
    // ... (rest of the function is unchanged)
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F2F3F5' }}>
      <Navigation />
      
      <div className="flex items-center justify-center py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-sm sm:max-w-md w-full">
          <div className="rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
            {/* The rest of your JSX remains exactly the same */}
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>Welcome Back!</h1>
              <p className="flex items-center justify-center gap-1 flex-wrap" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                Login to your <Logo size="small" /> account
              </p>
            </div>

            <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
              {successMessage && (
                <div className="p-4 rounded-lg text-sm font-medium text-center border-2 border-green-300" style={{ backgroundColor: '#D1FAE5', color: '#047857' }}>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lg">✅</span>
                    <span>{successMessage}</span>
                  </div>
                </div>
              )}
              {error && (
                <div className="p-4 rounded-lg text-sm font-medium text-center border-2 border-red-300 animate-pulse" style={{ backgroundColor: '#FEE2E2', color: '#DC2626' }}>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lg">⚠️</span>
                    <span>{error}</span>
                  </div>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 rounded-lg sm:rounded-xl focus:outline-none transition-colors"
                  style={{ 
                    borderColor: theme === 'dark' ? '#444444' : '#E2E8F0',
                    backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                    color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                  }}
                  placeholder="your.email@example.com"
                  onFocus={(e) => e.currentTarget.style.borderColor = '#FF5E14'}
                  onBlur={(e) => e.currentTarget.style.borderColor = theme === 'dark' ? '#444444' : '#E2E8F0'}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 rounded-lg sm:rounded-xl focus:outline-none transition-colors"
                  style={{ 
                    borderColor: theme === 'dark' ? '#444444' : '#E2E8F0',
                    backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                    color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                  }}
                  placeholder="Enter your password"
                  onFocus={(e) => e.currentTarget.style.borderColor = '#FF5E14'}
                  onBlur={(e) => e.currentTarget.style.borderColor = theme === 'dark' ? '#444444' : '#E2E8F0'}
                  required
                />
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded mr-2" style={{ accentColor: '#FF5E14' }} />
                  <span className="text-sm" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>Remember me</span>
                </label>
                <button 
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm hover:underline"
                  style={{ color: '#FF5E14' }}
                >
                  Forgot password?
                </button>
              </div>
              
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full text-white py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed" 
                style={{ backgroundColor: loading ? '#9CA3AF' : '#FF5E14' }}
              >
                {loading ? 'Logging In...' : 'Login'}
              </Button>
            </form>

            <div className="mt-6 sm:mt-8 text-center">
              <p style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                Don't have an account?{' '}
                <Link href="/SignUp" className="font-semibold hover:underline" style={{ color: '#FF5E14' }}>
                  Register
                </Link>
              </p>
            </div>

            <div className="mt-4 sm:mt-6 text-center">
              <Button
                onClick={handleDemoLogin}
                className="w-full text-white py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: '#4CAF50' }}
              >
                {loading ? 'Logging In as Demo...' : 'Login as Demo'}
              </Button>
            </div>

            <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: theme === 'dark' ? '#2a2a2a' : '#F8F9FA', border: `1px solid ${theme === 'dark' ? '#444444' : '#E2E8F0'}` }}>
              <h4 className="text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                Having trouble logging in?
              </h4>
              <ul className="text-xs space-y-1" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                <li>• Make sure your email and password are correct</li>
                <li>• Check if you have an account - use "Register" if you're new</li>
                <li>• Try the "Demo Login" button to test the platform</li>
                <li>• Use "Forgot password?" if you can't remember your password</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}