const fs = require('fs');
const path = require('path');

function write(relPath, content) {
  const fullPath = path.join(__dirname, '..', relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf8');
  console.log('Wrote:', relPath);
}

// 1. site.config.ts
write('src/lib/config/site.config.ts', `
export interface SiteConfig {
  name: string;
  tagline: string;
  secondaryTagline: string;
  url: string;
  ogImage: string;
  description: string;
  links: {
    github: string;
    twitter: string;
  };
  defaultLocale: string;
  locales: string[];
}

export const siteConfig: SiteConfig = {
  name: "TimeNumbers",
  tagline: "A more connected world",
  secondaryTagline: "The world's time, clearly.",
  url: "https://www.timenumbers.com",
  ogImage: "https://www.timenumbers.com/og.png",
  description: "Accurate, lightweight, and modern global time platform. Live synchronized world clocks, timezone converter, meeting planner, sunrise & sunset tracking, and calendar tools.",
  links: {
    github: "https://github.com/timenumbers",
    twitter: "https://twitter.com/timenumbers"
  },
  defaultLocale: "en",
  locales: ["en", "hi", "es", "fr", "de", "ja"]
};
`);

// 2. countries.ts
write('src/lib/geo/countries.ts', `
export interface Country {
  code: string;
  name: string;
  slug: string;
  capital: string;
  population: string;
  currency: string;
  flag: string;
  timezones: string[];
  region: string;
  hasDst: boolean;
  dstNotes?: string;
}

export const COUNTRIES: Record<string, Country> = {
  FR: {
    code: "FR",
    name: "France",
    slug: "france",
    capital: "Paris",
    population: "68.4 million",
    currency: "Euro (EUR)",
    flag: "🇫🇷",
    timezones: ["Europe/Paris"],
    region: "Europe",
    hasDst: true,
    dstNotes: "Observes Central European Summer Time (CEST, UTC+2) from late March to late October."
  },
  US: {
    code: "US",
    name: "United States",
    slug: "united-states",
    capital: "Washington, D.C.",
    population: "335.8 million",
    currency: "US Dollar (USD)",
    flag: "🇺🇸",
    timezones: ["America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles", "America/Anchorage", "Pacific/Honolulu"],
    region: "Americas",
    hasDst: true,
    dstNotes: "Observes Daylight Saving Time across most states from second Sunday in March to first Sunday in November (Arizona and Hawaii excluded)."
  },
  GB: {
    code: "GB",
    name: "United Kingdom",
    slug: "united-kingdom",
    capital: "London",
    population: "67.7 million",
    currency: "British Pound (GBP)",
    flag: "🇬🇧",
    timezones: ["Europe/London"],
    region: "Europe",
    hasDst: true,
    dstNotes: "Switches to British Summer Time (BST, UTC+1) from late March to late October."
  },
  JP: {
    code: "JP",
    name: "Japan",
    slug: "japan",
    capital: "Tokyo",
    population: "124.5 million",
    currency: "Japanese Yen (JPY)",
    flag: "🇯🇵",
    timezones: ["Asia/Tokyo"],
    region: "Asia",
    hasDst: false,
    dstNotes: "Japan uses Japan Standard Time (JST, UTC+9) year-round and does not observe DST."
  },
  AE: {
    code: "AE",
    name: "United Arab Emirates",
    slug: "united-arab-emirates",
    capital: "Abu Dhabi",
    population: "9.5 million",
    currency: "UAE Dirham (AED)",
    flag: "🇦🇪",
    timezones: ["Asia/Dubai"],
    region: "Asia",
    hasDst: false,
    dstNotes: "The UAE remains on Gulf Standard Time (GST, UTC+4) year-round."
  },
  IN: {
    code: "IN",
    name: "India",
    slug: "india",
    capital: "New Delhi",
    population: "1.43 billion",
    currency: "Indian Rupee (INR)",
    flag: "🇮🇳",
    timezones: ["Asia/Kolkata"],
    region: "Asia",
    hasDst: false,
    dstNotes: "India observes India Standard Time (IST, UTC+5:30) uniformly nationwide without DST."
  },
  AU: {
    code: "AU",
    name: "Australia",
    slug: "australia",
    capital: "Canberra",
    population: "26.6 million",
    currency: "Australian Dollar (AUD)",
    flag: "🇦🇺",
    timezones: ["Australia/Sydney", "Australia/Melbourne", "Australia/Brisbane", "Australia/Adelaide", "Australia/Perth"],
    region: "Oceania",
    hasDst: true,
    dstNotes: "Southeastern states observe Daylight Saving Time from early October to early April."
  },
  DE: {
    code: "DE",
    name: "Germany",
    slug: "germany",
    capital: "Berlin",
    population: "84.4 million",
    currency: "Euro (EUR)",
    flag: "🇩🇪",
    timezones: ["Europe/Berlin"],
    region: "Europe",
    hasDst: true,
    dstNotes: "Observes Central European Summer Time (CEST, UTC+2) during spring and summer."
  },
  CA: {
    code: "CA",
    name: "Canada",
    slug: "canada",
    capital: "Ottawa",
    population: "40.1 million",
    currency: "Canadian Dollar (CAD)",
    flag: "🇨🇦",
    timezones: ["America/Toronto", "America/Vancouver", "America/Edmonton", "America/Winnipeg", "America/Halifax", "America/St_Johns"],
    region: "Americas",
    hasDst: true,
    dstNotes: "Most provinces observe Daylight Saving Time in harmony with North American schedules."
  },
  SG: {
    code: "SG",
    name: "Singapore",
    slug: "singapore",
    capital: "Singapore",
    population: "5.9 million",
    currency: "Singapore Dollar (SGD)",
    flag: "🇸🇬",
    timezones: ["Asia/Singapore"],
    region: "Asia",
    hasDst: false,
    dstNotes: "Singapore uses Singapore Standard Time (SGT, UTC+8) year-round."
  },
  BR: {
    code: "BR",
    name: "Brazil",
    slug: "brazil",
    capital: "Brasília",
    population: "215.3 million",
    currency: "Brazilian Real (BRL)",
    flag: "🇧🇷",
    timezones: ["America/Sao_Paulo", "America/Manaus", "America/Belem", "America/Rio_Branco"],
    region: "Americas",
    hasDst: false,
    dstNotes: "Brazil abolished daylight saving time in 2019."
  },
  CH: {
    code: "CH",
    name: "Switzerland",
    slug: "switzerland",
    capital: "Bern",
    population: "8.9 million",
    currency: "Swiss Franc (CHF)",
    flag: "🇨🇭",
    timezones: ["Europe/Zurich"],
    region: "Europe",
    hasDst: true,
    dstNotes: "Follows Central European Summer Time (CEST) from late March to late October."
  }
};

export function getCountryByCode(code: string): Country | undefined {
  return COUNTRIES[code.toUpperCase()];
}

export function getCountryBySlug(slug: string): Country | undefined {
  return Object.values(COUNTRIES).find(c => c.slug === slug.toLowerCase());
}

export function getAllCountries(): Country[] {
  return Object.values(COUNTRIES);
}
`);

console.log('Done part 1');
