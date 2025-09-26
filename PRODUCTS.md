# Halaman Katalog Produk - DRW Skincare

## Overview
Halaman `/products` menampilkan katalog lengkap produk DRW Skincare yang diambil dari API resmi `https://drwgroup.id/apis/product/get`.

## Features

### 🔍 **Pencarian & Filter**
- **Search**: Pencarian berdasarkan nama dan deskripsi produk
- **Category Filter**: Filter berdasarkan kategori produk
- **Real-time Results**: Hasil pencarian dan filter yang responsif

### 📱 **Responsive Design**
- **Mobile First**: Optimized untuk smartphone dan tablet
- **Grid Layout**: 1-4 kolom tergantung ukuran layar
- **Touch Friendly**: Button dan interface yang mudah digunakan di mobile

### 🛒 **Product Display**
- **Image Fallback**: Placeholder otomatis jika gambar produk tidak tersedia
- **Price Formatting**: Format mata uang IDR
- **Stock Status**: Indikator ketersediaan produk
- **WhatsApp Integration**: Direct order via WhatsApp

### ⚡ **Performance**
- **Loading States**: Spinner dan skeleton loading
- **Error Handling**: Graceful error handling dengan retry option
- **Caching**: API caching untuk mengurangi request

## API Integration

### External API
```
URL: https://drwgroup.id/apis/product/get
Method: GET
Headers: 
  Authorization: Bearer c5d46484b83e6d90d2c55bc7a0ec9782493a1fa2434b66ebed36c3e668f74e89
  Content-Type: application/json
```

### Internal API (Backup)
```
URL: /api/products
Method: GET
Description: Proxy ke API eksternal dengan caching
```

## Product Data Structure
```typescript
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}
```

## Navigation
- **Dari Homepage**: Menu "Katalog Produk" di header
- **URL**: `/products`
- **Back Button**: Tombol "Kembali ke Home" di header halaman

## WhatsApp Integration
Setiap produk memiliki tombol "Pesan" yang akan:
1. Membuka WhatsApp dengan nomor `6281229449995`
2. Pre-fill pesan dengan nama produk
3. Template: `"Halo, saya tertarik dengan produk [Product Name]. Bisakah saya mendapatkan informasi lebih lanjut?"`

## SEO Optimization
- **Title**: "Produk DRW Skincare - Katalog Lengkap"
- **Meta Description**: Optimized untuk pencarian produk skincare
- **Keywords**: Relevant skincare dan beauty keywords

## Error Handling
1. **Network Errors**: Retry button dengan pesan error yang jelas
2. **Empty States**: Pesan informatif ketika tidak ada produk
3. **Image Errors**: Fallback ke placeholder SVG
4. **Loading States**: Spinner dengan teks deskriptif

## File Structure
```
pages/
  products.tsx          # Main product catalog page
  api/
    products.ts         # API proxy endpoint

public/
  placeholder-product.svg # Fallback product image

styles/
  globals.css         # Added line-clamp utilities
```

## Usage Examples

### Direct Access
```
http://localhost:3001/products
```

### With Navigation
- Klik "Katalog Produk" di menu utama
- Otomatis redirect ke halaman produk

### API Testing
```bash
# Test internal API
curl http://localhost:3001/api/products

# Test direct external API
curl -H "Authorization: Bearer c5d46484b83e6d90d2c55bc7a0ec9782493a1fa2434b66ebed36c3e668f74e89" \
     https://drwgroup.id/apis/product/get
```

## Troubleshooting

### Common Issues
1. **API tidak response**: Cek koneksi internet dan validitas Bearer token
2. **Gambar tidak muncul**: Normal, akan menggunakan placeholder otomatis
3. **Filter tidak bekerja**: Cek struktur data dari API response

### Development
```bash
# Start development server
npm run dev

# Access page
http://localhost:3001/products
```

## Future Enhancements
- [ ] Product detail modal/page
- [ ] Shopping cart functionality
- [ ] Wishlist feature
- [ ] Product comparison
- [ ] Reviews and ratings
- [ ] Advanced filtering (price range, ratings)
- [ ] Pagination untuk dataset besar