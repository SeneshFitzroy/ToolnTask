import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../src/lib/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, phone } = req.body;

  if (!email && !phone) {
    return res.status(400).json({ message: 'Email or phone number is required' });
  }

  // If phone number is provided, redirect to phone verification
  if (phone) {
    // Validate Sri Lankan phone number
    const validateSriLankanPhone = (phone: string): boolean => {
      const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
      const patterns = [
        /^(\+94|0094|94)?7[0-9]{8}$/, // Mobile
        /^(\+94|0094|94)?1[1-9][0-9]{7}$/, // Landline
      ];
      return patterns.some(pattern => pattern.test(cleanPhone));
    };

    if (!validateSriLankanPhone(phone)) {
      return res.status(400).json({ 
        message: 'Please enter a valid Sri Lankan phone number (e.g., 077 123 4567)' 
      });
    }

    // Send to phone verification API
    try {
      const phoneVerifyResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/phone-verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, type: 'password-reset' }),
      });

      if (phoneVerifyResponse.ok) {
        return res.status(200).json({ 
          message: 'Verification code sent to your phone',
          method: 'phone',
          phone: phone
        });
      } else {
        return res.status(500).json({ message: 'Failed to send verification code' });
      }
    } catch (error) {
      console.error('Phone verification error:', error);
      return res.status(500).json({ message: 'Failed to send verification code' });
    }
  }

  try {
    // Generate secure reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Store reset token in Firestore
    await addDoc(collection(db, 'passwordResets'), {
      email: email.toLowerCase().trim(),
      token: resetToken,
      expiresAt,
      used: false,
      createdAt: serverTimestamp(),
      ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown'
    });

    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER || process.env.EMAIL_USER,
        pass: process.env.SMTP_PASS || process.env.EMAIL_PASS,
      },
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;

    // Enhanced security email template - Sri Lankan context
    const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset - ToolNTask</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
      <div style="max-width: 500px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #FF5E14 0%, #FF8A50 100%); padding: 30px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px; font-weight: bold;">🔐 Password Reset</h1>
          <p style="color: rgba(255, 255, 255, 0.9); margin: 8px 0 0 0; font-size: 14px;">Secure your ToolNTask account</p>
        </div>

        <!-- Content -->
        <div style="padding: 30px 20px;">
          <h2 style="color: #333; margin: 0 0 15px 0; font-size: 20px;">Reset Your Password</h2>
          
          <p style="color: #666; line-height: 1.5; margin: 0 0 20px 0; font-size: 14px;">
            We received a request to reset your password. Click the button below to create a new secure password.
          </p>

          <!-- Security Notice -->
          <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 6px; padding: 12px; margin: 15px 0;">
            <p style="color: #856404; margin: 0; font-size: 12px;">
              <strong>⚠️ Security:</strong> This link expires in 15 minutes.
            </p>
          </div>

          <!-- Reset Button -->
          <div style="text-align: center; margin: 25px 0;">
            <a href="${resetUrl}" style="background: linear-gradient(135deg, #FF5E14 0%, #FF8A50 100%); color: white; text-decoration: none; padding: 12px 30px; border-radius: 6px; font-weight: bold; font-size: 14px; display: inline-block;">
              🔒 Reset Password
            </a>
          </div>

          <!-- Password Requirements -->
          <div style="background-color: #f8f9fa; border-radius: 6px; padding: 15px; margin: 20px 0;">
            <h3 style="color: #333; margin: 0 0 10px 0; font-size: 14px;">🛡️ New Password Must Include:</h3>
            <ul style="color: #666; margin: 0; padding-left: 15px; font-size: 12px; line-height: 1.4;">
              <li>At least 8 characters</li>
              <li>1 uppercase letter (A-Z)</li>
              <li>1 lowercase letter (a-z)</li>
              <li>1 number (0-9)</li>
              <li>1 special character (!@#$%^&*)</li>
            </ul>
          </div>

          <p style="color: #999; font-size: 12px; line-height: 1.4; margin: 15px 0 0 0;">
            Didn't request this? Your account is secure. Contact us: support@toolntask.com
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

    // Send email
    await transporter.sendMail({
      from: `"ToolNTask Security" <${process.env.EMAIL_FROM_ADDRESS || process.env.SMTP_USER}>`,
      to: email,
      subject: '🔐 Password Reset - ToolNTask',
      html: htmlTemplate,
    });

    res.status(200).json({ 
      message: 'Reset link sent successfully',
      expiresIn: '15 minutes'
    });

  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ message: 'Failed to send reset email' });
  }
}
