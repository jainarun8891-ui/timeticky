"use client";

import React from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { City } from '@/lib/geo/cities';
import { getCityRootSlug } from '@/lib/geo/city-lookup';
import { ExactWorldMapSvg } from '@/components/art/ExactWorldMapSvg';
import { getCountryFlagEmoji, formatCoordinates } from '@/lib/geo/flags';

interface WorldMapCardProps {
  currentCity: City;
  onSelectCity?: (city: City) => void;
}

export function WorldMapCard({ currentCity, onSelectCity }: WorldMapCardProps) {
  return (
    <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[28px] border border-slate-200/90 dark:border-slate-800 shadow-sm p-5 flex flex-col justify-between">
      {/* Top Map Graphic */}
      <div className="w-full flex-1 flex items-center justify-center min-h-[190px]">
        <ExactWorldMapSvg
          activeCity={currentCity}
          onSelectCity={onSelectCity}
          showNightShadow={false}
          showConnections={false}
          showGrid={false}
          className="w-full h-44 drop-shadow-xs"
        />
      </div>

      {/* Bottom Metadata Matching Active City */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl leading-none">{getCountryFlagEmoji(currentCity.countryCode)}</span>
            <span className="font-extrabold text-slate-900 dark:text-white text-base tracking-tight">
              {currentCity.name}
            </span>
          </div>
          <div className="text-[11px] text-slate-400 font-mono mt-0.5">
            {formatCoordinates(currentCity.lat, currentCity.lng)}
          </div>
          <div className="mt-1.5">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-mono font-medium border border-slate-200/60 dark:border-slate-700/60">
              {currentCity.timezone}
            </span>
          </div>
        </div>

        <Link
          href={`/${getCityRootSlug(currentCity)}`}
          className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 transition-colors"
          title={`View ${currentCity.name} dedicated page`}
        >
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
