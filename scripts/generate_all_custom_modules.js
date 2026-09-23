const fs = require('fs');

const pages = JSON.parse(fs.readFileSync('site_all_pages_review.json', 'utf8'));

function createModule(name, typeName, varName, filterFn, keyFn) {
  const filtered = pages.filter(filterFn);
  const map = {};
  for (const p of filtered) {
    const key = keyFn(p);
    map[key] = {
      url: p.url,
      path: p.path,
      category: p.category,
      title: p.title,
      description: p.description,
      h1: p.h1,
      headings: p.headings,
      page_text: p.page_text,
      faqsCount: p.faqsCount,
      faqs: p.faqs
    };
  }

  const code = `export interface ${typeName} {
  url: string;
  path: string;
  category: string;
  title: string;
  description: string;
  h1: string;
  headings: string[];
  page_text: string;
  faqsCount: number;
  faqs: { question: string; answer: string }[];
}

export const ${varName}: Record<string, ${typeName}> = ${JSON.stringify(map, null, 2)};
`;

  fs.writeFileSync(`src/lib/seo/${name}.ts`, code, 'utf8');
  console.log(`Generated src/lib/seo/${name}.ts with ${Object.keys(map).length} items.`);
}

// 1. City custom content (49)
createModule(
  'city-custom-content',
  'CityCustomContent',
  'CITY_CUSTOM_CONTENT',
  p => p.category === '3.1 Canonical City Local Time',
  p => p.path.replace('/time/', '')
);

// 2. City difference custom content (72)
createModule(
  'city-difference-custom-content',
  'CityDifferenceCustomContent',
  'CITY_DIFFERENCE_CUSTOM_CONTENT',
  p => p.category === '2.3 City Pair Difference',
  p => p.path.replace('/converter/difference/', '')
);

// 3. Converter combo custom content (128)
createModule(
  'converter-combo-custom-content',
  'ConverterComboCustomContent',
  'CONVERTER_COMBO_CUSTOM_CONTENT',
  p => p.category === '2.2 Quick Conversion Combos',
  p => p.path.replace('/converter/', '')
);

// 4. Country custom content (14)
createModule(
  'country-custom-content',
  'CountryCustomContent',
  'COUNTRY_CUSTOM_CONTENT',
  p => p.category === '3.3 World Countries Directory',
  p => p.path.replace('/countries/', '')
);

// 5. Cities by country custom content (17)
createModule(
  'cities-by-country-custom-content',
  'CitiesByCountryCustomContent',
  'CITIES_BY_COUNTRY_CUSTOM_CONTENT',
  p => p.category === '3.2 Cities by Country',
  p => p.path.replace('/cities/', '')
);

// 6. Timezone custom content (18)
createModule(
  'timezone-custom-content',
  'TimezoneCustomContent',
  'TIMEZONE_CUSTOM_CONTENT',
  p => p.category === '3.5 Dedicated Timezone Page',
  p => p.path.replace('/timezone/', '')
);

// 7. Hub pages custom content (54)
createModule(
  'hub-pages-custom-content',
  'HubPageCustomContent',
  'HUB_PAGES_CUSTOM_CONTENT',
  p => ![
    '3.1 Canonical City Local Time',
    '2.3 City Pair Difference',
    '2.2 Quick Conversion Combos',
    '3.3 World Countries Directory',
    '3.2 Cities by Country',
    '3.5 Dedicated Timezone Page'
  ].includes(p.category),
  p => p.path
);
