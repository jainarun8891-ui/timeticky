"use client";

import React, { useState } from 'react';
import { CITIES } from '@/lib/geo/cities';
import {
  Copy,
  Check,
  Code,
  Sparkles,
  Share2
} from 'lucide-react';

interface Props {
  h1Title?: string;
  description?: string;
}

export function WidgetsClient({ h1Title, description }: Props) {
  const [widgetType, setWidgetType] = useState<'clock' | 'countdown'>('clock');
  const [slug, setSlug] = useState('london-united-kingdom');
  const [theme, setTheme] = useState<'light' | 'navy' | 'dark'>('light');
  const [format, setFormat] = useState<'12' | '24'>('12');
  const [showSeconds, setShowSeconds] = useState(true);
  const [maxWidth, setMaxWidth] = useState(300);
  const [countdownEvent, setCountdownEvent] = useState('new-year');
  const [copied, setCopied] = useState(false);

  const selectedCity = CITIES.find(c => c.slug === slug) || CITIES[0];

  const clockIframeUrl = `https://www.timenumbers.com/embed/clock?city=${slug}&theme=${theme}&format=${format}&seconds=${showSeconds}`;
  const previewClockUrl = `/embed/clock?city=${slug}&theme=${theme}&format=${format}&seconds=${showSeconds}`;

  const countdownTarget = countdownEvent === 'new-year' ? '2027-01-01T00:00:00Z' : '2026-12-25T00:00:00Z';
  const countdownName = countdownEvent === 'new-year' ? 'New Year 2027' : 'Christmas Day';
  const countdownIframeUrl = `https://www.timenumbers.com/embed/countdown?event=${encodeURIComponent(countdownName)}&target=${countdownTarget}&theme=${theme}`;
  const previewCountdownUrl = `/embed/countdown?event=${encodeURIComponent(countdownName)}&target=${countdownTarget}&theme=${theme}`;

  // Engineered SEO Backlink Snippet
  const clockSnippet = `<!-- Widget Container -->
<div style="max-width: ${maxWidth}px; width: 100%; text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <!-- The Tool -->
  <iframe 
    src="${clockIframeUrl}" 
    width="100%" 
    height="140" 
    style="border: 1px solid #e2e8f0; border-radius: 16px; display: block;" 
    loading="lazy"
    title="${selectedCity.name} Exact Time">
  </iframe>
  <!-- The SEO Backlink -->
  <p style="font-size: 11px; margin-top: 6px; color: #64748b;">
    Powered by <a href="https://www.timenumbers.com/${slug}" target="_blank" rel="noopener" style="color: #2563eb; font-weight: 600; text-decoration: none;">TimeNumbers</a>
  </p>
</div>`;

  const countdownSnippet = `<!-- Widget Container -->
<div style="max-width: ${maxWidth}px; width: 100%; text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <!-- The Tool -->
  <iframe 
    src="${countdownIframeUrl}" 
    width="100%" 
    height="150" 
    style="border: 1px solid #e2e8f0; border-radius: 16px; display: block;" 
    loading="lazy"
    title="${countdownName} Countdown">
  </iframe>
  <!-- The SEO Backlink -->
  <p style="font-size: 11px; margin-top: 6px; color: #64748b;">
    Powered by <a href="https://www.timenumbers.com/countdown" target="_blank" rel="noopener" style="color: #e11d48; font-weight: 600; text-decoration: none;">TimeNumbers Countdown</a>
  </p>
</div>`;

  const activeSnippet = widgetType === 'clock' ? clockSnippet : countdownSnippet;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <header className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
          <Code className="w-3.5 h-3.5" />
          <span>Link-Building Widget Engine</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          {h1Title || "Embeddable Clock & Timer Widgets"}
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400">
          {description || "Embed lightweight, ad-free, atomic-synchronized live clocks and event countdowns on any website or blog."}
        </p>
      </header>

      {/* Type Switcher */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setWidgetType('clock')}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              widgetType === 'clock'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            World Clock Widget
          </button>
          <button
            onClick={() => setWidgetType('countdown')}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              widgetType === 'countdown'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Event Countdown Widget
          </button>
        </div>
      </div>

      {/* Main Builder Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Panel (7 cols) */}
        <section className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Customize Widget Settings</span>
          </h2>

          {widgetType === 'clock' ? (
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Select World City
              </label>
              <select
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-800 dark:text-slate-200 outline-none"
              >
                {CITIES.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}, {c.country} ({c.timezone})
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Countdown Event
              </label>
              <select
                value={countdownEvent}
                onChange={(e) => setCountdownEvent(e.target.value)}
                className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-800 dark:text-slate-200 outline-none"
              >
                <option value="new-year">New Year 2027 (Jan 1, 2027)</option>
                <option value="christmas">Christmas Day (Dec 25, 2026)</option>
              </select>
            </div>
          )}

          {/* Theme Selector */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              Widget Visual Theme
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['light', 'navy', 'dark'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`p-3 rounded-2xl border text-xs font-bold capitalize transition-all cursor-pointer ${
                    theme === t
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {widgetType === 'clock' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Time Format
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setFormat('12')}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      format === '12' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    12H (AM/PM)
                  </button>
                  <button
                    onClick={() => setFormat('24')}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      format === '24' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    24H
                  </button>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Seconds Display
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setShowSeconds(true)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      showSeconds ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    Show
                  </button>
                  <button
                    onClick={() => setShowSeconds(false)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      !showSeconds ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    Hide
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Width Slider */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              <span>Max Width:</span>
              <span className="text-slate-800 dark:text-slate-200 font-mono">{maxWidth}px</span>
            </div>
            <input
              type="range"
              min="240"
              max="480"
              step="10"
              value={maxWidth}
              onChange={(e) => setMaxWidth(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>
        </section>

        {/* Live Preview & Code Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Live Sandbox Preview Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Live Preview
            </span>
            <div className="flex justify-center p-6 bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
              <div style={{ maxWidth: `${maxWidth}px`, width: '100%' }}>
                <iframe
                  src={widgetType === 'clock' ? previewClockUrl : previewCountdownUrl}
                  width="100%"
                  height={widgetType === 'clock' ? '140' : '150'}
                  style={{ border: 'none', display: 'block' }}
                  title="Widget Live Preview"
                />
              </div>
            </div>
          </div>

          {/* Embed Code Snippet Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                HTML Embed Code
              </span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Code'}</span>
              </button>
            </div>
            <pre className="p-4 rounded-2xl bg-slate-950 text-slate-200 font-mono text-[11px] leading-relaxed overflow-x-auto border border-slate-800 max-h-48">
              <code>{activeSnippet}</code>
            </pre>
            <p className="text-[11px] text-slate-500 leading-normal">
              Works seamlessly on WordPress, Squarespace, Ghost, Notion, Shopify, or plain HTML.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
