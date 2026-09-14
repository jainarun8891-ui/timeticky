import { siteConfig } from '../config/site.config';

export function buildCanonicalUrl(path = ""): string {
  const base = siteConfig.url.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

export function buildPageMetadata(title: string, description: string, path = "") {
  const canonical = buildCanonicalUrl(path);
  const cleanTitle = title.includes(siteConfig.name) ? title : `${title} — ${siteConfig.name}`;

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
