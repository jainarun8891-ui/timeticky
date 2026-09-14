import { describe, it, expect } from 'vitest';
import { getOffsetMinutes, getTimeDifference, isDstActive, formatTimeInZone } from '../lib/time/timezones';
import { getSunTimes } from '../lib/astronomy/sun';
import { evaluateMeetingSlots, evaluateMeetingSlots as plannerTest } from '../lib/meeting/planner';
import { getCityBySlug, searchCities } from '../lib/geo/cities';

describe('GlobalTime Core Engine Tests', () => {
  it('correctly calculates India Standard Time offset (UTC+5:30)', () => {
    const d = new Date('2026-03-25T12:00:00Z');
    const offset = getOffsetMinutes(d, 'Asia/Kolkata');
    expect(offset).toBe(330); // 5 hours 30 mins
  });

  it('correctly calculates Nepal Time offset (UTC+5:45)', () => {
    const d = new Date('2026-03-25T12:00:00Z');
    const offset = getOffsetMinutes(d, 'Asia/Kathmandu');
    expect(offset).toBe(345); // 5 hours 45 mins
  });

  it('detects Japan Standard Time has no DST (UTC+9)', () => {
    const winter = new Date('2026-01-15T12:00:00Z');
    const summer = new Date('2026-07-15T12:00:00Z');
    expect(isDstActive(summer, 'Asia/Tokyo')).toBe(false);
    expect(getOffsetMinutes(winter, 'Asia/Tokyo')).toBe(540);
    expect(getOffsetMinutes(summer, 'Asia/Tokyo')).toBe(540);
  });

  it('calculates time difference accurately between Delhi and London', () => {
    const d = new Date('2026-01-15T12:00:00Z'); // GMT is UTC+0
    const diff = getTimeDifference('Europe/London', 'Asia/Kolkata', d);
    expect(diff.diffMinutes).toBe(330);
    expect(diff.isAhead).toBe(true);
    expect(diff.formatted).toContain('5 hours 30 minutes ahead');
  });

  it('calculates astronomical sunrise and sunset for Paris', () => {
    const d = new Date('2026-03-25T12:00:00Z');
    const sun = getSunTimes(d, 48.8566, 2.3522, 'Europe/Paris');
    expect(sun.isPolarDay).toBe(false);
    expect(sun.isPolarNight).toBe(false);
    expect(sun.sunrise).toMatch(/^\d{2}:\d{2}$/);
    expect(sun.sunset).toMatch(/^\d{2}:\d{2}$/);
    expect(sun.dayLengthMinutes).toBeGreaterThan(600); // More than 10 hours in late March
  });

  it('evaluates multi-city meeting planner slots and identifies overlaps', () => {
    const participants = [
      { name: 'Paris', timezone: 'Europe/Paris', workStartHour: 9, workEndHour: 17 },
      { name: 'London', timezone: 'Europe/London', workStartHour: 9, workEndHour: 17 },
      { name: 'Delhi', timezone: 'Asia/Kolkata', workStartHour: 9, workEndHour: 17 }
    ];
    const slots = evaluateMeetingSlots(participants);
    expect(slots.length).toBe(24);
    const excellentOrGood = slots.filter(s => s.score === 'Excellent' || s.score === 'Good');
    expect(excellentOrGood.length).toBeGreaterThan(0);
  });

  it('searches cities by name, country, and alias', () => {
    const res1 = searchCities('Delhi');
    expect(res1.some(c => c.name === 'Delhi')).toBe(true);

    const res2 = searchCities('IST');
    expect(res2.some(c => c.name === 'Delhi')).toBe(true);

    const res3 = searchCities('Eiffel');
    expect(res3.some(c => c.name === 'Paris')).toBe(true);
  });
});
