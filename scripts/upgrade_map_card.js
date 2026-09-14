const fs = require('fs');

fs.writeFileSync('src/components/dashboard/WorldMapCard.tsx', `
"use client";

import React from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { WorldMapSvg } from '../art/WorldMapSvg';
import { City, CITIES } from '@/lib/geo/cities';

interface WorldMapCardProps {
  city?: City;
  onSelectCity?: (city: City) => void;
}

export function WorldMapCard({ city = CITIES[0], onSelectCity }: WorldMapCardProps) {
  return (
    <div className="relative w-full bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 sm:p-7 flex flex-col justify-between transition-all hover:shadow-md">
      {/* High-definition animated world map with pulsing radar beacon and clickable city markers */}
      <div className="w-full flex-1 flex items-center justify-center min-h-[220px]">
        <WorldMapSvg activeCity={city} onSelectCity={onSelectCity} className="w-full h-56 sm:h-64" />
      </div>

      {/* Card Footer Information */}
      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">
            {city.countryCode === 'FR' ? '🇫🇷' :
             city.countryCode === 'US' ? '🇺🇸' :
             city.countryCode === 'GB' ? '🇬🇧' :
             city.countryCode === 'JP' ? '🇯🇵' :
             city.countryCode === 'AE' ? '🇦🇪' :
             city.countryCode === 'IN' ? '🇮🇳' :
             city.countryCode === 'AU' ? '🇦🇺' : '🌐'}
          </span>
          <div>
            <span className="font-extrabold text-slate-900 dark:text-white text-base block leading-tight">
              {city.name}
            </span>
            <span className="text-xs text-slate-400 block font-mono mt-0.5">
              {city.lat.toFixed(4)}° {city.lat >= 0 ? 'N' : 'S'}, {Math.abs(city.lng).toFixed(4)}° {city.lng >= 0 ? 'E' : 'W'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono shadow-xs">
            {city.timezone}
          </span>
          <Link
            href={\`/time/\${city.slug}\`}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-blue-600 transition-colors"
            title="Open location details"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
`, 'utf8');

console.log('WorldMapCard updated with interactive city selection and radar beacon');
