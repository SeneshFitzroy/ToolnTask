import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../src/lib/firebase';

// For real SMS, you'll need to install and import Twilio
// npm install twilio
// import twilio from 'twilio';

// For email fallback (development)
import nodemailer from 'nodemailer';

// Sri Lankan mobile number validation
const validateSriLankanPhone = (phone: string): boolean => {
  // Remove spaces, hyphens, and parentheses
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  
  // Sri Lankan mobile patterns - updated to support all mobile prefixes (070-079)
  const patterns = [
    /^(\+94|0094|94)?0?7[0-9]{8}$/, // Mobile numbers: 070-079 series
    /^(\+94|0094|94)?0?1[1-9][0-9]{7}$/, // Landline numbers
    /^0?7[0-9]{8}$/, // Local mobile format: 0771234567
    /^7[0-9]{8}$/, // Mobile without leading 0: 771234567
  ];
  
  return patterns.some(pattern => pattern.test(cleanPhone));
};

// Format phone number to international format
const formatSriLankanPhone = (phone: string): string => {
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  
  if (cleanPhone.startsWith('+94')) {
    return cleanPhone;
  } else if (cleanPhone.startsWith('0094')) {
    return '+' + cleanPhone.substring(2);
  } else if (cleanPhone.startsWith('94')) {
    return '+' + cleanPhone;
  } else if (cleanPhone.startsWith('0')) {
    return '+94' + cleanPhone.substring(1);
  } else {
    return '+94' + cleanPhone;
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { phone, type } = req.body; // type: 'registration' or 'password-reset'

  if (!phone) {
    return res.status(400).json({ message: 'Phone number is required' });
  }

  if (!validateSriLankanPhone(phone)) {
    return res.status(400).json({ 
      message: 'Please enter a valid Sri Lankan phone number (e.g., 077 123 4567 or +94 77 123 4567)' 
    });
  }

  try {
    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    const formattedPhone = formatSriLankanPhone(phone);

    // Store OTP in Firestore
    await addDoc(collection(db, 'phoneVerifications'), {
      phone: formattedPhone,
      otp,
      type,
      expiresAt,
      used: false,
      createdAt: serverTimestamp(),
      ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown'
    });

    // Send OTP via SMS or email fallback
    try {
      // Check if Twilio credentials are available for real SMS
      const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
      const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
      const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

      if (twilioAccountSid && twilioAuthToken && twilioPhoneNumber) {
        // Use real SMS service (Twilio)
        const twilio = require('twilio');
        const client = twilio(twilioAccountSid, twilioAuthToken);

        const smsMessage = `🔐 Your ToolNTask verification code is: ${otp}. This code expires in 10 minutes. Don't share this code with anyone. - ToolNTask Sri Lanka`;

        await client.messages.create({
          body: smsMessage,
          from: twilioPhoneNumber,
          to: formattedPhone
        });

        console.log(`SMS sent to ${formattedPhone}: ${otp}`);
      } else {
        // Fallback to email (for development/testing)
        console.log(`DEVELOPMENT MODE: SMS would be sent to ${formattedPhone} with OTP: ${otp}`);
        
        const transporter = nodemailer.createTransporter({
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

        // Send to admin email for development
        await transporter.sendMail({
          from: `"ToolNTask SMS Simulation" <${process.env.EMAIL_FROM_ADDRESS || process.env.SMTP_USER}>`,
          to: process.env.SMTP_USER, // Admin email
          subject: `📱 SMS OTP for ${formattedPhone}: ${otp}`,
          html: emailTemplate,
        });
      }          <!-- Phone Info -->
          <div style="background-color: #f8f9fa; border-radius: 6px; padding: 15px; margin: 20px 0;">
            <p style="color: #666; margin: 0; font-size: 14px; text-align: center;">
              <strong>Phone:</strong> ${formattedPhone}<br>
              <strong>Expires in:</strong> 10 minutes
            </p>
          </div>

          <!-- Security Warning -->
          <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 6px; padding: 12px; margin: 15px 0;">
            <p style="color: #856404; margin: 0; font-size: 12px;">
              <strong>⚠️ Security:</strong> Never share this code with anyone. ToolNTask will never ask for your code via phone or email.
            </p>
          </div>

          <p style="color: #999; font-size: 12px; text-align: center; margin: 15px 0 0 0;">
            Didn't request this? Contact us: support@toolntask.com
          </p>
        </div>

        <!-- Footer -->
        <div style="background-color: #f8f9fa; padding: 15px 20px; text-align: center; border-top: 1px solid #eee;">
          <p style="color: #999; margin: 0; font-size: 11px;">
            © ${new Date().getFullYear()} ToolNTask Sri Lanka 🇱🇰<br>
            Phone: +94 70 123 4567 | Email: support@toolntask.com
          </p>
        </div>
      </div>
    </body>
    </html>`;

    // Send verification email
    await transporter.sendMail({
      from: `"ToolNTask Verification" <${process.env.EMAIL_FROM_ADDRESS || process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER, // Send to admin email since we don't have the user's email yet
      subject: `📱 Phone Verification Code: ${otp} - ToolNTask`,
      html: emailTemplate,
    });

    res.status(200).json({ 
      message: 'Verification code sent successfully',
      phone: formattedPhone,
      expiresIn: '10 minutes'
    });

  } catch (error) {
    console.error('Phone verification error:', error);
    res.status(500).json({ message: 'Failed to send verification code' });
  }
}
