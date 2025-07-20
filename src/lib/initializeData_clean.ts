import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

// Empty initial data arrays - will be populated when users create content
const initialTools: any[] = [];
const initialTasks: any[] = [];

// Function to initialize tools collection (currently disabled)
export const initializeTools = async () => {
  try {
    // Check if tools collection already has data
    const toolsSnapshot = await getDocs(collection(db, 'tools'));
    
    if (toolsSnapshot.empty && initialTools.length > 0) {
      console.log('Initializing tools collection with sample data...');
      
      for (const tool of initialTools) {
        await addDoc(collection(db, 'tools'), {
          ...tool,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
      
      console.log('Tools collection initialized successfully!');
    } else {
      console.log('Tools collection already has data or no sample data available');
    }
  } catch (error) {
    console.error('Error initializing tools:', error);
  }
};

// Function to initialize tasks collection (currently disabled)
export const initializeTasks = async () => {
  try {
    // Check if tasks collection already has data
    const tasksSnapshot = await getDocs(collection(db, 'tasks'));
    
    if (tasksSnapshot.empty && initialTasks.length > 0) {
      console.log('Initializing tasks collection with sample data...');
      
      for (const task of initialTasks) {
        await addDoc(collection(db, 'tasks'), {
          ...task,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
      
      console.log('Tasks collection initialized successfully!');
    } else {
      console.log('Tasks collection already has data or no sample data available');
    }
  } catch (error) {
    console.error('Error initializing tasks:', error);
  }
};

// Initialize all collections
export const initializeAllData = async () => {
  try {
    console.log('Starting data initialization...');
    
    await initializeTools();
    await initializeTasks();
    
    console.log('All data initialization completed!');
  } catch (error) {
    console.error('Error during data initialization:', error);
  }
};
