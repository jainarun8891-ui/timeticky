import fs from 'fs';
import path from 'path';

const appDir = path.resolve('src/app');

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, fileList);
    } else {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const allAppFiles = getAllFiles(appDir).filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));

// Also check components
const compDir = path.resolve('src/components');
const allCompFiles = getAllFiles(compDir).filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));

const allFiles = [...allAppFiles, ...allCompFiles];

console.log(`Analyzing ${allFiles.length} source files for links and content...`);

const linkRegex = /href=["'`]([^"'`]+)["'`]/g;
const linksFound = new Set();
const linkSources = {};

for (const file of allFiles) {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const link = match[1];
    if (link.startsWith('/') && !link.startsWith('/_next') && !link.startsWith('/api') && !link.includes('{')) {
      linksFound.add(link);
      if (!linkSources[link]) linkSources[link] = [];
      linkSources[link].push(path.relative(process.cwd(), file));
    }
  }
}

console.log(`Found ${linksFound.size} unique internal links.`);

// Check for legacy links that shouldn't be used directly:
const legacyPrefixes = [
  '/time-converter',
  '/time-zone-converter',
  '/convert',
  '/time-difference',
  '/compare',
  '/country',
  '/sunrise-sunset'
];

const flaggedLinks = [];
for (const link of linksFound) {
  // Ignore external or query params
  const cleanLink = link.split('?')[0].split('#')[0];
  
  // Check if link starts with legacy prefix and is NOT /countries, /converter, /sun
  for (const prefix of legacyPrefixes) {
    if (cleanLink === prefix || (cleanLink.startsWith(prefix + '/') && !cleanLink.startsWith('/countries') && !cleanLink.startsWith('/converter'))) {
      flaggedLinks.push({ link: cleanLink, sources: linkSources[link] });
      break;
    }
  }
}

console.log(`\n--- Flagged Legacy Links Found in Source Code (${flaggedLinks.length}) ---`);
flaggedLinks.forEach(f => {
  console.log(`[LEGACY LINK]: ${f.link}`);
  console.log(`  Sources: ${f.sources.slice(0, 3).join(', ')}`);
});
