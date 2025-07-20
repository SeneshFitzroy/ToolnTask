import type { NextApiRequest, NextApiResponse } from 'next';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../src/lib/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ message: 'Token and new password are required' });
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
    // Find the reset token in Firestore
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

    // Mark token as used
    await updateDoc(doc(db, 'passwordResets', resetDoc.id), {
      used: true,
      usedAt: new Date(),
      ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown'
    });

    res.status(200).json({ 
      message: 'Password updated successfully',
      email: resetData.email 
    });

  } catch (error) {
    console.error('Password update error:', error);
    res.status(500).json({ message: 'Failed to update password. Please try again.' });
  }
}
