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
  const dayLengthFormatted = `${hours}h ${mins}m`;

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
