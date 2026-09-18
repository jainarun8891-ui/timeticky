import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import Link from 'next/link';
import { ALL_IANA_TIMEZONES } from '@/lib/time/iana-database';
import { COMMON_TIMEZONE_ABBREVIATIONS } from '@/lib/time/timezone-lookup';
import { TimeZonesDirectoryClient } from './TimeZonesDirectoryClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Globe, ShieldCheck, Cpu, Compass, Clock, ArrowRight } from 'lucide-react';

export const metadata = buildPageMetadata(
  'World Time Zones List — Current Time & Global UTC Offsets',
  'Browse the complete database of 400+ canonical IANA world time zones with real-time digital clocks, UTC offsets, daylight saving status, and continent search.',
  '/time-zones'
);

const TIMEZONE_PAGE_FAQS = [
  {
    question: "How many official time zones are there in the world?",
    answer: "While Earth is divided into 24 standard 15-degree longitudinal hourly time zones, there are currently over 400 canonical IANA (Olson) time zone identifiers. These account for daylight saving rules, half-hour and 45-minute offsets (such as India UTC+5:30 or Nepal UTC+5:45), and historical geopolitical shifts."
  },
  {
    question: "What is the difference between UTC offset and an IANA time zone identifier?",
    answer: "A UTC offset (like UTC-5 or UTC+1) simply indicates how many hours a location is ahead or behind Coordinated Universal Time at a specific moment. An IANA identifier (like America/New_York or Europe/Paris) represents a geographical boundary that tracks automatic daylight saving transitions and historical time changes."
  },
  {
    question: "Which countries have the most time zones?",
    answer: "France holds the record for the most time zones (12, or 13 including Antarctic claims) due to its overseas departments and territories across all oceans. The United States and Russia follow with 11 time zones each, and the United Kingdom has 9 across its sovereign territories."
  },
  {
    question: "Are these times synchronized with atomic clocks?",
    answer: "Yes. TimeNumbers calculates all times using high-precision NTP (Network Time Protocol) reference time cross-checked with the canonical IANA tz database release, accurate to within fractions of a millisecond."
  }
];

export default function TimeZonesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{"name":"Time Zones Directory","url":"/time-zones"}]} />
      {/* Schema.org Breadcrumbs */}
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Home', url: '/' },
          { name: 'Time Zones Directory', url: '/time-zones' },
        ]}
      />
      <JsonLd type="faq" data={TIMEZONE_PAGE_FAQS} />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
            <Globe className="w-3.5 h-3.5" />
            Global IANA Time Zone Observatory
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Canonical World Time Zones
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Explore all <strong>{ALL_IANA_TIMEZONES.length} canonical IANA time zones</strong> across every continent. Filter by region, offset, and city name with live precision atomic timekeeping.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-300">
            <Link href="/utc" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-500/30 hover:bg-blue-500/50 text-white font-semibold transition-colors border border-blue-400/40">
              <Clock className="w-3.5 h-3.5 text-cyan-300" />
              <span>Coordinated Universal Time (UTC) Standard →</span>
            </Link>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>419 Canonical Zones</span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Sub-Millisecond NTP Precision</span>
            </div>
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>195+ Countries Covered</span>
            </div>
          </div>
        </div>
      </div>

      {/* Major Global Time Zone Abbreviations Hub */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              Major Global Time Zone Abbreviation Guides
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Explore primary civil and military time zones with dedicated clock pages, DST shift rules, and city listings.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-slate-400">
            {Object.keys(COMMON_TIMEZONE_ABBREVIATIONS).length} Major Zones
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
          {Object.entries(COMMON_TIMEZONE_ABBREVIATIONS).map(([slug, def]) => (
            <Link
              key={slug}
              href={`/timezone/${slug}`}
              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200/70 dark:border-slate-700/80 transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono font-black text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {def.abbr}
                </span>
                <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-1.5 py-0.5 rounded">
                  {def.offsetStr}
                </span>
              </div>
              <span className="text-[11px] text-slate-400 dark:text-slate-400 truncate mt-1">
                {def.primaryName}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Major Metropolitan IANA Time Zones */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-600" />
              Major Metropolitan Time Zone Guides (IANA)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Deep-dive IANA astronomical time zones for the world's most populous and financially significant metropolises.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-slate-400">
            Canonical Olson Database
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
          {[
            { name: 'Kolkata (IST)', slug: 'asia-kolkata', offset: 'UTC +5:30' },
            { name: 'New York (ET)', slug: 'america-new-york', offset: 'UTC -5' },
            { name: 'London (GMT)', slug: 'europe-london', offset: 'UTC +0' },
            { name: 'Paris (CET)', slug: 'europe-paris', offset: 'UTC +1' },
            { name: 'Tokyo (JST)', slug: 'asia-tokyo', offset: 'UTC +9' },
            { name: 'Dubai (GST)', slug: 'asia-dubai', offset: 'UTC +4' },
            { name: 'Singapore (SGT)', slug: 'asia-singapore', offset: 'UTC +8' },
            { name: 'Sydney (AEST)', slug: 'australia-sydney', offset: 'UTC +10' },
            { name: 'Los Angeles (PT)', slug: 'america-los-angeles', offset: 'UTC -8' },
            { name: 'Chicago (CT)', slug: 'america-chicago', offset: 'UTC -6' },
            { name: 'Toronto (ET)', slug: 'america-toronto', offset: 'UTC -5' },
            { name: 'Berlin (CET)', slug: 'europe-berlin', offset: 'UTC +1' },
          ].map((item) => (
            <Link
              key={item.slug}
              href={`/timezone/${item.slug}`}
              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200/70 dark:border-slate-700/80 transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {item.name}
                </span>
                <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-1 py-0.5 rounded">
                  {item.offset}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 truncate mt-1">
                /timezone/{item.slug}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Interactive Directory Client Component */}
      <TimeZonesDirectoryClient initialZones={ALL_IANA_TIMEZONES} />

      {/* FAQs Section */}
      <div className="pt-4">
        <FaqAccordion
          title="Frequently Asked Questions About Global Time Zones"
          subtitle="Learn how global time zones, daylight saving offsets, and IANA standards operate."
          items={TIMEZONE_PAGE_FAQS}
        />
      </div>

      {/* Ubiquitous Related Links */}
      <RelatedLinksHub
        currentPath="/time-zones"
        title="Explore More Horology Tools & Global Clocks"
        subtitle="Discover atomic clock synchronization, meeting planners, and visual time difference matrices."
      />
    </div>
  );
}
