import Link from 'next/link'
import Navigation from '../src/components/Navigation'
import Footer from '../src/components/Footer'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="flex items-center justify-center py-32">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-slate-800 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-slate-600 mb-6">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link 
            href="/"
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
