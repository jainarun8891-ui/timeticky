import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { TimerSuiteClient } from './TimerSuiteClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { Timer, Clock, ArrowRight } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { HUB_PAGES_CUSTOM_CONTENT } from '@/lib/seo/hub-pages-custom-content';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';

const content = HUB_PAGES_CUSTOM_CONTENT['/timer'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/timer'
);

const TIMER_PRESETS = [
  { slug: '1-minute', label: '1 Minute', desc: 'Box breathing, steeped tea brewing & flash micro-drills' },
  { slug: '5-minutes', label: '5 Minutes', desc: 'Pomodoro short break, eye reset & lightning presentation talk' },
  { slug: '10-minutes', label: '10 Minutes', desc: 'Daily agile team standup, HIIT circuits & speed reading' },
  { slug: '15-minutes', label: '15 Minutes', desc: 'Restorative power nap, sprint retrospectives & coffee break' },
  { slug: '20-minutes', label: '20 Minutes', desc: '20-20-20 eye strain relief, yoga flow & study block' },
  { slug: '30-minutes', label: '30 Minutes', desc: 'Corporate meeting slot, baking timer & intense cardio run' },
  { slug: '45-minutes', label: '45 Minutes', desc: 'Academic lecture period, coding sprint & gym workout' },
  { slug: '1-hour', label: '1 Hour', desc: 'Deep work timeblock, mock exams & kitchen slow-roasting' },
  { slug: '2-hours', label: '2 Hours', desc: 'Extended masterclasses, mock certifications & slow braising' },
];

export default function TimerPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <Breadcrumbs items={[{ name: "Countdown Timer", url: "/timer" }]} />
        <JsonLd type="faq" data={content.faqs} />
        <JsonLd
          type="application"
          data={{
            name: "Online Countdown Timer",
            category: "UtilitiesApplication",
            description: content.description
          }}
        />

        {/* Hero Header */}
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold">
            <Timer className="w-3.5 h-3.5" />
            <span>Absolute Epoch Chronometer</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            {content.h1}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            {content.description}
          </p>
        </div>

        {/* Timer Suite Client */}
        <TimerSuiteClient initialSeconds={300} title="5 Minute Timer" />

        {/* Preset Durations Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>Popular Countdown Duration Presets</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {TIMER_PRESETS.map((p) => (
              <Link
                key={p.slug}
                href={`/timer/${p.slug}`}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 shadow-2xs hover:shadow-xs transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <strong className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {p.label} Timer
                    </strong>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                    {p.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Educational Guide Section */}
        <EditorialContentBlock content={content} badgeLabel="Cognitive Productivity Engineering" />

        {/* FAQs */}
        <FaqAccordion
          title="Frequently Asked Questions About Online Countdown Timers"
          subtitle="Learn how our zero-drift timer maintains sub-millisecond precision even in background browser tabs."
          items={content.faqs}
        />

        {/* Hub Navigation */}
        <RelatedLinksHub
          currentPath="/timer"
          title="Explore More Clocks &amp; Productivity Utilities"
          subtitle="Try our Pomodoro focus engine, millisecond stopwatch, or test your system clock accuracy."
        />
      </div>
    </div>
  );
}
