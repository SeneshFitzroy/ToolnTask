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
  profile: { en: 'Profile', si: 'පැතිකඩ', ta: 'சுयవிவரம்' },
  login: { en: 'Login', si: 'ප්‍රවේශය', ta: 'உள்நுழைவு' },
  register: { en: 'Register', si: 'ලියාපදිංචිය', ta: 'பதிவு' },
  signOut: { en: 'Sign Out', si: 'වරනය', ta: 'வெளியேறு' },
  
  // Home Page
  welcomeToToolNTask: { en: 'Welcome to ToolNTask', si: 'ToolNTask වෙත සාදරයෙන් පිළිගන්නවා', ta: 'ToolNTask இல் வரவேற்கிறோம்' },
  findTasksAndTools: { en: 'Find Tasks and Tools in Your Area', si: 'ඔබේ ප්‍රදේශයේ කාර්ය සහ උපකරණ සොයන්න', ta: 'உங்கள் பகுதியில் பணிகள் மற்றும் கருவிகளைக் கண்டறியுங்கள்' },
  getStarted: { en: 'Get Started', si: 'අරඹන්න', ta: 'தொடங்குங்கள்' },
  exploreMore: { en: 'Explore More', si: 'තවත් ගවේෂණය කරන්න', ta: 'மேலும் ஆராயுங்கள்' },
  allCategories: { en: 'All Categories', si: 'සියලුම කාණ්ඩ', ta: 'அனைத்து வகைகள்' },
  newInSriLanka: { en: 'New in Sri Lanka', si: 'ශ්‍රී ලංකාවේ නව', ta: 'இலங்கையில் புதிது' },
  needAHandOrHammer: { en: 'Need a Hand or a Hammer?', si: 'අතක් හෝ මිටියක් අවශ්‍යයි?', ta: 'கை அல்லது சுத்தியல் தேவையா?' },
  weveGotBoth: { en: "We've Got Both!", si: 'අපිට දෙකම තියෙනවා!', ta: 'எங்களிடம் இரண்டும் உள்ளன!' },
  sriLankaFirstCommunity: { en: "Sri Lanka's first community marketplace where neighbors help neighbors. Get quick tasks done or rent the tools you need from people nearby.", si: 'ශ්‍රී ලංකාවේ පළමු ප්‍රජා වෙළඳපොළ, අසල්වැසියන් අසල්වැසියන්ට උදව් කරයි. ඉක්මන් කාර්යයන් කරවාගන්න හෝ ඔබට අවශ්‍ය උපකරණ අසල්වැසියන්ගෙන් කුලියට ගන්න.', ta: 'இலங்கையின் முதல் சமூக சந்தை, அங்கு அயலவர்கள் அயலவர்களுக்கு உதவுகிறார்கள். விரைவான பணிகளைச் செய்யுங்கள் அல்லது அருகிலுள்ளவர்களிடமிருந்து தேவையான கருவிகளை வாடகைக்கு எடுங்கள்.' },
  getStartedToday: { en: 'Get Started Today', si: 'අදම ආරම්භ කරන්න', ta: 'இன்றே தொடங்குங்கள்' },
  trustedCommunityPlatform: { en: 'Trusted Community Platform', si: 'විශ්වාසදායක ප්‍රජා වේදිකාව', ta: 'நம்பகமான சமூக தளம்' },
  safeVerifiedUsers: { en: 'Safe & Verified Users', si: 'ආරක්ෂිත සහ සත්‍යාපිත පරිශීලකයින්', ta: 'பாதுகாப்பான மற்றும் சரிபார்க்கப்பட்ட பயனர்கள்' },
  all: { en: 'All', si: 'සියල්ල', ta: 'அனைத்தும்' },
  
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
  lastName: { en: 'Last Name', si: 'අවසාන නම', ta: 'கடைसी பெயர்' },
  email: { en: 'Email', si: 'ඊමේල්', ta: 'மின்னஞ்சல்' },
  phone: { en: 'Phone', si: 'දුරකථන', ta: 'தொலைபேசி' },
  language: { en: 'Language', si: 'භාෂාව', ta: 'மொழി' },
  
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
  filter: { en: 'Filter', si: 'පෙරහන', ta: 'வடிகட்டि' },
  
  // Gig Types
  task: { en: 'Task', si: 'කාර්යය', ta: 'பணி' },
  tool: { en: 'Tool', si: 'උපකරණය', ta: 'கருवि' },
  
  // Status
  active: { en: 'Active', si: 'ක්‍රියාත්මක', ta: 'செயலில்' },
  inactive: { en: 'Inactive', si: 'අක්‍රිය', ta: 'செயலில் இல்லை' },
  available: { en: 'Available', si: 'ලබාගත හැකි', ta: 'கிடैக्कुम्' },
  completed: { en: 'Completed', si: 'සම්පූර්ණ', ta: 'முडिन्ततु' },
  pending: { en: 'Pending', si: 'අපේක්ෂිත', ta: 'निलुवैयिल्' },
  
  // Common
  loading: { en: 'Loading...', si: 'පූරණය වෙමින්...', ta: 'ஏற்றুकिறது...' },
  success: { en: 'Success', si: 'සාර්ථකයි', ta: 'वेट्றि' },
  error: { en: 'Error', si: 'දෝෂය', ta: 'पिऴै' },
  noData: { en: 'No data available', si: 'දත්ත නොමැත', ta: 'तरवु इल्लै' },
  description: { en: 'Description', si: 'විස්තරය', ta: 'विळक्कम्' },
  price: { en: 'Price', si: 'මිල', ta: 'विलै' },
  location: { en: 'Location', si: 'ස්ථානය', ta: 'इडम्' },
  category: { en: 'Category', si: 'කාණ්ඩය', ta: 'वगै' },
  
  // Messages
  updateSuccess: { en: 'Profile updated successfully', si: 'පැතිකඩ සාර්ථකව යාවත්කාලීන කරන ලදී', ta: 'சుयविवरम् वेट्रिगरमाग पुतुप्पिक्कप्पट्टतु' },
  updateError: { en: 'Failed to update profile', si: 'පැතිකඩ යාවත්කාලීන කිරීම අසාර්ථකයි', ta: 'चुयविवरम् पुतुप्पिप्पतिल् तोल्वि' },
  
  // Forms
  saveChanges: { en: 'Save Changes', si: 'වෙනස්කම් සුරකින්න', ta: 'माற्றंगळैच् चेमि' },
  cancel: { en: 'Cancel', si: 'අවලංගු කරන්න', ta: 'रत्तु चेय्' },
  
  // Listings
  createListing: { en: 'Create New Listing', si: 'නව ලැයිස්තුවක් සාදන්න', ta: 'पुतिय पट्टियल् उरुवाक्कु' },
  editListing: { en: 'Edit Listing', si: 'ලැයිස්තුව සංස්කරණය', ta: 'पट्टियलैत् तिरुत्तु' },
  deleteListing: { en: 'Delete Listing', si: 'ලැයිස්තුව මකන්න', ta: 'पट्टियलै नीक्कु' },
  
  // Notifications
  markAsRead: { en: 'Mark as Read', si: 'කියවූ ලෙස සලකුණු කරන්න', ta: 'पडित्ततागक् कुरिक्कवुम्' },
  markAllAsRead: { en: 'Mark All as Read', si: 'සියල්ල කියවූ ලෙස සලකුණු කරන්න', ta: 'अनैत्तयुम् पडित्ततागक् कुरिक्कवुम्' },
  
  // Create Task/Tool
  createTask: { en: 'Create Task', si: 'කාර්යය සාදන්න', ta: 'पणि उरुवाक्कु' },
  createTool: { en: 'Create Tool', si: 'උපකරණය සාදන්න', ta: 'करुवि उरुवाक्कु' },
  
  // Public Profile
  viewPublicProfile: { en: 'View Public Profile', si: 'පොදු පැතිකඩ බලන්න', ta: 'पोतु चुयविवरत्तैप् पार्क्कवुम्' },
  userProfile: { en: 'User Profile', si: 'පරිශීලක පැතිකඩ', ta: 'पयनर् चुयविवरम्' },
  memberSince: { en: 'Member Since', si: 'සාමාජිකත්වය ලැබුණේ', ta: 'उறुप्पिनराग इरुन्त कालम्' },
  totalListings: { en: 'Total Listings', si: 'මුළු ලැයිස්තු', ta: 'मोत्त पट्टियल्गळ्' },
  
  // Admin Dashboard
  adminDashboard: { en: 'Admin Dashboard', si: 'පරිපාලක ගණුදැණුව', ta: 'निर्वाग डाश्पोर्डु' },
  totalUsers: { en: 'Total Users', si: 'මුළු පරිශීලකයින්', ta: 'मोत्त पयनर्गळ्' },
  totalTasks: { en: 'Total Tasks', si: 'මුළු කාර්ය', ta: 'मोत्त पणिगळ्' },
  totalTools: { en: 'Total Tools', si: 'මුළු උපකරණ', ta: 'मोत्त करुविगळ्' },
  manageUsers: { en: 'Manage Users', si: 'පරිශීලකයින් කළමනාකරණය', ta: 'पयनर्गळै निर्वगिक्कवुम्' },
  manageTasks: { en: 'Manage Tasks', si: 'කාර්ය කළමනාකරණය', ta: 'पणिगळै निर्वगिक्कवुम्' },
  manageTools: { en: 'Manage Tools', si: 'උපකරණ කළමනාකරණය', ta: 'करुविगळै निर्वगिक्कवुम्' },
  analytics: { en: 'Analytics', si: 'විශ්ලේෂණ', ta: 'पगुप्पायुवु' },
  
  // About Page Content
  aboutUs: { en: 'About Us', si: 'අප ගැන', ta: 'एंगळैप् पट्रि' },
  ourMission: { en: 'Our Mission', si: 'අපගේ මෙහෙවර', ta: 'एंगळ् नोक्कम्' },
  ourVision: { en: 'Our Vision', si: 'අපගේ දැක්ම', ta: 'एंगळ् पार्वै' },
  ceo: { en: 'CEO', si: 'ප්‍රධාන විධායක නිලධාරී', ta: 'तलैमै निर्वाहग अधिकारि' },
  cto: { en: 'CTO', si: 'ප්‍රධාන තාක්ෂණ නිලධාරී', ta: 'तلैमै तोऴिल्नुट्प अधिकारि' },
  founderCeo: { en: 'Founder & CEO', si: 'නිර්මාතෘ සහ ප්‍රධාන විධායක', ta: 'निறुवनर् मट्रुम् तलैमै निर्वाहक' },
  
  // Contact Form
  subject: { en: 'Subject', si: 'විෂය', ta: 'पोरुळ्' },
  message: { en: 'Message', si: 'පණිවිඩය', ta: 'चेयति' },
  sendMessage: { en: 'Send Message', si: 'පණිවිඩය යවන්න', ta: 'चेयति अनुप्पु' },
  contactUs: { en: 'Contact Us', si: 'අප අමතන්න', ta: 'एंगळैत् तोडर्पु कोळ्ळुंगळ्' },
  
  // Footer
  privacyPolicy: { en: 'Privacy Policy', si: 'පරිගණක ප්‍රතිපත්තිය', ta: 'तनियुरिमैक् कोळ्कै' },
  termsAndConditions: { en: 'Terms & Conditions', si: 'නියම සහ කොන්දේසි', ta: 'विधिमुறैगळ् माற्றुम् निपन्तनैगळ्' },
  
  // Error Messages
  authRequired: { en: 'Please sign in to access this page', si: 'මෙම පිටුවට ප්‍රවේශ වීමට කරුණාකර ලොග් වන්න', ta: 'इन्त पक्कत्तै अणुग उळ्नुऴैक' },
  notFound: { en: 'Page not found', si: 'පිටුව හමු නොවීය', ta: 'पक्कम् किडैक्कविल्लै' },
  networkError: { en: 'Network error. Please try again.', si: 'ජාල දෝෂය. කරුණාකර නැවත උත්සාහ කරන්න.', ta: 'नेट्वॉर्क पिऴै. मीण्डुम् मुयड्सिक्कवुम्.' }
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
