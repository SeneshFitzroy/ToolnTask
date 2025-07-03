import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import TaskCard from '../src/components/TaskCard';
import ToolCard from '../src/components/ToolCard';
import FilterButtons from '../src/components/FilterButtons';
import Logo from '../src/components/Logo';
import { Button } from '../src/components/ui/button';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'tasks' | 'tools'>('all');
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showTopBanner, setShowTopBanner] = useState(true);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
    
    // Rotate ads every 8 seconds
    const adRotationTimer = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % 3);
    }, 8000);

    // Auto-hide top banner after 10 seconds
    const bannerTimer = setTimeout(() => {
      setShowTopBanner(false);
    }, 10000);

    return () => {
      clearInterval(adRotationTimer);
      clearTimeout(bannerTimer);
    };
  }, []);

  if (!mounted) return null;

  const handleFilterChange = (filter: 'all' | 'tasks' | 'tools') => {
    setActiveFilter(filter);
  };

  // Advertisement data
  const advertisements = [
    {
      id: 1,
      title: "Lanka Hardware Store",
      subtitle: "Premium Tools & Equipment",
      description: "Get 20% off on all power tools this month!",
      cta: "Shop Now",
      image: "🔧",
      color: "#2563EB",
      link: "/ads/lanka-hardware"
    },
    {
      id: 2,
      title: "Green Garden Services",
      subtitle: "Professional Landscaping",
      description: "Transform your garden with expert care",
      cta: "Book Service",
      image: "🌱",
      color: "#059669",
      link: "/ads/green-garden"
    },
    {
      id: 3,
      title: "Quick Fix Solutions",
      subtitle: "Home Repair Experts",
      description: "24/7 emergency repair services available",
      cta: "Call Now",
      image: "🔨",
      color: "#DC2626",
      link: "/ads/quick-fix"
    }
  ];

  const taskCards = [
    <TaskCard
      key="task1"
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
      key="task2"
      title="House Cleaning"
      description="Need help with deep cleaning of 3-bedroom house. All supplies provided."
      price="Rs. 8,000"
      time="4-5 hours"
      location="Kandy"
      isPromoted={true}
      image="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"
    />,
    <TaskCard
      key="task3"
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
      title="Lawn Mower"
      description="Electric lawn mower in great condition. Ideal for medium to large gardens."
      price="Rs. 2,000/day"
      brand="Honda"
      condition="Good"
      available={true}
      isPromoted={true}
      image="https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=400&h=300&fit=crop"
    />,
    <ToolCard
      key="tool3"
      title="Angle Grinder"
      description="Heavy-duty angle grinder for metal cutting and grinding projects."
      price="Rs. 1,200/day"
      brand="Makita"
      condition="Excellent"
      available={false}
      isPromoted={true}
      image="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop"
    />
  ];

  const getFilteredCards = () => {
    if (activeFilter === 'tasks') return taskCards;
    if (activeFilter === 'tools') return toolCards;
    return [...taskCards, ...toolCards];
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme === 'dark' ? '#0C0F16' : '#F2F3F5' }}>
      {/* Top Advertisement Banner */}
      {showTopBanner && (
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 text-center transition-all duration-500">
          <div className="flex items-center justify-center gap-4 text-sm sm:text-base">
            <span className="font-semibold">🎉 Special Offer:</span>
            <span>Get 50% off your first business listing!</span>
            <Link href="/business-signup" className="bg-white text-blue-600 px-3 py-1 rounded-full font-bold hover:bg-blue-50 transition-colors">
              Claim Now
            </Link>
            <button 
              onClick={() => setShowTopBanner(false)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <Navigation />
      
      {/* Hero Section */}
      <div className="py-8 sm:py-12 md:py-16 lg:py-20" style={{ backgroundColor: theme === 'dark' ? '#0C0F16' : '#F2F3F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-16 items-center">
            {/* Hero Content - Takes 8 columns */}
            <div className="lg:col-span-8 text-center lg:text-left order-2 lg:order-1">
              <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6 shadow-lg" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
                <span className="text-xs sm:text-sm font-semibold" style={{ color: '#FF5E14' }}>🎉 New in Sri Lanka</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-3 md:mb-4 leading-tight" style={{ color: '#001554' }}>
                Need a Hand or a Hammer?
              </h1>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-4 sm:mb-6" style={{ color: '#FF5E14' }}>
                We&apos;ve Got Both!
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0 px-2 sm:px-0" style={{ color: '#B3B5BC' }}>
                Sri Lanka&apos;s first community marketplace where neighbors help neighbors. 
                Get quick tasks done or rent the tools you need from people nearby.
              </p>
              <div className="flex justify-center lg:justify-start mb-4 sm:mb-6 md:mb-8">
                <Link href="/Tasks">
                  <Button 
                    className="w-full sm:w-auto text-white px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-4 md:py-5 text-base sm:text-lg md:text-xl font-bold rounded-lg sm:rounded-xl md:rounded-2xl transition-all duration-500 hover:scale-105 sm:hover:scale-110 shadow-2xl border-0 relative overflow-hidden group"
                    style={{ 
                      backgroundColor: '#FF5E14',
                      background: 'linear-gradient(135deg, #FF5E14 0%, #FF5D13 50%, #FF5E14 100%)',
                      boxShadow: '0 10px 30px rgba(255, 94, 20, 0.4), 0 5px 15px rgba(255, 94, 20, 0.2)',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 font-bold tracking-wide">
                      Get Started Today
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full" style={{ backgroundColor: '#FF5E14' }}></div>
                  <span style={{ color: theme === 'dark' ? '#B3B5BC' : '#B3B5BC' }}>5,000+ Happy Users</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full" style={{ backgroundColor: '#FF5E14' }}></div>
                  <span style={{ color: theme === 'dark' ? '#B3B5BC' : '#B3B5BC' }}>100% Secure</span>
                </div>
              </div>
            </div>
            
            {/* Sidebar Advertisement - Takes 4 columns */}
            <div className="lg:col-span-4 order-1 lg:order-2">
              <div className="sticky top-4 space-y-4">
                {/* Rotating Business Ad */}
                <div 
                  className="rounded-2xl p-6 shadow-xl transition-all duration-500 hover:scale-105 cursor-pointer"
                  style={{ backgroundColor: advertisements[currentAdIndex].color }}
                  onClick={() => window.open(advertisements[currentAdIndex].link, '_blank')}
                >
                  <div className="text-center text-white">
                    <div className="text-4xl mb-3">{advertisements[currentAdIndex].image}</div>
                    <h3 className="font-bold text-lg mb-2">{advertisements[currentAdIndex].title}</h3>
                    <p className="text-sm opacity-90 mb-1">{advertisements[currentAdIndex].subtitle}</p>
                    <p className="text-xs opacity-80 mb-4">{advertisements[currentAdIndex].description}</p>
                    <div className="bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-bold hover:bg-gray-100 transition-colors inline-block">
                      {advertisements[currentAdIndex].cta}
                    </div>
                  </div>
                  
                  {/* Ad indicator dots */}
                  <div className="flex justify-center mt-4 gap-2">
                    {advertisements.map((_, index) => (
                      <div 
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentAdIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Static Business Directory Ad */}
                <div className="rounded-xl p-4 border-2 border-dashed border-gray-300 bg-white/50 backdrop-blur-sm text-center">
                  <div className="text-2xl mb-2">📢</div>
                  <h4 className="font-bold text-sm mb-2" style={{ color: theme === 'dark' ? '#1A1818' : '#1A1818' }}>
                    Advertise Here
                  </h4>
                  <p className="text-xs text-gray-600 mb-3">
                    Reach thousands of local customers
                  </p>
                  <Link href="/advertise">
                    <Button 
                      className="text-xs px-4 py-2 rounded-lg"
                      style={{ backgroundColor: '#FF5E14', color: '#FFFFFF' }}
                    >
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Business Spotlight Banner */}
      <div className="py-4" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-xl p-4 sm:p-6 shadow-lg">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl">
                  ⭐
                </div>
                <div className="text-white text-center sm:text-left">
                  <h3 className="font-bold text-lg">Business Spotlight</h3>
                  <p className="text-sm opacity-90">Featured local services and tools</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Link href="/businesses">
                  <Button className="bg-white text-orange-600 px-4 py-2 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                    Browse All
                  </Button>
                </Link>
                <Link href="/list-business">
                  <Button className="bg-transparent border-2 border-white text-white px-4 py-2 rounded-lg font-bold hover:bg-white hover:text-orange-600 transition-colors">
                    List Your Business
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="py-3 sm:py-4 md:py-6" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FilterButtons onFilterChange={handleFilterChange} activeFilter={activeFilter} />
        </div>
      </div>

      {/* Promoted Cards Section */}
      <div className="py-4 sm:py-6 md:py-8" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
            {/* Cards - Takes 9 columns */}
            <div className="lg:col-span-9">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {getFilteredCards()}
              </div>
            </div>
            
            {/* Right Sidebar Ads - Takes 3 columns */}
            <div className="lg:col-span-3">
              <div className="sticky top-4 space-y-4">
                {/* Service Provider Ad */}
                <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-xl p-4 text-white text-center shadow-lg">
                  <div className="text-3xl mb-2">🏠</div>
                  <h4 className="font-bold text-sm mb-2">Home Pro Services</h4>
                  <p className="text-xs opacity-90 mb-3">Professional cleaning, repairs & maintenance</p>
                  <Button className="bg-white text-green-600 px-3 py-1 text-xs rounded-lg font-bold hover:bg-gray-100">
                    Book Now
                  </Button>
                </div>

                {/* Tool Rental Ad */}
                <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl p-4 text-white text-center shadow-lg">
                  <div className="text-3xl mb-2">🔧</div>
                  <h4 className="font-bold text-sm mb-2">ToolMart Rentals</h4>
                  <p className="text-xs opacity-90 mb-3">Premium tools at affordable daily rates</p>
                  <Button className="bg-white text-purple-600 px-3 py-1 text-xs rounded-lg font-bold hover:bg-gray-100">
                    Browse Tools
                  </Button>
                </div>

                {/* Skills Training Ad */}
                <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl p-4 text-white text-center shadow-lg">
                  <div className="text-3xl mb-2">🎓</div>
                  <h4 className="font-bold text-sm mb-2">SkillUp Academy</h4>
                  <p className="text-xs opacity-90 mb-3">Learn new skills, earn more money</p>
                  <Button className="bg-white text-pink-600 px-3 py-1 text-xs rounded-lg font-bold hover:bg-gray-100">
                    Start Learning
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Promotional Banner Section */}
      <div className="py-8 sm:py-12 md:py-16" style={{ backgroundColor: theme === 'dark' ? '#0C0F16' : '#F2F3F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl" style={{ background: 'linear-gradient(135deg, #FF5E14 0%, #FF5D13 50%, #FF5E14 100%)' }}>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center p-6 sm:p-8 md:p-12">
              {/* Left Content */}
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 border border-white/30" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}>
                  <span className="text-xs sm:text-sm font-bold text-white">🎯 Limited Time Offer</span>
                </div>
                
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                  Get Your First Task Free!
                </h3>
                
                <p className="text-base sm:text-lg text-white/90 mb-6 sm:mb-8 leading-relaxed max-w-xl">
                  New users get their first task posting absolutely free. Join now and connect with your community instantly!
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                  <Link href="/SignUp">
                    <Button 
                      className="w-full sm:w-auto text-base sm:text-lg font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-xl border-2"
                      style={{ 
                        backgroundColor: '#FFFFFF',
                        color: '#FF5E14',
                        borderColor: '#FFFFFF'
                      }}
                    >
                      <span className="flex items-center gap-2 font-bold">
                        Claim Free Task
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Right Visual */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30">
                        <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z" />
                        </svg>
                      </div>
                      <div className="text-white font-bold text-lg sm:text-xl">FREE</div>
                      <div className="text-white/80 text-sm">First Task</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 sm:py-16 md:py-20 relative overflow-hidden" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
              Trusted by Communities Across{' '}
              <span style={{ color: '#FF5E14' }}>Sri Lanka</span>
            </h2>
            <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
              From coast to hill, across all of Sri Lanka, thousands are uniting to help each other every day!
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {[
              { icon: '👥', number: '5,000+', label: 'Active Users', color: '#FF5E14' },
              { icon: '🔧', number: '1,000+', label: 'Tools Available', color: '#FF5E14' },
              { icon: '🏆', number: '500+', label: 'Tasks Completed', color: '#001554' }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="text-center p-6 sm:p-8 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: theme === 'dark' ? '#0C0F16' : '#F2F3F5' }}
              >
                <div className="text-4xl sm:text-5xl mb-4">{stat.icon}</div>
                <div className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: stat.color }}>
                  {stat.number}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                  {stat.label}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 sm:py-20 md:py-24 relative overflow-hidden" style={{ backgroundColor: theme === 'dark' ? '#0C0F16' : '#F2F3F5' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
              How <Logo size="xl" showUnderline={true} className="inline" /> Works
            </h2>
            <p className="text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
              Getting help or lending a hand has never been easier. Join thousands building stronger communities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
            {[
              { 
                step: '1', 
                icon: '📝', 
                title: 'Post or Browse', 
                desc: 'Create a task listing or browse available tools and services in your neighborhood',
                color: '#FF5E14'
              },
              { 
                step: '2', 
                icon: '🤝', 
                title: 'Connect & Agree', 
                desc: 'Chat with providers, negotiate terms, and agree on fair pricing that works for everyone',
                color: '#FF5E14'
              },
              { 
                step: '3', 
                icon: '✅', 
                title: 'Complete & Review', 
                desc: 'Finish the task safely, complete secure payment, and build trust through honest reviews',
                color: '#001554'
              }
            ].map((step, index) => (
              <div key={index} className="text-center relative group">
                <div 
                  className="relative p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 group cursor-pointer"
                  style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl mx-auto mb-4 shadow-lg" style={{ backgroundColor: step.color }}>
                    {step.step}
                  </div>
                  <div className="text-4xl sm:text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 transform group-hover:scale-105 transition-transform duration-300" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Clean & Concise CTA Section */}
      <div className="py-12 sm:py-16 md:py-20 relative overflow-hidden" style={{ backgroundColor: '#001554' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight" style={{ color: '#FFFFFF' }}>
            Transform Your <span style={{ color: '#FF5E14' }}>Community</span>
          </h2>
          
          <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            Join thousands building stronger neighborhoods. Start earning, saving, and helping today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link href="/SignUp">
              <Button 
                className="w-full sm:w-auto text-lg font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-xl border-0"
                style={{ 
                  backgroundColor: '#FF5E14',
                  color: '#FFFFFF',
                  boxShadow: '0 10px 25px rgba(255, 94, 20, 0.4)'
                }}
              >
                <span className="flex items-center gap-2">
                  Join Free
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
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
              >
                Learn More
              </Button>
            </Link>
          </div>
          
          <div className="flex justify-center gap-6 sm:gap-8 text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FF5E14' }}></div>
              <span>No Fees</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FF5E14' }}></div>
              <span>Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FF5E14' }}></div>
              <span>Secure</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      
      {/* Floating Bottom Banner */}
      <div className="fixed bottom-4 right-4 z-50 max-w-xs">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg shadow-2xl border border-white/20 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="text-2xl">💰</div>
            <div className="flex-1">
              <div className="font-bold text-sm">Earn Extra Income!</div>
              <div className="text-xs opacity-90">Join as a service provider</div>
            </div>
            <Button 
              className="bg-white text-blue-600 px-2 py-1 text-xs rounded font-bold hover:bg-gray-100"
              onClick={() => window.open('/provider-signup', '_blank')}
            >
              Join
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
