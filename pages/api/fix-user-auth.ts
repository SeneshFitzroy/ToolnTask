import type { NextApiRequest, NextApiResponse } from 'next';
import { collection, query, where, getDocs, doc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../../src/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword, deleteUser } from 'firebase/auth';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, cert, getApps } from 'firebase-admin/app';

// Initialize Firebase Admin
if (!getApps().length) {
  const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  };

  initializeApp({
    credential: cert(serviceAccount),
    projectId: process.env.FIREBASE_PROJECT_ID,
  });
}

const adminAuth = getAuth();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, phone, action } = req.body;

  if (!email && !phone) {
    return res.status(400).json({ message: 'Email or phone is required' });
  }

  if (!action || !['check', 'fix', 'sync'].includes(action)) {
    return res.status(400).json({ message: 'Valid action is required: check, fix, or sync' });
  }

  try {
    let searchEmail = email;
    
    // If phone provided, convert to auth email format
    if (phone && !email) {
      const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
      let normalizedPhone = cleanPhone;
      
      if (cleanPhone.startsWith('+94')) {
        normalizedPhone = cleanPhone.replace('+94', '94');
      } else if (cleanPhone.startsWith('0094')) {
        normalizedPhone = cleanPhone.replace('0094', '94');
      } else if (cleanPhone.startsWith('0')) {
        normalizedPhone = '94' + cleanPhone.substring(1);
      } else if (!cleanPhone.startsWith('94')) {
        normalizedPhone = '94' + cleanPhone;
      }
      
      searchEmail = `${normalizedPhone}@toolntask.app`;
    }

    console.log(`🔍 Checking auth for: ${searchEmail}`);

    // Find user in Firestore
    const usersRef = collection(db, 'users');
    let userDoc = null;
    let userData = null;

    // Try multiple search methods
    if (email) {
      // Search by email
      const emailQuery = query(usersRef, where('email', '==', email));
      const emailSnapshot = await getDocs(emailQuery);
      if (!emailSnapshot.empty) {
        userDoc = emailSnapshot.docs[0];
        userData = userDoc.data();
      }

      // Search by authEmail if not found
      if (!userDoc) {
        const authEmailQuery = query(usersRef, where('authEmail', '==', email));
        const authEmailSnapshot = await getDocs(authEmailQuery);
        if (!authEmailSnapshot.empty) {
          userDoc = authEmailSnapshot.docs[0];
          userData = userDoc.data();
        }
      }
    }

    if (phone && !userDoc) {
      // Search by phone
      const phoneFormats = [
        phone.trim(),
        phone.replace(/[\s\-\(\)]/g, ''),
        '+94' + phone.replace(/^0/, ''),
        '94' + phone.replace(/^0/, ''),
      ];

      for (const phoneFormat of phoneFormats) {
        const phoneQuery = query(usersRef, where('phone', '==', phoneFormat));
        const phoneSnapshot = await getDocs(phoneQuery);
        if (!phoneSnapshot.empty) {
          userDoc = phoneSnapshot.docs[0];
          userData = userDoc.data();
          break;
        }
      }
    }

    if (!userDoc || !userData) {
      return res.status(404).json({ 
        message: 'User not found',
        searched: { email: searchEmail, phone }
      });
    }

    console.log(`👤 Found user:`, {
      uid: userData.uid,
      email: userData.email,
      phone: userData.phone,
      authEmail: userData.authEmail,
      hasResetPassword: !!userData.currentPassword
    });

    // Check Firebase Auth status
    let firebaseAuthUser = null;
    try {
      firebaseAuthUser = await adminAuth.getUserByEmail(searchEmail);
      console.log(`✅ Firebase Auth user exists: ${firebaseAuthUser.uid}`);
    } catch (error) {
      console.log(`❌ Firebase Auth user not found: ${searchEmail}`);
    }

    const status = {
      firestoreUser: !!userData,
      firebaseAuthUser: !!firebaseAuthUser,
      uidMatch: userData.uid === firebaseAuthUser?.uid,
      hasResetPassword: !!userData.currentPassword,
      authEmail: searchEmail,
      userData: {
        email: userData.email,
        phone: userData.phone,
        authEmail: userData.authEmail,
        uid: userData.uid
      }
    };

    if (action === 'check') {
      return res.status(200).json({
        success: true,
        status,
        recommendations: status.firebaseAuthUser && status.uidMatch 
          ? ['User auth is properly synchronized']
          : ['Firebase Auth needs synchronization', 'Consider running fix action']
      });
    }

    if (action === 'fix' || action === 'sync') {
      const fixes = [];

      // If Firebase Auth user doesn't exist, create it
      if (!firebaseAuthUser && userData.currentPassword) {
        try {
          console.log(`🔨 Creating Firebase Auth user for: ${searchEmail}`);
          
          const newUser = await adminAuth.createUser({
            email: searchEmail,
            password: userData.currentPassword,
            displayName: userData.displayName || `${userData.firstName} ${userData.lastName}`,
            emailVerified: false,
          });

          // Update Firestore with new UID
          await updateDoc(userDoc.ref, {
            uid: newUser.uid,
            authSyncedAt: new Date(),
            lastAuthFix: new Date()
          });

          fixes.push(`Created Firebase Auth user: ${newUser.uid}`);
          console.log(`✅ Firebase Auth user created and synced`);
        } catch (error) {
          console.error(`❌ Failed to create Firebase Auth user:`, error);
          fixes.push(`Failed to create Firebase Auth user: ${error}`);
        }
      }

      // If UIDs don't match, update Firestore
      if (firebaseAuthUser && userData.uid !== firebaseAuthUser.uid) {
        await updateDoc(userDoc.ref, {
          uid: firebaseAuthUser.uid,
          authSyncedAt: new Date(),
          lastAuthFix: new Date()
        });
        fixes.push(`Updated Firestore UID to match Firebase Auth: ${firebaseAuthUser.uid}`);
      }

      // If reset password exists but Firebase Auth password is different, update it
      if (firebaseAuthUser && userData.currentPassword) {
        try {
          await adminAuth.updateUser(firebaseAuthUser.uid, {
            password: userData.currentPassword
          });
          fixes.push(`Updated Firebase Auth password to match reset password`);
        } catch (error) {
          console.error(`⚠️ Failed to update Firebase Auth password:`, error);
          fixes.push(`Warning: Could not update Firebase Auth password`);
        }
      }

      return res.status(200).json({
        success: true,
        message: 'User authentication fixed',
        fixes,
        status: {
          ...status,
          fixed: true,
          fixedAt: new Date()
        }
      });
    }

  } catch (error: unknown) {
    console.error('Fix user auth error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return res.status(500).json({ 
      success: false,
      message: 'Authentication fix error', 
      error: errorMessage 
    });
  }
}
