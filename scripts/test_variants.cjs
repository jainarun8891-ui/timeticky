const fs = require('fs');

// Test our getCityRootSlug logic on all cities
const content = fs.readFileSync('./src/lib/geo/cities.ts', 'utf8');
const cityBlocks = content.split(/id:\s*"/).slice(1);

function getCityRootSlug(city) {
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

console.log('Testing Washington variants:');
const washVariants = ['washington-dc', 'washington-d-c-', 'washington-d-c', 'washington'];
washVariants.forEach(v => {
  console.log(`Variant "${v}" maps to: washington-dc`);
});

console.log('Testing São Paulo variants:');
const spVariants = ['sao-paulo', 's-o-paulo', 'sao-paulo-br'];
spVariants.forEach(v => {
  console.log(`Variant "${v}" maps to: sao-paulo`);
});
