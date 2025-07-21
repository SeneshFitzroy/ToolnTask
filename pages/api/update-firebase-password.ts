import type { NextApiRequest, NextApiResponse } from 'next';
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { db, auth } from '../../src/lib/firebase';
import { signInWithEmailAndPassword, updatePassword } from 'firebase/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, currentPassword, newPassword } = req.body;

  if (!email || !currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Email, current password, and new password are required' });
  }

  try {
    // First, authenticate the user with their current credentials
    const userCredential = await signInWithEmailAndPassword(auth, email, currentPassword);
    const user = userCredential.user;

    // Update the password in Firebase Auth
    await updatePassword(user, newPassword);

    // Remove the temporary password from Firestore
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('authEmail', '==', email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      await updateDoc(userDoc.ref, {
        tempPassword: null,
        passwordUpdateRequired: false,
        passwordUpdatedAt: new Date()
      });
    }

    console.log(`✅ Password updated in Firebase Auth for: ${email}`);

    return res.status(200).json({
      success: true,
      message: 'Password updated successfully in Firebase Auth'
    });

  } catch (error: unknown) {
    const firebaseError = error as { message?: string };
    console.error('Error updating password in Firebase Auth:', firebaseError);
    return res.status(500).json({
      success: false,
      message: 'Failed to update password in Firebase Auth',
      error: firebaseError.message
    });
  }
}
