"use client";

import React, { useState, useMemo } from 'react';
import { Code2, Clock, Check, Copy, AlertCircle, RefreshCw, Globe } from 'lucide-react';

export function Iso8601Client() {
  const [inputStr, setInputStr] = useState('2026-09-14T13:45:00+05:30');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const parsed = useMemo(() => {
    try {
      const trimmed = inputStr.trim();
      const date = new Date(trimmed);

      if (isNaN(date.getTime())) {
        return { valid: false, error: 'Invalid ISO 8601 date string. Please enter a valid format.' };
      }

      const utcStr = date.toISOString();
      const unixSec = Math.floor(date.getTime() / 1000);
      const unixMs = date.getTime();

      const localStr = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'full',
        timeStyle: 'long',
      }).format(date);

      // Extract offset from input if present
      let extractedOffset = 'Z (UTC)';
      const offsetMatch = trimmed.match(/([+-]\d{2}:?\d{2}|Z)$/i);
      if (offsetMatch) {
        extractedOffset = offsetMatch[0].toUpperCase();
      }

      return {
        valid: true,
        date,
        utcStr,
        localStr,
        unixSec,
        unixMs,
        extractedOffset,
        year: date.getUTCFullYear(),
        month: date.getUTCMonth() + 1,
        day: date.getUTCDate(),
        hours: date.getUTCHours(),
        minutes: date.getUTCMinutes(),
        seconds: date.getUTCSeconds(),
        milliseconds: date.getUTCMilliseconds(),
      };
    } catch {
      return { valid: false, error: 'Malformed timestamp.' };
    }
  }, [inputStr]);

  const copyVal = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const setNow = () => {
    setInputStr(new Date().toISOString());
  };

  return (
    <div className="space-y-8">
      {/* Input Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Enter ISO 8601 String
          </label>
          <button
            onClick={setNow}
            className="px-3 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 hover:bg-blue-100 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Use Current Timestamp
          </button>
        </div>

        <input
          type="text"
          value={inputStr}
          onChange={(e) => setInputStr(e.target.value)}
          placeholder="e.g. 2026-09-14T13:45:00+05:30"
          className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-base font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Preset Sample Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-slate-400 font-medium">Try Samples:</span>
          {[
            '2026-09-14T13:45:00+05:30',
            '2026-12-31T23:59:59Z',
            '2026-07-04T12:00:00-04:00',
            '2026-01-01T00:00:00.000Z',
          ].map((sample) => (
            <button
              key={sample}
              onClick={() => setInputStr(sample)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 font-mono text-[11px]"
            >
              {sample}
            </button>
          ))}
        </div>
      </div>

      {/* Parse Results */}
      {parsed.valid ? (
        <div className="space-y-6">
          {/* Primary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
                <span>Local Time Representation</span>
                <button
                  onClick={() => copyVal(parsed.localStr || '', 'local')}
                  className="p-1 hover:text-blue-600"
                >
                  {copiedKey === 'local' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <strong className="text-lg font-bold text-slate-900 dark:text-white block">
                {parsed.localStr}
              </strong>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
                <span>Canonical UTC (Z) Format</span>
                <button
                  onClick={() => copyVal(parsed.utcStr || '', 'utc')}
                  className="p-1 hover:text-blue-600"
                >
                  {copiedKey === 'utc' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <strong className="text-lg font-mono font-bold text-slate-900 dark:text-white block">
                {parsed.utcStr}
              </strong>
            </div>
          </div>

          {/* Granular Components Table */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Deconstructed ISO 8601 Components
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <span className="text-slate-400 block font-medium">Unix Seconds</span>
                <strong className="text-slate-900 dark:text-white font-mono text-sm block mt-0.5">{parsed.unixSec}</strong>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <span className="text-slate-400 block font-medium">Unix Milliseconds</span>
                <strong className="text-slate-900 dark:text-white font-mono text-sm block mt-0.5">{parsed.unixMs}</strong>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <span className="text-slate-400 block font-medium">Extracted Offset</span>
                <strong className="text-slate-900 dark:text-white font-mono text-sm block mt-0.5">{parsed.extractedOffset}</strong>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <span className="text-slate-400 block font-medium">UTC Date Component</span>
                <strong className="text-slate-900 dark:text-white font-mono text-sm block mt-0.5">
                  {parsed.year}-{String(parsed.month).padStart(2, '0')}-{String(parsed.day).padStart(2, '0')}
                </strong>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-400 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{parsed.error}</span>
        </div>
      )}
    </div>
  );
}
