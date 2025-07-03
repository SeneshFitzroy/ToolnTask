
import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import { Button } from '../src/components/ui/button';

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <div className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 dark:from-gray-700 dark:to-gray-800 px-6 sm:px-8 py-8 sm:py-12">
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl sm:text-3xl font-bold">JS</span>
                </div>
                <div className="text-white text-center sm:text-left">
                  <h1 className="text-2xl sm:text-3xl font-bold">John Silva</h1>
                  <p className="text-orange-300">Member since January 2024</p>
                  <div className="flex items-center justify-center sm:justify-start mt-2">
                    <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                    <span className="ml-2 text-gray-300">4.8 (24 reviews)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                {/* Personal Information */}
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mb-6">Personal Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                      <input
                        type="text"
                        value="John Silva"
                        className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:border-orange-600 focus:outline-none bg-white dark:bg-gray-700 text-slate-800 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value="+94 71 234 5678"
                        className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:border-orange-600 focus:outline-none bg-white dark:bg-gray-700 text-slate-800 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Gender</label>
                      <select className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:border-orange-600 focus:outline-none bg-white dark:bg-gray-700 text-slate-800 dark:text-white">
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Location</label>
                      <input
                        type="text"
                        value="Colombo 03"
                        className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:border-orange-600 focus:outline-none bg-white dark:bg-gray-700 text-slate-800 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Highest Education Level</label>
                      <select className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:border-orange-600 focus:outline-none bg-white dark:bg-gray-700 text-slate-800 dark:text-white">
                        <option>Bachelor&apos;s Degree</option>
                        <option>Master&apos;s Degree</option>
                        <option>High School</option>
                        <option>Diploma</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mb-6">Professional Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Total Years of Experience</label>
                      <input
                        type="number"
                        value="8"
                        className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:border-orange-600 focus:outline-none bg-white dark:bg-gray-700 text-slate-800 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Current Job</label>
                      <input
                        type="text"
                        value="Software Engineer"
                        className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:border-orange-600 focus:outline-none bg-white dark:bg-gray-700 text-slate-800 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Date of Birth</label>
                      <input
                        type="date"
                        value="1990-05-15"
                        className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:border-orange-600 focus:outline-none bg-white dark:bg-gray-700 text-slate-800 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Additional Info</label>
                      <textarea
                        rows={4}
                        placeholder="Tell us more about yourself..."
                        className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:border-orange-600 focus:outline-none bg-white dark:bg-gray-700 text-slate-800 dark:text-white"
                        value="Experienced in web development and home repairs. Available for weekend projects."
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Past Employments */}
              <div className="lg:col-span-2 mt-6 lg:mt-8">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mb-6">Past Employments</h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Senior Developer</h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">2020 - 2024</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">Tech Solutions Ltd.</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Led development team and managed multiple web projects.</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Junior Developer</h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">2018 - 2020</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">Digital Agency</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Developed responsive websites and mobile applications.</p>
                  </div>
                </div>
              </div>

              {/* Activity Stats */}
              <div className="lg:col-span-2 mt-6 lg:mt-8">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mb-6">Activity Stats</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 sm:p-6 text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">12</div>
                    <div className="text-gray-600 dark:text-gray-300">Tasks Completed</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 sm:p-6 text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">5</div>
                    <div className="text-gray-600 dark:text-gray-300">Tools Rented</div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 sm:p-6 text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400 mb-2">4.8</div>
                    <div className="text-gray-600 dark:text-gray-300">Average Rating</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="lg:col-span-2 mt-6 lg:mt-8 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white px-6 sm:px-8 py-3 rounded-xl font-semibold">
                  Save Changes
                </Button>
                <Button className="border-2 border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-600 px-6 sm:px-8 py-3 rounded-xl font-semibold">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
