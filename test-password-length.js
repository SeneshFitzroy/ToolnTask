// Test password length validation
const testPasswordLength = async () => {
  console.log('🧪 Testing password length validation...');
  
  try {
    const testPhone = '0761120457';
    
    // Test 1: Too short password (less than 8 characters)
    console.log('📞 Test 1: Attempting to set password with 6 characters...');
    
    const shortPasswordResponse = await fetch('http://localhost:3001/api/reset-phone-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: testPhone,
        newPassword: 'short1!' // Only 7 characters
      }),
    });

    const shortPasswordData = await shortPasswordResponse.json();
    console.log('📋 Short password response:', shortPasswordData);

    if (!shortPasswordResponse.ok && shortPasswordData.error === 'PASSWORD_TOO_SHORT') {
      console.log('✅ SUCCESS: Short password was correctly rejected!');
      console.log('📝 Error message:', shortPasswordData.message);
    } else {
      console.log('❌ FAILED: Short password was allowed! This should not happen.');
    }

    // Test 2: Valid password length (8+ characters)
    console.log('\n📞 Test 2: Attempting to set password with 8+ characters...');
    
    const validPasswordResponse = await fetch('http://localhost:3001/api/reset-phone-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: testPhone,
        newPassword: 'ValidPass123!' // 12 characters
      }),
    });

    const validPasswordData = await validPasswordResponse.json();
    console.log('📋 Valid password response:', validPasswordData);

    if (validPasswordResponse.ok && validPasswordData.success) {
      console.log('✅ SUCCESS: Valid length password was accepted!');
    } else {
      console.log('❌ INFO: Valid password was rejected (might be due to same password check or other validation)');
      console.log('📝 Response:', validPasswordData.message);
    }

    // Test 3: Exactly 8 characters
    console.log('\n📞 Test 3: Attempting to set password with exactly 8 characters...');
    
    const exactPasswordResponse = await fetch('http://localhost:3001/api/reset-phone-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: testPhone,
        newPassword: 'Exact12!' // Exactly 8 characters
      }),
    });

    const exactPasswordData = await exactPasswordResponse.json();
    console.log('📋 Exact 8-char password response:', exactPasswordData);

    if (exactPasswordResponse.ok && exactPasswordData.success) {
      console.log('✅ SUCCESS: Exactly 8-character password was accepted!');
    } else if (!exactPasswordResponse.ok && exactPasswordData.error === 'PASSWORD_TOO_SHORT') {
      console.log('❌ FAILED: 8-character password was rejected as too short!');
    } else {
      console.log('ℹ️ INFO: 8-character password was rejected for other reasons (same password check, etc.)');
      console.log('📝 Response:', exactPasswordData.message);
    }

  } catch (error) {
    console.error('❌ Test error:', error);
  }
};

testPasswordLength();
