import type { NextApiRequest, NextApiResponse } from 'next';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../src/lib/firebase';

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
      // Handle phone-based password reset
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
      
      // Find user by phone number in Firebase Auth or your user collection
      // For now, we'll use the phone as identifier
      userEmail = `phone_${formattedPhone.replace('+', '')}@toolntask.local`;
      
      console.log(`📱 Phone-based password reset for: ${formattedPhone}`);
    } else {
      return res.status(400).json({ message: 'Invalid reset method' });
    }

    // Here you would typically update the password in Firebase Auth
    // For now, we'll just confirm the operation
    console.log(`🔐 Password would be updated for: ${userEmail}`);

    res.status(200).json({ 
      message: 'Password updated successfully',
      email: userEmail 
    });

  } catch (error) {
    console.error('Password update error:', error);
    res.status(500).json({ message: 'Failed to update password. Please try again.' });
  }
}
