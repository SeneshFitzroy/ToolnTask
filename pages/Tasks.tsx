
import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import TaskCard from '../src/components/TaskCard';
import { Button } from '../src/components/ui/button';
import { useState } from 'react';

export default function Tasks() {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  const allTasks = [
    {
      title: "Garden Maintenance",
      description: "Looking for someone to help with weekly garden maintenance including weeding, pruning, and lawn care.",
      price: "Rs. 5,000",
      time: "2-3 hours",
      location: "Colombo 03",
      isUrgent: true,
      isPromoted: true,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
      category: "gardening"
    },
    {
      title: "House Cleaning",
      description: "Need help with deep cleaning of 3-bedroom house. All supplies provided.",
      price: "Rs. 8,000",
      time: "4-5 hours",
      location: "Kandy",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      category: "cleaning"
    },
    {
      title: "Babysitting Service",
      description: "Reliable babysitting for 2 kids (ages 5 and 8) for weekend evenings.",
      price: "Rs. 3,000",
      time: "4 hours",
      location: "Galle",
      image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop",
      category: "babysitting"
    },
    {
      title: "Furniture Assembly",
      description: "Need help assembling IKEA furniture including wardrobe and desk.",
      price: "Rs. 4,500",
      time: "3 hours",
      location: "Colombo 07",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      category: "repairs"
    },
    {
      title: "Pet Walking",
      description: "Looking for someone to walk my dog twice a day for a week.",
      price: "Rs. 2,500",
      time: "1 hour/day",
      location: "Mount Lavinia",
      image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400&h=300&fit=crop",
      category: "other"
    },
    {
      title: "Cooking Assistance",
      description: "Need help preparing meals for a family gathering of 20 people.",
      price: "Rs. 6,000",
      time: "5-6 hours",
      location: "Negombo",
      isUrgent: true,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      category: "other"
    }
  ];

  const getFilteredTasks = () => {
    if (activeFilter === 'all') return allTasks;
    return allTasks.filter(task => task.category === activeFilter);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      {/* Search Section */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-orange-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-6 sm:mb-8 text-center">Find Tasks</h1>
          <div className="flex flex-col md:flex-row gap-4 mb-6 sm:mb-8">
            <input
              type="text"
              placeholder="Search for tasks..."
              className="flex-1 px-4 sm:px-6 py-3 sm:py-4 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:border-orange-600 focus:outline-none text-base sm:text-lg shadow-sm bg-white dark:bg-gray-800 text-slate-800 dark:text-white"
            />
            <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl font-semibold shadow-lg">
              Search
            </Button>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
            <Button 
              onClick={() => handleFilterChange('all')}
              className={`border-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-sm sm:text-base ${
                activeFilter === 'all' 
                  ? 'border-orange-500 bg-orange-500 text-white' 
                  : 'border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-slate-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:border-orange-300'
              }`}
            >
              All Categories
            </Button>
            <Button 
              onClick={() => handleFilterChange('cleaning')}
              className={`border-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-sm sm:text-base ${
                activeFilter === 'cleaning' 
                  ? 'border-orange-500 bg-orange-500 text-white' 
                  : 'border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-slate-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:border-orange-300'
              }`}
            >
              Cleaning
            </Button>
            <Button 
              onClick={() => handleFilterChange('gardening')}
              className={`border-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-sm sm:text-base ${
                activeFilter === 'gardening' 
                  ? 'border-orange-500 bg-orange-500 text-white' 
                  : 'border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-slate-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:border-orange-300'
              }`}
            >
              Gardening
            </Button>
            <Button 
              onClick={() => handleFilterChange('repairs')}
              className={`border-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-sm sm:text-base ${
                activeFilter === 'repairs' 
                  ? 'border-orange-500 bg-orange-500 text-white' 
                  : 'border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-slate-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:border-orange-300'
              }`}
            >
              Repairs
            </Button>
            <Button 
              onClick={() => handleFilterChange('babysitting')}
              className={`border-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-sm sm:text-base ${
                activeFilter === 'babysitting' 
                  ? 'border-orange-500 bg-orange-500 text-white' 
                  : 'border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-slate-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:border-orange-300'
              }`}
            >
              Babysitting
            </Button>
          </div>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {getFilteredTasks().map((task, index) => (
            <TaskCard
              key={index}
              title={task.title}
              description={task.description}
              price={task.price}
              time={task.time}
              location={task.location}
              isUrgent={task.isUrgent}
              isPromoted={task.isPromoted}
              image={task.image}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
