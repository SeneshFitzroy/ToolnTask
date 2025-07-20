import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import ToolsTasksChatAgent from '../src/components/ToolsTasksChatAgent';
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
    { id: 'acceptance', title: '1. Acceptance of Terms', icon: '' },
    { id: 'platform-description', title: '2. Platform Description', icon: '' },
    { id: 'user-responsibilities', title: '3. User Responsibilities', icon: '' },
    { id: 'prohibited-activities', title: '4. Prohibited Activities', icon: '' },
    { id: 'payment-terms', title: '5. Payment Terms', icon: '' },
    { id: 'safety-insurance', title: '6. Safety and Insurance', icon: '' },
    { id: 'intellectual-property', title: '7. Intellectual Property', icon: '' },
    { id: 'limitation-liability', title: '8. Limitation of Liability', icon: '' },
    { id: 'account-termination', title: '9. Account Termination', icon: '' },
    { id: 'changes-terms', title: '10. Changes to Terms', icon: '' },
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
    <div className="min-h-screen" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F2F3F5' }}>
      <Navigation />
      
      {/* Header Section */}
      <div className="py-12 sm:py-16" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F2F3F5' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>Terms of Service</h1>
            <p className="text-lg mb-6" style={{ color: theme === 'dark' ? '#B3B4B6' : '#B3B5BC' }}>
              Effective Date: July 21, 2025 | Last Updated: July 21, 2025
            </p>
            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={() => setShowTOC(!showTOC)}
                className="text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                style={{ backgroundColor: theme === 'dark' ? '#FFFFFF' : '#001554', color: theme === 'dark' ? '#000000' : '#FFFFFF' }}
              >
                Table of Contents
              </button>
              <button
                onClick={() => window.print()}
                className="text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                style={{ backgroundColor: '#FF5E14' }}
              >
                Print Document
              </button>
            </div>

            {/* Terms Acceptance Widget */}
            <div className="rounded-xl shadow-lg p-6 max-w-2xl mx-auto" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  id="accept-terms"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="w-5 h-5 rounded"
                  style={{ accentColor: '#FF5E14' }}
                />
                <label htmlFor="accept-terms" style={{ color: theme === 'dark' ? '#CCCCCC' : '#374151' }}>
                  I have read and agree to these Terms of Service
                </label>
                {acceptedTerms && (
                  <div className="ml-auto">
                    <span className="text-green-600 text-xl">✓</span>
                  </div>
                )}
              </div>
              {acceptedTerms && (
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <p className="text-green-700 dark:text-green-300 text-sm">
                    Terms accepted successfully. You may now use all platform features.
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
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">1. Acceptance of Terms</h2>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <div>
                  <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-3">Legal Agreement</h3>
                  <p className="text-slate-600 dark:text-gray-300 mb-4">
                    By creating an account, accessing, or using the ToolNTask platform (&ldquo;Service&rdquo;), you (&ldquo;User&rdquo;) enter into a legally binding agreement with ToolNTask (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). These Terms of Service (&ldquo;Terms&rdquo;) govern your use of our platform and services.
                  </p>
                  <p className="text-slate-600 dark:text-gray-300 mb-4">
                    <strong>If you do not agree to these Terms, you may not access or use our Service.</strong> Your continued use of the platform constitutes acceptance of any updates or modifications to these Terms.
                  </p>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded border">
                    <p className="text-sm text-slate-600 dark:text-gray-300">
                      <strong>Age Requirement:</strong> You must be at least 18 years old to use this service. By agreeing to these Terms, you represent that you meet this age requirement.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="platform-description" className="mb-8 scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">2. Platform Description</h2>
              </div>
              <div className="rounded-lg p-6 mb-4" style={{ backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFF7ED' }}>
                <p className="text-slate-600 dark:text-gray-300 mb-4">
                  ToolNTask operates as a digital marketplace platform that facilitates connections between service providers and service seekers within Sri Lanka. Our platform enables users to:
                </p>
                <ul className="list-disc list-inside text-slate-600 dark:text-gray-300 space-y-2">
                  <li>Post and browse task-based service opportunities</li>
                  <li>Rent and offer tools and equipment for temporary use</li>
                  <li>Connect with verified professionals and service providers</li>
                  <li>Conduct secure transactions through our platform</li>
                </ul>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'Task Services', desc: 'Professional task completion and skill-based services', color: 'orange' },
                  { title: 'Equipment Rental', desc: 'Safe and insured tool and equipment rental marketplace', color: 'blue' },
                  { title: 'User Verification', desc: 'Comprehensive identity and skill verification system', color: 'green' },
                  { title: 'Secure Transactions', desc: 'Protected payment processing with dispute resolution', color: 'purple' }
                ].map((feature, index) => (
                  <div key={index} className={`bg-white dark:bg-gray-700 rounded-lg p-4 border-l-4 border-${feature.color}-500 hover:shadow-md transition-shadow`}>
                    <div className="mb-2">
                      <h4 className="font-semibold text-slate-800 dark:text-white">{feature.title}</h4>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-gray-300">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="user-responsibilities" className="mb-8 scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">3. User Responsibilities</h2>
              </div>
              <div className="space-y-4">
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 border border-yellow-200 dark:border-yellow-800">
                  <h3 className="font-bold text-yellow-800 dark:text-yellow-300 mb-3">Account Security</h3>
                  <ul className="text-slate-600 dark:text-gray-300 space-y-2">
                    <li>• Maintain confidentiality of your account credentials</li>
                    <li>• Immediately notify us of any unauthorized account access</li>
                    <li>• Provide accurate and current information during registration</li>
                    <li>• Update your profile information when changes occur</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                  <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-3">Service Quality Standards</h3>
                  <ul className="text-slate-600 dark:text-gray-300 space-y-2">
                    <li>• Deliver services as described and agreed upon</li>
                    <li>• Maintain professional communication with all users</li>
                    <li>• Complete tasks within agreed timeframes</li>
                    <li>• Provide accurate descriptions of tools and equipment</li>
                  </ul>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
                  <h3 className="font-bold text-green-800 dark:text-green-300 mb-3">Legal Compliance</h3>
                  <ul className="text-slate-600 dark:text-gray-300 space-y-2">
                    <li>• Comply with all applicable Sri Lankan laws and regulations</li>
                    <li>• Obtain necessary licenses for professional services</li>
                    <li>• Pay applicable taxes on earnings through the platform</li>
                    <li>• Respect intellectual property rights of others</li>
                  </ul>
                </div>
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
                      ? 'border' 
                      : 'border'
                  }`} style={{ 
                    backgroundColor: item.status === 'required' 
                      ? (theme === 'dark' ? '#2a1f1f' : '#FEF2F2') 
                      : (theme === 'dark' ? '#2a2a2a' : '#FFF7ED'),
                    borderColor: item.status === 'required' 
                      ? (theme === 'dark' ? '#ff6b6b' : '#FCA5A5') 
                      : (theme === 'dark' ? '#FF5E14' : '#FDBA74')
                  }}>
                    <span className="text-xl">{item.icon}</span>
                    <span className="flex-1" style={{ color: theme === 'dark' ? '#CCCCCC' : '#374151' }}>{item.text}</span>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium`} style={{
                      backgroundColor: item.status === 'required' 
                        ? (theme === 'dark' ? '#ff6b6b' : '#F87171') 
                        : (theme === 'dark' ? '#FF5E14' : '#FB923C'),
                      color: theme === 'dark' ? '#FFFFFF' : '#FFFFFF'
                    }}>
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
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-3">
                <span className="text-2xl">💳</span> Payment Terms
              </h2>
              <div className="space-y-4">
                <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-3">Payment Processing</h3>
                <ul className="list-disc list-inside text-slate-600 dark:text-gray-300 space-y-2 ml-4">
                  <li>All payments are processed securely through our verified payment partners</li>
                  <li>Service fees are clearly disclosed before booking</li>
                  <li>Platform fees are deducted from service provider earnings</li>
                  <li>Refunds are processed according to our refund policy</li>
                  <li>Users are responsible for any applicable taxes</li>
                </ul>
                
                <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-3 mt-6">Escrow Protection</h3>
                <ul className="list-disc list-inside text-slate-600 dark:text-gray-300 space-y-2 ml-4">
                  <li>Payments are held in escrow until task completion</li>
                  <li>Funds are released upon mutual agreement or dispute resolution</li>
                  <li>Platform protection covers verified transactions</li>
                  <li>Disputes are resolved through our professional mediation process</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-3">
                <span className="text-2xl">🛡️</span> Safety and Professional Standards
              </h2>
              <div className="space-y-4">
                <p className="text-slate-600 dark:text-gray-300">
                  ToolNTask maintains high safety and professional standards. All users must adhere to our safety guidelines:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">Safety Requirements</h4>
                    <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
                      <li>• Verify credentials of service providers</li>
                      <li>• Meet in safe, public locations when appropriate</li>
                      <li>• Report any safety concerns immediately</li>
                      <li>• Maintain appropriate insurance coverage</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <h4 className="font-bold text-green-800 dark:text-green-300 mb-2">Professional Standards</h4>
                    <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
                      <li>• Maintain professional communication</li>
                      <li>• Deliver services as described</li>
                      <li>• Respect confidentiality agreements</li>
                      <li>• Obtain necessary licenses and permits</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-3">
                <span className="text-2xl">📝</span> Intellectual Property Rights
              </h2>
              <div className="space-y-4">
                <p className="text-slate-600 dark:text-gray-300">
                  All content, design, logos, and intellectual property on ToolNTask remain the exclusive property of ToolNTask Private Limited. Users retain ownership of content they create but grant us necessary licenses for platform operation.
                </p>
                <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-3">Content Licensing</h3>
                <ul className="list-disc list-inside text-slate-600 dark:text-gray-300 space-y-2 ml-4">
                  <li>Users grant ToolNTask a non-exclusive license to display their content on the platform</li>
                  <li>Original work completed through the platform belongs to the commissioning client</li>
                  <li>Service providers must ensure they have rights to all materials and tools used</li>
                  <li>Copyright infringement may result in immediate account termination</li>
                  <li>We respect intellectual property rights and respond to valid DMCA requests</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-3">
                <span className="text-2xl">⚖️</span> Limitation of Liability
              </h2>
              <div className="space-y-4">
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <p className="text-yellow-800 dark:text-yellow-300 font-medium">
                    <strong>IMPORTANT LEGAL NOTICE:</strong> Please read this section carefully as it limits our liability to you.
                  </p>
                </div>
                <p className="text-slate-600 dark:text-gray-300">
                  ToolNTask acts as an intermediary platform connecting service providers with clients. To the fullest extent permitted by Sri Lankan law:
                </p>
                <ul className="list-disc list-inside text-slate-600 dark:text-gray-300 space-y-2 ml-4">
                  <li>We are not liable for the quality, timeliness, safety, or completion of services provided by third parties</li>
                  <li>Our total liability shall not exceed the platform fees paid by you in the twelve months preceding any claim</li>
                  <li>We disclaim all warranties except as expressly required by applicable law</li>
                  <li>Users assume full responsibility for their interactions, transactions, and business relationships</li>
                  <li>Force majeure events excuse performance delays or failures</li>
                  <li>We are not responsible for user-generated content or third-party actions</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-3">
                <span className="text-2xl">🚪</span> Account Termination
              </h2>
              <div className="space-y-4">
                <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-3">Termination by User</h3>
                <p className="text-slate-600 dark:text-gray-300 mb-4">
                  You may terminate your account at any time through your account settings or by contacting our support team. Upon termination:
                </p>
                <ul className="list-disc list-inside text-slate-600 dark:text-gray-300 space-y-2 ml-4">
                  <li>All active tasks must be completed or properly cancelled with mutual agreement</li>
                  <li>Outstanding payments will be processed according to our payment terms</li>
                  <li>Account data will be retained for legal and tax requirements as mandated by Sri Lankan law</li>
                  <li>Access to platform features will be immediately revoked</li>
                </ul>

                <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-3 mt-6">Termination by ToolNTask</h3>
                <p className="text-slate-600 dark:text-gray-300 mb-4">
                  We reserve the right to suspend or terminate accounts immediately for violations of these Terms, including but not limited to:
                </p>
                <ul className="list-disc list-inside text-slate-600 dark:text-gray-300 space-y-2 ml-4">
                  <li>Material breach of terms and conditions or community guidelines</li>
                  <li>Fraudulent activities, misrepresentation, or illegal conduct</li>
                  <li>Abuse, harassment, or threatening behavior toward other users</li>
                  <li>Non-payment of fees or chargebacks</li>
                  <li>Creating multiple accounts to circumvent restrictions</li>
                  <li>Violation of intellectual property rights</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-3">
                <span className="text-2xl">📋</span> Changes to Terms
              </h2>
              <div className="space-y-4">
                <p className="text-slate-600 dark:text-gray-300">
                  ToolNTask reserves the right to modify these Terms of Service at any time to reflect changes in our services, legal requirements, or business practices. We will provide notice of significant changes through:
                </p>
                <ul className="list-disc list-inside text-slate-600 dark:text-gray-300 space-y-2 ml-4">
                  <li>Email notification to all registered users</li>
                  <li>Prominent notice on our website and platform</li>
                  <li>In-app notifications for mobile users</li>
                  <li>30-day advance notice for material changes affecting user rights</li>
                </ul>
                <p className="text-slate-600 dark:text-gray-300 mt-4">
                  Continued use of the platform after such modifications constitutes acceptance of the updated Terms. If you disagree with any changes, you must stop using our services and may terminate your account.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-3">
                <span className="text-2xl">🇱🇰</span> Governing Law and Dispute Resolution
              </h2>
              <div className="space-y-4">
                <p className="text-slate-600 dark:text-gray-300">
                  These Terms are governed by and construed in accordance with the laws of the Democratic Socialist Republic of Sri Lanka. Any disputes arising from or relating to these Terms or your use of our services shall be resolved through the following process:
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">Primary Resolution</h4>
                    <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
                      <li>• Platform mediation services</li>
                      <li>• Good faith negotiation between parties</li>
                      <li>• Alternative dispute resolution mechanisms</li>
                      <li>• Professional arbitration when appropriate</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <h4 className="font-bold text-green-800 dark:text-green-300 mb-2">Legal Jurisdiction</h4>
                    <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
                      <li>• Sri Lankan courts have exclusive jurisdiction</li>
                      <li>• Colombo District Court as primary venue</li>
                      <li>• English language for all proceedings</li>
                      <li>• Sri Lankan Consumer Protection Act applies</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Professional Contact Information Section */}
            <section className="mb-8 bg-gradient-to-r from-orange-50 to-blue-50 dark:from-orange-900/20 dark:to-blue-900/20 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-3">
                <span className="text-2xl">📞</span> Contact Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white mb-3">Legal and Business Inquiries</h3>
                  <div className="space-y-2 text-slate-600 dark:text-gray-300">
                    <p><strong>Email:</strong> legal@toolntask.com</p>
                    <p><strong>Business Email:</strong> business@toolntask.com</p>
                    <p><strong>Company:</strong> ToolNTask Private Limited</p>
                    <p><strong>Address:</strong></p>
                    <p className="ml-4">123 Business District</p>
                    <p className="ml-4">Colombo 03, Sri Lanka 00300</p>
                    <p><strong>Registration No:</strong> PV 123456 (Sri Lanka)</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white mb-3">Customer Support</h3>
                  <div className="space-y-2 text-slate-600 dark:text-gray-300">
                    <p><strong>Email:</strong> support@toolntask.com</p>
                    <p><strong>Phone:</strong> +94 11 234 5678</p>
                    <p><strong>Emergency:</strong> +94 76 112 0457</p>
                    <p><strong>Hours:</strong> Monday - Friday</p>
                    <p className="ml-4">9:00 AM - 6:00 PM (IST)</p>
                    <p><strong>Response Time:</strong> Within 24 hours</p>
                  </div>
                </div>
              </div>

              {/* Last Updated Information */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
                <div className="space-y-2">
                  <p className="text-slate-500 dark:text-gray-400 text-sm">
                    <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                  <p className="text-slate-500 dark:text-gray-400 text-sm">
                    <strong>Version:</strong> 2.0 - Professional Terms of Service
                  </p>
                  <p className="text-slate-500 dark:text-gray-400 text-xs">
                    These terms are effective immediately and supersede all previous versions.
                  </p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>

      <ToolsTasksChatAgent pageType="home" />
      <Footer />
    </div>
  );
}
