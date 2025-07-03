import React from 'react';
import { useTheme } from 'next-themes';

interface LogoProps {
  size?: 'small' | 'medium' | 'large' | 'xl';
  className?: string;
  showUnderline?: boolean;
  interactive?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'medium', 
  className = '', 
  showUnderline = false,
  interactive = false 
}) => {
  const { theme } = useTheme();

  const sizeClasses = {
    small: 'text-sm sm:text-base',
    medium: 'text-lg sm:text-xl lg:text-2xl',
    large: 'text-xl sm:text-2xl lg:text-3xl xl:text-4xl',
    xl: 'text-2xl sm:text-3xl lg:text-4xl xl:text-5xl'
  };

  const logoClass = `logo-font font-bold transition-all duration-300 ${sizeClasses[size]} ${className} ${
    interactive ? 'hover:scale-105 cursor-pointer' : ''
  }`;

  return (
    <div className={logoClass}>
      <span 
        className="relative inline-block"
        style={{ color: '#FF5E14' }}
      >
        Tool
        {showUnderline && (
          <svg className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-2 sm:h-3" viewBox="0 0 100 10" style={{ fill: '#FF5E14', opacity: 0.3 }}>
            <path d="M0 8 Q 50 0 100 8 L 100 10 L 0 10 Z" />
          </svg>
        )}
      </span>
      <span style={{ color: '#001554' }}>N</span>
      <span 
        className="relative inline-block"
        style={{ color: '#FF5E14' }}
      >
        Task
        {showUnderline && (
          <svg className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-2 sm:h-3" viewBox="0 0 100 10" style={{ fill: '#FF5E14', opacity: 0.3 }}>
            <path d="M0 8 Q 50 0 100 8 L 100 10 L 0 10 Z" />
          </svg>
        )}
      </span>
    </div>
  );
};

export default Logo;
