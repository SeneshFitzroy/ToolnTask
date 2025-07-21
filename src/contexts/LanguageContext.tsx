import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'si' | 'ta';

interface Translations {
  [key: string]: {
    en: string;
    si: string;
    ta: string;
  };
}

const translations: Translations = {
  // Navigation
  home: { en: 'Home', si: 'මුල් පිටුව', ta: 'முகப்பு' },
  tasks: { en: 'Tasks', si: 'කාර්ය', ta: 'பணிகள்' },
  tools: { en: 'Tools', si: 'උපකරණ', ta: 'கருவிகள்' },
  about: { en: 'About', si: 'අප ගැන', ta: 'எங்களைப் பற்றி' },
  profile: { en: 'Profile', si: 'පැතිකඩ', ta: 'சுயவிவரம்' },
  login: { en: 'Login', si: 'ප්‍රවේශය', ta: 'உள்நுழைவு' },
  register: { en: 'Register', si: 'ලියාපදිංචිය', ta: 'பதிவு' },
  signOut: { en: 'Sign Out', si: 'වරනය', ta: 'வெளியேறு' },
  
  // Home Page
  welcomeToToolNTask: { en: 'Welcome to ToolNTask', si: 'ToolNTask වෙත සාදරයෙන් පිළිගන්නවා', ta: 'ToolNTask இல் வரவேற்கிறோம்' },
  findTasksAndTools: { en: 'Find Tasks and Tools in Your Area', si: 'ඔබේ ප්‍රදේශයේ කාර්ය සහ උපකරණ සොයන්න', ta: 'உங்கள் பகுதியில் பணிகள் மற்றும் கருவிகளைக் கண்டறியுங்கள்' },
  getStarted: { en: 'Get Started', si: 'අරඹන්න', ta: 'தொடங்குங்கள்' },
  exploreMore: { en: 'Explore More', si: 'තවත් ගවේෂණය කරන්න', ta: 'மேலும் ஆராயுங்கள்' },
  allCategories: { en: 'All Categories', si: 'සියලුම කාණ්ඩ', ta: 'அனைத்து வகைகள்' },
  
  // Authentication
  signIn: { en: 'Sign In', si: 'ලොගින් වන්න', ta: 'உள்நுழைக' },
  signUp: { en: 'Sign Up', si: 'ලියාපදිංචි වන්න', ta: 'பதிவு செய்க' },
  forgotPassword: { en: 'Forgot Password?', si: 'මුරපදය අමතකද?', ta: 'கடவுச்சொல்லை மறந்துவிட்டீர்களா?' },
  password: { en: 'Password', si: 'මුරපදය', ta: 'கடவுச்சொல்' },
  confirmPassword: { en: 'Confirm Password', si: 'මුරපදය තහවුරු කරන්න', ta: 'கடவுச்சொல்லை உறுதிப்படுத்தவும்' },
  adminCredentials: { en: 'Admin Credentials', si: 'පරිපාලක අක්තපත්‍ර', ta: 'நிர்வாக சான்றுகள்' },
  
  // Profile Page
  profileInformation: { en: 'Profile Information', si: 'පැතිකඩ තොරතුරු', ta: 'சுயவிவர தகவல்' },
  savedGigs: { en: 'Saved Gigs', si: 'සුරකින ලද වැඩ', ta: 'சேமித்த வேலைகள்' },
  notifications: { en: 'Notifications', si: 'දැනුම්දීම්', ta: 'அறிவிப்புகள்' },
  myListings: { en: 'My Listings', si: 'මගේ ලැයිස්තුව', ta: 'என் பட்டியல்கள்' },
  
  // Profile Information
  firstName: { en: 'First Name', si: 'මුල් නම', ta: 'முதல் பெயர்' },
  lastName: { en: 'Last Name', si: 'අවසාන නම', ta: 'கடைசி பெயர்' },
  email: { en: 'Email', si: 'ඊමේල්', ta: 'மின்னஞ்சல்' },
  phone: { en: 'Phone', si: 'දුරකථන', ta: 'தொலைபேசி' },
  language: { en: 'Language', si: 'භාෂාව', ta: 'மொழி' },
  
  // Languages
  english: { en: 'English', si: 'ඉංග්‍රීසි', ta: 'ஆங்கிலம்' },
  sinhala: { en: 'Sinhala', si: 'සිංහල', ta: 'சிங்களம்' },
  tamil: { en: 'Tamil', si: 'දමිළ', ta: 'தமிழ்' },
  
  // Actions
  save: { en: 'Save', si: 'සුරකින්න', ta: 'சேமி' },
  edit: { en: 'Edit', si: 'සංස්කරණය', ta: 'திருத்து' },
  delete: { en: 'Delete', si: 'මකන්න', ta: 'நீக்கு' },
  view: { en: 'View', si: 'බලන්න', ta: 'பார்' },
  share: { en: 'Share', si: 'බෙදාගන්න', ta: 'பகிர்' },
  search: { en: 'Search', si: 'සොයන්න', ta: 'தேடு' },
  filter: { en: 'Filter', si: 'පෙරහන', ta: 'வடிகட்டி' },
  
  // Gig Types
  task: { en: 'Task', si: 'කාර්යය', ta: 'பணி' },
  tool: { en: 'Tool', si: 'උපකරණය', ta: 'கருவி' },
  
  // Status
  active: { en: 'Active', si: 'ක්‍රියාත්මක', ta: 'செயலில்' },
  inactive: { en: 'Inactive', si: 'අක්‍රිය', ta: 'செயலில் இல்லை' },
  available: { en: 'Available', si: 'ලබාගත හැකි', ta: 'கிடைக்கும்' },
  completed: { en: 'Completed', si: 'සම්පූර්ණ', ta: 'முடிந்தது' },
  pending: { en: 'Pending', si: 'අපේක්ෂිත', ta: 'நிலுவையில்' },
  
  // Common
  loading: { en: 'Loading...', si: 'පූරණය වෙමින්...', ta: 'ஏற்றுகிறது...' },
  success: { en: 'Success', si: 'සාර්ථකයි', ta: 'வெற்றி' },
  error: { en: 'Error', si: 'දෝෂය', ta: 'பிழை' },
  noData: { en: 'No data available', si: 'දත්ත නොමැත', ta: 'தரவு இல்லை' },
  description: { en: 'Description', si: 'විස්තරය', ta: 'விளக்கம்' },
  price: { en: 'Price', si: 'මිල', ta: 'விலை' },
  location: { en: 'Location', si: 'ස්ථානය', ta: 'இடம்' },
  category: { en: 'Category', si: 'කාණ්ඩය', ta: 'வகை' },
  
  // Messages
  updateSuccess: { en: 'Profile updated successfully', si: 'පැතිකඩ සාර්ථකව යාවත්කාලීන කරන ලදී', ta: 'சுயவிவரம் வெற்றிகரமாக புதுப்பிக்கப்பட்டது' },
  updateError: { en: 'Failed to update profile', si: 'පැතිකඩ යාවත්කාලීන කිරීම අසාර්ථකයි', ta: 'சுயவிவரம் புதுப்பிப்பதில் தோல்வி' },
  
  // Forms
  save_changes: { en: 'Save Changes', si: 'වෙනස්කම් සුරකින්න', ta: 'மாற்றங்களைச் சேமி' },
  cancel: { en: 'Cancel', si: 'අවලංගු කරන්න', ta: 'ரத்து செய்' },
  
  // Listings
  createListing: { en: 'Create New Listing', si: 'නව ලැයිස්තුවක් සාදන්න', ta: 'புதிய பட்டியல் உருவாக்கு' },
  editListing: { en: 'Edit Listing', si: 'ලැයිස්තුව සංස්කරණය', ta: 'பட்டியலைத் திருத்து' },
  deleteListing: { en: 'Delete Listing', si: 'ලැයිස්තුව මකන්න', ta: 'பட்டியலை நீக்கு' },
  
  // Notifications
  markAsRead: { en: 'Mark as Read', si: 'කියවූ ලෙස සලකුණු කරන්න', ta: 'படித்ததாகக் குறிக்கவும்' },
  markAllAsRead: { en: 'Mark All as Read', si: 'සියල්ල කියවූ ලෙස සලකුණු කරන්න', ta: 'அனைத்தையும் படித்ததாகக் குறிக்கவும்' },
  
  // Create Task/Tool
  createTask: { en: 'Create Task', si: 'කාර්යය සාදන්න', ta: 'பணி உருவாக்கு' },
  createTool: { en: 'Create Tool', si: 'උපකරණය සාදන්න', ta: 'கருவி உருவாக்கு' },
  
  // Public Profile
  viewPublicProfile: { en: 'View Public Profile', si: 'පොදු පැතිකඩ බලන්න', ta: 'பொது சுயவிவரத்தைப் பார்க்கவும்' },
  userProfile: { en: 'User Profile', si: 'පරිශීලක පැතිකඩ', ta: 'பயனர் சுयவிவரம்' },
  memberSince: { en: 'Member Since', si: 'සාමාජිකත්වය ලැබුණේ', ta: 'உறுப்பினராக இருந்த காலம்' },
  totalListings: { en: 'Total Listings', si: 'මුළු ලැයිස්තු', ta: 'மொத்த பட்டியல்கள்' },
  
  // Admin Dashboard
  adminDashboard: { en: 'Admin Dashboard', si: 'පරිපාලක ගණුදැණුව', ta: 'நிர்வாக டாஷ்போர்டு' },
  totalUsers: { en: 'Total Users', si: 'මුළු පරිශීලකයින්', ta: 'மொத்த பயனர்கள்' },
  totalTasks: { en: 'Total Tasks', si: 'මුළු කාර්ය', ta: 'மொத்த பணிகள்' },
  totalTools: { en: 'Total Tools', si: 'මුළු උපකරණ', ta: 'மொத்த கருவிகள்' },
  manageUsers: { en: 'Manage Users', si: 'පරිශීලකයින් කළමනාකරණය', ta: 'பயனர்களை நிர்வகிக்கவும்' },
  manageTasks: { en: 'Manage Tasks', si: 'කාර්ය කළමනාකරණය', ta: 'பணிகளை நிர்வகிக்கவும்' },
  manageTools: { en: 'Manage Tools', si: 'උපකරණ කළමනාකරණය', ta: 'கருவிகளை நிர்வகிக்கவும்' },
  analytics: { en: 'Analytics', si: 'විශ්ලේෂණ', ta: 'பகுப்பாய்வு' },
  
  // Footer
  privacyPolicy: { en: 'Privacy Policy', si: 'පරිගණක ප්‍රතිපත්තිය', ta: 'தனியுரிமைக் கொள்கை' },
  termsAndConditions: { en: 'Terms & Conditions', si: 'නියම සහ කොන්දේසි', ta: 'விதிமுறைகள் மற்றும் நிபந்தனைகள்' },
  contactUs: { en: 'Contact Us', si: 'අප අමතන්න', ta: 'எங்களைத் தொடர்பு கொள்ளுங்கள்' },
  
  // Error Messages
  authRequired: { en: 'Please sign in to access this page', si: 'මෙම පිටුවට ප්‍රවේශ වීමට කරුණාකර ලොග් වන්න', ta: 'இந்தப் பக்கத்தை அணுக உள்நுழைக' },
  notFound: { en: 'Page not found', si: 'පිටුව හමු නොවීය', ta: 'பக்கம் கிடைக்கவில்லை' },
  networkError: { en: 'Network error. Please try again.', si: 'ජාල දෝෂය. කරුණාකර නැවත උත්සාහ කරන්න.', ta: 'நெட்வொர்க் பிழை. மீண்டும் முயற்சிக்கவும்.' },
  
  // Companies and About
  aboutUs: { en: 'About Us', si: 'අප ගැන', ta: 'எங்களைப் பற்றி' },
  ourMission: { en: 'Our Mission', si: 'අපගේ මෙහෙවර', ta: 'எங்கள் நோக்கம்' },
  ourVision: { en: 'Our Vision', si: 'අපගේ දැක්ම', ta: 'எங்கள் பார்வை' },
  ceo: { en: 'CEO', si: 'ප්‍රධාන විධායක නිලධාරී', ta: 'தலைமை நிர்வாக அதிகாரி' },
  cto: { en: 'CTO', si: 'ප්‍රධාන තාක්ෂණ නිලධාරී', ta: 'தலைமை தொழில்நுட்ப அதிகாரி' }
};
  tool: { en: 'Tool', si: 'උපකරණය', ta: 'கருவி' },
  
  // Status
  active: { en: 'Active', si: 'ක්‍රියාත්මක', ta: 'செயலில்' },
  inactive: { en: 'Inactive', si: 'අක්‍රිය', ta: 'செயலில் இல்லை' },
  available: { en: 'Available', si: 'ලබාගත හැකි', ta: 'கிடைக்கும்' },
  completed: { en: 'Completed', si: 'සම්පූර්ණ', ta: 'முடிந்தது' },
  
  // Common
  loading: { en: 'Loading...', si: 'පූරණය වෙමින්...', ta: 'ஏற்றுகிறது...' },
  success: { en: 'Success', si: 'සාර්ථකයි', ta: 'வெற்றி' },
  error: { en: 'Error', si: 'දෝෂය', ta: 'பிழை' },
  noData: { en: 'No data available', si: 'දත්ත නොමැත', ta: 'தரவு இல்லை' },
  
  // Messages
  updateSuccess: { en: 'Profile updated successfully', si: 'පැතිකඩ සාර්ථකව යාවත්කාලීන කරන ලදී', ta: 'சுயவிவரம் வெற்றிகரமாக புதுப்பிக்கப்பட்டது' },
  updateError: { en: 'Failed to update profile', si: 'පැතිකඩ යාවත්කාලීන කිරීම අසාර්ථකයි', ta: 'சுயவிவரம் புதுப்பிப்பதில் தோல்வி' },
  
  // Forms
  save_changes: { en: 'Save Changes', si: 'වෙනස්කම් සුරකින්න', ta: 'மாற்றங்களைச் சேமி' },
  cancel: { en: 'Cancel', si: 'අවලංගු කරන්න', ta: 'ரத்து செய்' },
  
  // Listings
  createListing: { en: 'Create New Listing', si: 'නව ලැයිස්තුවක් සාදන්න', ta: 'புதிய பட்டியல் உருவாக்கு' },
  editListing: { en: 'Edit Listing', si: 'ලැයිස්තුව සංස්කරණය', ta: 'பட்டியலைத் திருத்து' },
  deleteListing: { en: 'Delete Listing', si: 'ලැයිස්තුව මකන්න', ta: 'பட்டியலை நீக்கு' },
  
  // Notifications
  markAsRead: { en: 'Mark as Read', si: 'කියවූ ලෙස සලකුණු කරන්න', ta: 'படித்ததாகக் குறிக்கவும்' },
  markAllAsRead: { en: 'Mark All as Read', si: 'සියල්ල කියවූ ලෙස සලකුණු කරන්න', ta: 'அனைத்தையும் படித்ததாகக் குறிக்கவும்' },
  
  // Create Task/Tool
  createTask: { en: 'Create Task', si: 'කාර්යය සාදන්න', ta: 'பணி உருவாக்கு' },
  createTool: { en: 'Create Tool', si: 'උපකරණය සාදන්න', ta: 'கருவி உருவாக்கு' },
  
  // Public Profile
  viewPublicProfile: { en: 'View Public Profile', si: 'පොදු පැතිකඩ බලන්න', ta: 'பொது சுயவிவரத்தைப் பார்க்கவும்' },
  userProfile: { en: 'User Profile', si: 'පරිශීලක පැතිකඩ', ta: 'பயனர் சுயவிவரம்' },
  memberSince: { en: 'Member Since', si: 'සාමාජිකත්වය ලැබුණේ', ta: 'உறுப்பினராக இருந்த காலம்' },
  totalListings: { en: 'Total Listings', si: 'මුළු ලැයිස්තු', ta: 'மொத்த பட்டியல்கள்' },
  
  // Admin Dashboard
  adminDashboard: { en: 'Admin Dashboard', si: 'පරිපාලක ගණුදැණුව', ta: 'நிர்வாக டாஷ்போர்டு' },
  totalUsers: { en: 'Total Users', si: 'මුළු පරිශීලකයින්', ta: 'மொத்த பயனர்கள்' },
  totalTasks: { en: 'Total Tasks', si: 'මුළු කාර්ය', ta: 'மொத்த பணிகள்' },
  totalTools: { en: 'Total Tools', si: 'මුළු උපකරණ', ta: 'மொத்த கருவிகள்' },
  manageUsers: { en: 'Manage Users', si: 'පරිශීලකයින් කළමනාකරණය', ta: 'பயனர்களை நிர்வகிக்கவும்' },
  manageTasks: { en: 'Manage Tasks', si: 'කාර්ය කළමනාකරණය', ta: 'பணிகளை நிர்வகிக்கவும்' },
  manageTools: { en: 'Manage Tools', si: 'උපකරණ කළමනාකරණය', ta: 'கருவிகளை நிர்வகிக்கவும்' },
  analytics: { en: 'Analytics', si: 'විශ්ලේෂණ', ta: 'பகுப்பாய்வு' },
  
  // Footer
  privacyPolicy: { en: 'Privacy Policy', si: 'පරිගණක ප්‍රතිපත්තිය', ta: 'தனியுரிமைக் கொள்கை' },
  termsAndConditions: { en: 'Terms & Conditions', si: 'නියම සහ කොන්දේසි', ta: 'விதிமுறைகள் மற்றும் நிபந்தனைகள்' },
  contactUs: { en: 'Contact Us', si: 'අප අමතන්න', ta: 'எங்களைத் தொடர்பு கொள்ளுங்கள்' },
  
  // Error Messages
  authRequired: { en: 'Please sign in to access this page', si: 'මෙම පිටුවට ප්‍රවේශ වීමට කරුණාකර ලොග් වන්න', ta: 'இந்தப் பக்கத்தை அணுக உள்நுழைக' },
  notFound: { en: 'Page not found', si: 'පිටුව හමු නොවීය', ta: 'பக்கம் கிடைக்கவில்லை' },
  networkError: { en: 'Network error. Please try again.', si: 'ජාල දෝෂය. කරුණාකර නැවත උත්සාහ කරන්න.', ta: 'நெட்வொர்க் பிழை. மீண்டும் முயற்சிக்கவும்.' }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('preferred-language') as Language;
    if (savedLanguage && ['en', 'si', 'ta'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('preferred-language', lang);
  };

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[language] || translation.en || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
