import React from 'react';
import Image from 'next/image';

/**
 * Responsive horizontal banner ad for ToolNTask homepage.
 * - Spans full width, 15px padding all sides
 * - Uses flexbox for horizontal centering
 * - Stacks vertically on screens <768px
 * - Clean design, no text
 * - Uses 'public/ad-image.jpg' as the ad image
 */
const TopBannerAd: React.FC = () => {
  return (
    <div className="ad-banner">
      <Image
        src="/ad-image.jpg"
        alt="Ad Promotion"
        className="ad-image"
        width={1200}
        height={200}
        priority
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
};

export default TopBannerAd;

// CSS styles for the banner
// Add to your global CSS (e.g., styles/globals.css):
//
// .ad-banner {
//   width: 100%;
//   padding: 15px;
//   display: flex;
//   justify-content: center;
//   background-color: #f5f5f5;
// }
// .ad-image {
//   max-width: 100%;
//   height: auto;
// }
// @media (max-width: 768px) {
//   .ad-banner {
//     flex-direction: column;
//     align-items: center;
//   }
// }
