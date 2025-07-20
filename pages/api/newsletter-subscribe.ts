import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Valid email is required' });
  }

  try {
    // Welcome email content
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #FF5E14 0%, #FF5D13 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .highlight { color: #FF5E14; font-weight: bold; }
        .cta-button { background: #FF5E14; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 20px 0; font-weight: bold; }
        .features { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #FF5E14; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Welcome to ToolNTask!</h1>
          <p>Sri Lanka's First Community Marketplace</p>
        </div>
        
        <div class="content">
          <h2>Hello and Welcome! 👋</h2>
          
          <p>Thank you for subscribing to our newsletter! You've just joined <span class="highlight">Sri Lanka's most innovative community platform</span> where neighbors help neighbors through shared tools and trusted services.</p>
          
          <div class="features">
            <h3>🔧 What is ToolNTask?</h3>
            <p>We're building stronger communities by connecting people who need help with those who can provide it. Whether you need a tool for a quick project or want to offer your services to neighbors, ToolNTask makes it simple and safe.</p>
            
            <h4>✨ Key Features:</h4>
            <ul>
              <li><strong>Tool Sharing:</strong> Borrow or lend tools to neighbors</li>
              <li><strong>Task Services:</strong> Get help with projects or offer your skills</li>
              <li><strong>Verified Community:</strong> Safe and trusted user verification</li>
              <li><strong>Local Focus:</strong> Connect with people in your area</li>
              <li><strong>No Hidden Fees:</strong> Transparent, community-first approach</li>
            </ul>
          </div>
          
          <h3>🚀 Ready to Get Started?</h3>
          <p>Join thousands of Sri Lankans who are already building stronger neighborhoods through ToolNTask!</p>
          
          <center>
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://toolntask.com'}/SignUp" class="cta-button">
              Create Your Free Account →
            </a>
          </center>
          
          <div class="features">
            <h4>💡 How It Works:</h4>
            <ol>
              <li><strong>Sign Up:</strong> Create your free ToolNTask account</li>
              <li><strong>Browse or Post:</strong> Find tools/tasks or share your own</li>
              <li><strong>Connect:</strong> Chat with neighbors and agree on terms</li>
              <li><strong>Complete & Review:</strong> Finish transactions and build trust</li>
            </ol>
          </div>
          
          <h3>📧 What to Expect:</h3>
          <p>As a newsletter subscriber, you'll receive:</p>
          <ul>
            <li>🔔 Updates on new tools and services in your area</li>
            <li>📰 Community success stories and testimonials</li>
            <li>💡 Tips for effective tool sharing and task completion</li>
            <li>🎉 Special features and platform updates</li>
            <li>🏆 Highlighting community stars and helpful neighbors</li>
          </ul>
          
          <p><strong>Questions?</strong> Reply to this email or visit our <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://toolntask.com'}/About">About page</a> to learn more about our mission to build stronger communities across Sri Lanka.</p>
          
          <hr style="margin: 30px 0; border: 1px solid #eee;">
          
          <p style="text-align: center; color: #666; font-size: 14px;">
            Thank you for being part of the ToolNTask community!<br>
            <strong>The ToolNTask Team</strong><br>
            <em>Building Communities, One Task at a Time</em>
          </p>
        </div>
      </div>
    </body>
    </html>
    `;

    // Send welcome email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: '🎉 Welcome to ToolNTask - Sri Lanka\'s Community Marketplace!',
      html: htmlContent,
    });

    res.status(200).json({ message: 'Successfully subscribed and welcome email sent!' });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ message: 'Failed to send welcome email' });
  }
}
