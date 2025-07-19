// Test actual task data generation
const fs = require('fs');

// Read the actual gigDataService content
const gigDataService = fs.readFileSync('./src/lib/gigDataService.ts', 'utf8');

// Extract just the task types for testing
const taskTypes = [
  {
    title: "Garden Maintenance & Landscaping",
    category: "Gardening"
  },
  {
    title: "Babysitting Service", 
    category: "Childcare"
  },
  {
    title: "House Cleaning Service",
    category: "Cleaning"
  },
  {
    title: "Pet Walking & Care",
    category: "Pet Care"
  },
  {
    title: "Furniture Assembly",
    category: "Handyman"
  },
  {
    title: "Car Washing & Detailing",
    category: "Automotive"
  },
  {
    title: "Moving & Packing Help",
    category: "Moving"
  },
  {
    title: "Tutoring & Academic Help",
    category: "Education"
  },
  {
    title: "Cooking & Meal Prep",
    category: "Food Service"
  },
  {
    title: "Tech Support & Setup",
    category: "Technology"
  }
];

const hashString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash &= hash;
  }
  return Math.abs(hash);
};

const testIds = [
  'garden_maintenance',
  'babysitting_service', 
  'task1',
  'task2',
  'task3'
];

console.log('Testing actual task generation:');
testIds.forEach(id => {
  const hash = hashString(id);
  const taskIndex = hash % taskTypes.length;
  const task = taskTypes[taskIndex];
  console.log(`${id}: -> "${task.title}" (${task.category})`);
});
