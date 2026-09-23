import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      if (file !== 'api' && !file.startsWith('_') && !file.startsWith('.')) {
        results = results.concat(walk(full));
      }
    } else if (file === 'page.tsx') {
      results.push(full);
    }
  });
  return results;
}

const pages = walk('src/app');
console.log('Total page.tsx files:', pages.length);

let withFaqs = 0;
let withoutFaqs = [];

pages.forEach(p => {
  const content = fs.readFileSync(p, 'utf8');
  if (content.includes('permanentRedirect(') && !content.includes('return <') && !content.includes('return (')) {
    // redirect
    return;
  }
  if (p.includes('embed')) return; // embed widget
  
  if (content.includes('FaqAccordion') || content.includes('type="faq"') || content.includes('allFaqs') || content.includes('FAQS') || content.includes('faqs =') || content.includes('faqs:')) {
    withFaqs++;
  } else {
    withoutFaqs.push(p.replace(/\\/g, '/'));
  }
});

console.log('Pages with FAQs detected:', withFaqs);
console.log('Pages without FAQs detected:', withoutFaqs.length);
console.log(withoutFaqs);
