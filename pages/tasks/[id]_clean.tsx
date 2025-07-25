import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Navigation from '../../src/components/Navigation';
import Footer from '../../src/components/Footer';
import Image from 'next/image';

export default function TaskDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Sample task data (in a real app, this would come from an API)
  const task = {
    id: id,
    title: "Garden Maintenance & Landscaping",
    price: "Rs. 5,000",
    category: "Gardening",
    urgent: true,
    description: "Looking for an experienced gardener to help maintain my medium-sized garden. Tasks include weeding, pruning shrubs, lawn care, and basic landscaping. All tools and equipment will be provided. Perfect for someone who enjoys outdoor work and has experience with garden maintenance.",
    duration: "2-3 hours",
    location: "Colombo 03",
    posted: "2 days ago",
    deadline: "This weekend",
    images: [
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&h=600&fit=crop"
    ],
    requirements: [
      "Previous gardening experience required",
      "Own basic hand tools (gloves, pruning shears)",
      "Ability to work outdoors in various weather",
      "Physical fitness for manual labor",
      "Knowledge of plant care and maintenance"
    ],
    creator: {
      name: "Sarah Johnson",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      reviews: 28,
      joinDate: "2022",
      location: "Colombo 03",
      completedTasks: 15
    }
  };

  const similarTasks = [
    {
      id: 2,
      title: "House Cleaning",
      price: "Rs. 3,500",
      category: "Cleaning",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Painting Work",
      price: "Rs. 8,000",
      category: "Painting",
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      title: "Furniture Assembly",
      price: "Rs. 2,500",
      category: "Assembly",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme === 'dark' ? '#0C0F16' : '#F2F3F5' }}>
      <Navigation />
      
      {/* Clean Professional Main Content */}
      <div className="py-8 sm:py-12" style={{ backgroundColor: theme === 'dark' ? '#0C0F16' : '#F2F3F5' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="p-8 rounded-3xl shadow-2xl mb-8" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
            <div className="flex flex-wrap items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <h1 className="text-3xl sm:text-4xl font-black" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                    {task.title}
                  </h1>
                  {task.urgent && (
                    <span className="px-4 py-2 text-sm font-bold text-white rounded-full bg-red-500 animate-pulse">
                      URGENT
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="text-2xl font-black" style={{ color: '#FF5E14' }}>
                    {task.price}
                  </span>
                  <span className="px-4 py-2 text-sm font-bold text-white rounded-full" style={{ backgroundColor: theme === 'dark' ? '#FFFFFF' : '#2D3748', color: theme === 'dark' ? '#000000' : '#FFFFFF' }}>
                    {task.category}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-6 text-lg" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                  <span>⏱️ {task.duration}</span>
                  <span>📍 {task.location}</span>
                  <span>📅 {task.deadline}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Featured Image */}
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4" 
                   style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF', borderColor: '#FF5E14' }}>
                <Image
                  src={task.images[0]}
                  alt={task.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 px-3 py-2 bg-black bg-opacity-50 text-white text-sm font-bold rounded-full">
                  Featured
                </div>
              </div>
              
              {/* Secondary Images Grid */}
              <div className="grid grid-cols-2 gap-4">
                {task.images.slice(1, 4).map((image, index) => (
                  <div key={index} className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={image}
                      alt={`${task.title} view ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
                {task.images.length > 4 && (
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-black bg-opacity-50 flex items-center justify-center cursor-pointer hover:bg-opacity-40 transition-all duration-300">
                    <span className="text-white font-bold text-lg">
                      View More
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Section - Prominently placed */}
          <div className="mb-12">
            <div className="p-8 rounded-3xl shadow-2xl text-center" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
              <h2 className="text-2xl font-black mb-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                Ready to Take Action?
              </h2>
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="text-3xl font-black" style={{ color: '#FF5E14' }}>
                  {task.price}
                </span>
                <span className="px-4 py-2 text-sm font-bold text-white rounded-full" style={{ backgroundColor: theme === 'dark' ? '#FFFFFF' : '#2D3748', color: theme === 'dark' ? '#000000' : '#FFFFFF' }}>
                  {task.category}
                </span>
                {task.urgent && (
                  <span className="px-4 py-2 text-sm font-bold text-white rounded-full bg-red-500">
                    URGENT
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6 text-lg mb-8" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                <span>⏱️ {task.duration}</span>
                <span>📍 {task.location}</span>
                <span>📅 {task.deadline}</span>
              </div>
              <button 
                className="px-12 py-4 text-xl font-black text-white rounded-full hover:scale-105 transition-all duration-300 mb-4"
                style={{ backgroundColor: '#FF5E14' }}
              >
                ✓ Apply for Task
              </button>
              <div className="flex gap-4 justify-center">
                <button className="px-8 py-3 text-lg font-bold rounded-full border-2 hover:scale-105 transition-all duration-300"
                        style={{ borderColor: theme === 'dark' ? '#FFFFFF' : '#2D3748', color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                  Message Creator
                </button>
              </div>
            </div>
          </div>

          {/* Task Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            
            {/* Description */}
            <div className="p-8 rounded-3xl shadow-2xl" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
              <h2 className="text-2xl font-black mb-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                Task Description
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                {task.description}
              </p>
            </div>

            {/* Requirements */}
            <div className="p-8 rounded-3xl shadow-2xl" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
              <h2 className="text-2xl font-black mb-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                Requirements
              </h2>
              <ul className="space-y-3">
                {task.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <span className="text-lg" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                      {requirement}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Task Creator Profile */}
          <div className="mb-12">
            <div className="p-8 rounded-3xl shadow-2xl" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
              <h3 className="text-2xl font-black mb-8" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                Task Creator
              </h3>
              
              <div className="flex items-center gap-6 mb-6">
                <div className="w-20 h-20 rounded-full overflow-hidden shadow-xl">
                  <Image
                    src={task.creator.image}
                    alt={task.creator.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xl font-black" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                    {task.creator.name}
                  </h4>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500 text-xl">⭐</span>
                      <span className="font-bold text-lg" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                        {task.creator.rating}
                      </span>
                    </div>
                    <span className="text-lg" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                      ({task.creator.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-lg" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                <p>Member since {task.creator.joinDate} • {task.creator.location}</p>
                <p className="mt-2">{task.creator.completedTasks} tasks completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Tasks Section */}
      <div className="py-16 sm:py-20" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-12 sm:mb-16" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
            Similar Tasks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {similarTasks.map((similarTask) => (
              <div key={similarTask.id} 
                   className="p-6 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 cursor-pointer"
                   style={{ backgroundColor: theme === 'dark' ? '#0C0F16' : '#F2F3F5' }}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 shadow-lg">
                  <Image
                    src={similarTask.image}
                    alt={similarTask.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-black mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                    {similarTask.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-black" style={{ color: '#FF5E14' }}>
                      {similarTask.price}
                    </p>
                    <span className="px-3 py-1 text-sm font-bold text-white rounded-full" style={{ backgroundColor: theme === 'dark' ? '#FFFFFF' : '#2D3748', color: theme === 'dark' ? '#000000' : '#FFFFFF' }}>
                      {similarTask.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
