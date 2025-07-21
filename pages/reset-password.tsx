import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import Logo from '../src/components/Logo';
import { useTheme } from 'next-themes';
import { Eye, EyeOff, Lock, CheckCircle, AlertTriangle, Check, X } from 'lucide-react';

export default function ResetPassword() {
  const router = useRouter();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [token, setToken] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [verified, setVerified] = useState<boolean>(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Password validation states
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
    match: false
  });

  useEffect(() => {
    setMounted(true);
    
    // Handle traditional email token reset
    if (router.query.token) {
      setToken(router.query.token as string);
    }
    
    // Handle phone verification reset
    if (router.query.phone && router.query.verified === 'true') {
      setPhone(router.query.phone as string);
      setVerified(true);
    }
    
    // If neither token nor verified phone, show error
    if (router.isReady && !router.query.token && !(router.query.phone && router.query.verified === 'true')) {
      setError('Invalid reset link. Please request a new password reset.');
    }
  }, [router.query, router.isReady]);

  // Real-time password validation
  useEffect(() => {
    const validation = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      match: password === confirmPassword && password.length > 0
    };
    setPasswordValidation(validation);
  }, [password, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Check all password requirements
    const allValid = Object.values(passwordValidation).every(valid => valid);
    if (!allValid) {
      setError('Please meet all password requirements');
      return;
    }

    // Validate reset method (either token or verified phone)
    if (!token && !(phone && verified)) {
      setError('Invalid reset authorization');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // For phone-based reset, use the new phone password reset API
      if (phone && verified) {
        const response = await fetch('/api/reset-phone-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phone: phone,
            newPassword: password
          }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setMessage('Password reset successful! You can now sign in with your new password.');
          
          setTimeout(() => {
            router.push('/SignIn?message=password-reset-success');
          }, 2000);
        } else {
          // Handle specific error cases
          if (data.error === 'SAME_PASSWORD') {
            setError('New password cannot be the same as your current password. Please choose a different password.');
          } else if (data.error === 'SAME_PASSWORD_HISTORY') {
            setError('New password cannot be the same as any of your previous passwords. Please choose a different password.');
          } else if (data.error === 'PASSWORD_TOO_SHORT') {
            setError('Password must be at least 8 characters long. Please choose a longer password.');
          } else {
            setError(data.message || 'Error resetting password. Please try again.');
          }
        }
      } else {
        // For token-based reset (email), use the existing API
        const response = await fetch('/api/update-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: token || undefined,
            phone: phone || undefined,
            verified: verified || undefined,
            newPassword: password
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setMessage('Password updated successfully. Redirecting to sign in...');
          
          setTimeout(() => {
            router.push('/SignIn?message=password-reset-success');
          }, 2000);
        } else {
          setError(data.message || 'Error updating password. Please try again.');
        }
      }

    } catch (error) {
      console.error('Password reset error:', error);
      setError('Error updating password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  // Show error if neither token nor verified phone
  if (!token && !(phone && verified)) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F2F3F5' }}>
        <Navigation />
        <div className="pt-20 pb-12">
          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center p-8 rounded-2xl" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
              <AlertTriangle className="w-16 h-16 mx-auto mb-4" style={{ color: '#DC2626' }} />
              <h1 className="text-2xl font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                Invalid Reset Link
              </h1>
              <p className="mb-6" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                This password reset link is invalid or has expired. Please request a new password reset.
              </p>
              <button
                onClick={() => router.push('/SignIn')}
                className="w-full py-3 text-white font-semibold rounded-lg transition-colors"
                style={{ backgroundColor: '#FF5E14' }}
              >
                Back to Sign In
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F2F3F5' }}>
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-2xl shadow-xl" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: theme === 'dark' ? '#2a2a2a' : '#F2F3F5' }}>
                <Lock className="w-8 h-8" style={{ color: '#FF5E14' }} />
              </div>
              <Logo size="large" className="mb-4" />
              <h1 className="text-2xl font-bold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                Create New Password
              </h1>
              <p className="text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                {phone && verified 
                  ? `Phone verified: ${phone} ✅`
                  : 'Your new password must meet security requirements'
                }
              </p>
            </div>

            {/* Success/Error Messages */}
            {message && (
              <div className="mb-6 p-4 rounded-lg border-2 border-green-300" style={{ backgroundColor: '#D1FAE5', color: '#047857' }}>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>{message}</span>
                </div>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 rounded-lg border-2 border-red-300" style={{ backgroundColor: '#FEE2E2', color: '#DC2626' }}>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span>{error}</span>
                </div>
              </div>
            )}

            {/* Reset Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* New Password */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full px-4 py-3 pr-12 rounded-lg border border-opacity-30 focus:outline-none focus:ring-2 focus:border-transparent"
                    style={{ 
                      borderColor: theme === 'dark' ? '#444444' : '#D1D5DB',
                      backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                      color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                    }}
                    placeholder="Enter your new password"
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
              </div>

              {/* Password Requirements */}
              {password.length > 0 && (
                <div className="p-4 rounded-lg" style={{ backgroundColor: theme === 'dark' ? '#2a2a2a' : '#F9FAFB' }}>
                  <h3 className="text-sm font-medium mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                    Password Requirements:
                  </h3>
                  <div className="space-y-2">
                    {[
                      { key: 'length', text: 'At least 8 characters' },
                      { key: 'uppercase', text: 'One uppercase letter (A-Z)' },
                      { key: 'lowercase', text: 'One lowercase letter (a-z)' },
                      { key: 'number', text: 'One number (0-9)' },
                      { key: 'special', text: 'One special character (!@#$%^&*)' }
                    ].map(({ key, text }) => (
                      <div key={key} className="flex items-center gap-2">
                        {passwordValidation[key as keyof typeof passwordValidation] ? (
                          <Check className="w-4 h-4" style={{ color: '#10B981' }} />
                        ) : (
                          <X className="w-4 h-4" style={{ color: '#EF4444' }} />
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

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full px-4 py-3 pr-12 rounded-lg border border-opacity-30 focus:outline-none focus:ring-2 focus:border-transparent"
                    style={{ 
                      borderColor: theme === 'dark' ? '#444444' : '#D1D5DB',
                      backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                      color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                    }}
                    placeholder="Confirm your new password"
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
                {confirmPassword.length > 0 && (
                  <div className="flex items-center gap-2 mt-2">
                    {passwordValidation.match ? (
                      <>
                        <Check className="w-4 h-4" style={{ color: '#10B981' }} />
                        <span className="text-xs" style={{ color: '#10B981' }}>Passwords match</span>
                      </>
                    ) : (
                      <>
                        <X className="w-4 h-4" style={{ color: '#EF4444' }} />
                        <span className="text-xs" style={{ color: '#EF4444' }}>Passwords don&apos;t match</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !Object.values(passwordValidation).every(valid => valid)}
                className="w-full py-3 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{ backgroundColor: loading ? '#9CA3AF' : '#FF5E14' }}
              >
                {loading ? 'Updating Password...' : 'Update Password Securely'}
              </button>
            </form>

            {/* Back to Sign In */}
            <div className="mt-6 text-center">
              <button
                onClick={() => router.push('/SignIn')}
                className="text-sm hover:underline"
                style={{ color: '#FF5E14' }}
              >
                ← Back to Sign In
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
