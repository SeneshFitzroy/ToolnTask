# HorizontalAdBanner Component

A responsive horizontal advertisement banner component designed for external organizations to showcase their services, job opportunities, and products on the ToolNTask platform.

## Features

- **Responsive Design**: Adapts to all screen sizes (desktop 3-column layout, mobile stacked layout)
- **15px Padding**: Consistent spacing across all breakpoints
- **CSS Flexbox**: Horizontal alignment with proper spacing
- **External Organization Support**: Perfect for job platforms, tool vendors, and service providers
- **3 Ad Slots**: Placeholder content for different categories
- **Interactive Elements**: Hover effects, click tracking, and smooth animations
- **Theme Support**: Compatible with both dark and light themes

## Usage

### Basic Implementation

```tsx
import HorizontalAdBanner from '../src/components/HorizontalAdBanner';

// Basic usage with default title
<HorizontalAdBanner />

// Without title section
<HorizontalAdBanner showTitle={false} />

// With custom styling
<HorizontalAdBanner className="my-custom-class" />
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | Additional CSS classes |
| `showTitle` | `boolean` | `true` | Whether to show the title section |

## Ad Slot Structure

Each ad slot contains:
- **Visual Area**: Category-based gradient background with icon
- **Company Branding**: Company name badge
- **Content**: Title, description, and category
- **Call-to-Action**: "Learn More" button with external link

## Categories

The component supports three main categories:

1. **Jobs** (Blue gradient)
   - Job platforms
   - Recruitment agencies
   - Career services

2. **Tools** (Orange gradient)
   - Equipment rentals
   - Tool suppliers
   - Hardware stores

3. **Services** (Green gradient)
   - Training providers
   - Insurance companies
   - Business services

## Responsive Behavior

### Desktop (lg and above)
- 3-column horizontal layout
- Each ad takes equal width
- Hover effects with scale animations

### Tablet (md to lg)
- 3-column layout with adjusted spacing
- Optimized icon and text sizes

### Mobile (sm and below)
- Stacked vertical layout
- Full-width cards
- Touch-optimized interactions

## Styling

The component uses:
- **CSS Flexbox** for layout
- **Inline styles** for theme compatibility
- **Tailwind classes** for responsive utilities
- **Custom animations** for enhanced UX

### Key CSS Classes Used
- `flex flex-col lg:flex-row` - Responsive layout switching
- `gap-4 lg:gap-6` - Responsive spacing
- `line-clamp-1`, `line-clamp-2` - Text truncation
- `group` and `group-hover:` - Hover state management

## Integration Examples

### Home Page Integration
```tsx
{/* Partner Advertisement Banner */}
<div className="py-6 sm:py-8 md:py-10">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <HorizontalAdBanner />
  </div>
</div>
```

### Custom Section
```tsx
<section className="ad-section">
  <h2>Featured Partners</h2>
  <HorizontalAdBanner showTitle={false} />
</section>
```

## Customization

### Modifying Ad Content
To update the ad content, modify the `adSlots` array in the component:

```tsx
const adSlots: AdSlot[] = [
  {
    id: '1',
    title: 'Your Ad Title',
    description: 'Your ad description here',
    company: 'Your Company',
    image: '/your-image.jpg',
    link: 'https://your-website.com',
    category: 'jobs' | 'tools' | 'services',
    isSponsored: true
  }
  // ... more ads
];
```

### Theme Customization
The component automatically adapts to the theme context:
- Dark mode: Uses darker backgrounds and lighter text
- Light mode: Uses lighter backgrounds and darker text

## Performance Considerations

- **Lazy Loading**: Consider implementing lazy loading for ad images
- **Click Tracking**: External links open in new tabs (`_blank`)
- **Mobile Optimization**: Touch-friendly button sizes and spacing
- **SEO**: Proper semantic HTML structure

## Accessibility

- Proper ARIA labels for interactive elements
- Keyboard navigation support
- High contrast color schemes
- Screen reader friendly text hierarchy

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design tested across devices

## Demo

Visit `/AdShowcase` to see the component in action with full documentation and live examples.
