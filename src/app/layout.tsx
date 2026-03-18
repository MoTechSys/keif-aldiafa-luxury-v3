import type { Metadata, Viewport } from "next";
import { Cairo, Tajawal } from "next/font/google";
import "@/styles/globals.css";
import {
  generateLocalBusinessSchema,
  generateWebSiteSchema,
  generateOrganizationSchema,
} from "@/lib/schema";

const SITE_URL = "https://keifaldiafa.com";

// ═══════════════════════════════════════════════════════════════════════════
// TYPOGRAPHY PROTOCOL - GLM LUXURY
// CAIRO: Strictly for Headings (H1-H6) - Weights 700-900
// TAJAWAL: Strictly for Body text - Weights 400-500
// Reduced font weights to minimize download size (~30% smaller)
// ═══════════════════════════════════════════════════════════════════════════

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["700", "800", "900"],
  display: "swap",
  variable: "--font-cairo",
  preload: true,
});

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-tajawal",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "كيف الضيافة | خدمات الضيافة الفاخرة في المملكة العربية السعودية",
    template: "%s | كيف الضيافة",
  },
  description:
    "شركة كيف الضيافة - الخيار الأمثل لخدمات الضيافة الفاخرة في السعودية. نقدم قهوة عربية أصيلة، شاي فاخر، مضيفون ومضيفات محترفات، تقديمات راقية لجميع المناسبات والفعاليات منذ 2016.",
  keywords: [
    "كيف الضيافة",
    "خدمات الضيافة",
    "ضيافة فاخرة",
    "قهوة سعودية",
    "ضيافة الرياض",
    "مضيفون",
    "مضيفات",
    "تقديمات فاخرة",
    "معدات ضيافة",
    "حفلات",
    "مناسبات",
    "ضيافة السعودية",
    "ضيافة فاخرة السعودية",
    "قهوة عربية الرياض",
    "مضيفات محترفات",
    "خدمات ضيافة جدة",
    "ضيافة مناسبات الدمام",
    "Keif Al-Diafa",
    "Saudi hospitality",
    "luxury catering",
  ],
  authors: [{ name: "شركة كيف الضيافة", url: SITE_URL }],
  creator: "كيف الضيافة",
  publisher: "كيف الضيافة",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
    languages: {
      "ar-SA": SITE_URL,
    },
  },
  openGraph: {
    type: "website",
    siteName: "كيف الضيافة",
    locale: "ar_SA",
    title: "كيف الضيافة | خدمات الضيافة الفاخرة في المملكة العربية السعودية",
    description:
      "شركة كيف الضيافة - الخيار الأمثل لخدمات الضيافة الفاخرة في السعودية. قهوة عربية، مضيفون محترفون، تقديمات راقية.",
    url: SITE_URL,
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "كيف الضيافة - خدمات الضيافة الفاخرة في المملكة العربية السعودية",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "كيف الضيافة | خدمات الضيافة الفاخرة في المملكة",
    description:
      "شركة كيف الضيافة - الخيار الأمثل لخدمات الضيافة الفاخرة في السعودية",
    images: [`${SITE_URL}/og-image.jpg`],
    creator: "@keifdiafa",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "48x48" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "كيف الضيافة",
    "mobile-web-app-capable": "yes",
    "application-name": "كيف الضيافة",
    "format-detection": "telephone=no",
  },
  category: "hospitality",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#121212" },
    { media: "(prefers-color-scheme: light)", color: "#121212" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`scroll-smooth ${cairo.variable} ${tajawal.variable}`}
    >
      <head>
        {/* Preconnect to critical origins for faster font/resource loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://wa.me" />
        
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationSchema()),
          }}
        />
        {/* LocalBusiness Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateLocalBusinessSchema()),
          }}
        />
        {/* WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateWebSiteSchema()),
          }}
        />
      </head>
      <body className="bg-[#121212] text-[#E0E0E0] antialiased">
        {/* Skip to main content - Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:right-4 focus:z-[100] focus:px-6 focus:py-3 focus:rounded-full focus:text-[#0A0A0A] focus:font-bold focus:outline-none"
          style={{ background: "linear-gradient(135deg, #D4AF37, #F9E488)" }}
        >
          تخطي إلى المحتوى الرئيسي
        </a>
        {children}
      </body>
    </html>
  );
}
