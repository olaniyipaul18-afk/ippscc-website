import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BackToTop from "@/components/BackToTop";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#04090f",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.shortName} — ${site.tagline} | ${site.name}`,
    template: `%s | ${site.shortName} — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "police chaplain",
    "public safety chaplain",
    "law enforcement chaplaincy",
    "first responder support",
    "crisis chaplain",
    "disaster chaplaincy",
    "military chaplain",
    "IPPSCC",
    "chaplain corps",
    "spiritual care",
    "Nigeria chaplaincy",
    "Africa chaplaincy",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `${site.shortName} — ${site.tagline}`,
    description: site.description,
    images: [{ url: "/images/og-cover.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.shortName} — ${site.tagline}`,
    description: site.description,
    images: ["/images/og-cover.jpg"],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/manifest.webmanifest",
  alternates: { canonical: site.url },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}>
      <body>
        <JsonLd />
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <BackToTop />
      </body>
    </html>
  );
}
