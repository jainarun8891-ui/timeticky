"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Users, Calendar, Clock, Check, ArrowRight, Sparkles } from 'lucide-react';
import { City, CITIES } from '@/lib/geo/cities';
import { evaluateMeetingSlots, Participant } from '@/lib/meeting/planner';

interface MeetingOverlapStudioProps {
  currentCity: City;
}

export function MeetingOverlapStudio({ currentCity }: MeetingOverlapStudioProps) {
  const [selectedCities] = useState<City[]>([
    currentCity,
    CITIES.find(c => c.id === 'new-york-us') || CITIES[1],
    CITIES.find(c => c.id === 'london-gb') || CITIES[2],
  ]);

  const participants: Participant[] = selectedCities.map(c => ({
    name: c.name,
    timezone: c.timezone,
    workStartHour: 9,
    workEndHour: 18
  }));

  const slots = evaluateMeetingSlots(participants);
  const excellentSlots = slots.filter(s => s.score === 'Excellent');
  const goodSlots = slots.filter(s => s.score === 'Good');

  return (
    <section className="w-full bg-white dark:bg-zinc-950/70 rounded-3xl border border-slate-200/80 dark:border-zinc-800/80 p-6 sm:p-8 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200/90 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30 shadow-md">
            <Users className="w-4.5 h-4.5" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white tracking-tight">
              International Meeting Window Finder
            </h2>
            <p className="text-xs text-zinc-400">
              Optimal working overlap between {selectedCities.map(c => c.name).join(', ')}
            </p>
          </div>
        </div>

        <Link
          href="/meeting-planner"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-xs font-bold border border-slate-200/90 dark:border-slate-800 transition-all"
        >
          <span>Full Multi-Zone Planner</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Overlap Summary Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Visual Overlap Status */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Optimal Overlap Window
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <Sparkles className="w-3 h-3 text-emerald-500" />
              <span>{excellentSlots.length > 0 ? 'Excellent Overlap' : 'Good Overlap'}</span>
            </span>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
              {excellentSlots.length > 0
                ? `${excellentSlots[0].utcHour}:00 - ${excellentSlots[excellentSlots.length - 1].utcHour + 1}:00 UTC`
                : goodSlots.length > 0
                ? `${goodSlots[0].utcHour}:00 - ${goodSlots[goodSlots.length - 1].utcHour + 1}:00 UTC`
                : '13:00 - 17:00 UTC'}
            </div>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
              Provides reasonable business hours for all {selectedCities.length} participants with zero sleep disruption.
            </p>
          </div>

          {/* Participant Breakdown */}
          <div className="space-y-2 pt-2 border-t border-slate-200/90 dark:border-slate-800">
            {selectedCities.map((city) => (
              <div key={city.id} className="flex items-center justify-between text-xs">
                <span className="font-bold text-zinc-200">
                  {city.name} ({city.timezone.split('/')[1]})
                </span>
                <span className="font-mono text-slate-500 dark:text-zinc-400">
                  Standard Work Hours (09:00 - 18:00)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: 24-Hour Overlap Visual Matrix */}
        <div className="lg:col-span-7 space-y-3">
          {selectedCities.map((city) => (
            <div key={city.id} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-medium px-1">
                <span className="font-bold text-slate-900 dark:text-white">{city.name}</span>
                <span className="text-[11px] text-slate-400 font-mono">{city.timezone}</span>
              </div>

              {/* 24-Hour Grid Strip */}
              <div className="grid grid-cols-24 h-7 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-800">
                {Array.from({ length: 24 }).map((_, h) => {
                  const isWork = h >= 9 && h < 18;
                  const isOverlap = h >= 14 && h < 18;

                  return (
                    <div
                      key={h}
                      className={`h-full border-r border-white/5 transition-colors flex items-center justify-center text-[9px] font-mono ${
                        isOverlap
                          ? 'bg-emerald-500 text-white font-bold'
                          : isWork
                          ? 'bg-blue-600/30 text-blue-300'
                          : 'bg-transparent text-slate-400 dark:text-zinc-600'
                      }`}
                      title={`${h}:00 local in ${city.name}`}
                    >
                      {h % 4 === 0 ? h : ''}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-zinc-500 pt-2 px-1 font-medium">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500" />
                <span>Golden Overlap</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-xs bg-blue-300 dark:bg-blue-900" />
                <span>Business Hours (9-18)</span>
              </span>
            </div>
            <span>00:00 to 24:00</span>
          </div>
        </div>
      </div>
    </section>
  );
}
