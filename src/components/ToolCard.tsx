
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ToolCardProps {
  id?: string | number;
  title: string;
  description: string;
  price: string;
  brand: string;
  condition: string;
  image?: string;
  available?: boolean;
  isPromoted?: boolean;
}

const ToolCard: React.FC<ToolCardProps> = ({ 
  id = 1,
  title, 
  description, 
  price, 
  brand, 
  condition, 
  image, 
  available = true,
  isPromoted = false
}) => {
  return (
    <Link href={`/tools/${id}_enhanced`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-slate-100 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-500 overflow-hidden h-[380px] sm:h-[420px] flex flex-col transform hover:scale-105 relative cursor-pointer">
        {isPromoted && (
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-2 sm:px-3 py-1 rounded-full z-10 shadow-lg">
            ⭐ PROMOTED
          </div>
        )}
        
        <div className="h-36 sm:h-40 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center relative overflow-hidden">
          {available ? (
            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-green-500 text-white text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 rounded-full shadow-lg z-10">
              Available
            </div>
          ) : (
            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-red-500 text-white text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 rounded-full shadow-lg z-10">
              Rented
            </div>
          )}
          {image ? (
            <Image src={image} alt={title} fill className="object-cover" />
          ) : (
            <div className="text-slate-400 dark:text-gray-500 text-4xl sm:text-5xl">🔧</div>
          )}
        </div>
        
        <div className="p-3 sm:p-4 lg:p-5 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2 sm:mb-3">
            <h3 className="text-sm sm:text-base lg:text-lg font-bold text-slate-800 dark:text-white line-clamp-2 flex-1 mr-2 sm:mr-3 leading-tight">{title}</h3>
            <span className="text-base sm:text-lg lg:text-xl font-bold text-orange-600 dark:text-orange-400 whitespace-nowrap">{price}</span>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 mb-2 sm:mb-3 lg:mb-4 line-clamp-2 flex-1 text-xs sm:text-sm leading-relaxed">{description}</p>
          
          <div className="space-y-1 sm:space-y-2 mb-2 sm:mb-3 lg:mb-4">
            <div className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              <span className="w-3 h-3 sm:w-4 sm:h-4 mr-2 sm:mr-3 text-slate-600 dark:text-slate-400">🏷️</span>
              <span className="font-medium">{brand}</span>
            </div>
            <div className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              <span className="w-3 h-3 sm:w-4 sm:h-4 mr-2 sm:mr-3 text-slate-600 dark:text-slate-400">✨</span>
              <span className="font-medium">{condition}</span>
            </div>
          </div>
          
          <button
            className={`w-full font-bold py-2 sm:py-2.5 px-3 sm:px-4 rounded-md sm:rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-center block text-xs sm:text-sm ${
              available 
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white' 
                : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            {available ? 'View Details' : 'Not Available'}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ToolCard;
