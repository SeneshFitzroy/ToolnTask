const { initializeApp } = require('firebase/app');
const { getFirestore, collection, query, where, getDocs } = require('firebase/firestore');

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCuxiaRRGBdLfQ-C_SkckOd3s2c6H_8sOg",
  authDomain: "toolntask.firebaseapp.com",
  projectId: "toolntask",
  storageBucket: "toolntask.firebasestorage.app",
  messagingSenderId: "555121856962",
  appId: "1:555121856962:web:1a1405a7ef2c2885e6865b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function debugPhoneLogin() {
  try {
    const phone = "0761120457";
    
    // Format phone number to all possible variations
    const formatPhoneNumber = (phone) => {
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

    console.log('\n📋 Phone formats to check:', phoneFormats);

    const results = [];
    
    for (const phoneFormat of phoneFormats) {
      console.log(`\n🔍 Checking users with phone: ${phoneFormat}`);
      const q = query(usersRef, where('phone', '==', phoneFormat));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log(`✅ Found user:`, {
            id: doc.id,
            phone: data.phone,
            email: data.email,
            uid: data.uid,
            createdVia: data.createdVia || 'unknown'
          });
          results.push({
            id: doc.id,
            phone: data.phone,
            email: data.email,
            uid: data.uid,
            createdVia: data.createdVia || 'unknown'
          });
        });
      } else {
        console.log(`❌ No users found with phone: ${phoneFormat}`);
      }
    }

    // Also check phone verifications
    console.log('\n📞 Checking phone verifications...');
    const verificationRef = collection(db, 'phoneVerifications');
    const verificationResults = [];
    
    for (const phoneFormat of phoneFormats) {
      const q = query(verificationRef, where('phone', '==', phoneFormat));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log(`✅ Found verification:`, {
            id: doc.id,
            phone: data.phone,
            verified: data.verified,
            purpose: data.purpose,
            createdAt: data.createdAt?.toDate?.()?.toISOString() || 'N/A'
          });
          verificationResults.push({
            id: doc.id,
            phone: data.phone,
            verified: data.verified,
            purpose: data.purpose
          });
        });
      }
    }

    console.log('\n📊 SUMMARY:');
    console.log(`Users found: ${results.length}`);
    console.log(`Verifications found: ${verificationResults.length}`);
    console.log(`Expected email format: ${expectedEmail}`);
    
    if (results.length === 0) {
      console.log('❌ No user account found - this is the problem!');
      console.log('💡 Need to create Firebase Auth user with email:', expectedEmail);
    } else {
      console.log('✅ User account exists');
      console.log('🔐 Login should work with email:', expectedEmail);
    }

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

debugPhoneLogin();
