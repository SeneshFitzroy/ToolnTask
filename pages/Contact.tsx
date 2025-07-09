import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import Logo from '../src/components/Logo';
import { Button } from '../src/components/ui/button';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../src/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export default function Contact() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    setMounted(true);
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      // Save contact submission to Firebase
      await addDoc(collection(db, 'contact_submissions'), {
        ...formData,
        userId: user?.uid || null,
        userEmail: user?.email || formData.email,
        createdAt: serverTimestamp(),
        status: 'new',
        type: 'contact_form'
      });

      setSuccess('Message sent successfully! We\'ll get back to you soon.');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setTimeout(() => setSuccess(''), 5000);
    } catch (error: unknown) {
      console.error('Error saving contact submission:', error);
      const errorMessage = error instanceof Error ? error.message : 'An error occurred while sending your message';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme === 'dark' ? '#001554' : '#F2F3F5' }}>
      <Navigation />
      
      {/* Hero Header Section */}
      <div className="py-12 sm:py-16 lg:py-20 relative overflow-hidden" style={{ backgroundColor: theme === 'dark' ? '#001554' : '#F2F3F5' }}>
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 rounded-full animate-pulse" style={{ backgroundColor: '#FF5E14', animationDelay: '0s', animationDuration: '3s' }}></div>
          <div className="absolute top-20 right-20 w-16 h-16 rounded-full animate-pulse" style={{ backgroundColor: '#001554', animationDelay: '1s', animationDuration: '4s' }}></div>
          <div className="absolute bottom-20 left-20 w-12 h-12 rounded-full animate-pulse" style={{ backgroundColor: '#FF5E14', animationDelay: '2s', animationDuration: '3.5s' }}></div>
          <div className="absolute bottom-10 right-10 w-14 h-14 rounded-full animate-pulse" style={{ backgroundColor: '#001554', animationDelay: '3s', animationDuration: '4.5s' }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Badge */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg border-2" 
                 style={{ 
                   backgroundColor: theme === 'dark' ? '#1F1F1F' : '#FFFFFF',
                   borderColor: theme === 'dark' ? 'rgba(255, 94, 20, 0.3)' : 'rgba(255, 94, 20, 0.2)'
                 }}>
              <span className="text-lg sm:text-xl mr-2">📞</span>
              <span className="text-sm sm:text-base font-bold" style={{ color: '#FF5E14' }}>
                Get in Touch
              </span>
            </div>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-center mb-4 sm:mb-6 leading-tight tracking-tight">
            <span style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
              Contact{' '}
            </span>
            <span className="relative inline-block">
              <span style={{ color: '#FF5E14', textShadow: '0 2px 8px rgba(255, 94, 20, 0.3)' }}>
                Support
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"></div>
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-center mb-8 sm:mb-10 max-w-4xl mx-auto leading-relaxed font-medium" 
             style={{ color: theme === 'dark' ? '#B3B5BC' : '#4B5563' }}>
            We&apos;re here to help with any questions or support you need
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-10">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black mb-1" style={{ color: '#FF5E14' }}>
                24/7
              </div>
              <div className="text-sm sm:text-base font-medium" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                Support Available
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black mb-1" style={{ color: '#001554' }}>
                &lt;1hr
              </div>
              <div className="text-sm sm:text-base font-medium" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                Response Time
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black mb-1" style={{ color: '#FF5E14' }}>
                100%
              </div>
              <div className="text-sm sm:text-base font-medium" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                Satisfaction Rate
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="py-12 sm:py-16 lg:py-20" style={{ backgroundColor: theme === 'dark' ? '#001554' : '#F2F3F5' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
            {/* Contact Form */}
            <div className="p-8 sm:p-10 rounded-3xl shadow-xl" style={{ backgroundColor: theme === 'dark' ? '#001554' : '#FFFFFF' }}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>Send us a Message</h2>
              
              {/* Success Message */}
              {success && (
                <div className="mb-6 p-4 rounded-xl border-l-4 border-green-500 bg-green-50 text-green-700">
                  <p className="font-semibold">{success}</p>
                </div>
              )}
              
              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 rounded-xl border-l-4 border-red-500 bg-red-50 text-red-700">
                  <p className="font-semibold">{error}</p>
                </div>
              )}
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-4 border-2 rounded-xl focus:outline-none transition-all duration-300"
                      style={{ 
                        borderColor: theme === 'dark' ? '#6B7280' : '#B3B5BC', 
                        color: theme === 'dark' ? '#FFFFFF' : '#001554',
                        backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF'
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#FE5F16'}
                      onBlur={(e) => e.currentTarget.style.borderColor = theme === 'dark' ? '#6B7280' : '#B3B5BC'}
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-4 border-2 rounded-xl focus:outline-none transition-all duration-300"
                      style={{ 
                        borderColor: theme === 'dark' ? '#6B7280' : '#B3B5BC', 
                        color: theme === 'dark' ? '#FFFFFF' : '#001554',
                        backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF'
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#FE5F16'}
                      onBlur={(e) => e.currentTarget.style.borderColor = theme === 'dark' ? '#6B7280' : '#B3B5BC'}
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 border-2 rounded-xl focus:outline-none transition-all duration-300"
                    style={{ 
                      borderColor: theme === 'dark' ? '#6B7280' : '#B3B5BC', 
                      color: theme === 'dark' ? '#FFFFFF' : '#001554',
                      backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#FE5F16'}
                    onBlur={(e) => e.currentTarget.style.borderColor = theme === 'dark' ? '#6B7280' : '#B3B5BC'}
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border-2 rounded-xl focus:outline-none transition-all duration-300"
                    style={{ 
                      borderColor: theme === 'dark' ? '#6B7280' : '#B3B5BC', 
                      color: theme === 'dark' ? '#FFFFFF' : '#001554',
                      backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#FE5F16'}
                    onBlur={(e) => e.currentTarget.style.borderColor = theme === 'dark' ? '#6B7280' : '#B3B5BC'}
                    placeholder="+94 71 234 5678"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border-2 rounded-xl focus:outline-none transition-all duration-300"
                    style={{ 
                      borderColor: theme === 'dark' ? '#6B7280' : '#B3B5BC', 
                      color: theme === 'dark' ? '#FFFFFF' : '#001554',
                      backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#FE5F16'}
                    onBlur={(e) => e.currentTarget.style.borderColor = theme === 'dark' ? '#6B7280' : '#B3B5BC'}
                    placeholder="How can we help you?"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>Message *</label>
                  <textarea
                    rows={6}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 border-2 rounded-xl focus:outline-none transition-all duration-300 resize-none"
                    style={{ 
                      borderColor: theme === 'dark' ? '#6B7280' : '#B3B5BC', 
                      color: theme === 'dark' ? '#FFFFFF' : '#001554',
                      backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#FE5F16'}
                    onBlur={(e) => e.currentTarget.style.borderColor = theme === 'dark' ? '#6B7280' : '#B3B5BC'}
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>
                
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
                
                <Button 
                  className="w-full py-4 sm:py-5 text-lg sm:text-xl font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-xl border-0"
                  style={{ backgroundColor: '#FE5F16', color: '#FFFFFF' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FF5D13'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FE5F16'}
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8 sm:space-y-10">
              <div className="p-8 rounded-3xl shadow-xl hover:scale-105 transition-all duration-300" style={{ backgroundColor: '#FFFFFF' }}>
                <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: '#001554' }}>Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg" style={{ backgroundColor: '#FE5F16' }}>
                      <span className="text-white text-xl">📍</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2" style={{ color: '#001554' }}>Address</h3>
                      <p className="text-lg" style={{ color: '#B3B5BC' }}>123, Galle Road, Colombo 03, Sri Lanka</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg" style={{ backgroundColor: '#FF5E14' }}>
                      <span className="text-xl" style={{ color: '#001554' }}>📞</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2" style={{ color: '#001554' }}>Phone</h3>
                      <p className="text-lg" style={{ color: '#B3B5BC' }}>+94 11 123 4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg" style={{ backgroundColor: '#001554' }}>
                      <span className="text-white text-xl">✉️</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2" style={{ color: '#001554' }}>Email</h3>
                      <p className="text-lg" style={{ color: '#B3B5BC' }}>hello@toolntask.lk</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg" style={{ backgroundColor: '#FE5F16' }}>
                      <span className="text-white text-xl">🕒</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2" style={{ color: '#001554' }}>Business Hours</h3>
                      <p className="text-lg" style={{ color: '#B3B5BC' }}>Mon - Fri: 9:00 AM - 6:00 PM</p>
                      <p className="text-lg" style={{ color: '#B3B5BC' }}>Sat: 9:00 AM - 2:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="p-8 rounded-3xl shadow-xl hover:scale-105 transition-all duration-300" style={{ backgroundColor: '#FFFFFF' }}>
                <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: '#001554' }}>Frequently Asked Questions</h2>
                <div className="space-y-6">
                  <div className="p-4 rounded-xl border-l-4" style={{ backgroundColor: '#F2F3F5', borderColor: '#FE5F16' }}>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-lg" style={{ color: '#001554' }}>How do I start using</span>
                      <Logo size="small" />
                      <span className="font-bold text-lg" style={{ color: '#001554' }}>?</span>
                    </div>
                    <p className="text-lg leading-relaxed" style={{ color: '#B3B5BC' }}>Simply create an account and start browsing available tasks or tools in your area.</p>
                  </div>
                  <div className="p-4 rounded-xl border-l-4" style={{ backgroundColor: '#F2F3F5', borderColor: '#FF5E14' }}>
                    <h3 className="font-bold text-lg mb-3" style={{ color: '#001554' }}>Is there a service fee?</h3>
                    <p className="text-lg leading-relaxed" style={{ color: '#B3B5BC' }}>We charge a small service fee to maintain the platform and ensure quality service.</p>
                  </div>
                  <div className="p-4 rounded-xl border-l-4" style={{ backgroundColor: '#F2F3F5', borderColor: '#001554' }}>
                    <h3 className="font-bold text-lg mb-3" style={{ color: '#001554' }}>How are payments handled?</h3>
                    <p className="text-lg leading-relaxed" style={{ color: '#B3B5BC' }}>All payments are processed securely through our platform for your protection.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
