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

async function testPhoneLookup() {
  try {
    const phone = "0761120457";
    
    console.log('🧪 Testing phone lookup with all formats...');
    
    // All possible formats to check
    const phoneFormats = [
      '+94761120457',    // International format
      '0761120457',      // Local format (current in DB)
      '94761120457',     // Auth email format (what we want for new accounts)
      phone.trim()       // Original input
    ];

    console.log('📋 Checking these formats:', phoneFormats);

    const usersRef = collection(db, 'users');
    let foundUser = null;

    for (const phoneFormat of phoneFormats) {
      console.log(`🔍 Searching for phone: ${phoneFormat}`);
      const q = query(usersRef, where('phone', '==', phoneFormat));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        foundUser = {
          phone: userData.phone,
          email: userData.email,
          authEmail: userData.authEmail
        };
        
        console.log(`✅ FOUND USER with phone format: ${phoneFormat}`);
        console.log(`📧 Auth email: ${userData.authEmail}`);
        console.log(`📱 Stored phone: ${userData.phone}`);
        console.log(`📧 User email: ${userData.email}`);
        break;
      } else {
        console.log(`❌ No user found with phone: ${phoneFormat}`);
      }
    }

    if (foundUser) {
      console.log('\n🎯 SOLUTION: Use the authEmail for login lookup');
      console.log(`✅ Login should work with: ${foundUser.authEmail}`);
    } else {
      console.log('\n❌ No user found with any phone format');
    }

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testPhoneLookup();
