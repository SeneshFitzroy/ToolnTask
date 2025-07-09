import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import { Button } from '../src/components/ui/button';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../src/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export default function CreateTask() {
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
    time: '',
    location: '',
    category: 'cleaning',
    image: '',
    deadline: '',
    requirements: [''],
    isUrgent: false,
    additionalInfo: {
      duration: '',
      frequency: '',
      supplies: '',
      notes: ''
    }
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
    const { name, value, type } = e.target;
    
    if (name.startsWith('additionalInfo.')) {
      const infoField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        additionalInfo: {
          ...prev.additionalInfo,
          [infoField]: value
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

  const handleRequirementChange = (index: number, value: string) => {
    const newRequirements = [...formData.requirements];
    newRequirements[index] = value;
    setFormData(prev => ({
      ...prev,
      requirements: newRequirements
    }));
  };

  const addRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }));
  };

  const removeRequirement = (index: number) => {
    const newRequirements = formData.requirements.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      requirements: newRequirements
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validate form
    if (!formData.title || !formData.description || !formData.price || !formData.location) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      // Save task to Firebase
      await addDoc(collection(db, 'tasks'), {
        ...formData,
        requirements: formData.requirements.filter(r => r.trim() !== ''),
        creator: {
          name: user?.displayName || 'Anonymous',
          email: user?.email || '',
          uid: user?.uid
        },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: 'active'
      });

      setSuccess('Task created successfully!');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        price: '',
        time: '',
        location: '',
        category: 'cleaning',
        image: '',
        deadline: '',
        requirements: [''],
        isUrgent: false,
        additionalInfo: {
          duration: '',
          frequency: '',
          supplies: '',
          notes: ''
        }
      });

      // Redirect to tasks page after 2 seconds
      setTimeout(() => {
        router.push('/Tasks');
      }, 2000);
    } catch (error: unknown) {
      console.error('Error creating task:', error);
      const errorMessage = error instanceof Error ? error.message : 'An error occurred while creating the task';
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
              Create New Task
            </h1>
            <p className="text-lg" style={{ color: theme === 'dark' ? '#CCCCCC' : '#444444' }}>
              Post a task and find the right person for the job
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
                  <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                    Task Title *
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
                      color: theme === 'dark' ? '#FFFFFF' : '#001554'
                    }}
                    placeholder="e.g., House Cleaning Service"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
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
                      color: theme === 'dark' ? '#FFFFFF' : '#001554'
                    }}
                    placeholder="e.g., Colombo 03"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
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
                    color: theme === 'dark' ? '#FFFFFF' : '#001554'
                  }}
                  placeholder="Describe the task, what needs to be done, and any specific requirements..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                    Budget *
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
                      backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF',
                      color: theme === 'dark' ? '#FFFFFF' : '#001554'
                    }}
                    placeholder="e.g., Rs. 5,000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                    Duration
                  </label>
                  <input
                    type="text"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border-2 rounded-xl focus:outline-none"
                    style={{ 
                      borderColor: theme === 'dark' ? '#444444' : '#B3B5BC',
                      backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF',
                      color: theme === 'dark' ? '#FFFFFF' : '#001554'
                    }}
                    placeholder="e.g., 2-3 hours"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border-2 rounded-xl focus:outline-none"
                    style={{ 
                      borderColor: theme === 'dark' ? '#444444' : '#B3B5BC',
                      backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF',
                      color: theme === 'dark' ? '#FFFFFF' : '#001554'
                    }}
                  >
                    <option value="cleaning">Cleaning</option>
                    <option value="gardening">Gardening</option>
                    <option value="repairs">Repairs</option>
                    <option value="babysitting">Babysitting</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                    Deadline
                  </label>
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border-2 rounded-xl focus:outline-none"
                    style={{ 
                      borderColor: theme === 'dark' ? '#444444' : '#B3B5BC',
                      backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF',
                      color: theme === 'dark' ? '#FFFFFF' : '#001554'
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                  Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border-2 rounded-xl focus:outline-none"
                  style={{ 
                    borderColor: theme === 'dark' ? '#444444' : '#B3B5BC',
                    backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF',
                    color: theme === 'dark' ? '#FFFFFF' : '#001554'
                  }}
                  placeholder="https://example.com/task-image.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                  Requirements
                </label>
                {formData.requirements.map((requirement, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={requirement}
                      onChange={(e) => handleRequirementChange(index, e.target.value)}
                      className="flex-1 px-4 py-2 border-2 rounded-xl focus:outline-none"
                      style={{ 
                        borderColor: theme === 'dark' ? '#444444' : '#B3B5BC',
                        backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF',
                        color: theme === 'dark' ? '#FFFFFF' : '#001554'
                      }}
                      placeholder="Enter a requirement..."
                    />
                    {formData.requirements.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeRequirement(index)}
                        className="px-3 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addRequirement}
                  className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
                >
                  Add Requirement
                </button>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isUrgent"
                  name="isUrgent"
                  checked={formData.isUrgent}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-orange-500 border-2 border-gray-300 rounded focus:ring-orange-500"
                />
                <label htmlFor="isUrgent" className="text-sm font-semibold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                  Mark as Urgent
                </label>
              </div>

              <Button 
                type="submit"
                disabled={loading}
                className="w-full py-4 text-lg font-bold rounded-xl transition-all duration-300"
                style={{ backgroundColor: loading ? '#ccc' : '#FF5E14', color: '#FFFFFF' }}
              >
                {loading ? 'Creating Task...' : 'Create Task'}
              </Button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
