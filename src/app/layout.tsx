import Script from 'next/script';
import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/config/site.config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { AnalyticsTracker } from "@/components/analytics/AnalyticsTracker";

export const metadata: Metadata = {
  title: "Exact Time Now — What Time Is It Right Now? Live Atomic Clock & World Time",
  description: "See the exact time right now down to the millisecond. Compare current local time across 500+ world cities, check device clock drift against atomic time, and plan international meetings effortlessly.",
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
    description: "Millisecond-calibrated civil time synchronization for 500+ world cities. Beautiful, fast, and accurate.",
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
      { url: "/favicon.svg?v=2", type: "image/svg+xml" },
      { url: "/favicon.ico?v=2", sizes: "any" },
      { url: "/icon-192.png?v=2", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png?v=2", sizes: "512x512", type: "image/png" }
    ],
    apple: [
      { url: "/apple-touch-icon.png?v=2", sizes: "180x180", type: "image/png" }
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
        {/* Critical Performance Hints: Early Preconnects */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* LCP Hero Image Preload Discovery (fetchPriority high for sub-1s LCP) */}
        <link
          rel="preload"
          as="image"
          href="/images/paris_hero.webp"
          type="image/webp"
          // @ts-ignore
          fetchPriority="high"
        />

        {/* Non-Render-Blocking Webfonts with swap display */}
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700;800;900&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700;800;900&display=swap"
        />

        <script
          src="https://quge5.com/88/tag.min.js"
          data-zone="289432"
          async
          data-cfasync="false"
        />
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
        {/* Google tag (gtag.js) - Defer to browser idle time to free main thread */}
        {siteConfig.googleAnalyticsId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.googleAnalyticsId}`}
              strategy="lazyOnload"
            />
            <Script id="google-analytics" strategy="lazyOnload">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${siteConfig.googleAnalyticsId}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className="min-h-screen bg-[#f0f4f9] dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 flex flex-col font-sans antialiased selection:bg-blue-600 selection:text-white transition-colors duration-200">
        <AnalyticsTracker />
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
