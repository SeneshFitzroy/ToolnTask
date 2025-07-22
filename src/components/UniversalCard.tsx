import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { Share2, Bookmark } from 'lucide-react';
import { auth, db } from '../lib/firebase';
import { collection, addDoc, deleteDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';

interface UniversalCardProps {
  id: string;
  title: string;
  description: string;
  type: 'tool' | 'task' | 'toolRequest' | 'taskRequest';
  category: string;
  price?: string;
  location?: string;
  image?: string;
  isActive?: boolean;
  createdAt?: Date | null;
  postedBy?: string;
  condition?: string;
  brand?: string;
  specifications?: string[];
  features?: string[];
  urgency?: string;
  isUrgent?: boolean;
  isPromoted?: boolean;
  maxRentalPrice?: string;
  neededDate?: string;
  returnDate?: string;
  requestedBy?: string;
  budget?: string;
  time?: string;
  duration?: string;
  contact?: string;
  showActions?: boolean;
  onSave?: (id: string) => void;
  onShare?: (id: string) => void;
  isSaved?: boolean;
}

export default function UniversalCard({
  id,
  title,
  description,
  type,
  category,
  price,
  location,
  image,
  isActive = true,
  postedBy,
  condition,
  specifications = [],
  urgency,
  isUrgent,
  isPromoted,
  maxRentalPrice,
  neededDate,
  returnDate,
  requestedBy,
  budget,
  time,
  duration,
  contact,
  showActions = true,
  onSave,
  onShare,
  isSaved = false
}: UniversalCardProps) {
  const { theme } = useTheme();
  const [saved, setSaved] = useState(isSaved);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      // Check if this item is already saved by the user
      if (user) {
        try {
          const savedGigsRef = collection(db, 'savedGigs');
          const q = query(savedGigsRef, 
            where('userId', '==', user.uid),
            where('originalGigId', '==', id)
          );
          const querySnapshot = await getDocs(q);
          setSaved(!querySnapshot.empty);
        } catch (error) {
          console.error('Error checking saved status:', error);
        }
      }
    });
    return () => unsubscribe();
  }, [id]);

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      alert('Please sign in to save items');
      return;
    }

    try {
      if (saved) {
        // Remove from saved items
        const savedGigsRef = collection(db, 'savedGigs');
        const q = query(savedGigsRef, 
          where('userId', '==', user.uid),
          where('originalGigId', '==', id)
        );
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });
        
        setSaved(false);
      } else {
        // Add to saved items
        await addDoc(collection(db, 'savedGigs'), {
          userId: user.uid,
          originalGigId: id,
          title,
          description,
          type,
          price: price || maxRentalPrice || budget || 'Not specified',
          location: location || 'Not specified',
          image: image || null, // Use null instead of undefined
          postedBy: postedBy || 'Unknown',
          status: 'available',
          savedAt: serverTimestamp()
        });
        
        setSaved(true);
      }
    } catch (error) {
      console.error('Error saving item:', error);
      alert('Error saving item. Please try again.');
    }

    if (onSave) {
      onSave(id);
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Generate share URL
    const baseUrl = type === 'tool' || type === 'toolRequest' ? '/tools' : '/tasks';
    const shareUrl = `${window.location.origin}${baseUrl}/${id}`;
    
    // Create share data
    const shareData = {
      title: title,
      text: description,
      url: shareUrl
    };

    // Try native sharing first
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      navigator.share(shareData);
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert('Link copied to clipboard!');
      });
    }
    
    if (onShare) {
      onShare(id);
    }
  };

  const getDetailUrl = () => {
    const baseUrl = type === 'tool' || type === 'toolRequest' ? '/tools' : '/tasks';
    return `${baseUrl}/${id}`;
  };

  const getTypeInfo = () => {
    switch (type) {
      case 'tool':
        return { label: 'Tool', color: 'orange', bgColor: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300' };
      case 'task':
        return { label: 'Service', color: 'purple', bgColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' };
      case 'toolRequest':
        return { label: 'Tool Request', color: 'blue', bgColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' };
      case 'taskRequest':
        return { label: 'Task Request', color: 'green', bgColor: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' };
      default:
        return { label: 'Item', color: 'gray', bgColor: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300' };
    }
  };

  const typeInfo = getTypeInfo();

  return (
    <Link href={getDetailUrl()}>
      <div className={`rounded-lg border p-6 transition-all duration-300 hover:shadow-lg cursor-pointer overflow-hidden ${
        theme === 'dark' 
          ? 'border-gray-700 bg-gray-800 hover:border-gray-600' 
          : 'border-gray-200 bg-white hover:border-gray-300'
      } ${!isActive ? 'opacity-60' : ''}`}>
        
        {/* Tool/Task Image */}
        {image && (
          <div className="mb-4 relative h-48 w-full rounded-lg overflow-hidden">
            <Image
              src={image}
              alt={title || 'Item'}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Image overlay with badges */}
            <div className="absolute top-2 right-2 flex gap-2">
              <span className={`text-xs font-medium px-2 py-1 rounded-full shadow-lg ${typeInfo.bgColor}`}>
                {typeInfo.label}
              </span>
              {(isUrgent || urgency === 'urgent') && (
                <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full shadow-lg">
                  Urgent
                </span>
              )}
              {isPromoted && (
                <span className="bg-yellow-500 text-white text-xs font-medium px-2 py-1 rounded-full shadow-lg">
                  Featured
                </span>
              )}
            </div>
          </div>
        )}

        <div className="flex items-start justify-between mb-4">
          <h2 className={`text-lg font-semibold line-clamp-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {title || 'Untitled'}
          </h2>
          {!image && (
            <div className="flex gap-2 flex-wrap">
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${typeInfo.bgColor}`}>
                {typeInfo.label}
              </span>
              {(isUrgent || urgency === 'urgent') && (
                <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                  Urgent
                </span>
              )}
              {isPromoted && (
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                  Featured
                </span>
              )}
            </div>
          )}
        </div>
        
        <p className={`mb-4 line-clamp-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          {description || 'No description available'}
        </p>
        
        <div className={`grid grid-cols-2 gap-4 mb-4 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          {(type === 'tool' || type === 'task') ? (
            <>
              <div>
                <span className="font-medium">Price:</span>{' '}
                <span className="text-green-600 font-semibold dark:text-green-400">
                  {price || 'Contact for price'}
                </span>
              </div>
              <div>
                <span className="font-medium">Duration:</span> {time || duration || 'Flexible'}
              </div>
              <div>
                <span className="font-medium">Location:</span> {location || 'Location not specified'}
              </div>
              <div>
                <span className="font-medium">Category:</span>{' '}
                <span className="capitalize">{category || 'Other'}</span>
              </div>
              {condition && (
                <div className="col-span-2">
                  <span className="font-medium">Condition:</span>{' '}
                  <span className={`px-2 py-1 rounded text-xs ${
                    condition === 'Excellent' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                    condition === 'Good' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                    condition === 'Fair' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                  }`}>
                    {condition}
                  </span>
                </div>
              )}
            </>
          ) : (
            <>
              <div>
                <span className="font-medium">{type === 'toolRequest' ? 'Max Price:' : 'Budget:'}</span>{' '}
                <span className="text-blue-600 font-semibold dark:text-blue-400">
                  {maxRentalPrice || budget || 'Negotiable'}
                </span>
              </div>
              <div>
                <span className="font-medium">Needed:</span> {neededDate || 'ASAP'}
              </div>
              {returnDate && (
                <div>
                  <span className="font-medium">Return:</span> {returnDate}
                </div>
              )}
              <div>
                <span className="font-medium">Category:</span>{' '}
                <span className="capitalize">{category || 'Other'}</span>
              </div>
              {location && (
                <div className="col-span-2">
                  <span className="font-medium">Location:</span> {location}
                </div>
              )}
            </>
          )}
        </div>
        
        {specifications && specifications.length > 0 && (
          <div className="mb-4">
            <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Specifications:
            </span>
            <div className="flex flex-wrap gap-2 mt-2">
              {specifications.slice(0, 3).map((spec, index) => (
                <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded dark:bg-gray-700 dark:text-gray-300">
                  {spec}
                </span>
              ))}
              {specifications.length > 3 && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  +{specifications.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between mt-auto">
          <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            {(type === 'tool' || type === 'task') 
              ? `By: ${postedBy || contact || 'Anonymous'}` 
              : `Requested by: ${requestedBy || 'Anonymous'}`}
          </span>
          
          {showActions && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleSave}
                className={`p-2 rounded-lg transition-colors ${
                  saved 
                    ? 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/20' 
                    : 'text-gray-400 hover:text-orange-600 hover:bg-orange-100 dark:hover:text-orange-400 dark:hover:bg-orange-900/20'
                }`}
                title={saved ? 'Remove from saved' : 'Save'}
              >
                {saved ? <Bookmark className="h-4 w-4 fill-current" /> : <Bookmark className="h-4 w-4" />}
              </button>
              
              <button
                onClick={handleShare}
                className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-100 dark:hover:text-blue-400 dark:hover:bg-blue-900/20 transition-colors"
                title="Share"
              >
                <Share2 className="h-4 w-4" />
              </button>
              
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                View Details
              </button>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
