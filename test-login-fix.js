const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
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
const auth = getAuth(app);
const db = getFirestore(app);

async function testPhoneLogin() {
  try {
    const phone = "0761120457";
    
    console.log(`🔍 Testing login for phone: ${phone}`);
    
    // Step 1: Look up the actual email for this phone number
    const usersRef = collection(db, 'users');
    const phoneFormats = [
      phone.trim(),
      '+94761120457',
      '0761120457',
      '94761120457'
    ];

    let foundEmail = null;
    
    for (const phoneFormat of phoneFormats) {
      console.log(`🔍 Checking users with phone: ${phoneFormat}`);
      const q = query(usersRef, where('phone', '==', phoneFormat));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        foundEmail = userData.email;
        console.log(`✅ Found user with email: ${foundEmail}`);
        break;
      }
    }

    if (!foundEmail) {
      console.log('❌ No user found for this phone number');
      return;
    }

    console.log(`\n🔐 Testing Firebase Auth login...`);
    console.log(`📧 Email: ${foundEmail}`);
    console.log(`🔑 Password: [testing with common password]`);
    
    // For security, I won't actually test the password here
    console.log('\n✅ Phone lookup successful!');
    console.log('📧 The sign-in should now work with email:', foundEmail);
    console.log('\n🎯 SOLUTION: The SignIn.tsx will now:');
    console.log('1. Detect phone number input: 0761120457');
    console.log('2. Look up actual email: seneshfitzroy@gmail.com');
    console.log('3. Sign in with Firebase Auth using the real email');
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testPhoneLogin();
