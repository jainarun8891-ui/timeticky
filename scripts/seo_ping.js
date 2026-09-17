// Modern Search Engine Submission via IndexNow (Bing, Yandex, Seznam, Naver)
const host = 'www.timenumbers.com';
const key = 'c4a91e5d8f634b8297d020e5436b7cf9';
const keyLocation = 'https://www.timenumbers.com/c4a91e5d8f634b8297d020e5436b7cf9.txt';

const priorityUrls = [
  'https://www.timenumbers.com/',
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
  'https://www.timenumbers.com/tokyo'
];

async function ping() {
  console.log('=== INDEXNOW SEARCH ENGINE SUBMISSION ===');
  console.log(`Submitting ${priorityUrls.length} priority URLs to IndexNow...`);

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host,
        key,
        keyLocation,
        urlList: priorityUrls
      })
    });

    if (res.status === 200 || res.status === 202) {
      console.log(`✓ Successfully submitted to IndexNow! (HTTP ${res.status}: ${res.statusText})`);
      console.log('  Crawlers on Bing, Yandex, Seznam, and Naver have been notified.');
    } else {
      console.log(`! IndexNow returned HTTP ${res.status}: ${res.statusText}`);
    }
  } catch (e) {
    console.error('✗ IndexNow Error:', e.message);
  }
}

ping();
