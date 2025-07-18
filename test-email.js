// Test email functionality
// Run this in your browser console at: http://localhost:3000

async function testEmail() {
  try {
    const response = await fetch('/api/send-welcome-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: 'Test',
        email: 'your-email@example.com' // Replace with your actual email
      })
    });
    
    const result = await response.json();
    console.log('Email test result:', result);
    
    if (response.ok) {
      alert('✅ Email test successful! Check your email inbox.');
    } else {
      alert('❌ Email test failed: ' + result.message);
    }
  } catch (error) {
    console.error('Email test error:', error);
    alert('❌ Email test error: ' + error.message);
  }
}

// Call the function
testEmail();
