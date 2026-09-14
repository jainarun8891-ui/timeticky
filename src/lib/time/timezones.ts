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

export function getOffsetMinutes(date: Date, timezone: string): number {
  try {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false
    });
    const parts = formatter.formatToParts(date);
    const getPart = (type: string) => parseInt(parts.find(p => p.type === type)?.value || "0", 10);
    
    let hour = getPart("hour");
    if (hour === 24) hour = 0; // standard 24-hr formatting edge case

    const localUtcMs = Date.UTC(
      getPart("year"),
      getPart("month") - 1,
      getPart("day"),
      hour,
      getPart("minute"),
      getPart("second")
    );

    return Math.round((localUtcMs - date.getTime()) / 60000);
  } catch (e) {
    return 0;
  }
}

export function getUtcOffsetString(date: Date, timezone: string): string {
  const mins = getOffsetMinutes(date, timezone);
  const sign = mins >= 0 ? "+" : "-";
  const abs = Math.abs(mins);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  return m === 0 ? `UTC ${sign}${h}` : `UTC ${sign}${h}:${String(m).padStart(2, '0')}`;
}

export function isDstActive(date: Date, timezone: string): boolean {
  try {
    const jan = new Date(date.getFullYear(), 0, 15);
    const jul = new Date(date.getFullYear(), 6, 15);
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
    if (hours > 0) parts.push(`${hours} ${hours === 1 ? 'hour' : 'hours'}`);
    if (minutes > 0) parts.push(`${minutes} minutes`);
    text = `${parts.join(" ")} ${diffMinutes > 0 ? "ahead" : "behind"}`;
  }

  return {
    diffMinutes,
    diffHours: diffMinutes / 60,
    formatted: text,
    isAhead: diffMinutes > 0,
    isEqual: diffMinutes === 0
  };
}
