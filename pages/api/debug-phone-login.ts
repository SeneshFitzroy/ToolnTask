import type { NextApiRequest, NextApiResponse } from 'next';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../src/lib/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ message: 'Phone number is required' });
  }

  try {
    // Format phone number to all possible variations
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
    const expectedEmail = `${formattedPhone.replace('+', '')}@toolntask.app`;
    
    console.log(`🔍 DEBUG - Checking phone: ${phone}`);
    console.log(`📱 Formatted phone: ${formattedPhone}`);
    console.log(`📧 Expected email: ${expectedEmail}`);

    // Check all possible phone formats in users collection
    const usersRef = collection(db, 'users');
    const phoneFormats = [
      formattedPhone,
      phone.trim(),
      formattedPhone.replace('+94', '0'),
      formattedPhone.replace('+', ''),
      phone.replace(/[\s\-\(\)]/g, '')
    ];

    const results = [];
    
    for (const phoneFormat of phoneFormats) {
      const q = query(usersRef, where('phone', '==', phoneFormat));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          results.push({
            id: doc.id,
            phone: data.phone,
            email: data.email,
            uid: data.uid,
            createdAt: data.createdAt?.toDate?.()?.toISOString() || 'N/A',
            createdVia: data.createdVia || 'unknown'
          });
        });
      }
    }

    // Also check phone verifications
    const verificationRef = collection(db, 'phoneVerifications');
    const verificationResults = [];
    
    for (const phoneFormat of phoneFormats) {
      const q = query(verificationRef, where('phone', '==', phoneFormat));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          verificationResults.push({
            id: doc.id,
            phone: data.phone,
            verified: data.verified,
            purpose: data.purpose,
            createdAt: data.createdAt?.toDate?.()?.toISOString() || 'N/A'
          });
        });
      }
    }

    return res.status(200).json({
      phone: phone,
      formattedPhone: formattedPhone,
      expectedEmail: expectedEmail,
      phoneFormatsChecked: phoneFormats,
      usersFound: results,
      verificationsFound: verificationResults,
      summary: {
        userExists: results.length > 0,
        verificationExists: verificationResults.length > 0,
        shouldCreateAccount: results.length === 0,
        nextStep: results.length > 0 ? 'User exists - check password' : 'Need to create account'
      }
    });

  } catch (error: unknown) {
    console.error('Debug error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return res.status(500).json({ 
      message: 'Debug error', 
      error: errorMessage 
    });
  }
}
