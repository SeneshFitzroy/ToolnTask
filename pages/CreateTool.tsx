import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import { Button } from '../src/components/ui/button';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../src/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

// Sri Lankan Districts
const sriLankanDistricts = [
  'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle', 'Gampaha', 
  'Hambantota', 'Jaffna', 'Kalutara', 'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 
  'Mannar', 'Matale', 'Matara', 'Monaragala', 'Mullaitivu', 'Nuwara Eliya', 'Polonnaruwa', 
  'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'
];

export default function CreateTool() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    brand: '',
    condition: 'Good',
    category: 'provide-tool',
    location: 'Colombo',
    phoneNumber: '',
    image: '',
    specifications: {
      power: '',
      size: '',
      weight: '',
      additional: ''
    },
    features: [''],
    available: true
  });

  useEffect(() => {
    setMounted(true);
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      
      // Redirect to login if not authenticated
      if (mounted && !user) {
        router.push('/SignIn');
      }
    });

    return () => unsubscribe();
  }, [mounted, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('specifications.')) {
      const specField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [specField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({
      ...prev,
      features: newFeatures
    }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      features: newFeatures
    }));
  };

  const createToolDetailPage = async (toolId: string, toolData: any) => {
    try {
      // Generate detail page content for the new tool
      const detailPageContent = `import { useRouter } from 'next/router';
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

// Auto-generated tool detail page for: ${toolData.title}
// Created on: ${new Date().toISOString()}

export default function ToolDetail${toolId}() {
  const router = useRouter();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const tool = {
    id: '${toolId}',
    title: '${toolData.title}',
    price: '${toolData.price}',
    category: '${toolData.category}',
    available: ${toolData.available},
    description: '${toolData.description}',
    condition: '${toolData.condition}',
    brand: '${toolData.brand}',
    images: ['${toolData.image || 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&h=600&fit=crop'}'],
    features: ${JSON.stringify(toolData.features)},
    specifications: ${JSON.stringify(toolData.specifications)},
    owner: {
      name: '${toolData.owner.name}',
      email: '${toolData.owner.email}',
      uid: '${toolData.owner.uid}'
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F8FAFC' }}>
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1F2937' }}>
            {tool.title}
          </h1>
          <div className="flex items-center gap-4 text-sm" style={{ color: theme === 'dark' ? '#9CA3AF' : '#6B7280' }}>
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              {tool.condition}
            </span>
            <span className="flex items-center gap-1">
              Brand: {tool.brand}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-xl overflow-hidden mb-8">
              <Image
                src={tool.images[0]}
                alt={tool.title}
                width={800}
                height={400}
                className="object-cover w-full h-64 lg:h-80"
              />
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1F2937' }}>
                Description
              </h2>
              <p className="text-base leading-relaxed" style={{ color: theme === 'dark' ? '#D1D5DB' : '#4B5563' }}>
                {tool.description}
              </p>
            </div>

            {tool.features.length > 0 && (
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
            )}

            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1F2937' }}>
                Specifications
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(tool.specifications).map(([key, value]) => (
                  value && (
                    <div key={key} className="flex justify-between p-3 rounded-lg" style={{
                      backgroundColor: theme === 'dark' ? '#374151' : '#F9FAFB'
                    }}>
                      <span className="font-medium capitalize" style={{ color: theme === 'dark' ? '#D1D5DB' : '#6B7280' }}>{key}</span>
                      <span style={{ color: theme === 'dark' ? '#FFFFFF' : '#1F2937' }}>{value}</span>
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="rounded-xl p-6 border" style={{
              backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
              borderColor: theme === 'dark' ? '#374151' : '#E5E7EB'
            }}>
              <div className="text-center mb-6">
                <div className="text-sm sm:text-base lg:text-lg font-bold mb-2" style={{ color: '#FF5E14' }}>
                  {tool.price}
                </div>
                <div className="text-sm" style={{ color: theme === 'dark' ? '#9CA3AF' : '#6B7280' }}>
                  Rental rate
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span style={{ color: theme === 'dark' ? '#D1D5DB' : '#6B7280' }}>Condition</span>
                  <span style={{ color: theme === 'dark' ? '#FFFFFF' : '#1F2937' }}>{tool.condition}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: theme === 'dark' ? '#D1D5DB' : '#6B7280' }}>Brand</span>
                  <span style={{ color: theme === 'dark' ? '#FFFFFF' : '#1F2937' }}>{tool.brand}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: theme === 'dark' ? '#D1D5DB' : '#6B7280' }}>Availability</span>
                  <span className="flex items-center gap-1">
                    <span className={\`w-2 h-2 rounded-full \${tool.available ? 'bg-green-500' : 'bg-red-500'}\`}></span>
                    <span style={{ color: theme === 'dark' ? '#FFFFFF' : '#1F2937' }}>
                      {tool.available ? 'Available Now' : 'Not Available'}
                    </span>
                  </span>
                </div>
              </div>

              <Button
                disabled={!tool.available}
                className="w-full py-3 text-lg font-bold rounded-xl"
                style={{
                  backgroundColor: tool.available ? '#FF5E14' : '#9CA3AF',
                  color: '#FFFFFF'
                }}
              >
                {tool.available ? 'Rent this Tool' : 'Currently Unavailable'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}`;
      
      // In a real implementation, you would save this to a file or database
      console.log('Generated tool detail page for:', toolId);
      console.log('Detail page would be saved to:', `/pages/tools/${toolId}.tsx`);
      
    } catch (error) {
      console.error('Error creating tool detail page:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validate form
    if (!formData.title || !formData.description || !formData.price || !formData.brand || !formData.location || !formData.address) {
      setError('Please fill in all required fields including the full address');
      setLoading(false);
      return;
    }

    try {
      // Save tool to Firebase
      const toolData = {
        ...formData,
        features: formData.features.filter(f => f.trim() !== ''),
        owner: {
          name: user?.displayName || 'Anonymous',
          email: user?.email || '',
          uid: user?.uid
        },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: 'active'
      };

      const docRef = await addDoc(collection(db, 'tools'), toolData);
      
      // Auto-generate detail page for the new tool
      await createToolDetailPage(docRef.id, {
        ...toolData,
        owner: {
          name: user?.displayName || 'Anonymous',
          email: user?.email || '',
          uid: user?.uid
        }
      });

      setSuccess('Tool created successfully! A dedicated page has been generated for your tool.');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        price: '',
        brand: '',
        condition: 'Good',
        category: 'provide-tool',
        location: 'Colombo',
        address: '',
        image: '',
        specifications: {
          power: '',
          size: '',
          weight: '',
          additional: ''
        },
        features: [''],
        available: true
      });

      // Redirect to the new tool detail page after 2 seconds
      setTimeout(() => {
        router.push(`/tools/${docRef.id}_enhanced`);
      }, 2000);
    } catch (error: unknown) {
      console.error('Error creating tool:', error);
      const errorMessage = error instanceof Error ? error.message : 'An error occurred while creating the tool';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  if (!user) {
    return <div>Redirecting to login...</div>;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F2F3F5' }}>
      <Navigation />
      
      <div className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
              Create New Tool Listing
            </h1>
            <p className="text-lg" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
              Share your tools with the community
            </p>
          </div>

          <div className="rounded-3xl shadow-xl p-8" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
            {/* Success Message */}
            {success && (
              <div className="mb-6 p-4 rounded-xl border-l-4 border-green-500 bg-green-50 text-green-700">
                <p className="font-semibold">{success}</p>
              </div>
            )}
            
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 rounded-xl border-l-4 border-red-500 bg-red-50 text-red-700">
                <p className="font-semibold">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                    Tool Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 border-2 rounded-xl focus:outline-none"
                    style={{ 
                      borderColor: theme === 'dark' ? '#444444' : '#B3B5BC',
                      backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                      color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                    }}
                    placeholder="e.g., Professional Power Drill"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                    Brand *
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 border-2 rounded-xl focus:outline-none"
                    style={{ 
                      borderColor: theme === 'dark' ? '#444444' : '#B3B5BC',
                      backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                      color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                    }}
                    placeholder="e.g., Bosch, DeWalt, Makita"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-4 border-2 rounded-xl focus:outline-none resize-none"
                  style={{ 
                    borderColor: theme === 'dark' ? '#444444' : '#B3B5BC',
                    backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                    color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                  }}
                  placeholder="Describe your tool, its condition, and what it's best used for..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                    Price per Day (LKR) *
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 border-2 rounded-xl focus:outline-none"
                    style={{ 
                      borderColor: theme === 'dark' ? '#444444' : '#B3B5BC',
                      backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                      color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                    }}
                    placeholder="e.g., 1500/day"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                    Service Type
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border-2 rounded-xl focus:outline-none"
                    style={{ 
                      borderColor: theme === 'dark' ? '#444444' : '#B3B5BC',
                      backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                      color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                    }}
                  >
                    <option value="provide-tool">Provide Tool</option>
                    <option value="provide-task">Provide Task</option>
                    <option value="request-tool">Request Tool</option>
                    <option value="request-task">Request Task</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                    Location (District)
                  </label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border-2 rounded-xl focus:outline-none"
                    style={{ 
                      borderColor: theme === 'dark' ? '#444444' : '#B3B5BC',
                      backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                      color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                    }}
                  >
                    {sriLankanDistricts.map((district) => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                    Full Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your full address (street, city, postal code)"
                    rows={3}
                    className="w-full px-4 py-4 border-2 rounded-xl focus:outline-none resize-none"
                    style={{ 
                      borderColor: theme === 'dark' ? '#444444' : '#B3B5BC',
                      backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                      color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                    Condition
                  </label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border-2 rounded-xl focus:outline-none"
                    style={{ 
                      borderColor: theme === 'dark' ? '#444444' : '#B3B5BC',
                      backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                      color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                    }}
                  >
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                  Tool Image
                </label>
                <div
                  className="w-full p-8 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 hover:border-opacity-80"
                  style={{ 
                    borderColor: theme === 'dark' ? '#FF5E14' : '#FF5E14',
                    backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFF7ED'
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.currentTarget.style.borderColor = '#FF8C42';
                    e.currentTarget.style.backgroundColor = theme === 'dark' ? '#2a1a0f' : '#FED7AA';
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    e.currentTarget.style.borderColor = '#FF5E14';
                    e.currentTarget.style.backgroundColor = theme === 'dark' ? '#1a1a1a' : '#FFF7ED';
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.currentTarget.style.borderColor = '#FF5E14';
                    e.currentTarget.style.backgroundColor = theme === 'dark' ? '#1a1a1a' : '#FFF7ED';
                    const files = e.dataTransfer.files;
                    if (files.length > 0) {
                      const file = files[0];
                      if (file.type.startsWith('image/')) {
                        // Here you would typically upload to a service like Firebase Storage
                        // For now, we'll create a preview URL
                        const reader = new FileReader();
                        reader.onload = (e) => {
                          setFormData(prev => ({
                            ...prev,
                            image: e.target?.result as string
                          }));
                        };
                        reader.readAsDataURL(file);
                      }
                    }
                  }}
                  onClick={() => document.getElementById('image-upload')?.click()}
                >
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                          setFormData(prev => ({
                            ...prev,
                            image: e.target?.result as string
                          }));
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <div className="text-center">
                    {formData.image ? (
                      <div className="space-y-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={formData.image} 
                          alt="Tool preview" 
                          className="max-w-full max-h-32 mx-auto rounded-lg shadow-lg"
                        />
                        <p className="text-sm font-medium" style={{ color: '#10B981' }}>
                          ✅ Image uploaded successfully
                        </p>
                        <p className="text-xs" style={{ color: theme === 'dark' ? '#9CA3AF' : '#6B7280' }}>
                          Click to change image
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FF5E14' }}>
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-semibold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs mt-1" style={{ color: theme === 'dark' ? '#9CA3AF' : '#6B7280' }}>
                            PNG, JPG, JPEG up to 10MB
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                  Features
                </label>
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      className="flex-1 px-4 py-2 border-2 rounded-xl focus:outline-none"
                      style={{ 
                        borderColor: theme === 'dark' ? '#444444' : '#B3B5BC',
                        backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                        color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                      }}
                      placeholder="Enter a feature..."
                    />
                    {formData.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="px-3 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFeature}
                  className="px-4 py-2 text-white rounded-xl hover:bg-orange-600"
                  style={{ backgroundColor: '#FF5E14' }}
                >
                  Add Feature
                </button>
              </div>

              <Button 
                type="submit"
                disabled={loading}
                className="w-full py-4 text-lg font-bold rounded-xl transition-all duration-300"
                style={{ backgroundColor: loading ? '#ccc' : '#FF5E14', color: '#FFFFFF' }}
              >
                {loading ? 'Creating Tool...' : 'Create Tool'}
              </Button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
