import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Navigation from '../../src/components/Navigation';
import Footer from '../../src/components/Footer';
import Image from 'next/image';

// Simple Clean Billboard Advertisement Component - Enhanced & Bigger
const SimpleBillboard = ({ side }: { side: 'left' | 'right' }) => {
  const { theme } = useTheme();
  const [showPopup, setShowPopup] = useState(false);
  
  return (
    <>
      <div className="w-full">
        <div className="sticky top-6">
          <div className="relative p-10 rounded-3xl border-4 border-dashed min-h-[700px] flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-2xl"
               style={{ 
                 backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF',
                 borderColor: side === 'left' ? '#FF5E14' : '#001554'
               }}>
            <div className="text-center">
              <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl transition-all duration-300 hover:scale-110" 
                   style={{ backgroundColor: side === 'left' ? '#FF5E14' : '#001554' }}>
                <span className="text-white text-4xl">
                  {side === 'left' ? '📢' : '🎯'}
                </span>
              </div>
              <h2 className="text-3xl font-bold mb-10 leading-tight" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                Advertisement<br />Space Available
              </h2>
              <button 
                onClick={() => setShowPopup(true)}
                className="px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-110 hover:shadow-lg transform active:scale-95"
                style={{ 
                  backgroundColor: side === 'left' ? '#FF5E14' : '#001554',
                  color: '#FFFFFF'
                }}>
                📋 Info
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Info Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-10 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300 scale-105">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-3xl font-bold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                Advertisement Details
              </h3>
              <button 
                onClick={() => setShowPopup(false)}
                className="text-gray-500 hover:text-gray-700 text-3xl font-bold transition-all duration-300 hover:scale-110"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="p-6 rounded-2xl border-3 border-dashed" 
                   style={{ borderColor: side === 'left' ? '#FF5E14' : '#001554' }}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg" 
                       style={{ backgroundColor: side === 'left' ? '#FF5E14' : '#001554' }}>
                    <span className="text-white text-2xl">
                      {side === 'left' ? '📢' : '🎯'}
                    </span>
                  </div>
                  <span className="text-xl font-bold block mb-2" style={{ color: side === 'left' ? '#FF5E14' : '#001554' }}>
                    Premium {side === 'left' ? 'Left' : 'Right'} Side Billboard
                  </span>
                  <span className="text-lg font-semibold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                    380 × 700 px
                  </span>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold mb-4 text-xl" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                  Perfect for:
                </h4>
                <ul className="text-base space-y-2" style={{ color: '#B3B5BC' }}>
                  <li className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: side === 'left' ? '#FF5E14' : '#001554' }}></span>
                    Brand promotions & campaigns
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: side === 'left' ? '#FF5E14' : '#001554' }}></span>
                    New product launches
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: side === 'left' ? '#FF5E14' : '#001554' }}></span>
                    Service advertising
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: side === 'left' ? '#FF5E14' : '#001554' }}></span>
                    Local business promotion
                  </li>
                </ul>
              </div>
              
              <div className="p-6 rounded-2xl" 
                   style={{ backgroundColor: theme === 'dark' ? '#2A2A2A' : '#F8F9FA' }}>
                <p className="text-base font-semibold text-center" style={{ color: '#B3B5BC' }}>
                  📞 Contact us for advertising rates and availability
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
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
        <div className="max-w-8xl mx-auto px-2 sm:px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            
            {/* Left Enhanced Billboard - Moved closer to border */}
            <div className="lg:col-span-3 hidden lg:block">
              <SimpleBillboard side="left" />
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-6">
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
                  </div>
                </div>
              </div>

              {/* Image Gallery */}
              <div className="p-6 rounded-2xl shadow-xl mb-6" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
                <h2 className="text-xl font-bold mb-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                  Project Images
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Main Featured Image */}
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg border-4" style={{ borderColor: '#FF5E14' }}>
                    <Image
                      src={task.images[0]}
                      alt="Featured project image"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-black bg-opacity-50 text-white text-sm font-medium rounded-full">
                      Featured
                    </div>
                  </div>
                  
                  {/* Secondary Images Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {task.images.slice(1).map((image, index) => (
                      <div key={index + 1} className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-md border-2 hover:border-4 transition-all duration-300" style={{ borderColor: theme === 'dark' ? '#2A2A2A' : '#E5E7EB' }}>
                        <Image
                          src={image}
                          alt={`Project image ${index + 2}`}
                          fill
                          className="object-cover hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300"></div>
                      </div>
                    ))}
                    
                    {/* View More Button */}
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-md border-2 border-dashed flex items-center justify-center cursor-pointer hover:border-4 transition-all duration-300"
                         style={{ borderColor: '#FF5E14', backgroundColor: theme === 'dark' ? '#2A2A2A' : '#F8F9FA' }}>
                      <div className="text-center">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2" style={{ backgroundColor: '#FF5E14' }}>
                          <span className="text-white text-xl">📸</span>
                        </div>
                        <span className="text-sm font-medium" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                          View More
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons - Positioned directly below image */}
              <div className="p-6 sm:p-8 rounded-2xl shadow-xl mb-6" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-center" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                    Ready to Take Action?
                  </h3>
                  
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="text-2xl sm:text-3xl font-black" style={{ color: '#FF5E14' }}>
                      {task.price}
                    </div>
                    <div className="px-3 py-1 text-sm font-medium rounded-full" 
                         style={{ backgroundColor: '#001554', color: '#FFFFFF' }}>
                      {task.category}
                    </div>
                    {task.urgent && (
                      <span className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full">
                        URGENT
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-center gap-4 mb-6 text-sm" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                    <span className="flex items-center gap-1">
                      <span>⏰</span>
                      <span>{task.duration}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span>📍</span>
                      <span>{task.location}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span>📅</span>
                      <span>{task.deadline}</span>
                    </span>
                  </div>
                  
                  {/* Apply for Task Button */}
                  <button className="w-full py-4 px-8 rounded-xl font-bold text-white text-xl mb-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
                          style={{ backgroundColor: '#FF5E14' }}>
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-2xl">✅</span>
                      <span>Apply for Task</span>
                    </div>
                    <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
                  </button>
                  
                  {/* Message Creator Button */}
                  <button className="w-full py-4 px-8 rounded-xl font-bold text-xl border-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
                          style={{ 
                            borderColor: '#001554',
                            color: '#001554',
                            backgroundColor: theme === 'dark' ? '#FFFFFF' : '#FFFFFF'
                          }}>
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-2xl">💬</span>
                      <span>Message Creator</span>
                    </div>
                    <div className="absolute inset-0 bg-blue-500 opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
                  </button>
                  
                  {/* Quick Contact Info */}
                  <div className="p-4 rounded-xl" style={{ backgroundColor: theme === 'dark' ? '#2A2A2A' : '#F8F9FA' }}>
                    <div className="text-center">
                      <p className="text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                        Quick Application Process
                      </p>
                      <div className="flex items-center justify-center gap-4 text-xs" style={{ color: '#B3B5BC' }}>
                        <span className="flex items-center gap-1">
                          <span>⚡</span>
                          <span>Fast Response</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <span>🛡️</span>
                          <span>Secure Payment</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <span>✨</span>
                          <span>Quality Assured</span>
                        </span>
                      </div>
                    </div>
                  </div>
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
            <div className="lg:col-span-2">
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
                        const target = e.currentTarget;
                        const parent = target.parentNode;
                        if (parent) {
                          const div = document.createElement('div');
                          div.className = 'w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center';
                          div.innerHTML = `<span class="text-white text-xl font-bold">${task.creator.name.split(' ').map(n => n[0]).join('')}</span>`;
                          parent.replaceChild(div, target);
                        }
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
            </div>
            
            {/* Right Enhanced Billboard - Moved closer to border */}
            <div className="lg:col-span-3 hidden lg:block">
              <SimpleBillboard side="right" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
