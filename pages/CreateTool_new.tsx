import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import { Button } from '../src/components/ui/button';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../src/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

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
    address: '',
    district: 'Colombo',
    phoneNumber: '',
    category: 'provide-tool',
    image: '',
    specifications: [''],
    isAvailable: true,
    additionalInfo: {
      condition: '',
      brand: '',
      model: '',
      notes: ''
    }
  });

  useEffect(() => {
    setMounted(true);
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (!user) {
        router.push('/SignIn');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev] as object,
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSpecificationChange = (index: number, value: string) => {
    const newSpecifications = [...formData.specifications];
    newSpecifications[index] = value;
    setFormData(prev => ({ ...prev, specifications: newSpecifications }));
  };

  const addSpecification = () => {
    setFormData(prev => ({ ...prev, specifications: [...prev.specifications, ''] }));
  };

  const removeSpecification = (index: number) => {
    if (formData.specifications.length > 1) {
      const newSpecifications = formData.specifications.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, specifications: newSpecifications }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!formData.title || !formData.description || !formData.price || !formData.address || !formData.district || !formData.phoneNumber) {
      setError('Please fill in all required fields including the phone number');
      setLoading(false);
      return;
    }

    try {
      const toolData = {
        ...formData,
        specifications: formData.specifications.filter(s => s.trim() !== ''),
        creator: {
          name: user?.displayName || 'Anonymous',
          email: user?.email || '',
          uid: user?.uid
        },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: 'active'
      };

      const docRef = await addDoc(collection(db, 'tools'), toolData);
      
      setSuccess('Tool listing posted successfully! People will be able to see your tool.');
      
      setFormData({
        title: '',
        description: '',
        price: '',
        address: '',
        district: 'Colombo',
        phoneNumber: '',
        category: 'provide-tool',
        image: '',
        specifications: [''],
        isAvailable: true,
        additionalInfo: {
          condition: '',
          brand: '',
          model: '',
          notes: ''
        }
      });

      router.push(`/tools/${docRef.id}_enhanced`);
    } catch (error: unknown) {
      console.error('Error creating tool:', error);
      const errorMessage = error instanceof Error ? error.message : 'An error occurred while creating the tool';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

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
              List Your Tool
            </h1>
            <p className="text-lg" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
              Rent out your tools and equipment to others
            </p>
          </div>

          <div className="rounded-3xl shadow-xl p-8" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
            {success && (
              <div className="mb-6 p-4 rounded-xl border-l-4 border-green-500 bg-green-50 text-green-700">
                <p className="font-semibold">{success}</p>
              </div>
            )}
            
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
                    placeholder="e.g., Power Drill, Lawn Mower"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                    Rental Price (LKR/day) *
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
                    placeholder="e.g., 500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                  Tool Description *
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
                  placeholder="Describe your tool, its condition, capabilities, and any usage instructions..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 border-2 rounded-xl focus:outline-none"
                    style={{ 
                      borderColor: theme === 'dark' ? '#444444' : '#B3B5BC',
                      backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                      color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                    }}
                    placeholder="Enter your full address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                    Location (District) *
                  </label>
                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    required
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
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number (e.g., +94 77 123 4567)"
                  required
                  className="w-full px-4 py-4 border-2 rounded-xl focus:outline-none"
                  style={{ 
                    borderColor: theme === 'dark' ? '#444444' : '#B3B5BC',
                    backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                    color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                  Specifications
                </label>
                {formData.specifications.map((specification, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={specification}
                      onChange={(e) => handleSpecificationChange(index, e.target.value)}
                      className="flex-1 px-4 py-3 border-2 rounded-xl focus:outline-none"
                      style={{ 
                        borderColor: theme === 'dark' ? '#444444' : '#B3B5BC',
                        backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                        color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                      }}
                      placeholder={`Specification ${index + 1}`}
                    />
                    {formData.specifications.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeSpecification(index)}
                        className="px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={addSpecification}
                  className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl"
                >
                  Add Specification
                </Button>
              </div>

              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 text-lg font-semibold rounded-xl transition-all duration-300 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  {loading ? 'Creating Tool Listing...' : 'List Tool'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
