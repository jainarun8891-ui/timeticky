"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { City, CITIES } from '@/lib/geo/cities';
import { formatTimeInZone, formatDateInZone, getUtcOffsetString, getTimeDifference } from '@/lib/time/timezones';
import { getCountryFlagEmoji } from '@/lib/geo/flags';
import { ArrowLeftRight, Plus, X, Globe, Clock, ShieldCheck, Share2 } from 'lucide-react';

interface CompareCitiesClientProps {
  initialCities: City[];
}

export function CompareCitiesClient({ initialCities }: CompareCitiesClientProps) {
  const [selectedCities, setSelectedCities] = useState<City[]>(
    initialCities.length >= 2 ? initialCities : CITIES.slice(0, 3)
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
    <div className="space-y-8">
      {/* Main Comparative Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedCities.map((city, idx) => {
          const time = formatTimeInZone(now, city.timezone, false, true);
          const date = formatDateInZone(now, city.timezone);
          const offset = getUtcOffsetString(now, city.timezone);
          const diff = idx === 0 ? null : getTimeDifference(baseCity.timezone, city.timezone, now);

          return (
            <div
              key={city.id}
              className={`p-6 rounded-3xl border transition-all relative ${
                idx === 0
                  ? 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/60 shadow-xs ring-1 ring-blue-500/20'
                  : 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 shadow-xs'
              }`}
            >
              {selectedCities.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeCity(city.id)}
                  className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Remove city"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl leading-none">{getCountryFlagEmoji(city.countryCode)}</span>
                <div>
                  <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
                    <Link href={`/time/${city.slug}`} className="hover:text-blue-600 transition-colors">
                      {city.name}
                    </Link>
                  </h2>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {city.country}
                  </span>
                </div>
              </div>

              <div className="my-4 text-center py-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl">
                <span className="text-3xl sm:text-4xl font-black font-mono text-slate-900 dark:text-white block">
                  {time}
                </span>
                <span className="text-xs font-medium text-slate-400 mt-1 block">
                  {date}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex justify-between">
                  <span>UTC Offset:</span>
                  <span className="font-mono font-semibold text-slate-900 dark:text-white">{offset}</span>
                </div>
                <div className="flex justify-between">
                  <span>Timezone:</span>
                  <span className="font-mono font-semibold text-slate-900 dark:text-white">{city.timezone}</span>
                </div>
                {diff && (
                  <div className="flex justify-between pt-1 text-blue-600 dark:text-blue-400 font-bold">
                    <span>Rel. to {baseCity.name}:</span>
                    <span>{diff.formatted}</span>
                  </div>
                )}
                {idx === 0 && (
                  <div className="text-center pt-1 text-xs text-slate-400 font-medium">
                    (Base comparison city)
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add City Tray */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Plus className="w-4 h-4 text-blue-600" />
          <span>Add More World Cities to Comparison:</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {CITIES.filter(c => !selectedCities.some(sc => sc.id === c.id)).slice(0, 16).map(city => (
            <button
              key={city.id}
              type="button"
              onClick={() => addCity(city)}
              className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>{getCountryFlagEmoji(city.countryCode)}</span>
              <span>{city.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
