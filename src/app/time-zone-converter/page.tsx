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
