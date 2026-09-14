"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { CITIES, City } from '@/lib/geo/cities';
import { getTimeDetails, getUtcOffsetMinutes, getUtcOffsetString } from '@/lib/time/engine';
import {
  ArrowLeftRight,
  Plus,
  Trash2,
  Share2,
  Check,
  Calendar,
  Clock,
  Sun,
  Moon,
  Briefcase,
  AlertCircle
} from 'lucide-react';

export function TimeConverterClient() {
  const [sourceCityId, setSourceCityId] = useState('delhi-in');
  const [targetCityIds, setTargetCityIds] = useState<string[]>(['new-york-us', 'london-gb', 'tokyo-jp', 'singapore-sg']);
  const [selectedDate, setSelectedDate] = useState('2026-09-14');
  const [selectedHour, setSelectedHour] = useState(10); // 10:00 AM default
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [use24Hour, setUse24Hour] = useState(false);
  const [shareToast, setShareToast] = useState(false);

  // Load from URL parameters
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const fromParam = params.get('from');
      const timeParam = params.get('time');
      const toParam = params.get('to');

      if (fromParam) {
        const found = CITIES.find(c => c.name.toLowerCase() === fromParam.toLowerCase() || c.id === fromParam.toLowerCase());
        if (found) setSourceCityId(found.id);
      }
      if (timeParam && timeParam.includes(':')) {
        const [h, m] = timeParam.split(':').map(Number);
        if (!isNaN(h)) setSelectedHour(h);
        if (!isNaN(m)) setSelectedMinute(m);
      }
      if (toParam) {
        const targets = toParam.split(',').map(name => {
          const c = CITIES.find(city => city.name.toLowerCase() === name.toLowerCase() || city.id === name.toLowerCase());
          return c?.id;
        }).filter((id): id is string => Boolean(id));
        if (targets.length > 0) setTargetCityIds(targets);
      }
    } catch {}
  }, []);

  const sourceCity = useMemo(() => {
    return CITIES.find(c => c.id === sourceCityId) || CITIES[0];
  }, [sourceCityId]);

  const targetCities = useMemo(() => {
    return targetCityIds
      .map(id => CITIES.find(c => c.id === id))
      .filter((c): c is City => Boolean(c));
  }, [targetCityIds]);

  // Calculate base UTC timestamp from source city local time
  const baseUtcTimestamp = useMemo(() => {
    const localDate = new Date(`${selectedDate}T${String(selectedHour).padStart(2, '0')}:${String(selectedMinute).padStart(2, '0')}:00`);
    const offsetMins = getUtcOffsetMinutes(sourceCity.timezone, localDate);
    // UTC ms = local ms - offsetMins * 60000
    return localDate.getTime() - offsetMins * 60000;
  }, [selectedDate, selectedHour, selectedMinute, sourceCity]);

  const removeTargetCity = (id: string) => {
    setTargetCityIds(prev => prev.filter(cId => cId !== id));
  };

  const addTargetCity = (id: string) => {
    if (!targetCityIds.includes(id)) {
      setTargetCityIds(prev => [...prev, id]);
    }
  };

  const shareUrl = () => {
    const fromName = sourceCity.name;
    const timeStr = `${String(selectedHour).padStart(2, '0')}:${String(selectedMinute).padStart(2, '0')}`;
    const toNames = targetCities.map(c => c.name).join(',');
    const url = `${window.location.origin}/time-converter?from=${encodeURIComponent(fromName)}&time=${timeStr}&to=${encodeURIComponent(toNames)}`;
    navigator.clipboard.writeText(url);
    setShareToast(true);
    setTimeout(() => setShareToast(false), 2500);
  };

  const getConvertedDetails = (timeZone: string) => {
    const targetOffsetMins = getUtcOffsetMinutes(timeZone, new Date(baseUtcTimestamp));
    const targetLocalMs = baseUtcTimestamp + targetOffsetMins * 60000;
    const targetDate = new Date(targetLocalMs);

    // Source date vs Target date comparison
    const sourceLocal = new Date(`${selectedDate}T12:00:00`);
    const dayDiff = Math.round((new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate()).getTime() -
      new Date(sourceLocal.getFullYear(), sourceLocal.getMonth(), sourceLocal.getDate()).getTime()) / 86400000);

    let dayBadge = 'Same Day';
    let dayBadgeClass = 'text-slate-400 bg-slate-100 dark:bg-slate-800';
    if (dayDiff > 0) {
      dayBadge = '+1 Day (Tomorrow)';
      dayBadgeClass = 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800';
    } else if (dayDiff < 0) {
      dayBadge = '-1 Day (Yesterday)';
      dayBadgeClass = 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800';
    }

    const hour = targetDate.getHours();
    const isBusinessHours = hour >= 9 && hour < 18;

    const details = getTimeDetails(timeZone, targetDate, !use24Hour);

    return {
      timeStr: details.timeStr,
      dayPeriod: details.dayPeriod,
      dateStr: details.dateStr,
      dayBadge,
      dayBadgeClass,
      isBusinessHours,
      offsetStr: details.utcOffsetString,
      isDst: details.isDst,
    };
  };

  const availableCitiesToAdd = useMemo(() => {
    return CITIES.filter(c => c.id !== sourceCityId && !targetCityIds.includes(c.id)).slice(0, 10);
  }, [sourceCityId, targetCityIds]);

  return (
    <div className="space-y-8">
      {/* Source City & Time Selector Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <ArrowLeftRight className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Interactive Time Zone Converter
              </h2>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Drag the hour slider to convert times across unlimited global destinations
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setUse24Hour(!use24Hour)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono font-bold text-xs hover:bg-slate-200 transition-all"
            >
              {use24Hour ? '24H' : '12H'}
            </button>

            <button
              onClick={shareUrl}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              {shareToast ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Share2 className="w-3.5 h-3.5" />}
              {shareToast ? 'Link Copied!' : 'Share'}
            </button>
          </div>
        </div>

        {/* Source Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              Source Location
            </label>
            <select
              value={sourceCityId}
              onChange={(e) => setSourceCityId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {CITIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}, {c.country} ({c.timezone.split('/').pop()?.replace(/_/g, ' ')})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              Source Time ({sourceCity.name})
            </label>
            <div className="text-2xl font-mono font-black text-blue-600 dark:text-blue-400">
              {String(selectedHour).padStart(2, '0')}:{String(selectedMinute).padStart(2, '0')}
              {!use24Hour && (
                <span className="text-sm ml-1 text-slate-500">
                  {selectedHour >= 12 ? 'PM' : 'AM'}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 24-Hour Slider */}
        <div className="space-y-2 pt-2">
          <div className="flex justify-between text-xs font-mono font-bold text-slate-400">
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>23:00</span>
          </div>
          <input
            type="range"
            min="0"
            max="23"
            value={selectedHour}
            onChange={(e) => setSelectedHour(parseInt(e.target.value, 10))}
            className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>
      </div>

      {/* Target Cities Converted Results Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Converted Times Across {targetCities.length} Locations
          </h3>
          <span className="text-xs text-slate-400">
            🟢 Green badge = Standard Business Hours (9am - 6pm)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {targetCities.map((target) => {
            const converted = getConvertedDetails(target.timezone);

            return (
              <div
                key={target.id}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {target.country}
                      </span>
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                        {target.name}
                      </h4>
                      <span className="text-xs font-mono text-slate-400">
                        {target.timezone} • {converted.offsetStr}
                      </span>
                    </div>

                    <button
                      onClick={() => removeTargetCity(target.id)}
                      className="p-1 text-slate-400 hover:text-rose-600"
                      title="Remove city"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="my-4">
                    <div className="text-3xl sm:text-4xl font-mono font-black text-slate-900 dark:text-white">
                      {converted.timeStr}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="text-xs text-slate-500 font-medium">
                        {converted.dateStr}
                      </span>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${converted.dayBadgeClass}`}>
                        {converted.dayBadge}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  {converted.isBusinessHours ? (
                    <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                      <Briefcase className="w-3.5 h-3.5" /> Working Hours
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-slate-400">
                      <Moon className="w-3.5 h-3.5" /> Outside Office Hours
                    </span>
                  )}

                  <span className="text-[11px] text-slate-400">
                    {converted.isDst ? 'DST Active' : 'Standard'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Location Pill Row */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Quick Add Comparison Cities:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {availableCitiesToAdd.map((c) => (
              <button
                key={c.id}
                onClick={() => addTargetCity(c.id)}
                className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/40 text-slate-700 dark:text-slate-300 hover:text-blue-600 text-xs font-medium transition-all"
              >
                + {c.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
