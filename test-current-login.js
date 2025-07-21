// Test what happens when we try to sign in with the current credentials
const testCurrentLogin = async () => {
  console.log('🧪 Testing current login credentials...');
  
  try {
    // Get the correct email for the phone number
    const lookupResponse = await fetch('http://localhost:3001/api/lookup-phone-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: '0761120457' })
    });

    const lookupData = await lookupResponse.json();
    console.log('📧 Email found:', lookupData.email);

    if (!lookupData.success) {
      console.log('❌ No email found for phone');
      return;
    }

    // Test with some common passwords that might be set
    const testPasswords = ['password123', 'newpass123', '123456', 'test123'];
    
    for (const password of testPasswords) {
      console.log(`🔐 Testing password: ${password}`);
      
      try {
        const loginResponse = await fetch('http://localhost:3001/api/test-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: lookupData.email,
            password: password
          })
        });

        const result = await loginResponse.json();
        if (loginResponse.ok) {
          console.log(`✅ SUCCESS! Password is: ${password}`);
          return;
        } else {
          console.log(`❌ Failed with: ${password} - ${result.message}`);
        }
      } catch (err) {
        console.log(`❌ Error with ${password}:`, err);
      }
    }

    console.log('🤔 None of the test passwords worked');

  } catch (error) {
    console.error('❌ Test error:', error);
  }
};

testCurrentLogin();
