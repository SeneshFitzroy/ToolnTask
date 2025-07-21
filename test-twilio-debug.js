// Test script to debug Twilio SMS
const twilio = require('twilio');

console.log('🔧 Testing Twilio Configuration...');

const accountSid = 'AC1f4cd6b2dce5ff7d7f68a3430f64180f';
const authToken = '5add40755d1bfc88a6ef4ef974a345b3';
const fromPhone = '+18777804236';

console.log('Account SID:', accountSid);
console.log('Auth Token:', authToken ? 'Present' : 'Missing');
console.log('From Phone:', fromPhone);

if (!accountSid || !authToken || !fromPhone) {
  console.error('❌ Missing Twilio credentials');
  process.exit(1);
}

const client = twilio(accountSid, authToken);

async function testSMS() {
  try {
    console.log('📱 Attempting to send test SMS...');
    
    const message = await client.messages.create({
      body: '🔐 Test message from ToolNTask: 123456',
      from: fromPhone,
      to: '+18777804236' // Sending to the same virtual number for testing
    });
    
    console.log('✅ SMS sent successfully!');
    console.log('Message SID:', message.sid);
    console.log('Status:', message.status);
    
  } catch (error) {
    console.error('❌ SMS sending failed:', error.message);
    console.error('Error code:', error.code);
    console.error('More info:', error.moreInfo);
  }
}

testSMS();
