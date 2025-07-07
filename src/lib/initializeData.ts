import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

// Initial tools data
const initialTools = [
  {
    id: 1,
    title: "Power Drill Set",
    description: "Professional Bosch power drill with multiple bits. Perfect for home improvement projects.",
    price: "Rs. 1,500/day",
    brand: "Bosch",
    condition: "Excellent",
    available: true,
    isPromoted: true,
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=300&fit=crop",
    category: "power",
    specifications: {
      power: "18V",
      chuckSize: "13mm",
      speed: "0-2000 RPM",
      torque: "65 Nm"
    },
    features: [
      "LED light for dark areas",
      "Ergonomic grip design",
      "Variable speed control",
      "Includes 20 drill bits"
    ],
    owner: {
      name: "John Silva",
      email: "john@example.com",
      phone: "+94 71 234 5678",
      location: "Colombo 03"
    }
  },
  {
    id: 2,
    title: "Lawn Mower",
    description: "Electric lawn mower in great condition. Ideal for medium to large gardens.",
    price: "Rs. 2,000/day",
    brand: "Honda",
    condition: "Good",
    available: true,
    image: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=400&h=300&fit=crop",
    category: "garden",
    specifications: {
      power: "1200W",
      cuttingWidth: "38cm",
      heightAdjustment: "3 levels",
      grassBox: "40L capacity"
    },
    features: [
      "Electric start",
      "Lightweight design",
      "Adjustable cutting height",
      "Large grass collection box"
    ],
    owner: {
      name: "Maria Perera",
      email: "maria@example.com",
      phone: "+94 77 345 6789",
      location: "Kandy"
    }
  },
  {
    id: 3,
    title: "Angle Grinder",
    description: "Heavy-duty angle grinder for metal cutting and grinding projects.",
    price: "Rs. 1,200/day",
    brand: "Makita",
    condition: "Excellent",
    available: false,
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
    category: "power",
    specifications: {
      power: "900W",
      discSize: "115mm",
      speed: "11,000 RPM",
      weight: "1.8kg"
    },
    features: [
      "Side handle for better control",
      "Spindle lock for easy disc changes",
      "Motor protection",
      "Includes cutting and grinding discs"
    ],
    owner: {
      name: "Rohan Fernando",
      email: "rohan@example.com",
      phone: "+94 70 456 7890",
      location: "Galle"
    }
  },
  {
    id: 4,
    title: "Circular Saw",
    description: "Professional circular saw for woodworking and construction projects.",
    price: "Rs. 1,800/day",
    brand: "DeWalt",
    condition: "Good",
    available: true,
    image: "https://images.unsplash.com/photo-1609010697446-11f2155278f0?w=400&h=300&fit=crop",
    category: "power",
    specifications: {
      power: "1400W",
      bladeSize: "184mm",
      cuttingDepth: "65mm",
      bevelCapacity: "0-45°"
    },
    features: [
      "Laser guide for precision",
      "Dust blower keeps line clear",
      "Ergonomic design",
      "Includes carbide blade"
    ],
    owner: {
      name: "Kasun Mendis",
      email: "kasun@example.com",
      phone: "+94 76 567 8901",
      location: "Colombo 07"
    }
  },
  {
    id: 5,
    title: "Pressure Washer",
    description: "High-pressure washer for cleaning driveways, decks, and exterior surfaces.",
    price: "Rs. 2,500/day",
    brand: "Karcher",
    condition: "Excellent",
    available: true,
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=300&fit=crop",
    category: "equipment",
    specifications: {
      pressure: "140 bar",
      flow: "360 L/h",
      power: "1800W",
      hoseLength: "6m"
    },
    features: [
      "Adjustable pressure nozzle",
      "Detergent tank",
      "Compact storage",
      "Quick connect fittings"
    ],
    owner: {
      name: "Nimal Rajapaksa",
      email: "nimal@example.com",
      phone: "+94 75 678 9012",
      location: "Mount Lavinia"
    }
  },
  {
    id: 6,
    title: "Tile Cutter",
    description: "Professional tile cutting machine for bathroom and kitchen renovations.",
    price: "Rs. 1,000/day",
    brand: "Rubi",
    condition: "Good",
    available: true,
    image: "https://images.unsplash.com/photo-1581087062550-f3b0a25b6cdc?w=400&h=300&fit=crop",
    category: "hand",
    specifications: {
      maxTileSize: "60cm",
      cuttingLength: "93cm",
      thickness: "20mm",
      weight: "15kg"
    },
    features: [
      "Adjustable angle cuts",
      "Precision measuring guide",
      "Smooth cutting action",
      "Includes spare cutting wheel"
    ],
    owner: {
      name: "Chamara Dias",
      email: "chamara@example.com",
      phone: "+94 71 789 0123",
      location: "Negombo"
    }
  }
];

// Initial tasks data
const initialTasks = [
  {
    id: 1,
    title: "Garden Maintenance",
    description: "Looking for someone to help with weekly garden maintenance including weeding, pruning, and lawn care.",
    price: "Rs. 5,000",
    time: "2-3 hours",
    location: "Colombo 03",
    isUrgent: true,
    isPromoted: true,
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
    category: "gardening",
    deadline: "2025-01-15",
    requirements: [
      "Experience with garden maintenance",
      "Own tools preferred",
      "Available weekends",
      "Physical fitness required"
    ],
    additionalInfo: {
      gardenSize: "Medium (500 sqm)",
      frequency: "Weekly",
      duration: "3 months contract",
      startDate: "2025-01-08"
    },
    creator: {
      name: "Priya Wickramasinghe",
      email: "priya@example.com",
      phone: "+94 71 123 4567",
      location: "Colombo 03"
    }
  },
  {
    id: 2,
    title: "House Cleaning",
    description: "Need help with deep cleaning of 3-bedroom house. All supplies provided.",
    price: "Rs. 8,000",
    time: "4-5 hours",
    location: "Kandy",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    category: "cleaning",
    deadline: "2025-01-20",
    requirements: [
      "Experience in house cleaning",
      "Attention to detail",
      "Reliable and trustworthy",
      "Available weekdays"
    ],
    additionalInfo: {
      houseSize: "3 bedrooms, 2 bathrooms",
      frequency: "One-time deep clean",
      supplies: "All cleaning supplies provided",
      parking: "Free parking available"
    },
    creator: {
      name: "Anura Bandara",
      email: "anura@example.com",
      phone: "+94 77 234 5678",
      location: "Kandy"
    }
  },
  {
    id: 3,
    title: "Babysitting Service",
    description: "Reliable babysitting for 2 kids (ages 5 and 8) for weekend evenings.",
    price: "Rs. 3,000",
    time: "4 hours",
    location: "Galle",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop",
    category: "babysitting",
    deadline: "2025-01-12",
    requirements: [
      "Experience with children",
      "First aid knowledge preferred",
      "Available weekend evenings",
      "Responsible and caring"
    ],
    additionalInfo: {
      childrenAges: "5 and 8 years old",
      frequency: "Weekend evenings",
      duration: "6pm to 10pm",
      activities: "Help with homework, play time"
    },
    creator: {
      name: "Sanduni Perera",
      email: "sanduni@example.com",
      phone: "+94 70 345 6789",
      location: "Galle"
    }
  },
  {
    id: 4,
    title: "Furniture Assembly",
    description: "Need help assembling IKEA furniture including wardrobe and desk.",
    price: "Rs. 4,500",
    time: "3 hours",
    location: "Colombo 07",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    category: "repairs",
    deadline: "2025-01-10",
    requirements: [
      "Experience with furniture assembly",
      "Own tools required",
      "Available weekends",
      "Attention to detail"
    ],
    additionalInfo: {
      furniture: "1 wardrobe, 1 desk, 1 bookshelf",
      brand: "IKEA",
      complexity: "Medium difficulty",
      location: "2nd floor apartment"
    },
    creator: {
      name: "Ravindu Silva",
      email: "ravindu@example.com",
      phone: "+94 76 456 7890",
      location: "Colombo 07"
    }
  },
  {
    id: 5,
    title: "Pet Walking",
    description: "Looking for someone to walk my dog twice a day for a week.",
    price: "Rs. 2,500",
    time: "1 hour/day",
    location: "Mount Lavinia",
    image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400&h=300&fit=crop",
    category: "other",
    deadline: "2025-01-08",
    requirements: [
      "Love for animals",
      "Available mornings and evenings",
      "Physically active",
      "Reliable schedule"
    ],
    additionalInfo: {
      petType: "Golden Retriever",
      petAge: "3 years old",
      walkDuration: "30 minutes each walk",
      frequency: "Twice daily for 1 week"
    },
    creator: {
      name: "Tharaka Jayawardena",
      email: "tharaka@example.com",
      phone: "+94 75 567 8901",
      location: "Mount Lavinia"
    }
  },
  {
    id: 6,
    title: "Cooking Assistance",
    description: "Need help preparing meals for a family gathering of 20 people.",
    price: "Rs. 6,000",
    time: "5-6 hours",
    location: "Negombo",
    image: "https://images.unsplash.com/photo-1556909114-4bd048e7d4c8?w=400&h=300&fit=crop",
    category: "other",
    deadline: "2025-01-18",
    requirements: [
      "Experience in cooking for large groups",
      "Knowledge of Sri Lankan cuisine",
      "Available full day",
      "Food safety knowledge"
    ],
    additionalInfo: {
      guests: "20 people",
      menuType: "Traditional Sri Lankan",
      duration: "Full day preparation",
      kitchen: "Fully equipped kitchen available"
    },
    creator: {
      name: "Kumari Alwis",
      email: "kumari@example.com",
      phone: "+94 71 678 9012",
      location: "Negombo"
    }
  }
];

// Function to initialize tools data
export const initializeToolsData = async () => {
  try {
    // Check if tools collection already has data
    const toolsSnapshot = await getDocs(collection(db, 'tools'));
    
    if (toolsSnapshot.empty) {
      console.log('Initializing tools data...');
      
      for (const tool of initialTools) {
        await addDoc(collection(db, 'tools'), {
          ...tool,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          status: 'active'
        });
      }
      
      console.log('Tools data initialized successfully!');
    } else {
      console.log('Tools data already exists');
    }
  } catch (error) {
    console.error('Error initializing tools data:', error);
  }
};

// Function to initialize tasks data
export const initializeTasksData = async () => {
  try {
    // Check if tasks collection already has data
    const tasksSnapshot = await getDocs(collection(db, 'tasks'));
    
    if (tasksSnapshot.empty) {
      console.log('Initializing tasks data...');
      
      for (const task of initialTasks) {
        await addDoc(collection(db, 'tasks'), {
          ...task,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          status: 'active'
        });
      }
      
      console.log('Tasks data initialized successfully!');
    } else {
      console.log('Tasks data already exists');
    }
  } catch (error) {
    console.error('Error initializing tasks data:', error);
  }
};

// Function to initialize all data
export const initializeAllData = async () => {
  await initializeToolsData();
  await initializeTasksData();
};
