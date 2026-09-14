import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import { MoonClient } from './MoonClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Moon, Sparkles, ShieldCheck } from 'lucide-react';

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
