import { CITIES, City } from './cities';

export function findCityByRootSlug(rawSlug: string): City | undefined {
  if (!rawSlug) return undefined;
  const slug = rawSlug.toLowerCase().trim();

  // 1. Direct match with id or full slug
  const direct = CITIES.find(c => c.id === slug || c.slug === slug);
  if (direct) return direct;

  // 2. Direct match with name slugified (e.g. 'new-york', 'delhi', 'paris')
  const byName = CITIES.find(c => {
    const nameSlug = c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    return nameSlug === slug;
  });
  if (byName) return byName;

  // 3. Match prefix before hyphen if country is attached (e.g. 'new-york-us' -> 'new-york')
  const byPrefix = CITIES.find(c => {
    const idPrefix = c.id.replace(/-[a-z]{2}$/, '');
    return idPrefix === slug;
  });
  if (byPrefix) return byPrefix;

  // 4. Alias match
  return CITIES.find(c => c.aliases.some(a => a.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug));
}

export function getAllRootCitySlugs(): string[] {
  const set = new Set<string>();
  CITIES.forEach(c => {
    const nameSlug = c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    set.add(nameSlug);
    set.add(c.slug);
    set.add(c.id);
  });
  return Array.from(set);
}
