import type { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Ambil semua testimoni
      const testimonials = await sql`
        SELECT * FROM testimonials 
        ORDER BY created_at DESC 
        LIMIT 10
      `;
      
      return res.status(200).json({ 
        success: true, 
        data: testimonials 
      });
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch testimonials' 
      });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, message, rating = 5 } = req.body;
      
      if (!name || !message) {
        return res.status(400).json({ 
          success: false, 
          error: 'Name and message are required' 
        });
      }

      const result = await sql`
        INSERT INTO testimonials (name, message, rating) 
        VALUES (${name}, ${message}, ${rating}) 
        RETURNING *
      `;

      return res.status(201).json({ 
        success: true, 
        data: result[0] 
      });
    } catch (error) {
      console.error('Error creating testimonial:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to create testimonial' 
      });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}