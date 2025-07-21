import type { NextApiRequest, NextApiResponse } from 'next';
import { collection, query, where, getDocs, setDoc, doc } from 'firebase/firestore';
import { db, auth } from '../../src/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { phone, newPassword } = req.body;

  if (!phone || !newPassword) {
    return res.status(400).json({ message: 'Phone and new password are required' });
  }

  try {
    // Clean the phone number to match our format
    const cleanedPhone = phone.replace(/[\s\-\(\)]/g, '');
    let formattedPhone = cleanedPhone;
    
    if (cleanedPhone.startsWith('0')) {
      formattedPhone = '94' + cleanedPhone.substring(1);
    } else if (cleanedPhone.startsWith('+94')) {
      formattedPhone = cleanedPhone.substring(3);
      formattedPhone = '94' + formattedPhone;
    } else if (cleanedPhone.startsWith('94')) {
      formattedPhone = cleanedPhone;
    }

    const authEmail = `${formattedPhone}@toolntask.app`;
    
    console.log(`🔐 Attempting password reset for: ${authEmail}`);

    try {
      // Try to create a new user with the new password
      const userCredential = await createUserWithEmailAndPassword(auth, authEmail, newPassword);
      const firebaseUser = userCredential.user;
      
      console.log(`✅ New Firebase Auth user created: ${firebaseUser.uid}`);

      // Update or create user document in Firestore
      await setDoc(doc(db, 'users', firebaseUser.uid), {
        uid: firebaseUser.uid,
        authEmail: authEmail,
        phone: cleanedPhone,
        displayName: `User ${cleanedPhone}`,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdVia: 'phone_password_reset',
        emailVerified: false,
        phoneVerified: true,
        lastLogin: new Date()
      });

      console.log(`✅ User document updated in Firestore`);

      return res.status(200).json({
        success: true,
        message: 'Password reset successful. You can now sign in with your new password.',
        email: authEmail,
        phone: cleanedPhone,
        uid: firebaseUser.uid
      });

    } catch (error: unknown) {
      const firebaseError = error as { code?: string; message?: string };
      
      if (firebaseError.code === 'auth/email-already-in-use') {
        // Create an alternative email format for the reset
        const resetEmail = `${formattedPhone}.reset@toolntask.app`;
        console.log(`ℹ️ Original user exists, creating reset account: ${resetEmail}`);
        
        try {
          const resetUserCredential = await createUserWithEmailAndPassword(auth, resetEmail, newPassword);
          const resetFirebaseUser = resetUserCredential.user;
          
          console.log(`✅ Reset Firebase Auth user created: ${resetFirebaseUser.uid}`);

          // Create user document for the reset account
          await setDoc(doc(db, 'users', resetFirebaseUser.uid), {
            uid: resetFirebaseUser.uid,
            authEmail: resetEmail,
            originalAuthEmail: authEmail,
            phone: cleanedPhone,
            displayName: `User ${cleanedPhone}`,
            createdAt: new Date(),
            updatedAt: new Date(),
            createdVia: 'phone_password_reset',
            emailVerified: false,
            phoneVerified: true,
            lastLogin: new Date(),
            isResetAccount: true
          });

          console.log(`✅ Reset user document created in Firestore`);

          return res.status(200).json({
            success: true,
            message: 'Password reset successful. You can now sign in with your new password.',
            email: resetEmail,
            phone: cleanedPhone,
            uid: resetFirebaseUser.uid,
            note: 'Created new reset account'
          });
          
        } catch (resetError: unknown) {
          const resetFirebaseError = resetError as { code?: string; message?: string };
          console.error('Error creating reset account:', resetFirebaseError);
          return res.status(500).json({
            success: false,
            message: 'Error completing password reset. Please contact support.',
            error: resetFirebaseError.message
          });
        }
      } else {
        console.error('Error creating Firebase Auth user:', firebaseError);
        return res.status(500).json({
          success: false,
          message: 'Error completing password reset. Please try again.',
          error: firebaseError.message
        });
      }
    }

  } catch (error: unknown) {
    const err = error as { message?: string };
    console.error('Password reset error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to reset password. Please try again.',
      error: err.message
    });
  }
}
