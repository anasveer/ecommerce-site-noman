import type { Metadata } from "next";

import "./globals.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";
import WhatsAppFloat from '@/components/WhatsAppFloat';

export const metadata: Metadata = {
  title: {
    default: "Universal Bedding | Premium Bedsheets, Comforter Sets & Mattress Covers in Pakistan",
    template: "%s | Universal Bedding Pakistan"
  },
  description: "Universal Bedding offers premium quality 3pcs bedsheets, single pair bedsheets, comforter sets and waterproof mattress covers in Pakistan. Crystal cotton fabric, lifetime colour guarantee, fast delivery across Pakistan.",
  keywords: [
    "bedsheet pakistan", "3pcs bedsheet", "comforter set pakistan", "single pair bedsheet",
    "waterproof mattress cover", "crystal cotton bedsheet", "premium bedding pakistan",
    "universal bedding", "bedsheet online pakistan", "luxury bedsheet", "bedding store pakistan",
    "cotton bedsheet", "velour bedsheet", "wholesale bedsheet pakistan"
  ],
  authors: [{ name: "Universal Bedding", url: "https://universalbedding.pk" }],
  creator: "Universal Bedding",
  publisher: "Universal Bedding",
  metadataBase: new URL("https://universalbedding.pk"),
  alternates: { canonical: "https://universalbedding.pk" },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "https://universalbedding.pk",
    siteName: "Universal Bedding",
    title: "Universal Bedding | Premium Bedsheets & Comforter Sets in Pakistan",
    description: "Shop premium quality bedsheets, comforter sets and mattress covers. Crystal cotton fabric with lifetime colour guarantee. Fast delivery across Pakistan.",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Universal Bedding Pakistan" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Universal Bedding | Premium Bedsheets Pakistan",
    description: "Premium quality bedsheets, comforter sets and mattress covers in Pakistan.",
    images: ["/logo.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" }
  },
  verification: { google: "your-google-verification-code" }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://universalbedding.pk/#organization",
      name: "Universal Bedding",
      url: "https://universalbedding.pk",
      logo: { "@type": "ImageObject", url: "https://universalbedding.pk/logo.png" },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+92-329-0135661",
        contactType: "customer service",
        availableLanguage: ["English", "Urdu"],
        areaServed: "PK"
      },
      sameAs: ["https://wa.me/923290135661"]
    },
    {
      "@type": "WebSite",
      "@id": "https://universalbedding.pk/#website",
      url: "https://universalbedding.pk",
      name: "Universal Bedding",
      publisher: { "@id": "https://universalbedding.pk/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: "https://universalbedding.pk/search?q={search_term_string}" },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "Store",
      name: "Universal Bedding",
      url: "https://universalbedding.pk",
      telephone: "+92-329-0135661",
      priceRange: "Rs. 1000 - Rs. 10000",
      address: { "@type": "PostalAddress", addressCountry: "PK" },
      openingHours: "Mo-Su 09:00-21:00"
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className='font-nunito'>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CartProvider>
          <WishlistProvider>
          <Navbar />
          {children}
          <WhatsAppFloat />
          <Footer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}