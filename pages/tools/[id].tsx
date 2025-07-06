import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '../../src/components/Navigation';
import Footer from '../../src/components/Footer';
import Logo from '../../src/components/Logo';
import { Button } from '../../src/components/ui/button';

// Billboard Advertisement Space Component
const BillboardSpace = ({ title }: { title: string }) => {
  const { theme } = useTheme();
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
        {title}
      </h3>
      
      {/* Large Billboard Space */}
      <div className="relative p-8 rounded-2xl shadow-xl border-3 border-dashed min-h-[350px] flex flex-col items-center justify-center transition-all duration-300 hover:shadow-2xl"
           style={{ 
             backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF',
             borderColor: '#FF5E14'
           }}>
        <div className="text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg" 
               style={{ backgroundColor: '#FF5E14' }}>
            <span className="text-white text-3xl">📢</span>
          </div>
          <h4 className="text-xl font-bold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
            Advertisement Space Available
          </h4>
          <p className="text-base mb-4 leading-relaxed max-w-xs" style={{ color: '#B3B5BC' }}>
            Premium billboard space for your business promotion
          </p>
          <div className="p-4 rounded-lg border-2 border-dashed mb-4" style={{ borderColor: '#FF5E14' }}>
            <span className="text-sm font-medium" style={{ color: '#FF5E14' }}>
              300 × 350 px Billboard
            </span>
          </div>
          <div className="text-xs font-medium px-3 py-1 rounded-full" 
               style={{ backgroundColor: theme === 'dark' ? '#2A2A2A' : '#F8F9FA', color: '#B3B5BC' }}>
            Contact us for advertising rates
          </div>
        </div>
      </div>
      
      {/* Medium Billboard Space */}
      <div className="relative p-6 rounded-2xl shadow-xl border-3 border-dashed min-h-[250px] flex flex-col items-center justify-center transition-all duration-300 hover:shadow-2xl"
           style={{ 
             backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF',
             borderColor: '#001554'
           }}>
        <div className="text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg" 
               style={{ backgroundColor: '#001554' }}>
            <span className="text-white text-2xl">🎯</span>
          </div>
          <h4 className="text-lg font-bold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
            Business Showcase
          </h4>
          <p className="text-sm mb-3 leading-relaxed max-w-xs" style={{ color: '#B3B5BC' }}>
            Promote your products and services
          </p>
          <div className="p-3 rounded-lg border-2 border-dashed mb-3" style={{ borderColor: '#001554' }}>
            <span className="text-xs font-medium" style={{ color: '#001554' }}>
              300 × 250 px Banner
            </span>
          </div>
          <div className="text-xs font-medium px-3 py-1 rounded-full" 
               style={{ backgroundColor: theme === 'dark' ? '#2A2A2A' : '#F8F9FA', color: '#B3B5BC' }}>
            Reserve your space today
          </div>
        </div>
      </div>
      
      {/* Small Billboard Space */}
      <div className="relative p-4 rounded-2xl shadow-xl border-3 border-dashed min-h-[180px] flex flex-col items-center justify-center transition-all duration-300 hover:shadow-2xl"
           style={{ 
             backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF',
             borderColor: '#FF5E14'
           }}>
        <div className="text-center">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg" 
               style={{ backgroundColor: '#FF5E14' }}>
            <span className="text-white text-lg">💼</span>
          </div>
          <h4 className="text-base font-bold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
            Compact Ad Space
          </h4>
          <p className="text-xs mb-2 leading-relaxed max-w-xs" style={{ color: '#B3B5BC' }}>
            Perfect for quick promotions
          </p>
          <div className="p-2 rounded-lg border-2 border-dashed mb-2" style={{ borderColor: '#FF5E14' }}>
            <span className="text-xs font-medium" style={{ color: '#FF5E14' }}>
              300 × 180 px Space
            </span>
          </div>
          <div className="text-xs font-medium px-2 py-1 rounded-full" 
               style={{ backgroundColor: theme === 'dark' ? '#2A2A2A' : '#F8F9FA', color: '#B3B5BC' }}>
            Affordable rates
          </div>
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

                <div className="space-y-6 mb-8">
                  <h3 className="text-xl font-bold text-center" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                    Ready to Rent?
                  </h3>
                  
                  {/* Contact Owner Button */}
                  <button 
                    className="w-full text-xl font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
                    style={{ 
                      backgroundColor: tool.available ? '#FF5E14' : '#999999',
                      color: '#FFFFFF',
                      border: 'none'
                    }}
                    disabled={!tool.available}
                  >
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-2xl">{tool.available ? '🔧' : '❌'}</span>
                      <span>{tool.available ? 'Contact Owner' : 'Not Available'}</span>
                    </div>
                    {tool.available && (
                      <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
                    )}
                  </button>
                  
                  {/* Message Owner Button */}
                  {tool.available && (
                    <button 
                      className="w-full text-xl font-bold py-4 px-8 rounded-xl border-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
                      style={{ 
                        borderColor: '#001554',
                        color: '#001554',
                        backgroundColor: theme === 'dark' ? '#FFFFFF' : '#FFFFFF'
                      }}
                    >
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-2xl">💬</span>
                        <span>Message Owner</span>
                      </div>
                      <div className="absolute inset-0 bg-blue-500 opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
                    </button>
                  )}
                  
                  {/* Rental Info */}
                  <div className="p-4 rounded-xl" style={{ backgroundColor: theme === 'dark' ? '#2A2A2A' : '#F8F9FA' }}>
                    <div className="text-center">
                      <p className="text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                        {tool.available ? 'Instant Booking Available' : 'Currently Unavailable'}
                      </p>
                      {tool.available && (
                        <div className="flex items-center justify-center gap-4 text-xs" style={{ color: '#B3B5BC' }}>
                          <span className="flex items-center gap-1">
                            <span>⚡</span>
                            <span>Quick Setup</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <span>🛡️</span>
                            <span>Insured</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <span>✨</span>
                            <span>Quality Guaranteed</span>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Billboard Advertisement Space */}
              <BillboardSpace title="Advertisement Spaces" />

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
          <BillboardSpace title="Featured Advertisement Spaces" />
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
