
import React from 'react';

interface FilterButtonsProps {
  onFilterChange: (filter: 'all' | 'tasks' | 'tools') => void;
  activeFilter: 'all' | 'tasks' | 'tools';
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ onFilterChange, activeFilter }) => {
  const filterOptions = [
    {
      key: 'all' as const,
      label: 'All',
      description: 'Everything',
      activeColor: 'bg-slate-800 dark:bg-white text-white dark:text-slate-800',
      hoverColor: 'hover:bg-slate-100 dark:hover:bg-gray-700',
      textColor: 'text-slate-700 dark:text-slate-300'
    },
    {
      key: 'tasks' as const,
      label: 'Tasks',
      description: 'Get Help',
      activeColor: 'bg-orange-600 dark:bg-orange-500 text-white',
      hoverColor: 'hover:bg-orange-50 dark:hover:bg-orange-900/20',
      textColor: 'text-orange-700 dark:text-orange-400'
    },
    {
      key: 'tools' as const,
      label: 'Tools',
      description: 'Rent Items',
      activeColor: 'bg-blue-600 dark:bg-blue-500 text-white',
      hoverColor: 'hover:bg-blue-50 dark:hover:bg-blue-900/20',
      textColor: 'text-blue-700 dark:text-blue-400'
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center mb-12 sm:mb-16">
      {/* Elegant Header */}
      <div className="text-center mb-8">
        <h3 className="text-xl sm:text-2xl font-semibold text-slate-800 dark:text-white mb-2">
          Browse Categories
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Find exactly what you need
        </p>
      </div>

      {/* Theme-Matched Filter Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-2xl px-4">
        {filterOptions.map((option) => {
          const isActive = activeFilter === option.key;
          
          return (
            <button
              key={option.key}
              onClick={() => onFilterChange(option.key)}
              className={`
                flex-1 px-6 sm:px-8 py-4 sm:py-5 rounded-2xl
                text-sm sm:text-base font-semibold transition-all duration-300
                border-2 backdrop-blur-sm
                ${isActive 
                  ? `${option.activeColor} border-transparent shadow-lg transform scale-105` 
                  : `bg-white/70 dark:bg-gray-800/70 ${option.hoverColor} ${option.textColor} border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm hover:shadow-md hover:scale-102`
                }
              `}
            >
              <div className="flex flex-col items-center justify-center gap-1">
                <span className="font-bold text-base sm:text-lg">
                  {option.label}
                </span>
                <span className={`text-xs font-normal ${isActive ? 'text-white/80 dark:text-slate-800/80' : 'text-slate-500 dark:text-slate-400'}`}>
                  {option.description}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Subtle Brand Accent */}
      <div className="mt-8 flex items-center justify-center gap-2">
        <div className="w-2 h-2 bg-orange-500 rounded-full opacity-60"></div>
        <div className="w-1 h-1 bg-blue-500 rounded-full opacity-60"></div>
        <div className="w-2 h-2 bg-orange-500 rounded-full opacity-60"></div>
      </div>
    </div>
  );
};

export default FilterButtons;
