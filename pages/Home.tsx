
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
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 leading-tight" style={{ color: '#001554' }}>
                Need a Hand or a Hammer?
              </h1>
              <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-4 sm:mb-6" style={{ color: '#FF5E14' }}>
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
              <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg mt-8 lg:mt-12">
                {/* Enhanced Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-200 via-blue-200 to-purple-200 rounded-3xl filter blur-3xl opacity-40 animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-orange-300/20 to-blue-300/20 rounded-3xl animate-spin-slow"></div>
                
                {/* Mechanical Tool Animations - Left Side */}
                <div className="absolute -top-6 -left-10 z-20 animate-float-slow group">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl shadow-2xl flex items-center justify-center transform hover:scale-125 transition-all duration-500 cursor-pointer hover:shadow-orange-500/50 group-hover:rotate-12">
                    <svg className="w-7 h-7 text-white animate-gear-rotate group-hover:animate-drill-spin" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z"/>
                    </svg>
                  </div>
                  <div className="absolute -inset-2 bg-orange-400/20 rounded-2xl blur-md group-hover:bg-orange-400/40 transition-all duration-500"></div>
                </div>

                <div className="absolute top-14 -left-12 z-20 animate-float-medium group">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-2xl flex items-center justify-center transform hover:scale-125 transition-all duration-500 cursor-pointer hover:shadow-blue-500/50 group-hover:-rotate-12">
                    <svg className="w-6 h-6 text-white animate-wrench-swing group-hover:animate-tool-vibrate" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.7,19L13.6,9.9C14.5,7.6 14,4.9 12.1,3C10.1,1 7.1,0.6 4.7,1.7L9,6L6,9L1.6,4.7C0.4,7.1 0.9,10.1 2.9,12.1C4.8,14 7.5,14.5 9.8,13.6L18.9,22.7C19.3,23.1 19.9,23.1 20.3,22.7L22.6,20.4C23.1,20 23.1,19.3 22.7,19Z"/>
                    </svg>
                  </div>
                  <div className="absolute -inset-2 bg-blue-400/20 rounded-xl blur-md group-hover:bg-blue-400/40 transition-all duration-500"></div>
                </div>

                <div className="absolute bottom-16 -left-8 z-20 animate-float-fast group">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-2xl flex items-center justify-center transform hover:scale-125 transition-all duration-500 cursor-pointer hover:shadow-green-500/50 group-hover:rotate-45">
                    <svg className="w-5 h-5 text-white animate-drill-spin group-hover:animate-tool-vibrate" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.73,13.36L15.24,14.46L16.84,13.73L16.33,12.63L14.73,13.36M12.35,11.85L10.75,12.58L11.26,13.68L12.86,12.95L12.35,11.85M8.39,16.78L13.68,14.5L11.56,9.5L6.27,11.78L8.39,16.78M15.84,8.21L20.5,6.5L19.84,4.94L15.18,6.65L15.84,8.21M4.27,5.44L8.93,3.73L8.27,2.17L3.61,3.88L4.27,5.44M16.5,10.5C17.88,9.96 18.59,8.46 18.05,7.08C17.51,5.7 16,5 14.62,5.54C13.24,6.08 12.54,7.58 13.08,8.96C13.62,10.34 15.12,11.04 16.5,10.5Z"/>
                    </svg>
                  </div>
                  <div className="absolute -inset-2 bg-green-400/20 rounded-full blur-md group-hover:bg-green-400/40 transition-all duration-500"></div>
                </div>

                {/* Mechanical Tool Animations - Right Side */}
                <div className="absolute -top-10 -right-12 z-20 animate-float-medium group">
                  <div className="w-13 h-13 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-2xl flex items-center justify-center transform hover:scale-125 transition-all duration-500 cursor-pointer hover:shadow-purple-500/50 group-hover:-rotate-45">
                    <svg className="w-7 h-7 text-white animate-gear-rotate group-hover:animate-tool-vibrate" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9,3V5.5L10.5,7L9,8.5V11H7V8.5L5.5,7L7,5.5V3H9M9,1H7A2,2 0 0,0 5,3V5.5L3.5,7L5,8.5V11A2,2 0 0,0 7,13H9A2,2 0 0,0 11,11V8.5L12.5,7L11,5.5V3A2,2 0 0,0 9,1Z M17,11V13.5L15.5,15L17,16.5V19H19V16.5L20.5,15L19,13.5V11H17M19,9H17A2,2 0 0,0 15,11V13.5L13.5,15L15,16.5V19A2,2 0 0,0 17,21H19A2,2 0 0,0 21,19V16.5L22.5,15L21,13.5V11A2,2 0 0,0 19,9Z"/>
                    </svg>
                  </div>
                  <div className="absolute -inset-2 bg-purple-400/20 rounded-2xl blur-md group-hover:bg-purple-400/40 transition-all duration-500"></div>
                </div>

                <div className="absolute top-16 -right-10 z-20 animate-float-slow group">
                  <div className="w-11 h-11 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl shadow-2xl flex items-center justify-center transform hover:scale-125 transition-all duration-500 cursor-pointer hover:shadow-red-500/50 group-hover:rotate-90">
                    <svg className="w-6 h-6 text-white group-hover:animate-spin" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13,3V9H21V3M13,21H21V11H13M3,21H11V15H3M3,13H11V3H3V13Z"/>
                    </svg>
                  </div>
                  <div className="absolute -inset-2 bg-red-400/20 rounded-xl blur-md group-hover:bg-red-400/40 transition-all duration-500"></div>
                </div>

                <div className="absolute bottom-10 -right-10 z-20 animate-float-fast group">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl shadow-2xl flex items-center justify-center transform hover:scale-125 transition-all duration-500 cursor-pointer hover:shadow-yellow-500/50 group-hover:-rotate-12">
                    <svg className="w-6 h-6 text-white animate-drill-spin group-hover:animate-gear-rotate" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16.84,2.73C16.45,2.73 16.07,2.88 15.77,3.17L13.65,5.28C13.35,5.57 13.35,6.04 13.65,6.33L17.67,10.35C17.96,10.64 18.43,10.64 18.72,10.35L20.84,8.23C21.45,7.62 21.45,6.65 20.84,6.04L17.96,3.17C17.66,2.88 17.24,2.73 16.84,2.73M12.19,6.75L3,15.94V21H7.06L16.25,11.81L12.19,6.75Z"/>
                    </svg>
                  </div>
                  <div className="absolute -inset-2 bg-yellow-400/20 rounded-2xl blur-md group-hover:bg-yellow-400/40 transition-all duration-500"></div>
                </div>

                {/* Top Floating Elements */}
                <div className="absolute -top-4 left-1/3 z-20 animate-float-medium group">
                  <div className="w-11 h-11 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full shadow-2xl flex items-center justify-center transform hover:scale-125 transition-all duration-500 cursor-pointer hover:shadow-teal-500/50 group-hover:rotate-180">
                    <svg className="w-5 h-5 text-white animate-shovel-dig group-hover:animate-tool-vibrate" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M21,9V7L15,13.5C15.53,14.14 16.05,14.78 16.5,15.5H21V17.5H15.5L12,22L8.5,17.5H3V15.5H7.5C7.95,14.78 8.47,14.14 9,13.5L3,7V9H1V7C1,6.45 1.45,6 2,6H7L9,9H15L17,6H22C22.55,6 23,6.45 23,7V9H21Z"/>
                    </svg>
                  </div>
                  <div className="absolute -inset-2 bg-teal-400/20 rounded-full blur-md group-hover:bg-teal-400/40 transition-all duration-500"></div>
                </div>

                <div className="absolute -top-6 right-1/4 z-20 animate-float-slow group">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-2xl flex items-center justify-center transform hover:scale-125 transition-all duration-500 cursor-pointer hover:shadow-indigo-500/50 group-hover:rotate-45">
                    <svg className="w-5 h-5 text-white group-hover:animate-bounce" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,2A7,7 0 0,1 19,9C19,11.38 17.81,13.47 16,14.74V17A1,1 0 0,1 15,18H9A1,1 0 0,1 8,17V14.74C6.19,13.47 5,11.38 5,9A7,7 0 0,1 12,2M9,21V20H15V21A1,1 0 0,1 14,22H10A1,1 0 0,1 9,21M12,4A5,5 0 0,0 7,9C7,11.05 8.23,12.81 10,13.58V16H14V13.58C15.77,12.81 17,11.05 17,9A5,5 0 0,0 12,4Z"/>
                    </svg>
                  </div>
                  <div className="absolute -inset-2 bg-indigo-400/20 rounded-xl blur-md group-hover:bg-indigo-400/40 transition-all duration-500"></div>
                </div>

                {/* Enhanced Video Container - Reduced Size */}
                <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 backdrop-blur-lg">
                  <div className="relative w-full" style={{ height: '320px' }}>
                    <video
                      className="absolute top-0 left-0 w-full h-full rounded-2xl object-cover"
                      style={{ objectPosition: 'center 20%' }}
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
                        const fallback = e.currentTarget.parentElement?.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'block';
                      }}
                    >
                      <source src="/hero-video.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  
                  {/* Enhanced Fallback Image */}
                  <div 
                    className="hidden relative w-full rounded-3xl bg-cover bg-center bg-no-repeat"
                    style={{ 
                      backgroundImage: `url('/hero-video-poster.png')`,
                      height: '320px',
                      backgroundPosition: 'center 20%'
                    }}
                  >
                    <div className="flex items-center justify-center h-full bg-gradient-to-br from-black/40 via-orange-900/20 to-blue-900/20 rounded-3xl backdrop-blur-sm">
                      <div className="text-center text-white p-8">
                        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-500/90 to-blue-500/90 rounded-full flex items-center justify-center backdrop-blur-sm shadow-2xl animate-pulse">
                          <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M8 5v10l7-5z" />
                          </svg>
                        </div>
                        <Logo size="large" className="text-white mb-2" />
                        <p className="text-lg opacity-90 font-medium">Community Marketplace</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Interactive Overlay Effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-blue-500/10 rounded-3xl pointer-events-none"></div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-400/20 to-blue-400/20 rounded-3xl blur-sm animate-pulse"></div>
                </div>

                {/* Bottom floating elements */}
                <div className="absolute -bottom-8 left-1/4 z-20 animate-float-fast group">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl shadow-2xl flex items-center justify-center transform hover:scale-125 transition-all duration-500 cursor-pointer hover:shadow-rose-500/50 group-hover:-rotate-45">
                    <svg className="w-6 h-6 text-white animate-shovel-dig group-hover:animate-hammer-bounce" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9,1A3,3 0 0,1 12,4V11.5L10.5,10H6.5L7.96,11.46C6.76,12.69 6.76,14.64 7.96,15.85L9.41,17.3L12,14.71L14.59,17.3L16.04,15.85C17.24,14.64 17.24,12.69 16.04,11.46L17.5,10H13.5L12,11.5V4A3,3 0 0,1 15,1A1,1 0 0,1 16,2A1,1 0 0,1 15,3A1,1 0 0,0 14,4A1,1 0 0,0 15,5A3,3 0 0,1 12,8A3,3 0 0,1 9,5A1,1 0 0,0 10,4A1,1 0 0,0 9,3A1,1 0 0,1 8,2A1,1 0 0,1 9,1M9,18.5A1.5,1.5 0 0,1 10.5,20A1.5,1.5 0 0,1 9,21.5A1.5,1.5 0 0,1 7.5,20A1.5,1.5 0 0,1 9,18.5M15,18.5A1.5,1.5 0 0,1 16.5,20A1.5,1.5 0 0,1 15,21.5A1.5,1.5 0 0,1 13.5,20A1.5,1.5 0 0,1 15,18.5Z"/>
                    </svg>
                  </div>
                  <div className="absolute -inset-2 bg-rose-400/20 rounded-xl blur-md group-hover:bg-rose-400/40 transition-all duration-500"></div>
                </div>
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
