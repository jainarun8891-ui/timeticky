import React from 'react';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { HoursCalculatorClient } from './HoursCalculatorClient';

export const metadata: Metadata = buildPageMetadata(
  'Work Hours & Timesheet Calculator — Free Time Card',
  'Calculate daily and weekly work hours, lunch break deductions, overtime pay (1.5x), and gross wages. Copy timesheets or export to CSV. Free and private.',
  '/hours-calculator'
);

const FAQS = [
  {
    question: 'How do I calculate total hours worked in a day?',
    answer: 'Take your clock-out time and subtract your clock-in time. Then subtract any unpaid lunch or break minutes. For example, if you start at 8:30 AM and leave at 5:00 PM (8 hours and 30 minutes) with a 30-minute unpaid lunch break, you worked exactly 8.00 hours.'
  },
  {
    question: 'How do you convert minutes into decimal hours for payroll?',
    answer: 'Divide the number of minutes by 60. For example: 15 minutes is 0.25 hours (15 ÷ 60), 30 minutes is 0.50 hours (30 ÷ 60), and 45 minutes is 0.75 hours (45 ÷ 60). So, 7 hours and 15 minutes equals 7.25 decimal hours.'
  },
  {
    question: 'How is overtime calculated?',
    answer: 'Under standard United States Fair Labor Standards Act (FLSA) regulations, non-exempt employees receive overtime pay at 1.5 times their regular hourly rate ("time and a half") for any hours worked beyond 40 hours in a 7-day workweek.'
  },
  {
    question: 'Is my timesheet data stored or sent to any server?',
    answer: 'No. TimeNumbers runs 100% locally inside your web browser. None of your work hours, pay rates, or shift details are ever uploaded, tracked, or stored on external servers.'
  },
  {
    question: 'Can I export or print my weekly timesheet?',
    answer: 'Yes! Click "Export CSV" to download an Excel-ready spreadsheet, or click "Copy Summary" to generate a clean text table to paste directly into an email or messaging app for your manager or client.'
  }
];

export default function HoursCalculatorPage() {
  const applicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'TimeNumbers Work Hours & Timesheet Calculator',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires modern web browser with JavaScript enabled',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Free online work hours calculator with break deductions, overtime wage estimation, and one-click CSV export.'
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(applicationSchema) }}
      />
      <Breadcrumbs items={[{ name: 'Hours Calculator', url: '/hours-calculator' }]} />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Home', url: '/' },
          { name: 'Hours Calculator', url: '/hours-calculator' },
        ]}
      />
      <JsonLd type="faq" data={FAQS} />

      <HoursCalculatorClient />

      {/* Educational Guide Section */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-10 shadow-sm space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          How to Calculate Your Work Hours Easily
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
          Tracking time manually with pencil and paper or mental math often leads to rounding errors and lost wages. Whether you are a freelancer billing multiple clients, an hourly employee auditing your paycheck, or a small business manager running bi-weekly payroll, our free time card calculator takes the friction out of tracking hours.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Handling Overnight Shifts
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Working the night shift? Our calculator automatically detects when a shift crosses midnight (for example, clocking in at 10:00 PM and clocking out at 6:30 AM) and accurately calculates total duration without errors.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Decimal Hours vs. Clock Minutes
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              When multiplying hours by your hourly rate, you cannot multiply standard minutes directly ($20 × 7 hours 30 mins is NOT $20 × 7.30). You must convert minutes to a decimal: 30 minutes = 0.50, so 7.50 × $20 = $150.00. Our calculator does this automatically.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FaqAccordion
        items={FAQS}
        title="Frequently Asked Questions About Calculating Work Hours"
        subtitle="Common questions about timesheets, decimal hours conversion, and overtime rules."
      />

      {/* Related Tools Hub */}
      <RelatedLinksHub title="Explore More Productivity & Time Tools" />
    </div>
  );
}
