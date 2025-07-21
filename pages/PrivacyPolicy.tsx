import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import ToolsTasksChatAgent from '../src/components/ToolsTasksChatAgent';
import { useTheme } from 'next-themes';
import { Shield, Lock, Eye, Database, Users, AlertTriangle, CheckCircle, Phone, Mail, ArrowLeft } from 'lucide-react';

export default function PrivacyAndSafety() {
  const { theme } = useTheme();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('privacy');
  
  // Check if user came from signup page
  const fromSignup = router.query.from === 'signup';

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleBackToSignup = () => {
    router.push('/SignUp');
  };

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
          {/* Conditional Back Button */}
          {fromSignup && (
            <div className="flex justify-start mb-6">
              <button
                onClick={handleBackToSignup}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 hover:shadow-md"
                style={{
                  backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                  borderColor: theme === 'dark' ? '#404040' : '#E2E8F0',
                  color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                }}
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="font-medium">Back to Create Account</span>
              </button>
            </div>
          )}
          
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
                        <li>• <strong>Trust Your Instincts:</strong> If something feels wrong, don&apos;t proceed with the transaction</li>
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
                        <li>• <strong>Use Platform Services:</strong> Always use ToolNTask for advertisement and promotion services</li>
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
                        <li>• <strong>Off-Platform Services:</strong> Always use ToolNTask for legitimate tool and service advertisements</li>
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
                  Have questions about privacy or safety? We&apos;re here to help.
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
                  If you&apos;re experiencing immediate safety concerns or threats, please contact local emergency services first, 
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

      <ToolsTasksChatAgent pageType="home" />
      <Footer />
    </div>
  );
}
