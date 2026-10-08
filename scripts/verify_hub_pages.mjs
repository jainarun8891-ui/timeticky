import fs from 'fs';
import path from 'path';

// Read hub-pages-custom-content.ts content and extract keys
const hubContentPath = path.resolve('src/lib/seo/hub-pages-custom-content.ts');
const rawText = fs.readFileSync(hubContentPath, 'utf8');

// Match all top-level keys like "  "/some-path": {"
const keyRegex = /^\s*"(\/[^"]*)":\s*\{/gm;
const declaredKeys = new Set();
let match;
while ((match = keyRegex.exec(rawText)) !== null) {
  declaredKeys.add(match[1]);
}

console.log(`Total declared keys in HUB_PAGES_CUSTOM_CONTENT: ${declaredKeys.size}`);

// Find all usages of HUB_PAGES_CUSTOM_CONTENT['...'] across src/app/
function walkDir(dir) {
  let files = [];
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      files = files.concat(walkDir(full));
    } else if (full.endsWith('.tsx') || full.endsWith('.ts')) {
      files.push(full);
    }
  }
  return files;
}

const appFiles = walkDir('src/app');
const missingKeys = [];

for (const file of appFiles) {
  const code = fs.readFileSync(file, 'utf8');
  const usageRegex = /HUB_PAGES_CUSTOM_CONTENT\[['"]([^'"]+)['"]\]/g;
  let uMatch;
  while ((uMatch = usageRegex.exec(code)) !== null) {
    const key = uMatch[1];
    if (!declaredKeys.has(key)) {
      missingKeys.push({ file, key });
    }
  }
}

if (missingKeys.length > 0) {
  console.error("CRITICAL: Found missing keys referenced in app pages:");
  console.error(missingKeys);
} else {
  console.log("All referenced HUB_PAGES_CUSTOM_CONTENT keys exist!");
}
