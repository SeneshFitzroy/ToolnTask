import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Navigation from '../../src/components/Navigation';
import Footer from '../../src/components/Footer';
import { collection, addDoc, serverTimestamp, doc, getDoc, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db, auth } from '../../src/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { MapPin, Clock, Calendar, CheckCircle, Star } from 'lucide-react';
import { Button } from '../../src/components/ui/button';
import Link from 'next/link';

// Function to track task views
const trackTaskView = async (taskId: string, userId?: string) => {
  try {
    await addDoc(collection(db, 'task_views'), {
      taskId,
      userId: userId || null,
      timestamp: serverTimestamp(),
      type: 'view'
    });
  } catch (error) {
    console.error('Error tracking task view:', error);
  }
};

// Function to track application clicks
const trackApplicationClick = async (taskId: string, userId?: string, action: string = 'apply') => {
  try {
    await addDoc(collection(db, 'task_interactions'), {
      taskId,
      userId: userId || null,
      action,
      timestamp: serverTimestamp(),
      type: 'application'
    });
  } catch (error) {
    console.error('Error tracking application click:', error);
  }
};

interface TaskData {
  id: string;
  title: string;
  description: string;
  price?: string;
  budget?: string;
  category: string;
  location: string;
  duration?: string;
  urgency?: string;
  isUrgent?: boolean;
  image?: string;
  images?: string[];
  requirements?: string[];
  creator?: {
    name: string;
    uid: string;
    email?: string;
    image?: string;
    rating?: number;
    reviews?: number;
  };
  createdAt?: Date | { toDate: () => Date };
  deadline?: string;
  status?: string;
}

export default function TaskDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [task, setTask] = useState<TaskData | null>(null);
  const [similarTasks, setSimilarTasks] = useState<TaskData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!mounted || !id) return;

    const fetchTaskData = async () => {
      setLoading(true);
      
      try {
        // Try to fetch from tasks collection first
        let taskDoc = await getDoc(doc(db, 'tasks', id as string));
        
        if (!taskDoc.exists()) {
          // If not found in tasks, try taskRequests
          taskDoc = await getDoc(doc(db, 'taskRequests', id as string));
        }
        
        if (taskDoc.exists()) {
          const taskData = { id: taskDoc.id, ...taskDoc.data() } as TaskData;
          setTask(taskData);
          
          // Fetch similar tasks from the same category
          await fetchSimilarTasks(taskData.category, id as string);
        } else {
          console.error('Task not found');
          setTask(null);
        }
      } catch (error) {
        console.error('Error fetching task:', error);
        setTask(null);
      } finally {
        setLoading(false);
      }
    };

    const fetchSimilarTasks = async (category: string, currentTaskId: string) => {
      try {
        // Fetch similar tasks from the same category
        const tasksQuery = query(
          collection(db, 'tasks'),
          where('category', '==', category),
          orderBy('createdAt', 'desc'),
          limit(6)
        );
        
        const tasksSnapshot = await getDocs(tasksQuery);
        const tasks = tasksSnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() } as TaskData))
          .filter(task => task.id !== currentTaskId)
          .slice(0, 3);
        
        setSimilarTasks(tasks);
      } catch (error) {
        console.error('Error fetching similar tasks:', error);
      }
    };

    fetchTaskData();
    // Track task view on mount
    trackTaskView(id as string, user?.uid);
  }, [mounted, id, user]);

  const handleApplyClick = () => {
    // Track application click
    if (id && user) {
      trackApplicationClick(id as string, user.uid, 'apply');
    }
    
    // Here you could implement actual application logic
    alert('Application functionality coming soon!');
  };

  const getDisplayImages = () => {
    if (task?.images && task.images.length > 0) {
      return task.images;
    } else if (task?.image) {
      return [task.image];
    } else {
      // Default placeholder image
      return ['https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop'];
    }
  };

  if (!mounted) return null;
  
  if (loading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F8FAFC' }}>
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Loading task details...
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!task) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F8FAFC' }}>
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Task Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              The task you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Link href="/Tasks">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                Back to Tasks
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const displayImages = getDisplayImages();

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F8FAFC' }}>
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-6 text-sm">
          <Link href="/" className="hover:underline" style={{ color: theme === 'dark' ? '#9CA3AF' : '#6B7280' }}>
            Home
          </Link>
          <span className="mx-2" style={{ color: theme === 'dark' ? '#4B5563' : '#9CA3AF' }}>
            /
          </span>
          <Link href="/Tasks" className="hover:underline" style={{ color: theme === 'dark' ? '#9CA3AF' : '#6B7280' }}>
            Tasks
          </Link>
          <span className="mx-2" style={{ color: theme === 'dark' ? '#4B5563' : '#9CA3AF' }}>
            /
          </span>
          <span style={{ color: theme === 'dark' ? '#E5E7EB' : '#374151' }}>
            {task.title}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1F2937' }}>
                  {task.title}
                </h1>
                {task.isUrgent && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800">
                    URGENT
                  </span>
                )}
              </div>
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
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {task.deadline || 'Open deadline'}
                </span>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="mb-8">
              <div className="relative h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden mb-4">
                <Image
                  src={displayImages[currentImageIndex]}
                  alt={task.title}
                  fill
                  className="object-cover"
                />
                {displayImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex(prev => prev === 0 ? displayImages.length - 1 : prev - 1)}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex(prev => prev === displayImages.length - 1 ? 0 : prev + 1)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                    >
                      →
                    </button>
                  </>
                )}
              </div>
              
              {/* Thumbnail Navigation */}
              {displayImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {displayImages.map((image, index) => (
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
                        alt={`${task.title} ${index + 1}`}
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
                {task.description}
              </p>
            </div>

            {/* Requirements */}
            {task.requirements && task.requirements.length > 0 && (
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

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Price & Apply Card */}
            <div className="rounded-xl p-6 mb-6 border" style={{
              backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
              borderColor: theme === 'dark' ? '#374151' : '#E5E7EB'
            }}>
              <div className="text-center mb-6">
                <div className="text-3xl font-bold mb-2" style={{ color: '#FF5E14' }}>
                  {task.price || task.budget || 'Negotiable'}
                </div>
                <div className="text-sm" style={{ color: theme === 'dark' ? '#9CA3AF' : '#6B7280' }}>
                  Budget for this task
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span style={{ color: theme === 'dark' ? '#D1D5DB' : '#6B7280' }}>Category</span>
                  <span style={{ color: theme === 'dark' ? '#FFFFFF' : '#1F2937' }}>{task.category}</span>
                </div>
                {task.duration && (
                  <div className="flex justify-between">
                    <span style={{ color: theme === 'dark' ? '#D1D5DB' : '#6B7280' }}>Duration</span>
                    <span style={{ color: theme === 'dark' ? '#FFFFFF' : '#1F2937' }}>{task.duration}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span style={{ color: theme === 'dark' ? '#D1D5DB' : '#6B7280' }}>Urgency</span>
                  <span className="flex items-center gap-1">
                    <span className={`w-2 h-2 rounded-full ${task.isUrgent ? 'bg-red-500' : 'bg-green-500'}`}></span>
                    <span style={{ color: theme === 'dark' ? '#FFFFFF' : '#1F2937' }}>
                      {task.isUrgent ? 'Urgent' : 'Standard'}
                    </span>
                  </span>
                </div>
              </div>

              <Button
                onClick={handleApplyClick}
                className="w-full py-3 text-lg font-bold rounded-xl transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: '#FF5E14',
                  color: '#FFFFFF',
                  border: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#E54D0F';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FF5E14';
                }}
              >
                Apply for this Task
              </Button>
            </div>

            {/* Creator Info */}
            {task.creator && (
              <div className="rounded-xl p-6 border" style={{
                backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                borderColor: theme === 'dark' ? '#374151' : '#E5E7EB'
              }}>
                <h3 className="text-lg font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1F2937' }}>
                  Task Creator
                </h3>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={task.creator.image || 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'}
                      alt={task.creator.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1F2937' }}>
                      {task.creator.name}
                    </h4>
                    {task.creator.rating && (
                      <div className="flex items-center gap-1 text-sm" style={{ color: theme === 'dark' ? '#9CA3AF' : '#6B7280' }}>
                        <Star className="w-4 h-4 fill-current text-yellow-400" />
                        {task.creator.rating} • {task.creator.reviews || 0} reviews
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  className="w-full py-2 rounded-lg"
                  style={{
                    backgroundColor: theme === 'dark' ? '#374151' : '#F3F4F6',
                    color: theme === 'dark' ? '#E5E7EB' : '#374151',
                    border: 'none'
                  }}
                >
                  Contact Creator
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Similar Tasks */}
        {similarTasks.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1F2937' }}>
              Similar Tasks
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarTasks.map((similarTask) => (
                <Link key={similarTask.id} href={`/tasks/${similarTask.id}`}>
                  <div className="rounded-xl p-6 border cursor-pointer hover:shadow-lg transition-all duration-200" style={{
                    backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                    borderColor: theme === 'dark' ? '#374151' : '#E5E7EB'
                  }}>
                    {similarTask.image && (
                      <div className="relative h-40 rounded-lg overflow-hidden mb-4">
                        <Image
                          src={similarTask.image}
                          alt={similarTask.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <h3 className="font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1F2937' }}>
                      {similarTask.title}
                    </h3>
                    <p className="text-sm mb-2" style={{ color: theme === 'dark' ? '#9CA3AF' : '#6B7280' }}>
                      {similarTask.description?.substring(0, 100)}...
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold" style={{ color: '#FF5E14' }}>
                        {similarTask.price || similarTask.budget || 'Negotiable'}
                      </span>
                      <span className="text-sm" style={{ color: theme === 'dark' ? '#9CA3AF' : '#6B7280' }}>
                        {similarTask.category}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
