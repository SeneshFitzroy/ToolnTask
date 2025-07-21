// Test complete forgot password flow for phone number
const testCompleteFlow = async () => {
  console.log('🧪 Testing complete forgot password flow...');
  
  const phone = '0761120457';
  
  try {
    // Step 1: Check if phone is registered (same as forgot password does)
    console.log('📞 Step 1: Checking if phone is registered...');
    const checkResponse = await fetch('http://localhost:3001/api/lookup-phone-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone: phone }),
    });

    const checkData = await checkResponse.json();
    console.log('📋 Check response:', checkData);

    if (!checkResponse.ok || !checkData.success) {
      console.log('❌ Phone number not found!');
      return;
    }

    console.log('✅ Phone found! Auth email:', checkData.authEmail);

    // Step 2: Send password reset OTP
    console.log('📱 Step 2: Sending password reset OTP...');
    const otpResponse = await fetch('http://localhost:3001/api/phone-verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        phone: phone,
        type: 'password-reset'
      }),
    });

    const otpData = await otpResponse.json();
    console.log('🔐 OTP response:', otpData);

    if (otpResponse.ok && otpData.success) {
      console.log('✅ Password reset OTP sent successfully!');
      console.log('🎯 Complete flow is working!');
    } else {
      console.log('❌ Failed to send OTP:', otpData);
    }

  } catch (error) {
    console.error('❌ Test error:', error);
  }
};

testCompleteFlow();
