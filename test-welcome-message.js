// Test the phone registration welcome message
const testPhoneWelcome = async () => {
  try {
    console.log('🧪 Testing phone registration welcome message...');
    
    const response = await fetch('http://localhost:3001/api/phone-verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: '0761120457',
        type: 'registration-welcome',
        firstName: 'Test User'
      }),
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Welcome message API test successful:', result);
    } else {
      console.log('❌ Welcome message API test failed:', result);
    }
  } catch (error) {
    console.error('❌ Test error:', error);
  }
};

testPhoneWelcome();
