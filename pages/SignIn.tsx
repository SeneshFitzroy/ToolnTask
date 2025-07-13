import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import Logo from '../src/components/Logo';
import { Button } from '../src/components/ui/button';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      // Sign in with Firebase Auth
      await signInWithEmailAndPassword(auth, formData.email.trim(), formData.password);
      console.log('User signed in successfully');
      
      // Redirect to home page
      router.push('/');
    } catch (error: unknown) {
      console.error('Error signing in:', error);
      
      // Handle specific Firebase Auth errors
      let errorMessage = 'An error occurred during sign in';
      
      if (error && typeof error === 'object' && 'code' in error) {
        const firebaseError = error as { code: string; message?: string };
        switch (firebaseError.code) {
          case 'auth/invalid-credential':
            errorMessage = 'Incorrect password. Please check your password and try again.';
            break;
          case 'auth/user-not-found':
            errorMessage = 'No account found with this email address. Please sign up first.';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Incorrect password. Please try again.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Invalid email address format.';
            break;
          case 'auth/user-disabled':
            errorMessage = 'This account has been disabled. Please contact support.';
            break;
          case 'auth/too-many-requests':
            errorMessage = 'Too many failed attempts. Please wait a moment before trying again.';
            break;
          case 'auth/network-request-failed':
            errorMessage = 'Network error. Please check your internet connection.';
            break;
          default:
            errorMessage = 'Login failed. Please check your email and password.';
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };


  // Demo login function
  const handleDemoLogin = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Use demo credentials
      await signInWithEmailAndPassword(auth, 'demo@toolntask.com', 'demo123');
      console.log('Demo user signed in successfully');
      router.push('/');
    } catch (error: unknown) {
      console.error('Demo login failed:', error);
      setError('Demo login is temporarily unavailable. Please create your own account.');
    } finally {
      setLoading(false);
    }
  };

  // Forgot password function
  const handleForgotPassword = async () => {
    if (!formData.email) {
      setError('Please enter your email address first');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, formData.email.trim());
      setSuccessMessage('Password reset email sent! Check your inbox.');
      setError('');
    } catch (error: unknown) {
      console.error('Error sending password reset email:', error);
      if (error && typeof error === 'object' && 'code' in error) {
        const firebaseError = error as { code: string; message?: string };
        if (firebaseError.code === 'auth/user-not-found') {
          setError('No account found with this email address.');
        } else {
          setError('Error sending password reset email. Please try again.');
        }
      } else {
        setError('Error sending password reset email. Please try again.');
      }
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F2F3F5' }}>
      <Navigation />
      
      <div className="flex items-center justify-center py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-sm sm:max-w-md w-full">
          <div className="rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
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
              <div className="space-y-3">
                <p className="text-sm" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                  Don&apos;t have an account?
                </p>
                <Link href="/SignUp">
                  <Button
                    className="w-full text-white py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: '#6B7280' }}
                  >
                    Register New Account
                  </Button>
                </Link>
              </div>
            </div>

            <div className="mt-4 sm:mt-6 text-center">
              <Button
                onClick={handleDemoLogin}
                className="w-full text-white py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: '#4CAF50' }}
              >
                {loading ? 'Logging In as Demo...' : 'Try Demo Login'}
              </Button>
            </div>

            <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: theme === 'dark' ? '#2a2a2a' : '#F8F9FA', border: `1px solid ${theme === 'dark' ? '#444444' : '#E2E8F0'}` }}>
              <h4 className="text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                Having trouble logging in?
              </h4>
              <ul className="text-xs space-y-1" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                <li>• Make sure your email and password are correct</li>
                <li>• Check if you have an account - use &quot;Register&quot; if you&apos;re new</li>
                <li>• Try the &quot;Demo Login&quot; button to test the platform</li>
                <li>• Use &quot;Forgot password?&quot; if you can&apos;t remember your password</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}