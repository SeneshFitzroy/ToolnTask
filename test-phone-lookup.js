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

// Test script to verify phone number lookup functionality
const testPhoneLookup = async () => {
  console.log('🧪 Testing phone number lookup functionality...');
  
  // Test phone number (replace with actual registered phone)
  const testPhone = '0771234567'; // Example phone number
  
  try {
    const response = await fetch('http://localhost:3001/api/lookup-phone-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone: testPhone }),
    });
    
    console.log('Response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Phone lookup successful:', data);
      console.log('- Email:', data.email);
      console.log('- AuthEmail:', data.authEmail);
      console.log('- Phone:', data.phone);
    } else {
      const errorData = await response.json();
      console.log('❌ Phone lookup failed:', errorData);
    }
  } catch (error) {
    console.error('🚨 Error during phone lookup test:', error);
  }
};

// Run the test if in browser environment
if (typeof window !== 'undefined') {
  testPhoneLookup();
}
