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
    // Enhanced phone number normalization to match registration format
    const normalizePhoneNumber = (phone: string): string[] => {
      const cleaned = phone.replace(/[\s\-\(\)]/g, '');
      const formats: string[] = [];
      
      // Always normalize to 94xxxxxxxxx format (same as registration)
      let normalizedPhone = cleaned;
      
      if (cleaned.startsWith('+94')) {
        normalizedPhone = cleaned.replace('+94', '94');
      } else if (cleaned.startsWith('0094')) {
        normalizedPhone = cleaned.replace('0094', '94');
      } else if (cleaned.startsWith('0')) {
        normalizedPhone = '94' + cleaned.substring(1);
      } else if (!cleaned.startsWith('94')) {
        normalizedPhone = '94' + cleaned;
      }
      
      // Add the primary normalized format (this should match registration)
      formats.push(normalizedPhone);
      
      // Add other common formats for fallback
      formats.push(cleaned); // Original input
      formats.push('+94' + normalizedPhone.substring(2)); // +94xxxxxxxxx
      formats.push('0' + normalizedPhone.substring(2)); // 0xxxxxxxxx
      
      return [...new Set(formats)]; // Remove duplicates
    };

    const phoneFormats = normalizePhoneNumber(phone);
    
    console.log(`🔍 Looking up email for phone: ${phone}`);
    console.log(`📱 Trying phone formats: ${phoneFormats.join(', ')}`);

    // Check all possible phone formats in users collection
    const usersRef = collection(db, 'users');

    for (const phoneFormat of phoneFormats) {
      console.log(`🔍 Checking users with phone: ${phoneFormat}`);
      const q = query(usersRef, where('phone', '==', phoneFormat));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        // Found a user with this phone number
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        
        // For phone registrations, always use authEmail (like 94xxxxxxxxx@toolntask.app)
        // For email registrations, use the actual email
        const loginEmail = userData.authEmail || userData.email;
        
        console.log(`✅ Found user - Phone: ${userData.phone}, AuthEmail: ${userData.authEmail}, Email: ${userData.email}`);
        console.log(`📧 Returning login email: ${loginEmail}`);
        
        if (!loginEmail) {
          console.log(`❌ No valid email found for phone: ${phoneFormat}`);
          continue; // Try next format
        }
        
        return res.status(200).json({
          success: true,
          email: loginEmail,
          phone: userData.phone,
          authEmail: userData.authEmail
        });
      }
    }

    // If no user found
    console.log(`❌ No user found for phone: ${phone}`);
    return res.status(404).json({ 
      success: false,
      message: 'Phone number not found' 
    });

  } catch (error: unknown) {
    console.error('Phone lookup error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return res.status(500).json({ 
      success: false,
      message: 'Phone lookup error', 
      error: errorMessage 
    });
  }
}
