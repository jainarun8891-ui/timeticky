import { NextResponse } from 'next/server';
import { POPULAR_CITIES } from '@/lib/geo/cities';
import { getAllCountries } from '@/lib/geo/countries';
import { BLOG_ARTICLES } from '@/lib/blog/articles';
import { TIMEZONES } from '@/lib/time/timezones';
import { COMMON_TIMEZONE_ABBREVIATIONS, getAllConverterCombos } from '@/lib/time/timezone-lookup';

export async function GET() {
  const baseUrl = 'https://www.timenumbers.com';

  const staticUrls = [
    '',
    '/world-map',
    '/clock',
    '/atomic-clock',
    '/daylight-saving-time/non-observing-countries',
    '/daylight-saving-time/europe',
    '/daylight-saving-time/united-states',
    '/united-states-time-now',
    '/daylight-saving-time/arizona',
    '/business-days-calculator',
    '/birthday-calculator',
    '/overlap-calculator',
    '/clock-accuracy',
    '/pomodoro',
    '/golden-hour',

    '/analog-clock',
    '/fullscreen-clock',
    '/world-clock',
    '/world-clock-wall',
    '/time-converter',
    '/time-zone-converter',
    '/compare',
    '/convert',
    '/meeting-planner',
    '/countdown',
    '/countdown/new-year',
    '/countdown/christmas',
    '/countdown/halloween',
    '/countdown/valentines-day',
    '/countdown/diwali',
    '/countdown/holi',
    '/countdown/thanksgiving',
    '/timer',
    '/timer/1-minute',
    '/timer/5-minutes',
    '/timer/10-minutes',
    '/timer/15-minutes',
    '/timer/20-minutes',
    '/timer/30-minutes',
    '/timer/45-minutes',
    '/timer/1-hour',
    '/timer/2-hours',
    '/stopwatch',
    '/alarm',
    '/calendar',
    '/calendar/2026',
    '/calendar/2027',
    '/calendar/2028',
    '/compact-calendar',
    '/week-number',
    '/today',
    '/unix-time',
    '/unix-time-converter',
    '/iso-8601',
    '/date-difference',
    '/date-calculator',
    '/astronomy',
    '/sunrise-sunset',
    '/sunrise-sunset/delhi',
    '/sunrise-sunset/london',
    '/sunrise-sunset/new-york',
    '/sunrise-sunset/tokyo',
    '/sunrise-sunset/paris',
    '/moon',
    '/moon/delhi',
    '/moon/london',
    '/moon/new-york',
    '/moon/tokyo',
    '/daylight-saving-time',
    '/daylight-saving-time/2026',
    '/daylight-saving-time/2027',
    '/timezone-map',
    '/time-zones',
    '/cities',
    '/country',
    '/dialing-codes',
    '/jet-lag-calculator',
    '/widgets',
    '/developers',
    '/api-docs',
    '/faq',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/blog',
    '/data-sources',
    '/holidays',
    '/learn',
    '/time-difference',
    '/utc',
  ];

  // Programmatic Time Zone Conversion Combos
  const conversionCombos = getAllConverterCombos().map(c => `/convert/${c}`);

  // Time differences
  const timeDifferenceUrls = [
    '/time-difference/delhi/new-york',
    '/time-difference/new-york/delhi',
    '/time-difference/london/tokyo',
    '/time-difference/tokyo/london',
    '/time-difference/new-york/london',
    '/time-difference/london/new-york',
    '/time-difference/sydney/new-york',
    '/time-difference/new-york/sydney',
    '/time-difference/sydney/london',
    '/time-difference/london/sydney',
    '/time-difference/paris/tokyo',
    '/time-difference/dubai/singapore',
    '/time-difference/singapore/tokyo',
    '/time-difference/chicago/london',
    '/time-difference/los-angeles/tokyo',
  ];

  // Common timezone routes
  const tzAbbrUrls = Object.keys(COMMON_TIMEZONE_ABBREVIATIONS).map(slug => `/timezone/${slug}`);
  const popularIanaUrls = [
    '/timezone/asia-kolkata',
    '/timezone/america-new-york',
    '/timezone/europe-london',
    '/timezone/europe-paris',
    '/timezone/asia-tokyo',
    '/timezone/asia-dubai',
    '/timezone/asia-singapore',
    '/timezone/australia-sydney',
    '/timezone/america-los-angeles',
    '/timezone/america-chicago',
  ];

  // Timezone short name URLs
  const timeZoneShortUrls = TIMEZONES.map(t => `/time-zone/${t.shortName.toLowerCase()}`);

  // UTC offsets
  const offsetUrls = [
    '/utc-offset/utc-plus-0',
    '/utc-offset/utc-0',
    '/utc-offset/utc-plus-1',
    '/utc-offset/utc-plus-2',
    '/utc-offset/utc-plus-3',
    '/utc-offset/utc-plus-4',
    '/utc-offset/utc-plus-5',
    '/utc-offset/utc-plus-5-30',
    '/utc-offset/utc-plus-5-45',
    '/utc-offset/utc-plus-6',
    '/utc-offset/utc-plus-7',
    '/utc-offset/utc-plus-8',
    '/utc-offset/utc-plus-9',
    '/utc-offset/utc-plus-9-30',
    '/utc-offset/utc-plus-10',
    '/utc-offset/utc-plus-11',
    '/utc-offset/utc-plus-12',
    '/utc-offset/utc-minus-3',
    '/utc-offset/utc-minus-4',
    '/utc-offset/utc-minus-5',
    '/utc-offset/utc-minus-6',
    '/utc-offset/utc-minus-7',
    '/utc-offset/utc-minus-8',
    '/utc-offset/utc-minus-9',
    '/utc-offset/utc-minus-10',
  ];

  // Root Cities & City Time URLs
  const cityUrls = POPULAR_CITIES.map(c => `/${c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`);
  const cityTimeUrls = POPULAR_CITIES.map(c => `/time/${c.slug}`);

  // Countries & Country Cities
  const countries = getAllCountries();
  const countryUrls = countries.map(c => `/country/${c.slug}`);
  const countryCityUrls = countries.map(c => `/cities/${c.slug}`);

  // Blogs / Learn
  const blogUrls = (BLOG_ARTICLES || []).map(b => `/blog/${b.slug}`);

  const allUrls = Array.from(new Set([
    ...staticUrls,
    ...conversionCombos,
    ...timeDifferenceUrls,
    ...tzAbbrUrls,
    ...popularIanaUrls,
    ...timeZoneShortUrls,
    ...offsetUrls,
    ...cityUrls,
    ...cityTimeUrls,
    ...countryUrls,
    ...countryCityUrls,
    ...blogUrls,
  ]));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls
    .map(
      (url) => `
    <url>
      <loc>${baseUrl}${url}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>${url === '' ? 'always' : (url.startsWith('/city') || url.length < 15 ? 'hourly' : 'daily')}</changefreq>
      <priority>${url === '' ? '1.0' : (url.startsWith('/timezone') || url.startsWith('/utc-offset') || !url.includes('/') ? '0.9' : '0.8')}</priority>
    </url>
  `
    )
    .join('')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
