import React from 'react';

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
  const sizeClasses = {
    small: 'text-sm sm:text-base',
    medium: 'text-lg sm:text-xl lg:text-2xl',
    large: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl',
    xl: 'text-3xl sm:text-4xl lg:text-5xl xl:text-6xl'
  };

  const logoClass = `logo-font font-bold transition-all duration-300 ${sizeClasses[size]} ${className} ${
    interactive ? 'hover:scale-105 cursor-pointer' : ''
  }`;

  return (
    <span className={logoClass}>
      <span style={{ color: '#FF5E14' }}>Tool</span>
      <span style={{ color: '#2D3748' }}>N</span>
      <span style={{ color: '#FF5E14' }}>Task</span>
      {showUnderline && (
        <svg className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-2 sm:h-3" viewBox="0 0 100 10" style={{ fill: '#FF5E14', opacity: 0.3 }}>
          <path d="M0 8 Q 50 0 100 8 L 100 10 L 0 10 Z" />
        </svg>
      )}
    </span>
  );
};

export default Logo;
