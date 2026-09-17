import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import Link from 'next/link';
import { MoonClient } from './MoonClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Moon, Sparkles, ShieldCheck, MapPin, ArrowRight, Compass } from 'lucide-react';

export const metadata = buildPageMetadata(
  'Moon Phase Today — Current Lunar Illumination & Upcoming Moon Phases',
  'Check today\'s exact moon phase, surface illumination percentage, lunar age in days, and countdown to the next Full Moon and New Moon.',
  '/moon'
);

const MOON_FAQS = [
  {
    question: "How long does a complete lunar cycle take?",
    answer: "A synodic lunar month averages 29.530588 days (29 days, 12 hours, 44 minutes), progressing through 8 phases from New Moon to Full Moon and back."
  },
  {
    question: "What is the difference between waxing and waning?",
    answer: "'Waxing' means the illuminated portion of the Moon visible from Earth is growing each day (from New Moon to Full Moon). 'Waning' means the illuminated portion is shrinking (from Full Moon back to New Moon)."
  }
];

const POPULAR_MOON_CITIES = [
  { name: 'Delhi', country: 'India', href: '/moon/delhi', desc: 'Current lunar phase, surface illumination % & moonrise times for Delhi, India' },
  { name: 'New York', country: 'United States', href: '/moon/new-york', desc: 'Tonight\'s lunar illumination, waxing/waning status & moonset times for NYC' },
  { name: 'London', country: 'United Kingdom', href: '/moon/london', desc: 'Greenwich meridian lunar illumination, moon age & next full moon for London' },
  { name: 'Tokyo', country: 'Japan', href: '/moon/tokyo', desc: 'Live lunar ephemeris, moon cycle calendar & illumination percentage for Tokyo' },
];

export default function MoonPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{"name":"Moon Phases & Cycles","url":"/moon"}]} />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Home', url: '/' },
          { name: 'Moon Phases', url: '/moon' },
        ]}
      />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-blue-950 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
            <Moon className="w-3.5 h-3.5" />
            Synodic Lunar Cycle Observatory
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Moon Phases & Illumination
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Real-time calculations for lunar phase progression, percentage illumination, moon age, and upcoming milestone dates.
          </p>

          <div className="pt-2 flex flex-wrap gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Moon className="w-4 h-4 text-indigo-400" />
              <span>29.5-Day Synodic Ephemeris</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Live Surface Illumination %</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Next Full & New Moon Dates</span>
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
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Major Metropolises — Tonight's Lunar Illumination
            </h2>
          </div>
          <Link
            href="/astronomy"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Astronomy Lab</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {c.name}
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                  {c.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="pt-4">
        <FaqAccordion
          title="Frequently Asked Questions About Lunar Phases"
          subtitle="Discover how the Moon's orbit and geometry create optical phases."
          items={MOON_FAQS}
        />
      </div>

      <RelatedLinksHub
        currentPath="/moon"
        title="Explore Related Astronomy & Time Tools"
        subtitle="View sunrise and sunset hours, check daylight saving rules, or explore global time zones."
      />
    </div>
  );
}
