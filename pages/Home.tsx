import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
// import TaskCard from '../src/components/TaskCard'; // Will be used when users create tasks
// import ToolCard from '../src/components/ToolCard'; // Will be used when users create tools
import FilterButtons from '../src/components/FilterButtons';
import Logo from '../src/components/Logo';
import ToolsTasksChatAgent from '../src/components/ToolsTasksChatAgent';
// import BottomBannerAd from '../src/components/BottomBannerAd';
// import SideAds from '../src/components/SideAds';
import { Button } from '../src/components/ui/button';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { auth } from '../src/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'tasks' | 'tools'>('all');
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setMounted(true);
    
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  if (!mounted) {
    return null;
  }

  const handleFilterChange = (filter: 'all' | 'tasks' | 'tools') => {
    setActiveFilter(filter);
  };

  // Empty arrays - will be populated when users create tasks/tools
  const taskCards: JSX.Element[] = [];
  
  const toolCards: JSX.Element[] = [];

  const getFilteredCards = () => {
    if (activeFilter === 'tasks') return taskCards;
    if (activeFilter === 'tools') return toolCards;
    return [...taskCards, ...toolCards];
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F2F3F5' }}>
      <Navigation />
      {/* <SideAds /> */}
      
      {/* Hero Section */}
      <div className="py-8 sm:py-12 md:py-16 lg:py-20" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F2F3F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center">
            <div className="text-center lg:text-left order-2 lg:order-1">
              <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6 shadow-lg" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
                <span className="text-xs sm:text-sm font-semibold" style={{ color: '#FF5E14' }}>🎉 New in Sri Lanka</span>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 leading-tight" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                Need a Hand or a Hammer?
              </h1>
              <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-3 sm:mb-4" style={{ color: '#FF5E14' }}>
                We&apos;ve Got Both!
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 leading-relaxed max-w-xl mx-auto lg:mx-0 px-2 sm:px-0" style={{ color: theme === 'dark' ? '#CCCCCC' : '#B3B5BC' }}>
                Sri Lanka&apos;s first community marketplace where neighbors help neighbors. 
                Get quick tasks done or rent the tools you need from people nearby.
              </p>
              <div className="flex justify-center lg:justify-start mb-3 sm:mb-4 md:mb-6">
                <Link href="/SignUp">
                  <Button 
                    className="w-full sm:w-auto text-white px-5 sm:px-6 md:px-7 lg:px-8 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base md:text-lg font-bold rounded-md sm:rounded-lg md:rounded-xl transition-all duration-500 hover:scale-105 sm:hover:scale-110 shadow-2xl border-0 relative overflow-hidden group"
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
                    <span className="relative z-10 flex items-center justify-center gap-1 sm:gap-2 font-bold tracking-wide">
                      Get Started Today
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
                    <div className="absolute inset-0 rounded-lg sm:rounded-xl md:rounded-2xl bg-gradient-to-r from-transparent via-yellow-200 to-transparent opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500"></div>
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 sm:gap-10 text-base sm:text-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FF5E14' }}></div>
                  <span style={{ color: theme === 'dark' ? '#B3B5BC' : '#B3B5BC' }}>Trusted Community Platform</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FF5E14' }}></div>
                  <span style={{ color: theme === 'dark' ? '#B3B5BC' : '#B3B5BC' }}>Safe & Verified Users</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mt-6 sm:mt-8 lg:mt-10 xl:mt-12">
                {/* Enhanced Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-200 via-blue-200 to-purple-200 rounded-2xl sm:rounded-3xl filter blur-2xl sm:blur-3xl opacity-30 sm:opacity-40 animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-orange-300/20 to-blue-300/20 rounded-2xl sm:rounded-3xl animate-spin-slow"></div>
                
                {/* Mechanical Tool Animations - Responsive Positioning */}
                {/* Top-Left */}
                <div className="absolute -top-3 -left-6 sm:-top-6 sm:-left-10 md:-top-8 md:-left-12 z-20 animate-float-slow group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl flex items-center justify-center transform hover:scale-125 transition-all duration-500 cursor-pointer hover:shadow-orange-500/50 group-hover:rotate-12">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white animate-gear-rotate group-hover:animate-drill-spin" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z"/>
                    </svg>
                  </div>
                  <div className="absolute -inset-1 sm:-inset-2 bg-orange-400/20 rounded-xl sm:rounded-2xl blur-sm group-hover:bg-orange-400/40 transition-all duration-500"></div>
                </div>

                {/* Mid-Left */}
                <div className="absolute top-8 -left-4 sm:top-14 sm:-left-12 md:top-16 md:-left-14 z-20 animate-float-medium group">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg sm:rounded-xl shadow-lg sm:shadow-2xl flex items-center justify-center transform hover:scale-125 transition-all duration-500 cursor-pointer hover:shadow-blue-500/50 group-hover:-rotate-12">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white animate-wrench-swing group-hover:animate-tool-vibrate" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.7,19L13.6,9.9C14.5,7.6 14,4.9 12.1,3C10.1,1 7.1,0.6 4.7,1.7L9,6L6,9L1.6,4.7C0.4,7.1 0.9,10.1 2.9,12.1C4.8,14 7.5,14.5 9.8,13.6L18.9,22.7C19.3,23.1 19.9,23.1 20.3,22.7L22.6,20.4C23.1,20 23.1,19.3 22.7,19Z"/>
                    </svg>
                  </div>
                  <div className="absolute -inset-1 sm:-inset-2 bg-orange-400/20 rounded-lg sm:rounded-xl blur-sm group-hover:bg-orange-400/40 transition-all duration-500"></div>
                </div>

                {/* Bottom-Left */}
                <div className="absolute bottom-8 -left-4 sm:bottom-16 sm:-left-8 md:bottom-18 md:-left-10 z-20 animate-float-fast group">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-lg sm:shadow-2xl flex items-center justify-center transform hover:scale-125 transition-all duration-500 cursor-pointer hover:shadow-green-500/50 group-hover:rotate-45">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white animate-drill-spin group-hover:animate-tool-vibrate" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.73,13.36L15.24,14.46L16.84,13.73L16.33,12.63L14.73,13.36M12.35,11.85L10.75,12.58L11.26,13.68L12.86,12.95L12.35,11.85M8.39,16.78L13.68,14.5L11.56,9.5L6.27,11.78L8.39,16.78M15.84,8.21L20.5,6.5L19.84,4.94L15.18,6.65L15.84,8.21M4.27,5.44L8.93,3.73L8.27,2.17L3.61,3.88L4.27,5.44M16.5,10.5C17.88,9.96 18.59,8.46 18.05,7.08C17.51,5.7 16,5 14.62,5.54C13.24,6.08 12.54,7.58 13.08,8.96C13.62,10.34 15.12,11.04 16.5,10.5Z"/>
                    </svg>
                  </div>
                  <div className="absolute -inset-1 sm:-inset-2 bg-green-400/20 rounded-full blur-sm group-hover:bg-green-400/40 transition-all duration-500"></div>
                </div>

                {/* Top-Right */}
                <div className="absolute -top-4 -right-6 sm:-top-10 sm:-right-12 md:-top-12 md:-right-14 z-20 animate-float-medium group">
                  <div className="w-9 h-9 sm:w-11 sm:h-11 md:w-13 md:h-13 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl flex items-center justify-center transform hover:scale-125 transition-all duration-500 cursor-pointer hover:shadow-purple-500/50 group-hover:-rotate-45">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 text-white animate-gear-rotate group-hover:animate-tool-vibrate" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9,3V5.5L10.5,7L9,8.5V11H7V8.5L5.5,7L7,5.5V3H9M9,1H7A2,2 0 0,0 5,3V5.5L3.5,7L5,8.5V11A2,2 0 0,0 7,13H9A2,2 0 0,0 11,11V8.5L12.5,7L11,5.5V3A2,2 0 0,0 9,1Z M17,11V13.5L15.5,15L17,16.5V19H19V16.5L20.5,15L19,13.5V11H17M19,9H17A2,2 0 0,0 15,11V13.5L13.5,15L15,16.5V19A2,2 0 0,0 17,21H19A2,2 0 0,0 21,19V16.5L22.5,15L21,13.5V11A2,2 0 0,0 19,9Z"/>
                    </svg>
                  </div>
                  <div className="absolute -inset-1 sm:-inset-2 bg-purple-400/20 rounded-xl sm:rounded-2xl blur-sm group-hover:bg-purple-400/40 transition-all duration-500"></div>
                </div>

                {/* Mid-Right */}
                <div className="absolute top-10 -right-4 sm:top-16 sm:-right-10 md:top-18 md:-right-12 z-20 animate-float-slow group">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-11 md:h-11 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg sm:rounded-xl shadow-lg sm:shadow-2xl flex items-center justify-center transform hover:scale-125 transition-all duration-500 cursor-pointer hover:shadow-red-500/50 group-hover:rotate-90">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white animate-hammer-bounce group-hover:animate-tool-vibrate" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2,12A2,2 0 0,0 4,14H6V20A2,2 0 0,0 8,22H16A2,2 0 0,0 18,20V14H20A2,2 0 0,0 22,12V10A2,2 0 0,0 20,8V7A3,3 0 0,0 17,4H7A3,3 0 0,0 4,7V8A2,2 0 0,0 2,10V12M6,7A1,1 0 0,1 7,6H17A1,1 0 0,1 18,7V8H6V7M4,10H20V12H18V20H16V12H8V20H6V12H4V10Z"/>
                    </svg>
                  </div>
                  <div className="absolute -inset-1 sm:-inset-2 bg-red-400/20 rounded-lg sm:rounded-xl blur-sm group-hover:bg-red-400/40 transition-all duration-500"></div>
                </div>

                {/* Bottom-Right */}
                <div className="absolute bottom-6 -right-4 sm:bottom-10 sm:-right-10 md:bottom-12 md:-right-12 z-20 animate-float-fast group">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl flex items-center justify-center transform hover:scale-125 transition-all duration-500 cursor-pointer hover:shadow-yellow-500/50 group-hover:-rotate-12">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white animate-drill-spin group-hover:animate-gear-rotate" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.78,17.5L18.36,16.09C19.45,14.96 20.09,13.46 20.09,11.81C20.09,8.26 17.34,5.36 13.91,5.07V3H10.09V5.07C6.66,5.36 3.91,8.26 3.91,11.81C3.91,13.46 4.55,14.96 5.64,16.09L4.22,17.5L5.64,18.91L7.05,17.5C8.18,18.59 9.68,19.23 11.33,19.23H12.67C14.32,19.23 15.82,18.59 16.95,17.5L18.36,18.91L19.78,17.5M12,17.73C8.97,17.73 6.5,15.26 6.5,12.23S8.97,6.73 12,6.73S17.5,9.2 17.5,12.23S15.03,17.73 12,17.73M12,8.23A4,4 0 0,0 8,12.23A4,4 0 0,0 12,16.23A4,4 0 0,0 16,12.23A4,4 0 0,0 12,8.23Z"/>
                    </svg>
                  </div>
                  <div className="absolute -inset-1 sm:-inset-2 bg-yellow-400/20 rounded-xl sm:rounded-2xl blur-sm group-hover:bg-yellow-400/40 transition-all duration-500"></div>
                </div>

                {/* Top Center Elements */}
                <div className="absolute -top-2 left-1/4 sm:-top-4 sm:left-1/3 z-20 animate-float-medium group">
                  <div className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full shadow-lg sm:shadow-2xl flex items-center justify-center transform hover:scale-125 transition-all duration-500 cursor-pointer hover:shadow-teal-500/50 group-hover:rotate-180">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white animate-gear-rotate group-hover:animate-tool-vibrate" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8A4,4 0 0,1 16,12M18.7,12.4C18.8,12.3 18.9,12.1 18.9,12C18.9,11.9 18.8,11.7 18.7,11.6L17.1,10L18.7,8.4C18.8,8.3 18.9,8.1 18.9,8C18.9,7.9 18.8,7.7 18.7,7.6L17.1,6L15.5,7.6C15.4,7.7 15.2,7.8 15.1,7.8C15,7.8 14.8,7.7 14.7,7.6L13.1,6L14.7,4.4C14.8,4.3 14.9,4.1 14.9,4C14.9,3.9 14.8,3.7 14.7,3.6L13.1,2L11.5,3.6C11.4,3.7 11.2,3.8 11.1,3.8C11,3.8 10.8,3.7 10.7,3.6L9.1,2L7.5,3.6C7.4,3.7 7.2,3.8 7.1,3.8C7,3.8 6.8,3.7 6.7,3.6L5.1,2L3.5,3.6C3.4,3.7 3.2,3.8 3.1,3.8C3,3.8 2.8,3.7 2.7,3.6L1.1,2L2.7,0.4C2.8,0.3 2.9,0.1 2.9,0C2.9,-0.1 2.8,-0.3 2.7,-0.4L1.1,-2L-0.5,-0.4C-0.6,-0.3 -0.8,-0.2 -0.9,-0.2C-1,-0.2 -1.2,-0.3 -1.3,-0.4L-2.9,-2L-1.3,-3.6C-1.2,-3.7 -1.1,-3.9 -1.1,-4C-1.1,-4.1 -1.2,-4.3 -1.3,-4.4L-2.9,-6H24V6C24,9.3 21.3,12 18,12H18.7C18.8,12.1 18.9,12.2 18.9,12.4H18.7Z"/>
                    </svg>
                  </div>
                  <div className="absolute -inset-1 sm:-inset-2 bg-teal-400/20 rounded-full blur-sm group-hover:bg-teal-400/40 transition-all duration-500"></div>
                </div>

                <div className="absolute -top-3 right-1/4 sm:-top-6 sm:right-1/4 z-20 animate-float-slow group">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg sm:rounded-xl shadow-lg sm:shadow-2xl flex items-center justify-center transform hover:scale-125 transition-all duration-500 cursor-pointer hover:shadow-indigo-500/50 group-hover:rotate-45">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white animate-drill-spin group-hover:animate-gear-rotate" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,6H13V8H11V6M11,10H13V18H11V10Z"/>
                    </svg>
                  </div>
                  <div className="absolute -inset-1 sm:-inset-2 bg-indigo-400/20 rounded-lg sm:rounded-xl blur-sm group-hover:bg-indigo-400/40 transition-all duration-500"></div>
                </div>

                {/* Professional Video Container - Optimized Size */}
                <div className="relative z-10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl border border-white/20 sm:border-2 backdrop-blur-lg">
                  <style jsx>{`
                    @media (min-width: 640px) {
                      .responsive-video-container {
                        height: 280px;
                      }
                    }
                    @media (min-width: 768px) {
                      .responsive-video-container {
                        height: 300px;
                      }
                    }
                    @media (min-width: 1024px) {
                      .responsive-video-container {
                        height: 320px;
                      }
                    }
                    @media (min-width: 1280px) {
                      .responsive-video-container {
                        height: 340px;
                      }
                    }
                  `}</style>
                  <div className="responsive-video-container relative w-full" style={{ height: '240px' }}>
                    <video
                      className="absolute inset-0 w-full h-full rounded-xl sm:rounded-2xl object-cover"
                      style={{ objectPosition: 'center 30%', objectFit: 'cover' }}
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
                    className="hidden relative w-full rounded-2xl sm:rounded-3xl bg-cover bg-center bg-no-repeat"
                    style={{ 
                      backgroundImage: `url('/hero-video-poster.png')`,
                      backgroundPosition: 'center 20%'
                    }}
                  >
                    <div className="h-full bg-gradient-to-br from-black/40 via-orange-900/20 to-blue-900/20 rounded-2xl sm:rounded-3xl backdrop-blur-sm flex items-center justify-center">
                      <div className="text-center text-white p-4 sm:p-6 md:p-8">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-3 sm:mb-4 md:mb-6 bg-gradient-to-br from-orange-500/90 to-blue-500/90 rounded-full flex items-center justify-center backdrop-blur-sm shadow-2xl animate-pulse">
                          <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M8 5v10l7-5z" />
                          </svg>
                        </div>
                        <Logo size="large" className="text-white mb-2" />
                        <p className="text-sm sm:text-base md:text-lg opacity-90 font-medium">Community Marketplace</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Interactive Overlay Effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-blue-500/10 rounded-2xl sm:rounded-3xl pointer-events-none"></div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-400/20 to-blue-400/20 rounded-2xl sm:rounded-3xl blur-sm animate-pulse"></div>
                </div>

                {/* Bottom floating elements - Responsive */}
                <div className="absolute -bottom-4 left-1/4 sm:-bottom-8 sm:left-1/4 z-20 animate-float-fast group">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg sm:rounded-xl shadow-lg sm:shadow-2xl flex items-center justify-center transform hover:scale-125 transition-all duration-500 cursor-pointer hover:shadow-rose-500/50 group-hover:-rotate-45">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white animate-wrench-swing group-hover:animate-hammer-bounce" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,16A3,3 0 0,1 9,13C9,11.88 9.61,10.9 10.5,10.39L20.21,5.77C20.53,5.59 20.78,5.31 20.92,4.97L21.92,2.27C22.23,1.53 21.73,0.74 20.94,0.74C20.84,0.74 20.73,0.75 20.63,0.79L18.15,1.7C17.8,1.83 17.42,1.83 17.07,1.7L14.59,0.79C14.5,0.75 14.39,0.74 14.29,0.74C13.5,0.74 13,1.53 13.31,2.27L14.31,4.97C14.45,5.31 14.7,5.59 15.03,5.77L24.74,10.39C25.63,10.9 26.24,11.88 26.24,13A3,3 0 0,1 23.24,16H12M2,20C2,21.11 2.9,22 4,22H6V20H4V18H6V16H4C2.9,16 2,16.9 2,18V20Z"/>
                    </svg>
                  </div>
                  <div className="absolute -inset-1 sm:-inset-2 bg-rose-400/20 rounded-lg sm:rounded-xl blur-sm group-hover:bg-rose-400/40 transition-all duration-500"></div>
                </div>

                <div className="absolute -bottom-2 right-1/3 sm:-bottom-4 sm:right-1/3 z-20 animate-float-medium group">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full shadow-lg sm:shadow-2xl flex items-center justify-center transform hover:scale-125 transition-all duration-500 cursor-pointer hover:shadow-cyan-500/50 group-hover:rotate-180">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white animate-gear-rotate group-hover:animate-drill-spin" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17,7H22V17H17V19A1,1 0 0,0 18,20H20V22H16A2,2 0 0,1 14,20H10A2,2 0 0,1 8,22H4V20H6A1,1 0 0,0 7,19V5A1,1 0 0,0 6,4H4V2H8A2,2 0 0,1 10,4H14A2,2 0 0,1 16,2H20V4H18A1,1 0 0,0 17,5V7M15,7V5H9V19H15V17H9V7H15Z"/>
                    </svg>
                  </div>
                  <div className="absolute -inset-1 sm:-inset-2 bg-cyan-400/20 rounded-full blur-sm group-hover:bg-cyan-400/40 transition-all duration-500"></div>
                </div>

                <div className="absolute top-6 left-1/4 sm:top-8 sm:left-1/4 z-20 animate-float-slow group">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg sm:rounded-xl shadow-lg sm:shadow-2xl flex items-center justify-center transform hover:scale-125 transition-all duration-500 cursor-pointer hover:shadow-emerald-500/50 group-hover:-rotate-90">
                    <svg className="w-3 h-3 sm:w-3 sm:h-3 md:w-4 md:h-4 text-white animate-tool-vibrate group-hover:animate-wrench-swing" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16.5,16.5L19,19L20.5,17.5L18,15L16.5,16.5M14.5,10L16.5,8L15,6.5L13,8.5L14.5,10M7.5,10.5L9.5,8.5L8,7L6,9L7.5,10.5M5.5,13L7.5,15L6,16.5L4,14.5L5.5,13M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10Z"/>
                    </svg>
                  </div>
                  <div className="absolute -inset-1 sm:-inset-2 bg-emerald-400/20 rounded-lg sm:rounded-xl blur-sm group-hover:bg-emerald-400/40 transition-all duration-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="py-4 sm:py-5 md:py-7" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-7 lg:px-9">
          <FilterButtons onFilterChange={handleFilterChange} activeFilter={activeFilter} />
        </div>
      </div>

      {/* Promoted Cards Section */}
      <div className="py-5 sm:py-7 md:py-9" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-7 lg:px-9">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7 lg:gap-9">
            {getFilteredCards()}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-14 sm:py-18 md:py-22 relative overflow-hidden" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#FFFFFF' }}>
        {/* Interactive Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 rounded-full animate-pulse" style={{ backgroundColor: '#FF5E14', animationDelay: '0s', animationDuration: '3s' }}></div>
          <div className="absolute top-20 right-20 w-16 h-16 rounded-full animate-pulse" style={{ backgroundColor: '#1a1a1a', animationDelay: '1s', animationDuration: '4s' }}></div>
          <div className="absolute bottom-20 left-20 w-12 h-12 rounded-full animate-pulse" style={{ backgroundColor: '#FF5E14', animationDelay: '2s', animationDuration: '3.5s' }}></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full animate-pulse" style={{ backgroundColor: '#1a1a1a', animationDelay: '0.5s', animationDuration: '4.5s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-8 h-8 rounded-full animate-pulse" style={{ backgroundColor: '#FF5E14', animationDelay: '1.5s', animationDuration: '2.5s' }}></div>
          <div className="absolute top-1/3 right-1/3 w-14 h-14 rounded-full animate-pulse" style={{ backgroundColor: '#1a1a1a', animationDelay: '2.5s', animationDuration: '3.8s' }}></div>
        </div>

        <div className="max-w-6xl mx-auto px-5 sm:px-7 lg:px-9 relative z-10">
          <div className="text-center mb-10 sm:mb-12 md:mb-14">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
              Building Communities Across{' '}
              <span style={{ color: '#FF5E14' }}>Sri Lanka</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-4xl mx-auto font-medium" style={{ color: theme === 'dark' ? '#E5E7EB' : '#4B5563' }}>
              Connecting neighbors, sharing resources, and creating opportunities in every district!
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-7 sm:gap-9">
            {[
              { icon: '🤝', number: '250+', label: 'Community Members', color: '#FF5E14' },
              { icon: '⚡', number: '150+', label: 'Active Listings', color: '#FF5E14' },
              { icon: '😊', number: '95%', label: 'Satisfaction Rate', color: '#FF5E14' }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="text-center p-6 sm:p-8 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: theme === 'dark' ? '#374151' : '#F3F4F6', border: theme === 'dark' ? '1px solid #4B5563' : '1px solid #D1D5DB' }}
              >
                {/* Icon */}
                <div className="text-3xl sm:text-4xl mb-4 sm:mb-5">
                  {stat.icon}
                </div>
                
                {/* Number */}
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3" style={{ color: stat.color }}>
                  {stat.number}
                </div>
                
                {/* Label */}
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold" style={{ color: theme === 'dark' ? '#F9FAFB' : '#1F2937' }}>
                  {stat.label}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="pt-4 pb-8 sm:pt-6 sm:pb-10 md:pt-6 md:pb-12 relative overflow-hidden" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F2F3F5' }}>
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-40 h-40 rounded-full" style={{ backgroundColor: '#FF5E14' }}></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 rounded-full" style={{ backgroundColor: theme === 'dark' ? '#FFFFFF' : '#001554' }}></div>
        </div>

        <div className="max-w-6xl mx-auto px-5 sm:px-7 lg:px-9 relative z-10">
          <div className="text-center mb-10 sm:mb-12 md:mb-14">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
              How{' '}
              <Logo size="xl" showUnderline={true} className="inline" />
              {' '}Works
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-5xl mx-auto font-medium" style={{ color: theme === 'dark' ? '#E5E7EB' : '#4B5563' }}>
              Join thousands building stronger neighborhoods. Start earning, saving, and helping today.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
            {[
              { 
                step: '1', 
                icon: '👤', 
                title: 'Login/Create Account', 
                desc: 'Sign up or log in to your ToolNTask account to get started with our community marketplace',
                color: '#FF5E14',
                delay: '0ms'
              },
              { 
                step: '2', 
                icon: '📋', 
                title: 'Browse or Post', 
                desc: 'Browse available tools and services or post your own tasks and tools for the community',
                color: '#FF5E14',
                delay: '150ms'
              },
              { 
                step: '3', 
                icon: '🤝', 
                title: 'Connect & Agree', 
                desc: 'Chat with providers, negotiate terms, and agree on fair pricing that works for everyone',
                color: '#FF5E14',
                delay: '300ms'
              },
              { 
                step: '4', 
                icon: '💰', 
                title: 'Get Paid/Pay & Review', 
                desc: 'Complete secure payments and build trust through honest reviews for future connections',
                color: theme === 'dark' ? '#FFFFFF' : '#001554',
                delay: '450ms'
              }
            ].map((step, index) => (
              <div 
                key={index} 
                className="text-center relative group"
                style={{ animationDelay: step.delay }}
              >
                {/* Medium Step Card */}
                <div 
                  className="relative p-6 sm:p-7 lg:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 group cursor-pointer"
                  style={{ backgroundColor: theme === 'dark' ? '#1f2937' : '#FFFFFF', border: theme === 'dark' ? '1px solid #374151' : '1px solid #E5E7EB' }}
                >
                  {/* Step Number */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base mx-auto mb-4 sm:mb-5 shadow-lg" style={{ backgroundColor: step.color }}>
                    {step.step}
                  </div>
                  
                  {/* Icon */}
                  <div className="text-3xl sm:text-4xl mb-4 sm:mb-5 transform group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold mb-3 sm:mb-4 transform group-hover:scale-105 transition-transform duration-300 leading-tight" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                    {step.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-xs sm:text-sm lg:text-base leading-relaxed font-medium" style={{ color: theme === 'dark' ? '#E5E7EB' : '#4B5563' }}>
                    {step.desc}
                  </p>
                  
                  {/* Enhanced hover glow */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ background: `radial-gradient(circle at center, ${step.color}, transparent 70%)` }}></div>
                </div>
                
                {/* Medium Connection Arrow */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-12 lg:top-14 -right-4 lg:-right-5 z-20">
                    <svg className="w-8 h-6 lg:w-10 lg:h-8 transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 32 24" style={{ color: step.color, opacity: 0.6 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12h20m0 0l-4-4m4 4l-4 4" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Clean & Concise CTA Section - Only show for non-logged in users */}
      {!user && (
        <div className="py-16 sm:py-20 md:py-24 relative overflow-hidden" style={{ backgroundColor: theme === 'dark' ? '#001554' : '#001554' }}>
          {/* Simple Background */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #001554 0%, #001a6b 100%)' }}></div>
          <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at center, rgba(255, 94, 20, 0.3) 0%, transparent 70%)' }}></div>
          
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 text-center relative z-10">
            {/* Main Headline */}
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 leading-tight" style={{ color: '#FFFFFF' }}>
              Transform Your{' '}
              <span style={{ color: '#FF5E14' }}>Community</span>
              <div className="mt-4">
                <Logo size="large" className="inline-block" />
              </div>
            </h2>
            
            {/* Short Description */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto mb-10 sm:mb-12 font-medium" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              Join thousands building stronger neighborhoods. Start earning, saving, and helping today.
            </p>
            
            {/* Clean Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Link href="/SignUp">
                <Button 
                  className="w-full sm:w-auto text-sm sm:text-base font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-xl border-0 relative overflow-hidden group"
                  style={{ 
                    backgroundColor: '#FF5E14',
                    color: '#FFFFFF',
                    boxShadow: '0 10px 25px rgba(255, 94, 20, 0.4)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 15px 35px rgba(255, 94, 20, 0.6)';
                    e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(255, 94, 20, 0.4)';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Join Free
                    <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </Button>
              </Link>
              
              <Link href="/About">
                <Button 
                  className="w-full sm:w-auto text-sm sm:text-base font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-300 hover:scale-105 border-2"
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
            
            {/* Compact Trust Indicators */}
            <div className="flex justify-center gap-8 sm:gap-10 text-base sm:text-lg" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FF5E14' }}></div>
                <span className="font-medium">No Fees</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FF5E14' }}></div>
                <span className="font-medium">Verified</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FF5E14' }}></div>
                <span className="font-medium">Secure</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToolsTasksChatAgent pageType="home" />
      <Footer showNewsletter={true} />
      {/* <BottomBannerAd /> */}
    </div>
  );
}
