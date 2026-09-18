"use client";

import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { TIME_DIFFERENCE_FAQS } from '@/lib/seo/page-faqs';
import React, { useState } from 'react';
import Link from 'next/link';
import { CITIES, City } from '@/lib/geo/cities';
import { formatTimeInZone, formatDateInZone, getUtcOffsetString, getTimeDifference } from '@/lib/time/timezones';
import { ArrowRight, ArrowLeftRight, Clock } from 'lucide-react';

export default function TimeDifferencePage() {
  const [cityA, setCityA] = useState<City>(CITIES.find(c => c.name === 'Delhi') || CITIES[5]);
  const [cityB, setCityB] = useState<City>(CITIES.find(c => c.name === 'New York') || CITIES[1]);
  const now = new Date();

  const diff = getTimeDifference(cityA.timezone, cityB.timezone, now);
  const timeA = formatTimeInZone(now, cityA.timezone, false, true);
  const timeB = formatTimeInZone(now, cityB.timezone, false, true);
  const dateA = formatDateInZone(now, cityA.timezone);
  const dateB = formatDateInZone(now, cityB.timezone);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="text-center">
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white">
          Time Difference Calculator
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Exact time difference, day changes, and working hour overlap between two cities.
        </p>
      </div>

      {/* Comparison Pickers */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          {/* City A */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              From Location (Here)
            </label>
            <select
              value={cityA.id}
              onChange={(e) => setCityA(CITIES.find(c => c.id === e.target.value)!)}
              className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-800 dark:text-white text-sm outline-none"
            >
              {CITIES.map(c => (
                <option key={c.id} value={c.id}>{c.name}, {c.country}</option>
              ))}
            </select>
            <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="text-3xl font-mono font-black text-slate-900 dark:text-white block">{timeA}</span>
              <span className="text-xs text-slate-500 block mt-1">{dateA}</span>
              <span className="text-[11px] text-blue-600 font-semibold">{getUtcOffsetString(now, cityA.timezone)}</span>
            </div>
          </div>

          {/* City B */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              To Location (There)
            </label>
            <select
              value={cityB.id}
              onChange={(e) => setCityB(CITIES.find(c => c.id === e.target.value)!)}
              className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-800 dark:text-white text-sm outline-none"
            >
              {CITIES.map(c => (
                <option key={c.id} value={c.id}>{c.name}, {c.country}</option>
              ))}
            </select>
            <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="text-3xl font-mono font-black text-slate-900 dark:text-white block">{timeB}</span>
              <span className="text-xs text-slate-500 block mt-1">{dateB}</span>
              <span className="text-[11px] text-blue-600 font-semibold">{getUtcOffsetString(now, cityB.timezone)}</span>
            </div>
          </div>
        </div>

        {/* Big Verdict Pill */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
          <div className="inline-block px-6 py-3 rounded-2xl bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700">
            <span className="text-xs text-slate-500 dark:text-slate-400 block">Relative Time Difference</span>
            <span className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 block mt-0.5">
              {cityB.name} is {diff.formatted} {cityA.name}
            </span>
          </div>
        </div>
      </div>

      {/* Popular City Time Differences Grid */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Popular City Time Differences
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-medium">15 Dedicated Pair Guides</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { from: 'Delhi', to: 'New York', url: '/time-difference/delhi/new-york', hours: '9.5h behind' },
            { from: 'New York', to: 'Delhi', url: '/time-difference/new-york/delhi', hours: '9.5h ahead' },
            { from: 'London', to: 'Tokyo', url: '/time-difference/london/tokyo', hours: '9h ahead' },
            { from: 'Tokyo', to: 'London', url: '/time-difference/tokyo/london', hours: '9h behind' },
            { from: 'New York', to: 'London', url: '/time-difference/new-york/london', hours: '5h ahead' },
            { from: 'London', to: 'New York', url: '/time-difference/london/new-york', hours: '5h behind' },
            { from: 'Sydney', to: 'New York', url: '/time-difference/sydney/new-york', hours: '14h behind' },
            { from: 'New York', to: 'Sydney', url: '/time-difference/new-york/sydney', hours: '14h ahead' },
            { from: 'Sydney', to: 'London', url: '/time-difference/sydney/london', hours: '9h behind' },
            { from: 'London', to: 'Sydney', url: '/time-difference/london/sydney', hours: '9h ahead' },
            { from: 'Paris', to: 'Tokyo', url: '/time-difference/paris/tokyo', hours: '7h ahead' },
            { from: 'Dubai', to: 'Singapore', url: '/time-difference/dubai/singapore', hours: '4h ahead' },
            { from: 'Singapore', to: 'Tokyo', url: '/time-difference/singapore/tokyo', hours: '1h ahead' },
            { from: 'Chicago', to: 'London', url: '/time-difference/chicago/london', hours: '6h ahead' },
            { from: 'Los Angeles', to: 'Tokyo', url: '/time-difference/los-angeles/tokyo', hours: '16h ahead' },
          ].map((pair) => (
            <Link
              key={pair.url}
              href={pair.url}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-100 dark:border-slate-800 transition-all flex items-center justify-between group"
            >
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {pair.from} → {pair.to}
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">{pair.hours}</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </section>

      <FaqAccordion items={TIME_DIFFERENCE_FAQS} title="Frequently Asked Questions About Time Difference & Offsets" />
      <RelatedLinksHub />
    </div>
  );
}
