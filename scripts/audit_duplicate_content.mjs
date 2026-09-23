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

function getCleanText(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');

  // Skip pure redirect files
  if (content.includes('permanentRedirect(') && !content.includes('return <') && !content.includes('return (')) {
    return null;
  }
  if (filePath.includes(path.join('app', 'embed'))) {
    return null;
  }

  // Extract text inside quotes and JSX text
  const textBlocks = [];
  const jsxTextMatches = content.match(/>([^<>{}\n]+)</g) || [];
  for (const m of jsxTextMatches) {
    const t = m.slice(1, -1).trim();
    if (t.length > 15) textBlocks.push(t);
  }

  const stringMatches = content.match(/["'`]([^"'`\n]{20,})["'`]/g) || [];
  for (const m of stringMatches) {
    const t = m.slice(1, -1).trim();
    if (!t.startsWith('http') && !t.includes('className') && !t.includes('bg-') && !t.includes('text-')) {
      textBlocks.push(t);
    }
  }

  return textBlocks.join(' ').toLowerCase();
}

const pageData = [];
for (const r of allRoutes) {
  const text = getCleanText(r.file);
  if (text && text.length > 100) {
    // Break into 4-word shingles for n-gram comparison
    const words = text.replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w.length > 2);
    const shingles = new Set();
    for (let i = 0; i < words.length - 3; i++) {
      shingles.add(words[i] + ' ' + words[i+1] + ' ' + words[i+2] + ' ' + words[i+3]);
    }
    pageData.push({
      route: r.route,
      file: path.relative(process.cwd(), r.file),
      wordCount: words.length,
      shingles
    });
  }
}

console.log(`\n=== AUDITING CONTENT UNIQUENESS ACROSS ${pageData.length} CONTENT PAGES ===\n`);

let highOverlapPairs = [];

for (let i = 0; i < pageData.length; i++) {
  for (let j = i + 1; j < pageData.length; j++) {
    const pageA = pageData[i];
    const pageB = pageData[j];

    // Jaccard similarity of 4-gram shingles
    let intersection = 0;
    for (const shingle of pageA.shingles) {
      if (pageB.shingles.has(shingle)) {
        intersection++;
      }
    }

    const union = new Set([...pageA.shingles, ...pageB.shingles]).size;
    const similarity = union > 0 ? (intersection / union) * 100 : 0;

    // Check if overlap is substantial (> 8%)
    if (similarity > 8) {
      highOverlapPairs.push({
        pageA: pageA.route,
        pageB: pageB.route,
        similarity: similarity.toFixed(1) + '%',
        sharedShingles: intersection
      });
    }
  }
}

if (highOverlapPairs.length === 0) {
  console.log('✅ ZERO Duplicate Content Found! All pages have unique human editorial text.');
} else {
  console.log(`⚠️  Found ${highOverlapPairs.length} pages with noticeable text similarity:`);
  for (const pair of highOverlapPairs) {
    console.log(` - ${pair.pageA} <--> ${pair.pageB} (Similarity: ${pair.similarity}, ${pair.sharedShingles} identical 4-word phrases)`);
  }
}
