import { CITIES, City } from './cities';

/**
 * Standardized single source of truth for canonical root city slugs.
 * Guarantees clean, diacritic-free, lowercase, hyphen-trimmed slugs.
 * E.g., "Washington D.C." -> "washington-dc", "São Paulo" -> "sao-paulo"
 */
export function getCityRootSlug(city: { id: string; name: string }): string {
  if (!city) return '';
  if (city.id === 'washington-dc-us' || city.name.toLowerCase().includes('washington')) {
    return 'washington-dc';
  }
  if (city.id === 'sao-paulo-br' || city.name.toLowerCase().includes('paulo')) {
    return 'sao-paulo';
  }
  return city.name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function findCityByRootSlug(rawSlug: string): City | undefined {
  if (!rawSlug) return undefined;
  const slug = rawSlug.toLowerCase().trim();

  // 1. Direct match for known special cases / historical crawler variants
  if (
    slug === 'washington-dc' ||
    slug === 'washington-d-c-' ||
    slug === 'washington-d-c' ||
    slug === 'washington' ||
    slug === 'washington-dc-us' ||
    slug === 'washington-dc-united-states'
  ) {
    return CITIES.find(c => c.id === 'washington-dc-us');
  }

  if (
    slug === 'sao-paulo' ||
    slug === 's-o-paulo' ||
    slug === 'sao-paulo-br' ||
    slug === 'sao-paulo-brazil'
  ) {
    return CITIES.find(c => c.id === 'sao-paulo-br');
  }

  // 2. Direct match with canonical root slug
  const byRootSlug = CITIES.find(c => getCityRootSlug(c) === slug);
  if (byRootSlug) return byRootSlug;

  // 3. Direct match with id or full slug
  const direct = CITIES.find(c => c.id === slug || c.slug === slug);
  if (direct) return direct;

  // 4. Match prefix before country code (e.g. 'new-york-us' -> 'new-york')
  const byPrefix = CITIES.find(c => c.id.replace(/-[a-z]{2}$/, '') === slug);
  if (byPrefix) return byPrefix;

  // 5. Name slugified fallback
  const byName = CITIES.find(c => {
    const nameSlug = c.name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    return nameSlug === slug;
  });
  if (byName) return byName;

  // 6. Alias match
  return CITIES.find(c =>
    c.aliases.some(a => {
      const aNorm = a
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      return aNorm === slug;
    })
  );
}

export function getAllRootCitySlugs(): string[] {
  const set = new Set<string>();
  CITIES.forEach(c => {
    set.add(getCityRootSlug(c));
    set.add(c.slug);
    set.add(c.id);
  });
  return Array.from(set);
}

export const POPULAR_TIME_DIFFERENCE_PAIRS: { cityA: string; cityB: string }[] = [
  { cityA: 'new-york', cityB: 'london' },
  { cityA: 'london', cityB: 'new-york' },
  { cityA: 'delhi', cityB: 'new-york' },
  { cityA: 'new-york', cityB: 'delhi' },
  { cityA: 'london', cityB: 'tokyo' },
  { cityA: 'tokyo', cityB: 'london' },
  { cityA: 'sydney', cityB: 'new-york' },
  { cityA: 'new-york', cityB: 'sydney' },
  { cityA: 'sydney', cityB: 'london' },
  { cityA: 'london', cityB: 'sydney' },
  { cityA: 'new-york', cityB: 'paris' },
  { cityA: 'paris', cityB: 'new-york' },
  { cityA: 'london', cityB: 'paris' },
  { cityA: 'paris', cityB: 'london' },
  { cityA: 'new-york', cityB: 'tokyo' },
  { cityA: 'tokyo', cityB: 'new-york' },
  { cityA: 'new-york', cityB: 'los-angeles' },
  { cityA: 'los-angeles', cityB: 'new-york' },
  { cityA: 'new-york', cityB: 'chicago' },
  { cityA: 'chicago', cityB: 'new-york' },
  { cityA: 'dubai', cityB: 'delhi' },
  { cityA: 'delhi', cityB: 'dubai' },
  { cityA: 'dubai', cityB: 'london' },
  { cityA: 'london', cityB: 'dubai' },
  { cityA: 'dubai', cityB: 'singapore' },
  { cityA: 'singapore', cityB: 'dubai' },
  { cityA: 'singapore', cityB: 'london' },
  { cityA: 'london', cityB: 'singapore' },
  { cityA: 'singapore', cityB: 'tokyo' },
  { cityA: 'tokyo', cityB: 'singapore' },
  { cityA: 'singapore', cityB: 'sydney' },
  { cityA: 'sydney', cityB: 'singapore' },
  { cityA: 'hong-kong', cityB: 'london' },
  { cityA: 'london', cityB: 'hong-kong' },
  { cityA: 'hong-kong', cityB: 'new-york' },
  { cityA: 'new-york', cityB: 'hong-kong' },
  { cityA: 'san-francisco', cityB: 'london' },
  { cityA: 'london', cityB: 'san-francisco' },
  { cityA: 'san-francisco', cityB: 'paris' },
  { cityA: 'paris', cityB: 'san-francisco' },
  { cityA: 'san-francisco', cityB: 'tokyo' },
  { cityA: 'tokyo', cityB: 'san-francisco' },
  { cityA: 'los-angeles', cityB: 'tokyo' },
  { cityA: 'tokyo', cityB: 'los-angeles' },
  { cityA: 'los-angeles', cityB: 'london' },
  { cityA: 'london', cityB: 'los-angeles' },
  { cityA: 'chicago', cityB: 'london' },
  { cityA: 'london', cityB: 'chicago' },
  { cityA: 'chicago', cityB: 'paris' },
  { cityA: 'paris', cityB: 'chicago' },
  { cityA: 'boston', cityB: 'london' },
  { cityA: 'london', cityB: 'boston' },
  { cityA: 'boston', cityB: 'paris' },
  { cityA: 'paris', cityB: 'boston' },
  { cityA: 'seattle', cityB: 'london' },
  { cityA: 'london', cityB: 'seattle' },
  { cityA: 'mumbai', cityB: 'new-york' },
  { cityA: 'new-york', cityB: 'mumbai' },
  { cityA: 'mumbai', cityB: 'london' },
  { cityA: 'london', cityB: 'mumbai' },
  { cityA: 'mumbai', cityB: 'dubai' },
  { cityA: 'dubai', cityB: 'mumbai' },
  { cityA: 'bengaluru', cityB: 'new-york' },
  { cityA: 'new-york', cityB: 'bengaluru' },
  { cityA: 'bengaluru', cityB: 'london' },
  { cityA: 'london', cityB: 'bengaluru' },
  { cityA: 'toronto', cityB: 'london' },
  { cityA: 'london', cityB: 'toronto' },
  { cityA: 'berlin', cityB: 'london' },
  { cityA: 'london', cityB: 'berlin' },
  { cityA: 'sao-paulo', cityB: 'new-york' },
  { cityA: 'new-york', cityB: 'sao-paulo' },
  { cityA: 'sao-paulo', cityB: 'london' },
  { cityA: 'london', cityB: 'sao-paulo' },

  // Top Google Trends Breakout Pairs
  { cityA: 'los-angeles', cityB: 'honolulu' },
  { cityA: 'honolulu', cityB: 'los-angeles' },
  { cityA: 'dallas', cityB: 'los-angeles' },
  { cityA: 'los-angeles', cityB: 'dallas' },
  { cityA: 'dallas', cityB: 'honolulu' },
  { cityA: 'honolulu', cityB: 'dallas' },
  { cityA: 'honolulu', cityB: 'new-york' },
  { cityA: 'new-york', cityB: 'honolulu' },
  { cityA: 'los-angeles', cityB: 'miami' },
  { cityA: 'miami', cityB: 'los-angeles' },
  { cityA: 'phoenix', cityB: 'los-angeles' },
  { cityA: 'los-angeles', cityB: 'phoenix' },
  { cityA: 'chicago', cityB: 'los-angeles' },
  { cityA: 'los-angeles', cityB: 'chicago' },
  { cityA: 'houston', cityB: 'new-york' },
  { cityA: 'new-york', cityB: 'houston' },
  { cityA: 'seattle', cityB: 'new-york' },
  { cityA: 'new-york', cityB: 'seattle' }
];

export function getTimeDifferencePairsForCity(citySlug: string): { cityA: string; cityB: string }[] {
  const clean = citySlug.toLowerCase().trim();
  return POPULAR_TIME_DIFFERENCE_PAIRS.filter(p => p.cityA === clean || p.cityB === clean);
}

export function getRelatedDifferencePairs(slugA: string, slugB: string, limit: number = 8): { cityA: string; cityB: string }[] {
  const cleanA = slugA.toLowerCase().trim();
  const cleanB = slugB.toLowerCase().trim();
  return POPULAR_TIME_DIFFERENCE_PAIRS.filter(
    p => (p.cityA === cleanA || p.cityB === cleanA || p.cityA === cleanB || p.cityB === cleanB) &&
         !(p.cityA === cleanA && p.cityB === cleanB)
  ).slice(0, limit);
}

