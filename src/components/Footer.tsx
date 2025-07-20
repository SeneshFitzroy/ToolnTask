import React from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, ArrowUp, Heart, Users, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import Logo from './Logo';

interface FooterProps {
  showNewsletter?: boolean;
}

const Footer = ({ showNewsletter = false }: FooterProps) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubscribing) return;

    setIsSubscribing(true);
    try {
      const response = await fetch('/api/newsletter-subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubscriptionStatus('success');
        setEmail('');
        setTimeout(() => setSubscriptionStatus('idle'), 5000);
      } else {
        setSubscriptionStatus('error');
        setTimeout(() => setSubscriptionStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setSubscriptionStatus('error');
      setTimeout(() => setSubscriptionStatus('idle'), 5000);
    } finally {
      setIsSubscribing(false);
    }
  };

  if (!mounted) {
    return null;
  }
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#FFFFFF' }}>
      {/* Newsletter Section - Only show on specific pages */}
      {showNewsletter && (
        <div className="py-12 border-t border-opacity-20" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F2F3F5', borderColor: theme === 'dark' ? '#444444' : '#B3B5BC' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-lg sm:text-xl lg:text-2xl font-bold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>Stay Connected with</span>
                <Logo size="large" />
              </div>
              <p className="text-base sm:text-lg mb-8 max-w-2xl mx-auto" style={{ color: theme === 'dark' ? '#CCCCCC' : '#B3B5BC' }}>
                Get the latest updates on new tools, upcoming tasks, and community stories delivered to your inbox.
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubscribing}
                  className="flex-1 px-5 py-4 rounded-xl border border-opacity-30 focus:outline-none focus:ring-2 focus:border-transparent text-base sm:text-lg"
                  style={{ 
                    borderColor: theme === 'dark' ? '#444444' : '#B3B5BC', 
                    color: theme === 'dark' ? '#FFFFFF' : '#2D3748',
                    backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF'
                  }}
                  onFocus={(e) => e.currentTarget.style.boxShadow = `0 0 0 2px #FF5E14`}
                  onBlur={(e) => e.currentTarget.style.boxShadow = 'none'}
                />
                <button
                  type="submit"
                  disabled={!email || isSubscribing}
                  className="px-8 py-4 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-lg"
                  style={{ backgroundColor: '#FE5F16' }}
                  onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#FF5D13')}
                  onMouseLeave={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#FE5F16')}
                >
                  {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
              
              {/* Status Messages */}
              {subscriptionStatus === 'success' && (
                <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-base">
                  ✅ Successfully subscribed! Check your email for a welcome message.
                </div>
              )}
              {subscriptionStatus === 'error' && (
                <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-base">
                  ❌ Something went wrong. Please try again later.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Footer Content */}
      <div className="py-16" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <Logo size="medium" />
              </div>
              <p className="text-xs sm:text-sm mb-6 leading-relaxed" style={{ color: theme === 'dark' ? '#B3B5BC' : '#B3B5BC' }}>
                Sri Lanka&apos;s leading community marketplace connecting neighbors through shared tools and trusted services. 
                Building stronger communities, one task at a time.
              </p>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" style={{ color: '#FE5F16' }} />
                  <span className="text-sm font-medium" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>Trusted Community Platform</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5" style={{ color: '#FF5E14' }} />
                  <span className="text-sm font-medium" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>Safe & Verified Users</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5" style={{ color: '#FE5F16' }} />
                  <span className="text-sm font-medium" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>100% Secure</span>
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
                    <social.icon className="w-6 h-6 transition-colors group-hover:text-white" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm sm:text-base lg:text-lg font-bold mb-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>Explore</h3>
              <ul className="space-y-3">
                {[
                  { href: '/Tasks', label: 'Browse Tasks' },
                  { href: '/Tools', label: 'Rent Tools' },
                  { href: '/About', label: 'About Us' },
                  { href: '/About#contact', label: 'Contact Us' }
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
              <h3 className="text-sm sm:text-base lg:text-lg font-bold mb-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>Legal</h3>
              <ul className="space-y-3">
                {[
                  { href: '/PrivacyPolicy', label: 'Privacy & Safety' },
                  { href: '#', label: 'Support Center', action: 'openChat' }
                ].map((link, index) => (
                  <li key={index}>
                    {link.action === 'openChat' ? (
                      <button
                        onClick={() => {
                          // Open chatbot in right corner
                          const chatWidget = document.createElement('div');
                          chatWidget.id = 'toolntask-chat';
                          chatWidget.innerHTML = `
                            <div style="position: fixed; bottom: 20px; right: 20px; width: 350px; height: 500px; background: white; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); z-index: 9999; border: 1px solid #e2e8f0;">
                              <div style="background: linear-gradient(135deg, #FE5F16, #FF5E14); color: white; padding: 15px; border-radius: 15px 15px 0 0; display: flex; justify-content: space-between; align-items: center;">
                                <h3 style="margin: 0; font-size: 16px; font-weight: 600;">ToolNTask Support</h3>
                                <button onclick="document.getElementById('toolntask-chat').remove()" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer; padding: 0; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">×</button>
                              </div>
                              <div style="padding: 20px; height: 400px; display: flex; flex-direction: column;">
                                <div style="flex: 1; overflow-y: auto; margin-bottom: 15px;">
                                  <div style="background: #f7f7f7; padding: 12px; border-radius: 10px; margin-bottom: 10px;">
                                    <p style="margin: 0; color: #333; font-size: 14px;">👋 Hi! I'm here to help you with ToolNTask. How can I assist you today?</p>
                                  </div>
                                  <div style="background: #f7f7f7; padding: 12px; border-radius: 10px; margin-bottom: 10px;">
                                    <p style="margin: 0 0 8px 0; color: #333; font-size: 14px; font-weight: 600;">Quick Help:</p>
                                    <p style="margin: 0 0 4px 0; color: #666; font-size: 13px;">• How to post a task</p>
                                    <p style="margin: 0 0 4px 0; color: #666; font-size: 13px;">• How to rent tools</p>
                                    <p style="margin: 0 0 4px 0; color: #666; font-size: 13px;">• Account verification</p>
                                    <p style="margin: 0; color: #666; font-size: 13px;">• Payment & safety</p>
                                  </div>
                                </div>
                                <div style="display: flex; gap: 8px;">
                                  <input type="text" placeholder="Type your message..." style="flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px;" />
                                  <button style="background: #FE5F16; color: white; border: none; padding: 10px 15px; border-radius: 8px; cursor: pointer; font-size: 14px;">Send</button>
                                </div>
                                <p style="margin: 8px 0 0 0; text-align: center; color: #888; font-size: 12px;">Email: toolntask@gmail.com | Phone: +94 76 112 0457</p>
                              </div>
                            </div>
                          `;
                          document.body.appendChild(chatWidget);
                        }}
                        className="inline-flex items-center gap-2 text-base transition-all duration-300 hover:translate-x-2 group bg-transparent border-none p-0 cursor-pointer"
                        style={{ color: theme === 'dark' ? '#B3B5BC' : '#B3B5BC' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#FE5F16'}
                        onMouseLeave={(e) => e.currentTarget.style.color = theme === 'dark' ? '#B3B5BC' : '#B3B5BC'}
                      >
                        <span className="w-1.5 h-1.5 rounded-full transition-all duration-300 group-hover:scale-150" style={{ backgroundColor: '#FF5E14' }}></span>
                        {link.label}
                      </button>
                    ) : (
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
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-sm sm:text-base lg:text-lg font-bold mb-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>Get in Touch</h3>
              <div className="space-y-4">
                {[
                  { icon: Phone, text: '+94 76 112 0457', href: 'tel:+94761120457' },
                  { icon: Mail, text: 'toolntask@gmail.com', href: 'mailto:toolntask@gmail.com' },
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
      <div className="py-6 border-t border-opacity-20" style={{ backgroundColor: theme === 'dark' ? '#2D3748' : '#F2F3F5', borderColor: theme === 'dark' ? '#444444' : '#B3B5BC' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4">
            <p className="text-xs text-center" style={{ color: theme === 'dark' ? '#B3B5BC' : '#B3B5BC' }}>
              &copy; 2025 <Logo size="small" className="inline" />. All rights reserved. Made with{' '}
              <Heart className="w-4 h-4 inline mx-1" style={{ color: '#FE5F16' }} />{' '}
              for Sri Lankan communities.
            </p>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
              style={{ backgroundColor: '#2D3748', color: '#FFFFFF' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#011659'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2D3748'}
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="text-xs font-medium">Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
