
import React from 'react';

interface FilterButtonsProps {
  onFilterChange: (filter: 'all' | 'tasks' | 'tools') => void;
  activeFilter: 'all' | 'tasks' | 'tools';
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ onFilterChange, activeFilter }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 mb-6 sm:mb-8">
      <button
        onClick={() => onFilterChange('all')}
        className={`px-6 sm:px-12 py-3 sm:py-4 rounded-2xl text-base sm:text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl transform ${
          activeFilter === 'all'
            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
            : 'bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-700 dark:text-purple-300 hover:from-purple-200 hover:to-blue-200 dark:hover:from-purple-800/40 dark:hover:to-blue-800/40'
        }`}
      >
        🌟 All
      </button>
      <button
        onClick={() => onFilterChange('tasks')}
        className={`px-6 sm:px-12 py-3 sm:py-4 rounded-2xl text-base sm:text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl transform ${
          activeFilter === 'tasks'
            ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg'
            : 'bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 text-orange-700 dark:text-orange-300 hover:from-orange-200 hover:to-red-200 dark:hover:from-orange-800/40 dark:hover:to-red-800/40'
        }`}
      >
        💼 Tasks
      </button>
      <button
        onClick={() => onFilterChange('tools')}
        className={`px-6 sm:px-12 py-3 sm:py-4 rounded-2xl text-base sm:text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl transform ${
          activeFilter === 'tools'
            ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
            : 'bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-700 dark:text-blue-300 hover:from-blue-200 hover:to-cyan-200 dark:hover:from-blue-800/40 dark:hover:to-cyan-800/40'
        }`}
      >
        🔧 Tools
      </button>
    </div>
  );
};

export default FilterButtons;
