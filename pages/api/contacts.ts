import type { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Ambil semua kontak
      const contacts = await sql`
        SELECT * FROM contacts 
        ORDER BY created_at DESC 
        LIMIT 50
      `;
      
      return res.status(200).json({ 
        success: true, 
        data: contacts 
      });
    } catch (error) {
      console.error('Error fetching contacts:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch contacts' 
      });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, phone, message } = req.body;
      
      if (!name || !phone || !message) {
        return res.status(400).json({ 
          success: false, 
          error: 'Name, phone, and message are required' 
        });
      }

      const result = await sql`
        INSERT INTO contacts (name, phone, message) 
        VALUES (${name}, ${phone}, ${message}) 
        RETURNING *
      `;

      return res.status(201).json({ 
        success: true, 
        data: result[0] 
      });
    } catch (error) {
      console.error('Error creating contact:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to create contact' 
      });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}