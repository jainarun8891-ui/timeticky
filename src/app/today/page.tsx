import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import { TodayStatsClient } from './TodayStatsClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Calendar, Clock, ShieldCheck, Sparkles } from 'lucide-react';

export const metadata = buildPageMetadata(
  'Today\'s Date Details — Day of Year, ISO Week, Julian Date & Year Progress',
  'Complete chronometry data for today: day of the year, ISO-8601 week number, calendar quarter, days remaining in the year, Julian date, and live Unix timestamp.',
  '/today'
);

const TODAY_FAQS = [
  {
    question: "What is an ISO-8601 week number?",
    answer: "Under the international ISO-8601 standard, weeks begin on Monday and are numbered from 1 to 52 (or 53). Week 1 is defined as the first week of the year with at least four days in the new calendar year (containing the first Thursday of January)."
  },
  {
    question: "What is a Julian Date (JD)?",
    answer: "A Julian Date is a continuous count of days and fractions of days since noon on January 1, 4713 BC (proleptic Julian calendar). It is widely used by astronomers and geodesists to compute exact time differences between celestial events without complications from calendar reforms."
  },
  {
    question: "How is leap year determined?",
    answer: "A leap year in the Gregorian calendar occurs every year that is evenly divisible by 4, except for century years (ending in 00), which must also be evenly divisible by 400. For instance, 2000 and 2024 are leap years, but 1900 and 2100 are common years."
  }
];

export default function TodayPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{"name":"Today's Date Stats","url":"/today"}]} />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Home', url: '/' },
          { name: 'Today Stats', url: '/today' },
        ]}
      />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
            <Calendar className="w-3.5 h-3.5" />
            Astronomical & Calendar Metadata
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Today's Date & Chronology
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Instantaneous metrics for the current day: ordinal day of year, ISO week index, Gregorian quarter, days remaining, Julian date, and atomic Unix epoch seconds.
          </p>

          <div className="pt-2 flex flex-wrap gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>ISO-8601 Calendar Spec</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Continuous Julian Day</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Real-Time Progress Metrics</span>
            </div>
          </div>
        </div>
      </div>

      <TodayStatsClient />

      <div className="pt-4">
        <FaqAccordion
          title="Frequently Asked Questions About Today's Calendar Data"
          subtitle="Learn how day ordinality, ISO weeks, and astronomical Julian dates are computed."
          items={TODAY_FAQS}
        />
      </div>

      <RelatedLinksHub
        currentPath="/today"
        title="Explore Related Date & Chronometry Tools"
        subtitle="Calculate date differences, view the full calendar, or convert Unix timestamps."
      />
    </div>
  );
}
