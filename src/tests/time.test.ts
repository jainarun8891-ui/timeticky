import { describe, it } from 'node:test';
import assert from 'node:assert';
import { getOffsetMinutes, getTimeDifference, isDstActive, formatTimeInZone } from '../lib/time/timezones';
import { getSunTimes } from '../lib/astronomy/sun';
import { evaluateMeetingSlots } from '../lib/meeting/planner';
import { getCityBySlug, searchCities } from '../lib/geo/cities';

describe('TimeNumbers Core Engine Tests', () => {
  it('correctly calculates India Standard Time offset (UTC+5:30)', () => {
    const d = new Date('2026-03-25T12:00:00Z');
    const offset = getOffsetMinutes(d, 'Asia/Kolkata');
    assert.strictEqual(offset, 330); // 5 hours 30 mins
  });

  it('correctly calculates Nepal Time offset (UTC+5:45)', () => {
    const d = new Date('2026-03-25T12:00:00Z');
    const offset = getOffsetMinutes(d, 'Asia/Kathmandu');
    assert.strictEqual(offset, 345); // 5 hours 45 mins
  });

  it('detects Japan Standard Time has no DST (UTC+9)', () => {
    const winter = new Date('2026-01-15T12:00:00Z');
    const summer = new Date('2026-07-15T12:00:00Z');
    assert.strictEqual(isDstActive(summer, 'Asia/Tokyo'), false);
    assert.strictEqual(getOffsetMinutes(winter, 'Asia/Tokyo'), 540);
    assert.strictEqual(getOffsetMinutes(summer, 'Asia/Tokyo'), 540);
  });

  it('calculates time difference accurately between Delhi and London', () => {
    const d = new Date('2026-01-15T12:00:00Z'); // GMT is UTC+0
    const diff = getTimeDifference('Europe/London', 'Asia/Kolkata', d);
    assert.strictEqual(diff.diffMinutes, 330);
    assert.strictEqual(diff.isAhead, true);
    assert.ok(diff.formatted.includes('5 hours 30 minutes ahead'));
  });

  it('calculates astronomical sunrise and sunset for Paris', () => {
    const d = new Date('2026-03-25T12:00:00Z');
    const sun = getSunTimes(d, 48.8566, 2.3522, 'Europe/Paris');
    assert.strictEqual(sun.isPolarDay, false);
    assert.strictEqual(sun.isPolarNight, false);
    assert.match(sun.sunrise, /^\d{2}:\d{2}$/);
    assert.match(sun.sunset, /^\d{2}:\d{2}$/);
    assert.ok(sun.dayLengthMinutes > 600); // More than 10 hours in late March
  });

  it('evaluates multi-city meeting planner slots and identifies overlaps', () => {
    const participants = [
      { name: 'Paris', timezone: 'Europe/Paris', workStartHour: 9, workEndHour: 17 },
      { name: 'London', timezone: 'Europe/London', workStartHour: 9, workEndHour: 17 },
      { name: 'Delhi', timezone: 'Asia/Kolkata', workStartHour: 9, workEndHour: 17 }
    ];
    const slots = evaluateMeetingSlots(participants);
    assert.strictEqual(slots.length, 24);
    const excellentOrGood = slots.filter(s => s.score === 'Excellent' || s.score === 'Good');
    assert.ok(excellentOrGood.length > 0);
  });

  it('searches cities by name, country, and alias', () => {
    const res1 = searchCities('Delhi');
    assert.ok(res1.some(c => c.name === 'Delhi'));

    const res2 = searchCities('IST');
    assert.ok(res2.some(c => c.name === 'Delhi'));

    const res3 = searchCities('Eiffel');
    assert.ok(res3.some(c => c.name === 'Paris'));
  });
});
