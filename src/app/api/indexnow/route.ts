import { NextResponse } from 'next/server';
import { siteConfig } from '@/lib/config/site.config';

const INDEXNOW_KEY = 'c4a91e5d8f634b8297d020e5436b7cf9';
const KEY_LOCATION = `${siteConfig.url}/c4a91e5d8f634b8297d020e5436b7cf9.txt`;

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const host = new URL(siteConfig.url).host;

    // Default top high-intent routes if not specified in body
    const defaultRoutes = [
      '/',
      '/convert',
      '/convert/gmt-to-est',
      '/convert/est-to-pst',
      '/convert/gmt-to-pst',
      '/convert/gmt-to-ist',
      '/world-map',
      '/world-clock',
      '/time-converter',
      '/meeting-planner',
      '/atomic-clock',
      '/clock-accuracy',
      '/alarm',
      '/pomodoro',
      '/stopwatch',
      '/calendar',
      '/daylight-saving-time',
      '/sunrise-sunset',
      '/widgets',
      '/delhi',
      '/new-york',
      '/london',
      '/paris',
      '/tokyo'
    ];

    const urlList: string[] = Array.isArray(body.urls) && body.urls.length > 0
      ? body.urls
      : defaultRoutes.map(p => `${siteConfig.url}${p}`);

    const payload = {
      host,
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: urlList.slice(0, 10000),
    };

    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    const status = response.status;
    const ok = status >= 200 && status < 300;

    return NextResponse.json({
      success: ok,
      status,
      submittedCount: payload.urlList.length,
      host,
      keyLocation: KEY_LOCATION
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ready',
    host: new URL(siteConfig.url).host,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    description: 'POST to this endpoint to submit active URLs to IndexNow search engines (Bing, Yandex, Seznam, Naver).',
  });
}
