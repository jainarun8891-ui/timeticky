// Comprehensive Search Engine Submission via IndexNow (Bing, Yandex, Seznam, Naver)
const host = 'www.timenumbers.com';
const key = 'c4a91e5d8f634b8297d020e5436b7cf9';
const keyLocation = 'https://www.timenumbers.com/c4a91e5d8f634b8297d020e5436b7cf9.txt';

async function getAllUrls() {
  try {
    const res = await fetch('http://localhost:3000/sitemap.xml');
    if (res.ok) {
      const xml = await res.text();
      const matches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
      if (matches.length > 0) {
        console.log(`Extracted ${matches.length} URLs from local sitemap.xml`);
        return Array.from(new Set(matches));
      }
    }
  } catch (err) {
    console.log('Local dev server not responding, falling back to priority list:', err.message);
  }

  return [
    'https://www.timenumbers.com/',
    'https://www.timenumbers.com/united-states-time-now',
    'https://www.timenumbers.com/time-zone-converter',
    'https://www.timenumbers.com/compare',
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
    'https://www.timenumbers.com/calendar',
    'https://www.timenumbers.com/daylight-saving-time',
    'https://www.timenumbers.com/sunrise-sunset',
    'https://www.timenumbers.com/widgets',
    'https://www.timenumbers.com/delhi',
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
    'https://www.timenumbers.com/s-o-paulo',
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
