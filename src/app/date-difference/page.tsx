import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import { DateDifferenceClient } from './DateDifferenceClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Calendar, Clock, ShieldCheck } from 'lucide-react';

export const metadata = buildPageMetadata(
  'Date Difference Calculator — Days Between',
  'Calculate the exact number of days, weeks, months, years, and working business days between two calendar dates. Includes optional weekend exclusion.',
  '/date-difference'
);

const DATE_DIFF_FAQS = [
  {
    question: "How does the weekend exclusion calculation work?",
    answer: "When 'Exclude weekends' is enabled, the calculator iterates through the elapsed interval and removes every Saturday and Sunday, counting only working business days (Monday through Friday)."
  },
  {
    question: "Does the date difference count include the end date?",
    answer: "By standard mathematical convention, the interval measures the distance between the two points in time (from midnight on the start date to midnight on the end date)."
  }
];

export default function DateDifferencePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{"name":"Date Difference Calculator","url":"/date-difference"}]} />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Home', url: '/' },
          { name: 'Date Difference', url: '/date-difference' },
        ]}
      />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
            <Calendar className="w-3.5 h-3.5" />
            Calendar Interval Analysis
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Date Difference Calculator
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Measure the exact time duration between any two dates in days, business weekdays, weeks, months, and hours.
          </p>

          <div className="pt-2 flex flex-wrap gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>Full Gregorian Precision</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Business Days Filtering</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Instant Local Compute</span>
            </div>
          </div>
        </div>
      </div>

      <DateDifferenceClient />

      <div className="pt-4">
        <FaqAccordion
          title="Frequently Asked Questions About Date Calculation"
          subtitle="Learn how calendar days, leap intervals, and working business days are computed."
          items={DATE_DIFF_FAQS}
        />
      </div>

      <RelatedLinksHub
        currentPath="/date-difference"
        title="Explore Related Calendar Tools"
        subtitle="Add or subtract days, calculate ISO weeks, or view the full calendar."
      />
    </div>
  );
}
