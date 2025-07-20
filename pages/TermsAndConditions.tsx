import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { ArrowLeft, CheckCircle, Shield, FileText } from 'lucide-react';
import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import ToolsTasksChatAgent from '../src/components/ToolsTasksChatAgent';

export default function TermsAndConditions() {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const router = useRouter();

  const handleBack = () => {
    router.push('/SignUp');
  };

  const handleAccept = () => {
    if (acceptedTerms) {
      // Return to signup with terms accepted
      router.push('/SignUp?termsAccepted=true');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation />
      
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Professional Header Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
            {/* Back Button */}
            <button
              onClick={handleBack}
              className="flex items-center gap-3 mb-6 px-4 py-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Create Account</span>
            </button>

            {/* Header */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-gradient-to-r from-orange-500 to-blue-600 rounded-full">
                  <FileText className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Terms of Service
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
                ToolNTask Platform Agreement
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Last updated: July 21, 2025 | Version 2.0
              </p>
            </div>
          </div>

          {/* Professional Terms Content */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
            <div className="space-y-8">
              
              {/* Key Points Overview */}
              <div className="bg-gradient-to-r from-blue-50 to-orange-50 dark:from-blue-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-blue-600" />
                  Key Points Summary
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-700 dark:text-gray-300">✓ Professional marketplace platform</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">✓ Secure payment processing</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">✓ Quality service standards</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-700 dark:text-gray-300">✓ User safety and protection</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">✓ Fair dispute resolution</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">✓ Sri Lankan legal compliance</p>
                  </div>
                </div>
              </div>

              {/* Terms Sections */}
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
                  6. What is Not Allowed
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
                  We provide the platform to connect users. We are not responsible for the quality of work, 
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
                  We may update these terms. We will notify you of important changes. 
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

          {/* Agreement Section at Bottom */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-8">
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
            
            {acceptedTerms && (
              <div className="mt-4 flex gap-3">
                <button
                  onClick={handleBack}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Back to Sign Up
                </button>
                <button
                  onClick={handleAccept}
                  className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Continue with Registration
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      <ToolsTasksChatAgent pageType="home" />
      <Footer />
    </div>
  );
}
