const fs = require('fs');
const path = require('path');

function write(p, c) {
  const fp = path.join('src', p);
  fs.mkdirSync(path.dirname(fp), { recursive: true });
  fs.writeFileSync(fp, c.trim() + '\n', 'utf8');
  console.log('Wrote:', p);
}

// 1. calendar
write('app/calendar/page.tsx', `
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Printer } from 'lucide-react';

export default function CalendarPage() {
  const [d, setD] = useState(new Date());
  const y = d.getFullYear();
  const m = d.getMonth();
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const first = new Date(y, m, 1).getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const prevDays = new Date(y, m, 0).getDate();

  const days = [];
  for (let i = first - 1; i >= 0; i--) days.push({ num: prevDays - i, cur: false });
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday = i === new Date().getDate() && m === new Date().getMonth() && y === new Date().getFullYear();
    days.push({ num: i, cur: true, isToday });
  }
  while (days.length % 7 !== 0) days.push({ num: days.length, cur: false });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Calendar {y}</h1>
          <p className="text-xs text-slate-500">Gregorian calendar with today highlight and week counts.</p>
        </div>
        <Link href="/compact-calendar" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold">
          <Printer className="w-3.5 h-3.5" /><span>Printable View</span>
        </Link>
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">{months[m]} {y}</h2>
          <div className="flex gap-2">
            <button onClick={() => setD(new Date(y, m - 1, 1))} className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"><ChevronLeft className="w-4 h-4" /></button>
            <button onClick={() => setD(new Date())} className="px-2.5 py-1 text-xs font-bold rounded-full bg-slate-100 dark:bg-slate-800">Today</button>
            <button onClick={() => setD(new Date(y, m + 1, 1))} className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-400 mb-2">
          <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((item, idx) => (
            <div key={idx} className={\`h-12 rounded-xl flex items-center justify-center text-xs font-semibold \${
              item.isToday ? 'bg-blue-600 text-white font-bold' : item.cur ? 'text-slate-800 dark:text-slate-200 hover:bg-slate-50' : 'text-slate-300 dark:text-slate-700'
            }\`}>
              <span>{item.num}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
`);

// 2. compact-calendar
write('app/compact-calendar/page.tsx', `
import React from 'react';
import Link from 'next/link';

export default function CompactCalendarPage() {
  const year = new Date().getFullYear();
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{year} Year Overview</h1>
        <Link href="/calendar" className="text-xs text-blue-600 font-semibold">Monthly Calendar →</Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {months.map((name, mIdx) => {
          const days = new Date(year, mIdx + 1, 0).getDate();
          return (
            <div key={name} className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-2">{name}</h3>
              <div className="grid grid-cols-7 gap-1 text-[11px] font-mono text-slate-600 dark:text-slate-300">
                {Array.from({ length: days }).map((_, i) => (
                  <div key={i} className="py-0.5">{i + 1}</div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
`);

// 3. week-number
write('app/week-number/page.tsx', `
import React from 'react';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata = buildPageMetadata('Current ISO Week Number', 'Current ISO 8601 week number and day of the year.', '/week-number');

export default function WeekNumberPage() {
  const now = new Date();
  const target = new Date(now.valueOf());
  const dayNr = (now.getUTCDay() + 6) % 7;
  target.setUTCDate(target.getUTCDate() - dayNr + 3);
  const firstThursday = target.valueOf();
  target.setUTCMonth(0, 1);
  if (target.getUTCDay() !== 4) target.setUTCMonth(0, 1 + ((4 - target.getUTCDay()) + 7) % 7);
  const weekNumber = 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);

  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / 86400000);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-center space-y-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Current Week Number</h1>
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-10 shadow-sm">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block">Current ISO Week</span>
        <div className="text-8xl font-black font-mono my-4 text-slate-900 dark:text-white">{weekNumber}</div>
        <p className="text-xs text-slate-400">Day {dayOfYear} of 365 • Year {now.getFullYear()}</p>
      </div>
    </div>
  );
}
`);

// 4. holidays
write('app/holidays/page.tsx', `
import React from 'react';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata = buildPageMetadata('World Public Holidays', 'Public holidays and observances across major countries.', '/holidays');

export default function HolidaysPage() {
  const holidays = [
    { name: "New Year's Day", date: "Jan 1, 2026", type: "Public Holiday", country: "Global" },
    { name: "Republic Day", date: "Jan 26, 2026", type: "National Day", country: "India" },
    { name: "Good Friday", date: "Apr 3, 2026", type: "Religious Holiday", country: "International" },
    { name: "Labor Day", date: "May 1, 2026", type: "Public Holiday", country: "Global" },
    { name: "Independence Day", date: "Jul 4, 2026", type: "Federal Holiday", country: "United States" },
    { name: "Bastille Day", date: "Jul 14, 2026", type: "National Holiday", country: "France" },
    { name: "Christmas Day", date: "Dec 25, 2026", type: "Public Holiday", country: "Global" }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Public Holidays & Observances</h1>
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm divide-y divide-slate-100 dark:divide-slate-800 text-xs">
        {holidays.map((h, i) => (
          <div key={i} className="py-3 flex justify-between items-center">
            <div><span className="font-bold text-slate-900 dark:text-white block">{h.name}</span><span className="text-slate-400">{h.country}</span></div>
            <div className="text-right"><span className="font-mono font-bold text-slate-800 dark:text-slate-200 block">{h.date}</span><span className="text-blue-600 font-semibold">{h.type}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}
`);

// 5. clock
write('app/clock/page.tsx', `
"use client";
import React, { useState, useEffect } from 'react';
import { Maximize2, Moon, Sun } from 'lucide-react';
import { getSyncedDate } from '@/lib/time/sync';

export default function ClockPage() {
  const [time, setTime] = useState(new Date());
  const [is24, setIs24] = useState(true);
  const [showSec, setShowSec] = useState(true);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setTime(getSyncedDate()), 1000);
    return () => clearInterval(t);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
    else document.exitFullscreen().catch(() => {});
  };

  const h = is24 ? time.getHours() : (time.getHours() % 12 || 12);
  const str = \`\${String(h).padStart(2, '0')}:\${String(time.getMinutes()).padStart(2, '0')}\${showSec ? ':' + String(time.getSeconds()).padStart(2, '0') : ''}\`;

  return (
    <div className={\`w-full min-h-[80vh] flex flex-col items-center justify-center p-6 select-none transition-colors \${isDark ? 'bg-black text-white' : 'bg-white text-slate-900'}\`}>
      <div className="text-center">
        <div className="text-6xl sm:text-9xl md:text-[13rem] font-black font-mono tracking-tight leading-none">
          {str}
        </div>
        <p className="text-base sm:text-xl font-bold text-slate-400 mt-6">
          {time.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>
      <div className="mt-8 flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-2 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300">
        <button onClick={() => setIs24(!is24)} className="px-3 py-1 rounded-full hover:bg-white">{is24 ? '24h' : '12h'}</button>
        <button onClick={() => setShowSec(!showSec)} className="px-3 py-1 rounded-full hover:bg-white">{showSec ? 'Hide sec' : 'Show sec'}</button>
        <button onClick={() => setIsDark(!isDark)} className="p-1.5 rounded-full hover:bg-white"><Sun className="w-3.5 h-3.5" /></button>
        <button onClick={toggleFullscreen} className="p-1.5 rounded-full hover:bg-white"><Maximize2 className="w-3.5 h-3.5" /></button>
      </div>
    </div>
  );
}
`);

// 6. clock-accuracy
write('app/clock-accuracy/page.tsx', `
"use client";
import React, { useState, useEffect } from 'react';
import { syncWithServer, SyncState } from '@/lib/time/sync';
import { CheckCircle2, RotateCcw } from 'lucide-react';

export default function ClockAccuracyPage() {
  const [sync, setSync] = useState<SyncState | null>(null);
  const check = () => syncWithServer().then(setSync);
  useEffect(() => { check(); }, []);

  const offset = sync?.offsetMs || 0;
  const isExact = Math.abs(offset) < 200;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-center space-y-6">
      <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white">Clock Accuracy Verification</h1>
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
        <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
          {isExact ? 'Your device clock is synchronized' : \`Offset: \${offset} ms\`}
        </h2>
        <p className="text-xs text-slate-400 mt-1">Estimated accuracy: ±{sync?.accuracyMs || 10} ms</p>
        <button onClick={check} className="mt-4 px-4 py-2 rounded-full bg-blue-600 text-white text-xs font-bold inline-flex items-center gap-1.5">
          <RotateCcw className="w-3.5 h-3.5" /><span>Re-verify</span>
        </button>
      </div>
    </div>
  );
}
`);

console.log('Routes C1 written');
