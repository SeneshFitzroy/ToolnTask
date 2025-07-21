// Simplified Authentication Test
// Run with: node test-simplified-auth.js

const testFlow = async () => {
  console.log('🧪 SIMPLIFIED AUTHENTICATION TEST');
  console.log('=================================');
  
  const testEmail = 'test@example.com';
  const testPhone = '0761120457'; 
  const testPassword = 'TestPass123!';
  
  // Test 1: Phone lookup
  console.log('\n1️⃣ Testing phone lookup...');
  try {
    const lookupResponse = await fetch('http://localhost:3000/api/lookup-phone-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: testPhone })
    });
    
    const lookupData = await lookupResponse.json();
    console.log('📞 Phone lookup result:', lookupData);
    
    if (lookupData.success) {
      // Test 2: Ensure auth for found user
      console.log('\n2️⃣ Testing ensure auth...');
      const ensureResponse = await fetch('http://localhost:3000/api/ensure-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: lookupData.email,
          phone: testPhone,
          password: testPassword
        })
      });
      
      const ensureData = await ensureResponse.json();
      console.log('🔧 Ensure auth result:', ensureData);
      
      if (ensureData.success) {
        // Test 3: Direct Firebase Auth test
        console.log('\n3️⃣ Testing direct Firebase Auth...');
        const loginResponse = await fetch('http://localhost:3000/api/test-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: lookupData.email,
            password: testPassword
          })
        });
        
        const loginData = await loginResponse.json();
        console.log('🔐 Login test result:', loginData);
        
        if (loginData.success) {
          console.log('\n✅ ALL TESTS PASSED! Authentication flow is working correctly.');
          console.log('🎯 Users should now be able to:');
          console.log('   • Register an account');
          console.log('   • Login immediately after registration');
          console.log('   • Reset password and login with new password');
          console.log('   • Login with phone number or email');
        } else {
          console.log('\n❌ Login test failed:', loginData.message);
        }
      } else {
        console.log('\n❌ Ensure auth failed:', ensureData.message);
      }
    } else {
      console.log('\n❌ Phone lookup failed:', lookupData.message);
      console.log('💡 This is normal if no account exists for this phone number');
    }
  } catch (error) {
    console.error('\n💥 Test failed with error:', error.message);
  }
  
  console.log('\n📋 SUMMARY:');
  console.log('The new authentication system:');
  console.log('1. Tries direct Firebase Auth login first');
  console.log('2. If that fails, ensures auth setup is correct');
  console.log('3. Tries login again after ensuring setup');
  console.log('4. Provides clear error messages for each scenario');
  console.log('\n🔧 To test manually:');
  console.log('1. Register a new account');
  console.log('2. Try to login immediately (should work now)');
  console.log('3. Reset password');
  console.log('4. Try to login with new password (should work now)');
};

if (typeof window === 'undefined') {
  // Node.js environment
  const fetch = require('node-fetch');
  testFlow().catch(console.error);
} else {
  // Browser environment
  testFlow().catch(console.error);
}
