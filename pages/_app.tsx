import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import '../styles/globals.css';
import { auth } from '../src/lib/firebase';
import { useEffect } from 'react';
import { initializeAllData } from '../src/lib/initializeData';

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) console.log('User logged in:', user.uid);
      else console.log('No user logged in');
    });
    
    // Initialize data on app start
    initializeAllData();
    
    return () => unsubscribe();
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
