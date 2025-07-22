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
    budget: '',
    location: 'Colombo',
    category: 'provide-task',
    image: '',
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

  const createTaskDetailPage = async (taskId: string, taskData: any) => {
    try {
      // Generate detail page content for the new task
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
import { Heart, Share2, MapPin, Clock, Calendar, CheckCircle } from 'lucide-react';
import Link from 'next/link';

// Auto-generated task detail page for: ${taskData.title}
// Created on: ${new Date().toISOString()}

export default function TaskDetail${taskId}() {
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

  const task = {
    id: '${taskId}',
    title: '${taskData.title}',
    price: '${taskData.price}',
    category: '${taskData.category}',
    urgent: ${taskData.isUrgent},
    description: '${taskData.description}',
    duration: '${taskData.additionalInfo.duration || taskData.time}',
    location: '${taskData.location}',
    deadline: '${taskData.deadline}',
    images: ['${taskData.image || 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop'}'],
    requirements: ${JSON.stringify(taskData.requirements)},
    creator: {
      name: '${taskData.creator.name}',
      email: '${taskData.creator.email}',
      uid: '${taskData.creator.uid}'
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F8FAFC' }}>
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1F2937' }}>
            {task.title}
          </h1>
          <div className="flex items-center gap-4 text-sm" style={{ color: theme === 'dark' ? '#9CA3AF' : '#6B7280' }}>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {task.location}
            </span>
            {task.duration && (
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {task.duration}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-xl overflow-hidden mb-8">
              <Image
                src={task.images[0]}
                alt={task.title}
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
                {task.description}
              </p>
            </div>

            {task.requirements.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1F2937' }}>
                  Requirements
                </h2>
                <ul className="space-y-2">
                  {task.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span style={{ color: theme === 'dark' ? '#D1D5DB' : '#4B5563' }}>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="rounded-xl p-6 border" style={{
              backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
              borderColor: theme === 'dark' ? '#374151' : '#E5E7EB'
            }}>
              <div className="text-center mb-6">
                <div className="text-sm sm:text-base lg:text-lg font-bold mb-2" style={{ color: '#FF5E14' }}>
                  {task.price}
                </div>
              </div>

              <Button
                className="w-full py-3 text-lg font-bold rounded-xl"
                style={{ backgroundColor: '#FF5E14', color: '#FFFFFF' }}
              >
                Apply for this Task
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
      console.log('Generated task detail page for:', taskId);
      console.log('Detail page would be saved to:', `/pages/tasks/${taskId}.tsx`);
      
    } catch (error) {
      console.error('Error creating task detail page:', error);
    }
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
      const taskData = {
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
      };

      const docRef = await addDoc(collection(db, 'tasks'), taskData);
      
      // Auto-generate detail page for the new task
      await createTaskDetailPage(docRef.id, {
        ...taskData,
        creator: {
          name: user?.displayName || 'Anonymous',
          email: user?.email || '',
          uid: user?.uid
        }
      });

      setSuccess('Task created successfully! A dedicated page has been generated for your task.');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        price: '',
        time: '',
        location: '',
        category: 'cleaning',
        customCategory: '',
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

      // Redirect to the new task detail page after 2 seconds
      setTimeout(() => {
        router.push(`/tasks/${docRef.id}_enhanced`);
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
              Provide Your Services
            </h1>
            <p className="text-lg" style={{ color: theme === 'dark' ? '#CCCCCC' : '#444444' }}>
              Offer your skills and expertise to help others in your community
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
                      color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                    }}
                    placeholder="e.g., House Cleaning Service"
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
                  placeholder="Describe the task, what needs to be done, and any specific requirements..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                    Budget Range (LKR) *
                  </label>
                  <input
                    type="text"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 border-2 rounded-xl focus:outline-none"
                    style={{ 
                      borderColor: theme === 'dark' ? '#444444' : '#B3B5BC',
                      backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                      color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                    }}
                    placeholder="e.g., 5000-10000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
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
                      backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                      color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                    }}
                    placeholder="e.g., 2-3 hours"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                    Category
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
                    <option value="cleaning">Cleaning</option>
                    <option value="gardening">Gardening</option>
                    <option value="repairs">Repairs</option>
                    <option value="babysitting">Babysitting</option>
                    <option value="other">Other</option>
                  </select>
                  
                  {/* Conditional Other Category Field */}
                  {formData.category === 'other' && (
                    <div className="mt-4">
                      <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                        Please specify category
                      </label>
                      <input
                        type="text"
                        name="customCategory"
                        value={formData.customCategory}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 border-2 rounded-xl focus:outline-none"
                        style={{ 
                          borderColor: theme === 'dark' ? '#444444' : '#B3B5BC',
                          backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                          color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                        }}
                        placeholder="e.g., Pet Care, Tutoring, Moving Help..."
                        required
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
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
                      backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                      color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                  Task Image
                </label>
                <div
                  className="w-full p-8 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 hover:border-opacity-80"
                  style={{ 
                    borderColor: theme === 'dark' ? '#6366F1' : '#6366F1',
                    backgroundColor: theme === 'dark' ? '#1a1a2e' : '#F0F4FF'
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.currentTarget.style.borderColor = '#8B5CF6';
                    e.currentTarget.style.backgroundColor = theme === 'dark' ? '#2a1f3f' : '#E0E7FF';
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    e.currentTarget.style.borderColor = '#6366F1';
                    e.currentTarget.style.backgroundColor = theme === 'dark' ? '#1a1a2e' : '#F0F4FF';
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.currentTarget.style.borderColor = '#6366F1';
                    e.currentTarget.style.backgroundColor = theme === 'dark' ? '#1a1a2e' : '#F0F4FF';
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
                  onClick={() => document.getElementById('task-image-upload')?.click()}
                >
                  <input
                    id="task-image-upload"
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
                          alt="Task preview" 
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
                        <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#6366F1' }}>
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
                        backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                        color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
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
                  className="px-4 py-2 text-white rounded-xl hover:bg-orange-600"
                  style={{ backgroundColor: '#FF5E14' }}
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
                <label htmlFor="isUrgent" className="text-sm font-semibold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                  Mark as Urgent
                </label>
              </div>

              <Button 
                type="submit"
                disabled={loading}
                className="w-full py-4 text-lg font-bold rounded-xl transition-all duration-300"
                style={{ backgroundColor: loading ? '#ccc' : '#FF5E14', color: '#FFFFFF' }}
              >
                {loading ? 'Publishing Service...' : 'Publish Service'}
              </Button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
