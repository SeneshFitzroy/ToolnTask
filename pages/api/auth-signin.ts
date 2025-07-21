import type { NextApiRequest, NextApiResponse } from 'next';
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { db, auth } from '../../src/lib/firebase';
import { signInWithEmailAndPassword, deleteUser, createUserWithEmailAndPassword } from 'firebase/auth';

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
      return res.status(404).json({ message: 'User not found' });
    }

    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();

    // Check if user has a password reset flag
    if (userData.passwordReset && userData.newPasswordHash === password) {
      console.log(`🔐 Handling password reset authentication for: ${email}`);

      try {
        // Try to sign in with the new password first
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          console.log(`✅ Sign-in successful with new password: ${email}`);
          
          // Clear the password reset flags
          await updateDoc(userDoc.ref, {
            passwordReset: false,
            newPasswordHash: null,
            resetViaToken: null,
            lastSuccessfulSignIn: new Date()
          });

          return res.status(200).json({ 
            success: true,
            message: 'Sign-in successful',
            uid: userCredential.user.uid
          });

        } catch (signInError) {
          // If normal sign-in fails, we need to recreate the user with the new password
          console.log(`⚠️ Normal sign-in failed, recreating user with new password: ${email}`);
          
          try {
            // First, try to get the current user and delete them
            const currentUser = auth.currentUser;
            if (currentUser && currentUser.email === email) {
              await deleteUser(currentUser);
              console.log(`🗑️ Deleted old user: ${email}`);
            }
          } catch (deleteError) {
            console.log(`⚠️ Could not delete old user (may not exist): ${email}`);
          }

          try {
            // Create new user with the new password
            const newUserCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log(`✅ Created new user with new password: ${email}`);

            // Update the user document
            await updateDoc(userDoc.ref, {
              uid: newUserCredential.user.uid,
              passwordReset: false,
              newPasswordHash: null,
              resetViaToken: null,
              lastSuccessfulSignIn: new Date(),
              userRecreated: true,
              userRecreatedAt: new Date()
            });

            return res.status(200).json({ 
              success: true,
              message: 'Sign-in successful with new password',
              uid: newUserCredential.user.uid,
              userRecreated: true
            });

          } catch (createError) {
            console.error('Error creating new user:', createError);
            return res.status(500).json({ 
              message: 'Error updating account with new password',
              error: createError
            });
          }
        }

      } catch (error) {
        console.error('Error during password reset authentication:', error);
        return res.status(500).json({ 
          message: 'Error authenticating with new password',
          error: error 
        });
      }

    } else {
      // Normal authentication - try standard sign-in
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        // Update last sign-in
        await updateDoc(userDoc.ref, {
          lastSuccessfulSignIn: new Date()
        });

        return res.status(200).json({ 
          success: true,
          message: 'Sign-in successful',
          uid: userCredential.user.uid
        });

      } catch (authError) {
        console.error('Standard authentication failed:', authError);
        return res.status(401).json({ 
          message: 'Authentication failed. Please check your credentials.',
          error: authError
        });
      }
    }

  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ message: 'Authentication failed' });
  }
}
