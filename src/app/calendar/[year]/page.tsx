import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { Calendar as CalendarIcon, ArrowLeft, ArrowRight, Printer, Sparkles, CheckCircle2 } from 'lucide-react';

interface Props {
  params: Promise<{ year: string }>;
}

const SUPPORTED_YEARS = ['2025', '2026', '2027', '2028', '2029', '2030'];

export async function generateStaticParams() {
  return SUPPORTED_YEARS.map(year => ({ year }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year } = await params;
  const y = parseInt(year, 10);
  if (isNaN(y)) return {};

  return {
    title: `Calendar ${y} — Complete 12-Month Printable Gregorian Calendar | TimeNumbers`,
    description: `Full 12-month calendar for year ${y} with week numbers, lunar phases, astronomical seasonal markers, and printable view. Explore dates, leap year calculations, and holidays.`,
    alternates: {
      canonical: `https://www.timenumbers.com/calendar/${y}`,
    },
    openGraph: {
      title: `Calendar ${y} — Full 12-Month Calendar`,
      description: `Complete Gregorian astronomical calendar for ${y} with week numbers and printable view.`,
      url: `https://www.timenumbers.com/calendar/${y}`,
      siteName: 'TimeNumbers',
      type: 'website',
    }
  };
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKDAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function renderMonthGrid(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = getDaysInMonth(year, month);
  const prevMonthDays = new Date(year, month, 0).getDate();

  const cells = [];
  // Previous month trailing days
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: prevMonthDays - i, isCurrent: false });
  }
  // Current month days
  for (let i = 1; i <= totalDays; i++) {
    cells.push({ day: i, isCurrent: true });
  }
  // Next month leading days to complete grid
  while (cells.length % 7 !== 0) {
    cells.push({ day: cells.length % 7, isCurrent: false });
  }

  return cells;
}

export default async function CalendarYearPage({ params }: Props) {
  const { year } = await params;
  const y = parseInt(year, 10);

  if (isNaN(y) || y < 1900 || y > 2100) {
    notFound();
  }

  const leap = isLeapYear(y);
  const totalDays = leap ? 366 : 365;
  const startDayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date(y, 0, 1).getDay()];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemPage',
    name: `Calendar for Year ${y}`,
    url: `https://www.timenumbers.com/calendar/${y}`,
    description: `Complete 12-month printable Gregorian calendar for year ${y}.`
  };

  return (
    <div className="w-full min-h-screen pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-[1720px] w-full mx-auto px-4 sm:px-8 lg:px-12 pt-6 space-y-8">
        {/* Universal SEO Breadcrumbs */}
        <Breadcrumbs
          items={[
            { name: 'Calendar', url: '/calendar' },
            { name: `Calendar ${y}`, url: `/calendar/${y}` }
          ]}
        />

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-200/90 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold mb-2">
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>Full Gregorian Astronomical Calendar</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Year {y} Calendar
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {totalDays} days &bull; Starts on {startDayName} &bull; {leap ? 'Leap Year (366 days)' : 'Common Year (365 days)'}
            </p>
          </div>

          {/* Quick Year Jump Navigation */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <Link
              href={`/calendar/${y - 1}`}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{y - 1}</span>
            </Link>

            {SUPPORTED_YEARS.map(yr => (
              <Link
                key={yr}
                href={`/calendar/${yr}`}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  yr === String(y)
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                {yr}
              </Link>
            ))}

            <Link
              href={`/calendar/${y + 1}`}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors flex items-center gap-1"
            >
              <span>{y + 1}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 12-Month Grid View */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {MONTH_NAMES.map((monthName, mIdx) => {
            const cells = renderMonthGrid(y, mIdx);
            return (
              <div
                key={monthName}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-4 shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    {monthName}
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400">
                    {getDaysInMonth(y, mIdx)} days
                  </span>
                </div>

                {/* Weekday Header */}
                <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400">
                  {WEEKDAY_NAMES.map(w => (
                    <div key={w} className={w === 'Su' || w === 'Sa' ? 'text-blue-500 font-extrabold' : ''}>
                      {w}
                    </div>
                  ))}
                </div>

                {/* Day Cells */}
                <div className="grid grid-cols-7 gap-1 text-center text-xs">
                  {cells.map((c, cIdx) => (
                    <div
                      key={cIdx}
                      className={`h-7 flex items-center justify-center rounded-lg font-mono text-[11px] ${
                        c.isCurrent
                          ? 'text-slate-800 dark:text-slate-200 font-semibold hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors'
                          : 'text-slate-300 dark:text-slate-700'
                      }`}
                    >
                      {c.day}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Universal Related Links */}
        <RelatedLinksHub currentPath={`/calendar/${y}`} />
      </div>
    </div>
  );
}
