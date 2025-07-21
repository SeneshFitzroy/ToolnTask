import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Profile() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the new ProfileNew page
    router.replace('/ProfileNew');
  }, [router]);

  return null;
}
