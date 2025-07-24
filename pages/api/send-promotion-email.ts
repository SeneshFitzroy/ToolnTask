import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, postTitle, plan, userName } = req.body;

  if (!email || !postTitle || !plan || !userName) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Create transporter (you'll need to configure with your email service)
    const transporter = nodemailer.createTransporter({
      service: 'gmail', // or your email service
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your email password or app password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'ToolnTask - Post Promotion Confirmation',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Promotion Confirmation</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #FF5E14, #FF8C42);
              color: white;
              padding: 30px 20px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #f8f9fa;
              padding: 30px 20px;
              border-radius: 0 0 10px 10px;
            }
            .promotion-details {
              background: white;
              padding: 20px;
              border-radius: 10px;
              margin: 20px 0;
              border-left: 4px solid #FF5E14;
            }
            .highlight {
              background: #FF5E14;
              color: white;
              padding: 2px 8px;
              border-radius: 4px;
              font-weight: bold;
            }
            .footer {
              text-align: center;
              padding: 20px;
              color: #666;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🎉 Promotion Confirmed!</h1>
            <p>Your post is now featured and promoted</p>
          </div>
          
          <div class="content">
            <h2>Hello ${userName}!</h2>
            
            <p>Great news! Your payment has been processed successfully and your post is now promoted on ToolnTask.</p>
            
            <div class="promotion-details">
              <h3>📋 Promotion Details</h3>
              <p><strong>Post Title:</strong> ${postTitle}</p>
              <p><strong>Plan:</strong> <span class="highlight">${plan.name}</span></p>
              <p><strong>Duration:</strong> ${plan.duration} days</p>
              <p><strong>Amount Paid:</strong> LKR ${plan.price.toLocaleString()}</p>
              <p><strong>Features:</strong></p>
              <ul>
                <li>✅ Featured at the top of search results</li>
                <li>✅ Highlighted with special badge</li>
                <li>✅ Increased visibility to potential customers</li>
                <li>✅ Priority placement in category listings</li>
              </ul>
            </div>
            
            <h3>🚀 What happens next?</h3>
            <ul>
              <li>Your post is now live and promoted</li>
              <li>It will appear at the top of relevant searches</li>
              <li>You'll get notifications when users contact you</li>
              <li>The promotion will automatically end after ${plan.duration} days</li>
            </ul>
            
            <p>You can track your promotion status in your Profile > My Posts section.</p>
            
            <p style="color: #FF5E14;"><strong>Thank you for choosing ToolnTask!</strong></p>
          </div>
          
          <div class="footer">
            <p>This is an automated message from ToolnTask</p>
            <p>Visit us at <a href="https://toolntask.com" style="color: #FF5E14;">toolntask.com</a></p>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Promotion email sent successfully' });
  } catch (error) {
    console.error('Error sending promotion email:', error);
    res.status(500).json({ message: 'Failed to send promotion email' });
  }
}
