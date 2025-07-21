// Create a fresh test with a different phone number
const testFreshAccount = async () => {
  console.log('🧪 TESTING FRESH ACCOUNT CREATION...');
  console.log('=====================================');
  
  const testPhone = '0771234567'; // Different number
  const initialPassword = 'Initial123!';
  const newPassword = 'Reset456!';
  
  try {
    // STEP 1: Create account via signup API simulation
    console.log('\n📝 STEP 1: Creating fresh account...');
    
    const authEmail = `94771234567@toolntask.app`; // Expected format
    
    // Test if account already exists
    const existingCheck = await fetch('http://localhost:3001/api/lookup-phone-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: testPhone })
    });
    const existingData = await existingCheck.json();
    
    if (existingData.success) {
      console.log('🔍 Account already exists:', existingData.email);
    } else {
      console.log('✨ No existing account found - ready for fresh test');
    }
    
    // STEP 2: Test initial login (should fail if no account)
    console.log('\n🔐 STEP 2: Testing initial login...');
    
    if (existingData.success) {
      const initialLogin = await fetch('http://localhost:3001/api/test-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: existingData.email,
          password: initialPassword
        })
      });
      const initialResult = await initialLogin.json();
      console.log('🔑 Initial login result:', initialResult.success ? '✅ SUCCESS' : '❌ FAILED');
    }
    
    // STEP 3: Test password reset
    console.log('\n🔄 STEP 3: Testing password reset...');
    
    const resetResponse = await fetch('http://localhost:3001/api/reset-phone-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: testPhone,
        newPassword: newPassword
      })
    });
    const resetResult = await resetResponse.json();
    console.log('🔄 Reset result:', resetResult.success ? '✅ SUCCESS' : '❌ FAILED');
    console.log('📧 Reset email:', resetResult.email);
    
    // STEP 4: Test login after reset
    console.log('\n🎯 STEP 4: Testing login after reset...');
    
    if (resetResult.success) {
      const finalLogin = await fetch('http://localhost:3001/api/test-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: resetResult.email,
          password: newPassword
        })
      });
      const finalResult = await finalLogin.json();
      console.log('🎉 Final login result:', finalResult.success ? '✅ SUCCESS' : '❌ FAILED');
    }
    
    // STEP 5: Test phone lookup after reset
    console.log('\n🔍 STEP 5: Testing phone lookup after reset...');
    
    const finalLookup = await fetch('http://localhost:3001/api/lookup-phone-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: testPhone })
    });
    const finalLookupData = await finalLookup.json();
    console.log('📧 Final lookup email:', finalLookupData.email);
    
    // FINAL SUMMARY
    console.log('\n🎯 FRESH ACCOUNT TEST SUMMARY:');
    console.log('=====================================');
    console.log(`📱 Test Phone: ${testPhone}`);
    console.log(`📧 Final Email: ${finalLookupData.email}`);
    console.log(`🔄 Password Reset: ${resetResult.success ? '✅' : '❌'}`);
    console.log(`🔐 Login Works: ${resetResult.success && finalLookupData.success ? '✅' : '❌'}`);
    
  } catch (error) {
    console.error('❌ Fresh test error:', error);
  }
};

testFreshAccount();
