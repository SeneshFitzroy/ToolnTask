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
    },
    "car_washing_enhanced": {
      title: "Car Washing & Detailing",
      category: "Automotive",
      price: "Rs. 3,000",
      urgent: false,
      description: "Professional car washing and detailing service for your vehicle. Includes exterior wash, interior cleaning, waxing, and tire care. All supplies provided.",
      duration: "2-3 hours",
      location: "Kandy",
      posted: "1 day ago",
      deadline: "This weekend",
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
      ],
      creator: {
        name: "Alex Fernando",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        rating: 4.5,
        completedTasks: 22,
        memberSince: "August 2023"
      }
    },
    "moving_help_enhanced": {
      title: "Moving & Packing Help",
      category: "Moving",
      price: "Rs. 8,000",
      urgent: true,
      description: "Need help packing and moving from a 2-bedroom apartment to a new house. Heavy lifting required. Moving truck will be provided. Looking for strong, reliable helpers.",
      duration: "Full day",
      location: "Galle",
      posted: "4 hours ago",
      deadline: "This Saturday",
      requirements: [
        "Physical strength for heavy lifting",
        "Experience with packing",
        "Careful handling of fragile items",
        "Reliable and punctual",
        "Able to work as part of a team"
      ],
      images: [
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d1f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&h=600&fit=crop"
      ],
      creator: {
        name: "Priya Perera",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        rating: 4.6,
        completedTasks: 11,
        memberSince: "November 2023"
      }
    },
    "tutoring_enhanced": {
      title: "Tutoring & Academic Help",
      category: "Education",
      price: "Rs. 6,000",
      urgent: false,
      description: "Need a qualified math tutor for my high school student. Help with algebra, geometry, and preparation for upcoming O/L exams. Flexible schedule preferred.",
      duration: "2-3 hours per session",
      location: "Negombo",
      posted: "2 days ago",
      deadline: "Next week",
      requirements: [
        "Strong math background",
        "Teaching or tutoring experience",
        "Patient and encouraging",
        "Flexible schedule",
        "Good communication skills"
      ],
      images: [
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1606103819300-57dee6c93fe5?w=800&h=600&fit=crop"
      ],
      creator: {
        name: "Rajesh Silva",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        rating: 4.9,
        completedTasks: 35,
        memberSince: "January 2022"
      }
    },
    "cooking_meal_prep_enhanced": {
      title: "Cooking & Meal Prep",
      category: "Food Service",
      price: "Rs. 7,000",
      urgent: false,
      description: "Looking for someone to prepare healthy meals for the week. Experience with meal planning and various dietary restrictions preferred. Focus on Sri Lankan and international cuisine.",
      duration: "4-5 hours",
      location: "Malabe",
      posted: "6 hours ago",
      deadline: "This Sunday",
      requirements: [
        "Cooking experience",
        "Knowledge of nutrition",
        "Food safety certification preferred",
        "Creative with recipes",
        "Available on Sundays"
      ],
      images: [
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop"
      ],
      creator: {
        name: "Kamala Wickramasinghe",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b188?w=150&h=150&fit=crop&crop=face",
        rating: 4.7,
        completedTasks: 19,
        memberSince: "July 2023"
      }
    },
    "tech_support_enhanced": {
      title: "Tech Support & Setup",
      category: "Technology",
      price: "Rs. 5,500",
      urgent: true,
      description: "Need help setting up a home office with computer, printer, and network equipment. Troubleshooting and basic IT support required. Must be patient with non-tech users.",
      duration: "3-4 hours",
      location: "Kottawa",
      posted: "1 hour ago",
      deadline: "Tomorrow",
      requirements: [
        "IT or tech support experience",
        "Knowledge of networking",
        "Problem-solving skills",
        "Patient with non-tech users",
        "Available evenings or weekends"
      ],
      images: [
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?w=800&h=600&fit=crop"
      ],
      creator: {
        name: "Nuwan Gamage",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        rating: 4.8,
        completedTasks: 28,
        memberSince: "April 2023"
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
    "graphic_design_enhanced": {
      title: "Professional Graphic Design Services",
      category: "Design",
      price: "Rs. 8,000",
      available: true,
      description: "Professional graphic design for logos, brochures, business cards, and digital marketing materials. Creative solutions for your branding needs.",
      location: "Colombo 03",
      posted: "2 days ago",
      condition: "Professional Service",
      deposit: "Rs. 2,000",
      features: [
        "Logo Design & Branding",
        "Print Design Materials",
        "Digital Art Creation",
        "Adobe Creative Suite",
        "Unlimited Revisions"
      ],
      images: [
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1609921141835-710b7fa6e438?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&h=600&fit=crop"
      ],
      specifications: {
        "Software": "Adobe Creative Suite",
        "Delivery": "2-3 days",
        "Formats": "AI, PSD, PDF, PNG",
        "Revisions": "Unlimited",
        "Experience": "5+ years"
      },
      owner: {
        name: "Aisha Patel",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b188?w=150&h=150&fit=crop&crop=face",
        rating: 4.9,
        toolsRented: 157,
        memberSince: "February 2022",
        responseTime: "Within 1 hour"
      }
    },
    "web_development_enhanced": {
      title: "Full-Stack Web Development",
      category: "Development",
      price: "Rs. 25,000",
      available: true,
      description: "Complete web development solutions using modern technologies. From simple landing pages to complex web applications with database integration.",
      location: "Nugegoda",
      posted: "3 hours ago",
      condition: "Professional Service",
      deposit: "Rs. 5,000",
      features: [
        "React & Next.js Development",
        "Node.js Backend",
        "Database Integration",
        "Responsive Design",
        "SEO Optimization"
      ],
      images: [
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=600&fit=crop"
      ],
      specifications: {
        "Technologies": "React, Node.js, MongoDB",
        "Delivery": "2-4 weeks",
        "Support": "3 months free",
        "Hosting": "Setup included",
        "Experience": "8+ years"
      },
      owner: {
        name: "Ravi Perera",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        rating: 4.8,
        toolsRented: 89,
        memberSince: "August 2021",
        responseTime: "Within 3 hours"
      }
    },
    "content_writing_enhanced": {
      title: "Professional Content Writing",
      category: "Writing",
      price: "Rs. 3,500",
      available: true,
      description: "High-quality content writing for blogs, websites, social media, and marketing materials. SEO-optimized content that engages your audience.",
      location: "Kandy",
      posted: "5 hours ago",
      condition: "Professional Service",
      deposit: "Rs. 1,000",
      features: [
        "SEO-Optimized Content",
        "Blog Writing",
        "Social Media Content",
        "Copywriting",
        "Research Included"
      ],
      images: [
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&h=600&fit=crop"
      ],
      specifications: {
        "Word Count": "500-2000 words",
        "Delivery": "24-48 hours",
        "Revisions": "2 free revisions",
        "SEO": "Keyword optimization",
        "Experience": "6+ years"
      },
      owner: {
        name: "Sophia Martinez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        rating: 4.7,
        toolsRented: 234,
        memberSince: "June 2022",
        responseTime: "Within 2 hours"
      }
    },
    "video_editing_enhanced": {
      title: "Professional Video Editing",
      category: "Media",
      price: "Rs. 12,000",
      available: true,
      description: "Professional video editing for YouTube, social media, corporate videos, and personal projects. Color grading, sound design, and motion graphics included.",
      location: "Mount Lavinia",
      posted: "1 day ago",
      condition: "Professional Service",
      deposit: "Rs. 3,000",
      features: [
        "4K Video Editing",
        "Color Grading",
        "Sound Design",
        "Motion Graphics",
        "Multiple Format Export"
      ],
      images: [
        "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1614850523011-8f49ffc73908?w=800&h=600&fit=crop"
      ],
      specifications: {
        "Software": "Premiere Pro, After Effects",
        "Resolution": "Up to 4K",
        "Delivery": "3-5 days",
        "Formats": "MP4, MOV, AVI",
        "Experience": "7+ years"
      },
      owner: {
        name: "Jake Thompson",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        rating: 4.8,
        toolsRented: 76,
        memberSince: "November 2022",
        responseTime: "Within 4 hours"
      }
    },
    "digital_marketing_enhanced": {
      title: "Digital Marketing & SEO",
      category: "Marketing",
      price: "Rs. 15,000",
      available: true,
      description: "Comprehensive digital marketing strategies including SEO, social media marketing, Google Ads, and content marketing to grow your business online.",
      location: "Dehiwala",
      posted: "6 hours ago",
      condition: "Professional Service",
      deposit: "Rs. 4,000",
      features: [
        "SEO Optimization",
        "Google Ads Management",
        "Social Media Marketing",
        "Content Strategy",
        "Analytics Reporting"
      ],
      images: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop"
      ],
      specifications: {
        "Platforms": "Google, Facebook, Instagram",
        "Campaign": "Setup & Management",
        "Reports": "Weekly analytics",
        "Strategy": "Custom planning",
        "Experience": "9+ years"
      },
      owner: {
        name: "Nisha Fernando",
        avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face",
        rating: 4.9,
        toolsRented: 112,
        memberSince: "January 2023",
        responseTime: "Within 1 hour"
      }
    },
    "data_analysis_enhanced": {
      title: "Data Analysis & Visualization",
      category: "Analytics",
      price: "Rs. 18,000",
      available: true,
      description: "Professional data analysis using Python, R, and Excel. Create insightful reports, dashboards, and visualizations to help make data-driven decisions.",
      location: "Colombo 07",
      posted: "2 hours ago",
      condition: "Professional Service",
      deposit: "Rs. 4,500",
      features: [
        "Python & R Analysis",
        "Data Visualization",
        "Statistical Analysis",
        "Dashboard Creation",
        "Report Generation"
      ],
      images: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&h=600&fit=crop"
      ],
      specifications: {
        "Tools": "Python, R, Tableau, Excel",
        "Data Size": "Up to 1M records",
        "Delivery": "5-7 days",
        "Formats": "PDF, Excel, Dashboard",
        "Experience": "10+ years"
      },
      owner: {
        name: "Dr. Anand Sharma",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        rating: 4.7,
        toolsRented: 58,
        memberSince: "March 2023",
        responseTime: "Within 6 hours"
      }
    },
    "mobile_app_enhanced": {
      title: "Mobile App Development",
      category: "Development",
      price: "Rs. 45,000",
      available: true,
      description: "Native and cross-platform mobile app development for iOS and Android. From concept to app store deployment with ongoing support.",
      location: "Galle",
      posted: "8 hours ago",
      condition: "Professional Service",
      deposit: "Rs. 10,000",
      features: [
        "iOS & Android Apps",
        "Cross-platform Development",
        "App Store Deployment",
        "UI/UX Design",
        "Ongoing Support"
      ],
      images: [
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1581276879432-15e50529f34b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=800&h=600&fit=crop"
      ],
      specifications: {
        "Platforms": "iOS, Android",
        "Framework": "React Native, Flutter",
        "Delivery": "6-12 weeks",
        "Support": "6 months included",
        "Experience": "12+ years"
      },
      owner: {
        name: "Maya Gunawardena",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b188?w=150&h=150&fit=crop&crop=face",
        rating: 4.8,
        toolsRented: 34,
        memberSince: "September 2022",
        responseTime: "Within 12 hours"
      }
    },
    "language_translation_enhanced": {
      title: "Professional Translation Services",
      category: "Language",
      price: "Rs. 4,500",
      available: true,
      description: "Accurate translation services between English, Sinhala, and Tamil. Certified translations for legal documents, business content, and personal documents.",
      location: "Negombo",
      posted: "4 hours ago",
      condition: "Professional Service",
      deposit: "Rs. 1,500",
      features: [
        "English-Sinhala-Tamil",
        "Certified Translations",
        "Legal Documents",
        "Business Content",
        "Quick Turnaround"
      ],
      images: [
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop"
      ],
      specifications: {
        "Languages": "English, Sinhala, Tamil",
        "Certification": "Official translator",
        "Delivery": "1-3 days",
        "Specialization": "Legal, Medical, Business",
        "Experience": "15+ years"
      },
      owner: {
        name: "Chamara Jayasinghe",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        rating: 4.9,
        toolsRented: 189,
        memberSince: "April 2022",
        responseTime: "Within 30 minutes"
      }
    },
    "photography_enhanced": {
      title: "Professional Photography",
      category: "Photography",
      price: "Rs. 20,000",
      available: true,
      description: "Professional photography services for events, portraits, products, and corporate needs. High-quality images with post-processing and editing included.",
      location: "Malabe",
      posted: "7 hours ago",
      condition: "Professional Service",
      deposit: "Rs. 5,000",
      features: [
        "Event Photography",
        "Portrait Sessions",
        "Product Photography",
        "Photo Editing",
        "High-Resolution Images"
      ],
      images: [
        "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1554048612-b6a482b224b4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=800&h=600&fit=crop"
      ],
      specifications: {
        "Equipment": "Professional DSLR & Lenses",
        "Resolution": "Full-frame 42MP",
        "Editing": "Lightroom & Photoshop",
        "Delivery": "48 hours",
        "Experience": "8+ years"
      },
      owner: {
        name: "Saman Rajapaksa",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        rating: 4.8,
        toolsRented: 142,
        memberSince: "July 2021",
        responseTime: "Within 2 hours"
      }
    },
    "accounting_bookkeeping_enhanced": {
      title: "Accounting & Bookkeeping",
      category: "Finance",
      price: "Rs. 10,000",
      available: true,
      description: "Professional accounting and bookkeeping services for small businesses. Tax preparation, financial statements, and business consulting included.",
      location: "Kottawa",
      posted: "3 hours ago",
      condition: "Professional Service",
      deposit: "Rs. 2,500",
      features: [
        "QuickBooks Setup",
        "Tax Preparation",
        "Financial Statements",
        "Payroll Management",
        "Business Consulting"
      ],
      images: [
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
      ],
      specifications: {
        "Software": "QuickBooks, Excel, Xero",
        "Compliance": "Tax law compliant",
        "Reports": "Monthly financial reports",
        "Certification": "Chartered Accountant",
        "Experience": "12+ years"
      },
      owner: {
        name: "Deepika Seneviratne",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        rating: 4.7,
        toolsRented: 95,
        memberSince: "October 2022",
        responseTime: "Within 4 hours"
      }
    }
  };
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
