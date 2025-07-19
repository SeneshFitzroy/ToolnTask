const generateTaskData = (id) => {
  const hashString = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  };

  const taskTypes = [
    { title: 'Garden Maintenance & Landscaping', category: 'Gardening' },
    { title: 'Babysitting Service', category: 'Childcare' },
    { title: 'House Cleaning Service', category: 'Cleaning' },
    { title: 'Pet Walking & Care', category: 'Pet Care' },
    { title: 'Furniture Assembly', category: 'Handyman' },
    { title: 'Car Washing & Detailing', category: 'Automotive' },
    { title: 'Moving & Packing Help', category: 'Moving' },
    { title: 'Tutoring & Academic Help', category: 'Education' },
    { title: 'Cooking & Meal Prep', category: 'Food' },
    { title: 'Event Planning Assistance', category: 'Events' }
  ];

  const hash = hashString(id);
  const taskIndex = hash % taskTypes.length;
  const selectedTask = taskTypes[taskIndex];

  return {
    id,
    title: selectedTask.title,
    category: selectedTask.category,
    taskIndex
  };
};

console.log('Testing different IDs:');
console.log('garden_maintenance:', JSON.stringify(generateTaskData('garden_maintenance'), null, 2));
console.log('babysitting_service:', JSON.stringify(generateTaskData('babysitting_service'), null, 2));
console.log('test_task:', JSON.stringify(generateTaskData('test_task'), null, 2));
