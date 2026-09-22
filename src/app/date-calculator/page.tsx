import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import { DateCalculatorClient } from './DateCalculatorClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Calendar, Plus, ShieldCheck } from 'lucide-react';

export const metadata = buildPageMetadata(
  'Date Calculator: Add or Subtract Days, Weeks & Business Days',
  'Free online date calculator: add or subtract days, weeks, months, or years from any date. Includes business days mode that skips weekends and holidays.',
  '/date-calculator'
);

const DATE_CALC_FAQS = [
  {
    question: "How do business day additions work?",
    answer: "In 'Business days only' mode, Saturdays and Sundays are skipped during addition or subtraction. For example, adding 5 business days to a Friday yields the following Friday, exactly 1 calendar week later."
  },
  {
    question: "How are month additions calculated when months have varying days?",
    answer: "If adding a month lands on a date past the final day of the target month (e.g. adding 1 month to January 31), the date automatically adjusts to the final valid day of that month (February 28 or 29)."
  }
];

export default function DateCalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{"name":"Date Add & Subtract","url":"/date-calculator"}]} />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Home', url: '/' },
          { name: 'Date Calculator', url: '/date-calculator' },
        ]}
      />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
            <Calendar className="w-3.5 h-3.5" />
            Calendar Addition & Subtraction Engine
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Date Calculator — Add or Subtract Days & Weeks
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Add or subtract days, weeks, months, and years from any starting date. Features working business days calculation with weekend exclusion.
          </p>

          <div className="pt-2 flex flex-wrap gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>Gregorian Calendar Math</span>
            </div>
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4 text-cyan-400" />
              <span>Business Days Mode</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Zero Network Latency</span>
            </div>
          </div>
        </div>
      </div>

      <DateCalculatorClient />

      <div className="pt-4">
        <FaqAccordion
          title="Frequently Asked Questions About Date Math"
          subtitle="Learn how leap years and varying month lengths affect date calculations."
          items={DATE_CALC_FAQS}
        />
      </div>

      <RelatedLinksHub
        currentPath="/date-calculator"
        title="Explore Related Date & Calendar Utilities"
        subtitle="Compare date intervals, view the full calendar, or check ISO week numbers."
      />
    </div>
  );
}
