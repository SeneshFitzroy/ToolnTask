
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface TaskCardProps {
  id?: string | number;
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
  id = 1,
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
    <Link href={`/tasks/${id}_enhanced`}>
      <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-slate-100 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-500 overflow-hidden h-[500px] sm:h-[550px] flex flex-col transform hover:scale-105 relative cursor-pointer">
        {isPromoted && (
          <div className="absolute top-4 sm:top-5 left-4 sm:left-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold px-3 sm:px-4 py-2 rounded-full z-10 shadow-lg">
            ⭐ PROMOTED
          </div>
        )}
        
        {isUrgent && (
          <div className="absolute top-4 sm:top-5 right-4 sm:right-5 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-bold px-3 sm:px-4 py-2 rounded-full z-10 shadow-lg">
            🚨 URGENT
          </div>
        )}
        
        {/* Image Section */}
        <div className="h-44 sm:h-52 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-700 dark:to-gray-600 relative overflow-hidden">
          {image ? (
            <Image src={image} alt={title} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900 dark:to-orange-800">
              <span className="text-6xl sm:text-7xl">👨‍💼</span>
            </div>
          )}
        </div>
        
        <div className="p-4 sm:p-5 lg:p-7 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-4 sm:mb-5">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800 dark:text-white line-clamp-2 flex-1 mr-3 sm:mr-4 leading-tight">{title}</h3>
            <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-600 dark:text-orange-400 whitespace-nowrap">{price}</span>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4 sm:mb-5 lg:mb-7 line-clamp-3 flex-1 text-base sm:text-lg leading-relaxed">{description}</p>
          
          <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-5 lg:mb-7">
            <div className="flex items-center text-sm sm:text-base text-gray-500 dark:text-gray-400">
              <span className="w-5 h-5 sm:w-6 sm:h-6 mr-3 sm:mr-4 text-slate-600 dark:text-slate-400">⏰</span>
              <span className="font-medium">{time}</span>
            </div>
            <div className="flex items-center text-sm sm:text-base text-gray-500 dark:text-gray-400">
              <span className="w-5 h-5 sm:w-6 sm:h-6 mr-3 sm:mr-4 text-slate-600 dark:text-slate-400">📍</span>
              <span className="font-medium">{location}</span>
            </div>
          </div>
          
          <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3.5 sm:py-4 px-5 sm:px-7 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-center block text-base sm:text-lg">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default TaskCard;
