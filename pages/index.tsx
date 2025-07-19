import React from 'react';
import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import TaskCard from '../src/components/TaskCard';
import ToolCard from '../src/components/ToolCard';
import FilterButtons from '../src/components/FilterButtons';
import Logo from '../src/components/Logo';
import ToolsTasksChatAgent from '../src/components/ToolsTasksChatAgent';
import { Button } from '../src/components/ui/button';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'tasks' | 'tools'>('all');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleFilterChange = (filter: 'all' | 'tasks' | 'tools') => {
    setActiveFilter(filter);
  };

  const taskCards = [
    <TaskCard
      key="task1"
      id="garden_maintenance"
      title="Garden Maintenance"
      description="Looking for someone to help with weekly garden maintenance including weeding, pruning, and lawn care."
      price="Rs. 5,000"
      time="2-3 hours"
      location="Colombo 03"
      isUrgent={true}
      isPromoted={true}
      image="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop"
    />,
    <TaskCard
      key="task3"
      id="babysitting_service"
      title="Babysitting Service"
      description="Reliable babysitting for 2 kids (ages 5 and 8) for weekend evenings."
      price="Rs. 3,000"
      time="4 hours"
      location="Galle"
      isPromoted={true}
      image="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop"
    />
  ];

  const toolCards = [
    <ToolCard
      key="tool1"
      id="power_drill_set"
      title="Power Drill Set"
      description="Professional Bosch power drill with multiple bits. Perfect for home improvement projects."
      price="Rs. 1,500/day"
      brand="Bosch"
      condition="Excellent"
      available={true}
      isPromoted={true}
      image="https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=300&fit=crop"
    />,
    <ToolCard
      key="tool2"
      id="lawn_mower"
      title="Lawn Mower"
      description="Electric lawn mower in great condition. Ideal for medium to large gardens."
      price="Rs. 2,000/day"
      brand="Honda"
      condition="Good"
      available={true}
      isPromoted={true}
      image="https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=400&h=300&fit=crop"
    />
  ];

  const getFilteredCards = () => {
    if (activeFilter === 'tasks') return taskCards;
    if (activeFilter === 'tools') return toolCards;
    return [...taskCards, ...toolCards];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      {activeFilter === 'all' && (
        <div className="relative overflow-hidden">
          {/* Video Background */}
          <div className="absolute inset-0 w-full h-full">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              poster="/hero-video-poster.png"
            >
              <source src="/hero-video.mp4" type="video/mp4" />
            </video>
            <div 
              className="absolute inset-0" 
              style={{
                background: 'linear-gradient(135deg, rgba(255, 94, 20, 0.85) 0%, rgba(0, 0, 0, 0.6) 100%)'
              }}
            ></div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 container mx-auto px-4 py-24 sm:py-32 text-center">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="mb-8">
                <Logo size="large" />
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Find <span style={{ color: '#FF5E14' }}>Local Help</span> or 
                <br className="hidden sm:block" />
                <span style={{ color: '#FF5E14' }}> Rent Tools</span> Instantly
              </h1>
              
              <p className="text-xl sm:text-2xl max-w-3xl mx-auto" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                Connect with skilled professionals for tasks or rent quality tools from your neighbors. 
                Safe, simple, and community-driven.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                <Link href="/Tasks">
                  <Button 
                    className="w-full sm:w-auto text-lg font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105"
                    style={{ 
                      backgroundColor: '#FF5E14',
                      color: '#FFFFFF'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#E8460C';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#FF5E14';
                    }}
                  >
                    Find Tasks
                  </Button>
                </Link>
                
                <Link href="/About">
                  <Button 
                    className="w-full sm:w-auto text-lg font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 border-2"
                    style={{ 
                      backgroundColor: 'transparent',
                      color: '#FFFFFF',
                      borderColor: 'rgba(255, 255, 255, 0.4)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.borderColor = '#FFFFFF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                    }}
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
              
              {/* Simple Trust Indicators */}
              <div className="flex justify-center gap-6 sm:gap-8 text-base sm:text-lg" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FF5E14' }}></div>
                  <span className="font-medium">No Fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FF5E14' }}></div>
                  <span className="font-medium">Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FF5E14' }}></div>
                  <span className="font-medium">Secure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <FilterButtons 
            activeFilter={activeFilter} 
            onFilterChange={handleFilterChange}
          />
        </div>
      </div>

      {/* Cards Section */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {getFilteredCards()}
        </div>
      </main>

      <ToolsTasksChatAgent pageType="home" />
      <Footer showNewsletter={true} />
    </div>
  );
}
