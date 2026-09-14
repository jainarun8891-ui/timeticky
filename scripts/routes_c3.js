const fs = require('fs');
const path = require('path');

function write(p, c) {
  const fp = path.join('src', p);
  fs.mkdirSync(path.dirname(fp), { recursive: true });
  fs.writeFileSync(fp, c.trim() + '\n', 'utf8');
  console.log('Wrote:', p);
}

// 12. widgets & embed
write('app/widgets/page.tsx', `
"use client";
import React, { useState } from 'react';
import { CITIES } from '@/lib/geo/cities';
import { Copy, Check } from 'lucide-react';

export default function WidgetBuilderPage() {
  const [slug, setSlug] = useState('paris-france');
  const [theme, setTheme] = useState('light');
  const [copied, setCopied] = useState(false);

  const snippet = \`<iframe src="https://globaltime.org/embed/clock?city=\${slug}&theme=\${theme}" width="320" height="130" frameborder="0" style="border-radius: 16px; overflow: hidden;" title="GlobalTime Widget"></iframe>\`;

  const copy = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Embeddable Clock Widget</h1>
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1">City</label>
            <select value={slug} onChange={e => setSlug(e.target.value)} className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs font-bold">
              {CITIES.map(c => <option key={c.id} value={c.slug}>{c.name}, {c.country}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1">Theme</label>
            <select value={theme} onChange={e => setTheme(e.target.value)} className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs font-bold">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>
        <div className="pt-4">
          <span className="text-xs font-bold text-slate-400 block mb-2">Live Preview</span>
          <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl flex justify-center">
            <iframe src={\`/embed/clock?city=\${slug}&theme=\${theme}\`} width="320" height="130" className="rounded-2xl border-0" title="Preview" />
          </div>
        </div>
        <div className="pt-2">
          <pre className="p-3 bg-slate-950 text-slate-200 text-xs rounded-xl overflow-x-auto font-mono">{snippet}</pre>
          <button onClick={copy} className="mt-3 px-4 py-2 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center gap-1.5">
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}<span>{copied ? 'Copied' : 'Copy Embed Code'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
`);

write('app/embed/clock/page.tsx', `
"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getCityBySlug, CITIES } from '@/lib/geo/cities';
import { formatTimeInZone, formatDateInZone, getUtcOffsetString } from '@/lib/time/timezones';
import { getSyncedDate } from '@/lib/time/sync';

export default function EmbedClock() {
  const params = useSearchParams();
  const slug = params.get('city') || 'paris-france';
  const theme = params.get('theme') || 'light';
  const city = getCityBySlug(slug) || CITIES[0];
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(getSyncedDate()), 1000);
    return () => clearInterval(t);
  }, []);

  const isDark = theme === 'dark';
  const time = formatTimeInZone(now, city.timezone, false, true);
  const date = formatDateInZone(now, city.timezone);
  const offset = getUtcOffsetString(now, city.timezone);

  return (
    <div className={\`w-full h-full p-4 flex flex-col justify-between font-sans select-none \${isDark ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}\`}>
      <div className="flex justify-between items-center text-xs font-bold">
        <span>{city.name}, {city.country}</span>
        <span className="text-[10px] text-blue-500">{offset}</span>
      </div>
      <div className="text-3xl font-black font-mono tracking-tight my-1">{time}</div>
      <div className="flex justify-between text-[10px] text-slate-400">
        <span>{date}</span><span>GlobalTime</span>
      </div>
    </div>
  );
}
`);

// 13. content pages
write('app/about/page.tsx', `
import React from 'react';
import { siteConfig } from '@/lib/config/site.config';
export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-4">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">About {siteConfig.name}</h1>
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        {siteConfig.name} provides clean, lightweight, and modern global time calculations. Designed with privacy, speed, and precision in mind.
      </p>
    </div>
  );
}
`);

write('app/faq/page.tsx', `
import React from 'react';
export default function FaqPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h1>
      <div className="space-y-4 text-xs sm:text-sm">
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <h2 className="font-bold text-slate-900 dark:text-white">How does synchronization work?</h2>
          <p className="text-slate-500 mt-1">Our platform measures round-trip latency to server timestamps and computes client clock offsets dynamically.</p>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <h2 className="font-bold text-slate-900 dark:text-white">Is GPS required?</h2>
          <p className="text-slate-500 mt-1">No. All initial timezone detection relies purely on standard browser APIs without intrusive location requests.</p>
        </div>
      </div>
    </div>
  );
}
`);

write('app/data-sources/page.tsx', `
import React from 'react';
export default function DataSourcesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-4">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Data Sources & Provenance</h1>
      <ul className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 space-y-2 list-disc pl-5">
        <li><strong>IANA Time Zone Database (tzdata):</strong> Authoritative international timezone rules.</li>
        <li><strong>Astronomical Solar Formulas:</strong> Mathematical models for solar noon, sunrise, and sunset.</li>
        <li><strong>GeoNames:</strong> Geographic coordinates and administrative regions.</li>
      </ul>
    </div>
  );
}
`);

write('app/privacy/page.tsx', `
import React from 'react';
export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-4">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Privacy Policy</h1>
      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
        We value privacy. We do not track individuals, do not require user accounts, and persist preferences purely in local browser storage.
      </p>
    </div>
  );
}
`);

write('app/terms/page.tsx', `
import React from 'react';
export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-4">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Terms of Use</h1>
      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
        GlobalTime is provided as a free utility. Calculated times and astronomical calculations are delivered in good faith.
      </p>
    </div>
  );
}
`);

// 14. robots & sitemap
write('app/robots.txt/route.ts', `
import { NextResponse } from 'next/server';
export async function GET() {
  const robots = ['User-agent: *', 'Allow: /', 'Disallow: /api/', 'Disallow: /embed/', '', 'Sitemap: https://globaltime.org/sitemap.xml'].join('\\n');
  return new NextResponse(robots, { headers: { 'Content-Type': 'text/plain' } });
}
`);

write('app/sitemap.xml/route.ts', `
import { NextResponse } from 'next/server';
import { getAllCities } from '@/lib/geo/cities';
import { getAllCountries } from '@/lib/geo/countries';
import { TIMEZONES } from '@/lib/time/timezones';

export async function GET() {
  const staticUrls = ['', '/time-zones', '/compare', '/time-difference', '/time-zone-converter', '/meeting-planner', '/daylight-saving-time', '/calendar', '/compact-calendar', '/week-number', '/holidays', '/clock', '/clock-accuracy', '/stopwatch', '/timer', '/countdown', '/unix-time', '/unix-time-converter', '/utc', '/widgets', '/about', '/faq', '/data-sources', '/privacy', '/terms'];
  const cityUrls = getAllCities().map(c => \`/time/\${c.slug}\`);
  const countryUrls = getAllCountries().map(c => \`/country/\${c.slug}\`);
  const tzUrls = TIMEZONES.map(t => \`/time-zone/\${t.shortName.toLowerCase()}\`);
  const all = [...staticUrls, ...cityUrls, ...countryUrls, ...tzUrls];

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...all.map(u => \`  <url><loc>https://globaltime.org\${u}</loc><changefreq>daily</changefreq></url>\`),
    '</urlset>'
  ].join('\\n');

  return new NextResponse(xml, { headers: { 'Content-Type': 'application/xml' } });
}
`);

console.log('Routes C3 written');
