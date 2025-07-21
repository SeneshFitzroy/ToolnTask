import type { NextApiRequest, NextApiResponse } from 'next';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../src/lib/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    console.log(`🔐 Testing login: ${email} with password: ${password}`);
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log(`✅ Login successful for: ${email}`);

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      uid: user.uid,
      email: user.email
    });

  } catch (error: unknown) {
    const firebaseError = error as { code?: string; message?: string };
    console.log(`❌ Login failed for ${email}: ${firebaseError.code} - ${firebaseError.message}`);
    
    return res.status(401).json({
      success: false,
      message: 'Login failed',
      error: firebaseError.code
    });
  }
}
