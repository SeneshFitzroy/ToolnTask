
import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import { Button } from '../src/components/ui/button';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <div className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white mb-4">Get in Touch</h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
              We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mb-6">Send us a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:border-orange-600 focus:outline-none bg-white dark:bg-gray-700 text-slate-800 dark:text-white"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:border-orange-600 focus:outline-none bg-white dark:bg-gray-700 text-slate-800 dark:text-white"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:border-orange-600 focus:outline-none bg-white dark:bg-gray-700 text-slate-800 dark:text-white"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:border-orange-600 focus:outline-none bg-white dark:bg-gray-700 text-slate-800 dark:text-white"
                    placeholder="+94 71 234 5678"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:border-orange-600 focus:outline-none bg-white dark:bg-gray-700 text-slate-800 dark:text-white"
                    placeholder="How can we help you?"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Message</label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:border-orange-600 focus:outline-none bg-white dark:bg-gray-700 text-slate-800 dark:text-white"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>
                
                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-6 sm:space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-orange-600 dark:text-orange-400 text-xl">📍</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 dark:text-white">Address</h3>
                      <p className="text-gray-600 dark:text-gray-300">123, Galle Road, Colombo 03, Sri Lanka</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-orange-600 dark:text-orange-400 text-xl">📞</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 dark:text-white">Phone</h3>
                      <p className="text-gray-600 dark:text-gray-300">+94 11 123 4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-orange-600 dark:text-orange-400 text-xl">✉️</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 dark:text-white">Email</h3>
                      <p className="text-gray-600 dark:text-gray-300">info@toolntask.lk</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-orange-600 dark:text-orange-400 text-xl">🕒</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 dark:text-white">Business Hours</h3>
                      <p className="text-gray-600 dark:text-gray-300">Mon - Fri: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-600 dark:text-gray-300">Sat: 9:00 AM - 2:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-white mb-2">How do I start using ToolNTask?</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Simply create an account and start browsing available tasks or tools in your area.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-white mb-2">Is there a service fee?</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">We charge a small service fee to maintain the platform and ensure quality service.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-white mb-2">How are payments handled?</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">All payments are processed securely through our platform for your protection.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
