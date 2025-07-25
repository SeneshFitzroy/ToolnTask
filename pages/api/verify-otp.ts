import type { NextApiRequest, NextApiResponse } from 'next';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../src/lib/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { phone, otp } = req.body;

  if (!phone || !otp) {
    return res.status(400).json({ message: 'Phone number and OTP are required' });
  }

  try {
    // Format phone number to match storage format
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
    console.log(`🔍 Looking for OTP - Phone: ${formattedPhone}, OTP: ${otp}`);

    // Find the OTP in Firestore
    const verificationRef = collection(db, 'phoneVerifications');
    const q = query(
      verificationRef, 
      where('phone', '==', formattedPhone), 
      where('otp', '==', otp),
      where('verified', '==', false)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return res.status(400).json({ message: 'Invalid verification code' });
    }

    const verificationDoc = querySnapshot.docs[0];
    const verificationData = verificationDoc.data();

    // Check if OTP has expired
    if (new Date() > verificationData.expiresAt.toDate()) {
      return res.status(400).json({ message: 'Verification code has expired. Please request a new one.' });
    }

    // Mark OTP as used
    await updateDoc(doc(db, 'phoneVerifications', verificationDoc.id), {
      verified: true,
      usedAt: new Date(),
      ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown'
    });

    res.status(200).json({ 
      message: 'Phone number verified successfully',
      phone: verificationData.phone,
      type: verificationData.type
    });

  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({ message: 'Failed to verify code. Please try again.' });
  }
}
