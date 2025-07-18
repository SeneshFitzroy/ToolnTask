
import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import Logo from '../src/components/Logo';
import { Button } from '../src/components/ui/button';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../src/lib/firebase';

// Email service function
const sendWelcomeEmail = async (firstName: string, email: string) => {
  try {
    const response = await fetch('/api/send-welcome-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        email,
      }),
    });

    if (!response.ok) {
      console.error('Failed to send welcome email');
    }
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};

export default function SignUp() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

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
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    // Terms and conditions validation - MUST BE CHECKED
    if (!agreedToTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy before registering');
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

    // Password validation
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Name validation
    if (formData.firstName.trim().length < 2 || formData.lastName.trim().length < 2) {
      setError('First and last names must be at least 2 characters long');
      setLoading(false);
      return;
    }

    // Phone validation (basic)
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      setError('Please enter a valid phone number');
      setLoading(false);
      return;
    }

    try {
      console.log('Attempting to create user with email:', formData.email.trim());
      
      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email.trim(), formData.password);
      const user = userCredential.user;

      console.log('User created successfully:', user.uid);

      // Update display name
      await updateProfile(user, {
        displayName: `${formData.firstName} ${formData.lastName}`
      });

      // Save user data to Firestore with additional fields
      await setDoc(doc(db, 'users', user.uid), {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        displayName: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        isActive: true,
        role: 'user',
        emailVerified: user.emailVerified,
        profileComplete: false,
        agreedToTermsAt: serverTimestamp()
      });

      console.log('User data saved to Firestore successfully');

      // Send welcome email
      try {
        await sendWelcomeEmail(formData.firstName.trim(), formData.email.trim());
        console.log('Welcome email sent successfully');
      } catch (emailError) {
        console.error('Failed to send welcome email:', emailError);
        // Don't fail registration if email fails
      }
      
      // Redirect to sign in page after successful registration
      router.push('/SignIn?message=registration-success');
    } catch (error: unknown) {
      console.error('Error creating user:', error);
      
      // Handle specific Firebase Auth errors
      let errorMessage = 'An error occurred during registration';
      
      if (error && typeof error === 'object' && 'code' in error) {
        const firebaseError = error as { code: string; message?: string };
        console.log('Firebase error code:', firebaseError.code);
        console.log('Firebase error message:', firebaseError.message);
        
        switch (firebaseError.code) {
          case 'auth/email-already-in-use':
            errorMessage = 'This email is already registered. Please use a different email or sign in instead.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Invalid email address format. Please check your email and try again.';
            break;
          case 'auth/weak-password':
            errorMessage = 'Password is too weak. Please choose a stronger password (at least 6 characters).';
            break;
          case 'auth/network-request-failed':
            errorMessage = 'Network error. Please check your internet connection and try again.';
            break;
          case 'auth/operation-not-allowed':
            errorMessage = 'Email/password accounts are not enabled. Please contact support.';
            break;
          case 'auth/too-many-requests':
            errorMessage = 'Too many failed attempts. Please wait a moment before trying again.';
            break;
          default:
            errorMessage = firebaseError.message || 'An error occurred during registration. Please try again.';
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      
      // Scroll to top to make error visible
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
    }
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
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>Create Account</h1>
              <p className="flex items-center justify-center gap-1 flex-wrap" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                Join <Logo size="small" /> today
              </p>
            </div>

            <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="p-4 rounded-lg text-sm font-medium text-center border-2 border-red-300 animate-pulse" style={{ backgroundColor: '#FEE2E2', color: '#DC2626' }}>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lg">⚠️</span>
                    <span>{error}</span>
                  </div>
                  {error.includes('email is already registered') && (
                    <div className="mt-2 text-xs">
                      <Link href="/SignIn" className="underline font-semibold hover:text-red-800">
                        Click here to sign in instead
                      </Link>
                    </div>
                  )}
                </div>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-3 border-2 rounded-lg sm:rounded-xl focus:outline-none transition-colors"
                    style={{ 
                      borderColor: theme === 'dark' ? '#4B5563' : '#E2E8F0',
                      backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF',
                      color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                    }}
                    placeholder="John"
                    onFocus={(e) => e.currentTarget.style.borderColor = '#FF5E14'}
                    onBlur={(e) => e.currentTarget.style.borderColor = theme === 'dark' ? '#4B5563' : '#E2E8F0'}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-3 border-2 rounded-lg sm:rounded-xl focus:outline-none transition-colors"
                    style={{ 
                      borderColor: theme === 'dark' ? '#4B5563' : '#E2E8F0',
                      backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF',
                      color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                    }}
                    placeholder="Doe"
                    onFocus={(e) => e.currentTarget.style.borderColor = '#FF5E14'}
                    onBlur={(e) => e.currentTarget.style.borderColor = theme === 'dark' ? '#4B5563' : '#E2E8F0'}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 rounded-lg sm:rounded-xl focus:outline-none transition-colors"
                  style={{ 
                    borderColor: theme === 'dark' ? '#4B5563' : '#E2E8F0',
                    backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF',
                    color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                  }}
                  placeholder="your.email@example.com"
                  onFocus={(e) => e.currentTarget.style.borderColor = '#FF5E14'}
                  onBlur={(e) => e.currentTarget.style.borderColor = theme === 'dark' ? '#4B5563' : '#E2E8F0'}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 rounded-lg sm:rounded-xl focus:outline-none transition-colors"
                  style={{ 
                    borderColor: theme === 'dark' ? '#4B5563' : '#E2E8F0',
                    backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF',
                    color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                  }}
                  placeholder="+94 71 234 5678"
                  onFocus={(e) => e.currentTarget.style.borderColor = '#FF5E14'}
                  onBlur={(e) => e.currentTarget.style.borderColor = theme === 'dark' ? '#4B5563' : '#E2E8F0'}
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
                    borderColor: theme === 'dark' ? '#4B5563' : '#E2E8F0',
                    backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF',
                    color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                  }}
                  placeholder="Create a strong password"
                  onFocus={(e) => e.currentTarget.style.borderColor = '#FF5E14'}
                  onBlur={(e) => e.currentTarget.style.borderColor = theme === 'dark' ? '#4B5563' : '#E2E8F0'}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 rounded-lg sm:rounded-xl focus:outline-none transition-colors"
                  style={{ 
                    borderColor: theme === 'dark' ? '#4B5563' : '#E2E8F0',
                    backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF',
                    color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                  }}
                  placeholder="Confirm your password"
                  onFocus={(e) => e.currentTarget.style.borderColor = '#FF5E14'}
                  onBlur={(e) => e.currentTarget.style.borderColor = theme === 'dark' ? '#4B5563' : '#E2E8F0'}
                  required
                />
              </div>
              
              <div className="flex items-start gap-3">
                <input 
                  type="checkbox" 
                  id="agreeTerms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-2 cursor-pointer" 
                  style={{ 
                    accentColor: '#FF5E14',
                    borderColor: agreedToTerms ? '#FF5E14' : (theme === 'dark' ? '#4B5563' : '#E2E8F0')
                  }}
                  required
                />
                <label htmlFor="agreeTerms" className="text-sm leading-relaxed cursor-pointer" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                  <span className="text-red-500 font-bold">*</span> I agree to the{' '}
                  <Link href="/TermsAndConditions" className="hover:underline font-semibold" style={{ color: '#FF5E14' }}>Terms of Service</Link>
                  {' '}and{' '}
                  <Link href="/PrivacyPolicy" className="hover:underline font-semibold" style={{ color: '#FF5E14' }}>Privacy Policy</Link>
                  <div className="text-xs mt-1 opacity-75">
                    You must accept our terms before registering
                  </div>
                </label>
              </div>
              
              <Button 
                type="submit" 
                disabled={loading || !agreedToTerms}
                className="w-full text-white py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" 
                style={{ 
                  backgroundColor: loading || !agreedToTerms ? '#9CA3AF' : '#FF5E14',
                  boxShadow: !agreedToTerms ? 'none' : '0 4px 12px rgba(255, 94, 20, 0.3)'
                }}
              >
                {loading ? 'Registering...' : !agreedToTerms ? 'Please accept terms to continue' : 'Register'}
              </Button>
            </form>

            <div className="mt-6 sm:mt-8 text-center">
              <p style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                Already have an account?{' '}
                <Link href="/SignIn" className="font-semibold hover:underline" style={{ color: '#FF5E14' }}>
                  Login
                </Link>
              </p>
              
              <div className="mt-4 p-3 rounded-lg text-xs" style={{ backgroundColor: theme === 'dark' ? '#374151' : '#F3F4F6', color: theme === 'dark' ? '#D1D5DB' : '#6B7280' }}>
                <p className="font-medium mb-1">Having trouble?</p>
                <p>• If you already have an account, please use the Login link above</p>
                <p>• Make sure your email is correct and not already registered</p>
                <p>• Password must be at least 6 characters long</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
