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

