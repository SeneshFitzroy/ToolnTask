// Complete system test - all flows
const testCompleteSystem = async () => {
  console.log('🧪 COMPLETE SYSTEM TEST STARTING...');
  console.log('=====================================');
  
  const testPhone = '0761120457';
  const testPassword = 'TestPass123!';
  const newPassword = 'NewPass456!';
  
  try {
    // STEP 1: Test account creation
    console.log('\n📝 STEP 1: Testing account creation from phone number...');
    
    // First check if we can look up existing account
    const existingLookup = await fetch('http://localhost:3001/api/lookup-phone-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: testPhone })
    });
    const existingData = await existingLookup.json();
    console.log('🔍 Existing account check:', existingData);
    
    // STEP 2: Test login with existing account
    if (existingData.success) {
      console.log('\n🔐 STEP 2: Testing login with existing account...');
      
      const loginResponse = await fetch('http://localhost:3001/api/test-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: existingData.email,
          password: testPassword
        })
      });
      const loginResult = await loginResponse.json();
      console.log('🔑 Login test result:', loginResult);
      
      if (!loginResult.success) {
        console.log('❌ ISSUE: Cannot login with existing account');
      } else {
        console.log('✅ Login works with existing account');
      }
    }
    
    // STEP 3: Test password reset via OTP
    console.log('\n📱 STEP 3: Testing password reset via OTP...');
    
    const resetResponse = await fetch('http://localhost:3001/api/reset-phone-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: testPhone,
        newPassword: newPassword
      })
    });
    const resetResult = await resetResponse.json();
    console.log('🔄 Password reset result:', resetResult);
    
    if (!resetResult.success) {
      console.log('❌ ISSUE: Password reset failed');
      return;
    }
    
    // STEP 4: Test lookup after password reset
    console.log('\n🔍 STEP 4: Testing lookup after password reset...');
    
    const newLookup = await fetch('http://localhost:3001/api/lookup-phone-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: testPhone })
    });
    const newLookupData = await newLookup.json();
    console.log('📧 New lookup result:', newLookupData);
    
    // STEP 5: Test login with new password
    console.log('\n🎯 STEP 5: Testing login with new password...');
    
    const newLoginResponse = await fetch('http://localhost:3001/api/test-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: newLookupData.email,
        password: newPassword
      })
    });
    const newLoginResult = await newLoginResponse.json();
    console.log('🔐 New password login result:', newLoginResult);
    
    // FINAL SUMMARY
    console.log('\n🎯 FINAL SYSTEM STATUS:');
    console.log('=====================================');
    console.log(`📱 Phone: ${testPhone}`);
    console.log(`📧 Current Email: ${newLookupData.email}`);
    console.log(`🔑 Password Reset: ${resetResult.success ? '✅ SUCCESS' : '❌ FAILED'}`);
    console.log(`🔐 Login Works: ${newLoginResult.success ? '✅ SUCCESS' : '❌ FAILED'}`);
    
    if (resetResult.success && newLoginResult.success) {
      console.log('\n🎉 COMPLETE SYSTEM IS WORKING!');
    } else {
      console.log('\n❌ SYSTEM HAS ISSUES - NEEDS FIXING');
    }
    
  } catch (error) {
    console.error('❌ SYSTEM TEST ERROR:', error);
  }
};

testCompleteSystem();
