"use client";

import React, { useState, useMemo } from 'react';
import { Calendar, Plus, Minus, ArrowRight, CheckCircle2 } from 'lucide-react';

export function DateCalculatorClient() {
  const [startDate, setStartDate] = useState('2026-09-14');
  const [operation, setOperation] = useState<'add' | 'subtract'>('add');
  const [days, setDays] = useState(30);
  const [weeks, setWeeks] = useState(0);
  const [months, setMonths] = useState(0);
  const [years, setYears] = useState(0);
  const [businessDaysOnly, setBusinessDaysOnly] = useState(false);

  const result = useMemo(() => {
    const d = new Date(`${startDate}T00:00:00`);
    if (isNaN(d.getTime())) return null;

    const multiplier = operation === 'add' ? 1 : -1;

    if (businessDaysOnly) {
      // Business days addition/subtraction (skipping Saturday and Sunday)
      let count = Math.abs(days);
      const cur = new Date(d);
      while (count > 0) {
        cur.setDate(cur.getDate() + multiplier);
        const dayOfWeek = cur.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
          count--;
        }
      }
      const formatted = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }).format(cur);

      return {
        targetDate: cur,
        formatted,
        dayOfWeek: new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(cur),
      };
    } else {
      // Standard calendar add/subtract
      const target = new Date(d);
      target.setFullYear(target.getFullYear() + multiplier * years);
      target.setMonth(target.getMonth() + multiplier * months);
      target.setDate(target.getDate() + multiplier * (days + weeks * 7));

      const formatted = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }).format(target);

      return {
        targetDate: target,
        formatted,
        dayOfWeek: new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(target),
      };
    }
  }, [startDate, operation, days, weeks, months, years, businessDaysOnly]);

  return (
    <div className="space-y-8">
      {/* Input Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Date Math Configuration
          </h2>

          <div className="flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-xs font-semibold">
            <button
              onClick={() => setOperation('add')}
              className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1 ${
                operation === 'add'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
            <button
              onClick={() => setOperation('subtract')}
              className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1 ${
                operation === 'subtract'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              <Minus className="w-3.5 h-3.5" /> Subtract
            </button>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
            Starting Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full max-w-sm px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Quantities */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Days
            </label>
            <input
              type="number"
              min="0"
              value={days}
              onChange={(e) => setDays(parseInt(e.target.value || '0', 10))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Weeks
            </label>
            <input
              type="number"
              min="0"
              disabled={businessDaysOnly}
              value={weeks}
              onChange={(e) => setWeeks(parseInt(e.target.value || '0', 10))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold text-slate-900 dark:text-white disabled:opacity-40"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Months
            </label>
            <input
              type="number"
              min="0"
              disabled={businessDaysOnly}
              value={months}
              onChange={(e) => setMonths(parseInt(e.target.value || '0', 10))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold text-slate-900 dark:text-white disabled:opacity-40"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Years
            </label>
            <input
              type="number"
              min="0"
              disabled={businessDaysOnly}
              value={years}
              onChange={(e) => setYears(parseInt(e.target.value || '0', 10))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold text-slate-900 dark:text-white disabled:opacity-40"
            />
          </div>
        </div>

        {/* Business Days Toggle */}
        <div className="pt-2">
          <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={businessDaysOnly}
              onChange={(e) => setBusinessDaysOnly(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
            />
            <span>Business days only (add/subtract working days, skip weekends)</span>
          </label>
        </div>
      </div>

      {/* Target Result Display */}
      {result && (
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block">
            Calculated Target Date
          </span>
          <div className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white py-2">
            {result.formatted}
          </div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800">
            {result.dayOfWeek}
          </span>
        </div>
      )}
    </div>
  );
}
