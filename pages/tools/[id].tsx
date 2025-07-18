import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '../../src/components/Navigation';
import Footer from '../../src/components/Footer';
import Logo from '../../src/components/Logo';
import TopBanner from '../../src/components/TopBanner';
import { Button } from '../../src/components/ui/button';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../../src/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

// Function to track tool views
const trackToolView = async (toolId: string, userId?: string) => {
  try {
    await addDoc(collection(db, 'tool_views'), {
      toolId,
      userId: userId || null,
      timestamp: serverTimestamp(),
      type: 'view'
    });
  } catch (error) {
    console.error('Error tracking tool view:', error);
  }
};

// Function to track contact clicks
const trackContactClick = async (toolId: string, userId?: string, action: string = 'contact') => {
  try {
    await addDoc(collection(db, 'tool_interactions'), {
      toolId,
      userId: userId || null,
      action,
      timestamp: serverTimestamp(),
      type: 'contact'
    });
  } catch (error) {
    console.error('Error tracking contact click:', error);
  }
};

export default function ToolDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setMounted(true);
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (mounted && id) {
      // Track tool view on mount
      trackToolView(id as string, user?.uid);
    }
  }, [mounted, id, user]);

  const handleContactOwner = () => {
    // Track contact button click
    trackContactClick(id as string, user?.uid, 'contact');
  };

  if (!mounted) return null;

  // Sample tool data (in a real app, this would come from an API)
  const tool = {
    id: id,
    title: "Professional Power Drill Set",
    brand: "DeWalt",
    price: "Rs. 2,500/day",
    rating: 4.8,
    reviews: 156,
    available: true,
    category: "Power Tools",
    images: [
      "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1609010697446-11f2155278f0?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583394838739-9ed14acade7c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
    ],
    description: "Professional-grade power drill set perfect for construction, woodworking, and DIY projects. Includes multiple drill bits, screwdriver attachments, and a durable carrying case.",
    specifications: {
      "Power": "18V Li-ion",
      "Chuck Size": "13mm",
      "Max Torque": "65 Nm",
      "Speed": "0-400/1,500 RPM",
      "Weight": "1.4 kg",
      "Battery Life": "4-6 hours"
    },
    features: [
      "LED work light for precision drilling",
      "Ergonomic grip for comfort",
      "Variable speed trigger",
      "Reverse function",
      "Belt clip included",
      "Quick-change chuck"
    ],
    provider: {
      name: "Ahmed Hassan",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      reviews: 89,
      joinDate: "2022",
      location: "Colombo 07"
    }
  };

  const similarTools = [
    {
      id: 2,
      title: "Angle Grinder",
      price: "Rs. 1,500/day",
      image: "https://images.unsplash.com/photo-1583394838739-9ed14acade7c?w=400&h=300&fit=crop",
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
    <>
      {/* CSS for fade-in animation */}
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-in-out;
        }
      `}</style>
      
      <div className="min-h-screen" style={{ backgroundColor: theme === 'dark' ? '#0C0F16' : '#F2F3F5' }}>
        <Navigation />
        <TopBanner />
      
      {/* Hero Section with Back Button */}
      <div className="py-8 sm:py-12" style={{ backgroundColor: theme === 'dark' ? '#0C0F16' : '#F2F3F5' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <Link href="/Tools">
              <Button 
                variant="ghost" 
                className="flex items-center gap-2 text-lg font-semibold hover:scale-105 transition-all duration-300"
                style={{
                  color: theme === 'dark' ? '#FFFFFF' : '#1A1818',
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

      {/* Clean Professional Main Content */}
      <div className="py-8 sm:py-12" style={{ backgroundColor: theme === 'dark' ? '#0C0F16' : '#F2F3F5' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Image Gallery */}
          <div className="mb-12">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl mb-8 border-4" 
                 style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF', borderColor: '#FF5E14' }}>
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
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black bg-opacity-50 text-white flex items-center justify-center hover:bg-opacity-75 transition-all duration-300"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => prev < tool.images.length - 1 ? prev + 1 : 0)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black bg-opacity-50 text-white flex items-center justify-center hover:bg-opacity-75 transition-all duration-300"
                  >
                    →
                  </button>
                </>
              )}
            </div>
            
            {/* Thumbnail Navigation */}
            <div className="flex gap-4 justify-center">
              {tool.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 hover:scale-110 ${
                    index === currentImageIndex ? 'border-orange-500 shadow-lg' : 'border-gray-300'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${tool.title} view ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Action Section - Prominently placed */}
          <div className="mb-12">
            <div className="p-8 rounded-3xl shadow-2xl text-center" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
              <h1 className="text-3xl sm:text-4xl font-black mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                {tool.title}
              </h1>
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="text-3xl font-black" style={{ color: '#FF5E14' }}>
                  {tool.price}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500 text-2xl">⭐</span>
                  <span className="text-xl font-bold" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                    {tool.rating}
                  </span>
                  <span className="text-lg" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                    ({tool.reviews} reviews)
                  </span>
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <Button 
                  className="px-8 py-4 text-lg font-bold rounded-full hover:scale-105 transition-all duration-300"
                  style={{ backgroundColor: '#FF5E14', color: '#FFFFFF' }}
                  onClick={handleContactOwner}
                >
                  Contact Owner
                </Button>
                <Button 
                  variant="outline"
                  className="px-8 py-4 text-lg font-bold rounded-full hover:scale-105 transition-all duration-300"
                  style={{ borderColor: theme === 'dark' ? '#FFFFFF' : '#2D3748', color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}
                  onClick={() => trackContactClick(id as string, user?.uid, 'message')}
                >
                  Message Owner
                </Button>
              </div>
            </div>
          </div>

          {/* Tool Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            
            {/* Description & Features */}
            <div className="p-8 rounded-3xl shadow-2xl" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
              <h2 className="text-2xl font-black mb-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                Description
              </h2>
              <p className="text-lg mb-8 leading-relaxed" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                {tool.description}
              </p>
              
              <h3 className="text-xl font-black mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                Features
              </h3>
              <ul className="space-y-3">
                {tool.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <span className="text-lg" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications */}
            <div className="p-8 rounded-3xl shadow-2xl" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
              <h2 className="text-2xl font-black mb-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                Specifications
              </h2>
              <div className="space-y-4">
                {Object.entries(tool.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-3 border-b" 
                       style={{ borderColor: theme === 'dark' ? '#2A2A2A' : '#E5E7EB' }}>
                    <span className="font-semibold text-lg" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                      {key}
                    </span>
                    <span className="text-lg" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tool Owner Profile */}
          <div className="mb-12">
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
                Member since {tool.provider.joinDate} • {tool.provider.location}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Tools Section */}
      <div className="py-16 sm:py-20" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-12 sm:mb-16" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
            Similar Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {similarTools.map((similarTool) => (
              <Link key={similarTool.id} href={`/tools/${similarTool.id}`}>
                <div className="p-6 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 cursor-pointer"
                     style={{ backgroundColor: theme === 'dark' ? '#0C0F16' : '#F2F3F5' }}>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 shadow-lg">
                    <Image
                      src={similarTool.image}
                      alt={similarTool.title}
                      fill
                      className="object-cover"
                    />
                    {!similarTool.available && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">Not Available</span>
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
    </>
  );
}
