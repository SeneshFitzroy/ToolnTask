import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import Logo from '../src/components/Logo';
import { Button } from '../src/components/ui/button';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../src/lib/firebase';

export default function SignIn() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    
    // Load remembered credentials
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    const shouldRemember = localStorage.getItem('rememberMe') === 'true';
    
    if (rememberedEmail && shouldRemember) {
      setFormData(prev => ({ ...prev, email: rememberedEmail }));
      setRememberMe(true);
    }
    
    if (router.query.message === 'registration-success') {
      setSuccessMessage('Account created successfully. Please sign in to access your account.');
    } else if (router.query.message === 'password-reset-success') {
      setSuccessMessage('Password updated successfully. You can now sign in with your new password.');
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

    // Validate input format (email or Sri Lankan phone number)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+94|0094|94|0)?[1-9][0-9]{8,9}$/;
    const cleanedInput = formData.email.replace(/[\s\-\(\)]/g, '');
    
    const isValidEmail = emailRegex.test(formData.email);
    const isValidPhone = phoneRegex.test(cleanedInput);
    
    if (!isValidEmail && !isValidPhone) {
      setError('Please enter a valid email address or Sri Lankan phone number (e.g., 077 123 4567)');
      setLoading(false);
      return;
    }

    try {
      let loginIdentifier = formData.email.trim();
      
      // If it's a phone number, we need to find the associated email
      if (isValidPhone) {
        try {
          const response = await fetch('/api/get-email-by-phone', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone: cleanedInput }),
          });
          
          const data = await response.json();
          
          if (response.ok && data.email) {
            loginIdentifier = data.email;
          } else {
            setError('Phone number not found. Please register first or use your email address.');
            setLoading(false);
            return;
          }
        } catch (phoneError) {
          console.error('Error finding email by phone:', phoneError);
          setError('Error validating phone number. Please try using your email address.');
          setLoading(false);
          return;
        }
      }
      
      // Sign in with Firebase Auth using email (either provided directly or found by phone)
      await signInWithEmailAndPassword(auth, loginIdentifier, formData.password);
      console.log('User signed in successfully');
      
      // Handle "Remember me" functionality
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', formData.email.trim());
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('rememberMe');
      }
      
      // Redirect to home page
      router.push('/');
    } catch (error: unknown) {
      console.error('Error signing in:', error);
      
      // Handle specific Firebase Auth errors with professional messages
      let errorMessage = 'Authentication failed. Please verify your credentials and try again.';
      
      if (error && typeof error === 'object' && 'code' in error) {
        const firebaseError = error as { code: string; message?: string };
        switch (firebaseError.code) {
          case 'auth/invalid-credential':
            errorMessage = 'Invalid credentials. Please verify your email/phone and password are correct.';
            break;
          case 'auth/user-not-found':
            errorMessage = 'Account not found. Please check your credentials or create a new account.';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Incorrect password. Please verify your password and try again.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Invalid email format. Please enter a valid email address.';
            break;
          case 'auth/user-disabled':
            errorMessage = 'Account temporarily suspended. Please contact our support team for assistance.';
            break;
          case 'auth/too-many-requests':
            errorMessage = 'Multiple failed attempts detected. Please wait a few minutes before retrying.';
            break;
          case 'auth/network-request-failed':
            errorMessage = 'Connection error. Please check your internet connection and try again.';
            break;
          case 'auth/invalid-login-credentials':
            errorMessage = 'Login credentials are invalid. Please verify your information and try again.';
            break;
          default:
            errorMessage = 'Authentication unsuccessful. Please verify your credentials and try again.';
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };


  // Redirect to forgot password page
  const handleForgotPassword = () => {
    router.push('/forgot-password');
  };

  if (!mounted) {
    return null;
  }

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
                <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>Email or Phone (Sri Lanka)</label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 rounded-lg sm:rounded-xl focus:outline-none transition-colors"
                  style={{ 
                    borderColor: theme === 'dark' ? '#444444' : '#E2E8F0',
                    backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                    color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                  }}
                  placeholder="email@example.com or 077 123 4567"
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
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded mr-2" 
                    style={{ accentColor: '#FF5E14' }} 
                  />
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
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}