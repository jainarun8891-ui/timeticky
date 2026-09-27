/**
 * Sleep Cycle Science & Chronometry Utility
 * Based on 90-minute ultradian sleep cycle rhythms and 14-minute average sleep onset latency.
 */

export interface SleepCycleResult {
  cycles: number;
  totalSleepHours: number;
  sleepDurationFormatted: string;
  timeFormatted: string;
  time24: string;
  isoDateTime: string;
  quality: 'optimal' | 'recommended' | 'sufficient' | 'minimal';
  badge: string;
  description: string;
  remStages: {
    nremLight: number; // percentage
    nremDeep: number; // percentage
    rem: number; // percentage
  };
}

export const POPULAR_SLEEP_PRESETS = [
  { slug: 'wake-up-at-5am', mode: 'wake', hour: 5, minute: 0, label: '5:00 AM Wake-up' },
  { slug: 'wake-up-at-5-30am', mode: 'wake', hour: 5, minute: 30, label: '5:30 AM Wake-up' },
  { slug: 'wake-up-at-6am', mode: 'wake', hour: 6, minute: 0, label: '6:00 AM Wake-up' },
  { slug: 'wake-up-at-6-30am', mode: 'wake', hour: 6, minute: 30, label: '6:30 AM Wake-up' },
  { slug: 'wake-up-at-7am', mode: 'wake', hour: 7, minute: 0, label: '7:00 AM Wake-up' },
  { slug: 'wake-up-at-7-30am', mode: 'wake', hour: 7, minute: 30, label: '7:30 AM Wake-up' },
  { slug: 'wake-up-at-8am', mode: 'wake', hour: 8, minute: 0, label: '8:00 AM Wake-up' },
  { slug: 'wake-up-at-8-30am', mode: 'wake', hour: 8, minute: 30, label: '8:30 AM Wake-up' },
  { slug: 'wake-up-at-9am', mode: 'wake', hour: 9, minute: 0, label: '9:00 AM Wake-up' },
  { slug: 'bedtime-10pm', mode: 'bed', hour: 22, minute: 0, label: '10:00 PM Bedtime' },
  { slug: 'bedtime-10-30pm', mode: 'bed', hour: 22, minute: 30, label: '10:30 PM Bedtime' },
  { slug: 'bedtime-11pm', mode: 'bed', hour: 23, minute: 0, label: '11:00 PM Bedtime' },
  { slug: 'bedtime-11-30pm', mode: 'bed', hour: 23, minute: 30, label: '11:30 PM Bedtime' },
  { slug: 'bedtime-12am', mode: 'bed', hour: 0, minute: 0, label: '12:00 AM Bedtime' },
  { slug: 'fall-asleep-now', mode: 'now', hour: 0, minute: 0, label: 'Fall Asleep Right Now' },
];

export function formatTime12(date: Date): string {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 hour is 12 AM
  const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${hours}:${minutesStr} ${ampm}`;
}

export function formatTime24(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export function formatIsoDateTime(date: Date): string {
  return date.toISOString().slice(0, 16);
}

/**
 * Calculates optimal bedtimes given a wake-up time.
 * Accounts for 14-minute average sleep onset latency.
 */
export function calculateBedtimes(
  targetHour: number,
  targetMinute: number,
  latencyMinutes = 14
): SleepCycleResult[] {
  // Use today's date with target hour & minute
  const baseWake = new Date();
  baseWake.setHours(targetHour, targetMinute, 0, 0);

  // We test 6, 5, 4, 3 cycles (from 9 hours down to 4.5 hours)
  const cycleCounts = [6, 5, 4, 3];

  return cycleCounts.map((cycles) => {
    const sleepDurationMinutes = cycles * 90;
    const totalMinutesBefore = sleepDurationMinutes + latencyMinutes;

    const bedtime = new Date(baseWake.getTime() - totalMinutesBefore * 60000);
    const totalSleepHours = sleepDurationMinutes / 60;

    let quality: SleepCycleResult['quality'] = 'recommended';
    let badge = 'Recommended (7.5h)';
    let description = 'Optimal balance of restorative slow-wave deep sleep and rapid eye movement (REM).';

    if (cycles === 6) {
      quality = 'optimal';
      badge = 'Peak Recovery (9h)';
      description = 'Maximum athletic muscle repair, hormonal balance, and deep cognitive consolidation.';
    } else if (cycles === 5) {
      quality = 'recommended';
      badge = 'Gold Standard (7.5h)';
      description = 'The scientific sweet spot for most adults. Wake up refreshed with zero sleep inertia.';
    } else if (cycles === 4) {
      quality = 'sufficient';
      badge = 'Sufficient (6h)';
      description = 'Acceptable for busy schedules. You will wake up at the end of a cycle without grogginess.';
    } else {
      quality = 'minimal';
      badge = 'Power Minimum (4.5h)';
      description = 'Short sleep window. Avoids waking up from deep sleep, but creates mild sleep debt if frequent.';
    }

    return {
      cycles,
      totalSleepHours,
      sleepDurationFormatted: `${Math.floor(sleepDurationMinutes / 60)}h ${sleepDurationMinutes % 60 ? `${sleepDurationMinutes % 60}m` : ''}`.trim(),
      timeFormatted: formatTime12(bedtime),
      time24: formatTime24(bedtime),
      isoDateTime: formatIsoDateTime(bedtime),
      quality,
      badge,
      description,
      remStages: {
        nremLight: 50,
        nremDeep: cycles >= 5 ? 25 : 20,
        rem: cycles >= 5 ? 25 : 20,
      }
    };
  });
}

/**
 * Calculates optimal wake-up times given a bedtime.
 */
export function calculateWakeTimes(
  targetHour: number,
  targetMinute: number,
  latencyMinutes = 14
): SleepCycleResult[] {
  const baseBed = new Date();
  baseBed.setHours(targetHour, targetMinute, 0, 0);

  // We test 3, 4, 5, 6 cycles
  const cycleCounts = [3, 4, 5, 6];

  return cycleCounts.map((cycles) => {
    const sleepDurationMinutes = cycles * 90;
    const totalMinutesAfter = sleepDurationMinutes + latencyMinutes;

    const wakeTime = new Date(baseBed.getTime() + totalMinutesAfter * 60000);
    const totalSleepHours = sleepDurationMinutes / 60;

    let quality: SleepCycleResult['quality'] = 'recommended';
    let badge = 'Recommended (7.5h)';
    let description = 'Optimal balance of restorative slow-wave deep sleep and rapid eye movement (REM).';

    if (cycles === 6) {
      quality = 'optimal';
      badge = 'Peak Recovery (9h)';
      description = 'Maximum athletic muscle repair, hormonal balance, and deep cognitive consolidation.';
    } else if (cycles === 5) {
      quality = 'recommended';
      badge = 'Gold Standard (7.5h)';
      description = 'The scientific sweet spot for most adults. Wake up refreshed with zero sleep inertia.';
    } else if (cycles === 4) {
      quality = 'sufficient';
      badge = 'Sufficient (6h)';
      description = 'Acceptable for busy workdays. You complete 4 full cycles and wake up at light sleep stage.';
    } else {
      quality = 'minimal';
      badge = 'Power Minimum (4.5h)';
      description = 'Short rest window. Completes 3 cycles to avoid deep sleep interruption.';
    }

    return {
      cycles,
      totalSleepHours,
      sleepDurationFormatted: `${Math.floor(sleepDurationMinutes / 60)}h ${sleepDurationMinutes % 60 ? `${sleepDurationMinutes % 60}m` : ''}`.trim(),
      timeFormatted: formatTime12(wakeTime),
      time24: formatTime24(wakeTime),
      isoDateTime: formatIsoDateTime(wakeTime),
      quality,
      badge,
      description,
      remStages: {
        nremLight: 50,
        nremDeep: cycles >= 5 ? 25 : 20,
        rem: cycles >= 5 ? 25 : 20,
      }
    };
  });
}

/**
 * Calculates optimal wake times if you head to sleep right now.
 */
export function calculateSleepNow(latencyMinutes = 14): SleepCycleResult[] {
  const now = new Date();
  return calculateWakeTimes(now.getHours(), now.getMinutes(), latencyMinutes);
}

/**
 * Parse programmatic SEO slug into parameters
 */
export function parseSleepSlug(slug: string): {
  mode: 'wake' | 'bed' | 'now';
  hour: number;
  minute: number;
  title: string;
  description: string;
} | null {
  const found = POPULAR_SLEEP_PRESETS.find((p) => p.slug === slug);
  if (found) {
    if (found.mode === 'now') {
      return {
        mode: 'now',
        hour: 0,
        minute: 0,
        title: 'Sleep Cycle Calculator — If I Go to Bed Right Now',
        description: 'Discover the exact times to wake up if you fall asleep right now. Optimize for 90-minute sleep cycles and wake up feeling refreshed.'
      };
    }
    const timeFormatted = formatTime12(new Date(2026, 0, 1, found.hour, found.minute));
    if (found.mode === 'wake') {
      return {
        mode: 'wake',
        hour: found.hour,
        minute: found.minute,
        title: `What Time Should I Go to Bed to Wake Up at ${timeFormatted}?`,
        description: `Sleep cycle calculation for waking up at ${timeFormatted}. Find the exact bedtimes (accounting for 14-minute sleep latency) to wake up refreshed.`
      };
    } else {
      return {
        mode: 'bed',
        hour: found.hour,
        minute: found.minute,
        title: `If I Go to Sleep at ${timeFormatted}, What Time Should I Wake Up?`,
        description: `Calculate the best wake-up times after falling asleep at ${timeFormatted}. Wake up at the end of 90-minute cycles and avoid morning grogginess.`
      };
    }
  }

  // Dynamic regex matching for custom slugs e.g. wake-up-at-6-15am or bedtime-10-45pm
  const wakeMatch = slug.match(/^wake-up-at-(\d{1,2})(?:-(\d{2}))?(am|pm)$/i);
  if (wakeMatch) {
    let hour = parseInt(wakeMatch[1], 10);
    const minute = wakeMatch[2] ? parseInt(wakeMatch[2], 10) : 0;
    const isPm = wakeMatch[3].toLowerCase() === 'pm';
    if (isPm && hour !== 12) hour += 12;
    if (!isPm && hour === 12) hour = 0;

    const timeFormatted = formatTime12(new Date(2026, 0, 1, hour, minute));
    return {
      mode: 'wake',
      hour,
      minute,
      title: `What Time Should I Go to Bed to Wake Up at ${timeFormatted}?`,
      description: `Sleep cycle calculations for waking up at ${timeFormatted}. Discover optimal bedtimes to prevent grogginess.`
    };
  }

  const bedMatch = slug.match(/^bedtime-(\d{1,2})(?:-(\d{2}))?(am|pm)$/i);
  if (bedMatch) {
    let hour = parseInt(bedMatch[1], 10);
    const minute = bedMatch[2] ? parseInt(bedMatch[2], 10) : 0;
    const isPm = bedMatch[3].toLowerCase() === 'pm';
    if (isPm && hour !== 12) hour += 12;
    if (!isPm && hour === 12) hour = 0;

    const timeFormatted = formatTime12(new Date(2026, 0, 1, hour, minute));
    return {
      mode: 'bed',
      hour,
      minute,
      title: `If I Sleep at ${timeFormatted}, What Time Should I Wake Up?`,
      description: `Calculate optimal wake-up times if going to bed at ${timeFormatted}.`
    };
  }

  return null;
}
