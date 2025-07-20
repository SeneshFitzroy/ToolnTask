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
                          // Check if chat widget already exists
                          const existingWidget = document.getElementById('toolntask-chat');
                          if (existingWidget) {
                            existingWidget.remove();
                            return;
                          }

                          // Open enhanced chatbot with TaskMate and Support selection
                          const chatWidget = document.createElement('div');
                          chatWidget.id = 'toolntask-chat';
                          chatWidget.innerHTML = `
                            <div style="position: fixed; bottom: 20px; right: 20px; width: 380px; height: 550px; background: white; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); z-index: 9999; border: 1px solid #e2e8f0; font-family: system-ui, -apple-system, sans-serif;">
                              <!-- Header -->
                              <div style="background: linear-gradient(135deg, #FE5F16, #FF5E14); color: white; padding: 15px; border-radius: 15px 15px 0 0; display: flex; justify-content: space-between; align-items: center;">
                                <h3 style="margin: 0; font-size: 16px; font-weight: 600;">ToolNTask Support Center</h3>
                                <button onclick="document.getElementById('toolntask-chat').remove()" style="background: none; border: none; color: white; font-size: 24px; cursor: pointer; padding: 0; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border-radius: 50%; hover:background: rgba(255,255,255,0.2);">×</button>
                              </div>
                              
                              <!-- Support Type Selection Sidebar -->
                              <div style="display: flex; height: 450px;">
                                <div style="width: 120px; background: #f8f9fa; border-right: 1px solid #e2e8f0; padding: 15px 10px;">
                                  <h4 style="margin: 0 0 15px 0; font-size: 12px; font-weight: 600; color: #666; text-transform: uppercase; letter-spacing: 0.5px;">Support Options</h4>
                                  
                                  <!-- TaskMate Option -->
                                  <div onclick="switchSupportType('taskmate')" style="cursor: pointer; padding: 12px 8px; border-radius: 8px; margin-bottom: 8px; text-align: center; transition: all 0.2s; background: #FE5F16; color: white;" id="taskmate-option">
                                    <div style="font-size: 20px; margin-bottom: 4px;">🤖</div>
                                    <div style="font-size: 11px; font-weight: 600;">TaskMate</div>
                                    <div style="font-size: 9px; opacity: 0.9; margin-top: 2px;">AI Assistant</div>
                                    <div style="background: rgba(255,255,255,0.2); border-radius: 10px; padding: 2px 6px; margin-top: 4px; font-size: 8px;">ONLINE</div>
                                  </div>
                                  
                                  <!-- Human Support Option -->
                                  <div onclick="switchSupportType('human')" style="cursor: pointer; padding: 12px 8px; border-radius: 8px; text-align: center; transition: all 0.2s; background: white; border: 1px solid #e2e8f0; color: #666;" id="human-option">
                                    <div style="font-size: 20px; margin-bottom: 4px;">👨‍💼</div>
                                    <div style="font-size: 11px; font-weight: 600;">Support Team</div>
                                    <div style="font-size: 9px; margin-top: 2px;">Human Agent</div>
                                    <div style="background: #fef2f2; color: #dc2626; border-radius: 10px; padding: 2px 6px; margin-top: 4px; font-size: 8px;">UNAVAILABLE</div>
                                  </div>
                                </div>
                                
                                <!-- Chat Area -->
                                <div style="flex: 1; display: flex; flex-direction: column; padding: 15px;">
                                  <!-- Current Support Type Header -->
                                  <div style="background: #f8f9fa; padding: 8px 12px; border-radius: 8px; margin-bottom: 15px; border-left: 3px solid #FE5F16;" id="support-type-header">
                                    <div style="font-size: 12px; font-weight: 600; color: #FE5F16;">💬 TaskMate - AI Assistant</div>
                                    <div style="font-size: 10px; color: #666; margin-top: 2px;">Instant responses • Available 24/7</div>
                                  </div>
                                  
                                  <!-- Messages Area -->
                                  <div style="flex: 1; overflow-y: auto; margin-bottom: 15px;" id="messages-area">
                                    <div style="background: #f7f7f7; padding: 12px; border-radius: 10px; margin-bottom: 10px;">
                                      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                                        <div style="width: 24px; height: 24px; background: #FE5F16; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px;">🤖</div>
                                        <span style="font-size: 12px; font-weight: 600; color: #FE5F16;">TaskMate</span>
                                      </div>
                                      <p style="margin: 0; color: #333; font-size: 13px; line-height: 1.4;">👋 Hi! I'm TaskMate, your AI assistant. I can help you with questions about posting tasks, renting tools, account setup, and platform features. How can I assist you today?</p>
                                    </div>
                                    <div style="background: #f7f7f7; padding: 12px; border-radius: 10px; margin-bottom: 10px;">
                                      <p style="margin: 0 0 8px 0; color: #333; font-size: 13px; font-weight: 600;">🚀 Quick Actions:</p>
                                      <div style="display: grid; gap: 6px;">
                                        <button style="background: white; border: 1px solid #e2e8f0; padding: 8px 10px; border-radius: 6px; text-align: left; font-size: 12px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='white'">📝 How to post a task</button>
                                        <button style="background: white; border: 1px solid #e2e8f0; padding: 8px 10px; border-radius: 6px; text-align: left; font-size: 12px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='white'">🔧 How to rent tools</button>
                                        <button style="background: white; border: 1px solid #e2e8f0; padding: 8px 10px; border-radius: 6px; text-align: left; font-size: 12px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='white'">✅ Account verification</button>
                                        <button style="background: white; border: 1px solid #e2e8f0; padding: 8px 10px; border-radius: 6px; text-align: left; font-size: 12px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='white'">🛡️ Payment & safety</button>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <!-- Input Area -->
                                  <div style="display: flex; gap: 8px;">
                                    <input type="text" placeholder="Ask TaskMate anything..." style="flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 13px; outline: none;" id="chat-input" />
                                    <button style="background: #FE5F16; color: white; border: none; padding: 10px 15px; border-radius: 8px; cursor: pointer; font-size: 13px; font-weight: 600;">Send</button>
                                  </div>
                                </div>
                              </div>
                              
                              <!-- Contact Info Footer -->
                              <div style="padding: 10px 15px; background: #f8f9fa; border-radius: 0 0 15px 15px; border-top: 1px solid #e2e8f0;">
                                <p style="margin: 0; text-align: center; color: #666; font-size: 11px;">
                                  📧 toolntask@gmail.com | 📞 +94 76 112 0457
                                </p>
                              </div>
                            </div>
                            
                            <script>
                              function switchSupportType(type) {
                                const taskmateOption = document.getElementById('taskmate-option');
                                const humanOption = document.getElementById('human-option');
                                const header = document.getElementById('support-type-header');
                                const input = document.getElementById('chat-input');
                                const messagesArea = document.getElementById('messages-area');
                                
                                if (type === 'taskmate') {
                                  // Style TaskMate as active
                                  taskmateOption.style.background = '#FE5F16';
                                  taskmateOption.style.color = 'white';
                                  humanOption.style.background = 'white';
                                  humanOption.style.color = '#666';
                                  
                                  // Update header and input
                                  header.innerHTML = '<div style="font-size: 12px; font-weight: 600; color: #FE5F16;">💬 TaskMate - AI Assistant</div><div style="font-size: 10px; color: #666; margin-top: 2px;">Instant responses • Available 24/7</div>';
                                  input.placeholder = 'Ask TaskMate anything...';
                                  input.disabled = false;
                                } else {
                                  // Style Human Support as active but unavailable
                                  humanOption.style.background = '#f3f4f6';
                                  humanOption.style.color = '#374151';
                                  taskmateOption.style.background = 'white';
                                  taskmateOption.style.color = '#666';
                                  
                                  // Update header and input
                                  header.innerHTML = '<div style="font-size: 12px; font-weight: 600; color: #dc2626;">👨‍💼 Human Support - Currently Unavailable</div><div style="font-size: 10px; color: #666; margin-top: 2px;">Our team members are currently unavailable. Please try TaskMate or email us.</div>';
                                  input.placeholder = 'Human support is currently unavailable...';
                                  input.disabled = true;
                                  
                                  // Show unavailable message
                                  messagesArea.innerHTML = '<div style="background: #fef2f2; border: 1px solid #fecaca; padding: 12px; border-radius: 10px; text-align: center;"><div style="font-size: 24px; margin-bottom: 8px;">😴</div><p style="margin: 0; color: #dc2626; font-size: 13px; font-weight: 600;">Our support team is currently unavailable</p><p style="margin: 8px 0 0 0; color: #666; font-size: 12px;">Please use TaskMate for instant help or email us at toolntask@gmail.com</p></div>';
                                }
                              }
                            </script>
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
