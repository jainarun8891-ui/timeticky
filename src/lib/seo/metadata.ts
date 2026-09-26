import { siteConfig } from '../config/site.config';

export function buildCanonicalUrl(path = ""): string {
  const base = siteConfig.url.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

const DANGLING_WORDS_REGEX = /\s+(?:&|and|or|with|for|in|to|of|vs|at|on|the|a|an|by|from|into|onto|upon|about)\s*$/i;

function cleanDanglingEnds(text: string): string {
  let res = text.replace(/[\s,;:|—\-([]+$/, '').trim();
  while (DANGLING_WORDS_REGEX.test(res)) {
    res = res.replace(DANGLING_WORDS_REGEX, '').trim();
    res = res.replace(/[\s,;:|—\-([]+$/, '').trim();
  }
  if (res.includes('(') && !res.includes(')')) {
    res = res.replace(/\s*\([^)]*$/, '').trim();
  }
  if (res.includes('[') && !res.includes(']')) {
    res = res.replace(/\s*\[[^\]]*$/, '').trim();
  }
  return res.replace(/[\s,;:|—\-([]+$/, '').trim();
}

export function formatSeoTitle(rawTitle: string): string {
  const brand = ` | ${siteConfig.name}`;
  // Strip any existing brand suffixes like " — TimeNumbers", " | TimeNumbers", " - TimeNumbers"
  const stripped = rawTitle
    .replace(new RegExp(`\\s*[—|\\-]\\s*${siteConfig.name}\\s*(Insights)?.*`, 'i'), '')
    .trim();

  // If fits with brand suffix <= 65 chars (standard Google desktop title limit):
  if (stripped.length + brand.length <= 65) {
    return `${stripped}${brand}`;
  }

  // If stripped itself is <= 70 chars, retain complete high-value keyword phrase without slicing:
  if (stripped.length <= 70) {
    return stripped;
  }

  // If stripped has a primary separator (— or |) and the first part is substantial (>= 25 chars):
  if (stripped.includes(' — ')) {
    const parts = stripped.split(' — ');
    if (parts[0].length >= 25 && parts[0].length <= 65) {
      if (parts[0].length + brand.length <= 65) {
        return `${parts[0]}${brand}`;
      }
      return parts[0];
    }
  }

  // If stripped > 70 chars, trim cleanly at last word boundary before 68 and strip dangling connectors:
  const truncated = stripped.slice(0, 68);
  const lastSpace = truncated.lastIndexOf(' ');
  const cleanBase = (lastSpace > 25) ? truncated.slice(0, lastSpace) : truncated;
  return cleanDanglingEnds(cleanBase);
}

export function buildPageMetadata(title: string, description: string, path = "") {
  const canonical = buildCanonicalUrl(path);
  const cleanTitle = formatSeoTitle(title);

  return {
    title: cleanTitle,
    description,
    alternates: {
      canonical
    },
    openGraph: {
      title: cleanTitle,
      description,
      url: canonical,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: cleanTitle
        }
      ],
      locale: "en_US",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: cleanTitle,
      description,
      images: [siteConfig.ogImage]
    }
  };
}

export function generatePlaceSchema(name: string, country: string, lat?: number, lng?: number, timezone?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": name,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": country
    },
    ...(lat && lng ? {
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": lat,
        "longitude": lng
      }
    } : {}),
    ...(timezone ? { "timezone": timezone } : {})
  };
}
