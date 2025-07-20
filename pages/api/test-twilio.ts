import type { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { testPhone } = req.body;

  try {
    console.log('🔧 Testing Twilio SMS delivery...');
    
    const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

    console.log('Twilio Config:', {
      accountSid: twilioAccountSid?.substring(0, 10) + '...',
      hasAuthToken: !!twilioAuthToken,
      fromNumber: twilioPhoneNumber
    });

    if (!twilioAccountSid || !twilioAuthToken || !twilioPhoneNumber) {
      return res.status(400).json({
        success: false,
        message: 'Missing Twilio credentials',
        debug: {
          hasAccountSid: !!twilioAccountSid,
          hasAuthToken: !!twilioAuthToken,
          hasPhoneNumber: !!twilioPhoneNumber
        }
      });
    }

    const client = twilio(twilioAccountSid, twilioAuthToken);

    // First, let's check account info
    console.log('📊 Checking Twilio account status...');
    const account = await client.api.accounts(twilioAccountSid).fetch();
    console.log('Account Status:', account.status);
    console.log('Account Type:', account.type);

    // Test SMS delivery
    console.log(`📱 Attempting to send test SMS to ${testPhone}...`);
    
    const message = await client.messages.create({
      body: `🔧 TEST SMS from ToolNTask: If you receive this, SMS is working! Time: ${new Date().toLocaleTimeString()}`,
      from: twilioPhoneNumber,
      to: testPhone
    });

    console.log('✅ SMS sent successfully!');
    console.log('Message Details:', {
      sid: message.sid,
      status: message.status,
      direction: message.direction,
      from: message.from,
      to: message.to,
      dateCreated: message.dateCreated
    });

    return res.status(200).json({
      success: true,
      message: 'Test SMS sent successfully',
      debug: {
        messageSid: message.sid,
        status: message.status,
        accountStatus: account.status,
        accountType: account.type,
        from: message.from,
        to: message.to
      }
    });

  } catch (error: unknown) {
    const twilioError = error as { message?: string; code?: string; moreInfo?: string; status?: number; constructor?: { name: string } };
    console.error('❌ Twilio test failed:', twilioError);
    
    return res.status(500).json({
      success: false,
      message: 'SMS test failed',
      error: twilioError.message || 'Unknown error',
      code: twilioError.code || 'No code',
      moreInfo: twilioError.moreInfo || 'No additional info',
      debug: {
        errorType: twilioError.constructor?.name || 'Unknown',
        status: twilioError.status || 'No status'
      }
    });
  }
}
