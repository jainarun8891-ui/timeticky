import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imgDir = path.join(__dirname, '..', 'public', 'images');

const images = [
  { name: 'paris_hero', isHero: true },
  { name: 'newyork_hero', isHero: true },
  { name: 'tokyo_hero', isHero: true },
  { name: 'france_thumb', isHero: false },
  { name: 'london_thumb', isHero: false },
  { name: 'sydney_thumb', isHero: false },
];

async function optimize() {
  console.log('--- OPTIMIZING IMAGES IN public/images ---');
  let totalBefore = 0;
  let totalAfterWebp = 0;
  let totalAfterJpg = 0;

  for (const item of images) {
    const srcJpg = path.join(imgDir, `${item.name}.jpg`);
    if (!fs.existsSync(srcJpg)) {
      console.warn(`File not found: ${srcJpg}`);
      continue;
    }

    const beforeStat = fs.statSync(srcJpg);
    totalBefore += beforeStat.size;

    const inputBuffer = fs.readFileSync(srcJpg);

    const width = item.isHero ? 800 : 440;
    const quality = 78;

    // 1. Generate ultra-optimized WebP
    const webpBuffer = await sharp(inputBuffer)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toBuffer();

    const destWebp = path.join(imgDir, `${item.name}.webp`);
    fs.writeFileSync(destWebp, webpBuffer);
    totalAfterWebp += webpBuffer.length;

    // 2. Overwrite .jpg with modern compressed mozjpeg
    const jpgBuffer = await sharp(inputBuffer)
      .resize({ width, withoutEnlargement: true })
      .jpeg({ quality, mozjpeg: true })
      .toBuffer();

    fs.writeFileSync(srcJpg, jpgBuffer);
    totalAfterJpg += jpgBuffer.length;

    console.log(
      `✔ ${item.name}: ${Math.round(beforeStat.size / 1024)} KB -> WebP: ${Math.round(webpBuffer.length / 1024)} KB (-${Math.round((1 - webpBuffer.length / beforeStat.size) * 100)}%), JPG: ${Math.round(jpgBuffer.length / 1024)} KB`
    );
  }

  console.log('--------------------------------------------------');
  console.log(`TOTAL BEFORE: ${Math.round(totalBefore / 1024)} KB`);
  console.log(`TOTAL WEBP:   ${Math.round(totalAfterWebp / 1024)} KB (-${Math.round((1 - totalAfterWebp / totalBefore) * 100)}%)`);
  console.log(`TOTAL JPG:    ${Math.round(totalAfterJpg / 1024)} KB (-${Math.round((1 - totalAfterJpg / totalBefore) * 100)}%)`);
}

optimize().catch(err => {
  console.error('Optimization failed:', err);
  process.exit(1);
});
