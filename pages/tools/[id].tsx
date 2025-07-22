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
import { collection, addDoc, serverTimestamp, doc, getDoc, query, where, getDocs, limit } from 'firebase/firestore';
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

interface ToolData {
  id: string;
  title: string;
  description: string;
  price?: string;
  category: string;
  location: string;
  condition?: string;
  brand?: string;
  image?: string;
  images?: string[];
  specifications?: string[] | Record<string, string> | string;
  features?: string[];
  rating?: number;
  reviews?: number;
  owner?: {
    name: string;
    uid: string;
    email?: string;
    image?: string;
    rating?: number;
    reviews?: number;
  };
  provider?: {
    name: string;
    image?: string;
    rating?: number;
    reviews?: number;
    joinDate?: string;
    location?: string;
  };
  createdAt?: Date | { toDate: () => Date };
  status?: string;
  available?: boolean;
}

export default function ToolDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [tool, setTool] = useState<ToolData | null>(null);
  const [similarTools, setSimilarTools] = useState<ToolData[]>([]);
  const [loading, setLoading] = useState(true);

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

  // Fetch tool data from Firestore
  useEffect(() => {
    const fetchTool = async () => {
      if (!id) {
        return;
      }
      
      try {
        const toolDoc = await getDoc(doc(db, 'tools', id as string));
        if (toolDoc.exists()) {
          const toolData = toolDoc.data() as ToolData;
          setTool({
            ...toolData,
            id: toolDoc.id,
            // Set default values for display
            images: toolData.image ? [toolData.image] : ['/placeholder-tool.jpg'],
            rating: toolData.rating || 4.5,
            reviews: toolData.reviews || 89,
            provider: {
              name: toolData.owner?.name || 'Tool Owner',
              rating: 4.5,
              reviews: 89,
              joinDate: '2022',
              location: toolData.location || 'Sri Lanka'
            }
          });
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tool:', error);
        setLoading(false);
      }
    };

    if (mounted && id) {
      fetchTool();
    }
  }, [mounted, id]);

  // Fetch similar tools
  useEffect(() => {
    const fetchSimilarTools = async () => {
      if (!tool || !tool.category) {
        return;
      }
      
      try {
        const q = query(
          collection(db, 'tools'),
          where('category', '==', tool.category),
          limit(3)
        );
        const querySnapshot = await getDocs(q);
        const tools: ToolData[] = [];
        
        querySnapshot.forEach((doc) => {
          if (doc.id !== tool.id) {
            tools.push({
              id: doc.id,
              ...doc.data()
            } as ToolData);
          }
        });
        
        setSimilarTools(tools);
      } catch (error) {
        console.error('Error fetching similar tools:', error);
      }
    };

    if (tool && tool.category) {
      fetchSimilarTools();
    }
  }, [tool]);

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tool details...</p>
        </div>
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Tool not found</p>
          <Link href="/tools">
            <Button className="mt-4">Back to Tools</Button>
          </Link>
        </div>
      </div>
    );
  }

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
                src={tool.images && tool.images.length > 0 ? tool.images[currentImageIndex] : '/placeholder-tool.jpg'}
                alt={tool.title}
                fill
                className="object-cover"
              />
              {tool.images && tool.images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => prev > 0 ? prev - 1 : (tool.images?.length || 1) - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black bg-opacity-50 text-white flex items-center justify-center hover:bg-opacity-75 transition-all duration-300"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => prev < (tool.images?.length || 1) - 1 ? prev + 1 : 0)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black bg-opacity-50 text-white flex items-center justify-center hover:bg-opacity-75 transition-all duration-300"
                  >
                    →
                  </button>
                </>
              )}
            </div>
            
            {/* Thumbnail Navigation */}
            {tool.images && tool.images.length > 1 && (
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
            )}
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
              
              {tool.features && Array.isArray(tool.features) && tool.features.length > 0 && (
                <>
                  <h3 className="text-xl font-black mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                    Features
                  </h3>
                  <ul className="space-y-3 mb-8">
                    {tool.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-green-500 text-xl">✓</span>
                        <span className="text-lg" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {tool.condition && (
                <div className="mb-6">
                  <h3 className="text-xl font-black mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                    Condition
                  </h3>
                  <span className="text-lg" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                    {tool.condition}
                  </span>
                </div>
              )}

              {tool.brand && (
                <div className="mb-6">
                  <h3 className="text-xl font-black mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                    Brand
                  </h3>
                  <span className="text-lg" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                    {tool.brand}
                  </span>
                </div>
              )}
            </div>

            {/* Specifications */}
            {tool.specifications && (
              <div className="p-8 rounded-3xl shadow-2xl" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
                <h2 className="text-2xl font-black mb-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                  Specifications
                </h2>
                <div className="space-y-4">
                  {typeof tool.specifications === 'object' ? (
                    Object.entries(tool.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-3 border-b" 
                           style={{ borderColor: theme === 'dark' ? '#2A2A2A' : '#E5E7EB' }}>
                        <span className="font-semibold text-lg" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                          {key}
                        </span>
                        <span className="text-lg" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                          {value}
                        </span>
                      </div>
                    ))
                  ) : Array.isArray(tool.specifications) ? (
                    tool.specifications.map((spec, index) => (
                      <div key={index} className="py-2">
                        <span className="text-lg" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                          {spec}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="py-2">
                      <span className="text-lg" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                        {tool.specifications}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Tool Owner Profile */}
          <div className="mb-12">
            <div className="p-8 rounded-3xl shadow-2xl" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FFFFFF' }}>
              <h3 className="text-2xl font-black mb-8" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                Tool Owner
              </h3>
              
              <div className="flex items-center gap-6 mb-6">
                <div className="w-20 h-20 rounded-full overflow-hidden shadow-xl bg-gray-200">
                  <Image
                    src={tool.provider?.image || '/placeholder-user.jpg'}
                    alt={tool.provider?.name || 'Tool Owner'}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xl font-black" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1818' }}>
                    {tool.provider?.name || 'Tool Owner'}
                  </h4>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500 text-xl">⭐</span>
                      <span className="font-bold text-lg" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                        {tool.provider?.rating || tool.rating || 4.5}
                      </span>
                    </div>
                    <span className="text-lg" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                      ({tool.provider?.reviews || tool.reviews || 0} reviews)
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-lg" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                Member since {tool.provider?.joinDate || '2023'} • {tool.provider?.location || tool.location || 'Sri Lanka'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Tools Section */}
      {similarTools.length > 0 && (
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
                        src={similarTool.image || '/placeholder-tool.jpg'}
                        alt={similarTool.title}
                        fill
                        className="object-cover"
                      />
                      {similarTool.status === 'unavailable' && (
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
                        {similarTool.price || 'Contact for Price'}
                      </p>
                      {similarTool.location && (
                        <p className="text-sm mt-2" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                          📍 {similarTool.location}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
    </>
  );
}
