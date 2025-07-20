import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import { Button } from '../src/components/ui/button';
import { signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '../src/lib/firebase';
import { useRouter } from 'next/router';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { LogOut, User as UserIcon, Mail, Calendar, Heart, Bookmark, Eye, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface SavedItem {
  id: string;
  type: 'task' | 'tool';
  title: string;
  price: string;
  category: string;
  location: string;
  image: string;
  savedAt: any;
}

export default function ProfileEnhanced() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'tasks' | 'tools'>('all');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        loadSavedItems(user.uid);
      } else {
        router.push('/SignIn');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const loadSavedItems = async (userId: string) => {
    try {
      setLoading(true);
      
            // Query for user's saved tasks (disabled for now)
      // const tasksQuery = query(
      //   collection(db, 'savedTasks'),
      //   where('userId', '==', user.uid),
      //   orderBy('savedAt', 'desc'),
      //   limit(20)
      // );
      // const tasksSnapshot = await getDocs(tasksQuery);
      
      // Query for user's saved tools
      // const toolsQuery = query(
      //   collection(db, 'savedTools'),
      //   where('userId', '==', user.uid),
      //   orderBy('savedAt', 'desc'),
      //   limit(20)
      // );
      // const toolsSnapshot = await getDocs(toolsQuery);
      
      // Empty arrays - will be populated from actual user data
      const sampleTasks: SavedItem[] = [];
      
      const sampleTools: SavedItem[] = [];
      
      setSavedItems([...sampleTasks, ...sampleTools]);
    } catch (error) {
      console.error('Error loading saved items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const filteredItems = savedItems.filter(item => {
    if (activeTab === 'all') return true;
    return item.type === activeTab.slice(0, -1); // Remove 's' from 'tasks'/'tools'
  });

  if (!mounted) {
    return null;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F8FAFC' }}>
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1F2937' }}>
          My Profile
        </h1>

        {/* Profile Card */}
        <div className="rounded-xl p-8 mb-8 border" style={{
          backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
          borderColor: theme === 'dark' ? '#374151' : '#E5E7EB'
        }}>
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{
              backgroundColor: '#FF5E14'
            }}>
              <UserIcon className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1F2937' }}>
                {user.displayName || 'User'}
              </h2>
              <div className="flex items-center gap-4 text-sm" style={{ color: theme === 'dark' ? '#9CA3AF' : '#6B7280' }}>
                <span className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Member since {user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'Unknown'}
                </span>
              </div>
            </div>
          </div>

          <Button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-6 py-3 rounded-lg transition-all"
            style={{
              backgroundColor: theme === 'dark' ? '#DC2626' : '#EF4444',
              color: '#FFFFFF'
            }}
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="rounded-xl p-6 text-center border" style={{
            backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
            borderColor: theme === 'dark' ? '#374151' : '#E5E7EB'
          }}>
            <div className="text-3xl font-bold mb-2" style={{ color: '#FF5E14' }}>0</div>
            <div className="text-sm" style={{ color: theme === 'dark' ? '#9CA3AF' : '#6B7280' }}>Tasks Completed</div>
          </div>
          
          <div className="rounded-xl p-6 text-center border" style={{
            backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
            borderColor: theme === 'dark' ? '#374151' : '#E5E7EB'
          }}>
            <div className="text-3xl font-bold mb-2" style={{ color: '#FF5E14' }}>0</div>
            <div className="text-sm" style={{ color: theme === 'dark' ? '#9CA3AF' : '#6B7280' }}>Tools Rented</div>
          </div>
          
          <div className="rounded-xl p-6 text-center border" style={{
            backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
            borderColor: theme === 'dark' ? '#374151' : '#E5E7EB'
          }}>
            <div className="text-3xl font-bold mb-2" style={{ color: '#FF5E14' }}>{savedItems.length}</div>
            <div className="text-sm" style={{ color: theme === 'dark' ? '#9CA3AF' : '#6B7280' }}>Saved Items</div>
          </div>
          
          <div className="rounded-xl p-6 text-center border" style={{
            backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
            borderColor: theme === 'dark' ? '#374151' : '#E5E7EB'
          }}>
            <div className="text-3xl font-bold mb-2" style={{ color: '#FF5E14' }}>5.0</div>
            <div className="text-sm" style={{ color: theme === 'dark' ? '#9CA3AF' : '#6B7280' }}>Average Rating</div>
          </div>
        </div>

        {/* Saved Items Section */}
        <div className="rounded-xl p-6 border" style={{
          backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
          borderColor: theme === 'dark' ? '#374151' : '#E5E7EB'
        }}>
          <div className="flex items-center gap-4 mb-6">
            <Heart className="w-6 h-6" style={{ color: '#FF5E14' }} />
            <h2 className="text-2xl font-bold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1F2937' }}>
              Saved Items
            </h2>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mb-6">
            {[
              { key: 'all', label: 'All Items', count: savedItems.length },
              { key: 'tasks', label: 'Tasks', count: savedItems.filter(item => item.type === 'task').length },
              { key: 'tools', label: 'Tools', count: savedItems.filter(item => item.type === 'tool').length }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.key 
                    ? 'text-white font-semibold' 
                    : 'font-medium hover:opacity-80'
                }`}
                style={{
                  backgroundColor: activeTab === tab.key 
                    ? '#FF5E14' 
                    : (theme === 'dark' ? '#374151' : '#F3F4F6'),
                  color: activeTab === tab.key 
                    ? '#FFFFFF' 
                    : (theme === 'dark' ? '#D1D5DB' : '#6B7280')
                }}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          {/* Items Grid */}
          {loading ? (
            <div className="text-center py-8" style={{ color: theme === 'dark' ? '#9CA3AF' : '#6B7280' }}>
              Loading saved items...
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <Bookmark className="w-16 h-16 mx-auto mb-4" style={{ color: theme === 'dark' ? '#4B5563' : '#9CA3AF' }} />
              <h3 className="text-lg font-semibold mb-2" style={{ color: theme === 'dark' ? '#D1D5DB' : '#6B7280' }}>
                No saved items yet
              </h3>
              <p className="text-sm mb-4" style={{ color: theme === 'dark' ? '#9CA3AF' : '#6B7280' }}>
                Start exploring tasks and tools to save your favorites here!
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/Tasks">
                  <Button
                    className="px-6 py-2 rounded-lg"
                    style={{
                      backgroundColor: '#FF5E14',
                      color: '#FFFFFF'
                    }}
                  >
                    Browse Tasks
                  </Button>
                </Link>
                <Link href="/Tools">
                  <Button
                    className="px-6 py-2 rounded-lg"
                    style={{
                      backgroundColor: theme === 'dark' ? '#374151' : '#F3F4F6',
                      color: theme === 'dark' ? '#E5E7EB' : '#374151'
                    }}
                  >
                    Browse Tools
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <Link 
                  key={item.id} 
                  href={`/${item.type}s/${item.id}_enhanced`}
                  className="group block"
                >
                  <div className="rounded-xl overflow-hidden border transition-all duration-200 hover:scale-105 hover:shadow-lg" style={{
                    backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF',
                    borderColor: theme === 'dark' ? '#4B5563' : '#E5E7EB'
                  }}>
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          item.type === 'task' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {item.type.toUpperCase()}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                          <Heart className="w-4 h-4 text-red-600 fill-current" />
                        </div>
                      </div>
                      <div className="absolute bottom-3 right-3">
                        <div className="bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                          <ExternalLink className="w-3 h-3" />
                          View
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1F2937' }}>
                        {item.title}
                      </h3>
                      
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-bold" style={{ color: '#FF5E14' }}>
                          {item.price}
                        </span>
                        <span className="text-sm px-2 py-1 rounded-full" style={{ 
                          backgroundColor: theme === 'dark' ? '#4B5563' : '#F3F4F6',
                          color: theme === 'dark' ? '#D1D5DB' : '#6B7280'
                        }}>
                          {item.category}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-sm mb-2" style={{ color: theme === 'dark' ? '#9CA3AF' : '#6B7280' }}>
                        📍 {item.location}
                      </div>
                      
                      <div className="flex items-center justify-between text-xs" style={{ color: theme === 'dark' ? '#6B7280' : '#9CA3AF' }}>
                        <span>Saved</span>
                        <span>{item.savedAt ? new Date(item.savedAt.seconds * 1000).toLocaleDateString() : 'Recently'}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
