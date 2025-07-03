import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      {/* Header Section */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-orange-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-4 text-center">Privacy Policy</h1>
          <p className="text-lg text-slate-600 dark:text-gray-400 text-center">
            Last updated: July 3, 2025
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 sm:p-12">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">1. Information We Collect</h2>
              <p className="text-slate-600 dark:text-gray-300 mb-4">
                We collect information you provide directly to us, such as when you create an account, post a task, rent a tool, or contact us.
              </p>
              <ul className="list-disc pl-6 text-slate-600 dark:text-gray-300 space-y-2">
                <li>Personal information (name, email, phone number)</li>
                <li>Profile information and preferences</li>
                <li>Task and tool listings</li>
                <li>Communication records</li>
                <li>Payment information (processed securely)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">2. How We Use Your Information</h2>
              <p className="text-slate-600 dark:text-gray-300 mb-4">
                We use the information we collect to provide, maintain, and improve our services:
              </p>
              <ul className="list-disc pl-6 text-slate-600 dark:text-gray-300 space-y-2">
                <li>To facilitate connections between users</li>
                <li>To process payments and transactions</li>
                <li>To send you important updates and notifications</li>
                <li>To improve our platform and user experience</li>
                <li>To prevent fraud and ensure platform safety</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">3. Information Sharing</h2>
              <p className="text-slate-600 dark:text-gray-300 mb-4">
                We do not sell, rent, or share your personal information with third parties except in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-slate-600 dark:text-gray-300 space-y-2">
                <li>With your explicit consent</li>
                <li>To complete transactions you initiate</li>
                <li>To comply with legal requirements</li>
                <li>To protect our rights and prevent fraud</li>
                <li>With service providers who assist in our operations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">4. Data Security</h2>
              <p className="text-slate-600 dark:text-gray-300 mb-4">
                We implement appropriate technical and organizational measures to protect your personal information:
              </p>
              <ul className="list-disc pl-6 text-slate-600 dark:text-gray-300 space-y-2">
                <li>Encryption of sensitive data</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication</li>
                <li>Secure payment processing</li>
                <li>Regular backup and recovery procedures</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">5. Your Rights</h2>
              <p className="text-slate-600 dark:text-gray-300 mb-4">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 text-slate-600 dark:text-gray-300 space-y-2">
                <li>Access and review your personal data</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Delete your account and associated data</li>
                <li>Withdraw consent for data processing</li>
                <li>Request data portability</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">6. Cookies and Tracking</h2>
              <p className="text-slate-600 dark:text-gray-300 mb-4">
                We use cookies and similar technologies to enhance your experience and analyze platform usage. You can manage your cookie preferences through your browser settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">7. Updates to This Policy</h2>
              <p className="text-slate-600 dark:text-gray-300 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our website and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">8. Contact Us</h2>
              <p className="text-slate-600 dark:text-gray-300 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mt-4">
                <p className="text-slate-600 dark:text-gray-300">
                  <strong>Email:</strong> privacy@toolntask.com<br/>
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
