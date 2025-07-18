import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';

const SideAds = () => {
  const { theme } = useTheme();
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
      {/* Left Side Ad */}
      {leftAdVisible && (
        <div 
          className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 w-48 hidden xl:block"
          style={{ 
            backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
            border: `1px solid ${theme === 'dark' ? '#333' : '#e5e7eb'}`,
            borderRadius: '12px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
        >
          {/* Close Button */}
          <button
            onClick={() => setLeftAdVisible(false)}
            className="absolute -top-2 -right-2 z-10 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-all duration-200 text-xs"
          >
            <X size={12} />
          </button>

          {/* Ad Content */}
          <Link href="#">
            <div className="cursor-pointer group p-3">
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src="/ad-image-side.jpg"
                  alt="Side Advertisement"
                  width={192}
                  height={300}
                  className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-lg"
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '280px'
                  }}
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-lg"></div>
              </div>
              
              {/* Ad Label */}
              <div className="mt-2 text-center">
                <span 
                  className="text-xs font-medium px-2 py-1 rounded-full"
                  style={{ 
                    backgroundColor: '#FF5E14',
                    color: 'white'
                  }}
                >
                  Advertisement
                </span>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Right Side Ad */}
      {rightAdVisible && (
        <div 
          className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 w-48 hidden xl:block"
          style={{ 
            backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
            border: `1px solid ${theme === 'dark' ? '#333' : '#e5e7eb'}`,
            borderRadius: '12px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
        >
          {/* Close Button */}
          <button
            onClick={() => setRightAdVisible(false)}
            className="absolute -top-2 -right-2 z-10 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-all duration-200 text-xs"
          >
            <X size={12} />
          </button>

          {/* Ad Content */}
          <Link href="#">
            <div className="cursor-pointer group p-3">
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src="/ad-image-side.jpg"
                  alt="Side Advertisement"
                  width={192}
                  height={300}
                  className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-lg"
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '280px'
                  }}
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-lg"></div>
              </div>
              
              {/* Ad Label */}
              <div className="mt-2 text-center">
                <span 
                  className="text-xs font-medium px-2 py-1 rounded-full"
                  style={{ 
                    backgroundColor: '#FF5E14',
                    color: 'white'
                  }}
                >
                  Advertisement
                </span>
              </div>
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
        
        /* Add margin to main content when side ads are visible */
        @media (min-width: 1280px) {
          .main-content {
            margin-left: 220px;
            margin-right: 220px;
          }
        }
      `}</style>
    </>
  );
};

export default SideAds;
