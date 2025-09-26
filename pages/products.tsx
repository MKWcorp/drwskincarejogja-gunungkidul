import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import FloatingWhatsApp from '../components/FloatingWhatsApp';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  slug: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const brand = {
    name: "DRW Skincare",
    phoneWa: "6281229449995",
    colors: {
      pink: "#EE5097",
    },
    social: {
      fb: "https://www.facebook.com/irin.ku1",
      ig: "https://www.instagram.com/irin_drwskincare/",
    },
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/products');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data || []);
      } else {
        throw new Error(data.message || 'Failed to fetch products');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter produk berdasarkan pencarian dan kategori, lalu urutkan berdasarkan abjad
  const filteredProducts = products
    .filter((product: Product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (product.description || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => a.name.localeCompare(b.name, 'id', { sensitivity: 'base' }));

  // Dapatkan kategori unik
  const categories = ['all', ...Array.from(new Set(products.map((p: Product) => p.category)))];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(price);
  };

  return (
    <>
      <Head>
        <title>Produk DRW Skincare - Katalog Lengkap</title>
        <meta name="description" content="Jelajahi koleksi lengkap produk skincare DRW dengan kualitas terbaik untuk perawatan kulit Anda." />
        <meta name="keywords" content="DRW Skincare, produk skincare, katalog produk, perawatan kulit, kosmetik" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-200">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/logo_drwskincare.png" alt="DRW Skincare Logo" className="w-auto h-8 md:h-9" />
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="/#treatments" className="hover:text-pink-600">
                Perawatan
              </a>
              <a href="/products" className="text-pink-600 font-medium">
                Katalog Produk
              </a>
              <a href="/#gallery" className="hover:text-pink-600">
                Galeri
              </a>
              <a href="/#contact" className="hover:text-pink-600">
                Kontak
              </a>
              <a href={brand.social.fb} target="_blank" className="hover:text-pink-600">
                Facebook
              </a>
              <a href={brand.social.ig} target="_blank" className="hover:text-pink-600">
                Instagram
              </a>
              <a
                href={`https://wa.me/${brand.phoneWa}`}
                target="_blank"
                className="px-4 py-2 rounded-full text-white"
                style={{ background: brand.colors.pink }}
              >
                Booking
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <div className={`h-0.5 bg-gray-400 transition-all ${
                  mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`} />
                <div className={`h-0.5 bg-gray-400 transition-all ${
                  mobileMenuOpen ? 'opacity-0' : ''
                }`} />
                <div className={`h-0.5 bg-gray-400 transition-all ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`} />
              </div>
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 bg-white">
              <nav className="px-4 py-4 space-y-3">
                <a href="/#treatments" className="block py-2 hover:text-pink-600" onClick={() => setMobileMenuOpen(false)}>
                  Perawatan
                </a>
                <a href="/products" className="block py-2 text-pink-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
                  Katalog Produk
                </a>
                <a href="/#gallery" className="block py-2 hover:text-pink-600" onClick={() => setMobileMenuOpen(false)}>
                  Galeri
                </a>
                <a href="/#contact" className="block py-2 hover:text-pink-600" onClick={() => setMobileMenuOpen(false)}>
                  Kontak
                </a>
                <div className="border-t border-gray-200 pt-3 space-y-2">
                  <a href={brand.social.fb} target="_blank" className="block py-2 text-sm text-gray-600">
                    <i className="fab fa-facebook text-blue-600 mr-2"></i> Facebook
                  </a>
                  <a href={brand.social.ig} target="_blank" className="block py-2 text-sm text-gray-600">
                    <i className="fab fa-instagram text-pink-500 mr-2"></i> Instagram
                  </a>
                  <a
                    href={`https://wa.me/${brand.phoneWa}`}
                    target="_blank"
                    className="block w-full text-center py-3 rounded-lg text-white mt-3"
                    style={{ background: brand.colors.pink }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <i className="fab fa-whatsapp mr-2"></i> WhatsApp Booking
                  </a>
                </div>
              </nav>
            </div>
          )}
        </header>

        <div className="max-w-7xl mx-auto px-4 py-4 md:py-8">
          {/* Filter dan Pencarian */}
          <div className="bg-white rounded-lg shadow-sm p-3 md:p-6 mb-4 md:mb-8">
            <div className="flex flex-col md:flex-row gap-3 md:gap-4">
              {/* Search */}
              <div className="flex-1">
                <label htmlFor="search" className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                  Cari Produk
                </label>
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Nama produk..."
                  className="w-full px-3 md:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div className="md:w-64">
                <label htmlFor="category" className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                  Kategori
                </label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 md:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'Semua' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-3 md:mt-4 text-xs md:text-sm text-gray-600">
              {filteredProducts.length} dari {products.length} produk
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
              <span className="ml-3 text-gray-600">Memuat produk...</span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <i className="fas fa-exclamation-circle text-red-400 text-xl"></i>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                  <button
                    onClick={fetchProducts}
                    className="mt-3 text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Coba Lagi
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
              {filteredProducts.map((product: Product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden block cursor-pointer group"
                >
                  {/* Product Image */}
                  <div className="aspect-w-1 aspect-h-1 bg-gray-200">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-32 md:h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder-product.svg';
                        }}
                      />
                    ) : (
                      <div className="w-full h-32 md:h-48 bg-gray-200 flex items-center justify-center">
                        <i className="fas fa-image text-gray-400 text-xl md:text-3xl"></i>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-2 md:p-4">
                    {/* Product Name - Mobile: 2 lines max, Desktop: show full */}
                    <h3 className="text-sm md:text-lg font-semibold text-gray-900 line-clamp-2 mb-1 md:mb-2 group-hover:text-pink-600 transition-colors">
                      {product.name}
                    </h3>

                    {/* Category - Hidden on mobile */}
                    {product.category && (
                      <p className="hidden md:block text-sm text-gray-500 mb-2">{product.category}</p>
                    )}

                    {/* Description - Hidden on mobile */}
                    <p className="hidden md:block text-sm text-gray-600 mb-3 line-clamp-3">
                      {product.description}
                    </p>

                    {/* Price */}
                    <div className="flex flex-col gap-2">
                      <span className="text-sm md:text-lg font-bold text-pink-600">
                        {formatPrice(product.price)}
                      </span>
                      
                      {/* View Details Button - Only visible on hover for desktop */}
                      <div className="md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                        <span className="text-xs md:text-sm text-pink-600 font-medium">
                          Lihat Detail →
                        </span>
                      </div>
                    </div>

                    {/* Stock indicator - Hidden on mobile */}
                    {product.stock !== undefined && (
                      <div className="hidden md:flex justify-end mt-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          product.stock > 0 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.stock > 0 ? 'Tersedia' : 'Habis'}
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <i className="fas fa-search text-gray-400 text-4xl mb-4"></i>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada produk ditemukan</h3>
              <p className="text-gray-600">
                {searchTerm || selectedCategory !== 'all' 
                  ? 'Coba ubah filter pencarian Anda' 
                  : 'Belum ada produk tersedia saat ini'
                }
              </p>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="bg-pink-600 text-white py-12 mt-16">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-2xl font-bold mb-4">Butuh Konsultasi Produk?</h2>
            <p className="text-pink-100 mb-6">
              Tim ahli kami siap membantu Anda memilih produk yang tepat untuk kebutuhan kulit Anda
            </p>
            <a
              href="https://wa.me/6281229449995?text=Halo, saya ingin konsultasi untuk memilih produk yang tepat untuk kulit saya"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-white text-pink-600 font-semibold rounded-lg hover:bg-gray-100 transition"
            >
              <i className="fab fa-whatsapp mr-2"></i>
              Konsultasi Gratis
            </a>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp />
    </>
  );
}