import type { NextApiRequest, NextApiResponse } from 'next';
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { db, auth } from '../../src/lib/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

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
      return res.status(200).json({ 
        passwordMatch: false, 
        hasResetPassword: false,
        shouldFallbackToFirebase: true 
      });
    }

    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();

    // Special check to see if user has completed password reset
    if (password === 'CHECK_IF_USER_HAS_RESET') {
      const hasCompletedReset = userData.passwordResetCompleted === true;
      return res.status(200).json({ hasResetPassword: hasCompletedReset });
    }

    // Check if user has completed a password reset
    if (userData.passwordResetCompleted === true && userData.currentPassword) {
      console.log(`🔐 Checking PERMANENT reset password for: ${email}`);
      
      // Check if provided password matches the current (reset) password
      if (userData.currentPassword === password) {
        console.log(`✅ PERMANENT reset password matched for: ${email}`);
        
        // Try to authenticate with Firebase Auth
        try {
          await signInWithEmailAndPassword(auth, email, password);
          await signOut(auth); // Sign out immediately after verification
          
          // Update last successful login
          await updateDoc(userDoc.ref, {
            lastSuccessfulLogin: new Date(),
            loginAttempts: 0 // Reset failed attempts
          });
          
          return res.status(200).json({ 
            passwordMatch: true,
            message: 'Login successful with reset password',
            isResetPassword: true
          });
          
        } catch {
          console.log(`⚠️ Firebase Auth failed, but password is correct for: ${email}`);
          
          // Even if Firebase Auth fails, password is correct
          await updateDoc(userDoc.ref, {
            lastSuccessfulLogin: new Date(),
            firebaseAuthNeedsSync: true,
            loginAttempts: 0
          });
          
          return res.status(200).json({ 
            passwordMatch: true,
            message: 'Login successful with reset password',
            isResetPassword: true,
            needsFirebaseSync: true
          });
        }
      } else {
        // Wrong reset password provided
        console.log(`❌ Wrong reset password provided for: ${email}`);
        
        // Increment failed attempts
        const currentAttempts = userData.loginAttempts || 0;
        await updateDoc(userDoc.ref, {
          loginAttempts: currentAttempts + 1,
          lastFailedLogin: new Date()
        });
        
        return res.status(200).json({ 
          passwordMatch: false, 
          hasResetPassword: true,
          isResetPassword: true,
          message: 'Please use your new password from the reset email',
          shouldFallbackToFirebase: false // Don't allow Firebase fallback
        });
      }
    }

    // No password reset completed - allow Firebase Auth fallback
    console.log(`📝 No reset password found for: ${email}, allowing Firebase Auth`);
    return res.status(200).json({ 
      passwordMatch: false, 
      hasResetPassword: false,
      shouldFallbackToFirebase: true
    });

  } catch (error) {
    console.error('Error checking reset password:', error);
    return res.status(500).json({ 
      passwordMatch: false, 
      hasResetPassword: false, 
      shouldFallbackToFirebase: true,
      error: 'Internal server error' 
    });
  }
}
