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

// Generate unique task data based on ID - Direct mapping for unique content
export const generateTaskData = (id: string): TaskData => {
  // Direct mapping to ensure each ID gets unique content
  const taskMappings: Record<string, Partial<TaskData>> = {
    "garden_maintenance_enhanced": {
      title: "Garden Maintenance & Landscaping",
      category: "Gardening",
      price: "Rs. 5,000",
      urgent: true,
      description: "Looking for an experienced gardener to help maintain my medium-sized garden. Tasks include weeding, pruning shrubs, lawn care, and basic landscaping. All tools and equipment will be provided.",
      duration: "2-3 hours",
      location: "Colombo 03",
      posted: "This weekend",
      deadline: "Next Monday",
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
      ],
      creator: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b188?w=150&h=150&fit=crop&crop=face",
        rating: 4.8,
        completedTasks: 12,
        memberSince: "January 2024"
      }
    },
    "babysitting_service_enhanced": {
      title: "Babysitting Service",
      category: "Childcare",
      price: "Rs. 2,500",
      urgent: false,
      description: "Need a reliable babysitter for my 2 children (ages 5 and 8) for weekend evenings. Responsible person who can engage with kids, help with homework, and ensure their safety.",
      duration: "4-6 hours",
      location: "Nugegoda",
      posted: "2 days ago",
      deadline: "This Friday",
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
      ],
      creator: {
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        rating: 4.9,
        completedTasks: 25,
        memberSince: "March 2023"
      }
    },
    "house_cleaning_enhanced": {
      title: "House Cleaning Service",
      category: "Cleaning",
      price: "Rs. 3,500",
      urgent: false,
      description: "Need a professional house cleaning service for my 3-bedroom apartment. Includes kitchen, bathrooms, living areas, and bedrooms. All cleaning supplies will be provided.",
      duration: "3-4 hours",
      location: "Mount Lavinia",
      posted: "1 day ago",
      deadline: "This weekend",
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
      ],
      creator: {
        name: "Emma Wilson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        rating: 4.7,
        completedTasks: 18,
        memberSince: "June 2023"
      }
    },
    "pet_walking_enhanced": {
      title: "Pet Walking & Care",
      category: "Pet Care",
      price: "Rs. 1,500",
      urgent: true,
      description: "Looking for someone to walk my Golden Retriever twice a day and provide basic care when I'm at work. Must love dogs and be reliable.",
      duration: "1-2 hours",
      location: "Dehiwala",
      posted: "3 hours ago",
      deadline: "Tomorrow",
      requirements: [
        "Experience with dogs",
        "Love for animals",
        "Available twice daily",
        "Reliable and punctual",
        "Live nearby preferred"
      ],
      images: [
        "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=600&fit=crop"
      ],
      creator: {
        name: "David Kumar",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        rating: 4.6,
        completedTasks: 8,
        memberSince: "September 2024"
      }
    },
    "furniture_assembly_enhanced": {
      title: "Furniture Assembly",
      category: "Handyman",
      price: "Rs. 4,000",
      urgent: false,
      description: "Need help assembling IKEA furniture - a wardrobe, desk, and bookshelf. All parts and tools are available. Looking for someone experienced with furniture assembly.",
      duration: "4-5 hours",
      location: "Colombo 07",
      posted: "5 hours ago",
      deadline: "Next week",
      requirements: [
        "Experience with furniture assembly",
        "Own basic tools preferred",
        "Attention to detail",
        "Patient and methodical",
        "Weekend availability"
      ],
      images: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1565538420870-da08ff96a207?w=800&h=600&fit=crop"
      ],
      creator: {
        name: "Lisa Rodriguez",
        avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face",
        rating: 4.8,
        completedTasks: 15,
        memberSince: "May 2023"
      }
    }
  };

  const taskData = taskMappings[id];
  if (!taskData) {
    // Return default data for unknown IDs
    return {
      id,
      title: "Task Not Found",
      price: "N/A",
      category: "Unknown",
      urgent: false,
      description: "This task information is not available.",
      duration: "N/A",
      location: "N/A",
      posted: "N/A",
      deadline: "N/A",
      images: [],
      requirements: [],
      creator: {
        name: "Unknown",
        avatar: "",
        rating: 0,
        completedTasks: 0,
        memberSince: "N/A"
      }
    };
  }

  return {
    id,
    title: taskData.title || "Unknown Task",
    price: taskData.price || "N/A",
    category: taskData.category || "Unknown",
    urgent: taskData.urgent || false,
    description: taskData.description || "No description available",
    duration: taskData.duration || "N/A",
    location: taskData.location || "N/A",
    posted: taskData.posted || "N/A",
    deadline: taskData.deadline || "N/A",
    images: taskData.images || [],
    requirements: taskData.requirements || [],
    creator: taskData.creator || {
      name: "Unknown",
      avatar: "",
      rating: 0,
      completedTasks: 0,
      memberSince: "N/A"
    }
  };
};

// Generate unique tool data based on ID - Direct mapping for unique content
export const generateToolData = (id: string): ToolData => {
  // Direct mapping to ensure each ID gets unique content
  const toolMappings: Record<string, Partial<ToolData>> = {
    "power_drill_enhanced": {
      title: "Professional Power Drill Set",
      category: "Power Tools",
      price: "Rs. 1,200/day",
      available: true,
      description: "High-quality cordless power drill with various drill bits and screwdriver attachments. Perfect for home improvement projects, furniture assembly, and general repairs.",
      location: "Colombo 05",
      posted: "1 day ago",
      condition: "Excellent",
      deposit: "Rs. 5,000",
      features: [
        "18V Lithium-ion battery",
        "Variable speed trigger",
        "LED work light",
        "Includes drill bit set",
        "Carrying case included"
      ],
      images: [
        "https://images.unsplash.com/photo-1609128346260-45cb4ea0c2e7?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1556816723-1ce827b9cfbb?w=800&h=600&fit=crop"
      ],
      specifications: {
        "Max Torque": "65 Nm",
        "Battery Life": "4-6 hours",
        "Chuck Size": "13mm",
        "Weight": "1.8kg",
        "Brand": "Bosch"
      },
      owner: {
        name: "James Wilson",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        rating: 4.9,
        toolsRented: 45,
        memberSince: "January 2023",
        responseTime: "Within 2 hours"
      }
    },
    "lawn_mower_enhanced": {
      title: "Electric Lawn Mower",
      category: "Garden Tools",
      price: "Rs. 2,000/day",
      available: true,
      description: "Powerful electric lawn mower perfect for medium to large gardens. Easy to use, environmentally friendly, and well-maintained. Includes extension cord.",
      location: "Nugegoda",
      posted: "3 hours ago",
      condition: "Very Good",
      deposit: "Rs. 8,000",
      features: [
        "Electric powered - no fuel needed",
        "Adjustable cutting height",
        "Large grass collection bag",
        "Easy start mechanism",
        "Extension cord included"
      ],
      images: [
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d1f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop"
      ],
      specifications: {
        "Cutting Width": "42cm",
        "Collection Capacity": "50L",
        "Power": "1800W",
        "Weight": "22kg",
        "Brand": "Black & Decker"
      },
      owner: {
        name: "Maria Santos",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b188?w=150&h=150&fit=crop&crop=face",
        rating: 4.7,
        toolsRented: 28,
        memberSince: "April 2023",
        responseTime: "Within 1 hour"
      }
    },
    "circular_saw_enhanced": {
      title: "Circular Saw - Heavy Duty",
      category: "Power Tools",
      price: "Rs. 1,800/day",
      available: true,
      description: "Professional-grade circular saw for woodworking and construction projects. Comes with multiple blade types and safety equipment. Perfect for cutting lumber, plywood, and more.",
      location: "Mount Lavinia",
      posted: "2 days ago",
      condition: "Excellent",
      deposit: "Rs. 7,000",
      features: [
        "Powerful 1800W motor",
        "Laser guide for precision",
        "Multiple blade types included",
        "Safety guard and goggles",
        "Dust collection port"
      ],
      images: [
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1556816723-1ce827b9cfbb?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1609128346260-45cb4ea0c2e7?w=800&h=600&fit=crop"
      ],
      specifications: {
        "Blade Size": "190mm",
        "Max Cut Depth": "70mm",
        "Power": "1800W",
        "Weight": "4.2kg",
        "Brand": "Makita"
      },
      owner: {
        name: "Robert Chen",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        rating: 4.8,
        toolsRented: 52,
        memberSince: "February 2022",
        responseTime: "Within 30 minutes"
      }
    }
  };

  const toolData = toolMappings[id];
  if (!toolData) {
    // Return default data for unknown IDs
    return {
      id,
      title: "Tool Not Found",
      price: "N/A",
      category: "Unknown",
      available: false,
      description: "This tool information is not available.",
      location: "N/A",
      posted: "N/A",
      condition: "N/A",
      deposit: "N/A",
      images: [],
      features: [],
      specifications: {},
      owner: {
        name: "Unknown",
        avatar: "",
        rating: 0,
        toolsRented: 0,
        memberSince: "N/A",
        responseTime: "N/A"
      }
    };
  }

  return {
    id,
    title: toolData.title || "Unknown Tool",
    price: toolData.price || "N/A",
    category: toolData.category || "Unknown",
    available: toolData.available !== undefined ? toolData.available : false,
    description: toolData.description || "No description available",
    location: toolData.location || "N/A",
    posted: toolData.posted || "N/A",
    condition: toolData.condition || "N/A",
    deposit: toolData.deposit || "N/A",
    images: toolData.images || [],
    features: toolData.features || [],
    specifications: toolData.specifications || {},
    owner: toolData.owner || {
      name: "Unknown",
      avatar: "",
      rating: 0,
      toolsRented: 0,
      memberSince: "N/A",
      responseTime: "N/A"
    }
  };
};
