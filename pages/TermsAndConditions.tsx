import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      {/* Header Section */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-orange-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-4 text-center">Terms & Conditions</h1>
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
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-slate-600 dark:text-gray-300 mb-4">
                By accessing and using ToolnTask, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">2. Platform Description</h2>
              <p className="text-slate-600 dark:text-gray-300 mb-4">
                ToolnTask is a marketplace platform that connects people who need help with tasks or tools with those who can provide such services or rentals.
              </p>
              <ul className="list-disc pl-6 text-slate-600 dark:text-gray-300 space-y-2">
                <li>Task posting and completion services</li>
                <li>Tool rental marketplace</li>
                <li>User verification and safety features</li>
                <li>Payment processing and dispute resolution</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">3. User Responsibilities</h2>
              <p className="text-slate-600 dark:text-gray-300 mb-4">
                As a user of ToolnTask, you agree to:
              </p>
              <ul className="list-disc pl-6 text-slate-600 dark:text-gray-300 space-y-2">
                <li>Provide accurate and truthful information</li>
                <li>Complete tasks and rentals as agreed</li>
                <li>Treat other users with respect and professionalism</li>
                <li>Follow all applicable laws and regulations</li>
                <li>Maintain the confidentiality of your account</li>
                <li>Report any suspicious or inappropriate behavior</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">4. Prohibited Activities</h2>
              <p className="text-slate-600 dark:text-gray-300 mb-4">
                The following activities are strictly prohibited on our platform:
              </p>
              <ul className="list-disc pl-6 text-slate-600 dark:text-gray-300 space-y-2">
                <li>Posting false, misleading, or fraudulent content</li>
                <li>Harassment, discrimination, or abusive behavior</li>
                <li>Illegal activities or services</li>
                <li>Circumventing platform fees or payments</li>
                <li>Spamming or unauthorized advertising</li>
                <li>Sharing personal contact information in public posts</li>
              </ul>
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
