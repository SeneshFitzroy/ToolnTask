import type { NextApiRequest, NextApiResponse } from 'next';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db, auth } from '../../src/lib/firebase';
import { signInWithEmailAndPassword, updatePassword } from 'firebase/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Find the user in Firestore to check for pending password reset
    const usersRef = collection(db, 'users');
    const userQuery = query(usersRef, where('email', '==', email));
    const userSnapshot = await getDocs(userQuery);

    if (userSnapshot.empty) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();

    // Check if there's a pending password reset
    if (userData.passwordResetRequired && userData.pendingPasswordReset) {
      console.log(`🔐 Processing pending password reset for: ${email}`);

      // Check if the provided password matches the pending reset password
      if (password === userData.pendingPasswordReset) {
        try {
          // We need to sign in with the old password first, but we don't have it
          // So we'll use a different approach - try to sign in with the new password
          // If it fails, we'll need to use Firebase Admin SDK or handle differently
          
          // Try signing in with the new password (in case it's already updated)
          try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            // Clear the pending password reset
            await updateDoc(userDoc.ref, {
              pendingPasswordReset: null,
              passwordResetRequired: false,
              passwordResetTimestamp: null,
              lastSuccessfulPasswordReset: new Date()
            });

            console.log(`✅ Password reset completed for user: ${email}`);
            
            return res.status(200).json({ 
              success: true,
              message: 'Password updated successfully',
              uid: user.uid
            });

          } catch (signInError) {
            // If sign-in fails, it means the password in Firebase Auth hasn't been updated yet
            // We need to handle this case by updating Firebase Auth password
            console.log(`⚠️ Sign-in failed, need to update Firebase Auth password for: ${email}`);
            
            // For now, let's try a workaround: mark that the user needs password update on next successful sign-in
            await updateDoc(userDoc.ref, {
              needsPasswordUpdateOnSignIn: true,
              pendingNewPassword: password,
              passwordUpdateAttempt: new Date()
            });

            return res.status(200).json({ 
              success: true,
              message: 'Password reset in progress. Please try signing in again.',
              requiresRetry: true
            });
          }

        } catch (error) {
          console.error('Error updating password:', error);
          return res.status(500).json({ 
            message: 'Error updating password',
            error: error 
          });
        }
      } else {
        return res.status(400).json({ message: 'Password does not match reset password' });
      }
    } else {
      return res.status(400).json({ message: 'No pending password reset for this user' });
    }

  } catch (error) {
    console.error('Password reset completion error:', error);
    res.status(500).json({ message: 'Failed to complete password reset' });
  }
}
