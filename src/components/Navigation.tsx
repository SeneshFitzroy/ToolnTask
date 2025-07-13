import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { Menu, X, Plus, Wrench, ClipboardList, ChevronDown, User as UserIcon, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { auth } from '../lib/firebase';
import { signOut, onAuthStateChanged, User } from 'firebase/auth';
import Logo from './Logo';

const Navigation = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCreateDropdown, setShowCreateDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setMounted(true);
    
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Close dropdowns when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.create-dropdown')) {
        setShowCreateDropdown(false);
      }
      if (!target.closest('.profile-dropdown')) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      unsubscribe();
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Function to check if a link is active
  const isActiveLink = (href: string) => {
    if (href === '/') {
      return router.pathname === '/';
    }
    return router.pathname.startsWith(href);
  };

  // Function to handle hover effects for non-active links
  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!isActiveLink(href)) {
      e.currentTarget.style.color = '#FF5E14';
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!isActiveLink(href)) {
      e.currentTarget.style.color = theme === 'dark' ? '#FFFFFF' : '#2D3748';
    }
  };

  if (!mounted) return null;

  return (
    <nav 
      className="shadow-lg sticky top-0 z-50 border-b border-opacity-20 transition-colors duration-300" 
      style={{ 
        backgroundColor: theme === 'dark' ? '#0a0a0a' : '#FFFFFF', 
        borderColor: theme === 'dark' ? '#333333' : '#B3B5BC' 
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            <Logo size="large" interactive={true} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-5 xl:space-x-7">
            <Link 
              href="/" 
              className="px-3 xl:px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 hover:scale-105" 
              style={{ 
                color: isActiveLink('/') ? '#FF5E14' : (theme === 'dark' ? '#FFFFFF' : '#2D3748'),
                backgroundColor: isActiveLink('/') ? (theme === 'dark' ? 'rgba(255, 94, 20, 0.1)' : 'rgba(255, 94, 20, 0.05)') : 'transparent',
                borderBottom: isActiveLink('/') ? '2px solid #FF5E14' : 'none'
              }} 
              onMouseEnter={(e) => handleMouseEnter(e, '/')} 
              onMouseLeave={(e) => handleMouseLeave(e, '/')}
            >
              Home
            </Link>
            <Link 
              href="/Tasks" 
              className="px-3 xl:px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 hover:scale-105" 
              style={{ 
                color: isActiveLink('/Tasks') ? '#FF5E14' : (theme === 'dark' ? '#FFFFFF' : '#2D3748'),
                backgroundColor: isActiveLink('/Tasks') ? (theme === 'dark' ? 'rgba(255, 94, 20, 0.1)' : 'rgba(255, 94, 20, 0.05)') : 'transparent',
                borderBottom: isActiveLink('/Tasks') ? '2px solid #FF5E14' : 'none'
              }} 
              onMouseEnter={(e) => handleMouseEnter(e, '/Tasks')} 
              onMouseLeave={(e) => handleMouseLeave(e, '/Tasks')}
            >
              Tasks
            </Link>
            <Link 
              href="/Tools" 
              className="px-3 xl:px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 hover:scale-105" 
              style={{ 
                color: isActiveLink('/Tools') ? '#FF5E14' : (theme === 'dark' ? '#FFFFFF' : '#2D3748'),
                backgroundColor: isActiveLink('/Tools') ? (theme === 'dark' ? 'rgba(255, 94, 20, 0.1)' : 'rgba(255, 94, 20, 0.05)') : 'transparent',
                borderBottom: isActiveLink('/Tools') ? '2px solid #FF5E14' : 'none'
              }} 
              onMouseEnter={(e) => handleMouseEnter(e, '/Tools')} 
              onMouseLeave={(e) => handleMouseLeave(e, '/Tools')}
            >
              Tools
            </Link>
            <Link 
              href="/About" 
              className="px-3 xl:px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 hover:scale-105" 
              style={{ 
                color: isActiveLink('/About') ? '#FF5E14' : (theme === 'dark' ? '#FFFFFF' : '#2D3748'),
                backgroundColor: isActiveLink('/About') ? (theme === 'dark' ? 'rgba(255, 94, 20, 0.1)' : 'rgba(255, 94, 20, 0.05)') : 'transparent',
                borderBottom: isActiveLink('/About') ? '2px solid #FF5E14' : 'none'
              }} 
              onMouseEnter={(e) => handleMouseEnter(e, '/About')} 
              onMouseLeave={(e) => handleMouseLeave(e, '/About')}
            >
              About Us
            </Link>
            <Link 
              href="/Contact" 
              className="px-3 xl:px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 hover:scale-105" 
              style={{ 
                color: isActiveLink('/Contact') ? '#FF5E14' : (theme === 'dark' ? '#FFFFFF' : '#2D3748'),
                backgroundColor: isActiveLink('/Contact') ? (theme === 'dark' ? 'rgba(255, 94, 20, 0.1)' : 'rgba(255, 94, 20, 0.05)') : 'transparent',
                borderBottom: isActiveLink('/Contact') ? '2px solid #FF5E14' : 'none'
              }} 
              onMouseEnter={(e) => handleMouseEnter(e, '/Contact')} 
              onMouseLeave={(e) => handleMouseLeave(e, '/Contact')}
            >
              Contact
            </Link>
            
            {/* Enhanced Create Button for authenticated users */}
            {user && (
              <div className="relative create-dropdown">
                <button
                  onClick={() => setShowCreateDropdown(!showCreateDropdown)}
                  className="group relative px-6 py-3 rounded-xl text-base font-bold transition-all duration-300 hover:scale-105 flex items-center gap-3 shadow-lg overflow-hidden"
                  style={{ 
                    background: 'linear-gradient(135deg, #FF5E14 0%, #FF7A3D 50%, #FF9966 100%)',
                    color: '#FFFFFF',
                    border: '2px solid transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #FF4A00 0%, #FF6829 50%, #FF8552 100%)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 94, 20, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #FF5E14 0%, #FF7A3D 50%, #FF9966 100%)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 94, 20, 0.3)';
                  }}
                >
                  {/* Animated Background Sparkle */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full animate-ping"></div>
                    <div className="absolute top-2 right-3 w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute bottom-2 left-4 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                  </div>
                  
                  {/* Icon with Rotation Animation */}
                  <Plus 
                    className={`h-5 w-5 transition-transform duration-300 ${showCreateDropdown ? 'rotate-45' : 'rotate-0'}`} 
                    strokeWidth={2.5}
                  />
                  
                  {/* Text */}
                  <span className="font-bold tracking-wide">Create</span>
                  
                  {/* Chevron with Animation */}
                  <ChevronDown 
                    className={`h-4 w-4 transition-transform duration-300 ${showCreateDropdown ? 'rotate-180' : 'rotate-0'}`}
                    strokeWidth={2.5}
                  />
                </button>
                
                {/* Enhanced Dropdown */}
                {showCreateDropdown && (
                  <div className="absolute top-full left-0 mt-3 w-64 rounded-2xl shadow-2xl border-2 z-50 overflow-hidden animate-in fade-in slide-in-from-top-5 duration-200"
                       style={{ 
                         backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF',
                         borderColor: theme === 'dark' ? '#444444' : '#E5E7EB',
                         boxShadow: theme === 'dark' 
                           ? '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.1)' 
                           : '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)'
                       }}>
                    
                    {/* Header */}
                    <div className="p-4 border-b" style={{ 
                      backgroundColor: theme === 'dark' ? '#2a2a2a' : '#F8FAFC',
                      borderColor: theme === 'dark' ? '#444444' : '#E5E7EB'
                    }}>
                      <h3 className="font-bold text-sm" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                        What would you like to create?
                      </h3>
                      <p className="text-xs mt-1" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                        Choose an option below to get started
                      </p>
                    </div>
                    
                    {/* Create Tool Option */}
                    <Link 
                      href="/CreateTool"
                      className="group flex items-center gap-4 px-4 py-4 transition-all duration-200 hover:scale-[1.02] border-b"
                      style={{ 
                        color: theme === 'dark' ? '#FFFFFF' : '#2D3748',
                        borderColor: theme === 'dark' ? '#333333' : '#F1F5F9'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = theme === 'dark' ? '#2a2a2a' : '#FFF7ED';
                        e.currentTarget.style.borderColor = '#FF5E14';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.borderColor = theme === 'dark' ? '#333333' : '#F1F5F9';
                      }}
                      onClick={() => setShowCreateDropdown(false)}
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-110"
                           style={{ backgroundColor: theme === 'dark' ? '#FF5E14' : '#FFF7ED' }}>
                        <Wrench className="h-6 w-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#FF5E14' }} strokeWidth={2} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-base" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                          Create Tool Listing
                        </h4>
                        <p className="text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                          List your tool for rent or sale
                        </p>
                      </div>
                    </Link>
                    
                    {/* Create Task Option */}
                    <Link 
                      href="/CreateTask"
                      className="group flex items-center gap-4 px-4 py-4 transition-all duration-200 hover:scale-[1.02]"
                      style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = theme === 'dark' ? '#2a2a2a' : '#FFF7ED';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                      onClick={() => setShowCreateDropdown(false)}
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-110"
                           style={{ backgroundColor: theme === 'dark' ? '#FF5E14' : '#FFF7ED' }}>
                        <ClipboardList className="h-6 w-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#FF5E14' }} strokeWidth={2} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-base" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                          Create Task
                        </h4>
                        <p className="text-sm" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                          Post a task and hire workers
                        </p>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right side - Auth buttons */}
          <div className="flex items-center space-x-3 sm:space-x-3 flex-shrink-0">
            {/* Auth Buttons - Hidden on small screens */}
            <div className="hidden sm:flex items-center space-x-3">
              {user ? (
                // User is logged in - Profile Icon with dropdown
                <div className="relative profile-dropdown">
                  <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105" 
                    style={{ 
                      color: theme === 'dark' ? '#FFFFFF' : '#2D3748',
                      backgroundColor: theme === 'dark' ? 'rgba(255, 94, 20, 0.1)' : 'rgba(255, 94, 20, 0.05)',
                      border: `2px solid ${theme === 'dark' ? 'rgba(255, 94, 20, 0.3)' : 'rgba(255, 94, 20, 0.2)'}`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255, 94, 20, 0.2)' : 'rgba(255, 94, 20, 0.1)';
                      e.currentTarget.style.borderColor = '#FF5E14';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255, 94, 20, 0.1)' : 'rgba(255, 94, 20, 0.05)';
                      e.currentTarget.style.borderColor = theme === 'dark' ? 'rgba(255, 94, 20, 0.3)' : 'rgba(255, 94, 20, 0.2)';
                    }}
                  >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" 
                         style={{ backgroundColor: '#FF5E14' }}>
                      {user.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <ChevronDown 
                      className={`h-4 w-4 transition-transform duration-300 ${showProfileDropdown ? 'rotate-180' : 'rotate-0'}`}
                      strokeWidth={2}
                    />
                  </button>
                  
                  {/* Profile Dropdown */}
                  {showProfileDropdown && (
                    <div className="absolute right-0 top-full mt-3 w-48 rounded-xl shadow-2xl border-2 z-50 overflow-hidden animate-in fade-in slide-in-from-top-5 duration-200"
                         style={{ 
                           backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF',
                           borderColor: theme === 'dark' ? '#444444' : '#E5E7EB',
                           boxShadow: theme === 'dark' 
                             ? '0 20px 25px -5px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)' 
                             : '0 20px 25px -5px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)'
                         }}>
                      
                      <Link 
                        href="/Profile"
                        className="flex items-center gap-3 px-4 py-3 transition-all duration-200 hover:scale-[1.02] border-b"
                        style={{ 
                          color: theme === 'dark' ? '#FFFFFF' : '#2D3748',
                          borderColor: theme === 'dark' ? '#333333' : '#F1F5F9'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = theme === 'dark' ? '#2a2a2a' : '#FFF7ED';
                          e.currentTarget.style.borderColor = '#FF5E14';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.borderColor = theme === 'dark' ? '#333333' : '#F1F5F9';
                        }}
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        <UserIcon className="h-4 w-4" style={{ color: '#FF5E14' }} />
                        <span className="font-medium">Profile</span>
                      </Link>
                      
                      <button 
                        onClick={() => {
                          handleSignOut();
                          setShowProfileDropdown(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 hover:scale-[1.02]"
                        style={{ color: '#DC2626' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = theme === 'dark' ? '#2a2a2a' : '#FEF2F2';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <LogOut className="h-4 w-4" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                // User is not logged in - Profile button with dropdown
                <div className="relative profile-dropdown">
                  <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
                    style={{ 
                      color: theme === 'dark' ? '#FFFFFF' : '#2D3748',
                      backgroundColor: theme === 'dark' ? 'rgba(255, 94, 20, 0.1)' : 'rgba(255, 94, 20, 0.05)',
                      border: `2px solid ${theme === 'dark' ? 'rgba(255, 94, 20, 0.3)' : 'rgba(255, 94, 20, 0.2)'}`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255, 94, 20, 0.2)' : 'rgba(255, 94, 20, 0.1)';
                      e.currentTarget.style.borderColor = '#FF5E14';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255, 94, 20, 0.1)' : 'rgba(255, 94, 20, 0.05)';
                      e.currentTarget.style.borderColor = theme === 'dark' ? 'rgba(255, 94, 20, 0.3)' : 'rgba(255, 94, 20, 0.2)';
                    }}
                  >
                    <UserIcon className="h-4 w-4" style={{ color: '#FF5E14' }} />
                    <span className="font-medium">Profile</span>
                    <ChevronDown 
                      className={`h-4 w-4 transition-transform duration-300 ${showProfileDropdown ? 'rotate-180' : 'rotate-0'}`}
                      strokeWidth={2}
                    />
                  </button>
                  
                  {/* Profile Dropdown for unauthenticated users */}
                  {showProfileDropdown && (
                    <div className="absolute right-0 top-full mt-3 w-48 rounded-xl shadow-2xl border-2 z-50 overflow-hidden animate-in fade-in slide-in-from-top-5 duration-200"
                         style={{ 
                           backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF',
                           borderColor: theme === 'dark' ? '#444444' : '#E5E7EB',
                           boxShadow: theme === 'dark' 
                             ? '0 20px 25px -5px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)' 
                             : '0 20px 25px -5px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)'
                         }}>
                      
                      <Link 
                        href="/SignIn"
                        className="flex items-center gap-3 px-4 py-3 transition-all duration-200 hover:scale-[1.02] border-b"
                        style={{ 
                          color: theme === 'dark' ? '#FFFFFF' : '#2D3748',
                          borderColor: theme === 'dark' ? '#333333' : '#F1F5F9'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = theme === 'dark' ? '#2a2a2a' : '#FFF7ED';
                          e.currentTarget.style.borderColor = '#FF5E14';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.borderColor = theme === 'dark' ? '#333333' : '#F1F5F9';
                        }}
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        <UserIcon className="h-4 w-4" style={{ color: '#FF5E14' }} />
                        <span className="font-medium">Login</span>
                      </Link>
                      
                      <Link 
                        href="/SignUp"
                        className="flex items-center gap-3 px-4 py-3 transition-all duration-200 hover:scale-[1.02]"
                        style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = theme === 'dark' ? '#2a2a2a' : '#FFF7ED';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        <UserIcon className="h-4 w-4" style={{ color: '#6366F1' }} />
                        <span className="font-medium">Register</span>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-lg transition-colors duration-200 hover:scale-105"
              style={{ backgroundColor: theme === 'dark' ? '#333333' : '#F2F3F5' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme === 'dark' ? '#444444' : '#B3B5BC'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme === 'dark' ? '#333333' : '#F2F3F5'}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }} />
              ) : (
                <Menu className="h-6 w-6" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-opacity-20" style={{ borderColor: theme === 'dark' ? '#444444' : '#B3B5BC' }}>
            <div className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className="px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300" 
                style={{ 
                  color: isActiveLink('/') ? '#FF5E14' : (theme === 'dark' ? '#FFFFFF' : '#2D3748'),
                  backgroundColor: isActiveLink('/') ? (theme === 'dark' ? 'rgba(255, 94, 20, 0.1)' : 'rgba(255, 94, 20, 0.05)') : 'transparent',
                  borderLeft: isActiveLink('/') ? '3px solid #FF5E14' : 'none'
                }} 
                onMouseEnter={(e) => handleMouseEnter(e, '/')} 
                onMouseLeave={(e) => handleMouseLeave(e, '/')} 
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/Tasks" 
                className="px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300" 
                style={{ 
                  color: isActiveLink('/Tasks') ? '#FF5E14' : (theme === 'dark' ? '#FFFFFF' : '#2D3748'),
                  backgroundColor: isActiveLink('/Tasks') ? (theme === 'dark' ? 'rgba(255, 94, 20, 0.1)' : 'rgba(255, 94, 20, 0.05)') : 'transparent',
                  borderLeft: isActiveLink('/Tasks') ? '3px solid #FF5E14' : 'none'
                }} 
                onMouseEnter={(e) => handleMouseEnter(e, '/Tasks')} 
                onMouseLeave={(e) => handleMouseLeave(e, '/Tasks')} 
                onClick={() => setMobileMenuOpen(false)}
              >
                Tasks
              </Link>
              <Link 
                href="/Tools" 
                className="px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300" 
                style={{ 
                  color: isActiveLink('/Tools') ? '#FF5E14' : (theme === 'dark' ? '#FFFFFF' : '#2D3748'),
                  backgroundColor: isActiveLink('/Tools') ? (theme === 'dark' ? 'rgba(255, 94, 20, 0.1)' : 'rgba(255, 94, 20, 0.05)') : 'transparent',
                  borderLeft: isActiveLink('/Tools') ? '3px solid #FF5E14' : 'none'
                }} 
                onMouseEnter={(e) => handleMouseEnter(e, '/Tools')} 
                onMouseLeave={(e) => handleMouseLeave(e, '/Tools')} 
                onClick={() => setMobileMenuOpen(false)}
              >
                Tools
              </Link>
              <Link 
                href="/About" 
                className="px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300" 
                style={{ 
                  color: isActiveLink('/About') ? '#FF5E14' : (theme === 'dark' ? '#FFFFFF' : '#2D3748'),
                  backgroundColor: isActiveLink('/About') ? (theme === 'dark' ? 'rgba(255, 94, 20, 0.1)' : 'rgba(255, 94, 20, 0.05)') : 'transparent',
                  borderLeft: isActiveLink('/About') ? '3px solid #FF5E14' : 'none'
                }} 
                onMouseEnter={(e) => handleMouseEnter(e, '/About')} 
                onMouseLeave={(e) => handleMouseLeave(e, '/About')} 
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                href="/Contact" 
                className="px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300" 
                style={{ 
                  color: isActiveLink('/Contact') ? '#FF5E14' : (theme === 'dark' ? '#FFFFFF' : '#2D3748'),
                  backgroundColor: isActiveLink('/Contact') ? (theme === 'dark' ? 'rgba(255, 94, 20, 0.1)' : 'rgba(255, 94, 20, 0.05)') : 'transparent',
                  borderLeft: isActiveLink('/Contact') ? '3px solid #FF5E14' : 'none'
                }} 
                onMouseEnter={(e) => handleMouseEnter(e, '/Contact')} 
                onMouseLeave={(e) => handleMouseLeave(e, '/Contact')} 
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              
              {/* Enhanced Create Options for Mobile */}
              {user && (
                <>
                  <div className="px-4 py-2 mt-2">
                    <h3 className="text-sm font-bold" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                      Create New
                    </h3>
                  </div>
                  <Link 
                    href="/CreateTool"
                    className="group flex items-center gap-3 px-4 py-3 mx-2 rounded-xl transition-all duration-300"
                    style={{ 
                      backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFF7ED',
                      border: `2px solid ${theme === 'dark' ? '#444444' : '#FDBA74'}`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = theme === 'dark' ? '#333333' : '#FED7AA';
                      e.currentTarget.style.borderColor = '#FF5E14';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = theme === 'dark' ? '#2a2a2a' : '#FFF7ED';
                      e.currentTarget.style.borderColor = theme === 'dark' ? '#444444' : '#FDBA74';
                    }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200"
                         style={{ backgroundColor: '#FF5E14' }}>
                      <Wrench className="h-5 w-5 text-white" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                        Create Tool Listing
                      </h4>
                      <p className="text-xs" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                        List your tool for rent or sale
                      </p>
                    </div>
                  </Link>
                  <Link 
                    href="/CreateTask"
                    className="group flex items-center gap-3 px-4 py-3 mx-2 rounded-xl transition-all duration-300 mb-3"
                    style={{ 
                      backgroundColor: theme === 'dark' ? '#2a2a2a' : '#FFF7ED',
                      border: `2px solid ${theme === 'dark' ? '#444444' : '#FDBA74'}`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = theme === 'dark' ? '#333333' : '#FED7AA';
                      e.currentTarget.style.borderColor = '#FF5E14';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = theme === 'dark' ? '#2a2a2a' : '#FFF7ED';
                      e.currentTarget.style.borderColor = theme === 'dark' ? '#444444' : '#FDBA74';
                    }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200"
                         style={{ backgroundColor: '#FF5E14' }}>
                      <ClipboardList className="h-5 w-5 text-white" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                        Create Task
                      </h4>
                      <p className="text-xs" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                        Post a task and hire workers
                      </p>
                    </div>
                  </Link>
                </>
              )}
              
              <div className="flex flex-col space-y-3 pt-3 border-t border-opacity-20" style={{ borderColor: theme === 'dark' ? '#444444' : '#B3B5BC' }}>
                {user ? (
                  // User is logged in - Mobile
                  <>
                    <Link href="/Profile"
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-full text-base font-medium transition-all duration-300" 
                      style={{ 
                        color: theme === 'dark' ? '#FFFFFF' : '#2D3748',
                        backgroundColor: theme === 'dark' ? 'rgba(255, 94, 20, 0.1)' : 'rgba(255, 94, 20, 0.05)',
                        border: `2px solid ${theme === 'dark' ? 'rgba(255, 94, 20, 0.3)' : 'rgba(255, 94, 20, 0.2)'}`
                      }}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" 
                           style={{ backgroundColor: '#FF5E14' }}>
                        {user.email?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <UserIcon className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                    <button 
                      onClick={() => {
                        handleSignOut();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-full text-base font-medium transition-all duration-300" 
                      style={{ 
                        color: '#DC2626',
                        backgroundColor: theme === 'dark' ? 'rgba(220, 38, 38, 0.1)' : 'rgba(220, 38, 38, 0.05)',
                        border: `2px solid ${theme === 'dark' ? 'rgba(220, 38, 38, 0.3)' : 'rgba(220, 38, 38, 0.2)'}`
                      }}
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  // User is not logged in - Mobile
                  <>
                    <Link href="/SignIn" 
                      className="px-5 py-3 rounded-full text-base font-semibold text-center transition-all duration-300 text-white border-0" 
                      style={{ backgroundColor: '#FF5E14' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FF5D13'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FF5E14'}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link href="/SignUp" 
                      className="px-5 py-3 rounded-full text-base font-semibold text-center transition-all duration-300 text-white border-0" 
                      style={{ backgroundColor: '#6366F1' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4F46E5'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6366F1'}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
