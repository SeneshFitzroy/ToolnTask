import React from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

const TopBanner = () => {
  const { theme } = useTheme();

  return (
    <div className="w-full">
      <Link href="https://mobitel.lk/mobitel-1598">
        <div className="w-full cursor-pointer group">
          <div className="w-full flex items-center justify-center" style={{ 
            backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
            padding: '8px 15px',
            minHeight: '60px',
            borderBottom: `1px solid ${theme === 'dark' ? '#333' : '#e5e7eb'}`
          }}>
            <div className="relative max-w-6xl w-full h-full flex items-center justify-center">
              <div 
                className="w-full h-11 flex items-center justify-center text-white font-bold text-lg transition-transform duration-300 group-hover:scale-102 rounded"
                style={{
                  background: 'linear-gradient(90deg, #00B2FF 0%, #006DB8 50%, #004C8C 100%)',
                  maxWidth: '600px'
                }}
              >
                📱 Mobitel 4G+ | දියුණුම තාක්ෂණය
              </div>
            </div>
          </div>
        </div>
      </Link>

      <style jsx>{`
        @media (max-width: 768px) {
          .w-full > a > div > div {
            padding: 6px 10px !important;
            min-height: 50px !important;
          }
          
          img {
            max-height: 36px !important;
          }
        }

        @media (max-width: 480px) {
          .w-full > a > div > div {
            padding: 4px 8px !important;
            min-height: 40px !important;
          }
          
          img {
            max-height: 28px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default TopBanner;
