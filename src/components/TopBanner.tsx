import React from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

const TopBanner = () => {
  const { theme } = useTheme();

  return (
    <div className="w-full">
      <Link href="https://www.carflexi.com/en-us/0/car-rental?src=google&team=612-731-1679&network=d&campaignid=20568984927&adgroupid=154179095215&targetid=kwd-11052881&loc_physical_ms=9069783&device=c&creative=674913899669&keyword=rent%20cars&gad_source=5&gad_campaignid=20568984927&gclid=EAIaIQobChMIr66quYvBjgMV3KZmAh2XZifREAEYASAAEgKFjfD_BwE&c=LK">
        <div className="w-full cursor-pointer group">
          <div className="w-full flex items-center justify-center" style={{ 
            backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
            padding: '8px 15px',
            minHeight: '60px',
            borderBottom: `1px solid ${theme === 'dark' ? '#333' : '#e5e7eb'}`
          }}>
            <div className="relative max-w-6xl w-full h-full flex items-center justify-center">
              <Image
                src="/ads/bottom-banner-ad-main.jpg"
                alt="CarFlexi - Rent Cars Online"
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
