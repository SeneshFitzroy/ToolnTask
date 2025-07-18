import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronUp, ChevronDown, X } from 'lucide-react';

const BottomBannerAd = () => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  // Load visibility state from localStorage
  useEffect(() => {
    const savedVisible = localStorage.getItem('bottomAdVisible');
    const savedMinimized = localStorage.getItem('bottomAdMinimized');
    
    if (savedVisible !== null) {
      setIsVisible(savedVisible === 'true');
    }
    if (savedMinimized !== null) {
      setIsMinimized(savedMinimized === 'true');
    }
  }, []);

  // Save visibility state to localStorage
  useEffect(() => {
    localStorage.setItem('bottomAdVisible', isVisible.toString());
    localStorage.setItem('bottomAdMinimized', isMinimized.toString());
  }, [isVisible, isMinimized]);

  if (!isVisible) {
    return null;
  }

  const handleToggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isMinimized ? 'transform translate-y-full' : 'transform translate-y-0'
      }`}
      style={{ 
        backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
        borderTop: `2px solid ${theme === 'dark' ? '#333' : '#e5e7eb'}`,
        boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Minimize/Expand Button - Moved to Side */}
      <button
        onClick={handleToggleMinimize}
        className="absolute -top-8 right-4 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-t-lg transition-colors duration-200 flex items-center gap-1 text-xs font-medium z-10"
      >
        {isMinimized ? (
          <>
            <ChevronUp size={14} />
            Show
          </>
        ) : (
          <>
            <ChevronDown size={14} />
            Hide
          </>
        )}
      </button>

      {/* Ad Content */}
      <div className={`transition-all duration-300 ${isMinimized ? 'h-0 overflow-hidden' : 'h-auto'}`}>
        <div className="relative w-full p-4">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white flex items-center justify-center transition-all duration-200"
          >
            <X size={16} />
          </button>

          {/* CarFlexi-Style Banner */}
          <Link href="https://www.carflexi.com/en-us/0/car-rental?src=google&team=612-731-1679&network=d&campaignid=20568984927&adgroupid=154179095215&targetid=kwd-11052881&loc_physical_ms=9069783&device=c&creative=674913899669&keyword=rent%20cars&gad_source=5&gad_campaignid=20568984927&gclid=EAIaIQobChMIr66quYvBjgMV3KZmAh2XZifREAEYASAAEgKFjfD_BwE&c=LK">
            <div className="w-full cursor-pointer group relative">
              {/* Background Image */}
              <Image
                src="/ads/bottom-banner-ad-main.jpg"
                alt="CarFlexi Car Rental Advertisement"
                width={1000}
                height={80}
                className="w-full h-full object-cover"
                style={{ minHeight: '80px', maxHeight: '80px' }}
                priority
              />
              
              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
            </div>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .w-full img {
            max-height: 80px !important;
          }
          
          .relative {
            padding: 8px !important;
          }
        }

        @media (max-width: 480px) {
          .w-full img {
            max-height: 60px !important;
          }
          
          .relative {
            padding: 6px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default BottomBannerAd;
