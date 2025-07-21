import React from 'react';
import { useRouter } from 'next/router';
import { ArrowLeft, FileText } from 'lucide-react';
import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import ToolsTasksChatAgent from '../src/components/ToolsTasksChatAgent';

export default function TermsAndConditions() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/SignUp');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation />
      
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
            <button
              onClick={handleBack}
              className="flex items-center gap-3 mb-6 px-4 py-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Create Account</span>
            </button>

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

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
            <div className="space-y-8">
              <div className="space-y-6">
                
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    1. Agreement
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    By using ToolNTask, you agree to these terms. If you do not agree, please do not use our platform.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    2. Our Service
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    ToolNTask is a platform for advertisement and promotion of tools and services in Sri Lanka. We connect people who need tools or services with those who can provide them.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
                    <li>Tool and service advertisements</li>
                    <li>Service provider promotion</li>
                    <li>Community-driven platform</li>
                    <li>Local Sri Lankan focus</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    3. User Accounts
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    You must provide accurate information when creating an account. You are responsible for keeping your account secure and for all activities under your account.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    4. User Conduct
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    You agree not to:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
                    <li>Post false or misleading information</li>
                    <li>Use the platform for illegal activities</li>
                    <li>Spam or send unsolicited messages</li>
                    <li>Abuse or harass others</li>
                    <li>Violate intellectual property rights</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    5. Privacy
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    We protect your personal information as described in our Privacy Policy. 
                    We only share information when necessary for platform operation or as required by law.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    6. Limitation of Liability
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    ToolNTask is not responsible for disputes between users. We provide the platform but do not guarantee the quality of tools or services. Use at your own risk.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    7. Account Termination
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    We can suspend or close accounts that violate these terms. 
                    You can close your account anytime through settings.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    8. Changes to Terms
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    We may update these terms. We will notify you of important changes. 
                    Continued use means you accept the new terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    9. Contact Us
                  </h2>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>Email:</strong> toolntask@gmail.com<br/>
                      <strong>Phone:</strong> +94 76 112 0457<br/>
                      <strong>Address:</strong> Colombo, Sri Lanka
                    </p>
                  </div>
                </section>

              </div>
            </div>
          </div>

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
