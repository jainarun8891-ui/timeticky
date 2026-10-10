"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getTimeDetails, TimeDetails } from '@/lib/time/engine';
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
  Globe,
  MapPin,
  ArrowRightLeft
} from 'lucide-react';

export function PrecisionClockHero() {
  const pathname = usePathname();
  const isSpanish = pathname?.startsWith('/es') ?? false;

  // Local Time State (Defaults to New Delhi / Asia/Kolkata on initial render)
  const [localTimeZone, setLocalTimeZone] = useState<string>('Asia/Kolkata');
  const [cityName, setCityName] = useState('New Delhi');
  const [countryName, setCountryName] = useState('India');
  const [coords, setCoords] = useState<{ lat: number; lng: number }>({ lat: 28.6139, lng: 77.2090 });

  // Clock Display Options
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [use24Hour, setUse24Hour] = useState(false);
  const [showSeconds, setShowSeconds] = useState(true);
  const [showMilliseconds, setShowMilliseconds] = useState(false);
  const [showSolar, setShowSolar] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [accuracyDriftMs, setAccuracyDriftMs] = useState<number | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize browser timezone and accuracy drift check
  useEffect(() => {
    setIsHydrated(true);
    try {
      let resolvedTz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata';
      // Normalize Asia/Calcutta to Asia/Kolkata
      if (resolvedTz === 'Asia/Calcutta') resolvedTz = 'Asia/Kolkata';
      setLocalTimeZone(resolvedTz);

      if (resolvedTz === 'Asia/Kolkata') {
        setCityName('New Delhi');
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
          const cityRaw = parts.pop()?.replace(/_/g, ' ') || 'Local Time';
          const regionRaw = parts[0] || 'Worldwide';
          setCityName(cityRaw);
          setCountryName(regionRaw);
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

  // Local Time Calculations
  const localDetails = useMemo(() => {
    return getTimeDetails(localTimeZone, now, !use24Hour);
  }, [localTimeZone, now, use24Hour]);

  // Universal Global Time (UTC) Calculations
  const utcDetails = useMemo(() => {
    return getTimeDetails('UTC', now, !use24Hour);
  }, [now, use24Hour]);

  // Local Solar Ephemeris
  const solar = useMemo(() => {
    return getSolarTimes(coords.lat, coords.lng, now, localDetails.utcOffsetMinutes);
  }, [coords, now, localDetails.utcOffsetMinutes]);

  // Helper to format time strings
  const formatTimeString = (details: TimeDetails) => {
    let s = details.timeStr;
    if (!showSeconds) {
      s = s.substring(0, s.lastIndexOf(':'));
    }
    if (showMilliseconds) {
      const ms = String(details.milliseconds).padStart(3, '0');
      s += `.${ms}`;
    }
    return s;
  };

  const displayLocalTime = useMemo(() => formatTimeString(localDetails), [localDetails, showSeconds, showMilliseconds]);
  const displayUtcTime = useMemo(() => formatTimeString(utcDetails), [utcDetails, showSeconds, showMilliseconds]);

  // Localized city and country names
  const displayCityName = useMemo(() => {
    if (isSpanish) {
      if (cityName === 'New Delhi') return 'Nueva Delhi';
      if (cityName === 'Local Time') return 'Hora Local';
    }
    return cityName;
  }, [cityName, isSpanish]);

  const displayCountryName = useMemo(() => {
    if (isSpanish) {
      if (countryName === 'India') return 'India';
      if (countryName === 'Worldwide') return 'Mundial';
    }
    return countryName;
  }, [countryName, isSpanish]);

  // Localized date strings
  const displayLocalDateStr = useMemo(() => {
    if (isSpanish) {
      try {
        const str = new Intl.DateTimeFormat('es-ES', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          timeZone: localTimeZone
        }).format(now);
        return str.charAt(0).toUpperCase() + str.slice(1);
      } catch {
        return localDetails.dateStr;
      }
    }
    return localDetails.dateStr;
  }, [isSpanish, localTimeZone, now, localDetails.dateStr]);

  const displayUtcDateStr = useMemo(() => {
    if (isSpanish) {
      try {
        const str = new Intl.DateTimeFormat('es-ES', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          timeZone: 'UTC'
        }).format(now);
        return str.charAt(0).toUpperCase() + str.slice(1);
      } catch {
        return utcDetails.dateStr;
      }
    }
    return utcDetails.dateStr;
  }, [isSpanish, now, utcDetails.dateStr]);

  // Time difference relative to UTC
  const timeDifferenceText = useMemo(() => {
    const diffMinutes = localDetails.utcOffsetMinutes;
    if (diffMinutes === 0) {
      return isSpanish ? 'Misma hora que UTC (0h)' : 'Same as UTC (0h offset)';
    }
    const absMins = Math.abs(diffMinutes);
    const hrs = Math.floor(absMins / 60);
    const mins = absMins % 60;
    const timeSpan = `${hrs}h${mins > 0 ? ` ${mins}m` : ''}`;
    if (diffMinutes > 0) {
      return isSpanish ? `${timeSpan} por delante de UTC` : `${timeSpan} ahead of UTC`;
    } else {
      return isSpanish ? `${timeSpan} por detrás de UTC` : `${timeSpan} behind UTC`;
    }
  }, [localDetails.utcOffsetMinutes, isSpanish]);

  const directoryPills = useMemo(() => {
    return isSpanish
      ? [
          { label: 'Zonas Horarias', url: '/es/time-zones' },
          { label: 'Conversor de Horas', url: '/es/converter' },
          { label: 'Reloj Mundial', url: '/es/world-clock' },
          { label: 'Muro Multireloj', url: '/es/world-clock-wall' },
          { label: 'Calendario', url: '/es/calendar' },
          { label: 'Cuenta Atrás', url: '/es/countdown' },
          { label: 'Temporizador', url: '/es/timer' },
          { label: 'Cronómetro', url: '/es/stopwatch' },
          { label: 'Timestamp Unix', url: '/es/unix-time' },
          { label: 'Astronomía', url: '/es/sun' },
          { label: 'Prefijos Telefónicos', url: '/es/dialing-codes' },
          { label: 'Planificador de Reuniones', url: '/es/meeting-planner' },
        ]
      : [
          { label: 'Time Zones', url: '/time-zones' },
          { label: 'Time Converter', url: '/converter' },
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
        ];
  }, [isSpanish]);

  return (
    <div ref={containerRef} className="w-full space-y-3.5">
      {/* Compact Precision Dual Clock Card */}
      <div className="w-full bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md p-4 sm:p-6 relative overflow-hidden transition-all backdrop-blur-xl space-y-4">
        
        {/* Row 1: Header with Dual Label Indicator, Offset Badge, and Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Compass className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
                {isSpanish ? 'Reloj de Precisión en Vivo' : 'Live Precision Chronometer'}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800">
                <ArrowRightLeft className="w-3 h-3" />
                <span suppressHydrationWarning>{timeDifferenceText}</span>
              </span>
            </div>
          </div>

          {/* Accuracy & Display Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800 text-[11px] font-semibold flex items-center gap-1.5 shrink-0">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="truncate" suppressHydrationWarning>
                {!isHydrated
                  ? (isSpanish ? 'Sincronizado' : 'Synchronized')
                  : accuracyDriftMs === null || isNaN(accuracyDriftMs)
                  ? (isSpanish ? 'Sincronizado' : 'Synchronized')
                  : Math.abs(accuracyDriftMs) < 150
                  ? (isSpanish ? 'Sincronizado' : 'Synchronized')
                  : `${(Math.abs(accuracyDriftMs) / 1000).toFixed(1)}s ${accuracyDriftMs > 0 ? (isSpanish ? 'adelantado' : 'fast') : (isSpanish ? 'lento' : 'slow')}`}
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
                {isSpanish ? 'Seg' : 'Sec'}
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
              title={isSpanish ? "Pantalla completa (F)" : "Toggle Fullscreen (F)"}
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Row 2: Side-By-Side Clocks (Your Local Time & Universal Global Time UTC) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
          
          {/* Card 1: Your Local Time (New Delhi) */}
          <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-blue-50/70 via-white to-slate-50/40 dark:from-blue-950/25 dark:via-slate-900 dark:to-slate-900/90 border border-blue-200/80 dark:border-blue-900/50 shadow-xs flex flex-col justify-between space-y-3">
            {/* Header Badge */}
            <div className="flex items-center justify-between gap-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-600 text-white text-xs font-black shadow-xs tracking-tight">
                <MapPin className="w-3.5 h-3.5" />
                <span>{isSpanish ? 'Tu Hora Local' : 'Your Local Time'} ({displayCityName})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-800" suppressHydrationWarning>
                  {localDetails.abbreviation || localDetails.timeZoneAbbr}
                </span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300" suppressHydrationWarning>
                  {localDetails.utcOffsetString}
                </span>
              </div>
            </div>

            {/* City Subtitle */}
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span suppressHydrationWarning>{displayCityName}, {displayCountryName}</span>
              <span className="text-slate-300 dark:text-slate-600 mx-1.5">&bull;</span>
              <span className="font-mono text-[11px]" suppressHydrationWarning>{localTimeZone}</span>
            </div>

            {/* Clock Digits */}
            <div className="py-1">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-5xl font-mono font-black tracking-tight text-slate-900 dark:text-white select-all leading-none" suppressHydrationWarning>
                  {displayLocalTime}
                </span>
                {!use24Hour && localDetails.dayPeriod && (
                  <span className="text-sm sm:text-base font-mono font-black text-blue-600 dark:text-blue-400" suppressHydrationWarning>
                    {localDetails.dayPeriod}
                  </span>
                )}
              </div>
            </div>

            {/* Date & DST Status */}
            <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5 font-semibold">
                <Calendar className="w-3.5 h-3.5 text-blue-500" />
                <span suppressHydrationWarning>{displayLocalDateStr}</span>
              </div>
              <span className="text-[11px] font-medium text-slate-400" suppressHydrationWarning>
                {localDetails.isDst ? (isSpanish ? 'Horario de verano' : 'DST Active') : (isSpanish ? 'Hora estándar' : 'Standard Time')}
              </span>
            </div>
          </div>

          {/* Card 2: Universal Global Time (UTC) */}
          <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-indigo-50/70 via-white to-slate-50/40 dark:from-indigo-950/25 dark:via-slate-900 dark:to-slate-900/90 border border-indigo-200/80 dark:border-indigo-900/50 shadow-xs flex flex-col justify-between space-y-3">
            {/* Header Badge */}
            <div className="flex items-center justify-between gap-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-600 text-white text-xs font-black shadow-xs tracking-tight">
                <Globe className="w-3.5 h-3.5" />
                <span>{isSpanish ? 'Hora Global Universal (UTC)' : 'Universal Global Time (UTC)'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-800">
                  UTC
                </span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  UTC+0:00
                </span>
              </div>
            </div>

            {/* UTC Subtitle */}
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span>{isSpanish ? 'Tiempo Universal Coordinado' : 'Coordinated Universal Time'}</span>
              <span className="text-slate-300 dark:text-slate-600 mx-1.5">&bull;</span>
              <span className="font-mono text-[11px]">Greenwich Meridian (ZULU)</span>
            </div>

            {/* Clock Digits */}
            <div className="py-1">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-5xl font-mono font-black tracking-tight text-slate-900 dark:text-white select-all leading-none" suppressHydrationWarning>
                  {displayUtcTime}
                </span>
                {!use24Hour && utcDetails.dayPeriod && (
                  <span className="text-sm sm:text-base font-mono font-black text-indigo-600 dark:text-indigo-400" suppressHydrationWarning>
                    {utcDetails.dayPeriod}
                  </span>
                )}
              </div>
            </div>

            {/* Date & Standard Info */}
            <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5 font-semibold">
                <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                <span suppressHydrationWarning>{displayUtcDateStr}</span>
              </div>
              <span className="text-[11px] font-medium text-slate-400">
                {isSpanish ? 'Referencia mundial' : 'Global Reference Standard'}
              </span>
            </div>
          </div>

        </div>

        {/* Compact Solar Indicators for Local Location */}
        {showSolar && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-2xl border border-slate-100 dark:border-slate-800/70 text-center">
            <div className="px-2">
              <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center justify-center gap-1">
                <Sunrise className="w-3 h-3 text-amber-500" /> {isSpanish ? 'Amanecer' : 'Sunrise'}
              </span>
              <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 block mt-0.5" suppressHydrationWarning>
                {solar.sunrise}
              </span>
            </div>
            <div className="px-2">
              <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center justify-center gap-1">
                <Sunset className="w-3 h-3 text-orange-500" /> {isSpanish ? 'Atardecer' : 'Sunset'}
              </span>
              <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 block mt-0.5" suppressHydrationWarning>
                {solar.sunset}
              </span>
            </div>
            <div className="px-2">
              <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center justify-center gap-1">
                <Sun className="w-3 h-3 text-yellow-500" /> {isSpanish ? 'Mediodía' : 'Noon'}
              </span>
              <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 block mt-0.5" suppressHydrationWarning>
                {solar.solarNoon}
              </span>
            </div>
            <div className="px-2">
              <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center justify-center gap-1">
                <Clock className="w-3 h-3 text-indigo-500" /> {isSpanish ? 'Luz solar' : 'Daylight'}
              </span>
              <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 block mt-0.5" suppressHydrationWarning>
                {solar.dayLength}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Quick Navigation Directory Pills */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-2.5 shadow-2xs">
        <div className="flex flex-wrap items-center justify-center gap-1.5 font-medium text-xs">
          {directoryPills.map((item) => (
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
