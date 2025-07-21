import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Language translations
const translations = {
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    tools: 'Tools',
    tasks: 'Tasks',
    profile: 'Profile',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    signOut: 'Sign Out',
    
    // Profile
    profileInformation: 'Profile Information',
    personalDetails: 'Personal Details',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    phone: 'Phone',
    displayName: 'Display Name',
    memberSince: 'Member Since',
    status: 'Status',
    active: 'Active',
    inactive: 'Inactive',
    
    // Listings
    myListings: 'My Listings',
    savedGigs: 'Saved Gigs',
    notifications: 'Notifications',
    createTool: 'Create Tool',
    createTask: 'Create Task',
    viewAll: 'View All',
    edit: 'Edit',
    delete: 'Delete',
    share: 'Share',
    save: 'Save',
    
    // Common
    loading: 'Loading...',
    save_changes: 'Save Changes',
    cancel: 'Cancel',
    success: 'Success',
    error: 'Error',
    language: 'Language',
    
    // Admin
    adminDashboard: 'Admin Dashboard',
    userManagement: 'User Management',
    gigManagement: 'Gig Management',
    analytics: 'Analytics',
    advertisements: 'Advertisements'
  },
  
  si: {
    // Navigation
    home: 'මුල් පිටුව',
    about: 'අප ගැන',
    tools: 'මෙවලම්',
    tasks: 'කාර්යයන්',
    profile: 'පැතිකඩ',
    signIn: 'ලියාපදිංචි වන්න',
    signUp: 'ගිණුමක් සාදන්න',
    signOut: 'නික්මෙන්න',
    
    // Profile
    profileInformation: 'පැතිකඩ තොරතුරු',
    personalDetails: 'පුද්ගලික විස්තර',
    firstName: 'මුල් නම',
    lastName: 'අවසාන නම',
    email: 'ඊ-මේල්',
    phone: 'දුරකථන',
    displayName: 'පෙන්වන නම',
    memberSince: 'සාමාජිකයා වූයේ',
    status: 'තත්ත්වය',
    active: 'සක්‍රීය',
    inactive: 'අක්‍රීය',
    
    // Listings
    myListings: 'මගේ ලැයිස්තු',
    savedGigs: 'සුරකින ලද කාර්යයන්',
    notifications: 'නිවේදන',
    createTool: 'මෙවලමක් සාදන්න',
    createTask: 'කාර්යයක් සාදන්න',
    viewAll: 'සියල්ල බලන්න',
    edit: 'සංස්කරණය',
    delete: 'මකන්න',
    share: 'බෙදාගන්න',
    save: 'සුරකින්න',
    
    // Common
    loading: 'පූරණය වෙමින්...',
    save_changes: 'වෙනස්කම් සුරකින්න',
    cancel: 'අවලංගු කරන්න',
    success: 'සාර්ථකයි',
    error: 'දෝෂයක්',
    language: 'භාෂාව',
    
    // Admin
    adminDashboard: 'පරිපාලක උපකරණ පුවරුව',
    userManagement: 'පරිශීලක කළමනාකරණය',
    gigManagement: 'කාර්ය කළමනාකරණය',
    analytics: 'විශ්ලේෂණ',
    advertisements: 'දැන්වීම්'
  },
  
  ta: {
    // Navigation
    home: 'முகப்பு',
    about: 'எங்களைப் பற்றி',
    tools: 'கருவிகள்',
    tasks: 'பணிகள்',
    profile: 'சுயவிவரம்',
    signIn: 'உள்நுழைக',
    signUp: 'பதிவு செய்க',
    signOut: 'வெளியேறு',
    
    // Profile
    profileInformation: 'சுயவிவர தகவல்',
    personalDetails: 'தனிப்பட்ட விவரங்கள்',
    firstName: 'முதல் பெயர்',
    lastName: 'கடைசி பெயர்',
    email: 'மின்னஞ்சல்',
    phone: 'தொலைபேசி',
    displayName: 'காட்சி பெயர்',
    memberSince: 'உறுப்பினராக இருந்து',
    status: 'நிலை',
    active: 'செயலில்',
    inactive: 'செயலில் இல்லை',
    
    // Listings
    myListings: 'எனது பட்டியல்கள்',
    savedGigs: 'சேமித்த வேலைகள்',
    notifications: 'அறிவிப்புகள்',
    createTool: 'கருவி உருவாக்கு',
    createTask: 'பணி உருவாக்கு',
    viewAll: 'அனைத்தையும் பார்க்க',
    edit: 'திருத்து',
    delete: 'நீக்கு',
    share: 'பகிர்',
    save: 'சேமி',
    
    // Common
    loading: 'ஏற்றுகிறது...',
    save_changes: 'மாற்றங்களைச் சேமி',
    cancel: 'ரத்து செய்',
    success: 'வெற்றி',
    error: 'பிழை',
    language: 'மொழி',
    
    // Admin
    adminDashboard: 'நிர்வாக டாஷ்போர்டு',
    userManagement: 'பயனர் மேலாண்மை',
    gigManagement: 'வேலை மேலாண்மை',
    analytics: 'பகுப்பாய்வு',
    advertisements: 'விளம்பரங்கள்'
  }
};

interface LanguageContextType {
  language: 'en' | 'si' | 'ta';
  setLanguage: (lang: 'en' | 'si' | 'ta') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'si' | 'ta'>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('toolntask_language') as 'en' | 'si' | 'ta';
    if (savedLanguage && ['en', 'si', 'ta'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: 'en' | 'si' | 'ta') => {
    setLanguage(lang);
    localStorage.setItem('toolntask_language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
