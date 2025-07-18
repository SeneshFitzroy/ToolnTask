import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
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
        <div className="relative w-full p-4 flex justify-center">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white flex items-center justify-center transition-all duration-200 text-xs"
          >
            <X size={12} />
          </button>

          {/* CarFlexi-Style Banner - Clean CSS Design */}
          <Link href="https://www.carflexi.com/en-us/0/car-rental?src=google&team=612-731-1679&network=d&campaignid=20568984927&adgroupid=154179095215&targetid=kwd-11052881&loc_physical_ms=9069783&device=c&creative=674913899669&keyword=rent%20cars&gad_source=5&gad_campaignid=20568984927&gclid=EAIaIQobChMIr66quYvBjgMV3KZmAh2XZifREAEYASAAEgKFjfD_BwE&c=LK">
            <div className="cursor-pointer group relative max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg"
                 style={{
                   background: 'linear-gradient(90deg, #FF6B35 0%, #E55A2B 25%, #00B2FF 75%, #0099E6 100%)',
                   height: '100px'
                 }}>
              
              {/* Content Layout */}
              <div className="flex items-center justify-between h-full px-8 text-white">
                {/* Left Section - CarFlexi Brand */}
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-2xl font-black mb-1">CARFLEXI</div>
                    <div className="text-sm opacity-90">CAR RENTAL SERVICE</div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-white opacity-75"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="text-xs opacity-80">24/7 AVAILABLE</div>
                  </div>
                </div>

                {/* Center Section - Main Message */}
                <div className="text-center flex-grow px-6">
                  <div className="text-2xl font-black mb-1">RENT CARS AT BEST PRICES</div>
                  <div className="text-sm opacity-90">Premium vehicles • Instant booking • Nationwide service</div>
                </div>

                {/* Right Section - CTA */}
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-lg font-bold mb-1">BOOK NOW</div>
                    <div className="text-xs opacity-90">Get Started</div>
                  </div>
                  <div className="bg-white bg-opacity-25 rounded-xl px-6 py-3 text-sm font-bold backdrop-blur-sm hover:bg-opacity-35 transition-all duration-300 border border-white border-opacity-30">
                    CLICK HERE
                  </div>
                </div>
              </div>
              
              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-white bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-lg"></div>
              
              {/* Decorative Elements */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-4 right-32 w-12 h-12 border border-white rounded-full"></div>
                <div className="absolute bottom-4 left-32 w-8 h-8 border border-white rounded-full"></div>
                <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 w-16 h-16 border border-white rounded-full"></div>
                <div className="absolute top-1/4 right-1/4 w-6 h-6 border border-white rounded-full"></div>
                <div className="absolute bottom-1/4 right-1/3 w-10 h-10 border border-white rounded-full"></div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .max-w-4xl {
            max-width: 90% !important;
          }
          
          .cursor-pointer div[style*="height: '100px'"] {
            height: 80px !important;
          }
          
          .text-2xl {
            font-size: 1.25rem !important;
          }
          
          .text-lg {
            font-size: 1rem !important;
          }
          
          .relative {
            padding: 12px !important;
          }
        }

        @media (max-width: 480px) {
          .max-w-4xl {
            max-width: 95% !important;
          }
          
          .cursor-pointer div[style*="height: '100px'"] {
            height: 70px !important;
          }
          
          .text-2xl {
            font-size: 1.125rem !important;
          }
          
          .px-8 {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
          
          .relative {
            padding: 8px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default BottomBannerAd;
