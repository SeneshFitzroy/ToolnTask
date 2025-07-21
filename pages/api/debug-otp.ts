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

    const formattedPhone = formatPhoneNumber(phone as string);
    console.log(`🔍 Searching for OTPs - Phone: ${formattedPhone}`);

    // Find all OTPs for this phone number
    const verificationRef = collection(db, 'phoneVerifications');
    const q = query(
      verificationRef, 
      where('phone', '==', formattedPhone),
      orderBy('createdAt', 'desc'),
      limit(5)
    );
    
    const querySnapshot = await getDocs(q);
    const otps: Array<{
      id: string;
      phone: string;
      otp: string;
      verified: boolean;
      expiresAt: string;
      createdAt: string;
      purpose: string;
    }> = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      otps.push({
        id: doc.id,
        phone: data.phone,
        otp: data.otp,
        verified: data.verified,
        expiresAt: data.expiresAt?.toDate?.()?.toISOString() || 'N/A',
        createdAt: data.createdAt?.toDate?.()?.toISOString() || 'N/A',
        purpose: data.purpose || 'N/A'
      });
    });

    return res.status(200).json({
      phone: formattedPhone,
      otpCount: otps.length,
      otps: otps,
      message: otps.length > 0 ? 'OTPs found' : 'No OTPs found for this phone number'
    });

  } catch (error: unknown) {
    console.error('Error fetching OTPs:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return res.status(500).json({ 
      message: 'Internal server error', 
      error: errorMessage 
    });
  }
}
