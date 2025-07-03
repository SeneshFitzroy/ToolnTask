import React from 'react';
import Link from 'next/link';

interface LogoProps {
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  className?: string;
  linkTo?: string;
  showLink?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'medium', 
  className = '', 
  linkTo = '/', 
  showLink = true 
}) => {
  const sizeClasses = {
    small: 'text-sm sm:text-base logo-small',
    medium: 'text-base sm:text-lg md:text-xl logo-medium',
    large: 'text-lg sm:text-2xl md:text-3xl logo-large',
    xlarge: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl logo-large'
  };

  const logoElement = (
    <div 
      className={`font-bold transition-all duration-300 hover:scale-105 cursor-pointer ${sizeClasses[size]} ${className}`}
      title="ToolNTask - Sri Lanka's Community Marketplace"
    >
      <span style={{ color: '#FF5E14' }}>Tool</span>
      <span style={{ color: '#001554' }}>N</span>
      <span style={{ color: '#FF5E14' }}>Task</span>
    </div>
  );

  if (showLink) {
    return (
      <Link href={linkTo} className="flex items-center flex-shrink-0">
        {logoElement}
      </Link>
    );
  }

  return logoElement;
};

export default Logo;
