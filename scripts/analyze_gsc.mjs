import fs from 'fs';

function parseCSV(content) {
  const lines = content.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const parts = [];
    let cur = '';
    let inQuotes = false;
    for (let c of line) {
      if (c === '"') {
        inQuotes = !inQuotes;
      } else if (c === ',' && !inQuotes) {
        parts.push(cur);
        cur = '';
      } else {
        cur += c;
      }
    }
    parts.push(cur);
    const row = {};
    headers.forEach((h, idx) => row[h] = parts[idx] ? parts[idx].trim() : '');
    rows.push(row);
  }
  return rows;
}

const queries = parseCSV(fs.readFileSync('scripts/gsc_2026_09_26/Queries.csv', 'utf8'));
const pages = parseCSV(fs.readFileSync('scripts/gsc_2026_09_26/Pages.csv', 'utf8'));

console.log('Total queries in GSC:', queries.length);
console.log('Total pages in GSC:', pages.length);

// Page 1 queries (pos <= 10) with 0 clicks
const page1ZeroClicks = queries
  .map(q => ({
    query: q['Top queries'],
    clicks: Number(q['Clicks']),
    imp: Number(q['Impressions']),
    pos: Number(q['Position']),
    ctr: q['CTR']
  }))
  .filter(q => q.pos <= 10 && q.clicks === 0)
  .sort((a,b) => b.imp - a.imp);

console.log('\n=== TOP 25 PAGE 1 (Pos <= 10) QUERIES WITH ZERO CLICKS ===');
console.table(page1ZeroClicks.slice(0, 25));

// Long-tail queries (4+ words) with pos between 11 and 30
const longTailPage2_3 = queries
  .map(q => ({
    query: q['Top queries'],
    words: q['Top queries'].split(/\s+/).length,
    clicks: Number(q['Clicks']),
    imp: Number(q['Impressions']),
    pos: Number(q['Position'])
  }))
  .filter(q => q.words >= 4 && q.pos >= 11 && q.pos <= 30)
  .sort((a,b) => b.imp - a.imp);

console.log('\n=== TOP 25 LONG-TAIL (4+ words) ON PAGE 2-3 (Pos 11-30) ===');
console.table(longTailPage2_3.slice(0, 25));

// Top impression queries overall
const topImp = queries
  .map(q => ({
    query: q['Top queries'],
    clicks: Number(q['Clicks']),
    imp: Number(q['Impressions']),
    pos: Number(q['Position']),
    ctr: q['CTR']
  }))
  .sort((a,b) => b.imp - a.imp);

console.log('\n=== TOP 25 QUERIES BY IMPRESSIONS OVERALL ===');
console.table(topImp.slice(0, 25));

// Top impression pages with 0 clicks
const topPagesZeroClicks = pages
  .map(p => ({
    url: p['Top pages'],
    clicks: Number(p['Clicks']),
    imp: Number(p['Impressions']),
    pos: Number(p['Position']),
    ctr: p['CTR']
  }))
  .filter(p => p.clicks === 0)
  .sort((a,b) => b.imp - a.imp);

console.log('\n=== TOP 30 PAGES BY IMPRESSIONS WITH 0 CLICKS ===');
console.table(topPagesZeroClicks.slice(0, 30));
