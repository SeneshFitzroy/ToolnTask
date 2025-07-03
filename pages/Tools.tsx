
import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import ToolCard from '../src/components/ToolCard';
import { Button } from '../src/components/ui/button';
import { useState } from 'react';

export default function Tools() {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  const allTools = [
    {
      title: "Power Drill Set",
      description: "Professional Bosch power drill with multiple bits. Perfect for home improvement projects.",
      price: "Rs. 1,500/day",
      brand: "Bosch",
      condition: "Excellent",
      available: true,
      isPromoted: true,
      image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=300&fit=crop",
      category: "power"
    },
    {
      title: "Lawn Mower",
      description: "Electric lawn mower in great condition. Ideal for medium to large gardens.",
      price: "Rs. 2,000/day",
      brand: "Honda",
      condition: "Good",
      available: true,
      image: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=400&h=300&fit=crop",
      category: "garden"
    },
    {
      title: "Angle Grinder",
      description: "Heavy-duty angle grinder for metal cutting and grinding projects.",
      price: "Rs. 1,200/day",
      brand: "Makita",
      condition: "Excellent",
      available: false,
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
      category: "power"
    },
    {
      title: "Circular Saw",
      description: "Professional circular saw for woodworking and construction projects.",
      price: "Rs. 1,800/day",
      brand: "DeWalt",
      condition: "Good",
      available: true,
      image: "https://images.unsplash.com/photo-1609010697446-11f2155278f0?w=400&h=300&fit=crop",
      category: "power"
    },
    {
      title: "Pressure Washer",
      description: "High-pressure washer for cleaning driveways, decks, and exterior surfaces.",
      price: "Rs. 2,500/day",
      brand: "Karcher",
      condition: "Excellent",
      available: true,
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=300&fit=crop",
      category: "equipment"
    },
    {
      title: "Tile Cutter",
      description: "Professional tile cutting machine for bathroom and kitchen renovations.",
      price: "Rs. 1,000/day",
      brand: "Rubi",
      condition: "Good",
      available: false,
      image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop",
      category: "hand"
    }
  ];

  const getFilteredTools = () => {
    if (activeFilter === 'all') return allTools;
    return allTools.filter(tool => tool.category === activeFilter);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      {/* Search Section */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-orange-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-6 sm:mb-8 text-center">Rent Tools</h1>
          <div className="flex flex-col md:flex-row gap-4 mb-6 sm:mb-8">
            <input
              type="text"
              placeholder="Search for tools..."
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
                  ? 'border-blue-500 bg-blue-500 text-white' 
                  : 'border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-slate-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:border-blue-300'
              }`}
            >
              All Tools
            </Button>
            <Button 
              onClick={() => handleFilterChange('power')}
              className={`border-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-sm sm:text-base ${
                activeFilter === 'power' 
                  ? 'border-blue-500 bg-blue-500 text-white' 
                  : 'border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-slate-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:border-blue-300'
              }`}
            >
              Power Tools
            </Button>
            <Button 
              onClick={() => handleFilterChange('garden')}
              className={`border-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-sm sm:text-base ${
                activeFilter === 'garden' 
                  ? 'border-blue-500 bg-blue-500 text-white' 
                  : 'border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-slate-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:border-blue-300'
              }`}
            >
              Garden Tools
            </Button>
            <Button 
              onClick={() => handleFilterChange('hand')}
              className={`border-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-sm sm:text-base ${
                activeFilter === 'hand' 
                  ? 'border-blue-500 bg-blue-500 text-white' 
                  : 'border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-slate-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:border-blue-300'
              }`}
            >
              Hand Tools
            </Button>
            <Button 
              onClick={() => handleFilterChange('equipment')}
              className={`border-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-sm sm:text-base ${
                activeFilter === 'equipment' 
                  ? 'border-blue-500 bg-blue-500 text-white' 
                  : 'border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-slate-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:border-blue-300'
              }`}
            >
              Equipment
            </Button>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {getFilteredTools().map((tool, index) => (
            <ToolCard
              key={index}
              title={tool.title}
              description={tool.description}
              price={tool.price}
              brand={tool.brand}
              condition={tool.condition}
              available={tool.available}
              isPromoted={tool.isPromoted}
              image={tool.image}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
