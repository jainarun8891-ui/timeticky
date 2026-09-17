const fs = require('fs');
const path = require('path');

function write(relPath, content) {
  const fullPath = path.join(__dirname, '..', relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf8');
  console.log('Wrote:', relPath);
}

// 4. timezones.ts
write('src/lib/time/timezones.ts', `
export interface TimeZoneInfo {
  id: string;
  name: string;
  shortName: string;
  utcOffsetMinutes: number;
  formattedOffset: string;
  hasDst: boolean;
  region: "Africa" | "Americas" | "Asia" | "Atlantic" | "Australia" | "Europe" | "Indian" | "Pacific" | "UTC";
  isAmbiguous?: boolean;
  ambiguityNote?: string;
  countries: string[];
}

export const TIMEZONES: TimeZoneInfo[] = [
  {
    id: "UTC",
    name: "Coordinated Universal Time",
    shortName: "UTC",
    utcOffsetMinutes: 0,
    formattedOffset: "UTC +0",
    hasDst: false,
    region: "UTC",
    countries: ["International"]
  },
  {
    id: "Europe/Paris",
    name: "Central European Time",
    shortName: "CET",
    utcOffsetMinutes: 60,
    formattedOffset: "UTC +1",
    hasDst: true,
    region: "Europe",
    countries: ["France", "Germany", "Italy", "Spain", "Netherlands", "Belgium", "Switzerland", "Austria"]
  },
  {
    id: "Europe/London",
    name: "Greenwich Mean Time / British Summer Time",
    shortName: "GMT",
    utcOffsetMinutes: 0,
    formattedOffset: "UTC +0",
    hasDst: true,
    region: "Europe",
    countries: ["United Kingdom", "Ireland", "Portugal"]
  },
  {
    id: "America/New_York",
    name: "Eastern Time",
    shortName: "ET",
    utcOffsetMinutes: -300,
    formattedOffset: "UTC -5",
    hasDst: true,
    region: "Americas",
    countries: ["United States", "Canada"]
  },
  {
    id: "America/Chicago",
    name: "Central Time",
    shortName: "CT",
    utcOffsetMinutes: -360,
    formattedOffset: "UTC -6",
    hasDst: true,
    region: "Americas",
    countries: ["United States", "Canada", "Mexico"]
  },
  {
    id: "America/Denver",
    name: "Mountain Time",
    shortName: "MT",
    utcOffsetMinutes: -420,
    formattedOffset: "UTC -7",
    hasDst: true,
    region: "Americas",
    countries: ["United States", "Canada"]
  },
  {
    id: "America/Los_Angeles",
    name: "Pacific Time",
    shortName: "PT",
    utcOffsetMinutes: -480,
    formattedOffset: "UTC -8",
    hasDst: true,
    region: "Americas",
    countries: ["United States", "Canada"]
  },
  {
    id: "Asia/Kolkata",
    name: "India Standard Time",
    shortName: "IST",
    utcOffsetMinutes: 330,
    formattedOffset: "UTC +5:30",
    hasDst: false,
    region: "Asia",
    isAmbiguous: true,
    ambiguityNote: "IST can also refer to Irish Standard Time (UTC+1) or Israel Standard Time (UTC+2).",
    countries: ["India"]
  },
  {
    id: "Asia/Tokyo",
    name: "Japan Standard Time",
    shortName: "JST",
    utcOffsetMinutes: 540,
    formattedOffset: "UTC +9",
    hasDst: false,
    region: "Asia",
    countries: ["Japan"]
  },
  {
    id: "Asia/Dubai",
    name: "Gulf Standard Time",
    shortName: "GST",
    utcOffsetMinutes: 240,
    formattedOffset: "UTC +4",
    hasDst: false,
    region: "Asia",
    countries: ["United Arab Emirates", "Oman"]
  },
  {
    id: "Australia/Sydney",
    name: "Australian Eastern Time",
    shortName: "AET",
    utcOffsetMinutes: 600,
    formattedOffset: "UTC +10",
    hasDst: true,
    region: "Australia",
    countries: ["Australia"]
  },
  {
    id: "Asia/Singapore",
    name: "Singapore Standard Time",
    shortName: "SGT",
    utcOffsetMinutes: 480,
    formattedOffset: "UTC +8",
    hasDst: false,
    region: "Asia",
    countries: ["Singapore"]
  },
  {
    id: "Asia/Hong_Kong",
    name: "Hong Kong Time",
    shortName: "HKT",
    utcOffsetMinutes: 480,
    formattedOffset: "UTC +8",
    hasDst: false,
    region: "Asia",
    countries: ["Hong Kong"]
  },
  {
    id: "Asia/Kathmandu",
    name: "Nepal Time",
    shortName: "NPT",
    utcOffsetMinutes: 345,
    formattedOffset: "UTC +5:45",
    hasDst: false,
    region: "Asia",
    countries: ["Nepal"]
  },
  {
    id: "Africa/Cairo",
    name: "Eastern European Time",
    shortName: "EET",
    utcOffsetMinutes: 120,
    formattedOffset: "UTC +2",
    hasDst: true,
    region: "Africa",
    countries: ["Egypt"]
  },
  {
    id: "America/Sao_Paulo",
    name: "Brasília Time",
    shortName: "BRT",
    utcOffsetMinutes: -180,
    formattedOffset: "UTC -3",
    hasDst: false,
    region: "Americas",
    countries: ["Brazil"]
  }
];

export function getTimeZoneBySlug(slug: string): TimeZoneInfo | undefined {
  const norm = slug.toLowerCase().replace(/_/g, "-");
  return TIMEZONES.find(t => 
    t.id.toLowerCase().replace(/[\/_]/g, "-") === norm ||
    t.shortName.toLowerCase() === norm ||
    t.name.toLowerCase().replace(/[\s\/_]+/g, "-") === norm
  );
}

export function formatTimeInZone(date: Date, timezone: string, hour12 = false, showSeconds = true): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: showSeconds ? "2-digit" : undefined,
      hour12: hour12
    }).format(date);
  } catch (e) {
    return date.toTimeString().split(" ")[0];
  }
}

export function formatDateInZone(date: Date, timezone: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(date);
  } catch (e) {
    return date.toDateString();
  }
}

export function getUtcOffsetString(date: Date, timezone: string): string {
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      timeZoneName: "shortOffset"
    }).formatToParts(date);
    const tzPart = parts.find(p => p.type === "timeZoneName");
    if (tzPart && tzPart.value) {
      return tzPart.value.replace("GMT", "UTC ");
    }
  } catch (e) {}
  return "UTC +0";
}

export function isDstActive(date: Date, timezone: string): boolean {
  try {
    const jan = new Date(date.getFullYear(), 0, 1);
    const jul = new Date(date.getFullYear(), 6, 1);
    const janOffset = getOffsetMinutes(jan, timezone);
    const julOffset = getOffsetMinutes(jul, timezone);
    if (janOffset === julOffset) return false;
    const currentOffset = getOffsetMinutes(date, timezone);
    const maxOffset = Math.max(janOffset, julOffset);
    return currentOffset === maxOffset;
  } catch (e) {
    return false;
  }
}

export function getOffsetMinutes(date: Date, timezone: string): number {
  try {
    const str = date.toLocaleString("en-US", { timeZone: timezone });
    const localDate = new Date(str);
    return Math.round((localDate.getTime() - date.getTime()) / 60000);
  } catch (e) {
    return 0;
  }
}

export function getTimeDifference(tz1: string, tz2: string, date = new Date()): {
  diffMinutes: number;
  diffHours: number;
  formatted: string;
  isAhead: boolean;
  isEqual: boolean;
} {
  const off1 = getOffsetMinutes(date, tz1);
  const off2 = getOffsetMinutes(date, tz2);
  const diffMinutes = off2 - off1;
  const absMinutes = Math.abs(diffMinutes);
  const hours = Math.floor(absMinutes / 60);
  const minutes = absMinutes % 60;

  let text = "";
  if (diffMinutes === 0) {
    text = "Same time";
  } else {
    const parts = [];
    if (hours > 0) parts.push(\`\${hours} \${hours === 1 ? 'hour' : 'hours'}\`);
    if (minutes > 0) parts.push(\`\${minutes} minutes\`);
    text = \`\${parts.join(" ")} \${diffMinutes > 0 ? "ahead" : "behind"}\`;
  }

  return {
    diffMinutes,
    diffHours: diffMinutes / 60,
    formatted: text,
    isAhead: diffMinutes > 0,
    isEqual: diffMinutes === 0
  };
}
`);

// 5. sun.ts
write('src/lib/astronomy/sun.ts', `
/**
 * Mathematically rigorous astronomical calculations for sunrise, sunset,
 * solar noon, day length, twilight phases, and solar elevation.
 * Pure TypeScript, zero external dependencies.
 */

const RAD = Math.PI / 180;
const DEG = 180 / Math.PI;

export interface SunTimes {
  solarNoon: string;
  sunrise: string;
  sunset: string;
  civilDawn: string;
  civilDusk: string;
  nauticalDawn: string;
  nauticalDusk: string;
  astronomicalDawn: string;
  astronomicalDusk: string;
  dayLengthMinutes: number;
  dayLengthFormatted: string;
  dayProgressPercent: number;
  isPolarDay: boolean;
  isPolarNight: boolean;
  sunElevationAngle: number;
}

export function getSunTimes(date: Date, lat: number, lng: number, timezone = "UTC"): SunTimes {
  // Convert target date to UTC Julian Day
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  const jd = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  const n = jd - 2451545.0 + 0.0008;

  // Mean solar noon
  const Jstar = n - lng / 360;
  // Solar mean anomaly
  const M = (357.5291 + 0.98560028 * Jstar) % 360;
  // Equation of the center
  const C = 1.9148 * Math.sin(M * RAD) + 0.0200 * Math.sin(2 * M * RAD) + 0.0003 * Math.sin(3 * M * RAD);
  // Ecliptic longitude
  const lambda = (M + C + 180 + 102.9372) % 360;
  // Solar transit
  const Jtransit = 2451545.0 + Jstar + 0.0053 * Math.sin(M * RAD) - 0.0069 * Math.sin(2 * lambda * RAD);
  // Sun declination
  const delta = Math.asin(Math.sin(lambda * RAD) * Math.sin(23.44 * RAD));

  // Hour angle calculation helper for various zenith angles
  function getHourAngle(zenithDeg: number): number | null {
    const cosH = (Math.sin(-zenithDeg * RAD) - Math.sin(lat * RAD) * Math.sin(delta)) /
                 (Math.cos(lat * RAD) * Math.cos(delta));
    if (cosH > 1) return null; // Sun never rises (polar night)
    if (cosH < -1) return 180; // Sun never sets (polar day)
    return Math.acos(cosH) * DEG;
  }

  // Standard sunrise/sunset zenith = -0.833°
  const H0 = getHourAngle(0.833);
  const H_civil = getHourAngle(6.0);
  const H_nautical = getHourAngle(12.0);
  const H_astro = getHourAngle(18.0);

  const isPolarNight = H0 === null;
  const isPolarDay = H0 === 180;

  function julianToDate(j: number): Date {
    const timeMs = (j - 2440587.5) * 86400000;
    return new Date(timeMs);
  }

  function formatTime(d: Date | null): string {
    if (!d) return "--:--";
    try {
      return new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      }).format(d);
    } catch (e) {
      return d.toTimeString().slice(0, 5);
    }
  }

  const transitDate = julianToDate(Jtransit);
  let sunriseDate: Date | null = null;
  let sunsetDate: Date | null = null;
  let dayLengthMinutes = 0;

  if (!isPolarNight && !isPolarDay && H0 !== null) {
    const Jset = Jtransit + H0 / 360;
    const Jrise = Jtransit - H0 / 360;
    sunriseDate = julianToDate(Jrise);
    sunsetDate = julianToDate(Jset);
    dayLengthMinutes = Math.round((sunsetDate.getTime() - sunriseDate.getTime()) / 60000);
  } else if (isPolarDay) {
    dayLengthMinutes = 1440;
  }

  const hours = Math.floor(dayLengthMinutes / 60);
  const mins = dayLengthMinutes % 60;
  const dayLengthFormatted = \`\${hours}h \${mins}m\`;

  // Calculate day progress percentage
  let dayProgressPercent = 0;
  const nowMs = date.getTime();
  if (sunriseDate && sunsetDate) {
    const riseMs = sunriseDate.getTime();
    const setMs = sunsetDate.getTime();
    if (nowMs <= riseMs) {
      dayProgressPercent = 0;
    } else if (nowMs >= setMs) {
      dayProgressPercent = 100;
    } else {
      dayProgressPercent = Math.round(((nowMs - riseMs) / (setMs - riseMs)) * 100);
    }
  } else if (isPolarDay) {
    dayProgressPercent = 50;
  }

  // Calculate current solar elevation angle (degrees)
  const currentHours = date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600;
  const localSolarTime = (currentHours + lng / 15) % 24;
  const hourAngleDeg = (localSolarTime - 12) * 15;
  const sinAlpha = Math.sin(lat * RAD) * Math.sin(delta) + Math.cos(lat * RAD) * Math.cos(delta) * Math.cos(hourAngleDeg * RAD);
  const sunElevationAngle = Math.round(Math.asin(Math.max(-1, Math.min(1, sinAlpha))) * DEG);

  return {
    solarNoon: formatTime(transitDate),
    sunrise: isPolarDay ? "Midnight Sun" : isPolarNight ? "Polar Night" : formatTime(sunriseDate),
    sunset: isPolarDay ? "Midnight Sun" : isPolarNight ? "Polar Night" : formatTime(sunsetDate),
    civilDawn: formatTime(H_civil ? julianToDate(Jtransit - H_civil / 360) : null),
    civilDusk: formatTime(H_civil ? julianToDate(Jtransit + H_civil / 360) : null),
    nauticalDawn: formatTime(H_nautical ? julianToDate(Jtransit - H_nautical / 360) : null),
    nauticalDusk: formatTime(H_nautical ? julianToDate(Jtransit + H_nautical / 360) : null),
    astronomicalDawn: formatTime(H_astro ? julianToDate(Jtransit - H_astro / 360) : null),
    astronomicalDusk: formatTime(H_astro ? julianToDate(Jtransit + H_astro / 360) : null),
    dayLengthMinutes,
    dayLengthFormatted,
    dayProgressPercent,
    isPolarDay,
    isPolarNight,
    sunElevationAngle
  };
}
`);

// 6. planner.ts
write('src/lib/meeting/planner.ts', `
import { getOffsetMinutes } from '../time/timezones';

export interface Participant {
  name: string;
  timezone: string;
  workStartHour: number; // e.g. 9
  workEndHour: number;   // e.g. 17
}

export interface MeetingSlot {
  utcHour: number;
  localTimes: Record<string, string>;
  isConvenientForAll: boolean;
  score: "Excellent" | "Good" | "Possible" | "Poor";
}

export function evaluateMeetingSlots(participants: Participant[]): MeetingSlot[] {
  const slots: MeetingSlot[] = [];
  const now = new Date();

  for (let utcHour = 0; utcHour < 24; utcHour++) {
    const localTimes: Record<string, string> = {};
    let convenientCount = 0;
    let workableCount = 0;

    participants.forEach(p => {
      const offsetMin = getOffsetMinutes(now, p.timezone);
      const localTotalMinutes = (utcHour * 60 + offsetMin + 1440 * 2) % 1440;
      const localHour = Math.floor(localTotalMinutes / 60);
      const localMin = localTotalMinutes % 60;
      const formatted = \`\${String(localHour).padStart(2, '0')}:\${String(localMin).padStart(2, '0')}\`;
      localTimes[p.timezone] = formatted;

      if (localHour >= p.workStartHour && localHour < p.workEndHour) {
        convenientCount++;
        workableCount++;
      } else if (localHour >= 8 && localHour < 21) {
        workableCount++;
      }
    });

    let score: MeetingSlot["score"] = "Poor";
    if (convenientCount === participants.length) {
      score = "Excellent";
    } else if (workableCount === participants.length) {
      score = "Good";
    } else if (workableCount >= Math.ceil(participants.length * 0.7)) {
      score = "Possible";
    }

    slots.push({
      utcHour,
      localTimes,
      isConvenientForAll: score === "Excellent",
      score
    });
  }

  return slots;
}

export function generateICS(title: string, dateStr: string, startHourUtc: number, durationHours: number): string {
  const date = new Date(dateStr);
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  const startH = String(startHourUtc).padStart(2, '0');
  const endH = String((startHourUtc + durationHours) % 24).padStart(2, '0');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//TimeNumbers//Meeting Planner//EN',
    'BEGIN:VEVENT',
    \`SUMMARY:\${title}\`,
    \`DTSTART:\${y}\${m}\${d}T\${startH}0000Z\`,
    \`DTEND:\${y}\${m}\${d}T\${endH}0000Z\`,
    'DESCRIPTION:Scheduled via TimeNumbers Meeting Planner',
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\\r\\n');
}

export function generateGoogleCalendarUrl(title: string, dateStr: string, startHourUtc: number, durationHours: number): string {
  const date = new Date(dateStr);
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  const startH = String(startHourUtc).padStart(2, '0');
  const endH = String((startHourUtc + durationHours) % 24).padStart(2, '0');
  const startIso = \`\${y}\${m}\${d}T\${startH}0000Z\`;
  const endIso = \`\${y}\${m}\${d}T\${endH}0000Z\`;

  return \`https://calendar.google.com/calendar/render?action=TEMPLATE&text=\${encodeURIComponent(title)}&dates=\${startIso}/\${endIso}&details=\${encodeURIComponent("Scheduled via TimeNumbers")}\`;
}
`);

// 7. sync.ts
write('src/lib/time/sync.ts', `
let clockOffsetMs = 0;
let isSynchronized = false;
let syncAccuracyMs = 10;
let lastSyncTimestamp = 0;

export interface SyncState {
  offsetMs: number;
  isSynced: boolean;
  accuracyMs: number;
  lastSyncedAt: number;
}

export async function syncWithServer(): Promise<SyncState> {
  const samples: number[] = [];
  const latencies: number[] = [];

  for (let i = 0; i < 3; i++) {
    try {
      const t0 = performance.now();
      const res = await fetch('/api/time', { cache: 'no-store' });
      const t1 = performance.now();
      if (res.ok) {
        const data = await res.json();
        const rtt = t1 - t0;
        const serverTime = data.serverTime;
        const estimatedDeviceTime = Date.now() - (rtt / 2);
        const offset = serverTime - estimatedDeviceTime;
        samples.push(offset);
        latencies.push(rtt);
      }
    } catch (e) {
      // Network error, keep existing state
    }
  }

  if (samples.length > 0) {
    samples.sort((a, b) => a - b);
    clockOffsetMs = samples[Math.floor(samples.length / 2)];
    syncAccuracyMs = Math.round(Math.min(...latencies) / 2);
    isSynchronized = true;
    lastSyncTimestamp = Date.now();
  }

  return {
    offsetMs: clockOffsetMs,
    isSynced: isSynchronized,
    accuracyMs: syncAccuracyMs,
    lastSyncedAt: lastSyncTimestamp
  };
}

export function getSyncedDate(): Date {
  return new Date(Date.now() + clockOffsetMs);
}

export function getSyncState(): SyncState {
  return {
    offsetMs: clockOffsetMs,
    isSynced: isSynchronized,
    accuracyMs: syncAccuracyMs,
    lastSyncedAt: lastSyncTimestamp
  };
}
`);

// 8. metadata.ts
write('src/lib/seo/metadata.ts', `
import { siteConfig } from '../config/site.config';

export function buildCanonicalUrl(path = ""): string {
  const base = siteConfig.url.replace(/\\/$/, "");
  const cleanPath = path.startsWith("/") ? path : \`/\${path}\`;
  return \`\${base}\${cleanPath}\`;
}

export function buildPageMetadata(title: string, description: string, path = "") {
  const canonical = buildCanonicalUrl(path);
  return {
    title: \`\${title} — \${siteConfig.name}\`,
    description,
    alternates: {
      canonical
    },
    openGraph: {
      title: \`\${title} — \${siteConfig.name}\`,
      description,
      url: canonical,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      locale: "en_US",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: \`\${title} — \${siteConfig.name}\`,
      description,
      images: [siteConfig.ogImage]
    }
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteConfig.name,
    "url": siteConfig.url,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": \`\${siteConfig.url}/?q={search_term_string}\`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

export function generatePlaceSchema(cityName: string, countryName: string, lat: number, lng: number, timezone: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": \`Time in \${cityName}, \${countryName}\`,
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": lat,
      "longitude": lng
    },
    "description": \`Current local time, timezone, and solar details for \${cityName}, \${countryName} (\${timezone})\`
  };
}
`);

console.log('Done part 3');
