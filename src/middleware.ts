import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get('host') || '';
  const pathname = url.pathname;

  // 1. Enforce canonical hostname (timenumbers.com -> www.timenumbers.com)
  if (host === 'timenumbers.com') {
    url.host = 'www.timenumbers.com';
    url.port = '';
    return NextResponse.redirect(url, 301);
  }

  // 2. Strip trailing slashes on sub-paths (e.g. /cities/ -> /cities)
  if (pathname !== '/' && pathname.endsWith('/')) {
    url.pathname = pathname.slice(0, -1);
    return NextResponse.redirect(url, 301);
  }

  // 3. Lowercase path normalization (e.g. /Time/London -> /time/london)
  // Skip /_next, /api, static files
  if (pathname !== pathname.toLowerCase() && !pathname.startsWith('/_next') && !pathname.startsWith('/api')) {
    url.pathname = pathname.toLowerCase();
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt
     */
    '/((?!_next/static|_next/image|favicon.ico|icon.svg|apple-touch-icon.png|sw.js).*)',
  ],
};
