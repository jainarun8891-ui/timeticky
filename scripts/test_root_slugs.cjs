const fs = require('fs');
const content = fs.readFileSync('./src/lib/geo/cities.ts', 'utf8');
const cityBlocks = content.split(/id:\s*"/).slice(1);

function getCityRootSlug(city) {
  if (city.id === 'washington-dc-us') return 'washington-dc';
  if (city.id === 'sao-paulo-br') return 'sao-paulo';
  return city.name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

for (const block of cityBlocks) {
  const id = block.split('"')[0];
  const nameMatch = block.match(/name:\s*"([^"]+)"/);
  const name = nameMatch ? nameMatch[1] : '';
  const slug = getCityRootSlug({ id, name });
  console.log(`${id} => ${name} => /${slug}`);
}
console.log('Total cities checked:', cityBlocks.length);
