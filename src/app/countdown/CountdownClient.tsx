"use client";

import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface Props {
  h1Title?: string;
  description?: string;
}

export function CountdownClient({ h1Title, description }: Props) {
  const [target, setTarget] = useState('2027-01-01T00:00');
  const [diff, setDiff] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const calc = () => {
      const ms = new Date(target).getTime() - Date.now();
      if (ms <= 0) setDiff({ d: 0, h: 0, m: 0, s: 0 });
      else {
        setDiff({
          d: Math.floor(ms / 86400000),
          h: Math.floor((ms % 86400000) / 3600000),
          m: Math.floor((ms % 3600000) / 60000),
          s: Math.floor((ms % 60000) / 1000)
        });
      }
    };
    calc();
    const t = setInterval(calc, 1000);
    return () => clearInterval(t);
  }, [target]);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          Real-Time Chronometer Countdown
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {h1Title || "Event Countdown Timer Hub"}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          {description || "Create precision live countdowns for weddings, product launches, birthdays, holidays, and milestones with real-time second updates."}
        </p>
      </div>

      {/* Target Selector */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-200">
            Select Target Date & Time:
          </label>
          <input
            type="datetime-local"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Big Counter Display */}
        <div className="grid grid-cols-4 gap-3 max-w-lg mx-auto font-mono text-center pt-2">
          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 sm:p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
            <span className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white block">{diff.d}</span>
            <span className="text-xs text-slate-400 font-sans uppercase font-bold tracking-wider mt-1 block">Days</span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 sm:p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
            <span className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white block">{diff.h}</span>
            <span className="text-xs text-slate-400 font-sans uppercase font-bold tracking-wider mt-1 block">Hours</span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 sm:p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
            <span className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white block">{diff.m}</span>
            <span className="text-xs text-slate-400 font-sans uppercase font-bold tracking-wider mt-1 block">Mins</span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 sm:p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
            <span className="text-3xl sm:text-5xl font-black text-blue-600 dark:text-blue-400 block">{diff.s}</span>
            <span className="text-xs text-slate-400 font-sans uppercase font-bold tracking-wider mt-1 block">Secs</span>
          </div>
        </div>
      </div>
    </div>
  );
}
