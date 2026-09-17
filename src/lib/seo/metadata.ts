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

  // If already fits with brand suffix <= 60 chars:
  if (stripped.length + brand.length <= 60) {
    return `${stripped}${brand}`;
  }

  // If stripped itself is <= 60 chars, return stripped
  if (stripped.length <= 60) {
    return stripped;
  }

  // If stripped > 60 chars, trim cleanly at last word boundary before 60
  const maxBase = 60 - brand.length;
  const truncated = stripped.slice(0, maxBase);
  const lastSpace = truncated.lastIndexOf(' ');
  const cleanBase = (lastSpace > 20) ? truncated.slice(0, lastSpace) : truncated;
  return `${cleanBase.trim()}${brand}`;
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
