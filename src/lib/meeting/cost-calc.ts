/**
 * Real-Time Meeting Cost Calculation & Corporate Chrono-Economics Utility
 */

export interface CurrencyConfig {
  code: string;
  symbol: string;
  name: string;
}

export const SUPPORTED_CURRENCIES: CurrencyConfig[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar ($)' },
  { code: 'EUR', symbol: '€', name: 'Euro (€)' },
  { code: 'GBP', symbol: '£', name: 'British Pound (£)' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee (₹)' },
  { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar (CA$)' },
  { code: 'AUD', symbol: 'AU$', name: 'Australian Dollar (AU$)' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen (¥)' },
];

export const MEETING_PRESETS = [
  { label: '1:1 Coaching Sync', attendees: 2, duration: 30, salary: 110000 },
  { label: 'Daily Engineering Standup', attendees: 8, duration: 15, salary: 135000 },
  { label: 'Sprint Planning / Retro', attendees: 12, duration: 60, salary: 130000 },
  { label: 'Department All-Hands', attendees: 45, duration: 60, salary: 115000 },
  { label: 'Executive Board Meeting', attendees: 10, duration: 90, salary: 250000 },
];

export const WORKING_HOURS_PER_YEAR = 2080; // 52 weeks * 40 hours

export interface MeetingCostParams {
  attendees: number;
  averageSalary: number; // annual
  durationMinutes: number;
  overheadMultiplier: number; // 1.0 = base, 1.25 = benefits + taxes + equipment
  currencySymbol: string;
}

export interface MeetingCostBreakdown {
  hourlyRatePerPerson: number;
  ratePerSecond: number;
  ratePerMinute: number;
  ratePerHour: number;
  scheduledTotalCost: number;
  formattedRatePerSecond: string;
  formattedRatePerMinute: string;
  formattedScheduledCost: string;
}

export function formatCurrencyAmount(amount: number, symbol = '$'): string {
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);

  if (symbol === '¥') {
    return `${isNegative ? '-' : ''}¥${Math.round(absAmount).toLocaleString()}`;
  }

  return `${isNegative ? '-' : ''}${symbol}${absAmount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function calculateMeetingRates(params: MeetingCostParams): MeetingCostBreakdown {
  const burdenedSalary = params.averageSalary * params.overheadMultiplier;
  const hourlyRatePerPerson = burdenedSalary / WORKING_HOURS_PER_YEAR;

  const ratePerHour = hourlyRatePerPerson * params.attendees;
  const ratePerMinute = ratePerHour / 60;
  const ratePerSecond = ratePerHour / 3600;

  const scheduledTotalCost = ratePerHour * (params.durationMinutes / 60);

  return {
    hourlyRatePerPerson,
    ratePerSecond,
    ratePerMinute,
    ratePerHour,
    scheduledTotalCost,
    formattedRatePerSecond: formatCurrencyAmount(ratePerSecond, params.currencySymbol),
    formattedRatePerMinute: formatCurrencyAmount(ratePerMinute, params.currencySymbol),
    formattedScheduledCost: formatCurrencyAmount(scheduledTotalCost, params.currencySymbol),
  };
}

export interface FunEquivalentItem {
  name: string;
  icon: string;
  unitCostUsd: number;
  count: number;
}

export function calculateEquivalents(costInUsd: number): FunEquivalentItem[] {
  const items = [
    { name: 'Artisan Espresso Lattes', icon: '☕', unitCostUsd: 5 },
    { name: 'Large Team Pizzas', icon: '🍕', unitCostUsd: 22 },
    { name: 'AirPods Pro Pairs', icon: '🎧', unitCostUsd: 249 },
    { name: 'Months of SaaS Cloud Server', icon: '💻', unitCostUsd: 75 },
    { name: 'Herman Miller Office Chairs', icon: '🪑', unitCostUsd: 1200 },
    { name: 'Roundtrip Team Flights', icon: '✈️', unitCostUsd: 450 },
  ];

  return items.map((item) => ({
    name: item.name,
    icon: item.icon,
    unitCostUsd: item.unitCostUsd,
    count: Math.floor(costInUsd / item.unitCostUsd),
  })).filter((item) => item.count >= 1);
}

export function generateSlackReceipt(
  title: string,
  attendees: number,
  durationMinutes: number,
  totalCost: number,
  ratePerMin: number,
  currencySymbol = '$'
): string {
  return [
    `🧾 *Meeting Financial Burn Receipt* | *TimeTicky*`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `📌 *Meeting:* ${title || 'Team Sync'}`,
    `👥 *Attendees:* ${attendees} participants`,
    `⏱️ *Duration:* ${durationMinutes} minutes`,
    `🔥 *Burn Rate:* ${formatCurrencyAmount(ratePerMin, currencySymbol)} / minute`,
    `💰 *Total Cost Burned:* ${formatCurrencyAmount(totalCost, currencySymbol)}`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `_Could this have been an async Slack update or a 3-minute Loom video?_`,
    `Calculate your meeting cost: https://www.timenumbers.com/meeting-cost-calculator`,
  ].join('\n');
}
