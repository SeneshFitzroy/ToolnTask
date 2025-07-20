import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Valid email is required' });
  }

  try {
    // For now, we'll simulate successful subscription
    // In production, you would:
    // 1. Save email to database
    // 2. Send welcome email via your preferred email service
    
    console.log(`Newsletter subscription for: ${email}`);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Log the welcome email content that would be sent
    console.log('Welcome email would be sent with content about ToolNTask...');
    
    res.status(200).json({ 
      message: 'Successfully subscribed! Welcome email would be sent.',
      email: email 
    });
    
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ message: 'Failed to process subscription' });
  }
}
