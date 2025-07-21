// Test the phone lookup for forgot password
const testForgotPassword = async () => {
  try {
    console.log('🧪 Testing forgot password phone lookup...');
    
    const response = await fetch('http://localhost:3001/api/lookup-phone-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: '0761120457'
      }),
    });

    const result = await response.json();
    
    console.log('📞 Phone lookup result:', result);
    
    if (response.ok && result.success) {
      console.log('✅ Phone lookup successful!');
      console.log(`📧 Email found: ${result.email}`);
      console.log(`📧 Auth email: ${result.authEmail}`);
      console.log('🎯 Forgot password should work now');
    } else {
      console.log('❌ Phone lookup failed:', result);
    }
  } catch (error) {
    console.error('❌ Test error:', error);
  }
};

testForgotPassword();
