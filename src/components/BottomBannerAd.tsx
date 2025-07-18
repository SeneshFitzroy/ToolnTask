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
      {/* Minimize/Expand Button */}
      <div className="flex justify-center">
        <button
          onClick={handleToggleMinimize}
          className="absolute -top-8 bg-orange-500 hover:bg-orange-600 text-white px-4 py-1 rounded-t-lg transition-colors duration-200 flex items-center gap-2 text-sm font-medium"
        >
          {isMinimized ? (
            <>
              <ChevronUp size={16} />
              Show Ad
            </>
          ) : (
            <>
              <ChevronDown size={16} />
              Hide Ad
            </>
          )}
        </button>
      </div>

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
            <div className="w-full cursor-pointer group">
              <div 
                className="w-full flex items-center justify-center max-w-6xl mx-auto rounded-lg overflow-hidden"
                style={{
                  background: 'linear-gradient(90deg, #FF6B35 0%, #E55A2B 25%, #00B2FF 75%, #0099E6 100%)',
                  minHeight: '100px',
                  boxShadow: '0 4px 20px rgba(255, 107, 53, 0.3)'
                }}
              >
                {/* Left Section - Orange */}
                <div className="flex-1 text-white text-center py-6 relative">
                  <div className="font-bold text-lg mb-1">CARFLEXI</div>
                  <div className="text-2xl font-black mb-1">RENT</div>
                  <div className="text-xs opacity-90">CARS</div>
                  <div className="text-xs mt-2">
                    <div className="flex justify-center space-x-1 mb-1">
                      <div className="w-2 h-2 rounded-full bg-red-400"></div>
                      <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                      <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                    </div>
                    <div>AFFORDABLE</div>
                  </div>
                </div>

                {/* Center Section - Main Offer */}
                <div className="flex-2 text-white text-center py-6 relative">
                  <div className="bg-white bg-opacity-20 rounded-lg px-4 py-3 backdrop-blur-sm inline-block">
                    <div className="text-sm font-bold">BEST PRICES</div>
                    <div className="text-2xl font-black">CARS</div>
                  </div>
                  <div className="text-lg font-bold mt-2">Book Now!</div>
                </div>

                {/* Right Section - Blue */}
                <div className="flex-1 text-white text-center py-6 relative">
                  <div className="font-bold text-sm mb-1">CARFLEXI</div>
                  <div className="text-3xl font-black mb-1">24/7</div>
                  <div className="text-xs opacity-90">SERVICE</div>
                  <div className="text-xs mt-2">
                    <div className="flex justify-center space-x-1 mb-1">
                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                      <div className="w-2 h-2 rounded-full bg-red-400"></div>
                      <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                      <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                    </div>
                    <div>AVAILABLE</div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="px-6 py-6">
                  <div className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 group-hover:scale-105 text-sm">
                    RENT NOW
                  </div>
                </div>

                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <div className="absolute top-2 right-20 w-16 h-16 border border-white rounded-full"></div>
                  <div className="absolute bottom-2 left-20 w-12 h-12 border border-white rounded-full"></div>
                  <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 w-20 h-20 border border-white rounded-full"></div>
                  <div className="absolute top-1/2 right-1/4 transform -translate-y-1/2 w-20 h-20 border border-white rounded-full"></div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-white bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300"></div>
              </div>
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
