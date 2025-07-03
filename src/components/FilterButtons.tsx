
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
      <div className="p-1.5 rounded-2xl shadow-lg" style={{ backgroundColor: '#F2F3F5' }}>
        <div className="flex">
          {filterOptions.map((option) => {
            const isActive = activeFilter === option.key;
            
            return (
              <button
                key={option.key}
                onClick={() => onFilterChange(option.key)}
                className={`
                  flex-1 relative px-6 py-4 rounded-xl text-base font-semibold
                  transition-all duration-200 ease-in-out hover:scale-105
                `}
                style={{
                  backgroundColor: isActive ? '#FFF' : 'transparent',
                  color: isActive ? '#1A1818' : '#B3B5BC',
                  boxShadow: isActive ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#1A1818';
                    e.currentTarget.style.backgroundColor = '#FFF';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#B3B5BC';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <div className="flex items-center justify-center gap-3">
                  <span className="text-lg">{option.label}</span>
                  <span 
                    className="px-3 py-1 text-sm rounded-full font-medium"
                    style={{
                      backgroundColor: isActive ? '#FFE514' : '#B3B5BC',
                      color: isActive ? '#1A1818' : '#FFF'
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
