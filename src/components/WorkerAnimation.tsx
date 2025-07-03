import React from 'react';

const WorkerAnimation = () => {
  return (
    <div className="relative w-80 h-80 lg:w-96 lg:h-96 transform hover:scale-105 transition-transform duration-300">
      {/* Outer glow ring */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-300 via-blue-300 to-green-300 dark:from-orange-600 dark:via-blue-600 dark:to-green-600 rounded-full animate-pulse opacity-30 blur-sm"></div>
      
      {/* Animated background circle */}
      <div className="absolute inset-2 bg-gradient-to-br from-orange-200 via-orange-300 to-blue-300 dark:from-orange-800 dark:via-orange-700 dark:to-blue-700 rounded-full animate-pulse opacity-40"></div>
      
      {/* Rotating border rings */}
      <div className="absolute inset-4 border-4 border-dashed border-orange-400 dark:border-orange-500 rounded-full animate-spin opacity-60" style={{ animationDuration: '20s' }}></div>
      <div className="absolute inset-6 border-2 border-dotted border-blue-400 dark:border-blue-500 rounded-full animate-spin opacity-40" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
      
      {/* Main content area */}
      <div className="absolute inset-8 bg-white dark:bg-gray-800 rounded-full shadow-2xl flex items-center justify-center overflow-hidden border-2 border-gray-100 dark:border-gray-700">
        {/* Worker illustration container */}
        <div className="relative">
          {/* Enhanced floating tools */}
          <div className="absolute -top-10 -left-10 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white text-xl transform rotate-12 shadow-lg hover:shadow-xl transition-shadow">
              🔧
            </div>
          </div>
          
          <div className="absolute -top-8 right-2 animate-bounce" style={{ animationDelay: '1s', animationDuration: '2.5s' }}>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-lg transform -rotate-12 shadow-lg">
              🔨
            </div>
          </div>
          
          <div className="absolute bottom-0 -left-8 animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }}>
            <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white text-lg transform rotate-45 shadow-lg">
              ⚙️
            </div>
          </div>
          
          <div className="absolute -top-4 left-8 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '4s' }}>
            <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm transform rotate-90 shadow-lg">
              🪚
            </div>
          </div>
          
          <div className="absolute bottom-4 right-2 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '3.2s' }}>
            <div className="w-7 h-7 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center text-white text-base transform -rotate-30 shadow-lg">
              🪛
            </div>
          </div>
          
          {/* Enhanced central worker icon */}
          <div className="w-36 h-36 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 dark:from-slate-600 dark:via-slate-700 dark:to-slate-800 rounded-full flex items-center justify-center shadow-2xl animate-pulse border-4 border-gray-200 dark:border-gray-600">
            <div className="text-7xl drop-shadow-lg">👷</div>
          </div>
          
          {/* Enhanced skill badges */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-3">
              <div className="px-4 py-2 bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-800 dark:to-orange-700 text-orange-700 dark:text-orange-300 rounded-full text-sm font-semibold animate-pulse shadow-md border border-orange-300 dark:border-orange-600" style={{ animationDelay: '0.5s' }}>
                Tasks
              </div>
              <div className="px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-700 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold animate-pulse shadow-md border border-blue-300 dark:border-blue-600" style={{ animationDelay: '1.5s' }}>
                Tools
              </div>
              <div className="px-4 py-2 bg-gradient-to-r from-green-100 to-green-200 dark:from-green-800 dark:to-green-700 text-green-700 dark:text-green-300 rounded-full text-sm font-semibold animate-pulse shadow-md border border-green-300 dark:border-green-600" style={{ animationDelay: '2.5s' }}>
                Help
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced floating particles */}
      <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-orange-400 rounded-full animate-ping shadow-lg"></div>
      <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping shadow-lg" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 right-1/3 w-2.5 h-2.5 bg-green-400 rounded-full animate-ping shadow-lg" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/3 left-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping shadow-lg" style={{ animationDelay: '3s' }}></div>
      <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-red-400 rounded-full animate-ping shadow-lg" style={{ animationDelay: '4s' }}></div>
    </div>
  );
};

export default WorkerAnimation;
