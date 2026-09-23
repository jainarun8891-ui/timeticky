import { getOffsetMinutes, getUtcOffsetString, getTimeDifference, isDstActive } from '../src/lib/time/timezones';
import { getCityBySlug, CITIES } from '../src/lib/geo/cities';

function formatHourAmPm(hour24: number): string {
  const normalized = ((hour24 % 24) + 24) % 24;
  const h = Math.floor(normalized);
  const m = Math.round((normalized - h) * 60);
  const period = h >= 12 ? 'PM' : 'AM';
  const displayH = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${displayH}:00 ${period}` : `${displayH}:${String(m).padStart(2, '0')} ${period}`;
}

function calculateBusinessOverlap(tzA: string, tzB: string, cityAName: string, cityBName: string) {
  const diff = getTimeDifference(tzA, tzB);
  const diffHours = diff.diffHours;

  const startB = Math.max(9, 9 + diffHours);
  const endB = Math.min(17, 17 + diffHours);

  if (startB < endB) {
    const overlapHours = endB - startB;
    const startA = startB - diffHours;
    const endA = endB - diffHours;
    return `Based on standard working hours (9:00 AM – 5:00 PM), the optimal window for a mutual meeting is between ${formatHourAmPm(startA)} and ${formatHourAmPm(endA)} in ${cityAName}, which corresponds to ${formatHourAmPm(startB)} and ${formatHourAmPm(endB)} in ${cityBName} (${overlapHours} overlapping hour${overlapHours === 1 ? '' : 's'}).`;
  } else {
    // No direct 9-5 overlap
    const morningA = 8;
    const morningB = morningA + diffHours;
    return `Because ${cityAName} and ${cityBName} are separated by ${Math.abs(diffHours)} hours, standard 9:00 AM – 5:00 PM business hours do not directly overlap. The most practical collaboration window is early morning in ${cityAName} (${formatHourAmPm(morningA)}) corresponding to ${formatHourAmPm(morningB)} in ${cityBName}, or using asynchronous communication.`;
  }
}

const ny = getCityBySlug('new-york-united-states')!;
const lon = getCityBySlug('london-united-kingdom')!;
const del = getCityBySlug('delhi-india')!;
const tok = getCityBySlug('tokyo-japan')!;

console.log('--- Overlap Tests ---');
console.log('NY to London:', calculateBusinessOverlap(ny.timezone, lon.timezone, ny.name, lon.name));
console.log('NY to Delhi:', calculateBusinessOverlap(ny.timezone, del.timezone, ny.name, del.name));
console.log('London to Tokyo:', calculateBusinessOverlap(lon.timezone, tok.timezone, lon.name, tok.name));
