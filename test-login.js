// Test login with phone and new password
const testLogin = async () => {
  console.log('🧪 Testing login with phone and password...');
  
  try {
    // Step 1: Look up the email for the phone number
    console.log('📞 Step 1: Looking up email for phone...');
    const lookupResponse = await fetch('http://localhost:3001/api/lookup-phone-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone: '0761120457' }),
    });

    const lookupData = await lookupResponse.json();
    console.log('📋 Lookup response:', lookupData);

    if (!lookupResponse.ok || !lookupData.success) {
      console.log('❌ Phone number not found!');
      return;
    }

    console.log('✅ Found email:', lookupData.email);

    // Step 2: Try Firebase Auth sign in
    console.log('🔐 Step 2: Testing Firebase Auth sign in...');
    
    // Note: This would need Firebase SDK on client side
    console.log('📧 Would sign in with:', lookupData.email);
    console.log('🔑 Password: [provided by user]');
    console.log('💡 Check if the password was actually updated correctly');

  } catch (error) {
    console.error('❌ Test error:', error);
  }
};

testLogin();
