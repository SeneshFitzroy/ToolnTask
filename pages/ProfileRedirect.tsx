import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Profile() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to ProfileNew component
    router.push('/ProfileNew');
  }, [router]);

  return null;
}
