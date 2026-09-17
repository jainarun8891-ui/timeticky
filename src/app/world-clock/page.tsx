import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import { WorldClockClient } from './WorldClockClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Globe, Clock, ShieldCheck, Share2 } from 'lucide-react';

export const metadata = buildPageMetadata(
  'World Clock — Current Local Time',
  'Monitor live atomic clocks across multiple world cities. Add favorite locations, reorder clocks, copy times, view day/night status, and share your personalized world clock setup.',
  '/world-clock'
);

const WORLD_CLOCK_FAQS = [
  {
    question: "How do I save my favorite world cities?",
    answer: "Click the 'Add City' button and select any location from our global directory. Your cities are preserved in your browser's private local storage automatically with zero registration or tracking."
  },
  {
    question: "Can I share my custom world clock layout with my team?",
    answer: "Yes! Click the 'Share' button in the toolbar. It generates a shareable link that encodes your selected cities directly in the URL query string, allowing colleagues to open the exact same multi-clock dashboard."
  },
  {
    question: "Are the clocks synchronized across all displayed cities?",
    answer: "Yes. All clocks tick simultaneously using atomic reference timestamps and canonical IANA timezone database offsets, accurate to the millisecond."
  }
];

export default function WorldClockPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{"name":"World Clock","url":"/world-clock"}]} />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Home', url: '/' },
          { name: 'World Clock', url: '/world-clock' },
        ]}
      />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
            <Globe className="w-3.5 h-3.5" />
            Synchronized Multi-Location Dashboard
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Personal World Clock
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Track current local time across your team's locations worldwide. Add, reorder, and compare cities with live seconds and day/night indicators.
          </p>

          <div className="pt-2 flex flex-wrap gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Zero-Polling Client Engine</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Local Storage Privacy</span>
            </div>
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-amber-400" />
              <span>1-Click Team Sharing</span>
            </div>
          </div>
        </div>
      </div>

      <WorldClockClient />

      <div className="pt-4">
        <FaqAccordion
          title="Frequently Asked Questions About World Clock"
          subtitle="Tips on organizing international time zones and sharing clock configurations."
          items={WORLD_CLOCK_FAQS}
        />
      </div>

      <RelatedLinksHub
        currentPath="/world-clock"
        title="Explore Related Horology Tools"
        subtitle="Compare times, plan cross-border meetings, and test clock accuracy."
      />
    </div>
  );
}
