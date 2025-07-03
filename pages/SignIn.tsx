
import Navigation from '../src/components/Navigation';
import { Button } from '../src/components/ui/button';
import Link from 'next/link';

export default function SignIn() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <div className="flex items-center justify-center py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 sm:p-8">
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white mb-2">Welcome Back!</h1>
              <p className="text-gray-600 dark:text-gray-300">Sign in to your ToolNTask account</p>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:border-orange-600 focus:outline-none bg-white dark:bg-gray-700 text-slate-800 dark:text-white"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:border-orange-600 focus:outline-none bg-white dark:bg-gray-700 text-slate-800 dark:text-white"
                  placeholder="Enter your password"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600 text-orange-600 focus:ring-orange-600 dark:bg-gray-700" />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">Remember me</span>
                </label>
                <Link href="#" className="text-sm text-orange-600 hover:text-orange-700">
                  Forgot password?
                </Link>
              </div>
              
              <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl">
                Sign In
              </Button>
            </form>

            <div className="mt-6 sm:mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-300">
                Don&apos;t have an account?{' '}
                <Link href="/SignUp" className="text-orange-600 hover:text-orange-700 font-semibold">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
