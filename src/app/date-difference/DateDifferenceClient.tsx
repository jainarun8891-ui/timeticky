"use client";

import React, { useState, useMemo } from 'react';
import { Calendar, ArrowRight, Clock, CheckCircle2, Sliders } from 'lucide-react';

export function DateDifferenceClient() {
  const [startDate, setStartDate] = useState('2026-01-01');
  const [endDate, setEndDate] = useState('2026-12-31');
  const [excludeWeekends, setExcludeWeekends] = useState(false);

  const result = useMemo(() => {
    const d1 = new Date(`${startDate}T00:00:00`);
    const d2 = new Date(`${endDate}T00:00:00`);

    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
      return null;
    }

    const isReversed = d2 < d1;
    const from = isReversed ? d2 : d1;
    const to = isReversed ? d1 : d2;

    const diffMs = to.getTime() - from.getTime();
    const totalDays = Math.round(diffMs / 86400000);

    // Count weekdays vs weekends
    let weekdays = 0;
    let weekends = 0;
    const cur = new Date(from);
    while (cur < to) {
      const day = cur.getDay();
      if (day === 0 || day === 6) {
        weekends++;
      } else {
        weekdays++;
      }
      cur.setDate(cur.getDate() + 1);
    }

    const effectiveDays = excludeWeekends ? weekdays : totalDays;

    // Breakdown into years, months, days
    let years = to.getFullYear() - from.getFullYear();
    let months = to.getMonth() - from.getMonth();
    let days = to.getDate() - from.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(to.getFullYear(), to.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const weeks = Math.floor(effectiveDays / 7);
    const remDays = effectiveDays % 7;

    const hours = effectiveDays * 24;
    const minutes = hours * 60;
    const seconds = minutes * 60;

    return {
      isReversed,
      totalDays,
      effectiveDays,
      weekdays,
      weekends,
      years,
      months,
      days,
      weeks,
      remDays,
      hours,
      minutes,
      seconds,
    };
  }, [startDate, endDate, excludeWeekends]);

  return (
    <div className="space-y-8">
      {/* Date Selection Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          Select Two Dates
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Options */}
        <div className="pt-2 flex items-center gap-2">
          <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={excludeWeekends}
              onChange={(e) => setExcludeWeekends(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
            />
            <span>Exclude weekends (count working business days only)</span>
          </label>
        </div>
      </div>

      {/* Difference Results Display */}
      {result && (
        <div className="space-y-6">
          {/* Highlight Banner */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-1">
              {excludeWeekends ? 'Total Working Business Days' : 'Total Elapsed Time'}
            </span>
            <div className="text-5xl sm:text-7xl font-mono font-black text-blue-600 dark:text-blue-400 py-2">
              {result.effectiveDays.toLocaleString()} Days
            </div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mt-1">
              Equivalent to <strong>{result.years} year{result.years !== 1 ? 's' : ''}, {result.months} month{result.months !== 1 ? 's' : ''}, and {result.days} day{result.days !== 1 ? 's' : ''}</strong>.
            </p>
          </div>

          {/* Granular Conversions Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Weeks & Days</span>
              <strong className="text-xl font-mono font-bold text-slate-900 dark:text-white block mt-1">
                {result.weeks}w {result.remDays}d
              </strong>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Hours</span>
              <strong className="text-xl font-mono font-bold text-slate-900 dark:text-white block mt-1">
                {result.hours.toLocaleString()} hrs
              </strong>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Weekdays (M-F)</span>
              <strong className="text-xl font-mono font-bold text-slate-900 dark:text-white block mt-1">
                {result.weekdays.toLocaleString()}
              </strong>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Weekend Days</span>
              <strong className="text-xl font-mono font-bold text-slate-900 dark:text-white block mt-1">
                {result.weekends.toLocaleString()}
              </strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
