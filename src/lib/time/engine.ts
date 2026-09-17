// TimeNumbers Precision Chronometry Engine

export interface TimeDetails {
  timeStr: string;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
  dayPeriod: string; // 'AM' | 'PM' | ''
  dateStr: string;
  weekday: string;
  dayOfWeek: string;
  year: number;
  month: string;
  monthNum: number;
  day: number;
  timeZone: string;
  timeZoneAbbr: string;
  abbreviation: string;
  utcOffsetMinutes: number;
  utcOffsetString: string;
  isDst: boolean;
  dayOfYear: number;
  weekNumber: number;
  isLeapYear: boolean;
}

export interface TimeDifferenceSummary {
  diffHours: number;
  diffMinutes: number;
  summary: string;
  toString(): string;
}

export function getUtcOffsetMinutes(timeZone: string, date: Date = new Date()): number {
  try {
    const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
    const tzDate = new Date(date.toLocaleString('en-US', { timeZone }));
    return Math.round((tzDate.getTime() - utcDate.getTime()) / 60000);
  } catch {
    return 0;
  }
}

export function getUtcOffsetString(timeZone: string, date: Date = new Date()): string {
  const mins = getUtcOffsetMinutes(timeZone, date);
  const sign = mins >= 0 ? '+' : '-';
  const absMins = Math.abs(mins);
  const hours = Math.floor(absMins / 60);
  const remMins = absMins % 60;
  return remMins === 0 ? `UTC ${sign}${hours}` : `UTC ${sign}${hours}:${String(remMins).padStart(2, '0')}`;
}

export function isDstActive(timeZone: string, date: Date = new Date()): boolean {
  try {
    const year = date.getFullYear();
    const jan = new Date(year, 0, 1);
    const jul = new Date(year, 6, 1);
    const janOffset = getUtcOffsetMinutes(timeZone, jan);
    const julOffset = getUtcOffsetMinutes(timeZone, jul);
    const currentOffset = getUtcOffsetMinutes(timeZone, date);

    const minOffset = Math.min(janOffset, julOffset);
    const maxOffset = Math.max(janOffset, julOffset);

    // If offset never changes throughout year, location has no DST
    if (minOffset === maxOffset) return false;

    // DST is active when current offset equals the daylight (higher) offset
    return currentOffset === maxOffset;
  } catch {
    return false;
  }
}

function calculateDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

function calculateIsoWeek(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

export function getTimeDetails(timeZone: string, date: Date = new Date(), hour12: boolean = true): TimeDetails {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timeZone === 'UTC' ? 'UTC' : timeZone,
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      timeZoneName: 'short',
    });

    const parts = formatter.formatToParts(date);
    const rawHour = parseInt(parts.find(p => p.type === 'hour')?.value || '0', 10);
    const minute = parseInt(parts.find(p => p.type === 'minute')?.value || '0', 10);
    const second = parseInt(parts.find(p => p.type === 'second')?.value || '0', 10);
    const weekday = parts.find(p => p.type === 'weekday')?.value || '';
    const month = parts.find(p => p.type === 'month')?.value || '';
    const day = parseInt(parts.find(p => p.type === 'day')?.value || '1', 10);
    const year = parseInt(parts.find(p => p.type === 'year')?.value || `${date.getFullYear()}`, 10);
    const timeZoneAbbr = parts.find(p => p.type === 'timeZoneName')?.value || 'UTC';

    const offsetMins = getUtcOffsetMinutes(timeZone, date);
    const offsetStr = getUtcOffsetString(timeZone, date);
    const isDst = isDstActive(timeZone, date);

    const dayPeriod = rawHour >= 12 ? 'PM' : 'AM';
    const displayHour = hour12 ? (rawHour % 12 || 12) : rawHour;
    const timeStr = `${String(displayHour).padStart(hour12 ? 1 : 2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;
    const dateStr = `${weekday}, ${month} ${day}, ${year}`;

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthNum = monthNames.indexOf(month) + 1 || 1;

    const dayOfYear = calculateDayOfYear(date);
    const weekNumber = calculateIsoWeek(date);
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);

    return {
      timeStr,
      hours: rawHour,
      minutes: minute,
      seconds: second,
      milliseconds: date.getMilliseconds(),
      dayPeriod,
      dateStr,
      weekday,
      dayOfWeek: weekday,
      year,
      month,
      monthNum,
      day,
      timeZone,
      timeZoneAbbr,
      abbreviation: timeZoneAbbr,
      utcOffsetMinutes: offsetMins,
      utcOffsetString: offsetStr,
      isDst,
      dayOfYear,
      weekNumber,
      isLeapYear,
    };
  } catch {
    const year = date.getFullYear();
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    return {
      timeStr: '00:00:00',
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      dayPeriod: 'AM',
      dateStr: '---',
      weekday: '---',
      dayOfWeek: '---',
      year,
      month: '---',
      monthNum: 1,
      day: 1,
      timeZone,
      timeZoneAbbr: 'UTC',
      abbreviation: 'UTC',
      utcOffsetMinutes: 0,
      utcOffsetString: 'UTC +0',
      isDst: false,
      dayOfYear: 1,
      weekNumber: 1,
      isLeapYear,
    };
  }
}

export function formatTime(details: TimeDetails, is24Hour: boolean = false, showSeconds: boolean = true): string {
  const h = is24Hour ? details.hours : (details.hours % 12 || 12);
  const hStr = is24Hour ? String(h).padStart(2, '0') : String(h);
  const mStr = String(details.minutes).padStart(2, '0');
  const sStr = String(details.seconds).padStart(2, '0');
  const period = !is24Hour ? ` ${details.hours >= 12 ? 'PM' : 'AM'}` : '';

  if (showSeconds) {
    return `${hStr}:${mStr}:${sStr}${period}`;
  }
  return `${hStr}:${mStr}${period}`;
}

export function formatDate(details: TimeDetails): string {
  return details.dateStr;
}

export function getTimeDifferenceText(tzA: string, tzB: string, date: Date = new Date()): TimeDifferenceSummary {
  const offA = getUtcOffsetMinutes(tzA, date);
  const offB = getUtcOffsetMinutes(tzB, date);
  const diffMins = offB - offA;
  const diffHours = diffMins / 60;

  const absMins = Math.abs(diffMins);
  const h = Math.floor(absMins / 60);
  const m = absMins % 60;
  const timeDesc = m === 0 ? `${h} hour${h !== 1 ? 's' : ''}` : `${h} hour${h !== 1 ? 's' : ''} ${m} minute${m !== 1 ? 's' : ''}`;

  let summary = 'Same local time';
  if (diffMins > 0) {
    summary = `${timeDesc} ahead`;
  } else if (diffMins < 0) {
    summary = `${timeDesc} behind`;
  }

  return {
    diffHours,
    diffMinutes: diffMins,
    summary,
    toString() {
      return this.summary;
    }
  };
}
