import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function TermsAndConditions() {
  const [activeSection, setActiveSection] = useState<string>('');
  const [showTOC, setShowTOC] = useState<boolean>(false);
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const sections = [
    { id: 'acceptance', title: '1. Acceptance of Terms', icon: '✅' },
    { id: 'platform-description', title: '2. Platform Description', icon: '🏢' },
    { id: 'user-responsibilities', title: '3. User Responsibilities', icon: '👥' },
    { id: 'prohibited-activities', title: '4. Prohibited Activities', icon: '🚫' },
    { id: 'payment-terms', title: '5. Payment Terms', icon: '💳' },
    { id: 'safety-insurance', title: '6. Safety and Insurance', icon: '🛡️' },
    { id: 'intellectual-property', title: '7. Intellectual Property', icon: '©️' },
    { id: 'limitation-liability', title: '8. Limitation of Liability', icon: '⚖️' },
    { id: 'account-termination', title: '9. Account Termination', icon: '🔒' },
    { id: 'changes-terms', title: '10. Changes to Terms', icon: '🔄' },
    { id: 'contact-info', title: '11. Contact Information', icon: '📞' }
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
    <div className="min-h-screen" style={{ backgroundColor: theme === 'dark' ? '#001554' : '#F2F3F5' }}>
      <Navigation />
      
      {/* Header Section */}
      <div className="py-12 sm:py-16" style={{ backgroundColor: theme === 'dark' ? '#001554' : '#F2F3F5' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>Terms & Conditions</h1>
            <p className="text-lg mb-6" style={{ color: theme === 'dark' ? '#B3B4B6' : '#B3B5BC' }}>
              Last updated: July 3, 2025
            </p>
            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={() => setShowTOC(!showTOC)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                📋 Table of Contents
              </button>
              <button
                onClick={() => window.print()}
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                🖨️ Print
              </button>
            </div>

            {/* Terms Acceptance Widget */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  id="accept-terms"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded"
                />
                <label htmlFor="accept-terms" className="text-slate-700 dark:text-gray-300">
                  I have read and agree to the Terms & Conditions
                </label>
                {acceptedTerms && (
                  <div className="ml-auto">
                    <span className="text-green-600 text-xl">✅</span>
                  </div>
                )}
              </div>
              {acceptedTerms && (
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <p className="text-green-700 dark:text-green-300 text-sm flex items-center gap-2">
                    <span>🎉</span> Thank you for accepting our terms! You can now use all platform features.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Table of Contents */}
          {showTOC && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 animate-in slide-in-from-top duration-300">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Quick Navigation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                      activeSection === section.id
                        ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-slate-600 dark:text-gray-300'
                    }`}
                  >
                    <span className="text-lg">{section.icon}</span>
                    <span className="font-medium text-sm">{section.title}</span>
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
          <div className="bg-white dark:bg-gray-800 rounded-full shadow-lg p-2 border border-gray-200 dark:border-gray-700">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`block w-3 h-3 rounded-full mb-2 last:mb-0 transition-colors ${
                  activeSection === section.id
                    ? 'bg-orange-600'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-orange-400'
                }`}
                title={section.title}
              />
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 sm:p-12">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            
            <section id="acceptance" className="mb-8 scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">✅</span>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">1. Acceptance of Terms</h2>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">📜</span>
                  <div>
                    <h3 className="font-bold text-green-800 dark:text-green-300 mb-2">Legal Agreement</h3>
                    <p className="text-slate-600 dark:text-gray-300 mb-4">
                      By accessing and using ToolnTask, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                    </p>
                    <div className="flex gap-3">
                      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        I Accept
                      </button>
                      <button className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        I Decline
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="platform-description" className="mb-8 scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🏢</span>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">2. Platform Description</h2>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
                <p className="text-slate-600 dark:text-gray-300 mb-4">
                  ToolnTask is a marketplace platform that connects people who need help with tasks or tools with those who can provide such services or rentals.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: '📝', title: 'Task Services', desc: 'Post and complete various tasks', color: 'orange' },
                  { icon: '🔧', title: 'Tool Rentals', desc: 'Rent and lend equipment safely', color: 'blue' },
                  { icon: '🛡️', title: 'Safety Features', desc: 'User verification and protection', color: 'green' },
                  { icon: '💳', title: 'Secure Payments', desc: 'Protected payment processing', color: 'purple' }
                ].map((feature, index) => (
                  <div key={index} className={`bg-white dark:bg-gray-700 rounded-lg p-4 border-l-4 border-${feature.color}-500 hover:shadow-md transition-shadow`}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xl">{feature.icon}</span>
                      <h4 className="font-semibold text-slate-800 dark:text-white">{feature.title}</h4>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-gray-300">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="user-responsibilities" className="mb-8 scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">👥</span>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">3. User Responsibilities</h2>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 mb-4">
                <p className="text-slate-600 dark:text-gray-300 mb-4">
                  As a user of ToolnTask, you agree to follow these important guidelines:
                </p>
              </div>
              <div className="space-y-3">
                {[
                  { icon: '✅', text: 'Provide accurate and truthful information', status: 'required' },
                  { icon: '🤝', text: 'Complete tasks and rentals as agreed', status: 'required' },
                  { icon: '🙂', text: 'Treat other users with respect and professionalism', status: 'required' },
                  { icon: '📋', text: 'Follow all applicable laws and regulations', status: 'required' },
                  { icon: '🔐', text: 'Maintain the confidentiality of your account', status: 'required' },
                  { icon: '🚨', text: 'Report any suspicious or inappropriate behavior', status: 'encouraged' }
                ].map((item, index) => (
                  <div key={index} className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${
                    item.status === 'required' 
                      ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800' 
                      : 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                  }`}>
                    <span className="text-xl">{item.icon}</span>
                    <span className="flex-1 text-slate-600 dark:text-gray-300">{item.text}</span>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                      item.status === 'required' 
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' 
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section id="prohibited-activities" className="mb-8 scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🚫</span>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">4. Prohibited Activities</h2>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 mb-4 border border-red-200 dark:border-red-800">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⚠️</span>
                  <p className="text-red-700 dark:text-red-300 font-medium">
                    The following activities are strictly prohibited and may result in account suspension:
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: '🚨', activity: 'False or fraudulent content', severity: 'high' },
                  { icon: '😠', activity: 'Harassment or abusive behavior', severity: 'high' },
                  { icon: '⚖️', activity: 'Illegal activities or services', severity: 'critical' },
                  { icon: '💸', activity: 'Circumventing platform fees', severity: 'medium' },
                  { icon: '📧', activity: 'Spamming or unauthorized ads', severity: 'medium' },
                  { icon: '📱', activity: 'Sharing personal contact info publicly', severity: 'low' }
                ].map((item, index) => (
                  <div key={index} className="bg-white dark:bg-gray-700 rounded-lg p-4 border-l-4 border-red-500">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{item.icon}</span>
                        <span className="font-medium text-slate-800 dark:text-white">{item.activity}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        item.severity === 'critical' ? 'bg-red-200 text-red-800 dark:bg-red-900/50 dark:text-red-300' :
                        item.severity === 'high' ? 'bg-orange-200 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300' :
                        item.severity === 'medium' ? 'bg-yellow-200 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300' :
                        'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        {item.severity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">5. Payment Terms</h2>
              <p className="text-slate-600 dark:text-gray-300 mb-4">
                All payments are processed securely through our platform:
              </p>
              <ul className="list-disc pl-6 text-slate-600 dark:text-gray-300 space-y-2">
                <li>Service fees are clearly disclosed before booking</li>
                <li>Payments are held securely until task completion</li>
                <li>Refunds are processed according to our refund policy</li>
                <li>Users are responsible for any applicable taxes</li>
                <li>Disputes are resolved through our mediation process</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">6. Safety and Insurance</h2>
              <p className="text-slate-600 dark:text-gray-300 mb-4">
                While we strive to maintain a safe platform, users are responsible for their own safety:
              </p>
              <ul className="list-disc pl-6 text-slate-600 dark:text-gray-300 space-y-2">
                <li>Verify the identity and credentials of other users</li>
                <li>Meet in public places when appropriate</li>
                <li>Inspect tools and equipment before use</li>
                <li>Maintain appropriate insurance coverage</li>
                <li>Report any safety concerns immediately</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">7. Intellectual Property</h2>
              <p className="text-slate-600 dark:text-gray-300 mb-4">
                The ToolnTask platform and its original content are protected by copyright and other intellectual property laws. Users retain rights to their own content but grant us license to use it on our platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">8. Limitation of Liability</h2>
              <p className="text-slate-600 dark:text-gray-300 mb-4">
                ToolnTask acts as a platform connecting users and is not responsible for the quality, safety, or legality of tasks, tools, or user interactions. Our liability is limited to the maximum extent permitted by law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">9. Account Termination</h2>
              <p className="text-slate-600 dark:text-gray-300 mb-4">
                We reserve the right to suspend or terminate accounts that violate these terms or engage in prohibited activities. Users may also delete their accounts at any time.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">10. Changes to Terms</h2>
              <p className="text-slate-600 dark:text-gray-300 mb-4">
                We may update these terms from time to time. Continued use of the platform constitutes acceptance of any changes. Users will be notified of significant changes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">11. Contact Information</h2>
              <p className="text-slate-600 dark:text-gray-300 mb-4">
                If you have any questions about these Terms & Conditions, please contact us:
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mt-4">
                <p className="text-slate-600 dark:text-gray-300">
                  <strong>Email:</strong> legal@toolntask.com<br/>
                  <strong>Phone:</strong> +94 11 123 4567<br/>
                  <strong>Address:</strong> 123 Main Street, Colombo 01, Sri Lanka
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
