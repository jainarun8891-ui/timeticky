"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Search, Moon, Sun, Globe, ChevronDown, Monitor, SunMedium,
  Phone, Plane, Bell, Users, ArrowLeftRight, Clock, Sunset,
  Sparkles, ArrowRight, Layers
} from 'lucide-react';
import { siteConfig } from '@/lib/config/site.config';

type ThemeMode = 'daylight' | 'evening' | 'dark';

export function Header() {
  const [theme, setTheme] = useState<ThemeMode>('daylight');
  const [mounted, setMounted] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [convertersOpen, setConvertersOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);
  const convertersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const html = document.documentElement;
    if (html.classList.contains('evening')) {
      setTheme('evening');
    } else if (html.classList.contains('dark')) {
      setTheme('dark');
    } else {
      setTheme('daylight');
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(event.target as Node)) {
        setToolsOpen(false);
      }
      if (convertersRef.current && !convertersRef.current.contains(event.target as Node)) {
        setConvertersOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeTheme = (mode: ThemeMode) => {
    setTheme(mode);
    const html = document.documentElement;
    if (mode === 'evening') {
      html.classList.add('dark', 'evening');
      try { localStorage.setItem('gt_theme', 'evening'); } catch {}
    } else if (mode === 'dark') {
      html.classList.add('dark');
      html.classList.remove('evening');
      try { localStorage.setItem('gt_theme', 'dark'); } catch {}
    } else {
      html.classList.remove('dark', 'evening');
      try { localStorage.setItem('gt_theme', 'daylight'); } catch {}
    }
  };

  const featureTools = [
    { name: 'Timezone Converters', desc: '552 pairs with WorldTimeBuddy visual grid', href: '/convert', icon: ArrowLeftRight },
    { name: 'Interactive World Map', desc: 'Solar terminator, day/night boundary & 46 live clocks', href: '/world-map', icon: Globe },
    { name: 'Multi-Clock World Wall', desc: 'Trading floor kiosk with Swiss dials', href: '/world-clock-wall', icon: Monitor },
    { name: 'Solar & Lunar Astronomy', desc: 'Sunrise, sunset, twilight & moon phases', href: '/astronomy', icon: SunMedium },
    { name: 'International Dialing Codes', desc: 'Country calling codes & calling windows', href: '/dialing-codes', icon: Phone },
    { name: 'Flight & Jet Lag Calculator', desc: 'Flight duration & circadian light protocol', href: '/jet-lag-calculator', icon: Plane },
    { name: 'Online Alarm Clock', desc: 'Fullscreen bedside display with audio chimes', href: '/alarm', icon: Bell },
    { name: 'Meeting Planner', desc: 'Overlap window across 4+ global hubs', href: '/meeting-planner', icon: Users },
    { name: 'Unix Timestamp Studio', desc: 'Epoch seconds converter & 2038 lab', href: '/unix-time', icon: Clock },
  ];

  const popularConverters = [
    { label: 'GMT to EST', desc: 'London → New York', href: '/convert/gmt-to-est' },
    { label: 'EST to GMT', desc: 'New York → London', href: '/convert/est-to-gmt' },
    { label: 'IST to PST', desc: 'India → California', href: '/convert/ist-to-pst' },
    { label: 'PST to EST', desc: 'Pacific → Eastern', href: '/convert/pst-to-est' },
    { label: 'GMT to IST', desc: 'London → India', href: '/convert/gmt-to-ist' },
    { label: 'CET to EST', desc: 'Europe → New York', href: '/convert/cet-to-est' },
    { label: 'BST to EST', desc: 'UK Summer → Eastern', href: '/convert/bst-to-est' },
    { label: 'UTC to IST', desc: 'UTC Standard → India', href: '/convert/utc-to-ist' },
    { label: 'KST to GMT', desc: 'Korea → London', href: '/convert/kst-to-gmt' },
    { label: 'AEST to GMT', desc: 'Sydney → London', href: '/convert/aest-to-gmt' },
  ];

  return (
    <header className="w-full bg-white/95 dark:bg-slate-900/95 border-b border-slate-200/90 dark:border-slate-800 sticky top-0 z-50 backdrop-blur-md transition-colors shadow-2xs">
      <div className="max-w-[1720px] w-full mx-auto px-4 sm:px-8 lg:px-12 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Logo & Tagline */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Globe className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {siteConfig.name}
            </span>
            <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium leading-none">
              A more connected world
            </span>
          </div>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-600 dark:text-slate-300">
          <Link href="/" className="text-blue-600 dark:text-blue-400 font-extrabold hover:text-blue-700 transition-colors">
            World Clock
          </Link>

          {/* Converters Mega Dropdown */}
          <div ref={convertersRef} className="relative">
            <button
              onClick={() => {
                setConvertersOpen(!convertersOpen);
                setToolsOpen(false);
              }}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5 py-2 cursor-pointer font-bold"
            >
              <span>Converters</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-black">
                552
              </span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${convertersOpen ? 'rotate-180' : ''}`} />
            </button>

            {convertersOpen && (
              <div className="absolute left-0 top-full mt-2 w-96 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150 space-y-3">
                {/* Header ribbon */}
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1.5 text-xs font-black text-slate-900 dark:text-white">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>Timezone Converters</span>
                  </div>
                  <Link
                    href="/convert"
                    onClick={() => setConvertersOpen(false)}
                    className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <span>View All 552</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                {/* Popular Grid */}
                <div className="grid grid-cols-2 gap-1.5">
                  {popularConverters.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      onClick={() => setConvertersOpen(false)}
                      className="p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 border border-slate-100 dark:border-slate-800/80 transition-colors group"
                    >
                      <div className="font-mono font-bold text-xs text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {c.label}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        {c.desc}
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Footer Banner */}
                <Link
                  href="/convert"
                  onClick={() => setConvertersOpen(false)}
                  className="w-full py-2 px-3 rounded-2xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200/70 dark:border-blue-800/70 text-blue-700 dark:text-blue-300 text-xs font-bold flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Browse All 552 Timezone Combinations</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>

          <Link href="/world-map" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1">
            <span>World Map</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800">
              Live
            </span>
          </Link>

          <Link href="/time-zones" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1">
            <span>Time Zones</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
              400+
            </span>
          </Link>

          <Link href="/world-clock-wall" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Wall Clock
          </Link>

          <Link href="/astronomy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Astronomy
          </Link>

          {/* Tools Dropdown Menu */}
          <div ref={toolsRef} className="relative">
            <button
              onClick={() => {
                setToolsOpen(!toolsOpen);
                setConvertersOpen(false);
              }}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1 py-2 cursor-pointer font-bold"
            >
              <span>Tools</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${toolsOpen ? 'rotate-180' : ''}`} />
            </button>

            {toolsOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-80 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-2xl p-3 grid grid-cols-1 gap-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                {featureTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      onClick={() => setToolsOpen(false)}
                      className="p-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all flex items-start gap-3 group"
                    >
                      <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/40 group-hover:text-blue-600 transition-colors shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors block">
                          {tool.name}
                        </span>
                        <span className="text-[11px] text-slate-400 block truncate">
                          {tool.desc}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <Link href="/meeting-planner" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Meeting Planner
          </Link>
          <Link href="/learn" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Learn
          </Link>
          <Link href="/blog" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Blog
          </Link>
        </nav>

        {/* Right: Search, 3-State Theme Switcher & Perspective Tagline */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const input = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
              if (input) {
                input.focus();
                input.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }}
            type="button"
            className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
            title="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* 3-State Segmented Theme Control: Daylight | Evening (Navy Blue) | Dark */}
          <div className="flex items-center p-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 shadow-2xs">
            {/* Daylight / Light */}
            <button
              onClick={() => changeTheme('daylight')}
              type="button"
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                theme === 'daylight'
                  ? 'bg-white text-amber-600 shadow-xs scale-102 font-extrabold'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
              title="Daylight Theme (Light)"
            >
              <Sun className={`w-3.5 h-3.5 ${theme === 'daylight' ? 'text-amber-500 fill-amber-500/20' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">Day</span>
            </button>

            {/* Evening / Navy Blue Shade */}
            <button
              onClick={() => changeTheme('evening')}
              type="button"
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                theme === 'evening'
                  ? 'bg-[#152758] text-sky-300 shadow-xs border border-sky-400/40 scale-102 font-extrabold'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
              title="Evening Theme (Navy Blue Shade)"
            >
              <Sunset className={`w-3.5 h-3.5 ${theme === 'evening' ? 'text-orange-400' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">Evening</span>
            </button>

            {/* Dark / Midnight */}
            <button
              onClick={() => changeTheme('dark')}
              type="button"
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'bg-slate-900 text-blue-400 shadow-xs border border-blue-500/40 scale-102 font-extrabold'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
              title="Dark Theme (Deep Midnight)"
            >
              <Moon className={`w-3.5 h-3.5 ${theme === 'dark' ? 'text-blue-400 fill-blue-400/20' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">Dark</span>
            </button>
          </div>

          <span className="hidden xl:inline text-xs font-medium text-slate-400 dark:text-slate-500">
            A more connected tomorrow
          </span>
        </div>
      </div>
    </header>
  );
}
