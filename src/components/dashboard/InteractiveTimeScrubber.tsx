"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Clock, RotateCcw, Sun, Moon, Briefcase, Zap, Info } from 'lucide-react';
import { City, CITIES } from '@/lib/geo/cities';
import { getSyncedDate } from '@/lib/time/sync';
import { formatTimeInZone } from '@/lib/time/timezones';

interface TimeScrubberProps {
  activeCity: City;
  onSelectCity?: (city: City) => void;
}

const SCRUBBER_CITIES = [
  { id: 'tokyo-jp', name: 'Tokyo', country: 'Japan', flag: '🇯🇵', tz: 'Asia/Tokyo' },
  { id: 'new-york-us', name: 'New York', country: 'USA', flag: '🇺🇸', tz: 'America/New_York' },
  { id: 'paris-fr', name: 'Paris', country: 'France', flag: '🇫🇷', tz: 'Europe/Paris' },
  { id: 'london-gb', name: 'London', country: 'UK', flag: '🇬🇧', tz: 'Europe/London' },
  { id: 'dubai-ae', name: 'Dubai', country: 'UAE', flag: '🇦🇪', tz: 'Asia/Dubai' },
  { id: 'new-delhi-in', name: 'New Delhi', country: 'India', flag: '🇮🇳', tz: 'Asia/Kolkata' },
  { id: 'sydney-au', name: 'Sydney', country: 'Australia', flag: '🇦🇺', tz: 'Australia/Sydney' },
  { id: 'san-francisco-us', name: 'San Francisco', country: 'USA', flag: '🇺🇸', tz: 'America/Los_Angeles' }
];

export function InteractiveTimeScrubber({ activeCity, onSelectCity }: TimeScrubberProps) {
  const [realTime, setRealTime] = useState<Date>(getSyncedDate());
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [offsetMinutes, setOffsetMinutes] = useState(0);
  const scrubberTrackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTime(getSyncedDate());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const simulatedDate = new Date(realTime.getTime() + offsetMinutes * 60 * 1000);

  const getCityHour = (date: Date, tz: string) => {
    const str = formatTimeInZone(date, tz, false, true);
    const [h, m, s] = str.split(':').map(Number);
    return h + m / 60 + s / 3600;
  };

  const currentHour = getCityHour(simulatedDate, activeCity.timezone);
  const scrubberPercent = (currentHour / 24) * 100;

  const handleTrackInteraction = (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
    if (!scrubberTrackRef.current) return;
    const rect = scrubberTrackRef.current.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(rect.width, e.clientX - leftSafe(rect.left)));
    const targetHour = (clickX / rect.width) * 24;

    const baseHour = getCityHour(realTime, activeCity.timezone);
    const diffHours = targetHour - baseHour;
    setOffsetMinutes(Math.round(diffHours * 60));
    setIsScrubbing(true);
  };

  const leftSafe = (val: number) => val;

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    handleTrackInteraction(e);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      handleTrackInteraction(moveEvent);
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const resetToNow = () => {
    setOffsetMinutes(0);
    setIsScrubbing(false);
  };

  const getStatus = (hour: number) => {
    if (hour >= 9 && hour < 17) return { label: 'Working Hours', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' };
    if (hour >= 7 && hour < 22) return { label: 'Active / Awake', color: 'bg-amber-500/20 text-amber-400 border-amber-500/40' };
    return { label: 'Night / Sleeping', color: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40' };
  };

  return (
    <section className="w-full bg-white dark:bg-slate-900 rounded-[28px] border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-2xl shadow-black/40 backdrop-blur-xl">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200/90 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30 shadow-md">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-white tracking-tight">
                24-Hour World Time Scrubber
              </h2>
              {isScrubbing && (
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  Simulating
                </span>
              )}
            </div>
            <p className="text-xs text-zinc-400">
              Drag the luminous timeline bar to inspect simultaneous international hours and business overlap
            </p>
          </div>
        </div>

        {/* Reset to Live Time Pill */}
        <div className="flex items-center gap-2">
          {isScrubbing ? (
            <button
              onClick={resetToNow}
              type="button"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all animate-in fade-in"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Live Time</span>
            </button>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/60 text-emerald-400 border border-emerald-500/40">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Synced</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Interactive 24-Hour Scrubber Bar */}
      <div className="mb-6 select-none">
        {/* Hour Numbers Row across 24 hours */}
        <div className="flex justify-between text-[11px] font-mono text-zinc-400 px-1 mb-2 font-medium">
          <span>00:00</span>
          <span className="hidden sm:inline">03:00</span>
          <span>06:00</span>
          <span className="hidden sm:inline">09:00</span>
          <span className="font-bold text-amber-400">12:00 (Noon)</span>
          <span className="hidden sm:inline">15:00</span>
          <span>18:00</span>
          <span className="hidden sm:inline">21:00</span>
          <span>24:00</span>
        </div>

        {/* The Track with visual Day/Night gradient */}
        <div
          ref={scrubberTrackRef}
          onMouseDown={handleMouseDown}
          className="relative h-14 w-full rounded-2xl cursor-ew-resize overflow-visible shadow-inner border border-slate-200 dark:border-slate-700 bg-gradient-to-r from-[#030612] via-[#101b38] to-[#030612]"
        >
          {/* Working hours golden/green glow band for active city */}
          <div
            className="absolute top-0 bottom-0 bg-emerald-500/25 border-x border-emerald-500/50 pointer-events-none"
            style={{ left: '37.5%', width: '33.33%' }}
          >
            <div className="absolute top-1 left-2 text-[9px] font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1">
              <Briefcase className="w-3 h-3" />
              <span>Standard Business Window</span>
            </div>
          </div>

          {/* Hour Tick Lines */}
          <div className="absolute inset-0 flex justify-between px-0.5 pointer-events-none opacity-30">
            {Array.from({ length: 25 }).map((_, i) => (
              <div
                key={i}
                className={`h-full w-px ${i % 6 === 0 ? 'bg-white h-full' : 'bg-zinc-600 h-1/2 mt-auto'}`}
              />
            ))}
          </div>

          {/* Scrubber Cursor Head & Vertical Line */}
          <div
            className="absolute top-0 bottom-0 pointer-events-none transition-all duration-75 flex flex-col items-center"
            style={{ left: `${Math.max(0, Math.min(100, scrubberPercent))}%` }}
          >
            <div className="relative -top-3 w-8 h-8 rounded-full bg-blue-500 text-white shadow-xl shadow-blue-500/50 border-2 border-white flex items-center justify-center -translate-x-1/2">
              <Clock className="w-4 h-4" />
            </div>
            <div className="w-0.5 h-full bg-blue-400 -translate-x-1/2 shadow-md shadow-blue-400" />
          </div>
        </div>
      </div>

      {/* Synchronized World Cities Strips */}
      <div className="space-y-2">
        {SCRUBBER_CITIES.map((c) => {
          const isCurrent = c.name.toLowerCase() === activeCity.name.toLowerCase();
          const cityHour = getCityHour(simulatedDate, c.tz);
          const timeFormatted = formatTimeInZone(simulatedDate, c.tz, false, false);
          const status = getStatus(cityHour);

          return (
            <div
              key={c.id}
              onClick={() => {
                const found = CITIES.find(item => item.id === c.id || item.name.toLowerCase() === c.name.toLowerCase());
                if (found && onSelectCity) onSelectCity(found);
              }}
              className={`flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all modern-card border ${
                isCurrent
                  ? 'bg-blue-950/40 border-blue-500 ring-2 ring-blue-500/30 shadow-lg shadow-blue-500/10'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-white/5 hover:bg-slate-100 dark:bg-slate-800 hover:border-slate-200 dark:border-slate-700'
              }`}
            >
              {/* Left: Flag, City, Country */}
              <div className="flex items-center gap-3 min-w-[150px] sm:min-w-[180px]">
                <span className="text-2xl leading-none">{c.flag}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-white text-sm">
                      {c.name}
                    </span>
                    {isCurrent && (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-blue-600 text-white shadow-xs">
                        Active
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-zinc-400 font-medium block">
                    {c.country} • {c.tz.split('/')[1]}
                  </span>
                </div>
              </div>

              {/* Center: Business / Sleep status badge */}
              <div className="hidden sm:flex items-center">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1.5 ${status.color}`}>
                  {status.label.includes('Working') ? (
                    <Briefcase className="w-3.5 h-3.5" />
                  ) : status.label.includes('Awake') ? (
                    <Sun className="w-3.5 h-3.5" />
                  ) : (
                    <Moon className="w-3.5 h-3.5" />
                  )}
                  <span>{status.label}</span>
                </span>
              </div>

              {/* Right: Digital Time Digits */}
              <div className="text-right">
                <div className="text-xl sm:text-2xl font-black font-mono text-white tracking-tight leading-none">
                  {timeFormatted}
                </div>
                <span className="text-[11px] text-zinc-400 font-mono mt-1 block">
                  {new Intl.DateTimeFormat('en-US', { timeZone: c.tz, weekday: 'short', month: 'short', day: 'numeric' }).format(simulatedDate)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
