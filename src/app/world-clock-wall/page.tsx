import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import { WorldClockWallClient } from './WorldClockWallClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { LayoutGrid, Monitor, ShieldCheck, Clock } from 'lucide-react';

export const metadata = buildPageMetadata(
  'Multi-Clock World Wall & Trading Floor Kiosk Dashboard',
  'Multi-display live world clock wall for trading desks, command centers, and offices. Features Swiss luxury analog dials, high-contrast digital clocks, and fullscreen kiosk display.',
  '/world-clock-wall'
);

const WALL_FAQS = [
  {
    question: "How do I use Fullscreen Kiosk Mode for office monitors or TV displays?",
    answer: "Click the Maximize icon in the top toolbar or press 'F' on your keyboard. The multi-clock wall will expand to fill the entire screen, hiding browser toolbars for a sleek ambient command center display."
  },
  {
    question: "Can I customize which cities appear on the wall?",
    answer: "Yes! Click the 'Add Clock' button to search and pin any of our 200+ global cities. You can also hover over any clock card and click the 'X' button to remove it, or choose from our quick presets (Financial Markets, Tech Capitals, 24-Hour Planetary Cycle)."
  },
  {
    question: "What is the difference between the Digital and Swiss Analog view?",
    answer: "The Digital mode provides high-contrast monospace time with seconds, AM/PM, and dates, ideal for high-speed trading and operations desks. The Swiss Analog mode renders animated watch dials with sweeping second hands and hour markers, perfect for executive conference rooms and lobby displays."
  },
  {
    question: "Are the clocks synchronized across all displayed cities?",
    answer: "Yes. Every clock on the wall ticks synchronously off a single synchronized NTP master reference timer, guaranteeing perfect second-hand alignment across all time zones."
  }
];

export default function WorldClockWallPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{"name":"World Clock Wall","url":"/world-clock-wall"}]} />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Home', url: '/' },
          { name: 'World Clock Wall', url: '/world-clock-wall' },
        ]}
      />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
            <Monitor className="w-3.5 h-3.5" />
            Operations Command Center & Trading Floor Wall
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Multi-Clock World Wall
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Monitor synchronized international clocks across financial capitals and global remote teams. Switch between Swiss luxury analog watch dials and high-contrast digital kiosk displays.
          </p>

          <div className="pt-2 flex flex-wrap gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Synchronized Sweep Second Hand</span>
            </div>
            <div className="flex items-center gap-2">
              <LayoutGrid className="w-4 h-4 text-cyan-400" />
              <span>Custom Multi-City Grid</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Fullscreen Kiosk Ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* World Clock Wall Client Studio */}
      <WorldClockWallClient />

      {/* FAQs */}
      <div className="pt-4">
        <FaqAccordion
          title="Frequently Asked Questions About World Clock Wall"
          subtitle="Learn how to configure multi-clock displays, kiosk mode, and trading floor dashboards."
          items={WALL_FAQS}
        />
      </div>

      {/* Related Links */}
      <RelatedLinksHub
        currentPath="/world-clock-wall"
        title="Explore Additional Global Time Tools"
        subtitle="Compare offsets, plan cross-border meetings, or convert time zones."
      />
    </div>
  );
}
