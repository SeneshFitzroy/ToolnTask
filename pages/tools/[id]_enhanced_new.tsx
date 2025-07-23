import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ToolDetailEnhancedNew() {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      // Redirect to the main tool detail page
      router.replace(`/tools/${id}`);
    }
  }, [id, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Loading tool details...
        </p>
      </div>
    </div>
  );
}
