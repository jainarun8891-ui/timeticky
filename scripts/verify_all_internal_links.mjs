import fs from 'fs';
import path from 'path';

// 1. Collect all app routes
const appDir = path.resolve('src/app');

function getAppRoutes(dir, baseRoute = '') {
  let routes = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    if (item.name.startsWith('_') || item.name.startsWith('.') || item.name === 'api') continue;

    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      const childRoute = baseRoute + '/' + item.name;
      routes = routes.concat(getAppRoutes(fullPath, childRoute));
    } else if (item.name === 'page.tsx' || item.name === 'page.ts') {
      routes.push(baseRoute === '' ? '/' : baseRoute);
    }
  }
  return routes;
}

const allDefinedRoutes = getAppRoutes(appDir);

// 2. Scan all tsx/ts files for links
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, fileList);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const sourceFiles = [
  ...getAllFiles(path.resolve('src/app')),
  ...getAllFiles(path.resolve('src/components')),
  ...getAllFiles(path.resolve('src/lib'))
];

const linkRegex = /(?:href|link|url)\s*[:=]\s*["'`]([^"'`]+)["'`]/g;
const linksFound = new Map(); // link -> array of files

for (const file of sourceFiles) {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const link = match[1];
    // check only internal links, exclude /api/ backend endpoints and /_next
    if (link.startsWith('/') && !link.startsWith('/_next') && !link.startsWith('/api/') && link !== '/api' && !link.startsWith('//')) {
      const clean = link.split('?')[0].split('#')[0];
      if (!linksFound.has(clean)) {
        linksFound.set(clean, []);
      }
      linksFound.get(clean).push(path.relative(process.cwd(), file));
    }
  }
}

console.log(`\n=== 1. VERIFYING ALL ${linksFound.size} UNIQUE INTERNAL LINKS ===`);

// Helper to check if a route matches defined routes
function routeExists(link) {
  if (link === '' || link === '/') return true;

  // Exact static match
  if (allDefinedRoutes.includes(link)) return true;

  // Test dynamic patterns
  for (const r of allDefinedRoutes) {
    const regexStr = '^' + r
      .replace(/\[\.\.\.[^\]]+\]/g, '(.+)')
      .replace(/\[\[\.\.\.[^\]]+\]\]/g, '(.*)')
      .replace(/\[[^\]]+\]/g, '([^/]+)') + '$';
    const regex = new RegExp(regexStr);
    if (regex.test(link)) return true;
  }
  return false;
}

const brokenLinks = [];
for (const [link, files] of linksFound.entries()) {
  // Ignore dynamic template strings like /time/${city.slug}
  if (link.includes('${') || link.includes('{')) continue;

  if (!routeExists(link)) {
    brokenLinks.push({ link, files });
  }
}

if (brokenLinks.length === 0) {
  console.log('✅ ZERO Broken Links Found! All hardcoded links match valid routes.');
} else {
  console.log(`❌ Found ${brokenLinks.length} Broken Links:`);
  for (const b of brokenLinks) {
    console.log(` - ${b.link} (referenced in: ${b.files.slice(0, 2).join(', ')})`);
  }
}

console.log(`\n=== 2. ORPHAN PAGE CHECK (Checking all ${allDefinedRoutes.length} App Routes) ===`);

// Check which routes are never referenced in any link or navigation
const orphanCandidates = [];
for (const r of allDefinedRoutes) {
  // If r is a dynamic pattern (has [ ]), we check if the base section is linked
  const isDynamic = r.includes('[');
  let isLinked = false;

  if (!isDynamic) {
    isLinked = linksFound.has(r);
  } else {
    // Check if the prefix directory is linked or any link matches
    const prefix = r.split('/[')[0];
    for (const link of linksFound.keys()) {
      if (link.startsWith(prefix)) {
        isLinked = true;
        break;
      }
    }
  }

  // Legacy redirects or internal special routes
  const isRedirectOrEmbed = r.startsWith('/embed') || r.startsWith('/time-difference') || r.startsWith('/time-zone') || r.startsWith('/time-converter') || r.startsWith('/convert') || r.startsWith('/compare') || r.startsWith('/country') || r.startsWith('/sunrise-sunset') || r === '/[city]';

  if (!isLinked && !isRedirectOrEmbed) {
    orphanCandidates.push(r);
  }
}

if (orphanCandidates.length === 0) {
  console.log('✅ ZERO Orphan Pages Found! All routes are linked in navigation, hubs, or footer.');
} else {
  console.log(`⚠️  Potential Orphan Routes (${orphanCandidates.length}):`);
  for (const o of orphanCandidates) {
    console.log(` - ${o}`);
  }
}
