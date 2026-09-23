import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { HUB_PAGES_CUSTOM_CONTENT } from '@/lib/seo/hub-pages-custom-content';
import { CountdownClient } from './CountdownClient';

const content = HUB_PAGES_CUSTOM_CONTENT['/countdown'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/countdown'
);

export default function CountdownPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      <Breadcrumbs items={[{"name":"Event Countdown","url":"/countdown"}]} />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Home', url: '/' },
          { name: 'Countdown Timer', url: '/countdown' },
        ]}
      />
      <JsonLd type="faq" data={content.faqs} />
      <JsonLd
        type="application"
        data={{
          name: content.h1,
          category: "UtilitiesApplication",
          description: content.description
        }}
      />

      <CountdownClient h1Title={content.h1} description={content.description} />

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
            <p className="text-xs text-slate-500 mt-1">Live countdown to the vibrant Hindu festival of colors and joy.</p>
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
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {content.headings[0]}
          </h2>
          {content.page_text.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
              {paragraph}
            </p>
          ))}
        </div>

        {content.headings.length > 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            {content.headings.slice(1).map((heading, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {heading}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  High-contrast full-screen projection, atomic time synchronization, and shareable event countdown links.
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FAQ Accordion */}
      <FaqAccordion
        items={content.faqs}
        title="Frequently Asked Questions About Event Countdowns"
        subtitle="Common questions regarding countdown accuracy, time zones, and holiday tracking."
      />

      {/* Hub */}
      <RelatedLinksHub title="Explore More Countdowns & Calendars" />
    </div>
  );
}
