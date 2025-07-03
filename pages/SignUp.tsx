
import Navigation from '../src/components/Navigation';
import { Button } from '../src/components/ui/button';
import Link from 'next/link';

export default function SignUp() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <div className="flex items-center justify-center py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 sm:p-8">
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white mb-2">Join ToolNTask</h1>
              <p className="text-gray-600 dark:text-gray-300">Create your account to get started</p>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
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
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:border-orange-600 focus:outline-none bg-white dark:bg-gray-700 text-slate-800 dark:text-white"
                  placeholder="+94 71 234 5678"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:border-orange-600 focus:outline-none bg-white dark:bg-gray-700 text-slate-800 dark:text-white"
                  placeholder="Create a strong password"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Confirm Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:border-orange-600 focus:outline-none bg-white dark:bg-gray-700 text-slate-800 dark:text-white"
                  placeholder="Confirm your password"
                />
              </div>
              
              <div className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600 text-orange-600 focus:ring-orange-600 dark:bg-gray-700" />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                  I agree to the{' '}
                  <Link href="#" className="text-orange-600 hover:text-orange-700">Terms of Service</Link>
                  {' '}and{' '}
                  <Link href="#" className="text-orange-600 hover:text-orange-700">Privacy Policy</Link>
                </span>
              </div>
              
              <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl">
                Create Account
              </Button>
            </form>

            <div className="mt-6 sm:mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-300">
                Already have an account?{' '}
                <Link href="/SignIn" className="text-orange-600 hover:text-orange-700 font-semibold">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
