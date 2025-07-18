import { NextApiRequest, NextApiResponse } from 'next';

// Simple email sending function using a service like EmailJS or Nodemailer
// For now, this is a placeholder that logs the email that would be sent
const sendEmail = async (to: string, subject: string, html: string) => {
  // TODO: Replace with actual email service (SendGrid, Nodemailer, etc.)
  console.log('Sending email to:', to);
  console.log('Subject:', subject);
  console.log('HTML:', html);
  
  // For now, we'll just simulate success
  // In production, you would integrate with an actual email service
  return { success: true };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { firstName, email } = req.body;

  if (!firstName || !email) {
    return res.status(400).json({ error: 'First name and email are required' });
  }

  try {
    const subject = 'Welcome to ToolNTask! 🎉';
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to ToolNTask</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f2f3f5; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); }
          .header { background: linear-gradient(135deg, #FF5E14 0%, #FF5D13 100%); color: white; padding: 30px 20px; text-align: center; }
          .logo { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
          .content { padding: 30px 20px; }
          .welcome-text { font-size: 18px; color: #001554; margin-bottom: 20px; }
          .feature-list { background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .feature-item { display: flex; align-items: center; margin: 10px 0; }
          .feature-icon { color: #FF5E14; margin-right: 10px; font-size: 18px; }
          .cta-button { display: inline-block; background-color: #FF5E14; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
          .footer { background-color: #f8f9fa; padding: 20px; text-align: center; color: #6b7280; border-top: 1px solid #e5e7eb; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">ToolNTask</div>
            <p style="margin: 0; font-size: 16px;">Sri Lanka's Community Marketplace</p>
          </div>
          
          <div class="content">
            <h1 style="color: #001554; margin: 0 0 20px 0;">Hey ${firstName}! 👋</h1>
            
            <p class="welcome-text">
              Thank you for registering with ToolNTask! We're excited to have you join our growing community of helpful neighbors across Sri Lanka.
            </p>
            
            <p style="color: #6b7280; line-height: 1.6;">
              You're now part of a platform where neighbors help neighbors. Whether you need a hand with tasks or tools for your projects, our community is here to support you.
            </p>
            
            <div class="feature-list">
              <h3 style="color: #001554; margin: 0 0 15px 0;">What you can do now:</h3>
              <div class="feature-item">
                <span class="feature-icon">🔨</span>
                <span>Browse and rent tools from neighbors</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">📋</span>
                <span>Post tasks you need help with</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">🤝</span>
                <span>Connect with trusted community members</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">💰</span>
                <span>Earn money by helping others</span>
              </div>
            </div>
            
            <p style="color: #6b7280; line-height: 1.6;">
              Ready to explore? Sign in to your account and start connecting with your community today!
            </p>
            
            <div style="text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://toolntask.com'}/SignIn" class="cta-button">
                Start Exploring →
              </a>
            </div>
            
            <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
              Need help getting started? Feel free to reach out to our community support team. We're here to help!
            </p>
          </div>
          
          <div class="footer">
            <p style="margin: 0 0 10px 0;">
              <strong>ToolNTask</strong> - Building stronger communities, one task at a time
            </p>
            <p style="margin: 0; font-size: 12px;">
              Made with ❤️ for Sri Lankan communities
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    await sendEmail(email, subject, html);

    res.status(200).json({ 
      success: true, 
      message: 'Welcome email sent successfully',
      preview: {
        to: email,
        subject: subject,
        firstName: firstName
      }
    });
  } catch (error) {
    console.error('Error sending welcome email:', error);
    res.status(500).json({ 
      error: 'Failed to send welcome email',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
