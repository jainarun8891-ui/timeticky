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
  const [theme, setTheme] = useState<'light' | 'navy' | 'dark' | 'glass' | 'neon' | 'minimal' | 'gold'>('light');
  const [format, setFormat] = useState<'12' | '24'>('12');
  const [showSeconds, setShowSeconds] = useState(true);
  const [includeBranding, setIncludeBranding] = useState(true);
  const [maxWidth, setMaxWidth] = useState(300);
  const [countdownEvent, setCountdownEvent] = useState('new-year');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'wordpress' | 'webflow' | 'notion'>('preview');

  const selectedCity = CITIES.find(c => c.slug === slug) || CITIES[0];

  const brandingParam = includeBranding ? '' : '&branding=false';
  const clockIframeUrl = `https://www.timenumbers.com/embed/clock?city=${slug}&theme=${theme}&format=${format}&seconds=${showSeconds}${brandingParam}`;
  const previewClockUrl = `/embed/clock?city=${slug}&theme=${theme}&format=${format}&seconds=${showSeconds}${brandingParam}`;

  const countdownTarget = countdownEvent === 'new-year' ? '2027-01-01T00:00:00Z' : '2026-12-25T00:00:00Z';
  const countdownName = countdownEvent === 'new-year' ? 'New Year 2027' : 'Christmas Day';
  const countdownIframeUrl = `https://www.timenumbers.com/embed/countdown?event=${encodeURIComponent(countdownName)}&target=${countdownTarget}&theme=${theme}`;
  const previewCountdownUrl = `/embed/countdown?event=${encodeURIComponent(countdownName)}&target=${countdownTarget}&theme=${theme}`;

  // Clean, Google-compliant embed snippet (Zero link scheme spam)
  const clockSnippet = `<!-- TimeNumbers Live Clock Widget -->
<div style="max-width: ${maxWidth}px; width: 100%; text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <iframe 
    src="${clockIframeUrl}" 
    width="100%" 
    height="140" 
    style="border: 1px solid #e2e8f0; border-radius: 16px; display: block;" 
    loading="lazy"
    title="${selectedCity.name} Exact Time">
  </iframe>
</div>`;

  const countdownSnippet = `<!-- TimeNumbers Event Countdown Widget -->
<div style="max-width: ${maxWidth}px; width: 100%; text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <iframe 
    src="${countdownIframeUrl}" 
    width="100%" 
    height="150" 
    style="border: 1px solid #e2e8f0; border-radius: 16px; display: block;" 
    loading="lazy"
    title="${countdownName} Countdown">
  </iframe>
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
          <span>Responsive Embed Generator</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          {h1Title || "Embeddable Clock & Timer Widgets"}
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400">
          {description || "Embed lightweight, atomic-synchronized live clocks and event countdowns on any website, blog, or internal portal."}
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
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Visual Theme Preset
              </label>
              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold">Free &amp; Pro Presets</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'light', label: 'Light Clean', pro: false },
                { id: 'dark', label: 'Dark Slate', pro: false },
                { id: 'navy', label: 'Deep Navy', pro: false },
                { id: 'glass', label: 'Frosted Glass', pro: true },
                { id: 'neon', label: 'Neon Cyber', pro: true },
                { id: 'gold', label: 'Executive Gold', pro: true },
                { id: 'minimal', label: 'Monochrome', pro: true },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id as any)}
                  className={`p-2.5 rounded-2xl border text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-1 ${
                    theme === t.id
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 shadow-xs'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                  }`}
                >
                  <span>{t.label}</span>
                  {t.pro && (
                    <span className="px-1.5 py-0.2 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[9px] font-bold uppercase">
                      Pro
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {widgetType === 'clock' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    Show Sec
                  </button>
                  <button
                    onClick={() => setShowSeconds(false)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      !showSeconds ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    Hide Sec
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* White-Label Branding Toggle */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/70 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white">White-Label Branding</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">PRO</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Remove the TimeNumbers link and logo for seamless client dashboard embeds.
              </p>
            </div>
            <button
              onClick={() => setIncludeBranding(!includeBranding)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                !includeBranding
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              {!includeBranding ? 'Hidden (Pro)' : 'Visible (Free)'}
            </button>
          </div>

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
              Zero dependencies. Simply paste into any website, CMS, or dashboard.
            </p>
          </div>

          {/* TimeNumbers Pro Plan Card */}
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 rounded-3xl p-6 text-white border border-indigo-500/30 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30">
                PRO PLAN
              </span>
              <div className="text-right">
                <span className="text-lg font-black text-white">₹499</span>
                <span className="text-xs text-slate-400"> / month</span>
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-white">TimeNumbers Pro Widgets</h3>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                Elevate your team dashboard or client websites with white-label, multi-city clock embeds.
              </p>
            </div>

            <ul className="text-xs space-y-1.5 text-slate-200 pt-1 border-t border-white/10">
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span> 100% White-Label (no branding link)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span> All Pro themes (Glass, Neon, Gold, Minimal)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span> Multi-city clocks (side-by-side display)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span> High-frequency NTP sync &amp; priority SLA
              </li>
            </ul>

            <button
              onClick={() => alert("TimeNumbers Pro Subscriptions are currently in Early Access staging. Contact billing@timenumbers.com to activate your team's license.")}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer text-center"
            >
              Get Pro Access — ₹499/mo
            </button>
          </div>
        </div>
      </div>

      {/* Verified CMS & Platform Distribution Guides */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Platform Setup Guides
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            How to Embed TimeNumbers Widgets on Any Platform
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Step-by-step instructions tested across popular website builders and content systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 space-y-2.5">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-[11px] flex items-center justify-center font-mono">1</span>
              WordPress (Gutenberg / Elementor)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              In WordPress, add a <strong>Custom HTML</strong> block anywhere on your page or sidebar. Paste the snippet copied above. Save or update your page to render the live clock.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 space-y-2.5">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-[11px] flex items-center justify-center font-mono">2</span>
              Webflow (Embed Component)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Drag an <strong>Embed</strong> component from the Add Elements panel into your Webflow layout. Paste the iframe code into the HTML editor and publish your site.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 space-y-2.5">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-[11px] flex items-center justify-center font-mono">3</span>
              Notion, Coda &amp; Company Wikis
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Type <code className="bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded text-[11px]">/embed</code> in Notion or Coda, and paste the direct preview URL (<code className="text-blue-500 text-[11px]">{previewClockUrl}</code>) for an instant desktop clock.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
