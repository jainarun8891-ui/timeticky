const fs = require('fs');
const path = require('path');

// Read sitemap route.ts content to see all arrays
const sitemapContent = fs.readFileSync('./src/app/sitemap.xml/route.ts', 'utf8');

// Extract staticUrls
const staticMatch = sitemapContent.match(/const staticUrls = \[([\s\S]*?)\];/);
const staticUrls = staticMatch[1]
  .split('\n')
  .map(l => l.trim().replace(/^['"`]|['"`,]$/g, ''))
  .filter(l => l && !l.startsWith('//'));

console.log('Static URLs count:', staticUrls.length);

// Extract timeDifferenceUrls
const diffMatch = sitemapContent.match(/const timeDifferenceUrls = \[([\s\S]*?)\];/);
const timeDifferenceUrls = diffMatch ? diffMatch[1]
  .split('\n')
  .map(l => l.trim().replace(/^['"`]|['"`,]$/g, ''))
  .filter(l => l && !l.startsWith('//')) : [];
console.log('Time difference URLs count:', timeDifferenceUrls.length);

// Extract offsetUrls
const offsetMatch = sitemapContent.match(/const offsetUrls = \[([\s\S]*?)\];/);
const offsetUrls = offsetMatch ? offsetMatch[1]
  .split('\n')
  .map(l => l.trim().replace(/^['"`]|['"`,]$/g, ''))
  .filter(l => l && !l.startsWith('//')) : [];
console.log('Offset URLs count:', offsetUrls.length);

// Extract popularIanaUrls
const ianaMatch = sitemapContent.match(/const popularIanaUrls = \[([\s\S]*?)\];/);
const popularIanaUrls = ianaMatch ? ianaMatch[1]
  .split('\n')
  .map(l => l.trim().replace(/^['"`]|['"`,]$/g, ''))
  .filter(l => l && !l.startsWith('//')) : [];
console.log('Popular IANA URLs count:', popularIanaUrls.length);

// Timezones in timezones.ts
const tzContent = fs.readFileSync('./src/lib/time/timezones.ts', 'utf8');
const tzShortMatches = [...tzContent.matchAll(/shortName:\s*['"]([^'"]+)['"]/g)].map(m => `/time-zone/${m[1].toLowerCase()}`);
console.log('Timezone short URLs count:', tzShortMatches.length);

// City URLs and cityTimeUrls
const citiesContent = fs.readFileSync('./src/lib/geo/cities.ts', 'utf8');
const cityNames = [...citiesContent.matchAll(/name:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
const citySlugs = [...citiesContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
console.log('City URLs count:', cityNames.length);

// Countries
const countriesContent = fs.readFileSync('./src/lib/geo/countries.ts', 'utf8');
const countrySlugs = [...countriesContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
console.log('Country URLs count:', countrySlugs.length);

// Converter Combos
const lookupContent = fs.readFileSync('./src/lib/time/timezone-lookup.ts', 'utf8');
const comboMatches = lookupContent.match(/const POPULAR_CONVERTER_COMBOS = \[([\s\S]*?)\];/);
let combosCount = 0;
if (comboMatches) {
  combosCount = comboMatches[1].split(',').filter(s => s.trim().length > 3).length;
}
console.log('Combos count:', combosCount);
