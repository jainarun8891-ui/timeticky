import { CITIES } from '../src/lib/geo/cities.ts';
import { findCityByRootSlug } from '../src/lib/geo/city-lookup.ts';

console.log('--- CHECKING CITIES SLUGS ---');
for (const city of CITIES) {
  const naiveSlug = city.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const trimmedSlug = city.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  const lookupNaive = findCityByRootSlug(naiveSlug);
  const lookupTrimmed = findCityByRootSlug(trimmedSlug);

  if (!lookupNaive) {
    console.log(`FAIL naive: "${city.name}" -> naiveSlug: "${naiveSlug}" (NOT FOUND!)`);
  }
  if (!lookupTrimmed) {
    console.log(`FAIL trimmed: "${city.name}" -> trimmedSlug: "${trimmedSlug}" (NOT FOUND!)`);
  }
  if (naiveSlug !== trimmedSlug) {
    console.log(`DIFF: "${city.name}": naive="${naiveSlug}" vs trimmed="${trimmedSlug}"`);
  }
}
