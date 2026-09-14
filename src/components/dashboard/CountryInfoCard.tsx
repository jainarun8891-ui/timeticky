"use client";

import React from 'react';
import Link from 'next/link';
import { City } from '@/lib/geo/cities';
import { COUNTRIES } from '@/lib/geo/countries';
import { CountryFlag } from '@/components/common/CountryFlag';
import { getUtcOffsetString } from '@/lib/time/timezones';

interface CountryInfoCardProps {
  currentCity: City;
  className?: string;
}

export function CountryInfoCard({ currentCity, className = "" }: CountryInfoCardProps) {
  // Resolve country metadata dynamically
  const countryCode = currentCity?.countryCode || 'FR';
  const countryData = COUNTRIES[countryCode.toUpperCase()] || {
    name: currentCity?.country || 'France',
    slug: (currentCity?.country || 'france').toLowerCase().replace(/\s+/g, '-'),
    capital: currentCity?.name || 'Paris',
    population: currentCity?.population || '68.4 million',
    currency: 'Euro (EUR)',
    flag: '🇫🇷',
    timezones: [currentCity?.timezone || 'Europe/Paris']
  };

  // Select appropriate scenic thumbnail
  let thumbImage = '/images/france_thumb.jpg';
  const cCode = countryCode.toUpperCase();
  const cId = (currentCity?.id || '').toLowerCase();

  if (cCode === 'FR' || cId.includes('paris')) {
    thumbImage = '/images/france_thumb.jpg';
  } else if (cCode === 'US' || cId.includes('new-york')) {
    thumbImage = '/images/newyork_hero.jpg';
  } else if (cCode === 'JP' || cId.includes('tokyo')) {
    thumbImage = '/images/tokyo_hero.jpg';
  } else if (cCode === 'GB' || cId.includes('london')) {
    thumbImage = '/images/london_thumb.jpg';
  } else if (cCode === 'AU' || cId.includes('sydney')) {
    thumbImage = '/images/sydney_thumb.jpg';
  }

  // Format short timezone offset display e.g. "CET (UTC +1)" or "EST (UTC -5)"
  const tzOffset = getUtcOffsetString(new Date(), currentCity?.timezone || 'Europe/Paris');
  const tzShort = (() => {
    try {
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: currentCity?.timezone || 'Europe/Paris',
        timeZoneName: 'short'
      }).formatToParts(new Date());
      const zoneName = parts.find(p => p.type === 'timeZoneName')?.value || 'UTC';
      return `${zoneName} (${tzOffset})`;
    } catch {
      return `${currentCity?.timezone?.split('/').pop() || 'UTC'} (${tzOffset})`;
    }
  })();

  const countryUrl = `/country/${countryData.slug}`;

  return (
    <div className={`w-full h-full bg-white dark:bg-slate-900 rounded-[24px] border border-slate-200/90 dark:border-slate-800 shadow-sm p-5 flex flex-col justify-between ${className}`}>
      <div>
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-3">
          <CountryFlag code={countryCode} className="w-6 h-4.5 rounded-[4px]" title={countryData.name} />
          <div>
            <h2 className="text-sm font-black text-slate-900 dark:text-white leading-tight">
              About {countryData.name}
            </h2>
            <p className="text-[11px] text-slate-400 font-medium">
              Country information & timezone context
            </p>
          </div>
        </div>

        {/* Content Layout: 16:9 Thumbnail on left + 2x2 Grid in middle + Learn more */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-2">
          {/* Scenic Thumbnail */}
          <div
            className="w-full sm:w-40 md:w-44 h-22 rounded-xl overflow-hidden shrink-0 bg-cover bg-center border border-slate-200/80 dark:border-slate-700/80 shadow-xs relative group"
            style={{ backgroundImage: `url('${thumbImage}')` }}
          >
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
          </div>

          {/* Key Facts 2x2 Grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 flex-1 min-w-0 text-xs">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Capital</span>
              <span className="font-bold text-slate-900 dark:text-white text-xs truncate block" title={countryData.capital}>
                {countryData.capital}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Population</span>
              <span className="font-bold text-slate-900 dark:text-white text-xs truncate block" title={countryData.population}>
                {countryData.population}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Currency</span>
              <span className="font-bold text-slate-900 dark:text-white text-xs truncate block" title={countryData.currency}>
                {countryData.currency}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Timezone</span>
              <span className="font-bold font-mono text-slate-900 dark:text-white text-xs truncate block" title={tzShort}>
                {tzShort}
              </span>
            </div>
          </div>

          {/* Learn More Button */}
          <div className="shrink-0 flex sm:flex-col justify-end sm:justify-center">
            <Link
              href={countryUrl}
              className="inline-flex items-center justify-center text-xs font-bold px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors whitespace-nowrap shadow-2xs"
            >
              Learn more
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
