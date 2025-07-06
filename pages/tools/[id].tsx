import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '../../src/components/Navigation';
import Footer from '../../src/components/Footer';
import Logo from '../../src/components/Logo';
import { Button } from '../../src/components/ui/button';

// Advertisement Component
const AdSpace = ({ theme, adIndex, isVisible }: { theme: string | undefined, adIndex: number, isVisible: boolean }) => {
  const ads = [
    {
      id: 1,
      title: "Tool Rentals",
      subtitle: "Quality tools for every project",
      features: ["Professional Grade", "Affordable Rates", "Quick Delivery"],
      icon: "🔧",
      color: "#FF5E14"
    },
    {
      id: 2,
      title: "Professional Equipment",
      subtitle: "Industrial grade solutions",
      features: ["Heavy Duty", "Expert Support", "Maintenance Included"],
      icon: "⚙️",
      color: "#001554"
    },
    {
      id: 3,
      title: "Home & Garden",
      subtitle: "Everything for your space",
      features: ["DIY Projects", "Garden Tools", "Home Improvement"],
      icon: "🏡",
      color: "#FF5E14"
    }
  ];

  const currentAd = ads[adIndex % ads.length];

  return (
    <div className={`transition-all duration-500 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
      <div className="p-6 rounded-2xl shadow-xl border-2 border-dashed mb-6 min-h-[400px] flex flex-col justify-between" 
           style={{ 
             backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF',
             borderColor: currentAd.color
           }}>
        <div className="text-center flex-1 flex flex-col justify-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" 
               style={{ backgroundColor: currentAd.color }}>
            <span className="text-white text-2xl">{currentAd.icon}</span>
          </div>
          <h3 className="text-xl font-bold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
            {currentAd.title}
          </h3>
          <p className="text-base mb-6 leading-relaxed" style={{ color: '#B3B5BC' }}>
            {currentAd.subtitle}
          </p>
          
          {/* Features List */}
          <div className="space-y-3 mb-6">
            {currentAd.features.map((feature, index) => (
              <div key={index} className="flex items-center justify-center gap-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: currentAd.color }}>
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-sm font-medium" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                  {feature}
                </span>
              </div>
            ))}
          </div>
          
          {/* CTA Button */}
          <button className="w-full py-3 px-6 rounded-xl font-bold text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: currentAd.color }}>
            Explore Now
          </button>
        </div>
        
        {/* Ad Indicator */}
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
             style={{ backgroundColor: currentAd.color }}>
          {currentAd.id}
        </div>
        
        {/* Timer Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-b-2xl overflow-hidden">
          <div className="h-full bg-current animate-pulse" style={{ color: currentAd.color, width: '100%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default function ToolDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [adIndex, setAdIndex] = useState(0);
  const [showAd, setShowAd] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Advertisement timer - changes every 2 minutes
  useEffect(() => {
    if (!mounted) return;

    const adTimer = setInterval(() => {
      setShowAd(false);
      setTimeout(() => {
        setAdIndex(prev => (prev + 1) % 3);
        setShowAd(true);
      }, 500);
    }, 120000); // 2 minutes = 120,000 milliseconds

    return () => clearInterval(adTimer);
  }, [mounted]);

  if (!mounted) return null;

  // Mock data - in a real app, this would come from an API
  const tool = {
    id: id,
    title: "Professional Power Drill Set",
    description: "High-quality Bosch power drill with complete bit set. Perfect for all your drilling needs including wood, metal, and masonry. Includes multiple drill bits, screwdriver bits, and a sturdy carrying case.",
    price: "Rs. 1,500/day",
    brand: "Bosch",
    condition: "Excellent",
    available: true,
    location: "Colombo 03",
    images: [
      "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1609010697446-11f2155278f0?w=800&h=600&fit=crop"
    ],
    specifications: {
      "Power": "750W",
      "Chuck Size": "13mm",
      "Speed": "0-3000 RPM",
      "Weight": "2.1 kg",
      "Warranty": "2 years"
    },
    features: [
      "Variable speed control",
      "LED work light",
      "Ergonomic grip",
      "Includes 25+ bits",
      "Carrying case included"
    ],
    provider: {
      name: "John Smith",
      rating: 4.8,
      reviews: 32,
      joinDate: "2023",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    }
  };

  const similarTools = [
    {
      id: 2,
      title: "Angle Grinder",
      price: "Rs. 1,200/day",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
      available: true
    },
    {
      id: 3,
      title: "Circular Saw",
      price: "Rs. 1,800/day",
      image: "https://images.unsplash.com/photo-1609010697446-11f2155278f0?w=400&h=300&fit=crop",
      available: true
    },
    {
      id: 4,
      title: "Impact Driver",
      price: "Rs. 1,300/day",
      image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=300&fit=crop",
      available: false
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme === 'dark' ? '#0C0F16' : '#F2F3F5' }}>
      <Navigation />
      
      {/* Hero Section with Back Button */}
      <div className="py-8 sm:py-12" style={{ backgroundColor: theme === 'dark' ? '#0C0F16' : '#F2F3F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <Link href="/Tools">
              <Button 
                variant="outline" 
                className="flex items-center gap-2 hover:scale-105 transition-all duration-300"
                style={{ 
                  borderColor: theme === 'dark' ? '#FF5E14' : '#FF5E14',
                  color: theme === 'dark' ? '#FF5E14' : '#FF5E14',
                  backgroundColor: 'transparent'
                }}
              >
                <span>←</span>
                <span>Back to Tools</span>
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Logo size="medium" showUnderline={true} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-8 sm:py-12" style={{ backgroundColor: theme === 'dark' ? '#0C0F16' : '#F2F3F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            
            {/* Left Column - Images and Details */}
            <div>
              {/* Image Gallery */}
              <div className="mb-8">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl mb-6 border-4" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF', borderColor: '#FF5E14' }}>
                  <Image
                    src={tool.images[currentImageIndex]}
                    alt={tool.title}
                    fill
                    className="object-cover"
                  />
                  {tool.images.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentImageIndex((prev) => prev > 0 ? prev - 1 : tool.images.length - 1)}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                      >
                        <span className="text-xl font-bold">‹</span>
                      </button>
                      <button
                        onClick={() => setCurrentImageIndex((prev) => prev < tool.images.length - 1 ? prev + 1 : 0)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                      >
                        <span className="text-xl font-bold">›</span>
                      </button>
                    </>
                  )}
                  
                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 px-3 py-1 bg-black bg-opacity-50 text-white text-sm font-medium rounded-full">
                    {currentImageIndex + 1} / {tool.images.length}
                  </div>
                </div>
                
                {/* Thumbnail Images */}
                {tool.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-3">
                    {tool.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative aspect-square rounded-lg overflow-hidden shadow-md hover:scale-105 transition-all duration-300 border-2 ${
                          index === currentImageIndex ? 'border-orange-500' : 'border-transparent'
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${tool.title} - Image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        {index === currentImageIndex && (
                          <div className="absolute inset-0 bg-orange-500 bg-opacity-20"></div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Tool Details */}
              <div className="p-6 sm:p-8 rounded-2xl shadow-xl" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                  {tool.title}
                </h1>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-2xl sm:text-3xl font-black" style={{ color: '#FF5E14' }}>
                    {tool.price}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    tool.available 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {tool.available ? 'Available' : 'Not Available'}
                  </div>
                </div>

                <p className="text-lg leading-relaxed mb-6" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                  {tool.description}
                </p>

                {/* Specifications */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                    Specifications
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(tool.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between p-3 rounded-lg" style={{ backgroundColor: theme === 'dark' ? '#374151' : '#F8F9FA' }}>
                        <span className="font-medium" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>{key}:</span>
                        <span style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-xl font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                    Features
                  </h3>
                  <ul className="space-y-2">
                    {tool.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FF5E14' }}></span>
                        <span style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column - Contact and Provider Info */}
            <div className="space-y-6">
              {/* Contact Card */}
              <div className="p-6 sm:p-8 rounded-2xl shadow-xl" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
                <h3 className="text-xl sm:text-2xl font-bold mb-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                  Rent This Tool
                </h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">📍</span>
                    <span style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>Location: {tool.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🏷️</span>
                    <span style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>Brand: {tool.brand}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg">⭐</span>
                    <span style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>Condition: {tool.condition}</span>
                  </div>
                </div>

                <Button 
                  className="w-full text-lg font-bold py-3 hover:scale-105 transition-all duration-300 shadow-lg"
                  style={{ 
                    backgroundColor: '#FF5E14',
                    color: '#FFFFFF',
                    border: 'none'
                  }}
                  disabled={!tool.available}
                >
                  {tool.available ? 'Contact Owner' : 'Not Available'}
                </Button>
              </div>

              {/* Advertisement Space */}
              <AdSpace theme={theme} adIndex={adIndex} isVisible={showAd} />

              {/* Provider Info */}
              <div className="p-6 sm:p-8 rounded-2xl shadow-xl" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
                <h3 className="text-xl font-bold mb-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                  Tool Owner
                </h3>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg">
                    <Image
                      src={tool.provider.image}
                      alt={tool.provider.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                      {tool.provider.name}
                    </h4>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">⭐</span>
                        <span className="font-medium" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                          {tool.provider.rating}
                        </span>
                      </div>
                      <span style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                        ({tool.provider.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                  Member since {tool.provider.joinDate}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advertisement Spaces */}
      <div className="py-8 sm:py-12" style={{ backgroundColor: theme === 'dark' ? '#0C0F16' : '#F2F3F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdSpace theme={theme} adIndex={adIndex} isVisible={showAd} />
        </div>
      </div>

      {/* Similar Tools Section */}
      <div className="py-12 sm:py-16" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
            Similar Tools
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {similarTools.map((similarTool) => (
              <Link key={similarTool.id} href={`/tools/${similarTool.id}`}>
                <div className="rounded-2xl shadow-xl overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer" style={{ backgroundColor: theme === 'dark' ? '#374151' : '#F8F9FA' }}>
                  <div className="relative aspect-video">
                    <Image
                      src={similarTool.image}
                      alt={similarTool.title}
                      fill
                      className="object-cover"
                    />
                    {!similarTool.available && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-bold bg-red-500 px-3 py-1 rounded-full text-sm">
                          Not Available
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                      {similarTool.title}
                    </h3>
                    <p className="text-lg font-bold" style={{ color: '#FF5E14' }}>
                      {similarTool.price}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
