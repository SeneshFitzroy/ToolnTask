import Link from 'next/link';
import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import Logo from '../src/components/Logo';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function NotFound() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F2F3F5' }}>
      <Navigation />
      
      <div className="flex items-center justify-center py-16 sm:py-24 lg:py-32 px-4">
        <div className="text-center max-w-md mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>404</h1>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6" style={{ color: theme === 'dark' ? '#FF5E14' : '#001554' }}>Page Not Found</h2>
          <p className="text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back to <Logo size="small" className="inline mx-1" />.
          </p>
          <Link 
            href="/"
            className="inline-block text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: '#FF5E14' }}
          >
            Go Home
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
