
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
import { Eye, EyeOff, Check, X } from 'lucide-react';

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
  const [successMessage, setSuccessMessage] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [registrationMethod, setRegistrationMethod] = useState<'email' | 'phone'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSignInButton, setShowSignInButton] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  // Password validation states
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
    match: false
  });

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    
    // Restore form data from localStorage if available (from any page navigation)
    const savedFormData = localStorage.getItem('signupFormData');
    const savedRegistrationMethod = localStorage.getItem('signupRegistrationMethod');
    const savedAgreedToTerms = localStorage.getItem('signupAgreedToTerms');
    
    if (savedFormData) {
      try {
        const parsedData = JSON.parse(savedFormData);
        console.log('🔄 Restoring saved form data:', parsedData);
        setFormData(parsedData);
      } catch (error) {
        console.error('Error parsing saved form data:', error);
        localStorage.removeItem('signupFormData');
      }
    }
    
    if (savedRegistrationMethod) {
      setRegistrationMethod(savedRegistrationMethod as 'email' | 'phone');
    }
    
    if (savedAgreedToTerms === 'true') {
      setAgreedToTerms(true);
    }
    
    // Check if returning from Terms or Privacy page with acceptance
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('termsAccepted') === 'true' || urlParams.get('privacyAccepted') === 'true') {
      setAgreedToTerms(true);
      // Clear the URL parameter
      router.replace('/SignUp', undefined, { shallow: true });
    }
  }, [router]);

  // Real-time password validation
  useEffect(() => {
    const validation = {
      length: formData.password.length >= 8,
      uppercase: /[A-Z]/.test(formData.password),
      lowercase: /[a-z]/.test(formData.password),
      number: /\d/.test(formData.password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
      match: formData.password === formData.confirmPassword && formData.password.length > 0
    };
    setPasswordValidation(validation);
  }, [formData.password, formData.confirmPassword]);

  // Auto-save form data whenever it changes
  useEffect(() => {
    if (mounted && (formData.firstName || formData.lastName || formData.email || formData.phone)) {
      console.log('💾 Auto-saving form data...');
      localStorage.setItem('signupFormData', JSON.stringify(formData));
      localStorage.setItem('signupRegistrationMethod', registrationMethod);
      localStorage.setItem('signupAgreedToTerms', agreedToTerms.toString());
    }
  }, [formData, registrationMethod, agreedToTerms, mounted]);

  // Save form data before navigation
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (formData.firstName || formData.lastName || formData.email || formData.phone) {
        localStorage.setItem('signupFormData', JSON.stringify(formData));
        localStorage.setItem('signupRegistrationMethod', registrationMethod);
        localStorage.setItem('signupAgreedToTerms', agreedToTerms.toString());
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [formData, registrationMethod, agreedToTerms]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTermsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Save current form data to localStorage
    localStorage.setItem('signupFormData', JSON.stringify(formData));
    localStorage.setItem('signupRegistrationMethod', registrationMethod);
    localStorage.setItem('signupAgreedToTerms', agreedToTerms.toString());
    // Navigate to Terms page
    router.push('/TermsAndConditions?from=signup');
  };

  const handlePrivacyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Save current form data to localStorage
    localStorage.setItem('signupFormData', JSON.stringify(formData));
    localStorage.setItem('signupRegistrationMethod', registrationMethod);
    localStorage.setItem('signupAgreedToTerms', agreedToTerms.toString());
    // Navigate to Privacy page
    router.push('/PrivacyPolicy?from=signup');
  };

  const clearSavedData = () => {
    localStorage.removeItem('signupFormData');
    localStorage.removeItem('signupRegistrationMethod');
    localStorage.removeItem('signupAgreedToTerms');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    });
    setRegistrationMethod('email');
    setAgreedToTerms(false);
    console.log('🗑️ Cleared all form data');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.password) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    // Terms and conditions validation - MUST BE CHECKED
    if (!agreedToTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy before registering');
      setLoading(false);
      return;
    }

    // Validate based on registration method
    if (registrationMethod === 'email') {
      // Email registration - validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email || !emailRegex.test(formData.email)) {
        setError('Please enter a valid email address');
        setLoading(false);
        return;
      }
    } else {
      // Phone registration - validate Sri Lankan phone format
      if (!formData.phone) {
        setError('Please enter your phone number');
        setLoading(false);
        return;
      }

      const validateSriLankanPhone = (phone: string): boolean => {
        const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
        const patterns = [
          /^(\+94|0094|94)?7[0-9]{8}$/, // Mobile: +94 7X XXXX XXXX or 07X XXXX XXXX
          /^(\+94|0094|94)?[1-9][0-9]{8}$/, // All mobile numbers starting with various prefixes
          /^(\+94|0094|94)?1[1-9][0-9]{7}$/, // Landline
          /^07[0-9]{8}$/, // Local mobile format: 07X XXXX XXXX
          /^0[1-9][0-9]{8}$/, // Any local number starting with 0
        ];
        return patterns.some(pattern => pattern.test(cleanPhone));
      };

      if (!validateSriLankanPhone(formData.phone)) {
        setError('Please enter a valid Sri Lankan phone number (e.g., 077 123 4567 or +94 77 123 4567)');
        setLoading(false);
        return;
      }
    }

    // Enhanced password validation
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    const hasUppercase = /[A-Z]/.test(formData.password);
    const hasLowercase = /[a-z]/.test(formData.password);
    const hasNumbers = /\d/.test(formData.password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);

    if (!hasUppercase || !hasLowercase || !hasNumbers || !hasSpecial) {
      setError('Password must contain uppercase, lowercase, number, and special character (!@#$%^&*)');
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

    try {
      // For Firebase Auth, we need an email address
      let authEmail: string;
      
      if (registrationMethod === 'email') {
        // Email registration - use the provided email
        authEmail = formData.email.trim();
      } else {
        // Phone registration - create a Firebase-compatible email from phone
        const cleanPhone = formData.phone.replace(/[\s\-\(\)]/g, '');
        let normalizedPhone = cleanPhone;
        
        if (cleanPhone.startsWith('+94')) {
          normalizedPhone = cleanPhone.replace('+94', '94');
        } else if (cleanPhone.startsWith('0094')) {
          normalizedPhone = cleanPhone.replace('0094', '94');
        } else if (cleanPhone.startsWith('0')) {
          normalizedPhone = '94' + cleanPhone.substring(1);
        } else if (!cleanPhone.startsWith('94')) {
          normalizedPhone = '94' + cleanPhone;
        }
        
        authEmail = `${normalizedPhone}@toolntask.app`;
      }
      
      console.log('Attempting to create user with auth email:', authEmail);
      
      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, authEmail, formData.password);
      const { user } = userCredential;

      console.log('User created successfully:', user.uid);

      // Update display name
      await updateProfile(user, {
        displayName: `${formData.firstName} ${formData.lastName}`
      });

      // Normalize phone number for consistent storage (if phone registration)
      let normalizedPhone = null;
      if (registrationMethod === 'phone' && formData.phone) {
        const cleanPhone = formData.phone.replace(/[\s\-\(\)]/g, '');
        
        // Use the same format as the Firebase Auth email (94xxxxxxxxx)
        if (cleanPhone.startsWith('+94')) {
          normalizedPhone = cleanPhone.replace('+94', '94');
        } else if (cleanPhone.startsWith('0094')) {
          normalizedPhone = cleanPhone.replace('0094', '94');
        } else if (cleanPhone.startsWith('0')) {
          normalizedPhone = '94' + cleanPhone.substring(1);
        } else if (!cleanPhone.startsWith('94')) {
          normalizedPhone = '94' + cleanPhone;
        } else {
          normalizedPhone = cleanPhone;
        }
        
        console.log(`📱 Phone normalized for storage: ${normalizedPhone} (matches auth email format)`);
      }

      // Save user data to Firestore with only the selected contact method
      const userData: {
        firstName: string;
        lastName: string;
        authEmail: string;
        primaryContact: 'email' | 'phone';
        displayName: string;
        createdAt: ReturnType<typeof serverTimestamp>;
        updatedAt: ReturnType<typeof serverTimestamp>;
        isActive: boolean;
        role: string;
        emailVerified: boolean;
        profileComplete: boolean;
        agreedToTermsAt: ReturnType<typeof serverTimestamp>;
        email?: string | null;
        phone?: string | null;
      } = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        authEmail: authEmail, // Store the auth email for reference
        primaryContact: registrationMethod,
        displayName: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        isActive: true,
        role: 'user',
        emailVerified: user.emailVerified,
        profileComplete: false,
        agreedToTermsAt: serverTimestamp()
      };

      // Add the appropriate contact field
      if (registrationMethod === 'email') {
        userData.email = formData.email.trim().toLowerCase();
        userData.phone = null;
      } else {
        userData.phone = normalizedPhone;
        userData.email = null;
      }

      await setDoc(doc(db, 'users', user.uid), userData);

      console.log('User data saved to Firestore successfully');

      // Send appropriate welcome message
      if (registrationMethod === 'email') {
        try {
          await sendWelcomeEmail(formData.firstName.trim(), formData.email.trim());
          console.log('Welcome email sent successfully');
        } catch (emailError) {
          console.error('Failed to send welcome email:', emailError);
          // Don't fail registration if email fails
        }
      } else {
        try {
          const smsResponse = await fetch('/api/phone-verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              phone: normalizedPhone,
              type: 'registration-welcome',
              firstName: formData.firstName.trim()
            }),
          });

          if (smsResponse.ok) {
            console.log('Welcome SMS sent successfully');
          } else {
            console.error('Failed to send welcome SMS');
          }
        } catch (smsError) {
          console.error('Failed to send welcome SMS:', smsError);
        }
      }

      // Set appropriate success message
      if (registrationMethod === 'email') {
        setSuccessMessage('Account created successfully with email. Please check your email for welcome message.');
      } else {
        setSuccessMessage('Account created successfully with phone number. Please check your phone for welcome message.');
      }
      
      // Show success message briefly before redirect
      setTimeout(() => {
        // Clear saved form data since registration was successful
        localStorage.removeItem('signupFormData');
        localStorage.removeItem('signupRegistrationMethod');
        localStorage.removeItem('signupAgreedToTerms');
        console.log('🗑️ Cleared saved form data after successful registration');
        
        router.push('/SignIn?message=registration-success');
      }, 3000);
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
            if (registrationMethod === 'email') {
              errorMessage = '✉️ This email is already registered! Please sign in instead or use "Forgot Password" if you need to reset your password.';
            } else {
              errorMessage = '📱 This phone number is already registered! Please sign in instead or use "Forgot Password" if you need to reset your password.';
            }
            setShowSignInButton(true);
            break;
          case 'auth/invalid-email':
            errorMessage = '❌ Invalid email address format. Please check your email and try again.';
            setShowSignInButton(false);
            break;
          case 'auth/weak-password':
            errorMessage = '🔒 Password is too weak. Please choose a stronger password (at least 8 characters with uppercase, lowercase, numbers, and special characters).';
            setShowSignInButton(false);
            break;
          case 'auth/network-request-failed':
            errorMessage = '🌐 Network error. Please check your internet connection and try again.';
            setShowSignInButton(false);
            break;
          case 'auth/operation-not-allowed':
            errorMessage = '⚠️ Registration is temporarily unavailable. Please contact support.';
            setShowSignInButton(false);
            break;
          case 'auth/too-many-requests':
            errorMessage = '⏰ Too many failed attempts. Please wait a few minutes before trying again.';
            setShowSignInButton(false);
            break;
          default:
            errorMessage = '❌ ' + (firebaseError.message || 'An error occurred during registration. Please try again.');
            setShowSignInButton(false);
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

            {/* Registration Method Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                  Primary Contact Method
                </p>
                {(formData.email || formData.phone) && (
                  <button
                    type="button"
                    onClick={() => {
                      const newMethod = registrationMethod === 'email' ? 'phone' : 'email';
                      setRegistrationMethod(newMethod);
                      // Clear both fields when switching to ensure clean state
                      setFormData(prev => ({
                        ...prev,
                        email: '',
                        phone: ''
                      }));
                    }}
                    className="text-xs px-2 py-1 rounded-md transition-all duration-200 hover:scale-105"
                    style={{ backgroundColor: '#FF5E14', color: '#FFFFFF' }}
                  >
                    Switch to {registrationMethod === 'email' ? 'Phone' : 'Email'}
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRegistrationMethod('email')}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-1 ${
                    registrationMethod === 'email' 
                      ? 'border-orange-500 bg-orange-50 scale-105' 
                      : 'border-gray-300 hover:border-gray-400 hover:scale-102'
                  }`}
                  style={{
                    backgroundColor: registrationMethod === 'email' 
                      ? (theme === 'dark' ? '#2a1a0a' : '#FFF7ED')
                      : (theme === 'dark' ? '#2a2a2a' : '#FFFFFF'),
                    borderColor: registrationMethod === 'email' ? '#FF5E14' : (theme === 'dark' ? '#444444' : '#D1D5DB')
                  }}
                >
                  <span className="text-lg">✉️</span>
                  <span className="text-xs font-medium" style={{ color: registrationMethod === 'email' ? '#FF5E14' : (theme === 'dark' ? '#FFFFFF' : '#2D3748') }}>
                    Email Registration
                  </span>
                  {registrationMethod === 'email' && (
                    <div className="text-xs px-2 py-1 rounded-full text-white" style={{ backgroundColor: '#FF5E14' }}>
                      Selected
                    </div>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setRegistrationMethod('phone')}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-1 ${
                    registrationMethod === 'phone' 
                      ? 'border-orange-500 bg-orange-50 scale-105' 
                      : 'border-gray-300 hover:border-gray-400 hover:scale-102'
                  }`}
                  style={{
                    backgroundColor: registrationMethod === 'phone' 
                      ? (theme === 'dark' ? '#2a1a0a' : '#FFF7ED')
                      : (theme === 'dark' ? '#2a2a2a' : '#FFFFFF'),
                    borderColor: registrationMethod === 'phone' ? '#FF5E14' : (theme === 'dark' ? '#444444' : '#D1D5DB')
                  }}
                >
                  <span className="text-lg">📱</span>
                  <span className="text-xs font-medium" style={{ color: registrationMethod === 'phone' ? '#FF5E14' : (theme === 'dark' ? '#FFFFFF' : '#2D3748') }}>
                    Phone Number Registration
                  </span>
                  {registrationMethod === 'phone' && (
                    <div className="text-xs px-2 py-1 rounded-full text-white" style={{ backgroundColor: '#FF5E14' }}>
                      Selected
                    </div>
                  )}
                </button>
              </div>
              <p className="text-xs mt-2 text-center" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                Choose your preferred registration method
              </p>
            </div>

            <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
              {successMessage && (
                <div className="p-4 rounded-lg text-sm font-medium text-center border-2 border-green-300" style={{ backgroundColor: '#D1FAE5', color: '#047857' }}>
                  <span>{successMessage}</span>
                </div>
              )}
              {error && (
                <div className="p-4 rounded-lg text-sm font-medium text-center border-2 border-red-300" style={{ backgroundColor: '#FEE2E2', color: '#DC2626' }}>
                  <span>{error}</span>
                  {error.includes('already registered') && (
                    <div className="mt-3 text-xs">
                      <Link href="/SignIn" className="inline-flex items-center gap-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-semibold text-sm">
                        Sign In Instead
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
              
              {/* Primary Contact Field - Only show selected type */}
              <div>
                {registrationMethod === 'email' ? (
                  <>
                    <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                      Email Address
                    </label>
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
                  </>
                ) : (
                  <>
                    <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                      Phone Number (Sri Lanka)
                    </label>
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
                      placeholder="077 123 4567 or +94 77 123 4567"
                      onFocus={(e) => e.currentTarget.style.borderColor = '#FF5E14'}
                      onBlur={(e) => e.currentTarget.style.borderColor = theme === 'dark' ? '#4B5563' : '#E2E8F0'}
                      required
                    />
                  </>
                )}
              </div>
              
              {/* Password Field with Security Features */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pr-12 border-2 rounded-lg sm:rounded-xl focus:outline-none transition-colors"
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
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }} />
                    ) : (
                      <Eye className="w-5 h-5" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }} />
                    )}
                  </button>
                </div>

                {/* Password must be at least 8 characters caption */}
                <p className="mt-2 text-xs" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                  Password must be at least 8 characters long
                </p>

                {/* Character Count */}
                <div className="mt-1 text-xs text-right" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                  {formData.password.length}/50 characters
                </div>

                {/* Password Requirements */}
                {formData.password.length > 0 && (
                  <div className="mt-3 p-3 rounded-lg" style={{ backgroundColor: theme === 'dark' ? '#2a2a2a' : '#F9FAFB' }}>
                    <h4 className="text-xs font-medium mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                      Password Requirements:
                    </h4>
                    <div className="space-y-1">
                      {[
                        { key: 'length', text: 'At least 8 characters' },
                        { key: 'uppercase', text: 'One uppercase letter (A-Z)' },
                        { key: 'lowercase', text: 'One lowercase letter (a-z)' },
                        { key: 'number', text: 'One number (0-9)' },
                        { key: 'special', text: 'One special character (!@#$%^&*)' }
                      ].map(({ key, text }) => (
                        <div key={key} className="flex items-center gap-2">
                          {passwordValidation[key as keyof typeof passwordValidation] ? (
                            <Check className="w-3 h-3" style={{ color: '#10B981' }} />
                          ) : (
                            <X className="w-3 h-3" style={{ color: '#EF4444' }} />
                          )}
                          <span 
                            className="text-xs"
                            style={{ 
                              color: passwordValidation[key as keyof typeof passwordValidation] 
                                ? '#10B981' 
                                : theme === 'dark' ? '#CCCCCC' : '#6B7280' 
                            }}
                          >
                            {text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pr-12 border-2 rounded-lg sm:rounded-xl focus:outline-none transition-colors"
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
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }} />
                    ) : (
                      <Eye className="w-5 h-5" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }} />
                    )}
                  </button>
                </div>

                {/* Password Match Indicator */}
                {formData.confirmPassword.length > 0 && (
                  <div className="mt-2 flex items-center gap-2">
                    {passwordValidation.match ? (
                      <>
                        <Check className="w-4 h-4" style={{ color: '#10B981' }} />
                        <span className="text-xs" style={{ color: '#10B981' }}>
                          Passwords match
                        </span>
                      </>
                    ) : (
                      <>
                        <X className="w-4 h-4" style={{ color: '#EF4444' }} />
                        <span className="text-xs" style={{ color: '#EF4444' }}>
                          Passwords do not match
                        </span>
                      </>
                    )}
                  </div>
                )}
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
                  <Link 
                    href="/TermsAndConditions" 
                    onClick={handleTermsClick}
                    className="hover:underline font-semibold" 
                    style={{ color: '#FF5E14' }}
                  >
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link href="/PrivacyPolicy?from=signup" onClick={handlePrivacyClick} className="hover:underline font-semibold" style={{ color: '#FF5E14' }}>Privacy Policy</Link>
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
                <p>• Password must be at least 8 characters long</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
