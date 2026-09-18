import Script from 'next/script';
import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/config/site.config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Exact Time Now — What Time Is It? World Clock & Time Difference | TimeNumbers",
  description: "What time is it right now? Check exact time now with atomic clock precision. Live world clock, time zone converter, time difference calculator, and current local time across 500+ world cities.",
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
  },
  keywords: [
    "what time is it",
    "exact time now",
    "time difference between",
    "what time is it in",
    "current local time",
    "atomic clock online",
    "world clock",
    "time zone converter",
    "what time is it right now",
    "time in New York now",
    "time in London now",
    "time in Tokyo now",
    "time in Paris now",
    "convert est to gmt",
    "what time is us now",
    "daylight saving time 2026",
    "meeting planner time overlap",
    "time difference calculator",
    "UTC time now"
  ],
  authors: [{ name: "TimeNumbers Chronometry Team" }],
  openGraph: {
    title: `${siteConfig.name} - Exact World Time & Atomic Clock Platform`,
    description: "Sub-second NTP atomic time synchronization for 500+ world cities. Beautiful, accurate, and ad-free.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Exact World Time & Atomic Clock Platform`
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - Exact World Time`,
    description: "Atomic precision world clock and time difference platform.",
    images: [siteConfig.ogImage]
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <Script id="gt-theme-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: `(function() {
                try {
                  var saved = localStorage.getItem('gt_theme');
                  var html = document.documentElement;
                  if (saved === 'evening') {
                    html.classList.add('dark', 'evening');
                  } else if (saved === 'dark') {
                    html.classList.add('dark');
                    html.classList.remove('evening');
                  } else if (saved === 'daylight' || saved === 'light') {
                    html.classList.remove('dark', 'evening');
                  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    html.classList.add('dark');
                  } else {
                    html.classList.remove('dark', 'evening');
                  }
                } catch (e) {}
              })();
            `
          }}
        />
        <JsonLd type="website" />
        <JsonLd type="organization" />
      </head>
      <body className="min-h-screen bg-[#f0f4f9] dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 flex flex-col font-sans antialiased selection:bg-blue-600 selection:text-white transition-colors duration-200">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
