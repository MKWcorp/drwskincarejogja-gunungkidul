import type { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Buat tabel products
      await sql`
        CREATE TABLE IF NOT EXISTS products (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          description TEXT,
          price DECIMAL(12,2) NOT NULL DEFAULT 0,
          image_url TEXT,
          category VARCHAR(100),
          stock INTEGER DEFAULT 0,
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
      `;

      // Insert sample data jika tabel kosong
      const existingProducts = await sql`SELECT COUNT(*) as count FROM products`;
      
      if (existingProducts[0].count === '0') {
        await sql`
          INSERT INTO products (name, description, price, image_url, category, stock) VALUES
          ('DNA Salmon Serum', 'Serum premium dengan DNA salmon untuk regenerasi kulit dan anti-aging. Membantu memperbaiki tekstur kulit dan mengurangi tanda penuaan.', 450000, '/images/products/dna-salmon.jpg', 'Serum', 25),
          ('Ceramoist Moisturizer', 'Pelembab dengan ceramide untuk kulit kering dan sensitif. Memberikan hidrasi mendalam dan memperkuat skin barrier.', 180000, '/images/products/ceramoist.jpg', 'Moisturizer', 30),
          ('Hydrating Toner', 'Toner pelembab untuk semua jenis kulit. Mengandung hyaluronic acid untuk hidrasi optimal dan menyiapkan kulit menerima produk selanjutnya.', 120000, '/images/products/hydrating-toner.jpg', 'Toner', 40),
          ('Luminous Bright Cream', 'Krim pencerah dengan niacinamide dan vitamin C. Membantu menyamarkan noda hitam dan memberikan kulit yang lebih cerah berseri.', 350000, '/images/products/luminous-bright.jpg', 'Cream', 20),
          ('Peel Off Mask', 'Masker peel off untuk mengangkat komedo dan kotoran. Membersihkan pori-pori secara mendalam dan mengontrol minyak berlebih.', 95000, '/images/products/peel-off.jpg', 'Mask', 50),
          ('Amour Matte Lipstick', 'Lipstik matte tahan lama dengan formula melembabkan. Tersedia dalam berbagai warna cantik untuk tampilan yang sempurna.', 85000, '/images/products/amour-matte.jpg', 'Makeup', 35),
          ('Goat Milk Lotion', 'Lotion tubuh dengan susu kambing untuk kulit halus dan lembut. Memberikan nutrisi dan kelembaban untuk kulit tubuh yang sehat.', 75000, '/images/products/goat-lotion.jpg', 'Body Care', 45),
          ('Goat Milk Body Wash', 'Sabun mandi cair dengan susu kambing yang lembut dan menyegarkan. Membersihkan tanpa membuat kulit kering.', 65000, '/images/products/goat-bodywash.jpg', 'Body Care', 55)
        `;
      }

      return res.status(200).json({ 
        success: true, 
        message: 'Products table created and sample data inserted successfully' 
      });
    } catch (error) {
      console.error('Database setup error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to setup products table',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}