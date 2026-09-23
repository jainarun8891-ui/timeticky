import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import Link from 'next/link';
import { MoonClient } from './MoonClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Moon, Sparkles, ShieldCheck, MapPin, ArrowRight, Compass } from 'lucide-react';
import { HUB_PAGES_CUSTOM_CONTENT } from '@/lib/seo/hub-pages-custom-content';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';

const content = HUB_PAGES_CUSTOM_CONTENT['/moon'];

export const metadata = buildPageMetadata(
  content.title,
  content.description,
  '/moon'
);

const POPULAR_MOON_CITIES = [
  { name: 'Delhi', country: 'India', href: '/moon/delhi', desc: 'Current lunar phase, surface illumination % & moonrise times for Delhi, India' },
  { name: 'New York', country: 'United States', href: '/moon/new-york', desc: 'Tonight\'s lunar illumination, waxing/waning status & moonset times for NYC' },
  { name: 'London', country: 'United Kingdom', href: '/moon/london', desc: 'Greenwich meridian lunar illumination, moon age & next full moon for London' },
  { name: 'Tokyo', country: 'Japan', href: '/moon/tokyo', desc: 'Live lunar ephemeris, moon cycle calendar & illumination percentage for Tokyo' },
  { name: 'Sydney', country: 'Australia', href: '/moon/sydney', desc: 'Southern hemisphere inverted lunar perspective & coastal tidal ephemeris' },
  { name: 'Paris', country: 'France', href: '/moon/paris', desc: 'Central European lunar tracking, waxing crescent & night sky visibility' },
];

export default function MoonPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={[{ name: "Moon Phases & Cycles", url: "/moon" }]} />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Home', url: '/' },
          { name: 'Moon Phase', url: '/moon' },
        ]}
      />
      <JsonLd type="faq" data={content.faqs} />
      <JsonLd
        type="application"
        data={{
          name: "Live Moon Phase & Lunar Illumination",
          category: "UtilitiesApplication",
          description: content.description
        }}
      />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-blue-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
            <Moon className="w-3.5 h-3.5" />
            <span>Synodic Lunar Cycle Observatory</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {content.h1}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {content.description}
          </p>

          <div className="pt-2 flex flex-wrap gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Moon className="w-4 h-4 text-indigo-400" />
              <span>29.53-Day Synodic Ephemeris</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Live Surface Illumination %</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Next Full &amp; New Moon Countdown</span>
            </div>
          </div>
        </div>
      </div>

      <MoonClient />

      {/* Major City Lunar Guides */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Moon className="w-4 h-4 text-indigo-500" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Major Metropolises — Tonight&apos;s Lunar Illumination
            </h3>
          </div>
          <Link
            href="/sun"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Solar Times</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {POPULAR_MOON_CITIES.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    <MapPin className="w-3.5 h-3.5" />
                    {c.country}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                </div>
                <h4 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {c.name} Moon Ephemeris
                </h4>
                <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                  {c.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Deep Scientific Editorial Architecture */}
      <EditorialContentBlock content={content} badgeLabel="Lunar Orbit & Illumination Guide" />

      <div className="pt-4">
        <FaqAccordion
          title="Frequently Asked Questions About Lunar Phases"
          subtitle="Discover how the Moon's orbit, geometry, and gravitational pull shape our planet."
          items={content.faqs}
        />
      </div>

      <RelatedLinksHub
        currentPath="/moon"
        title="Explore Related Astronomy &amp; Time Tools"
        subtitle="View sunrise and sunset hours, check daylight saving rules, or explore global time zones."
      />
    </div>
  );
}
