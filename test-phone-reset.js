// Test the new phone password reset API
const testPhonePasswordReset = async () => {
  console.log('🧪 Testing phone password reset API...');
  
  try {
    const response = await fetch('http://localhost:3001/api/reset-phone-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: '0761120457',
        newPassword: 'NewPassword123!'
      }),
    });

    const result = await response.json();
    
    console.log('📋 Reset response:', result);
    
    if (response.ok && result.success) {
      console.log('✅ Password reset successful!');
      console.log(`📧 Email: ${result.email}`);
      
      // Now test login with the new password
      console.log('🔐 Testing login with new password...');
      
      const loginResponse = await fetch('http://localhost:3001/api/test-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: result.email,
          password: 'NewPassword123!'
        }),
      });

      const loginResult = await loginResponse.json();
      console.log('🔑 Login result:', loginResult);
      
      if (loginResponse.ok && loginResult.success) {
        console.log('🎉 SUCCESS! Complete flow is working!');
        console.log('🎯 User can now login with phone: 0761120457 and password: NewPassword123!');
      } else {
        console.log('❌ Login failed after password reset:', loginResult);
      }
      
    } else {
      console.log('❌ Password reset failed:', result);
    }
  } catch (error) {
    console.error('❌ Test error:', error);
  }
};

testPhonePasswordReset();
