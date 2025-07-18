import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

const SideAds = () => {
  const [leftAdVisible, setLeftAdVisible] = useState(true);
  const [rightAdVisible, setRightAdVisible] = useState(true);

  // Load visibility state from localStorage
  useEffect(() => {
    const savedLeftAd = localStorage.getItem('leftAdVisible');
    const savedRightAd = localStorage.getItem('rightAdVisible');
    
    if (savedLeftAd !== null) {
      setLeftAdVisible(savedLeftAd === 'true');
    }
    if (savedRightAd !== null) {
      setRightAdVisible(savedRightAd === 'true');
    }
  }, []);

  // Save visibility state to localStorage
  useEffect(() => {
    localStorage.setItem('leftAdVisible', leftAdVisible.toString());
    localStorage.setItem('rightAdVisible', rightAdVisible.toString());
  }, [leftAdVisible, rightAdVisible]);

  return (
    <>
      {/* Left Side Ad - Mobitel Style */}
      {leftAdVisible && (
        <div 
          className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 w-64 hidden xl:block"
          style={{ 
            background: 'linear-gradient(135deg, #00B2FF 0%, #006DB8 50%, #004C8C 100%)',
            borderRadius: '20px',
            boxShadow: '0 12px 40px rgba(0, 178, 255, 0.4)',
            overflow: 'hidden',
            height: '500px'
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
          <Link href="#">
            <div className="cursor-pointer group relative overflow-hidden h-full">
              {/* Main Content */}
              <div className="p-8 text-white relative z-10 h-full flex flex-col justify-between">
                {/* Top Section - Brand */}
                <div className="text-center mb-6">
                  <div className="inline-block bg-white bg-opacity-25 rounded-xl px-4 py-3 backdrop-blur-sm mb-4">
                    <span className="text-xl font-black tracking-wide">MOBITEL</span>
                  </div>
                  <div className="text-sm opacity-90 font-medium">Sri Lanka&apos;s Network</div>
                </div>

                {/* Middle Section - Main Offer */}
                <div className="text-center mb-6 flex-grow flex flex-col justify-center">
                  <div className="mb-6">
                    <div className="text-5xl font-black mb-3 leading-none drop-shadow-lg">1598</div>
                    <div className="text-lg font-bold opacity-95 tracking-wider">NONSTOP</div>
                    <div className="text-sm opacity-80 mt-2">package</div>
                  </div>

                  {/* Features Icons */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-center">
                      <div className="flex space-x-2">
                        <div className="w-4 h-4 rounded-full bg-green-400 shadow-lg"></div>
                        <div className="w-4 h-4 rounded-full bg-red-400 shadow-lg"></div>
                        <div className="w-4 h-4 rounded-full bg-blue-400 shadow-lg"></div>
                        <div className="w-4 h-4 rounded-full bg-yellow-400 shadow-lg"></div>
                      </div>
                    </div>
                    <div className="text-center text-sm opacity-95 font-medium">
                      UNLIMITED<br/>
                      <span className="text-xs">SMS • CALLS • DATA</span>
                    </div>
                  </div>

                  {/* Extra Data Highlight */}
                  <div className="mb-6">
                    <div className="bg-white bg-opacity-25 rounded-xl p-4 backdrop-blur-sm border border-white border-opacity-30">
                      <div className="text-lg font-bold mb-1">EXTRA ANYTIME DATA</div>
                      <div className="text-3xl font-black text-yellow-300 drop-shadow-lg">40GB</div>
                    </div>
                  </div>
                </div>

                {/* Bottom Section - Price & CTA */}
                <div className="text-center">
                  <div className="mb-4">
                    <div className="text-2xl font-black mb-1">Rs.1,598</div>
                    <div className="text-sm opacity-80">per month</div>
                  </div>

                  {/* CTA Button */}
                  <div className="bg-orange-500 hover:bg-orange-600 text-white font-black py-3 px-6 rounded-xl text-sm transition-all duration-300 group-hover:scale-105 shadow-xl border-2 border-orange-400">
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

      {/* Right Side Ad - Mobitel Style (Alternative Version) */}
      {rightAdVisible && (
        <div 
          className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 w-56 hidden xl:block"
          style={{ 
            background: 'linear-gradient(135deg, #FF6B35 0%, #E55A2B 50%, #CC4125 100%)',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(255, 107, 53, 0.3)',
            overflow: 'hidden'
          }}
        >
          {/* Close Button */}
          <button
            onClick={() => setRightAdVisible(false)}
            className="absolute -top-2 -right-2 z-10 w-7 h-7 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-all duration-200 text-xs shadow-lg"
          >
            <X size={14} />
          </button>

          {/* Ad Content */}
          <Link href="#">
            <div className="cursor-pointer group relative overflow-hidden">
              {/* Main Content */}
              <div className="p-6 text-white relative z-10">
                {/* Brand Logo Area */}
                <div className="mb-4 text-center">
                  <div className="inline-block bg-white bg-opacity-20 rounded-lg px-3 py-2 backdrop-blur-sm">
                    <span className="text-lg font-bold">MOBITEL</span>
                  </div>
                </div>

                {/* Main Offer */}
                <div className="text-center mb-4">
                  <div className="text-4xl font-black mb-2 leading-none">1298</div>
                  <div className="text-sm font-medium opacity-90">NONSTOP</div>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-center">
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    </div>
                  </div>
                  <div className="text-center text-xs opacity-90">
                    UNLIMITED SMS • CALLS • DATA
                  </div>
                </div>

                {/* Extra Data */}
                <div className="text-center mb-4">
                  <div className="bg-white bg-opacity-20 rounded-lg p-3 backdrop-blur-sm">
                    <div className="text-lg font-bold">EXTRA ANYTIME DATA</div>
                    <div className="text-2xl font-black">30GB</div>
                  </div>
                </div>

                {/* Price */}
                <div className="text-center mb-4">
                  <div className="text-lg font-bold">Rs.1,298</div>
                  <div className="text-xs opacity-80">per month</div>
                </div>

                {/* CTA Button */}
                <div className="text-center">
                  <div className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg text-sm transition-all duration-300 group-hover:scale-105">
                    CLICK HERE
                  </div>
                </div>
              </div>

              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-4 w-20 h-20 border-2 border-white rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-16 h-16 border-2 border-white rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white rounded-full"></div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-white bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300"></div>
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
      `}</style>
    </>
  );
};

export default SideAds;
