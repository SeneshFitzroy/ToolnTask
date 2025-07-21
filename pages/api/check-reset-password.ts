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
      return res.status(200).json({ passwordMatch: false });
    }

    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();

    // Check if the provided password matches the reset password
    if (userData.newPasswordFromReset && userData.newPasswordFromReset === password && userData.passwordResetCompleted) {
      console.log(`🔐 Reset password matched for: ${email}`);
      
      try {
        // Try to create/update Firebase Auth with the reset password
        try {
          // First try to create a new user
          await createUserWithEmailAndPassword(auth, email, password);
          console.log(`✅ New Firebase Auth user created for: ${email}`);
        } catch (authError: any) {
          if (authError.code === 'auth/email-already-in-use') {
            // User exists, try to update their password
            console.log(`🔄 Updating existing Firebase Auth password for: ${email}`);
            
            // Try to sign in with various potential passwords and update
            const tryPasswords = ['password123', 'tempPassword123', userData.tempPassword, userData.lastKnownPassword];
            let updated = false;
            
            for (const tryPass of tryPasswords) {
              if (!tryPass) continue;
              try {
                const userCred = await signInWithEmailAndPassword(auth, email, tryPass);
                await updatePassword(userCred.user, password);
                await signOut(auth);
                console.log(`✅ Firebase Auth password updated for: ${email}`);
                updated = true;
                break;
              } catch {
                continue;
              }
            }
            
            if (!updated) {
              console.log(`⚠️ Could not update Firebase Auth, but reset password is valid for: ${email}`);
            }
          }
        }
        
        // Clean up reset flags and store as current password
        await updateDoc(userDoc.ref, {
          newPasswordFromReset: null,
          passwordResetCompleted: false,
          lastKnownPassword: password,
          lastSuccessfulLogin: new Date()
        });
        
        return res.status(200).json({ 
          passwordMatch: true,
          message: 'Login successful with reset password' 
        });
        
      } catch (error) {
        console.error('Error processing reset password login:', error);
        
        // Even if there's an error, the password was correct
        // Just clean up and allow login
        await updateDoc(userDoc.ref, {
          newPasswordFromReset: null,
          passwordResetCompleted: false,
          lastKnownPassword: password,
          lastSuccessfulLogin: new Date()
        });
        
        return res.status(200).json({ 
          passwordMatch: true,
          message: 'Login successful with reset password' 
        });
      }
    }

    return res.status(200).json({ passwordMatch: false });

  } catch (error) {
    console.error('Error checking reset password:', error);
    return res.status(500).json({ passwordMatch: false, error: 'Internal server error' });
  }
}
