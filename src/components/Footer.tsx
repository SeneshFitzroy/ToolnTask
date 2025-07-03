import React from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, ArrowUp, Heart, Users, Star } from 'lucide-react';
import { useState, useEffect } from 'react';

const Footer = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
      {/* Newsletter Section */}
      <div className="py-12 border-t border-opacity-20" style={{ backgroundColor: theme === 'dark' ? '#0C0F16' : '#F2F3F5', borderColor: theme === 'dark' ? '#444444' : '#B3B5BC' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
              Stay Connected with ToolNTask
            </h3>
            <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: theme === 'dark' ? '#B3B5BC' : '#B3B5BC' }}>
              Get the latest updates on new tools, upcoming tasks, and community stories delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl border border-opacity-30 focus:outline-none focus:ring-2 focus:border-transparent text-base"
                style={{ 
                  borderColor: theme === 'dark' ? '#444444' : '#B3B5BC', 
                  color: theme === 'dark' ? '#FFFFFF' : '#1A1818',
                  backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF'
                }}
                onFocus={(e) => e.currentTarget.style.boxShadow = `0 0 0 2px #FF5E14`}
                onBlur={(e) => e.currentTarget.style.boxShadow = 'none'}
              />
              <button
                className="px-6 py-3 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                style={{ backgroundColor: '#FE5F16' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FF5D13'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FE5F16'}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="text-3xl sm:text-4xl font-bold mb-6">
                <span style={{ color: '#FF5E14' }}>Tool</span>
                <span style={{ color: '#001554' }}>N</span>
                <span style={{ color: '#FF5E14' }}>Task</span>
              </div>
              <p className="text-lg mb-6 leading-relaxed" style={{ color: theme === 'dark' ? '#B3B5BC' : '#B3B5BC' }}>
                Sri Lanka&apos;s leading community marketplace connecting neighbors through shared tools and trusted services. 
                Building stronger communities, one task at a time.
              </p>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" style={{ color: '#FE5F16' }} />
                  <span className="text-sm font-medium" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>5,000+ Members</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5" style={{ color: '#FF5E14' }} />
                  <span className="text-sm font-medium" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>4.8★ Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5" style={{ color: '#FE5F16' }} />
                  <span className="text-sm font-medium" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>100% Secure</span>
                </div>
              </div>

              {/* Social Media */}
              <div className="flex space-x-4">
                {[
                  { icon: Facebook, label: 'Facebook' },
                  { icon: Twitter, label: 'Twitter' },
                  { icon: Instagram, label: 'Instagram' }
                ].map((social, index) => (
                  <div
                    key={index}
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110 shadow-lg group"
                    style={{ backgroundColor: theme === 'dark' ? '#333333' : '#F2F3F5' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#FE5F16';
                      e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = theme === 'dark' ? '#333333' : '#F2F3F5';
                      e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                    }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-6 h-6 transition-colors group-hover:text-white" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>Explore</h3>
              <ul className="space-y-3">
                {[
                  { href: '/Tasks', label: 'Browse Tasks' },
                  { href: '/Tools', label: 'Rent Tools' },
                  { href: '/About', label: 'About Us' },
                  { href: '/Contact', label: 'Contact Us' }
                ].map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href} 
                      className="inline-flex items-center gap-2 text-base transition-all duration-300 hover:translate-x-2 group"
                      style={{ color: theme === 'dark' ? '#B3B5BC' : '#B3B5BC' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#FE5F16'}
                      onMouseLeave={(e) => e.currentTarget.style.color = theme === 'dark' ? '#B3B5BC' : '#B3B5BC'}
                    >
                      <span className="w-1.5 h-1.5 rounded-full transition-all duration-300 group-hover:scale-150" style={{ backgroundColor: '#FF5E14' }}></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-xl font-bold mb-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>Legal</h3>
              <ul className="space-y-3">
                {[
                  { href: '/PrivacyPolicy', label: 'Privacy Policy' },
                  { href: '/TermsAndConditions', label: 'Terms & Conditions' },
                  { href: '/Support', label: 'Support Center' },
                  { href: '/Safety', label: 'Safety Guidelines' }
                ].map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href} 
                      className="inline-flex items-center gap-2 text-base transition-all duration-300 hover:translate-x-2 group"
                      style={{ color: theme === 'dark' ? '#B3B5BC' : '#B3B5BC' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#FE5F16'}
                      onMouseLeave={(e) => e.currentTarget.style.color = theme === 'dark' ? '#B3B5BC' : '#B3B5BC'}
                    >
                      <span className="w-1.5 h-1.5 rounded-full transition-all duration-300 group-hover:scale-150" style={{ backgroundColor: '#FF5E14' }}></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold mb-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>Get in Touch</h3>
              <div className="space-y-4">
                {[
                  { icon: Phone, text: '+94 11 123 4567', href: 'tel:+94111234567' },
                  { icon: Mail, text: 'hello@toolntask.lk', href: 'mailto:hello@toolntask.lk' },
                  { icon: MapPin, text: '123 Galle Road, Colombo 03, Sri Lanka', href: '#' }
                ].map((contact, index) => (
                  <div key={index} className="flex items-start gap-3 group">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300"
                      style={{ backgroundColor: theme === 'dark' ? '#333333' : '#F2F3F5' }}
                    >
                      <contact.icon className="w-5 h-5 group-hover:scale-110 transition-transform" style={{ color: '#FE5F16' }} />
                    </div>
                    <div>
                      {contact.href === '#' ? (
                        <span className="text-sm leading-relaxed" style={{ color: theme === 'dark' ? '#B3B5BC' : '#B3B5BC' }}>
                          {contact.text}
                        </span>
                      ) : (
                        <a 
                          href={contact.href}
                          className="text-sm leading-relaxed transition-colors hover:underline"
                          style={{ color: theme === 'dark' ? '#B3B5BC' : '#B3B5BC' }}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#FE5F16'}
                          onMouseLeave={(e) => e.currentTarget.style.color = theme === 'dark' ? '#B3B5BC' : '#B3B5BC'}
                        >
                          {contact.text}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="py-6 border-t border-opacity-20" style={{ backgroundColor: theme === 'dark' ? '#0C0F16' : '#F2F3F5', borderColor: theme === 'dark' ? '#444444' : '#B3B5BC' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-center sm:text-left" style={{ color: theme === 'dark' ? '#B3B5BC' : '#B3B5BC' }}>
              &copy; 2025 ToolNTask. All rights reserved. Made with{' '}
              <Heart className="w-4 h-4 inline mx-1" style={{ color: '#FE5F16' }} />{' '}
              for Sri Lankan communities.
            </p>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
              style={{ backgroundColor: '#001554', color: '#FFFFFF' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#011659'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#001554'}
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;