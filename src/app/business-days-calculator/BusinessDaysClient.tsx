"use client";

import React, { useState } from 'react';
import { Briefcase, Calendar, Plus, Minus, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';

export function BusinessDaysClient() {
  const todayStr = new Date().toISOString().split('T')[0];
  const ninetyDaysStr = new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0];

  const [mode, setMode] = useState<'between' | 'add'>('between');
  const [startDate, setStartDate] = useState<string>(todayStr);
  const [endDate, setEndDate] = useState<string>(ninetyDaysStr);
  const [daysToAdd, setDaysToAdd] = useState<number>(90);
  const [excludeWeekends, setExcludeWeekends] = useState<boolean>(true);

  const calculateDaysBetween = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return null;

    let d1 = new Date(Math.min(start.getTime(), end.getTime()));
    const d2 = new Date(Math.max(start.getTime(), end.getTime()));

    let totalDays = 0;
    let businessDays = 0;
    let weekendDays = 0;

    while (d1 < d2) {
      d1.setDate(d1.getDate() + 1);
      totalDays++;
      const dayOfWeek = d1.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        weekendDays++;
      } else {
        businessDays++;
      }
    }

    return { totalDays, businessDays, weekendDays, workingHours: businessDays * 8 };
  };

  const calculateAddBusinessDays = () => {
    const start = new Date(startDate);
    if (isNaN(start.getTime())) return null;

    let current = new Date(start);
    let added = 0;
    const target = Math.abs(daysToAdd);
    const step = daysToAdd >= 0 ? 1 : -1;

    while (added < target) {
      current.setDate(current.getDate() + step);
      const dayOfWeek = current.getDay();
      if (excludeWeekends) {
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
          added++;
        }
      } else {
        added++;
      }
    }

    return {
      resultDate: current.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      iso: current.toISOString().split('T')[0]
    };
  };

  const betweenResult = calculateDaysBetween();
  const addResult = calculateAddBusinessDays();

  const faqs = [
    {
      question: "How many business days between two dates calculator?",
      answer: "Our business day calculator counts working days by iterating between your selected start and end dates and automatically excluding Saturdays and Sundays (standard 5-day working week)."
    },
    {
      question: "What date is 90 days from today excluding weekends?",
      answer: `Adding 90 business days (excluding Saturdays and Sundays) to today produces ${addResult?.resultDate || 'the calculated deadline'}, approximately 18 calendar weeks in the future.`
    },
    {
      question: "Is Saturday considered a business day?",
      answer: "Under standard commercial, banking, and legal definitions in North America, Europe, and India, business days are Monday through Friday. Saturdays and Sundays are classified as weekend non-working days."
    }
  ];

  return (
    <div className="space-y-10">
      <header className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Workday &amp; Deadline Calculator</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          Business Days Calculator
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
          Calculate working business days between two dates or add 30, 60, or 90 business days excluding weekends.
        </p>
      </header>

      {/* Mode Switcher */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setMode('between')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              mode === 'between' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Business Days Between Two Dates
          </button>
          <button
            onClick={() => setMode('add')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              mode === 'add' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Add / Subtract Business Days (+90 Days)
          </button>
        </div>
      </div>

      {mode === 'between' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Select Date Range</h2>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold outline-none"
              />
            </div>
          </section>

          {betweenResult && (
            <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Calculated Workdays</h2>
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 text-center">
                <span className="text-xs uppercase font-bold tracking-wider text-emerald-600 dark:text-emerald-400 block">
                  Business Working Days
                </span>
                <div className="text-5xl font-black font-mono text-emerald-600 dark:text-emerald-400 my-1">
                  {betweenResult.businessDays}
                </div>
                <span className="text-xs text-slate-500">Excluding Saturdays and Sundays</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <span className="text-slate-400 block font-bold">Total Days</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white text-base">{betweenResult.totalDays}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <span className="text-slate-400 block font-bold">Weekend Days</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white text-base">{betweenResult.weekendDays}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <span className="text-slate-400 block font-bold">Work Hours (8h)</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white text-base">{betweenResult.workingHours}</span>
                </div>
              </div>
            </section>
          )}
        </div>
      ) : (
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm space-y-6">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">Calculate Future Business Deadline</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Starting From</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Business Days to Add</label>
              <input
                type="number"
                value={daysToAdd}
                onChange={(e) => setDaysToAdd(parseInt(e.target.value, 10) || 0)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold outline-none font-mono"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {[30, 60, 90, 180].map(n => (
              <button
                key={n}
                onClick={() => setDaysToAdd(n)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  daysToAdd === n
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300'
                }`}
              >
                +{n} Business Days
              </button>
            ))}
          </div>

          {addResult && (
            <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 text-center space-y-1">
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-600 dark:text-emerald-400 block">
                Calculated Target Deadline
              </span>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {addResult.resultDate}
              </div>
              <span className="text-xs text-slate-400 font-mono">ISO: {addResult.iso}</span>
            </div>
          )}
        </div>
      )}

      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
        <FaqAccordion items={faqs} title="Frequently Asked Questions About Business Days" />
      </section>

      <RelatedLinksHub />
    </div>
  );
}
