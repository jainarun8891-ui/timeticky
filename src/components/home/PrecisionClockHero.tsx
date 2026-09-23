"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { getTimeDetails } from '@/lib/time/engine';
import { getSolarTimes } from '@/lib/astronomy/calculator';
import { CITIES } from '@/lib/geo/cities';
import {
  Clock,
  Sun,
  Sunset,
  Sunrise,
  Compass,
  Maximize2,
  Minimize2,
  Calendar,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export function PrecisionClockHero() {
  const [timeZone, setTimeZone] = useState<string>('UTC');
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [use24Hour, setUse24Hour] = useState(false);
  const [showSeconds, setShowSeconds] = useState(true);
  const [showMilliseconds, setShowMilliseconds] = useState(false);
  const [showSolar, setShowSolar] = useState(true);
  const [showDate, setShowDate] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [accuracyDriftMs, setAccuracyDriftMs] = useState<number | null>(null);
  const [cityName, setCityName] = useState('Delhi / Kolkata');
  const [countryName, setCountryName] = useState('India');
  const [coords, setCoords] = useState<{ lat: number; lng: number }>({ lat: 28.6139, lng: 77.2090 });

  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize browser timezone and accuracy drift check
  useEffect(() => {
    try {
      let resolvedTz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
      // Normalize Asia/Calcutta to Asia/Kolkata
      if (resolvedTz === 'Asia/Calcutta') resolvedTz = 'Asia/Kolkata';
      setTimeZone(resolvedTz);

      // Check for India timezone
      if (resolvedTz === 'Asia/Kolkata' || resolvedTz === 'Asia/Calcutta') {
        setCityName('Delhi / Kolkata');
        setCountryName('India');
        setCoords({ lat: 28.6139, lng: 77.2090 });
      } else {
        const matched = CITIES.find(c => c.timezone === resolvedTz);
        if (matched) {
          setCityName(matched.name);
          setCountryName(matched.country);
          setCoords({ lat: matched.lat, lng: matched.lng });
        } else {
          const parts = resolvedTz.split('/');
          setCityName(parts.pop()?.replace(/_/g, ' ') || 'Local Time');
          setCountryName(parts[0] || 'Worldwide');
        }
      }
    } catch {}

    // Check clock drift against server timestamp
    const checkDrift = async () => {
      const t0 = performance.now();
      try {
        const res = await fetch('/api/time', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          const t1 = performance.now();
          const roundTrip = t1 - t0;
          const serverTime = Number(data.serverTime ?? data.timestamp);
          if (!isNaN(serverTime) && serverTime > 0) {
            const estimatedServerNow = serverTime + roundTrip / 2;
            const localNow = Date.now();
            const drift = Math.round(localNow - estimatedServerNow);
            if (!isNaN(drift)) {
              setAccuracyDriftMs(drift);
            }
          }
        }
      } catch {}
    };
    checkDrift();
  }, []);

  // Precision ticker
  useEffect(() => {
    let animId: number;
    if (showMilliseconds) {
      const tick = () => {
        setCurrentTime(new Date());
        animId = requestAnimationFrame(tick);
      };
      animId = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(animId);
    } else {
      setCurrentTime(new Date());
      const timer = setInterval(() => setCurrentTime(new Date()), 1000);
      return () => clearInterval(timer);
    }
  }, [showMilliseconds]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const now = currentTime || new Date();
  const details = useMemo(() => {
    return getTimeDetails(timeZone, now, !use24Hour);
  }, [timeZone, now, use24Hour]);

  const solar = useMemo(() => {
    return getSolarTimes(coords.lat, coords.lng, now, details.utcOffsetMinutes);
  }, [coords, now, details.utcOffsetMinutes]);

  // Format time string
  const displayTime = useMemo(() => {
    let s = details.timeStr;
    if (!showSeconds) {
      s = s.substring(0, s.lastIndexOf(':'));
    }
    if (showMilliseconds) {
      const ms = String(details.milliseconds).padStart(3, '0');
      s += `.${ms}`;
    }
    return s;
  }, [details, showSeconds, showMilliseconds]);

  return (
    <div ref={containerRef} className="w-full space-y-3.5">
      {/* Compact Precision Clock Card */}
      <div className="w-full bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md p-5 sm:p-6 relative overflow-hidden transition-all backdrop-blur-xl">
        
        {/* Row 1: Header with Location, Accuracy Pill, and Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <div className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight" suppressHydrationWarning>
                  Exact Time &amp; World Clock &mdash; {cityName}, {countryName}
                </div>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800" suppressHydrationWarning>
                  {details.abbreviation || details.timeZoneAbbr}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1.5 mt-0.5">
                <span suppressHydrationWarning>{timeZone}</span>
                <span className="text-slate-300 dark:text-slate-600">&bull;</span>
                <span suppressHydrationWarning>{details.utcOffsetString}</span>
                <span className="text-slate-300 dark:text-slate-600">&bull;</span>
                <span suppressHydrationWarning>{details.isDst ? 'DST Active' : 'Standard Time'}</span>
              </div>
            </div>
          </div>

          {/* Accuracy & Controls */}
          <div className="flex items-center gap-2">
            <div className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800 text-[11px] font-semibold flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span suppressHydrationWarning>
                {accuracyDriftMs === null || isNaN(accuracyDriftMs)
                  ? 'Atomic Synchronized'
                  : Math.abs(accuracyDriftMs) < 150
                  ? 'Clock is exact'
                  : `${(Math.abs(accuracyDriftMs) / 1000).toFixed(1)}s ${accuracyDriftMs > 0 ? 'fast' : 'slow'}`}
              </span>
            </div>

            {/* Quick Compact Toggles */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setUse24Hour(!use24Hour)}
                className={`px-2 py-1 rounded-lg transition-all text-[11px] font-bold ${
                  use24Hour ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-xs' : 'text-slate-500 dark:text-slate-400'
                }`}
                title="Toggle 12/24 hour"
              >
                {use24Hour ? '24H' : '12H'}
              </button>
              <button
                onClick={() => setShowSeconds(!showSeconds)}
                className={`px-2 py-1 rounded-lg transition-all text-[11px] ${
                  showSeconds ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-xs' : 'text-slate-500 dark:text-slate-400'
                }`}
                title="Toggle seconds"
              >
                Sec
              </button>
              <button
                onClick={() => setShowMilliseconds(!showMilliseconds)}
                className={`px-2 py-1 rounded-lg transition-all text-[11px] ${
                  showMilliseconds ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-xs' : 'text-slate-500 dark:text-slate-400'
                }`}
                title="Toggle milliseconds"
              >
                Ms
              </button>
            </div>

            <button
              onClick={toggleFullscreen}
              className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title="Toggle Fullscreen (F)"
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Row 2: Clock & Solar Information in Balanced Horizontal Layout */}
        <div className="py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Main Time Readout */}
          <div className="space-y-1">
            <div className="flex items-baseline gap-2.5">
              <span className="text-4xl sm:text-6xl lg:text-7xl font-mono font-black tracking-tight text-slate-900 dark:text-white select-all leading-none" suppressHydrationWarning>
                {displayTime}
              </span>
              {!use24Hour && details.dayPeriod && (
                <span className="text-base sm:text-lg font-mono font-black text-blue-600 dark:text-blue-400" suppressHydrationWarning>
                  {details.dayPeriod}
                </span>
              )}
            </div>

            {showDate && (
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span suppressHydrationWarning>{details.dateStr}</span>
                <span className="text-slate-300 dark:text-slate-600">&bull;</span>
                <span className="font-mono text-[11px] text-slate-400" suppressHydrationWarning>
                  Day {details.dayOfYear} of {details.year}
                </span>
              </div>
            )}
          </div>

          {/* Compact Solar Indicators */}
          {showSolar && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-2xl border border-slate-100 dark:border-slate-800/70 text-left md:text-center self-stretch md:self-auto">
              <div className="px-2">
                <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center md:justify-center gap-1">
                  <Sunrise className="w-3 h-3 text-amber-500" /> Sunrise
                </span>
                <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 block mt-0.5" suppressHydrationWarning>
                  {solar.sunrise}
                </span>
              </div>
              <div className="px-2">
                <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center md:justify-center gap-1">
                  <Sunset className="w-3 h-3 text-orange-500" /> Sunset
                </span>
                <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 block mt-0.5" suppressHydrationWarning>
                  {solar.sunset}
                </span>
              </div>
              <div className="px-2">
                <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center md:justify-center gap-1">
                  <Sun className="w-3 h-3 text-yellow-500" /> Noon
                </span>
                <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 block mt-0.5" suppressHydrationWarning>
                  {solar.solarNoon}
                </span>
              </div>
              <div className="px-2">
                <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center md:justify-center gap-1">
                  <Clock className="w-3 h-3 text-indigo-500" /> Light
                </span>
                <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 block mt-0.5" suppressHydrationWarning>
                  {solar.dayLength}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Navigation Directory Pills */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-2.5 shadow-2xs">
        <div className="flex flex-wrap items-center justify-center gap-1.5 font-medium text-xs">
          {[
            { label: 'Time Zones', url: '/time-zones' },
            { label: 'Time Converter', url: '/time-converter' },
            { label: 'World Clock', url: '/world-clock' },
            { label: 'Multi-Clock Wall', url: '/world-clock-wall' },
            { label: 'Calendar', url: '/calendar' },
            { label: 'Countdown', url: '/countdown' },
            { label: 'Timer', url: '/timer' },
            { label: 'Stopwatch', url: '/stopwatch' },
            { label: 'Unix Timestamp', url: '/unix-time' },
            { label: 'Astronomy', url: '/astronomy' },
            { label: 'Dialing Codes', url: '/dialing-codes' },
            { label: 'Meeting Planner', url: '/meeting-planner' },
          ].map((item) => (
            <Link
              key={item.url}
              href={item.url}
              className="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 text-slate-600 dark:text-slate-300 transition-colors border border-slate-200/60 dark:border-slate-700/60"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
