import { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { firstName, email } = req.body;

  if (!firstName || !email) {
    return res.status(400).json({ message: 'First name and email are required' });
  }

  try {
    // Create personalized welcome email HTML
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to ToolNTask!</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #FF5E14 0%, #FF5D13 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .footer { text-align: center; padding: 20px; color: #666; }
            .button { display: inline-block; padding: 15px 30px; background: #FF5E14; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
            .feature { background: #f8f9fa; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #FF5E14; }
            @media (max-width: 600px) { .container { padding: 10px; } .content { padding: 20px; } }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Welcome to ToolNTask, ${firstName}!</h1>
              <p>Thank you for joining Sri Lanka's first community marketplace!</p>
            </div>
            
            <div class="content">
              <p>Hey <strong>${firstName}</strong>,</p>
              
              <p>Thank you for registering and hope you find what you want! We're excited to have you as part of our growing community of neighbors helping neighbors across Sri Lanka.</p>
              
              <div class="feature">
                <h3>🔧 What You Can Do:</h3>
                <ul>
                  <li><strong>Rent Tools:</strong> Access thousands of tools from your neighbors</li>
                  <li><strong>Get Tasks Done:</strong> Find skilled locals for any job</li>
                  <li><strong>Earn Money:</strong> Share your tools and skills with others</li>
                  <li><strong>Build Community:</strong> Connect with trusted neighbors</li>
                </ul>
              </div>
              
              <div style="text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://toolntask.com'}/SignIn" class="button">
                  Start Exploring →
                </a>
              </div>
              
              <div class="feature">
                <h3>✨ Why ToolNTask?</h3>
                <ul>
                  <li>🆓 <strong>No Platform Fees</strong> - Keep 100% of your earnings</li>
                  <li>✅ <strong>Verified Community</strong> - All users are background checked</li>
                  <li>🔒 <strong>Secure Payments</strong> - Safe and reliable transactions</li>
                  <li>⭐ <strong>Review System</strong> - Build trust through honest feedback</li>
                </ul>
              </div>
              
              <p>Ready to transform your community? Login to your account and start exploring what your neighbors have to offer!</p>
              
              <p>Best regards,<br>
              <strong>The ToolNTask Team</strong><br>
              <em>Building stronger communities, one task at a time</em></p>
            </div>
            
            <div class="footer">
              <p>© 2025 ToolNTask. All rights reserved.<br>
              Made with ❤️ for Sri Lankan communities</p>
              <p><small>If you have any questions, reply to this email or visit our help center.</small></p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Check if SendGrid is configured for production
    if (process.env.SENDGRID_API_KEY && process.env.SENDGRID_API_KEY !== 'your_sendgrid_api_key_here') {
      // Production: Send actual email via SendGrid
      await sgMail.send({
        to: email,
        from: {
          email: process.env.EMAIL_FROM_ADDRESS || 'noreply@toolntask.com',
          name: process.env.EMAIL_FROM_NAME || 'ToolNTask Team'
        },
        subject: `Welcome to ToolNTask, ${firstName}! 🎉`,
        html: emailHtml,
        text: `Hey ${firstName}, thank you for registering and hope you find what you want! Welcome to ToolNTask - Sri Lanka's first community marketplace where neighbors help neighbors. Start exploring at ${process.env.NEXT_PUBLIC_APP_URL || 'https://toolntask.com'}`
      });

      return res.status(200).json({ 
        message: 'Welcome email sent successfully',
        status: 'production',
        recipient: email
      });
    } else {
      // Development: Log email instead of sending
      console.log(`
        ====================================
        WELCOME EMAIL (Development Mode)
        ====================================
        To: ${email}
        Subject: Welcome to ToolNTask, ${firstName}! 🎉
        
        Email Content:
        ${emailHtml}
        ====================================
      `);

      return res.status(200).json({ 
        message: 'Welcome email logged successfully (development mode)',
        status: 'development',
        recipient: email,
        note: 'Email was logged to console. Configure SENDGRID_API_KEY for production email sending.'
      });
    }
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    return res.status(500).json({ 
      message: 'Failed to send welcome email',
      error: process.env.NODE_ENV === 'development' ? error : 'Internal server error'
    });
  }
}
