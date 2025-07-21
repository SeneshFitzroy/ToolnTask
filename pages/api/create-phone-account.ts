import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../src/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../src/lib/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(400).json({ message: 'Phone and password are required' });
  }

  try {
    // Format phone number
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
    
    // Create a unique email for this phone number
    const userEmail = `${formattedPhone.replace('+', '')}@toolntask.app`;
    
    console.log(`🔐 Creating/updating user for phone: ${formattedPhone}`);
    console.log(`📧 Using email: ${userEmail}`);

    try {
      // Try to create the user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, userEmail, password);
      const firebaseUser = userCredential.user;
      
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

      console.log(`✅ Created new user successfully: ${userEmail}`);
      
      return res.status(200).json({ 
        message: 'User account created successfully. You can now sign in.',
        email: userEmail,
        phone: formattedPhone
      });

    } catch (error: unknown) {
      const firebaseError = error as { code?: string; message?: string };
      
      if (firebaseError.code === 'auth/email-already-in-use') {
        // User already exists - that's fine, they can now sign in
        console.log(`✅ User already exists: ${userEmail}`);
        
        return res.status(200).json({ 
          message: 'Password updated successfully. You can now sign in.',
          email: userEmail,
          phone: formattedPhone
        });
      } else {
        console.error('Firebase Auth error:', firebaseError);
        return res.status(500).json({ 
          message: 'Error creating user account. Please try again.',
          error: firebaseError.message 
        });
      }
    }

  } catch (error: unknown) {
    console.error('Phone account creation error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return res.status(500).json({ 
      message: 'Internal server error', 
      error: errorMessage 
    });
  }
}
