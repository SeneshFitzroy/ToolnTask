import { useState } from 'react';
import { useTheme } from 'next-themes';
import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import { Button } from '../src/components/ui/button';
import Link from 'next/link';

interface AdSpace {
  id: string;
  title: string;
  description: string;
  dimensions: string;
  location: string;
  price: string;
  features: string[];
  category: 'premium' | 'standard' | 'basic';
  isAvailable: boolean;
  previewImage: string;
}

const adSpaces: AdSpace[] = [
  {
    id: '1',
    title: 'Top Banner - Premium Placement',
    description: 'High-impact banner displayed at the top of every page, perfect for brand awareness campaigns',
    dimensions: '1200 x 400 px',
    location: 'All pages - Top section',
    price: 'Rs. 50,000/month',
    features: [
      'Maximum visibility across all pages',
      'Auto-rotating carousel for multiple ads',
      'Click tracking and analytics',
      'Mobile responsive design',
      'Priority placement guarantee'
    ],
    category: 'premium',
    isAvailable: true,
    previewImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=400&fit=crop'
  },
  {
    id: '2',
    title: 'Sidebar Right - Premium Display',
    description: 'Sticky sidebar placement for consistent visibility while users browse',
    dimensions: '300 x 600 px',
    location: 'All pages - Right sidebar',
    price: 'Rs. 35,000/month',
    features: [
      'Sticky positioning for maximum views',
      'Desktop and tablet visibility',
      'Auto-refresh every 30 seconds',
      'Hover effects and animations',
      'Target specific page categories'
    ],
    category: 'premium',
    isAvailable: true,
    previewImage: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&h=600&fit=crop'
  },
  {
    id: '3',
    title: 'Inline Content - Standard Placement',
    description: 'Integrated within content feed for natural user engagement',
    dimensions: '800 x 300 px',
    location: 'Home page - Between content sections',
    price: 'Rs. 25,000/month',
    features: [
      'Native content integration',
      'High engagement rates',
      'Mobile optimized layout',
      'Blend with organic content',
      'A/B testing capabilities'
    ],
    category: 'standard',
    isAvailable: true,
    previewImage: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&h=300&fit=crop'
  },
  {
    id: '4',
    title: 'Detail Page - Left Sidebar',
    description: 'Targeted placement on tool and task detail pages',
    dimensions: '280 x 480 px',
    location: 'Detail pages - Left sidebar',
    price: 'Rs. 20,000/month',
    features: [
      'Contextual targeting',
      'Smart timing display',
      'Category-specific placement',
      'High conversion rates',
      'Expandable information panel'
    ],
    category: 'standard',
    isAvailable: true,
    previewImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=280&h=480&fit=crop'
  },
  {
    id: '5',
    title: 'Footer Banner - Basic Placement',
    description: 'Cost-effective placement in footer section',
    dimensions: '728 x 90 px',
    location: 'All pages - Footer section',
    price: 'Rs. 10,000/month',
    features: [
      'Budget-friendly option',
      'Consistent cross-page presence',
      'Simple banner format',
      'Basic click tracking',
      'Quick setup and deployment'
    ],
    category: 'basic',
    isAvailable: true,
    previewImage: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=728&h=90&fit=crop'
  },
  {
    id: '6',
    title: 'Mobile Banner - Mobile Exclusive',
    description: 'Mobile-only banner for smartphone users',
    dimensions: '320 x 100 px',
    location: 'Mobile pages - Top/Bottom',
    price: 'Rs. 15,000/month',
    features: [
      'Mobile-specific targeting',
      'Touch-optimized design',
      'Fast loading times',
      'Swipe-friendly placement',
      'Mobile analytics dashboard'
    ],
    category: 'standard',
    isAvailable: false,
    previewImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=320&h=100&fit=crop'
  }
];

export default function Ads() {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'premium' | 'standard' | 'basic'>('all');

  const filteredSpaces = adSpaces.filter(space => 
    selectedCategory === 'all' || space.category === selectedCategory
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'premium':
        return '#FF5E14';
      case 'standard':
        return '#001554';
      case 'basic':
        return '#6B7280';
      default:
        return '#6B7280';
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F2F3F5' }}>
      <Navigation />
      
      {/* Hero Section */}
      <div className="py-16 sm:py-20" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F2F3F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
              Advertise with ToolnTask
            </h1>
            <p className="text-lg sm:text-xl mb-8 max-w-3xl mx-auto" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
              Reach thousands of active users looking for tools and services. Choose from our premium ad placements 
              to maximize your brand visibility and drive conversions.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>5,000+ Monthly Active Users</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>High Engagement Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>Targeted Audience</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="py-8" style={{ backgroundColor: theme === 'dark' ? '#111111' : '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { key: 'all', label: 'All Placements' },
              { key: 'premium', label: 'Premium' },
              { key: 'standard', label: 'Standard' },
              { key: 'basic', label: 'Basic' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key as any)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === key
                    ? 'shadow-lg transform scale-105'
                    : 'hover:scale-105'
                }`}
                style={{
                  backgroundColor: selectedCategory === key ? '#FF5E14' : 'transparent',
                  color: selectedCategory === key ? '#FFFFFF' : (theme === 'dark' ? '#CCCCCC' : '#374151'),
                  border: selectedCategory === key ? 'none' : `1px solid ${theme === 'dark' ? '#374151' : '#D1D5DB'}`
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Ad Spaces Grid */}
      <div className="py-12" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F2F3F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSpaces.map((space) => (
              <div
                key={space.id}
                className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 overflow-hidden group hover:shadow-2xl transition-all duration-300 ${
                  !space.isAvailable ? 'opacity-75' : 'hover:scale-105'
                }`}
                style={{ 
                  borderColor: getCategoryColor(space.category),
                  borderWidth: '2px'
                }}
              >
                {/* Preview Image */}
                <div className="relative h-48 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"
                    style={{
                      backgroundImage: `url(${space.previewImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  
                  {/* Category Badge */}
                  <div 
                    className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: getCategoryColor(space.category) }}
                  >
                    {space.category.toUpperCase()}
                  </div>
                  
                  {/* Availability Badge */}
                  <div 
                    className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${
                      space.isAvailable 
                        ? 'bg-green-500 text-white' 
                        : 'bg-red-500 text-white'
                    }`}
                  >
                    {space.isAvailable ? 'Available' : 'Sold Out'}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1F2937' }}>
                    {space.title}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: theme === 'dark' ? '#D1D5DB' : '#6B7280' }}>
                    {space.description}
                  </p>
                  
                  {/* Specs */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium" style={{ color: theme === 'dark' ? '#CCCCCC' : '#374151' }}>
                        Dimensions:
                      </span>
                      <span className="text-sm" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1F2937' }}>
                        {space.dimensions}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium" style={{ color: theme === 'dark' ? '#CCCCCC' : '#374151' }}>
                        Location:
                      </span>
                      <span className="text-sm" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1F2937' }}>
                        {space.location}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#CCCCCC' : '#374151' }}>
                      Features:
                    </h4>
                    <ul className="space-y-1">
                      {space.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="text-xs flex items-center" style={{ color: theme === 'dark' ? '#D1D5DB' : '#6B7280' }}>
                          <span className="w-1 h-1 bg-orange-500 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold" style={{ color: '#FF5E14' }}>
                      {space.price}
                    </span>
                    <span className="text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                      + setup fee
                    </span>
                  </div>

                  {/* Action Button */}
                  <Link href={`/contact?ad=${space.id}`}>
                    <Button
                      className={`w-full py-3 rounded-lg font-bold transition-all duration-300 ${
                        space.isAvailable
                          ? 'hover:scale-105 shadow-lg hover:shadow-xl'
                          : 'cursor-not-allowed opacity-50'
                      }`}
                      style={{
                        backgroundColor: space.isAvailable ? '#FF5E14' : '#6B7280',
                        color: '#FFFFFF'
                      }}
                      disabled={!space.isAvailable}
                    >
                      {space.isAvailable ? 'Get Started' : 'Sold Out'}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16" style={{ backgroundColor: theme === 'dark' ? '#111111' : '#FFFFFF' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1F2937' }}>
            Ready to Advertise?
          </h2>
          <p className="text-lg mb-8" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
            Contact our advertising team to discuss custom packages and get started with your campaign.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                className="px-8 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                style={{
                  backgroundColor: '#FF5E14',
                  color: '#FFFFFF'
                }}
              >
                Contact Sales Team
              </Button>
            </Link>
            <Link href="mailto:ads@toolntask.com">
              <Button
                className="px-8 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: 'transparent',
                  color: theme === 'dark' ? '#FFFFFF' : '#1F2937',
                  border: `2px solid ${theme === 'dark' ? '#FFFFFF' : '#1F2937'}`
                }}
              >
                Email Us Directly
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
