import type { NextApiRequest, NextApiResponse } from 'next';
import { collection, query, where, getDocs, updateDoc, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../../src/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword, deleteUser, confirmPasswordReset } from 'firebase/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { token, phone, verified, newPassword } = req.body;

  // Validate that we have either token or verified phone
  if (!token && !(phone && verified)) {
    return res.status(400).json({ message: 'Reset authorization required (token or verified phone)' });
  }

  if (!newPassword) {
    return res.status(400).json({ message: 'New password is required' });
  }

  // Enhanced password validation with specific error messages
  if (newPassword.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long' });
  }

  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasLowercase = /[a-z]/.test(newPassword);
  const hasNumbers = /\d/.test(newPassword);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

  if (!hasUppercase) {
    return res.status(400).json({ message: 'Password must contain at least one uppercase letter (A-Z)' });
  }
  if (!hasLowercase) {
    return res.status(400).json({ message: 'Password must contain at least one lowercase letter (a-z)' });
  }
  if (!hasNumbers) {
    return res.status(400).json({ message: 'Password must contain at least one number (0-9)' });
  }
  if (!hasSpecial) {
    return res.status(400).json({ message: 'Password must contain at least one special character (!@#$%^&*)' });
  }

  try {
    let userEmail = '';

    if (token) {
      // Handle token-based password reset (traditional email flow)
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

      userEmail = resetData.email;

      // Mark token as used
      await updateDoc(doc(db, 'passwordResets', resetDoc.id), {
        used: true,
        usedAt: new Date(),
        ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown'
      });

    } else if (phone && verified) {
      // Handle phone-based password reset - create Firebase Auth user immediately
      const formatPhoneNumber = (phone: string): string => {
        const cleaned = phone.replace(/[\s\-\(\)]/g, '');
        if (cleaned.startsWith('+')) {
          return cleaned;
        }
        const digits = cleaned.replace(/\D/g, '');
        if (digits.startsWith('0')) {
          return '+94' + digits.substring(1);
        }
        if (digits.startsWith('94')) {
          return '+' + digits;
        }
        if (digits.length === 9 && digits.startsWith('7')) {
          return '+94' + digits;
        }
        return '+94' + digits;
      };

      const formattedPhone = formatPhoneNumber(phone);
      userEmail = `${formattedPhone.replace('+', '')}@toolntask.app`;
      
      console.log(`🔐 Creating Firebase Auth user for phone: ${formattedPhone}`);
      console.log(`📧 Using email: ${userEmail}`);

      try {
        // Create the Firebase Auth user immediately
        const userCredential = await createUserWithEmailAndPassword(auth, userEmail, newPassword);
        const firebaseUser = userCredential.user;
        
        console.log(`✅ Firebase Auth user created: ${firebaseUser.uid}`);
        
        // Create user document in Firestore
        await setDoc(doc(db, 'users', firebaseUser.uid), {
          uid: firebaseUser.uid,
          email: userEmail,
          phone: formattedPhone,
          displayName: `User ${formattedPhone.replace('+94', '0')}`,
          createdAt: new Date(),
          createdVia: 'phone_password_reset',
          emailVerified: false,
          phoneVerified: true,
          lastLogin: new Date()
        });
        
        console.log(`✅ User document created in Firestore`);
        
        return res.status(200).json({
          message: 'Account created successfully. You can now sign in with your phone number.',
          email: userEmail,
          phone: formattedPhone,
          uid: firebaseUser.uid,
          action: 'account_created'
        });
        
      } catch (error: unknown) {
        const firebaseError = error as { code?: string; message?: string };
        console.error('Error creating Firebase Auth user:', firebaseError);
        
        if (firebaseError.code === 'auth/email-already-in-use') {
          // User already exists - we need to update their password in Firestore
          // and handle the password update during login
          console.log(`✅ User already exists: ${userEmail} - Storing new password for next login`);
          
          try {
            // Find the user document and store the new password
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('authEmail', '==', userEmail));
            const querySnapshot = await getDocs(q);
            
            if (!querySnapshot.empty) {
              const userDoc = querySnapshot.docs[0];
              await updateDoc(userDoc.ref, {
                tempPassword: newPassword,
                passwordUpdateRequired: true,
                passwordUpdatedAt: new Date()
              });
              
              console.log(`✅ Password stored for next login: ${userEmail}`);
            } else {
              // Create user document if it doesn't exist
              const userDocRef = doc(db, 'users', userEmail.replace('@', '_').replace('.', '_'));
              await setDoc(userDocRef, {
                authEmail: userEmail,
                phone: formattedPhone,
                tempPassword: newPassword,
                passwordUpdateRequired: true,
                passwordUpdatedAt: new Date(),
                createdAt: new Date(),
                createdVia: 'phone_password_reset'
              });
              
              console.log(`✅ User document created with new password: ${userEmail}`);
            }
            
            return res.status(200).json({
              message: 'Password updated successfully. You can now sign in with your new password.',
              email: userEmail,
              phone: formattedPhone,
              action: 'password_updated'
            });
          } catch (updateError) {
            console.error('Error storing new password:', updateError);
            return res.status(500).json({
              message: 'Error updating password. Please try again.',
              error: updateError
            });
          }
        } else {
          return res.status(500).json({
            message: 'Error creating user account. Please try again.',
            error: firebaseError.message
          });
        }
      }
    } else {
      return res.status(400).json({ message: 'Invalid reset method' });
    }

    // This is only reached for token-based resets
    console.log(`🔐 Updating password for email: ${userEmail}`);

    // Find the user in Firestore to get their information
    const usersRef = collection(db, 'users');
    const userQuery = query(usersRef, where('email', '==', userEmail));
    const userSnapshot = await getDocs(userQuery);

    if (userSnapshot.empty) {
      return res.status(404).json({ message: 'User not found. Please ensure your account exists.' });
    }

    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();

    // We need to update the password in Firebase Auth
    // Since we can't sign in without knowing the old password, 
    // we'll need to use a different approach

    try {
      // Store the new password in user document with a flag for password update
      await updateDoc(userDoc.ref, {
        pendingPasswordReset: newPassword,
        passwordResetRequired: true,
        passwordResetTimestamp: new Date(),
        lastPasswordReset: new Date()
      });

      console.log(`✅ Password reset prepared for user: ${userEmail}`);

      res.status(200).json({ 
        message: 'Password reset successful. Please sign in with your new password.',
        email: userEmail,
        requiresSignIn: true
      });

    } catch (authError) {
      console.error('Error preparing password reset:', authError);
      return res.status(500).json({
        message: 'Error resetting password. Please try again.',
        error: authError
      });
    }

  } catch (error) {
    console.error('Password update error:', error);
    res.status(500).json({ message: 'Failed to update password. Please try again.' });
  }
}
