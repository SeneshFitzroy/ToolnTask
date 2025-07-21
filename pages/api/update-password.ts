import type { NextApiRequest, NextApiResponse } from 'next';
import { collection, query, where, getDocs, updateDoc, doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../../src/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

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
      // Handle phone-based password reset - create/update user account
      try {
        const response = await fetch(`${req.headers.origin}/api/create-phone-account`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phone: phone,
            password: newPassword
          }),
        });

        const result = await response.json();
        
        if (!response.ok) {
          return res.status(response.status).json(result);
        }
        
        return res.status(200).json({
          message: result.message,
          email: result.email,
          phone: result.phone
        });
      } catch (error) {
        console.error('Error calling create-phone-account:', error);
        return res.status(500).json({ 
          message: 'Error creating phone account. Please try again.' 
        });
      }
    } else {
      return res.status(400).json({ message: 'Invalid reset method' });
    }

    // This is only reached for token-based resets
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
