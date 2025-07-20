import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../src/lib/firebase';

// Create transporter for sending emails
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    // Check if user exists in your system
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return res.status(404).json({ message: 'No account found with this email address' });
    }

    // Generate secure reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    // Store reset token in database
    await addDoc(collection(db, 'passwordResets'), {
      email,
      token: resetToken,
      expiresAt: resetTokenExpiry,
      used: false,
      createdAt: new Date()
    });

    // Create reset URL
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;

    // Create beautiful HTML email template
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Reset Your ToolNTask Password</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8fafc;
        }
        .container {
          background: linear-gradient(135deg, #001554 0%, #0a2472 100%);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,21,84,0.15);
        }
        .header {
          background: linear-gradient(135deg, #FF5E14 0%, #FF7F50 100%);
          padding: 40px 30px;
          text-align: center;
          color: white;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: bold;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        .header p {
          margin: 10px 0 0 0;
          font-size: 16px;
          opacity: 0.95;
        }
        .content {
          padding: 40px 30px;
          background: white;
          color: #333;
        }
        .content h2 {
          color: #001554;
          margin-top: 0;
          font-size: 24px;
        }
        .security-notice {
          background: linear-gradient(135deg, #FFF3E0 0%, #FFE8CC 100%);
          border: 2px solid #FF5E14;
          border-radius: 15px;
          padding: 20px;
          margin: 25px 0;
          text-align: center;
        }
        .security-notice .icon {
          font-size: 32px;
          margin-bottom: 10px;
          display: block;
        }
        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, #001554 0%, #0a2472 100%);
          color: white !important;
          text-decoration: none;
          padding: 18px 40px;
          border-radius: 50px;
          font-weight: bold;
          font-size: 16px;
          margin: 20px 0;
          box-shadow: 0 8px 25px rgba(0,21,84,0.3);
          transition: all 0.3s ease;
          border: none;
        }
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(0,21,84,0.4);
        }
        .features {
          background: #f8fafc;
          border-radius: 15px;
          padding: 25px;
          margin: 25px 0;
          border-left: 5px solid #FF5E14;
        }
        .features h3 {
          color: #001554;
          margin-top: 0;
        }
        .features ul {
          padding-left: 0;
          list-style: none;
        }
        .features li {
          padding: 8px 0;
          padding-left: 25px;
          position: relative;
        }
        .features li:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: #FF5E14;
          font-weight: bold;
          font-size: 16px;
        }
        .footer {
          background: #001554;
          color: white;
          text-align: center;
          padding: 30px;
          font-size: 14px;
        }
        .footer p {
          margin: 5px 0;
        }
        .warning {
          background: #FEF2F2;
          border: 1px solid #FECACA;
          color: #DC2626;
          padding: 15px;
          border-radius: 10px;
          margin: 20px 0;
          font-size: 14px;
        }
        .brand-logo {
          font-family: 'Rubik Wet Paint', cursive;
          font-weight: bold;
          font-size: 24px;
          color: white;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        .token-display {
          background: #f1f5f9;
          border: 2px dashed #64748b;
          border-radius: 10px;
          padding: 15px;
          margin: 20px 0;
          font-family: 'Courier New', monospace;
          font-size: 14px;
          word-break: break-all;
          text-align: center;
          color: #475569;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="brand-logo">
            <span style="color: #FF5E14;">Tool</span><span style="color: #FFFFFF;">N</span><span style="color: #FF5E14;">Task</span>
          </div>
          <h1>🔐 Reset Your Password</h1>
          <p>Secure password reset for your community marketplace account</p>
        </div>
        
        <div class="content">
          <h2>Hello! 👋</h2>
          
          <p>We received a request to reset the password for your ToolNTask account associated with this email address.</p>
          
          <div class="security-notice">
            <span class="icon">🛡️</span>
            <strong>Security First!</strong><br>
            This link will expire in 1 hour for your protection.
          </div>
          
          <div style="text-align: center;">
            <a href="${resetUrl}" class="cta-button">
              🔓 Reset My Password
            </a>
          </div>
          
          <div class="features">
            <h3>🔒 What happens next?</h3>
            <ul>
              <li>Click the button above to open our secure password reset page</li>
              <li>Create a new, strong password for your account</li>
              <li>Login with your new password and continue building community</li>
              <li>Your account security will be fully restored</li>
            </ul>
          </div>
          
          <p><strong>Can't click the button?</strong> Copy and paste this link into your browser:</p>
          <div class="token-display">
            ${resetUrl}
          </div>
          
          <div class="warning">
            <strong>⚠️ Important Security Notice:</strong><br>
            • If you didn't request this password reset, please ignore this email<br>
            • Never share this link with anyone<br>
            • This link expires in 1 hour for your security<br>
            • Contact support if you have concerns about your account security
          </div>
          
          <p>Questions? Reply to this email or visit our <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/About" style="color: #FF5E14; text-decoration: none;">Help Center</a> for assistance.</p>
          
          <p>Best regards,<br>
          <strong>The ToolNTask Security Team</strong><br>
          <em>Keeping your community marketplace safe and secure</em></p>
        </div>
        
        <div class="footer">
          <p><strong>ToolNTask</strong> - Sri Lanka's Leading Community Marketplace</p>
          <p>© 2025 ToolNTask. All rights reserved.<br>
          Made with ❤️ for Sri Lankan communities</p>
          <p><small>This is an automated security email. Please do not reply directly to this message.</small></p>
        </div>
      </div>
    </body>
    </html>
    `;

    // Send the beautiful password reset email
    await transporter.sendMail({
      from: {
        name: process.env.EMAIL_FROM_NAME || 'ToolNTask Security Team',
        address: process.env.SMTP_USER || 'security@toolntask.com'
      },
      to: email,
      subject: '🔐 Reset Your ToolNTask Password - Secure Link Inside',
      html: htmlContent,
      text: `Hello! We received a request to reset your ToolNTask password. Click this link to reset: ${resetUrl} - This link expires in 1 hour. If you didn't request this, please ignore this email. Thanks, The ToolNTask Team`
    });

    res.status(200).json({ 
      message: 'Password reset email sent successfully! Check your inbox for instructions.',
      success: true 
    });

  } catch (error) {
    console.error('Password reset email error:', error);
    res.status(500).json({ 
      message: 'Failed to send password reset email. Please try again later.',
      success: false 
    });
  }
}
