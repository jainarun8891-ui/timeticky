import fs from 'fs';
import path from 'path';

function findFiles(dir, filter) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(findFiles(fullPath, filter));
    } else if (filter(fullPath)) {
      results.push(fullPath);
    }
  }
  return results;
}

const pages = findFiles('src/app', p => p.endsWith('page.tsx'));
const missingJsonLdFaq = [];

for (const p of pages) {
  const content = fs.readFileSync(p, 'utf8');
  const hasFaqAccordion = content.includes('FaqAccordion') || content.includes('FAQS') || content.includes('faqs');
  const hasJsonLdFaq = content.includes('type="faq"') || content.includes('FAQPage');
  if (hasFaqAccordion && !hasJsonLdFaq) {
    missingJsonLdFaq.push(p);
  }
}

console.log(`Pages with FAQ content but MISSING FAQPage Schema (${missingJsonLdFaq.length} pages):`);
missingJsonLdFaq.forEach(p => console.log(' - ' + p));
