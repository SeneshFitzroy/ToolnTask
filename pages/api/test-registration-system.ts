import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Test Firebase connection
    const { db } = await import('../../src/lib/firebase');
    
    // Test email API
    const emailTest = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/send-welcome-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: 'Test User',
        email: 'test@example.com',
      }),
    });

    const emailResult = await emailTest.json();

    res.status(200).json({
      success: true,
      message: 'Registration system test completed',
      tests: {
        firebase: {
          status: 'connected',
          database: db ? 'initialized' : 'not initialized'
        },
        email: {
          status: emailTest.ok ? 'working' : 'failed',
          result: emailResult
        }
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Test failed:', error);
    res.status(500).json({
      success: false,
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
