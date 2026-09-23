const { createJiti } = require('jiti');
const path = require('path');

const jiti = createJiti(path.join(process.cwd(), 'index.js'), {
  alias: { '@': path.join(process.cwd(), 'src') }
});

try {
  jiti('./src/tests/time.test.ts');
} catch (err) {
  console.error('Test execution failed:', err);
  process.exit(1);
}
