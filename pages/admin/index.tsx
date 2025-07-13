import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../../src/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import Dashboard from './Dashboard';

const AdminIndex = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        // Check if user is admin (you'll need to implement this based on your user data structure)
        // For now, we'll use a simple email check
        const adminEmails = ['admin@toolntask.com', 'admin@example.com'];
        const userIsAdmin = adminEmails.includes(user.email || '');
        
        setIsAdmin(userIsAdmin);
        
        if (!userIsAdmin) {
          router.push('/');
        }
      } else {
        router.push('/SignIn');
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600">You don&apos;t have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return <Dashboard />;
};

export default AdminIndex;
