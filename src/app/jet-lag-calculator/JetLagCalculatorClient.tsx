"use client";

import React, { useState, useMemo } from 'react';
import { POPULAR_CITIES } from '@/lib/geo/cities';
import { Plane, Compass, Sun, Moon, Coffee, ShieldAlert, CheckCircle, Clock, ArrowRight, Sparkles, BatteryCharging } from 'lucide-react';

export function JetLagCalculatorClient() {
  const [originCityId, setOriginCityId] = useState('new-york-us');
  const [destCityId, setDestCityId] = useState('paris-fr');
  const [depDate, setDepDate] = useState('2026-09-18');
  const [depTime, setDepTime] = useState('18:30');

  const originCity = useMemo(() => {
    return POPULAR_CITIES.find(c => c.id === originCityId) || POPULAR_CITIES[0];
  }, [originCityId]);

  const destCity = useMemo(() => {
    return POPULAR_CITIES.find(c => c.id === destCityId) || POPULAR_CITIES[1];
  }, [destCityId]);

  // Haversine distance in km
  const flightDistanceKm = useMemo(() => {
    const R = 6371; // Earth radius in km
    const rad = Math.PI / 180;
    const dLat = (destCity.lat - originCity.lat) * rad;
    const dLon = (destCity.lng - originCity.lng) * rad;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(originCity.lat * rad) * Math.cos(destCity.lat * rad) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
  }, [originCity, destCity]);

  // Flight duration estimate (820 km/h cruising + 40 mins takeoff/landing buffer)
  const flightDurationMinutes = useMemo(() => {
    if (flightDistanceKm < 50) return 60;
    const flightHours = flightDistanceKm / 820 + 0.67;
    return Math.round(flightHours * 60);
  }, [flightDistanceKm]);

  // Timezone offsets
  const { originOffsetMins, destOffsetMins, tzDiffHours } = useMemo(() => {
    const testDate = new Date(`${depDate}T${depTime}:00`);
    try {
      const getOffset = (tz: string) => {
        const utcDate = new Date(testDate.toLocaleString('en-US', { timeZone: 'UTC' }));
        const tzDate = new Date(testDate.toLocaleString('en-US', { timeZone: tz }));
        return Math.round((tzDate.getTime() - utcDate.getTime()) / 60000);
      };
      const orig = getOffset(originCity.timezone);
      const dest = getOffset(destCity.timezone);
      const diff = (dest - orig) / 60;
      return { originOffsetMins: orig, destOffsetMins: dest, tzDiffHours: diff };
    } catch {
      return { originOffsetMins: 0, destOffsetMins: 0, tzDiffHours: 0 };
    }
  }, [originCity, destCity, depDate, depTime]);

  // Flight arrival local time
  const arrivalInfo = useMemo(() => {
    const depLocal = new Date(`${depDate}T${depTime}:00`);
    const depUtcMs = depLocal.getTime() - originOffsetMins * 60000;
    const arrUtcMs = depUtcMs + flightDurationMinutes * 60000;
    const arrLocalMs = arrUtcMs + destOffsetMins * 60000;
    const arrDate = new Date(arrLocalMs);

    const fHours = Math.floor(flightDurationMinutes / 60);
    const fMins = flightDurationMinutes % 60;

    const arrTimeFormatted = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(arrDate);

    return {
      durationStr: `${fHours}h ${fMins}m`,
      arrTimeFormatted,
      arrDate,
    };
  }, [depDate, depTime, originOffsetMins, destOffsetMins, flightDurationMinutes]);

  // Jet lag severity & direction
  const isEastward = tzDiffHours > 0;
  const absDiff = Math.abs(tzDiffHours);

  let severity = 'Mild';
  let severityColor = 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800';
  let recoveryDays = Math.ceil(absDiff * 0.5);

  if (absDiff >= 6) {
    severity = 'Severe Circadian Shift';
    severityColor = 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800';
    recoveryDays = isEastward ? Math.ceil(absDiff * 1.3) : Math.ceil(absDiff * 1.0);
  } else if (absDiff >= 3) {
    severity = 'Moderate Jet Lag';
    severityColor = 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800';
    recoveryDays = isEastward ? Math.ceil(absDiff * 1.1) : Math.ceil(absDiff * 0.8);
  }

  // Protocol steps
  const protocol = useMemo(() => {
    if (absDiff < 2) {
      return [
        { phase: 'Normal Routine', title: 'Minimal Shift Required', desc: 'A 1–2 hour time difference does not heavily disrupt your suprachiasmatic nucleus. Maintain your standard sleep schedule.', icon: CheckCircle, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800' }
      ];
    }

    if (isEastward) {
      return [
        {
          phase: 'Morning (08:00 – 11:00)',
          title: 'Seek Bright Outdoor Sunlight',
          desc: 'Expose eyes to natural sunlight or 10,000-lux lamp for 30–45 mins. This suppresses morning melatonin and advances your circadian rhythm forward.',
          icon: Sun,
          color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800',
        },
        {
          phase: 'Afternoon (14:00)',
          title: 'Strict Caffeine Cutoff',
          desc: 'Cease coffee, tea, and energy drinks. Adenosine receptors must clear so sleep pressure can build for the earlier bedtime.',
          icon: Coffee,
          color: 'text-orange-500 bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-800',
        },
        {
          phase: 'Evening (19:00 – 21:00)',
          title: 'Avoid Blue Light & Wear Sunglasses',
          desc: 'Dim indoor lighting, activate night shift filters on devices, or wear amber blue-blocking glasses to stimulate pineal melatonin synthesis.',
          icon: Moon,
          color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800',
        },
        {
          phase: 'Bedtime (22:00 – 23:00)',
          title: 'Target Sleep Window & Melatonin',
          desc: 'Take 0.5mg – 3mg melatonin 30 minutes before destination bedtime. Keep the bedroom completely dark and cool (18°C / 65°F).',
          icon: BatteryCharging,
          color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800',
        },
      ];
    } else {
      return [
        {
          phase: 'Morning (07:00 – 09:00)',
          title: 'Gentle Awakening / Avoid Early Intense Light',
          desc: 'Sleep in slightly if needed. Avoid premature bright dawn light that would reset your clock backwards toward departure time.',
          icon: Moon,
          color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800',
        },
        {
          phase: 'Late Afternoon (16:00 – 18:30)',
          title: 'Seek Bright Sunlight & Outdoor Exercise',
          desc: 'Get outdoor sunlight during late afternoon. This delays your circadian pacemaker, allowing you to easily stay awake until local evening.',
          icon: Sun,
          color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800',
        },
        {
          phase: 'Evening (18:00)',
          title: 'High-Protein Dinner & Social Activity',
          desc: 'Eat dinner at the destination local hour to synchronize secondary metabolic peripheral clocks in liver and digestive tract.',
          icon: Coffee,
          color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800',
        },
        {
          phase: 'Night (23:00 – 24:00)',
          title: 'Delayed Sleep Onset',
          desc: 'Go to bed at the normal local hour. Westward adjustment is typically 30% faster than eastward journeys.',
          icon: BatteryCharging,
          color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800',
        },
      ];
    }
  }, [absDiff, isEastward]);

  return (
    <div className="space-y-8">
      {/* Route Selector Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Plane className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          Flight Route & Travel Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Origin */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
              Departure City
            </label>
            <select
              value={originCityId}
              onChange={(e) => setOriginCityId(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {POPULAR_CITIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}, {c.country}
                </option>
              ))}
            </select>
          </div>

          {/* Destination */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
              Destination City
            </label>
            <select
              value={destCityId}
              onChange={(e) => setDestCityId(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {POPULAR_CITIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}, {c.country}
                </option>
              ))}
            </select>
          </div>

          {/* Departure Date */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
              Departure Date
            </label>
            <input
              type="date"
              value={depDate}
              onChange={(e) => setDepDate(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Departure Time */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
              Departure Time (Local)
            </label>
            <input
              type="time"
              value={depTime}
              onChange={(e) => setDepTime(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Flight & Circadian Analysis Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Estimated Flight Duration */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            Flight Dynamics
          </span>
          <div className="text-3xl font-mono font-black text-slate-900 dark:text-white">
            {arrivalInfo.durationStr}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Great Circle Distance: <strong className="text-slate-900 dark:text-white">{flightDistanceKm.toLocaleString()} km</strong> (~{Math.round(flightDistanceKm * 0.621371).toLocaleString()} miles)
          </p>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
            Arrival: <strong className="text-blue-600 dark:text-blue-400">{arrivalInfo.arrTimeFormatted}</strong>
          </div>
        </div>

        {/* Timezone Differential */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            Time Shift & Direction
          </span>
          <div className="text-3xl font-mono font-black text-slate-900 dark:text-white">
            {tzDiffHours > 0 ? `+${tzDiffHours}h Ahead` : tzDiffHours < 0 ? `${tzDiffHours}h Behind` : 'Same Time'}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Direction: <strong className="text-slate-900 dark:text-white">{isEastward ? 'Eastward (Phase Advance)' : 'Westward (Phase Delay)'}</strong>
          </p>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
            {isEastward ? 'Challenging adaptation (day is cut short)' : 'Easier adaptation (day is extended)'}
          </div>
        </div>

        {/* Jet Lag Severity & Recovery */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            Circadian Severity
          </span>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${severityColor}`}>
              {severity}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Estimated Biological Adaptation: <strong className="text-slate-900 dark:text-white">~{recoveryDays} days</strong> without circadian protocol
          </p>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
            Can reduce to ~{Math.max(1, Math.round(recoveryDays * 0.4))} days following the protocol below.
          </div>
        </div>
      </div>

      {/* Hour-by-Hour Science-Backed Circadian Protocol */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Chronobiology Prescription
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            Personalized Circadian Protocol in {destCity.name}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Timed light exposure and darkness cues directly regulate the suprachiasmatic nucleus (SCN) master clock.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {protocol.map((step, idx) => {
            const Icon = step.icon || Sparkles;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 flex items-start gap-4"
              >
                <div className={`p-3 rounded-2xl border shrink-0 ${step.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    {step.phase}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
