
import React from 'react';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

interface FilterButtonsProps {
  onFilterChange: (filter: 'all' | 'tasks' | 'tools') => void;
  activeFilter: 'all' | 'tasks' | 'tools';
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ onFilterChange, activeFilter }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const filterOptions = [
    {
      key: 'all' as const,
      label: 'All'
    },
    {
      key: 'tasks' as const,
      label: 'Tasks'
    },
    {
      key: 'tools' as const,
      label: 'Tools'
    }
  ];

  return (
    <div className="w-full max-w-lg mx-auto mb-16">
      {/* Professional Filter Tabs */}
      <div className="p-1.5 rounded-2xl shadow-lg" style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#F2F3F5' }}>
        <div className="flex">
          {filterOptions.map((option) => {
            const isActive = activeFilter === option.key;
            
            return (
              <button
                key={option.key}
                onClick={() => onFilterChange(option.key)}
                className={`
                  flex-1 relative px-3 sm:px-6 py-3 sm:py-4 rounded-xl text-sm sm:text-base font-semibold
                  transition-all duration-200 ease-in-out hover:scale-105
                `}
                style={{
                  backgroundColor: isActive ? (theme === 'dark' ? '#333333' : '#FFF') : 'transparent',
                  color: isActive ? (theme === 'dark' ? '#FFFFFF' : '#1A1818') : (theme === 'dark' ? '#B3B5BC' : '#B3B5BC'),
                  boxShadow: isActive ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = theme === 'dark' ? '#FFFFFF' : '#1A1818';
                    e.currentTarget.style.backgroundColor = theme === 'dark' ? '#333333' : '#FFF';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = theme === 'dark' ? '#B3B5BC' : '#B3B5BC';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  <span className="text-sm sm:text-lg">{option.label}</span>
                  <span 
                    className="px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full font-medium"
                    style={{
                      backgroundColor: isActive ? '#FF5E14' : (theme === 'dark' ? '#444444' : '#B3B5BC'),
                      color: isActive ? '#FFFFFF' : (theme === 'dark' ? '#FFFFFF' : '#FFF')
                    }}
                  >
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
