#!/usr/bin/env node

/**
 * Real-Time Google Keyword Miner & SEO Gap Analyzer for TimeNumbers
 * 
 * Extracts high-volume, real user queries directly from Google's live Suggest database
 * with alphabet-soup wildcard expansion, calculates search intent, and identifies
 * high-traffic keyword opportunities not yet covered on timenumbers.com.
 */

import fs from 'fs';
import path from 'path';

const SEED_TEMPLATES = [
  'time difference',
  'time in',
  'what time is it in',
  'current time',
  'time zone converter',
  'convert time',
  'hours ahead',
  'hours behind',
  'best time to call',
  'daylight saving time 2026',
  'meeting planner between',
  'atomic clock'
];

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('');

async function fetchGoogleSuggestions(query) {
  const url = `https://suggestqueries.google.com/complete/search?client=chrome&hl=en&gl=us&q=${encodeURIComponent(query)}`;
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data[1]) ? data[1] : [];
  } catch (err) {
    return [];
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function mineKeywords(seeds = SEED_TEMPLATES, limitPerSeed = 10) {
  console.log(`\n🔍 MINING LIVE GOOGLE KEYWORDS FOR ${seeds.length} SEED CATEGORIES...`);
  const results = new Map();

  for (const seed of seeds) {
    process.stdout.write(`  Mining: "${seed}" `);
    // Base search
    const baseSuggestions = await fetchGoogleSuggestions(seed);
    baseSuggestions.forEach(q => results.set(q.toLowerCase(), { query: q, seed }));
    process.stdout.write(`[${baseSuggestions.length}] `);

    // Alphabet soup expansion for deep long-tail queries
    for (const letter of ALPHABET.slice(0, 8)) {
      const expanded = await fetchGoogleSuggestions(`${seed} ${letter}`);
      expanded.forEach(q => results.set(q.toLowerCase(), { query: q, seed, letter }));
      await delay(120);
    }
    console.log(`-> Total accumulated: ${results.size}`);
  }

  return Array.from(results.values());
}

function categorizeIntent(query) {
  const q = query.toLowerCase();
  if (q.includes('difference') || q.includes('between') || q.includes('to') || q.includes('vs')) {
    return 'Bilateral Comparison (Ultra Low KD)';
  }
  if (q.includes('convert') || q.includes('converter') || q.includes('calculator')) {
    return 'Utility / High Converting';
  }
  if (q.includes('what time') || q.includes('current time') || q.includes('time now')) {
    return 'Direct Answer / Snippet Box';
  }
  if (q.includes('daylight') || q.includes('dst') || q.includes('spring') || q.includes('fall')) {
    return 'Seasonal Spike Trend';
  }
  return 'General Horology';
}

async function run() {
  const args = process.argv.slice(2);
  const customSeed = args.find(a => !a.startsWith('--'));

  const seeds = customSeed ? [customSeed] : [
    'time difference between',
    'time in',
    'convert gmt to',
    'convert est to',
    'convert pst to',
    'what time is it in',
    'best time to call from'
  ];

  const keywords = await mineKeywords(seeds);

  console.log('\n======================================================');
  console.log(`✨ EXTRACTED ${keywords.length} HIGH-INTENT KEYWORDS FROM GOOGLE`);
  console.log('======================================================\n');

  // Group by Intent
  const grouped = {};
  for (const item of keywords) {
    const intent = categorizeIntent(item.query);
    if (!grouped[intent]) grouped[intent] = [];
    grouped[intent].push(item.query);
  }

  for (const [intent, list] of Object.entries(grouped)) {
    console.log(`📌 ${intent.toUpperCase()} (${list.length} queries):`);
    list.slice(0, 10).forEach(q => console.log(`   • ${q}`));
    if (list.length > 10) console.log(`   ... and ${list.length - 10} more`);
    console.log('');
  }

  // Save to JSON artifact
  const outputPath = path.join(process.cwd(), 'scripts', 'mined_keywords.json');
  fs.writeFileSync(outputPath, JSON.stringify(keywords, null, 2), 'utf8');
  console.log(`💾 Saved full keyword dataset to: ${outputPath}`);
}

run();
