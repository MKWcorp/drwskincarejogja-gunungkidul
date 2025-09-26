import type { NextApiRequest, NextApiResponse } from 'next';

interface InstagramPost {
  id: string;
  caption: string;
  media_url: string;
  media_type: string;
  permalink: string;
  timestamp: string;
}

interface InstagramResponse {
  data: InstagramPost[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Instagram Basic Display API endpoint
      // Note: Untuk production, Anda perlu mendaftar aplikasi Instagram dan mendapatkan access token
      const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
      
      if (!accessToken) {
        // Jika tidak ada access token, return data dummy untuk development
        const dummyPosts: InstagramPost[] = [
          {
            id: '1',
            caption: 'Treatment terbaru di DRW Skincare! ✨ #drwskincare #skincare #beauty',
            media_url: '/images/gallery/clinic-1.jpg',
            media_type: 'IMAGE',
            permalink: 'https://www.instagram.com/p/dummy1/',
            timestamp: new Date().toISOString(),
          },
          {
            id: '2',
            caption: 'Hasil perawatan yang menakjubkan dari pelanggan setia kami 💕',
            media_url: '/images/gallery/clinic-2.jpg',
            media_type: 'IMAGE',
            permalink: 'https://www.instagram.com/p/dummy2/',
            timestamp: new Date().toISOString(),
          },
          {
            id: '3',
            caption: 'Produk skincare berkualitas untuk kulit sehat dan glowing ✨',
            media_url: '/images/gallery/clinic-3.jpg',
            media_type: 'IMAGE',
            permalink: 'https://www.instagram.com/p/dummy3/',
            timestamp: new Date().toISOString(),
          },
          {
            id: '4',
            caption: 'Suasana nyaman di klinik kami untuk perawatan terbaik 🏥',
            media_url: '/images/gallery/clinic-4.jpg',
            media_type: 'IMAGE',
            permalink: 'https://www.instagram.com/p/dummy4/',
            timestamp: new Date().toISOString(),
          },
          {
            id: '5',
            caption: 'Tim profesional siap memberikan konsultasi terbaik 👩‍⚕️',
            media_url: '/images/gallery/clinic-5.jpg',
            media_type: 'IMAGE',
            permalink: 'https://www.instagram.com/p/dummy5/',
            timestamp: new Date().toISOString(),
          },
          {
            id: '6',
            caption: 'Before & after treatment yang luar biasa! 🌟 #transformation',
            media_url: '/images/gallery/clinic-6.jpg',
            media_type: 'IMAGE',
            permalink: 'https://www.instagram.com/p/dummy6/',
            timestamp: new Date().toISOString(),
          },
        ];

        return res.status(200).json({
          success: true,
          data: dummyPosts,
          message: 'Using dummy data for development. Add INSTAGRAM_ACCESS_TOKEN to .env.local for real data.'
        });
      }

      // Instagram Basic Display API call
      const instagramApiUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,permalink,timestamp&access_token=${accessToken}&limit=6`;
      
      const response = await fetch(instagramApiUrl);
      
      if (!response.ok) {
        throw new Error(`Instagram API error: ${response.status}`);
      }
      
      const instagramData: InstagramResponse = await response.json();
      
      // Filter hanya gambar dan video, sort berdasarkan timestamp terbaru
      const posts = instagramData.data
        .filter(post => post.media_type === 'IMAGE' || post.media_type === 'VIDEO')
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 6);

      // Set cache headers (cache for 1 hour)
      res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=1800');

      return res.status(200).json({
        success: true,
        data: posts
      });
    } catch (error) {
      console.error('Error fetching Instagram posts:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch Instagram posts',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}