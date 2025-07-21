import type { NextApiRequest, NextApiResponse } from 'next';
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../src/lib/firebase';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, cert, getApps } from 'firebase-admin/app';

// --- ROBUST FIREBASE ADMIN INITIALIZATION ---
let adminAuth: ReturnType<typeof getAuth> | null = null;

function initializeAdmin() {
  if (getApps().length > 0) {
    if (adminAuth) {
      return; // Already initialized
    }
    try {
      adminAuth = getAuth();
      console.log('✅ Firebase Admin re-initialized successfully.');
    } catch (e) {
      console.error('🚨 Firebase Admin re-initialization failed:', e);
    }
    return;
  }

  try {
    const serviceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    };

    if (serviceAccount.projectId && serviceAccount.clientEmail && serviceAccount.privateKey) {
      initializeApp({
        credential: cert(serviceAccount),
        projectId: process.env.FIREBASE_PROJECT_ID,
      });
      adminAuth = getAuth();
      console.log('✅ Firebase Admin initialized successfully for the first time.');
    } else {
      console.log('⚠️ Firebase Admin credentials missing. Admin features will be disabled.');
    }
  } catch (error) {
    console.log('⚠️ Firebase Admin initialization failed:', error);
  }
}

initializeAdmin();
// --- END OF INITIALIZATION ---


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (!adminAuth) {
    console.error('🚨 Firebase Admin is not available. Cannot process auth request.');
    return res.status(503).json({ 
      success: false, 
      message: 'Server configuration error: Firebase Admin not available.',
      fixes: ['firestore-updated'],
      skipFirebaseAuth: true
    });
  }

  const { email, password, phone } = req.body;

  if ((!email && !phone) || !password) {
    return res.status(400).json({ message: 'Email/phone and password are required' });
  }

  try {
    let authEmail = email;
    
    // Convert phone to auth email format if needed
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
      
      authEmail = `${normalizedPhone}@toolntask.app`;
    }

    console.log(`🔧 Ensuring auth for: ${authEmail}`);

    // Find user in Firestore first
    const usersRef = collection(db, 'users');
    let userDoc = null;
    let userData = null;

    // Search by email
    if (email) {
      const emailQuery = query(usersRef, where('email', '==', email));
      const emailSnapshot = await getDocs(emailQuery);
      if (!emailSnapshot.empty) {
        userDoc = emailSnapshot.docs[0];
        userData = userDoc.data();
      }

      // Also search by authEmail
      if (!userDoc) {
        const authEmailQuery = query(usersRef, where('authEmail', '==', authEmail));
        const authEmailSnapshot = await getDocs(authEmailQuery);
        if (!authEmailSnapshot.empty) {
          userDoc = authEmailSnapshot.docs[0];
          userData = userDoc.data();
        }
      }
    }

    // Search by phone
    if (phone && !userDoc) {
      const phoneFormats = [
        phone.replace(/[\s\-\(\)]/g, ''),
        phone.replace(/[\s\-\(\)]/g, '').replace(/^0/, '94'),
        phone.replace(/[\s\-\(\)]/g, '').replace(/^\+94/, '94'),
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
        success: false,
        message: 'User not found' 
      });
    }

    console.log(`👤 Found user:`, {
      email: userData.email,
      phone: userData.phone,
      authEmail: userData.authEmail,
      hasCurrentPassword: !!userData.currentPassword,
      passwordResetCompleted: userData.passwordResetCompleted
    });

    // Check if password matches what's stored
    const storedPassword = userData.currentPassword || userData.password;
    if (storedPassword !== password) {
      return res.status(400).json({
        success: false,
        message: 'Password does not match stored password'
      });
    }

    // Now ensure Firebase Auth is properly set up
    let firebaseUser = null;
    
    if (!adminAuth) {
      console.log('⚠️ Firebase Admin not available, skipping Firebase Auth operations');
      return res.status(200).json({
        success: true,
        message: 'Password updated in Firestore only (Firebase Admin not configured)',
        fixes: ['firestore-updated'],
        skipFirebaseAuth: true
      });
    }
    
    try {
      firebaseUser = await adminAuth.getUserByEmail(authEmail);
      console.log(`✅ Firebase Auth user exists: ${firebaseUser.uid}`);
    } catch {
      console.log(`❌ Firebase Auth user not found: ${authEmail}`);
    }

    // Create or update Firebase Auth user
    if (!firebaseUser) {
      try {
        console.log(`🔥 Creating Firebase Auth user: ${authEmail}`);
        firebaseUser = await adminAuth.createUser({
          email: authEmail,
          password: password,
          displayName: userData.displayName || `${userData.firstName} ${userData.lastName}`,
          emailVerified: false,
        });
        console.log(`✅ Firebase Auth user created: ${firebaseUser.uid}`);
      } catch (createError) {
        console.error(`❌ Failed to create Firebase Auth user:`, createError);
        return res.status(500).json({
          success: false,
          message: 'Failed to create Firebase Auth user'
        });
      }
    } else {
      // Update existing user's password
      try {
        await adminAuth.updateUser(firebaseUser.uid, {
          password: password
        });
        console.log(`✅ Firebase Auth password updated: ${firebaseUser.uid}`);
      } catch (updateError) {
        console.error(`❌ Failed to update Firebase Auth password:`, updateError);
        return res.status(500).json({
          success: false,
          message: 'Failed to update Firebase Auth password'
        });
      }
    }

    // Update Firestore with correct UID and sync status
    await updateDoc(userDoc.ref, {
      uid: firebaseUser.uid,
      authEmail: authEmail,
      firebaseAuthSynced: true,
      lastAuthSync: new Date(),
      ensuredAt: new Date()
    });

    console.log(`🎉 Auth ensured successfully for: ${authEmail}`);

    return res.status(200).json({
      success: true,
      message: 'Authentication ensured successfully',
      authEmail: authEmail,
      uid: firebaseUser.uid,
      fixes: [
        firebaseUser ? 'Firebase Auth user verified/updated' : 'Firebase Auth user created',
        'Firestore UID synchronized',
        'Password verified and synced'
      ]
    });

  } catch (error: unknown) {
    console.error('Ensure auth error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return res.status(500).json({ 
      success: false,
      message: 'Authentication ensure error', 
      error: errorMessage 
    });
  }
}
