import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { TimerSuiteClient } from './TimerSuiteClient';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { Timer, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Online Timer — Full Screen Accurate Countdown Clock with Alarm Sound',
  description: 'Free online countdown timer with loud audio alarm, full-screen mode, and background tab accuracy. Shortcut presets for 1 min, 5 min, 10 min, 15 min, 30 min, and 1 hour.',
  alternates: {
    canonical: 'https://globaltime.org/timer',
  },
  openGraph: {
    title: 'Online Timer — GlobalTime',
    description: 'Accurate online countdown timer with audio chime and presets.',
    url: 'https://globaltime.org/timer',
  },
};

export default function TimerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Online Timer',
    description: 'Precision online countdown timer with audio chime and background accuracy.',
    url: 'https://globaltime.org/timer',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://globaltime.org' },
        { '@type': 'ListItem', position: 2, name: 'Timer', item: 'https://globaltime.org/timer' },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Breadcrumbs items={[{"name":"Countdown Timer","url":"/timer"}]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Navigation Breadcrumbs & Header */}
        <div className="space-y-4">
          <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-slate-200 font-medium">Timer</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-2">
                <Timer className="w-3.5 h-3.5" />
                Precision Chronometer Countdown
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Online Countdown Timer
              </h1>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm">
              Engineered with absolute epoch timestamp math. Continues running with zero time drift even if the browser tab sleeps.
            </p>
          </div>
        </div>

        {/* Timer Suite Client */}
        <TimerSuiteClient initialSeconds={300} title="5 Minute Timer" />

        {/* Hub Navigation */}
        <RelatedLinksHub title="Explore More Precision Clocks & Timers" />
      </div>
    </div>
  );
}
