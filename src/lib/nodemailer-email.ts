// Alternative email implementation using Nodemailer
// Replace the sendEmail function in /pages/api/send-welcome-email.ts with this

import nodemailer from 'nodemailer';

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // your email
      pass: process.env.SMTP_PASS, // your app password
    },
  });
};

const sendEmail = async (to: string, subject: string, html: string) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: {
      name: process.env.EMAIL_FROM_NAME || 'ToolNTask Team',
      address: process.env.SMTP_USER || 'noreply@toolntask.com'
    },
    to: to,
    subject: subject,
    html: html,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('Message sent: %s', info.messageId);
  
  return { success: true, messageId: info.messageId };
};

// Additional environment variables needed:
// SMTP_HOST=smtp.gmail.com
// SMTP_PORT=587
// SMTP_USER=your-email@gmail.com
// SMTP_PASS=your-app-password
// EMAIL_FROM_NAME=ToolNTask Team

export { sendEmail };
