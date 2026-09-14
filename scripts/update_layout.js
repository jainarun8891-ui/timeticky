const fs = require('fs');

fs.writeFileSync('src/app/layout.tsx', `
import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/config/site.config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: \`\${siteConfig.name} — \${siteConfig.tagline}\`,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website"
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
      <body className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans antialiased selection:bg-blue-500 selection:text-white">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
`, 'utf8');

// globals.css
fs.writeFileSync('src/app/globals.css', `
@import "tailwindcss";

@layer base {
  :root {
    --background: #f8fafc;
    --foreground: #0f172a;
  }
  .dark {
    --background: #020617;
    --foreground: #f8fafc;
  }
}

body {
  font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11', 'tnum';
  -webkit-font-smoothing: antialiased;
}

/* Tabular figures for clocks to prevent jitter */
.font-mono {
  font-variant-numeric: tabular-nums;
}
`, 'utf8');

console.log('Layout and globals.css updated');
