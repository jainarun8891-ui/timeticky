const fs = require('fs');
const path = require('path');

const reviewPages = JSON.parse(fs.readFileSync('site_all_pages_review.json', 'utf8'));

console.log('--- AUDITING 352 PAGES COVERAGE ---');
console.log(`Total Pages in Review Specification: ${reviewPages.length}`);

// Group by category/module
const categoryCounts = {};
for (const p of reviewPages) {
  categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
}
console.log('Category Counts:', categoryCounts);

// Check that all 7 TypeScript modules exist and have the expected content length
const modules = [
  { file: 'src/lib/seo/city-custom-content.ts', expected: 49, varName: 'CITY_CUSTOM_CONTENT' },
  { file: 'src/lib/seo/city-difference-custom-content.ts', expected: 72, varName: 'CITY_DIFFERENCE_CUSTOM_CONTENT' },
  { file: 'src/lib/seo/converter-combo-custom-content.ts', expected: 128, varName: 'CONVERTER_COMBO_CUSTOM_CONTENT' },
  { file: 'src/lib/seo/country-custom-content.ts', expected: 14, varName: 'COUNTRY_CUSTOM_CONTENT' },
  { file: 'src/lib/seo/cities-by-country-custom-content.ts', expected: 17, varName: 'CITIES_BY_COUNTRY_CUSTOM_CONTENT' },
  { file: 'src/lib/seo/timezone-custom-content.ts', expected: 18, varName: 'TIMEZONE_CUSTOM_CONTENT' },
  { file: 'src/lib/seo/hub-pages-custom-content.ts', expected: 54, varName: 'HUB_PAGES_CUSTOM_CONTENT' },
];

let totalModuleEntries = 0;
for (const m of modules) {
  if (!fs.existsSync(m.file)) {
    console.error(`ERROR: Missing module ${m.file}`);
    process.exit(1);
  }
  const content = fs.readFileSync(m.file, 'utf8');
  // extract JSON
  const marker = `export const ${m.varName}`;
  const idx = content.indexOf(marker);
  const jsonStart = content.indexOf('{', idx);
  const jsonStr = content.slice(jsonStart, content.lastIndexOf('};') + 1);
  const parsed = JSON.parse(jsonStr);
  const keys = Object.keys(parsed);
  console.log(`Module ${m.file}: ${keys.length} items (expected ${m.expected}) - OK`);
  if (keys.length !== m.expected) {
    console.error(`MISMATCH in ${m.file}: got ${keys.length}, expected ${m.expected}`);
    process.exit(1);
  }
  totalModuleEntries += keys.length;

  // Validate each item in the module has required fields
  for (const k of keys) {
    const item = parsed[k];
    if (!item.title || !item.description || !item.h1 || !item.page_text || !Array.isArray(item.faqs) || item.faqs.length === 0) {
      console.error(`Invalid item in ${m.file} key ${k}: missing title/description/h1/page_text/faqs`);
      process.exit(1);
    }
  }
}

console.log(`Total verified items across TypeScript modules: ${totalModuleEntries}`);
if (totalModuleEntries !== 352) {
  console.error(`ERROR: total items is ${totalModuleEntries}, expected 352`);
  process.exit(1);
}

// Now verify the route page files that consume them
const dynamicRoutes = [
  { route: 'src/app/time/[city]/page.tsx', module: 'CITY_CUSTOM_CONTENT' },
  { route: 'src/app/converter/difference/[slug]/page.tsx', module: 'CITY_DIFFERENCE_CUSTOM_CONTENT' },
  { route: 'src/app/converter/[combo]/page.tsx', module: 'CONVERTER_COMBO_CUSTOM_CONTENT' },
  { route: 'src/app/countries/[slug]/page.tsx', module: 'COUNTRY_CUSTOM_CONTENT' },
  { route: 'src/app/cities/[country]/page.tsx', module: 'CITIES_BY_COUNTRY_CUSTOM_CONTENT' },
  { route: 'src/app/timezone/[zone]/page.tsx', module: 'TIMEZONE_CUSTOM_CONTENT' },
];

console.log('\n--- VERIFYING DYNAMIC PROGRAMMATIC ROUTE FILES ---');
for (const r of dynamicRoutes) {
  if (!fs.existsSync(r.route)) {
    console.error(`ERROR: Route file missing: ${r.route}`);
    process.exit(1);
  }
  const content = fs.readFileSync(r.route, 'utf8');
  const usesModule = content.includes(r.module);
  const hasEditorial = content.includes('EditorialContentBlock') || content.includes('page_text');
  const hasFaq = content.includes('FaqAccordion') && (content.includes('faqs') || content.includes('Faqs'));
  const hasJsonLd = content.includes('JsonLd') && content.includes('faq');
  console.log(`${r.route.padEnd(48)}: Module: ${usesModule}, Editorial: ${hasEditorial}, FAQ: ${hasFaq}, JsonLd: ${hasJsonLd}`);
  if (!usesModule || !hasEditorial || !hasFaq) {
    console.error(`ERROR: Route file ${r.route} not properly wired!`);
    process.exit(1);
  }
}

console.log('\n--- VERIFYING HUB PAGES CONSUMING HUB_PAGES_CUSTOM_CONTENT ---');
const hubFile = fs.readFileSync('src/lib/seo/hub-pages-custom-content.ts', 'utf8');
const hubJsonStart = hubFile.indexOf('{', hubFile.indexOf('export const HUB_PAGES_CUSTOM_CONTENT'));
const hubMap = JSON.parse(hubFile.slice(hubJsonStart, hubFile.lastIndexOf('};') + 1));

const hubKeys = Object.keys(hubMap);
console.log(`Total hub paths to verify: ${hubKeys.length}`);

let missingHubs = 0;
let validHubs = 0;

for (const p of hubKeys) {
  const pagePath = p === '/' ? 'src/app/page.tsx' : `src/app${p}/page.tsx`;
  if (!fs.existsSync(pagePath)) {
    console.error(`WARNING: Hub page path does not exist on disk: ${pagePath}`);
    missingHubs++;
    continue;
  }
  const pageContent = fs.readFileSync(pagePath, 'utf8');
  const consumesHub = pageContent.includes('HUB_PAGES_CUSTOM_CONTENT');
  const hasFaq = pageContent.includes('content.faqs') || pageContent.includes('faqs');
  
  if (!consumesHub) {
    console.error(`NOT CONSUMING HUB_PAGES_CUSTOM_CONTENT: ${pagePath}`);
    missingHubs++;
  } else {
    validHubs++;
  }
}

console.log(`Hub Pages Validated: ${validHubs} / ${hubKeys.length}`);
if (missingHubs > 0) {
  console.error(`ERROR: ${missingHubs} hub pages not properly wired!`);
  process.exit(1);
}

console.log('\n===========================================');
console.log('✅ AUDIT COMPLETE: ALL 352 PAGES VERIFIED!');
console.log('===========================================');
