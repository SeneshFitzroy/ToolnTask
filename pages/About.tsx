import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import Logo from '../src/components/Logo';
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
      
      <div className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-16 h-16 rounded-full animate-pulse" style={{ backgroundColor: '#FF5E14', animationDuration: '4s' }}></div>
          <div className="absolute top-20 right-20 w-12 h-12 rounded-full animate-pulse" style={{ backgroundColor: '#001554', animationDelay: '2s', animationDuration: '5s' }}></div>
          <div className="absolute bottom-20 left-20 w-10 h-10 rounded-full animate-pulse" style={{ backgroundColor: '#FF5E14', animationDelay: '1s', animationDuration: '4.5s' }}></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            {/* Simple Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 shadow-sm" 
                 style={{ 
                   backgroundColor: theme === 'dark' ? 'rgba(255, 94, 20, 0.15)' : 'rgba(255, 94, 20, 0.1)', 
                   border: `1px solid ${theme === 'dark' ? 'rgba(255, 94, 20, 0.3)' : 'rgba(255, 94, 20, 0.2)'}`
                 }}>
              <span className="text-sm">🤝</span>
              <span className="text-xs font-semibold" style={{ color: '#FF5E14' }}>Community Platform</span>
            </div>

            {/* Clean Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6 flex items-center justify-center gap-3 group" 
                style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
              <span>About Us</span>
              <div className="transform group-hover:scale-105 transition-transform duration-300">
                <Logo size="large" showUnderline={true} className="inline-block" />
              </div>
            </h1>

            {/* Sharp Description */}
            <div className="max-w-4xl mx-auto mb-8">
              <p className="text-lg sm:text-xl font-medium mb-4" 
                 style={{ color: theme === 'dark' ? '#B3B5BC' : '#4B5563' }}>
                Connecting communities through shared tasks and tool rentals.
              </p>
              <p className="text-base sm:text-lg" 
                 style={{ color: theme === 'dark' ? '#9CA3AF' : '#6B7280' }}>
                Making everyday life easier, one helping hand at a time.
              </p>
            </div>

            {/* Quick Action Icons */}
            <div className="flex justify-center gap-6 sm:gap-8">
              <div className="text-center group cursor-pointer">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300 mb-2"
                     style={{ 
                       backgroundColor: '#FF5E14',
                       boxShadow: '0 4px 15px rgba(255, 94, 20, 0.3)'
                     }}>
                  <span className="text-lg sm:text-xl">🎯</span>
                </div>
                <p className="text-xs font-medium" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>Mission</p>
              </div>
              
              <div className="text-center group cursor-pointer">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300 mb-2"
                     style={{ 
                       backgroundColor: '#001554',
                       boxShadow: '0 4px 15px rgba(0, 21, 84, 0.3)'
                     }}>
                  <span className="text-lg sm:text-xl">👥</span>
                </div>
                <p className="text-xs font-medium" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>Team</p>
              </div>

              <div className="text-center group cursor-pointer">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300 mb-2"
                     style={{ 
                       backgroundColor: '#10B981',
                       boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
                     }}>
                  <span className="text-lg sm:text-xl">🌱</span>
                </div>
                <p className="text-xs font-medium" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>Values</p>
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <div className="mb-12 sm:mb-16 lg:mb-20">
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
