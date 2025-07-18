# ToolNTask Advertisement System

## Overview
This document describes the new advertisement system implemented for the ToolNTask website, featuring responsive and user-friendly ad placements.

## Ad Components

### 1. TopBanner Component (`src/components/TopBanner.tsx`)
- **Location**: Top of the homepage, below navigation
- **Design**: Thin, horizontal banner (60px height on desktop)
- **Features**: 
  - Responsive design
  - Hover effects
  - Theme-aware styling
  - Uses `ad-image.jpg` from public directory

### 2. BottomBannerAd Component (`src/components/BottomBannerAd.tsx`)
- **Location**: Fixed at bottom of the page
- **Design**: Full-width horizontal banner with hide/minimize functionality
- **Features**:
  - Toggle button to hide/show ad
  - Smooth animations
  - Persistent state (remembers user preference)
  - Close button for permanent dismissal
  - Uses `ad-image-bottom.jpg` from public directory

### 3. SideAds Component (`src/components/SideAds.tsx`)
- **Location**: Fixed on left and right sides of the page
- **Design**: Vertical ads positioned at center of viewport
- **Features**:
  - Only visible on extra-large screens (xl breakpoint: 1280px+)
  - Individual close buttons for each side
  - Persistent state for each ad
  - Uses `ad-image-side.jpg` from public directory

## Required Image Files
Place these image files in the `public/` directory:

1. `ad-image.jpg` - Top banner ad image (recommended: 600x60px)
2. `ad-image-bottom.jpg` - Bottom banner ad image (recommended: 1200x120px)
3. `ad-image-side.jpg` - Side ads image (recommended: 192x300px)

## Responsive Behavior

### Desktop (1280px+)
- All ad components visible
- Side ads positioned on left and right
- Bottom ad can be minimized/hidden

### Tablet/Mobile (< 1280px)
- Side ads hidden
- Top and bottom banners remain visible
- Bottom ad becomes more compact

### Mobile (< 768px)
- Further size reductions for better mobile experience
- All ads maintain functionality

## User Controls

### Bottom Banner Ad
- **Hide/Show Toggle**: Orange button above the ad
- **Close Button**: X button in top-right corner
- **Persistent State**: User preferences saved in localStorage

### Side Ads
- **Close Button**: Red X button in top-right corner of each ad
- **Persistent State**: Individual preferences for left and right ads

## Technical Features

### Performance
- Uses Next.js Image component for optimized loading
- Priority loading for top banner
- Lazy loading for side ads

### Accessibility
- Proper alt tags for all images
- Keyboard navigation support
- Screen reader friendly

### State Management
- localStorage for persistence
- React hooks for state management
- No external state management library required

## Integration

The ad components are integrated into the main layout:

```tsx
// In pages/Home.tsx
import TopBanner from '../src/components/TopBanner';
import BottomBannerAd from '../src/components/BottomBannerAd';
import SideAds from '../src/components/SideAds';

// Usage
<TopBanner />      // After Navigation
<SideAds />        // After TopBanner
<BottomBannerAd /> // Before closing div
```

## Customization

### Styling
- All components use CSS-in-JS (styled-jsx)
- Theme-aware design (dark/light mode)
- Customizable colors and spacing

### Links
- Update `href="#"` in each component to point to your ad destinations
- Add tracking/analytics as needed

### Timing
- Bottom banner auto-hide can be implemented
- Rotation for multiple ads can be added

## Best Practices

1. **Image Optimization**: Use properly sized images for each ad slot
2. **Performance**: Monitor ad loading impact on page speed
3. **User Experience**: Respect user choices to hide ads
4. **Analytics**: Track ad performance and user interactions
5. **A/B Testing**: Test different ad placements and designs

## Browser Support
- All modern browsers
- Graceful degradation for older browsers
- Mobile-first responsive design

## Future Enhancements
- Ad rotation system
- Analytics integration
- A/B testing framework
- Dynamic ad loading from CMS
- Geolocation-based ads
