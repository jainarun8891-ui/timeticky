import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import { TimeConverterClient } from './TimeConverterClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { ArrowLeftRight, Clock, ShieldCheck, Share2 } from 'lucide-react';

export const metadata = buildPageMetadata(
  'Interactive Time Zone Converter — Convert Times Across Unlimited Cities',
  'Convert time across unlimited global locations simultaneously. Features an interactive 24-hour drag slider, business hours highlighting, date change indicators, and shareable URLs.',
  '/time-converter'
);

const CONVERTER_FAQS = [
  {
    question: "How does the interactive time slider work?",
    answer: "Dragging the hour slider instantly adjusts the source time and calculates the corresponding local time for every destination city in real time without refreshing or sending network requests."
  },
  {
    question: "How are date changes indicated across time zones?",
    answer: "Whenever a converted time crosses midnight into the next or previous day, GlobalTime displays a '+1 Day (Tomorrow)' or '-1 Day (Yesterday)' indicator so you never miss cross-border deadlines."
  },
  {
    question: "How do I share a converted schedule with clients or team members?",
    answer: "Click the 'Share' button in the toolbar. The full configuration (source city, selected hour, and destination cities) is encoded into the URL, allowing recipients to view the exact conversion directly."
  }
];

export default function TimeConverterPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{"name":"Time Converter","url":"/time-converter"}]} />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Home', url: '/' },
          { name: 'Time Converter', url: '/time-converter' },
        ]}
      />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            Universal Multi-City Converter
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Time Zone Converter
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Convert any date and hour across multiple world cities simultaneously. Highlights working hours, calendar day shifts, and daylight saving transitions.
          </p>

          <div className="pt-2 flex flex-wrap gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Interactive 24-Hour Slider</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Business Working Hours Indicator</span>
            </div>
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-amber-400" />
              <span>Shareable URL State</span>
            </div>
          </div>
        </div>
      </div>

      <TimeConverterClient />

      <div className="pt-4">
        <FaqAccordion
          title="Frequently Asked Questions About Time Zone Conversion"
          subtitle="Tips on coordinating global team schedules and handling daylight saving changes."
          items={CONVERTER_FAQS}
        />
      </div>

      <RelatedLinksHub
        currentPath="/time-converter"
        title="Explore Related Horology Tools"
        subtitle="Compare times, plan cross-border meetings, or view the world clock wall."
      />
    </div>
  );
}
