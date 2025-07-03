import React from 'react';

const WorkerAnimation = () => {
  return (
    <div className="relative w-80 h-80 lg:w-96 lg:h-96">
      {/* Animated background circle */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-200 via-orange-300 to-orange-400 dark:from-orange-800 dark:via-orange-700 dark:to-orange-600 rounded-full animate-pulse opacity-20"></div>
      
      {/* Rotating border */}
      <div className="absolute inset-4 border-4 border-dashed border-orange-300 dark:border-orange-600 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
      
      {/* Main content area */}
      <div className="absolute inset-8 bg-white dark:bg-gray-800 rounded-full shadow-2xl flex items-center justify-center overflow-hidden">
        {/* Worker illustration */}
        <div className="relative">
          {/* Tools floating animation */}
          <div className="absolute -top-8 -left-8 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white text-lg transform rotate-12">
              🔧
            </div>
          </div>
          
          <div className="absolute -top-6 right-4 animate-bounce" style={{ animationDelay: '1s', animationDuration: '2.5s' }}>
            <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center text-white text-sm transform -rotate-12">
              🔨
            </div>
          </div>
          
          <div className="absolute bottom-2 -left-6 animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }}>
            <div className="w-7 h-7 bg-green-500 rounded-lg flex items-center justify-center text-white text-base transform rotate-45">
              ⚙️
            </div>
          </div>
          
          {/* Central worker icon */}
          <div className="w-32 h-32 bg-gradient-to-br from-slate-700 to-slate-800 dark:from-slate-600 dark:to-slate-700 rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <div className="text-6xl">👷</div>
          </div>
          
          {/* Animated skill badges */}
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-2">
              <div className="px-3 py-1 bg-orange-100 dark:bg-orange-800 text-orange-700 dark:text-orange-300 rounded-full text-xs font-medium animate-pulse" style={{ animationDelay: '0.5s' }}>
                Repair
              </div>
              <div className="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium animate-pulse" style={{ animationDelay: '1.5s' }}>
                Build
              </div>
              <div className="px-3 py-1 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 rounded-full text-xs font-medium animate-pulse" style={{ animationDelay: '2.5s' }}>
                Fix
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
      <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
    </div>
  );
};

export default WorkerAnimation;
