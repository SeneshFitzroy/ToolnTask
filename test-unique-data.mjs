// Quick test of gigDataService
import { generateTaskData, generateToolData } from './src/lib/gigDataService.js';

console.log('Testing unique gig data generation:');
console.log('\n=== Garden Maintenance ===');
const gardenTask = generateTaskData('garden_maintenance_enhanced');
console.log('Title:', gardenTask.title);
console.log('Price:', gardenTask.price);
console.log('Location:', gardenTask.location);

console.log('\n=== Babysitting Service ===');
const babysittingTask = generateTaskData('babysitting_service_enhanced');
console.log('Title:', babysittingTask.title);
console.log('Price:', babysittingTask.price);
console.log('Location:', babysittingTask.location);

console.log('\n=== House Cleaning ===');
const cleaningTask = generateTaskData('house_cleaning_enhanced');
console.log('Title:', cleaningTask.title);
console.log('Price:', cleaningTask.price);
console.log('Location:', cleaningTask.location);

console.log('\n=== Power Drill Tool ===');
const drillTool = generateToolData('power_drill_enhanced');
console.log('Title:', drillTool.title);
console.log('Price:', drillTool.price);
console.log('Location:', drillTool.location);
