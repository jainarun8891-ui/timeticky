"use client";

import React, { useState } from 'react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { Users, Clock, Calendar, Check, Copy, Sparkles, Globe2, Briefcase } from 'lucide-react';

interface CityItem {
  name: string;
  country: string;
  timezone: string;
  workStart: number;
  workEnd: number;
}

const PRESETS: Record<string, { label: string; cities: CityItem[] }> = {
  'us-india': {
    label: 'USA (EST/PST) & India (IST)',
    cities: [
      { name: 'New York', country: 'United States', timezone: 'America/New_York', workStart: 9, workEnd: 17 },
      { name: 'San Francisco', country: 'United States', timezone: 'America/Los_Angeles', workStart: 9, workEnd: 17 },
      { name: 'Delhi', country: 'India', timezone: 'Asia/Kolkata', workStart: 9, workEnd: 18 },
    ]
  },
  'london-ny-tokyo': {
    label: 'London, New York & Tokyo',
    cities: [
      { name: 'London', country: 'United Kingdom', timezone: 'Europe/London', workStart: 9, workEnd: 17 },
      { name: 'New York', country: 'United States', timezone: 'America/New_York', workStart: 9, workEnd: 17 },
      { name: 'Tokyo', country: 'Japan', timezone: 'Asia/Tokyo', workStart: 9, workEnd: 18 },
    ]
  },
  'uk-australia': {
    label: 'UK & Australia (London - Sydney)',
    cities: [
      { name: 'London', country: 'United Kingdom', timezone: 'Europe/London', workStart: 9, workEnd: 17 },
      { name: 'Sydney', country: 'Australia', timezone: 'Australia/Sydney', workStart: 9, workEnd: 17 },
    ]
  },
  'europe-singapore': {
    label: 'Europe (Paris) & Singapore',
    cities: [
      { name: 'Paris', country: 'France', timezone: 'Europe/Paris', workStart: 9, workEnd: 18 },
      { name: 'Singapore', country: 'Singapore', timezone: 'Asia/Singapore', workStart: 9, workEnd: 18 },
    ]
  }
};

export function OverlapCalculatorClient() {
  const [activePreset, setActivePreset] = useState<string>('us-india');
  const [cities, setCities] = useState<CityItem[]>(PRESETS['us-india'].cities);
  const [selectedUtcHour, setSelectedUtcHour] = useState<number>(14);
  const [copied, setCopied] = useState(false);

  const handleSelectPreset = (key: string) => {
    setActivePreset(key);
    setCities(PRESETS[key].cities);
  };

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const evaluateHour = (utcH: number) => {
    const statuses = cities.map(c => {
      const now = new Date();
      now.setUTCHours(utcH, 0, 0, 0);
      const str = now.toLocaleTimeString('en-US', { timeZone: c.timezone, hour: 'numeric', hour12: false });
      const localH = parseInt(str, 10);
      const isWorking = localH >= c.workStart && localH <= c.workEnd;
      const isExtended = localH >= (c.workStart - 1) && localH <= (c.workEnd + 2);
      return { localH, isWorking, isExtended };
    });

    const allWorking = statuses.every(s => s.isWorking);
    const majorityWorking = statuses.filter(s => s.isWorking).length >= Math.ceil(cities.length / 2);
    const anyAsleep = statuses.some(s => s.localH < 7 || s.localH > 22);

    return { allWorking, majorityWorking, anyAsleep, statuses };
  };

  const currentSelection = evaluateHour(selectedUtcHour);

  const formatLocalTime = (utcH: number, tz: string) => {
    const now = new Date();
    now.setUTCHours(utcH, 0, 0, 0);
    return now.toLocaleTimeString('en-US', { timeZone: tz, hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const handleCopySchedule = () => {
    const lines = cities.map(c => `• ${c.name}: ${formatLocalTime(selectedUtcHour, c.timezone)}`);
    const text = `Recommended Meeting Time:\n${lines.join('\n')}\n(UTC: ${selectedUtcHour}:00)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      question: "What is the best time to schedule a meeting with India and USA?",
      answer: "The optimal overlapping window between USA (Eastern Time) and India (IST) occurs between 8:00 AM – 10:00 AM EST, which corresponds to 5:30 PM – 7:30 PM IST. For Pacific Time (PST), 8:00 PM PST aligns with 8:30 AM IST next morning."
    },
    {
      question: "How to find good meeting time across multiple international time zones?",
      answer: "Use our 24-hour visual matrix to identify mutual working hours (9:00 AM – 5:00 PM). If no perfect 3-way overlap exists (e.g. London, New York, and Tokyo), teams typically alternate meetings or adopt asynchronous communication."
    },
    {
      question: "What is a good time to call Australia from the UK?",
      answer: "The best time to call Sydney or Melbourne from London is between 8:00 AM – 9:30 AM UK time, which corresponds to 5:00 PM – 6:30 PM (or 6:00 PM – 7:30 PM during DST) in Australia."
    }
  ];

  return (
    <div className="space-y-10">
      <header className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Remote Team Collaboration Matrix</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          Time Zone Overlap Calculator
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
          Find overlapping working hours and schedule meetings effortlessly between remote distributed teams worldwide.
        </p>
      </header>

      {/* Preset Selector */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Object.entries(PRESETS).map(([key, val]) => (
          <button
            key={key}
            onClick={() => handleSelectPreset(key)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
              activePreset === key
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300'
            }`}
          >
            {val.label}
          </button>
        ))}
      </div>

      {/* Selected Slot Summary Card */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Selected Working Slot
            </span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span>{selectedUtcHour.toString().padStart(2, '0')}:00 UTC</span>
              {currentSelection.allWorking ? (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                  Mutual 9-to-5 Overlap
                </span>
              ) : currentSelection.anyAsleep ? (
                <span className="px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-bold">
                  Night Hours in 1+ Cities
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 text-xs font-bold">
                  Extended Business Hours
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleCopySchedule}
            className="px-4 py-2 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs inline-flex items-center gap-2 transition-all self-start sm:self-auto"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Meeting Invite!' : 'Copy Slot for Slack / Email'}</span>
          </button>
        </div>

        {/* Cities In Selected Slot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {cities.map((city, idx) => {
            const timeStr = formatLocalTime(selectedUtcHour, city.timezone);
            const status = currentSelection.statuses[idx];
            return (
              <div
                key={city.name}
                className={`p-4 rounded-2xl border transition-all ${
                  status.isWorking
                    ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60'
                    : status.localH < 7 || status.localH > 22
                    ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-60'
                    : 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/60'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">{city.name}</span>
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                    status.isWorking
                      ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300'
                      : status.localH < 7 || status.localH > 22
                      ? 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      : 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300'
                  }`}>
                    {status.isWorking ? 'In Office' : status.localH < 7 || status.localH > 22 ? 'Asleep' : 'Flexible'}
                  </span>
                </div>
                <div className="text-2xl font-mono font-black text-slate-900 dark:text-white">
                  {timeStr}
                </div>
                <span className="text-[11px] text-slate-400 block mt-1">{city.country}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* 24-Hour Timeline Matrix */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-600" />
          <span>24-Hour Mutual Working Hours Grid (Click any hour to preview)</span>
        </h2>

        <div className="overflow-x-auto pb-2">
          <div className="min-w-[700px] space-y-2">
            <div className="grid grid-cols-24 gap-1 text-[10px] font-mono text-center text-slate-400">
              {hours.map(h => (
                <div
                  key={h}
                  onClick={() => setSelectedUtcHour(h)}
                  className={`cursor-pointer py-1 rounded ${
                    selectedUtcHour === h ? 'bg-blue-600 text-white font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {h}h
                </div>
              ))}
            </div>

            {cities.map(city => (
              <div key={city.name} className="flex items-center gap-2 text-xs">
                <span className="w-24 font-bold text-slate-700 dark:text-slate-300 truncate">{city.name}</span>
                <div className="grid grid-cols-24 gap-1 flex-1">
                  {hours.map(h => {
                    const now = new Date();
                    now.setUTCHours(h, 0, 0, 0);
                    const localH = parseInt(now.toLocaleTimeString('en-US', { timeZone: city.timezone, hour: 'numeric', hour12: false }), 10);
                    const isWorking = localH >= city.workStart && localH <= city.workEnd;
                    const isSleep = localH < 7 || localH > 22;

                    return (
                      <button
                        key={h}
                        onClick={() => setSelectedUtcHour(h)}
                        title={`${city.name}: ${formatLocalTime(h, city.timezone)}`}
                        className={`h-8 rounded text-[10px] font-mono flex items-center justify-center transition-all ${
                          selectedUtcHour === h
                            ? 'ring-2 ring-blue-500 scale-105 z-10'
                            : ''
                        } ${
                          isWorking
                            ? 'bg-emerald-500 text-white font-bold'
                            : isSleep
                            ? 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                            : 'bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200'
                        }`}
                      >
                        {localH}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-500"></span>
            <span>Standard Working Hours (9am–5pm)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-200 dark:bg-amber-900/60"></span>
            <span>Early Morning / Evening Flexible</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-slate-100 dark:bg-slate-800"></span>
            <span>Outside Office / Night Hours</span>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
        <FaqAccordion items={faqs} title="Frequently Asked Questions About Team Overlaps" />
      </section>

      <RelatedLinksHub />
    </div>
  );
}
