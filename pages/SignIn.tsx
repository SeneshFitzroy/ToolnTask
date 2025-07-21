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
      
      // If it's a phone number, find the actual email associated with it
      if (isValidPhone) {
        console.log(`📱 Phone login attempt: ${cleanedInput}`);
        
        // Look up the actual email for this phone number
        const response = await fetch('/api/lookup-phone-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ phone: cleanedInput }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.email) {
            loginIdentifier = data.email;
            console.log(`📧 Found email for phone: ${data.email}`);
          } else {
            throw new Error('Phone number not found');
          }
        } else {
          throw new Error('Phone number not found');
        }
      }
      
      // For email logins, check for password resets in Firestore first
      if (isValidEmail && !isValidPhone) {
        try {
          const resetCheckResponse = await fetch('/api/check-reset-password', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              email: loginIdentifier, 
              password: formData.password 
            }),
          });

          if (resetCheckResponse.ok) {
            const resetData = await resetCheckResponse.json();
            if (resetData.passwordMatch) {
              console.log('🔐 Reset password matched, user authenticated');
              
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
              return;
            } else {
              // If reset password check returned false, this means user has reset password
              // but provided wrong password - don't allow Firebase Auth fallback
              const userCheckResponse = await fetch('/api/check-reset-password', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                  email: loginIdentifier, 
                  password: 'CHECK_IF_USER_HAS_RESET' 
                }),
              });
              
              if (userCheckResponse.ok) {
                const userCheckData = await userCheckResponse.json();
                if (userCheckData.hasResetPassword) {
                  throw new Error('Please use your new password from the password reset email');
                }
              }
            }
          }
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          if (errorMessage === 'Please use your new password from the password reset email') {
            throw new Error(errorMessage);
          }
          console.log('No reset password found, proceeding with normal Firebase Auth');
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
      // Handle specific Firebase Auth errors with professional messages
      let errorMessage = 'Authentication failed. Please verify your credentials and try again.';
      
      // Determine if user entered phone or email for better error messaging
      const isPhoneInput = phoneRegex.test(cleanedInput);
      const inputType = isPhoneInput ? 'phone number' : 'email';
      
      if (error && typeof error === 'object' && 'code' in error) {
        const firebaseError = error as { code: string; message?: string };
        switch (firebaseError.code) {
          case 'auth/invalid-credential':
            errorMessage = `The ${inputType} and password combination is incorrect. Please check your credentials and try again.`;
            break;
          case 'auth/user-not-found':
            errorMessage = `No account found with this ${inputType}. Please verify your information or create a new account.`;
            break;
          case 'auth/wrong-password':
            errorMessage = `Incorrect password for this ${inputType}. Please check your password or use "Forgot Password?" if needed.`;
            break;
          case 'auth/invalid-email':
            errorMessage = 'Invalid email format. Please enter a valid email address.';
            break;
          case 'auth/user-disabled':
            errorMessage = 'This account has been temporarily disabled. Please contact our support team for assistance.';
            break;
          case 'auth/too-many-requests':
            errorMessage = 'Too many failed login attempts. Please wait a few minutes before trying again for security reasons.';
            break;
          case 'auth/network-request-failed':
            errorMessage = 'Connection error. Please check your internet connection and try again.';
            break;
          case 'auth/invalid-login-credentials':
            errorMessage = `Invalid login credentials. Please verify your ${inputType} and password are correct.`;
            break;
          default:
            errorMessage = `Authentication failed with your ${inputType}. Please verify your credentials and try again.`;
        }
      } else if (error instanceof Error) {
        // Check if it's a phone lookup error or other error
        if (error.message.includes('Phone number not found')) {
          errorMessage = 'Phone number not registered. Please check your number or create a new account.';
        } else {
          errorMessage = `Login failed. Please check your ${inputType} and password and try again.`;
        }
      }
      
      setError(errorMessage);
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
                  <span>{successMessage}</span>
                </div>
              )}
              {error && (
                <div className="p-4 rounded-xl border-2 border-red-200 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 dark:border-red-800 animate-in slide-in-from-top duration-300">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-red-800 dark:text-red-300 mb-1">Login Failed</h4>
                      <p className="text-sm text-red-700 dark:text-red-400 leading-relaxed">{error}</p>
                      <div className="mt-2 flex items-center gap-4 text-xs">
                        <button
                          type="button"
                          onClick={handleForgotPassword}
                          className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 underline hover:no-underline transition-colors"
                        >
                          Reset Password
                        </button>
                        <span className="text-red-500">•</span>
                        <span className="text-red-600 dark:text-red-400">Need help? Contact support</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setError('')}
                      className="flex-shrink-0 text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
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