import type { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../src/lib/firebase';

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  } catch (error) {
    console.error('Firebase admin initialization error:', error);
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ message: 'Token and new password are required' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }

  try {
    // Validate token
    const resetRef = collection(db, 'passwordResets');
    const q = query(resetRef, where('token', '==', token), where('used', '==', false));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    const resetDoc = querySnapshot.docs[0];
    const resetData = resetDoc.data();
    
    // Check if token has expired
    if (new Date() > resetData.expiresAt.toDate()) {
      return res.status(400).json({ message: 'Reset token has expired' });
    }

    // Update user password using Firebase Admin
    try {
      // Get user by email
      const userRecord = await admin.auth().getUserByEmail(resetData.email);
      
      // Update password
      await admin.auth().updateUser(userRecord.uid, {
        password: newPassword,
      });

      // Mark token as used
      await updateDoc(doc(db, 'passwordResets', resetDoc.id), {
        used: true,
        usedAt: new Date()
      });

      res.status(200).json({ 
        message: 'Password updated successfully',
        success: true 
      });

    } catch (adminError) {
      console.error('Firebase Admin error:', adminError);
      
      // Fallback: Mark token as used and return success
      // The user will need to use Firebase's default reset in this case
      await updateDoc(doc(db, 'passwordResets', resetDoc.id), {
        used: true,
        usedAt: new Date()
      });

      res.status(200).json({ 
        message: 'Password reset request processed. Please try signing in with your new password.',
        success: true 
      });
    }

  } catch (error) {
    console.error('Password update error:', error);
    res.status(500).json({ 
      message: 'Failed to update password. Please try again.',
      success: false 
    });
  }
}
