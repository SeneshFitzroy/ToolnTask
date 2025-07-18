import React from 'react';
import { useTheme } from 'next-themes';
import { ExternalLink, Briefcase, Wrench, Users } from 'lucide-react';

interface AdSlot {
  id: string;
  title: string;
  description: string;
  company: string;
  image: string;
  link: string;
  category: 'jobs' | 'tools' | 'services';
  isSponsored?: boolean;
}

interface HorizontalAdBannerProps {
  className?: string;
  showTitle?: boolean;
}

const HorizontalAdBanner: React.FC<HorizontalAdBannerProps> = ({ 
  className = '',
  showTitle = true 
}) => {
  const { theme } = useTheme();

  // Placeholder ad data for external organizations
  const adSlots: AdSlot[] = [
    {
      id: '1',
      title: 'Find Your Next Career',
      description: 'Browse thousands of job opportunities in construction, trades, and technical fields',
      company: 'JobConnect Pro',
      image: '/api/placeholder/300/120',
      link: 'https://example-job-platform.com',
      category: 'jobs',
      isSponsored: true
    },
    {
      id: '2',
      title: 'Premium Tool Rentals',
      description: 'Professional-grade equipment rentals with delivery. Special rates for contractors',
      company: 'ToolMaster Rentals',
      image: '/api/placeholder/300/120',
      link: 'https://example-tool-rental.com',
      category: 'tools',
      isSponsored: true
    },
    {
      id: '3',
      title: 'Expert Training Services',
      description: 'Upskill your team with certified training programs and safety courses',
      company: 'SkillBuilder Academy',
      image: '/api/placeholder/300/120',
      link: 'https://example-training.com',
      category: 'services',
      isSponsored: true
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'jobs':
        return <Briefcase className="h-4 w-4" />;
      case 'tools':
        return <Wrench className="h-4 w-4" />;
      case 'services':
        return <Users className="h-4 w-4" />;
      default:
        return <ExternalLink className="h-4 w-4" />;
    }
  };

  return (
    <div 
      className={`w-full ${className}`}
      style={{
        backgroundColor: theme === 'dark' ? '#1a1a1a' : '#f8f9fa',
        borderRadius: '12px',
        padding: '15px',
        border: `1px solid ${theme === 'dark' ? '#2a2a2a' : '#e5e7eb'}`
      }}
    >
      {showTitle && (
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <h3 
              className="text-lg font-semibold"
              style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}
            >
              Featured Partners
            </h3>
            <span 
              className="text-xs px-2 py-1 rounded-full"
              style={{ 
                backgroundColor: theme === 'dark' ? '#2a2a2a' : '#e5e7eb',
                color: theme === 'dark' ? '#9ca3af' : '#6b7280'
              }}
            >
              Sponsored
            </span>
          </div>
          <p 
            className="text-sm mt-1"
            style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}
          >
            Discover services and opportunities from our trusted partners
          </p>
        </div>
      )}

      {/* Responsive Flexbox Container */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        {adSlots.map((ad) => (
          <div
            key={ad.id}
            className="flex-1 group cursor-pointer transition-all duration-300 hover:scale-[1.02]"
            style={{
              backgroundColor: theme === 'dark' ? '#262626' : '#ffffff',
              borderRadius: '8px',
              border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
              overflow: 'hidden',
              boxShadow: theme === 'dark' 
                ? '0 2px 8px rgba(0, 0, 0, 0.3)' 
                : '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}
            onClick={() => window.open(ad.link, '_blank')}
          >
            {/* Ad Image/Visual */}
            <div 
              className="h-24 sm:h-28 lg:h-32 flex items-center justify-center relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${
                  ad.category === 'jobs' ? '#3b82f6, #1d4ed8' :
                  ad.category === 'tools' ? '#f59e0b, #d97706' :
                  '#10b981, #059669'
                })`,
              }}
            >
              {/* Placeholder Image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                >
                  {getCategoryIcon(ad.category)}
                </div>
              </div>
              
              {/* Company Logo Area */}
              <div className="absolute top-2 right-2">
                <div 
                  className="px-2 py-1 rounded text-xs font-medium"
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    color: '#1f2937'
                  }}
                >
                  {ad.company}
                </div>
              </div>

              {/* Hover Overlay */}
              <div 
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
              >
                <ExternalLink className="h-6 w-6 text-white" />
              </div>
            </div>

            {/* Ad Content */}
            <div className="p-3">
              <div className="flex items-start justify-between mb-2">
                <h4 
                  className="font-semibold text-sm line-clamp-1"
                  style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}
                >
                  {ad.title}
                </h4>
                {ad.isSponsored && (
                  <span 
                    className="text-xs px-1.5 py-0.5 rounded flex-shrink-0 ml-2"
                    style={{ 
                      backgroundColor: '#FF5E14',
                      color: '#ffffff'
                    }}
                  >
                    Ad
                  </span>
                )}
              </div>
              
              <p 
                className="text-xs line-clamp-2 leading-relaxed"
                style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}
              >
                {ad.description}
              </p>

              {/* CTA Section */}
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div 
                    className="p-1 rounded"
                    style={{ 
                      backgroundColor: theme === 'dark' ? '#374151' : '#f3f4f6',
                      color: theme === 'dark' ? '#9ca3af' : '#6b7280'
                    }}
                  >
                    {getCategoryIcon(ad.category)}
                  </div>
                  <span 
                    className="text-xs font-medium capitalize"
                    style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}
                  >
                    {ad.category}
                  </span>
                </div>
                
                <button
                  className="text-xs px-2 py-1 rounded font-medium transition-colors duration-200 group-hover:bg-opacity-90"
                  style={{
                    backgroundColor: '#FF5E14',
                    color: '#ffffff'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(ad.link, '_blank');
                  }}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Disclaimer */}
      <div className="mt-4 pt-3 border-t" style={{ borderColor: theme === 'dark' ? '#374151' : '#e5e7eb' }}>
        <p 
          className="text-xs text-center"
          style={{ color: theme === 'dark' ? '#6b7280' : '#9ca3af' }}
        >
          Sponsored content from our partners. ToolNTask is not responsible for external offers.
        </p>
      </div>
    </div>
  );
};

export default HorizontalAdBanner;
