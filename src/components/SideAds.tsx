import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
          className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 w-80 hidden xl:block"
          style={{ 
            borderRadius: '20px',
            boxShadow: '0 12px 40px rgba(0, 178, 255, 0.4)',
            overflow: 'hidden',
            height: '400px'
          }}
        >
          {/* Background Image */}
          <Image
            src="/ads/side-skyscraper-ad-primary.jpg"
            alt="Mobitel 1598 Advertisement"
            width={320}
            height={400}
            className="absolute inset-0 w-full h-full object-cover"
            priority
          />
          
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
              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 z-10"></div>
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
            padding-left: 340px;
          }
        }
      `}</style>
    </>
  );
};

export default SideAds;
