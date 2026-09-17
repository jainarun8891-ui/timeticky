import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import Link from 'next/link';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { Calendar, CalendarDays, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

const CALENDAR_FAQS = [
  {
    question: "What makes a compact year-at-a-glance calendar ideal for planning?",
    answer: "A compact 12-month calendar provides an uninterrupted aerial view of all 365 or 366 days in the year. Unlike single-month views that obscure forward planning, a compact layout lets program managers, students, and executives instantly map multi-month sprints, quarterly deliverables, fiscal deadlines, and holiday vacation blocks."
  },
  {
    question: "How are leap years calculated in the Gregorian calendar system?",
    answer: "Under the Gregorian calendar reform of 1582, a year is a leap year if it is evenly divisible by 4. However, end-of-century years (ending in 00) are NOT leap years unless they are also evenly divisible by 400. For instance, 1600 and 2000 were leap years, while 1700, 1800, and 1900 were ordinary 365-day years, and 2100 will not be a leap year."
  },
  {
    question: "What is an ISO-8601 calendar week and how is Week 1 determined?",
    answer: "The International Organization for Standardization (ISO 8601) dictates that weeks begin on Monday and are numbered 01 through 52 or 53. Calendar Week 01 of any year is defined as the week containing the first Thursday of the new year, or equivalently, the week that contains January 4th."
  },
  {
    question: "How many business days and total weeks are in a standard year?",
    answer: "A standard non-leap year consists of 365 days, which equals 52 weeks plus 1 extra day. A leap year contains 366 days, or 52 weeks plus 2 extra days. In terms of standard 5-day workweeks (Monday through Friday), a non-leap year typically contains 260 or 261 working days depending on which day of the week January 1 falls on."
  },
  {
    question: "Why do month lengths alternate between 30 and 31 days?",
    answer: "The alternating 30- and 31-day structure dates back to the Julian calendar modifications introduced under Julius Caesar and Augustus in ancient Rome. February was historically the final month of the archaic Roman civic year, which is why it bore the shortest duration of 28 days (or 29 during intercalary leap years)."
  },
  {
    question: "How do fiscal quarters align across the 12 calendar months?",
    answer: "In standard calendar-year corporations, Q1 spans January through March (90 or 91 days), Q2 encompasses April through June (91 days), Q3 covers July through September (92 days), and Q4 includes October through December (92 days). Government and education fiscal years may begin on July 1 or October 1 instead."
  }
];

export default function CompactCalendarPage() {
  const year = new Date().getFullYear();
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const fullMonthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      <Breadcrumbs items={[{"name":"Calendar","url":"/calendar"},{"name":"Compact Year View","url":"/compact-calendar"}]} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-2">
            <CalendarDays className="w-3.5 h-3.5" />
            12-Month Panoramic View
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {year} Year-at-a-Glance Calendar
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            Compact high-density 12-month calendar grid with day-of-week alignment, quarterly milestones, and ISO-8601 week number tracking.
          </p>
        </div>

        <Link
          href="/calendar"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline shrink-0"
        >
          View Full Monthly Calendar <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 12-Month Compact Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {months.map((name, mIdx) => {
          const days = new Date(year, mIdx + 1, 0).getDate();
          return (
            <div key={name} className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <div className="flex justify-between items-center mb-2 px-1">
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">{fullMonthNames[mIdx]}</h3>
                <span className="text-[10px] text-slate-400 font-mono">{days} Days</span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-[11px] font-mono text-slate-600 dark:text-slate-300">
                {Array.from({ length: days }).map((_, i) => (
                  <div key={i} className="py-0.5 rounded hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors">
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Planning Guide Section */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 space-y-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Quarterly Planning & Fiscal Breakdown
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block">Quarter 1 (Q1)</span>
            <h3 className="font-bold text-slate-900 dark:text-white mt-1">January – March</h3>
            <p className="text-xs text-slate-500 mt-2">Annual kickoff, budget ratification, and product roadmap launch. Encompasses 90 days (91 in leap years).</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block">Quarter 2 (Q2)</span>
            <h3 className="font-bold text-slate-900 dark:text-white mt-1">April – June</h3>
            <p className="text-xs text-slate-500 mt-2">Mid-year sprint cycle, tax filings, and summer planning. Exactly 91 days across all years.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block">Quarter 3 (Q3)</span>
            <h3 className="font-bold text-slate-900 dark:text-white mt-1">July – September</h3>
            <p className="text-xs text-slate-500 mt-2">Summer holiday windows and back-to-school transitions. Encompasses 92 calendar days.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block">Quarter 4 (Q4)</span>
            <h3 className="font-bold text-slate-900 dark:text-white mt-1">October – December</h3>
            <p className="text-xs text-slate-500 mt-2">Year-end audits, holiday campaigns, and closing sprint milestones. Exactly 92 calendar days.</p>
          </div>
        </div>
      </section>

      {/* Educational Article Section */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 space-y-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          The Mechanics of the Modern Gregorian Calendar
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900 dark:text-white text-base">Solar Year Alignment and Intercalation</h3>
            <p>
              The Earth takes approximately 365.2422 solar days to complete one full revolution around the Sun (a tropical year). Because civil calendars require whole integers for daily life, uncorrected 365-day calendars drift by approximately one full day every four years.
            </p>
            <p>
              The Gregorian calendar corrects this drift with precision: 97 leap days are inserted every 400 years. This keeps seasonal equinoxes and solstices aligned within a margin of error of less than one day every 3,000 years.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900 dark:text-white text-base">Optimizing Visual Schedule Architecture</h3>
            <p>
              When organizing projects across distributed teams, having continuous visibility into consecutive months eliminates scheduling blindspots. Critical milestones, product release phases, and corporate freeze periods are best evaluated across an entire calendar continuum.
            </p>
            <p>
              Use TimeNumbers compact calendar alongside our date difference calculators, business day planners, and countdown modules to track time intervals and coordinate commitments worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <FaqAccordion
        items={CALENDAR_FAQS}
        title="Calendar & Year Overview FAQs"
        subtitle="Frequently asked questions regarding calendar mechanics, leap years, and quarterly periods."
      />

      {/* Hub Navigation */}
      <RelatedLinksHub title="Explore Calendars, Dates & Calculators" />
    </div>
  );
}
