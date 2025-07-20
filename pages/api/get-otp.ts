import type { NextApiRequest, NextApiResponse } from 'next';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../../src/lib/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { phone } = req.query;

  if (!phone) {
    return res.status(400).json({ message: 'Phone number is required' });
  }

  try {
    // Get the latest OTP for this phone number
    const verificationRef = collection(db, 'phoneVerifications');
    const q = query(
      verificationRef, 
      where('phone', '==', phone), 
      where('used', '==', false),
      orderBy('createdAt', 'desc'),
      limit(1)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return res.status(404).json({ message: 'No verification code found for this phone number' });
    }

    const verificationDoc = querySnapshot.docs[0];
    const verificationData = verificationDoc.data();

    // Check if OTP has expired
    if (new Date() > verificationData.expiresAt.toDate()) {
      return res.status(400).json({ message: 'Verification code has expired' });
    }

    res.status(200).json({ 
      otp: verificationData.otp,
      phone: verificationData.phone,
      expiresAt: verificationData.expiresAt.toDate(),
      type: verificationData.type
    });

  } catch (error) {
    console.error('Error getting OTP:', error);
    res.status(500).json({ message: 'Failed to get verification code' });
  }
}
