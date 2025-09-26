import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="id">
      <Head>
        {/* Primary Meta Tags */}
        <meta name="title" content="DRW Skincare Gunungkidul - Beauty Center Terpercaya di Yogyakarta" />
        <meta name="description" content="DRW Skincare Gunungkidul menyediakan layanan facial, perawatan acne, whitening, rejuvenation dengan produk klinis terbaik. Lokasi di Wonosari, Gunungkidul. Booking sekarang!" />
        <meta name="keywords" content="DRW Skincare, DRW Skincare Gunungkidul, DRW Skincare Jogja, facial Gunungkidul, perawatan wajah Yogyakarta, skincare clinic, beauty center, acne treatment, whitening facial, rejuvenation" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="Indonesian" />
        <meta name="author" content="DRW Skincare Gunungkidul" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://drwskincaregunungkidul.com/" />
        <meta property="og:title" content="DRW Skincare Gunungkidul - Beauty Center Terpercaya" />
        <meta property="og:description" content="Layanan facial profesional, perawatan acne, whitening & rejuvenation di Gunungkidul. Produk klinis DRW berkualitas tinggi. Konsultasi gratis!" />
        <meta property="og:image" content="https://drwskincaregunungkidul.com/images/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="DRW Skincare Gunungkidul" />
        <meta property="og:locale" content="id_ID" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://drwskincaregunungkidul.com/" />
        <meta property="twitter:title" content="DRW Skincare Gunungkidul - Beauty Center Terpercaya" />
        <meta property="twitter:description" content="Layanan facial profesional, perawatan acne, whitening & rejuvenation di Gunungkidul. Konsultasi gratis!" />
        <meta property="twitter:image" content="https://drwskincaregunungkidul.com/images/twitter-image.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://drwskincaregunungkidul.com/" />
        
        {/* Alternate domains */}
        <link rel="alternate" href="https://drwskincarejogja.com/" hrefLang="id" />
        
        {/* Geo Tags */}
        <meta name="geo.region" content="ID-YO" />
        <meta name="geo.placename" content="Gunungkidul, Yogyakarta" />
        <meta name="geo.position" content="-7.803528;110.259416" />
        <meta name="ICBM" content="-7.803528, 110.259416" />
        
        {/* Business Info */}
        <meta name="contact:phone_number" content="+6281229449995" />
        <meta name="contact:email" content="info@drwskincaregunungkidul.com" />
        <meta name="contact:address" content="Jl. Brigjen Katamso No.38, Purbosari, Wonosari, Gunungkidul, DIY 55851" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
        />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#EE5097" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="DRW Skincare" />
        
        {/* Favicons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
        
        {/* Structured Data - Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BeautySalon",
              "name": "DRW Skincare Gunungkidul",
              "alternateName": ["DRW Skincare", "Rumah Cantik Irin 2"],
              "description": "Beauty Center terpercaya untuk layanan facial, perawatan acne, whitening, dan rejuvenation dengan produk klinis DRW di Gunungkidul, Yogyakarta.",
              "url": "https://drwskincaregunungkidul.com",
              "telephone": "+6281229449995",
              "email": "info@drwskincaregunungkidul.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Jl. Brigjen Katamso No.38, Purbosari",
                "addressLocality": "Wonosari",
                "addressRegion": "Gunungkidul",
                "postalCode": "55851",
                "addressCountry": "ID"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -7.803528,
                "longitude": 110.259416
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                "opens": "09:00",
                "closes": "21:00"
              },
              "priceRange": "Rp 75.000 - Rp 250.000",
              "paymentAccepted": ["Cash", "Transfer Bank"],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "DRW Skincare Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Facial Basic Acne",
                      "description": "Perawatan khusus untuk kulit berminyak dan berjerawat"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Basic Facial Whitening",
                      "description": "Perawatan untuk mencerahkan dan meratakan warna kulit"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Chemical Peeling",
                      "description": "Eksfoliasi profesional untuk regenerasi kulit"
                    }
                  }
                ]
              },
              "sameAs": [
                "https://www.facebook.com/irin.ku1",
                "https://www.instagram.com/irin_drwskincare/",
                "https://wa.me/6281229449995"
              ],
              "image": "https://drwskincaregunungkidul.com/images/logo-drw.jpg",
              "logo": "https://drwskincaregunungkidul.com/images/logo-drw.jpg"
            })
          }}
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}