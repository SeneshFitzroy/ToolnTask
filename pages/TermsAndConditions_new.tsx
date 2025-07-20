import React, { useState } from 'react';
import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import ToolsTasksChatAgent from '../src/components/ToolsTasksChatAgent';

export default function TermsAndConditions() {
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <div className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Last updated: July 21, 2025
            </p>
          </div>

          {/* Acceptance */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="accept-terms"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="w-4 h-4 text-orange-600 focus:ring-orange-500"
              />
              <label htmlFor="accept-terms" className="text-gray-700 dark:text-gray-300">
                I agree to these Terms of Service
              </label>
              {acceptedTerms && (
                <span className="text-green-600 ml-auto">✓</span>
              )}
            </div>
          </div>

          {/* Simple Terms Content */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8">
            <div className="space-y-6">
              
              {/* 1. Agreement */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  1. Agreement
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  By using ToolNTask, you agree to these terms. If you do not agree, please do not use our platform.
                </p>
              </section>

              {/* 2. Our Service */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  2. Our Service
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  ToolNTask connects people who need tasks done with skilled service providers in Sri Lanka.
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Post and find tasks</li>
                  <li>Connect with professionals</li>
                  <li>Secure payments</li>
                  <li>Quality assurance</li>
                </ul>
              </section>

              {/* 3. User Responsibilities */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  3. User Responsibilities
                </h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Provide accurate information</li>
                  <li>Be respectful to other users</li>
                  <li>Complete tasks as agreed</li>
                  <li>Follow Sri Lankan laws</li>
                  <li>Pay for services rendered</li>
                </ul>
              </section>

              {/* 4. Payments */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  4. Payments
                </h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                  <li>All fees are clearly shown before booking</li>
                  <li>Payments are held securely until task completion</li>
                  <li>Platform takes a small service fee</li>
                  <li>Refunds follow our refund policy</li>
                </ul>
              </section>

              {/* 5. Safety */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  5. Safety
                </h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Verify credentials before hiring</li>
                  <li>Meet in safe, public places when needed</li>
                  <li>Report any safety concerns</li>
                  <li>Use your best judgment</li>
                </ul>
              </section>

              {/* 6. Prohibited Activities */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  6. What's Not Allowed
                </h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Illegal activities</li>
                  <li>Harassment or abuse</li>
                  <li>Fraud or scams</li>
                  <li>Spam or fake accounts</li>
                  <li>Bypassing our payment system</li>
                </ul>
              </section>

              {/* 7. Liability */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  7. Our Liability
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  We provide the platform to connect users. We're not responsible for the quality of work, 
                  safety issues, or disputes between users. Use the platform at your own risk.
                </p>
              </section>

              {/* 8. Account Termination */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  8. Account Termination
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  We can suspend or close accounts that violate these terms. 
                  You can close your account anytime through settings.
                </p>
              </section>

              {/* 9. Changes */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  9. Changes to Terms
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  We may update these terms. We'll notify you of important changes. 
                  Continued use means you accept the new terms.
                </p>
              </section>

              {/* 10. Contact */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  10. Contact Us
                </h2>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Email:</strong> support@toolntask.com<br/>
                    <strong>Phone:</strong> +94 76 112 0457<br/>
                    <strong>Address:</strong> Colombo, Sri Lanka
                  </p>
                </div>
              </section>

            </div>
          </div>

          {/* Governing Law */}
          <div className="text-center mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              These terms are governed by the laws of Sri Lanka. 
              Disputes will be resolved in Sri Lankan courts.
            </p>
          </div>

        </div>
      </div>

      <ToolsTasksChatAgent pageType="home" />
      <Footer />
    </div>
  );
}
