
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
      count: 247
    },
    {
      key: 'tasks' as const,
      label: 'Tasks',
      count: 168
    },
    {
      key: 'tools' as const,
      label: 'Tools',
      count: 79
    }
  ];

  return (
    <div className="w-full max-w-lg mx-auto mb-16">
      {/* Professional Filter Tabs */}
      <div className="bg-gray-100 dark:bg-gray-800 p-1.5 rounded-2xl shadow-lg">
        <div className="flex">
          {filterOptions.map((option) => {
            const isActive = activeFilter === option.key;
            
            return (
              <button
                key={option.key}
                onClick={() => onFilterChange(option.key)}
                className={`
                  flex-1 relative px-6 py-4 rounded-xl text-base font-semibold
                  transition-all duration-200 ease-in-out
                  ${isActive 
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-md' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-750'
                  }
                `}
              >
                <div className="flex items-center justify-center gap-3">
                  <span className="text-lg">{option.label}</span>
                  <span className={`
                    px-3 py-1 text-sm rounded-full font-medium
                    ${isActive 
                      ? 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }
                  `}>
                    {option.count}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FilterButtons;
