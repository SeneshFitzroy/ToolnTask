import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

const SideAds = () => {
  const [leftAdVisible, setLeftAdVisible] = useState(true);

  // Load visibility state from localStorage
  useEffect(() => {
    const savedLeftAd = localStorage.getItem('leftAdVisible');
    
    if (savedLeftAd !== null) {
      setLeftAdVisible(savedLeftAd === 'true');
    }
  }, []);

  // Save visibility state to localStorage
  useEffect(() => {
    localStorage.setItem('leftAdVisible', leftAdVisible.toString());
  }, [leftAdVisible]);

  return (
    <>
      {/* Left Side Ad - Mobitel Style */}
      {leftAdVisible && (
        <div 
          className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 w-48 hidden xl:block"
          style={{ 
            background: 'linear-gradient(135deg, #00B2FF 0%, #006DB8 50%, #004C8C 100%)',
            borderRadius: '20px',
            boxShadow: '0 12px 40px rgba(0, 178, 255, 0.4)',
            overflow: 'hidden',
            height: '600px'
          }}
        >
          {/* Close Button */}
          <button
            onClick={() => setLeftAdVisible(false)}
            className="absolute -top-3 -right-3 z-10 w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-all duration-200 text-sm shadow-xl border-2 border-white"
          >
            <X size={16} />
          </button>

          {/* Ad Content */}
          <Link href="https://mobitel.lk/mobitel-1598">
            <div className="cursor-pointer group relative overflow-hidden h-full">
              {/* Main Content */}
              <div className="p-6 text-white relative z-10 h-full flex flex-col justify-between">
                {/* Top Section - Brand */}
                <div className="text-center mb-4">
                  <div className="inline-block bg-white bg-opacity-25 rounded-lg px-3 py-2 backdrop-blur-sm mb-3">
                    <span className="text-lg font-black tracking-wide">MOBITEL</span>
                  </div>
                  <div className="text-xs opacity-90 font-medium">Sri Lanka&apos;s Network</div>
                </div>

                {/* Middle Section - Main Offer */}
                <div className="text-center mb-4 flex-grow flex flex-col justify-center">
                  <div className="mb-5">
                    <div className="text-4xl font-black mb-2 leading-none drop-shadow-lg">1598</div>
                    <div className="text-base font-bold opacity-95 tracking-wider">NONSTOP</div>
                    <div className="text-xs opacity-80 mt-1">package</div>
                  </div>

                  {/* Features Icons */}
                  <div className="space-y-2 mb-5">
                    <div className="flex items-center justify-center">
                      <div className="flex space-x-1">
                        <div className="w-3 h-3 rounded-full bg-green-400 shadow-lg"></div>
                        <div className="w-3 h-3 rounded-full bg-red-400 shadow-lg"></div>
                        <div className="w-3 h-3 rounded-full bg-blue-400 shadow-lg"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-lg"></div>
                      </div>
                    </div>
                    <div className="text-center text-xs opacity-95 font-medium">
                      UNLIMITED<br/>
                      <span className="text-xs">SMS • CALLS • DATA</span>
                    </div>
                  </div>

                  {/* Extra Data Highlight */}
                  <div className="mb-5">
                    <div className="bg-white bg-opacity-25 rounded-lg p-3 backdrop-blur-sm border border-white border-opacity-30">
                      <div className="text-sm font-bold mb-1">EXTRA ANYTIME DATA</div>
                      <div className="text-2xl font-black text-yellow-300 drop-shadow-lg">40GB</div>
                    </div>
                  </div>

                  {/* Additional Features */}
                  <div className="space-y-2 mb-4">
                    <div className="bg-white bg-opacity-15 rounded-lg p-2 backdrop-blur-sm">
                      <div className="text-xs font-medium">📱 FREE ROAMING</div>
                    </div>
                    <div className="bg-white bg-opacity-15 rounded-lg p-2 backdrop-blur-sm">
                      <div className="text-xs font-medium">🎵 FREE MUSIC</div>
                    </div>
                    <div className="bg-white bg-opacity-15 rounded-lg p-2 backdrop-blur-sm">
                      <div className="text-xs font-medium">📺 FREE STREAMING</div>
                    </div>
                  </div>
                </div>

                {/* Bottom Section - Price & CTA */}
                <div className="text-center">
                  <div className="mb-3">
                    <div className="text-xl font-black mb-1">Rs.1,598</div>
                    <div className="text-xs opacity-80">per month</div>
                  </div>

                  {/* CTA Button */}
                  <div className="bg-orange-500 hover:bg-orange-600 text-white font-black py-2 px-4 rounded-lg text-xs transition-all duration-300 group-hover:scale-105 shadow-xl border-2 border-orange-400">
                    CLICK HERE
                  </div>
                </div>
              </div>

              {/* Enhanced Background Pattern */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-8 right-8 w-24 h-24 border-2 border-white rounded-full animate-pulse"></div>
                <div className="absolute bottom-8 left-8 w-20 h-20 border-2 border-white rounded-full"></div>
                <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-32 h-32 border border-white rounded-full"></div>
                <div className="absolute bottom-1/3 right-4 w-16 h-16 border border-white rounded-full"></div>
              </div>

              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-0 group-hover:opacity-10 transition-all duration-500"></div>
            </div>
          </Link>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 1280px) {
          .fixed {
            display: none !important;
          }
        }
        
        /* Add margin to main content when left side ad is visible */
        @media (min-width: 1280px) {
          body {
            padding-left: 220px;
          }
        }
      `}</style>
    </>
  );
};

export default SideAds;
