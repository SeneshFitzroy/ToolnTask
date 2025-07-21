const testPhoneLookupAPI = async () => {
  try {
    console.log('🧪 Testing phone lookup API...');
    
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
    
    if (response.ok) {
      console.log('✅ Phone lookup API successful:', result);
      console.log(`📧 Will use email for login: ${result.email}`);
    } else {
      console.log('❌ Phone lookup API failed:', result);
    }
  } catch (error) {
    console.error('❌ Test error:', error);
  }
};

testPhoneLookupAPI();
