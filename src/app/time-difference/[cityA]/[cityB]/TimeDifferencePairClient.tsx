"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { City } from '@/lib/geo/cities';
import { getTimeDetails, getTimeDifferenceText, getUtcOffsetMinutes } from '@/lib/time/engine';
import { Clock, Sun, Moon, ArrowRight, Briefcase, CheckCircle2, Calendar, Compass } from 'lucide-react';

interface Props {
  cityA: City;
  cityB: City;
}

export function TimeDifferencePairClient({ cityA, cityB }: Props) {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [use24Hour, setUse24Hour] = useState(false);

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const now = currentTime || new Date();
  const detailsA = useMemo(() => getTimeDetails(cityA.timezone, now, !use24Hour), [cityA, now, use24Hour]);
  const detailsB = useMemo(() => getTimeDetails(cityB.timezone, now, !use24Hour), [cityB, now, use24Hour]);

  const diff = useMemo(() => getTimeDifferenceText(cityB.timezone, cityA.timezone, now), [cityA, cityB, now]);

  // Generate 24-hour comparison table
  const hourlyMatrix = useMemo(() => {
    const hours = [];
    const offA = getUtcOffsetMinutes(cityA.timezone, now);
    const offB = getUtcOffsetMinutes(cityB.timezone, now);

    for (let h = 0; h < 24; h++) {
      // Local time in city A
      const timeAStr = `${String(h).padStart(2, '0')}:00`;
      const isBizA = h >= 9 && h < 18;

      // Corresponding local time in city B
      const diffMins = offB - offA;
      let targetMins = (h * 60 + diffMins + 1440 * 2) % 1440;
      const targetH = Math.floor(targetMins / 60);
      const targetM = targetMins % 60;
      const timeBStr = `${String(targetH).padStart(2, '0')}:${String(targetM).padStart(2, '0')}`;
      const isBizB = targetH >= 9 && targetH < 18;

      const isOverlap = isBizA && isBizB;

      hours.push({
        hourA: timeAStr,
        hourB: timeBStr,
        isBizA,
        isBizB,
        isOverlap,
      });
    }
    return hours;
  }, [cityA, cityB, now]);

  return (
    <div className="space-y-8">
      {/* Side-by-Side Live Dual Clocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* City A Clock */}
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            {cityA.country}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            {cityA.name}
          </h2>
          <span className="text-xs text-slate-400 font-mono block mb-4">
            {cityA.timezone} • {detailsA.utcOffsetString}
          </span>

          <div className="text-5xl sm:text-6xl font-mono font-black text-slate-900 dark:text-white py-2">
            {detailsA.timeStr}
          </div>
          {!use24Hour && detailsA.dayPeriod && (
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              {detailsA.dayPeriod}
            </span>
          )}

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
            {detailsA.dateStr}
          </div>
        </div>

        {/* City B Clock */}
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            {cityB.country}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            {cityB.name}
          </h2>
          <span className="text-xs text-slate-400 font-mono block mb-4">
            {cityB.timezone} • {detailsB.utcOffsetString}
          </span>

          <div className="text-5xl sm:text-6xl font-mono font-black text-slate-900 dark:text-white py-2">
            {detailsB.timeStr}
          </div>
          {!use24Hour && detailsB.dayPeriod && (
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              {detailsB.dayPeriod}
            </span>
          )}

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
            {detailsB.dateStr}
          </div>
        </div>
      </div>

      {/* Difference Explanation Box */}
      <div className="p-6 rounded-3xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/60">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Compass className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          Time Offset Summary
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">
          <strong>{cityA.name}</strong> is <strong>{diff.summary}</strong> of <strong>{cityB.name}</strong>.
          When it is 9:00 AM in {cityA.name}, it is{' '}
          {(() => {
            const sample = hourlyMatrix.find(h => h.hourA === '09:00');
            return sample ? sample.hourB : '00:00';
          })()}{' '}
          in {cityB.name}.
        </p>
      </div>

      {/* 24-Hour Side-by-Side Comparison Matrix */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              24-Hour Time Conversion Matrix
            </h3>
            <span className="text-xs text-slate-400">
              🟢 Highlighted rows indicate overlapping business hours (9:00 AM – 6:00 PM in both locations)
            </span>
          </div>

          <button
            onClick={() => setUse24Hour(!use24Hour)}
            className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono font-bold"
          >
            {use24Hour ? '24H' : '12H'}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 uppercase tracking-wider font-bold">
                <th className="py-3 px-4">{cityA.name} Local Time</th>
                <th className="py-3 px-4">{cityB.name} Local Time</th>
                <th className="py-3 px-4">Status & Overlap</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {hourlyMatrix.map((row, idx) => (
                <tr
                  key={idx}
                  className={`transition-colors ${
                    row.isOverlap
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 font-semibold'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <td className="py-2.5 px-4 font-mono font-bold text-slate-900 dark:text-white">
                    {row.hourA}
                  </td>
                  <td className="py-2.5 px-4 font-mono font-bold text-slate-900 dark:text-white">
                    {row.hourB}
                  </td>
                  <td className="py-2.5 px-4">
                    {row.isOverlap ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Best Working Meeting Window
                      </span>
                    ) : row.isBizA ? (
                      <span className="text-slate-500">Business hours in {cityA.name} only</span>
                    ) : row.isBizB ? (
                      <span className="text-slate-500">Business hours in {cityB.name} only</span>
                    ) : (
                      <span className="text-slate-400">Outside standard office hours</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
