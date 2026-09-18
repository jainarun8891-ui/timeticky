const fs = require('fs');
const path = require('path');

// 1. Get all sitemap URLs
const sitemapContent = fs.readFileSync('./src/app/sitemap.xml/route.ts', 'utf8');

function extractArray(name) {
  const reg = new RegExp(`const ${name} = \\[([\\s\\S]*?)\\];`);
  const match = sitemapContent.match(reg);
  if (!match) return [];
  return match[1]
    .split('\n')
    .map(l => l.trim().replace(/^['"`]|['"`,]$/g, ''))
    .filter(l => l && !l.startsWith('//'));
}

const staticUrls = extractArray('staticUrls');
const timeDifferenceUrls = extractArray('timeDifferenceUrls');
const offsetUrls = extractArray('offsetUrls');
const popularIanaUrls = extractArray('popularIanaUrls');

// Timezones
const tzContent = fs.readFileSync('./src/lib/time/timezones.ts', 'utf8');
const timeZoneShortUrls = [...tzContent.matchAll(/shortName:\s*['"]([^'"]+)['"]/g)].map(m => `/time-zone/${m[1].toLowerCase()}`);

// Cities
const citiesContent = fs.readFileSync('./src/lib/geo/cities.ts', 'utf8');
const cityUrls = [...citiesContent.matchAll(/name:\s*['"]([^'"]+)['"]/g)].map(m => `/${m[1].toLowerCase().replace(/[^a-z0-9]+/g, '-')}`);
const cityTimeUrls = [...citiesContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map(m => `/time/${m[1]}`);

// Countries
const countriesContent = fs.readFileSync('./src/lib/geo/countries.ts', 'utf8');
const countryUrls = [...countriesContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map(m => `/country/${m[1]}`);
const countryCityUrls = [...countriesContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map(m => `/cities/${m[1]}`);

// Blogs
const blogContent = fs.readFileSync('./src/lib/blog/articles.ts', 'utf8');
const blogUrls = [...blogContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map(m => `/blog/${m[1]}`);

// Combos from lookup
const lookupContent = fs.readFileSync('./src/lib/time/timezone-lookup.ts', 'utf8');
const abbrsMatch = lookupContent.match(/CANONICAL_CONVERTER_ABBREVIATIONS = \[([\s\S]*?)\]/);
const abbrs = abbrsMatch ? abbrsMatch[1].split(',').map(s => s.trim().replace(/['"]/g, '')).filter(Boolean) : [];
const combos = [];
for (const from of abbrs) {
  for (const to of abbrs) {
    if (from !== to) combos.push(`/convert/${from}-to-${to}`);
  }
}

// Abbreviations
const abbrObjMatch = lookupContent.match(/export const COMMON_TIMEZONE_ABBREVIATIONS: Record<string, TimezoneAbbrDefinition> = \{([\s\S]*?)\n\};/);
// Or extract keys
const abbrKeys = [...lookupContent.matchAll(/([\w]+):\s*\{\s*primaryName:/g)].map(m => `/timezone/${m[1].toLowerCase()}`);

const allSitemapUrls = new Set([
  ...staticUrls,
  ...combos,
  ...timeDifferenceUrls,
  ...abbrKeys,
  ...popularIanaUrls,
  ...timeZoneShortUrls,
  ...offsetUrls,
  ...cityUrls,
  ...cityTimeUrls,
  ...countryUrls,
  ...countryCityUrls,
  ...blogUrls
]);

console.log(`Total URLs in sitemap: ${allSitemapUrls.size}`);

// 2. Scan all files for links
function getAllFiles(dir, list = []) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      if (!full.includes('node_modules') && !full.includes('.next')) getAllFiles(full, list);
    } else if (/\.(tsx|ts|jsx|js)$/.test(f)) {
      list.push(full);
    }
  }
  return list;
}

const allFiles = getAllFiles('./src');
const linkedUrls = new Set();

for (const file of allFiles) {
  const content = fs.readFileSync(file, 'utf8');
  // Look for hardcoded hrefs
  const matches = [...content.matchAll(/href=["'`]([^"'`$]+)["'`]/g)].map(m => m[1]);
  for (const m of matches) {
    if (m.startsWith('/')) linkedUrls.add(m.trim());
  }
}

console.log(`Total explicitly linked URLs in codebase: ${linkedUrls.size}`);

// 3. Find which sitemap URLs have NO static links in codebase
const unlinked = [];
for (const url of allSitemapUrls) {
  if (!url) continue;
  if (!linkedUrls.has(url)) {
    unlinked.push(url);
  }
}

console.log(`Unlinked (potential orphan) URLs count: ${unlinked.length}`);

// Group by prefix
const groups = {};
for (const u of unlinked) {
  const prefix = u.split('/')[1] || 'root';
  groups[prefix] = (groups[prefix] || 0) + 1;
}
console.log('Grouped unlinked URLs by prefix:', groups);
console.log('Sample unlinked:', unlinked.slice(0, 30));
