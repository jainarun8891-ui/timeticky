/**
 * Astronomical Moon Phase & City Climate/Ambience Intelligence
 */

export interface MoonPhaseInfo {
  phaseName: string;
  illumination: number; // 0 to 100%
  emoji: string;
  daysToFullMoon: number;
}

export function getMoonPhase(date: Date = new Date()): MoonPhaseInfo {
  // Known reference new moon: Jan 11 2024 11:57 UTC
  const refNewMoon = new Date(Date.UTC(2024, 0, 11, 11, 57)).getTime();
  const synodicMonthMs = 29.53058867 * 86400 * 1000;

  const diff = date.getTime() - refNewMoon;
  const cycleFraction = ((diff % synodicMonthMs) + synodicMonthMs) % synodicMonthMs / synodicMonthMs;
  const ageDays = cycleFraction * 29.53058867;

  // Illumination percentage
  const illumination = Math.round((1 - Math.cos(cycleFraction * 2 * Math.PI)) / 2 * 100);

  let phaseName = 'New Moon';
  let emoji = '🌑';

  if (ageDays < 1.84) {
    phaseName = 'New Moon';
    emoji = '🌑';
  } else if (ageDays < 5.53) {
    phaseName = 'Waxing Crescent';
    emoji = '🌒';
  } else if (ageDays < 9.22) {
    phaseName = 'First Quarter';
    emoji = '🌓';
  } else if (ageDays < 12.91) {
    phaseName = 'Waxing Gibbous';
    emoji = '🌔';
  } else if (ageDays < 16.61) {
    phaseName = 'Full Moon';
    emoji = '🌕';
  } else if (ageDays < 20.30) {
    phaseName = 'Waning Gibbous';
    emoji = '🌖';
  } else if (ageDays < 23.99) {
    phaseName = 'Last Quarter';
    emoji = '🌗';
  } else if (ageDays < 27.68) {
    phaseName = 'Waning Crescent';
    emoji = '🌘';
  } else {
    phaseName = 'New Moon';
    emoji = '🌑';
  }

  // Days to next full moon (age 14.76 days)
  let daysToFull = Math.round((14.765 - ageDays + 29.53) % 29.53);
  if (daysToFull === 0) daysToFull = 29;

  return {
    phaseName,
    illumination,
    emoji,
    daysToFullMoon: daysToFull
  };
}

export interface CityClimate {
  temperatureC: number;
  temperatureF: number;
  condition: string;
  icon: string;
  airQuality: string;
}

export function getCityClimate(cityName: string, isDay: boolean): CityClimate {
  const name = cityName.toLowerCase();

  // Curated seasonal climate profile for major world cities
  if (name.includes('paris')) {
    return { temperatureC: isDay ? 21 : 14, temperatureF: isDay ? 70 : 57, condition: isDay ? 'Partly Cloudy' : 'Clear Sky', icon: isDay ? '⛅' : '🌙', airQuality: 'Good (AQI 28)' };
  }
  if (name.includes('new york')) {
    return { temperatureC: isDay ? 22 : 16, temperatureF: isDay ? 72 : 61, condition: isDay ? 'Sunny & Crisp' : 'Clear Night', icon: isDay ? '☀️' : '🌙', airQuality: 'Moderate (AQI 42)' };
  }
  if (name.includes('tokyo')) {
    return { temperatureC: isDay ? 26 : 20, temperatureF: isDay ? 79 : 68, condition: isDay ? 'Clear Skies' : 'City Twilight', icon: isDay ? '☀️' : '✨', airQuality: 'Good (AQI 22)' };
  }
  if (name.includes('london')) {
    return { temperatureC: isDay ? 18 : 12, temperatureF: isDay ? 64 : 54, condition: isDay ? 'Overcast Breeze' : 'Cool Night', icon: isDay ? '⛅' : '☁️', airQuality: 'Good (AQI 31)' };
  }
  if (name.includes('dubai')) {
    return { temperatureC: isDay ? 36 : 29, temperatureF: isDay ? 97 : 84, condition: isDay ? 'Sunny & Warm' : 'Warm Evening', icon: isDay ? '☀️' : '🌴', airQuality: 'Moderate (AQI 58)' };
  }
  if (name.includes('delhi')) {
    return { temperatureC: isDay ? 32 : 25, temperatureF: isDay ? 90 : 77, condition: isDay ? 'Warm & Sunny' : 'Clear Evening', icon: isDay ? '🌤️' : '🌙', airQuality: 'Moderate (AQI 85)' };
  }
  if (name.includes('sydney')) {
    return { temperatureC: isDay ? 20 : 13, temperatureF: isDay ? 68 : 55, condition: isDay ? 'Pleasant Spring' : 'Crisp Night', icon: isDay ? '🌤️' : '⭐', airQuality: 'Excellent (AQI 14)' };
  }
  if (name.includes('san francisco')) {
    return { temperatureC: isDay ? 18 : 12, temperatureF: isDay ? 64 : 54, condition: isDay ? 'Mild Coastal Breeze' : 'Foggy Evening', icon: isDay ? '🌫️' : '🌉', airQuality: 'Good (AQI 25)' };
  }
  if (name.includes('singapore')) {
    return { temperatureC: isDay ? 30 : 26, temperatureF: isDay ? 86 : 79, condition: 'Tropical Warmth', icon: '🌴', airQuality: 'Good (AQI 30)' };
  }
  
  return {
    temperatureC: isDay ? 22 : 15,
    temperatureF: isDay ? 72 : 59,
    condition: isDay ? 'Fair Weather' : 'Clear Night',
    icon: isDay ? '☀️' : '🌙',
    airQuality: 'Good (AQI 30)'
  };
}
