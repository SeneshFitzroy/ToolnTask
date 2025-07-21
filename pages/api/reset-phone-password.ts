import type { NextApiRequest, NextApiResponse } from 'next';
import { setDoc, doc, collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../../src/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

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
    const resetEmail = `${formattedPhone}.reset@toolntask.app`;
    
    console.log(`🔐 Attempting password reset for: ${authEmail}`);
    console.log(`🔄 Reset email format: ${resetEmail}`);

    // Check if the new password is the same as the current password
    // We'll try to sign in with the original account and the new password
    // If it succeeds, it means they're trying to use the same password
    try {
      console.log('🔍 Checking if new password is same as current password...');
      const testSignIn = await signInWithEmailAndPassword(auth, authEmail, newPassword);
      if (testSignIn.user) {
        // Sign out immediately
        await signOut(auth);
        console.log('❌ User tried to use the same password');
        return res.status(400).json({
          success: false,
          message: 'New password cannot be the same as your current password. Please choose a different password.',
          error: 'SAME_PASSWORD'
        });
      }
    } catch {
      // If sign in fails, it's good - means they're using a different password
      // We'll also check reset accounts
      console.log('✅ New password is different from original account password');
      
      // Also check if new password matches any existing reset account
      try {
        const resetSignIn = await signInWithEmailAndPassword(auth, resetEmail, newPassword);
        if (resetSignIn.user) {
          await signOut(auth);
          console.log('❌ User tried to use the same password as existing reset account');
          return res.status(400).json({
            success: false,
            message: 'New password cannot be the same as your current password. Please choose a different password.',
            error: 'SAME_PASSWORD'
          });
        }
      } catch {
        // Good - new password is different from reset account too
        console.log('✅ New password is different from reset account password');
      }
      
      // Also check timestamped reset accounts to prevent reusing passwords
      try {
        const usersRef = collection(db, 'users');
        const timestampedResetQuery = query(
          usersRef, 
          where('phone', '==', cleanedPhone),
          where('isResetAccount', '==', true)
        );
        const timestampedResetSnapshot = await getDocs(timestampedResetQuery);
        
        if (!timestampedResetSnapshot.empty) {
          console.log('🔍 Checking timestamped reset accounts for password reuse...');
          for (const doc of timestampedResetSnapshot.docs) {
            const resetData = doc.data();
            if (resetData.authEmail) {
              try {
                const timestampedSignIn = await signInWithEmailAndPassword(auth, resetData.authEmail, newPassword);
                if (timestampedSignIn.user) {
                  await signOut(auth);
                  console.log('❌ User tried to reuse password from a previous reset');
                  return res.status(400).json({
                    success: false,
                    message: 'New password cannot be the same as any of your previous passwords. Please choose a different password.',
                    error: 'SAME_PASSWORD_HISTORY'
                  });
                }
              } catch {
                // Good - password is different from this timestamped reset account
                continue;
              }
            }
          }
          console.log('✅ New password is different from all previous reset accounts');
        }
      } catch {
        console.log('⚠️ Could not check timestamped reset accounts, proceeding...');
      }
    }

    // First check if a reset account already exists
    const usersRef = collection(db, 'users');
    const resetQuery = query(usersRef, where('authEmail', '==', resetEmail));
    const resetSnapshot = await getDocs(resetQuery);
    
    if (!resetSnapshot.empty) {
      // Reset account exists - create a new timestamped reset account
      const timestamp = Date.now();
      const newResetEmail = `${formattedPhone}.reset${timestamp}@toolntask.app`;
      console.log(`� Reset account exists, creating new timestamped reset: ${newResetEmail}`);
      
      try {
        // Create new Firebase Auth user with timestamped email
        const resetUserCredential = await createUserWithEmailAndPassword(auth, newResetEmail, newPassword);
        const resetFirebaseUser = resetUserCredential.user;
        
        console.log(`✅ New timestamped reset account created: ${resetFirebaseUser.uid}`);

        // Create user document for the new reset account
        await setDoc(doc(db, 'users', resetFirebaseUser.uid), {
          uid: resetFirebaseUser.uid,
          authEmail: newResetEmail,
          originalAuthEmail: authEmail,
          phone: cleanedPhone,
          displayName: `User ${cleanedPhone}`,
          createdAt: new Date(),
          updatedAt: new Date(),
          createdVia: 'phone_password_reset',
          emailVerified: false,
          phoneVerified: true,
          lastLogin: new Date(),
          isResetAccount: true,
          passwordUpdatedAt: new Date(),
          resetTimestamp: timestamp
        });

        console.log(`✅ New reset user document created`);

        return res.status(200).json({
          success: true,
          message: 'Password updated successfully. You can now sign in with your new password.',
          email: newResetEmail,
          phone: cleanedPhone,
          uid: resetFirebaseUser.uid
        });
        
      } catch (authError: unknown) {
        const authErr = authError as { code?: string; message?: string };
        console.error('Error creating new reset account:', authErr);
        return res.status(500).json({
          success: false,
          message: 'Error updating password. Please try again.',
          error: authErr.message
        });
      }
    }

    // Try to create the original account first
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, authEmail, newPassword);
      const firebaseUser = userCredential.user;
      
      console.log(`✅ Original Firebase Auth user created: ${firebaseUser.uid}`);

      // Create user document in Firestore
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

      console.log(`✅ User document created in Firestore`);

      return res.status(200).json({
        success: true,
        message: 'Account created successfully. You can now sign in with your phone number.',
        email: authEmail,
        phone: cleanedPhone,
        uid: firebaseUser.uid
      });

    } catch (error: unknown) {
      const firebaseError = error as { code?: string; message?: string };
      
      if (firebaseError.code === 'auth/email-already-in-use') {
        // Original account exists, create reset account
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
          
          if (resetFirebaseError.code === 'auth/email-already-in-use') {
            // Reset account already exists - that's fine, password should work
            console.log(`✅ Reset account exists and ready: ${resetEmail}`);
            return res.status(200).json({
              success: true,
              message: 'Password reset successful. You can now sign in with your new password.',
              email: resetEmail,
              phone: cleanedPhone,
              note: 'Reset account ready'
            });
          } else {
            console.error('Error creating reset account:', resetFirebaseError);
            return res.status(500).json({
              success: false,
              message: 'Error completing password reset. Please contact support.',
              error: resetFirebaseError.message
            });
          }
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
