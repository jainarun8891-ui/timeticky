import { siteConfig } from '../config/site.config';

export function buildCanonicalUrl(path = ""): string {
  const base = siteConfig.url.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
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

  // If stripped itself is <= 65 chars, retain the complete high-value keyword phrase:
  if (stripped.length <= 65) {
    return stripped;
  }

  // If stripped > 65 chars, trim cleanly at last word boundary before 65
  const truncated = stripped.slice(0, 65);
  const lastSpace = truncated.lastIndexOf(' ');
  let cleanBase = (lastSpace > 25) ? truncated.slice(0, lastSpace) : truncated;
  cleanBase = cleanBase.replace(/[\s,;:\-([]+$/, '').trim();
  if (cleanBase.includes('(') && !cleanBase.includes(')')) {
    cleanBase = cleanBase.replace(/\s*\([^)]*$/, '').trim();
  }
  if (cleanBase.includes('[') && !cleanBase.includes(']')) {
    cleanBase = cleanBase.replace(/\s*\[[^\]]*$/, '').trim();
  }
  return cleanBase;
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
