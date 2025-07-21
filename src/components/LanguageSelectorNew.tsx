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

const LanguageSelector: React.FC = () => {
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
      if (!target.closest('.language-dropdown')) {
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

  return (
    <div className="relative language-dropdown">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
        style={{ 
          color: theme === 'dark' ? '#e5e7eb' : '#374151',
          backgroundColor: 'transparent',
          border: `1px solid ${theme === 'dark' ? '#374151' : '#d1d5db'}`
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255, 94, 20, 0.1)' : 'rgba(255, 94, 20, 0.05)';
          e.currentTarget.style.borderColor = '#FF5E14';
          e.currentTarget.style.color = '#FF5E14';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.borderColor = theme === 'dark' ? '#374151' : '#d1d5db';
          e.currentTarget.style.color = theme === 'dark' ? '#e5e7eb' : '#374151';
        }}
        title="Select Language"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{selectedLanguage.flag}</span>
        <span className="hidden md:inline">{selectedLanguage.nativeName}</span>
        <ChevronDown 
          className={`h-3 w-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 top-full mt-2 w-48 rounded-lg shadow-lg border z-50 overflow-hidden"
          style={{ 
            backgroundColor: theme === 'dark' ? '#1f1f1f' : '#FFFFFF',
            borderColor: theme === 'dark' ? '#374151' : '#e5e7eb'
          }}
        >
          {languages.map((languageOption) => (
            <button
              key={languageOption.code}
              onClick={() => handleLanguageSelect(languageOption)}
              className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-200 hover:bg-opacity-80"
              style={{ 
                color: selectedLanguage.code === languageOption.code ? '#FF5E14' : (theme === 'dark' ? '#e5e7eb' : '#374151'),
                backgroundColor: selectedLanguage.code === languageOption.code ? (theme === 'dark' ? 'rgba(255, 94, 20, 0.1)' : 'rgba(255, 94, 20, 0.05)') : 'transparent'
              }}
              onMouseEnter={(e) => {
                if (selectedLanguage.code !== languageOption.code) {
                  e.currentTarget.style.backgroundColor = theme === 'dark' ? '#2a2a2a' : '#f9fafb';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedLanguage.code !== languageOption.code) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                } else {
                  e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255, 94, 20, 0.1)' : 'rgba(255, 94, 20, 0.05)';
                }
              }}
            >
              <span className="text-lg">{languageOption.flag}</span>
              <div>
                <p className="font-medium text-sm">{languageOption.nativeName}</p>
                <p className="text-xs opacity-75">{languageOption.name}</p>
              </div>
              {selectedLanguage.code === languageOption.code && (
                <div className="ml-auto w-2 h-2 rounded-full" style={{ backgroundColor: '#FF5E14' }}></div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
