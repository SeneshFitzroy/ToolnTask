import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import { useState } from 'react';

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState<string>('');
  const [showTOC, setShowTOC] = useState<boolean>(false);

  const sections = [
    { id: 'information-collect', title: '1. Information We Collect', icon: '📊' },
    { id: 'how-we-use', title: '2. How We Use Your Information', icon: '🔄' },
    { id: 'information-sharing', title: '3. Information Sharing', icon: '🤝' },
    { id: 'data-security', title: '4. Data Security', icon: '🔒' },
    { id: 'your-rights', title: '5. Your Rights', icon: '⚖️' },
    { id: 'cookies-tracking', title: '6. Cookies and Tracking', icon: '🍪' },
    { id: 'policy-updates', title: '7. Updates to This Policy', icon: '🔄' },
    { id: 'contact-us', title: '8. Contact Us', icon: '📞' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setShowTOC(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F2F3F5' }}>
      <Navigation />
      
      {/* Header Section */}
      <div className="py-12 sm:py-16" style={{ backgroundColor: '#F2F3F5' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{ color: '#1A1818' }}>Privacy Policy</h1>
            <p className="text-lg mb-6" style={{ color: '#B3B5BC' }}>
              Last updated: July 3, 2025
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowTOC(!showTOC)}
                className="text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 border-0"
                style={{ backgroundColor: '#001554' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#011659'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#001554'}
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
              <h3 className="text-xl font-bold mb-4" style={{ color: '#1A1818' }}>Quick Navigation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`flex items-center gap-3 p-3 rounded-lg text-left transition-colors hover:scale-105`}
                    style={{
                      backgroundColor: activeSection === section.id ? '#FF5E14' : 'transparent',
                      color: activeSection === section.id ? '#1A1818' : '#B3B5BC'
                    }}
                    onMouseEnter={(e) => {
                      if (activeSection !== section.id) {
                        e.currentTarget.style.backgroundColor = '#F2F3F5';
                        e.currentTarget.style.color = '#1A1818';
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
                  backgroundColor: activeSection === section.id ? '#001554' : '#B3B5BC'
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
                <h2 className="text-2xl font-bold" style={{ color: '#1A1818' }}>1. Information We Collect</h2>
              </div>
              <div className="rounded-lg p-4 mb-4" style={{ backgroundColor: '#F2F3F5' }}>
                <p className="mb-4" style={{ color: '#B3B5BC' }}>
                  We collect information you provide directly to us, such as when you create an account, post a task, rent a tool, or contact us.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg p-4 border-l-4" style={{ backgroundColor: '#FFFFFF', borderColor: '#001554' }}>
                  <h4 className="font-semibold mb-2" style={{ color: '#1A1818' }}>Personal Data</h4>
                  <ul className="list-disc pl-4 space-y-1 text-sm" style={{ color: '#B3B5BC' }}>
                    <li>Name, email, phone number</li>
                    <li>Profile information and preferences</li>
                  </ul>
                </div>
                <div className="rounded-lg p-4 border-l-4" style={{ backgroundColor: '#FFFFFF', borderColor: '#FE5F16' }}>
                  <h4 className="font-semibold mb-2" style={{ color: '#1A1818' }}>Platform Data</h4>
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
                <h2 className="text-2xl font-bold" style={{ color: '#1A1818' }}>2. How We Use Your Information</h2>
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
                <h2 className="text-2xl font-bold" style={{ color: '#1A1818' }}>3. Information Sharing</h2>
              </div>
              <div className="rounded-lg p-4 mb-4 border border-opacity-30" style={{ backgroundColor: '#F2F3F5', borderColor: '#FE5F16' }}>
                <p className="font-medium" style={{ color: '#1A1818' }}>
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
                    <h4 className="font-semibold mb-1" style={{ color: '#1A1818' }}>{item.title}</h4>
                    <p className="text-sm" style={{ color: '#B3B5BC' }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="data-security" className="mb-8 scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🔒</span>
                <h2 className="text-2xl font-bold" style={{ color: '#1A1818' }}>4. Data Security</h2>
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
                <h2 className="text-2xl font-bold" style={{ color: '#1A1818' }}>5. Your Rights</h2>
              </div>
              <div className="rounded-lg p-4 mb-4" style={{ backgroundColor: '#F2F3F5' }}>
                <p className="font-medium" style={{ color: '#1A1818' }}>
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
                        <h4 className="font-semibold" style={{ color: '#1A1818' }}>{right.title}</h4>
                        <p className="text-sm" style={{ color: '#B3B5BC' }}>{right.desc}</p>
                      </div>
                    </div>
                    <button 
                      className="text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border-0"
                      style={{ backgroundColor: '#001554' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#011659'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#001554'}
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
                <h2 className="text-2xl font-bold" style={{ color: '#1A1818' }}>6. Cookies and Tracking</h2>
              </div>
              <div className="rounded-lg p-4 mb-4 border border-opacity-30" style={{ backgroundColor: '#F2F3F5', borderColor: '#FF5E14' }}>
                <p style={{ color: '#1A1818' }}>
                  We use cookies and similar technologies to enhance your experience and analyze platform usage. You can manage your cookie preferences through your browser settings.
                </p>
              </div>
              <div className="rounded-lg p-4" style={{ backgroundColor: '#FFFFFF' }}>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold" style={{ color: '#1A1818' }}>Cookie Preferences</h4>
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
                        <span className="font-medium" style={{ color: '#1A1818' }}>{cookie.type}</span>
                        <span 
                          className={`text-xs px-2 py-1 rounded-full`}
                          style={{
                            backgroundColor: cookie.status === 'Always On' ? '#FF5E14' : '#F2F3F5',
                            color: '#1A1818'
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
                <h2 className="text-2xl font-bold" style={{ color: '#1A1818' }}>7. Updates to This Policy</h2>
              </div>
              <div className="rounded-lg p-4 mb-4" style={{ backgroundColor: '#F2F3F5' }}>
                <p className="mb-4" style={{ color: '#B3B5BC' }}>
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our website and updating the &quot;Last updated&quot; date.
                </p>
              </div>
              <div className="rounded-lg p-4 border-l-4" style={{ backgroundColor: '#FFFFFF', borderColor: '#001554' }}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl">📧</span>
                  <span className="font-semibold" style={{ color: '#1A1818' }}>Stay Updated</span>
                </div>
                <p className="text-sm mb-3" style={{ color: '#B3B5BC' }}>Get notified when we update our privacy policy</p>
                <button 
                  className="text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border-0"
                  style={{ backgroundColor: '#001554' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#011659'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#001554'}
                >
                  Subscribe to Updates
                </button>
              </div>
            </section>

            <section id="contact-us" className="mb-8 scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">📞</span>
                <h2 className="text-2xl font-bold" style={{ color: '#1A1818' }}>8. Contact Us</h2>
              </div>
              <p className="mb-4" style={{ color: '#B3B5BC' }}>
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg p-6" style={{ backgroundColor: '#F2F3F5' }}>
                  <h4 className="font-semibold mb-4 flex items-center gap-2" style={{ color: '#1A1818' }}>
                    <span>📧</span> Email Support
                  </h4>
                  <p className="mb-3" style={{ color: '#B3B5BC' }}>
                    <strong>Email:</strong> privacy@toolntask.com<br/>
                    <strong>Response Time:</strong> Within 24 hours
                  </p>
                  <button 
                    className="text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border-0"
                    style={{ backgroundColor: '#001554' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#011659'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#001554'}
                  >
                    Send Email
                  </button>
                </div>
                <div className="rounded-lg p-6" style={{ backgroundColor: '#F2F3F5' }}>
                  <h4 className="font-semibold mb-4 flex items-center gap-2" style={{ color: '#1A1818' }}>
                    <span>📍</span> Office Contact
                  </h4>
                  <p className="mb-3" style={{ color: '#B3B5BC' }}>
                    <strong>Phone:</strong> +94 11 123 4567<br/>
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
