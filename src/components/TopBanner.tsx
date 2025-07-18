import React from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

const TopBanner = () => {
  const { theme } = useTheme();

  return (
    <div className="w-full">
      <Link href="#">
        <div className="w-full cursor-pointer group">
          <div className="w-full flex items-center justify-center" style={{ 
            backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
            padding: '8px 15px',
            minHeight: '60px',
            borderBottom: `1px solid ${theme === 'dark' ? '#333' : '#e5e7eb'}`
          }}>
            <div className="relative max-w-6xl w-full h-full flex items-center justify-center">
              <Image
                src="/ad-image.jpg"
                alt="Advertisement"
                width={600}
                height={60}
                priority
                className="object-contain transition-transform duration-300 group-hover:scale-102"
                style={{
                  maxHeight: '44px',
                  width: 'auto'
                }}
              />
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
