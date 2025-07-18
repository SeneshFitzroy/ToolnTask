import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { Button } from './ui/button';

interface AdData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  category: 'banner' | 'sidebar' | 'inline';
  size: 'large' | 'medium' | 'small';
  isActive: boolean;
  priority: number;
}

// Sample ad data - replace with your actual ads
const sampleAds: AdData[] = [
  {
    id: '1',
    title: 'Mobitel - Sri Lanka\'s No.1 Network',
    description: 'Experience the best mobile network in Sri Lanka',
    imageUrl: '/ads/side-skyscraper-ad-primary.jpg',
    link: 'https://mobitel.lk/mobitel-1598',
    category: 'sidebar',
    size: 'large',
    isActive: true,
    priority: 1
  },
  {
    id: '2',
    title: 'CarFlexi - Rent Cars Online',
    description: 'Best car rental deals - Book now!',
    imageUrl: '/ads/bottom-banner-ad-main.jpg',
    link: 'https://www.carflexi.com/en-us/0/car-rental?src=google&team=612-731-1679&network=d&campaignid=20568984927&adgroupid=154179095215&targetid=kwd-11052881&loc_physical_ms=9069783&device=c&creative=674913899669&keyword=rent%20cars&gad_source=5&gad_campaignid=20568984927&gclid=EAIaIQobChMIr66quYvBjgMV3KZmAh2XZifREAEYASAAEgKFjfD_BwE&c=LK',
    category: 'banner',
    size: 'large',
    isActive: true,
    priority: 2
  }
];

// Top Banner Ad Component
export const TopBannerAd = () => {
  const { theme } = useTheme();
  const [currentAd, setCurrentAd] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const bannerAds = sampleAds.filter(ad => ad.category === 'banner' && ad.isActive);

  useEffect(() => {
    if (bannerAds.length > 1) {
      const interval = setInterval(() => {
        setCurrentAd((prev) => (prev + 1) % bannerAds.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [bannerAds.length]);

  if (!isVisible || bannerAds.length === 0) return null;

  const ad = bannerAds[currentAd];

  return (
    <div className="relative w-full overflow-hidden shadow-lg" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff' }}>
      {/* Close Button */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-black bg-opacity-50 text-white flex items-center justify-center hover:bg-opacity-75 transition-all duration-300"
      >
        ×
      </button>

      <Link href={ad.link}>
        <div className="relative h-32 sm:h-40 md:h-48 lg:h-56 w-full cursor-pointer group">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 opacity-90"
            style={{
              backgroundImage: `url(${ad.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          
          {/* Content Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 drop-shadow-lg">
                {ad.title}
              </h2>
              <p className="text-sm sm:text-base md:text-lg drop-shadow-lg">
                {ad.description}
              </p>
            </div>
          </div>

          {/* Hover Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
        </div>
      </Link>

      {/* Dots Indicator */}
      {bannerAds.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {bannerAds.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentAd(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentAd === index ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Sidebar Ad Component
export const SidebarAd = ({ position = 'right' }: { position?: 'left' | 'right' }) => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(true);

  const sidebarAds = sampleAds.filter(ad => ad.category === 'sidebar' && ad.isActive);

  if (!isVisible || sidebarAds.length === 0) return null;

  return (
    <div className={`fixed ${position}-4 top-32 z-40 w-72 space-y-4 hidden lg:block`}>
      {sidebarAds.map((ad) => (
        <div
          key={ad.id}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border overflow-hidden group hover:scale-105 transition-all duration-300"
          style={{ borderColor: theme === 'dark' ? '#374151' : '#e5e7eb' }}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-black bg-opacity-50 text-white flex items-center justify-center hover:bg-opacity-75 transition-all duration-300"
          >
            ×
          </button>

          <Link href={ad.link}>
            <div className="cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                <div
                  className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"
                  style={{
                    backgroundImage: `url(${ad.imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-sm font-bold mb-1 drop-shadow-lg">
                    {ad.title}
                  </h3>
                  <p className="text-xs drop-shadow-lg line-clamp-2">
                    {ad.description}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

// Inline Ad Component
export const InlineAd = ({ className = '' }: { className?: string }) => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(true);

  const inlineAds = sampleAds.filter(ad => ad.category === 'inline' && ad.isActive);

  if (!isVisible || inlineAds.length === 0) return null;

  return (
    <div className={`w-full ${className}`}>
      {inlineAds.map((ad) => (
        <div
          key={ad.id}
          className="relative w-full max-w-4xl mx-auto mb-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border overflow-hidden group hover:shadow-xl transition-all duration-300"
          style={{ borderColor: theme === 'dark' ? '#374151' : '#e5e7eb' }}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-black bg-opacity-50 text-white flex items-center justify-center hover:bg-opacity-75 transition-all duration-300"
          >
            ×
          </button>

          <Link href={ad.link}>
            <div className="cursor-pointer">
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-1/3 h-48 sm:h-32 relative overflow-hidden">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url(${ad.imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                </div>
                <div className="sm:w-2/3 p-4 flex flex-col justify-center">
                  <h3 className="text-lg font-bold mb-2" style={{ color: theme === 'dark' ? '#ffffff' : '#1f2937' }}>
                    {ad.title}
                  </h3>
                  <p className="text-sm" style={{ color: theme === 'dark' ? '#d1d5db' : '#6b7280' }}>
                    {ad.description}
                  </p>
                  <div className="mt-3">
                    <Button 
                      className="text-xs px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
                      style={{ 
                        backgroundColor: '#FF5E14',
                        color: 'white'
                      }}
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

// Main Ad Showcase Component
export const AdShowcase = () => {
  const { theme } = useTheme();

  return (
    <div className="w-full">
      {/* Top Banner Ad */}
      <TopBannerAd />
      
      {/* Sidebar Ads */}
      <SidebarAd position="right" />
      
      {/* Ad Showcase Section */}
      <div className="py-8 sm:py-12" style={{ backgroundColor: theme === 'dark' ? '#0f172a' : '#f8fafc' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: theme === 'dark' ? '#ffffff' : '#1f2937' }}>
              Featured Promotions
            </h2>
            <p className="text-base" style={{ color: theme === 'dark' ? '#d1d5db' : '#6b7280' }}>
              Discover amazing offers and services from our partners
            </p>
          </div>

          {/* Ad Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleAds.filter(ad => ad.isActive).map((ad) => (
              <div
                key={ad.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border overflow-hidden group hover:shadow-xl hover:scale-105 transition-all duration-300"
                style={{ borderColor: theme === 'dark' ? '#374151' : '#e5e7eb' }}
              >
                <Link href={ad.link}>
                  <div className="cursor-pointer">
                    <div className="relative h-48 overflow-hidden">
                      <div
                        className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"
                        style={{
                          backgroundImage: `url(${ad.imageUrl})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                      
                      {/* Size Badge */}
                      <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        {ad.size.toUpperCase()}
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-lg font-bold mb-2" style={{ color: theme === 'dark' ? '#ffffff' : '#1f2937' }}>
                        {ad.title}
                      </h3>
                      <p className="text-sm mb-3" style={{ color: theme === 'dark' ? '#d1d5db' : '#6b7280' }}>
                        {ad.description}
                      </p>
                      <Button 
                        className="w-full text-sm font-bold py-2 rounded-lg transition-all duration-300 hover:scale-105"
                        style={{ 
                          backgroundColor: '#FF5E14',
                          color: 'white'
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdShowcase;
