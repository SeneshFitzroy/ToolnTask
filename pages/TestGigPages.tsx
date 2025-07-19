import Link from 'next/link';
import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export default function TestGigPages() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const testPages = [
    { type: 'task', id: '1', title: 'Sample Task 1' },
    { type: 'task', id: '2', title: 'Sample Task 2' },
    { type: 'task', id: 'garden-maintenance', title: 'Garden Maintenance' },
    { type: 'tool', id: '1', title: 'Sample Tool 1' },
    { type: 'tool', id: '2', title: 'Sample Tool 2' },
    { type: 'tool', id: 'drill-set', title: 'Professional Drill Set' },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F8FAFC' }}>
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1F2937' }}>
          Test Gig Detail Pages
        </h1>
        
        <div className="mb-8 p-6 rounded-xl border" style={{
          backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
          borderColor: theme === 'dark' ? '#374151' : '#E5E7EB'
        }}>
          <h2 className="text-xl font-bold mb-4" style={{ color: '#FF5E14' }}>
            🎉 Enhanced Features Implemented!
          </h2>
          <ul className="space-y-2 text-sm" style={{ color: theme === 'dark' ? '#D1D5DB' : '#4B5563' }}>
            <li>✅ Save/Share functionality with Firebase integration</li>
            <li>✅ Professional image galleries with thumbnails</li>
            <li>✅ Social media sharing (Facebook, Twitter, LinkedIn, WhatsApp)</li>
            <li>✅ Enhanced profile page with saved items display</li>
            <li>✅ Automatic detail page generation for new gigs</li>
            <li>✅ Responsive design with dark/light theme support</li>
            <li>✅ Analytics tracking for views and interactions</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testPages.map((page) => (
            <Link 
              key={`${page.type}-${page.id}`}
              href={`/${page.type}s/${page.id}_enhanced`}
              className="block group"
            >
              <div className="p-6 rounded-xl border transition-all duration-200 hover:scale-105 hover:shadow-lg" style={{
                backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                borderColor: theme === 'dark' ? '#374151' : '#E5E7EB'
              }}>
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    page.type === 'task' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {page.type.toUpperCase()}
                  </span>
                  <span className="text-sm" style={{ color: theme === 'dark' ? '#9CA3AF' : '#6B7280' }}>
                    ID: {page.id}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold mb-2 group-hover:text-orange-500 transition-colors" 
                    style={{ color: theme === 'dark' ? '#FFFFFF' : '#1F2937' }}>
                  {page.title}
                </h3>
                
                <p className="text-sm" style={{ color: theme === 'dark' ? '#9CA3AF' : '#6B7280' }}>
                  Click to test the enhanced {page.type} detail page with save/share functionality
                </p>
                
                <div className="mt-3 flex items-center gap-2 text-xs" style={{ color: '#FF5E14' }}>
                  <span>Test Enhanced Page →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 p-6 rounded-xl border" style={{
          backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
          borderColor: theme === 'dark' ? '#374151' : '#E5E7EB'
        }}>
          <h2 className="text-xl font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1F2937' }}>
            Navigation Links
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/Tasks" className="text-center p-3 rounded-lg hover:bg-opacity-80 transition-colors" 
                  style={{ backgroundColor: '#FF5E14', color: '#FFFFFF' }}>
              Browse Tasks
            </Link>
            <Link href="/Tools" className="text-center p-3 rounded-lg hover:bg-opacity-80 transition-colors" 
                  style={{ backgroundColor: '#FF5E14', color: '#FFFFFF' }}>
              Browse Tools
            </Link>
            <Link href="/ProfileEnhanced" className="text-center p-3 rounded-lg hover:bg-opacity-80 transition-colors" 
                  style={{ backgroundColor: theme === 'dark' ? '#374151' : '#F3F4F6', color: theme === 'dark' ? '#E5E7EB' : '#374151' }}>
              Enhanced Profile
            </Link>
            <Link href="/CreateTask" className="text-center p-3 rounded-lg hover:bg-opacity-80 transition-colors" 
                  style={{ backgroundColor: theme === 'dark' ? '#374151' : '#F3F4F6', color: theme === 'dark' ? '#E5E7EB' : '#374151' }}>
              Create Task
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
