import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage, Language } from '../contexts/LanguageContext';

interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'si', name: 'Sinhala', nativeName: 'සිංහල', flag: '🇱🇰' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇱🇰' }
];

interface GlobalLanguageSelectorProps {
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const GlobalLanguageSelector: React.FC<GlobalLanguageSelectorProps> = ({ 
  className = '', 
  showLabel = true,
  size = 'md' 
}) => {
  const { theme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const selectedLanguage = languages.find(l => l.code === language) || languages[0];

  useEffect(() => {
    setMounted(true);

    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.global-language-dropdown')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSelect = (languageOption: LanguageOption) => {
    setLanguage(languageOption.code);
    setIsOpen(false);
    console.log(`Language changed to: ${languageOption.name} (${languageOption.code})`);
  };

  if (!mounted) {
    return null;
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-2',
    lg: 'text-base px-4 py-3'
  };

  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 18
  };

  return (
    <div className={`relative global-language-dropdown ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 ${sizeClasses[size]} rounded-lg border transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
        style={{
          backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
          borderColor: theme === 'dark' ? '#333333' : '#e5e7eb',
          color: theme === 'dark' ? '#ffffff' : '#374151'
        }}
        aria-label="Select Language"
      >
        <Globe size={iconSizes[size]} className="text-blue-500" />
        <span className="font-medium">{selectedLanguage.flag}</span>
        {showLabel && (
          <span className="font-medium">{selectedLanguage.nativeName}</span>
        )}
        <ChevronDown 
          size={iconSizes[size]} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-0 mt-1 min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden"
          style={{
            backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
            borderColor: theme === 'dark' ? '#333333' : '#e5e7eb'
          }}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-150 ${
                language === lang.code
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              style={{
                color: language === lang.code 
                  ? (theme === 'dark' ? '#60a5fa' : '#2563eb')
                  : (theme === 'dark' ? '#ffffff' : '#374151')
              }}
            >
              <span className="text-lg">{lang.flag}</span>
              <div className="flex flex-col">
                <span className="font-medium text-sm">{lang.nativeName}</span>
                <span className="text-xs opacity-70">{lang.name}</span>
              </div>
              {language === lang.code && (
                <span className="ml-auto text-blue-500">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default GlobalLanguageSelector;
