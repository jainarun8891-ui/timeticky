"use client";

import React, { useState, useEffect } from 'react';
import { Globe, Plus, Sun, Moon, Clock } from 'lucide-react';
import { City, CITIES } from '@/lib/geo/cities';
import { formatTimeInZone } from '@/lib/time/timezones';
import { getSyncedDate } from '@/lib/time/sync';

interface WorldClockStripProps {
  currentCity: City;
  onSelectCity: (city: City) => void;
}

// 7 Landmark SVG illustrations matching reference image
function LandmarkIcon({ id }: { id: string }) {
  if (id === 'paris-fr') {
    return (
      <svg viewBox="0 0 48 48" className="w-8 h-8 mx-auto mb-1" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23 4h2v6h-2zM21 10h6l1 8h-8l1-8zM19 18h10l2 12h-14l2-12z" fill="#0284c7" />
        <path d="M16 30h16l3 14h-5l-2-6h-8l-2 6h-5l3-14z" fill="#0369a1" />
        <path d="M20 38a4 4 0 0 1 8 0" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="4" r="1.5" fill="#ef4444" />
      </svg>
    );
  }
  if (id === 'new-york-us') {
    return (
      <svg viewBox="0 0 48 48" className="w-8 h-8 mx-auto mb-1" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 22h8l-1 16h-6l-1-16z" fill="#0d9488" />
        <path d="M22 14h4v8h-4z" fill="#14b8a6" />
        <path d="M19 13l5-3 5 3-1 2h-8z" fill="#0f766e" />
        <path d="M28 12l4-6 2 1-3 6z" fill="#0d9488" />
        <circle cx="34" cy="6" r="2" fill="#f59e0b" />
        <path d="M16 38h16v6H16z" fill="#64748b" />
      </svg>
    );
  }
  if (id === 'london-gb') {
    return (
      <svg viewBox="0 0 48 48" className="w-8 h-8 mx-auto mb-1" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 4l2-2 2 2v6h-4V4z" fill="#d97706" />
        <rect x="20" y="10" width="8" height="10" rx="1" fill="#b45309" />
        <circle cx="24" cy="15" r="2.5" fill="#fef3c7" stroke="#78350f" strokeWidth="1" />
        <rect x="19" y="20" width="10" height="24" rx="1" fill="#78350f" />
        <path d="M22 24v16m4-16v16" stroke="#d97706" strokeWidth="1" />
      </svg>
    );
  }
  if (id === 'tokyo-jp') {
    return (
      <svg viewBox="0 0 48 48" className="w-8 h-8 mx-auto mb-1" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23 4h2v8h-2z" fill="#dc2626" />
        <path d="M21 12h6l2 10h-10l2-10z" fill="#ffffff" stroke="#dc2626" strokeWidth="1.5" />
        <path d="M18 22h12l3 14H15l3-14z" fill="#dc2626" />
        <path d="M14 36h20l3 8h-4l-3-4h-12l-3 4h-4l3-8z" fill="#ffffff" stroke="#dc2626" strokeWidth="1.5" />
      </svg>
    );
  }
  if (id === 'dubai-ae') {
    return (
      <svg viewBox="0 0 48 48" className="w-8 h-8 mx-auto mb-1" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 6v38h14c0-14-6-30-14-38z" fill="#0284c7" />
        <path d="M18 6v38h2V6h-2z" fill="#64748b" />
        <path d="M20 20c6 2 10 8 11 16H20V20z" fill="#38bdf8" />
        <circle cx="28" cy="14" r="2" fill="#f59e0b" />
      </svg>
    );
  }
  if (id === 'new-delhi-in') {
    return (
      <svg viewBox="0 0 48 48" className="w-8 h-8 mx-auto mb-1" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="16" y="10" width="16" height="4" rx="1" fill="#d97706" />
        <rect x="18" y="14" width="12" height="3" fill="#b45309" />
        <rect x="17" y="17" width="14" height="23" fill="#d97706" />
        <path d="M20 40V27a4 4 0 0 1 8 0v13" fill="#ffffff" />
        <rect x="14" y="40" width="20" height="4" rx="1" fill="#78350f" />
      </svg>
    );
  }
  // Sydney
  return (
    <svg viewBox="0 0 48 48" className="w-8 h-8 mx-auto mb-1" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 36c4-12 12-16 16-16-2 6-4 12-4 16h-12z" fill="#0284c7" />
      <path d="M18 36c4-14 14-18 18-18-2 8-5 14-6 18H18z" fill="#38bdf8" />
      <path d="M26 36c3-10 10-12 14-12-2 6-4 10-5 12H26z" fill="#bae6fd" />
      <rect x="8" y="36" width="32" height="4" rx="1" fill="#0f172a" />
    </svg>
  );
}

export function WorldClockStrip({ currentCity, onSelectCity }: WorldClockStripProps) {
  const [now, setNow] = useState(getSyncedDate());

  useEffect(() => {
    const timer = setInterval(() => setNow(getSyncedDate()), 1000);
    return () => clearInterval(timer);
  }, []);

  const citiesList = [
    CITIES.find(c => c.id === 'paris-fr') || CITIES[0],
    CITIES.find(c => c.id === 'new-york-us') || CITIES[1],
    CITIES.find(c => c.id === 'london-gb') || CITIES[2],
    CITIES.find(c => c.id === 'tokyo-jp') || CITIES[3],
    CITIES.find(c => c.id === 'dubai-ae') || CITIES[4],
    CITIES.find(c => c.id === 'new-delhi-in') || CITIES[5],
    CITIES.find(c => c.id === 'sydney-au') || CITIES[6],
  ];

  const isDaytime = (tz: string) => {
    try {
      const hour = parseInt(
        new Intl.DateTimeFormat('en-US', {
          timeZone: tz,
          hour: 'numeric',
          hourCycle: 'h23'
        }).format(now),
        10
      );
      return hour >= 6 && hour < 19;
    } catch {
      return true;
    }
  };

  return (
    <section className="w-full my-6">
      {/* Header matching reference */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-black text-slate-900 dark:text-white leading-tight">
              World Clock
            </h2>
            <p className="text-[11px] text-slate-400 font-medium">
              Local times around the world
            </p>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-bold hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors shadow-2xs"
        >
          <Plus className="w-3 h-3" />
          <span>Add cities</span>
        </button>
      </div>

      {/* 7 City Cards in a Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {citiesList.map((city) => {
          const isSelected = city.id === currentCity.id;
          const timeString = formatTimeInZone(now, city.timezone, false, false);
          const isDay = isDaytime(city.timezone);
          const cityDateStr = (() => {
            try {
              return new Intl.DateTimeFormat('en-US', {
                timeZone: city.timezone,
                weekday: 'short',
                month: 'short',
                day: 'numeric'
              }).format(now);
            } catch {
              return 'Today';
            }
          })();

          return (
            <div
              key={city.id}
              onClick={() => onSelectCity(city)}
              className={`cursor-pointer rounded-2xl p-3.5 border transition-all duration-150 text-center flex flex-col items-center justify-between ${
                isSelected
                  ? 'bg-blue-50/40 dark:bg-blue-950/20 border-blue-500 ring-2 ring-blue-500/20 shadow-xs'
                  : 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs'
              }`}
            >
              {/* Landmark Graphic */}
              <LandmarkIcon id={city.id} />

              {/* City & Country */}
              <div className="my-1">
                <h3 className="text-xs font-black text-slate-900 dark:text-white leading-tight">
                  {city.name}
                </h3>
                <span className="text-[10px] text-slate-400 block truncate">
                  {city.country}
                </span>
              </div>

              {/* Digital Time */}
              <div className="text-lg sm:text-xl font-black font-mono tracking-tight text-slate-900 dark:text-white my-1">
                {timeString}
              </div>

              {/* Date & Day/Night Indicator */}
              <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1.5 pt-1 border-t border-slate-100 dark:border-slate-800/80 w-full">
                <span>{cityDateStr}</span>
                <span className="text-slate-300 dark:text-slate-700">&bull;</span>
                <span className="flex items-center gap-1">
                  {isDay ? (
                    <>
                      <Sun className="w-3 h-3 text-amber-500" />
                      <span>Day</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3 h-3 text-indigo-400" />
                      <span>Night</span>
                    </>
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
