import { ALL_IANA_TIMEZONES, IanaTimeZone } from './iana-database';
import { POPULAR_CITIES, City } from '@/lib/geo/cities';

export interface TimezoneAbbrDefinition {
  abbr: string;
  slug: string;
  primaryName: string;
  primaryIana: string;
  offsetStr: string;
  hasDst: boolean;
  notes: string;
  meanings: {
    name: string;
    offsetStr: string;
    iana: string;
    regions: string[];
    description: string;
  }[];
}

export const COMMON_TIMEZONE_ABBREVIATIONS: Record<string, TimezoneAbbrDefinition> = {
  utc: {
    abbr: 'UTC',
    slug: 'utc',
    primaryName: 'Coordinated Universal Time',
    primaryIana: 'UTC',
    offsetStr: 'UTC +0',
    hasDst: false,
    notes: 'The global atomic time standard referenced by all international civil time zones. Never observes Daylight Saving Time.',
    meanings: [
      {
        name: 'Coordinated Universal Time',
        offsetStr: 'UTC +0',
        iana: 'UTC',
        regions: ['International Standard', 'Aviation', 'Scientific Computing'],
        description: 'Primary time standard across the world maintained by international atomic clocks.'
      }
    ]
  },
  gmt: {
    abbr: 'GMT',
    slug: 'gmt',
    primaryName: 'Greenwich Mean Time',
    primaryIana: 'Europe/London',
    offsetStr: 'UTC +0',
    hasDst: true,
    notes: 'Standard solar time at the Royal Observatory in Greenwich, London. In the UK, GMT is observed in winter, switching to British Summer Time (BST, UTC+1) in summer.',
    meanings: [
      {
        name: 'Greenwich Mean Time',
        offsetStr: 'UTC +0',
        iana: 'Europe/London',
        regions: ['United Kingdom', 'Ireland', 'Iceland', 'West Africa'],
        description: 'Civil time standard in the UK and several West African nations.'
      }
    ]
  },
  ist: {
    abbr: 'IST',
    slug: 'ist',
    primaryName: 'India Standard Time',
    primaryIana: 'Asia/Kolkata',
    offsetStr: 'UTC +5:30',
    hasDst: false,
    notes: 'IST is ambiguous and has two major international uses: India Standard Time (UTC+5:30) and Irish Standard Time (UTC+1).',
    meanings: [
      {
        name: 'India Standard Time',
        offsetStr: 'UTC +5:30',
        iana: 'Asia/Kolkata',
        regions: ['India', 'Sri Lanka'],
        description: 'Observed across the entire Republic of India and Sri Lanka with zero daylight saving changes.'
      },
      {
        name: 'Irish Standard Time',
        offsetStr: 'UTC +1',
        iana: 'Europe/Dublin',
        regions: ['Ireland'],
        description: 'Observed in the Republic of Ireland during the summer months from March to October.'
      },
      {
        name: 'Israel Standard Time',
        offsetStr: 'UTC +2',
        iana: 'Asia/Jerusalem',
        regions: ['Israel'],
        description: 'Standard winter time in Israel, switching to IDT (UTC+3) in summer.'
      }
    ]
  },
  est: {
    abbr: 'EST',
    slug: 'est',
    primaryName: 'Eastern Standard Time',
    primaryIana: 'America/New_York',
    offsetStr: 'UTC -5',
    hasDst: true,
    notes: 'Standard winter time across the Eastern United States, Eastern Canada, and the Caribbean. Switches to EDT (UTC-4) in summer.',
    meanings: [
      {
        name: 'Eastern Standard Time (North America)',
        offsetStr: 'UTC -5',
        iana: 'America/New_York',
        regions: ['United States', 'Canada', 'Panama', 'Jamaica'],
        description: 'Standard time for New York, Washington D.C., Toronto, Miami, and Atlanta during autumn/winter.'
      }
    ]
  },
  edt: {
    abbr: 'EDT',
    slug: 'edt',
    primaryName: 'Eastern Daylight Time',
    primaryIana: 'America/New_York',
    offsetStr: 'UTC -4',
    hasDst: true,
    notes: 'Daylight saving time observed in the Eastern US and Canada from the second Sunday in March to the first Sunday in November.',
    meanings: [
      {
        name: 'Eastern Daylight Time',
        offsetStr: 'UTC -4',
        iana: 'America/New_York',
        regions: ['Eastern US', 'Eastern Canada'],
        description: 'Summer daylight saving time for New York, Boston, Toronto, and Miami.'
      }
    ]
  },
  cst: {
    abbr: 'CST',
    slug: 'cst',
    primaryName: 'Central Standard Time',
    primaryIana: 'America/Chicago',
    offsetStr: 'UTC -6',
    hasDst: true,
    notes: 'CST is highly ambiguous: it commonly refers to Central Standard Time in North America (UTC-6), China Standard Time (UTC+8), or Cuba Standard Time (UTC-5).',
    meanings: [
      {
        name: 'Central Standard Time (North America)',
        offsetStr: 'UTC -6',
        iana: 'America/Chicago',
        regions: ['Central US', 'Central Canada', 'Mexico (formerly)'],
        description: 'Winter time observed in Chicago, Dallas, Houston, Mexico City, and Winnipeg.'
      },
      {
        name: 'China Standard Time',
        offsetStr: 'UTC +8',
        iana: 'Asia/Shanghai',
        regions: ['China', 'Taiwan', 'Macau', 'Hong Kong'],
        description: 'The single nationwide standard time observed throughout the People’s Republic of China.'
      },
      {
        name: 'Cuba Standard Time',
        offsetStr: 'UTC -5',
        iana: 'America/Havana',
        regions: ['Cuba'],
        description: 'Winter civil standard time observed in Cuba.'
      }
    ]
  },
  cdt: {
    abbr: 'CDT',
    slug: 'cdt',
    primaryName: 'Central Daylight Time',
    primaryIana: 'America/Chicago',
    offsetStr: 'UTC -5',
    hasDst: true,
    notes: 'Daylight saving time observed in the Central US and Canada from March to November.',
    meanings: [
      {
        name: 'Central Daylight Time',
        offsetStr: 'UTC -5',
        iana: 'America/Chicago',
        regions: ['Central US', 'Central Canada'],
        description: 'Summer daylight saving time for Chicago, Minneapolis, Dallas, and New Orleans.'
      }
    ]
  },
  pst: {
    abbr: 'PST',
    slug: 'pst',
    primaryName: 'Pacific Standard Time',
    primaryIana: 'America/Los_Angeles',
    offsetStr: 'UTC -8',
    hasDst: true,
    notes: 'Standard winter time across the US West Coast and Western Canada. Switches to PDT (UTC-7) in summer.',
    meanings: [
      {
        name: 'Pacific Standard Time',
        offsetStr: 'UTC -8',
        iana: 'America/Los_Angeles',
        regions: ['California', 'Washington', 'Oregon', 'British Columbia'],
        description: 'Winter standard time for Los Angeles, San Francisco, Seattle, and Vancouver.'
      }
    ]
  },
  pdt: {
    abbr: 'PDT',
    slug: 'pdt',
    primaryName: 'Pacific Daylight Time',
    primaryIana: 'America/Los_Angeles',
    offsetStr: 'UTC -7',
    hasDst: true,
    notes: 'Daylight saving time observed in California, Washington, and British Columbia during summer.',
    meanings: [
      {
        name: 'Pacific Daylight Time',
        offsetStr: 'UTC -7',
        iana: 'America/Los_Angeles',
        regions: ['Western US', 'Western Canada'],
        description: 'Summer daylight saving time for Los Angeles, Seattle, San Francisco, and Vancouver.'
      }
    ]
  },
  cet: {
    abbr: 'CET',
    slug: 'cet',
    primaryName: 'Central European Time',
    primaryIana: 'Europe/Paris',
    offsetStr: 'UTC +1',
    hasDst: true,
    notes: 'Observed across the European Union mainland during winter (Paris, Berlin, Rome, Madrid, Warsaw). Switches to CEST (UTC+2) in summer.',
    meanings: [
      {
        name: 'Central European Time',
        offsetStr: 'UTC +1',
        iana: 'Europe/Paris',
        regions: ['France', 'Germany', 'Italy', 'Spain', 'Poland', 'Netherlands', 'Sweden'],
        description: 'Civil winter time in 30+ European nations spanning from Spain to Poland.'
      }
    ]
  },
  cest: {
    abbr: 'CEST',
    slug: 'cest',
    primaryName: 'Central European Summer Time',
    primaryIana: 'Europe/Paris',
    offsetStr: 'UTC +2',
    hasDst: true,
    notes: 'Daylight saving time observed across European mainland countries from late March to late October.',
    meanings: [
      {
        name: 'Central European Summer Time',
        offsetStr: 'UTC +2',
        iana: 'Europe/Paris',
        regions: ['France', 'Germany', 'Italy', 'Spain', 'Switzerland', 'Austria'],
        description: 'Summer daylight saving time across majority of Western and Central Europe.'
      }
    ]
  },
  jst: {
    abbr: 'JST',
    slug: 'jst',
    primaryName: 'Japan Standard Time',
    primaryIana: 'Asia/Tokyo',
    offsetStr: 'UTC +9',
    hasDst: false,
    notes: 'Uniform time observed throughout Japan with no daylight saving time.',
    meanings: [
      {
        name: 'Japan Standard Time',
        offsetStr: 'UTC +9',
        iana: 'Asia/Tokyo',
        regions: ['Japan'],
        description: 'Official national time across Tokyo, Osaka, Kyoto, and all Japanese prefectures.'
      }
    ]
  },
  aest: {
    abbr: 'AEST',
    slug: 'aest',
    primaryName: 'Australian Eastern Standard Time',
    primaryIana: 'Australia/Sydney',
    offsetStr: 'UTC +10',
    hasDst: true,
    notes: 'Observed in eastern Australia (Sydney, Melbourne, Brisbane). Sydney and Melbourne switch to AEDT (UTC+11) in summer, whereas Queensland stays on AEST year-round.',
    meanings: [
      {
        name: 'Australian Eastern Standard Time',
        offsetStr: 'UTC +10',
        iana: 'Australia/Sydney',
        regions: ['New South Wales', 'Victoria', 'Queensland', 'Tasmania', 'ACT'],
        description: 'Eastern Australian standard time.'
      }
    ]
  }
};

// Helper to find IANA zone by slug or identifier with alias resolution
export function findIanaZoneBySlug(slug: string): IanaTimeZone | undefined {
  const norm = slug.toLowerCase().replace(/_/g, '-');

  if (norm === 'asia-kolkata' || norm === 'asia/kolkata' || norm === 'asia-calcutta' || norm === 'asia/calcutta') {
    const calc = ALL_IANA_TIMEZONES.find(z => z.id === 'Asia/Calcutta' || z.slug === 'asia-calcutta');
    if (calc) {
      return {
        ...calc,
        id: 'Asia/Kolkata',
        city: 'Kolkata',
        slug: 'asia-kolkata'
      };
    }
  }

  return ALL_IANA_TIMEZONES.find(z => z.slug === norm || z.id.toLowerCase().replace(/[\/_]/g, '-') === norm || z.id.toLowerCase() === slug.toLowerCase());
}

// Helper to find Abbreviation info
export function findTimezoneAbbr(abbrOrSlug: string): TimezoneAbbrDefinition | undefined {
  const norm = abbrOrSlug.toLowerCase();
  return COMMON_TIMEZONE_ABBREVIATIONS[norm];
}

// Convert url offset slug like 'utc-plus-5-30' or 'utc-minus-5' to formatted offset string 'UTC +5:30'
export function parseOffsetSlug(slug: string): { formattedOffset: string; minutes: number; label: string } | null {
  const norm = slug.toLowerCase();
  const match = norm.match(/^utc-(plus|minus)-(\d+)(?:-(\d+))?$/);
  if (!match) return null;

  const sign = match[1] === 'plus' ? 1 : -1;
  const signStr = match[1] === 'plus' ? '+' : '-';
  const hours = parseInt(match[2], 10);
  const minutes = match[3] ? parseInt(match[3], 10) : 0;

  const totalMinutes = sign * (hours * 60 + minutes);
  const formattedOffset = minutes > 0 ? `UTC ${signStr}${hours}:${minutes.toString().padStart(2, '0')}` : `UTC ${signStr}${hours}`;
  const label = `UTC ${signStr}${hours}${minutes > 0 ? `:${minutes}` : ''}`;

  return { formattedOffset, minutes: totalMinutes, label };
}

// Helper to convert formatted offset string like 'UTC +5:30' to slug 'utc-plus-5-30'
export function offsetToSlug(formattedOffset: string): string {
  if (formattedOffset === 'UTC +0' || formattedOffset === 'UTC -0' || formattedOffset === 'UTC 0') {
    return 'utc-plus-0';
  }
  const clean = formattedOffset.replace('UTC', '').trim();
  const isMinus = clean.startsWith('-');
  const raw = clean.replace(/^[+-]/, '');
  const [h, m] = raw.split(':');
  const dir = isMinus ? 'minus' : 'plus';
  return m ? `utc-${dir}-${h}-${m}` : `utc-${dir}-${h}`;
}

// Helper to find all cities and IANA zones belonging to a given offset
export function getLocationsForOffset(formattedOffset: string) {
  const matchingZones = ALL_IANA_TIMEZONES.filter(z => z.formattedOffset === formattedOffset);
  const matchingCities = POPULAR_CITIES.filter(c => {
    return matchingZones.some(z => z.id === c.timezone || (z.id === 'Asia/Calcutta' && c.timezone === 'Asia/Kolkata'));
  });
  return { zones: matchingZones, cities: matchingCities };
}
