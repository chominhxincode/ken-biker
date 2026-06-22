import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyBottomBar from "@/components/StickyBottomBar";
import { db } from "@/lib/db";

// Load Google Fonts
const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#151515",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// Generate dynamic metadata
export async function generateMetadata(): Promise<Metadata> {
  let settings;
  try {
    settings = await db.getSettings();
  } catch (e) {
    console.error("Error loading settings for metadata:", e);
  }

  const title = settings?.seo_default_title || "Ken Motor | Cửa Hàng Xe Máy Uy Tín Tại Đồng Tháp";
  const description = settings?.seo_default_description || "Ken Motor chuyên mua bán xe máy mới, xe máy đã qua sử dụng, xe tay ga, xe số, xe côn tay và xe điện. Hỗ trợ trả góp linh hoạt tại Đồng Tháp.";
  const faviconUrl = settings?.favicon_url || "/favicon.ico";

  return {
    title,
    description,
    metadataBase: new URL("https://kenmotor.vn"),
    alternates: {
      canonical: "/",
    },
    icons: {
      icon: faviconUrl,
      shortcut: faviconUrl,
      apple: faviconUrl
    },
    openGraph: {
      title,
      description,
      url: "/",
      siteName: "Ken Motor",
      images: [
        {
          url: settings?.logo_url || "/logo.png",
          width: 800,
          height: 600,
          alt: "Ken Motor Showroom",
        },
      ],
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch general settings on the server side
  let settings = {
    site_name: "Ken Motor",
    hotline: "0787990047",
    zalo_link: "https://zalo.me/0787990047",
    email: "mk.d.kaka@gmail.com",
    address: "Long Hưng, Đồng Tháp",
    logo_url: "/logo.png",
    favicon_url: "/favicon.ico"
  };

  try {
    const fetchedSettings = await db.getSettings();
    if (fetchedSettings && fetchedSettings.hotline) {
      settings = { ...settings, ...fetchedSettings };
    }
  } catch (error) {
    console.error("Error fetching database settings inside layout:", error);
  }

  const faviconUrl = settings.favicon_url || "/favicon.ico";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "name": settings.site_name,
    "image": settings.logo_url && settings.logo_url.startsWith('http') ? settings.logo_url : `https://kenmotor.vn${settings.logo_url || '/logo.png'}`,
    "@id": "https://kenmotor.vn/#dealer",
    "url": "https://kenmotor.vn",
    "telephone": settings.hotline,
    "email": settings.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": settings.address,
      "addressLocality": "Đồng Tháp",
      "addressCountry": "VN"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "07:30",
      "closes": "18:00"
    }
  };

  return (
    <html
      lang="vi"
      className={`${beVietnamPro.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href={faviconUrl} />
        <link rel="shortcut icon" href={faviconUrl} />
        <link rel="apple-touch-icon" href={faviconUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-brand-light text-brand-dark overflow-x-hidden selection:bg-brand-red selection:text-white pb-16 lg:pb-0">
        <CartProvider>
          {/* Main Shop Header */}
          <Header settings={settings} />
          
          {/* Main content body */}
          <main className="flex-grow flex flex-col">
            {children}
          </main>
          
          {/* Main Shop Footer */}
          <Footer settings={settings} />

          {/* Sticky Mobile Utility Controls */}
          <StickyBottomBar settings={settings} />
        </CartProvider>
      </body>
    </html>
  );
}
