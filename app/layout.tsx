import type { Metadata, Viewport } from "next";
import { Bagel_Fat_One, Outfit } from "next/font/google";
import { SITE } from "@/lib/site";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

// Puffy display font for the accent word in the hero headline.
const bubble = Bagel_Fat_One({ subsets: ["latin"], weight: "400", variable: "--font-bubble", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.title,
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "online courses India",
    "₹1999 course",
    "Python course online",
    "web designing course",
    "cyber security course",
    "UI/UX design course",
    "digital marketing course",
    "live online classes",
    "Techcadd",
    "Virtual Academy",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0b0914",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the inline script below adds the "js" class before React hydrates.
    <html lang="en-IN" className={`${outfit.variable} ${bubble.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables scroll animations only when JS runs, so content is never hidden from crawlers. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
