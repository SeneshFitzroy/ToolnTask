import React, { useState, useEffect } from 'react';
import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import { useTheme } from 'next-themes';
import { Shield, Lock, Eye, Database, Users, AlertTriangle, CheckCircle, Phone, Mail } from 'lucide-react';

export default function PrivacyAndSafety() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('privacy');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const sections = [
    { id: 'privacy', title: 'Privacy Policy', icon: Shield },
    { id: 'safety', title: 'Safety Guidelines', icon: AlertTriangle },
    { id: 'contact', title: 'Contact Us', icon: Phone }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#FFFFFF' }}>
      <Navigation />
      
      {/* Hero Section */}
      <div className="pt-20 pb-12" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#F8FAFC' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Shield className="w-8 h-8" style={{ color: '#FE5F16' }} />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
              Privacy & Safety
            </h1>
          </div>
          <p className="text-lg" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
            Your privacy and safety are our top priorities. Learn how we protect your data and ensure a secure community experience.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-20 z-40" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center border-b" style={{ borderColor: theme === 'dark' ? '#333' : '#E2E8F0' }}>
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all duration-300 border-b-2 ${
                  activeSection === section.id
                    ? 'border-orange-500'
                    : 'border-transparent hover:border-gray-300'
                }`}
                style={{
                  color: activeSection === section.id 
                    ? '#FE5F16' 
                    : theme === 'dark' ? '#CCCCCC' : '#6B7280'
                }}
              >
                <section.icon className="w-4 h-4" />
                {section.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Privacy Policy Section */}
          {activeSection === 'privacy' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                  Privacy Policy
                </h2>
                <p className="text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                  Last updated: January 2025
                </p>
              </div>

              <div className="grid gap-6">
                <div className="p-6 rounded-xl border" style={{ 
                  backgroundColor: theme === 'dark' ? '#2a2a2a' : '#F8FAFC',
                  borderColor: theme === 'dark' ? '#444' : '#E2E8F0'
                }}>
                  <div className="flex items-start gap-3">
                    <Database className="w-6 h-6 mt-1" style={{ color: '#FE5F16' }} />
                    <div>
                      <h3 className="text-lg font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                        Information We Collect
                      </h3>
                      <ul className="space-y-2 text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                        <li>• <strong>Account Information:</strong> Name, email, phone number, and profile photo</li>
                        <li>• <strong>Identity Verification:</strong> Government ID for enhanced security (optional)</li>
                        <li>• <strong>Usage Data:</strong> Tasks posted, tools rented, transaction history</li>
                        <li>• <strong>Location Data:</strong> General location for task/tool matching (with consent)</li>
                        <li>• <strong>Communication:</strong> Messages between users for transaction purposes</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-xl border" style={{ 
                  backgroundColor: theme === 'dark' ? '#2a2a2a' : '#F8FAFC',
                  borderColor: theme === 'dark' ? '#444' : '#E2E8F0'
                }}>
                  <div className="flex items-start gap-3">
                    <Lock className="w-6 h-6 mt-1" style={{ color: '#FE5F16' }} />
                    <div>
                      <h3 className="text-lg font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                        How We Use Your Information
                      </h3>
                      <ul className="space-y-2 text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                        <li>• <strong>Platform Operations:</strong> Account management, transaction processing</li>
                        <li>• <strong>Safety & Security:</strong> Fraud prevention, user verification, dispute resolution</li>
                        <li>• <strong>Service Improvement:</strong> Analytics to enhance user experience</li>
                        <li>• <strong>Communication:</strong> Important updates, transaction notifications</li>
                        <li>• <strong>Customer Support:</strong> Assistance with account and transaction issues</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-xl border" style={{ 
                  backgroundColor: theme === 'dark' ? '#2a2a2a' : '#F8FAFC',
                  borderColor: theme === 'dark' ? '#444' : '#E2E8F0'
                }}>
                  <div className="flex items-start gap-3">
                    <Eye className="w-6 h-6 mt-1" style={{ color: '#FE5F16' }} />
                    <div>
                      <h3 className="text-lg font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                        Information Sharing
                      </h3>
                      <ul className="space-y-2 text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                        <li>• <strong>With Other Users:</strong> Profile information necessary for transactions</li>
                        <li>• <strong>Service Providers:</strong> Payment processors, identity verification services</li>
                        <li>• <strong>Legal Requirements:</strong> When required by law or to protect user safety</li>
                        <li>• <strong>Business Transfers:</strong> In case of merger or acquisition (with notice)</li>
                        <li>• We never sell your personal information to third parties</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-xl border" style={{ 
                  backgroundColor: theme === 'dark' ? '#2a2a2a' : '#F8FAFC',
                  borderColor: theme === 'dark' ? '#444' : '#E2E8F0'
                }}>
                  <div className="flex items-start gap-3">
                    <Shield className="w-6 h-6 mt-1" style={{ color: '#FE5F16' }} />
                    <div>
                      <h3 className="text-lg font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                        Your Rights & Controls
                      </h3>
                      <ul className="space-y-2 text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                        <li>• <strong>Access:</strong> Request a copy of your personal data</li>
                        <li>• <strong>Update:</strong> Modify your account information anytime</li>
                        <li>• <strong>Delete:</strong> Request account deletion (subject to legal requirements)</li>
                        <li>• <strong>Portability:</strong> Export your data in a machine-readable format</li>
                        <li>• <strong>Marketing:</strong> Opt-out of promotional communications</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Safety Guidelines Section */}
          {activeSection === 'safety' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                  Safety Guidelines
                </h2>
                <p className="text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                  Essential safety practices for a secure community experience
                </p>
              </div>

              <div className="grid gap-6">
                <div className="p-6 rounded-xl border" style={{ 
                  backgroundColor: theme === 'dark' ? '#2a2a2a' : '#F8FAFC',
                  borderColor: theme === 'dark' ? '#444' : '#E2E8F0'
                }}>
                  <div className="flex items-start gap-3">
                    <Users className="w-6 h-6 mt-1" style={{ color: '#FE5F16' }} />
                    <div>
                      <h3 className="text-lg font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                        Personal Safety Guidelines
                      </h3>
                      <ul className="space-y-2 text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                        <li>• <strong>Meet in Public:</strong> Always meet in well-lit, public locations for initial meetings</li>
                        <li>• <strong>Verify Identity:</strong> Check user profiles, ratings, and reviews before engaging</li>
                        <li>• <strong>Trust Your Instincts:</strong> If something feels wrong, don't proceed with the transaction</li>
                        <li>• <strong>Bring a Friend:</strong> Consider bringing someone for high-value transactions</li>
                        <li>• <strong>Share Plans:</strong> Inform someone about your meeting location and time</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-xl border" style={{ 
                  backgroundColor: theme === 'dark' ? '#2a2a2a' : '#F8FAFC',
                  borderColor: theme === 'dark' ? '#444' : '#E2E8F0'
                }}>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 mt-1" style={{ color: '#FE5F16' }} />
                    <div>
                      <h3 className="text-lg font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                        Transaction Safety
                      </h3>
                      <ul className="space-y-2 text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                        <li>• <strong>Use Platform Payments:</strong> Always process payments through ToolNTask for protection</li>
                        <li>• <strong>Document Everything:</strong> Take photos of tools/work before and after</li>
                        <li>• <strong>Clear Agreements:</strong> Ensure all terms are clearly defined and agreed upon</li>
                        <li>• <strong>Report Issues:</strong> Contact support immediately if problems arise</li>
                        <li>• <strong>Insurance Coverage:</strong> Consider additional insurance for high-value items</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-xl border" style={{ 
                  backgroundColor: theme === 'dark' ? '#2a2a2a' : '#F8FAFC',
                  borderColor: theme === 'dark' ? '#444' : '#E2E8F0'
                }}>
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 mt-1" style={{ color: '#FE5F16' }} />
                    <div>
                      <h3 className="text-lg font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                        Red Flags to Avoid
                      </h3>
                      <ul className="space-y-2 text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                        <li>• <strong>Off-Platform Payments:</strong> Never pay outside of ToolNTask's secure system</li>
                        <li>• <strong>Unrealistic Offers:</strong> Be wary of deals that seem too good to be true</li>
                        <li>• <strong>Pressure Tactics:</strong> Avoid users who pressure for immediate decisions</li>
                        <li>• <strong>Poor Communication:</strong> Unclear, evasive, or hostile communication patterns</li>
                        <li>• <strong>No Reviews/Ratings:</strong> Be cautious with users who have no transaction history</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-xl border" style={{ 
                  backgroundColor: theme === 'dark' ? '#2a2a2a' : '#F8FAFC',
                  borderColor: theme === 'dark' ? '#444' : '#E2E8F0'
                }}>
                  <div className="flex items-start gap-3">
                    <Shield className="w-6 h-6 mt-1" style={{ color: '#FE5F16' }} />
                    <div>
                      <h3 className="text-lg font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                        Platform Security Features
                      </h3>
                      <ul className="space-y-2 text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                        <li>• <strong>User Verification:</strong> Identity verification system for enhanced trust</li>
                        <li>• <strong>Secure Payments:</strong> Encrypted payment processing with buyer protection</li>
                        <li>• <strong>Rating System:</strong> Community-driven feedback for informed decisions</li>
                        <li>• <strong>24/7 Support:</strong> Dedicated support team for safety concerns</li>
                        <li>• <strong>Dispute Resolution:</strong> Fair and impartial resolution process</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contact Section */}
          {activeSection === 'contact' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                  Contact Our Privacy & Safety Team
                </h2>
                <p className="text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                  Have questions about privacy or safety? We're here to help.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl border" style={{ 
                  backgroundColor: theme === 'dark' ? '#2a2a2a' : '#F8FAFC',
                  borderColor: theme === 'dark' ? '#444' : '#E2E8F0'
                }}>
                  <div className="flex items-start gap-3">
                    <Mail className="w-6 h-6 mt-1" style={{ color: '#FE5F16' }} />
                    <div>
                      <h3 className="text-lg font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                        Email Support
                      </h3>
                      <p className="text-sm mb-3" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                        <strong>Email:</strong> toolntask@gmail.com<br/>
                        <strong>Response Time:</strong> Within 24 hours
                      </p>
                      <a
                        href="mailto:toolntask@gmail.com"
                        className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors"
                        style={{ backgroundColor: '#FE5F16' }}
                      >
                        Send Email
                      </a>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-xl border" style={{ 
                  backgroundColor: theme === 'dark' ? '#2a2a2a' : '#F8FAFC',
                  borderColor: theme === 'dark' ? '#444' : '#E2E8F0'
                }}>
                  <div className="flex items-start gap-3">
                    <Phone className="w-6 h-6 mt-1" style={{ color: '#FE5F16' }} />
                    <div>
                      <h3 className="text-lg font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                        Phone Support
                      </h3>
                      <p className="text-sm mb-3" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                        <strong>Phone:</strong> +94 76 112 0457<br/>
                        <strong>Hours:</strong> Mon-Fri 9AM-6PM (Sri Lanka Time)
                      </p>
                      <a
                        href="tel:+94761120457"
                        className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors"
                        style={{ backgroundColor: '#FE5F16' }}
                      >
                        Call Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl border text-center" style={{ 
                backgroundColor: theme === 'dark' ? '#2a2a2a' : '#F8FAFC',
                borderColor: theme === 'dark' ? '#444' : '#E2E8F0'
              }}>
                <AlertTriangle className="w-12 h-12 mx-auto mb-4" style={{ color: '#FE5F16' }} />
                <h3 className="text-lg font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                  Emergency Safety Concerns
                </h3>
                <p className="text-sm mb-4" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                  If you're experiencing immediate safety concerns or threats, please contact local emergency services first, 
                  then reach out to our support team.
                </p>
                <div className="flex justify-center gap-4">
                  <span className="text-sm font-medium" style={{ color: '#FE5F16' }}>
                    Sri Lanka Emergency: 119
                  </span>
                  <span className="text-sm font-medium" style={{ color: '#FE5F16' }}>
                    Police: 118
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      <Footer />
    </div>
  );
}
              <button
                onClick={() => setShowTOC(!showTOC)}
                className="text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 border-0"
                style={{ backgroundColor: '#2D3748' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#011659'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2D3748'}
              >
                📋 Table of Contents
              </button>
              <button
                onClick={() => window.print()}
                className="text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 border-0"
                style={{ backgroundColor: '#FE5F16' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FF5D13'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FE5F16'}
              >
                🖨️ Print
              </button>
            </div>
          </div>

          {/* Interactive Table of Contents */}
          {showTOC && (
            <div className="rounded-xl shadow-lg p-6 mb-6 animate-in slide-in-from-top duration-300" style={{ backgroundColor: '#FFFFFF' }}>
              <h3 className="text-xl font-bold mb-4" style={{ color: '#001554' }}>Quick Navigation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`flex items-center gap-3 p-3 rounded-lg text-left transition-colors hover:scale-105`}
                    style={{
                      backgroundColor: activeSection === section.id ? '#FF5E14' : 'transparent',
                      color: activeSection === section.id ? '#2D3748' : '#B3B5BC'
                    }}
                    onMouseEnter={(e) => {
                      if (activeSection !== section.id) {
                        e.currentTarget.style.backgroundColor = '#F2F3F5';
                        e.currentTarget.style.color = '#2D3748';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeSection !== section.id) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#B3B5BC';
                      }
                    }}
                  >
                    <span className="text-xl">{section.icon}</span>
                    <span className="font-medium">{section.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative">
        {/* Floating Progress Indicator */}
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 hidden lg:block z-40">
          <div className="rounded-full shadow-lg p-2 border border-opacity-30" style={{ backgroundColor: '#FFFFFF', borderColor: '#B3B5BC' }}>
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`block w-3 h-3 rounded-full mb-2 last:mb-0 transition-colors`}
                style={{
                  backgroundColor: activeSection === section.id ? '#2D3748' : '#B3B5BC'
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== section.id) {
                    e.currentTarget.style.backgroundColor = '#FE5F16';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== section.id) {
                    e.currentTarget.style.backgroundColor = '#B3B5BC';
                  }
                }}
                title={section.title}
              />
            ))}
          </div>
        </div>

        <div className="rounded-2xl shadow-lg p-8 sm:p-12" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="prose prose-slate max-w-none">
            
            <section id="information-collect" className="mb-8 scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">📊</span>
                <h2 className="text-2xl font-bold" style={{ color: '#001554' }}>1. Information We Collect</h2>
              </div>
              <div className="rounded-lg p-4 mb-4" style={{ backgroundColor: '#F2F3F5' }}>
                <p className="mb-4" style={{ color: '#B3B5BC' }}>
                  We collect information you provide directly to us, such as when you create an account, post a task, rent a tool, or contact us.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg p-4 border-l-4" style={{ backgroundColor: '#FFFFFF', borderColor: '#2D3748' }}>
                  <h4 className="font-semibold mb-2" style={{ color: '#001554' }}>Personal Data</h4>
                  <ul className="list-disc pl-4 space-y-1 text-sm" style={{ color: '#B3B5BC' }}>
                    <li>Name, email, phone number</li>
                    <li>Profile information and preferences</li>
                  </ul>
                </div>
                <div className="rounded-lg p-4 border-l-4" style={{ backgroundColor: '#FFFFFF', borderColor: '#FE5F16' }}>
                  <h4 className="font-semibold mb-2" style={{ color: '#001554' }}>Platform Data</h4>
                  <ul className="list-disc pl-4 space-y-1 text-sm" style={{ color: '#B3B5BC' }}>
                    <li>Task and tool listings</li>
                    <li>Communication records</li>
                    <li>Payment information (processed securely)</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="how-we-use" className="mb-8 scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🔄</span>
                <h2 className="text-2xl font-bold" style={{ color: '#001554' }}>2. How We Use Your Information</h2>
              </div>
              <div className="rounded-lg p-4 mb-4" style={{ backgroundColor: '#F2F3F5' }}>
                <p className="mb-4" style={{ color: '#B3B5BC' }}>
                  We use the information we collect to provide, maintain, and improve our services:
                </p>
              </div>
              <div className="space-y-3">
                {[
                  { icon: '🤝', text: 'To facilitate connections between users' },
                  { icon: '💳', text: 'To process payments and transactions' },
                  { icon: '📧', text: 'To send you important updates and notifications' },
                  { icon: '📈', text: 'To improve our platform and user experience' },
                  { icon: '🛡️', text: 'To prevent fraud and ensure platform safety' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:shadow-md transition-shadow" style={{ backgroundColor: '#FFFFFF' }}>
                    <span className="text-xl">{item.icon}</span>
                    <span style={{ color: '#B3B5BC' }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </section>

            <section id="information-sharing" className="mb-8 scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🤝</span>
                <h2 className="text-2xl font-bold" style={{ color: '#001554' }}>3. Information Sharing</h2>
              </div>
              <div className="rounded-lg p-4 mb-4 border border-opacity-30" style={{ backgroundColor: '#F2F3F5', borderColor: '#FE5F16' }}>
                <p className="font-medium" style={{ color: '#2D3748' }}>
                  🚫 We do not sell, rent, or share your personal information with third parties except in specific circumstances:
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { icon: '✅', title: 'With Your Consent', desc: 'When you explicitly agree' },
                  { icon: '🛒', title: 'Transaction Completion', desc: 'To process your bookings' },
                  { icon: '⚖️', title: 'Legal Requirements', desc: 'When required by law' },
                  { icon: '🛡️', title: 'Rights Protection', desc: 'To prevent fraud and abuse' },
                  { icon: '🔧', title: 'Service Providers', desc: 'Trusted partners only' },
                  { icon: '🔒', title: 'Data Security', desc: 'All transfers encrypted' }
                ].map((item, index) => (
                  <div key={index} className="rounded-lg p-4 text-center hover:shadow-lg transition-shadow cursor-pointer" style={{ backgroundColor: '#FFFFFF' }}>
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <h4 className="font-semibold mb-1" style={{ color: '#2D3748' }}>{item.title}</h4>
                    <p className="text-sm" style={{ color: '#B3B5BC' }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="data-security" className="mb-8 scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🔒</span>
                <h2 className="text-2xl font-bold" style={{ color: '#001554' }}>4. Data Security</h2>
              </div>
              <div className="rounded-lg p-6 mb-6" style={{ backgroundColor: '#F2F3F5' }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">🛡️</span>
                  <div>
                    <h3 className="font-bold" style={{ color: '#001554' }}>Your Data is Protected</h3>
                    <p className="text-sm" style={{ color: '#B3B5BC' }}>We implement multiple layers of security</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: '🔐', label: 'SSL Encryption' },
                    { icon: '🔍', label: 'Regular Audits' },
                    { icon: '🚪', label: 'Access Controls' },
                    { icon: '💾', label: 'Secure Backups' }
                  ].map((item, index) => (
                    <div key={index} className="text-center p-3 rounded-lg" style={{ backgroundColor: '#FFFFFF' }}>
                      <div className="text-2xl mb-1">{item.icon}</div>
                      <div className="text-xs" style={{ color: '#B3B5BC' }}>{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="your-rights" className="mb-8 scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">⚖️</span>
                <h2 className="text-2xl font-bold" style={{ color: '#001554' }}>5. Your Rights</h2>
              </div>
              <div className="rounded-lg p-4 mb-4" style={{ backgroundColor: '#F2F3F5' }}>
                <p className="font-medium" style={{ color: '#2D3748' }}>
                  You have complete control over your personal information:
                </p>
              </div>
              <div className="space-y-4">
                {[
                  { icon: '👁️', title: 'Access Your Data', desc: 'View all information we have about you', action: 'Request Access' },
                  { icon: '✏️', title: 'Correct Information', desc: 'Update inaccurate or incomplete data', action: 'Update Profile' },
                  { icon: '🗑️', title: 'Delete Account', desc: 'Remove your account and associated data', action: 'Delete Data' },
                  { icon: '🚫', title: 'Withdraw Consent', desc: 'Stop certain data processing activities', action: 'Manage Consent' },
                  { icon: '📦', title: 'Export Data', desc: 'Download your information in portable format', action: 'Export Data' }
                ].map((right, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-opacity-20 hover:shadow-md transition-shadow" style={{ backgroundColor: '#FFFFFF', borderColor: '#B3B5BC' }}>
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{right.icon}</span>
                      <div>
                        <h4 className="font-semibold" style={{ color: '#2D3748' }}>{right.title}</h4>
                        <p className="text-sm" style={{ color: '#B3B5BC' }}>{right.desc}</p>
                      </div>
                    </div>
                    <button 
                      className="text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border-0"
                      style={{ backgroundColor: '#2D3748' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#011659'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2D3748'}
                    >
                      {right.action}
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <section id="cookies-tracking" className="mb-8 scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🍪</span>
                <h2 className="text-2xl font-bold" style={{ color: '#001554' }}>6. Cookies and Tracking</h2>
              </div>
              <div className="rounded-lg p-4 mb-4 border border-opacity-30" style={{ backgroundColor: '#F2F3F5', borderColor: '#FF5E14' }}>
                <p style={{ color: '#2D3748' }}>
                  We use cookies and similar technologies to enhance your experience and analyze platform usage. You can manage your cookie preferences through your browser settings.
                </p>
              </div>
              <div className="rounded-lg p-4" style={{ backgroundColor: '#FFFFFF' }}>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold" style={{ color: '#001554' }}>Cookie Preferences</h4>
                  <button 
                    className="text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border-0"
                    style={{ backgroundColor: '#FE5F16' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FF5D13'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FE5F16'}
                  >
                    Manage Cookies
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { type: 'Essential', status: 'Always On', desc: 'Required for basic functionality' },
                    { type: 'Analytics', status: 'Optional', desc: 'Help us improve the platform' },
                    { type: 'Marketing', status: 'Optional', desc: 'Personalized advertisements' }
                  ].map((cookie, index) => (
                    <div key={index} className="border border-opacity-20 rounded-lg p-3" style={{ borderColor: '#B3B5BC' }}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium" style={{ color: '#2D3748' }}>{cookie.type}</span>
                        <span 
                          className={`text-xs px-2 py-1 rounded-full`}
                          style={{
                            backgroundColor: cookie.status === 'Always On' ? '#FF5E14' : '#F2F3F5',
                            color: '#2D3748'
                          }}
                        >
                          {cookie.status}
                        </span>
                      </div>
                      <p className="text-xs" style={{ color: '#B3B5BC' }}>{cookie.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="policy-updates" className="mb-8 scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🔄</span>
                <h2 className="text-2xl font-bold" style={{ color: '#001554' }}>7. Updates to This Policy</h2>
              </div>
              <div className="rounded-lg p-4 mb-4" style={{ backgroundColor: '#F2F3F5' }}>
                <p className="mb-4" style={{ color: '#B3B5BC' }}>
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our website and updating the &quot;Last updated&quot; date.
                </p>
              </div>
              <div className="rounded-lg p-4 border-l-4" style={{ backgroundColor: '#FFFFFF', borderColor: '#2D3748' }}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl">📧</span>
                  <span className="font-semibold" style={{ color: '#2D3748' }}>Stay Updated</span>
                </div>
                <p className="text-sm mb-3" style={{ color: '#B3B5BC' }}>Get notified when we update our privacy policy</p>
                <button 
                  className="text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border-0"
                  style={{ backgroundColor: '#2D3748' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#011659'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2D3748'}
                >
                  Subscribe to Updates
                </button>
              </div>
            </section>

            <section id="contact-us" className="mb-8 scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">📞</span>
                <h2 className="text-2xl font-bold" style={{ color: '#001554' }}>8. Contact Us</h2>
              </div>
              <p className="mb-4" style={{ color: '#B3B5BC' }}>
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg p-6" style={{ backgroundColor: '#F2F3F5' }}>
                  <h4 className="font-semibold mb-4 flex items-center gap-2" style={{ color: '#2D3748' }}>
                    <span>📧</span> Email Support
                  </h4>
                  <p className="mb-3" style={{ color: '#B3B5BC' }}>
                    <strong>Email:</strong> toolntask@gmail.com<br/>
                    <strong>Response Time:</strong> Within 24 hours
                  </p>
                  <button 
                    className="text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border-0"
                    style={{ backgroundColor: '#2D3748' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#011659'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2D3748'}
                  >
                    Send Email
                  </button>
                </div>
                <div className="rounded-lg p-6" style={{ backgroundColor: '#F2F3F5' }}>
                  <h4 className="font-semibold mb-4 flex items-center gap-2" style={{ color: '#2D3748' }}>
                    <span>📍</span> Office Contact
                  </h4>
                  <p className="mb-3" style={{ color: '#B3B5BC' }}>
                    <strong>Phone:</strong> +94 76 112 0457<br/>
                    <strong>Address:</strong> 123 Main Street, Colombo 01, Sri Lanka
                  </p>
                  <button 
                    className="text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border-0"
                    style={{ backgroundColor: '#FE5F16' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FF5D13'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FE5F16'}
                  >
                    Get Directions
                  </button>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
