import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { slug } = req.query;

      if (!slug || typeof slug !== 'string') {
        return res.status(400).json({
          success: false,
          error: 'Slug parameter is required'
        });
      }

      // Ambil detail produk berdasarkan slug
      const product = await prisma.product.findUnique({
        where: {
          slug: slug,
        },
        include: {
          categories: true,
        },
      });

      if (!product) {
        return res.status(404).json({
          success: false,
          error: 'Product not found'
        });
      }

      // Transform data untuk frontend
      const transformedProduct = {
        id: product.id,
        namaProduk: product.namaProduk,
        deskripsi: product.deskripsi,
        gambar: product.gambar,
        fotoProduk: product.fotoProduk,
        bpom: product.bpom,
        hargaUmum: parseFloat(product.hargaUmum?.toString() || '0'),
        idProduk: product.idProduk,
        slug: product.slug,
        category: product.categories?.name || 'Uncategorized',
        isVisible: product.isVisible,
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString(),
      };

      // Set cache headers
      res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=60');

      return res.status(200).json({
        success: true,
        data: transformedProduct
      });
    } catch (error) {
      console.error('Error fetching product detail:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch product detail',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}