import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '../../src/components/Navigation';
import Footer from '../../src/components/Footer';
import Logo from '../../src/components/Logo';
import { Button } from '../../src/components/ui/button';

// Simple Clean Billboard Advertisement Component - Enhanced & Bigger
const SimpleBillboard = ({ side }: { side: 'left' | 'right' }) => {
  const { theme } = useTheme();
  const [showInfo, setShowInfo] = useState(false);
  
  return (
    <div className="w-full">
      <div className="sticky top-6">
        <div className="relative p-10 rounded-3xl shadow-xl border-4 border-dashed min-h-[700px] flex flex-col items-center justify-center transition-all duration-300 hover:shadow-2xl hover:scale-105"
             style={{ 
               backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF',
               borderColor: side === 'left' ? '#FF5E14' : '#001554'
             }}>
          
          {/* Enhanced Content */}
          <div className="text-center">
            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl transition-all duration-300 hover:scale-110" 
                 style={{ backgroundColor: side === 'left' ? '#FF5E14' : '#001554' }}>
              <span className="text-white text-4xl">
                {side === 'left' ? '📢' : '🎯'}
              </span>
            </div>
            
            {/* Enhanced Info Button */}
            <button 
              onClick={() => setShowInfo(!showInfo)}
              className="px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-110 hover:shadow-lg transform active:scale-95"
              style={{ 
                backgroundColor: side === 'left' ? '#FF5E14' : '#001554',
                color: '#FFFFFF'
              }}
            >
              ℹ️
            </button>
          </div>

          {/* Enhanced Info Popup */}
          {showInfo && (
            <div className="absolute inset-0 bg-black bg-opacity-90 rounded-3xl flex items-center justify-center p-6 z-10">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-sm text-center shadow-2xl">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg" 
                     style={{ backgroundColor: side === 'left' ? '#FF5E14' : '#001554' }}>
                  <span className="text-white text-2xl">
                    {side === 'left' ? '📢' : '🎯'}
                  </span>
                </div>
                
                <h4 className="text-xl font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                  Premium Advertisement Space
                </h4>
                
                <div className="p-4 rounded-xl border-2 border-dashed mb-4" 
                     style={{ borderColor: side === 'left' ? '#FF5E14' : '#001554' }}>
                  <p className="text-lg font-semibold mb-2" style={{ color: side === 'left' ? '#FF5E14' : '#001554' }}>
                    380 × 700 px
                  </p>
                  <p className="text-sm" style={{ color: '#B3B5BC' }}>
                    Premium {side} side placement
                  </p>
                </div>
                
                <div className="text-sm space-y-2 mb-6" style={{ color: '#B3B5BC' }}>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: side === 'left' ? '#FF5E14' : '#001554' }}></span>
                    Brand promotions & campaigns
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: side === 'left' ? '#FF5E14' : '#001554' }}></span>
                    New product launches
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: side === 'left' ? '#FF5E14' : '#001554' }}></span>
                    Service advertising
                  </div>
                </div>
                
                <div className="text-sm font-bold mb-6 p-3 rounded-lg" 
                     style={{ backgroundColor: theme === 'dark' ? '#2A2A2A' : '#F8F9FA', color: '#B3B5BC' }}>
                  📞 Contact us for advertising rates
                </div>
                
                <button 
                  onClick={() => setShowInfo(false)}
                  className="px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 hover:scale-105"
                  style={{ backgroundColor: side === 'left' ? '#FF5E14' : '#001554' }}
                >
                  Close
                </button>
              </div>
            </div>
          )}
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

  useEffect(() => {
    setMounted(true);
  }, []);

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
      <div className="py-6 sm:py-8" style={{ backgroundColor: theme === 'dark' ? '#0C0F16' : '#F2F3F5' }}>
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

      {/* Main Content with Big Billboards on Both Sides */}
      <div className="py-6 sm:py-8" style={{ backgroundColor: theme === 'dark' ? '#0C0F16' : '#F2F3F5' }}>
        <div className="max-w-8xl mx-auto px-2 sm:px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            
            {/* Left Simple Billboard - Moved closer to border */}
            <div className="lg:col-span-3 hidden lg:block">
              <SimpleBillboard side="left" />
            </div>
            
            {/* Main Content Column */}
            <div className="lg:col-span-6">
              
              {/* Image Gallery */}
              <div className="mb-8">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl mb-6 border-4" 
                     style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF', borderColor: '#FF5E14' }}>
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
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
                      >
                        <span className="text-2xl font-bold">‹</span>
                      </button>
                      <button
                        onClick={() => setCurrentImageIndex((prev) => prev < tool.images.length - 1 ? prev + 1 : 0)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
                      >
                        <span className="text-2xl font-bold">›</span>
                      </button>
                    </>
                  )}
                  
                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 px-4 py-2 bg-black bg-opacity-60 text-white text-sm font-bold rounded-full">
                    {currentImageIndex + 1} / {tool.images.length}
                  </div>
                </div>
                
                {/* Thumbnail Images */}
                {tool.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-4">
                    {tool.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative aspect-square rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-all duration-300 border-3 ${
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
              
              {/* Action Buttons - Positioned directly below image */}
              <div className="mb-8 p-8 rounded-3xl shadow-2xl" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
                <div className="space-y-6">
                  <h3 className="text-2xl sm:text-3xl font-black text-center" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                    Ready to Rent This Tool?
                  </h3>
                  
                  <div className="flex items-center justify-center gap-6 mb-6">
                    <div className="text-3xl sm:text-4xl font-black" style={{ color: '#FF5E14' }}>
                      {tool.price}
                    </div>
                    <div className={`px-4 py-2 rounded-full text-lg font-bold ${
                      tool.available 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {tool.available ? 'Available' : 'Not Available'}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center gap-6 mb-8 text-base" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                    <span className="flex items-center gap-2">
                      <span className="text-xl">📍</span>
                      <span className="font-semibold">{tool.location}</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="text-xl">🏷️</span>
                      <span className="font-semibold">{tool.brand}</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="text-xl">⭐</span>
                      <span className="font-semibold">{tool.condition}</span>
                    </span>
                  </div>
                  
                  {/* Contact Owner Button */}
                  <button 
                    className="w-full text-2xl font-black py-6 px-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
                    style={{ 
                      backgroundColor: tool.available ? '#FF5E14' : '#999999',
                      color: '#FFFFFF',
                      border: 'none'
                    }}
                    disabled={!tool.available}
                  >
                    <div className="flex items-center justify-center gap-4">
                      <span className="text-3xl">{tool.available ? '🔧' : '❌'}</span>
                      <span>{tool.available ? 'Contact Owner' : 'Not Available'}</span>
                    </div>
                    {tool.available && (
                      <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
                    )}
                  </button>
                  
                  {/* Message Owner Button */}
                  {tool.available && (
                    <button 
                      className="w-full text-2xl font-black py-6 px-8 rounded-2xl border-4 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
                      style={{ 
                        borderColor: '#001554',
                        color: '#001554',
                        backgroundColor: theme === 'dark' ? '#FFFFFF' : '#FFFFFF'
                      }}
                    >
                      <div className="flex items-center justify-center gap-4">
                        <span className="text-3xl">💬</span>
                        <span>Message Owner</span>
                      </div>
                      <div className="absolute inset-0 bg-blue-500 opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
                    </button>
                  )}
                  
                  {/* Rental Info */}
                  <div className="p-6 rounded-2xl" style={{ backgroundColor: theme === 'dark' ? '#2A2A2A' : '#F8F9FA' }}>
                    <div className="text-center">
                      <p className="text-lg font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                        {tool.available ? 'Instant Booking Available' : 'Currently Unavailable'}
                      </p>
                      {tool.available && (
                        <div className="flex items-center justify-center gap-6 text-sm font-semibold" style={{ color: '#B3B5BC' }}>
                          <span className="flex items-center gap-2">
                            <span className="text-lg">⚡</span>
                            <span>Quick Setup</span>
                          </span>
                          <span className="flex items-center gap-2">
                            <span className="text-lg">🛡️</span>
                            <span>Insured</span>
                          </span>
                          <span className="flex items-center gap-2">
                            <span className="text-lg">✨</span>
                            <span>Quality Guaranteed</span>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tool Details */}
              <div className="p-8 rounded-3xl shadow-2xl mb-8" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-8" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                  {tool.title}
                </h1>

                <p className="text-xl leading-relaxed mb-8" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                  {tool.description}
                </p>

                {/* Specifications */}
                <div className="mb-8">
                  <h3 className="text-2xl font-black mb-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                    Specifications
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(tool.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between p-4 rounded-xl" style={{ backgroundColor: theme === 'dark' ? '#374151' : '#F8F9FA' }}>
                        <span className="font-bold text-lg" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>{key}:</span>
                        <span className="text-lg" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-2xl font-black mb-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                    Features
                  </h3>
                  <ul className="space-y-3">
                    {tool.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-4">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FF5E14' }}></span>
                        <span className="text-lg" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tool Owner */}
              <div className="p-8 rounded-3xl shadow-2xl" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
                <h3 className="text-2xl font-black mb-8" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                  Tool Owner
                </h3>
                
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden shadow-xl">
                    <Image
                      src={tool.provider.image}
                      alt={tool.provider.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-black" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                      {tool.provider.name}
                    </h4>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500 text-xl">⭐</span>
                        <span className="font-bold text-lg" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                          {tool.provider.rating}
                        </span>
                      </div>
                      <span className="text-lg" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                        ({tool.provider.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-lg" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                  Member since {tool.provider.joinDate}
                </p>
              </div>
            </div>
            
            {/* Right Big Billboard - Moved closer to border */}
            <div className="lg:col-span-3 hidden lg:block">
              <SimpleBillboard side="right" />
            </div>
          </div>
        </div>
      </div>

      {/* Similar Tools Section */}
      <div className="py-16 sm:py-20" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-12 sm:mb-16" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
            Similar Tools
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {similarTools.map((similarTool) => (
              <Link key={similarTool.id} href={`/tools/${similarTool.id}`}>
                <div className="rounded-3xl shadow-2xl overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer" style={{ backgroundColor: theme === 'dark' ? '#374151' : '#F8F9FA' }}>
                  <div className="relative aspect-video">
                    <Image
                      src={similarTool.image}
                      alt={similarTool.title}
                      fill
                      className="object-cover"
                    />
                    {!similarTool.available && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-bold bg-red-500 px-4 py-2 rounded-full text-lg">
                          Not Available
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-black mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                      {similarTool.title}
                    </h3>
                    <p className="text-xl font-black" style={{ color: '#FF5E14' }}>
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
