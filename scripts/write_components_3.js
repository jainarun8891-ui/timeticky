const fs = require('fs');

// TimeDifferenceCard.tsx
fs.writeFileSync('src/components/dashboard/TimeDifferenceCard.tsx', `
"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeftRight, ChevronRight } from 'lucide-react';
import { City, CITIES } from '@/lib/geo/cities';
import { getTimeDifference } from '@/lib/time/timezones';

interface TimeDifferenceCardProps {
  currentCity?: City;
}

export function TimeDifferenceCard({ currentCity = CITIES[0] }: TimeDifferenceCardProps) {
  const comparisonCities = CITIES.filter(c => c.id !== currentCity.id).slice(0, 6);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-6 flex flex-col justify-between transition-all">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-7 h-7 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
          <ArrowLeftRight className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
            Time Difference
          </h3>
          <p className="text-[11px] text-slate-400 dark:text-slate-500">
            How does time in {currentCity.name} compare?
          </p>
        </div>
      </div>

      {/* City Comparison List */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800/60 my-1">
        {comparisonCities.map((other) => {
          const diff = getTimeDifference(currentCity.timezone, other.timezone);

          return (
            <Link
              key={other.id}
              href={\`/compare/\${currentCity.slug}/\${other.slug}\`}
              className="py-2.5 flex items-center justify-between group hover:bg-slate-50/60 dark:hover:bg-slate-800/40 px-1 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">
                  {other.countryCode === 'US' ? '🗽' :
                   other.countryCode === 'GB' ? '🕰️' :
                   other.countryCode === 'JP' ? '🗼' :
                   other.countryCode === 'AE' ? '⛵' :
                   other.countryCode === 'IN' ? '🏛️' :
                   other.countryCode === 'AU' ? '⛵' : '🏙️'}
                </span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {other.name}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <span
                  className={\`text-xs font-semibold \${
                    diff.isAhead
                      ? 'text-amber-600 dark:text-amber-400'
                      : diff.diffMinutes === 0
                      ? 'text-slate-500'
                      : 'text-blue-600 dark:text-blue-400'
                  }\`}
                >
                  {diff.formatted}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
`, 'utf8');

// MeetingPlannerCard.tsx
fs.writeFileSync('src/components/dashboard/MeetingPlannerCard.tsx', `
"use client";

import React from 'react';
import Link from 'next/link';
import { Users } from 'lucide-react';
import { City, CITIES } from '@/lib/geo/cities';

interface MeetingPlannerCardProps {
  currentCity?: City;
}

export function MeetingPlannerCard({ currentCity = CITIES[0] }: MeetingPlannerCardProps) {
  const participants = [
    { name: currentCity.name, hours: "9:00 – 17:00" },
    { name: "New York", hours: "9:00 – 17:00" },
    { name: "London", hours: "9:00 – 17:00" },
    { name: "Tokyo", hours: "9:00 – 17:00" }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-6 flex flex-col justify-between transition-all">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-7 h-7 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
          <Users className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
            Meeting Planner
          </h3>
          <p className="text-[11px] text-slate-400 dark:text-slate-500">
            Find overlapping working hours
          </p>
        </div>
      </div>

      {/* Participants working hours summary */}
      <div className="grid grid-cols-4 gap-2 text-center my-2">
        {participants.map((p) => (
          <div key={p.name} className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl border border-slate-100 dark:border-slate-800">
            <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 block truncate">
              {p.name}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              {p.hours}
            </span>
          </div>
        ))}
      </div>

      {/* 24-Hour Timeline Graphic with Overlap Band */}
      <div className="my-3">
        {/* Timeline Bar */}
        <div className="relative h-6 w-full bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden flex items-center">
          {/* Paris Work Band (9-17 CET = 8-16 UTC) */}
          <div className="absolute left-[33%] w-[33%] h-full bg-blue-200/60 dark:bg-blue-900/50" />
          {/* London Work Band (9-17 GMT = 9-17 UTC) */}
          <div className="absolute left-[37%] w-[33%] h-full bg-indigo-200/60 dark:bg-indigo-900/50" />
          {/* Overlapping Best Window Highlight (Green) */}
          <div className="absolute left-[54%] w-[16%] h-full bg-emerald-400/80 dark:bg-emerald-500/80 border-x-2 border-emerald-600" />
        </div>

        {/* Hour Marks */}
        <div className="flex justify-between text-[9px] text-slate-400 font-mono mt-1 px-1">
          <span>00:00</span>
          <span>04:00</span>
          <span>08:00</span>
          <span>12:00</span>
          <span>16:00</span>
          <span>20:00</span>
          <span>24:00</span>
        </div>
      </div>

      {/* Overlap Result & CTA Button */}
      <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
          <Users className="w-3.5 h-3.5" />
          <span>Overlap: 13:00 – 17:00 (4 hours)</span>
        </div>

        <Link
          href="/meeting-planner"
          className="px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-slate-800 hover:bg-blue-100 text-blue-600 dark:text-blue-400 text-xs font-semibold transition-colors"
        >
          Plan a meeting
        </Link>
      </div>
    </div>
  );
}
`, 'utf8');

// SunDaylightCard.tsx
fs.writeFileSync('src/components/dashboard/SunDaylightCard.tsx', `
"use client";

import React, { useMemo } from 'react';
import { Sun } from 'lucide-react';
import { City, CITIES } from '@/lib/geo/cities';
import { getSunTimes } from '@/lib/astronomy/sun';

interface SunDaylightCardProps {
  currentCity?: City;
}

export function SunDaylightCard({ currentCity = CITIES[0] }: SunDaylightCardProps) {
  const sun = useMemo(() => {
    return getSunTimes(new Date(), currentCity.lat, currentCity.lng, currentCity.timezone);
  }, [currentCity]);

  // SVG Arc coordinates (viewBox 0 0 300 120)
  // Arc starts at (40, 95), peaks at (150, 20), ends at (260, 95)
  // Quadratic bezier: M 40 95 Q 150 -15 260 95
  const progressClamped = Math.max(0, Math.min(100, sun.dayProgressPercent)) / 100;
  // Parametric quadratic bezier formula: B(t) = (1-t)^2 P0 + 2(1-t)t P1 + t^2 P2
  const t = progressClamped;
  const p0 = { x: 40, y: 95 };
  const p1 = { x: 150, y: -10 };
  const p2 = { x: 260, y: 95 };

  const sunX = (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x;
  const sunY = (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-6 flex flex-col justify-between transition-all">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-2">
        <div className="w-7 h-7 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center">
          <Sun className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
            Sun & Daylight
          </h3>
          <p className="text-[11px] text-slate-400 dark:text-slate-500">
            Sunrise, sunset and more for {currentCity.name}
          </p>
        </div>
      </div>

      {/* Daylight Arc SVG Visualization */}
      <div className="w-full my-2 flex justify-center">
        <svg viewBox="0 0 300 120" className="w-full max-w-[280px] h-28" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Horizon line */}
          <line x1="20" y1="95" x2="280" y2="95" stroke="#e2e8f0" strokeDasharray="3 3" strokeWidth="1.5" />

          {/* Sunlight curved path */}
          <path d="M 40 95 Q 150 -10 260 95" stroke="#fcd34d" strokeWidth="3" strokeLinecap="round" />

          {/* Sunrise Point */}
          <circle cx="40" cy="95" r="4" fill="#f59e0b" />
          <text x="40" y="112" textAnchor="middle" fill="#0f172a" className="text-[11px] font-bold font-mono">
            {sun.sunrise}
          </text>
          <text x="40" y="122" textAnchor="middle" fill="#94a3b8" className="text-[9px]">
            Sunrise
          </text>

          {/* Sunset Point */}
          <circle cx="260" cy="95" r="4" fill="#f59e0b" />
          <text x="260" y="112" textAnchor="middle" fill="#0f172a" className="text-[11px] font-bold font-mono">
            {sun.sunset}
          </text>
          <text x="260" y="122" textAnchor="middle" fill="#94a3b8" className="text-[9px]">
            Sunset
          </text>

          {/* Glowing Animated Sun on the Arc */}
          <g transform={\`translate(\${sunX}, \${sunY})\`}>
            <circle cx="0" cy="0" r="10" fill="#fef08a" fillOpacity="0.6" className="animate-pulse" />
            <circle cx="0" cy="0" r="6" fill="#f59e0b" />
          </g>
        </svg>
      </div>

      {/* Bottom Metrics */}
      <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
        <div>
          <span className="text-sm font-bold text-slate-900 dark:text-white block">
            {sun.dayLengthFormatted}
          </span>
          <span className="text-[11px] text-slate-400 block">
            Day length
          </span>
        </div>
        <div>
          <span className="text-sm font-bold text-slate-900 dark:text-white block">
            {sun.dayProgressPercent}%
          </span>
          <span className="text-[11px] text-slate-400 block">
            Day complete
          </span>
        </div>
      </div>
    </div>
  );
}
`, 'utf8');

// DateCalendarCard.tsx
fs.writeFileSync('src/components/dashboard/DateCalendarCard.tsx', `
"use client";

import React from 'react';
import { Calendar, CheckCircle2 } from 'lucide-react';
import { City, CITIES } from '@/lib/geo/cities';
import { formatDateInZone, isDstActive } from '@/lib/time/timezones';

interface DateCalendarCardProps {
  currentCity?: City;
}

export function DateCalendarCard({ currentCity = CITIES[0] }: DateCalendarCardProps) {
  const now = new Date();
  const dateFormatted = formatDateInZone(now, currentCity.timezone);
  
  // Calculate ISO week number
  const target = new Date(now.valueOf());
  const dayNr = (now.getUTCDay() + 6) % 7;
  target.setUTCDate(target.getUTCDate() - dayNr + 3);
  const firstThursday = target.valueOf();
  target.setUTCMonth(0, 1);
  if (target.getUTCDay() !== 4) {
    target.setUTCMonth(0, 1 + ((4 - target.getUTCDay()) + 7) % 7);
  }
  const weekNumber = 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);

  // Day of year
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const isLeap = (now.getFullYear() % 4 === 0 && now.getFullYear() % 100 !== 0) || (now.getFullYear() % 400 === 0);
  const totalDays = isLeap ? 366 : 365;
  const daysRemaining = totalDays - dayOfYear;
  const dst = isDstActive(now, currentCity.timezone);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-6 flex flex-col justify-between transition-all">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-7 h-7 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
          <Calendar className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
            Date & Calendar
          </h3>
          <p className="text-[11px] text-slate-400 dark:text-slate-500">
            Extra date information
          </p>
        </div>
      </div>

      {/* Date Banner */}
      <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
        <span>📅</span>
        <span>{dateFormatted}</span>
      </div>

      {/* Detailed rows */}
      <div className="space-y-2 my-2 text-xs">
        <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
          <span>Week number</span>
          <span className="font-bold text-slate-900 dark:text-white font-mono">{weekNumber}</span>
        </div>
        <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
          <span>Day of year</span>
          <span className="font-bold text-slate-900 dark:text-white font-mono">{dayOfYear} of {totalDays}</span>
        </div>
        <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
          <span>Days remaining</span>
          <span className="font-bold text-slate-900 dark:text-white font-mono">{daysRemaining}</span>
        </div>
      </div>

      {/* DST Status */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 block">
            Daylight saving time
          </span>
          <span className="text-[10px] text-slate-400 block">
            {dst ? 'Since late Mar • Until late Oct' : 'No daylight saving active'}
          </span>
        </div>

        <div className={\`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold \${
          dst
            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
        }\`}>
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{dst ? 'Active' : 'Inactive'}</span>
        </div>
      </div>
    </div>
  );
}
`, 'utf8');

console.log('TimeDifference, MeetingPlanner, SunDaylight, DateCalendar created successfully');
