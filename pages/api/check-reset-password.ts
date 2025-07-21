import type { NextApiRequest, NextApiResponse } from 'next';
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { db, auth } from '../../src/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword, signOut } from 'firebase/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Find the user in Firestore
    const usersRef = collection(db, 'users');
    const userQuery = query(usersRef, where('email', '==', email));
    const userSnapshot = await getDocs(userQuery);

    if (userSnapshot.empty) {
      return res.status(200).json({ passwordMatch: false, hasResetPassword: false });
    }

    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();

    // Special check to see if user has reset password (for blocking old password)
    if (password === 'CHECK_IF_USER_HAS_RESET') {
      const hasReset = userData.newPasswordFromReset && userData.passwordResetCompleted;
      return res.status(200).json({ hasResetPassword: hasReset });
    }

    // Check if user has a pending password reset
    const hasPendingReset = userData.newPasswordFromReset && userData.passwordResetCompleted;
    
    if (hasPendingReset) {
      // User has reset password - ONLY allow the new password
      if (userData.newPasswordFromReset === password) {
        console.log(`🔐 Reset password matched for: ${email}`);
        
        try {
          // Update Firebase Auth with new password
          try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log(`✅ New Firebase Auth user created for: ${email}`);
          } catch (authError: unknown) {
            const firebaseError = authError as { code?: string; message?: string };
            if (firebaseError.code === 'auth/email-already-in-use') {
              console.log(`🔄 Updating existing Firebase Auth password for: ${email}`);
              
              // Force update Firebase Auth password by signing in with default passwords
              const tryPasswords = ['password123', 'tempPassword123', userData.tempPassword];
              
              for (const tryPass of tryPasswords) {
                if (!tryPass) {
                  continue;
                }
                try {
                  const userCred = await signInWithEmailAndPassword(auth, email, tryPass);
                  await updatePassword(userCred.user, password);
                  await signOut(auth);
                  console.log(`✅ Firebase Auth password updated for: ${email}`);
                  break;
                } catch {
                  continue;
                }
              }
            }
          }
          
          // Clear reset flags and finalize password
          await updateDoc(userDoc.ref, {
            newPasswordFromReset: null,
            passwordResetCompleted: false,
            currentPassword: password,
            lastSuccessfulLogin: new Date(),
            passwordUpdatedAt: new Date()
          });
          
          return res.status(200).json({ 
            passwordMatch: true,
            message: 'Login successful with reset password' 
          });
          
        } catch (error) {
          console.error('Error processing reset password login:', error);
          
          // Clear reset flags even on error
          await updateDoc(userDoc.ref, {
            newPasswordFromReset: null,
            passwordResetCompleted: false,
            currentPassword: password,
            lastSuccessfulLogin: new Date()
          });
          
          return res.status(200).json({ 
            passwordMatch: true,
            message: 'Login successful with reset password' 
          });
        }
      } else {
        // User has reset password but provided wrong new password
        console.log(`❌ Wrong reset password provided for: ${email}`);
        return res.status(200).json({ 
          passwordMatch: false, 
          hasResetPassword: true,
          message: 'Please use your new password from the reset email' 
        });
      }
    }

    // No pending reset - user can use regular Firebase Auth
    return res.status(200).json({ passwordMatch: false, hasResetPassword: false });

  } catch (error) {
    console.error('Error checking reset password:', error);
    return res.status(500).json({ passwordMatch: false, hasResetPassword: false, error: 'Internal server error' });
  }
}
