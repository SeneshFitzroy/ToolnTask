
import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import Logo from '../src/components/Logo';
import { Button } from '../src/components/ui/button';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../src/lib/firebase';

export default function SignIn() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme === 'dark' ? '#0C0F16' : '#F2F3F5' }}>
      <Navigation />
      
      <div className="flex items-center justify-center py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-sm sm:max-w-md w-full">
          <div className="rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>Welcome Back!</h1>
              <p className="flex items-center justify-center gap-1 flex-wrap" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                Sign in to your <Logo size="small" /> account
              </p>
            </div>

            <form className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#B3B5BC' : '#374151' }}>Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border-2 rounded-lg sm:rounded-xl focus:outline-none transition-colors"
                  style={{ 
                    borderColor: theme === 'dark' ? '#4B5563' : '#E2E8F0',
                    backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF',
                    color: theme === 'dark' ? '#FFFFFF' : '#1A1818'
                  }}
                  placeholder="your.email@example.com"
                  onFocus={(e) => e.currentTarget.style.borderColor = '#FF5E14'}
                  onBlur={(e) => e.currentTarget.style.borderColor = theme === 'dark' ? '#4B5563' : '#E2E8F0'}
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#B3B5BC' : '#374151' }}>Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border-2 rounded-lg sm:rounded-xl focus:outline-none transition-colors"
                  style={{ 
                    borderColor: theme === 'dark' ? '#4B5563' : '#E2E8F0',
                    backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF',
                    color: theme === 'dark' ? '#FFFFFF' : '#1A1818'
                  }}
                  placeholder="Enter your password"
                  onFocus={(e) => e.currentTarget.style.borderColor = '#FF5E14'}
                  onBlur={(e) => e.currentTarget.style.borderColor = theme === 'dark' ? '#4B5563' : '#E2E8F0'}
                />
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded mr-2" style={{ accentColor: '#FF5E14' }} />
                  <span className="text-sm" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>Remember me</span>
                </label>
                <Link href="#" className="text-sm hover:underline" style={{ color: '#FF5E14' }}>
                  Forgot password?
                </Link>
              </div>
              
              <Button className="w-full text-white py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-105" style={{ backgroundColor: '#FF5E14' }}>
                Sign In
              </Button>
            </form>

            <div className="mt-6 sm:mt-8 text-center">
              <p style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                Don&apos;t have an account?{' '}
                <Link href="/SignUp" className="font-semibold hover:underline" style={{ color: '#FF5E14' }}>
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
