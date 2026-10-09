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
  'summer': {
    slug: 'summer',
    name: 'First Day of Summer 2027',
    targetIso: '2027-06-21T00:00:00Z',
    description: 'Track the countdown to Summer and the Summer Solstice, the longest day of the year in the Northern Hemisphere.',
    emoji: '☀️',
    culturalNote: 'Celebrated across the Northern Hemisphere with midsummer festivals, outdoor gatherings, and longest daylight hours.',
    history: 'Ancient cultures built monuments like Stonehenge in England and Karnak in Egypt aligned with the summer solstice sunrise.',
    firstCelebratedIn: 'Across the northern polar circle where the midnight sun shines for 24 continuous hours.',
  },
  'winter': {
    slug: 'winter',
    name: 'First Day of Winter 2026',
    targetIso: '2026-12-21T00:00:00Z',
    description: 'Live countdown to Winter and the Winter Solstice, the shortest day and longest night of the year.',
    emoji: '❄️',
    culturalNote: 'Marks astronomical winter, greeted by ancient Yule rituals, coziness, and the slow return of longer days.',
    history: 'Celebrated for millennia across Norse, Roman, and Celtic cultures as the rebirth of the sun.',
    firstCelebratedIn: 'High-latitude northern territories where twilight fades into prolonged polar nights.',
  },
  'spring': {
    slug: 'spring',
    name: 'First Day of Spring 2027',
    targetIso: '2027-03-20T00:00:00Z',
    description: 'Track how many days until Spring and the Vernal Equinox, when day and night are of equal duration worldwide.',
    emoji: '🌱',
    culturalNote: 'A global symbol of rebirth, blossoming nature, agricultural sowing, and renewed optimism.',
    history: 'Celebrated as Nowruz (Persian New Year) and spring festivals across Eurasia for over 3,000 years.',
    firstCelebratedIn: 'Kiribati, New Zealand, and East Asia at sunrise on the vernal equinox.',
  },
  'fall': {
    slug: 'fall',
    name: 'First Day of Fall 2026',
    targetIso: '2026-09-22T00:00:00Z',
    description: 'Live countdown to Autumn and the Autumnal Equinox, marking the arrival of cooler temperatures and harvest season.',
    emoji: '🍂',
    culturalNote: 'Harvest festivals, foliage changes, and gratitude gatherings commemorate autumn across the Northern Hemisphere.',
    history: 'Marked historically by agricultural societies gathering grain, grapes, and roots before winter frosts set in.',
    firstCelebratedIn: 'The Pacific islands and East Asia as daylight hours begin to recede below nighttime duration.',
  },
  'black-friday': {
    slug: 'black-friday',
    name: 'Black Friday 2026',
    targetIso: '2026-11-27T00:00:00Z',
    description: 'Real-time live countdown in days, hours, and minutes until Black Friday shopping deals open.',
    emoji: '🛍️',
    culturalNote: 'The biggest retail and ecommerce shopping kickoff event of the year, falling the day after Thanksgiving.',
    history: 'The phrase originated in Philadelphia in the 1960s to describe heavy post-Thanksgiving pedestrian and traffic congestion.',
    firstCelebratedIn: 'Online storefronts worldwide opening at 12:00 AM in each respective international time zone.',
  },
  'cyber-monday': {
    slug: 'cyber-monday',
    name: 'Cyber Monday 2026',
    targetIso: '2026-11-30T00:00:00Z',
    description: 'Countdown to Cyber Monday 2026 online shopping discounts, tech deals, and flash sales.',
    emoji: '💻',
    culturalNote: 'The premier global digital shopping holiday focused on technology, electronics, and ecommerce bargains.',
    history: 'Coined in 2005 by Ellen Davis of the National Retail Federation to describe a notable spike in online sales.',
    firstCelebratedIn: 'Global ecommerce platforms beginning with the earliest Monday timezones in Australia and Asia.',
  },
  'easter': {
    slug: 'easter',
    name: 'Easter Sunday 2027',
    targetIso: '2027-03-28T00:00:00Z',
    description: 'Live countdown to Easter Sunday 2027, the central spring festival celebrating resurrection and renewal.',
    emoji: '🐰',
    culturalNote: 'Commemorated with family meals, egg hunts, church services, and festive confectionery.',
    history: 'Calculated using the computus algorithm: the first Sunday following the full moon after the vernal equinox.',
    firstCelebratedIn: 'New Zealand and Australia at Sunday dawn before moving westward across Europe and the Americas.',
  },
  'super-bowl': {
    slug: 'super-bowl',
    name: 'Super Bowl LXI 2027',
    targetIso: '2027-02-14T23:30:00Z',
    description: 'Live countdown to kickoff for Super Bowl LXI in 2027, the biggest sports and entertainment spectacle of the year.',
    emoji: '🏈',
    culturalNote: 'Attracts over 120 million viewers worldwide for championship football, halftime shows, and iconic commercials.',
    history: 'First contested in January 1967 in Los Angeles between the AFL and NFL champions.',
    firstCelebratedIn: 'Televised live to over 180 countries in dozens of broadcast languages simultaneously.',
  },
  'fourth-of-july': {
    slug: 'fourth-of-july',
    name: '4th of July (Independence Day) 2027',
    targetIso: '2027-07-04T00:00:00Z',
    description: 'Exact countdown to the 4th of July Independence Day fireworks and celebrations in the United States.',
    emoji: '🎆',
    culturalNote: 'The national birthday of the United States, celebrated with barbecues, parades, patriotic concerts, and fireworks.',
    history: 'Commemorates the adoption of the Declaration of Independence by the Second Continental Congress on July 4, 1776.',
    firstCelebratedIn: 'US territories in Guam and the Northern Mariana Islands (UTC+10) before reaching the US mainland.',
  },
  'ramadan': {
    slug: 'ramadan',
    name: 'Ramadan 2027',
    targetIso: '2027-02-08T00:00:00Z',
    description: 'Live countdown to the start of Ramadan 2027, the Islamic sacred month of fasting, prayer, and reflection.',
    emoji: '🌙',
    culturalNote: 'Observed by over 1.8 billion Muslims worldwide with daily fasting from dawn (Fajr) to sunset (Maghrib).',
    history: 'Marks the ninth month of the Islamic lunar calendar when the Quran was first revealed to Prophet Muhammad.',
    firstCelebratedIn: 'Determined by the sighting of the crescent moon across the Middle East, Asia, and North Africa.',
  },
  'eid': {
    slug: 'eid',
    name: 'Eid al-Fitr 2027',
    targetIso: '2027-03-10T00:00:00Z',
    description: 'Track how many days and hours remain until Eid al-Fitr 2027, the joyous festival marking the end of Ramadan fasting.',
    emoji: '✨',
    culturalNote: 'A time of communal prayer, charity (Zakat al-Fitr), visiting relatives, wearing new clothes, and sharing feasts.',
    history: 'Established by Prophet Muhammad in Medina as a festival of gratitude and rejoicing.',
    firstCelebratedIn: 'Commences with the sighting of the Shawwal new crescent moon across the Islamic world.',
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
