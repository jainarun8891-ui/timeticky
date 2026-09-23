// Comprehensive Search Engine Submission via IndexNow (Bing, Yandex, Seznam, Naver)
const host = 'www.timenumbers.com';
const key = 'c4a91e5d8f634b8297d020e5436b7cf9';
const keyLocation = 'https://www.timenumbers.com/c4a91e5d8f634b8297d020e5436b7cf9.txt';

async function getAllUrls() {
  try {
    const res = await fetch('http://localhost:3000/sitemap.xml');
    if (res.ok) {
      const xml = await res.text();
      const matches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
        .map(m => m[1])
        .filter(url => url.includes(host));
      if (matches.length > 0) {
        console.log(`Extracted ${matches.length} URLs from local sitemap.xml for ${host}`);
        return Array.from(new Set(matches));
      }
    }
  } catch (err) {
    console.log('Local dev server not responding, falling back to all 352 reviewed URLs from site_all_pages_review.json');
  }

  const fs = require('fs');
  const path = require('path');
  try {
    const reviewPath = path.join(__dirname, '../site_all_pages_review.json');
    if (fs.existsSync(reviewPath)) {
      const review = JSON.parse(fs.readFileSync(reviewPath, 'utf8'));
      const urls = review.map(p => p.url || `https://${host}${p.path === '/' ? '' : p.path}`);
      console.log(`Loaded ${urls.length} canonical URLs directly from site_all_pages_review.json`);
      return Array.from(new Set(urls));
    }
  } catch (e) {
    console.warn('Could not read site_all_pages_review.json, using static fallback');
  }

  return [
    'https://www.timenumbers.com/',
    'https://www.timenumbers.com/united-states-time-now',
    'https://www.timenumbers.com/converter',
    'https://www.timenumbers.com/date-difference',
    'https://www.timenumbers.com/business-days-calculator',
    'https://www.timenumbers.com/week-number',
    'https://www.timenumbers.com/calendar',
    'https://www.timenumbers.com/calendar/2026',
    'https://www.timenumbers.com/time-difference/los-angeles/honolulu',
    'https://www.timenumbers.com/time-difference/honolulu/los-angeles',
    'https://www.timenumbers.com/time-difference/dallas/los-angeles',
    'https://www.timenumbers.com/time-difference/los-angeles/dallas',
    'https://www.timenumbers.com/time-difference/dallas/honolulu',
    'https://www.timenumbers.com/time-difference/honolulu/dallas',
    'https://www.timenumbers.com/time-difference/honolulu/new-york',
    'https://www.timenumbers.com/time-difference/new-york/honolulu',
    'https://www.timenumbers.com/time-difference/los-angeles/miami',
    'https://www.timenumbers.com/time-difference/miami/los-angeles',
    'https://www.timenumbers.com/time-difference/phoenix/los-angeles',
    'https://www.timenumbers.com/time-difference/los-angeles/phoenix',
    'https://www.timenumbers.com/time-difference/chicago/los-angeles',
    'https://www.timenumbers.com/time-difference/los-angeles/chicago',
    'https://www.timenumbers.com/time-difference/houston/new-york',
    'https://www.timenumbers.com/time-difference/new-york/houston',
    'https://www.timenumbers.com/time-difference/seattle/new-york',
    'https://www.timenumbers.com/time-difference/new-york/seattle',
    'https://www.timenumbers.com/convert',
    'https://www.timenumbers.com/convert/gmt-to-est',
    'https://www.timenumbers.com/convert/est-to-pst',
    'https://www.timenumbers.com/convert/gmt-to-pst',
    'https://www.timenumbers.com/convert/gmt-to-ist',
    'https://www.timenumbers.com/world-map',
    'https://www.timenumbers.com/world-clock',
    'https://www.timenumbers.com/time-converter',
    'https://www.timenumbers.com/meeting-planner',
    'https://www.timenumbers.com/atomic-clock',
    'https://www.timenumbers.com/clock-accuracy',
    'https://www.timenumbers.com/alarm',
    'https://www.timenumbers.com/pomodoro',
    'https://www.timenumbers.com/stopwatch',
    'https://www.timenumbers.com/daylight-saving-time',
    'https://www.timenumbers.com/daylight-saving-time/2026',
    'https://www.timenumbers.com/daylight-saving-time/2027',
    'https://www.timenumbers.com/convert/edt-to-ist',
    'https://www.timenumbers.com/convert/kst-to-cdt',
    'https://www.timenumbers.com/convert/cdt-to-ist',
    'https://www.timenumbers.com/convert/kst-to-mst',
    'https://www.timenumbers.com/convert/cest-to-utc',
    'https://www.timenumbers.com/convert/cest-to-est',
    'https://www.timenumbers.com/convert/cest-to-cdt',
    'https://www.timenumbers.com/convert/ist-to-cdt',
    'https://www.timenumbers.com/convert/kst-to-mdt',
    'https://www.timenumbers.com/convert/gmt-to-ist',
    'https://www.timenumbers.com/convert/gmt-to-bst',
    'https://www.timenumbers.com/convert/pst-to-gmt',
    'https://www.timenumbers.com/today',
    'https://www.timenumbers.com/date-calculator',
    'https://www.timenumbers.com/jet-lag-calculator',
    'https://www.timenumbers.com/time-zones',
    'https://www.timenumbers.com/utc',
    'https://www.timenumbers.com/new-york',
    'https://www.timenumbers.com/london',
    'https://www.timenumbers.com/paris',
    'https://www.timenumbers.com/tokyo',
    'https://www.timenumbers.com/berlin',
    'https://www.timenumbers.com/zurich',
    'https://www.timenumbers.com/madrid',
    'https://www.timenumbers.com/mumbai',
    'https://www.timenumbers.com/hong-kong',
    'https://www.timenumbers.com/bengaluru',
    'https://www.timenumbers.com/rome',
    'https://www.timenumbers.com/chicago',
    'https://www.timenumbers.com/seoul',
    'https://www.timenumbers.com/san-francisco',
    'https://www.timenumbers.com/cairo',
    'https://www.timenumbers.com/los-angeles',
    'https://www.timenumbers.com/washington-dc',
    'https://www.timenumbers.com/sao-paulo',
    'https://www.timenumbers.com/toronto'
  ];
}

async function ping() {
  console.log('=== INDEXNOW SEARCH ENGINE SUBMISSION ===');
  const urls = await getAllUrls();
  console.log(`Submitting ${urls.length} URLs to IndexNow protocol...`);

  const endpoints = [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow'
  ];

  for (const endpoint of endpoints) {
    try {
      console.log(`Pinging ${endpoint}...`);
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

      if (res.status === 200 || res.status === 202) {
        console.log(`✓ Successfully submitted to ${endpoint}! (HTTP ${res.status}: ${res.statusText})`);
      } else {
        console.log(`! ${endpoint} returned HTTP ${res.status}: ${res.statusText}`);
      }
    } catch (e) {
      console.error(`✗ Error submitting to ${endpoint}:`, e.message);
    }
  }
}

ping();
