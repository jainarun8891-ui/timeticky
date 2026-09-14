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
    <div className="bg-white dark:bg-slate-900 rounded-[28px] border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 sm:p-7 flex flex-col justify-between transition-all hover:shadow-md">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
          <ArrowLeftRight className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
            Time Difference
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
            How does time in {currentCity.name} compare?
          </p>
        </div>
      </div>

      {/* City Comparison List */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800/70 my-1 flex-1 flex flex-col justify-around">
        {comparisonCities.map((other) => {
          const diff = getTimeDifference(currentCity.timezone, other.timezone);

          return (
            <Link
              key={other.id}
              href={\`/compare/\${currentCity.slug}/\${other.slug}\`}
              className="py-2.5 flex items-center justify-between group hover:bg-slate-50/80 dark:hover:bg-slate-800/50 px-2 rounded-xl transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">
                  {other.countryCode === 'US' ? '🗽' :
                   other.countryCode === 'GB' ? '🕰️' :
                   other.countryCode === 'JP' ? '🗼' :
                   other.countryCode === 'AE' ? '⛵' :
                   other.countryCode === 'IN' ? '🏛️' :
                   other.countryCode === 'AU' ? '⛵' : '🏙️'}
                </span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 transition-colors">
                  {other.name}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={\`text-xs font-bold \${
                    diff.isAhead
                      ? 'text-amber-600 dark:text-amber-400'
                      : diff.diffMinutes === 0
                      ? 'text-slate-500'
                      : 'text-blue-600 dark:text-blue-400'
                  }\`}
                >
                  {diff.formatted}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
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
    <div className="bg-white dark:bg-slate-900 rounded-[28px] border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 sm:p-7 flex flex-col justify-between transition-all hover:shadow-md">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
          <Users className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
            Meeting Planner
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
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
            <span className="text-[10px] text-slate-400 block mt-0.5 font-medium">
              {p.hours}
            </span>
          </div>
        ))}
      </div>

      {/* 24-Hour Timeline Graphic with Overlap Band matching reference */}
      <div className="my-4">
        {/* Timeline Bar */}
        <div className="relative h-7 w-full bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden flex items-center">
          {/* Paris Work Band */}
          <div className="absolute left-[33%] w-[33%] h-full bg-blue-200/70 dark:bg-blue-900/50" />
          {/* London Work Band */}
          <div className="absolute left-[37%] w-[33%] h-full bg-indigo-200/70 dark:bg-indigo-900/50" />
          {/* Overlapping Best Window Highlight (Green) */}
          <div className="absolute left-[54%] w-[16%] h-full bg-emerald-400 dark:bg-emerald-500 border-x-2 border-emerald-600 shadow-xs" />
        </div>

        {/* Hour Marks */}
        <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1.5 px-1 font-semibold">
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
      <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-extrabold border border-emerald-200/60 dark:border-emerald-800/60">
          <Users className="w-3.5 h-3.5" />
          <span>Overlap: 13:00 – 17:00 (4 hours)</span>
        </div>

        <Link
          href="/meeting-planner"
          className="px-4 py-1.5 rounded-full bg-blue-50 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-slate-700 text-blue-600 dark:text-blue-400 text-xs font-bold transition-colors"
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

  // Quadratic bezier math for smooth daylight curve
  const progressClamped = Math.max(0, Math.min(100, sun.dayProgressPercent)) / 100;
  const t = progressClamped;
  const p0 = { x: 45, y: 95 };
  const p1 = { x: 150, y: -10 };
  const p2 = { x: 255, y: 95 };

  const sunX = (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x;
  const sunY = (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[28px] border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 sm:p-7 flex flex-col justify-between transition-all hover:shadow-md">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center">
          <Sun className="w-4.5 h-4.5" />
        </div>
        <div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
            Sun & Daylight
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
            Sunrise, sunset and more for {currentCity.name}
          </p>
        </div>
      </div>

      {/* Daylight Arc SVG Visualization matching reference image */}
      <div className="w-full my-2 flex justify-center">
        <svg viewBox="0 0 300 125" className="w-full max-w-[300px] h-32" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Horizon line */}
          <line x1="20" y1="95" x2="280" y2="95" stroke="#cbd5e1" strokeDasharray="3 3" strokeWidth="1.5" />

          {/* Sunlight curved path */}
          <path d="M 45 95 Q 150 -10 255 95" stroke="#fcd34d" strokeWidth="3.5" strokeLinecap="round" />

          {/* Sunrise Point */}
          <circle cx="45" cy="95" r="4.5" fill="#f59e0b" />
          <text x="45" y="112" textAnchor="middle" fill="#0f172a" className="text-xs font-black font-mono">
            {sun.sunrise}
          </text>
          <text x="45" y="123" textAnchor="middle" fill="#94a3b8" className="text-[10px] font-semibold">
            Sunrise
          </text>

          {/* Sunset Point */}
          <circle cx="255" cy="95" r="4.5" fill="#f59e0b" />
          <text x="255" y="112" textAnchor="middle" fill="#0f172a" className="text-xs font-black font-mono">
            {sun.sunset}
          </text>
          <text x="255" y="123" textAnchor="middle" fill="#94a3b8" className="text-[10px] font-semibold">
            Sunset
          </text>

          {/* Glowing Animated Sun on the Arc */}
          <g transform={\`translate(\${sunX}, \${sunY})\`}>
            <circle cx="0" cy="0" r="12" fill="#fef08a" fillOpacity="0.7" className="animate-pulse" />
            <circle cx="0" cy="0" r="7" fill="#f59e0b" />
            <circle cx="0" cy="0" r="3" fill="#ffffff" />
          </g>
        </svg>
      </div>

      {/* Bottom Metrics */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
        <div>
          <span className="text-base font-extrabold text-slate-900 dark:text-white block font-mono">
            {sun.dayLengthFormatted}
          </span>
          <span className="text-xs text-slate-400 font-medium block">
            Day length
          </span>
        </div>
        <div>
          <span className="text-base font-extrabold text-slate-900 dark:text-white block font-mono">
            {sun.dayProgressPercent}%
          </span>
          <span className="text-xs text-slate-400 font-medium block">
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
  
  // Calculate ISO week
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
  const dayOfYear = Math.floor(diff / 86400000);
  const isLeap = (now.getFullYear() % 4 === 0 && now.getFullYear() % 100 !== 0) || (now.getFullYear() % 400 === 0);
  const totalDays = isLeap ? 366 : 365;
  const daysRemaining = totalDays - dayOfYear;
  const dst = isDstActive(now, currentCity.timezone);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[28px] border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 sm:p-7 flex flex-col justify-between transition-all hover:shadow-md">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
          <Calendar className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
            Date & Calendar
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
            Extra date information
          </p>
        </div>
      </div>

      {/* Date Banner */}
      <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-2.5 text-xs font-bold text-slate-800 dark:text-slate-200">
        <span>📅</span>
        <span>{dateFormatted}</span>
      </div>

      {/* Detailed rows */}
      <div className="space-y-2.5 my-3 text-xs">
        <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
          <span className="font-medium">Week number</span>
          <span className="font-black text-slate-900 dark:text-white font-mono text-sm">{weekNumber}</span>
        </div>
        <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
          <span className="font-medium">Day of year</span>
          <span className="font-black text-slate-900 dark:text-white font-mono text-sm">{dayOfYear} of {totalDays}</span>
        </div>
        <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
          <span className="font-medium">Days remaining</span>
          <span className="font-black text-slate-900 dark:text-white font-mono text-sm">{daysRemaining}</span>
        </div>
      </div>

      {/* DST Status */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200 block">
            Daylight saving time
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5 font-medium">
            {dst ? 'Since late Mar • Until late Oct' : 'No daylight saving active'}
          </span>
        </div>

        <div className={\`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold \${
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

// QuickTimerCard.tsx
fs.writeFileSync('src/components/dashboard/QuickTimerCard.tsx', `
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Timer as TimerIcon, Play, Pause, RotateCcw } from 'lucide-react';

export function QuickTimerCard() {
  const [activeTab, setActiveTab] = useState<'countdown' | 'stopwatch' | 'timer'>('countdown');
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('25');
  const [seconds, setSeconds] = useState('00');
  const [remainingSeconds, setRemainingSeconds] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const playChime = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.8);
    } catch (e) {}
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            clearInterval(timerRef.current!);
            playChime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const handleStart = () => {
    if (!isRunning && remainingSeconds === 0) {
      const h = parseInt(hours, 10) || 0;
      const m = parseInt(minutes, 10) || 0;
      const s = parseInt(seconds, 10) || 0;
      const total = h * 3600 + m * 60 + s;
      setRemainingSeconds(total > 0 ? total : 25 * 60);
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    const h = parseInt(hours, 10) || 0;
    const m = parseInt(minutes, 10) || 0;
    const s = parseInt(seconds, 10) || 0;
    setRemainingSeconds(h * 3600 + m * 60 + s);
  };

  const dispH = String(Math.floor(remainingSeconds / 3600)).padStart(2, '0');
  const dispM = String(Math.floor((remainingSeconds % 3600) / 60)).padStart(2, '0');
  const dispS = String(remainingSeconds % 60).padStart(2, '0');

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[28px] border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 sm:p-7 flex flex-col justify-between transition-all hover:shadow-md">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
          <TimerIcon className="w-4.5 h-4.5" />
        </div>
        <div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
            Timer / Countdown
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
            Stay on track
          </p>
        </div>
      </div>

      {/* Mode Switcher Pill */}
      <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1.5 rounded-full text-xs font-bold mb-4">
        {(['countdown', 'stopwatch', 'timer'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            type="button"
            className={\`flex-1 py-1.5 rounded-full capitalize transition-all \${
              activeTab === tab
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }\`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Input / Display Digits */}
      <div className="flex items-center justify-center gap-3 my-2 font-mono">
        <div className="flex items-center gap-1.5">
          <input
            type="text"
            maxLength={2}
            value={isRunning ? dispH : hours}
            disabled={isRunning}
            onChange={(e) => {
              setHours(e.target.value.padStart(2, '0'));
              setRemainingSeconds(parseInt(e.target.value || '0', 10) * 3600 + parseInt(minutes, 10) * 60 + parseInt(seconds, 10));
            }}
            className="w-14 h-12 text-center text-xl font-black bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white shadow-inner"
          />
          <span className="text-xs text-slate-400 font-sans font-bold">h</span>
        </div>

        <div className="flex items-center gap-1.5">
          <input
            type="text"
            maxLength={2}
            value={isRunning ? dispM : minutes}
            disabled={isRunning}
            onChange={(e) => {
              setMinutes(e.target.value.padStart(2, '0'));
              setRemainingSeconds(parseInt(hours, 10) * 3600 + parseInt(e.target.value || '0', 10) * 60 + parseInt(seconds, 10));
            }}
            className="w-14 h-12 text-center text-xl font-black bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white shadow-inner"
          />
          <span className="text-xs text-slate-400 font-sans font-bold">m</span>
        </div>

        <div className="flex items-center gap-1.5">
          <input
            type="text"
            maxLength={2}
            value={isRunning ? dispS : seconds}
            disabled={isRunning}
            onChange={(e) => {
              setSeconds(e.target.value.padStart(2, '0'));
              setRemainingSeconds(parseInt(hours, 10) * 3600 + parseInt(minutes, 10) * 60 + parseInt(e.target.value || '0', 10));
            }}
            className="w-14 h-12 text-center text-xl font-black bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white shadow-inner"
          />
          <span className="text-xs text-slate-400 font-sans font-bold">s</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={handleStart}
          type="button"
          className="flex-1 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-sm transition-all"
        >
          {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span>{isRunning ? 'Pause' : 'Start'}</span>
        </button>

        <button
          onClick={handleReset}
          type="button"
          aria-label="Reset timer"
          className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
`, 'utf8');

console.log('Middle cards and QuickTimer updated');
