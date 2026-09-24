import { NextResponse } from 'next/server';
import { POPULAR_CITIES } from '@/lib/geo/cities';
import { getCityRootSlug, POPULAR_TIME_DIFFERENCE_PAIRS } from '@/lib/geo/city-lookup';
import { getAllCountries } from '@/lib/geo/countries';
import { BLOG_ARTICLES } from '@/lib/blog/articles';
import { COMMON_TIMEZONE_ABBREVIATIONS, getAllConverterCombos } from '@/lib/time/timezone-lookup';

export async function GET() {
  const baseUrl = 'https://www.timenumbers.com';

  const staticUrls = [
    // 1.0 CLOCKS & LIVE TIMEKEEPING
    '/world-clock',
    '/clock',
    '/analog-clock',
    '/atomic-clock',
    '/fullscreen-clock',
    '/world-clock-wall',
    '/clock-accuracy',
    '/stopwatch',
    '/alarm',
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
    '/pomodoro',

    // 2.0 LOCAL TIME, CONVERTERS & MEETINGS
    '/converter',
    '/converter/difference',
    '/converter/compare',
    '/meeting-planner',
    '/overlap-calculator',
    '/jet-lag-calculator',

    // 3.0 GLOBAL GEOGRAPHY, CITIES & TIMEZONES
    '/cities',
    '/countries',
    '/timezone-map',
    '/time-zones',
    '/utc',
    '/united-states-time-now',
    '/dialing-codes',
    '/world-map',

    // 4.0 ASTRONOMY, SOLAR & DAYLIGHT SAVING
    '/sun',
    '/golden-hour',
    '/moon',
    '/daylight-saving-time',
    '/daylight-saving-time/2026',
    '/daylight-saving-time/2027',
    '/daylight-saving-time/united-states',
    '/daylight-saving-time/europe',
    '/daylight-saving-time/arizona',
    '/daylight-saving-time/non-observing-countries',

    // 5.0 CALENDARS, DATES & EVENT COUNTDOWNS
    '/calendar',
    '/calendar/2026',
    '/calendar/2027',
    '/calendar/2028',
    '/compact-calendar',
    '/today',
    '/week-number',
    '/holidays',
    '/business-days-calculator',
    '/date-difference',
    '/date-calculator',
    '/birthday-calculator',
    '/countdown',
    '/countdown/new-year',
    '/countdown/christmas',
    '/countdown/halloween',
    '/countdown/valentines-day',
    '/countdown/diwali',
    '/countdown/holi',
    '/countdown/thanksgiving',

    // 6.0 STANDARDS, DEVELOPERS & TECHNICAL TIME
    '/unix-time',
    '/unix-time-converter',
    '/iso-8601',
    '/api-docs',
    '/developers',
    '/widgets',

    // 7.0 KNOWLEDGE, ACADEMY & EDITORIAL
    '/learn',
    '/learn/seo-simulator',
    '/blog',

    // 8.0 COMPANY & LEGAL UTILITY
    '/about',
    '/contact',
    '/faq',
    '/data-sources',
    '/privacy',
    '/terms',
  ];

  // Programmatic Time Zone Conversion Combos (/converter/[combo])
  const conversionCombos = getAllConverterCombos().map(c => `/converter/${c}`);

  // High-traffic programmatic city pair differences (/converter/difference/[cityA]-to-[cityB])
  const timeDifferenceUrls = POPULAR_TIME_DIFFERENCE_PAIRS.map(p => `/converter/difference/${p.cityA}-to-${p.cityB}`);

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

  // UTC offsets (/utc-offset/[offset])
  const offsetUrls = [
    '/utc-offset/utc-plus-0',
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

  // Canonical City Local Times (/time/[city])
  const cityUrls = POPULAR_CITIES.map(c => `/time/${getCityRootSlug(c)}`);

  // Canonical Solar & Lunar City Pages (/sun/[city] and /moon/[city])
  const sunCityUrls = POPULAR_CITIES.map(c => `/sun/${getCityRootSlug(c)}`);
  const moonCityUrls = POPULAR_CITIES.map(c => `/moon/${getCityRootSlug(c)}`);

  // Countries & Country Cities (/countries/[slug] and /cities/[country])
  const countries = getAllCountries();
  const countryUrls = countries.map(c => `/countries/${c.slug}`);
  const countryCityUrls = countries.map(c => `/cities/${c.slug}`);

  // Blogs / Learn
  const blogUrls = (BLOG_ARTICLES || []).map(b => `/blog/${b.slug}`);

  const allUrls = Array.from(new Set([
    '', // Root domain
    ...staticUrls,
    ...conversionCombos,
    ...timeDifferenceUrls,
    ...tzAbbrUrls,
    ...popularIanaUrls,
    ...offsetUrls,
    ...cityUrls,
    ...sunCityUrls,
    ...moonCityUrls,
    ...countryUrls,
    ...countryCityUrls,
    ...blogUrls,
  ]));

  const todayDate = new Date().toISOString().split('T')[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls
    .map(
      (url) => `
    <url>
      <loc>${baseUrl}${url}</loc>
      <lastmod>${todayDate}</lastmod>
      <changefreq>${url === '' ? 'always' : (url.startsWith('/time/') || url.length < 15 ? 'hourly' : 'daily')}</changefreq>
      <priority>${url === '' ? '1.0' : (url.startsWith('/time/') || url.startsWith('/converter') ? '0.9' : '0.8')}</priority>
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
