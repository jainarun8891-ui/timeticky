/**
 * Life in Weeks (Memento Mori) Chrono-Philosophy Utility
 * High-performance 4,160-week calculation engine for human longevity visualization.
 */

export interface LifeEra {
  name: string;
  startAge: number;
  endAge: number;
  color: string;
  bgColor: string;
  description: string;
}

export const LIFE_ERAS: LifeEra[] = [
  {
    name: 'Early Wonder',
    startAge: 0,
    endAge: 4,
    color: '#38bdf8', // Sky 400
    bgColor: 'rgba(56, 189, 248, 0.2)',
    description: 'First words, childhood discovery, subconscious foundation.',
  },
  {
    name: 'School & Youth',
    startAge: 5,
    endAge: 17,
    color: '#818cf8', // Indigo 400
    bgColor: 'rgba(129, 140, 248, 0.2)',
    description: 'Formative education, foundational friendships, identity formation.',
  },
  {
    name: 'Twenties & Exploration',
    startAge: 18,
    endAge: 29,
    color: '#a855f7', // Purple 500
    bgColor: 'rgba(168, 85, 247, 0.2)',
    description: 'Higher education, first career, high-stakes life choices, autonomy.',
  },
  {
    name: 'Prime Career & Family',
    startAge: 30,
    endAge: 49,
    color: '#10b981', // Emerald 500
    bgColor: 'rgba(16, 185, 129, 0.2)',
    description: 'Peak productivity, deep domain expertise, raising families, compounding.',
  },
  {
    name: 'Mastery & Mentorship',
    startAge: 50,
    endAge: 64,
    color: '#f59e0b', // Amber 500
    bgColor: 'rgba(245, 158, 11, 0.2)',
    description: 'Executive leadership, mentoring younger generations, philosophical clarity.',
  },
  {
    name: 'Golden Years & Legacy',
    startAge: 65,
    endAge: 85,
    color: '#f43f5e', // Rose 500
    bgColor: 'rgba(244, 63, 94, 0.2)',
    description: 'Reflective retirement, deep hobbies, family legacy, peace of mind.',
  },
];

export const MEMENTO_MORI_QUOTES = [
  {
    quote: 'It is not that we have a short time to live, but that we waste a lot of it.',
    author: 'Lucius Annaeus Seneca',
    source: 'On the Shortness of Life',
  },
  {
    quote: 'You could leave life right now. Let that determine what you do and say and think.',
    author: 'Marcus Aurelius',
    source: 'Meditations (Book II)',
  },
  {
    quote: 'Remembering that you are going to die is the best way I know to avoid the trap of thinking you have something to lose.',
    author: 'Steve Jobs',
    source: 'Stanford Commencement Address',
  },
  {
    quote: 'How long are you going to wait before you demand the best for yourself?',
    author: 'Epictetus',
    source: 'Discourses',
  },
];

export const LIFE_PROGRAMMATIC_PRESETS = [
  { slug: 'age-20', age: 20, label: 'Life in Weeks at Age 20' },
  { slug: 'age-25', age: 25, label: 'Life in Weeks at Age 25' },
  { slug: 'age-30', age: 30, label: 'Life in Weeks at Age 30' },
  { slug: 'age-35', age: 35, label: 'Life in Weeks at Age 35' },
  { slug: 'age-40', age: 40, label: 'Life in Weeks at Age 40' },
  { slug: 'age-50', age: 50, label: 'Life in Weeks at Age 50' },
  { slug: 'age-60', age: 60, label: 'Life in Weeks at Age 60' },
  { slug: '80-year-life-grid', age: 30, label: '80-Year Life in Weeks Grid' },
];

export interface LifeStats {
  birthdate: Date;
  lifespanYears: number;
  totalWeeks: number;
  weeksLived: number;
  weeksRemaining: number;
  percentageLived: number;
  ageYearsExact: number;
  currentWeekIndex: number;
  summersRemaining: number;
  weekendsRemaining: number;
  booksEstimatedRemaining: number;
}

export function calculateLifeStats(
  birthdateStr: string,
  lifespanYears = 80,
  booksPerYear = 6
): LifeStats {
  const birthdate = new Date(birthdateStr);
  const now = new Date();

  const diffMs = Math.max(0, now.getTime() - birthdate.getTime());
  const oneWeekMs = 7 * 24 * 60 * 60 * 1000;
  const oneYearMs = 365.25 * 24 * 60 * 60 * 1000;

  const weeksLived = Math.min(
    lifespanYears * 52,
    Math.floor(diffMs / oneWeekMs)
  );

  const totalWeeks = lifespanYears * 52;
  const weeksRemaining = Math.max(0, totalWeeks - weeksLived);
  const percentageLived = Math.min(100, Math.max(0, (weeksLived / totalWeeks) * 100));

  const ageYearsExact = diffMs / oneYearMs;
  const summersRemaining = Math.max(0, Math.floor(lifespanYears - ageYearsExact));
  const weekendsRemaining = weeksRemaining; // 1 weekend per remaining week
  const booksEstimatedRemaining = Math.round(summersRemaining * booksPerYear);

  return {
    birthdate,
    lifespanYears,
    totalWeeks,
    weeksLived,
    weeksRemaining,
    percentageLived,
    ageYearsExact,
    currentWeekIndex: weeksLived,
    summersRemaining,
    weekendsRemaining,
    booksEstimatedRemaining,
  };
}

export function getEraForAge(age: number): LifeEra {
  const era = LIFE_ERAS.find((e) => age >= e.startAge && age <= e.endAge);
  return era || LIFE_ERAS[LIFE_ERAS.length - 1];
}

export function getEraForWeek(weekIndex: number): LifeEra {
  const age = Math.floor(weekIndex / 52);
  return getEraForAge(age);
}
