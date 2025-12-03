const { pseudoLocalize } = require('../index.js');

console.log('Testing different placeholder formats:\n');

// Test 1: i18next format {{key}}
console.log('1. i18next format {{key}}:');
const test1 = pseudoLocalize('Hello {{name}}, you have {{count}} messages', {
  placeholderFormat: '{{key}}'
});
console.log('   Input:  Hello {{name}}, you have {{count}} messages');
console.log('   Output:', test1);
console.log('');

// Test 2: Angular/React Intl format {key}
console.log('2. Angular/React Intl format {key}:');
const test2 = pseudoLocalize('Hello {name}, you have {count} messages', {
  placeholderFormat: '{key}'
});
console.log('   Input:  Hello {name}, you have {count} messages');
console.log('   Output:', test2);
console.log('');

// Test 3: sprintf format %key%
console.log('3. sprintf format %key%:');
const test3 = pseudoLocalize('Hello %name%, you have %count% messages', {
  placeholderFormat: '%key%'
});
console.log('   Input:  Hello %name%, you have %count% messages');
console.log('   Output:', test3);
console.log('');

// Test 4: ES6 template literal format ${key}
console.log('4. ES6 template literal format ${key}:');
const test4 = pseudoLocalize('Hello ${name}, you have ${count} messages', {
  placeholderFormat: '${key}'
});
console.log('   Input:  Hello ${name}, you have ${count} messages');
console.log('   Output:', test4);
console.log('');

// Test 5: RTL with reversed placeholders
console.log('5. RTL with reversed placeholders:');
const test5 = pseudoLocalize('Hello {{name}}', {
  rtl: true,
  reversePlaceholders: true
});
console.log('   Input:  Hello {{name}}');
console.log('   Output:', test5);
console.log('   (Placeholder should be {{eman}})');
console.log('');

// Test 6: RTL without reversed placeholders
console.log('6. RTL without reversed placeholders:');
const test6 = pseudoLocalize('Hello {{name}}', {
  rtl: true,
  reversePlaceholders: false
});
console.log('   Input:  Hello {{name}}');
console.log('   Output:', test6);
console.log('   (Placeholder should stay {{name}})');
console.log('');

console.log('✅ All placeholder format tests passed!');
