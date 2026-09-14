const fs = require('fs');

// QuoteCard.tsx
fs.writeFileSync('src/components/dashboard/QuoteCard.tsx', `
import React from 'react';

export function QuoteCard() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[28px] border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 sm:p-7 flex flex-col justify-between transition-all hover:shadow-md">
      <div className="text-4xl text-blue-500/30 font-serif leading-none">
        “
      </div>

      <div className="my-auto py-4">
        <blockquote className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-snug tracking-tight">
          “Time is a shared experience.”
        </blockquote>
        <div className="w-10 h-1 bg-blue-600 rounded-full my-3" />
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
          Different places. A more connected world.
        </p>
      </div>

      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 uppercase tracking-widest font-bold">
        Global Perspective
      </div>
    </div>
  );
}
`, 'utf8');

// Footer.tsx
fs.writeFileSync('src/components/layout/Footer.tsx', `
import React from 'react';
import Link from 'next/link';
import { Globe } from 'lucide-react';
import { siteConfig } from '@/lib/config/site.config';

export function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 mt-20 py-10 transition-colors text-xs text-slate-500 dark:text-slate-400">
      <div className="max-w-[1720px] w-full mx-auto px-4 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-xs">
            <Globe className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-sm text-slate-900 dark:text-white">
            {siteConfig.name}
          </span>
          <span className="text-slate-400 text-xs hidden sm:inline">
            — {siteConfig.tagline}
          </span>
        </div>

        {/* Center: Essential Links */}
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2 font-semibold">
          <Link href="/time-zones" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Time Zones
          </Link>
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            World Clock
          </Link>
          <Link href="/compare" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Compare Time
          </Link>
          <Link href="/meeting-planner" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Meeting Planner
          </Link>
          <Link href="/countdown" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Countdown
          </Link>
          <Link href="/data-sources" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Data Sources
          </Link>
          <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            About
          </Link>
        </div>

        {/* Right: Tagline */}
        <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 text-center md:text-right">
          Accuracy • Simplicity • A Brighter, More Connected Tomorrow
        </div>
      </div>
    </footer>
  );
}
`, 'utf8');

console.log('QuoteCard and Footer upgraded');
