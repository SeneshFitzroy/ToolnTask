import type { NextApiRequest, NextApiResponse } from 'next';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db, auth } from '../../src/lib/firebase';
import { signInWithEmailAndPassword, updatePassword, signOut } from 'firebase/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { token, newPassword } = req.body;

  if (!token) {
    return res.status(400).json({ message: 'Reset token is required' });
  }

  if (!newPassword) {
    return res.status(400).json({ message: 'New password is required' });
  }

  // Simple password validation - just length requirement
  if (newPassword.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long' });
  }

  try {
    // Handle token-based password reset (email flow)
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
      return res.status(400).json({ message: 'Reset token has expired. Please request a new password reset.' });
    }

    const userEmail = resetData.email;

    // Sign in as the user temporarily to update password
    try {
      // First, try to sign in with their current password to get the user
      const usersRef = collection(db, 'users');
      const userQuery = query(usersRef, where('email', '==', userEmail));
      const userSnapshot = await getDocs(userQuery);

      if (userSnapshot.empty) {
        return res.status(404).json({ message: 'User not found' });
      }

      const userData = userSnapshot.docs[0].data();
      
      // Try to sign in with the stored password and then update
      if (userData.tempPassword) {
        const userCredential = await signInWithEmailAndPassword(auth, userEmail, userData.tempPassword);
        await updatePassword(userCredential.user, newPassword);
        await signOut(auth);
        
        // Update user document
        await updateDoc(userSnapshot.docs[0].ref, {
          tempPassword: null,
          lastPasswordUpdate: new Date()
        });
      } else {
        // Update the password in Firestore for next login
        await updateDoc(userSnapshot.docs[0].ref, {
          tempPassword: newPassword,
          passwordUpdateRequired: true,
          lastPasswordUpdate: new Date()
        });
      }

      // Mark token as used
      await updateDoc(doc(db, 'passwordResets', resetDoc.id), {
        used: true,
        usedAt: new Date()
      });

      return res.status(200).json({
        message: 'Password updated successfully. You can now sign in with your new password.',
        action: 'password_updated'
      });

    } catch (error: unknown) {
      console.error('Error updating password:', error);
      
      // Fallback: Store the new password for next login
      const usersRef = collection(db, 'users');
      const userQuery = query(usersRef, where('email', '==', userEmail));
      const userSnapshot = await getDocs(userQuery);

      if (!userSnapshot.empty) {
        await updateDoc(userSnapshot.docs[0].ref, {
          tempPassword: newPassword,
          passwordUpdateRequired: true,
          lastPasswordUpdate: new Date()
        });

        // Mark token as used
        await updateDoc(doc(db, 'passwordResets', resetDoc.id), {
          used: true,
          usedAt: new Date()
        });

        return res.status(200).json({
          message: 'Password updated successfully. You can now sign in with your new password.',
          action: 'password_updated'
        });
      }

      return res.status(500).json({ message: 'Error updating password. Please try again.' });
    }

  } catch (error: unknown) {
    console.error('API Error:', error);
    return res.status(500).json({ message: 'Internal server error. Please try again.' });
  }
}
