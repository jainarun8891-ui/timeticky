"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getCityBySlug, CITIES } from '@/lib/geo/cities';
import { getCityRootSlug } from '@/lib/geo/city-lookup';
import { formatTimeInZone, formatDateInZone, getUtcOffsetString } from '@/lib/time/timezones';
import { getSyncedDate } from '@/lib/time/sync';

function EmbedClockContent() {
  const params = useSearchParams();
  const slug = params.get('city') || 'paris-france';
  const theme = params.get('theme') || 'light';
  const is24 = params.get('format') === '24';
  const showSeconds = params.get('seconds') !== 'false';

  const city = getCityBySlug(slug) || CITIES[0];
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(getSyncedDate()), 1000);
    return () => clearInterval(t);
  }, []);

  const hideBranding = params.get('branding') === 'false';

  const isDark = theme === 'dark';
  const isNavy = theme === 'navy';
  const isGlass = theme === 'glass';
  const isNeon = theme === 'neon';
  const isMinimal = theme === 'minimal';
  const isGold = theme === 'gold';

  const time = formatTimeInZone(now, city.timezone, is24, showSeconds);
  const date = formatDateInZone(now, city.timezone);
  const offset = getUtcOffsetString(now, city.timezone);

  let containerClasses = 'bg-white text-slate-900 border-slate-200';
  let numeralClasses = 'text-slate-900';
  let accentClasses = 'text-blue-500';

  if (isDark) {
    containerClasses = 'bg-slate-950 text-white border-slate-800';
    numeralClasses = 'text-white';
    accentClasses = 'text-blue-400';
  } else if (isNavy) {
    containerClasses = 'bg-[#0b132b] text-white border-[#1c2541]';
    numeralClasses = 'text-white';
    accentClasses = 'text-cyan-400';
  } else if (isGlass) {
    containerClasses = 'bg-slate-900/90 text-white border-white/10 backdrop-blur-md shadow-lg';
    numeralClasses = 'text-white drop-shadow-sm';
    accentClasses = 'text-indigo-400';
  } else if (isNeon) {
    containerClasses = 'bg-black text-emerald-400 border-emerald-950';
    numeralClasses = 'text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]';
    accentClasses = 'text-emerald-500';
  } else if (isMinimal) {
    containerClasses = 'bg-transparent text-slate-900 dark:text-white border-transparent';
    numeralClasses = 'text-slate-900 dark:text-white font-mono';
    accentClasses = 'text-slate-500';
  } else if (isGold) {
    containerClasses = 'bg-[#121214] text-[#f7e0a3] border-[#2e2a20]';
    numeralClasses = 'text-[#f7e0a3]';
    accentClasses = 'text-[#d4af37]';
  }

  return (
    <div className={`w-full h-full p-4 flex flex-col justify-between font-sans select-none box-border ${containerClasses}`}>
      <div className="flex justify-between items-center text-xs font-bold">
        <span className="truncate pr-2">{city.name}, {city.country}</span>
        <span className={`text-[10px] font-mono flex-shrink-0 ${accentClasses}`}>{offset}</span>
      </div>
      <div className={`text-3xl sm:text-4xl font-black font-mono tracking-tight my-1 ${numeralClasses}`}>
        {time}
      </div>
      <div className="flex justify-between items-center text-[10px] text-slate-400">
        <span className="truncate pr-2">{date}</span>
        {!hideBranding && (
          <a
            href={`https://www.timenumbers.com/time/${getCityRootSlug(city)}`}
            target="_blank"
            rel="noopener"
            className="text-blue-500 hover:underline font-bold flex-shrink-0"
          >
            TimeNumbers
          </a>
        )}
      </div>
    </div>
  );
}

export default function EmbedClock() {
  return (
    <Suspense fallback={<div className="p-4 text-xs text-slate-400">Loading live clock...</div>}>
      <EmbedClockContent />
    </Suspense>
  );
}
