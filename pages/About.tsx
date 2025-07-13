import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import Logo from '../src/components/Logo';
import { Button } from '../src/components/ui/button';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../src/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import Image from 'next/image';

export default function About() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [ceoImageError, setCeoImageError] = useState(false);
  const [ctoImageError, setCtoImageError] = useState(false);
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

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.subject || !formData.message) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, 'contacts'), {
        ...formData,
        userId: user?.uid || null,
        userEmail: user?.email || null,
        timestamp: serverTimestamp(),
        status: 'new'
      });

      setSuccess('Thank you for your message! We\'ll get back to you soon.');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setError('Error sending message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F2F3F5' }}>
      <Navigation />
      
      {/* Hero Header Section */}
      <div className="py-8 sm:py-12 lg:py-16 relative overflow-hidden" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F2F3F5' }}>
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 rounded-full animate-pulse" style={{ backgroundColor: '#FF5E14', animationDelay: '0s', animationDuration: '3s' }}></div>
          <div className="absolute top-20 right-20 w-16 h-16 rounded-full animate-pulse" style={{ backgroundColor: '#1a1a1a', animationDelay: '1s', animationDuration: '4s' }}></div>
          <div className="absolute bottom-20 left-20 w-12 h-12 rounded-full animate-pulse" style={{ backgroundColor: '#FF5E14', animationDelay: '2s', animationDuration: '3.5s' }}></div>
          <div className="absolute bottom-10 right-10 w-14 h-14 rounded-full animate-pulse" style={{ backgroundColor: '#1a1a1a', animationDelay: '3s', animationDuration: '4.5s' }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Badge */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg border-2" 
                 style={{ 
                   backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF',
                   borderColor: theme === 'dark' ? 'rgba(255, 94, 20, 0.3)' : 'rgba(255, 94, 20, 0.2)'
                 }}>
              <span className="text-sm sm:text-base font-bold" style={{ color: '#FF5E14' }}>
                Our Community Story
              </span>
            </div>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-center mb-4 sm:mb-6 leading-tight tracking-tight">
            <span style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
              About{' '}
            </span>
            <span className="relative inline-block">
              <span style={{ color: '#FF5E14', textShadow: '0 2px 8px rgba(255, 94, 20, 0.3)' }}>
                ToolNTask
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"></div>
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-center mb-8 sm:mb-10 max-w-4xl mx-auto leading-relaxed font-medium" 
             style={{ color: theme === 'dark' ? '#B3B5BC' : '#4B5563' }}>
            Connecting communities through shared tasks and tool rentals
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-10">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black mb-1" style={{ color: '#FF5E14' }}>
                5K+
              </div>
              <div className="text-sm sm:text-base font-medium" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                Community Members
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black mb-1" style={{ color: '#1a1a1a' }}>
                98%
              </div>
              <div className="text-sm sm:text-base font-medium" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                Satisfaction Rate
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black mb-1" style={{ color: '#FF5E14' }}>
                24/7
              </div>
              <div className="text-sm sm:text-base font-medium" style={{ color: theme === 'dark' ? '#B3B5BC' : '#6B7280' }}>
                Community Support
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="py-6 sm:py-8" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F2F3F5' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mission Section */}
          <div className="mb-8 sm:mb-12">
            <div className="p-6 sm:p-8 lg:p-8 rounded-2xl shadow-xl" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>Our Mission</h2>
              <div className="max-w-4xl mx-auto">
                <p className="text-base sm:text-lg lg:text-xl mb-4 sm:mb-6 leading-relaxed text-center" style={{ color: theme === 'dark' ? '#B3B5BC' : '#B3B5BC' }}>
                  We believe that every community has untapped potential. Whether it&apos;s someone with 
                  time to spare looking for extra income, or a neighbor who needs a specific tool 
                  for a weekend project, ToolNTask bridges these gaps.
                </p>
                <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-center" style={{ color: theme === 'dark' ? '#B3B5BC' : '#B3B5BC' }}>
                  Our platform empowers people to share resources, build connections, and create 
                  a more collaborative community where everyone benefits.
                </p>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div className="p-6 rounded-2xl shadow-xl text-center hover:scale-105 transition-all duration-300" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg" style={{ backgroundColor: '#FF5E14' }}>
                <span className="text-xl">🎯</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>Trust & Safety</h3>
              <p className="text-sm sm:text-base leading-relaxed" style={{ color: '#B3B5BC' }}>
                Every user is verified, and we maintain high standards for safety and reliability 
                in all transactions.
              </p>
            </div>

            <div className="p-6 rounded-2xl shadow-xl text-center hover:scale-105 transition-all duration-300" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg" style={{ backgroundColor: '#FF5E14' }}>
                <span className="text-xl">🌱</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>Sustainability</h3>
              <p className="text-sm sm:text-base leading-relaxed" style={{ color: '#B3B5BC' }}>
                By sharing tools and resources, we reduce waste and promote a more sustainable 
                way of living.
              </p>
            </div>

            <div className="p-6 rounded-2xl shadow-xl text-center hover:scale-105 transition-all duration-300" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg" style={{ backgroundColor: '#1a1a1a' }}>
                <span className="text-xl">👥</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>Community</h3>
              <p className="text-sm sm:text-base leading-relaxed" style={{ color: '#B3B5BC' }}>
                We strengthen local communities by encouraging neighbors to help each other 
                and share resources.
              </p>
            </div>
          </div>

          {/* Advertisement Spaces */}
          <div className="mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
              Advertisements
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Advertisement Space 1 */}
              <div className="relative p-6 rounded-2xl shadow-xl border-2 border-dashed hover:scale-105 transition-all duration-300" 
                   style={{ 
                     backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF',
                     borderColor: theme === 'dark' ? '#FF5E14' : '#FF5E14'
                   }}>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" 
                       style={{ backgroundColor: theme === 'dark' ? '#FF5E14' : '#FF5E14' }}>
                    <span className="text-white text-xl">📸</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                    Advertisement Space
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#B3B5BC' }}>
                    Your business ad here
                  </p>
                  <div className="mt-3 p-2 rounded-lg" style={{ backgroundColor: theme === 'dark' ? '#2A2A2A' : '#F8F9FA' }}>
                    <span className="text-xs font-medium" style={{ color: '#B3B5BC' }}>
                      300x250 Banner Space
                    </span>
                  </div>
                </div>
              </div>

              {/* Advertisement Space 2 */}
              <div className="relative p-6 rounded-2xl shadow-xl border-2 border-dashed hover:scale-105 transition-all duration-300" 
                   style={{ 
                     backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF',
                     borderColor: theme === 'dark' ? '#1a1a1a' : '#1a1a1a'
                   }}>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" 
                       style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#1a1a1a' }}>
                    <span className="text-white text-xl">🎯</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                    Advertisement Space
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#B3B5BC' }}>
                    Your business ad here
                  </p>
                  <div className="mt-3 p-2 rounded-lg" style={{ backgroundColor: theme === 'dark' ? '#2A2A2A' : '#F8F9FA' }}>
                    <span className="text-xs font-medium" style={{ color: '#B3B5BC' }}>
                      300x250 Banner Space
                    </span>
                  </div>
                </div>
              </div>

              {/* Advertisement Space 3 */}
              <div className="relative p-6 rounded-2xl shadow-xl border-2 border-dashed hover:scale-105 transition-all duration-300" 
                   style={{ 
                     backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF',
                     borderColor: theme === 'dark' ? '#FF5E14' : '#FF5E14'
                   }}>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" 
                       style={{ backgroundColor: theme === 'dark' ? '#FF5E14' : '#FF5E14' }}>
                    <span className="text-white text-xl">💼</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                    Advertisement Space
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#B3B5BC' }}>
                    Your business ad here
                  </p>
                  <div className="mt-3 p-2 rounded-lg" style={{ backgroundColor: theme === 'dark' ? '#2A2A2A' : '#F8F9FA' }}>
                    <span className="text-xs font-medium" style={{ color: '#B3B5BC' }}>
                      300x250 Banner Space
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
              <div className="p-4 sm:p-6 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-3 overflow-hidden shadow-lg border-3 relative" style={{ borderColor: '#FF5E14' }}>
                  {!ceoImageError ? (
                    <Image 
                      src="/ceo.jpg" 
                      alt="Mandira De Silva - Founder & CEO"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                      onError={() => setCeoImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                      <span className="text-white text-lg sm:text-xl font-bold">MD</span>
                    </div>
                  )}
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-1" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>Mandira De Silva</h3>
                <p className="font-semibold mb-2" style={{ color: '#FF5E14' }}>Founder & CEO</p>
                <p className="text-sm sm:text-base leading-relaxed" style={{ color: '#B3B5BC' }}>
                  Passionate about building communities and creating sustainable solutions.
                </p>
              </div>

              <div className="p-4 sm:p-6 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-3 overflow-hidden shadow-lg border-3 relative" style={{ borderColor: '#1a1a1a' }}>
                  {!ctoImageError ? (
                    <Image 
                      src="/cto.jpg" 
                      alt="Senesh Fitzroy - CTO"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: 'center 20%' }}
                      onError={() => setCtoImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                      <span className="text-white text-lg sm:text-xl font-bold">SF</span>
                    </div>
                  )}
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-1" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>Senesh Fitzroy</h3>
                <p className="font-semibold mb-2" style={{ color: '#1a1a1a' }}>CTO</p>
                <p className="text-sm sm:text-base leading-relaxed" style={{ color: '#B3B5BC' }}>
                  Tech enthusiast dedicated to creating seamless user experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-12 sm:py-16 lg:py-20" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Contact Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full mb-4" 
                 style={{ 
                   backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFF7ED',
                   border: `2px solid ${theme === 'dark' ? '#FF5E14' : '#FDBA74'}`
                 }}>
              <span className="text-sm font-bold" style={{ color: '#FF5E14' }}>
                📧 Get In Touch
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
              Contact Us
            </h2>
            <p className="text-lg sm:text-xl max-w-2xl mx-auto" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
              Have questions or need support? We&apos;re here to help you succeed on <Logo size="small" className="inline mx-1" />
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="p-6 rounded-2xl" style={{ backgroundColor: theme === 'dark' ? '#2a2a2a' : '#F8F9FA' }}>
                <h3 className="text-xl font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                  📍 Our Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FF5E14' }}>
                      <span className="text-white text-sm">📧</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>Email</h4>
                      <p className="text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>hello@toolntask.lk</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FF5E14' }}>
                      <span className="text-white text-sm">📞</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>Phone</h4>
                      <p className="text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>+94 77 123 4567</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FF5E14' }}>
                      <span className="text-white text-sm">📍</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>Address</h4>
                      <p className="text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>Colombo, Sri Lanka</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl" style={{ backgroundColor: theme === 'dark' ? '#2a2a2a' : '#F8F9FA' }}>
                <h3 className="text-xl font-bold mb-4" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                  ⏰ Response Time
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                  We typically respond to all inquiries within 24 hours during business days. 
                  For urgent matters, please call us directly.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-6 sm:p-8 rounded-2xl shadow-xl" style={{ backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFFFFF' }}>
              <h3 className="text-xl font-bold mb-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#001554' }}>
                💬 Send us a message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {success && (
                  <div className="p-4 rounded-lg border-2 border-green-300" style={{ backgroundColor: '#D1FAE5' }}>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">✅</span>
                      <span className="text-green-700 font-medium">{success}</span>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="p-4 rounded-lg border-2 border-red-300" style={{ backgroundColor: '#FEE2E2' }}>
                    <div className="flex items-center gap-2">
                      <span className="text-red-600">⚠️</span>
                      <span className="text-red-700 font-medium">{error}</span>
                    </div>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors"
                      style={{ 
                        borderColor: theme === 'dark' ? '#444444' : '#E2E8F0',
                        backgroundColor: theme === 'dark' ? '#3a3a3a' : '#FFFFFF',
                        color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                      }}
                      placeholder="John"
                      onFocus={(e) => e.currentTarget.style.borderColor = '#FF5E14'}
                      onBlur={(e) => e.currentTarget.style.borderColor = theme === 'dark' ? '#444444' : '#E2E8F0'}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors"
                      style={{ 
                        borderColor: theme === 'dark' ? '#444444' : '#E2E8F0',
                        backgroundColor: theme === 'dark' ? '#3a3a3a' : '#FFFFFF',
                        color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                      }}
                      placeholder="Doe"
                      onFocus={(e) => e.currentTarget.style.borderColor = '#FF5E14'}
                      onBlur={(e) => e.currentTarget.style.borderColor = theme === 'dark' ? '#444444' : '#E2E8F0'}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors"
                    style={{ 
                      borderColor: theme === 'dark' ? '#444444' : '#E2E8F0',
                      backgroundColor: theme === 'dark' ? '#3a3a3a' : '#FFFFFF',
                      color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                    }}
                    placeholder="john@example.com"
                    onFocus={(e) => e.currentTarget.style.borderColor = '#FF5E14'}
                    onBlur={(e) => e.currentTarget.style.borderColor = theme === 'dark' ? '#444444' : '#E2E8F0'}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors"
                    style={{ 
                      borderColor: theme === 'dark' ? '#444444' : '#E2E8F0',
                      backgroundColor: theme === 'dark' ? '#3a3a3a' : '#FFFFFF',
                      color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                    }}
                    placeholder="+94 77 123 4567"
                    onFocus={(e) => e.currentTarget.style.borderColor = '#FF5E14'}
                    onBlur={(e) => e.currentTarget.style.borderColor = theme === 'dark' ? '#444444' : '#E2E8F0'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors"
                    style={{ 
                      borderColor: theme === 'dark' ? '#444444' : '#E2E8F0',
                      backgroundColor: theme === 'dark' ? '#3a3a3a' : '#FFFFFF',
                      color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                    }}
                    placeholder="How can we help you?"
                    onFocus={(e) => e.currentTarget.style.borderColor = '#FF5E14'}
                    onBlur={(e) => e.currentTarget.style.borderColor = theme === 'dark' ? '#444444' : '#E2E8F0'}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#374151' }}>
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors resize-none"
                    style={{ 
                      borderColor: theme === 'dark' ? '#444444' : '#E2E8F0',
                      backgroundColor: theme === 'dark' ? '#3a3a3a' : '#FFFFFF',
                      color: theme === 'dark' ? '#FFFFFF' : '#2D3748'
                    }}
                    placeholder="Tell us more about your inquiry..."
                    onFocus={(e) => e.currentTarget.style.borderColor = '#FF5E14'}
                    onBlur={(e) => e.currentTarget.style.borderColor = theme === 'dark' ? '#444444' : '#E2E8F0'}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50"
                  style={{ backgroundColor: loading ? '#9CA3AF' : '#FF5E14' }}
                >
                  {loading ? 'Sending...' : '📤 Send Message'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer showNewsletter={true} />
    </div>
  );
}
