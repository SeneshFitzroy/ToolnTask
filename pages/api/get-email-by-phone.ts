import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../src/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ message: 'Phone number is required' });
    }

    // Normalize the phone number (remove spaces, dashes, parentheses)
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    
    // Validate Sri Lankan phone number format
    const phoneRegex = /^(\+94|0094|94|0)?[1-9][0-9]{8,9}$/;
    if (!phoneRegex.test(cleanPhone)) {
      return res.status(400).json({ message: 'Invalid Sri Lankan phone number format' });
    }

    // Normalize to standard format (remove country code prefixes for consistency)
    let normalizedPhone = cleanPhone;
    if (normalizedPhone.startsWith('+94')) {
      normalizedPhone = '0' + normalizedPhone.substring(3);
    } else if (normalizedPhone.startsWith('0094')) {
      normalizedPhone = '0' + normalizedPhone.substring(4);
    } else if (normalizedPhone.startsWith('94')) {
      normalizedPhone = '0' + normalizedPhone.substring(2);
    }

    // Search for user with this phone number in Firestore
    const usersRef = collection(db, 'users');
    
    // Try multiple phone number formats to ensure we find the user
    const phoneFormats = [
      normalizedPhone,
      cleanPhone,
      phone.trim(),
      '+94' + normalizedPhone.substring(1),
      '94' + normalizedPhone.substring(1)
    ];

    let userDoc = null;
    
    for (const phoneFormat of phoneFormats) {
      const q = query(usersRef, where('phone', '==', phoneFormat));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        userDoc = querySnapshot.docs[0];
        break;
      }
    }

    if (!userDoc) {
      return res.status(404).json({ 
        message: 'Phone number not found. Please register first or use your email address.',
        phone: normalizedPhone
      });
    }

    const userData = userDoc.data();
    
    if (!userData.email) {
      return res.status(404).json({ 
        message: 'Email not found for this phone number. Please contact support.',
        phone: normalizedPhone
      });
    }

    console.log('Found email for phone:', normalizedPhone, '-> Email:', userData.email);

    return res.status(200).json({ 
      email: userData.email,
      message: 'Email found successfully',
      phone: normalizedPhone
    });

  } catch (error) {
    console.error('Error finding email by phone:', error);
    return res.status(500).json({ 
      message: 'Internal server error while finding email by phone number',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
}
