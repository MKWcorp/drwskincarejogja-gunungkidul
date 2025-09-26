import type { NextApiRequest, NextApiResponse } from 'next';
import { testConnection } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const result = await testConnection();
      return res.status(200).json({ 
        success: true, 
        message: 'Database connection successful',
        timestamp: result[0]?.current_time 
      });
    } catch (error) {
      console.error('Database connection error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to connect to database',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}