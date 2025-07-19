import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Navigation from '../../src/components/Navigation';
import Footer from '../../src/components/Footer';
import { Button } from '../../src/components/ui/button';
import { collection, addDoc, serverTimestamp, doc, setDoc, deleteDoc, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '../../src/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { Heart, Share2, MapPin, Calendar, Star, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { generateToolData, ToolData } from '../../src/lib/gigDataService';

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

// Function to track rental clicks
const trackRentalClick = async (toolId: string, userId?: string, action: string = 'rent') => {
  try {
    await addDoc(collection(db, 'tool_interactions'), {
      toolId,
      userId: userId || null,
      action,
      timestamp: serverTimestamp(),
      type: 'rental'
    });
  } catch (error) {
    console.error('Error tracking rental click:', error);
  }
};

export default function ToolDetailEnhanced() {
  const router = useRouter();
  const { id } = router.query;
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [tool, setTool] = useState<ToolData | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const checkIfSaved = async () => {
      if (user && id) {
        try {
          const savedQuery = query(
            collection(db, 'saved_tools'),
            where('userId', '==', user.uid),
            where('toolId', '==', id)
          );
          const savedSnapshot = await getDocs(savedQuery);
          setIsSaved(!savedSnapshot.empty);
        } catch (error) {
          console.error('Error checking if tool is saved:', error);
        }
      }
    };

    if (mounted && id) {
      // Generate unique tool data based on ID
      const uniqueTool = generateToolData(id as string);
      setTool(uniqueTool);
      
      // Track tool view on mount
      trackToolView(id as string, user?.uid);
      
      // Check if tool is saved
      checkIfSaved();
    }
  }, [mounted, id, user]);

  const checkIfSaved = async () => {
    if (user && id) {
      try {
        const savedQuery = query(
          collection(db, 'saved_tools'),
          where('userId', '==', user.uid),
          where('toolId', '==', id)
        );
        const savedDocs = await getDocs(savedQuery);
        setIsSaved(!savedDocs.empty);
      } catch (error) {
        console.error('Error checking saved status:', error);
      }
    }
  };

  const handleSaveToggle = async () => {
    if (!user) {
      router.push('/SignIn');
      return;
    }

    try {
      const saveId = `${user.uid}_${id}`;
      
      if (isSaved) {
        // Remove from saved
        await deleteDoc(doc(db, 'saved_tools', saveId));
        setIsSaved(false);
      } else {
        // Add to saved
        await setDoc(doc(db, 'saved_tools', saveId), {
          userId: user.uid,
          toolId: id,
          userEmail: user.email,
          savedAt: serverTimestamp(),
          type: 'tool'
        });
        setIsSaved(true);
      }
    } catch (error) {
      console.error('Error toggling save status:', error);
    }
  };

  const handleShare = async () => {
    const currentUrl = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: tool.title,
          text: tool.description,
          url: currentUrl,
        });
      } catch (error) {
        console.log('Error sharing:', error);
        setShowShareModal(true);
      }
    } else {
      setShowShareModal(true);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleRentClick = () => {
    // Track rental click
    if (id && user) {
      trackRentalClick(id as string, user.uid, 'rent');
    }
  };

  if (!mounted) {
    return null;
  }

  // Sample tool data (in a real app, this would come from an API)
  const tool = {
    id: id,
    title: "Professional Drill Set with Bits",
    price: "Rs. 800/day",
    category: "Power Tools",
    available: true,
    description: "High-quality professional drill set perfect for home improvement projects, furniture assembly, and general construction work. Includes multiple drill bits, screwdriver attachments, and extension bits. Cordless with long-lasting battery, suitable for both indoor and outdoor use.",
    location: "Colombo 05",
    posted: "1 week ago",
    condition: "Excellent",
    deposit: "Rs. 2,000",
    images: [
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1609617052234-43950c65e5d2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&h=600&fit=crop"
    ],
    features: [
      "18V lithium-ion battery",
      "15 torque settings",
      "LED work light",
      "Quick-change chuck",
      "Belt clip included",
      "Complete bit set (20+ pieces)"
    ],
    specifications: {
      "Max Torque": "55 Nm",
      "Battery Life": "4-6 hours",
      "Chuck Size": "13mm",
      "Weight": "1.8 kg",
      "Brand": "DeWalt",
      "Warranty": "2 years"
    },
    owner: {
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 4.8,
      toolsRented: 36,
      memberSince: "March 2022",
      responseTime: "Usually responds within 2 hours"
    }
  };

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F8FAFC' }}>
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-6 text-sm">
          <Link href="/" className="hover:underline" style={{ color: theme === 'dark' ? '#9CA3AF' : '#6B7280' }}>Home</Link>
          <span className="mx-2" style={{ color: theme === 'dark' ? '#4B5563' : '#9CA3AF' }}>/</span>
          <Link href="/Tools" className="hover:underline" style={{ color: theme === 'dark' ? '#9CA3AF' : '#6B7280' }}>Tools</Link>
          <span className="mx-2" style={{ color: theme === 'dark' ? '#4B5563' : '#9CA3AF' }}>/</span>
          <span style={{ color: theme === 'dark' ? '#E5E7EB' : '#374151' }}>{tool.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header with Save/Share */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1F2937' }}>
                    {tool.title}
                  </h1>
                  {tool.available && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
                      AVAILABLE
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm" style={{ color: theme === 'dark' ? '#9CA3AF' : '#6B7280' }}>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {tool.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {tool.posted}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {tool.condition}
                  </span>
                </div>
              </div>
              
              {/* Save and Share Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSaveToggle}
                  className={`p-3 rounded-full transition-all duration-200 ${
                    isSaved 
                      ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  style={{
                    backgroundColor: isSaved 
                      ? (theme === 'dark' ? '#7F1D1D' : '#FEE2E2')
                      : (theme === 'dark' ? '#374151' : '#F3F4F6'),
                    color: isSaved 
                      ? (theme === 'dark' ? '#FCA5A5' : '#DC2626')
                      : (theme === 'dark' ? '#9CA3AF' : '#6B7280')
                  }}
                >
                  <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                </button>
                
                <button
                  onClick={handleShare}
                  className="p-3 rounded-full transition-all duration-200"
                  style={{
                    backgroundColor: theme === 'dark' ? '#374151' : '#F3F4F6',
                    color: theme === 'dark' ? '#9CA3AF' : '#6B7280'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = theme === 'dark' ? '#4B5563' : '#E5E7EB';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = theme === 'dark' ? '#374151' : '#F3F4F6';
                  }}
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="mb-8">
              <div className="relative h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden mb-4">
                <Image
                  src={tool.images[currentImageIndex]}
                  alt={tool.title}
                  fill
                  className="object-cover"
                />
                {tool.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex(prev => prev === 0 ? tool.images.length - 1 : prev - 1)}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex(prev => prev === tool.images.length - 1 ? 0 : prev + 1)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                    >
                      →
                    </button>
                  </>
                )}
              </div>
              
              {/* Thumbnail Navigation */}
              {tool.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {tool.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                        currentImageIndex === index 
                          ? 'border-orange-500' 
                          : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${tool.title} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1F2937' }}>
                Description
              </h2>
              <p className="text-base leading-relaxed" style={{ color: theme === 'dark' ? '#D1D5DB' : '#4B5563' }}>
                {tool.description}
              </p>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1F2937' }}>
                Features
              </h2>
              <ul className="space-y-2">
                {tool.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span style={{ color: theme === 'dark' ? '#D1D5DB' : '#4B5563' }}>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1F2937' }}>
                Specifications
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(tool.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between p-3 rounded-lg" style={{
                    backgroundColor: theme === 'dark' ? '#374151' : '#F9FAFB'
                  }}>
                    <span className="font-medium" style={{ color: theme === 'dark' ? '#D1D5DB' : '#6B7280' }}>{key}</span>
                    <span style={{ color: theme === 'dark' ? '#FFFFFF' : '#1F2937' }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Price & Rent Card */}
            <div className="rounded-xl p-6 mb-6 border" style={{
              backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
              borderColor: theme === 'dark' ? '#374151' : '#E5E7EB'
            }}>
              <div className="text-center mb-6">
                <div className="text-3xl font-bold mb-2" style={{ color: '#FF5E14' }}>
                  {tool.price}
                </div>
                <div className="text-sm" style={{ color: theme === 'dark' ? '#9CA3AF' : '#6B7280' }}>
                  Rental rate per day
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span style={{ color: theme === 'dark' ? '#D1D5DB' : '#6B7280' }}>Condition</span>
                  <span style={{ color: theme === 'dark' ? '#FFFFFF' : '#1F2937' }}>{tool.condition}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: theme === 'dark' ? '#D1D5DB' : '#6B7280' }}>Security Deposit</span>
                  <span style={{ color: theme === 'dark' ? '#FFFFFF' : '#1F2937' }}>{tool.deposit}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: theme === 'dark' ? '#D1D5DB' : '#6B7280' }}>Category</span>
                  <span style={{ color: theme === 'dark' ? '#FFFFFF' : '#1F2937' }}>{tool.category}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: theme === 'dark' ? '#D1D5DB' : '#6B7280' }}>Availability</span>
                  <span className="flex items-center gap-1">
                    <span className={`w-2 h-2 rounded-full ${tool.available ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span style={{ color: theme === 'dark' ? '#FFFFFF' : '#1F2937' }}>
                      {tool.available ? 'Available Now' : 'Not Available'}
                    </span>
                  </span>
                </div>
              </div>

              <Button
                onClick={handleRentClick}
                disabled={!tool.available}
                className="w-full py-3 text-lg font-bold rounded-xl transition-all duration-200 hover:scale-105 disabled:hover:scale-100 disabled:opacity-50"
                style={{
                  backgroundColor: tool.available ? '#FF5E14' : '#9CA3AF',
                  color: '#FFFFFF',
                  border: 'none'
                }}
                onMouseEnter={(e) => {
                  if (tool.available) {
                    e.currentTarget.style.backgroundColor = '#E54D0F';
                  }
                }}
                onMouseLeave={(e) => {
                  if (tool.available) {
                    e.currentTarget.style.backgroundColor = '#FF5E14';
                  }
                }}
              >
                {tool.available ? 'Rent this Tool' : 'Currently Unavailable'}
              </Button>
            </div>

            {/* Owner Info */}
            <div className="rounded-xl p-6 border" style={{
              backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
              borderColor: theme === 'dark' ? '#374151' : '#E5E7EB'
            }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1F2937' }}>
                Tool Owner
              </h3>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={tool.owner.avatar}
                    alt={tool.owner.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1F2937' }}>
                    {tool.owner.name}
                  </h4>
                  <div className="flex items-center gap-1 text-sm" style={{ color: theme === 'dark' ? '#9CA3AF' : '#6B7280' }}>
                    ⭐ {tool.owner.rating} • {tool.owner.toolsRented} rentals
                  </div>
                </div>
              </div>

              <div className="text-sm space-y-1" style={{ color: theme === 'dark' ? '#9CA3AF' : '#6B7280' }}>
                <div>Member since {tool.owner.memberSince}</div>
                <div>{tool.owner.toolsRented} successful rentals</div>
                <div>{tool.owner.responseTime}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="rounded-xl p-6 max-w-md w-full" style={{
            backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF'
          }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1F2937' }}>
              Share this Tool
            </h3>
            
            <div className="space-y-4">
              {/* Copy Link */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#D1D5DB' : '#6B7280' }}>
                  Share Link
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentUrl}
                    readOnly
                    className="flex-1 px-3 py-2 border rounded-lg text-sm"
                    style={{
                      backgroundColor: theme === 'dark' ? '#374151' : '#F9FAFB',
                      borderColor: theme === 'dark' ? '#4B5563' : '#D1D5DB',
                      color: theme === 'dark' ? '#E5E7EB' : '#374151'
                    }}
                  />
                  <Button
                    onClick={() => copyToClipboard(currentUrl)}
                    className="px-4 py-2 rounded-lg"
                    style={{
                      backgroundColor: copySuccess ? '#10B981' : '#FF5E14',
                      color: '#FFFFFF'
                    }}
                  >
                    {copySuccess ? '✓' : 'Copy'}
                  </Button>
                </div>
              </div>

              {/* Social Share Options */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#D1D5DB' : '#6B7280' }}>
                  Share on Social Media
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    Facebook
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(tool.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600 transition-colors"
                  >
                    Twitter
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(tool.title + ' - ' + currentUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button
                onClick={() => setShowShareModal(false)}
                className="px-6 py-2 rounded-lg"
                style={{
                  backgroundColor: theme === 'dark' ? '#374151' : '#F3F4F6',
                  color: theme === 'dark' ? '#E5E7EB' : '#374151'
                }}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
