
import React from 'react';
import Image from 'next/image';

interface TaskCardProps {
  title: string;
  description: string;
  price: string;
  time: string;
  location: string;
  isUrgent?: boolean;
  isPromoted?: boolean;
  image?: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ 
  title, 
  description, 
  price, 
  time, 
  location, 
  isUrgent = false,
  isPromoted = false,
  image
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-slate-100 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-500 overflow-hidden h-[500px] flex flex-col transform hover:scale-105 relative">
      {isPromoted && (
        <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-lg">
          ⭐ PROMOTED
        </div>
      )}
      
      {isUrgent && (
        <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-lg">
          🚨 URGENT
        </div>
      )}
      
      {/* Image Section */}
      <div className="h-48 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-700 dark:to-gray-600 relative overflow-hidden">
        {image ? (
          <Image src={image} alt={title} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900 dark:to-orange-800">
            <span className="text-6xl">👨‍💼</span>
          </div>
        )}
      </div>
      
      <div className="p-4 sm:p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white line-clamp-2 flex-1 mr-3">{title}</h3>
          <span className="text-lg sm:text-2xl font-bold text-orange-600 dark:text-orange-400 whitespace-nowrap">{price}</span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 line-clamp-3 flex-1 text-sm sm:text-base">{description}</p>
        
        <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span className="w-5 h-5 mr-3 text-slate-600 dark:text-slate-400">⏰</span>
            <span className="font-medium">{time}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span className="w-5 h-5 mr-3 text-slate-600 dark:text-slate-400">📍</span>
            <span className="font-medium">{location}</span>
          </div>
        </div>
        
        <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-center block text-sm sm:text-base">
          View Details
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
