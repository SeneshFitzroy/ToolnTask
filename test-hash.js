// Test hash function
const hashString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash &= hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
};

const testIds = [
  'garden_maintenance',
  'babysitting_service', 
  'task1',
  'task2',
  'task3',
  'power_drill_set',
  'lawn_mower'
];

console.log('Testing hash distribution:');
testIds.forEach(id => {
  const hash = hashString(id);
  console.log(`${id}: hash=${hash}, taskIndex=${hash % 10}, creatorIndex=${(hash * 7) % 5}`);
});
