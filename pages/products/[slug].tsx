import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import FloatingWhatsApp from '../../components/FloatingWhatsApp';

interface ProductDetail {
  id: string;
  namaProduk: string;
  deskripsi: string;
  gambar: string;
  fotoProduk: string;
  bpom: string;
  hargaUmum: number;
  idProduk: string;
  slug: string;
  category: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  slug: string;
}

export default function ProductDetailPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [otherProducts, setOtherProducts] = useState<Product[]>([]);

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
    if (slug) {
      fetchProductDetail(slug as string);
      fetchOtherProducts();
    }
  }, [slug]);

  const fetchOtherProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Ambil 4 produk pertama untuk ditampilkan
          setOtherProducts(data.data.slice(0, 4));
        }
      }
    } catch (error) {
      console.error('Error fetching other products:', error);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(price);
  };

  const fetchProductDetail = async (productSlug: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/products/${productSlug}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Produk tidak ditemukan');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setProduct(data.data);
      } else {
        throw new Error(data.message || 'Failed to fetch product');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching product detail:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat detail produk...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <i className="fas fa-exclamation-circle text-red-400 text-4xl mb-4"></i>
            <h2 className="text-xl font-semibold text-red-800 mb-2">Error</h2>
            <p className="text-red-700 mb-4">{error}</p>
            <div className="space-y-2">
              <button
                onClick={() => router.back()}
                className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Kembali
              </button>
              <Link href="/products" className="block w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition text-center">
                Lihat Semua Produk
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Produk tidak ditemukan</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{product.namaProduk} - DRW Skincare</title>
        <meta name="description" content={product.deskripsi || `${product.namaProduk} - Produk berkualitas dari DRW Skincare`} />
        <meta name="keywords" content={`${product.namaProduk}, DRW Skincare, skincare, perawatan kulit, ${product.category}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${product.namaProduk} - DRW Skincare`} />
        <meta property="og:description" content={product.deskripsi || `${product.namaProduk} - Produk berkualitas dari DRW Skincare`} />
        <meta property="og:image" content={product.fotoProduk || product.gambar || '/placeholder-product.svg'} />
        <meta property="og:type" content="product" />
        <meta property="product:price:amount" content={product.hargaUmum.toString()} />
        <meta property="product:price:currency" content="IDR" />
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
              <Link href="/#treatments" className="hover:text-pink-600">
                Perawatan
              </Link>
              <Link href="/products" className="hover:text-pink-600">
                Katalog Produk
              </Link>
              <Link href="/#gallery" className="hover:text-pink-600">
                Galeri
              </Link>
              <Link href="/#contact" className="hover:text-pink-600">
                Kontak
              </Link>
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
                <Link href="/#treatments" className="block py-2 hover:text-pink-600" onClick={() => setMobileMenuOpen(false)}>
                  Perawatan
                </Link>
                <Link href="/products" className="block py-2 hover:text-pink-600" onClick={() => setMobileMenuOpen(false)}>
                  Katalog Produk
                </Link>
                <Link href="/#gallery" className="block py-2 hover:text-pink-600" onClick={() => setMobileMenuOpen(false)}>
                  Galeri
                </Link>
                <Link href="/#contact" className="block py-2 hover:text-pink-600" onClick={() => setMobileMenuOpen(false)}>
                  Kontak
                </Link>
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
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
              {/* Product Image */}
              <div className="space-y-4">
                <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
                  {product.fotoProduk || product.gambar ? (
                    <img
                      src={product.fotoProduk || product.gambar}
                      alt={product.namaProduk}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder-product.svg';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <i className="fas fa-image text-gray-400 text-6xl"></i>
                    </div>
                  )}
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {product.namaProduk}
                  </h1>
                  {product.category && (
                    <p className="text-sm text-gray-500 mb-4">{product.category}</p>
                  )}
                </div>

                {/* Description */}
                {product.deskripsi && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Deskripsi</h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {product.deskripsi}
                    </p>
                  </div>
                )}

                {/* Product Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.bpom && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-1">BPOM</h4>
                      <p className="text-sm text-gray-600 font-mono">{product.bpom}</p>
                    </div>
                  )}
                  
                  {product.idProduk && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-1">ID Produk</h4>
                      <p className="text-sm text-gray-600 font-mono">{product.idProduk}</p>
                    </div>
                  )}
                </div>

                {/* Price and Actions */}
                <div className="border-t pt-6">
                  <div className="mb-6">
                    <span className="text-3xl font-bold text-pink-600">
                      {formatPrice(product.hargaUmum)}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {/* WhatsApp Order Button */}
                    <a
                      href={`https://wa.me/6281229449995?text=Halo, saya tertarik dengan produk ${encodeURIComponent(product.namaProduk)} (${product.idProduk}). Bisakah saya mendapatkan informasi lebih lanjut tentang harga dan ketersediaan?`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
                    >
                      <i className="fab fa-whatsapp mr-2 text-lg"></i>
                      Pesan via WhatsApp
                    </a>

                    {/* Share Button */}
                    <button
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: product.namaProduk,
                            text: `Lihat produk ${product.namaProduk} dari DRW Skincare`,
                            url: window.location.href,
                          });
                        } else {
                          navigator.clipboard.writeText(window.location.href);
                          alert('Link berhasil disalin!');
                        }
                      }}
                      className="w-full flex items-center justify-center px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition"
                    >
                      <i className="fas fa-share mr-2"></i>
                      Bagikan Produk
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Produk DRW Skincare Lainnya */}
        {otherProducts.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 text-center">
              Produk DRW Skincare lainnya:
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {otherProducts.map((otherProduct) => (
                <Link
                  key={otherProduct.id}
                  href={`/products/${otherProduct.slug}`}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden block cursor-pointer group"
                >
                  {/* Product Image */}
                  <div className="aspect-w-1 aspect-h-1 bg-gray-200">
                    {otherProduct.image ? (
                      <img
                        src={otherProduct.image}
                        alt={otherProduct.name}
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
                  <div className="p-3 md:p-4">
                    {/* Product Name */}
                    <h3 className="text-sm md:text-base font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-pink-600 transition-colors">
                      {otherProduct.name}
                    </h3>

                    {/* Category - Hidden on mobile */}
                    {otherProduct.category && (
                      <p className="hidden md:block text-xs text-gray-500 mb-2">{otherProduct.category}</p>
                    )}

                    {/* Price */}
                    <div className="flex flex-col gap-1">
                      <span className="text-sm md:text-base font-bold text-pink-600">
                        {formatPrice(otherProduct.price)}
                      </span>
                      
                      {/* View Details Button - Only visible on hover for desktop */}
                      <div className="md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                        <span className="text-xs text-pink-600 font-medium">
                          Lihat Detail →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Footer CTA */}
        <div className="bg-pink-600 text-white py-12 mt-16">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-2xl font-bold mb-4">Butuh Konsultasi?</h2>
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
      <FloatingWhatsApp 
        message={product ? `Halo, saya tertarik dengan produk ${product.namaProduk}. Bisakah saya mendapatkan informasi lebih lanjut?` : undefined}
      />
    </>
  );
}