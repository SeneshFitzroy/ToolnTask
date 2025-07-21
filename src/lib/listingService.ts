import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';

export interface Listing {
  id?: string;
  title: string;
  description: string;
  type: 'task' | 'tool';
  category: string;
  price: string;
  location: string;
  status: 'active' | 'inactive' | 'completed';
  userId: string;
  userDisplayName: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  views?: number;
  saved?: number;
  imageUrl?: string;
  featured?: boolean;
  tags?: string[];
}

export interface SavedGig {
  id?: string;
  userId: string;
  gigId: string;
  gigType: 'task' | 'tool';
  savedAt: Timestamp;
}

export interface Notification {
  id?: string;
  userId: string;
  type: 'gig_match' | 'request' | 'approval' | 'general';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Timestamp;
  relatedGig?: string;
  readAt?: Timestamp;
}

export interface UserStats {
  totalListings: number;
  totalTasks: number;
  totalTools: number;
  activeTasks: number;
  activeTools: number;
  completedTasks: number;
  savedGigs: number;
  totalViews: number;
}

// Listing Management
export const createListing = async (listing: Omit<Listing, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'saved'>): Promise<string> => {
  try {
    const listingData = {
      ...listing,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      views: 0,
      saved: 0,
      featured: false
    };

    const collectionName = listing.type === 'task' ? 'tasks' : 'tools';
    const docRef = await addDoc(collection(db, collectionName), listingData);
    
    // Update user stats
    await updateUserStats(listing.userId);
    
    return docRef.id;
  } catch (error) {
    console.error('Error creating listing:', error);
    throw error;
  }
};

export const updateListing = async (listingId: string, type: 'task' | 'tool', updates: Partial<Listing>): Promise<void> => {
  try {
    const collectionName = type === 'task' ? 'tasks' : 'tools';
    await updateDoc(doc(db, collectionName, listingId), {
      ...updates,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating listing:', error);
    throw error;
  }
};

export const deleteListing = async (listingId: string, type: 'task' | 'tool', userId: string): Promise<void> => {
  try {
    const collectionName = type === 'task' ? 'tasks' : 'tools';
    await deleteDoc(doc(db, collectionName, listingId));
    
    // Update user stats
    await updateUserStats(userId);
  } catch (error) {
    console.error('Error deleting listing:', error);
    throw error;
  }
};

export const getUserListings = async (userId: string): Promise<Listing[]> => {
  try {
    const [tasksQuery, toolsQuery] = [
      query(collection(db, 'tasks'), where('userId', '==', userId), orderBy('createdAt', 'desc')),
      query(collection(db, 'tools'), where('userId', '==', userId), orderBy('createdAt', 'desc'))
    ];

    const [tasksSnapshot, toolsSnapshot] = await Promise.all([
      getDocs(tasksQuery),
      getDocs(toolsQuery)
    ]);

    const listings: Listing[] = [];
    
    tasksSnapshot.forEach(doc => {
      listings.push({ id: doc.id, type: 'task', ...doc.data() } as Listing);
    });
    
    toolsSnapshot.forEach(doc => {
      listings.push({ id: doc.id, type: 'tool', ...doc.data() } as Listing);
    });

    // Sort by creation date
    return listings.sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return b.createdAt.seconds - a.createdAt.seconds;
      }
      return 0;
    });
  } catch (error) {
    console.error('Error getting user listings:', error);
    throw error;
  }
};

export const getPublicListings = async (type?: 'task' | 'tool', limit_count: number = 20): Promise<Listing[]> => {
  try {
    const listings: Listing[] = [];
    
    if (!type || type === 'task') {
      const tasksQuery = query(
        collection(db, 'tasks'), 
        where('status', '==', 'active'),
        orderBy('createdAt', 'desc'),
        limit(limit_count)
      );
      const tasksSnapshot = await getDocs(tasksQuery);
      tasksSnapshot.forEach(doc => {
        listings.push({ id: doc.id, type: 'task', ...doc.data() } as Listing);
      });
    }
    
    if (!type || type === 'tool') {
      const toolsQuery = query(
        collection(db, 'tools'), 
        where('status', '==', 'active'),
        orderBy('createdAt', 'desc'),
        limit(limit_count)
      );
      const toolsSnapshot = await getDocs(toolsQuery);
      toolsSnapshot.forEach(doc => {
        listings.push({ id: doc.id, type: 'tool', ...doc.data() } as Listing);
      });
    }

    return listings.sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return b.createdAt.seconds - a.createdAt.seconds;
      }
      return 0;
    });
  } catch (error) {
    console.error('Error getting public listings:', error);
    throw error;
  }
};

// Saved Gigs Management
export const saveGig = async (userId: string, gigId: string, gigType: 'task' | 'tool'): Promise<void> => {
  try {
    await addDoc(collection(db, 'savedGigs'), {
      userId,
      gigId,
      gigType,
      savedAt: serverTimestamp()
    });

    // Increment saved count for the gig
    const collectionName = gigType === 'task' ? 'tasks' : 'tools';
    const gigDoc = await getDoc(doc(db, collectionName, gigId));
    if (gigDoc.exists()) {
      const currentSaved = gigDoc.data().saved || 0;
      await updateDoc(doc(db, collectionName, gigId), {
        saved: currentSaved + 1
      });
    }
  } catch (error) {
    console.error('Error saving gig:', error);
    throw error;
  }
};

export const unsaveGig = async (userId: string, gigId: string, gigType: 'task' | 'tool'): Promise<void> => {
  try {
    const savedQuery = query(
      collection(db, 'savedGigs'),
      where('userId', '==', userId),
      where('gigId', '==', gigId),
      where('gigType', '==', gigType)
    );
    
    const snapshot = await getDocs(savedQuery);
    snapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

    // Decrement saved count for the gig
    const collectionName = gigType === 'task' ? 'tasks' : 'tools';
    const gigDoc = await getDoc(doc(db, collectionName, gigId));
    if (gigDoc.exists()) {
      const currentSaved = gigDoc.data().saved || 0;
      await updateDoc(doc(db, collectionName, gigId), {
        saved: Math.max(0, currentSaved - 1)
      });
    }
  } catch (error) {
    console.error('Error unsaving gig:', error);
    throw error;
  }
};

export const getUserSavedGigs = async (userId: string): Promise<Listing[]> => {
  try {
    const savedQuery = query(
      collection(db, 'savedGigs'),
      where('userId', '==', userId),
      orderBy('savedAt', 'desc')
    );
    
    const savedSnapshot = await getDocs(savedQuery);
    const savedGigs: Listing[] = [];
    
    for (const savedDoc of savedSnapshot.docs) {
      const savedData = savedDoc.data();
      const gigId = savedData.gigId;
      const gigType = savedData.gigType;
      
      // Get the actual gig data
      const collectionName = gigType === 'task' ? 'tasks' : 'tools';
      const gigDoc = await getDoc(doc(db, collectionName, gigId));
      if (gigDoc.exists()) {
        savedGigs.push({ 
          id: gigDoc.id, 
          type: gigType as 'task' | 'tool', 
          ...gigDoc.data(),
          savedAt: savedData.savedAt
        } as Listing);
      }
    }
    
    return savedGigs;
  } catch (error) {
    console.error('Error getting saved gigs:', error);
    throw error;
  }
};

// Notifications Management
export const createNotification = async (notification: Omit<Notification, 'id' | 'createdAt'>): Promise<string> => {
  try {
    const notificationData = {
      ...notification,
      createdAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, 'notifications'), notificationData);
    return docRef.id;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
};

export const getUserNotifications = async (userId: string, limitCount: number = 20): Promise<Notification[]> => {
  try {
    const notificationsQuery = query(
      collection(db, 'notifications'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    
    const snapshot = await getDocs(notificationsQuery);
    const notifications: Notification[] = [];
    
    snapshot.forEach(doc => {
      notifications.push({ id: doc.id, ...doc.data() } as Notification);
    });
    
    return notifications;
  } catch (error) {
    console.error('Error getting notifications:', error);
    throw error;
  }
};

export const markNotificationAsRead = async (notificationId: string): Promise<void> => {
  try {
    await updateDoc(doc(db, 'notifications', notificationId), {
      isRead: true,
      readAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
};

export const markAllNotificationsAsRead = async (userId: string): Promise<void> => {
  try {
    const unreadQuery = query(
      collection(db, 'notifications'),
      where('userId', '==', userId),
      where('isRead', '==', false)
    );
    
    const snapshot = await getDocs(unreadQuery);
    const promises = snapshot.docs.map(doc => 
      updateDoc(doc.ref, {
        isRead: true,
        readAt: serverTimestamp()
      })
    );
    
    await Promise.all(promises);
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    throw error;
  }
};

// User Stats Management
export const getUserStats = async (userId: string): Promise<UserStats> => {
  try {
    const [tasksSnapshot, toolsSnapshot, savedSnapshot] = await Promise.all([
      getDocs(query(collection(db, 'tasks'), where('userId', '==', userId))),
      getDocs(query(collection(db, 'tools'), where('userId', '==', userId))),
      getDocs(query(collection(db, 'savedGigs'), where('userId', '==', userId)))
    ]);

    const tasks = tasksSnapshot.docs.map(doc => doc.data());
    const tools = toolsSnapshot.docs.map(doc => doc.data());

    const stats: UserStats = {
      totalListings: tasks.length + tools.length,
      totalTasks: tasks.length,
      totalTools: tools.length,
      activeTasks: tasks.filter(t => t.status === 'active').length,
      activeTools: tools.filter(t => t.status === 'active').length,
      completedTasks: tasks.filter(t => t.status === 'completed').length,
      savedGigs: savedSnapshot.size,
      totalViews: [...tasks, ...tools].reduce((sum, item) => sum + (item.views || 0), 0)
    };

    return stats;
  } catch (error) {
    console.error('Error getting user stats:', error);
    throw error;
  }
};

export const updateUserStats = async (userId: string): Promise<void> => {
  try {
    const stats = await getUserStats(userId);
    
    await updateDoc(doc(db, 'users', userId), {
      totalListings: stats.totalListings,
      totalTasks: stats.totalTasks,
      totalTools: stats.totalTools,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating user stats:', error);
    throw error;
  }
};

// View Tracking
export const incrementViews = async (gigId: string, gigType: 'task' | 'tool'): Promise<void> => {
  try {
    const collectionName = gigType === 'task' ? 'tasks' : 'tools';
    const gigDoc = await getDoc(doc(db, collectionName, gigId));
    
    if (gigDoc.exists()) {
      const currentViews = gigDoc.data().views || 0;
      await updateDoc(doc(db, collectionName, gigId), {
        views: currentViews + 1
      });
    }
  } catch (error) {
    console.error('Error incrementing views:', error);
    throw error;
  }
};

// Search functionality
export const searchListings = async (
  searchTerm: string, 
  type?: 'task' | 'tool', 
  category?: string, 
  location?: string
): Promise<Listing[]> => {
  try {
    const listings: Listing[] = [];
    const collections = type ? [type] : ['task', 'tool'];
    
    for (const collectionType of collections) {
      const collectionName = collectionType === 'task' ? 'tasks' : 'tools';
      let q = query(
        collection(db, collectionName),
        where('status', '==', 'active'),
        orderBy('createdAt', 'desc')
      );
      
      const snapshot = await getDocs(q);
      snapshot.forEach(doc => {
        const data = doc.data();
        const listing = { id: doc.id, type: collectionType as 'task' | 'tool', ...data } as Listing;
        
        // Client-side filtering for better search results
        const matchesSearch = !searchTerm || 
          listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          listing.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (listing.tags && listing.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
          
        const matchesCategory = !category || listing.category === category;
        const matchesLocation = !location || listing.location.toLowerCase().includes(location.toLowerCase());
        
        if (matchesSearch && matchesCategory && matchesLocation) {
          listings.push(listing);
        }
      });
    }
    
    return listings;
  } catch (error) {
    console.error('Error searching listings:', error);
    throw error;
  }
};

// Admin functions (for admin dashboard)
export const getAllListings = async (): Promise<Listing[]> => {
  try {
    const [tasksSnapshot, toolsSnapshot] = await Promise.all([
      getDocs(query(collection(db, 'tasks'), orderBy('createdAt', 'desc'))),
      getDocs(query(collection(db, 'tools'), orderBy('createdAt', 'desc')))
    ]);

    const listings: Listing[] = [];
    
    tasksSnapshot.forEach(doc => {
      listings.push({ id: doc.id, type: 'task', ...doc.data() } as Listing);
    });
    
    toolsSnapshot.forEach(doc => {
      listings.push({ id: doc.id, type: 'tool', ...doc.data() } as Listing);
    });

    return listings.sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return b.createdAt.seconds - a.createdAt.seconds;
      }
      return 0;
    });
  } catch (error) {
    console.error('Error getting all listings:', error);
    throw error;
  }
};

export const getAllUsers = async (): Promise<any[]> => {
  try {
    const snapshot = await getDocs(query(collection(db, 'users'), orderBy('createdAt', 'desc')));
    const users: any[] = [];
    
    snapshot.forEach(doc => {
      users.push({ id: doc.id, ...doc.data() });
    });
    
    return users;
  } catch (error) {
    console.error('Error getting all users:', error);
    throw error;
  }
};

export const getSystemStats = async () => {
  try {
    const [usersSnapshot, tasksSnapshot, toolsSnapshot] = await Promise.all([
      getDocs(collection(db, 'users')),
      getDocs(collection(db, 'tasks')),
      getDocs(collection(db, 'tools'))
    ]);

    return {
      totalUsers: usersSnapshot.size,
      totalTasks: tasksSnapshot.size,
      totalTools: toolsSnapshot.size,
      totalListings: tasksSnapshot.size + toolsSnapshot.size,
      activeUsers: usersSnapshot.docs.filter(doc => doc.data().isActive).length,
      activeTasks: tasksSnapshot.docs.filter(doc => doc.data().status === 'active').length,
      activeTools: toolsSnapshot.docs.filter(doc => doc.data().status === 'active').length
    };
  } catch (error) {
    console.error('Error getting system stats:', error);
    throw error;
  }
};
