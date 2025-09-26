import React, { useMemo, useState } from "react";
import Head from "next/head";
import Script from "next/script";
import FloatingWhatsApp from "../components/FloatingWhatsApp";

// ✅ Single-file React/Next.js landing page for DRW Skincare
// - Tailwind CSS (white & pink theme)
// - Strong HOOK hero copy for DRW Skincare
// - Product gallery + lightbox
// - Treatment menu (from your PDF brief) with pricing
// - Contact, social, and embedded map
// - Dev test block for formatIDR (toggle with DEBUG_TESTS)

export default function DRWSkincare() {
  const DEBUG_TESTS = false; // 👉 set true to render simple test cases for formatIDR

  const brand = {
    name: "DRW Skincare",
    phoneWa: "6281229449995", // WA untuk konsultasi, pesan produk, dan booking
    domain: "drwskincaregunungkidul.com",
    colors: {
      pink: "#EE5097",
      gold: "#D4AF37",
      dark: "#111111",
    },
    address:
      "Jl. Brigjen Katamso No.38, Purbosari, Wonosari, Daerah Istimewa Yogyakarta 55851",
    gmaps: "https://maps.app.goo.gl/PzZTQNfSaJQx8GnU6",
    social: {
      fb: "https://www.facebook.com/irin.ku1",
      ig: "https://www.instagram.com/irin_drwskincare/",
    },
  };

  // ✅ Data menu perawatan — dirangkum dari materi PDF
  const treatments = useMemo(
    () => ({
      categories: [
        {
          id: "acne",
          title: "Acne Series",
          subtitle: "Untuk kulit berminyak & berjerawat",
          items: [
            {
              name: "Facial Basic Acne",
              price: 80000,
              bullets: [
                "Double cleansing, scrubbing, steamer/vapozone",
                "Ekstraksi/vakum komedo, high frequency",
                "Masker Tea Tree Oil",
              ],
            },
            {
              name: "PDT Facial (Photo Dynamic Therapy)",
              price: 100000,
              bullets: [
                "Blue Light: kontrol minyak & bunuh bakteri penyebab jerawat",
                "Purple Light: kurangi kemerahan/inflamasi jerawat",
              ],
            },
            {
              name: "Chemical Peeling",
              price: 160000,
              bullets: [
                "Eksfoliasi sel kulit mati",
                "Membantu samarkan bekas jerawat & meratakan warna kulit",
              ],
            },
            {
              name: "Acne Serum Facial",
              price: 195000,
              bullets: [
                "Mencerahkan, minimalkan beruntus",
                "Kontrol minyak berlebih & cegah jerawat",
              ],
            },
            {
              name: "Dermapen Treatment",
              price: 250000,
              bullets: [
                "Boost kolagen & peremajaan kulit",
                "Menyamarkan kerutan, scar/bopeng, kecilkan pori",
              ],
            },
          ],
        },
        {
          id: "whitening",
          title: "Whitening/Rejuvenation Series",
          subtitle: "Cerahkan, haluskan, remajakan",
          items: [
            {
              name: "Basic Facial Whitening",
              price: 75000,
              bullets: [
                "Double cleansing, scrubbing, massage, steamer/vapozone",
                "Ekstraksi/vakum komedo, high frequency, masker",
              ],
            },
            {
              name: "PDT Facial (Photo Dynamic Therapy)",
              price: 100000,
              bullets: [
                "Rejuvenation, kurangi garis halus & inflamasi",
                "Stimulasi pembentukan kolagen",
              ],
            },
            {
              name: "Detox Facial",
              price: 120000,
              bullets: [
                "Angkat toxin & kelebihan minyak, basmi komedo",
                "Suplai oksigen & nutrisi, pori tersamarkan",
              ],
            },
            {
              name: "Gold Facial",
              price: 150000,
              bullets: [
                "Halus, lembap, cerah, elastisitas meningkat",
                "Serum + ultrasound + masker gold",
              ],
            },
            {
              name: "Microdermabrasion Diamond Facial",
              price: 125000,
              bullets: [
                "Angkat sel kulit mati, cerahkan & haluskan",
                "Dipadu serum untuk melembapkan",
              ],
            },
            {
              name: "Oxy Glow Facial",
              price: 130000,
              bullets: [
                "Oksigen bertekanan tinggi untuk nutrisi & kelembapan",
                "Kulit lebih kenyal, lembap, bantu cegah jerawat",
              ],
            },
            {
              name: "DNA Salmon Treatment",
              price: 195000,
              bullets: [
                "Mencerahkan & meratakan warna kulit",
                "Melembapkan & bikin kulit lebih kenyal",
              ],
            },
            {
              name: "BB Glow Treatment",
              price: 250000,
              bullets: [
                "Efek kulit tampak rata & glowing",
                "Dipadu ultrasound & PDT",
              ],
            },
            {
              name: "Chemical Peeling",
              price: 160000,
              bullets: [
                "Eksfoliasi kotoran & sel kulit mati dengan bahan kimia khusus",
              ],
            },
          ],
        },
        {
          id: "signature",
          title: "Signature Facials",
          subtitle: "Pilihan masker natural by DRW",
          items: [
            {
              name: "Honey Facial",
              price: 75000,
              bullets: [
                "Nutrisi + kelembapan, bantu cegah penuaan dini",
                "Cocok untuk kulit kering, normal, sensitif",
              ],
            },
            {
              name: "Limpasu Facial",
              price: 75000,
              bullets: [
                "Menutrisi & jaga kekencangan kulit",
                "Cocok untuk kulit kering, normal, berminyak",
              ],
            },
            {
              name: "Tea Tree Oil Facial",
              price: 80000,
              bullets: [
                "Bantu atasi jerawat & kontrol sebum",
                "Cocok untuk kulit berminyak/berjerawat",
              ],
            },
            {
              name: "Green Tea Facial",
              price: 80000,
              bullets: [
                "Redakan kemerahan/inflamasi (matahari/jerawat)",
                "Cocok untuk kulit berminyak/berjerawat",
              ],
            },
          ],
        },
      ],
    }),
    []
  );

  const products = [
    { name: "DNA Salmon Serum", src: "/images/products/dna-salmon.jpg" },
    { name: "Daily Ceramoist Hydra Gel", src: "/images/products/ceramoist.jpg" },
    { name: "Hydrating Toner", src: "/images/products/hydrating-toner.jpg" },
    { name: "Luminous & Brightening Serum", src: "/images/products/luminous-bright.jpg" },
    { name: "Peel-Off Mask", src: "/images/products/peel-off.jpg" },
    { name: "AMOUR Matte Lip Cream", src: "/images/products/amour-matte.jpg" },
    { name: "Goat’s Milk Lotion", src: "/images/products/goat-lotion.jpg" },
    { name: "Body Wash GOAT Series", src: "/images/products/goat-bodywash.jpg" },
  ];

  const [activeCat, setActiveCat] = useState(treatments.categories[0].id);
  const [lightbox, setLightbox] = useState<{ open: boolean; idx: number | null }>({
    open: false,
    idx: null,
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showWaTooltip, setShowWaTooltip] = useState(true);
  const [instagramPosts, setInstagramPosts] = useState<any[]>([]);
  const [instagramLoading, setInstagramLoading] = useState(true);
  const [apiProducts, setApiProducts] = useState<any[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);

  // Hide tooltip after 5 seconds
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowWaTooltip(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Fetch Instagram posts
  React.useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        setInstagramLoading(true);
        const response = await fetch('/api/instagram');
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setInstagramPosts(data.data);
          }
        }
      } catch (error) {
        console.error('Error fetching Instagram posts:', error);
      } finally {
        setInstagramLoading(false);
      }
    };

    fetchInstagramPosts();
  }, []);

  // Fetch Products from API
  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProductsLoading(true);
        // Hanya ambil produk yang memiliki foto
        const response = await fetch('/api/products?withImages=true');
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            // Urutkan berdasarkan abjad dan tampilkan semua produk yang ada foto
            const sortedProducts = data.data.sort((a: any, b: any) => 
              a.name.localeCompare(b.name, 'id', { sensitivity: 'base' })
            );
            setApiProducts(sortedProducts); // Tampilkan semua produk
          }
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setProductsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const activeItems = useMemo(
    () => treatments.categories.find((c) => c.id === activeCat)?.items ?? [],
    [activeCat, treatments]
  );

  const testBlock = DEBUG_TESTS ? <FormatIDRTests /> : null;

  return (
    <>
      <Head>
        <title>DRW Skincare - Facial & Perawatan Wajah Terbaik di Jogja</title>
        <meta name="description" content="DRW Skincare menyediakan layanan facial acne, whitening, rejuvenation terbaik di Wonosari, Jogja. Produk klinis berkualitas, harga terjangkau. Booking sekarang di wa.me/6281229449995" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
    <div className="min-h-screen bg-white text-gray-900 font-sans" itemScope itemType="https://schema.org/BeautySalon">
      {/* Topbar */}
      <div className="w-full text-xs md:text-sm bg-pink-50 border-b border-pink-100">
        <div className="mx-auto max-w-6xl px-4 py-2 flex items-center justify-between">
          <a href={`https://${brand.domain}`} className="font-medium hidden sm:block hover:underline">DRW Skincare Official Website</a>
          <span className="font-medium sm:hidden">DRW Skincare</span>
          <a
            href={`https://wa.me/${brand.phoneWa}`}
            target="_blank"
            className="rounded-full px-2 md:px-3 py-1 border border-pink-300 hover:bg-pink-100 transition text-xs md:text-sm"
          >
            <span className="hidden sm:inline">Konsultasi Gratis / Pesan Produk / Booking</span>
            <span className="sm:hidden"><i className="fab fa-whatsapp"></i> Chat WA</span>
          </a>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo_drwskincare.png" alt="DRW Skincare Logo" className="w-auto h-8 md:h-9" />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#treatments" className="hover:text-pink-600">
              Perawatan
            </a>
            <a href="/products" className="hover:text-pink-600">
              Katalog Produk
            </a>
            <a href="#gallery" className="hover:text-pink-600">
              Galeri
            </a>
            <a href="#contact" className="hover:text-pink-600">
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
              <a href="#treatments" className="block py-2 hover:text-pink-600" onClick={() => setMobileMenuOpen(false)}>
                Perawatan
              </a>
              <a href="/products" className="block py-2 hover:text-pink-600" onClick={() => setMobileMenuOpen(false)}>
                Katalog Produk
              </a>
              <a href="#gallery" className="block py-2 hover:text-pink-600" onClick={() => setMobileMenuOpen(false)}>
                Galeri
              </a>
              <a href="#contact" className="block py-2 hover:text-pink-600" onClick={() => setMobileMenuOpen(false)}>
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

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-20"
          style={{ background: `radial-gradient(100% 60% at 50% 0%, #ffd4e8 0%, white 60%)` }}
        />
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-14 grid md:grid-cols-2 gap-6 md:gap-10 items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight font-heading">
              <span itemProp="name">DRW Skincare</span> - Kulit Cerah. Percaya Diri. <span style={{ color: brand.colors.pink }}>#GlowBarengDRW</span>
            </h1>
            <p className="mt-4 text-base md:text-lg text-gray-600 max-w-prose font-sans leading-relaxed" itemProp="description">
              <strong>Beauty Center terpercaya di Jogja</strong> untuk layanan <em>facial profesional</em>, <em>perawatan acne</em>, <em>whitening</em>, dan <em>rejuvenation</em>. 
              Menggunakan <strong>produk klinis DRW</strong> yang inovatif dan terpercaya. Rasakan layanan hangat dan hasil yang nyata di <span itemProp="address">Wonosari, Jogja</span>.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3">
              <a href="#treatments" className="px-4 md:px-5 py-3 rounded-full border border-pink-300 hover:bg-pink-50 text-center text-sm md:text-base">
                Lihat Menu Perawatan
              </a>
              <a href="#products" className="px-4 md:px-5 py-3 rounded-full text-white text-center text-sm md:text-base" style={{ background: brand.colors.pink }}>
                Cek Produk Favorit
              </a>
              <a
                href={`https://wa.me/${brand.phoneWa}`}
                target="_blank"
                className="px-4 md:px-5 py-3 rounded-full border hover:bg-gray-50 text-center text-sm md:text-base"
              >
                <i className="fab fa-whatsapp mr-2"></i> Tanya Admin
              </a>
            </div>
            <div className="mt-5 text-xs md:text-sm text-gray-500">
              *Operasional & jadwal dapat berubah. Hubungi admin untuk ketersediaan slot.
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] w-full rounded-2xl border border-gray-200 bg-gradient-to-br from-pink-50 to-white p-2">
              <div className="h-full w-full rounded-xl bg-white flex items-center justify-center text-center p-6">
                <div>
                  <div className="text-sm uppercase tracking-widest text-gray-400">Jogja</div>
                  <div className="text-2xl font-bold font-heading">Timeless Beauty, Effortless Glow</div>
                  <div className="mt-2 text-gray-500">Facial • Rejuvenation • Acne Care • Brightening</div>
                </div>
              </div>
            </div>
            {/* Floating stats */}
            <div className="absolute -bottom-6 left-6 bg-white shadow/10 shadow-lg border border-gray-200 rounded-xl px-4 py-3">
              <div className="text-2xl font-extrabold font-heading" style={{ color: brand.colors.pink }}>
                10+ Menu
              </div>
              <div className="text-xs text-gray-500">Perawatan favorit siap dicoba</div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatments */}
      <section id="treatments" className="mx-auto max-w-6xl px-4 py-8 md:py-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight font-heading">Menu Perawatan DRW Skincare</h2>
            <p className="text-gray-600 font-sans text-sm md:text-base">Layanan <strong>facial profesional</strong> dari <em>Acne Series</em> hingga <em>Whitening & Rejuvenation</em> di Jogja</p>
          </div>
          <a
            href={`https://wa.me/${brand.phoneWa}`}
            target="_blank"
            className="hidden md:inline-block px-4 py-2 rounded-full text-white text-sm"
            style={{ background: brand.colors.pink }}
          >
            <i className="fab fa-whatsapp mr-2"></i> Konsultasi Gratis
          </a>
        </div>

        <div className="flex gap-2 flex-wrap mb-6 overflow-x-auto pb-2">
          {treatments.categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              className={`px-3 md:px-4 py-2 rounded-full border text-xs md:text-sm whitespace-nowrap ${
                activeCat === cat.id ? "text-white" : "hover:bg-pink-50 border-pink-200"
              }`}
              style={{ background: activeCat === cat.id ? brand.colors.pink : "transparent" }}
            >
              {cat.title}
            </button>
          ))}
        </div>

        <p className="text-sm text-gray-500 mb-4 font-sans">
          {treatments.categories.find((c) => c.id === activeCat)?.subtitle}
        </p>

        <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activeItems.map((item, idx) => (
            <article key={idx} className="rounded-2xl border border-gray-200 p-4 md:p-5 bg-white hover:shadow-md transition" itemScope itemType="https://schema.org/Service">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3 mb-3">
                <h3 className="font-semibold text-base md:text-lg leading-tight font-heading" itemProp="name">{item.name}</h3>
                <span
                  className="shrink-0 rounded-full px-3 py-1 text-sm font-semibold text-white self-start"
                  style={{ background: brand.colors.pink }}
                  itemProp="offers" itemScope itemType="https://schema.org/Offer"
                >
                  <span itemProp="price">Rp {formatIDR(item.price)}</span>
                  <meta itemProp="priceCurrency" content="IDR" />
                </span>
              </div>
              <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5 mb-4" itemProp="description">
                {item.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-2">
                <a
                  href={`https://wa.me/${brand.phoneWa}?text=${encodeURIComponent(
                    `Halo mau tanya harga paket ${item.name}`
                  )}`}
                  target="_blank"
                  className="px-3 py-2 rounded-lg text-xs md:text-sm border hover:bg-pink-50 border-pink-200 text-center"
                >
                  <i className="fas fa-question-circle mr-1"></i> Tanya Harga Paket
                </a>
                <a
                  href={`https://wa.me/${brand.phoneWa}?text=${encodeURIComponent(
                    `Halo, Mau Booking Perawatan ${item.name}`
                  )}`}
                  target="_blank"
                  className="px-3 py-2 rounded-lg text-xs md:text-sm text-white text-center"
                  style={{ background: brand.colors.pink }}
                >
                  <i className="fas fa-calendar-check mr-1"></i> Booking Sekarang
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 text-xs text-gray-500">
          *Harga dapat berubah sewaktu-waktu. Tanyakan promo & paket bundling ke admin.
        </div>
      </section>

      {/* Products */}
      <section id="products" className="bg-pink-50/40 border-y border-gray-200">
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-14">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight font-heading">Produk Skincare DRW Terpercaya</h2>
          <p className="text-gray-600 font-sans text-sm md:text-base">
            Kombinasikan <strong>treatment facial</strong> dengan rangkaian <em>skincare klinis DRW</em> untuk hasil optimal. 
            Produk berkualitas tinggi untuk perawatan di rumah.
          </p>
          {!productsLoading && apiProducts.length > 0 && (
            <p className="text-pink-600 font-medium text-sm mt-2">
              {apiProducts.length} produk tersedia - geser untuk melihat semua
            </p>
          )}

          {/* Product Slider */}
          <div className="relative mt-6">
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-4 md:gap-6 pb-4" style={{ width: 'max-content' }}>
                {productsLoading ? (
                  // Loading skeleton - tampilkan 8 skeleton cards
                  [...Array(8)].map((_, idx) => (
                    <div key={idx} className="flex-shrink-0 w-48 md:w-56 animate-pulse">
                      <div className="aspect-square w-full rounded-xl md:rounded-2xl overflow-hidden border border-gray-200 bg-gray-200">
                      </div>
                      <div className="mt-2 h-4 bg-gray-200 rounded"></div>
                      <div className="mt-1 h-3 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  ))
                ) : apiProducts.length > 0 ? (
                  // API Products
                  apiProducts.map((product, idx) => (
                    <a 
                      key={product.id} 
                      href={`/products/${product.slug}`}
                      className="flex-shrink-0 w-48 md:w-56 group text-left hover:shadow-lg transition-all duration-300"
                    >
                      <div className="aspect-square w-full rounded-xl md:rounded-2xl overflow-hidden border border-gray-200 bg-white">
                        <img
                          src={product.image || '/placeholder-product.svg'}
                          alt={product.name}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder-product.svg';
                          }}
                        />
                      </div>
                      <div className="mt-2 font-medium text-sm md:text-base leading-tight group-hover:text-pink-600 transition-colors line-clamp-2">
                        {product.name}
                      </div>
                      <div className="text-xs md:text-sm text-pink-600 font-semibold mt-1">
                        {new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                        }).format(product.price)}
                      </div>
                      <div className="text-xs md:text-sm text-gray-500 mt-1">Lihat detail →</div>
                    </a>
                  ))
                ) : (
                  // Fallback to static products - tampilkan semua
                  products.map((p, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => setLightbox({ open: true, idx })} 
                      className="flex-shrink-0 w-48 md:w-56 group text-left"
                    >
                      <div className="aspect-square w-full rounded-xl md:rounded-2xl overflow-hidden border border-gray-200 bg-white">
                        <img
                          src={p.src}
                          alt={p.name}
                          className="h-full w-full object-cover group-hover:scale-105 transition"
                        />
                      </div>
                      <div className="mt-2 font-medium text-sm md:text-base leading-tight line-clamp-2">{p.name}</div>
                      <div className="text-xs md:text-sm text-gray-500 mt-1">Lihat lebih dekat</div>
                    </button>
                  ))
                )}
              </div>
            </div>
            
            {/* Scroll indicators */}
            <div className="hidden md:block">
              {/* Left scroll indicator */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur rounded-full p-2 shadow-lg opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                <i className="fas fa-chevron-left text-gray-600"></i>
              </div>
              
              {/* Right scroll indicator */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur rounded-full p-2 shadow-lg opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                <i className="fas fa-chevron-right text-gray-600"></i>
              </div>
            </div>
          </div>

          {/* Mobile swipe hint */}
          <div className="md:hidden text-center mt-4">
            <p className="text-xs text-gray-500">
              <i className="fas fa-hand-point-right mr-1"></i>
              Geser untuk melihat produk lainnya
            </p>
          </div>

          {/* View All Products Button */}
          <div className="text-center mt-8">
            <a
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Lihat Semua Produk
              <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </div>

          {/* Simple Lightbox */}
          {lightbox.open && lightbox.idx !== null && (
            <div
              className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 md:p-6"
              onClick={() => setLightbox({ open: false, idx: null })}
            >
              <div className="max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
                <img
                  src={products[lightbox.idx].src}
                  alt={products[lightbox.idx].name}
                  className="w-full rounded-xl"
                />
                <div className="mt-3 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="font-semibold text-sm md:text-base">{products[lightbox.idx].name}</div>
                  <button
                    onClick={() => setLightbox({ open: false, idx: null })}
                    className="px-4 py-2 rounded-lg bg-white text-gray-800 text-sm self-start sm:self-auto"
                  >
                    <i className="fas fa-times mr-1"></i> Tutup
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Photo Gallery */}
      <section id="gallery" className="mx-auto max-w-6xl px-4 py-8 md:py-14">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight font-heading">Galeri Instagram</h2>
            <p className="text-gray-600 font-sans text-sm md:text-base">Post terbaru dari <a href="https://www.instagram.com/rumahcantikirin/" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline">@rumahcantikirin</a></p>
          </div>
          <a 
            href="https://www.instagram.com/rumahcantikirin/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-pink-600 hover:text-pink-700 transition-colors"
          >
            <i className="fab fa-instagram text-2xl"></i>
          </a>
        </div>
        
        {/* Instagram Feed */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
          <blockquote className="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/DKyxhdKBRfN/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style={{ background:'#FFF', border:0, borderRadius:'3px', boxShadow:'0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)', margin: '1px', maxWidth:'326px', minWidth:'326px', padding:0, width:'calc(100% - 2px)' }}></blockquote>
          <blockquote className="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/DKg7UU-BPV7/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style={{ background:'#FFF', border:0, borderRadius:'3px', boxShadow:'0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)', margin: '1px', maxWidth:'326px', minWidth:'326px', padding:0, width:'calc(100% - 2px)' }}></blockquote>
          <blockquote className="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/DCK0WBvtQdy/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style={{ background:'#FFF', border:0, borderRadius:'3px', boxShadow:'0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)', margin: '1px', maxWidth:'326px', minWidth:'326px', padding:0, width:'calc(100% - 2px)' }}></blockquote>
        </div>
        <Script async src="//www.instagram.com/embed.js" />

        {/* View More on Instagram */}
        <div className="text-center mt-8">
          <a
            href="https://www.instagram.com/rumahcantikirin/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <i className="fab fa-instagram mr-2 text-lg"></i>
            Follow @rumahcantikirin
          </a>
        </div>
      </section>

      {/* Contact & Map */}
      <section id="contact" className="bg-gradient-to-b from-white to-pink-50/60 border-t border-gray-200">
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-14 grid md:grid-cols-2 gap-6 md:gap-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight font-heading">Hubungi DRW Skincare</h2>
            <p className="text-gray-600 mt-1 font-sans text-sm md:text-base">Siap bantu <strong>konsultasi gratis</strong> & <em>booking jadwal perawatan</em> di Wonosari, Jogja</p>
            <div className="mt-6 space-y-3 text-sm md:text-base">
              <InfoRow
                label="WhatsApp"
                value={
                  <a href={`https://wa.me/${brand.phoneWa}`} target="_blank" className="underline">
                    wa.me/{brand.phoneWa}
                  </a>
                }
              />
              <InfoRow label="Alamat" value={brand.address} />
              <InfoRow label="Website" value={brand.domain} />
              <InfoRow
                label="Facebook"
                value={
                  <a href={brand.social.fb} target="_blank" className="underline">
                    irin.ku1
                  </a>
                }
              />
              <InfoRow
                label="Instagram"
                value={
                  <a href={brand.social.ig} target="_blank" className="underline">
                    @irin_drwskincare
                  </a>
                }
              />
            </div>
            <div className="mt-6 grid grid-cols-2 md:flex md:flex-wrap gap-3">
              <a
                href={`https://wa.me/${brand.phoneWa}`}
                target="_blank"
                className="px-4 md:px-5 py-3 rounded-full text-white text-center text-sm md:text-base"
                style={{ background: brand.colors.pink }}
              >
                <i className="fab fa-whatsapp mr-2"></i> Chat Admin
              </a>
              <a
                href={brand.social.fb}
                target="_blank"
                className="px-4 md:px-5 py-3 rounded-full border border-pink-200 hover:bg-pink-50 text-center text-sm md:text-base"
              >
                <i className="fab fa-facebook text-blue-600 mr-2"></i> Facebook
              </a>
              <a
                href={brand.social.ig}
                target="_blank"
                className="px-4 md:px-5 py-3 rounded-full border border-pink-200 hover:bg-pink-50 text-center text-sm md:text-base"
              >
                <i className="fab fa-instagram text-pink-500 mr-2"></i> Instagram
              </a>
              <a
                href="#treatments"
                className="px-4 md:px-5 py-3 rounded-full border border-pink-200 hover:bg-pink-50 text-center text-sm md:text-base"
              >
                <i className="fas fa-list mr-2"></i> Lihat Menu
              </a>
            </div>
            {testBlock}
          </div>
          <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white">
            <iframe 
              title="DRW Skincare Jogja"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d252983.71456113076!2d110.25941645444502!3d-7.803527520315312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7bb342ff9a4ca7%3A0xc6bee2a5ada03887!2sDRW%20Skincare%20Gunungkidul%20Rumah%20Cantik%20Irin%202!5e0!3m2!1sid!2sid!4v1758889371731!5m2!1sid!2sid" 
              className="w-full h-[320px] md:h-full"
              style={{ border: 0 }}
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-200">
        <div className="mx-auto max-w-6xl px-4 py-6 md:py-8 text-xs md:text-sm text-gray-600 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            <a href="#treatments" className="hover:text-pink-600">
              Perawatan
            </a>
            <a href="#products" className="hover:text-pink-600">
              Produk
            </a>
            <a href="#gallery" className="hover:text-pink-600">
              Galeri
            </a>
            <a href="#contact" className="hover:text-pink-600">
              Kontak
            </a>
            <a href={brand.social.fb} target="_blank" className="hover:text-pink-600">
              Facebook
            </a>
            <a href={brand.social.ig} target="_blank" className="hover:text-pink-600">
              Instagram
            </a>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-4 md:bottom-6 right-4 md:right-6 z-50">
        <a
          href={`https://wa.me/${brand.phoneWa}?text=${encodeURIComponent(
            `Halo ${brand.name}! Saya ingin konsultasi tentang perawatan kecantikan.`
          )}`}
          target="_blank"
          className="wa-float group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110"
          style={{ background: '#25D366' }}
          title="Chat WhatsApp - Konsultasi Gratis"
        >
          <i className="fab fa-whatsapp text-white text-2xl md:text-3xl group-hover:scale-110 transition-transform duration-300"></i>
          
          {/* Tooltip */}
          <div className="wa-tooltip absolute bottom-full right-0 mb-3 pointer-events-none">
            <div className="bg-gray-800 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
              💬 Chat WhatsApp
              <div className="absolute top-full right-3 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
            </div>
          </div>
        </a>
        
        {/* Notification Badge - Auto hide after 5 seconds */}
        {showWaTooltip && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center animate-ping">
            <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">!</span>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-3 sm:items-start">
      <div className="w-full sm:w-24 text-gray-500 text-sm font-medium">{label}</div>
      <div className="font-medium text-sm md:text-base">{value}</div>
    </div>
  );
}

function formatIDR(n: number) {
  try {
    return new Intl.NumberFormat("id-ID").format(n);
  } catch {
    return `${n}`;
  }
}

// ──────────────────────────────────────────────────────────────────────────────
// 🔎 Simple visual tests for formatIDR (dev-only)
// Toggle DEBUG_TESTS = true to render this block on the Contact section
function FormatIDRTests() {
  const tests = [
    { input: 0, expected: "0" },
    { input: 1000, expected: "1.000" },
    { input: 12345, expected: "12.345" },
    { input: 123456789, expected: "123.456.789" },
    { input: -10, expected: "-10" },
  ];
  return (
    <div className="mt-10 p-4 border rounded-xl bg-white">
      <div className="font-semibold mb-2">Dev • formatIDR Tests</div>
      <div className="text-xs text-gray-500 mb-3">Toggle DEBUG_TESTS to hide/show.</div>
      <div className="overflow-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2 pr-2">#</th>
              <th className="py-2 pr-2">Input</th>
              <th className="py-2 pr-2">Expected</th>
              <th className="py-2 pr-2">Actual</th>
              <th className="py-2 pr-2">Pass?</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((t, i) => {
              const actual = formatIDR(t.input as number);
              const pass = actual === t.expected;
              return (
                <tr key={i} className="border-b">
                  <td className="py-1 pr-2">{i + 1}</td>
                  <td className="py-1 pr-2">{String(t.input)}</td>
                  <td className="py-1 pr-2">{t.expected}</td>
                  <td className="py-1 pr-2">{actual}</td>
                  <td className={`py-1 pr-2 ${pass ? "text-green-600" : "text-red-600"}`}>{pass ? "PASS" : "FAIL"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Custom CSS untuk slider */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;  /* Internet Explorer 10+ */
          scrollbar-width: none;  /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar { 
          display: none;  /* Safari and Chrome */
        }
      `}</style>
    </div>
  );
}
