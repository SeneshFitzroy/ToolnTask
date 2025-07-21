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
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 ml-4">
                    <li>Task posting and completion</li>
                    <li>Tool and equipment sharing</li>
                    <li>Secure payment processing</li>
                    <li>Quality assurance</li>
                  </ul>
                </section>

                {/* 3. User Responsibilities */}
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    3. Your Responsibilities
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Users must:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 ml-4">
                    <li>Provide accurate information</li>
                    <li>Complete tasks as agreed</li>
                    <li>Pay for services on time</li>
                    <li>Treat others with respect</li>
                    <li>Follow all applicable laws</li>
                  </ul>
                </section>

                {/* 4. Prohibited Activities */}
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    4. Prohibited Activities
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    You may not:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 ml-4">
                    <li>Post illegal or harmful content</li>
                    <li>Scam or defraud other users</li>
                    <li>Share false information</li>
                    <li>Abuse or harass others</li>
                    <li>Violate intellectual property rights</li>
                  </ul>
                </section>

                </section>

                {/* 5. Privacy */}
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    5. Privacy
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    We protect your personal information as described in our Privacy Policy. 
                    We only share information when necessary for platform operation or as required by law.
                  </p>
                </section>

                {/* 6. Limitation of Liability */}
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    6. Limitation of Liability</h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    ToolNTask is a platform connecting users. We are not responsible for the quality, 
                    safety, or completion of tasks. Our liability is limited to the maximum extent allowed by law.
                  </p>
                </section>

                {/* 7. Account Termination */}
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    7. Account Termination
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    We can suspend or close accounts that violate these terms. 
                    You can close your account anytime through settings.
                  </p>
                </section>

                {/* 8. Changes */}
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    8. Changes to Terms
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    We may update these terms. We will notify you of important changes. 
                    Continued use means you accept the new terms.
                  </p>
                </section>

                {/* 9. Contact */}
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    9. Contact Us
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
          </div>

          {/* Governing Law */}
          <div className="text-center mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              These terms are governed by the laws of Sri Lanka. 
              Disputes will be resolved in Sri Lankan courts.
            </p>
          </div>

          {/* Professional Agreement Section */}
          <div className="bg-gradient-to-r from-white to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-xl border border-blue-200 dark:border-blue-800 p-8 mt-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-blue-600 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Agreement Confirmation
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Please confirm your acceptance to continue with registration
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 p-6">
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  id="accept-terms"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="w-5 h-5 text-orange-600 focus:ring-orange-500 mt-1 rounded"
                />
                <div className="flex-1">
                  <label htmlFor="accept-terms" className="text-lg font-medium text-gray-900 dark:text-white cursor-pointer">
                    I acknowledge and agree to these Terms of Service
                  </label>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    By checking this box, you confirm that you have read, understood, and agree to be bound by these terms and conditions.
                  </p>
                </div>
                {acceptedTerms && (
                  <div className="flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                )}
              </div>
            </div>
            
            {acceptedTerms && (
              <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleBack}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-medium flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Sign Up
                  </button>
                  <button
                    onClick={handleAccept}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-600 to-blue-600 text-white rounded-xl hover:from-orange-700 hover:to-blue-700 transition-all duration-200 font-medium flex items-center justify-center gap-2 shadow-lg"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Continue with Registration
                  </button>
                </div>
                <p className="text-center text-sm text-green-700 dark:text-green-300 mt-3">
                  ✓ Terms accepted successfully. You can now complete your registration.
                </p>
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
