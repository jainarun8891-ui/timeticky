import React from 'react';
import { Metadata } from 'next';
import { AtomicClockClient } from './AtomicClockClient';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Radio, ShieldCheck, Zap, Globe, Cpu, Activity, Clock } from 'lucide-react';
import { HUB_PAGES_CUSTOM_CONTENT } from '@/lib/seo/hub-pages-custom-content';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';

const content = HUB_PAGES_CUSTOM_CONTENT['/atomic-clock'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/atomic-clock'
);

export default function AtomicClockPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={[{ name: 'Atomic Clock', url: '/atomic-clock' }]} />

      <JsonLd type="faq" data={content.faqs} />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
            <Radio className="w-3.5 h-3.5" />
            NIST &amp; BIPM Stratum-1 Synchronization
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            {content.h1}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {content.description}
          </p>

          <div className="pt-2 flex flex-wrap gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>9,192,631,770 Hz Resonance</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Stratum-1 Traceable</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-400" />
              <span>Real-Time Drift Diagnostics</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Atomic Clock */}
      <AtomicClockClient />

      {/* Educational Guide Section */}
      <EditorialContentBlock content={content} badgeLabel="Quantum Resonance Architecture" />

      {/* Real-World Critical Infrastructure Applications */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Why Critical Global Infrastructure Relies on Atomic Precision
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            How sub-microsecond synchronization powers modern communication, navigation, and finance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 space-y-2">
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Satellite Navigation (GPS/Galileo)
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              Nanosecond Triangulation
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              GPS receivers compute location by measuring the time-of-flight of radio signals transmitted by 4 or more atomic clock-equipped orbital satellites.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 space-y-2">
            <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Financial Markets (FinTech)
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              High-Frequency Order Sequencing
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Global regulatory frameworks (like MiFID II) require electronic financial exchanges to timestamp market orders within 100 microseconds of atomic reference time.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 space-y-2">
            <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              Telecommunications & Cloud
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              Distributed Database Consensus
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Distributed transactional databases (such as Google Spanner's TrueTime API) utilize GPS and atomic clocks to achieve global linearizable ACID consistency across datacenters.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FaqAccordion
        items={content.faqs}
        title="Frequently Asked Questions About Atomic Time & NTP Standards"
        subtitle="Explore the principles of quantum resonance, leap seconds, and optical lattice clocks."
      />

      {/* Related Hub */}
      <RelatedLinksHub
        currentPath="/atomic-clock"
        title="Explore Related Horology Tools & Standards"
        subtitle="Run diagnostic hardware clock benchmarks, view the UTC reference hub, or explore unix time."
      />

      {/* Schema.org WebApplication structured data */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "TimeNumbers Online Atomic Clock",
            "url": "https://www.timenumbers.com/atomic-clock",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "All",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })
        }}
      />
    </div>
  );
}
