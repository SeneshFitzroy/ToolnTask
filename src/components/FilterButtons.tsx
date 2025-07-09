
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
    <div className="w-full max-w-5xl mx-auto mb-6 filter-container">
      {/* Elegant Thin Wide Filter Widget */}
      <div className="p-1.5 rounded-full shadow-lg border" style={{ 
        backgroundColor: theme === 'dark' ? '#001554' : '#FFFFFF',
        borderColor: theme === 'dark' ? '#333333' : '#E5E7EB'
      }}>
        <div className="flex justify-between gap-1">
          {filterOptions.map((option) => {
            const isActive = activeFilter === option.key;
            
            return (
              <button
                key={option.key}
                onClick={() => onFilterChange(option.key)}
                className={`
                  flex-1 relative px-4 sm:px-6 py-2 sm:py-2.5 rounded-full 
                  text-xs sm:text-sm font-semibold tracking-wide
                  transition-all duration-300 group transform-gpu
                  active:scale-95 cursor-pointer
                  ${isActive ? 'filter-button-active' : ''}
                `}
                style={{
                  backgroundColor: isActive ? '#FF5E14' : 'transparent',
                  color: isActive ? '#FFFFFF' : (theme === 'dark' ? '#B3B5BC' : '#6B7280'),
                  boxShadow: isActive 
                    ? '0 4px 12px rgba(255, 94, 20, 0.3)' 
                    : 'none',
                  border: 'none'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#FF5E14';
                    e.currentTarget.style.backgroundColor = theme === 'dark' ? '#2A2A2A' : '#F8F9FA';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = theme === 'dark' ? '#B3B5BC' : '#6B7280';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
                onMouseDown={(e) => {
                  // Blue press effect
                  const target = e.currentTarget;
                  target.style.backgroundColor = '#001554';
                  target.style.color = '#FFFFFF';
                  target.style.transform = 'scale(0.95)';
                  target.style.boxShadow = '0 4px 15px rgba(0, 21, 84, 0.4)';
                }}
                onMouseUp={(e) => {
                  const target = e.currentTarget;
                  setTimeout(() => {
                    if (target) {
                      if (isActive) {
                        target.style.backgroundColor = '#FF5E14';
                        target.style.color = '#FFFFFF';
                        target.style.boxShadow = '0 4px 12px rgba(255, 94, 20, 0.3)';
                      } else {
                        target.style.backgroundColor = theme === 'dark' ? '#2A2A2A' : '#F8F9FA';
                        target.style.color = '#FF5E14';
                        target.style.boxShadow = 'none';
                      }
                      target.style.transform = 'scale(1)';
                    }
                  }, 150);
                }}
              >
                <span className="flex items-center justify-center relative z-10">
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FilterButtons;
