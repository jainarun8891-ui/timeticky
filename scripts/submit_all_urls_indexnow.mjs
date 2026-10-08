import fs from 'fs';
import path from 'path';

const host = 'www.timenumbers.com';
const key = 'c4a91e5d8f634b8297d020e5436b7cf9';
const keyLocation = 'https://www.timenumbers.com/c4a91e5d8f634b8297d020e5436b7cf9.txt';

// Read all static routes generated in .next/server/app
async function extractAllRoutes() {
  const routes = new Set();
  routes.add('https://www.timenumbers.com/');

  // Check if .next build manifests exist
  const manifestPath = path.resolve('.next/app-build-manifest.json');
  if (fs.existsSync(manifestPath)) {
    try {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      for (const pageKey of Object.keys(manifest.pages || {})) {
        if (!pageKey.startsWith('/api') && !pageKey.startsWith('/_') && !pageKey.includes('[') && !pageKey.startsWith('/admin')) {
          routes.add(`https://${host}${pageKey.replace(/\/page$/, '') || '/'}`);
        }
      }
    } catch (e) {}
  }

  // Also read from site_all_pages_review.json if available
  const reviewPath = path.resolve('site_all_pages_review.json');
  if (fs.existsSync(reviewPath)) {
    try {
      const review = JSON.parse(fs.readFileSync(reviewPath, 'utf8'));
      for (const item of review) {
        if (item.url) routes.add(item.url);
        else if (item.path && !item.path.startsWith('/admin') && !item.path.startsWith('/api')) {
          routes.add(`https://${host}${item.path}`);
        }
      }
    } catch (e) {}
  }

  return Array.from(routes);
}

async function runIndexNow() {
  console.log('🚀 Extracting all canonical URLs for instant search engine indexing...');
  const urls = await extractAllRoutes();
  console.log(`Found ${urls.length} canonical URLs.`);

  const endpoints = [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow'
  ];

  for (const endpoint of endpoints) {
    try {
      console.log(`📡 Pinging IndexNow at ${endpoint}...`);
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          host,
          key,
          keyLocation,
          urlList: urls
        })
      });

      console.log(`Status for ${endpoint}: HTTP ${res.status} (${res.statusText})`);
      if (res.status === 200 || res.status === 202) {
        console.log(`✅ Successfully queued ${urls.length} URLs for instant search indexing!`);
      }
    } catch (err) {
      console.error(`❌ Failed to ping ${endpoint}:`, err.message);
    }
  }
}

runIndexNow();
