const fs = require('fs');

fs.writeFileSync('src/components/dashboard/CountryInfoCard.tsx', `
"use client";

import React from 'react';
import Link from 'next/link';
import { City, CITIES } from '@/lib/geo/cities';
import { getCountryByCode } from '@/lib/geo/countries';

interface CountryInfoCardProps {
  currentCity?: City;
}

export function CountryInfoCard({ currentCity = CITIES[0] }: CountryInfoCardProps) {
  const country = getCountryByCode(currentCity.countryCode);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[28px] border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 sm:p-7 flex flex-col justify-between transition-all hover:shadow-md">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">
          {country?.flag || '🇫🇷'}
        </span>
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
            About {country?.name || 'France'}
          </h3>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
            Country information & timezone context
          </p>
        </div>
      </div>

      {/* Real Scenic Thumbnail Image */}
      <div className="relative h-28 w-full rounded-2xl overflow-hidden my-2 shadow-inner group">
        <img
          src="/images/france_thumb.jpg"
          alt="Scenic view of Paris and Seine River"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs my-2">
        <div>
          <span className="text-slate-400 text-[10px] uppercase tracking-wider block font-medium">Capital</span>
          <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">{country?.capital || 'Paris'}</span>
        </div>
        <div>
          <span className="text-slate-400 text-[10px] uppercase tracking-wider block font-medium">Population</span>
          <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">{country?.population || '68.4 million'}</span>
        </div>
        <div>
          <span className="text-slate-400 text-[10px] uppercase tracking-wider block font-medium">Currency</span>
          <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">{country?.currency || 'Euro (EUR)'}</span>
        </div>
        <div>
          <span className="text-slate-400 text-[10px] uppercase tracking-wider block font-medium">Timezone</span>
          <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">{country?.timezones[0] || 'Europe/Paris'}</span>
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
        <Link
          href={\`/country/\${country?.slug || 'france'}\`}
          className="px-4 py-2 rounded-full bg-blue-50 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-slate-700 text-blue-600 dark:text-blue-400 text-xs font-bold transition-colors"
        >
          Learn more
        </Link>
      </div>
    </div>
  );
}
`, 'utf8');

console.log('CountryInfoCard upgraded with real photo thumbnail');
