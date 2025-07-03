
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

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleFilterChange = (filter: 'all' | 'tasks' | 'tools') => {
    setActiveFilter(filter);
  };

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
      <Navigation />
      
      {/* Hero Section */}
      <div className="py-12 sm:py-16 lg:py-20" style={{ backgroundColor: theme === 'dark' ? '#0C0F16' : '#F2F3F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="text-center lg:text-left order-2 lg:order-1">
              <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6 shadow-lg" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
                <span className="text-xs sm:text-sm font-semibold" style={{ color: '#FF5E14' }}>🎉 New in Sri Lanka</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 leading-tight" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                Need a{' '}
                <span style={{ color: '#FF5E14' }}>Hand</span>
                {' '}or a{' '}
                <span 
                  className="relative inline-block"
                  style={{ color: '#FF5E14' }}
                >
                  Hammer?
                  <svg className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-2 sm:h-3" viewBox="0 0 100 10" style={{ fill: '#FF5E14', opacity: 0.3 }}>
                    <path d="M0 8 Q 50 0 100 8 L 100 10 L 0 10 Z" />
                  </svg>
                </span>
              </h1>
              <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-4 sm:mb-6" style={{ color: theme === 'dark' ? '#FF5E14' : '#001554' }}>
                We&apos;ve Got Both!
              </h2>
              <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0" style={{ color: '#B3B5BC' }}>
                Sri Lanka&apos;s first community marketplace where neighbors help neighbors. 
                Get quick tasks done or rent the tools you need from people nearby.
              </p>
              <div className="flex justify-center lg:justify-start mb-6 sm:mb-8">
                <Link href="/Tasks">
                  <Button 
                    className="w-full sm:w-auto text-white px-8 sm:px-12 py-4 sm:py-5 text-lg sm:text-xl font-bold rounded-xl sm:rounded-2xl transition-all duration-500 hover:scale-105 sm:hover:scale-110 shadow-2xl border-0 relative overflow-hidden group"
                    style={{ 
                      backgroundColor: '#FF5E14',
                      background: 'linear-gradient(135deg, #FF5E14 0%, #FF5D13 50%, #FF5E14 100%)',
                      boxShadow: '0 10px 30px rgba(255, 94, 20, 0.4), 0 5px 15px rgba(255, 94, 20, 0.2)',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #FF5D13 0%, #FF5E14 50%, #FF5D13 100%)';
                      e.currentTarget.style.boxShadow = '0 20px 50px rgba(255, 94, 20, 0.6), 0 10px 25px rgba(255, 94, 20, 0.3)';
                      e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
                      e.currentTarget.style.border = '2px solid rgba(255, 229, 20, 0.8)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #FF5E14 0%, #FF5D13 50%, #FF5E14 100%)';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 94, 20, 0.4), 0 5px 15px rgba(255, 94, 20, 0.2)';
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.2)';
                    }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 font-bold tracking-wide">
                      Get Started Today
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
                    <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-transparent via-yellow-200 to-transparent opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500"></div>
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm">
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
            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl">
                {/* Background Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-200 to-blue-200 rounded-3xl filter blur-3xl opacity-40 animate-pulse"></div>
                
                {/* Video Container */}
                <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 backdrop-blur-sm">
                  <video
                    className="w-full h-auto rounded-2xl object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    poster="/hero-video-poster.png"
                    onError={(e) => {
                      console.error('Video failed to load:', e);
                      // Fallback: hide video and show poster
                      e.currentTarget.style.display = 'none';
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'block';
                    }}
                  >
                    <source src="/hero-video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {/* Fallback Image */}
                  <div 
                    className="hidden w-full h-auto rounded-2xl bg-cover bg-center bg-no-repeat"
                    style={{ 
                      backgroundImage: `url('/hero-video-poster.png')`,
                      aspectRatio: '16/9',
                      minHeight: '300px'
                    }}
                  >
                    <div className="flex items-center justify-center h-full bg-black/30 rounded-2xl">
                      <div className="text-center text-white p-6">
                        <div className="w-16 h-16 mx-auto mb-4 bg-orange-500/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M8 5v10l7-5z" />
                          </svg>
                        </div>
                        <Logo size="medium" className="text-white" />
                        <p className="text-sm opacity-90">Community Marketplace</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-orange-500/30 rounded-full animate-bounce"></div>
                <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-blue-500/20 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="py-8 sm:py-12" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FilterButtons onFilterChange={handleFilterChange} activeFilter={activeFilter} />
        </div>
      </div>

      {/* Promoted Cards Section */}
      <div className="py-12 sm:py-16" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
              Featured {activeFilter === 'all' ? '' : activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {getFilteredCards()}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 sm:py-20" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
              Trusted by Communities Across{' '}
              <span style={{ color: '#FF5E14' }}>Sri Lanka</span>
            </h2>
            <p className="text-lg sm:text-xl max-w-3xl mx-auto" style={{ color: theme === 'dark' ? '#B3B5BC' : '#B3B5BC' }}>
              From Colombo to Kandy, thousands of neighbors are already helping each other every day
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {[
              { icon: '👥', number: '5,000+', label: 'Active Users', desc: 'Verified community members', color: '#FF5E14' },
              { icon: '🔧', number: '1,000+', label: 'Tools Available', desc: 'Ready to rent anytime', color: '#FF5E14' },
              { icon: '🏆', number: '500+', label: 'Tasks Completed', desc: 'Successfully finished projects', color: '#001554' }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="text-center p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group relative overflow-hidden"
                style={{ backgroundColor: theme === 'dark' ? '#0C0F16' : '#F2F3F5' }}
              >
                <div className="absolute top-0 left-0 w-full h-1 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" style={{ backgroundColor: stat.color }}></div>
                <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
                <div className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-3 transform group-hover:scale-110 transition-transform duration-300" style={{ color: stat.color }}>{stat.number}</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>{stat.label}</h3>
                <p className="text-sm sm:text-base" style={{ color: theme === 'dark' ? '#B3B5BC' : '#B3B5BC' }}>{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 sm:py-20" style={{ backgroundColor: theme === 'dark' ? '#0C0F16' : '#F2F3F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
              How{' '}
              <Logo size="xl" showUnderline={true} className="inline" />
              {' '}Works
            </h2>
            <p className="text-lg sm:text-xl max-w-3xl mx-auto" style={{ color: theme === 'dark' ? '#B3B5BC' : '#B3B5BC' }}>
              Getting help or lending a hand has never been easier. Join thousands building stronger communities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
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
                <div className="relative mb-6 sm:mb-8">
                  <div 
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-bold text-white mx-auto shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
                    style={{ backgroundColor: step.color }}
                  >
                    {step.step}
                  </div>
                  <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transform group-hover:scale-125 transition-all duration-300" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                    <span className="text-lg sm:text-xl">{step.icon}</span>
                  </div>
                </div>
                
                <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl transition-all duration-300 group-hover:shadow-xl" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 group-hover:scale-105 transition-transform duration-300" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>{step.title}</h3>
                  <p className="text-sm sm:text-base leading-relaxed" style={{ color: theme === 'dark' ? '#B3B5BC' : '#B3B5BC' }}>{step.desc}</p>
                </div>
                
                {index < 2 && (
                  <div className="hidden sm:block absolute top-8 sm:top-10 left-1/2 w-full h-1 transform translate-x-8 z-10">
                    <div 
                      className="w-16 sm:w-20 h-1 rounded-full relative overflow-hidden"
                      style={{ backgroundColor: theme === 'dark' ? '#333333' : '#F2F3F5' }}
                    >
                      <div 
                        className="absolute inset-0 rounded-full transform origin-left group-hover:scale-x-100 transition-transform duration-1000"
                        style={{ backgroundColor: '#FF5E14', transform: 'scaleX(0.7)' }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 sm:py-20 relative overflow-hidden" style={{ backgroundColor: '#001554' }}>
        <div className="absolute inset-0 opacity-20" style={{ background: 'linear-gradient(135deg, rgba(0, 21, 84, 0.1) 0%, rgba(0, 21, 84, 0.3) 100%)' }}></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-5 sm:top-10 left-5 sm:left-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full" style={{ backgroundColor: '#FF5E14', opacity: 0.1 }}></div>
          <div className="absolute top-16 sm:top-32 right-10 sm:right-20 w-12 h-12 sm:w-16 sm:h-16 rounded-full" style={{ backgroundColor: '#FF5E14', opacity: 0.1 }}></div>
          <div className="absolute bottom-10 sm:bottom-20 left-16 sm:left-32 w-8 h-8 sm:w-12 sm:h-12 rounded-full" style={{ backgroundColor: '#FF5E14', opacity: 0.1 }}></div>
          <div className="absolute bottom-5 sm:bottom-10 right-5 sm:right-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full" style={{ backgroundColor: '#FF5E14', opacity: 0.1 }}></div>
        </div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full mb-6 sm:mb-8 shadow-lg" style={{ backgroundColor: 'rgba(255, 94, 20, 0.1)', border: '1px solid #FF5E14' }}>
            <span className="text-xs sm:text-sm font-semibold" style={{ color: '#FF5E14' }}>🚀 Join the Movement</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight" style={{ color: '#FFFFFF' }}>
            Ready to Transform Your{' '}
            <span 
              className="relative inline-block"
              style={{ color: '#FF5E14' }}
            >
              Community?
              <svg className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-3 sm:h-4" viewBox="0 0 100 12" style={{ fill: '#FF5E14', opacity: 0.5 }}>
                <path d="M0 10 Q 50 0 100 10 L 100 12 L 0 12 Z" />
              </svg>
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            Join thousands of Sri Lankans building stronger, more connected neighborhoods. 
            Start earning, saving, and helping today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-8 sm:mb-12">
            <Link href="/SignUp">
              <Button 
                className="w-full sm:w-auto text-base sm:text-lg font-bold px-8 sm:px-10 py-4 sm:py-5 rounded-xl transition-all duration-300 hover:scale-105 shadow-2xl border-0 relative overflow-hidden group"
                style={{ backgroundColor: '#FF5E14', color: '#FFFFFF' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FF5D13'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FF5E14'}
              >
                <span className="relative z-10">Join Now - It&apos;s Free</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700"></div>
              </Button>
            </Link>
            <Link href="/About">
              <Button 
                className="w-full sm:w-auto text-base sm:text-lg font-bold px-8 sm:px-10 py-4 sm:py-5 rounded-xl transition-all duration-300 hover:scale-105 shadow-2xl border-2 relative overflow-hidden group"
                style={{ 
                  backgroundColor: 'transparent',
                  color: '#FFFFFF',
                  borderColor: '#FFFFFF'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.color = '#001554';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
              >
                <span className="relative z-10">Learn More</span>
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-xs sm:text-sm font-medium" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FF5E14' }}></div>
              <span>No Hidden Fees</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FF5E14' }}></div>
              <span>Verified Members</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FF5E14' }}></div>
              <span>Secure Payments</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FF5E14' }}></div>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
