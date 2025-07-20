import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { Menu, X, Wrench, ClipboardList, ChevronDown, User as UserIcon, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { auth } from '../lib/firebase';
import { signOut, onAuthStateChanged, User } from 'firebase/auth';
import Logo from './Logo';
import LanguageSelector from './LanguageSelector';

const Navigation = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showCreateDropdown, setShowCreateDropdown] = useState(false);
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
      if (!target.closest('.profile-dropdown')) {
        setShowProfileDropdown(false);
      }
      if (!target.closest('.create-dropdown')) {
        setShowCreateDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      unsubscribe();
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close dropdowns and mobile menu when route changes
  useEffect(() => {
    const handleRouteChange = () => {
      setShowProfileDropdown(false);
      setShowCreateDropdown(false);
      setMobileMenuOpen(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

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

  // Simple shine effect
  const addShineEffect = (element: HTMLElement) => {
    element.classList.add('animate');
    setTimeout(() => {
      element.classList.remove('animate');
    }, 600);
  };

  if (!mounted) {
    return null;
  }

  return (
    <nav 
      className="shadow-sm sticky top-0 z-50 border-b transition-colors duration-200" 
      style={{ 
        backgroundColor: theme === 'dark' ? '#0f0f0f' : '#FFFFFF', 
        borderColor: theme === 'dark' ? '#2a2a2a' : '#e5e7eb' 
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Extra Large with Marketplace Slogan Positioned Right */}
          <Link href="/" className="flex flex-col items-start flex-shrink-0 py-2" onClick={() => {
            setShowProfileDropdown(false);
            setShowCreateDropdown(false);
            setMobileMenuOpen(false);
          }}>
            <Logo size="xl" interactive={false} />
            <span className="text-xs font-medium -mt-1 ml-8 opacity-80" style={{ color: theme === 'dark' ? '#e5e7eb' : '#374151' }}>
              Community Marketplace
            </span>
          </Link>

          {/* Desktop Navigation - Extra Large Professional Buttons */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link 
              href="/" 
              className="px-5 py-3 text-lg font-semibold transition-colors duration-200 rounded-lg shine-effect" 
              style={{ 
                color: isActiveLink('/') ? '#FF5E14' : (theme === 'dark' ? '#e5e7eb' : '#374151'),
                backgroundColor: isActiveLink('/') ? (theme === 'dark' ? 'rgba(255, 94, 20, 0.1)' : 'rgba(255, 94, 20, 0.05)') : 'transparent'
              }} 
              onMouseEnter={(e) => {
                if (!isActiveLink('/')) {
                  e.currentTarget.style.color = '#FF5E14';
                  e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255, 94, 20, 0.05)' : 'rgba(255, 94, 20, 0.03)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActiveLink('/')) {
                  e.currentTarget.style.color = theme === 'dark' ? '#e5e7eb' : '#374151';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
              onClick={(e) => {
                setShowProfileDropdown(false);
                setShowCreateDropdown(false);
                setMobileMenuOpen(false);
                addShineEffect(e.currentTarget);
              }}
            >
              Home
            </Link>
            <Link 
              href="/Tasks" 
              className="px-5 py-3 text-lg font-semibold transition-colors duration-200 rounded-lg shine-effect" 
              style={{ 
                color: isActiveLink('/Tasks') ? '#FF5E14' : (theme === 'dark' ? '#e5e7eb' : '#374151'),
                backgroundColor: isActiveLink('/Tasks') ? (theme === 'dark' ? 'rgba(255, 94, 20, 0.1)' : 'rgba(255, 94, 20, 0.05)') : 'transparent'
              }} 
              onMouseEnter={(e) => {
                if (!isActiveLink('/Tasks')) {
                  e.currentTarget.style.color = '#FF5E14';
                  e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255, 94, 20, 0.05)' : 'rgba(255, 94, 20, 0.03)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActiveLink('/Tasks')) {
                  e.currentTarget.style.color = theme === 'dark' ? '#e5e7eb' : '#374151';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
              onClick={(e) => {
                setShowProfileDropdown(false);
                setShowCreateDropdown(false);
                setMobileMenuOpen(false);
                addShineEffect(e.currentTarget);
              }}
            >
              Tasks
            </Link>
            <Link 
              href="/Tools" 
              className="px-5 py-3 text-lg font-semibold transition-colors duration-200 rounded-lg shine-effect" 
              style={{ 
                color: isActiveLink('/Tools') ? '#FF5E14' : (theme === 'dark' ? '#e5e7eb' : '#374151'),
                backgroundColor: isActiveLink('/Tools') ? (theme === 'dark' ? 'rgba(255, 94, 20, 0.1)' : 'rgba(255, 94, 20, 0.05)') : 'transparent'
              }} 
              onMouseEnter={(e) => {
                if (!isActiveLink('/Tools')) {
                  e.currentTarget.style.color = '#FF5E14';
                  e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255, 94, 20, 0.05)' : 'rgba(255, 94, 20, 0.03)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActiveLink('/Tools')) {
                  e.currentTarget.style.color = theme === 'dark' ? '#e5e7eb' : '#374151';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
              onClick={(e) => {
                setShowProfileDropdown(false);
                setShowCreateDropdown(false);
                setMobileMenuOpen(false);
                addShineEffect(e.currentTarget);
              }}
            >
              Tools
            </Link>
            <Link 
              href="/About" 
              className="px-5 py-3 text-lg font-semibold transition-colors duration-200 rounded-lg shine-effect" 
              style={{ 
                color: isActiveLink('/About') ? '#FF5E14' : (theme === 'dark' ? '#e5e7eb' : '#374151'),
                backgroundColor: isActiveLink('/About') ? (theme === 'dark' ? 'rgba(255, 94, 20, 0.1)' : 'rgba(255, 94, 20, 0.05)') : 'transparent'
              }} 
              onMouseEnter={(e) => {
                if (!isActiveLink('/About')) {
                  e.currentTarget.style.color = '#FF5E14';
                  e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255, 94, 20, 0.05)' : 'rgba(255, 94, 20, 0.03)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActiveLink('/About')) {
                  e.currentTarget.style.color = theme === 'dark' ? '#e5e7eb' : '#374151';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
              onClick={(e) => {
                setShowProfileDropdown(false);
                setShowCreateDropdown(false);
                setMobileMenuOpen(false);
                addShineEffect(e.currentTarget);
              }}
            >
              About
            </Link>

            {/* Create CTA Button for logged-in users - Made smaller */}
            {user && (
              <div className="relative create-dropdown">
                <button
                  onClick={(e) => {
                    setShowCreateDropdown(!showCreateDropdown);
                    setShowProfileDropdown(false);
                    addShineEffect(e.currentTarget);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 shine-effect"
                  style={{ 
                    backgroundColor: '#FF5E14',
                    color: '#FFFFFF',
                    boxShadow: '0 4px 16px rgba(255, 94, 20, 0.4)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#E54D0F';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 94, 20, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FF5E14';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(255, 94, 20, 0.4)';
                  }}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Create</span>
                  <ChevronDown 
                    className={`h-6 w-6 transition-transform duration-200 ${showCreateDropdown ? 'rotate-180' : 'rotate-0'}`}
                    strokeWidth={2}
                  />
                </button>

                {/* Create Dropdown */}
                {showCreateDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-lg shadow-lg border z-50 overflow-hidden"
                       style={{ 
                         backgroundColor: theme === 'dark' ? '#1f1f1f' : '#FFFFFF',
                         borderColor: theme === 'dark' ? '#374151' : '#e5e7eb'
                       }}>
                    
                    <div className="p-2">
                      <Link 
                        href="/CreateTask"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200"
                        style={{ 
                          color: theme === 'dark' ? '#e5e7eb' : '#374151'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = theme === 'dark' ? '#2a2a2a' : '#f9fafb';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                        onClick={() => setShowCreateDropdown(false)}
                      >
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#6366F1' }}>
                          <ClipboardList className="h-5 w-5 text-white" strokeWidth={2} />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">Create Task</p>
                          <p className="text-xs opacity-75">Post a job for others</p>
                        </div>
                      </Link>
                      
                      <Link 
                        href="/CreateTool"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200"
                        style={{ 
                          color: theme === 'dark' ? '#e5e7eb' : '#374151'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = theme === 'dark' ? '#2a2a2a' : '#f9fafb';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                        onClick={() => setShowCreateDropdown(false)}
                      >
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FF5E14' }}>
                          <Wrench className="h-5 w-5 text-white" strokeWidth={2} />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">Create Tool Listing</p>
                          <p className="text-xs opacity-75">List your tools for rent</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right side - 90% Zoom Optimized Auth buttons */}
          <div className="flex items-center space-x-5 flex-shrink-0">
            {/* Language Selector */}
            <div className="hidden sm:block">
              <LanguageSelector />
            </div>
            
            {/* Auth Buttons - Hidden on small screens */}
            <div className="hidden sm:flex items-center space-x-5">
              {user ? (
                <div className="flex items-center space-x-4">
                  {/* User Profile Button - Small Orange Matching Navbar */}
                  {/* User Profile Button - Compact Orange with Gold Border */}
                  <div className="relative profile-dropdown">
                  <button
                    onClick={(e) => {
                      setShowProfileDropdown(!showProfileDropdown);
                      addShineEffect(e.currentTarget);
                    }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shine-effect" 
                    style={{ 
                      color: '#FFFFFF',
                      backgroundColor: '#FF5E14',
                      border: '2px solid #FFD700',
                      boxShadow: '0 3px 10px rgba(255, 94, 20, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#E54D0F';
                      e.currentTarget.style.borderColor = '#FFC107';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 5px 15px rgba(255, 94, 20, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#FF5E14';
                      e.currentTarget.style.borderColor = '#FFD700';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 3px 10px rgba(255, 94, 20, 0.3)';
                    }}
                    title="Account"
                  >
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold" 
                         style={{ backgroundColor: 'rgba(255, 255, 255, 0.25)' }}>
                      {user.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span className="text-sm font-semibold text-white">
                      Account
                    </span>
                    <ChevronDown 
                      className={`h-4 w-4 transition-transform duration-200 ${showProfileDropdown ? 'rotate-180' : 'rotate-0'}`}
                      strokeWidth={2}
                    />
                  </button>
                  
                  {/* Enhanced Profile Dropdown */}
                  {showProfileDropdown && (
                    <div className="absolute right-0 top-full mt-2 w-56 rounded-lg shadow-lg border z-50 overflow-hidden"
                         style={{ 
                           backgroundColor: theme === 'dark' ? '#1f1f1f' : '#FFFFFF',
                           borderColor: theme === 'dark' ? '#374151' : '#e5e7eb'
                         }}>
                      
                      {/* User Info Header */}
                      <div className="p-4 border-b" style={{ 
                        borderColor: theme === 'dark' ? '#374151' : '#e5e7eb'
                      }}>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold" 
                               style={{ backgroundColor: '#FF5E14' }}>
                            {user.email?.charAt(0).toUpperCase() || 'U'}
                          </div>
                          <div>
                            <p className="font-medium text-sm" style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}>
                              {user.displayName || 'User'}
                            </p>
                            <p className="text-xs" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      <Link 
                        href="/Profile"
                        className="flex items-center gap-3 px-4 py-3 transition-colors duration-200"
                        style={{ 
                          color: theme === 'dark' ? '#e5e7eb' : '#374151'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = theme === 'dark' ? '#2a2a2a' : '#f9fafb';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        <UserIcon className="h-4 w-4" />
                        <span className="font-medium text-sm">Profile & Settings</span>
                      </Link>
                    </div>
                  )}
                </div>
                </div>
              ) : (
                // User is not logged in - Compact Orange Account Button with Gold Border
                <div className="relative profile-dropdown">
                  <button
                    onClick={(e) => {
                      setShowProfileDropdown(!showProfileDropdown);
                      addShineEffect(e.currentTarget);
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shine-effect"
                    style={{ 
                      color: '#FFFFFF',
                      backgroundColor: '#FF5E14',
                      border: '2px solid #FFD700',
                      boxShadow: '0 3px 10px rgba(255, 94, 20, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#E54D0F';
                      e.currentTarget.style.borderColor = '#FFC107';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 5px 15px rgba(255, 94, 20, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#FF5E14';
                      e.currentTarget.style.borderColor = '#FFD700';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 3px 10px rgba(255, 94, 20, 0.3)';
                    }}
                  >
                    <UserIcon className="h-4 w-4" />
                    <span className="font-semibold">Account</span>
                    <ChevronDown 
                      className={`h-4 w-4 transition-transform duration-200 ${showProfileDropdown ? 'rotate-180' : 'rotate-0'}`}
                      strokeWidth={2}
                    />
                  </button>
                  
                  {/* Enhanced Profile Dropdown for unauthenticated users */}
                  {showProfileDropdown && (
                    <div className="absolute right-0 top-full mt-2 w-56 rounded-lg shadow-lg border z-50 overflow-hidden"
                         style={{ 
                           backgroundColor: theme === 'dark' ? '#1f1f1f' : '#FFFFFF',
                           borderColor: theme === 'dark' ? '#374151' : '#e5e7eb'
                         }}>
                      
                      <Link 
                        href="/SignIn"
                        className="flex items-center gap-3 px-4 py-3 transition-colors duration-200 border-b text-sm"
                        style={{ 
                          color: theme === 'dark' ? '#e5e7eb' : '#374151',
                          borderColor: theme === 'dark' ? '#374151' : '#e5e7eb'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = theme === 'dark' ? '#2a2a2a' : '#f9fafb';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        <UserIcon className="h-5 w-5" />
                        <span className="font-semibold">Login</span>
                      </Link>
                      
                      <Link 
                        href="/SignUp"
                        className="flex items-center gap-4 px-5 py-4 transition-colors duration-200 text-base"
                        style={{ color: theme === 'dark' ? '#e5e7eb' : '#374151' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = theme === 'dark' ? '#2a2a2a' : '#f9fafb';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        <UserIcon className="h-5 w-5" />
                        <span className="font-semibold">Register</span>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button - Compact */}
            <button
              onClick={(e) => {
                setMobileMenuOpen(!mobileMenuOpen);
                addShineEffect(e.currentTarget);
              }}
              className="lg:hidden p-2 rounded-lg transition-colors duration-200 shine-effect"
              style={{ 
                backgroundColor: theme === 'dark' ? '#1f2937' : '#f8fafc',
                border: `1px solid ${theme === 'dark' ? '#374151' : '#e2e8f0'}`
              }}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" style={{ color: theme === 'dark' ? '#e5e7eb' : '#374151' }} />
              ) : (
                <Menu className="h-5 w-5" style={{ color: theme === 'dark' ? '#e5e7eb' : '#374151' }} />
              )}
            </button>
          </div>
        </div>

        {/* 90% Zoom Optimized Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-5 border-t" style={{ borderColor: theme === 'dark' ? '#374151' : '#e5e7eb' }}>
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="px-6 py-5 text-lg font-semibold transition-colors duration-200 rounded-lg shine-effect" 
                style={{ 
                  color: isActiveLink('/') ? '#FF5E14' : (theme === 'dark' ? '#e5e7eb' : '#374151'),
                  backgroundColor: isActiveLink('/') ? (theme === 'dark' ? 'rgba(255, 94, 20, 0.1)' : 'rgba(255, 94, 20, 0.05)') : 'transparent'
                }} 
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  addShineEffect(e.currentTarget);
                }}
              >
                Home
              </Link>
              <Link 
                href="/Tasks" 
                className="px-5 py-4 text-base font-semibold transition-colors duration-200 rounded-lg shine-effect" 
                style={{ 
                  color: isActiveLink('/Tasks') ? '#FF5E14' : (theme === 'dark' ? '#e5e7eb' : '#374151'),
                  backgroundColor: isActiveLink('/Tasks') ? (theme === 'dark' ? 'rgba(255, 94, 20, 0.1)' : 'rgba(255, 94, 20, 0.05)') : 'transparent'
                }} 
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  addShineEffect(e.currentTarget);
                }}
              >
                Tasks
              </Link>
              <Link 
                href="/Tools" 
                className="px-6 py-5 text-lg font-semibold transition-colors duration-200 rounded-lg shine-effect" 
                style={{ 
                  color: isActiveLink('/Tools') ? '#FF5E14' : (theme === 'dark' ? '#e5e7eb' : '#374151'),
                  backgroundColor: isActiveLink('/Tools') ? (theme === 'dark' ? 'rgba(255, 94, 20, 0.1)' : 'rgba(255, 94, 20, 0.05)') : 'transparent'
                }} 
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  addShineEffect(e.currentTarget);
                }}
              >
                Tools
              </Link>
              <Link 
                href="/About" 
                className="px-6 py-5 text-lg font-semibold transition-colors duration-200 rounded-lg shine-effect" 
                style={{ 
                  color: isActiveLink('/About') ? '#FF5E14' : (theme === 'dark' ? '#e5e7eb' : '#374151'),
                  backgroundColor: isActiveLink('/About') ? (theme === 'dark' ? 'rgba(255, 94, 20, 0.1)' : 'rgba(255, 94, 20, 0.05)') : 'transparent'
                }} 
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  addShineEffect(e.currentTarget);
                }}
              >
                About
              </Link>

              {/* Mobile Create Options */}
              {user && (
                <div className="pt-4 border-t mt-4" style={{ borderColor: theme === 'dark' ? '#374151' : '#e5e7eb' }}>
                  <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wide" style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
                    Create
                  </p>
                  <Link 
                    href="/CreateTool"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-md"
                    style={{ color: theme === 'dark' ? '#e5e7eb' : '#374151' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = theme === 'dark' ? '#2a2a2a' : '#f9fafb';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FF5E14' }}>
                      <Wrench className="h-4 w-4 text-white" strokeWidth={2} />
                    </div>
                    <span>Create Tool Listing</span>
                  </Link>
                  <Link 
                    href="/CreateTask"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-md"
                    style={{ color: theme === 'dark' ? '#e5e7eb' : '#374151' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = theme === 'dark' ? '#2a2a2a' : '#f9fafb';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#6366F1' }}>
                      <ClipboardList className="h-4 w-4 text-white" strokeWidth={2} />
                    </div>
                    <span>Create Task</span>
                  </Link>
                </div>
              )}
              
              {/* Mobile Auth */}
              <div className="pt-4 border-t mt-4" style={{ borderColor: theme === 'dark' ? '#374151' : '#e5e7eb' }}>
                {user ? (
                  <div className="space-y-2">
                    <Link 
                      href="/Profile"
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-md shine-effect"
                      style={{ color: theme === 'dark' ? '#e5e7eb' : '#374151' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = theme === 'dark' ? '#2a2a2a' : '#f9fafb';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                      onClick={(e) => {
                        setMobileMenuOpen(false);
                        addShineEffect(e.currentTarget);
                      }}
                    >
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-semibold" 
                           style={{ backgroundColor: '#FF5E14' }}>
                        {user.email?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <span>Profile</span>
                    </Link>
                    <button 
                      onClick={() => {
                        handleSignOut();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-md text-left"
                      style={{ color: '#dc2626' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = theme === 'dark' ? '#2a2a2a' : '#fef2f2';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link 
                      href="/SignIn" 
                      className="block px-4 py-3 text-sm font-semibold text-center transition-colors duration-200 rounded-lg text-white shine-effect" 
                      style={{ backgroundColor: '#FF5E14' }}
                      onClick={(e) => {
                        setMobileMenuOpen(false);
                        addShineEffect(e.currentTarget);
                      }}
                    >
                      Login
                    </Link>
                    <Link 
                      href="/SignUp" 
                      className="block px-4 py-3 text-sm font-semibold text-center transition-colors duration-200 rounded-lg shine-effect" 
                      style={{ 
                        color: '#FF5E14',
                        backgroundColor: theme === 'dark' ? 'rgba(255, 94, 20, 0.1)' : 'rgba(255, 94, 20, 0.05)',
                        border: `1px solid ${theme === 'dark' ? 'rgba(255, 94, 20, 0.3)' : 'rgba(255, 94, 20, 0.2)'}`
                      }}
                      onClick={(e) => {
                        setMobileMenuOpen(false);
                        addShineEffect(e.currentTarget);
                      }}
                    >
                      Register
                    </Link>
                  </div>
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
