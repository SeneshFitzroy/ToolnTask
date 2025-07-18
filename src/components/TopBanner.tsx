import React from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';

const TopBanner = () => {
  const { theme } = useTheme();

  return (
    <div className="top-banner">
      <div className="ad-banner-container">
        <Image
          src="/ad-image.jpg"
          alt="Ad Promotion"
          width={1200}
          height={300}
          className="ad-image"
          priority
        />
      </div>
      
      <style jsx>{`
        .top-banner {
          width: 100%;
          padding: 15px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: ${theme === 'dark' ? '#1a1a1a' : '#f5f5f5'};
          border-bottom: 1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'};
        }
        
        .ad-banner-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          max-width: 1200px;
        }
        
        .ad-image {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .ad-image:hover {
          transform: scale(1.02);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
        }
        
        @media (max-width: 768px) {
          .top-banner {
            flex-direction: column;
            align-items: center;
            padding: 10px;
          }
          
          .ad-banner-container {
            flex-direction: column;
          }
          
          .ad-image {
            max-width: 95%;
            border-radius: 6px;
          }
        }
        
        @media (max-width: 480px) {
          .top-banner {
            padding: 8px;
          }
          
          .ad-image {
            max-width: 100%;
            border-radius: 4px;
          }
        }
      `}</style>
    </div>
  );
};

export default TopBanner;
