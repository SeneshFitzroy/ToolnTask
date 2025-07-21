import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import '../styles/globals.css';
import { AuthProvider } from '../src/contexts/AuthContext'; // Import the AuthProvider
import { useEffect } from 'react';
import { initializeAllData } from '../src/lib/initializeData';

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Initialize data on app start
    initializeAllData();
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}
