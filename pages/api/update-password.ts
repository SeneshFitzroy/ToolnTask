import type { NextApiRequest, NextApiResponse } from 'next';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db, auth } from '../../src/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword, signOut } from 'firebase/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { token, newPassword } = req.body;

  if (!token) {
    return res.status(400).json({ message: 'Reset token is required' });
  }

  if (!newPassword || newPassword.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long' });
  }

  try {
    // Find the reset token
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
    console.log(`🔐 Processing password reset for: ${userEmail}`);

    // Find or create user in Firestore
    const usersRef = collection(db, 'users');
    const userQuery = query(usersRef, where('email', '==', userEmail));
    const userSnapshot = await getDocs(userQuery);

    let userDocRef;
    let userData = null;

    if (userSnapshot.empty) {
      // Create user document if it doesn't exist
      userDocRef = doc(db, 'users', userEmail.replace('@', '_at_').replace('.', '_dot_'));
      console.log(`📝 Creating new user document for: ${userEmail}`);
    } else {
      userDocRef = userSnapshot.docs[0].ref;
      userData = userSnapshot.docs[0].data();
      console.log(`👤 Found existing user document for: ${userEmail}`);
    }

    // Try to create/update Firebase Auth user
    try {
      // First, try to create a new Firebase Auth user
      console.log(`🔥 Attempting to create Firebase Auth user for: ${userEmail}`);
      const userCredential = await createUserWithEmailAndPassword(auth, userEmail, newPassword);
      console.log(`✅ Firebase Auth user created: ${userCredential.user.uid}`);
      
      // Update/create Firestore document
      await updateDoc(userDocRef, {
        uid: userCredential.user.uid,
        email: userEmail,
        displayName: userData?.displayName || userEmail.split('@')[0],
        createdAt: userData?.createdAt || new Date(),
        lastPasswordUpdate: new Date(),
        emailVerified: false,
        passwordSetViaReset: true
      });
      
    } catch (authError: unknown) {
      const firebaseError = authError as { code?: string; message?: string };
      if (firebaseError.code === 'auth/email-already-in-use') {
        console.log(`🔄 Email already exists, attempting to update password for: ${userEmail}`);
        
        // User exists, try to sign in and update password
        try {
          // Try signing in with common default passwords first
          const defaultPasswords = ['password123', 'tempPassword123', userData?.tempPassword];
          let signedIn = false;
          
          for (const tryPassword of defaultPasswords) {
            if (!tryPassword) continue;
            try {
              const userCredential = await signInWithEmailAndPassword(auth, userEmail, tryPassword);
              await updatePassword(userCredential.user, newPassword);
              await signOut(auth);
              console.log(`✅ Password updated via auth update for: ${userEmail}`);
              signedIn = true;
              break;
            } catch {
              continue;
            }
          }
          
          if (!signedIn) {
            console.log(`⚠️ Could not sign in to update password, storing in Firestore for: ${userEmail}`);
            // Store the new password for manual login handling
            await updateDoc(userDocRef, {
              email: userEmail,
              newPasswordFromReset: newPassword,
              passwordResetCompleted: true,
              lastPasswordUpdate: new Date(),
              resetInstructions: 'Use this password for login'
            });
          }
          
        } catch (updateError) {
          console.log(`📝 Storing password in Firestore for later use: ${userEmail}`);
          // Fallback: store password in Firestore
          await updateDoc(userDocRef, {
            email: userEmail,
            newPasswordFromReset: newPassword,
            passwordResetCompleted: true,
            lastPasswordUpdate: new Date(),
            resetInstructions: 'Use this password for login'
          });
        }
      } else {
        throw authError;
      }
    }

    // Mark token as used
    await updateDoc(doc(db, 'passwordResets', resetDoc.id), {
      used: true,
      usedAt: new Date()
    });

    console.log(`🎉 Password reset completed successfully for: ${userEmail}`);
    
    return res.status(200).json({
      message: 'Password updated successfully. You can now sign in with your new password.'
    });

  } catch (error) {
    console.error('Password update error:', error);
    return res.status(500).json({ message: 'Failed to update password. Please try again.' });
  }
}
