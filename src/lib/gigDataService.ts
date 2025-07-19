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
export const generateTaskData = (id: string): TaskData => {
  const taskTypes = [
    {
      title: "Garden Maintenance & Landscaping",
      category: "Gardening",
      description: "Looking for an experienced gardener to help maintain my medium-sized garden. Tasks include weeding, pruning shrubs, lawn care, and basic landscaping. All tools and equipment will be provided.",
      requirements: [
        "Previous gardening experience required",
        "Own basic hand tools (gloves, pruning shears)",
        "Ability to work outdoors in various weather",
        "Physical fitness for manual labor",
        "Knowledge of plant care and maintenance"
      ],
      images: [
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&h=600&fit=crop"
      ]
    },
    {
      title: "Babysitting Service",
      category: "Childcare",
      description: "Need a reliable babysitter for my 2 children (ages 5 and 8) for weekend evenings. Responsible person who can engage with kids, help with homework, and ensure their safety.",
      requirements: [
        "Previous childcare experience required",
        "Background check preferred",
        "CPR certification preferred",
        "Patient and responsible",
        "Good communication skills"
      ],
      images: [
        "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1609631765658-d4b8b3ce5db7?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop"
      ]
    },
    {
      title: "House Cleaning Service",
      category: "Cleaning",
      description: "Need a professional house cleaning service for my 3-bedroom apartment. Includes kitchen, bathrooms, living areas, and bedrooms. All cleaning supplies will be provided.",
      requirements: [
        "Previous cleaning experience preferred",
        "Attention to detail",
        "Reliable and trustworthy",
        "Able to work independently",
        "Own transportation preferred"
      ],
      images: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1609617052234-43950c65e5d2?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&h=600&fit=crop"
      ]
    },
    {
      title: "Pet Walking & Care",
      category: "Pet Care",
      description: "Looking for someone to walk my Golden Retriever twice a day and provide basic care when I'm at work. Must love dogs and be reliable.",
      requirements: [
        "Experience with dogs",
        "Love for animals",
        "Reliable schedule",
        "Physical fitness for walking",
        "Trustworthy and responsible"
      ],
      images: [
        "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=600&fit=crop"
      ]
    },
    {
      title: "Furniture Assembly",
      category: "Handyman",
      description: "Need help assembling IKEA furniture including a bed frame, wardrobe, and desk. All parts and instructions are available. Should take 3-4 hours.",
      requirements: [
        "Experience with furniture assembly",
        "Own basic tools (screwdriver, Allen keys)",
        "Patience and attention to detail",
        "Ability to follow instructions",
        "Physical ability to lift furniture"
      ],
      images: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop"
      ]
    },
    {
      title: "Car Washing & Detailing",
      category: "Automotive",
      description: "Looking for someone to wash and detail my SUV. Includes interior and exterior cleaning, waxing, and tire care. All supplies provided.",
      requirements: [
        "Experience with car detailing",
        "Attention to detail",
        "Careful handling of vehicles",
        "Knowledge of car care products",
        "Reliable and punctual"
      ],
      images: [
        "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1594833122966-9c1e3d8e8c5c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop"
      ]
    },
    {
      title: "Moving & Packing Help",
      category: "Moving",
      description: "Need help packing and moving from a 2-bedroom apartment to a new house. Heavy lifting required. Moving truck will be provided.",
      requirements: [
        "Physical strength for heavy lifting",
        "Experience with packing",
        "Careful handling of fragile items",
        "Reliable and punctual",
        "Able to work as part of a team"
      ],
      images: [
        "https://images.unsplash.com/photo-1558618666-f5c2c85efbe2?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1609617052234-43950c65e5d2?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&h=600&fit=crop"
      ]
    },
    {
      title: "Tutoring & Academic Help",
      category: "Education",
      description: "Need a qualified tutor for high school mathematics and science. Help with homework, exam preparation, and concept understanding.",
      requirements: [
        "Strong background in math/science",
        "Teaching or tutoring experience",
        "Patient and encouraging",
        "Good communication skills",
        "Flexible schedule"
      ],
      images: [
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=600&fit=crop"
      ]
    },
    {
      title: "Cooking & Meal Prep",
      category: "Food Service",
      description: "Looking for someone to prepare healthy meals for the week. Menu planning, grocery shopping, and meal preparation included.",
      requirements: [
        "Culinary skills and experience",
        "Knowledge of healthy cooking",
        "Food safety certification preferred",
        "Organized and efficient",
        "Creative with meal planning"
      ],
      images: [
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1547573854-74d2a71d0826?w=800&h=600&fit=crop"
      ]
    },
    {
      title: "Tech Support & Setup",
      category: "Technology",
      description: "Need help setting up new smart home devices, computer troubleshooting, and basic tech support for elderly family member.",
      requirements: [
        "Strong technical skills",
        "Patience with elderly users",
        "Good communication skills",
        "Problem-solving abilities",
        "Reliable and trustworthy"
      ],
      images: [
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1526378800651-c32a8eaa11b5?w=800&h=600&fit=crop"
      ]
    }
  ];

  const creators = [
    {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      completedTasks: 24,
      memberSince: "January 2023"
    },
    {
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 4.8,
      completedTasks: 18,
      memberSince: "March 2022"
    },
    {
      name: "Emily Davis",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 4.7,
      completedTasks: 31,
      memberSince: "June 2023"
    },
    {
      name: "James Wilson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      completedTasks: 42,
      memberSince: "September 2022"
    }
  ];

  const locations = ["Colombo 03", "Kandy", "Galle", "Negombo", "Dehiwala", "Mount Lavinia", "Moratuwa", "Colombo 07"];
  const deadlines = ["This weekend", "Next week", "Within 3 days", "Flexible", "ASAP", "Next month"];
  const durations = ["2-3 hours", "Half day", "Full day", "1-2 days", "3-4 hours", "1 week"];

  // Create a simple hash function for better distribution
  const hashString = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  };

  // Use hash-based distribution for better uniqueness
  const hash = hashString(id);
  const taskIndex = hash % taskTypes.length;
  const creatorIndex = (hash * 7) % creators.length; // Use different multiplier
  const locationIndex = (hash * 13) % locations.length; // Use different multiplier
  
  const task = taskTypes[taskIndex];
  const creator = creators[creatorIndex];
  
  // Generate price based on category and hash
  const basePrices = {
    "Gardening": 3000,
    "Cleaning": 5000,
    "Handyman": 4000,
    "Automotive": 3500,
    "Moving": 8000,
    "Childcare": 4500,
    "Pet Care": 2500,
    "Education": 6000,
    "Food Service": 7000,
    "Technology": 5500
  };
  
  const basePrice = basePrices[task.category as keyof typeof basePrices] || 4000;
  const priceVariation = (hash % 10) * 500;
  const finalPrice = basePrice + priceVariation;

  return {
    id,
    title: task.title, // Remove the ID suffix for cleaner titles
    price: `Rs. ${finalPrice.toLocaleString()}`,
    category: task.category,
    urgent: hash % 3 === 0, // Every 3rd task is urgent based on hash
    description: task.description,
    duration: durations[hash % durations.length],
    location: locations[locationIndex],
    posted: `${(hash % 7) + 1} days ago`,
    deadline: deadlines[hash % deadlines.length],
    images: task.images,
    requirements: task.requirements,
    creator: creator
  };
};

// Generate unique tool data based on ID
export const generateToolData = (id: string): ToolData => {
  const toolTypes = [
    {
      title: "Professional Drill Set",
      category: "Power Tools",
      description: "High-quality professional drill set perfect for home improvement projects, furniture assembly, and general construction work. Includes multiple drill bits, screwdriver attachments, and extension bits.",
      features: [
        "18V lithium-ion battery",
        "15 torque settings",
        "LED work light",
        "Quick-change chuck",
        "Belt clip included",
        "Complete bit set (20+ pieces)"
      ],
      specifications: {
        "Max Torque": "55 Nm",
        "Battery Life": "4-6 hours",
        "Chuck Size": "13mm",
        "Weight": "1.8 kg",
        "Brand": "DeWalt"
      },
      images: [
        "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1609617052234-43950c65e5d2?w=800&h=600&fit=crop"
      ]
    },
    {
      title: "Angle Grinder",
      category: "Power Tools",
      description: "Heavy-duty angle grinder perfect for cutting, grinding, and polishing metal, concrete, and stone. Professional grade with safety features.",
      features: [
        "1200W powerful motor",
        "Variable speed control",
        "Safety guard included",
        "Ergonomic grip design",
        "Quick wheel change system",
        "Overload protection"
      ],
      specifications: {
        "Power": "1200W",
        "Disc Size": "125mm",
        "No-load Speed": "11,000 rpm",
        "Weight": "2.2 kg",
        "Brand": "Bosch"
      },
      images: [
        "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&h=600&fit=crop"
      ]
    },
    {
      title: "Lawn Mower",
      category: "Garden Tools",
      description: "Electric lawn mower in excellent condition, perfect for maintaining medium to large gardens. Quiet operation and environmentally friendly.",
      features: [
        "Electric powered - eco-friendly",
        "40cm cutting width",
        "Height adjustment (20-70mm)",
        "Grass collection bag",
        "Lightweight design",
        "Easy storage"
      ],
      specifications: {
        "Power": "1400W",
        "Cutting Width": "40cm",
        "Collection Capacity": "45L",
        "Weight": "12 kg",
        "Brand": "Black & Decker"
      },
      images: [
        "https://images.unsplash.com/photo-1609617052234-43950c65e5d2?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&h=600&fit=crop"
      ]
    },
    {
      title: "Circular Saw",
      category: "Power Tools",
      description: "Professional circular saw ideal for cutting wood, plywood, and other materials. Perfect for construction and woodworking projects.",
      features: [
        "1500W motor for fast cutting",
        "190mm carbide blade",
        "Laser guide system",
        "Dust extraction port",
        "Adjustable cutting depth",
        "Bevel cutting capability"
      ],
      specifications: {
        "Power": "1500W",
        "Blade Size": "190mm",
        "Max Cut Depth": "65mm",
        "Weight": "4.2 kg",
        "Brand": "Makita"
      },
      images: [
        "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
      ]
    },
    {
      title: "Pressure Washer",
      category: "Cleaning Tools",
      description: "High-pressure washer perfect for cleaning driveways, cars, outdoor furniture, and building exteriors. Powerful and efficient cleaning solution.",
      features: [
        "2000W high-pressure motor",
        "Multiple spray nozzles",
        "Detergent tank included",
        "Auto shut-off system",
        "Compact wheeled design",
        "Professional grade pump"
      ],
      specifications: {
        "Power": "2000W",
        "Max Pressure": "140 bar",
        "Flow Rate": "7.5 L/min",
        "Weight": "18 kg",
        "Brand": "Karcher"
      },
      images: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1609617052234-43950c65e5d2?w=800&h=600&fit=crop"
      ]
    }
  ];

  const owners = [
    {
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 4.8,
      toolsRented: 36,
      memberSince: "March 2022",
      responseTime: "Usually responds within 2 hours"
    },
    {
      name: "Sarah Wilson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      toolsRented: 28,
      memberSince: "August 2022",
      responseTime: "Usually responds within 1 hour"
    },
    {
      name: "David Brown",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 4.7,
      toolsRented: 42,
      memberSince: "January 2023",
      responseTime: "Usually responds within 3 hours"
    },
    {
      name: "Lisa Kumar",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 4.8,
      toolsRented: 19,
      memberSince: "November 2022",
      responseTime: "Usually responds within 1 hour"
    }
  ];

  const locations = ["Colombo 05", "Kandy", "Galle", "Negombo", "Dehiwala", "Mount Lavinia", "Moratuwa", "Colombo 02"];
  const conditions = ["Excellent", "Very Good", "Good", "Fair"];

  // Use ID to determine which template to use
  const toolIndex = parseInt(id) % toolTypes.length;
  const ownerIndex = parseInt(id) % owners.length;
  const locationIndex = parseInt(id) % locations.length;
  
  const tool = toolTypes[toolIndex];
  const owner = owners[ownerIndex];
  
  // Generate price based on category and ID
  const basePrices = {
    "Power Tools": 800,
    "Garden Tools": 600,
    "Cleaning Tools": 700,
    "Hand Tools": 300
  };
  
  const basePrice = basePrices[tool.category as keyof typeof basePrices] || 500;
  const priceVariation = (parseInt(id) % 5) * 100;
  const finalPrice = basePrice + priceVariation;

  // Generate deposit (usually 2-3x the daily rate)
  const depositMultiplier = 2 + (parseInt(id) % 2);
  const deposit = finalPrice * depositMultiplier;

  return {
    id,
    title: `${tool.title} ${id}`,
    price: `Rs. ${finalPrice}/day`,
    category: tool.category,
    available: parseInt(id) % 4 !== 0, // 75% availability
    description: tool.description,
    location: locations[locationIndex],
    posted: `${parseInt(id) % 14 + 1} days ago`,
    condition: conditions[parseInt(id) % conditions.length],
    deposit: `Rs. ${deposit.toLocaleString()}`,
    images: tool.images,
    features: tool.features,
    specifications: tool.specifications,
    owner: owner
  };
};
