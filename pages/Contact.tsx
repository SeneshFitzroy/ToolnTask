
import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import Logo from '../src/components/Logo';
import { Button } from '../src/components/ui/button';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function Contact() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

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
              <span className="text-sm">📞</span>
              <span className="text-xs font-semibold" style={{ color: '#FF5E14' }}>Contact Support</span>
            </div>

            {/* Clean Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6 flex flex-col sm:flex-row items-center justify-center gap-3 group" 
                style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
              <span>Get in</span>
              <div className="relative transform group-hover:scale-105 transition-transform duration-300">
                <span style={{ color: '#FF5E14' }}>Touch</span>
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>
              </div>
            </h1>

            {/* Sharp Description */}
            <div className="max-w-4xl mx-auto mb-8">
              <p className="text-lg sm:text-xl font-medium mb-4" 
                 style={{ color: theme === 'dark' ? '#B3B5BC' : '#4B5563' }}>
                We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
              </p>
              <p className="text-base sm:text-lg" 
                 style={{ color: theme === 'dark' ? '#9CA3AF' : '#6B7280' }}>
                Choose your preferred way to get in touch with our team.
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
                  <span className="text-lg sm:text-xl">📧</span>
                </div>
                <p className="text-xs font-medium" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>Email</p>
              </div>
              
              <div className="text-center group cursor-pointer">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300 mb-2"
                     style={{ 
                       backgroundColor: '#001554',
                       boxShadow: '0 4px 15px rgba(0, 21, 84, 0.3)'
                     }}>
                  <span className="text-lg sm:text-xl">📞</span>
                </div>
                <p className="text-xs font-medium" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>Phone</p>
              </div>

              <div className="text-center group cursor-pointer">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300 mb-2"
                     style={{ 
                       backgroundColor: '#10B981',
                       boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
                     }}>
                  <span className="text-lg sm:text-xl">📍</span>
                </div>
                <p className="text-xs font-medium" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>Location</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
            {/* Contact Form */}
            <div className="p-8 sm:p-10 rounded-3xl shadow-xl" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>Send us a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>First Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-4 border-2 rounded-xl focus:outline-none transition-all duration-300"
                      style={{ 
                        borderColor: theme === 'dark' ? '#6B7280' : '#B3B5BC', 
                        color: theme === 'dark' ? '#FFFFFF' : '#1A1818',
                        backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF'
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#FE5F16'}
                      onBlur={(e) => e.currentTarget.style.borderColor = theme === 'dark' ? '#6B7280' : '#B3B5BC'}
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>Last Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-4 border-2 rounded-xl focus:outline-none transition-all duration-300"
                      style={{ 
                        borderColor: theme === 'dark' ? '#6B7280' : '#B3B5BC', 
                        color: theme === 'dark' ? '#FFFFFF' : '#1A1818',
                        backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF'
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#FE5F16'}
                      onBlur={(e) => e.currentTarget.style.borderColor = theme === 'dark' ? '#6B7280' : '#B3B5BC'}
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-3" style={{ color: '#1A1818' }}>Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-4 border-2 rounded-xl focus:outline-none transition-all duration-300"
                    style={{ 
                      borderColor: '#B3B5BC', 
                      color: '#1A1818',
                      backgroundColor: '#FFFFFF'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#FE5F16'}
                    onBlur={(e) => e.currentTarget.style.borderColor = '#B3B5BC'}
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-3" style={{ color: '#1A1818' }}>Phone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-4 border-2 rounded-xl focus:outline-none transition-all duration-300"
                    style={{ 
                      borderColor: '#B3B5BC', 
                      color: '#1A1818',
                      backgroundColor: '#FFFFFF'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#FE5F16'}
                    onBlur={(e) => e.currentTarget.style.borderColor = '#B3B5BC'}
                    placeholder="+94 71 234 5678"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-3" style={{ color: '#1A1818' }}>Subject</label>
                  <input
                    type="text"
                    className="w-full px-4 py-4 border-2 rounded-xl focus:outline-none transition-all duration-300"
                    style={{ 
                      borderColor: '#B3B5BC', 
                      color: '#1A1818',
                      backgroundColor: '#FFFFFF'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#FE5F16'}
                    onBlur={(e) => e.currentTarget.style.borderColor = '#B3B5BC'}
                    placeholder="How can we help you?"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-3" style={{ color: '#1A1818' }}>Message</label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-4 border-2 rounded-xl focus:outline-none transition-all duration-300 resize-none"
                    style={{ 
                      borderColor: '#B3B5BC', 
                      color: '#1A1818',
                      backgroundColor: '#FFFFFF'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#FE5F16'}
                    onBlur={(e) => e.currentTarget.style.borderColor = '#B3B5BC'}
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>
                
                <Button 
                  className="w-full py-4 sm:py-5 text-lg sm:text-xl font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-xl border-0"
                  style={{ backgroundColor: '#FE5F16', color: '#FFFFFF' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FF5D13'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FE5F16'}
                >
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8 sm:space-y-10">
              <div className="p-8 rounded-3xl shadow-xl hover:scale-105 transition-all duration-300" style={{ backgroundColor: '#FFFFFF' }}>
                <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: '#1A1818' }}>Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg" style={{ backgroundColor: '#FE5F16' }}>
                      <span className="text-white text-xl">📍</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2" style={{ color: '#1A1818' }}>Address</h3>
                      <p className="text-lg" style={{ color: '#B3B5BC' }}>123, Galle Road, Colombo 03, Sri Lanka</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg" style={{ backgroundColor: '#FF5E14' }}>
                      <span className="text-xl" style={{ color: '#1A1818' }}>📞</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2" style={{ color: '#1A1818' }}>Phone</h3>
                      <p className="text-lg" style={{ color: '#B3B5BC' }}>+94 11 123 4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg" style={{ backgroundColor: '#001554' }}>
                      <span className="text-white text-xl">✉️</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2" style={{ color: '#1A1818' }}>Email</h3>
                      <p className="text-lg" style={{ color: '#B3B5BC' }}>hello@toolntask.lk</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg" style={{ backgroundColor: '#FE5F16' }}>
                      <span className="text-white text-xl">🕒</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2" style={{ color: '#1A1818' }}>Business Hours</h3>
                      <p className="text-lg" style={{ color: '#B3B5BC' }}>Mon - Fri: 9:00 AM - 6:00 PM</p>
                      <p className="text-lg" style={{ color: '#B3B5BC' }}>Sat: 9:00 AM - 2:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="p-8 rounded-3xl shadow-xl hover:scale-105 transition-all duration-300" style={{ backgroundColor: '#FFFFFF' }}>
                <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: '#1A1818' }}>Frequently Asked Questions</h2>
                <div className="space-y-6">
                  <div className="p-4 rounded-xl border-l-4" style={{ backgroundColor: '#F2F3F5', borderColor: '#FE5F16' }}>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-lg" style={{ color: '#1A1818' }}>How do I start using</span>
                      <Logo size="small" />
                      <span className="font-bold text-lg" style={{ color: '#1A1818' }}>?</span>
                    </div>
                    <p className="text-lg leading-relaxed" style={{ color: '#B3B5BC' }}>Simply create an account and start browsing available tasks or tools in your area.</p>
                  </div>
                  <div className="p-4 rounded-xl border-l-4" style={{ backgroundColor: '#F2F3F5', borderColor: '#FF5E14' }}>
                    <h3 className="font-bold text-lg mb-3" style={{ color: '#1A1818' }}>Is there a service fee?</h3>
                    <p className="text-lg leading-relaxed" style={{ color: '#B3B5BC' }}>We charge a small service fee to maintain the platform and ensure quality service.</p>
                  </div>
                  <div className="p-4 rounded-xl border-l-4" style={{ backgroundColor: '#F2F3F5', borderColor: '#001554' }}>
                    <h3 className="font-bold text-lg mb-3" style={{ color: '#1A1818' }}>How are payments handled?</h3>
                    <p className="text-lg leading-relaxed" style={{ color: '#B3B5BC' }}>All payments are processed securely through our platform for your protection.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
