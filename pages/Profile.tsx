import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import Logo from '../src/components/Logo';
import { Button } from '../src/components/ui/button';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { updateProfile, onAuthStateChanged, User, signOut } from 'firebase/auth';
import { doc, updateDoc, getDoc, collection, query, where, getDocs, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { auth, db, storage } from '../src/lib/firebase';
import { Sun, Moon, Bookmark, Settings, User as UserIcon, MapPin, Clock, DollarSign, Bell, LogOut } from 'lucide-react';

interface SavedGig {
  id: string;
  title: string;
  type: 'tool' | 'task';
  price: string;
  location: string;
  savedAt: string;
  description?: string;
  postedBy?: string;
  status?: 'available' | 'requested';
  originalGigId?: string;
}

interface UserPost {
  id: string;
  title: string;
  description: string;
  type: 'tool' | 'task' | 'toolRequest' | 'taskRequest';
  category: string;
  price?: string;
  location?: string;
  image?: string;
  isActive: boolean;
  createdAt: Date | null;
  postedBy: string;
  condition?: string;
  brand?: string;
  specifications?: string[];
  features?: string[];
}

interface Notification {
  id: string;
  type: 'gig_match' | 'request' | 'approval' | 'general';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  relatedGig?: string;
  userId: string;
}

export default function Profile() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    displayName: '',
    profilePhotoURL: '',
    createdAt: null,
    isActive: true,
    role: 'user'
  });
  const [activeTab, setActiveTab] = useState('profile');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [savedGigs, setSavedGigs] = useState<SavedGig[]>([]);
  const [userPosts, setUserPosts] = useState<UserPost[]>([]);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const [editingPost, setEditingPost] = useState<UserPost | null>(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    phoneNumber: '',
    brand: '',
    condition: '',
    category: ''
  });
  
  // Simplified language options: English, Sinhala, Tamil only
  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'si', name: 'සිංහල', flag: '🇱🇰' },
    { code: 'ta', name: 'தமிழ்', flag: '🇱🇰' }
  ];
  
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Profile: Auth state changed:', user ? user.uid : 'no user');
      if (user) {
        setUser(user);
        fetchUserProfile(user);
        fetchSavedGigs(user.uid);
        fetchUserPosts(user.uid);
        fetchNotifications(user.uid);
      } else {
        router.push('/SignIn');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const fetchUserProfile = async (user: User) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserProfile({
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          email: userData.email || user.email || '',
          phone: userData.phone || '',
          displayName: userData.displayName || user.displayName || '',
          profilePhotoURL: userData.profilePhotoURL || user.photoURL || '',
          createdAt: userData.createdAt,
          isActive: userData.isActive || true,
          role: userData.role || 'user'
        });
        // Load saved language preference
        if (userData.preferredLanguage) {
          setSelectedLanguage(userData.preferredLanguage);
        }
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchSavedGigs = async (userId: string) => {
    try {
      console.log('Fetching saved gigs for user:', userId);
      const savedGigsRef = collection(db, 'savedGigs');
      const q = query(savedGigsRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      
      console.log('Found saved gigs:', querySnapshot.size);
      
      const gigsData: SavedGig[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log('Saved gig data:', data);
        gigsData.push({
          id: doc.id,
          title: data.title,
          type: data.type,
          price: data.price,
          location: data.location,
          savedAt: data.savedAt?.toDate ? data.savedAt.toDate().toLocaleDateString() : 'Unknown',
          description: data.description,
          postedBy: data.postedBy,
          status: data.status || 'available',
          originalGigId: data.originalGigId
        });
      });
      
      console.log('Setting saved gigs:', gigsData);
      setSavedGigs(gigsData);
    } catch (error) {
      console.error('Error fetching saved gigs:', error);
    }
  };

  const fetchUserPosts = async (userId: string) => {
    try {
      const posts: UserPost[] = [];
      
      // Fetch user's tools
      const toolsRef = collection(db, 'tools');
      const toolsQuery = query(toolsRef, where('owner.uid', '==', userId));
      const toolsSnapshot = await getDocs(toolsQuery);
      
      toolsSnapshot.forEach((doc) => {
        const data = doc.data();
        posts.push({
          id: doc.id,
          title: data.title,
          description: data.description,
          type: 'tool',
          category: data.category,
          price: data.price,
          location: data.location,
          image: data.image,
          isActive: data.isActive !== false, // Default to true if not specified
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toLocaleDateString() : 'Unknown',
          postedBy: data.owner?.name || data.owner?.email || 'Unknown',
          condition: data.condition,
          brand: data.brand,
          specifications: data.specifications,
          features: data.features
        });
      });
      
      // Fetch user's tasks
      const tasksRef = collection(db, 'tasks');
      const tasksQuery = query(tasksRef, where('creator.uid', '==', userId));
      const tasksSnapshot = await getDocs(tasksQuery);
      
      tasksSnapshot.forEach((doc) => {
        const data = doc.data();
        posts.push({
          id: doc.id,
          title: data.title,
          description: data.description,
          type: 'task',
          category: data.category,
          price: data.price,
          location: data.location,
          image: data.image,
          isActive: data.isActive !== false, // Default to true if not specified
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toLocaleDateString() : 'Unknown',
          postedBy: data.creator?.name || data.creator?.email || 'Unknown'
        });
      });
      
      // Fetch user's tool requests
      const toolRequestsRef = collection(db, 'toolRequests');
      const toolRequestsQuery = query(toolRequestsRef, where('requestedBy', '==', userId));
      const toolRequestsSnapshot = await getDocs(toolRequestsQuery);
      
      toolRequestsSnapshot.forEach((doc) => {
        const data = doc.data();
        posts.push({
          id: doc.id,
          title: data.title,
          description: data.description,
          type: 'toolRequest',
          category: data.category,
          price: data.maxRentalPrice,
          location: data.location,
          isActive: data.isActive !== false, // Default to true if not specified
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toLocaleDateString() : 'Unknown',
          postedBy: data.requestedBy
        });
      });
      
      // Fetch user's task requests
      const taskRequestsRef = collection(db, 'taskRequests');
      const taskRequestsQuery = query(taskRequestsRef, where('requestedBy', '==', userId));
      const taskRequestsSnapshot = await getDocs(taskRequestsQuery);
      
      taskRequestsSnapshot.forEach((doc) => {
        const data = doc.data();
        posts.push({
          id: doc.id,
          title: data.title,
          description: data.description,
          type: 'taskRequest',
          category: data.category,
          price: data.budget,
          location: data.location,
          isActive: data.isActive !== false, // Default to true if not specified
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toLocaleDateString() : 'Unknown',
          postedBy: data.requestedBy
        });
      });
      
      // Sort by creation date (newest first)
      posts.sort((a, b) => {
        if (a.createdAt && b.createdAt && a.createdAt !== 'Unknown' && b.createdAt !== 'Unknown') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        return 0;
      });
      
      setUserPosts(posts);
    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
  };

  const togglePostStatus = async (postId: string, currentStatus: boolean, postType: string) => {
    try {
      setLoading(true);
      
      // Determine which collection to update
      let collectionName = '';
      switch (postType) {
        case 'tool':
          collectionName = 'tools';
          break;
        case 'task':
          collectionName = 'tasks';
          break;
        case 'toolRequest':
          collectionName = 'toolRequests';
          break;
        case 'taskRequest':
          collectionName = 'taskRequests';
          break;
        default:
          throw new Error('Invalid post type');
      }
      
      const postRef = doc(db, collectionName, postId);
      await updateDoc(postRef, {
        isActive: !currentStatus,
        updatedAt: serverTimestamp()
      });
      
      // Update local state
      setUserPosts(prev => prev.map(post => 
        post.id === postId 
          ? { ...post, isActive: !currentStatus }
          : post
      ));
      
      setSuccess(`Post ${currentStatus ? 'deactivated' : 'activated'} successfully!`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error toggling post status:', error);
      setError('Failed to update post status. Please try again.');
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (postId: string, postType: string) => {
    if (!window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }

    try {
      setLoading(true);
      let collectionName: string;
      switch (postType) {
        case 'tool':
          collectionName = 'tools';
          break;
        case 'task':
          collectionName = 'tasks';
          break;
        case 'toolRequest':
          collectionName = 'toolRequests';
          break;
        case 'taskRequest':
          collectionName = 'taskRequests';
          break;
        default:
          throw new Error('Invalid post type');
      }
      
      const postRef = doc(db, collectionName, postId);
      await deleteDoc(postRef);
      
      // Update local state
      setUserPosts(prev => prev.filter(post => post.id !== postId));
      
      setSuccess('Post deleted successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error deleting post:', error);
      setError('Failed to delete post. Please try again.');
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const startEditing = async (post: UserPost) => {
    try {
      // Fetch the full post data from Firestore
      let collectionName: string;
      switch (post.type) {
        case 'tool':
          collectionName = 'tools';
          break;
        case 'task':
          collectionName = 'tasks';
          break;
        case 'toolRequest':
          collectionName = 'toolRequests';
          break;
        case 'taskRequest':
          collectionName = 'taskRequests';
          break;
        default:
          throw new Error('Invalid post type');
      }
      
      const postRef = doc(db, collectionName, post.id);
      const postDoc = await getDoc(postRef);
      
      if (postDoc.exists()) {
        const data = postDoc.data();
        setEditFormData({
          title: data.title || '',
          description: data.description || '',
          price: data.price || data.budget || '',
          location: data.location || '',
          phoneNumber: data.phoneNumber || '',
          brand: data.brand || '',
          condition: data.condition || '',
          category: data.category || ''
        });
        setEditingPost(post);
      }
    } catch (error) {
      console.error('Error fetching post data:', error);
      setError('Failed to load post data for editing.');
    }
  };

  const cancelEditing = () => {
    setEditingPost(null);
    setEditFormData({
      title: '',
      description: '',
      price: '',
      location: '',
      phoneNumber: '',
      brand: '',
      condition: '',
      category: ''
    });
  };

  const saveEdit = async () => {
    if (!editingPost) return;

    try {
      setLoading(true);
      let collectionName: string;
      switch (editingPost.type) {
        case 'tool':
          collectionName = 'tools';
          break;
        case 'task':
          collectionName = 'tasks';
          break;
        case 'toolRequest':
          collectionName = 'toolRequests';
          break;
        case 'taskRequest':
          collectionName = 'taskRequests';
          break;
        default:
          throw new Error('Invalid post type');
      }
      
      const postRef = doc(db, collectionName, editingPost.id);
      const updateData: any = {
        title: editFormData.title,
        description: editFormData.description,
        location: editFormData.location,
        phoneNumber: editFormData.phoneNumber,
        category: editFormData.category,
        updatedAt: serverTimestamp()
      };

      // Add price/budget based on post type
      if (editingPost.type === 'tool' || editingPost.type === 'toolRequest') {
        updateData.price = editFormData.price;
      } else {
        updateData.budget = editFormData.price;
      }

      // Add tool-specific fields
      if (editingPost.type === 'tool') {
        updateData.brand = editFormData.brand;
        updateData.condition = editFormData.condition;
      }

      await updateDoc(postRef, updateData);
      
      // Update local state
      setUserPosts(prev => prev.map(post => 
        post.id === editingPost.id 
          ? { ...post, title: editFormData.title, description: editFormData.description, price: editFormData.price, location: editFormData.location }
          : post
      ));
      
      setSuccess('Post updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
      cancelEditing();
    } catch (error) {
      console.error('Error updating post:', error);
      setError('Failed to update post. Please try again.');
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const fetchNotifications = async (userId: string) => {
    try {
      const notificationsRef = collection(db, 'notifications');
      const q = query(notificationsRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      
      const notificationsData: Notification[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        notificationsData.push({
          id: doc.id,
          type: data.type,
          title: data.title,
          message: data.message,
          timestamp: data.timestamp,
          isRead: data.isRead || false,
          relatedGig: data.relatedGig,
          userId: data.userId
        });
      });
      
      // Sort by timestamp (newest first)
      notificationsData.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setNotifications(notificationsData);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('User signed out successfully');
      // Redirect will happen automatically due to auth state change
    } catch (error) {
      console.error('Error signing out:', error);
      setError('Failed to sign out. Please try again.');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) {
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Profile photo must be less than 5MB');
      setTimeout(() => setError(''), 3000);
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file');
      setTimeout(() => setError(''), 3000);
      return;
    }

    setUploadingPhoto(true);
    setError('');

    try {
      // Create a reference to the file location
      const photoRef = ref(storage, `profile-photos/${user.uid}/${Date.now()}-${file.name}`);
      
      // Upload the file
      const uploadResult = await uploadBytes(photoRef, file);
      const downloadURL = await getDownloadURL(uploadResult.ref);

      // Delete old photo if exists
      if (userProfile.profilePhotoURL && userProfile.profilePhotoURL.includes('firebase')) {
        try {
          const oldPhotoRef = ref(storage, userProfile.profilePhotoURL);
          await deleteObject(oldPhotoRef);
        } catch {
          console.log('Old photo not found or already deleted');
        }
      }

      // Update user profile with new photo URL
      await updateDoc(doc(db, 'users', user.uid), {
        profilePhotoURL: downloadURL,
        updatedAt: serverTimestamp()
      });

      // Update Firebase Auth profile
      await updateProfile(user, {
        photoURL: downloadURL
      });

      // Update local state
      setUserProfile(prev => ({
        ...prev,
        profilePhotoURL: downloadURL
      }));

      setSuccess('Profile photo updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
      setShowPhotoUpload(false);
    } catch (error) {
      console.error('Error uploading photo:', error);
      setError('Failed to upload photo. Please try again.');
      setTimeout(() => setError(''), 3000);
    } finally {
      setUploadingPhoto(false);
    }
  };

  const removeProfilePhoto = async () => {
    if (!user) {
      return;
    }

    setUploadingPhoto(true);
    setError('');

    try {
      // Delete photo from storage if exists
      if (userProfile.profilePhotoURL && userProfile.profilePhotoURL.includes('firebase')) {
        try {
          const photoRef = ref(storage, userProfile.profilePhotoURL);
          await deleteObject(photoRef);
        } catch {
          console.log('Photo not found or already deleted');
        }
      }

      // Update user profile to remove photo URL
      await updateDoc(doc(db, 'users', user.uid), {
        profilePhotoURL: '',
        updatedAt: serverTimestamp()
      });

      // Update Firebase Auth profile
      await updateProfile(user, {
        photoURL: null
      });

      // Update local state
      setUserProfile(prev => ({
        ...prev,
        profilePhotoURL: ''
      }));

      setSuccess('Profile photo removed successfully!');
      setTimeout(() => setSuccess(''), 3000);
      setShowPhotoUpload(false);
    } catch (error) {
      console.error('Error removing photo:', error);
      setError('Failed to remove photo. Please try again.');
      setTimeout(() => setError(''), 3000);
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!user) {
      setLoading(false);
      return;
    }

    try {
      // Update Firebase Auth profile
      await updateProfile(user, {
        displayName: `${userProfile.firstName} ${userProfile.lastName}`
      });

      // Update Firestore document
      await updateDoc(doc(db, 'users', user.uid), {
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        phone: userProfile.phone,
        displayName: `${userProfile.firstName} ${userProfile.lastName}`,
        profilePhotoURL: userProfile.profilePhotoURL,
        preferredLanguage: selectedLanguage,
        updatedAt: serverTimestamp()
      });

      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error: unknown) {
      console.error('Error updating profile:', error);
      const errorMessage = error instanceof Error ? error.message : 'An error occurred while updating profile';
      setError(errorMessage);
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const removeSavedGig = async (gigId: string) => {
    try {
      await deleteDoc(doc(db, 'savedGigs', gigId));
      setSavedGigs(prev => prev.filter(g => g.id !== gigId));
      setSuccess('Saved gig removed successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error removing saved gig:', error);
      setError('Failed to remove saved gig. Please try again.');
      setTimeout(() => setError(''), 3000);
    }
  };

  const markNotificationAsRead = async (notificationId: string) => {
    try {
      await updateDoc(doc(db, 'notifications', notificationId), {
        isRead: true,
        updatedAt: serverTimestamp()
      });
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  if (!mounted) {
    return null;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F2F3F5' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F2F3F5' }}>
      <Navigation />
      
      <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Profile Card */}
          <div className="rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
            
            {/* Profile Header */}
            <div className="p-6 sm:p-8 border-b" style={{ borderColor: theme === 'dark' ? '#444444' : '#E5E7EB' }}>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                {/* Profile Photo with Upload */}
                <div className="relative group">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden flex items-center justify-center text-white text-2xl sm:text-3xl font-bold relative" 
                       style={{ backgroundColor: '#FF5E14' }}>
                    {userProfile.profilePhotoURL ? (
                      <Image 
                        src={userProfile.profilePhotoURL} 
                        alt="Profile" 
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to initials if image fails to load
                          e.currentTarget.style.display = 'none';
                          const nextElement = e.currentTarget.parentElement?.nextElementSibling as HTMLElement;
                          if (nextElement) {
                            nextElement.style.display = 'flex';
                          }
                        }}
                      />
                    ) : null}
                    <div 
                      className={`w-full h-full flex items-center justify-center ${userProfile.profilePhotoURL ? 'hidden' : 'flex'}`}
                      style={{ backgroundColor: '#FF5E14' }}
                    >
                      {userProfile.firstName ? userProfile.firstName.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  </div>
                  
                  {/* Photo Upload Button */}
                  <button
                    onClick={() => setShowPhotoUpload(!showPhotoUpload)}
                    disabled={uploadingPhoto}
                    className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-50"
                    style={{ 
                      backgroundColor: '#FF5E14',
                      color: '#FFFFFF',
                      boxShadow: '0 2px 8px rgba(255, 94, 20, 0.4)'
                    }}
                  >
                    {uploadingPhoto ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>

                  {/* Photo Upload Menu */}
                  {showPhotoUpload && (
                    <div className="absolute top-full left-0 mt-2 p-3 rounded-xl shadow-2xl border-2 z-50 min-w-[200px]"
                         style={{ 
                           backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF',
                           borderColor: theme === 'dark' ? '#374151' : '#E2E8F0',
                           boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)'
                         }}>
                      <div className="space-y-2">
                        <label className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105"
                               style={{
                                 backgroundColor: theme === 'dark' ? '#374151' : '#F8F9FA',
                                 color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                               }}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <span className="font-medium">Upload Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="hidden"
                            disabled={uploadingPhoto}
                          />
                        </label>
                        
                        {userProfile.profilePhotoURL && (
                          <button
                            onClick={removeProfilePhoto}
                            disabled={uploadingPhoto}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg w-full transition-all duration-200 hover:scale-105 disabled:opacity-50"
                            style={{
                              backgroundColor: theme === 'dark' ? '#3a1f1f' : '#FEF2F2',
                              color: '#DC2626'
                            }}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            <span className="font-medium">Remove Photo</span>
                          </button>
                        )}
                        
                        <button
                          onClick={() => setShowPhotoUpload(false)}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg w-full transition-all duration-200 hover:scale-105"
                          style={{
                            backgroundColor: theme === 'dark' ? '#374151' : '#F8F9FA',
                            color: theme === 'dark' ? '#CCCCCC' : '#6B7280'
                          }}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          <span className="font-medium">Cancel</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="text-center sm:text-left flex-1">
                  <h2 className="text-xl sm:text-2xl font-bold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                    {userProfile.displayName || user?.displayName || 'User'}
                  </h2>
                  <p style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                    {userProfile.email || user?.email}
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                      {userProfile.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                
                {/* Sign Out Button - Prominent Position */}
                <div className="w-full sm:w-auto">
                  <button
                    onClick={handleSignOut}
                    className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 hover:scale-105 shadow-lg"
                    style={{ 
                      backgroundColor: '#dc2626',
                      color: '#FFFFFF',
                      border: 'none',
                      boxShadow: '0 6px 16px rgba(220, 38, 38, 0.4)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#b91c1c';
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(220, 38, 38, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#dc2626';
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 6px 16px rgba(220, 38, 38, 0.4)';
                    }}
                  >
                    <LogOut className="h-6 w-6" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-b" style={{ borderColor: theme === 'dark' ? '#374151' : '#E5E7EB' }}>
              <nav className="flex overflow-x-auto">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === 'profile'
                      ? 'border-orange-500 text-orange-500'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                  style={{ color: activeTab === 'profile' ? '#FF5E14' : (theme === 'dark' ? '#CCCCCC' : '#6B7280') }}
                >
                  <UserIcon className="h-4 w-4" />
                  Profile Information
                </button>
                <button
                  onClick={() => setActiveTab('myads')}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === 'myads'
                      ? 'border-orange-500 text-orange-500'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                  style={{ color: activeTab === 'myads' ? '#FF5E14' : (theme === 'dark' ? '#CCCCCC' : '#6B7280') }}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  My Ads
                  <span className="ml-1 px-2 py-1 text-xs rounded-full bg-blue-500 text-white">
                    {userPosts.length}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === 'settings'
                      ? 'border-orange-500 text-orange-500'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                  style={{ color: activeTab === 'settings' ? '#FF5E14' : (theme === 'dark' ? '#CCCCCC' : '#6B7280') }}
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </button>
                <button
                  onClick={() => {
                    setActiveTab('saved');
                    if (user) {
                      fetchSavedGigs(user.uid);
                    }
                  }}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === 'saved'
                      ? 'border-orange-500 text-orange-500'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                  style={{ color: activeTab === 'saved' ? '#FF5E14' : (theme === 'dark' ? '#CCCCCC' : '#6B7280') }}
                >
                  <Bookmark className="h-4 w-4" />
                  Saved Gigs
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === 'notifications'
                      ? 'border-orange-500 text-orange-500'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                  style={{ color: activeTab === 'notifications' ? '#FF5E14' : (theme === 'dark' ? '#CCCCCC' : '#6B7280') }}
                >
                  <Bell className="h-4 w-4" />
                  Notifications
                  {notifications.filter(n => !n.isRead).length > 0 && (
                    <span className="ml-1 px-2 py-1 text-xs rounded-full bg-orange-500 text-white">
                      {notifications.filter(n => !n.isRead).length}
                    </span>
                  )}
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6 sm:p-8">
              {success && (
                <div className="mb-6 p-4 rounded-lg text-sm" style={{ backgroundColor: '#DEF7EC', color: '#03543F' }}>
                  {success}
                </div>
              )}
              {error && (
                <div className="mb-6 p-4 rounded-lg text-sm" style={{ backgroundColor: '#FEE2E2', color: '#DC2626' }}>
                  {error}
                </div>
              )}

              {activeTab === 'profile' && (
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={userProfile.firstName}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors"
                        style={{ 
                          borderColor: theme === 'dark' ? '#444444' : '#E2E8F0',
                          backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                          color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                        }}
                        onFocus={(e) => e.currentTarget.style.borderColor = '#FF5E14'}
                        onBlur={(e) => e.currentTarget.style.borderColor = theme === 'dark' ? '#444444' : '#E2E8F0'}
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={userProfile.lastName}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors"
                        style={{ 
                          borderColor: theme === 'dark' ? '#444444' : '#E2E8F0',
                          backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                          color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                        }}
                        onFocus={(e) => e.currentTarget.style.borderColor = '#FF5E14'}
                        onBlur={(e) => e.currentTarget.style.borderColor = theme === 'dark' ? '#4B5563' : '#E2E8F0'}
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={userProfile.email}
                      className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors opacity-50 cursor-not-allowed"
                      style={{ 
                        borderColor: theme === 'dark' ? '#444444' : '#E2E8F0',
                        backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                        color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                      }}
                      disabled
                    />
                    <p className="text-xs mt-1" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                      Email cannot be changed
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={userProfile.phone}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors"
                      style={{ 
                        borderColor: theme === 'dark' ? '#444444' : '#E2E8F0',
                        backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                        color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#FF5E14'}
                      onBlur={(e) => e.currentTarget.style.borderColor = theme === 'dark' ? '#444444' : '#E2E8F0'}
                      placeholder="+94 71 234 5678"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                        Account Status
                      </label>
                      <div className="flex items-center gap-2 px-4 py-3 border-2 rounded-xl" style={{ 
                        borderColor: theme === 'dark' ? '#444444' : '#E2E8F0',
                        backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF'
                      }}>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                          {userProfile.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                        Account Role
                      </label>
                      <div className="px-4 py-3 border-2 rounded-xl" style={{ 
                        borderColor: theme === 'dark' ? '#444444' : '#E2E8F0',
                        backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF',
                        color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                      }}>
                        {userProfile.role.charAt(0).toUpperCase() + userProfile.role.slice(1)}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto px-8 py-3 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ backgroundColor: loading ? '#9CA3AF' : '#FF5E14' }}
                    >
                      {loading ? 'Updating...' : 'Update Profile'}
                    </Button>
                  </div>
                </form>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                      Theme Settings
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-3" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                          Appearance
                        </label>
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => setTheme('light')}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                              theme === 'light' ? 'ring-2 ring-orange-500' : ''
                            }`}
                            style={{ 
                              backgroundColor: theme === 'light' ? '#FFF7ED' : (theme === 'dark' ? '#2a2a2a' : '#FFFFFF'),
                              borderColor: theme === 'light' ? '#FF5E14' : (theme === 'dark' ? '#444444' : '#E2E8F0'),
                              color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                            }}
                          >
                            <Sun className="h-5 w-5" style={{ color: '#FF5E14' }} />
                            <span className="font-medium">Light Mode</span>
                          </button>
                          <button
                            onClick={() => setTheme('dark')}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                              theme === 'dark' ? 'ring-2 ring-orange-500' : ''
                            }`}
                            style={{ 
                              backgroundColor: theme === 'dark' ? '#2a2a2a' : (theme === 'light' ? '#F9FAFB' : '#FFFFFF'),
                              borderColor: theme === 'dark' ? '#FF5E14' : (theme === 'light' ? '#444444' : '#E2E8F0'),
                              color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                            }}
                          >
                            <Moon className="h-5 w-5" style={{ color: '#FF5E14' }} />
                            <span className="font-medium">Dark Mode</span>
                          </button>
                        </div>
                      </div>
                      <div className="pt-4 border-t" style={{ borderColor: theme === 'dark' ? '#444444' : '#E5E7EB' }}>
                        <p className="text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                          Choose your preferred theme for the best experience. Your selection will be saved automatically.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Language Settings Section */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                      Language Settings
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-3" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                          Select Language
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {languages.map((language) => (
                            <button
                              key={language.code}
                              onClick={() => setSelectedLanguage(language.code)}
                              className={`flex items-center gap-3 px-4 py-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                                selectedLanguage === language.code ? 'ring-2 ring-orange-500 shadow-lg' : ''
                              }`}
                              style={{ 
                                backgroundColor: selectedLanguage === language.code 
                                  ? (theme === 'dark' ? 'rgba(255, 94, 20, 0.2)' : '#FFF7ED')
                                  : (theme === 'dark' ? '#374151' : '#FFFFFF'),
                                borderColor: selectedLanguage === language.code 
                                  ? '#FF5E14' 
                                  : (theme === 'dark' ? '#6B7280' : '#E2E8F0'),
                                color: selectedLanguage === language.code 
                                  ? '#FF5E14' 
                                  : (theme === 'dark' ? '#FFFFFF' : '#2D3748'),
                                boxShadow: selectedLanguage === language.code 
                                  ? '0 8px 25px rgba(255, 94, 20, 0.3)' 
                                  : (theme === 'dark' ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.1)')
                              }}
                            >
                              <span className="text-2xl" style={{ 
                                filter: theme === 'dark' ? 'brightness(1.2) contrast(1.2)' : 'none',
                                textShadow: theme === 'dark' ? '0 0 8px rgba(255, 255, 255, 0.3)' : 'none'
                              }}>
                                {language.flag}
                              </span>
                              <span className="font-semibold text-base">{language.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="pt-4 border-t" style={{ borderColor: theme === 'dark' ? '#444444' : '#E5E7EB' }}>
                        <p className="text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                          Choose your preferred language for the interface. Changes will be applied immediately.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Saved Gigs Tab */}
              {activeTab === 'saved' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                      Saved Gigs
                    </h3>
                    <p className="text-sm mb-6" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                      View and manage your saved tools and tasks. You can remove items or contact the posters directly.
                    </p>
                  </div>

                  {savedGigs.length === 0 ? (
                    <div className="text-center py-12">
                      <Bookmark className="h-12 w-12 mx-auto mb-4" style={{ color: theme === 'dark' ? '#666666' : '#9CA3AF' }} />
                      <p className="text-lg font-medium mb-2" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                        No saved gigs yet
                      </p>
                      <p className="text-sm" style={{ color: theme === 'dark' ? '#999999' : '#9CA3AF' }}>
                        Start browsing tools and tasks to save your favorites here.
                      </p>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {savedGigs.map((gig) => (
                        <div key={gig.id} className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
                          gig.status === 'requested' ? 'opacity-75' : ''
                        }`} style={{
                          backgroundColor: gig.status === 'requested' 
                            ? (theme === 'dark' ? '#2a2426' : '#fef7f0') 
                            : (theme === 'dark' ? '#2a2a2a' : '#FFFFFF'),
                          borderColor: gig.status === 'requested' 
                            ? (theme === 'dark' ? '#6b5b47' : '#f59e0b') 
                            : (theme === 'dark' ? '#444444' : '#E2E8F0'),
                          borderWidth: gig.status === 'requested' ? '2px' : '1px'
                        }}>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className={`text-lg font-semibold ${
                                  gig.status === 'requested' ? 'opacity-80' : ''
                                }`} style={{ 
                                  color: gig.status === 'requested' 
                                    ? (theme === 'dark' ? '#d69e2e' : '#92400e') 
                                    : (theme === 'dark' ? '#FFFFFF' : '#1E293B') 
                                }}>
                                  {gig.title}
                                  {gig.status === 'requested' && (
                                    <span className="ml-2 text-sm font-normal opacity-75">
                                      (Temporarily Unavailable)
                                    </span>
                                  )}
                                </h4>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  gig.type === 'tool' 
                                    ? (gig.status === 'requested' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800')
                                    : (gig.status === 'requested' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800')
                                }`}>
                                  {gig.type}
                                </span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  gig.status === 'available' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-orange-100 text-orange-800'
                                }`}>
                                  {gig.status === 'available' ? 'Available' : 'Unavailable'}
                                </span>
                              </div>
                              
                              {gig.description && (
                                <p className="text-sm mb-3" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                                  {gig.description}
                                </p>
                              )}
                              
                              <div className="flex items-center gap-4 text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                                <div className="flex items-center gap-1">
                                  <DollarSign className="h-4 w-4" />
                                  <span>{gig.price}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  <span>{gig.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  <span>Saved {gig.savedAt}</span>
                                </div>
                              </div>
                              
                              {gig.postedBy && (
                                <div className="mt-2 text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                                  Posted by {gig.postedBy}
                                </div>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => removeSavedGig(gig.id)}
                                className="px-3 py-1 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                                style={{ backgroundColor: theme === 'dark' ? '#3a1f1f' : '#FEF2F2' }}
                              >
                                Remove
                              </button>
                              <button
                                disabled={gig.status === 'requested'}
                                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                                  gig.status === 'requested' 
                                    ? 'opacity-50 cursor-not-allowed' 
                                    : 'hover:opacity-90'
                                }`}
                                style={{ 
                                  backgroundColor: gig.status === 'requested' ? '#9CA3AF' : '#FF5E14',
                                  color: '#FFFFFF'
                                }}
                                title={gig.status === 'requested' ? 'This gig is temporarily unavailable' : 'Contact the poster'}
                              >
                                {gig.status === 'requested' ? 'Unavailable' : 'Contact'}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                      Notifications
                    </h3>
                    <p className="text-sm mb-6" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                      Stay updated with task matches, requests, and important announcements.
                    </p>
                  </div>

                  {/* Real Notifications */}
                  <div className="space-y-4">
                    {notifications.length === 0 ? (
                      <div className="text-center py-12">
                        <Bell className="h-12 w-12 mx-auto mb-4" style={{ color: theme === 'dark' ? '#666666' : '#9CA3AF' }} />
                        <p className="text-lg font-medium mb-2" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                          No notifications yet
                        </p>
                        <p className="text-sm" style={{ color: theme === 'dark' ? '#999999' : '#9CA3AF' }}>
                          You&apos;ll see notifications here when you have new activity.
                        </p>
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 rounded-lg border transition-colors ${
                            notification.isRead ? 'opacity-75' : ''
                          }`}
                          style={{ 
                            backgroundColor: theme === 'dark' ? '#262626' : '#F9FAFB',
                            borderColor: theme === 'dark' ? '#444444' : '#E5E7EB'
                          }}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                                  {notification.title}
                                </h4>
                                {!notification.isRead && (
                                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                                )}
                              </div>
                              <p className="text-sm mb-2" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                                {notification.message}
                              </p>
                              <div className="flex items-center gap-4 text-xs" style={{ color: theme === 'dark' ? '#9CA3AF' : '#9CA3AF' }}>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {new Date(notification.timestamp).toLocaleDateString()} {new Date(notification.timestamp).toLocaleTimeString()}
                                </span>
                                <span className="capitalize px-2 py-1 rounded-full text-xs" style={{ 
                                  backgroundColor: notification.type === 'gig_match' ? '#DEF7EC' : '#EBF4FF',
                                  color: notification.type === 'gig_match' ? '#03543F' : '#1E40AF'
                                }}>
                                  {notification.type.replace('_', ' ')}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                              {!notification.isRead && (
                                <button
                                  onClick={() => markNotificationAsRead(notification.id)}
                                  className="px-3 py-1 rounded-lg text-sm font-medium transition-colors"
                                  style={{ 
                                    backgroundColor: '#FF5E14',
                                    color: '#FFFFFF'
                                  }}
                                >
                                  Mark Read
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Notification Settings */}
                  <div className="pt-6 border-t" style={{ borderColor: theme === 'dark' ? '#444444' : '#E5E7EB' }}>
                    <h4 className="font-semibold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                      Notification Settings
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                            Task Matches
                          </p>
                          <p className="text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                            Get notified when new tasks match your profile
                          </p>
                        </div>
                        <input type="checkbox" defaultChecked className="toggle" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                            Tool Requests
                          </p>
                          <p className="text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                            Receive notifications for tool rental requests
                          </p>
                        </div>
                        <input type="checkbox" defaultChecked className="toggle" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                            General Updates
                          </p>
                          <p className="text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                            Platform updates and important announcements
                          </p>
                        </div>
                        <input type="checkbox" defaultChecked className="toggle" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* My Ads Tab */}
              {activeTab === 'myads' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                      My Ads & Posts
                    </h2>
                  </div>

                  {/* Stats Overview */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">{userPosts.filter(p => p.type === 'tool').length}</div>
                        <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Tools Listed</div>
                      </div>
                    </div>
                    <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{userPosts.filter(p => p.type === 'task').length}</div>
                        <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Services Offered</div>
                      </div>
                    </div>
                    <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{userPosts.filter(p => p.type === 'toolRequest').length}</div>
                        <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Tool Requests</div>
                      </div>
                    </div>
                    <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{userPosts.filter(p => p.type === 'taskRequest').length}</div>
                        <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Task Requests</div>
                      </div>
                    </div>
                  </div>

                  {/* Activity Summary */}
                  <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Activity Summary</h3>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          Total: {userPosts.length} posts • Active: {userPosts.filter(p => p.isActive).length} • 
                          Inactive: {userPosts.filter(p => !p.isActive).length}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Active</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Inactive</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {userPosts.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center" 
                           style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#F3F4F6' }}>
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#FF5E14' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                        No posts yet
                      </h3>
                      <p className="text-lg mb-6" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                        Start creating your first tool or task listing!
                      </p>
                      <div className="flex gap-4 justify-center flex-wrap">
                        <Link
                          href="/CreateTool"
                          className="inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 text-white hover:scale-105"
                          style={{ backgroundColor: '#FF5E14' }}
                        >
                          <span className="mr-2">🔧</span>
                          List a Tool
                        </Link>
                        <Link
                          href="/CreateTask"
                          className="inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 text-white hover:scale-105"
                          style={{ backgroundColor: '#8B5CF6' }}
                        >
                          <span className="mr-2">💼</span>
                          Offer Service
                        </Link>
                        <Link
                          href="/RequestTool"
                          className="inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 text-white hover:scale-105"
                          style={{ backgroundColor: '#3B82F6' }}
                        >
                          <span className="mr-2">🔍</span>
                          Request Tool
                        </Link>
                        <Link
                          href="/RequestTask"
                          className="inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 text-white hover:scale-105"
                          style={{ backgroundColor: '#10B981' }}
                        >
                          <span className="mr-2">🙋‍♂️</span>
                          Request Help
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {userPosts.map((post) => (
                          <div 
                            key={post.id} 
                            className={`rounded-lg border p-6 transition-all duration-300 hover:shadow-lg cursor-pointer ${
                              theme === 'dark' 
                                ? 'border-gray-700 bg-gray-800 hover:border-gray-600' 
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            } ${!post.isActive ? 'opacity-60' : ''}`}
                            onClick={() => {
                              const baseUrl = post.type === 'tool' || post.type === 'toolRequest' ? '/tools' : '/tasks';
                              window.open(`${baseUrl}/${post.id}`, '_blank');
                            }}
                          >
                            {/* Post Image */}
                            {post.image && (
                              <div className="mb-4 relative h-40 w-full rounded-lg overflow-hidden">
                                <Image
                                  src={post.image}
                                  alt={post.title}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                              </div>
                            )}

                            <div className="flex items-start justify-between mb-3">
                              <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                {post.title}
                              </h3>
                              <div className="flex gap-2">
                                {post.type === 'tool' && (
                                  <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded dark:bg-orange-900 dark:text-orange-300">
                                    Tool
                                  </span>
                                )}
                                {post.type === 'task' && (
                                  <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded dark:bg-purple-900 dark:text-purple-300">
                                    Service
                                  </span>
                                )}
                                {post.type === 'toolRequest' && (
                                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded dark:bg-blue-900 dark:text-blue-300">
                                    Tool Request
                                  </span>
                                )}
                                {post.type === 'taskRequest' && (
                                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded dark:bg-green-900 dark:text-green-300">
                                    Task Request
                                  </span>
                                )}
                              </div>
                            </div>

                            <p className={`mb-4 text-sm line-clamp-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                              {post.description}
                            </p>

                            <div className={`grid grid-cols-2 gap-3 mb-4 text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                              <div>
                                <span className="font-medium">Price:</span> {post.price || 'Contact'}
                              </div>
                              <div>
                                <span className="font-medium">Category:</span> {post.category}
                              </div>
                              {post.location && (
                                <div className="col-span-2">
                                  <span className="font-medium">Location:</span> {post.location}
                                </div>
                              )}
                            </div>

                            {/* Status and Actions */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${post.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                <span className={`text-sm font-medium ${
                                  post.isActive 
                                    ? 'text-green-600 dark:text-green-400' 
                                    : 'text-red-600 dark:text-red-400'
                                }`}>
                                  {post.isActive ? 'Active' : 'Inactive'}
                                </span>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    startEditing(post);
                                  }}
                                  disabled={loading}
                                  className="px-3 py-1 rounded text-xs font-medium transition-colors disabled:opacity-50 bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800"
                                >
                                  Edit
                                </button>
                                
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    togglePostStatus(post.id, post.isActive, post.type);
                                  }}
                                  disabled={loading}
                                  className={`px-3 py-1 rounded text-xs font-medium transition-colors disabled:opacity-50 ${
                                    post.isActive
                                      ? 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800'
                                      : 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800'
                                  }`}
                                >
                                  {loading ? '...' : (post.isActive ? 'Deactivate' : 'Activate')}
                                </button>
                                
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deletePost(post.id, post.type);
                                  }}
                                  disabled={loading}
                                  className="px-3 py-1 rounded text-xs font-medium transition-colors disabled:opacity-50 bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800"
                                >
                                  {loading ? '...' : 'Delete'}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
