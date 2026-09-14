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
                  <span className={`font-bold ${diff.isAhead ? 'text-amber-600 dark:text-amber-400' : 'text-blue-600 dark:text-blue-400'}`}>
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
