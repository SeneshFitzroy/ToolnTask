// Test same password prevention
const testSamePasswordPrevention = async () => {
  console.log('🧪 Testing same password prevention...');
  
  try {
    const testPhone = '0761120457';
    const currentPassword = 'newsecurepass123';
    
    console.log('📞 Step 1: Attempting to reset password to the same password...');
    
    const resetResponse = await fetch('http://localhost:3001/api/reset-phone-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: testPhone,
        newPassword: currentPassword // Same password
      }),
    });

    const resetData = await resetResponse.json();
    console.log('📋 Reset response:', resetData);

    if (!resetResponse.ok) {
      if (resetData.error === 'SAME_PASSWORD') {
        console.log('✅ SUCCESS: Same password was correctly rejected!');
        console.log('📝 Error message:', resetData.message);
      } else if (resetData.error === 'SAME_PASSWORD_HISTORY') {
        console.log('✅ SUCCESS: Same password from history was correctly rejected!');
        console.log('📝 Error message:', resetData.message);
      } else {
        console.log('❌ UNEXPECTED: Different error occurred:', resetData.message);
      }
    } else {
      console.log('❌ FAILED: Same password was allowed! This should not happen.');
    }

    console.log('\n📞 Step 2: Attempting to reset password to a new different password...');
    
    const newPassword = 'completelydifferentpass456';
    const newResetResponse = await fetch('http://localhost:3001/api/reset-phone-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: testPhone,
        newPassword: newPassword // Different password
      }),
    });

    const newResetData = await newResetResponse.json();
    console.log('📋 New reset response:', newResetData);

    if (newResetResponse.ok && newResetData.success) {
      console.log('✅ SUCCESS: Different password was accepted!');
      
      // Now test if trying to reset to this new password is blocked
      console.log('\n📞 Step 3: Attempting to reset password to the password we just set...');
      
      const sameNewResponse = await fetch('http://localhost:3001/api/reset-phone-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: testPhone,
          newPassword: newPassword // Same as the password we just set
        }),
      });

      const sameNewData = await sameNewResponse.json();
      console.log('📋 Same new password response:', sameNewData);

      if (!sameNewResponse.ok && (sameNewData.error === 'SAME_PASSWORD' || sameNewData.error === 'SAME_PASSWORD_HISTORY')) {
        console.log('✅ SUCCESS: Recently set password was correctly rejected!');
      } else {
        console.log('❌ FAILED: Recently set password was allowed again!');
      }
      
    } else {
      console.log('❌ FAILED: Different password was rejected:', newResetData.message);
    }

  } catch (error) {
    console.error('❌ Test error:', error);
  }
};

testSamePasswordPrevention();
