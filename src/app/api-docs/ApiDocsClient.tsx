"use client";

import React, { useState } from 'react';
import { Terminal, Copy, Check, Play, ChevronRight, Key, Zap, CheckCircle2, Shield, Sparkles } from 'lucide-react';
import { API_PLANS, ApiPlan } from '@/lib/api/plans';

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
        iso8601: '2026-10-08T16:30:00.000Z',
        timestamp: 1791477000,
        timestampMs: 1791477000000,
        year: 2026,
        month: 10,
        day: 8,
        hours: 16,
        minutes: 30,
        seconds: 0,
        dayOfWeek: 'Thursday',
        dayOfYear: 281,
        weekNumber: 41,
        isLeapYear: false,
        utcOffset: '+00:00',
        abbreviation: 'UTC'
      },
      rateLimit: {
        tier: 'free',
        tierName: 'Free Starter',
        limitPerMinute: 10,
        remainingThisMinute: 9,
        resetSeconds: 60
      }
    }
  },
  {
    method: 'GET',
    path: '/api/v1/timezone',
    summary: 'Get Time Details for IANA Timezone',
    description: 'Resolves any canonical IANA time zone identifier (e.g. Asia/Kolkata, America/New_York, Europe/Paris) and returns live clock readings, DST status, and numerical UTC offsets.',
    params: [
      { name: 'tz', type: 'query string', required: true, description: 'Canonical IANA timezone identifier (e.g. Asia/Kolkata or America/New_York)' }
    ],
    exampleUrl: '/api/v1/timezone?tz=Asia/Kolkata',
    exampleResponse: {
      status: 'success',
      data: {
        timezone: 'Asia/Kolkata',
        datetime: '2026-10-08T16:30:00.000Z',
        formattedTime: '22:00:00',
        utcOffset: '+05:30',
        utcOffsetMinutes: 330,
        abbreviation: 'IST',
        isDst: false,
        timestamp: 1791477000,
        dayOfWeek: 'Thursday',
        dayOfYear: 281,
        weekNumber: 41
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
          iso: '2026-10-08T16:30:00.000Z',
          time: '22:00:00',
          formatted12h: '10:00 PM',
          utcOffset: '+05:30',
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
          sunrise: '07:12',
          sunset: '18:22',
          solarNoon: '12:47',
          dayLength: '11h 10m',
          dayLengthMinutes: 670,
          civilDawn: '06:38',
          civilDusk: '18:56'
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
        utcOffset: '+05:30',
        abbreviation: 'IST'
      },
      conversions: [
        {
          timezone: 'America/New_York',
          time: '05:30',
          formatted12h: '5:30 AM',
          utcOffset: '-04:00',
          abbreviation: 'EDT',
          diffHours: -9.5,
          dayShift: 'same_day'
        },
        {
          timezone: 'Europe/London',
          time: '10:30',
          formatted12h: '10:30 AM',
          utcOffset: '+01:00',
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
        { id: 'UTC', city: 'Coordinated Universal Time', region: 'UTC', rawOffsetMinutes: 0, formattedOffset: '+00:00', abbreviation: 'UTC' },
        { id: 'Asia/Kolkata', city: 'Kolkata', region: 'Asia', rawOffsetMinutes: 330, formattedOffset: '+05:30', abbreviation: 'IST' }
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
  const [apiKeyMode, setApiKeyMode] = useState<string>('free');
  const [customKey, setCustomKey] = useState<string>('');
  const [liveOutput, setLiveOutput] = useState<string | null>(null);
  const [responseHeaders, setResponseHeaders] = useState<Record<string, string> | null>(null);
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [responseTimeMs, setResponseTimeMs] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [checkoutModalPlan, setCheckoutModalPlan] = useState<ApiPlan | null>(null);

  const ep = ENDPOINTS[activeTab];

  const getEffectiveApiKey = () => {
    if (apiKeyMode === 'developer') return 'tn_sandbox_dev';
    if (apiKeyMode === 'business') return 'tn_sandbox_biz';
    if (apiKeyMode === 'custom') return customKey.trim();
    return '';
  };

  const handleTestEndpoint = async () => {
    setIsLoading(true);
    setResponseHeaders(null);
    setResponseStatus(null);
    setResponseTimeMs(null);

    const startTime = performance.now();
    const effectiveKey = getEffectiveApiKey();

    try {
      const headers: Record<string, string> = {};
      if (effectiveKey) {
        headers['x-api-key'] = effectiveKey;
      }

      const res = await fetch(ep.exampleUrl, { headers });
      const duration = Math.round(performance.now() - startTime);
      setResponseTimeMs(duration);
      setResponseStatus(res.status);

      const hdrs: Record<string, string> = {};
      ['x-ratelimit-limit', 'x-ratelimit-remaining', 'x-ratelimit-reset', 'x-ratelimit-tier', 'content-type'].forEach(k => {
        const val = res.headers.get(k);
        if (val) hdrs[k] = val;
      });
      setResponseHeaders(hdrs);

      const json = await res.json();
      setLiveOutput(JSON.stringify(json, null, 2));
    } catch (e) {
      setLiveOutput(JSON.stringify({ error: 'Failed to fetch live endpoint' }, null, 2));
      setResponseStatus(500);
    } finally {
      setIsLoading(false);
    }
  };

  const copyCurl = () => {
    const key = getEffectiveApiKey();
    const keyHeader = key ? ` -H "x-api-key: ${key}"` : '';
    const curl = `curl -X GET "https://www.timenumbers.com${ep.exampleUrl}"${keyHeader}`;
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(curl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-12">
      {/* Interactive Sandbox & Endpoint Tester */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar Navigation */}
        <div className="lg:col-span-4 space-y-4">
          {/* API Key Simulation Selector */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              <Key className="w-4 h-4 text-blue-600" />
              API Key Sandbox
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Test rate limits and authentication tiers in real-time.
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => setApiKeyMode('free')}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all ${
                  apiKeyMode === 'free'
                    ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 text-blue-600 dark:text-blue-400 font-bold'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                Free (10/m)
              </button>
              <button
                onClick={() => setApiKeyMode('developer')}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all ${
                  apiKeyMode === 'developer'
                    ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 text-blue-600 dark:text-blue-400 font-bold'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                Pro (60/m)
              </button>
              <button
                onClick={() => setApiKeyMode('business')}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all ${
                  apiKeyMode === 'business'
                    ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 text-blue-600 dark:text-blue-400 font-bold'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                Biz (300/m)
              </button>
            </div>

            <div className="pt-2 text-[11px] font-mono text-slate-500 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
              <span>Active Key:</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {getEffectiveApiKey() || '(None - Anonymous)'}
              </span>
            </div>
          </div>

          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 block">
            REST Endpoints (v1)
          </span>

          <div className="space-y-1.5">
            {ENDPOINTS.map((item, idx) => {
              const isActive = idx === activeTab;
              return (
                <button
                  key={item.path}
                  onClick={() => { setActiveTab(idx); setLiveOutput(null); setResponseHeaders(null); }}
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
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
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
                              p.required ? 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
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

            {/* Live Inspection Metadata */}
            {responseStatus !== null && (
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <span className={`font-mono font-bold px-2 py-0.5 rounded ${
                    responseStatus >= 200 && responseStatus < 300
                      ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400'
                      : 'bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-400'
                  }`}>
                    HTTP {responseStatus}
                  </span>
                  {responseTimeMs !== null && (
                    <span className="text-slate-500 dark:text-slate-400 font-mono">
                      Latency: <strong className="text-slate-800 dark:text-slate-200">{responseTimeMs}ms</strong>
                    </span>
                  )}
                </div>

                {responseHeaders && (
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                    {responseHeaders['x-ratelimit-tier'] && (
                      <span className="bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                        Tier: <strong>{responseHeaders['x-ratelimit-tier']}</strong>
                      </span>
                    )}
                    {responseHeaders['x-ratelimit-remaining'] && (
                      <span className="bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                        Remaining: <strong>{responseHeaders['x-ratelimit-remaining']}/{responseHeaders['x-ratelimit-limit']}</strong>
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Response Payload */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {liveOutput ? 'Server Response Payload' : 'Example Response Schema'}
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

      {/* Commercial API Subscription Pricing */}
      <div id="pricing" className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5" />
            Transparent Commercial Pricing
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            High-Throughput Time Infrastructure for Modern Teams
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Scale seamlessly from local development to mission-critical enterprise microservices with guaranteed SLAs and accurate IANA timezone datasets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {API_PLANS.map((plan) => {
            const isRec = !!plan.recommended;
            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-6 transition-all flex flex-col justify-between ${
                  isRec
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20 border-2 border-blue-500'
                    : 'bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-slate-900 dark:text-slate-100'
                }`}
              >
                {isRec && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Most Popular
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-lg">{plan.name}</h3>
                    <p className={`text-xs mt-1 ${isRec ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'}`}>
                      {plan.description}
                    </p>
                  </div>

                  <div className="pt-2">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold">
                        {plan.priceInr === 0 ? '₹0' : `₹${plan.priceInr.toLocaleString('en-IN')}`}
                      </span>
                      <span className={`text-xs ${isRec ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'}`}>
                        / {plan.period}
                      </span>
                    </div>
                    {plan.priceUsd > 0 && (
                      <span className={`text-[11px] block mt-0.5 ${isRec ? 'text-blue-200' : 'text-slate-400'}`}>
                        approx. ${plan.priceUsd} USD / mo
                      </span>
                    )}
                  </div>

                  <div className={`p-3 rounded-xl text-xs font-mono font-semibold ${
                    isRec ? 'bg-blue-700/60 text-white' : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}>
                    <div>{plan.monthlyQuota.toLocaleString()} requests / month</div>
                    <div className="opacity-80 font-normal mt-0.5">{plan.rateLimitPerMin} req/min burst rate</div>
                  </div>

                  <ul className="space-y-2 text-xs pt-2">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isRec ? 'text-blue-200' : 'text-emerald-500'}`} />
                        <span className={isRec ? 'text-blue-50' : 'text-slate-600 dark:text-slate-300'}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-current/10">
                  <button
                    onClick={() => setCheckoutModalPlan(plan)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-sm ${
                      isRec
                        ? 'bg-white text-blue-700 hover:bg-blue-50'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {plan.id === 'free' ? 'Use Free Sandbox' : plan.id === 'enterprise' ? 'Contact Sales' : `Subscribe (${plan.name})`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subscription / Staging Integration Modal */}
      {checkoutModalPlan && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900 dark:text-white">
                  {checkoutModalPlan.name} Subscription
                </h3>
              </div>
              <button
                onClick={() => setCheckoutModalPlan(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-slate-900 dark:text-white">Plan Tier</span>
                  <span className="font-bold text-blue-600">{checkoutModalPlan.name}</span>
                </div>
                <div className="flex justify-between items-center text-slate-500">
                  <span>Billing Period</span>
                  <span>Monthly Recurring</span>
                </div>
                <div className="flex justify-between items-center text-slate-900 dark:text-white font-bold pt-1 border-t border-slate-200 dark:border-slate-700 mt-2">
                  <span>Price</span>
                  <span>{checkoutModalPlan.priceInr === 0 ? 'Free' : `₹${checkoutModalPlan.priceInr}/mo`}</span>
                </div>
              </div>

              {checkoutModalPlan.id === 'free' ? (
                <div className="space-y-2">
                  <p>Free requests work instantly without any API key or registration. Use our public endpoints or authenticate with your custom key header:</p>
                  <pre className="p-2 bg-slate-950 text-emerald-400 font-mono rounded-lg overflow-x-auto text-[11px]">
                    curl https://www.timenumbers.com/api/v1/time
                  </pre>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="p-3 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 rounded-xl border border-amber-200 dark:border-amber-800 text-[11px]">
                    <strong>Staging Architecture Ready:</strong> Live billing webhooks (Stripe / Razorpay) require production credentials. In sandbox mode, test with your assigned staging key:
                  </div>
                  <pre className="p-2.5 bg-slate-950 text-emerald-400 font-mono rounded-lg overflow-x-auto text-[11px]">
                    x-api-key: {checkoutModalPlan.id === 'business' ? 'tn_sandbox_biz' : 'tn_sandbox_dev'}
                  </pre>
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setCheckoutModalPlan(null)}
                className="flex-1 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                Close
              </button>
              <button
                onClick={() => {
                  if (checkoutModalPlan.id === 'developer') setApiKeyMode('developer');
                  if (checkoutModalPlan.id === 'business') setApiKeyMode('business');
                  if (checkoutModalPlan.id === 'free') setApiKeyMode('free');
                  setCheckoutModalPlan(null);
                }}
                className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow-sm"
              >
                Apply In Playground
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
