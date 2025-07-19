// Test the new gigDataService
const { generateTaskData, generateToolData } = require('./src/lib/gigDataService.ts');

console.log('Testing unique gig data generation:');
console.log('\n=== Garden Maintenance ===');
console.log(JSON.stringify(generateTaskData('garden_maintenance_enhanced'), null, 2));

console.log('\n=== Babysitting Service ===');
console.log(JSON.stringify(generateTaskData('babysitting_service_enhanced'), null, 2));

console.log('\n=== House Cleaning ===');
console.log(JSON.stringify(generateTaskData('house_cleaning_enhanced'), null, 2));

console.log('\n=== Tool Test ===');
console.log(JSON.stringify(generateToolData('power_drill_enhanced'), null, 2));
