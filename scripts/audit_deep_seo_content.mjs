import fs from 'fs';
import path from 'path';

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
      routes.push({
        route: baseRoute === '' ? '/' : baseRoute,
        file: fullPath
      });
    }
  }
  return routes;
}

const allRoutes = getAppRoutes(appDir);

function getFileWords(filePath, visited = new Set()) {
  if (visited.has(filePath) || !fs.existsSync(filePath)) return 0;
  visited.add(filePath);

  const content = fs.readFileSync(filePath, 'utf8');

  // Skip pure redirect files
  if (content.includes('permanentRedirect(') && !content.includes('return <') && !content.includes('return (')) {
    return -1; // marked as redirect
  }

  // Skip standalone embed widgets (noindex)
  if (filePath.includes(path.join('app', 'embed'))) {
    return -2; // marked as embed
  }

  // Extract all text inside strings and JSX
  const cleanContent = content
    .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '') // remove comments
    .replace(/import\s+.*?from\s+['"].*?['"];?/g, '') // remove import statements
    .replace(/className=["'][^"']*["']/g, ''); // remove classes

  // Find imported local components in the same folder or @/components
  const importMatches = content.matchAll(/from\s+['"]([^'"]+)['"]/g);
  let childWords = 0;

  for (const m of importMatches) {
    const importPath = m[1];
    let resolvedPath = null;

    if (importPath.startsWith('./') || importPath.startsWith('../')) {
      const dir = path.dirname(filePath);
      const testTsx = path.resolve(dir, importPath + '.tsx');
      const testTs = path.resolve(dir, importPath + '.ts');
      const testIdx = path.resolve(dir, importPath, 'index.tsx');
      if (fs.existsSync(testTsx)) resolvedPath = testTsx;
      else if (fs.existsSync(testTs)) resolvedPath = testTs;
      else if (fs.existsSync(testIdx)) resolvedPath = testIdx;
    } else if (importPath.startsWith('@/')) {
      const relative = importPath.replace('@/', 'src/');
      const testTsx = path.resolve(relative + '.tsx');
      const testTs = path.resolve(relative + '.ts');
      const testIdx = path.resolve(relative, 'index.tsx');
      if (fs.existsSync(testTsx)) resolvedPath = testTsx;
      else if (fs.existsSync(testTs)) resolvedPath = testTs;
      else if (fs.existsSync(testIdx)) resolvedPath = testIdx;
    }

    if (resolvedPath && (resolvedPath.includes('src\\components') || resolvedPath.includes('src/components') || resolvedPath.includes('src\\app') || resolvedPath.includes('src/app'))) {
      const words = getFileWords(resolvedPath, visited);
      if (words > 0) childWords += words;
    }
  }

  const words = cleanContent
    .replace(/[^a-zA-Z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2).length;

  return words + childWords;
}

const auditResults = [];

for (const r of allRoutes) {
  const words = getFileWords(r.file);
  if (words === -1) {
    auditResults.push({ route: r.route, type: 'REDIRECT', words: 0 });
  } else if (words === -2) {
    auditResults.push({ route: r.route, type: 'EMBED', words: 0 });
  } else {
    auditResults.push({
      route: r.route,
      type: words < 350 ? 'THIN' : 'RICH',
      words,
      file: path.relative(process.cwd(), r.file)
    });
  }
}

console.log('\n=== REAL CONTENT AUDIT RESULTS ===\n');

const thin = auditResults.filter(r => r.type === 'THIN');
const rich = auditResults.filter(r => r.type === 'RICH');
const redirects = auditResults.filter(r => r.type === 'REDIRECT');
const embeds = auditResults.filter(r => r.type === 'EMBED');

console.log(`Total Routes Checked: ${auditResults.length}`);
console.log(`- Rich Content Routes (>= 350 words): ${rich.length}`);
console.log(`- 301 Permanent Redirect Routes: ${redirects.length}`);
console.log(`- Standalone Embed Widgets (noindex): ${embeds.length}`);
console.log(`- Thin Content Routes (< 350 words): ${thin.length}\n`);

if (thin.length > 0) {
  console.log('List of Thin Content Routes that need enrichment:');
  thin.forEach(t => console.log(`  [${t.words} words] ${t.route} (${t.file})`));
}
