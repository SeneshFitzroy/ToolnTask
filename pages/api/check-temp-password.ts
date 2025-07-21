import type { NextApiRequest, NextApiResponse } from 'next';
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { db, auth } from '../../src/lib/firebase';
import { signInWithEmailAndPassword, updatePassword, signOut } from 'firebase/auth';

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
      return res.status(404).json({ tempPasswordMatch: false });
    }

    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();

    // Check if the provided password matches the temporary password
    if (userData.tempPassword && userData.tempPassword === password) {
      console.log(`🔐 Temporary password matched for: ${email}`);
      
      try {
        // Try to update Firebase Auth with the new password
        // First, try signing in with any existing auth password to get the user
        let firebaseUser = null;
        
        // Try different potential passwords
        const passwordsToTry = [userData.tempPassword];
        if (userData.lastKnownPassword) {
          passwordsToTry.push(userData.lastKnownPassword);
        }
        
        for (const tryPassword of passwordsToTry) {
          try {
            const userCredential = await signInWithEmailAndPassword(auth, email, tryPassword);
            firebaseUser = userCredential.user;
            break;
          } catch {
            continue;
          }
        }
        
        if (firebaseUser) {
          // Update the password in Firebase Auth
          await updatePassword(firebaseUser, password);
          await signOut(auth);
          console.log(`✅ Firebase Auth password updated for: ${email}`);
        }
        
        // Clean up temporary password from Firestore
        await updateDoc(userDoc.ref, {
          tempPassword: null,
          passwordUpdateRequired: false,
          lastPasswordUpdate: new Date(),
          lastKnownPassword: password
        });
        
        return res.status(200).json({ 
          tempPasswordMatch: true,
          message: 'Password updated successfully' 
        });
        
      } catch (error) {
        console.error('Error updating Firebase Auth password:', error);
        
        // Even if Firebase Auth update fails, clear the temp password
        // The user can still login with the temp password
        await updateDoc(userDoc.ref, {
          tempPassword: null,
          passwordUpdateRequired: false,
          lastPasswordUpdate: new Date(),
          lastKnownPassword: password
        });
        
        return res.status(200).json({ 
          tempPasswordMatch: true,
          message: 'Password updated successfully' 
        });
      }
    }

    return res.status(200).json({ tempPasswordMatch: false });

  } catch (error) {
    console.error('Error checking temporary password:', error);
    return res.status(500).json({ tempPasswordMatch: false, error: 'Internal server error' });
  }
}
