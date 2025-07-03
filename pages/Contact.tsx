
import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
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
      
      <div className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
              Get in{' '}
              <span 
                className="relative inline-block"
                style={{ color: '#FF5E14' }}
              >
                Touch
                <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 100 10" style={{ fill: '#FE5F16', opacity: 0.3 }}>
                  <path d="M0 8 Q 50 0 100 8 L 100 10 L 0 10 Z" />
                </svg>
              </span>
            </h1>
            <p className="text-xl sm:text-2xl max-w-3xl mx-auto leading-relaxed" style={{ color: theme === 'dark' ? '#B3B4B6' : '#B3B5BC' }}>
              We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
            {/* Contact Form */}
            <div className="p-8 sm:p-10 rounded-3xl shadow-xl" style={{ backgroundColor: '#FFFFFF' }}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: '#1A1818' }}>Send us a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-3" style={{ color: '#1A1818' }}>First Name</label>
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
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-3" style={{ color: '#1A1818' }}>Last Name</label>
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
                    <h3 className="font-bold text-lg mb-3" style={{ color: '#1A1818' }}>How do I start using ToolNTask?</h3>
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
