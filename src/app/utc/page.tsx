import React from 'react';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { Clock, Globe, ShieldCheck, Zap, Compass, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = buildPageMetadata(
  'UTC Time Now: Exact Current Universal Time & Clock',
  'What time is it in UTC right now? Live atomic clock showing exact Coordinated Universal Time (UTC/GMT) with seconds, date, UTC offsets, and time difference converter.',
  '/utc'
);

export default function UtcPage() {
  const utcNow = new Date();
  const utcString = utcNow.toUTCString();
  const isoString = utcNow.toISOString();

  const utcOffsetList = [
    { name: 'UTC-8 (PST)', city: 'Los Angeles', offset: '-8 hrs', link: '/utc-offset/utc-minus-8' },
    { name: 'UTC-5 (EST)', city: 'New York', offset: '-5 hrs', link: '/utc-offset/utc-minus-5' },
    { name: 'UTC+0 (GMT/WET)', city: 'London', offset: '0 hrs', link: '/utc-offset/utc-plus-0' },
    { name: 'UTC+1 (CET)', city: 'Paris / Berlin', offset: '+1 hr', link: '/utc-offset/utc-plus-1' },
    { name: 'UTC+5:30 (IST)', city: 'New Delhi / Mumbai', offset: '+5.5 hrs', link: '/utc-offset/utc-plus-5-30' },
    { name: 'UTC+8 (CST/SGT)', city: 'Singapore / Beijing', offset: '+8 hrs', link: '/utc-offset/utc-plus-8' },
    { name: 'UTC+9 (JST)', city: 'Tokyo / Seoul', offset: '+9 hrs', link: '/utc-offset/utc-plus-9' },
    { name: 'UTC+10 (AEST)', city: 'Sydney / Melbourne', offset: '+10 hrs', link: '/utc-offset/utc-plus-10' },
  ];

  const faqs = [
    {
      question: "Is UTC the same as Greenwich Mean Time (GMT)?",
      answer: "In everyday civilian use, UTC and GMT share the exact same current time (0 hours offset). However, scientifically, GMT is an astronomical time standard measured by Earth's solar rotation at the Royal Observatory in Greenwich, London, whereas UTC is an ultra-precise atomic time standard maintained by hundreds of caesium atomic clocks worldwide."
    },
    {
      question: "Does UTC observe Daylight Saving Time (DST)?",
      answer: "No. Coordinated Universal Time never changes for Daylight Saving Time. It remains fixed and continuous year-round. Countries that observe daylight saving adjust their relative offset from UTC (for example, London switches from UTC+0 in winter to UTC+1 British Summer Time in summer)."
    },
    {
      question: "Why do aviation, military, and computing systems rely on UTC?",
      answer: "Aircraft, space missions, financial markets, and internet servers operate across multiple longitudinal time zones simultaneously. Using a single, universal time baseline eliminates ambiguity when scheduling international flights, executing cross-border banking settlements, or sequencing distributed database transaction logs."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <Breadcrumbs items={[{ name: 'Coordinated Universal Time (UTC)', url: '/utc' }]} />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Home', url: '/' },
          { name: 'UTC Time Now', url: '/utc' },
        ]}
      />
      <JsonLd type="faq" data={faqs} />

      {/* Hero Header */}
      <div className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold">
          <Globe className="w-3.5 h-3.5" />
          <span>The Planetary Primary Time Standard</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Coordinated Universal Time (UTC)
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl">
          The international horological foundation that regulates world clocks, global civil time zones, GPS navigation, and internet network synchronization.
        </p>
      </div>

      {/* Live Clock Card */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-blue-900/40 relative overflow-hidden text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold">
          <Zap className="w-3.5 h-3.5" /> Zero Daylight Saving Shift · Constant Reference
        </div>
        
        <div className="text-3xl sm:text-5xl lg:text-6xl font-mono font-black tracking-tight text-white py-2">
          {utcString.split(' ').slice(4, 5)[0] || '00:00:00'} <span className="text-blue-400 text-xl sm:text-3xl">UTC</span>
        </div>

        <div className="text-sm sm:text-base text-slate-300 font-medium">
          {utcString.split(' ').slice(0, 4).join(' ')}
        </div>

        <div className="pt-2 text-xs font-mono text-slate-400 bg-slate-950/60 py-2 px-4 rounded-xl inline-block border border-slate-800">
          ISO 8601: <span className="text-blue-300">{isoString}</span>
        </div>
      </div>

      {/* Informative Educational Sections */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-10 shadow-sm space-y-8 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            1. What is Coordinated Universal Time?
          </h2>
          <p>
            Coordinated Universal Time (abbreviated internationally as <strong>UTC</strong>) is the primary time standard by which the world regulates clocks and civil time. It is not a time zone itself, but rather the immutable standard upon which all 400+ world time zones are mathematically computed.
          </p>
          <p>
            The compromise acronym &ldquo;UTC&rdquo; was officially adopted in 1967 by the International Telecommunication Union (ITU) to prevent favoritism between the English &ldquo;Coordinated Universal Time&rdquo; (CUT) and the French &ldquo;Temps Universel Coordonné&rdquo; (TUC).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-indigo-600" />
            2. The Difference Between UTC and GMT
          </h2>
          <p>
            While UTC and GMT (Greenwich Mean Time) share the identical time-of-day reading, their underlying foundations differ fundamentally:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li><strong>Greenwich Mean Time (GMT):</strong> Established in 1675 at the Royal Observatory in Greenwich, London, GMT is an astronomical solar time standard based on Earth’s rotation relative to the prime meridian (0° longitude). Because Earth’s rotation wobbles slightly due to tidal friction and geological core movement, GMT speeds up and slows down imperceptibly.</li>
            <li><strong>Coordinated Universal Time (UTC):</strong> Established in 1972, UTC is an atomic standard calculated using International Atomic Time (TAI), derived from weighted averages of hundreds of laboratory caesium atomic frequency standards worldwide. UTC ticks with absolute uniformity based on the SI second definition.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            3. Leap Seconds and Earth Rotation Sync
          </h2>
          <p>
            Because atomic clocks are so steady while Earth&rsquo;s physical rotation is slowing down, atomic time (TAI) slowly drifts apart from solar time (UT1). To keep civilian clocks synchronized with the actual day-night solar cycle, the International Earth Rotation and Reference Systems Service (IERS) historically inserts <strong>leap seconds</strong> into UTC when the discrepancy approaches 0.9 seconds.
          </p>
          <p>
            In November 2022, the General Conference on Weights and Measures (CGPM) voted to loosen leap second requirements by 2035, paving the way for a continuous, uninterrupted atomic time stream for internet and satellite telecommunications.
          </p>
        </section>

        {/* Global Offset Grid */}
        <section className="space-y-3 pt-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-purple-600" />
            4. Common Global UTC Offsets
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Every standard time zone on Earth is defined as an offset from UTC, ranging from UTC-12 (Baker Island) to UTC+14 (Line Islands, Kiribati):
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
            {utcOffsetList.map(item => (
              <Link
                key={item.name}
                href={item.link}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/70 hover:border-blue-500 transition-all block group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-blue-600">
                    {item.name}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-blue-600 dark:text-blue-400">
                    {item.offset}
                  </span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center justify-between">
                  <span>{item.city}</span>
                  <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>

      {/* Structured FAQs */}
      <FaqAccordion
        title="Frequently Asked Questions About UTC"
        subtitle="Common questions about Coordinated Universal Time, leap seconds, and international synchronization."
        items={faqs}
      />

      <RelatedLinksHub
        currentPath="/utc"
        title="Explore Related Time Utilities"
        subtitle="Convert time zones, check solar hours, or test atomic clock accuracy."
      />
    </div>
  );
}
