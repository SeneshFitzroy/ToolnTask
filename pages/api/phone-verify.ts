import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../src/lib/firebase';

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

    // Create email transporter for SMS simulation (since we don't have SMS service)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER || process.env.EMAIL_USER,
        pass: process.env.SMTP_PASS || process.env.EMAIL_PASS,
      },
    });

    // Send OTP via email (simulating SMS)
    const emailTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Phone Verification - ToolNTask</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
      <div style="max-width: 400px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #FF5E14 0%, #FF8A50 100%); padding: 30px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 22px; font-weight: bold;">📱 Phone Verification</h1>
          <p style="color: rgba(255, 255, 255, 0.9); margin: 8px 0 0 0; font-size: 14px;">ToolNTask Sri Lanka 🇱🇰</p>
        </div>

        <!-- Content -->
        <div style="padding: 30px 20px;">
          <div style="text-align: center; margin-bottom: 25px;">
            <h2 style="color: #333; margin: 0 0 10px 0; font-size: 18px;">Your Verification Code</h2>
            <p style="color: #666; margin: 0; font-size: 14px;">Enter this code to verify your phone number</p>
          </div>

          <!-- OTP Code -->
          <div style="text-align: center; margin: 25px 0;">
            <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border: 2px solid #FF5E14; border-radius: 8px; padding: 20px; display: inline-block;">
              <span style="font-size: 32px; font-weight: bold; color: #FF5E14; letter-spacing: 4px;">${otp}</span>
            </div>
          </div>

          <!-- Phone Info -->
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
