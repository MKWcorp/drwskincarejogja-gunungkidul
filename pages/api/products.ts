import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { withImages } = req.query;
      // Ambil semua produk yang visible dari database dengan kategori
      const products = await prisma.product.findMany({
        where: {
          isVisible: true,
        },
        include: {
          categories: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      // Transform data untuk frontend
      const transformedProducts = products.map(product => ({
        id: product.id,
        name: product.namaProduk,
        description: product.deskripsi || '',
        price: parseFloat(product.hargaUmum?.toString() || '0'),
        image: product.fotoProduk || product.gambar || '/placeholder-product.svg',
        category: product.categories?.name || 'Uncategorized',
        stock: 10, // Default stock karena tidak ada field stock di schema
        is_active: product.isVisible,
        created_at: product.createdAt.toISOString(),
        updated_at: product.updatedAt.toISOString(),
        slug: product.slug,
        hasImage: !!(product.fotoProduk || product.gambar), // Tambah field untuk cek ada foto
      }));

      // Filter produk yang memiliki foto untuk homepage
      const productsWithImages = transformedProducts.filter(product => product.hasImage);
      
      // Pilih data berdasarkan query parameter
      const finalData = withImages === 'true' ? productsWithImages : transformedProducts;
      
      // Set cache headers
      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=30');
      
      return res.status(200).json({
        success: true,
        data: finalData,
        count: transformedProducts.length
      });
    } catch (error) {
      console.error('Error fetching products from database:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch products from database',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, description, price, image_url, category } = req.body;
      
      if (!name || !price) {
        return res.status(400).json({ 
          success: false, 
          error: 'Name and price are required' 
        });
      }

      // Create atau cari kategori
      let categoryRecord = null;
      if (category) {
        categoryRecord = await prisma.categories.findUnique({
          where: { name: category }
        });
        
        if (!categoryRecord) {
          categoryRecord = await prisma.categories.create({
            data: {
              id: `cat_${Date.now()}`,
              name: category,
              slug: category.toLowerCase().replace(/\s+/g, '-'),
              updatedAt: new Date(),
            }
          });
        }
      }

      const result = await prisma.product.create({
        data: {
          id: `prod_${Date.now()}`,
          namaProduk: name,
          deskripsi: description || '',
          hargaUmum: price,
          fotoProduk: image_url || '',
          idProduk: `id_${Date.now()}`,
          slug: name.toLowerCase().replace(/\s+/g, '-'),
          categoryId: categoryRecord?.id,
          updatedAt: new Date(),
        },
        include: {
          categories: true,
        }
      });

      return res.status(201).json({ 
        success: true, 
        data: result 
      });
    } catch (error) {
      console.error('Error creating product:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to create product' 
      });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}