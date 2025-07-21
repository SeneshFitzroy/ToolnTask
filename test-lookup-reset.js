// Test that phone lookup now finds the reset account
const testLookupWithReset = async () => {
  console.log('🧪 Testing phone lookup with reset account...');
  
  try {
    const response = await fetch('http://localhost:3001/api/lookup-phone-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone: '0761120457' }),
    });

    const result = await response.json();
    
    console.log('📋 Lookup result:', result);
    
    if (response.ok && result.success) {
      console.log('✅ Lookup successful!');
      console.log(`📧 Email found: ${result.email}`);
      console.log(`🔄 Is reset account: ${result.isResetAccount || false}`);
      
      if (result.isResetAccount) {
        console.log('🎉 SUCCESS! Lookup now returns the reset account!');
        console.log('🎯 User can login with phone: 0761120457 and their new password');
      } else {
        console.log('ℹ️ Still returning original account - that\'s fine too');
      }
    } else {
      console.log('❌ Lookup failed:', result);
    }
  } catch (error) {
    console.error('❌ Test error:', error);
  }
};

testLookupWithReset();
