const fs = require('fs');

// 1. Header.tsx (Upgraded wide layout)
fs.writeFileSync('src/components/layout/Header.tsx', `
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Moon, Sun, Globe } from 'lucide-react';
import { siteConfig } from '@/lib/config/site.config';

interface HeaderProps {
  onSearchClick?: () => void;
}

export function Header({ onSearchClick }: HeaderProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('gt_theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('gt_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('gt_theme', 'light');
    }
  };

  return (
    <header className="w-full bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 transition-colors sticky top-0 z-50 backdrop-blur-md bg-white/95 dark:bg-slate-900/95">
      <div className="max-w-[1720px] w-full mx-auto px-4 sm:px-8 lg:px-12 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
            <Globe className="w-5.5 h-5.5 stroke-[2.2]" />
          </div>
          <div>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight block leading-tight">
              {siteConfig.name}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-400 font-medium block leading-none mt-0.5">
              {siteConfig.tagline}
            </span>
          </div>
        </Link>

        {/* Center Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600 dark:text-slate-300">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            World Clock
          </Link>
          <Link href="/time-zones" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Time Zones
          </Link>
          <Link href="/compare" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Compare
          </Link>
          <Link href="/meeting-planner" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Meeting Planner
          </Link>
          <Link href="/clock" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Tools
          </Link>
          <Link href="/utc" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Learn
          </Link>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-3.5">
          <button
            onClick={onSearchClick}
            type="button"
            aria-label="Search"
            className="p-2.5 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Search className="w-4.5 h-4.5" />
          </button>

          {/* Theme Toggle Pill matching reference image */}
          <button
            onClick={toggleTheme}
            type="button"
            aria-label="Toggle dark mode"
            className="flex items-center gap-1.5 bg-slate-900 dark:bg-slate-800 p-1.5 rounded-full text-white hover:bg-slate-800 transition-colors shadow-sm"
          >
            <span className={\`w-6 h-6 rounded-full flex items-center justify-center transition-all \${!isDark ? 'bg-slate-800 text-slate-400' : 'bg-blue-600 text-white'}\`}>
              <Moon className="w-3.5 h-3.5" />
            </span>
            <span className={\`w-6 h-6 rounded-full flex items-center justify-center transition-all \${!isDark ? 'bg-amber-400 text-slate-900' : 'text-slate-400'}\`}>
              <Sun className="w-3.5 h-3.5" />
            </span>
          </button>

          <span className="hidden xl:inline text-xs text-slate-400 dark:text-slate-500 font-medium pl-1">
            A more connected tomorrow
          </span>
        </div>
      </div>
    </header>
  );
}
`, 'utf8');

// 2. GlobalSearchBar.tsx (Grand wide pill with instant search)
fs.writeFileSync('src/components/search/GlobalSearchBar.tsx', `
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Globe, Clock, X } from 'lucide-react';
import { searchCities } from '@/lib/geo/cities';
import { TIMEZONES } from '@/lib/time/timezones';
import { COUNTRIES } from '@/lib/geo/countries';

interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  type: 'city' | 'country' | 'timezone';
}

export function GlobalSearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const q = query.trim().toLowerCase();
    const cityItems: SearchResultItem[] = searchCities(q).slice(0, 6).map(c => ({
      id: c.id,
      title: \`\${c.name}, \${c.country}\`,
      subtitle: c.timezone,
      slug: \`/time/\${c.slug}\`,
      type: 'city'
    }));

    const countryItems: SearchResultItem[] = Object.values(COUNTRIES)
      .filter(c => c.name.toLowerCase().includes(q) || c.code.toLowerCase() === q)
      .slice(0, 3)
      .map(c => ({
        id: c.code,
        title: \`\${c.name} \${c.flag}\`,
        subtitle: \`Capital: \${c.capital} • \${c.timezones[0]}\`,
        slug: \`/country/\${c.slug}\`,
        type: 'country'
      }));

    const tzItems: SearchResultItem[] = TIMEZONES
      .filter(t => t.name.toLowerCase().includes(q) || t.shortName.toLowerCase().includes(q) || t.id.toLowerCase().includes(q))
      .slice(0, 3)
      .map(t => ({
        id: t.id,
        title: \`\${t.name} (\${t.shortName})\`,
        subtitle: t.formattedOffset,
        slug: \`/time-zone/\${t.shortName.toLowerCase()}\`,
        type: 'timezone'
      }));

    const combined = [...cityItems, ...countryItems, ...tzItems];
    setResults(combined);
    setIsOpen(combined.length > 0);
    setSelectedIndex(0);
  }, [query]);

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

  const handleSelect = (item: SearchResultItem) => {
    setIsOpen(false);
    setQuery('');
    router.push(item.slug);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) handleSelect(results[selectedIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 mt-6 mb-8">
      <div className="relative flex items-center bg-white dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:border-blue-500 transition-all">
        <div className="pl-6 pr-2 text-slate-400">
          <Search className="w-5 h-5 text-slate-400" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && setIsOpen(results.length > 0)}
          placeholder="Search for a city, country or timezone…"
          className="w-full py-4 px-2 bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 text-sm sm:text-base font-medium outline-none"
        />

        {query && (
          <button
            onClick={() => { setQuery(''); setIsOpen(false); }}
            className="p-1.5 mr-2 text-slate-400 hover:text-slate-600 rounded-full"
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Quick Suggestion Pills on Right */}
        <div className="hidden lg:flex items-center gap-2 pr-6 text-xs text-slate-400 whitespace-nowrap">
          <span className="font-normal text-slate-400">Try:</span>
          {[
            { label: 'New York', slug: '/time/new-york-united-states' },
            { label: 'Tokyo', slug: '/time/tokyo-japan' },
            { label: 'London', slug: '/time/london-united-kingdom' },
            { label: 'IST', slug: '/time-zone/ist' },
            { label: 'PST', slug: '/time-zone/pt' }
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => router.push(item.slug)}
              type="button"
              className="px-2.5 py-1 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 transition-colors font-medium text-xs"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Instant Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute left-4 right-4 sm:left-8 sm:right-8 lg:left-12 lg:right-12 top-full mt-2 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150"
        >
          <ul className="py-3 divide-y divide-slate-100 dark:divide-slate-800/60 max-h-96 overflow-y-auto">
            {results.map((item, idx) => (
              <li
                key={\`\${item.type}-\${item.id}\`}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={\`px-6 py-3.5 cursor-pointer flex items-center justify-between transition-colors \${idx === selectedIndex ? 'bg-blue-50 dark:bg-slate-800' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}\`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                    {item.type === 'city' && <MapPin className="w-4 h-4 text-blue-500" />}
                    {item.type === 'country' && <Globe className="w-4 h-4 text-emerald-500" />}
                    {item.type === 'timezone' && <Clock className="w-4 h-4 text-amber-500" />}
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 dark:text-white text-sm block">
                      {item.title}
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-500">
                      {item.subtitle}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                  {item.type}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
`, 'utf8');

console.log('Header and GlobalSearchBar updated for wide layout');
