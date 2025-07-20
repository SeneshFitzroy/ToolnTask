import type { NextApiRequest, NextApiResponse } from 'next';

// Simple WhatsApp OTP using a free service
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { phone, otp } = req.body;

  try {
    // Option 1: CallMeBot (Free WhatsApp API)
    const callMeBotApiKey = process.env.CALLMEBOT_API_KEY; // Free after phone verification
    
    if (callMeBotApiKey) {
      const message = `🔐 Your ToolNTask verification code is: ${otp}. This code expires in 10 minutes. Don't share this code with anyone. - ToolNTask Sri Lanka`;
      
      const whatsappUrl = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodeURIComponent(message)}&apikey=${callMeBotApiKey}`;
      
      const response = await fetch(whatsappUrl);
      
      if (response.ok) {
        console.log('✅ CallMeBot WhatsApp message sent');
        return res.status(200).json({
          success: true,
          message: `WhatsApp OTP sent to ${phone}`,
          method: 'WHATSAPP'
        });
      } else {
        console.log('❌ CallMeBot failed:', response.status);
      }
    }

    // Option 2: Ultramsg (Free tier available)
    const ultramsgToken = process.env.ULTRAMSG_TOKEN;
    const ultramsgInstance = process.env.ULTRAMSG_INSTANCE;
    
    if (ultramsgToken && ultramsgInstance) {
      const message = `🔐 Your ToolNTask verification code is: ${otp}\\n\\nThis code expires in 10 minutes.\\nDon't share this code with anyone.\\n\\n- ToolNTask Sri Lanka`;
      
      const response = await fetch(`https://api.ultramsg.com/${ultramsgInstance}/messages/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          token: ultramsgToken,
          to: phone,
          body: message
        })
      });

      const result = await response.json();
      
      if (response.ok && result.sent) {
        return res.status(200).json({
          success: true,
          message: `WhatsApp OTP sent to ${phone}`,
          method: 'WHATSAPP',
          messageId: result.id
        });
      }
    }

    // Option 3: Green API (Free tier)
    const greenApiId = process.env.GREEN_API_ID;
    const greenApiToken = process.env.GREEN_API_TOKEN;
    
    if (greenApiId && greenApiToken) {
      const message = `🔐 *ToolNTask Verification Code*\\n\\nYour verification code is: *${otp}*\\n\\nThis code expires in 10 minutes.\\nDon't share this code with anyone.\\n\\n- ToolNTask Sri Lanka 🇱🇰`;
      
      const response = await fetch(`https://api.green-api.com/waInstance${greenApiId}/sendMessage/${greenApiToken}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatId: `${phone}@c.us`,
          message: message
        })
      });

      const result = await response.json();
      
      if (response.ok && result.idMessage) {
        return res.status(200).json({
          success: true,
          message: `WhatsApp OTP sent to ${phone}`,
          method: 'WHATSAPP',
          messageId: result.idMessage
        });
      }
    }

    // If no WhatsApp service configured
    return res.status(400).json({
      success: false,
      message: 'No WhatsApp service configured',
      error: 'Missing WhatsApp API credentials'
    });

  } catch (error: unknown) {
    const err = error as { message?: string };
    console.error('WhatsApp OTP Error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to send WhatsApp OTP',
      error: err.message || 'Unknown error'
    });
  }
}
