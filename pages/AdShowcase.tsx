import React from 'react';
import { GetStaticProps } from 'next';
import { useTheme } from 'next-themes';
import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import HorizontalAdBanner from '../src/components/HorizontalAdBanner';
import { ExternalLink, Briefcase, Wrench, Users, ArrowRight, CheckCircle } from 'lucide-react';

const AdShowcasePage = () => {
  const { theme } = useTheme();

  const adFeatures = [
    'Responsive design that adapts to all screen sizes',
    'Clean, professional layout with hover animations',
    'Support for external links and click tracking',
    'Category-based organization (Jobs, Tools, Services)',
    'Mobile-optimized touch interactions',
    'Dark/light theme compatibility'
  ];

  const adSpecs = [
    {
      title: 'Desktop Layout',
      description: 'Horizontal 3-column layout on large screens',
      size: '15px padding, flexbox alignment'
    },
    {
      title: 'Mobile Layout', 
      description: 'Stacked vertical layout on mobile devices',
      size: 'Responsive grid system'
    },
    {
      title: 'Content Areas',
      description: 'Title, description, company branding, CTA button',
      size: 'Structured content hierarchy'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: theme === 'dark' ? '#0f0f0f' : '#FFFFFF' }}>
      <Navigation />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 
              className="text-4xl font-bold mb-4"
              style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}
            >
              External Partner Advertising
            </h1>
            <p 
              className="text-lg max-w-3xl mx-auto mb-8"
              style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}
            >
              Responsive horizontal ad banner component designed for external organizations 
              to showcase their services, job opportunities, and products on ToolNTask.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div 
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: theme === 'dark' ? '#1a1a1a' : '#f8f9fa',
                  border: `1px solid ${theme === 'dark' ? '#2a2a2a' : '#e5e7eb'}`
                }}
              >
                <div className="text-2xl font-bold" style={{ color: '#FF5E14' }}>3</div>
                <div className="text-sm" style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
                  Ad Slots
                </div>
              </div>
              <div 
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: theme === 'dark' ? '#1a1a1a' : '#f8f9fa',
                  border: `1px solid ${theme === 'dark' ? '#2a2a2a' : '#e5e7eb'}`
                }}
              >
                <div className="text-2xl font-bold" style={{ color: '#FF5E14' }}>100%</div>
                <div className="text-sm" style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
                  Responsive
                </div>
              </div>
              <div 
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: theme === 'dark' ? '#1a1a1a' : '#f8f9fa',
                  border: `1px solid ${theme === 'dark' ? '#2a2a2a' : '#e5e7eb'}`
                }}
              >
                <div className="text-2xl font-bold" style={{ color: '#FF5E14' }}>15px</div>
                <div className="text-sm" style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
                  Padding
                </div>
              </div>
            </div>
          </div>

          {/* Live Demo */}
          <div className="mb-16">
            <h2 
              className="text-2xl font-semibold mb-6 text-center"
              style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}
            >
              Live Demo
            </h2>
            <div 
              className="p-6 rounded-xl mb-6"
              style={{
                backgroundColor: theme === 'dark' ? '#111111' : '#f8f9fa',
                border: `2px dashed ${theme === 'dark' ? '#374151' : '#d1d5db'}`
              }}
            >
              <HorizontalAdBanner />
            </div>
            <p 
              className="text-center text-sm"
              style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}
            >
              👆 This is how your banner will appear on ToolNTask
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Features List */}
            <div>
              <h3 
                className="text-xl font-semibold mb-6"
                style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}
              >
                Key Features
              </h3>
              <div className="space-y-4">
                {adFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle 
                      className="h-5 w-5 flex-shrink-0 mt-0.5" 
                      style={{ color: '#10b981' }}
                    />
                    <span 
                      className="text-sm"
                      style={{ color: theme === 'dark' ? '#e5e7eb' : '#374151' }}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Specs */}
            <div>
              <h3 
                className="text-xl font-semibold mb-6"
                style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}
              >
                Technical Specifications
              </h3>
              <div className="space-y-4">
                {adSpecs.map((spec, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-lg"
                    style={{
                      backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
                      border: `1px solid ${theme === 'dark' ? '#2a2a2a' : '#e5e7eb'}`
                    }}
                  >
                    <h4 
                      className="font-medium text-sm mb-2"
                      style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}
                    >
                      {spec.title}
                    </h4>
                    <p 
                      className="text-xs mb-2"
                      style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}
                    >
                      {spec.description}
                    </p>
                    <span 
                      className="text-xs px-2 py-1 rounded"
                      style={{ 
                        backgroundColor: '#FF5E14',
                        color: '#ffffff'
                      }}
                    >
                      {spec.size}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Categories Section */}
          <div className="mb-16">
            <h3 
              className="text-xl font-semibold mb-6 text-center"
              style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}
            >
              Supported Categories
            </h3>
            <div className="grid sm:grid-cols-3 gap-6">
              <div 
                className="text-center p-6 rounded-xl"
                style={{
                  backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
                  border: `1px solid ${theme === 'dark' ? '#2a2a2a' : '#e5e7eb'}`
                }}
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#3b82f6' }}>
                  <Briefcase className="h-6 w-6 text-white" />
                </div>
                <h4 
                  className="font-semibold mb-2"
                  style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}
                >
                  Job Opportunities
                </h4>
                <p 
                  className="text-sm"
                  style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}
                >
                  Career platforms, recruitment agencies, job boards
                </p>
              </div>

              <div 
                className="text-center p-6 rounded-xl"
                style={{
                  backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
                  border: `1px solid ${theme === 'dark' ? '#2a2a2a' : '#e5e7eb'}`
                }}
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#f59e0b' }}>
                  <Wrench className="h-6 w-6 text-white" />
                </div>
                <h4 
                  className="font-semibold mb-2"
                  style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}
                >
                  Tool Vendors
                </h4>
                <p 
                  className="text-sm"
                  style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}
                >
                  Equipment rentals, tool suppliers, hardware stores
                </p>
              </div>

              <div 
                className="text-center p-6 rounded-xl"
                style={{
                  backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
                  border: `1px solid ${theme === 'dark' ? '#2a2a2a' : '#e5e7eb'}`
                }}
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#10b981' }}>
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h4 
                  className="font-semibold mb-2"
                  style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}
                >
                  Services
                </h4>
                <p 
                  className="text-sm"
                  style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}
                >
                  Training providers, insurance, business services
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div 
              className="max-w-4xl mx-auto p-8 rounded-xl"
              style={{
                backgroundColor: theme === 'dark' ? '#1a1a1a' : '#f8f9fa',
                border: `1px solid ${theme === 'dark' ? '#2a2a2a' : '#e5e7eb'}`
              }}
            >
              <h3 
                className="text-2xl font-semibold mb-4"
                style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}
              >
                Partner with ToolNTask
              </h3>
              <p 
                className="text-lg mb-6"
                style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}
              >
                Reach thousands of professionals, contractors, and skilled workers across Sri Lanka. 
                Our responsive ad banner ensures your message looks great on all devices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  className="px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: '#FF5E14',
                    color: '#ffffff'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FF4A00';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FF5E14';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Start Advertising
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  className="px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: 'transparent',
                    color: theme === 'dark' ? '#e5e7eb' : '#374151',
                    border: `2px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#FF5E14';
                    e.currentTarget.style.color = '#FF5E14';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = theme === 'dark' ? '#374151' : '#e5e7eb';
                    e.currentTarget.style.color = theme === 'dark' ? '#e5e7eb' : '#374151';
                  }}
                >
                  View Pricing
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default AdShowcasePage;
