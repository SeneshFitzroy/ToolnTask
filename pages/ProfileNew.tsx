import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ProfileNew() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to main profile page
    router.replace('/Profile');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
        <p className="mt-4 text-lg text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
}
