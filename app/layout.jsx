import "./globals.css";
import { Inter } from "next/font/google";
import Script from "next/script";
import SessionProvider from "@/components/common/SessionProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

/* =========================
   SEO METADATA
========================= */
export const metadata = {
  title: {
    default: "Smart Service Marketplace | Book Trusted Local Services",
    template: "%s | Smart Service Marketplace",
  },
  description:
    "Book trusted local services like AC repair, plumbing, cleaning, and electrical work online in India.",
  keywords: [
    "local services",
    "service marketplace",
    "AC repair",
    "plumber near me",
    "home services",
    "online service booking",
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://smartserviceplace.vercel.app",
  },
  openGraph: {
    title: "Smart Service Marketplace",
    description:
      "Book verified local service professionals online — fast and affordable.",
    url: "https://smartserviceplace.vercel.app",
    siteName: "Smart Service Marketplace",
    images: [
      {
        url: "https://smartserviceplace.vercel.app/assets/preview.png",
        width: 1200,
        height: 630,
        alt: "Smart Service Marketplace",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Service Marketplace",
    description:
      "Book trusted local services online with ease.",
    images: ["https://smartserviceplace.vercel.app/assets/preview.png"],
  },
};

/* =========================
   ROOT LAYOUT
========================= */
export default function RootLayout({ children }) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Smart Service Marketplace",
    url: "https://smartserviceplace.vercel.app",
    logo: "https://smartserviceplace.vercel.app/favicon.svg",
    description:
      "Online platform to book trusted local services such as AC repair, plumbing, cleaning, and electrical services.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    areaServed: "India",
  };

  return (
    <html lang="en">
      <head>
        {/* Google Analytics / Google Tag */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>

        {/* JSON-LD Schema */}
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdSchema),
          }}
        />

        {/* Social image meta tags (SEO) */}
        <meta property="og:image" content="https://smartserviceplace.vercel.app/assets/preview.png" />
        <meta property="og:image:alt" content="Smart Service Marketplace" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="https://smartserviceplace.vercel.app/assets/preview.png" />
        <meta name="twitter:image:alt" content="Smart Service Marketplace" />
      </head>

      <body className={inter.className}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
