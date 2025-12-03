/**
 * Demo script showing how to use pseudo-l10n programmatically
 */

const { generatePseudoLocaleSync, pseudoLocalize } = require('../index.js');
const path = require('path');

console.log('🎯 pseudo-l10n Demo\n');

// Example 1: Pseudo-localize a single string
console.log('Example 1: Single string pseudo-localization');
console.log('-------------------------------------------');
const originalString = 'Hello, {{name}}! Welcome to our application.';
const pseudoString = pseudoLocalize(originalString);
console.log('Original:', originalString);
console.log('Pseudo:  ', pseudoString);
console.log('');

// Example 2: Generate pseudo-locale file with default options
console.log('Example 2: Generate pseudo-locale JSON file');
console.log('-------------------------------------------');
const inputPath = path.join(__dirname, 'input.json');
const outputPath = path.join(__dirname, 'output-default.json');

try {
  generatePseudoLocaleSync(inputPath, outputPath);
  console.log('✅ Generated:', outputPath);
} catch (error) {
  console.error('❌ Error:', error.message);
}
console.log('');

// Example 3: Custom options
console.log('Example 3: Custom markers and expansion');
console.log('-------------------------------------------');
const outputPath2 = path.join(__dirname, 'output-custom.json');

try {
  generatePseudoLocaleSync(inputPath, outputPath2, {
    expansion: 30,
    startMarker: '« ',
    endMarker: ' »'
  });
  console.log('✅ Generated:', outputPath2);
} catch (error) {
  console.error('❌ Error:', error.message);
}
console.log('');

// Example 4: RTL simulation
console.log('Example 4: RTL simulation');
console.log('-------------------------------------------');
const outputPath3 = path.join(__dirname, 'output-rtl.json');

try {
  generatePseudoLocaleSync(inputPath, outputPath3, {
    rtl: true
  });
  console.log('✅ Generated:', outputPath3);
} catch (error) {
  console.error('❌ Error:', error.message);
}
console.log('');

// Example 5: Replace placeholders
console.log('Example 5: Replace placeholders');
console.log('-------------------------------------------');
const outputPath4 = path.join(__dirname, 'output-replace-placeholders.json');

try {
  generatePseudoLocaleSync(inputPath, outputPath4, {
    replacePlaceholders: true
  });
  console.log('✅ Generated:', outputPath4);
} catch (error) {
  console.error('❌ Error:', error.message);
}
console.log('');

console.log('🎉 Demo completed! Check the examples/ directory for output files.');
