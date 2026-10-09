"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { City, CITIES } from '@/lib/geo/cities';
import { getCityRootSlug, getTimeDifferencePairsForCity, findCityByRootSlug } from '@/lib/geo/city-lookup';
import { getTimeDetails, getUtcOffsetString, getTimeDifferenceText } from '@/lib/time/engine';
import { getSolarTimes } from '@/lib/astronomy/calculator';
import { Clock, Sun, Sunrise, Sunset, Globe, Compass, Calendar, ArrowRight, ArrowLeftRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import { trackCityView } from '@/lib/analytics/gtag';

interface Props {
  city: City;
  h1Title?: string;
  locale?: 'en' | 'es';
}

const COMPARISON_CITIES = [
  { name: 'London', tz: 'Europe/London', slug: 'london' },
  { name: 'New York', tz: 'America/New_York', slug: 'new-york' },
  { name: 'Los Angeles', tz: 'America/Los_Angeles', slug: 'los-angeles' },
  { name: 'Toronto', tz: 'America/Toronto', slug: 'toronto' },
  { name: 'Paris', tz: 'Europe/Paris', slug: 'paris' },
  { name: 'Berlin', tz: 'Europe/Berlin', slug: 'berlin' },
  { name: 'Dubai', tz: 'Asia/Dubai', slug: 'dubai' },
  { name: 'Delhi', tz: 'Asia/Kolkata', slug: 'delhi' },
  { name: 'Mumbai', tz: 'Asia/Kolkata', slug: 'mumbai' },
  { name: 'Singapore', tz: 'Asia/Singapore', slug: 'singapore' },
  { name: 'Tokyo', tz: 'Asia/Tokyo', slug: 'tokyo' },
  { name: 'Sydney', tz: 'Australia/Sydney', slug: 'sydney' },
];

import { subscribeToClock } from '@/lib/time/sync';

export function CityPageClient({ city, h1Title, locale = 'en' }: Props) {
  const isEs = locale === 'es';
  const prefix = isEs ? '/es' : '';
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [use24Hour, setUse24Hour] = useState(false);
  const [showSeconds, setShowSeconds] = useState(true);

  useEffect(() => {
    trackCityView({
      name: city.name,
      country: city.country,
      timezone: city.timezone,
      slug: getCityRootSlug(city),
    });
    const unsubscribe = subscribeToClock((now) => {
      setCurrentTime(now);
    });
    return unsubscribe;
  }, [city]);

  const now = currentTime || new Date();
  const details = useMemo(() => {
    return getTimeDetails(city.timezone, now, !use24Hour);
  }, [city.timezone, now, use24Hour]);

  const solar = useMemo(() => {
    return getSolarTimes(city.lat, city.lng, now, details.utcOffsetMinutes);
  }, [city.lat, city.lng, now, details.utcOffsetMinutes]);

  // Dynamic contextual comparisons
  const comparisons = useMemo(() => {
    return COMPARISON_CITIES.filter(c => c.tz !== city.timezone).map(target => {
      const diff = getTimeDifferenceText(city.timezone, target.tz, now);
      const targetDetails = getTimeDetails(target.tz, now, !use24Hour);
      let sentence = '';
      if (diff.diffHours === 0) {
        sentence = isEs
          ? `${target.name} tiene la misma hora que ${city.name}.`
          : `${target.name} has the exact same local time as ${city.name}.`;
      } else if (diff.diffHours > 0) {
        sentence = isEs
          ? `${target.name} está ${diff.summary} por delante de ${city.name}.`
          : `${target.name} is ${diff.summary} of ${city.name}.`;
      } else {
        sentence = isEs
          ? `${target.name} está ${diff.summary} por detrás de ${city.name}.`
          : `${target.name} is ${diff.summary} of ${city.name}.`;
      }

      return {
        ...target,
        time: targetDetails.timeStr,
        dayPeriod: targetDetails.dayPeriod,
        sentence,
        diffSummary: diff.summary,
      };
    });
  }, [city, now, use24Hour, isEs]);

  const cityRootSlug = useMemo(() => getCityRootSlug(city), [city]);
  const cityDifferencePairs = useMemo(() => {
    return getTimeDifferencePairsForCity(cityRootSlug).map(pair => {
      const isOutbound = pair.cityA === cityRootSlug;
      const otherSlug = isOutbound ? pair.cityB : pair.cityA;
      const otherCity = findCityByRootSlug(otherSlug);
      const otherName = otherCity?.name || otherSlug;
      const slug = `${pair.cityA}-to-${pair.cityB}`;
      return {
        slug,
        isOutbound,
        otherName,
        otherCountry: otherCity?.country || 'Global',
        label: isOutbound ? `${city.name} to ${otherName}` : `${otherName} to ${city.name}`,
      };
    });
  }, [cityRootSlug, city.name]);

  return (
    <div className="space-y-8">
      {/* Big Clock Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-12 shadow-sm text-center relative overflow-hidden transition-colors">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              {city.country} ({city.countryCode})
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-0.5">
              {h1Title || (isEs ? `Hora actual en ${city.name}` : `Current Time in ${city.name}`)}
            </h1>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              {city.timezone} • {details.utcOffsetString}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setUse24Hour(!use24Hour)}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono font-bold text-xs hover:bg-slate-200 transition-all cursor-pointer"
            >
              {use24Hour ? '24H' : '12H'}
            </button>
            <button
              onClick={() => setShowSeconds(!showSeconds)}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 transition-all cursor-pointer"
            >
              {showSeconds ? (isEs ? 'Ocultar seg' : 'Hide Sec') : (isEs ? 'Mostrar seg' : 'Show Sec')}
            </button>
          </div>
        </div>

        {/* Huge Digital Numerals */}
        <div className="py-8 sm:py-10">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-slate-400 block mb-2" suppressHydrationWarning>
            {details.dateStr}
          </span>
          <div className="text-6xl sm:text-8xl lg:text-9xl font-mono font-black tracking-tight text-slate-900 dark:text-white select-none" suppressHydrationWarning>
            {showSeconds ? details.timeStr : details.timeStr.substring(0, details.timeStr.lastIndexOf(':'))}
          </div>
          {!use24Hour && details.dayPeriod && (
            <span className="text-sm sm:text-base font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400 mt-2 block" suppressHydrationWarning>
              {details.dayPeriod}
            </span>
          )}
        </div>

        {/* Solar & DST Status Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-center">
          <div>
            <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center justify-center gap-1">
              <Sunrise className="w-3.5 h-3.5 text-amber-500" /> {isEs ? 'Amanecer' : 'Sunrise'}
            </span>
            <span className="text-sm font-mono font-bold text-slate-800 dark:text-slate-200 block mt-0.5">
              {solar.sunrise}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center justify-center gap-1">
              <Sunset className="w-3.5 h-3.5 text-orange-500" /> {isEs ? 'Atardecer' : 'Sunset'}
            </span>
            <span className="text-sm font-mono font-bold text-slate-800 dark:text-slate-200 block mt-0.5">
              {solar.sunset}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center justify-center gap-1">
              <Sun className="w-3.5 h-3.5 text-yellow-500" /> {isEs ? 'Mediodía solar' : 'Solar Noon'}
            </span>
            <span className="text-sm font-mono font-bold text-slate-800 dark:text-slate-200 block mt-0.5">
              {solar.solarNoon}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center justify-center gap-1">
              <Clock className="w-3.5 h-3.5 text-indigo-500" /> {isEs ? 'Duración del día' : 'Day Length'}
            </span>
            <span className="text-sm font-mono font-bold text-slate-800 dark:text-slate-200 block mt-0.5">
              {solar.dayLength}
            </span>
          </div>
        </div>
      </div>

      {/* City Geospatial & Political Data Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          {isEs ? `Datos geográficos y administrativos de ${city.name}` : `${city.name} Geographic & Administrative Facts`}
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <span className="text-slate-400 block font-medium">{isEs ? 'País' : 'Country'}</span>
            <strong className="text-slate-900 dark:text-white text-sm block mt-0.5">{city.country}</strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <span className="text-slate-400 block font-medium">{isEs ? 'Coordenadas' : 'Coordinates'}</span>
            <strong className="text-slate-900 dark:text-white text-sm block mt-0.5 font-mono">
              {city.lat.toFixed(2)}°N, {city.lng.toFixed(2)}°E
            </strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <span className="text-slate-400 block font-medium">{isEs ? 'Zona horaria IANA' : 'IANA Timezone'}</span>
            <strong className="text-slate-900 dark:text-white text-sm block mt-0.5 font-mono">{city.timezone}</strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <span className="text-slate-400 block font-medium">{isEs ? 'Horario de verano' : 'Daylight Saving'}</span>
            <strong className="text-slate-900 dark:text-white text-sm block mt-0.5">
              {details.isDst ? (isEs ? 'Activo (Horario de verano)' : 'Active (Summer Time)') : (isEs ? 'Horario estándar (Invierno)' : 'Standard Time (Winter)')}
            </strong>
          </div>
        </div>
      </div>

      {/* Dynamic Comparative Time Difference Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            {isEs ? 'Diferencial Horario en Tiempo Real' : 'Real-Time Horology Differential'}
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            {isEs ? `Diferencia de hora con ${city.name}` : `Time Difference From ${city.name}`}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {isEs ? 'Horas de diferencia en vivo con las principales metrópolis mundiales.' : 'Instantaneous hours ahead or behind across key global metropolises.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {comparisons.map((item) => (
            <div
              key={item.name}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-start justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    {item.name}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                    {item.diffSummary}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  {item.sentence}
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-lg font-mono font-bold text-slate-900 dark:text-white block">
                  {item.time}
                </span>
                {item.dayPeriod && (
                  <span className="text-[10px] text-slate-400 font-bold uppercase">
                    {item.dayPeriod}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dedicated City Difference Pair Guides */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              <ArrowLeftRight className="w-3.5 h-3.5" />
              <span>{isEs ? 'Corredores Horarios Bilaterales' : 'Bilateral Time Corridors'}</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
              {isEs ? `Guías de diferencia horaria para ${city.name}` : `Time Difference Guides for ${city.name}`}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              {isEs ? 'Relojes duales sincronizados, cambios de horario de verano y ventanas de trabajo compartidas.' : 'Live dual atomic clocks, daylight saving variations, and shared working hours.'}
            </p>
          </div>
          <Link
            href={`${prefix}/converter/difference`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>{isEs ? 'Directorio de 92 diferencias entre ciudades' : 'All 92 City Differences Directory'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {cityDifferencePairs.length > 0 ? (
            cityDifferencePairs.map((pair) => (
              <Link
                key={pair.slug}
                href={`${prefix}/converter/difference/${pair.slug}`}
                className="group p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 hover:bg-blue-50 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 hover:border-blue-500/40 transition-all flex items-center justify-between"
              >
                <div className="truncate">
                  <div className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors truncate">
                    {pair.label}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    {isEs ? 'Comparar relojes y coincidencia' : 'Compare Clocks & Overlap'}
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
              </Link>
            ))
          ) : (
            ['new-york-to-london', 'london-to-tokyo', 'new-york-to-sao-paulo', 'new-york-to-honolulu'].map((slug) => (
              <Link
                key={slug}
                href={`${prefix}/converter/difference/${slug}`}
                className="group p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 hover:bg-blue-50 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 hover:border-blue-500/40 transition-all flex items-center justify-between"
              >
                <div className="truncate">
                  <div className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors capitalize truncate">
                    {slug.replace(/-/g, ' ')}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    {isEs ? 'Comparar relojes y coincidencia' : 'Compare Clocks & Overlap'}
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
