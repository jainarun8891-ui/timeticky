"use client";

import React, { useState } from 'react';
import { Terminal, Copy, Check, Play, ChevronDown, ChevronRight, Layers, ShieldCheck } from 'lucide-react';

interface EndpointDoc {
  method: 'GET';
  path: string;
  summary: string;
  description: string;
  params?: { name: string; type: string; required: boolean; description: string }[];
  exampleUrl: string;
  exampleResponse: object;
}

const ENDPOINTS: EndpointDoc[] = [
  {
    method: 'GET',
    path: '/api/v1/time',
    summary: 'Current Atomic UTC Time & Timestamps',
    description: 'Returns the current international atomic time standard (UTC), ISO 8601 string, UNIX timestamps (seconds and milliseconds), day of year, week number, and leap year flags.',
    exampleUrl: '/api/v1/time',
    exampleResponse: {
      status: 'success',
      data: {
        standard: 'Coordinated Universal Time (UTC)',
        iso8601: '2026-09-14T08:45:00.000Z',
        timestamp: 1789375500,
        timestampMs: 1789375500000,
        year: 2026,
        month: 9,
        day: 14,
        hours: 8,
        minutes: 45,
        seconds: 0,
        dayOfWeek: 'Monday',
        dayOfYear: 257,
        weekNumber: 38,
        isLeapYear: false,
        utcOffset: '+00:00',
        abbreviation: 'UTC'
      }
    }
  },
  {
    method: 'GET',
    path: '/api/v1/timezone/[...tz]',
    summary: 'Get Time Details for IANA Timezone',
    description: 'Resolves any canonical IANA time zone identifier (e.g. Asia/Kolkata, America/New_York, Europe/Paris) and returns live clock readings, DST status, and numerical UTC offsets.',
    params: [
      { name: 'tz', type: 'path string', required: true, description: 'Canonical IANA timezone path (e.g. Asia/Kolkata or America/New_York)' }
    ],
    exampleUrl: '/api/v1/timezone/Asia/Kolkata',
    exampleResponse: {
      status: 'success',
      data: {
        timezone: 'Asia/Kolkata',
        datetime: '2026-09-14T08:45:00.000Z',
        formattedTime: '14:15:00',
        utcOffset: 'UTC +5:30',
        utcOffsetMinutes: 330,
        abbreviation: 'IST',
        isDst: false,
        timestamp: 1789375500,
        dayOfWeek: 'Monday',
        dayOfYear: 257,
        weekNumber: 38
      }
    }
  },
  {
    method: 'GET',
    path: '/api/v1/location/[city]',
    summary: 'Lookup City Current Time & Coordinates',
    description: 'Retrieves current local time, geographical coordinates, country codes, and IANA timezone mappings for any indexed metropolitan municipality.',
    params: [
      { name: 'city', type: 'path string', required: true, description: 'Canonical city slug (e.g. delhi, new-york, london, tokyo)' }
    ],
    exampleUrl: '/api/v1/location/delhi',
    exampleResponse: {
      status: 'success',
      data: {
        id: 'delhi',
        name: 'Delhi',
        country: 'India',
        countryCode: 'IN',
        timezone: 'Asia/Kolkata',
        coordinates: { latitude: 28.6139, longitude: 77.2090 },
        population: 32941000,
        currentTime: {
          iso: '2026-09-14T08:45:00.000Z',
          time: '14:15:00',
          formatted12h: '2:15 PM',
          utcOffset: 'UTC +5:30',
          abbreviation: 'IST',
          isDst: false
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/api/v1/sun/[city]',
    summary: 'Astronomical Solar Ephemeris',
    description: 'Computes solar ephemeris including sunrise, sunset, solar noon, dawn/dusk twilight markers, and exact day length for any global coordinate set.',
    params: [
      { name: 'city', type: 'path string', required: true, description: 'Canonical city slug (e.g. london, delhi, sydney)' }
    ],
    exampleUrl: '/api/v1/sun/london',
    exampleResponse: {
      status: 'success',
      data: {
        location: 'London',
        country: 'United Kingdom',
        timezone: 'Europe/London',
        coordinates: { latitude: 51.5074, longitude: -0.1278 },
        solar: {
          sunrise: '06:33',
          sunset: '19:18',
          solarNoon: '12:56',
          dayLength: '12h 45m',
          dayLengthMinutes: 765,
          civilDawn: '05:59',
          civilDusk: '19:52'
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/api/v1/convert',
    summary: 'Convert Time Across Multiple Zones',
    description: 'Converts an arbitrary source time and date into multiple destination timezones simultaneously, with automated business day shift indicators.',
    params: [
      { name: 'from', type: 'query string', required: true, description: 'Source IANA timezone (e.g. Asia/Kolkata)' },
      { name: 'to', type: 'query string', required: true, description: 'Comma-separated target timezones (e.g. America/New_York,Europe/London)' },
      { name: 'time', type: 'query string', required: false, description: '24-hour time HH:MM (defaults to 12:00)' },
      { name: 'date', type: 'query string', required: false, description: 'ISO date YYYY-MM-DD (defaults to today)' }
    ],
    exampleUrl: '/api/v1/convert?from=Asia/Kolkata&to=America/New_York,Europe/London&time=15:00',
    exampleResponse: {
      status: 'success',
      source: {
        timezone: 'Asia/Kolkata',
        inputTime: '15:00',
        utcOffset: 'UTC +5:30',
        abbreviation: 'IST'
      },
      conversions: [
        {
          timezone: 'America/New_York',
          time: '05:30',
          formatted12h: '5:30 AM',
          utcOffset: 'UTC -4',
          abbreviation: 'EDT',
          diffHours: -9.5,
          dayShift: 'same_day'
        },
        {
          timezone: 'Europe/London',
          time: '10:30',
          formatted12h: '10:30 AM',
          utcOffset: 'UTC +1',
          abbreviation: 'BST',
          diffHours: -4.5,
          dayShift: 'same_day'
        }
      ]
    }
  },
  {
    method: 'GET',
    path: '/api/v1/timezones',
    summary: 'List All 400+ Canonical IANA Timezones',
    description: 'Returns the full indexed dataset of 419 canonical IANA time zones categorized by continental quadrant with raw and formatted offsets.',
    exampleUrl: '/api/v1/timezones',
    exampleResponse: {
      status: 'success',
      count: 419,
      data: [
        { id: 'UTC', city: 'Coordinated Universal Time', region: 'UTC', rawOffsetMinutes: 0, formattedOffset: 'UTC +0', abbreviation: 'UTC' },
        { id: 'Asia/Kolkata', city: 'Kolkata', region: 'Asia', rawOffsetMinutes: 330, formattedOffset: 'UTC +5:30', abbreviation: 'IST' }
      ]
    }
  },
  {
    method: 'GET',
    path: '/api/v1/countries',
    summary: 'List Sovereign Countries & Timezones',
    description: 'Returns sovereign countries with ISO codes, capitals, population, currency, national flags, and member time zones.',
    exampleUrl: '/api/v1/countries',
    exampleResponse: {
      status: 'success',
      count: 24,
      data: [
        { code: 'IN', name: 'India', slug: 'india', capital: 'New Delhi', currency: 'Indian Rupee (INR)', timezones: ['Asia/Kolkata'] }
      ]
    }
  }
];

export function ApiDocsClient() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [liveOutput, setLiveOutput] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const ep = ENDPOINTS[activeTab];

  const handleTestEndpoint = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(ep.exampleUrl);
      const json = await res.json();
      setLiveOutput(JSON.stringify(json, null, 2));
    } catch (e) {
      setLiveOutput(JSON.stringify({ error: 'Failed to fetch live endpoint' }, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  const copyCurl = () => {
    const curl = `curl -X GET "https://www.timenumbers.com${ep.exampleUrl}"`;
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(curl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Sidebar Navigation */}
      <div className="lg:col-span-4 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 block mb-2">
          REST Endpoints (v1)
        </span>

        {ENDPOINTS.map((item, idx) => {
          const isActive = idx === activeTab;
          return (
            <button
              key={item.path}
              onClick={() => { setActiveTab(idx); setLiveOutput(null); }}
              className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                isActive
                  ? 'bg-blue-600 border-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="min-w-0 pr-2 space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-blue-700 text-white' : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                  }`}>
                    {item.method}
                  </span>
                  <span className="text-xs font-mono font-bold truncate">
                    {item.path}
                  </span>
                </div>
                <div className={`text-xs truncate ${isActive ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'}`}>
                  {item.summary}
                </div>
              </div>

              <ChevronRight className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
            </button>
          );
        })}
      </div>

      {/* Right Content Panel */}
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                  {ep.method}
                </span>
                <span className="text-lg font-mono font-bold text-slate-900 dark:text-white">
                  {ep.path}
                </span>
              </div>
              <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                {ep.summary}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={copyCurl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy cURL'}
              </button>
              <button
                onClick={handleTestEndpoint}
                disabled={isLoading}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                {isLoading ? 'Executing...' : 'Run Live Request'}
              </button>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {ep.description}
          </p>

          {/* Parameters Table if present */}
          {ep.params && ep.params.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Parameters
              </h3>
              <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="p-3">Field</th>
                      <th className="p-3">Type</th>
                      <th className="p-3">Requirement</th>
                      <th className="p-3">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {ep.params.map(p => (
                      <tr key={p.name} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                        <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">{p.name}</td>
                        <td className="p-3 font-mono text-slate-500">{p.type}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            p.required ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {p.required ? 'Required' : 'Optional'}
                          </span>
                        </td>
                        <td className="p-3 text-slate-600 dark:text-slate-300">{p.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Response Payload (Static or Live) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {liveOutput ? 'Live Server Response (200 OK)' : 'Example Response Schema'}
              </h3>
              <span className="text-[11px] font-mono text-slate-400">Content-Type: application/json</span>
            </div>

            <div className="bg-slate-950 rounded-2xl p-4 font-mono text-xs text-emerald-400 overflow-x-auto border border-slate-800 max-h-96">
              <pre>
                {liveOutput || JSON.stringify(ep.exampleResponse, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
