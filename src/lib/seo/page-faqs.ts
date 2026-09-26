import { City } from '@/lib/geo/cities';
import { TimeZoneInfo, getOffsetMinutes, getUtcOffsetString, getTimeDifference, isDstActive } from '@/lib/time/timezones';
import { Country } from '@/lib/geo/countries';

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

// -------------------------------------------------------------
// Temporal Helper Functions (Mathematical Time Rules)
// -------------------------------------------------------------

export function formatHourAmPm(hour24: number): string {
  const normalized = ((hour24 % 24) + 24) % 24;
  const h = Math.floor(normalized);
  const m = Math.round((normalized - h) * 60);
  const period = h >= 12 ? 'PM' : 'AM';
  const displayH = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${displayH}:00 ${period}` : `${displayH}:${String(m).padStart(2, '0')} ${period}`;
}

export interface CityTimeData {
  cityName: string;
  country: string;
  baseOffset: string; // e.g., "UTC+5:30"
  timezoneAbbr: string; // e.g., "IST"
  observesDST: boolean;
  nextDSTChange?: string; // e.g., "March 8, 2026"
  dstAction?: 'forward' | 'backward';
  timeDifferenceToUTC: string;
  countryCode?: string;
  timezone?: string;
  offsetMinutes?: number;
  isDstCurrentlyActive?: boolean;
  dstScheduleNote?: string;
  businessContext?: string;
}

export function getCityTemporalData(city: City, date = new Date()): CityTimeData {
  const offsetMinutes = getOffsetMinutes(date, city.timezone);
  const baseOffset = getUtcOffsetString(date, city.timezone);

  // Derive active timezone abbreviation (e.g., EDT, EST, BST, GMT, IST, JST)
  let timezoneAbbr = city.timezone.split('/').pop()?.replace(/_/g, ' ') || 'Local Time';
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: city.timezone,
      timeZoneName: 'short',
    });
    const parts = formatter.formatToParts(date);
    const tzPart = parts.find((p) => p.type === 'timeZoneName');
    if (tzPart && tzPart.value) {
      timezoneAbbr = tzPart.value;
    }
  } catch {}

  // Detect whether location observes DST by comparing January and July offsets
  const year = date.getFullYear();
  const janOffset = getOffsetMinutes(new Date(year, 0, 15), city.timezone);
  const julOffset = getOffsetMinutes(new Date(year, 6, 15), city.timezone);
  const observesDST = janOffset !== julOffset;
  const isDstCurrentlyActive = isDstActive(date, city.timezone);

  // Calculate time difference relative to UTC
  let timeDifferenceToUTC = 'identical to';
  if (offsetMinutes > 0) {
    const h = Math.floor(offsetMinutes / 60);
    const m = offsetMinutes % 60;
    timeDifferenceToUTC = `${h} hour${h === 1 ? '' : 's'}${m > 0 ? ` and ${m} minutes` : ''} ahead of`;
  } else if (offsetMinutes < 0) {
    const absM = Math.abs(offsetMinutes);
    const h = Math.floor(absM / 60);
    const m = absM % 60;
    timeDifferenceToUTC = `${h} hour${h === 1 ? '' : 's'}${m > 0 ? ` and ${m} minutes` : ''} behind`;
  }

  // Calculate location-specific DST schedule
  let nextDSTChange: string | undefined;
  let dstAction: 'forward' | 'backward' | undefined;
  let dstScheduleNote: string | undefined;

  if (observesDST) {
    const cc = city.countryCode.toUpperCase();
    if (cc === 'US' || cc === 'CA') {
      dstScheduleNote = 'Clocks spring forward 1 hour on the second Sunday in March (March 8, 2026 at 02:00 AM) and fall back on the first Sunday in November (November 1, 2026).';
      if (isDstCurrentlyActive) {
        nextDSTChange = `November 1, ${year}`;
        dstAction = 'backward';
      } else {
        nextDSTChange = `March 8, ${year}`;
        dstAction = 'forward';
      }
    } else if (['GB', 'UK', 'FR', 'DE', 'IT', 'ES', 'NL', 'BE', 'CH', 'AT', 'SE', 'NO', 'DK', 'PL', 'IE', 'PT'].includes(cc)) {
      dstScheduleNote = 'Clocks spring forward 1 hour on the last Sunday in March (March 29, 2026 at 01:00 AM) and fall back to GMT on the last Sunday in October (October 25, 2026).';
      if (isDstCurrentlyActive) {
        nextDSTChange = `October 25, ${year}`;
        dstAction = 'backward';
      } else {
        nextDSTChange = `March 29, ${year}`;
        dstAction = 'forward';
      }
    } else if (cc === 'AU' || cc === 'NZ') {
      dstScheduleNote = 'Southern Hemisphere schedule: clocks fall back 1 hour on the first Sunday in April (April 5, 2026) and spring forward on the first Sunday in October (October 4, 2026).';
      if (isDstCurrentlyActive) {
        nextDSTChange = `April 5, ${year}`;
        dstAction = 'backward';
      } else {
        nextDSTChange = `October 4, ${year}`;
        dstAction = 'forward';
      }
    } else {
      nextDSTChange = isDstCurrentlyActive ? `Autumn ${year}` : `Spring ${year}`;
      dstAction = isDstCurrentlyActive ? 'backward' : 'forward';
      dstScheduleNote = `Seasonal clock shifts adjust civil time by 1 hour between summer and winter schedules.`;
    }
  }

  // Contextual international business overlap
  let businessContext = '';
  if (offsetMinutes >= -600 && offsetMinutes <= -180) {
    // Americas
    businessContext = `Offices in ${city.name} typically operate between 9:00 AM and 5:00 PM ${timezoneAbbr}. This schedule provides a direct morning overlap with European financial markets (such as London and Frankfurt) between 9:00 AM and 12:00 PM local time.`;
  } else if (offsetMinutes >= -60 && offsetMinutes <= 180) {
    // Europe & Africa
    businessContext = `Standard corporate working hours in ${city.name} run from 9:00 AM to 5:00 PM or 6:00 PM ${timezoneAbbr}. This allows synchronous business communication with North American East Coast hubs in the afternoon, as well as early morning overlap with East Asian financial hubs.`;
  } else {
    // Asia & Pacific
    businessContext = `Business hours in ${city.name} run from 9:00 AM to 6:00 PM ${timezoneAbbr}, offering full-day synchronous collaboration with major regional financial centers across the Asia-Pacific corridor.`;
  }

  return {
    cityName: city.name,
    country: city.country,
    countryCode: city.countryCode,
    timezone: city.timezone,
    timezoneAbbr,
    baseOffset,
    offsetMinutes,
    timeDifferenceToUTC,
    observesDST,
    isDstCurrentlyActive,
    nextDSTChange,
    dstAction,
    dstScheduleNote,
    businessContext,
  };
}

// -------------------------------------------------------------
// 1. Data-Driven City FAQs (No Spun Text — 100% Mathematical)
// -------------------------------------------------------------

export function getCityFaqs(input: CityTimeData | City): FaqItem[] {
  const data: CityTimeData = 'cityName' in input && !('lat' in input)
    ? (input as CityTimeData)
    : getCityTemporalData(input as City);

  const faqs: FaqItem[] = [];

  // FAQ 1: Highly specific timezone breakdown
  faqs.push({
    question: `What time zone is ${data.cityName}, ${data.country} in?`,
    answer: `${data.cityName} operates in the ${data.timezoneAbbr} time zone, which is ${data.baseOffset}. ${
      data.observesDST
        ? `Because ${data.cityName} observes Daylight Saving Time, this offset changes during the summer months.`
        : `Unlike some regions, ${data.cityName} does not observe Daylight Saving Time, meaning this offset remains constant year-round.`
    }`,
  });

  // FAQ 2: Dynamic DST Data (Only injects if DST applies)
  if (data.observesDST && data.nextDSTChange) {
    faqs.push({
      question: `When does Daylight Saving Time start or end in ${data.cityName}?`,
      answer: `The next time change in ${data.cityName} occurs on ${data.nextDSTChange}. Residents will need to move their clocks ${data.dstAction} by one hour.${data.dstScheduleNote ? ` ${data.dstScheduleNote}` : ''}`,
    });
  } else if (!data.observesDST) {
    faqs.push({
      question: `Does ${data.cityName} observe Daylight Saving Time?`,
      answer: `No. Unlike regions in Europe and North America, ${data.cityName} does not observe Daylight Saving Time, meaning this offset remains constant year-round. Clocks in ${data.cityName} do not spring forward or fall back, providing continuous, uninterrupted ${data.baseOffset} timekeeping year-round.`,
    });
  }

  // FAQ 3: Business contextual data
  faqs.push({
    question: `How far ahead or behind is ${data.cityName} compared to UTC?`,
    answer: `The local time in ${data.cityName} is exactly ${data.timeDifferenceToUTC} Coordinated Universal Time (UTC).${data.offsetMinutes !== undefined ? ` For example, when it is 12:00 PM (Noon) UTC, it is ${formatHourAmPm(12 + data.offsetMinutes / 60)} in ${data.cityName}.` : ''}`,
  });

  // FAQ 4: International business and office hours
  if (data.businessContext) {
    faqs.push({
      question: `What are typical business and office hours in ${data.cityName}?`,
      answer: data.businessContext,
    });
  }

  return faqs;
}

// -------------------------------------------------------------
// 2. Data-Driven City Difference & Converter FAQs
// -------------------------------------------------------------

export function getCityDifferenceData(cityA: City, cityB: City, date = new Date()) {
  const diff = getTimeDifference(cityA.timezone, cityB.timezone, date);
  const diffHours = diff.diffHours;

  let relationshipText = '';
  if (diff.isEqual) {
    relationshipText = `${cityB.name} and ${cityA.name} are in the same time zone (${getUtcOffsetString(date, cityA.timezone)}). There is zero time difference.`;
  } else if (diff.isAhead) {
    relationshipText = `${cityB.name} is exactly ${diff.formatted} of ${cityA.name}.`;
  } else {
    relationshipText = `${cityB.name} is exactly ${diff.formatted} of ${cityA.name}.`;
  }

  // Compute 9:00 AM - 5:00 PM business overlap
  const startB = Math.max(9, 9 + diffHours);
  const endB = Math.min(17, 17 + diffHours);

  let meetingWindowText = '';
  let overlapDurationHours = 0;

  if (startB < endB) {
    overlapDurationHours = endB - startB;
    const startA = startB - diffHours;
    const endA = endB - diffHours;
    meetingWindowText = `Based on standard working hours (9:00 AM – 5:00 PM), the optimal window for a mutual meeting is between ${formatHourAmPm(startA)} and ${formatHourAmPm(endA)} in ${cityA.name}, which corresponds to ${formatHourAmPm(startB)} and ${formatHourAmPm(endB)} in ${cityB.name} (${overlapDurationHours} overlapping hour${overlapDurationHours === 1 ? '' : 's'}).`;
  } else {
    const morningA = 8;
    const morningB = morningA + diffHours;
    meetingWindowText = `Because ${cityA.name} and ${cityB.name} are separated by ${Math.abs(diffHours)} hours, standard 9:00 AM – 5:00 PM business hours do not directly overlap. The most practical collaboration window is early morning in ${cityA.name} (${formatHourAmPm(morningA)}) corresponding to ${formatHourAmPm(morningB)} in ${cityB.name}, or using asynchronous communication.`;
  }

  // Check DST interaction between the two cities
  const year = date.getFullYear();
  const aObserves = getOffsetMinutes(new Date(year, 0, 15), cityA.timezone) !== getOffsetMinutes(new Date(year, 6, 15), cityA.timezone);
  const bObserves = getOffsetMinutes(new Date(year, 0, 15), cityB.timezone) !== getOffsetMinutes(new Date(year, 6, 15), cityB.timezone);

  let dstInteractionText = '';
  if (!aObserves && !bObserves) {
    dstInteractionText = `Neither ${cityA.name} nor ${cityB.name} observes Daylight Saving Time. The ${Math.abs(diffHours)}-hour difference between them remains identical every day of the year.`;
  } else if (aObserves && bObserves) {
    dstInteractionText = `Both ${cityA.name} and ${cityB.name} observe Daylight Saving Time. However, if their transition dates differ (such as North America in early March vs. Europe in late March), the gap temporarily shifts by 1 hour for several weeks each spring and autumn.`;
  } else {
    const observingCity = aObserves ? cityA.name : cityB.name;
    const nonObservingCity = aObserves ? cityB.name : cityA.name;
    dstInteractionText = `Because ${observingCity} observes Daylight Saving Time while ${nonObservingCity} stays on permanent standard time, their time difference fluctuates by 1 hour between summer and winter.`;
  }

  return {
    diff,
    diffHours,
    relationshipText,
    meetingWindowText,
    overlapDurationHours,
    dstInteractionText,
  };
}

export function getCityDifferenceFaqs(cityA: City, cityB: City): FaqItem[] {
  const data = getCityDifferenceData(cityA, cityB);

  return [
    {
      question: `What is the exact time difference between ${cityA.name} and ${cityB.name}?`,
      answer: data.relationshipText,
    },
    {
      question: `When is the best time for a meeting between ${cityA.name} and ${cityB.name}?`,
      answer: data.meetingWindowText,
    },
    {
      question: `Does the time difference between ${cityA.name} and ${cityB.name} change during Daylight Saving Time?`,
      answer: data.dstInteractionText,
    },
    {
      question: `How do I quickly convert a specific hour between ${cityA.name} and ${cityB.name}?`,
      answer: `Use the interactive 24-hour visual slider table above. Scrubbing across any hour instantly reveals the matching local time in both locations, complete with day/night status and business availability indicators.`,
    },
  ];
}

// -------------------------------------------------------------
// 3. Data-Driven Timezone Combinations (e.g. EDT to IST)
// -------------------------------------------------------------

export interface TimezoneComboData {
  fromAbbr: string;
  fromName: string;
  fromOffset: string;
  toAbbr: string;
  toName: string;
  toOffset: string;
  diffMinutes: number;
  diffHours: number;
  diffFormatted: string;
  isEqual: boolean;
  relationshipText: string;
  meetingWindowText: string;
  overlapHours: number;
  dstText: string;
}

export function getTimezoneComboData(
  fromTz: { abbr: string; primaryName: string; primaryIana: string; offsetStr: string; hasDst: boolean },
  toTz: { abbr: string; primaryName: string; primaryIana: string; offsetStr: string; hasDst: boolean },
  date = new Date()
): TimezoneComboData {
  const fromOffsetMins = getOffsetMinutes(date, fromTz.primaryIana);
  const toOffsetMins = getOffsetMinutes(date, toTz.primaryIana);
  const diffMinutes = toOffsetMins - fromOffsetMins;
  const diffHours = diffMinutes / 60;
  const absMins = Math.abs(diffMinutes);
  const h = Math.floor(absMins / 60);
  const m = absMins % 60;

  const isEqual = diffMinutes === 0;
  let diffFormatted = 'identical';
  let relationshipText = '';

  if (isEqual) {
    relationshipText = `${toTz.abbr} and ${fromTz.abbr} operate on the identical standard offset (${toTz.offsetStr}). There is zero time difference.`;
  } else {
    const parts = [];
    if (h > 0) parts.push(`${h} hour${h === 1 ? '' : 's'}`);
    if (m > 0) parts.push(`${m} minutes`);
    diffFormatted = `${parts.join(' and ')} ${diffMinutes > 0 ? 'ahead of' : 'behind'}`;
    relationshipText = `${toTz.abbr} (${toTz.primaryName}) is exactly ${diffFormatted} ${fromTz.abbr} (${fromTz.primaryName}).`;
  }

  // Calculate 9:00 AM - 5:00 PM mutual business hours overlap
  const startTo = Math.max(9, 9 + diffHours);
  const endTo = Math.min(17, 17 + diffHours);
  let overlapHours = 0;
  let meetingWindowText = '';

  if (startTo < endTo) {
    overlapHours = endTo - startTo;
    const startFrom = startTo - diffHours;
    const endFrom = endTo - diffHours;
    meetingWindowText = `Based on standard working hours (9:00 AM – 5:00 PM), the optimal window for a mutual meeting is between ${formatHourAmPm(startFrom)} and ${formatHourAmPm(endFrom)} in ${fromTz.abbr}, which corresponds to ${formatHourAmPm(startTo)} and ${formatHourAmPm(endTo)} in ${toTz.abbr} (${overlapHours} overlapping hour${overlapHours === 1 ? '' : 's'}).`;
  } else {
    overlapHours = 0;
    meetingWindowText = `Because ${fromTz.abbr} and ${toTz.abbr} are separated by ${Math.abs(diffHours)} hours, standard 9:00 AM – 5:00 PM business hours do not directly overlap. The most practical collaboration times are early morning slots or asynchronous communication.`;
  }

  // DST interaction
  let dstText = '';
  if (!fromTz.hasDst && !toTz.hasDst) {
    dstText = `Neither ${fromTz.abbr} nor ${toTz.abbr} observes Daylight Saving Time. The time difference between them remains identical year-round.`;
  } else if (fromTz.hasDst && toTz.hasDst) {
    dstText = `Both ${fromTz.abbr} and ${toTz.abbr} observe Daylight Saving Time. When transition dates differ (such as North America in early March vs. Europe in late March), the gap temporarily shifts by 1 hour for several weeks each spring and autumn.`;
  } else {
    const obs = fromTz.hasDst ? fromTz.abbr : toTz.abbr;
    const non = fromTz.hasDst ? toTz.abbr : fromTz.abbr;
    dstText = `Because ${obs} observes Daylight Saving Time while ${non} maintains a fixed offset year-round, their relative time difference changes by 1 hour between summer and winter seasons.`;
  }

  return {
    fromAbbr: fromTz.abbr,
    fromName: fromTz.primaryName,
    fromOffset: fromTz.offsetStr,
    toAbbr: toTz.abbr,
    toName: toTz.primaryName,
    toOffset: toTz.offsetStr,
    diffMinutes,
    diffHours,
    diffFormatted,
    isEqual,
    relationshipText,
    meetingWindowText,
    overlapHours,
    dstText,
  };
}

export function getTimezoneComboFaqs(
  fromTz: { abbr: string; primaryName: string; primaryIana: string; offsetStr: string; hasDst: boolean },
  toTz: { abbr: string; primaryName: string; primaryIana: string; offsetStr: string; hasDst: boolean }
): FaqItem[] {
  const data = getTimezoneComboData(fromTz, toTz);

  return [
    {
      question: `What is the current time difference between ${fromTz.abbr} and ${toTz.abbr}?`,
      answer: data.relationshipText,
    },
    {
      question: `When is the best time for a meeting between ${fromTz.abbr} and ${toTz.abbr}?`,
      answer: data.meetingWindowText,
    },
    {
      question: `Do clocks shift for Daylight Saving Time in ${fromTz.abbr} or ${toTz.abbr}?`,
      answer: data.dstText,
    },
    {
      question: `How do I quickly convert a specific hour between ${fromTz.abbr} and ${toTz.abbr}?`,
      answer: `Use the interactive 24-hour visual comparison grid above. Selecting or scrubbing any hour instantly displays the corresponding time in both time zones, with working hours color-coded and 1-click calendar sync.`,
    },
  ];
}

// -------------------------------------------------------------
// 3. Data-Driven Timezone FAQs
// -------------------------------------------------------------

export function getTimezoneFaqs(tz: TimeZoneInfo): FaqItem[] {
  const isAhead = tz.utcOffsetMinutes > 0;
  const isBehind = tz.utcOffsetMinutes < 0;
  const absHours = Math.abs(tz.utcOffsetMinutes) / 60;

  let offsetSentence = 'identical to Coordinated Universal Time (UTC+0)';
  if (isAhead) offsetSentence = `${absHours} hours ahead of UTC`;
  if (isBehind) offsetSentence = `${absHours} hours behind UTC`;

  return [
    {
      question: `What does ${tz.shortName} stand for and what is its UTC offset?`,
      answer: `${tz.shortName} stands for ${tz.name}. Its standard civil time is ${tz.formattedOffset} (${offsetSentence}).`,
    },
    {
      question: `Which countries and major hubs observe ${tz.shortName}?`,
      answer: `Major regions and countries observing ${tz.shortName} include ${tz.countries.join(', ')}. Millions of people organize transport networks, financial settlements, and daily business around this standard.`,
    },
    {
      question: `Does ${tz.shortName} change for Daylight Saving Time?`,
      answer: tz.hasDst
        ? `${tz.shortName} shifts seasonally for Daylight Saving Time in observing jurisdictions, typically advancing clocks by 1 hour in spring and returning to standard time in autumn.`
        : `${tz.shortName} does not observe Daylight Saving Time. It remains on a fixed, constant offset throughout all 365 days of the year.`,
    },
    {
      question: `How do I convert ${tz.shortName} to other world time zones?`,
      answer: `Browse our visual Time Zone Converter directory to compare ${tz.shortName} with all 552 global timezone pairings across a synchronized 24-hour interactive grid.`,
    },
  ];
}

// -------------------------------------------------------------
// 4. Data-Driven Country FAQs
// -------------------------------------------------------------

export function getCountryFaqs(country: Country): FaqItem[] {
  const isMultiZone = country.timezones.length > 1;

  return [
    {
      question: `What is the current time in the capital of ${country.name}?`,
      answer: `The official capital of ${country.name} is ${country.capital}, operating in the ${country.timezones[0]} time zone. You can view the live atomic second clock for ${country.capital} above.`,
    },
    {
      question: `How many time zones does ${country.name} span?`,
      answer: isMultiZone
        ? `${country.name} is a multi-timezone nation spanning ${country.timezones.length} official time zones: ${country.timezones.join(', ')}. When scheduling communications across different provinces, check the local zone carefully.`
        : `${country.name} observes a single national time zone (${country.timezones[0]}), meaning all cities and regions share the identical clock time nationwide.`,
    },
    {
      question: `What international codes and currency are used in ${country.name}?`,
      answer: `${country.name} uses the ${country.currency} currency. Its ISO two-letter country code is ${country.code}.`,
    },
  ];
}

// -------------------------------------------------------------
// 5. Tool-Specific High-Intent FAQs (Preserved)
// -------------------------------------------------------------

export const HOME_FAQS: FaqItem[] = [
  {
    question: "How accurate is the atomic clock on TimeNumbers?",
    answer: "TimeNumbers syncs directly with global Stratum-1 Network Time Protocol (NTP) servers linked to cesium atomic clocks. Under typical broadband or 5G connections, the display synchronizes within roughly 5 to 15 milliseconds of Coordinated Universal Time (UTC). This precision makes it ideal for regulating mechanical timepieces, tracking auction snipes, timing radio broadcasts, and validating server system clocks.",
  },
  {
    question: "How does TimeNumbers detect my device's clock drift?",
    answer: "When the page loads, your browser exchanges several timestamp packets with our origin servers. By calculating the network transit delay (round-trip time), our script measures the offset between your operating system's internal clock and true UTC. If your device runs 1.8 seconds fast or 400 milliseconds slow, we adjust the on-screen clock dynamically so you see the exact civil second without changing your system settings.",
  },
  {
    question: "What is the difference between UTC and GMT?",
    answer: "UTC (Coordinated Universal Time) is a scientific time standard maintained by atomic clocks worldwide, adjusted occasionally by leap seconds. GMT (Greenwich Mean Time) is an astronomical civil time zone based on the mean solar day at the Royal Observatory in Greenwich, London. While they share the identical hour, minute, and second throughout the year, UTC serves as the international baseline for technical protocols, while GMT operates as a legal timezone across parts of Europe and Africa. Neither observes Daylight Saving Time.",
  },
  {
    question: "How does the meeting planner find overlapping working hours?",
    answer: "Add two or more cities, and the tool builds a synchronized 24-hour timeline mapped across each participant's local timezone. Normal business hours (typically 9:00 AM to 5:00 PM) appear in green, early morning and evening shoulder hours appear in amber, and nighttime hours show in muted gray. You can drag the cursor across any slot to find an hour where everyone is awake and working—eliminating scheduling friction across remote teams.",
  },
  {
    question: "When do clocks change for Daylight Saving Time in 2026 and 2027?",
    answer: "In the United States and Canada, clocks spring forward one hour on the second Sunday in March (March 8, 2026 / March 14, 2027) and fall back on the first Sunday in November (November 1, 2026 / November 7, 2027). In the United Kingdom and the European Union, clocks advance one hour on the last Sunday in March (March 29, 2026 / March 28, 2027) and revert on the last Sunday in October (October 25, 2026 / October 31, 2027). Arizona (except the Navajo Nation), Hawaii, and Saskatchewan remain on standard time year-round.",
  },
  {
    question: "Can I embed TimeNumbers clock widgets on my website?",
    answer: "Yes. Head over to /widgets to generate embed code for any of our 500+ tracked cities. You can toggle between 12-hour AM/PM and 24-hour military notation, switch between dark and light themes, and copy the lightweight, responsive HTML snippet directly into your site, dashboard, or internal company wiki.",
  },
];

export const MEETING_PLANNER_FAQS: FaqItem[] = [
  {
    question: "How does the international meeting planner find the best call time?",
    answer: "Our planner lays out the typical 9:00 AM to 5:00 PM working hours for every participant side-by-side on a synchronized 24-hour strip. It automatically highlights the shared green overlap hours where no one has to wake up early or stay up late.",
  },
  {
    question: "Can I export my selected meeting slot to Google Calendar or Outlook?",
    answer: "Yes! Once you pick an hour, click either 'Google Calendar' or 'Download .ics' to create an instant event invite with all regional times clearly labeled for your attendees.",
  },
  {
    question: "What if our team members have zero overlapping daytime hours?",
    answer: "When teams are separated by 10 to 12 hours (like San Francisco and Singapore), a daytime overlap may not exist. In those cases, teams typically alternate who takes an early morning or evening call each week, or use asynchronous video and chat updates.",
  },
];

export const TIME_DIFFERENCE_FAQS: FaqItem[] = [
  {
    question: "How do I calculate the time difference between two cities?",
    answer: "Find the UTC offset for each location and subtract the earlier time from the later time. TimeNumbers computes this automatically, taking into account any active daylight saving shifts so you never have to do mental math.",
  },
  {
    question: "Why does the time difference between London and New York change in March?",
    answer: "The United States switches to Daylight Saving Time on the second Sunday in March, while the United Kingdom switches to British Summer Time on the last Sunday in March. During those few weeks in between, the gap shrinks from 5 hours down to 4 hours.",
  },
];

export const DST_FAQS: FaqItem[] = [
  {
    question: "When do clocks spring forward and fall back?",
    answer: "In North America, clocks spring forward 1 hour on the second Sunday in March and fall back on the first Sunday in November. In Europe and the UK, clocks spring forward on the last Sunday in March and fall back on the last Sunday in October.",
  },
  {
    question: "Which major countries do not observe Daylight Saving Time?",
    answer: "Over 100 countries never change their clocks, including Japan, India, China, Singapore, Brazil, Saudi Arabia, and most nations near the equator where daylight remains relatively steady throughout the year.",
  },
  {
    question: "Why do some regions want to end Daylight Saving Time?",
    answer: "Health studies have found that sudden one-hour clock shifts disrupt sleep rhythms and lead to short-term spikes in heart attacks, fatigue, and road accidents in the days following the spring change. Many legislatures are considering permanent standard time.",
  },
];

export const UNIX_TIME_FAQS: FaqItem[] = [
  {
    question: "What is a Unix timestamp?",
    answer: "A Unix timestamp is simply the total number of seconds that have passed since midnight UTC on January 1, 1970 (known as the Unix Epoch). It gives programmers a universal, timezone-independent way to store dates in databases and software.",
  },
  {
    question: "What is the Year 2038 Problem (Y2K38)?",
    answer: "Older 32-bit computer systems store time using numbers that max out at 2,147,483,647 seconds. On January 19, 2038, that counter will roll over to a negative number, potentially confusing legacy systems unless they are upgraded to modern 64-bit timestamps.",
  },
];

export const CLOCK_ACCURACY_FAQS: FaqItem[] = [
  {
    question: "How does TimeNumbers achieve atomic clock precision in a web browser?",
    answer: "While web browsers cannot talk to atomic clocks directly, TimeNumbers continuously measures the round-trip signal time between your device and official Stratum-1 time servers. By compensating for network delay, we display the true atomic second within roughly 10 milliseconds.",
  },
  {
    question: "What is a Stratum-1 atomic time server?",
    answer: "A Stratum-1 time server is connected directly to physical atomic clocks—such as cesium beam standards, rubidium oscillators, or GPS satellite constellations—delivering the gold standard of global timekeeping.",
  },
];
