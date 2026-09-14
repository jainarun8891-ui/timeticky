"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Calendar, Clock, Compass, CheckCircle2, Globe, Sparkles, Copy, Check } from 'lucide-react';

export function TodayStatsClient() {
  const [now, setNow] = useState<Date | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const d = now || new Date();

  const stats = useMemo(() => {
    const year = d.getFullYear();
    const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    const totalDaysInYear = isLeap ? 366 : 365;

    // Day of year
    const startOfYear = new Date(year, 0, 1);
    const dayOfYear = Math.floor((d.getTime() - startOfYear.getTime()) / 86400000) + 1;
    const daysRemaining = totalDaysInYear - dayOfYear;

    // ISO week
    const target = new Date(d.valueOf());
    const dayNr = (d.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    const firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() !== 4) {
      target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
    }
    const isoWeek = 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
    const weeksRemaining = 52 - isoWeek;

    // Quarter
    const quarter = Math.floor(d.getMonth() / 3) + 1;

    // Julian Date: Julian epoch Jan 1, 1970 UTC = 2440587.5
    const julianDate = (d.getTime() / 86400000 + 2440587.5).toFixed(4);

    const fullDateFormatted = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(d);

    const timeFormatted = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).format(d);

    const unixSeconds = Math.floor(d.getTime() / 1000);
    const yearProgressPercent = Math.round((dayOfYear / totalDaysInYear) * 100);

    return {
      fullDateFormatted,
      timeFormatted,
      dayOfYear,
      totalDaysInYear,
      daysRemaining,
      isoWeek,
      weeksRemaining,
      quarter,
      isLeap,
      julianDate,
      unixSeconds,
      yearProgressPercent,
      year,
    };
  }, [d]);

  const copyVal = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Hero Today Display */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-12 shadow-sm text-center relative overflow-hidden">
        <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 block mb-2">
          Chronometry Calendar Overview
        </span>

        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          {stats.fullDateFormatted}
        </h2>

        <div className="text-4xl sm:text-6xl font-mono font-bold text-slate-800 dark:text-slate-200 my-4">
          {stats.timeFormatted}
        </div>

        {/* Year Progress Bar */}
        <div className="max-w-md mx-auto space-y-2 pt-2">
          <div className="flex justify-between text-xs text-slate-500 font-semibold">
            <span>Year Progress ({stats.year})</span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">{stats.yearProgressPercent}% Completed</span>
          </div>
          <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200/60 dark:border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
              style={{ width: `${stats.yearProgressPercent}%` }}
            />
          </div>
          <span className="text-[11px] text-slate-400 block">
            Day <strong>{stats.dayOfYear}</strong> of {stats.totalDaysInYear} • {stats.daysRemaining} days remaining in {stats.year}
          </span>
        </div>
      </div>

      {/* Grid of Calendar & Chronological Facts */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {[
          { label: 'Day of Year', value: `Day ${stats.dayOfYear}`, note: `${stats.daysRemaining} days left`, key: 'dayOfYear' },
          { label: 'ISO Week Number', value: `Week ${stats.isoWeek}`, note: `${stats.weeksRemaining} weeks left`, key: 'week' },
          { label: 'Quarter of Year', value: `Q${stats.quarter}`, note: `Months ${(stats.quarter - 1) * 3 + 1} to ${stats.quarter * 3}`, key: 'q' },
          { label: 'Leap Year Status', value: stats.isLeap ? 'Leap Year (366 days)' : 'Common Year (365 days)', note: stats.isLeap ? 'February has 29 days' : 'February has 28 days', key: 'leap' },
          { label: 'Unix Timestamp', value: `${stats.unixSeconds}`, note: 'Seconds since Jan 1, 1970', key: 'unix' },
          { label: 'Julian Date (JD)', value: `${stats.julianDate}`, note: 'Continuous day count since 4713 BC', key: 'julian' },
          { label: 'Days in Current Month', value: `${new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()} Days`, note: `${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(d)}`, key: 'daysInMonth' },
          { label: 'Calendar Era', value: 'CE / AD', note: 'Common Era / Gregorian', key: 'era' },
        ].map((item) => (
          <div
            key={item.key}
            className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:border-blue-400 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
                <button
                  onClick={() => copyVal(item.value, item.key)}
                  className="p-1 hover:text-blue-600 transition-colors"
                  title="Copy value"
                >
                  {copiedKey === item.key ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <strong className="text-xl font-mono font-bold text-slate-900 dark:text-white block mt-1">
                {item.value}
              </strong>
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-3 block pt-2 border-t border-slate-100 dark:border-slate-800">
              {item.note}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
