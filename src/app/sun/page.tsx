import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import Link from 'next/link';
import { SunriseSunsetClient } from '@/components/tools/SunriseSunsetClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Sun, ArrowRight } from 'lucide-react';
import { HUB_PAGES_CUSTOM_CONTENT } from '@/lib/seo/hub-pages-custom-content';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';

const content = HUB_PAGES_CUSTOM_CONTENT['/sun'];

export const metadata = buildPageMetadata(
  content.title,
  content.description,
  '/sun'
);

const POPULAR_SOLAR_CITIES = [
  { name: 'Delhi', country: 'India', href: '/sun/delhi', desc: 'Tropical twilight, IST solar noon & seasonal day length variations' },
  { name: 'New York', country: 'United States', href: '/sun/new-york', desc: 'Eastern solar calendar, Manhattanhenge alignments & golden hour' },
  { name: 'London', country: 'United Kingdom', href: '/sun/london', desc: 'Greenwich meridian solar noon, BST summer solstice & winter dusk' },
  { name: 'Tokyo', country: 'Japan', href: '/sun/tokyo', desc: 'Early eastern dawn, JST solar apex & Mount Fuji silhouettes' },
  { name: 'Paris', country: 'France', href: '/sun/paris', desc: 'Long European summer twilight, CET daylight duration & solar zenith' },
  { name: 'Sydney', country: 'Australia', href: '/sun/sydney', desc: 'Southern hemisphere solar cycles, Bondi dawn & summer solstice' },
];

export default function SunIndexPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={[{ name: "Sun", url: "/sun" }]} />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Home', url: '/' },
          { name: 'Sunrise & Sunset', url: '/sun' },
        ]}
      />
      <JsonLd type="faq" data={content.faqs} />
      <JsonLd
        type="application"
        data={{
          name: "Sunrise & Sunset Times Calculator",
          category: "UtilitiesApplication",
          description: content.description
        }}
      />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-400/30">
            <Sun className="w-3.5 h-3.5" />
            <span>High-Precision NOAA Ephemeris Engine</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {content.h1}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {content.description}
          </p>
        </div>
      </div>

      <SunriseSunsetClient />

      {/* Popular Metropolises Fast Links */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Major World Solar Schedules
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Quick access to daily sunrise, twilight predictions, and solar noon in top metropolitan hubs.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {POPULAR_SOLAR_CITIES.map((c) => (
            <Link
              key={c.name}
              href={c.href}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-amber-50/50 dark:hover:bg-slate-700/50 border border-slate-100 dark:border-slate-800 transition-all group flex items-start justify-between gap-3"
            >
              <div>
                <span className="text-xs text-slate-400 block">{c.country}</span>
                <strong className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {c.name} Sun Schedule
                </strong>
                <p className="text-[11px] text-slate-500 mt-1 leading-normal">{c.desc}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
            </Link>
          ))}
        </div>
      </div>

      {/* Educational Guide Section */}
      <EditorialContentBlock content={content} badgeLabel="Planetary Solar Calculator" />

      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
        <FaqAccordion
          title="Frequently Asked Questions About Sunrise &amp; Sunset Times"
          subtitle="Learn how the NOAA ephemeris algorithms, atmospheric refraction, and twilight phases work."
          items={content.faqs}
        />
      </div>

      <RelatedLinksHub
        currentPath="/sun"
        title="Explore Related Solar &amp; Chronometry Tools"
        subtitle="Check golden hour windows, lunar illumination cycles, or convert time zones."
      />
    </div>
  );
}
