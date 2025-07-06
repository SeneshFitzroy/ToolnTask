import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';

export default function About() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [ceoImageError, setCeoImageError] = useState(false);
  const [ctoImageError, setCtoImageError] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme === 'dark' ? '#0C0F16' : '#F2F3F5' }}>
      <Navigation />
      
      {/* Hero Header Section */}
      <div className="py-12 sm:py-16 lg:py-20 relative overflow-hidden" style={{ backgroundColor: theme === 'dark' ? '#0C0F16' : '#F2F3F5' }}>
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 rounded-full animate-pulse" style={{ backgroundColor: '#FF5E14', animationDelay: '0s', animationDuration: '3s' }}></div>
          <div className="absolute top-20 right-20 w-16 h-16 rounded-full animate-pulse" style={{ backgroundColor: '#001554', animationDelay: '1s', animationDuration: '4s' }}></div>
          <div className="absolute bottom-20 left-20 w-12 h-12 rounded-full animate-pulse" style={{ backgroundColor: '#FF5E14', animationDelay: '2s', animationDuration: '3.5s' }}></div>
          <div className="absolute bottom-10 right-10 w-14 h-14 rounded-full animate-pulse" style={{ backgroundColor: '#001554', animationDelay: '3s', animationDuration: '4.5s' }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Badge */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg border-2" 
                 style={{ 
                   backgroundColor: theme === 'dark' ? '#1F1F1F' : '#FFFFFF',
                   borderColor: theme === 'dark' ? 'rgba(255, 94, 20, 0.3)' : 'rgba(255, 94, 20, 0.2)'
                 }}>
              <span className="text-lg sm:text-xl mr-2">🤝</span>
              <span className="text-sm sm:text-base font-bold" style={{ color: '#FF5E14' }}>
                Our Community Story
              </span>
            </div>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-center mb-4 sm:mb-6 leading-tight tracking-tight">
            <span style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
              About{' '}
            </span>
            <span className="relative inline-block">
              <span style={{ color: '#FF5E14', textShadow: '0 2px 8px rgba(255, 94, 20, 0.3)' }}>
                ToolNTask
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"></div>
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-center mb-8 sm:mb-10 max-w-4xl mx-auto leading-relaxed font-medium" 
             style={{ color: theme === 'dark' ? '#B3B5BC' : '#4B5563' }}>
            Connecting communities through shared tasks and tool rentals
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-10">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black mb-1" style={{ color: '#FF5E14' }}>
                5K+
              </div>
              <div className="text-sm sm:text-base font-medium" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                Community Members
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black mb-1" style={{ color: '#001554' }}>
                98%
              </div>
              <div className="text-sm sm:text-base font-medium" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                Satisfaction Rate
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black mb-1" style={{ color: '#FF5E14' }}>
                24/7
              </div>
              <div className="text-sm sm:text-base font-medium" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                Community Support
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="py-8 sm:py-12" style={{ backgroundColor: theme === 'dark' ? '#0C0F16' : '#F2F3F5' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mission Section */}
          <div className="mb-8 sm:mb-12">
            <div className="p-8 sm:p-12 lg:p-16 rounded-2xl sm:rounded-3xl shadow-xl" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 lg:mb-10 text-center" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>Our Mission</h2>
              <div className="max-w-5xl mx-auto">
                <p className="text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 leading-relaxed text-center" style={{ color: theme === 'dark' ? '#B3B5BC' : '#B3B5BC' }}>
                  We believe that every community has untapped potential. Whether it&apos;s someone with 
                  time to spare looking for extra income, or a neighbor who needs a specific tool 
                  for a weekend project, ToolNTask bridges these gaps.
                </p>
                <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-center" style={{ color: theme === 'dark' ? '#B3B5BC' : '#B3B5BC' }}>
                  Our platform empowers people to share resources, build connections, and create 
                  a more collaborative community where everyone benefits.
                </p>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 mb-16 sm:mb-20">
            <div className="p-8 rounded-3xl shadow-xl text-center hover:scale-105 transition-all duration-300" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg" style={{ backgroundColor: '#FF5E14' }}>
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>Trust & Safety</h3>
              <p className="text-lg leading-relaxed" style={{ color: '#B3B5BC' }}>
                Every user is verified, and we maintain high standards for safety and reliability 
                in all transactions.
              </p>
            </div>

            <div className="p-8 rounded-3xl shadow-xl text-center hover:scale-105 transition-all duration-300" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg" style={{ backgroundColor: '#FF5E14' }}>
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>Sustainability</h3>
              <p className="text-lg leading-relaxed" style={{ color: '#B3B5BC' }}>
                By sharing tools and resources, we reduce waste and promote a more sustainable 
                way of living.
              </p>
            </div>

            <div className="p-8 rounded-3xl shadow-xl text-center hover:scale-105 transition-all duration-300" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg" style={{ backgroundColor: '#001554' }}>
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>Community</h3>
              <p className="text-lg leading-relaxed" style={{ color: '#B3B5BC' }}>
                We strengthen local communities by encouraging neighbors to help each other 
                and share resources.
              </p>
            </div>
          </div>

          {/* Team Section */}
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold mb-12 sm:mb-16" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 max-w-4xl mx-auto">
              <div className="p-8 rounded-3xl shadow-xl hover:scale-105 transition-all duration-300" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full mx-auto mb-6 overflow-hidden shadow-lg border-4 relative" style={{ borderColor: '#FF5E14' }}>
                  {!ceoImageError ? (
                    <Image 
                      src="/ceo.jpg" 
                      alt="Mandira De Silva - Founder & CEO"
                      width={112}
                      height={112}
                      className="w-full h-full object-cover"
                      onError={() => setCeoImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                      <span className="text-white text-2xl sm:text-3xl font-bold">MD</span>
                    </div>
                  )}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>Mandira De Silva</h3>
                <p className="font-semibold mb-4" style={{ color: '#FF5E14' }}>Founder & CEO</p>
                <p className="text-lg leading-relaxed" style={{ color: '#B3B5BC' }}>
                  Passionate about building communities and creating sustainable solutions.
                </p>
              </div>

              <div className="p-8 rounded-3xl shadow-xl hover:scale-105 transition-all duration-300" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full mx-auto mb-6 overflow-hidden shadow-lg border-4 relative" style={{ borderColor: '#001554' }}>
                  {!ctoImageError ? (
                    <Image 
                      src="/cto.jpg" 
                      alt="Senesh Fitzroy - CTO"
                      width={112}
                      height={112}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: 'center 20%' }}
                      onError={() => setCtoImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                      <span className="text-white text-2xl sm:text-3xl font-bold">SF</span>
                    </div>
                  )}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>Senesh Fitzroy</h3>
                <p className="font-semibold mb-4" style={{ color: '#001554' }}>CTO</p>
                <p className="text-lg leading-relaxed" style={{ color: '#B3B5BC' }}>
                  Tech enthusiast dedicated to creating seamless user experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
