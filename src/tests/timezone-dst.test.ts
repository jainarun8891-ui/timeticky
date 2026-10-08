import { describe, it } from 'node:test';
import assert from 'node:assert';
import { getOffsetMinutes, isDstActive, getTimeDifference } from '../lib/time/timezones';
import { getUtcOffsetMinutes, isDstActive as isDstActiveEngine, getUtcOffsetString } from '../lib/time/engine';
import { getSolarTimes } from '../lib/astronomy/calculator';
import { getSunTimes } from '../lib/astronomy/sun';

describe('TimeNumbers P0 Timezone & DST Accuracy Test Suite', () => {
  it('correctly handles America/New_York DST transitions', () => {
    // Winter (Standard Time - EST = UTC-5 = -300 mins)
    const winter = new Date('2026-01-15T12:00:00Z');
    assert.strictEqual(getOffsetMinutes(winter, 'America/New_York'), -300);
    assert.strictEqual(getUtcOffsetMinutes('America/New_York', winter), -300);
    assert.strictEqual(isDstActive(winter, 'America/New_York'), false);

    // Summer (Daylight Time - EDT = UTC-4 = -240 mins)
    const summer = new Date('2026-07-15T12:00:00Z');
    assert.strictEqual(getOffsetMinutes(summer, 'America/New_York'), -240);
    assert.strictEqual(getUtcOffsetMinutes('America/New_York', summer), -240);
    assert.strictEqual(isDstActive(summer, 'America/New_York'), true);
  });

  it('correctly handles America/Los_Angeles DST transitions', () => {
    // Winter PST = UTC-8 = -480 mins
    const winter = new Date('2026-01-15T12:00:00Z');
    assert.strictEqual(getOffsetMinutes(winter, 'America/Los_Angeles'), -480);
    assert.strictEqual(isDstActive(winter, 'America/Los_Angeles'), false);

    // Summer PDT = UTC-7 = -420 mins
    const summer = new Date('2026-07-15T12:00:00Z');
    assert.strictEqual(getOffsetMinutes(summer, 'America/Los_Angeles'), -420);
    assert.strictEqual(isDstActive(summer, 'America/Los_Angeles'), true);
  });

  it('correctly handles Europe/London DST transitions', () => {
    // Winter GMT = UTC+0 = 0 mins
    const winter = new Date('2026-01-15T12:00:00Z');
    assert.strictEqual(getOffsetMinutes(winter, 'Europe/London'), 0);
    assert.strictEqual(isDstActive(winter, 'Europe/London'), false);

    // Summer BST = UTC+1 = 60 mins
    const summer = new Date('2026-07-15T12:00:00Z');
    assert.strictEqual(getOffsetMinutes(summer, 'Europe/London'), 60);
    assert.strictEqual(isDstActive(summer, 'Europe/London'), true);
  });

  it('correctly handles Europe/Berlin DST transitions', () => {
    // Winter CET = UTC+1 = 60 mins
    const winter = new Date('2026-01-15T12:00:00Z');
    assert.strictEqual(getOffsetMinutes(winter, 'Europe/Berlin'), 60);
    assert.strictEqual(isDstActive(winter, 'Europe/Berlin'), false);

    // Summer CEST = UTC+2 = 120 mins
    const summer = new Date('2026-07-15T12:00:00Z');
    assert.strictEqual(getOffsetMinutes(summer, 'Europe/Berlin'), 120);
    assert.strictEqual(isDstActive(summer, 'Europe/Berlin'), true);
  });

  it('correctly calculates Asia/Kolkata non-DST half-hour offset (UTC+5:30)', () => {
    const d1 = new Date('2026-01-15T12:00:00Z');
    const d2 = new Date('2026-07-15T12:00:00Z');
    assert.strictEqual(getOffsetMinutes(d1, 'Asia/Kolkata'), 330);
    assert.strictEqual(getOffsetMinutes(d2, 'Asia/Kolkata'), 330);
    assert.strictEqual(isDstActive(d1, 'Asia/Kolkata'), false);
    assert.strictEqual(isDstActive(d2, 'Asia/Kolkata'), false);
    assert.strictEqual(getUtcOffsetString('Asia/Kolkata', d1), 'UTC +5:30');
  });

  it('correctly calculates Asia/Kathmandu non-DST quarter-hour offset (UTC+5:45)', () => {
    const d1 = new Date('2026-01-15T12:00:00Z');
    const d2 = new Date('2026-07-15T12:00:00Z');
    assert.strictEqual(getOffsetMinutes(d1, 'Asia/Kathmandu'), 345);
    assert.strictEqual(getOffsetMinutes(d2, 'Asia/Kathmandu'), 345);
    assert.strictEqual(isDstActive(d1, 'Asia/Kathmandu'), false);
    assert.strictEqual(getUtcOffsetString('Asia/Kathmandu', d1), 'UTC +5:45');
  });

  it('correctly handles Southern Hemisphere DST for Australia/Sydney', () => {
    // Southern Winter (July) -> Standard Time AEST = UTC+10 = +600 mins
    const winter = new Date('2026-07-15T12:00:00Z');
    assert.strictEqual(getOffsetMinutes(winter, 'Australia/Sydney'), 600);
    assert.strictEqual(isDstActive(winter, 'Australia/Sydney'), false);

    // Southern Summer (January) -> Daylight Time AEDT = UTC+11 = +660 mins
    const summer = new Date('2026-01-15T12:00:00Z');
    assert.strictEqual(getOffsetMinutes(summer, 'Australia/Sydney'), 660);
    assert.strictEqual(isDstActive(summer, 'Australia/Sydney'), true);
  });

  it('correctly handles Southern Hemisphere DST for Pacific/Auckland', () => {
    // Southern Winter (July) -> Standard Time NZST = UTC+12 = +720 mins
    const winter = new Date('2026-07-15T12:00:00Z');
    assert.strictEqual(getOffsetMinutes(winter, 'Pacific/Auckland'), 720);
    assert.strictEqual(isDstActive(winter, 'Pacific/Auckland'), false);

    // Southern Summer (January) -> Daylight Time NZDT = UTC+13 = +780 mins
    const summer = new Date('2026-01-15T12:00:00Z');
    assert.strictEqual(getOffsetMinutes(summer, 'Pacific/Auckland'), 780);
    assert.strictEqual(isDstActive(summer, 'Pacific/Auckland'), true);
  });

  it('correctly handles astronomical Polar Day (Midnight Sun) in Longyearbyen (Svalbard, 78°N)', () => {
    // June 21 summer solstice at 78.22°N
    const solstice = new Date('2026-06-21T12:00:00Z');
    const solar = getSolarTimes(78.2232, 15.6267, solstice, 120);
    assert.strictEqual(solar.isPolarDay, true);
    assert.strictEqual(solar.isPolarNight, false);
    assert.strictEqual(solar.sunrise, 'Midnight Sun');
    assert.strictEqual(solar.sunset, 'Midnight Sun');
    assert.strictEqual(solar.dayLengthMinutes, 1440);
  });

  it('correctly handles astronomical Polar Night in Longyearbyen (Svalbard, 78°N)', () => {
    // December 21 winter solstice at 78.22°N
    const winterSolstice = new Date('2026-12-21T12:00:00Z');
    const solar = getSolarTimes(78.2232, 15.6267, winterSolstice, 60);
    assert.strictEqual(solar.isPolarNight, true);
    assert.strictEqual(solar.isPolarDay, false);
    assert.strictEqual(solar.sunrise, 'Polar Night');
    assert.strictEqual(solar.sunset, 'Polar Night');
    assert.strictEqual(solar.dayLengthMinutes, 0);
  });
});
