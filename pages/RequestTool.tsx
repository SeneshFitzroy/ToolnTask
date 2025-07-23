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

export default function RequestTool() {
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
    maxRentalPrice: '',
    location: 'Colombo',
    phoneNumber: '',
    category: 'request-tool',
    urgency: 'normal',
    neededDate: '',
    returnDate: '',
    specifications: [''],
    condition: 'any',
    additionalInfo: {
      pickupPreference: 'flexible',
      deposit: '',
      notes: '',
      alternativeTools: ''
    }
  });

  useEffect(() => {
    setMounted(true);
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [router, mounted]);

  // Show loading state while checking authentication
  if (!mounted) {
    return null;
  }

  // Show sign-in prompt if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F2F3F5' }}>
        <Navigation />
        
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className={`max-w-md w-full rounded-lg border p-8 text-center ${
            theme === 'dark' 
              ? 'border-gray-700 bg-gray-800' 
              : 'border-gray-200 bg-white'
          }`}>
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-violet-100">
                <span className="text-2xl">🔧</span>
              </div>
              <h2 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Sign In Required
              </h2>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                You need to sign in to request tools from the community. This helps us connect you with tool owners safely.
              </p>
            </div>
            
            <div className="space-y-4">
              <Button
                onClick={() => router.push('/SignIn')}
                className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-3"
              >
                Sign In to Continue
              </Button>
              
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Don&apos;t have an account?{' '}
                <button
                  onClick={() => router.push('/SignUp')}
                  className="text-violet-600 hover:text-violet-700 font-medium"
                >
                  Create one here
                </button>
              </p>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name.startsWith('additionalInfo.')) {
      const field = name.replace('additionalInfo.', '');
      setFormData(prev => ({
        ...prev,
        additionalInfo: {
          ...prev.additionalInfo,
          [field]: value
        }
      }));
    } else if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSpecificationChange = (index: number, value: string) => {
    const newSpecs = [...formData.specifications];
    newSpecs[index] = value;
    setFormData(prev => ({
      ...prev,
      specifications: newSpecs
    }));
  };

  const addSpecification = () => {
    setFormData(prev => ({
      ...prev,
      specifications: [...prev.specifications, '']
    }));
  };

  const removeSpecification = (index: number) => {
    const newSpecs = formData.specifications.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      specifications: newSpecs
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (!user) {
        setError('You must be logged in to request a tool');
        return;
      }

      const toolRequest = {
        ...formData,
        type: 'requested',
        status: 'open',
        requestedBy: user.uid,
        requestedByEmail: user.email,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        responses: 0,
        isActive: true
      };

      const docRef = await addDoc(collection(db, 'toolRequests'), toolRequest);
      
      setSuccess('Tool request posted successfully! Tool owners will be able to see your request.');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        maxRentalPrice: '',
        location: 'Colombo',
        phoneNumber: '',
        category: 'request-tool',
        urgency: 'normal',
        neededDate: '',
        returnDate: '',
        specifications: [''],
        condition: 'any',
        additionalInfo: {
          pickupPreference: 'flexible',
          deposit: '',
          notes: '',
          alternativeTools: ''
        }
      });

      // Redirect to tools page after 2 seconds
      setTimeout(() => {
        router.push('/Tools');
      }, 2000);
    } catch (error: unknown) {
      console.error('Error requesting tool:', error);
      const errorMessage = error instanceof Error ? error.message : 'An error occurred while posting your request';
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
              Request a Tool
            </h1>
            <p className="text-lg" style={{ color: theme === 'dark' ? '#CCCCCC' : '#444444' }}>
              Find the perfect tool for your project from local owners
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
                    What tool do you need? *
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
                    placeholder="e.g., Electric Drill, Lawn Mower"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 border-2 rounded-xl focus:outline-none"
                    style={{ 
                      borderColor: theme === 'dark' ? '#444444' : '#B3B5BC',
                      backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                      color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                    }}
                    placeholder="e.g., Colombo 03"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                    Max Rental Price per Day (LKR)
                  </label>
                  <input
                    type="text"
                    name="maxRentalPrice"
                    value={formData.maxRentalPrice}
                    onChange={handleInputChange}
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
                    required
                    className="w-full px-4 py-4 border-2 rounded-xl focus:outline-none"
                    style={{ 
                      borderColor: theme === 'dark' ? '#444444' : '#B3B5BC',
                      backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                      color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                    }}
                  >
                    <option value="request-tool">Request Tool</option>
                    <option value="request-task">Request Task</option>
                    <option value="provide-tool">Provide Tool</option>
                    <option value="provide-task">Provide Task</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                    Location (District) *
                  </label>
                  <select
                    name="location"
                    value={formData.location}
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                    Needed Date *
                  </label>
                  <input
                    type="date"
                    name="neededDate"
                    value={formData.neededDate}
                    onChange={handleInputChange}
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
                    Return Date
                  </label>
                  <input
                    type="date"
                    name="returnDate"
                    value={formData.returnDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border-2 rounded-xl focus:outline-none"
                    style={{ 
                      borderColor: theme === 'dark' ? '#444444' : '#B3B5BC',
                      backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                      color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                    Condition Preference
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
                    <option value="any">Any Condition</option>
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                    Urgency Level
                  </label>
                  <select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border-2 rounded-xl focus:outline-none"
                    style={{ 
                      borderColor: theme === 'dark' ? '#444444' : '#B3B5BC',
                      backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                      color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                    }}
                  >
                    <option value="normal">Normal</option>
                    <option value="high">High Priority</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                  Detailed Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-4 border-2 rounded-xl focus:outline-none resize-vertical"
                  style={{ 
                    borderColor: theme === 'dark' ? '#444444' : '#B3B5BC',
                    backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                    color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                  }}
                  placeholder="Please describe what you need the tool for and any specific requirements..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                  Specifications & Requirements
                </label>
                {formData.specifications.map((spec, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={spec}
                      onChange={(e) => handleSpecificationChange(index, e.target.value)}
                      className="flex-1 px-4 py-3 border-2 rounded-xl focus:outline-none"
                      style={{ 
                        borderColor: theme === 'dark' ? '#444444' : '#B3B5BC',
                        backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                        color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                      }}
                      placeholder="e.g., 18V battery, minimum 1/2 inch chuck"
                    />
                    {formData.specifications.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSpecification(index)}
                        className="px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSpecification}
                  className="mt-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  + Add Specification
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                    Pickup Preference
                  </label>
                  <select
                    name="additionalInfo.pickupPreference"
                    value={formData.additionalInfo.pickupPreference}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border-2 rounded-xl focus:outline-none"
                    style={{ 
                      borderColor: theme === 'dark' ? '#444444' : '#B3B5BC',
                      backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                      color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                    }}
                  >
                    <option value="flexible">Flexible</option>
                    <option value="pickup">I will pickup</option>
                    <option value="delivery">Need delivery</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                    Security Deposit Budget
                  </label>
                  <input
                    type="text"
                    name="additionalInfo.deposit"
                    value={formData.additionalInfo.deposit}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border-2 rounded-xl focus:outline-none"
                    style={{ 
                      borderColor: theme === 'dark' ? '#444444' : '#B3B5BC',
                      backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                      color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                    }}
                    placeholder="e.g., Rs. 10,000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                  Alternative Tools
                </label>
                <input
                  type="text"
                  name="additionalInfo.alternativeTools"
                  value={formData.additionalInfo.alternativeTools}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border-2 rounded-xl focus:outline-none"
                  style={{ 
                    borderColor: theme === 'dark' ? '#444444' : '#B3B5BC',
                    backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                    color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                  }}
                  placeholder="Other tools that would work for your project"
                />
              </div>

              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 text-white"
                  style={{ backgroundColor: loading ? '#cccccc' : '#8B5CF6' }}
                >
                  {loading ? 'Posting Request...' : 'Post Tool Request'}
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
