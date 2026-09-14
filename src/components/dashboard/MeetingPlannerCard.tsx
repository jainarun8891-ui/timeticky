"use client";

import React from 'react';
import Link from 'next/link';
import { Users } from 'lucide-react';
import { City } from '@/lib/geo/cities';

interface MeetingPlannerCardProps {
  currentCity: City;
}

export function MeetingPlannerCard({ currentCity }: MeetingPlannerCardProps) {
  const cities = [
    { name: currentCity?.name || 'Paris', hours: '9:00 – 17:00' },
    { name: currentCity?.id === 'new-york-us' ? 'Paris' : 'New York', hours: '9:00 – 17:00' },
    { name: currentCity?.id === 'london-gb' ? 'Tokyo' : 'London', hours: '9:00 – 17:00' },
    { name: currentCity?.id === 'tokyo-jp' ? 'Sydney' : 'Tokyo', hours: '9:00 – 17:00' }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[24px] border border-slate-200/90 dark:border-slate-800 shadow-sm p-5 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users className="w-3.5 h-3.5" />
          </div>
          <div>
            <h2 className="text-sm font-black text-slate-900 dark:text-white leading-tight">
              Meeting Planner
            </h2>
            <p className="text-[11px] text-slate-400">
              Find overlapping working hours
            </p>
          </div>
        </div>

        {/* 4 Cities Working Hours */}
        <div className="grid grid-cols-4 gap-1 text-center mt-3 mb-4">
          {cities.map((c) => (
            <div key={c.name}>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block truncate">
                {c.name}
              </span>
              <span className="text-[10px] text-slate-400 font-mono block">
                {c.hours}
              </span>
            </div>
          ))}
        </div>

        {/* Overlapping timeline bar */}
        <div className="space-y-1 my-3">
          {/* Timeline Ribbon Graphic */}
          <div className="relative h-6 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex items-center">
            <div className="absolute left-[38%] right-[28%] h-full bg-gradient-to-r from-blue-400 via-teal-400 to-emerald-400 opacity-90 rounded-full" />
            <div className="absolute left-[54%] right-[28%] h-full bg-emerald-500 opacity-95 rounded-full" />
          </div>

          {/* Time axis ticks */}
          <div className="flex justify-between text-[9px] text-slate-400 font-mono px-1">
            <span>00:00</span>
            <span>04:00</span>
            <span>08:00</span>
            <span>12:00</span>
            <span>16:00</span>
            <span>20:00</span>
            <span>24:00</span>
          </div>
        </div>
      </div>

      {/* Footer: Green Overlap Pill + Plan a meeting button */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80 mt-2">
        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold border border-emerald-200/80 dark:border-emerald-800">
          <Users className="w-3 h-3" />
          <span>Overlap: 13:00 – 17:00 (4 hours)</span>
        </div>

        <Link
          href="/meeting-planner"
          className="inline-flex items-center text-xs font-bold px-3 py-1 rounded-full bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 hover:bg-blue-100 transition-colors"
        >
          Plan a meeting
        </Link>
      </div>
    </div>
  );
}
