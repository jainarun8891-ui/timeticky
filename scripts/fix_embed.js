const fs = require('fs');

fs.writeFileSync('src/app/embed/clock/page.tsx', `
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
  const city = getCityBySlug(slug) || CITIES[0];
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(getSyncedDate()), 1000);
    return () => clearInterval(t);
  }, []);

  const isDark = theme === 'dark';
  const time = formatTimeInZone(now, city.timezone, false, true);
  const date = formatDateInZone(now, city.timezone);
  const offset = getUtcOffsetString(now, city.timezone);

  return (
    <div className={\`w-full h-full p-4 flex flex-col justify-between font-sans select-none \${isDark ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}\`}>
      <div className="flex justify-between items-center text-xs font-bold">
        <span>{city.name}, {city.country}</span>
        <span className="text-[10px] text-blue-500">{offset}</span>
      </div>
      <div className="text-3xl font-black font-mono tracking-tight my-1">{time}</div>
      <div className="flex justify-between text-[10px] text-slate-400">
        <span>{date}</span><span>GlobalTime</span>
      </div>
    </div>
  );
}

export default function EmbedClock() {
  return (
    <Suspense fallback={<div className="p-4 text-xs text-slate-400">Loading clock...</div>}>
      <EmbedClockContent />
    </Suspense>
  );
}
`, 'utf8');

console.log('Fixed embed/clock/page.tsx with Suspense');
