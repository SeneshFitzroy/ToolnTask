import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function TaskDetailRedirect() {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      // Redirect to enhanced version
      router.replace(`/tasks/${id}_enhanced`);
    }
  }, [id, router]);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F8FAFC' }}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
        <h1 className="text-xl font-semibold text-gray-800">Redirecting to enhanced page...</h1>
        <p className="text-gray-600 mt-2">Please wait while we redirect you to the enhanced gig detail page.</p>
      </div>
    </div>
  );
}
