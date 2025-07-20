import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import Logo from '../src/components/Logo';
import { useTheme } from 'next-themes';
import { Smartphone, Lock, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

export default function PhoneVerification() {
  const router = useRouter();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(0);

  // Validate Sri Lankan phone number
  const validatePhone = (phone: string): boolean => {
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    
    // Support multiple Sri Lankan phone number formats
    const patterns = [
      /^(\+94|0094|94)?0?7[0-9]{8}$/, // Mobile numbers: 070-079 series
      /^(\+94|0094|94)?0?1[1-9][0-9]{7}$/, // Landline numbers
      /^0?7[0-9]{8}$/, // Local mobile format: 0771234567
      /^7[0-9]{8}$/, // Mobile without leading 0: 771234567
    ];
    
    return patterns.some(pattern => pattern.test(cleanPhone));
  };

  useEffect(() => {
    setMounted(true);
    
    // Pre-fill phone number from URL parameter
    if (router.query.phone && typeof router.query.phone === 'string') {
      setPhone(router.query.phone);
      // If phone is provided and valid, skip to OTP step
      if (validatePhone(router.query.phone)) {
        setStep('otp');
      }
    }
  }, [router.query.phone]);

  // Countdown timer for resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePhone(phone)) {
      setError('Please enter a valid Sri Lankan phone number (e.g., 076 112 0457, 077 123 4567)');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/phone-verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          phone: phone.trim(),
          type: 'password-reset'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStep('otp');
        setMessage('📱 Verification code sent to your phone!');
        setCountdown(60); // 60 second countdown
      } else {
        setError(data.message || 'Failed to send verification code');
      }

    } catch (error) {
      console.error('Phone verification error:', error);
      setError('Failed to send verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      setError('Please enter the 6-digit verification code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: phone.trim(),
          otp: otp.trim()
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Phone number verified successfully. Redirecting to password reset...');
        
        // Generate a temporary token for password reset
        setTimeout(() => {
          router.push(`/reset-password?phone=${encodeURIComponent(phone)}&verified=true`);
        }, 2000);
      } else {
        setError(data.message || 'Invalid verification code');
      }

    } catch (error) {
      console.error('OTP verification error:', error);
      setError('Failed to verify code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (countdown > 0) {
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/phone-verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          phone: phone.trim(),
          type: 'password-reset'
        }),
      });

      if (response.ok) {
        setMessage('📱 New verification code sent!');
        setCountdown(60);
      } else {
        setError('Failed to resend code');
      }

    } catch {
      setError('Failed to resend code');
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
      
      <div className="pt-20 pb-12">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-2xl shadow-xl" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: theme === 'dark' ? '#2a2a2a' : '#F2F3F5' }}>
                <Smartphone className="w-8 h-8" style={{ color: '#FF5E14' }} />
              </div>
              <Logo size="large" className="mb-4" />
              <h1 className="text-2xl font-bold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                {step === 'phone' ? 'Phone Verification' : 'Enter Verification Code'}
              </h1>
              <p className="text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                {step === 'phone' 
                  ? 'Enter your Sri Lankan phone number for password reset' 
                  : `Code sent to ${phone}`
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

            {/* Phone Input Step */}
            {step === 'phone' && (
              <form onSubmit={handlePhoneSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full px-4 py-3 rounded-lg border border-opacity-30 focus:outline-none focus:ring-2 focus:border-transparent"
                    style={{ 
                      borderColor: theme === 'dark' ? '#444444' : '#D1D5DB',
                      backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                      color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                    }}
                    placeholder="077 123 4567 or +94 77 123 4567"
                  />
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: theme === 'dark' ? '#2a2a2a' : '#F9FAFB' }}>
                  <h3 className="text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                    🇱🇰 Supported Sri Lankan Numbers:
                  </h3>
                  <ul className="text-xs space-y-1" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                    <li>• Mobile: 070, 071, 072, 075, 076, 077, 078</li>
                    <li>• Landline: 011, 021, 023, 025, 026, 027, 031, 032, 033, 034, 035, 036, 037, 038, 041, 045, 047, 051, 052, 054, 055, 057, 063, 065, 066, 067, 081, 091</li>
                    <li>• Format: +94 XX XXX XXXX or 0XX XXX XXXX</li>
                  </ul>
                </div>

                <button
                  type="submit"
                  disabled={loading || !phone}
                  className="w-full py-3 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                  style={{ backgroundColor: loading ? '#9CA3AF' : '#FF5E14' }}
                >
                  {loading ? 'Sending...' : 'Send Verification Code'}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            )}

            {/* OTP Input Step */}
            {step === 'otp' && (
              <div className="space-y-6">
                <form onSubmit={handleOtpSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                      6-Digit Verification Code
                    </label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      required
                      disabled={loading}
                      className="w-full px-4 py-3 rounded-lg border border-opacity-30 focus:outline-none focus:ring-2 focus:border-transparent text-center text-2xl font-mono tracking-widest"
                      style={{ 
                        borderColor: theme === 'dark' ? '#444444' : '#D1D5DB',
                        backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                        color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                      }}
                      placeholder="123456"
                      maxLength={6}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading || otp.length !== 6}
                    className="w-full py-3 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                    style={{ backgroundColor: loading ? '#9CA3AF' : '#FF5E14' }}
                  >
                    {loading ? 'Verifying...' : 'Verify Code'}
                    <Lock className="w-5 h-5" />
                  </button>
                </form>

                {/* Resend Code */}
                <div className="text-center">
                  <p className="text-sm mb-2" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                    Didn&apos;t receive the code?
                  </p>
                  <button
                    onClick={handleResendCode}
                    disabled={countdown > 0 || loading}
                    className="text-sm font-medium hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ color: '#FF5E14' }}
                  >
                    {countdown > 0 ? `Resend in ${countdown}s` : 'Resend Code'}
                  </button>
                </div>

                {/* Change Phone Number */}
                <div className="text-center">
                  <button
                    onClick={() => {
                      setStep('phone');
                      setOtp('');
                      setMessage('');
                      setError('');
                    }}
                    className="text-sm hover:underline"
                    style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}
                  >
                    ← Change Phone Number
                  </button>
                </div>
              </div>
            )}

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
