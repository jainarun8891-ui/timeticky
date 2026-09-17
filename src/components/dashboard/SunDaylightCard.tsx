"use client";

import React, { useMemo } from 'react';
import { Sun } from 'lucide-react';
import { City } from '@/lib/geo/cities';
import { getSunTimes } from '@/lib/astronomy/sun';

interface SunDaylightCardProps {
  currentCity: City;
}

export function SunDaylightCard({ currentCity }: SunDaylightCardProps) {
  const sun = useMemo(() => {
    return getSunTimes(new Date(), currentCity.lat, currentCity.lng, currentCity.timezone);
  }, [currentCity.lat, currentCity.lng, currentCity.timezone]);

  // Constrain day progress between 5% and 95% for smooth arc SVG rendering
  const progressPercent = Math.min(100, Math.max(0, sun.dayProgressPercent));
  const angleRad = (1 - progressPercent / 100) * Math.PI;
  const sunX = Math.round(100 + 80 * Math.cos(angleRad));
  const sunY = Math.round(90 - 70 * Math.sin(angleRad));

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[24px] border border-slate-200/90 dark:border-slate-800 shadow-sm p-5 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center">
            <Sun className="w-3.5 h-3.5" />
          </div>
          <div>
            <h2 className="text-sm font-black text-slate-900 dark:text-white leading-tight">
              Sun & Daylight
            </h2>
            <p className="text-[11px] text-slate-400">
              Sunrise, sunset and solar arc for {currentCity.name}
            </p>
          </div>
        </div>

        {/* Solar Arc Graphic */}
        <div className="relative w-full h-24 my-2 flex items-center justify-center">
          <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible">
            {/* Complete trajectory curve */}
            <path
              d="M 20,90 A 80,75 0 0,1 180,90"
              fill="none"
              stroke="currentColor"
              className="text-slate-200 dark:text-slate-700"
              strokeWidth="2.5"
              strokeDasharray="4 4"
            />
            {/* Active illuminated path */}
            <path
              d={`M 20,90 A 80,75 0 0,1 ${sunX},${sunY}`}
              fill="none"
              stroke="#f59e0b"
              strokeWidth="3"
            />
            {/* Glowing Sun Position */}
            <circle cx={sunX} cy={sunY} r="6" fill="#f59e0b" className="animate-pulse" />
            <circle cx={sunX} cy={sunY} r="10" fill="#f59e0b" opacity="0.25" />
          </svg>

          {/* Sunrise and Sunset Labels */}
          <div className="absolute bottom-0 left-2 text-center">
            <span className="text-xs font-black text-slate-900 dark:text-white block font-mono" suppressHydrationWarning>
              {sun.sunrise}
            </span>
            <span className="text-[10px] text-slate-400">Sunrise</span>
          </div>

          <div className="absolute bottom-0 right-2 text-center">
            <span className="text-xs font-black text-slate-900 dark:text-white block font-mono" suppressHydrationWarning>
              {sun.sunset}
            </span>
            <span className="text-[10px] text-slate-400">Sunset</span>
          </div>
        </div>
      </div>

      {/* Bottom Metrics */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/80">
        <div>
          <span className="text-xs font-black text-slate-900 dark:text-white block font-mono" suppressHydrationWarning>
            {sun.dayLengthFormatted}
          </span>
          <span className="text-[10px] text-slate-400">Day length</span>
        </div>
        <div className="text-right">
          <span className="text-xs font-black text-slate-900 dark:text-white block font-mono">
            {sun.dayProgressPercent}%
          </span>
          <span className="text-[10px] text-slate-400">Day progress</span>
        </div>
      </div>
    </div>
  );
}
