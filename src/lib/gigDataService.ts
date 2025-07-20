// Dynamic data generator for unique gig details
export interface TaskData {
  id: string;
  title: string;
  price: string;
  category: string;
  urgent: boolean;
  description: string;
  duration: string;
  location: string;
  posted: string;
  deadline: string;
  images: string[];
  requirements: string[];
  creator: {
    name: string;
    avatar: string;
    rating: number;
    completedTasks: number;
    memberSince: string;
  };
}

export interface ToolData {
  id: string;
  title: string;
  price: string;
  category: string;
  available: boolean;
  description: string;
  location: string;
  posted: string;
  condition: string;
  deposit: string;
  images: string[];
  features: string[];
  specifications: {
    [key: string]: string;
  };
  owner: {
    name: string;
    avatar: string;
    rating: number;
    toolsRented: number;
    memberSince: string;
    responseTime: string;
  };
}

// Generate unique task data based on ID
export const generateTaskData = (id: string): TaskData | null => {
  // Return null - no sample data, only real user-created tasks will be shown
  return null;
};

// Generate unique tool data based on ID
export const generateToolData = (id: string): ToolData | null => {
  // Return null - no sample data, only real user-created tools will be shown
  return null;
};

// Helper functions for future use when real data is available
export const formatPrice = (price: number, currency: string = 'Rs.'): string => {
  return `${currency} ${price.toLocaleString()}`;
};

export const calculateHash = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

export const getRandomElement = <T>(array: T[], seed: number): T => {
  return array[seed % array.length];
};
