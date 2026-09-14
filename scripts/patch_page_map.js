const fs = require('fs');

const pageContent = fs.readFileSync('src/app/page.tsx', 'utf8');
const updated = pageContent.replace(
  '<WorldMapCard city={selectedCity} />',
  '<WorldMapCard city={selectedCity} onSelectCity={(city) => setSelectedCity(city)} />'
);
fs.writeFileSync('src/app/page.tsx', updated, 'utf8');
console.log('page.tsx updated with onSelectCity for WorldMapCard');
