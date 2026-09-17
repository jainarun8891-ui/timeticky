import Script from 'next/script';
import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/config/site.config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Exact Time Now — World Clock, Current Time & Atomic Clock | TimeNumbers",
  description: "What time is it right now? Check exact time now with atomic clock precision. Live world clock, time zone converter, international meeting planner, and current local time across 500+ world cities.",
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
  },
  keywords: [
    "exact time now",
    "atomic clock online",
    "world clock",
    "current local time",
    "time in Paris now",
    "time in New York now",
    "time in Tokyo now",
    "time zone converter",
    "meeting planner time overlap",
    "time difference calculator",
    "UTC time now",
    "GMT to EST converter",
    "daylight saving time 2025"
  ],
  authors: [{ name: "TimeNumbers Chronometry Team" }],
  openGraph: {
    title: `${siteConfig.name} - Exact World Time & Atomic Clock Platform`,
    description: "Sub-second NTP atomic time synchronization for 500+ world cities. Beautiful, accurate, and ad-free.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - Exact World Time`,
    description: "Atomic precision world clock and time difference platform."
  },
  icons: {
    icon: "/favicon.ico"
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
