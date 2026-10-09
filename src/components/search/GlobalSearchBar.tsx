"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Search, X, MapPin, Globe, Clock } from 'lucide-react';
import { searchCities } from '@/lib/geo/cities';
import { getCityRootSlug } from '@/lib/geo/city-lookup';
import { TIMEZONES } from '@/lib/time/timezones';
import { COUNTRIES } from '@/lib/geo/countries';
import { trackSearch, trackSearchResultClick } from '@/lib/analytics/gtag';

export function GlobalSearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const isSpanish = pathname?.startsWith('/es') ?? false;
  const prefix = isSpanish ? '/es' : '';

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const q = query.trim().toLowerCase();
    const cityItems = searchCities(q).slice(0, 6).map(c => ({
      id: c.id,
      title: `${c.name}, ${c.country}`,
      subtitle: c.timezone,
      slug: `${prefix}/${getCityRootSlug(c)}`,
      type: 'city'
    }));

    const countryItems = Object.values(COUNTRIES)
      .filter(c => c.name.toLowerCase().includes(q) || c.code.toLowerCase() === q)
      .slice(0, 3)
      .map(c => ({
        id: c.code,
        title: `${c.name} ${c.flag}`,
        subtitle: `Capital: ${c.capital} • ${c.timezones[0]}`,
        slug: `${prefix}/country/${c.slug}`,
        type: 'country'
      }));

    const tzItems = TIMEZONES
      .filter(t => t.name.toLowerCase().includes(q) || t.shortName.toLowerCase() === q || t.id.toLowerCase() === q)
      .slice(0, 3)
      .map(t => ({
        id: t.id,
        title: `${t.name} (${t.shortName})`,
        subtitle: t.formattedOffset,
        slug: `${prefix}/timezone/${t.shortName.toLowerCase()}`,
        type: 'timezone'
      }));

    const combined = [...cityItems, ...countryItems, ...tzItems];
    setResults(combined);
    setIsOpen(combined.length > 0);

    const debounceTimer = setTimeout(() => {
      if (q.length >= 2) {
        trackSearch(query.trim(), combined.length);
      }
    }, 800);

    return () => clearTimeout(debounceTimer);
  }, [query, prefix]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
          inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const quickPills = isSpanish
    ? [
        { label: 'Nueva York', slug: `${prefix}/new-york` },
        { label: 'Madrid', slug: `${prefix}/madrid` },
        { label: 'Tokio', slug: `${prefix}/tokyo` },
        { label: 'Londres', slug: `${prefix}/london` },
        { label: 'IST', slug: `${prefix}/timezone/ist` },
      ]
    : [
        { label: 'New York', slug: '/new-york' },
        { label: 'Tokyo', slug: '/tokyo' },
        { label: 'London', slug: '/london' },
        { label: 'IST', slug: '/timezone/ist' },
        { label: 'PST', slug: '/timezone/pt' },
      ];

  return (
    <div className="relative w-full mb-6">
      <div className="relative flex items-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 px-4 py-3">
        <Search className="w-4 h-4 text-slate-400 mr-3 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && setIsOpen(results.length > 0)}
          placeholder={isSpanish ? "Buscar ciudad, país o zona horaria..." : "Search for a city, country or timezone..."}
          className="w-full bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 text-xs sm:text-sm font-medium outline-hidden"
        />

        {query && (
          <button
            onClick={() => { setQuery(''); setIsOpen(false); }}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-full mr-2"
            type="button"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Quick Suggestion Pills on Right matching reference image */}
        <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-400 shrink-0">
          <span className="text-[11px] text-slate-400 font-medium">{isSpanish ? 'Prueba:' : 'Try:'}</span>
          {quickPills.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                trackSearchResultClick({
                  title: item.label,
                  type: 'quick_pill',
                  slug: item.slug
                });
                router.push(item.slug);
              }}
              type="button"
              className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {item.label},
            </button>
          ))}
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden z-50 animate-in fade-in"
        >
          <ul className="py-2 divide-y divide-slate-100 dark:divide-slate-800 max-h-80 overflow-y-auto">
            {results.map((item) => (
              <li
                key={`${item.type}-${item.id}`}
                onClick={() => {
                  trackSearchResultClick({
                    title: item.title,
                    type: item.type,
                    slug: item.slug
                  });
                  setIsOpen(false);
                  setQuery('');
                  router.push(item.slug);
                }}
                className="px-4 py-2.5 cursor-pointer flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                    {item.type === 'city' && <MapPin className="w-3.5 h-3.5 text-blue-500" />}
                    {item.type === 'country' && <Globe className="w-3.5 h-3.5 text-emerald-500" />}
                    {item.type === 'timezone' && <Clock className="w-3.5 h-3.5 text-amber-500" />}
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 dark:text-white text-xs block">
                      {item.title}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {item.subtitle}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 font-semibold uppercase">
                  {item.type === 'city' ? (isSpanish ? 'Ciudad' : 'city') : item.type === 'country' ? (isSpanish ? 'País' : 'country') : (isSpanish ? 'Zona' : 'timezone')}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
