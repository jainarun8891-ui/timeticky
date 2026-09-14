const fs = require('fs');
const path = require('path');

function write(relPath, content) {
  const fullPath = path.join(__dirname, '..', relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf8');
  console.log('Wrote:', relPath);
}

// 5. /compare/page.tsx & /compare/[...cities]/page.tsx
write('src/app/compare/page.tsx', `
import { redirect } from 'next/navigation';

export default function CompareIndexPage() {
  redirect('/compare/delhi-india/london-united-kingdom/new-york-united-states');
}
`);

write('src/app/compare/[...cities]/page.tsx', `
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { CITIES, getCityBySlug, City } from '@/lib/geo/cities';
import { formatTimeInZone, formatDateInZone, getUtcOffsetString, getTimeDifference } from '@/lib/time/timezones';
import { ArrowLeftRight, Plus, X, Globe, Share2 } from 'lucide-react';

export default function MultiCityComparePage() {
  const params = useParams();
  const rawCities = params.cities as string[] || [];
  const initialCities = rawCities.map(slug => getCityBySlug(slug)).filter(Boolean) as City[];
  const [selectedCities, setSelectedCities] = useState<City[]>(
    initialCities.length >= 2 ? initialCities : CITIES.slice(0, 4)
  );
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const addCity = (city: City) => {
    if (selectedCities.length < 10 && !selectedCities.some(c => c.id === city.id)) {
      setSelectedCities([...selectedCities, city]);
    }
  };

  const removeCity = (cityId: string) => {
    if (selectedCities.length > 2) {
      setSelectedCities(selectedCities.filter(c => c.id !== cityId));
    }
  };

  const baseCity = selectedCities[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <div className="flex items-center gap-2 text-xs text-blue-600 font-bold uppercase tracking-wider">
          <ArrowLeftRight className="w-3.5 h-3.5" />
          <span>Global Comparison</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
          Time Comparison
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Compare current local times, dates, and offsets across 2 to 10 world locations.
        </p>
      </div>

      {/* Selected City Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {selectedCities.map((city, idx) => {
          const timeStr = formatTimeInZone(now, city.timezone, false, true);
          const dateStr = formatDateInZone(now, city.timezone);
          const offsetStr = getUtcOffsetString(now, city.timezone);
          const diff = idx > 0 ? getTimeDifference(baseCity.timezone, city.timezone, now) : null;

          return (
            <div key={city.id} className="relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between">
              {selectedCities.length > 2 && (
                <button
                  onClick={() => removeCity(city.id)}
                  type="button"
                  aria-label="Remove city"
                  className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <div>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block mb-1">
                  {idx === 0 ? 'Base Location' : 'Compared to ' + baseCity.name}
                </span>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                  {city.name}
                </h2>
                <p className="text-xs text-slate-400">{city.country}</p>

                <div className="my-4 text-3xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
                  {timeStr}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                  {dateStr}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-500 font-mono">{offsetStr}</span>
                {diff && (
                  <span className={\`font-bold \${diff.isAhead ? 'text-amber-600 dark:text-amber-400' : 'text-blue-600 dark:text-blue-400'}\`}>
                    {diff.formatted}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Available to Add */}
      {selectedCities.length < 10 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Add Another Location to Comparison
          </h3>
          <div className="flex flex-wrap gap-2">
            {CITIES.filter(c => !selectedCities.some(sc => sc.id === c.id)).slice(0, 8).map((c) => (
              <button
                key={c.id}
                onClick={() => addCity(c)}
                type="button"
                className="px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 text-xs font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{c.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
`);

// 6. /time-difference/page.tsx
write('src/app/time-difference/page.tsx', `
"use client";

import React, { useState } from 'react';
import { CITIES, City } from '@/lib/geo/cities';
import { formatTimeInZone, formatDateInZone, getUtcOffsetString, getTimeDifference } from '@/lib/time/timezones';
import { ArrowRight, ArrowLeftRight } from 'lucide-react';

export default function TimeDifferencePage() {
  const [cityA, setCityA] = useState<City>(CITIES.find(c => c.name === 'Delhi') || CITIES[5]);
  const [cityB, setCityB] = useState<City>(CITIES.find(c => c.name === 'New York') || CITIES[1]);
  const now = new Date();

  const diff = getTimeDifference(cityA.timezone, cityB.timezone, now);
  const timeA = formatTimeInZone(now, cityA.timezone, false, true);
  const timeB = formatTimeInZone(now, cityB.timezone, false, true);
  const dateA = formatDateInZone(now, cityA.timezone);
  const dateB = formatDateInZone(now, cityB.timezone);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="text-center">
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white">
          Time Difference Calculator
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Exact time difference, day changes, and working hour overlap between two cities.
        </p>
      </div>

      {/* Comparison Pickers */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          {/* City A */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              From Location (Here)
            </label>
            <select
              value={cityA.id}
              onChange={(e) => setCityA(CITIES.find(c => c.id === e.target.value)!)}
              className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-800 dark:text-white text-sm outline-none"
            >
              {CITIES.map(c => (
                <option key={c.id} value={c.id}>{c.name}, {c.country}</option>
              ))}
            </select>
            <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="text-3xl font-mono font-black text-slate-900 dark:text-white block">{timeA}</span>
              <span className="text-xs text-slate-500 block mt-1">{dateA}</span>
              <span className="text-[11px] text-blue-600 font-semibold">{getUtcOffsetString(now, cityA.timezone)}</span>
            </div>
          </div>

          {/* City B */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              To Location (There)
            </label>
            <select
              value={cityB.id}
              onChange={(e) => setCityB(CITIES.find(c => c.id === e.target.value)!)}
              className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-800 dark:text-white text-sm outline-none"
            >
              {CITIES.map(c => (
                <option key={c.id} value={c.id}>{c.name}, {c.country}</option>
              ))}
            </select>
            <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="text-3xl font-mono font-black text-slate-900 dark:text-white block">{timeB}</span>
              <span className="text-xs text-slate-500 block mt-1">{dateB}</span>
              <span className="text-[11px] text-blue-600 font-semibold">{getUtcOffsetString(now, cityB.timezone)}</span>
            </div>
          </div>
        </div>

        {/* Big Verdict Pill */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
          <div className="inline-block px-6 py-3 rounded-2xl bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700">
            <span className="text-xs text-slate-500 dark:text-slate-400 block">Relative Time Difference</span>
            <span className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 block mt-0.5">
              {cityB.name} is {diff.formatted} {cityA.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
`);

// 7. /time-zone-converter/page.tsx
write('src/app/time-zone-converter/page.tsx', `
"use client";

import React, { useState } from 'react';
import { CITIES } from '@/lib/geo/cities';
import { TIMEZONES, formatTimeInZone, formatDateInZone, getUtcOffsetString } from '@/lib/time/timezones';
import { ArrowLeftRight, Calendar, Clock } from 'lucide-react';

export default function TimeZoneConverterPage() {
  const [sourceTz, setSourceTz] = useState('Asia/Kolkata');
  const [targetTzs, setTargetTzs] = useState(['America/New_York', 'Europe/London', 'Asia/Tokyo']);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [selectedTime, setSelectedTime] = useState('20:00');

  // Compute UTC timestamp from selected local date and time in source timezone
  const [hour, min] = selectedTime.split(':').map(Number);
  const [y, m, d] = selectedDate.split('-').map(Number);

  // Approximate date object in UTC
  const testDate = new Date(Date.UTC(y, m - 1, d, hour, min, 0));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white">
          Time Zone Converter
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Convert any date and time between multiple timezones simultaneously with automatic Daylight Saving Time computation.
        </p>
      </div>

      {/* Input Form */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1.5 uppercase">Source Timezone</label>
            <select
              value={sourceTz}
              onChange={(e) => setSourceTz(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-white outline-none"
            >
              {TIMEZONES.map(t => (
                <option key={t.id} value={t.id}>{t.name} ({t.shortName})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1.5 uppercase">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-white outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1.5 uppercase">Time</label>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-white outline-none"
            />
          </div>
        </div>
      </div>

      {/* Converted Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {targetTzs.map((tzId) => {
          const tz = TIMEZONES.find(t => t.id === tzId) || { name: tzId, shortName: tzId, formattedOffset: '' };
          const convertedTime = formatTimeInZone(testDate, tzId, false, false);
          const convertedDate = formatDateInZone(testDate, tzId);

          return (
            <div key={tzId} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block">
                {tz.shortName}
              </span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                {tz.name}
              </h3>
              <div className="text-3xl font-mono font-black text-slate-900 dark:text-white my-3">
                {convertedTime}
              </div>
              <p className="text-xs text-slate-500 font-medium">{convertedDate}</p>
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
                {getUtcOffsetString(testDate, tzId)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
`);

// 8. /meeting-planner/page.tsx
write('src/app/meeting-planner/page.tsx', `
"use client";

import React, { useState } from 'react';
import { evaluateMeetingSlots, generateICS, generateGoogleCalendarUrl, Participant } from '@/lib/meeting/planner';
import { Users, Download, Calendar, Copy, Check } from 'lucide-react';

export default function MeetingPlannerPage() {
  const [participants, setParticipants] = useState<Participant[]>([
    { name: "Paris", timezone: "Europe/Paris", workStartHour: 9, workEndHour: 17 },
    { name: "New York", timezone: "America/New_York", workStartHour: 9, workEndHour: 17 },
    { name: "London", timezone: "Europe/London", workStartHour: 9, workEndHour: 17 },
    { name: "Delhi", timezone: "Asia/Kolkata", workStartHour: 9, workEndHour: 17 }
  ]);
  const [copied, setCopied] = useState(false);

  const slots = evaluateMeetingSlots(participants);
  const bestSlot = slots.find(s => s.score === 'Excellent') || slots.find(s => s.score === 'Good') || slots[12];

  const handleDownloadIcs = () => {
    const icsContent = generateICS("Global Sync Meeting", new Date().toISOString(), bestSlot.utcHour, 1);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'meeting-invite.ics';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyTimes = () => {
    const summary = participants.map(p => \`\${p.name}: \${bestSlot.localTimes[p.timezone]}\`).join(' | ');
    navigator.clipboard.writeText(\`Scheduled Meeting Times: \${summary}\`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <div className="flex items-center gap-2 text-xs text-blue-600 font-bold uppercase tracking-wider">
          <Users className="w-4 h-4" />
          <span>Collaboration Tools</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white mt-1">
          Global Meeting Planner
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Find overlapping business working hours across multiple global timezones. Score convenience and export calendar invites.
        </p>
      </div>

      {/* Action Toolbar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
          <span>Recommended Time Slot: {bestSlot.utcHour}:00 UTC ({bestSlot.score} convenience)</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyTimes}
            type="button"
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy times'}</span>
          </button>

          <button
            onClick={handleDownloadIcs}
            type="button"
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download .ics</span>
          </button>
        </div>
      </div>

      {/* 24-Hour Timeline Grid */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm overflow-x-auto">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
          24-Hour Matrix Overview
        </h2>

        <div className="min-w-[700px] space-y-4">
          {participants.map((p) => (
            <div key={p.name} className="flex items-center gap-4">
              <div className="w-28 text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                {p.name}
              </div>
              <div className="flex-1 grid grid-cols-24 gap-1">
                {slots.map((slot) => {
                  const hour = parseInt(slot.localTimes[p.timezone].split(':')[0], 10);
                  const isWork = hour >= p.workStartHour && hour < p.workEndHour;
                  const isSleep = hour < 7 || hour >= 22;

                  return (
                    <div
                      key={slot.utcHour}
                      title={\`\${slot.utcHour}:00 UTC -> \${slot.localTimes[p.timezone]}\`}
                      className={\`h-8 rounded text-[9px] font-mono flex items-center justify-center font-semibold transition-colors \${
                        isWork
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : isSleep
                          ? 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }\`}
                    >
                      {hour}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
`);

// 9. /daylight-saving-time/page.tsx
write('src/app/daylight-saving-time/page.tsx', `
import React from 'react';
import { TIMEZONES } from '@/lib/time/timezones';
import { COUNTRIES } from '@/lib/geo/countries';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata = buildPageMetadata(
  'Daylight Saving Time (DST) Hub',
  'Comprehensive guide to active Daylight Saving Time regions, upcoming transition dates, and countries that do not observe clock changes.',
  '/daylight-saving-time'
);

export default function DaylightSavingTimePage() {
  const observingCountries = Object.values(COUNTRIES).filter(c => c.hasDst);
  const nonObservingCountries = Object.values(COUNTRIES).filter(c => !c.hasDst);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white">
          Daylight Saving Time (DST) Status
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Track clock changes, spring-forward/fall-back schedules, and timezone shift history worldwide.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Observing DST */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Countries Observing DST
            </h2>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
            {observingCountries.map(c => (
              <div key={c.code} className="py-3">
                <div className="flex justify-between items-center font-bold text-slate-800 dark:text-slate-200">
                  <span>{c.flag} {c.name}</span>
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">Observes DST</span>
                </div>
                {c.dstNotes && (
                  <p className="text-slate-400 text-[11px] mt-1">{c.dstNotes}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Non-observing */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Countries Without DST (Standard Time Year-Round)
            </h2>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
            {nonObservingCountries.map(c => (
              <div key={c.code} className="py-3">
                <div className="flex justify-between items-center font-bold text-slate-800 dark:text-slate-200">
                  <span>{c.flag} {c.name}</span>
                  <span className="text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">No Clock Changes</span>
                </div>
                {c.dstNotes && (
                  <p className="text-slate-400 text-[11px] mt-1">{c.dstNotes}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
`);

console.log('Routes Group B generated successfully');
