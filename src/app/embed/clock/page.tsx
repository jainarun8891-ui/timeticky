"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getCityBySlug, CITIES } from '@/lib/geo/cities';
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

  const isDark = theme === 'dark';
  const isNavy = theme === 'navy';

  const time = formatTimeInZone(now, city.timezone, is24, showSeconds);
  const date = formatDateInZone(now, city.timezone);
  const offset = getUtcOffsetString(now, city.timezone);

  const containerClasses = isDark
    ? 'bg-slate-950 text-white border-slate-800'
    : isNavy
    ? 'bg-[#0b132b] text-white border-[#1c2541]'
    : 'bg-white text-slate-900 border-slate-200';

  return (
    <div className={`w-full h-full p-4 flex flex-col justify-between font-sans select-none box-border ${containerClasses}`}>
      <div className="flex justify-between items-center text-xs font-bold">
        <span className="truncate pr-2">{city.name}, {city.country}</span>
        <span className="text-[10px] text-blue-500 font-mono flex-shrink-0">{offset}</span>
      </div>
      <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight my-1">
        {time}
      </div>
      <div className="flex justify-between items-center text-[10px] text-slate-400">
        <span className="truncate pr-2">{date}</span>
        <a
          href={`https://timenumbers.com/time/${city.slug}`}
          target="_blank"
          rel="noopener"
          className="text-blue-500 hover:underline font-bold flex-shrink-0"
        >
          TimeNumbers
        </a>
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
