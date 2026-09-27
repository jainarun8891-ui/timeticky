import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  calculateBedtimes,
  calculateWakeTimes,
  parseSleepSlug,
  formatTime12,
} from '../lib/sleep/sleep-calc';
import {
  calculateMeetingRates,
  calculateEquivalents,
  formatCurrencyAmount,
  generateSlackReceipt,
} from '../lib/meeting/cost-calc';
import {
  calculateLifeStats,
  getEraForAge,
  getEraForWeek,
} from '../lib/life/life-weeks';
import {
  slugifyEventTitle,
  resolveEventData,
} from '../lib/countdown/countdown-utils';

describe('Viral Features Test Suite', () => {
  describe('Sleep Cycle Calculator', () => {
    it('calculates optimal bedtimes for 7:00 AM wake-up with 14-min latency', () => {
      const results = calculateBedtimes(7, 0, 14);
      assert.strictEqual(results.length, 4);

      // 5 cycles = 450 mins + 14 mins latency = 464 mins before 7:00 AM = 11:16 PM
      const fiveCycles = results.find((r) => r.cycles === 5);
      assert.ok(fiveCycles);
      assert.strictEqual(fiveCycles.timeFormatted, '11:16 PM');
      assert.strictEqual(fiveCycles.quality, 'recommended');

      // 6 cycles = 540 mins + 14 mins = 554 mins before 7:00 AM = 9:46 PM
      const sixCycles = results.find((r) => r.cycles === 6);
      assert.ok(sixCycles);
      assert.strictEqual(sixCycles.timeFormatted, '9:46 PM');
      assert.strictEqual(sixCycles.quality, 'optimal');
    });

    it('calculates optimal wake times for 11:00 PM bedtime', () => {
      const results = calculateWakeTimes(23, 0, 14);
      assert.strictEqual(results.length, 4);

      // 5 cycles = 14 mins + 450 mins = 464 mins after 11:00 PM = 6:44 AM
      const fiveCycles = results.find((r) => r.cycles === 5);
      assert.ok(fiveCycles);
      assert.strictEqual(fiveCycles.timeFormatted, '6:44 AM');
    });

    it('correctly parses programmatic sleep slugs', () => {
      const p1 = parseSleepSlug('wake-up-at-7am');
      assert.ok(p1);
      assert.strictEqual(p1.mode, 'wake');
      assert.strictEqual(p1.hour, 7);
      assert.strictEqual(p1.minute, 0);

      const p2 = parseSleepSlug('wake-up-at-6-30am');
      assert.ok(p2);
      assert.strictEqual(p2.mode, 'wake');
      assert.strictEqual(p2.hour, 6);
      assert.strictEqual(p2.minute, 30);

      const p3 = parseSleepSlug('bedtime-11pm');
      assert.ok(p3);
      assert.strictEqual(p3.mode, 'bed');
      assert.strictEqual(p3.hour, 23);

      const p4 = parseSleepSlug('fall-asleep-now');
      assert.ok(p4);
      assert.strictEqual(p4.mode, 'now');
    });
  });

  describe('Real-Time Meeting Cost Calculator', () => {
    it('accurately computes burn rates and totals for 8 attendees at $130,000 salary', () => {
      const rates = calculateMeetingRates({
        attendees: 8,
        averageSalary: 130000,
        durationMinutes: 60,
        overheadMultiplier: 1.25, // $162,500 burdened
        currencySymbol: '$',
      });

      // Burdened hourly rate per person = 162500 / 2080 = $78.125
      // 8 attendees = $625.00 / hour
      // Rate per min = $625 / 60 = ~$10.4166
      // Rate per sec = $625 / 3600 = ~$0.1736
      assert.strictEqual(Math.round(rates.ratePerHour), 625);
      assert.strictEqual(Math.round(rates.scheduledTotalCost), 625);
      assert.strictEqual(rates.formattedScheduledCost, '$625.00');
    });

    it('calculates equivalents and formats Slack receipt', () => {
      const equivs = calculateEquivalents(500);
      assert.ok(equivs.length > 0);
      const coffees = equivs.find((e) => e.name.includes('Espresso'));
      assert.ok(coffees);
      assert.strictEqual(coffees.count, 100); // $500 / $5

      const receipt = generateSlackReceipt('Quarterly Sync', 10, 45, 800, 17.77, '$');
      assert.ok(receipt.includes('*Meeting Financial Burn Receipt*'));
      assert.ok(receipt.includes('$800.00'));
      assert.ok(receipt.includes('10 participants'));
    });
  });

  describe('Life in Weeks (Memento Mori)', () => {
    it('computes exact weeks lived and remaining for an 80-year lifespan', () => {
      // Create a birthdate exactly 20 years ago (1,040 weeks)
      const now = new Date();
      const birth = new Date(now.getFullYear() - 20, now.getMonth(), now.getDate());
      const stats = calculateLifeStats(birth.toISOString().slice(0, 10), 80);

      assert.strictEqual(stats.lifespanYears, 80);
      assert.strictEqual(stats.totalWeeks, 4160);
      assert.ok(stats.weeksLived >= 1040 && stats.weeksLived <= 1045);
      assert.ok(stats.weeksRemaining > 3100);
      assert.ok(stats.percentageLived >= 24.5 && stats.percentageLived <= 25.5);
      assert.ok(stats.summersRemaining >= 59 && stats.summersRemaining <= 60);
    });

    it('resolves correct life eras for childhood, twenties, career, and legacy', () => {
      assert.strictEqual(getEraForAge(3).name, 'Early Wonder');
      assert.strictEqual(getEraForAge(15).name, 'School & Youth');
      assert.strictEqual(getEraForAge(25).name, 'Twenties & Exploration');
      assert.strictEqual(getEraForAge(40).name, 'Prime Career & Family');
      assert.strictEqual(getEraForAge(55).name, 'Mastery & Mentorship');
      assert.strictEqual(getEraForAge(70).name, 'Golden Years & Legacy');
    });
  });

  describe('Custom Event Countdown Generator', () => {
    it('slugifies titles into clean URL-friendly slugs', () => {
      assert.strictEqual(slugifyEventTitle("Sarah & Alex's Wedding!"), 'sarah-alexs-wedding');
      assert.strictEqual(slugifyEventTitle('Product Hunt Launch 2026 🚀'), 'product-hunt-launch-2026');
    });

    it('resolves canonical events and custom dynamic query params', () => {
      const canonical = resolveEventData('new-year');
      assert.strictEqual(canonical.name, 'New Year 2027');
      assert.strictEqual(canonical.isCustom, undefined);

      const custom = resolveEventData('tokyo-vacation', {
        title: 'Trip to Tokyo',
        date: '2026-11-15T18:00',
        emoji: '🏖️',
      });
      assert.strictEqual(custom.name, 'Trip to Tokyo');
      assert.strictEqual(custom.emoji, '🏖️');
      assert.strictEqual(custom.isCustom, true);
    });
  });
});
