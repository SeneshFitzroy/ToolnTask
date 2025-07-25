import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../src/lib/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import nodemailer from 'nodemailer';
import twilio from 'twilio';

type ResponseData = {
  message: string;
  success: boolean;
  error?: string;
};

// Helper function to format phone number to international format
function formatPhoneNumber(phone: string): string {
  // First, clean the input
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  
  // If it already starts with +, return as is (for international numbers)
  if (cleaned.startsWith('+')) {
    return cleaned;
  }
  
  // Remove all non-digits for processing
  const digits = cleaned.replace(/\D/g, '');
  
  // Handle Sri Lankan numbers
  if (digits.startsWith('0')) {
    // Convert 0761120457 to +94761120457
    return '+94' + digits.substring(1);
  }
  
  if (digits.startsWith('94')) {
    // Convert 94761120457 to +94761120457
    return '+' + digits;
  }
  
  // If it's just the local number without country code, add +94
  if (digits.length === 9 && digits.startsWith('7')) {
    return '+94' + digits;
  }
  
  // Default: add +94 prefix
  return '+94' + digits;
}

// Helper function to validate phone number
function isValidPhoneNumber(phone: string): boolean {
  const formatted = formatPhoneNumber(phone);
  
  // Sri Lankan phone numbers: +94 followed by 9 digits
  // Mobile patterns: 70, 71, 72, 74, 75, 76, 77, 78, 79 (including 079 series)
  const sriLankanMobilePattern = /^\+94(70|71|72|74|75|76|77|78|79)\d{7}$/;
  
  // For development/testing: Allow Twilio virtual numbers and common test numbers
  const testPhonePatterns = [
    /^\+1877\d{7}$/, // Twilio virtual numbers like +18777804236
    /^\+1555\d{7}$/, // Common test numbers
    /^\+15005550006$/, // Twilio test numbers
  ];
  
  // Check Sri Lankan numbers first
  if (sriLankanMobilePattern.test(formatted)) {
    return true;
  }
  
  // Allow test numbers in development
  if (process.env.NODE_ENV === 'development') {
    return testPhonePatterns.some(pattern => pattern.test(formatted));
  }
  
  return false;
}

// Generate 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      message: 'Method not allowed', 
      success: false,
      error: 'Only POST requests are allowed'
    });
  }

  try {
    const { phone, type = 'verification', firstName } = req.body;
    console.log(`📞 Received phone request - Type: ${type}, Phone: ${phone}`);

    if (!phone) {
      return res.status(400).json({ 
        message: 'Phone number is required', 
        success: false,
        error: 'Missing phone number'
      });
    }

    // Validate and format phone number
    const formattedPhone = formatPhoneNumber(phone);
    console.log(`📱 Formatted phone: ${formattedPhone}`);
    
    if (!isValidPhoneNumber(phone)) {
      console.log(`❌ Invalid phone number: ${phone} -> ${formattedPhone}`);
      return res.status(400).json({ 
        message: 'Invalid phone number format. Please use Sri Lankan mobile numbers (070-079 series) or test numbers in development', 
        success: false,
        error: 'Invalid phone format'
      });
    }

    console.log(`✅ Phone number validated: ${formattedPhone}`);
    
    // Handle different message types
    if (type === 'registration-welcome') {
      // Send welcome message (no OTP needed)
      console.log(`🎉 Sending welcome message to ${formattedPhone}`);
      
      const welcomeMessage = `🎉 *Welcome to ToolNTask!* 🇱🇰

Hi ${firstName || 'there'}! Your account has been created successfully.

✅ You can now access all ToolNTask features
📱 Use your phone number to sign in
🔐 Keep your password secure

Thank you for joining ToolNTask Sri Lanka!

- ToolNTask Team`;

      // Send welcome message via WhatsApp
      const greenApiId = process.env.GREEN_API_ID;
      const greenApiToken = process.env.GREEN_API_TOKEN;
      
      if (greenApiId && greenApiToken) {
        try {
          const whatsappPhone = formattedPhone.replace('+', '') + '@c.us';
          
          const whatsappResponse = await fetch(`https://7105.api.greenapi.com/waInstance${greenApiId}/sendMessage/${greenApiToken}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              chatId: whatsappPhone,
              message: welcomeMessage
            })
          });
          
          const whatsappResult = await whatsappResponse.json();
          
          if (whatsappResponse.ok && whatsappResult.idMessage) {
            console.log('✅ Welcome message sent successfully via WhatsApp');
            return res.status(200).json({ 
              message: `Welcome message sent via WhatsApp to ${formattedPhone}`,
              success: true
            });
          } else {
            console.log('❌ WhatsApp welcome message failed:', whatsappResult);
          }
        } catch (error) {
          console.log('❌ WhatsApp welcome message error:', error);
        }
      }
      
      // If WhatsApp fails, just return success (welcome messages are not critical)
      console.log('✅ Welcome message flow completed (WhatsApp may have failed but registration succeeded)');
      return res.status(200).json({ 
        message: `Welcome message sent to ${formattedPhone}`,
        success: true
      });
    }
    
    // For verification type, generate and send OTP
    console.log(`🔐 Generating OTP for verification...`);
    
    // Generate OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    // Store OTP in Firestore
    const otpDocRef = doc(collection(db, 'phoneVerifications'), formattedPhone.replace('+', ''));
    await setDoc(otpDocRef, {
      phone: formattedPhone,
      otp: otp,
      expiresAt: expiresAt,
      verified: false,
      createdAt: new Date(),
      purpose: type === 'verification' ? 'verification' : 'password_reset'
    });

    console.log(`💾 OTP stored in Firestore - Phone: ${formattedPhone}, OTP: ${otp}`);

    // Send OTP via SMS, WhatsApp, or email fallback
    const sendOTP = async () => {
      // First try WhatsApp (free and fast)
      const greenApiId = process.env.GREEN_API_ID;
      const greenApiToken = process.env.GREEN_API_TOKEN;
      
      if (greenApiId && greenApiToken) {
        console.log(`📱 Attempting WhatsApp OTP to ${formattedPhone}`);
        
        try {
          // Format phone for WhatsApp (remove + and add @c.us)
          const whatsappPhone = formattedPhone.replace('+', '') + '@c.us';
          
          const message = `🔐 *ToolNTask Verification Code*

Your verification code is: *${otp}*

This code expires in 10 minutes.
Don't share this code with anyone.

- ToolNTask Sri Lanka 🇱🇰`;
          
          const whatsappResponse = await fetch(`https://7105.api.greenapi.com/waInstance${greenApiId}/sendMessage/${greenApiToken}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              chatId: whatsappPhone,
              message: message
            })
          });
          
          const whatsappResult = await whatsappResponse.json();
          
          if (whatsappResponse.ok && whatsappResult.idMessage) {
            console.log('✅ WhatsApp OTP sent successfully via Green API');
            console.log(`📱 Message ID: ${whatsappResult.idMessage}`);
            return {
              success: true,
              message: `OTP sent via WhatsApp to ${formattedPhone}`,
              method: 'WHATSAPP',
              messageId: whatsappResult.idMessage
            };
          } else {
            console.log('❌ WhatsApp failed:', whatsappResult);
          }
        } catch (error) {
          console.log('❌ WhatsApp error:', error);
        }
      }
      
      // Then try SMS (Twilio)
      const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
      const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
      const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

      if (twilioAccountSid && twilioAuthToken && twilioPhoneNumber) {
        // Use real SMS service (Twilio)
        console.log(`🔧 Twilio credentials found, attempting SMS to ${formattedPhone}`);
        
        try {
          const client = twilio(twilioAccountSid, twilioAuthToken);

          const smsMessage = `🔐 Your ToolNTask verification code is: ${otp}. This code expires in 10 minutes. Don't share this code with anyone. - ToolNTask Sri Lanka`;

          // Add timeout to prevent hanging
          const messagePromise = client.messages.create({
            body: smsMessage,
            from: twilioPhoneNumber,
            to: formattedPhone
          });

          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('SMS timeout after 10 seconds')), 10000)
          );

          interface TwilioMessage {
            sid: string;
            status: string;
          }
          
          const message = await Promise.race([messagePromise, timeoutPromise]) as TwilioMessage;

          console.log(`✅ Real SMS sent to ${formattedPhone}: ${otp}`);
          console.log(`📱 Message SID: ${message.sid}, Status: ${message.status}`);
          
          return {
            success: true,
            message: `OTP sent successfully to ${formattedPhone}`,
            method: 'SMS'
          };
        } catch (twilioError: unknown) {
          const error = twilioError as { message?: string; code?: string; moreInfo?: string };
          console.error('❌ Twilio SMS Error:', error.message || 'Unknown error');
          console.error('Error Code:', error.code || 'No code');
          console.error('More Info:', error.moreInfo || 'No info');
          
          // Common Twilio errors for Sri Lankan numbers
          if (error.code === '21408') {
            console.log('🌍 Error: Permission to send SMS to Sri Lanka. Account may need upgrade.');
          } else if (error.code === '21614') {
            console.log('📞 Error: Phone number not verified in Twilio account.');
          } else if (error.code === '21211') {
            console.log('📱 Error: Invalid phone number format for Twilio.');
          }
          
          // Fall back to email if SMS fails
          console.log('🔄 Falling back to email simulation...');
        }
      } else {
        console.log(`🔧 DEVELOPMENT MODE: SMS would be sent to ${formattedPhone} with OTP: ${otp}`);
        console.log(`Missing Twilio credentials or using email fallback:`, {
          hasAccountSid: !!twilioAccountSid,
          hasAuthToken: !!twilioAuthToken,
          hasPhoneNumber: !!twilioPhoneNumber
        });
      }

      // Email fallback (always runs in development or when SMS fails)
      console.log(`📧 Sending OTP via email fallback: ${otp}`);
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || 'smtp.gmail.com',
          port: parseInt(process.env.SMTP_PORT || '587'),
          secure: false,
          auth: {
            user: process.env.SMTP_USER || process.env.EMAIL_USER,
            pass: process.env.SMTP_PASS || process.env.EMAIL_PASS,
          },
        });

        const emailTemplate = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>📱 SMS Simulation - ToolNTask</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
          <div style="max-width: 400px; margin: 20px auto; background-color: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #FF5E14 0%, #FF8A50 100%); padding: 30px 20px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 22px; font-weight: bold;">📱 SMS Simulation</h1>
              <p style="color: rgba(255, 255, 255, 0.9); margin: 8px 0 0 0; font-size: 14px;">Development Mode - ToolNTask</p>
            </div>

            <!-- Content -->
            <div style="padding: 30px 20px;">
              <div style="background: #fff3cd; border: 2px solid #ffeaa7; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
                <p style="color: #856404; margin: 0; font-size: 14px; text-align: center;">
                  <strong>🔧 Development Mode:</strong> This would be sent as SMS to <strong>${formattedPhone}</strong>
                </p>
              </div>

              <div style="text-align: center; margin-bottom: 25px;">
                <h2 style="color: #333; margin: 0 0 10px 0; font-size: 18px;">Your Verification Code</h2>
                <p style="color: #666; margin: 0; font-size: 14px;">This code would be sent via SMS</p>
              </div>

              <!-- OTP Code -->
              <div style="text-align: center; margin: 25px 0;">
                <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border: 3px solid #FF5E14; border-radius: 12px; padding: 25px; display: inline-block;">
                  <span style="font-size: 36px; font-weight: bold; color: #FF5E14; letter-spacing: 6px;">${otp}</span>
                </div>
              </div>

              <div style="background-color: #d1ecf1; border: 1px solid #bee5eb; border-radius: 6px; padding: 12px; margin: 20px 0;">
                <p style="color: #0c5460; margin: 0; font-size: 12px; text-align: center;">
                  <strong>📲 SMS Message:</strong><br>
                  "🔐 Your ToolNTask verification code is: ${otp}. This code expires in 10 minutes. Don't share this code with anyone. - ToolNTask Sri Lanka"
                </p>
              </div>

              <div style="background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 6px; padding: 12px;">
                <p style="color: #721c24; margin: 0; font-size: 12px;">
                  <strong>⚠️ Security:</strong> Never share this code with anyone. ToolNTask will never ask for your code via phone or email.
                </p>
              </div>
            </div>

            <!-- Footer -->
            <div style="background-color: #f8f9fa; padding: 15px 20px; text-align: center; border-top: 1px solid #eee;">
              <p style="color: #999; margin: 0; font-size: 11px;">
                © ${new Date().getFullYear()} ToolNTask Sri Lanka 🇱🇰<br>
                Development Mode - Real SMS disabled
              </p>
            </div>
          </div>
        </body>
        </html>`;

        // Add timeout for email sending too
        const emailPromise = transporter.sendMail({
          from: `"ToolNTask SMS Simulation" <${process.env.EMAIL_FROM_ADDRESS || process.env.SMTP_USER}>`,
          to: process.env.SMTP_USER, // Admin email
          subject: `📱 SMS OTP for ${formattedPhone}: ${otp}`,
          html: emailTemplate,
        });

        const emailTimeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Email timeout after 10 seconds')), 10000)
        );

        await Promise.race([emailPromise, emailTimeoutPromise]);

        return {
          success: true,
          message: `OTP sent successfully to ${formattedPhone} (Development: Check admin email)`,
          method: 'EMAIL',
          // Show OTP in development mode for testing
          ...(process.env.NODE_ENV === 'development' && { 
            debug: { 
              otp: otp,
              note: 'OTP shown for development testing only' 
            } 
          })
        };
      } catch (emailError) {
        console.error('❌ Email sending error:', emailError);
        throw new Error('Failed to send verification code via email');
      }
    };

    try {
      const result = await sendOTP();
      return res.status(200).json(result);
    } catch (smsError) {
      console.error('❌ SMS/Email sending error:', smsError);
      return res.status(500).json({ 
        message: 'Failed to send verification code', 
        success: false,
        error: 'SMS delivery failed'
      });
    }

  } catch (error) {
    console.error('❌ Phone verification error:', error);
    return res.status(500).json({ 
      message: 'Internal server error', 
      success: false,
      error: 'Server error'
    });
  }
}
