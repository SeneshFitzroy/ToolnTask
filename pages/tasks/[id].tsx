import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Navigation from '../../src/components/Navigation';
import Footer from '../../src/components/Footer';
import Image from 'next/image';

// AdSpace Component for rotating advertisements
const AdSpace = () => {
  const { theme } = useTheme();
  const [currentAd, setCurrentAd] = useState(0);
  
  const ads = [
    {
      title: "Premium Tools Rental",
      description: "Professional grade tools for your projects",
      icon: "🔧",
      bgColor: "#FF5E14"
    },
    {
      title: "Expert Services",
      description: "Connect with skilled professionals",
      icon: "👨‍🔧",
      bgColor: "#001554"
    },
    {
      title: "Community Hub",
      description: "Join our growing community",
      icon: "🏘️",
      bgColor: "#FF5E14"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
    }, 120000); // 2 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
        Advertisements
      </h3>
      <div className="relative p-4 rounded-xl shadow-lg border-2 border-dashed transition-all duration-500"
           style={{ 
             backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF',
             borderColor: ads[currentAd].bgColor
           }}>
        <div className="text-center">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
               style={{ backgroundColor: ads[currentAd].bgColor }}>
            <span className="text-white text-xl">{ads[currentAd].icon}</span>
          </div>
          <h4 className="font-bold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
            {ads[currentAd].title}
          </h4>
          <p className="text-sm" style={{ color: '#B3B5BC' }}>
            {ads[currentAd].description}
          </p>
        </div>
        <div className="absolute top-2 right-2 flex space-x-1">
          {ads.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentAd ? 'opacity-100' : 'opacity-30'
              }`}
              style={{ backgroundColor: ads[currentAd].bgColor }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

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
      "/garden1.jpg",
      "/garden2.jpg",
      "/garden3.jpg"
    ],
    tasks: [
      "Weeding flower beds and garden borders",
      "Pruning shrubs and small trees",
      "Lawn mowing and edging",
      "Watering plants and flowers",
      "General garden cleanup"
    ],
    requirements: [
      "Experience with garden maintenance",
      "Own transportation preferred",
      "Basic gardening tools knowledge",
      "Physical fitness for outdoor work",
      "Reliability and punctuality"
    ],
    creator: {
      name: "Sarah Johnson",
      avatar: "/sarah.jpg",
      rating: 4.9,
      reviews: 28,
      memberSince: "2022",
      tasksCompleted: 15
    },
    similarTasks: [
      {
        id: 2,
        title: "Pool Cleaning & Maintenance",
        price: "Rs. 3,500",
        category: "Cleaning",
        image: "/pool.jpg"
      },
      {
        id: 3,
        title: "House Painting - Exterior",
        price: "Rs. 12,000",
        category: "Painting",
        image: "/painting.jpg"
      },
      {
        id: 4,
        title: "Furniture Assembly",
        price: "Rs. 2,500",
        category: "Assembly",
        image: "/furniture.jpg"
      }
    ]
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme === 'dark' ? '#0C0F16' : '#F2F3F5' }}>
      <Navigation />
      
      <div className="py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Header */}
              <div className="p-6 rounded-2xl shadow-xl mb-6" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
                <div className="flex flex-wrap items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                        {task.title}
                      </h1>
                      {task.urgent && (
                        <span className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full">
                          URGENT
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-3xl font-black" style={{ color: '#FF5E14' }}>
                        {task.price}
                      </span>
                      <span className="px-3 py-1 text-sm font-medium rounded-full" 
                            style={{ backgroundColor: '#001554', color: '#FFFFFF' }}>
                        {task.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Gallery */}
              <div className="p-6 rounded-2xl shadow-xl mb-6" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
                <h2 className="text-xl font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                  Project Images
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {task.images.map((image, index) => (
                    <div key={index} className="relative aspect-video rounded-lg overflow-hidden shadow-md">
                      <Image
                        src={image}
                        alt={`Task image ${index + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="p-6 rounded-2xl shadow-xl mb-6" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
                <h2 className="text-xl font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                  Task Description
                </h2>
                <p className="text-base leading-relaxed" style={{ color: '#B3B5BC' }}>
                  {task.description}
                </p>
              </div>

              {/* Task Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div className="p-6 rounded-2xl shadow-xl" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
                  <h3 className="text-lg font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                    Task Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FF5E14' }}>
                        <span className="text-white text-sm">⏰</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium" style={{ color: '#B3B5BC' }}>Duration:</span>
                        <span className="ml-2 font-semibold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                          {task.duration}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FF5E14' }}>
                        <span className="text-white text-sm">📍</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium" style={{ color: '#B3B5BC' }}>Location:</span>
                        <span className="ml-2 font-semibold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                          {task.location}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#001554' }}>
                        <span className="text-white text-sm">📅</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium" style={{ color: '#B3B5BC' }}>Posted:</span>
                        <span className="ml-2 font-semibold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                          {task.posted}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#001554' }}>
                        <span className="text-white text-sm">⚡</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium" style={{ color: '#B3B5BC' }}>Deadline:</span>
                        <span className="ml-2 font-semibold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                          {task.deadline}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl shadow-xl" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
                  <h3 className="text-lg font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                    Tasks to Complete
                  </h3>
                  <ul className="space-y-2">
                    {task.tasks.map((taskItem, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: '#FF5E14' }}>
                          <span className="text-white text-xs">•</span>
                        </div>
                        <span className="text-sm" style={{ color: '#B3B5BC' }}>
                          {taskItem}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Requirements */}
              <div className="p-6 rounded-2xl shadow-xl mb-6" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
                <h3 className="text-lg font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                  Requirements
                </h3>
                <ul className="space-y-2">
                  {task.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: '#001554' }}>
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-sm" style={{ color: '#B3B5BC' }}>
                        {req}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Similar Tasks */}
              <div className="p-6 rounded-2xl shadow-xl" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
                <h3 className="text-lg font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                  Similar Tasks
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {task.similarTasks.map((similarTask) => (
                    <div key={similarTask.id} className="p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                         style={{ backgroundColor: theme === 'dark' ? '#2A2A2A' : '#F8F9FA' }}>
                      <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
                        <Image
                          src={similarTask.image}
                          alt={similarTask.title}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                      <h4 className="font-bold text-sm mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                        {similarTask.title}
                      </h4>
                      <div className="flex items-center justify-between">
                        <span className="font-bold" style={{ color: '#FF5E14' }}>
                          {similarTask.price}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full" 
                              style={{ backgroundColor: '#001554', color: '#FFFFFF' }}>
                          {similarTask.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Task Creator */}
              <div className="p-6 rounded-2xl shadow-xl mb-6" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
                <h3 className="text-lg font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                  Task Creator
                </h3>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full mx-auto mb-3 overflow-hidden shadow-lg border-3 relative"
                       style={{ borderColor: '#FF5E14' }}>
                    <Image
                      src={task.creator.avatar}
                      alt={task.creator.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const div = document.createElement('div');
                        div.className = 'w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center';
                        div.innerHTML = `<span class="text-white text-xl font-bold">${task.creator.name.split(' ').map(n => n[0]).join('')}</span>`;
                        e.currentTarget.parentNode.replaceChild(div, e.currentTarget);
                      }}
                    />
                  </div>
                  <h4 className="font-bold mb-1" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                    {task.creator.name}
                  </h4>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <span className="text-yellow-400">⭐</span>
                    <span className="font-semibold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                      {task.creator.rating}
                    </span>
                    <span className="text-sm" style={{ color: '#B3B5BC' }}>
                      ({task.creator.reviews} reviews)
                    </span>
                  </div>
                  <p className="text-sm mb-2" style={{ color: '#B3B5BC' }}>
                    Member since {task.creator.memberSince}
                  </p>
                  <p className="text-sm" style={{ color: '#B3B5BC' }}>
                    {task.creator.tasksCompleted} tasks completed
                  </p>
                </div>
              </div>

              {/* Advertisement Space */}
              <div className="mb-6">
                <AdSpace />
              </div>

              {/* Apply Button */}
              <div className="p-6 rounded-2xl shadow-xl" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
                <button className="w-full py-3 px-6 rounded-xl font-bold text-white text-lg hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: '#FF5E14' }}>
                  Apply for Task
                </button>
                <button className="w-full py-3 px-6 rounded-xl font-bold text-lg mt-3 border-2 hover:opacity-90 transition-opacity"
                        style={{ 
                          borderColor: '#001554',
                          color: theme === 'dark' ? '#FFFFFF' : '#001554',
                          backgroundColor: 'transparent'
                        }}>
                  Message Creator
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
