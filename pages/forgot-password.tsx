import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import Logo from '../src/components/Logo';
import { useTheme } from 'next-themes';
import { Mail, Smartphone, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';

export default function ForgotPassword() {
  const router = useRouter();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Validate Sri Lankan phone number
  const validatePhone = (phone: string): boolean => {
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    const patterns = [
      /^(\+94|0094|94)?7[0-9]{8}$/, // Mobile
      /^(\+94|0094|94)?1[1-9][0-9]{7}$/, // Landline
    ];
    return patterns.some(pattern => pattern.test(cleanPhone));
  };

  // Validate email
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (method === 'email') {
      if (!email || !validateEmail(email)) {
        setError('Please enter a valid email address');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/password-reset', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email.trim() }),
        });

        const data = await response.json();

        if (response.ok) {
          setMessage('🚀 Reset link sent to your email! Check your inbox.');
        } else {
          setError(data.message || 'Failed to send reset email');
        }
      } catch {
        setError('Failed to send reset email. Please try again.');
      }
    } else {
      if (!phone || !validatePhone(phone)) {
        setError('Please enter a valid Sri Lankan phone number (e.g., 077 123 4567)');
        setLoading(false);
        return;
      }

      // Redirect to phone verification page
      router.push(`/phone-verification?phone=${encodeURIComponent(phone)}&type=password-reset`);
      return;
    }

    setLoading(false);
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
                {method === 'email' ? (
                  <Mail className="w-8 h-8" style={{ color: '#FF5E14' }} />
                ) : (
                  <Smartphone className="w-8 h-8" style={{ color: '#FF5E14' }} />
                )}
              </div>
              <Logo size="large" className="mb-4" />
              <h1 className="text-2xl font-bold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                Reset Your Password
              </h1>
              <p className="text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                Choose how you&apos;d like to receive your password reset
              </p>
            </div>

            {/* Method Selection */}
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setMethod('email')}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-2 ${
                    method === 'email' 
                      ? 'border-orange-500 bg-orange-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  style={{
                    backgroundColor: method === 'email' 
                      ? (theme === 'dark' ? '#2a1a0a' : '#FFF7ED')
                      : (theme === 'dark' ? '#2a2a2a' : '#FFFFFF'),
                    borderColor: method === 'email' ? '#FF5E14' : (theme === 'dark' ? '#444444' : '#D1D5DB')
                  }}
                >
                  <Mail className="w-6 h-6" style={{ color: method === 'email' ? '#FF5E14' : (theme === 'dark' ? '#CCCCCC' : '#6B7280') }} />
                  <span className="text-sm font-medium" style={{ color: method === 'email' ? '#FF5E14' : (theme === 'dark' ? '#FFFFFF' : '#2D3748') }}>
                    Email
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setMethod('phone')}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-2 ${
                    method === 'phone' 
                      ? 'border-orange-500 bg-orange-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  style={{
                    backgroundColor: method === 'phone' 
                      ? (theme === 'dark' ? '#2a1a0a' : '#FFF7ED')
                      : (theme === 'dark' ? '#2a2a2a' : '#FFFFFF'),
                    borderColor: method === 'phone' ? '#FF5E14' : (theme === 'dark' ? '#444444' : '#D1D5DB')
                  }}
                >
                  <Smartphone className="w-6 h-6" style={{ color: method === 'phone' ? '#FF5E14' : (theme === 'dark' ? '#CCCCCC' : '#6B7280') }} />
                  <span className="text-sm font-medium" style={{ color: method === 'phone' ? '#FF5E14' : (theme === 'dark' ? '#FFFFFF' : '#2D3748') }}>
                    Phone 🇱🇰
                  </span>
                </button>
              </div>
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

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {method === 'email' ? (
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                      className="w-full pl-12 pr-4 py-3 rounded-lg border border-opacity-30 focus:outline-none focus:ring-2 focus:border-transparent"
                      style={{ 
                        borderColor: theme === 'dark' ? '#444444' : '#D1D5DB',
                        backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                        color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                      }}
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                    Phone Number (Sri Lanka 🇱🇰)
                  </label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }} />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      disabled={loading}
                      className="w-full pl-12 pr-4 py-3 rounded-lg border border-opacity-30 focus:outline-none focus:ring-2 focus:border-transparent"
                      style={{ 
                        borderColor: theme === 'dark' ? '#444444' : '#D1D5DB',
                        backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                        color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                      }}
                      placeholder="077 123 4567 or +94 77 123 4567"
                    />
                  </div>
                </div>
              )}

              {/* Info Box */}
              <div className="p-4 rounded-lg" style={{ backgroundColor: theme === 'dark' ? '#2a2a2a' : '#F9FAFB' }}>
                <div className="flex items-start gap-2">
                  {method === 'email' ? (
                    <Mail className="w-5 h-5 mt-0.5" style={{ color: '#FF5E14' }} />
                  ) : (
                    <Smartphone className="w-5 h-5 mt-0.5" style={{ color: '#FF5E14' }} />
                  )}
                  <div>
                    <p className="text-sm font-medium mb-1" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                      {method === 'email' ? 'Email Reset:' : 'SMS Verification:'}
                    </p>
                    <p className="text-xs" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                      {method === 'email' 
                        ? 'We\'ll send a secure password reset link to your email address.'
                        : 'We\'ll send a 6-digit verification code to your Sri Lankan phone number.'
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || (method === 'email' ? !email : !phone)}
                className="w-full py-3 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                style={{ backgroundColor: loading ? '#9CA3AF' : '#FF5E14' }}
              >
                {loading ? (
                  'Sending...'
                ) : (
                  <>
                    {method === 'email' ? 'Send Reset Email' : 'Send SMS Code'}
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
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
