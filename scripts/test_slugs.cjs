const fs = require('fs');
const content = fs.readFileSync('./src/lib/geo/cities.ts', 'utf8');
const cityBlocks = content.split(/id:\s*"/).slice(1);

for (const block of cityBlocks) {
  const id = block.split('"')[0];
  const nameMatch = block.match(/name:\s*"([^"]+)"/);
  const name = nameMatch ? nameMatch[1] : '';
  const prefix = id.replace(/-[a-z]{2}$/, '');
  const normalized = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  console.log(`${id} | name: "${name}" | prefix: "${prefix}" | normalized: "${normalized}"`);
}
