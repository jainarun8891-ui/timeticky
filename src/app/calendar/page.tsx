"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Printer, ArrowRight, Sun, Globe } from 'lucide-react';

const CALENDAR_INDEX_FAQS = [
  {
    question: "How is the modern Gregorian calendar structured?",
    answer: "The Gregorian calendar comprises 12 months totaling 365 days in standard years and 366 days in leap years. Introduced by Pope Gregory XIII in October 1582, it corrected the 11-minute annual drift of the preceding Julian calendar, realigning civil dates with the astronomical spring equinox."
  },
  {
    question: "What is the rule for determining leap years?",
    answer: "A year is a leap year if divisible by 4, except for end-of-century years (ending in 00), which must also be divisible by 400. Thus, 2000 was a leap year, but 1900 was not, and 2100 will not be a leap year."
  },
  {
    question: "Can I print this monthly calendar for physical planning?",
    answer: "Yes. Click the printer icon in the upper right corner of the calendar header to open your browser's print dialog. The layout automatically formats into a clean, black-and-white grid suitable for paper desk planners."
  },
  {
    question: "How do I jump directly to future or past years?",
    answer: "You can use the previous and next month arrows to navigate smoothly, or visit our dedicated year pages (such as /calendar/2026 or /calendar/2027) to view full 12-month printable overviews for any year."
  },
  {
    question: "Does TimeNumbers provide week numbers on calendars?",
    answer: "Yes! Visit our Week Number tool (/week-number) or Compact Calendar (/compact-calendar) to view official ISO-8601 calendar week designations across all 52 weeks of the year."
  }
];

export default function CalendarPage() {
  const [d, setD] = useState(new Date());
  const y = d.getFullYear();
  const m = d.getMonth();
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const first = new Date(y, m, 1).getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const prevDays = new Date(y, m, 0).getDate();

  const days = [];
  for (let i = first - 1; i >= 0; i--) days.push({ num: prevDays - i, cur: false });
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday = i === new Date().getDate() && m === new Date().getMonth() && y === new Date().getFullYear();
    days.push({ num: i, cur: true, isToday });
  }
  while (days.length % 7 !== 0) days.push({ num: days.length, cur: false });

  const prevMonth = () => setD(new Date(y, m - 1, 1));
  const nextMonth = () => setD(new Date(y, m + 1, 1));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Semantic Breadcrumbs & Schema.org JSON-LD */}
        <Breadcrumbs items={[{ name: 'Calendar', url: '/calendar' }]} />
        <JsonLd
          type="breadcrumb"
          data={[
            { name: 'Home', url: '/' },
            { name: 'Calendar', url: '/calendar' },
          ]}
        />
        <JsonLd type="faq" data={CALENDAR_INDEX_FAQS} />

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-2">
              <CalendarIcon className="w-3.5 h-3.5" />
              Gregorian Astronomical Calendar
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              World Calendar {y}
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              Interactive monthly calendar with printable views, leap year calculations, and Gregorian solar alignments.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <Link
              href="/calendar/2026"
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/40 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors"
            >
              2026
            </Link>
            <Link
              href="/calendar/2027"
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/40 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors"
            >
              2027
            </Link>
            <Link
              href="/calendar/2028"
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/40 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors"
            >
              2028
            </Link>
            <Link
              href="/compact-calendar"
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
            >
              Compact
            </Link>
            <button
              onClick={() => window.print()}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 transition-colors"
              title="Print Calendar"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Interactive Calendar Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {months[m]} {y}
            </h2>
            <div className="flex items-center gap-1">
              <button
                onClick={prevMonth}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
                title="Previous Month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextMonth}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
                title="Next Month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Days Header */}
          <div className="grid grid-cols-7 gap-1 text-center font-bold text-xs uppercase tracking-wider text-slate-400">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="py-2">{day}</div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1.5">
            {days.map((item, idx) => (
              <div
                key={idx}
                className={`h-14 sm:h-16 rounded-2xl p-2 flex flex-col justify-between transition-all ${
                  item.isToday
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
                    : item.cur
                    ? 'bg-slate-50 dark:bg-slate-800/40 text-slate-800 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-950/40'
                    : 'text-slate-300 dark:text-slate-700 opacity-40'
                }`}
              >
                <span className="text-sm font-semibold">{item.num}</span>
                {item.isToday && (
                  <span className="text-[10px] uppercase font-bold tracking-wider opacity-90">Today</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Guide Section */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 space-y-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Astronomical Basis of the Gregorian Calendar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <div className="space-y-3">
              <h3 className="font-semibold text-slate-900 dark:text-white text-base">Tropical Year Alignment</h3>
              <p>
                A tropical year—the duration between successive vernal equinoxes—measures 365.242189 days.
                Early solar calendars introduced too many leap days, causing Easter and agricultural planting seasons to drift backward through the calendar months.
              </p>
              <p>
                The Gregorian formula omits three leap days every four centuries, keeping calendar months firmly synchronized with solar seasons across millennia.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-slate-900 dark:text-white text-base">Civil, Commercial & Cultural Applications</h3>
              <p>
                While the Gregorian calendar is the internationally accepted standard for civil and commercial affairs, many cultures simultaneously maintain lunisolar calendars (such as the Hebrew, Islamic, and Hindu calendars) to observe cultural and religious holidays.
              </p>
              <p>
                Explore our Holiday and Astronomy sections to discover how lunar phases, equinoxes, and solar meridians interact with modern civil dates.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <FaqAccordion
          items={CALENDAR_INDEX_FAQS}
          title="World Calendar FAQs"
          subtitle="Frequently asked questions about monthly calendars, leap years, and astronomical alignment."
        />

        {/* Hub Navigation */}
        <RelatedLinksHub title="Explore More Calendars & Tools" />
      </div>
    </div>
  );
}
