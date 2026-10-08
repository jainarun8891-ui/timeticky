// High-precision NOAA Solar & Lunar calculations

export interface SolarTimes {
  sunrise: string;
  sunset: string;
  solarNoon: string;
  dayLength: string;
  dayLengthMinutes: number;
  dayProgressPercent: number;
  civilTwilight: { dawn: string; dusk: string };
  nauticalTwilight: { dawn: string; dusk: string };
  astronomicalTwilight: { dawn: string; dusk: string };
  goldenHour: { morning: string; evening: string };
  blueHour: { morning: string; evening: string };
  isDaytime: boolean;
  isPolarDay?: boolean;
  isPolarNight?: boolean;
}

export interface MoonPhaseInfo {
  ageDays: number;
  illumination: number; // 0 to 100
  phaseName: string;
  phaseFraction: number; // 0 to 1
  stage: 'waxing' | 'waning' | 'full' | 'new';
  nextNewMoonDays: number;
  nextFullMoonDays: number;
}

export function getSolarTimes(
  lat: number,
  lng: number,
  date: Date = new Date(),
  tzOffsetMinutes: number = 0
): SolarTimes {
  const rad = Math.PI / 180;
  const startOfYear = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const dayOfYear = Math.floor((date.getTime() - startOfYear.getTime()) / 86400000) + 1;

  // Fractional year in radians
  const gamma = (2 * Math.PI / 365) * (dayOfYear - 1 + 0.5);

  // Equation of time (in minutes)
  const eqtime =
    229.18 *
    (0.000075 +
      0.001868 * Math.cos(gamma) -
      0.032077 * Math.sin(gamma) -
      0.014615 * Math.cos(2 * gamma) -
      0.040849 * Math.sin(2 * gamma));

  // Solar declination angle (in radians)
  const decl =
    0.006918 -
    0.399912 * Math.cos(gamma) +
    0.070257 * Math.sin(gamma) -
    0.006758 * Math.cos(2 * gamma) +
    0.000907 * Math.sin(2 * gamma) -
    0.002697 * Math.cos(3 * gamma) +
    0.00148 * Math.sin(3 * gamma);

  let isPolarDay = false;
  let isPolarNight = false;

  function calculateZenithTimes(zenithDeg: number) {
    const cosHA =
      Math.cos(zenithDeg * rad) / (Math.cos(lat * rad) * Math.cos(decl)) -
      Math.tan(lat * rad) * Math.tan(decl);

    if (cosHA > 1) {
      // Sun never rises above this angle
      return { status: 'polar_night' as const };
    }
    if (cosHA < -1) {
      // Sun never sets below this angle
      return { status: 'polar_day' as const };
    }

    const ha = Math.acos(cosHA) / rad; // Hour angle in degrees
    const solarNoonUtcMins = 720 - 4 * lng - eqtime;
    const riseUtcMins = solarNoonUtcMins - ha * 4;
    const setUtcMins = solarNoonUtcMins + ha * 4;

    const toLocal = (mins: number) => {
      let localMins = Math.round((mins + tzOffsetMinutes + 1440) % 1440);
      const h = Math.floor(localMins / 60);
      const m = localMins % 60;
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    };

    return {
      status: 'normal' as const,
      riseStr: toLocal(riseUtcMins),
      setStr: toLocal(setUtcMins),
      riseLocalMins: Math.round((riseUtcMins + tzOffsetMinutes + 1440) % 1440),
      setLocalMins: Math.round((setUtcMins + tzOffsetMinutes + 1440) % 1440),
    };
  }

  const standard = calculateZenithTimes(90.833);
  const civil = calculateZenithTimes(96);
  const nautical = calculateZenithTimes(102);
  const astronomical = calculateZenithTimes(108);
  const goldenHour = calculateZenithTimes(86);
  const blueHour = calculateZenithTimes(94);

  if (standard.status === 'polar_day') {
    isPolarDay = true;
  } else if (standard.status === 'polar_night') {
    isPolarNight = true;
  }

  const solarNoonMins = Math.round((720 - 4 * lng - eqtime + tzOffsetMinutes + 1440) % 1440);
  const noonH = Math.floor(solarNoonMins / 60);
  const noonM = solarNoonMins % 60;
  const noonStr = `${String(noonH).padStart(2, '0')}:${String(noonM).padStart(2, '0')}`;

  let riseMins = 360;
  let setMins = 1080;
  let dayLengthMins = 0;
  let sunriseStr = '06:00';
  let sunsetStr = '18:00';

  if (isPolarDay) {
    dayLengthMins = 1440;
    sunriseStr = 'Midnight Sun';
    sunsetStr = 'Midnight Sun';
  } else if (isPolarNight) {
    dayLengthMins = 0;
    sunriseStr = 'Polar Night';
    sunsetStr = 'Polar Night';
  } else if (standard.status === 'normal') {
    riseMins = standard.riseLocalMins;
    setMins = standard.setLocalMins;
    dayLengthMins = (setMins - riseMins + 1440) % 1440;
    sunriseStr = standard.riseStr;
    sunsetStr = standard.setStr;
  }

  const dayH = Math.floor(dayLengthMins / 60);
  const dayM = dayLengthMins % 60;

  // Local current minutes
  const nowUtcMins = date.getUTCHours() * 60 + date.getUTCMinutes();
  const nowLocalMins = (nowUtcMins + tzOffsetMinutes + 1440) % 1440;

  let isDaytime = false;
  let dayProgress = 0;

  if (isPolarDay) {
    isDaytime = true;
    dayProgress = 50;
  } else if (isPolarNight) {
    isDaytime = false;
    dayProgress = 0;
  } else {
    isDaytime = nowLocalMins >= riseMins && nowLocalMins <= setMins;
    if (isDaytime && dayLengthMins > 0) {
      dayProgress = Math.min(100, Math.max(0, Math.round(((nowLocalMins - riseMins) / dayLengthMins) * 100)));
    } else if (nowLocalMins > setMins) {
      dayProgress = 100;
    }
  }

  const getTwilightStr = (t: ReturnType<typeof calculateZenithTimes>, fallbackDawn: string, fallbackDusk: string) => {
    if (t.status === 'normal') {
      return { dawn: t.riseStr, dusk: t.setStr };
    }
    if (isPolarDay) {
      return { dawn: 'All Day', dusk: 'All Day' };
    }
    return { dawn: 'None', dusk: 'None' };
  };

  const getHourStr = (t: ReturnType<typeof calculateZenithTimes>, fallbackMorning: string, fallbackEvening: string) => {
    if (t.status === 'normal') {
      return { morning: t.riseStr, evening: t.setStr };
    }
    if (isPolarDay) {
      return { morning: 'All Day', evening: 'All Day' };
    }
    return { morning: 'None', evening: 'None' };
  };

  return {
    sunrise: sunriseStr,
    sunset: sunsetStr,
    solarNoon: noonStr,
    dayLength: `${dayH}h ${dayM}m`,
    dayLengthMinutes: dayLengthMins,
    dayProgressPercent: dayProgress,
    civilTwilight: getTwilightStr(civil, '05:30', '18:30'),
    nauticalTwilight: getTwilightStr(nautical, '05:00', '19:00'),
    astronomicalTwilight: getTwilightStr(astronomical, '04:30', '19:30'),
    goldenHour: getHourStr(goldenHour, '06:30', '17:30'),
    blueHour: getHourStr(blueHour, '05:45', '18:15'),
    isDaytime,
    isPolarDay,
    isPolarNight,
  };
}

export function getMoonPhase(date: Date = new Date()): MoonPhaseInfo {
  // Known reference new moon: Jan 11, 2024 at 11:57 UTC
  const knownNewMoon = new Date('2024-01-11T11:57:00Z').getTime();
  const synodicMonth = 29.53058867 * 86400000;
  const diff = date.getTime() - knownNewMoon;
  const cycle = ((diff % synodicMonth) + synodicMonth) % synodicMonth;
  const ageDays = cycle / 86400000;
  const phaseFraction = cycle / synodicMonth;

  // Illumination 0% to 100%
  const illumination = Math.round(((1 - Math.cos(2 * Math.PI * phaseFraction)) / 2) * 100);

  let phaseName = 'New Moon';
  let stage: 'waxing' | 'waning' | 'full' | 'new' = 'new';

  if (phaseFraction < 0.025 || phaseFraction > 0.975) {
    phaseName = 'New Moon';
    stage = 'new';
  } else if (phaseFraction < 0.22) {
    phaseName = 'Waxing Crescent';
    stage = 'waxing';
  } else if (phaseFraction < 0.28) {
    phaseName = 'First Quarter';
    stage = 'waxing';
  } else if (phaseFraction < 0.475) {
    phaseName = 'Waxing Gibbous';
    stage = 'waxing';
  } else if (phaseFraction < 0.525) {
    phaseName = 'Full Moon';
    stage = 'full';
  } else if (phaseFraction < 0.72) {
    phaseName = 'Waning Gibbous';
    stage = 'waning';
  } else if (phaseFraction < 0.78) {
    phaseName = 'Last Quarter';
    stage = 'waning';
  } else {
    phaseName = 'Waning Crescent';
    stage = 'waning';
  }

  // Days until next new moon & next full moon
  const nextNewMoonDays = Math.round(29.53058867 - ageDays);
  const nextFullMoonDays =
    ageDays < 14.765
      ? Math.round(14.765 - ageDays)
      : Math.round(29.53058867 - ageDays + 14.765);

  return {
    ageDays: parseFloat(ageDays.toFixed(1)),
    illumination,
    phaseName,
    phaseFraction,
    stage,
    nextNewMoonDays,
    nextFullMoonDays,
  };
}
