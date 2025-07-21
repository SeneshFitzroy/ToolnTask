import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useLanguage } from '../src/contexts/LanguageContext';

export default function Profile() {
  const router = useRouter();
  const { t } = useLanguage();
  const [isRedirecting] = useState(true);

  useEffect(() => {
    // Show loading for a brief moment then redirect
    const timer = setTimeout(() => {
      router.replace('/ProfileNew');
    }, 100);

    return () => clearTimeout(timer);
  }, [router]);

  if (isRedirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">{t('loading')}</p>
        </div>
      </div>
    );
  }

  return null;
}
