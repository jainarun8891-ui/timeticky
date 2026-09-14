/**
 * Real-time Astronomical Solar Terminator Calculation
 * Computes exact solar declination, Greenwich hour angle, and terminator coordinates.
 */

export interface SubsolarPoint {
  declination: number; // in degrees
  subsolarLng: number; // in degrees (-180 to 180)
}

export function getSubsolarPoint(date: Date = new Date()): SubsolarPoint {
  const startOfYear = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const dayOfYear = Math.floor((date.getTime() - startOfYear.getTime()) / 86400000) + 1;

  // Solar declination (Cooper 1969 / Spencer 1971)
  const declination = -23.44 * Math.cos(((2 * Math.PI) / 365) * (dayOfYear + 10));

  // Fractional UTC hour
  const utcHours = date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600;

  // Equation of time correction
  const b = ((2 * Math.PI) / 365) * (dayOfYear - 81);
  const eotMinutes = 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b);
  const eotDeg = (eotMinutes / 60) * 15;

  // Subsolar longitude: at 12:00 UTC solar noon is at ~0° longitude
  let subsolarLng = (12 - utcHours) * 15 - eotDeg;
  while (subsolarLng > 180) subsolarLng -= 360;
  while (subsolarLng < -180) subsolarLng += 360;

  return { declination, subsolarLng };
}

/**
 * Calculates whether a specific lat/lng location is currently in daylight.
 */
export function isLocationInDaylight(lat: number, lng: number, date: Date = new Date()): boolean {
  const { declination, subsolarLng } = getSubsolarPoint(date);
  const phi = (lat * Math.PI) / 180;
  const delta = (declination * Math.PI) / 180;
  const lambdaDiff = ((lng - subsolarLng) * Math.PI) / 180;

  const cosZenith = Math.sin(phi) * Math.sin(delta) + Math.cos(phi) * Math.cos(delta) * Math.cos(lambdaDiff);
  return cosZenith > -0.0145; // -0.833° civil sunrise/sunset threshold
}

/**
 * Generates an SVG path for the nighttime shadow polygon on an Equirectangular projection.
 */
export function getSolarTerminatorSvgPath(
  date: Date = new Date(),
  width: number = 960,
  height: number = 480
): string {
  const { declination, subsolarLng } = getSubsolarPoint(date);
  const decRad = (declination * Math.PI) / 180;
  const tanDec = Math.tan(decRad);

  const points: [number, number][] = [];
  const step = 2; // Sample every 2 degrees longitude for smooth curve

  for (let lng = -180; lng <= 180; lng += step) {
    const diffRad = ((lng - subsolarLng) * Math.PI) / 180;
    let latRad = 0;
    if (Math.abs(tanDec) < 1e-4) {
      latRad = diffRad > 0 ? -Math.PI / 2 : Math.PI / 2;
    } else {
      latRad = Math.atan(-Math.cos(diffRad) / tanDec);
    }
    const latDeg = (latRad * 180) / Math.PI;

    const x = ((lng + 180) / 360) * width;
    const y = ((90 - latDeg) / 180) * height;
    points.push([x, y]);
  }

  // Determine which pole is in darkness
  // When declination >= 0 (Northern summer/autumn), South pole (lat = -90, y = height) is in darkness
  // When declination < 0 (Northern winter), North pole (lat = +90, y = 0) is in darkness
  const darkPoleY = declination >= 0 ? height : 0;

  let d = 'M ' + points[0][0].toFixed(1) + ' ' + points[0][1].toFixed(1);
  for (let i = 1; i < points.length; i++) {
    d += ' L ' + points[i][0].toFixed(1) + ' ' + points[i][1].toFixed(1);
  }
  d += ' L ' + width + ' ' + darkPoleY + ' L 0 ' + darkPoleY + ' Z';

  return d;
}
