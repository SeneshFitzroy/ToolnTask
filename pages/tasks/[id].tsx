import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '../../src/components/Navigation';
import Footer from '../../src/components/Footer';
import Logo from '../../src/components/Logo';
import { Button } from '../../src/components/ui/button';

export default function TaskDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Mock data - in a real app, this would come from an API
  const task = {
    id: id,
    title: "Garden Maintenance & Landscaping",
    description: "Looking for an experienced gardener to help maintain my medium-sized garden. Tasks include weeding, pruning shrubs, lawn care, and basic landscaping. All tools and equipment will be provided. Perfect for someone who enjoys outdoor work and has experience with garden maintenance.",
    price: "Rs. 5,000",
    time: "2-3 hours",
    location: "Colombo 03",
    isUrgent: true,
    category: "Gardening",
    images: [
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=800&h=600&fit=crop"
    ],
    requirements: [
      "Experience with garden maintenance",
      "Own transportation preferred",
      "Basic gardening tools knowledge",
      "Physical fitness for outdoor work",
      "Reliability and punctuality"
    ],
    tasks: [
      "Weeding flower beds and garden borders",
      "Pruning shrubs and small trees",
      "Lawn mowing and edging",
      "Watering plants and flowers",
      "General garden cleanup"
    ],
    posted: "2 days ago",
    deadline: "This weekend",
    client: {
      name: "Sarah Johnson",
      rating: 4.9,
      reviews: 28,
      joinDate: "2022",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      completedTasks: 15
    }
  };

  const similarTasks = [
    {
      id: 2,
      title: "House Cleaning",
      price: "Rs. 8,000",
      location: "Kandy",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      isUrgent: false
    },
    {
      id: 3,
      title: "Pet Walking Service",
      price: "Rs. 2,500",
      location: "Mount Lavinia",
      image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400&h=300&fit=crop",
      isUrgent: false
    },
    {
      id: 4,
      title: "Furniture Assembly",
      price: "Rs. 4,500",
      location: "Colombo 07",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      isUrgent: true
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme === 'dark' ? '#0C0F16' : '#F2F3F5' }}>
      <Navigation />
      
      {/* Hero Section with Back Button */}
      <div className="py-8 sm:py-12" style={{ backgroundColor: theme === 'dark' ? '#0C0F16' : '#F2F3F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <Link href="/Tasks">
              <Button 
                variant="outline" 
                className="flex items-center gap-2 hover:scale-105 transition-all duration-300"
                style={{ 
                  borderColor: theme === 'dark' ? '#FF5E14' : '#FF5E14',
                  color: theme === 'dark' ? '#FF5E14' : '#FF5E14',
                  backgroundColor: 'transparent'
                }}
              >
                <span>←</span>
                <span>Back to Tasks</span>
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Logo size="medium" showUnderline={true} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-8 sm:py-12" style={{ backgroundColor: theme === 'dark' ? '#0C0F16' : '#F2F3F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            
            {/* Left Column - Images and Details */}
            <div>
              {/* Image Gallery */}
              <div className="mb-8">
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl mb-4" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
                  <Image
                    src={task.images[currentImageIndex]}
                    alt={task.title}
                    fill
                    className="object-cover"
                  />
                  {task.images.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentImageIndex((prev) => prev > 0 ? prev - 1 : task.images.length - 1)}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                      >
                        <span className="text-lg font-bold">‹</span>
                      </button>
                      <button
                        onClick={() => setCurrentImageIndex((prev) => prev < task.images.length - 1 ? prev + 1 : 0)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                      >
                        <span className="text-lg font-bold">›</span>
                      </button>
                    </>
                  )}
                  
                  {/* Urgent Badge */}
                  {task.isUrgent && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      URGENT
                    </div>
                  )}
                </div>
                
                {/* Thumbnail Images */}
                {task.images.length > 1 && (
                  <div className="flex gap-2 sm:gap-4">
                    {task.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative w-20 h-20 rounded-lg overflow-hidden shadow-md hover:scale-105 transition-all duration-300 ${
                          index === currentImageIndex ? 'ring-2 ring-orange-500' : ''
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${task.title} - Image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Task Details */}
              <div className="p-6 sm:p-8 rounded-2xl shadow-xl" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
                <div className="flex items-center gap-4 mb-4">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                    {task.title}
                  </h1>
                  {task.isUrgent && (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      URGENT
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-2xl sm:text-3xl font-black" style={{ color: '#FF5E14' }}>
                    {task.price}
                  </div>
                  <div className="px-3 py-1 rounded-full text-sm font-semibold" style={{ backgroundColor: '#E5F3FF', color: '#001554' }}>
                    {task.category}
                  </div>
                </div>

                <p className="text-lg leading-relaxed mb-6" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                  {task.description}
                </p>

                {/* Task Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: theme === 'dark' ? '#374151' : '#F8F9FA' }}>
                    <span className="text-lg">⏱️</span>
                    <div>
                      <p className="font-medium" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>Duration</p>
                      <p className="text-sm" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>{task.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: theme === 'dark' ? '#374151' : '#F8F9FA' }}>
                    <span className="text-lg">📍</span>
                    <div>
                      <p className="font-medium" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>Location</p>
                      <p className="text-sm" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>{task.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: theme === 'dark' ? '#374151' : '#F8F9FA' }}>
                    <span className="text-lg">📅</span>
                    <div>
                      <p className="font-medium" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>Posted</p>
                      <p className="text-sm" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>{task.posted}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: theme === 'dark' ? '#374151' : '#F8F9FA' }}>
                    <span className="text-lg">⏰</span>
                    <div>
                      <p className="font-medium" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>Deadline</p>
                      <p className="text-sm" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>{task.deadline}</p>
                    </div>
                  </div>
                </div>

                {/* What's Included */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                    Tasks to Complete
                  </h3>
                  <ul className="space-y-2">
                    {task.tasks.map((taskItem, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FF5E14' }}></span>
                        <span style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>{taskItem}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Requirements */}
                <div>
                  <h3 className="text-xl font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                    Requirements
                  </h3>
                  <ul className="space-y-2">
                    {task.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#001554' }}></span>
                        <span style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column - Apply and Client Info */}
            <div className="space-y-6">
              {/* Apply Card */}
              <div className="p-6 sm:p-8 rounded-2xl shadow-xl" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
                <h3 className="text-xl sm:text-2xl font-bold mb-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                  Apply for This Task
                </h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">💰</span>
                    <div>
                      <p className="font-medium" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>Payment</p>
                      <p className="text-lg font-bold" style={{ color: '#FF5E14' }}>{task.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg">📍</span>
                    <div>
                      <p className="font-medium" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>Location</p>
                      <p style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>{task.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg">⏱️</span>
                    <div>
                      <p className="font-medium" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>Duration</p>
                      <p style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>{task.time}</p>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full text-lg font-bold py-3 hover:scale-105 transition-all duration-300 shadow-lg"
                  style={{ 
                    backgroundColor: '#FF5E14',
                    color: '#FFFFFF',
                    border: 'none'
                  }}
                >
                  Apply Now
                </Button>
              </div>

              {/* Client Info */}
              <div className="p-6 sm:p-8 rounded-2xl shadow-xl" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
                <h3 className="text-xl font-bold mb-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                  Task Creator
                </h3>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg">
                    <Image
                      src={task.client.image}
                      alt={task.client.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                      {task.client.name}
                    </h4>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">⭐</span>
                        <span className="font-medium" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                          {task.client.rating}
                        </span>
                      </div>
                      <span style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                        ({task.client.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <p style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                    Member since {task.client.joinDate}
                  </p>
                  <p style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                    {task.client.completedTasks} tasks completed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Tasks Section */}
      <div className="py-12 sm:py-16" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
            Similar Tasks
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {similarTasks.map((similarTask) => (
              <Link key={similarTask.id} href={`/tasks/${similarTask.id}`}>
                <div className="rounded-2xl shadow-xl overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer" style={{ backgroundColor: theme === 'dark' ? '#374151' : '#F8F9FA' }}>
                  <div className="relative aspect-video">
                    <Image
                      src={similarTask.image}
                      alt={similarTask.title}
                      fill
                      className="object-cover"
                    />
                    {similarTask.isUrgent && (
                      <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        URGENT
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                      {similarTask.title}
                    </h3>
                    <p className="text-lg font-bold mb-1" style={{ color: '#FF5E14' }}>
                      {similarTask.price}
                    </p>
                    <p className="text-sm" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                      {similarTask.location}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
