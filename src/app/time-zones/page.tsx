import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import { ALL_IANA_TIMEZONES } from '@/lib/time/iana-database';
import { TimeZonesDirectoryClient } from './TimeZonesDirectoryClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Globe, ShieldCheck, Cpu, Compass } from 'lucide-react';

export const metadata = buildPageMetadata(
  'World Time Zones List — Global UTC Offsets',
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

          <div className="pt-2 flex flex-wrap gap-6 text-xs text-slate-300">
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
