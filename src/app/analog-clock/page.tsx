import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { AnalogClockClient } from './AnalogClockClient';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { Clock, Globe, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Accurate Online Analog Clock — Smooth Sweeping Second Hand & Watch Dial',
  description: 'Precision full-screen online analog clock featuring continuous sweeping second hand, multiple chronometer dial themes, date window, and global timezone selector.',
  alternates: {
    canonical: 'https://timenumbers.com/analog-clock',
  },
  openGraph: {
    title: 'Precision Online Analog Clock — TimeNumbers',
    description: 'Accurate analog watch dial with sweeping seconds, date aperture, and world time zones.',
    url: 'https://timenumbers.com/analog-clock',
  },
};

export default function AnalogClockPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Online Analog Clock',
    description: 'High-precision SVG analog clock with sweeping seconds and timezone support.',
    url: 'https://timenumbers.com/analog-clock',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://timenumbers.com' },
        { '@type': 'ListItem', position: 2, name: 'Analog Clock', item: 'https://timenumbers.com/analog-clock' },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Breadcrumbs items={[{"name":"Analog Watch Clock","url":"/analog-clock"}]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Breadcrumb & Intro */}
        <div className="space-y-4">
          <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-slate-200 font-medium">Analog Clock</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-2">
                <Clock className="w-3.5 h-3.5" />
                Precision Horology & Chronometer Dial
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Online Analog Clock
              </h1>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-lg">
              Engineered with SVG vector precision and continuous 60fps frame synchronization. Switch dial themes, toggle fullscreen presentation, and monitor any international time zone.
            </p>
          </div>
        </div>

        {/* Analog Clock Client */}
        <AnalogClockClient />

        {/* Hub Navigation */}
        <RelatedLinksHub title="Explore More Precision Clocks & Timers" />
      </div>
    </div>
  );
}
