"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { DIALING_CODES, DialingCodeEntry } from '@/lib/dialing/dialing-database';
import { Phone, Search, Globe, Clock, Check, Copy, ArrowRight, ShieldAlert, CheckCircle2, AlertTriangle, Moon } from 'lucide-react';

export function DialingCodesClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [simCountry, setSimCountry] = useState<DialingCodeEntry>(DIALING_CODES[0]);
  const [simLocalNumber, setSimLocalNumber] = useState('202-555-0143');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const now = currentTime || new Date();

  const getCountryHour = (timezone: string) => {
    try {
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: 'numeric',
        hour12: false,
      }).formatToParts(now);
      const h = parseInt(parts.find(p => p.type === 'hour')?.value || '12', 10);
      return h;
    } catch {
      return 12;
    }
  };

  const getCallingStatus = (timezone: string) => {
    const hour = getCountryHour(timezone);
    if (hour >= 9 && hour < 18) {
      return {
        label: 'Business Hours',
        badgeClass: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
        dotClass: 'bg-emerald-500',
        verdict: 'Ideal time for business and personal calls.',
        icon: CheckCircle2,
      };
    } else if (hour >= 18 && hour < 22) {
      return {
        label: 'Evening',
        badgeClass: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800',
        dotClass: 'bg-amber-500',
        verdict: 'Acceptable for personal or urgent calls.',
        icon: AlertTriangle,
      };
    } else if (hour >= 7 && hour < 9) {
      return {
        label: 'Early Morning',
        badgeClass: 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800',
        dotClass: 'bg-blue-500',
        verdict: 'Early morning; caution recommended for commercial calls.',
        icon: AlertTriangle,
      };
    } else {
      return {
        label: 'Late Night',
        badgeClass: 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800',
        dotClass: 'bg-rose-500',
        verdict: 'Nighttime / sleeping hours. Do not call unless an emergency.',
        icon: Moon,
      };
    }
  };

  const formatLocalTime = (timezone: string) => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(now);
    } catch {
      return '--:--';
    }
  };

  const filteredCountries = useMemo(() => {
    return DIALING_CODES.filter((c) => {
      if (selectedRegion !== 'All' && c.region !== selectedRegion) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = c.name.toLowerCase().includes(q);
        const matchDial = c.dialCode.toLowerCase().includes(q);
        const matchCode = c.countryCode.toLowerCase().includes(q);
        const matchCapital = c.capital.toLowerCase().includes(q);
        if (!matchName && !matchDial && !matchCode && !matchCapital) {
          return false;
        }
      }
      return true;
    });
  }, [searchQuery, selectedRegion]);

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const simStatus = getCallingStatus(simCountry.timezone);

  return (
    <div className="space-y-8">
      {/* Interactive Dialing Simulator Widget */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              International Calling Assistant & Formatter
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Format telephone numbers with correct exit codes and verify destination calling etiquette.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="lg:col-span-4 space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                Destination Country
              </label>
              <select
                value={simCountry.countryCode}
                onChange={(e) => {
                  const c = DIALING_CODES.find(item => item.countryCode === e.target.value);
                  if (c) setSimCountry(c);
                }}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {DIALING_CODES.map((c) => (
                  <option key={c.countryCode} value={c.countryCode}>
                    {c.flag} {c.name} ({c.dialCode})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                Local Phone Number
              </label>
              <input
                type="text"
                value={simLocalNumber}
                onChange={(e) => setSimLocalNumber(e.target.value)}
                placeholder="e.g. 7911 123456"
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  International Dialing Result
                </span>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${simStatus.badgeClass}`}>
                  <span className={`w-2 h-2 rounded-full ${simStatus.dotClass} animate-pulse`} />
                  {simStatus.label} ({formatLocalTime(simCountry.timezone)})
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700">
                <span className="text-xl sm:text-2xl font-mono font-black text-slate-900 dark:text-white">
                  {simCountry.dialCode} {simLocalNumber.replace(/^0+/, '')}
                </span>
                <button
                  onClick={() => copyText(`${simCountry.dialCode} ${simLocalNumber.replace(/^0+/, '')}`)}
                  className="px-3.5 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 hover:bg-blue-100 text-xs font-semibold transition-all flex items-center gap-1.5"
                >
                  {copiedText ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedText ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200/60 dark:border-slate-700">
              <div>
                <strong className="text-slate-700 dark:text-slate-300 block">Calling from North America (US/CA):</strong>
                Dial: <code className="font-mono text-blue-600 dark:text-blue-400">011 {simCountry.dialCode.replace('+', '')} {simLocalNumber.replace(/^0+/, '')}</code>
              </div>
              <div>
                <strong className="text-slate-700 dark:text-slate-300 block">Calling from Europe / Global standard:</strong>
                Dial: <code className="font-mono text-blue-600 dark:text-blue-400">00 {simCountry.dialCode.replace('+', '')} {simLocalNumber.replace(/^0+/, '')}</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Directory Filter Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by country, dial code (+44, +81, +1), or capital city..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Region Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {['All', 'Americas', 'Europe', 'Asia', 'Africa', 'Oceania'].map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedRegion === reg
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Country Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredCountries.map((c) => {
          const status = getCallingStatus(c.timezone);
          const time = formatLocalTime(c.timezone);

          return (
            <div
              key={c.countryCode}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-2xl">{c.flag}</span>
                  <span className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-mono font-bold text-sm border border-blue-200/60 dark:border-blue-800">
                    {c.dialCode}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {c.name}
                </h3>
                <span className="text-xs text-slate-400 block mt-0.5">
                  Capital: {c.capital}
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Local Time</span>
                  <span className="text-sm font-mono font-bold text-slate-900 dark:text-white">
                    {time}
                  </span>
                </div>

                <div className={`p-2 rounded-xl border text-[11px] font-semibold flex items-center gap-1.5 ${status.badgeClass}`}>
                  <span className={`w-2 h-2 rounded-full ${status.dotClass}`} />
                  <span>{status.label}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
