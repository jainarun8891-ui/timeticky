const fs = require('fs');
const path = require('path');

// Extract all <Link ... href="..."> or <a ... href="..."> from TSX/JSX
function extractLinksFromFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const links = new Set();
  
  // Static string hrefs
  const staticRegex = /(?:href|url)\s*[:=]\s*["']([^"'`#?]+)["']/g;
  let m;
  while ((m = staticRegex.exec(content)) !== null) {
    if (m[1].startsWith('/') && !m[1].startsWith('//') && !m[1].startsWith('/api')) {
      links.add(m[1]);
    }
  }

  // Template string hrefs
  const templateRegex = /(?:href|url)\s*[:=]\s*`([^`#?]+)`/g;
  while ((m = templateRegex.exec(content)) !== null) {
    // If it has no expressions or we can analyze it
    const val = m[1];
    if (val.startsWith('/') && !val.includes('${')) {
      links.add(val);
    }
  }

  return Array.from(links);
}

// Map files to routes
console.log('Testing crawl link extraction...');
const headerLinks = extractLinksFromFile('./src/components/layout/Header.tsx');
const footerLinks = extractLinksFromFile('./src/components/layout/Footer.tsx');
const relatedHubLinks = extractLinksFromFile('./src/components/common/RelatedLinksHub.tsx');

console.log('Header links count:', headerLinks.length);
console.log('Footer links count:', footerLinks.length);
console.log('RelatedLinksHub links count:', relatedHubLinks.length);

const globalLinks = new Set([...headerLinks, ...footerLinks, ...relatedHubLinks]);
console.log('Total globally reachable links from template:', globalLinks.size);
