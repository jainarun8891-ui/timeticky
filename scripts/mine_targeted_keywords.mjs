import fs from 'fs';
import path from 'path';

const GOOGLE_SUGGEST_SEEDS = [
  // High-CTR Converter seeds
  'time zone converter',
  'schedule meeting across time zones',
  'schedule meeting between',
  'best time to call',
  // Timezone Comparisons (vs)
  'cst vs est',
  'pst vs mst',
  'edt vs est',
  'pdt vs pst',
  'cet vs cest',
  'gmt vs utc',
  'aest vs aedt',
  'mdt vs cdt',
  // Specific Time Conversions
  '11am edt to',
  '12pm est to',
  '9am bst to',
  '10am cdt to',
  '12pm cest to',
  'current time in',
  // Horology & Astronomy Tools
  'what time is sunset',
  'what time is sunrise',
  'where is the moon tonight',
  'atomic clock online',
  'exact time with seconds',
  'time difference between new york and',
  'time difference between london and',
  'time difference between california and',
  'time difference between paris and'
];

async function fetchGoogle(q) {
  try {
    const url = `https://suggestqueries.google.com/complete/search?client=chrome&hl=en&gl=us&q=${encodeURIComponent(q)}`;
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data[1]) ? data[1] : [];
  } catch {
    return [];
  }
}

async function run() {
  console.log('Mining Google Autocomplete for high-CTR terms...');
  const allResults = new Map();

  for (const seed of GOOGLE_SUGGEST_SEEDS) {
    const suggestions = await fetchGoogle(seed);
    suggestions.forEach(s => allResults.set(s.toLowerCase(), s));
    // Check with spaces
    const spaceSuggestions = await fetchGoogle(seed + ' ');
    spaceSuggestions.forEach(s => allResults.set(s.toLowerCase(), s));
    await new Promise(r => setTimeout(r, 80));
  }

  const list = Array.from(allResults.values());
  console.log(`Total live Google keywords gathered: ${list.length}`);
  fs.writeFileSync('scripts/live_google_keywords.json', JSON.stringify(list, null, 2));
  console.log('Saved to scripts/live_google_keywords.json');
}

run();
