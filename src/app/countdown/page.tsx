import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { HUB_PAGES_CUSTOM_CONTENT } from '@/lib/seo/hub-pages-custom-content';
import { CountdownGeneratorStudio } from './CountdownGeneratorStudio';

const content = HUB_PAGES_CUSTOM_CONTENT['/countdown'];

export const metadata: Metadata = buildPageMetadata(
  'Custom Event Countdown Generator & Live Timers',
  'Create custom live countdowns for weddings, birthdays, product launches, holidays, and milestones. Shareable links with dynamic Open Graph preview cards.',
  '/countdown'
);

export default function CountdownPage() {
  const applicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'TimeNumbers Custom Event Countdown Generator',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires modern web browser with JavaScript enabled',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Universal live event countdown generator with dynamic shareable routing, precision second timers, and celebration milestones.',
  };

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(applicationSchema) }}
      />
      <Breadcrumbs items={[{ name: 'Countdown Generator', url: '/countdown' }]} />

      {/* Main Interactive Studio */}
      <CountdownGeneratorStudio />

      {/* Featured Holiday Countdowns Grid */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 space-y-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Popular Global Holiday Countdowns
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <Link href="/countdown/new-year" className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200/70 dark:border-slate-700 transition-colors group">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block">January 1</span>
            <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">New Year</h3>
            <p className="text-xs text-slate-500 mt-1">Live countdown to the stroke of midnight across world timezones.</p>
          </Link>
          <Link href="/countdown/valentines-day" className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200/70 dark:border-slate-700 transition-colors group">
            <span className="text-xs font-bold text-pink-600 dark:text-pink-400 block">February 14</span>
            <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-pink-600 transition-colors">Valentine&apos;s Day</h3>
            <p className="text-xs text-slate-500 mt-1">Countdown to romantic celebrations, flowers, and special moments.</p>
          </Link>
          <Link href="/countdown/holi" className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200/70 dark:border-slate-700 transition-colors group">
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 block">Spring Equinox</span>
            <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors">Holi Festival of Colors</h3>
            <p className="text-xs text-slate-500 mt-1">Live countdown to the vibrant springtime festival of colors and joy.</p>
          </Link>
          <Link href="/countdown/halloween" className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200/70 dark:border-slate-700 transition-colors group">
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 block">October 31</span>
            <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-orange-600 transition-colors">Halloween</h3>
            <p className="text-xs text-slate-500 mt-1">Countdown to trick-or-treating and autumn harvest celebrations.</p>
          </Link>
          <Link href="/countdown/diwali" className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200/70 dark:border-slate-700 transition-colors group">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 block">Kartik Amavasya</span>
            <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">Diwali Festival of Lights</h3>
            <p className="text-xs text-slate-500 mt-1">Track days and hours until the auspicious celebration of lights.</p>
          </Link>
          <Link href="/countdown/thanksgiving" className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200/70 dark:border-slate-700 transition-colors group">
            <span className="text-xs font-bold text-amber-700 dark:text-amber-400 block">4th Thursday in Nov</span>
            <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-amber-700 transition-colors">Thanksgiving Day</h3>
            <p className="text-xs text-slate-500 mt-1">Countdown to American Thanksgiving feast and family reunions.</p>
          </Link>
          <Link href="/countdown/christmas" className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200/70 dark:border-slate-700 transition-colors group">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block">December 25</span>
            <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">Christmas Day</h3>
            <p className="text-xs text-slate-500 mt-1">Track days and hours until Christmas morning and holiday gatherings.</p>
          </Link>
        </div>
      </section>

      {/* Guide Section */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-10 shadow-sm space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Precision Real-Time Chronometer Architecture
        </h2>
        <p>
          Unlike naive JavaScript interval timers that drift when backgrounded or mobile screens go to sleep, TimeNumbers countdowns compute differences directly from high-precision epoch millisecond timestamps synchronized against atomic world clocks.
        </p>
        <p>
          Every custom countdown generates a permanent, shareable canonical link that accurately displays countdown intervals regardless of the viewer&apos;s geographic time zone.
        </p>
      </section>

      {/* Dynamic Event FAQ Accordion */}
      <FaqAccordion
        items={content.faqs}
        title="Frequently Asked Questions About Event Countdowns"
        subtitle="Time calculations, background execution, and dynamic sharing questions answered."
      />

      {/* Global Hub Navigation */}
      <RelatedLinksHub title="Explore More Countdowns & Calendars" />
    </main>
  );
}
