import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
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

          {/* Ad Banner */}
          <Link href="#">
            <div className="w-full cursor-pointer group">
              <div className="w-full flex items-center justify-center max-w-6xl mx-auto">
                <Image
                  src="/ad-image-bottom.jpg"
                  alt="Advertisement"
                  width={1200}
                  height={120}
                  priority
                  className="object-contain transition-transform duration-300 group-hover:scale-102 rounded-lg"
                  style={{
                    maxHeight: '100px',
                    width: 'auto'
                  }}
                />
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
