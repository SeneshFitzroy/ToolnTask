
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
    <div className="w-full max-w-md mx-auto mb-16">
      {/* Professional Filter Tabs */}
      <div className="p-1 rounded-xl shadow-lg border" style={{ 
        backgroundColor: theme === 'dark' ? '#1A1818' : '#F2F3F5',
        borderColor: theme === 'dark' ? '#333333' : '#E5E7EB'
      }}>
        <div className="flex">
          {filterOptions.map((option) => {
            const isActive = activeFilter === option.key;
            
            return (
              <button
                key={option.key}
                onClick={() => onFilterChange(option.key)}
                className={`
                  flex-1 relative px-4 sm:px-6 py-3 sm:py-3.5 rounded-lg text-sm sm:text-base font-semibold
                  transition-all duration-300 ease-in-out hover:scale-105 group
                `}
                style={{
                  backgroundColor: isActive ? '#FF5E14' : 'transparent',
                  color: isActive ? '#FFFFFF' : (theme === 'dark' ? '#B3B5BC' : '#6B7280'),
                  boxShadow: isActive ? '0 4px 8px rgba(255, 94, 20, 0.3)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#FF5E14';
                    e.currentTarget.style.backgroundColor = theme === 'dark' ? '#2A2A2A' : '#FFFFFF';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = theme === 'dark' ? '#B3B5BC' : '#6B7280';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span className="flex items-center justify-center">
                  {option.label}
                </span>
                
                {/* Active indicator line */}
                {isActive && (
                  <div 
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 rounded-full"
                    style={{ backgroundColor: '#FFFFFF' }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FilterButtons;
