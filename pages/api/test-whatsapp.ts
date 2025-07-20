import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ error: 'Phone number is required' });
  }

  try {
    // Test Green API configuration
    const greenApiId = process.env.GREEN_API_ID;
    const greenApiToken = process.env.GREEN_API_TOKEN;

    if (!greenApiId || !greenApiToken) {
      return res.status(500).json({ 
        error: 'Green API credentials not configured',
        details: 'Please add GREEN_API_ID and GREEN_API_TOKEN to .env.local'
      });
    }

    // Format phone number for WhatsApp (remove leading 0, add country code)
    let formattedPhone = phoneNumber.replace(/^0/, '94'); // Sri Lankan numbers
    if (!formattedPhone.includes('@')) {
      formattedPhone = `${formattedPhone}@c.us`;
    }

    const testMessage = `🔥 WhatsApp API Test from ToolNTask! 
    
✅ Your Green API is working perfectly!
🕒 Time: ${new Date().toLocaleString()}
📱 Phone: ${phoneNumber}

This is a test message to verify your WhatsApp integration. 🚀`;

    // Send test message via Green API
    const greenApiUrl = `https://7105.api.greenapi.com/waInstance${greenApiId}/sendMessage/${greenApiToken}`;
    
    const greenApiResponse = await fetch(greenApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chatId: formattedPhone,
        message: testMessage,
      }),
    });

    const greenApiResult = await greenApiResponse.json();

    if (greenApiResponse.ok) {
      return res.status(200).json({
        success: true,
        message: 'WhatsApp test message sent successfully!',
        service: 'Green API',
        phoneNumber: formattedPhone,
        messageId: greenApiResult.idMessage,
        details: greenApiResult
      });
    } else {
      return res.status(400).json({
        success: false,
        error: 'Failed to send WhatsApp message',
        service: 'Green API',
        details: greenApiResult,
        troubleshooting: 'Make sure your Green API instance is authorized (linked to WhatsApp)'
      });
    }

  } catch (error: unknown) {
    console.error('WhatsApp test error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: errorMessage,
      troubleshooting: 'Check your Green API credentials and internet connection'
    });
  }
}
