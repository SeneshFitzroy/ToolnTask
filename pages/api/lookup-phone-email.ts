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
    
    console.log(`🔍 Looking up email for phone: ${phone}`);
    console.log(`📱 Formatted phone: ${formattedPhone}`);

    // Check all possible phone formats in users collection
    const usersRef = collection(db, 'users');
    const phoneFormats = [
      formattedPhone,                     // +94761120457
      phone.trim(),                       // 0761120457
      formattedPhone.replace('+94', '0'), // 0761120457
      formattedPhone.replace('+', ''),    // 94761120457 (matches Firebase Auth email format)
      phone.replace(/[\s\-\(\)]/g, '')    // cleaned input
    ];

    for (const phoneFormat of phoneFormats) {
      console.log(`🔍 Checking users with phone: ${phoneFormat}`);
      const q = query(usersRef, where('phone', '==', phoneFormat));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        // Found a user with this phone number
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        
        // For phone-based accounts, prefer the reset account if it exists
        // Check if there's a reset account for this phone
        const resetEmail = `${formattedPhone.replace('+94', '94')}.reset@toolntask.app`;
        const resetQuery = query(usersRef, where('authEmail', '==', resetEmail));
        const resetSnapshot = await getDocs(resetQuery);
        
        if (!resetSnapshot.empty) {
          const resetUserData = resetSnapshot.docs[0].data();
          console.log(`✅ Found reset account - Phone: ${resetUserData.phone}, AuthEmail: ${resetUserData.authEmail}`);
          console.log(`📧 Returning reset login email: ${resetUserData.authEmail}`);
          
          return res.status(200).json({
            success: true,
            email: resetUserData.authEmail,
            phone: resetUserData.phone,
            authEmail: resetUserData.authEmail,
            isResetAccount: true
          });
        }
        
        // Otherwise, use the original account
        const loginEmail = userData.authEmail || userData.email;
        
        console.log(`✅ Found user - Phone: ${userData.phone}, AuthEmail: ${userData.authEmail}, Email: ${userData.email}`);
        console.log(`📧 Returning login email: ${loginEmail}`);
        
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
