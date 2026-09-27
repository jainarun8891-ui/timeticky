/**
 * Universal Countdown Event Engine & Dynamic URL Routing Utility
 */

export interface CountdownEventData {
  slug: string;
  name: string;
  targetIso: string;
  description: string;
  emoji: string;
  culturalNote?: string;
  history?: string;
  firstCelebratedIn?: string;
  isCustom?: boolean;
}

export const CANONICAL_COUNTDOWN_EVENTS: Record<string, CountdownEventData> = {
  'new-year': {
    slug: 'new-year',
    name: 'New Year 2027',
    targetIso: '2027-01-01T00:00:00Z',
    description: 'Exact real-time countdown to midnight and the arrival of New Year 2027 across international time zones.',
    emoji: '🎆',
    culturalNote: 'Celebrated globally at the stroke of midnight as the Gregorian calendar year rolls over.',
    history: 'Established by Julius Caesar in 45 BCE with the Julian calendar reform, dedicating January to Janus, Roman deity of beginnings.',
    firstCelebratedIn: 'Line Islands of Kiribati (UTC+14) and Samoa, a full 26 hours before Baker Island (UTC-12).',
  },
  'christmas': {
    slug: 'christmas',
    name: 'Christmas Day 2026',
    targetIso: '2026-12-25T00:00:00Z',
    description: 'Live countdown in days, hours, minutes, and seconds until Christmas Day 2026.',
    emoji: '🎄',
    culturalNote: 'Commemorated by billions of people worldwide as a holiday of family, generosity, and peace.',
    history: 'First officially recorded in Rome during 336 CE during the reign of Emperor Constantine.',
    firstCelebratedIn: 'New Zealand and Eastern Kiribati, where the sun rises on Christmas morning nearly an entire day before the Americas.',
  },
  'halloween': {
    slug: 'halloween',
    name: 'Halloween 2026',
    targetIso: '2026-10-31T00:00:00Z',
    description: 'Track how many days, hours, minutes, and seconds remain until Halloween evening.',
    emoji: '🎃',
    culturalNote: 'Observed on the eve of All Hallows’ Day, featuring costume traditions and autumn harvest festivities.',
    history: 'Traces its roots over 2,000 years to the ancient Celtic festival of Samhain, an agricultural checkpoint.',
    firstCelebratedIn: 'The Asia-Pacific region, before rolling through European autumn evenings and the Americas.',
  },
  'valentines-day': {
    slug: 'valentines-day',
    name: "Valentine's Day 2027",
    targetIso: '2027-02-14T00:00:00Z',
    description: "Live countdown to Valentine's Day. Track the exact time remaining until February 14.",
    emoji: '❤️',
    culturalNote: 'A celebration honoring affection, companionship, and interpersonal appreciation.',
    history: 'Originated in ancient Roman feast days and Christian traditions honoring Saint Valentine.',
    firstCelebratedIn: 'Oceania and East Asia, where February 14 opens with confectionery gift exchanges.',
  },
  'diwali': {
    slug: 'diwali',
    name: 'Diwali (Festival of Lights)',
    targetIso: '2026-11-08T00:00:00Z',
    description: 'Exact countdown to Diwali 2026. Discover the days and hours remaining until the Hindu festival of lights.',
    emoji: '🪔',
    culturalNote: 'Diwali signifies the spiritual victory of light over darkness, good over evil, and wisdom over ignorance.',
    history: 'A major lunisolar festival commemorated across India and South Asia on the darkest new moon night (Amavasya) of Kartika.',
    firstCelebratedIn: 'Fiji, New Zealand, and Australia, followed by millions across the Indian subcontinent.',
  },
  'holi': {
    slug: 'holi',
    name: 'Holi (Festival of Colors)',
    targetIso: '2027-03-22T00:00:00Z',
    description: 'Track the countdown to Holi 2027. Live timer counting down to the springtime celebration of colors and joy.',
    emoji: '🎨',
    culturalNote: 'Holi marks the blossoming of spring, reconciliation of relationships, and playful tossing of organic powders.',
    history: 'Described in 7th-century Sanskrit texts, Holi is celebrated on the Purnima (full moon) of Phalguna.',
    firstCelebratedIn: 'Fiji, Mauritius, India, Nepal, and diaspora hubs across the globe.',
  },
  'thanksgiving': {
    slug: 'thanksgiving',
    name: 'Thanksgiving Day 2026',
    targetIso: '2026-11-26T00:00:00Z',
    description: 'Live countdown to Thanksgiving in the United States, celebrated on the fourth Thursday of November.',
    emoji: '🦃',
    culturalNote: 'A national holiday in North America rooted in expressing gratitude for harvest blessings and quality time.',
    history: 'Proclaimed an annual national holiday by President Abraham Lincoln in 1863 amidst the American Civil War.',
    firstCelebratedIn: 'Across the four contiguous US time zones (Eastern, Central, Mountain, Pacific) and Hawaii.',
  },
};

export function slugifyEventTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'my-countdown';
}

export function resolveEventData(
  slug: string,
  searchParams?: { [key: string]: string | string[] | undefined }
): CountdownEventData {
  const normalizedSlug = slug.toLowerCase();

  // 1. Check Canonical DB
  if (CANONICAL_COUNTDOWN_EVENTS[normalizedSlug]) {
    return CANONICAL_COUNTDOWN_EVENTS[normalizedSlug];
  }

  // 2. Check Dynamic Search Params (Custom Countdown)
  const queryTitle = typeof searchParams?.title === 'string' ? searchParams.title : undefined;
  const queryDate = typeof searchParams?.date === 'string' ? searchParams.date : undefined;
  const queryEmoji = typeof searchParams?.emoji === 'string' ? searchParams.emoji : '⏳';
  const queryDesc = typeof searchParams?.desc === 'string' ? searchParams.desc : undefined;

  // Humanize slug if no custom title
  const humanizedName = queryTitle || slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  // Default to 30 days from now if no valid date provided
  let targetIso = new Date(Date.now() + 30 * 86400000).toISOString();
  if (queryDate) {
    const parsed = new Date(queryDate);
    if (!isNaN(parsed.getTime())) {
      targetIso = parsed.toISOString();
    }
  }

  return {
    slug: normalizedSlug,
    name: humanizedName,
    targetIso,
    description:
      queryDesc ||
      `Live precision countdown to ${humanizedName}. Track remaining days, hours, minutes, and seconds in real time.`,
    emoji: queryEmoji,
    isCustom: true,
    culturalNote: `Custom user-generated countdown for ${humanizedName}. Synchronized with atomic world time across global time zones.`,
  };
}
