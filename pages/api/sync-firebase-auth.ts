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
    console.log(`🔄 Syncing Firebase Auth for: ${email}`);

    // Find the user in Firestore to verify password
    const usersRef = collection(db, 'users');
    const userQuery = query(usersRef, where('email', '==', email));
    const userSnapshot = await getDocs(userQuery);

    if (userSnapshot.empty) {
      return res.status(400).json({ message: 'User not found' });
    }

    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();

    // Check if this is a valid reset password
    if (userData.passwordResetCompleted === true && userData.currentPassword === password) {
      console.log(`✅ Valid reset password confirmed for: ${email}`);

      try {
        // Try to create a new Firebase Auth user
        await createUserWithEmailAndPassword(auth, email, password);
        console.log(`✅ New Firebase Auth user created for: ${email}`);
        
        // Update Firestore to mark Firebase Auth as synced
        await updateDoc(userDoc.ref, {
          firebaseAuthSynced: true,
          lastAuthSync: new Date()
        });

        return res.status(200).json({ 
          success: true, 
          message: 'Firebase Auth user created successfully' 
        });

      } catch (authError: unknown) {
        const firebaseError = authError as { code?: string; message?: string };
        
        if (firebaseError.code === 'auth/email-already-in-use') {
          console.log(`🔄 User exists, updating Firebase Auth password for: ${email}`);
          
          // User exists, try to update the password
          const possiblePasswords = [
            'password123', 
            'tempPassword123', 
            'defaultPassword',
            userData.tempPassword,
            userData.lastKnownPassword
          ].filter(Boolean);

          let authUpdated = false;
          for (const tryPassword of possiblePasswords) {
            if (!tryPassword) continue;
            
            try {
              // Sign in with old password and update to new password
              const userCred = await signInWithEmailAndPassword(auth, email, tryPassword as string);
              await updatePassword(userCred.user, password);
              await signOut(auth); // Sign out to allow client-side login
              
              console.log(`✅ Firebase Auth password updated for: ${email}`);
              authUpdated = true;
              break;
            } catch {
              continue;
            }
          }

          if (authUpdated) {
            // Update Firestore to mark Firebase Auth as synced
            await updateDoc(userDoc.ref, {
              firebaseAuthSynced: true,
              lastAuthSync: new Date()
            });

            return res.status(200).json({ 
              success: true, 
              message: 'Firebase Auth password updated successfully' 
            });
          } else {
            console.log(`⚠️ Could not update Firebase Auth password for: ${email}`);
            return res.status(500).json({ 
              success: false, 
              message: 'Could not sync Firebase Auth' 
            });
          }
        } else {
          throw authError;
        }
      }
    } else {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid password or user has not completed password reset' 
      });
    }

  } catch (error) {
    console.error('Firebase Auth sync error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to sync Firebase Auth' 
    });
  }
}
