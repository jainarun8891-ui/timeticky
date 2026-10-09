import { Dictionary, Locale } from './types';
import { enDictionary } from './dictionaries/en';
import { esDictionary } from './dictionaries/es';
import { siteConfig } from '../config/site.config';

export * from './types';

export const LOCALES: Locale[] = ['en', 'es'];
export const DEFAULT_LOCALE: Locale = 'en';

export function getDictionary(locale: Locale = 'en'): Dictionary {
  return locale === 'es' ? esDictionary : enDictionary;
}

export function isSpanishLocale(locale?: string): boolean {
  return locale?.toLowerCase() === 'es';
}

/**
 * Maps any internal route to its localized equivalent:
 * getLocalizedPath('/world-clock', 'es') -> '/es/world-clock'
 * getLocalizedPath('/es/world-clock', 'en') -> '/world-clock'
 * getLocalizedPath('/', 'es') -> '/es'
 * getLocalizedPath('/es', 'en') -> '/'
 */
export function getLocalizedPath(path: string, targetLocale: Locale): string {
  if (!path) return targetLocale === 'es' ? '/es' : '/';

  // Normalize path without trailing slash (unless root '/')
  let cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (cleanPath.length > 1 && cleanPath.endsWith('/')) {
    cleanPath = cleanPath.slice(0, -1);
  }

  // Remove existing /es prefix to extract the canonical base route
  const isCurrentlyEs = cleanPath === '/es' || cleanPath.startsWith('/es/');
  const basePath = isCurrentlyEs
    ? cleanPath.replace(/^\/es/, '') || '/'
    : cleanPath;

  if (targetLocale === 'es') {
    return basePath === '/' ? '/es' : `/es${basePath}`;
  } else {
    return basePath;
  }
}

/**
 * Generates absolute canonical and reciprocal hreflang URLs for a given route.
 */
export function getAlternateUrls(path: string) {
  const enPath = getLocalizedPath(path, 'en');
  const esPath = getLocalizedPath(path, 'es');

  const base = siteConfig.url.replace(/\/$/, '');
  const enUrl = `${base}${enPath === '/' ? '' : enPath}`;
  const esUrl = `${base}${esPath}`;

  return {
    enUrl,
    esUrl,
    languages: {
      en: enUrl,
      es: esUrl,
      'x-default': enUrl,
    },
  };
}
