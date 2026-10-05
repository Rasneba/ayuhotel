import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { HOTEL, SITE_URL } from "@/lib/hotel";
import { OG_IMAGE } from "@/lib/images";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${HOTEL.name} | Hotel in Adama (Nazret), Ethiopia`,
    template: `%s | ${HOTEL.name}`,
  },
  description: HOTEL.description,
  keywords: [
    "Ayu International Hotel",
    "Ayu Int Hotel",
    "hotel in Adama",
    "Nazret hotel",
    "hotel in Adama Ethiopia",
    "Adama conference hall",
    "Adama wedding venue",
    "cheap hotel Adama",
    "hotel near Addis Ababa",
    "Oromia hotel",
  ],
  applicationName: HOTEL.name,
  authors: [{ name: HOTEL.name }],
  creator: HOTEL.name,
  category: "travel",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: HOTEL.name,
    title: `${HOTEL.name} — ${HOTEL.tagline}`,
    description: HOTEL.description,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: `${HOTEL.name}, Adama` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${HOTEL.name} — ${HOTEL.tagline}`,
    description: HOTEL.description,
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#121110",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Manrope:wght@300;400;500;600;700&display=swap"
        />
      </head>
      <body className="min-h-screen bg-cream-50 text-ink-900 antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
