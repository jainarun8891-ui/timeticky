"use client";

import React, { useState } from 'react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { CITIES } from '@/lib/geo/cities';
import {
  Copy,
  Check,
  Code,
  Globe,
  Eye,
  Timer,
  ShieldCheck,
  Sparkles,
  Plane,
  Briefcase,
  Calendar,
  Share2
} from 'lucide-react';

export default function WidgetBuilderPage() {
  const [widgetType, setWidgetType] = useState<'clock' | 'countdown'>('clock');
  const [slug, setSlug] = useState('london-united-kingdom');
  const [theme, setTheme] = useState<'light' | 'navy' | 'dark'>('light');
  const [format, setFormat] = useState<'12' | '24'>('12');
  const [showSeconds, setShowSeconds] = useState(true);
  const [maxWidth, setMaxWidth] = useState(300);
  const [countdownEvent, setCountdownEvent] = useState('new-year');
  const [copied, setCopied] = useState(false);

  const selectedCity = CITIES.find(c => c.slug === slug) || CITIES[0];

  const clockIframeUrl = `https://globaltime.org/embed/clock?city=${slug}&theme=${theme}&format=${format}&seconds=${showSeconds}`;
  const previewClockUrl = `/embed/clock?city=${slug}&theme=${theme}&format=${format}&seconds=${showSeconds}`;

  const countdownTarget = countdownEvent === 'new-year' ? '2027-01-01T00:00:00Z' : '2026-12-25T00:00:00Z';
  const countdownName = countdownEvent === 'new-year' ? 'New Year 2027' : 'Christmas Day';
  const countdownIframeUrl = `https://globaltime.org/embed/countdown?event=${encodeURIComponent(countdownName)}&target=${countdownTarget}&theme=${theme}`;
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
    Powered by <a href="https://globaltime.org/time/${slug}" target="_blank" rel="noopener" style="color: #2563eb; font-weight: 600; text-decoration: none;">GlobalTime</a>
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
    Powered by <a href="https://globaltime.org/countdown" target="_blank" rel="noopener" style="color: #e11d48; font-weight: 600; text-decoration: none;">GlobalTime Countdown</a>
  </p>
</div>`;

  const activeSnippet = widgetType === 'clock' ? clockSnippet : countdownSnippet;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      question: "Are GlobalTime widgets completely free to use?",
      answer: "Yes! All GlobalTime widgets are 100% free, ad-free, and require zero user registration or API keys. Simply copy the HTML embed snippet and paste it into your website."
    },
    {
      question: "Will the widget slow down my website?",
      answer: "No. The widget payload is isolated within a sandboxed, lazy-loading iframe. It executes with pure vanilla JavaScript, has zero framework overhead, and initial payload size is under 8 KB."
    },
    {
      question: "Can I customize the widget dimensions to fit my sidebar?",
      answer: "Yes! The iframe uses a responsive width: 100% wrapper with an adjustable max-width container, meaning it scales automatically to fit any WordPress sidebar, Squarespace block, Notion document, or custom layout."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <Breadcrumbs items={[{ name: 'Widgets', url: '/widgets' }]} />

        {/* Header */}
        <header className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Code className="w-3.5 h-3.5" />
            <span>Link-Building Widget Engine</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Embeddable Clock &amp; Timer Widgets
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400">
            Embed lightweight, ad-free, atomic-synchronized live clocks and event countdowns on any website or blog.
          </p>
        </header>

        {/* Type Switcher */}
        <div className="flex justify-center">
          <div className="inline-flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setWidgetType('clock')}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                widgetType === 'clock'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              World Clock Widget
            </button>
            <button
              onClick={() => setWidgetType('countdown')}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
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
                Color Theme
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'light', label: 'Daylight (Light)' },
                  { id: 'navy', label: 'Evening (Navy)' },
                  { id: 'dark', label: 'Midnight (Dark)' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTheme(t.id as any)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      theme === t.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Clock-Specific Options */}
            {widgetType === 'clock' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Time Format
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setFormat('12')}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                        format === '12'
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-600'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600'
                      }`}
                    >
                      12-Hour
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormat('24')}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                        format === '24'
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-600'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600'
                      }`}
                    >
                      24-Hour
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Seconds Display
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowSeconds(!showSeconds)}
                    className={`w-full py-2 rounded-xl text-xs font-bold border transition-all ${
                      showSeconds
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600'
                    }`}
                  >
                    {showSeconds ? 'Seconds: Visible' : 'Seconds: Hidden'}
                  </button>
                </div>
              </div>
            )}

            {/* Width Selector */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Container Max Width
                </label>
                <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
                  {maxWidth}px
                </span>
              </div>
              <div className="flex gap-2">
                {[260, 300, 340].map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setMaxWidth(w)}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      maxWidth === w
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-600'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600'
                    }`}
                  >
                    {w}px {w === 260 ? '(Sidebar)' : w === 300 ? '(Standard)' : '(Wide)'}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Preview & Code Panel (5 cols) */}
          <section className="lg:col-span-5 space-y-6">
            {/* Live Interactive Preview */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-blue-600" />
                <span>Live Rendering Preview</span>
              </span>

              <div className="p-6 bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center">
                <div style={{ maxWidth: `${maxWidth}px`, width: '100%' }}>
                  <iframe
                    src={widgetType === 'clock' ? previewClockUrl : previewCountdownUrl}
                    width="100%"
                    height={widgetType === 'clock' ? 140 : 150}
                    className="rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm"
                    title="Live Widget Preview"
                  />
                  <p className="text-[11px] text-center mt-1.5 text-slate-500 font-medium">
                    Powered by <span className="text-blue-600 font-bold">GlobalTime</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Generated Embed Code Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Copy HTML Embed Code
                </span>
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs inline-flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Snippet'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-2xl bg-slate-950 text-emerald-400 font-mono text-[11px] overflow-x-auto leading-relaxed border border-slate-800 select-all max-h-48">
                {activeSnippet}
              </pre>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Paste directly into WordPress, Webflow, Squarespace, Ghost, or static HTML. Includes follow backlink engine.
              </p>
            </div>
          </section>
        </div>

        {/* Distribution & Pitching Blueprint */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Share2 className="w-5 h-5 text-blue-600" />
            <span>Widget Distribution &amp; Outreach Opportunities</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Plane className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Travel Bloggers &amp; Guides</h3>
              <p className="text-slate-500 leading-relaxed">
                Pitch local city widgets to travel writers (e.g. <em>&quot;Embed the exact Tokyo time in your Japan itinerary guide&quot;</em>).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Briefcase className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Remote Work &amp; Agencies</h3>
              <p className="text-slate-500 leading-relaxed">
                Consultants and international teams embed client headquarter clocks directly into Notion portals, intranets, and team wikis.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Event &amp; Webinar Hosts</h3>
              <p className="text-slate-500 leading-relaxed">
                Virtual summits, e-sports organizers, and product launches embed the holiday and countdown timer directly on registration landing pages.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
          <FaqAccordion items={faqs} title="Frequently Asked Questions: Embeddable Widgets" />
        </section>

        <RelatedLinksHub />
      </div>
    </div>
  );
}
