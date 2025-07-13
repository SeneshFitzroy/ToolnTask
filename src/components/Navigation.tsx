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

  // Close dropdowns and mobile menu when route changes
  useEffect(() => {
    const handleRouteChange = () => {
      setShowCreateDropdown(false);
      setShowProfileDropdown(false);
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

  // Add shine effect on button press
  const addShineEffect = (element: HTMLElement) => {
    element.classList.add('animate-shine');
    
    setTimeout(() => {
      element.classList.remove('animate-shine');
    }, 600);
  };

  if (!mounted) return null;

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
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0" onClick={() => {
            setShowCreateDropdown(false);
            setShowProfileDropdown(false);
            setMobileMenuOpen(false);
          }}>
            <Logo size="large" interactive={false} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-md nav-shine-effect ${isActiveLink('/') ? 'nav-active' : ''}`} 
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
                setShowCreateDropdown(false);
                setShowProfileDropdown(false);
                setMobileMenuOpen(false);
                addShineEffect(e.currentTarget);
              }}
            >
              Home
            </Link>
            <Link 
              href="/Tasks" 
              className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-md nav-shine-effect ${isActiveLink('/Tasks') ? 'nav-active' : ''}`} 
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
                setShowCreateDropdown(false);
                setShowProfileDropdown(false);
                setMobileMenuOpen(false);
                addShineEffect(e.currentTarget);
              }}
            >
              Tasks
            </Link>
            <Link 
              href="/Tools" 
              className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-md nav-shine-effect ${isActiveLink('/Tools') ? 'nav-active' : ''}`} 
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
                setShowCreateDropdown(false);
                setShowProfileDropdown(false);
                setMobileMenuOpen(false);
                addShineEffect(e.currentTarget);
              }}
            >
              Tools
            </Link>
            <Link 
              href="/About" 
              className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-md nav-shine-effect ${isActiveLink('/About') ? 'nav-active' : ''}`} 
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
                setShowCreateDropdown(false);
                setShowProfileDropdown(false);
                setMobileMenuOpen(false);
                addShineEffect(e.currentTarget);
              }}
            >
              About
            </Link>

            
            {/* Premium Create Button for authenticated users */}
            {user && (
              <div className="relative create-dropdown">
                <button
                  onClick={(e) => {
                    setShowCreateDropdown(!showCreateDropdown);
                    addShineEffect(e.currentTarget);
                  }}
                  className="px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 create-button"
                  style={{ 
                    background: 'linear-gradient(135deg, #FF5E14 0%, #FF7A3D 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    boxShadow: '0 4px 15px rgba(255, 94, 20, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #FF4A00 0%, #FF6829 100%)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 94, 20, 0.4)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #FF5E14 0%, #FF7A3D 100%)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 94, 20, 0.3)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Plus className="h-4 w-4" strokeWidth={2} />
                  <span>Create</span>
                  <ChevronDown 
                    className={`h-4 w-4 transition-transform duration-200 ${showCreateDropdown ? 'rotate-180' : 'rotate-0'}`}
                    strokeWidth={2}
                  />
                </button>
                
                {/* Clean Dropdown */}
                {showCreateDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-64 rounded-lg shadow-lg border z-50 overflow-hidden"
                       style={{ 
                         backgroundColor: theme === 'dark' ? '#1f1f1f' : '#FFFFFF',
                         borderColor: theme === 'dark' ? '#374151' : '#e5e7eb'
                       }}>
                    
                    <div className="p-4 border-b" style={{ 
                      borderColor: theme === 'dark' ? '#374151' : '#e5e7eb'
                    }}>
                      <h3 className="font-semibold text-sm" style={{ color: theme === 'dark' ? '#e5e7eb' : '#374151' }}>
                        Create New Listing
                      </h3>
                      <p className="text-xs mt-1" style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
                        Choose what you want to create
                      </p>
                    </div>
                    
                    <Link 
                      href="/CreateTool"
                      className="flex items-center gap-3 px-4 py-3 transition-colors duration-200 border-b"
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
                      onClick={() => setShowCreateDropdown(false)}
                    >
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                           style={{ backgroundColor: '#FF5E14' }}>
                        <Wrench className="h-5 w-5 text-white" strokeWidth={2} />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Create Tool Listing</h4>
                        <p className="text-xs" style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
                          List your tools for rent or sale
                        </p>
                      </div>
                    </Link>
                    
                    <Link 
                      href="/CreateTask"
                      className="flex items-center gap-3 px-4 py-3 transition-colors duration-200"
                      style={{ color: theme === 'dark' ? '#e5e7eb' : '#374151' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = theme === 'dark' ? '#2a2a2a' : '#f9fafb';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                      onClick={() => setShowCreateDropdown(false)}
                    >
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                           style={{ backgroundColor: '#6366F1' }}>
                        <ClipboardList className="h-5 w-5 text-white" strokeWidth={2} />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Create Task</h4>
                        <p className="text-xs" style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
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
          <div className="flex items-center space-x-4 flex-shrink-0">
            {/* Auth Buttons - Hidden on small screens */}
            <div className="hidden sm:flex items-center space-x-4">
              {user ? (
                // User is logged in - Premium Profile Button
                <div className="relative profile-dropdown">
                  <button
                    onClick={(e) => {
                      setShowProfileDropdown(!showProfileDropdown);
                      addShineEffect(e.currentTarget);
                    }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 profile-button" 
                    style={{ 
                      color: theme === 'dark' ? '#e5e7eb' : '#374151',
                      backgroundColor: theme === 'dark' ? '#2a2a2a' : '#f9fafb',
                      border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = theme === 'dark' ? '#333333' : '#f3f4f6';
                      e.currentTarget.style.borderColor = '#FF5E14';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 94, 20, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = theme === 'dark' ? '#2a2a2a' : '#f9fafb';
                      e.currentTarget.style.borderColor = theme === 'dark' ? '#374151' : '#e5e7eb';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                    }}
                  >
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-semibold shadow-sm" 
                         style={{ backgroundColor: '#FF5E14' }}>
                      {user.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <ChevronDown 
                      className={`h-4 w-4 transition-transform duration-200 ${showProfileDropdown ? 'rotate-180' : 'rotate-0'}`}
                      strokeWidth={2}
                    />
                  </button>
                  
                  {/* Clean Profile Dropdown */}
                  {showProfileDropdown && (
                    <div className="absolute right-0 top-full mt-2 w-44 rounded-lg shadow-lg border z-50 overflow-hidden"
                         style={{ 
                           backgroundColor: theme === 'dark' ? '#1f1f1f' : '#FFFFFF',
                           borderColor: theme === 'dark' ? '#374151' : '#e5e7eb'
                         }}>
                      
                      <Link 
                        href="/Profile"
                        className="flex items-center gap-3 px-4 py-3 transition-colors duration-200 border-b"
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
                        <UserIcon className="h-4 w-4" />
                        <span className="font-medium text-sm">Profile</span>
                      </Link>
                      
                      <button 
                        onClick={() => {
                          handleSignOut();
                          setShowProfileDropdown(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 transition-colors duration-200 text-sm"
                        style={{ color: '#dc2626' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = theme === 'dark' ? '#2a2a2a' : '#fef2f2';
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
                // User is not logged in - Premium Account Button
                <div className="relative profile-dropdown">
                  <button
                    onClick={(e) => {
                      setShowProfileDropdown(!showProfileDropdown);
                      addShineEffect(e.currentTarget);
                    }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 profile-button"
                    style={{ 
                      color: theme === 'dark' ? '#e5e7eb' : '#374151',
                      backgroundColor: theme === 'dark' ? '#2a2a2a' : '#f9fafb',
                      border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = theme === 'dark' ? '#333333' : '#f3f4f6';
                      e.currentTarget.style.borderColor = '#FF5E14';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 94, 20, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = theme === 'dark' ? '#2a2a2a' : '#f9fafb';
                      e.currentTarget.style.borderColor = theme === 'dark' ? '#374151' : '#e5e7eb';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                    }}
                  >
                    <UserIcon className="h-4 w-4" />
                    <span className="font-medium">Account</span>
                    <ChevronDown 
                      className={`h-4 w-4 transition-transform duration-200 ${showProfileDropdown ? 'rotate-180' : 'rotate-0'}`}
                      strokeWidth={2}
                    />
                  </button>
                  
                  {/* Clean Profile Dropdown for unauthenticated users */}
                  {showProfileDropdown && (
                    <div className="absolute right-0 top-full mt-2 w-44 rounded-lg shadow-lg border z-50 overflow-hidden"
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
                        <UserIcon className="h-4 w-4" />
                        <span className="font-medium">Login</span>
                      </Link>
                      
                      <Link 
                        href="/SignUp"
                        className="flex items-center gap-3 px-4 py-3 transition-colors duration-200 text-sm"
                        style={{ color: theme === 'dark' ? '#e5e7eb' : '#374151' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = theme === 'dark' ? '#2a2a2a' : '#f9fafb';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        <UserIcon className="h-4 w-4" />
                        <span className="font-medium">Register</span>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={(e) => {
                setMobileMenuOpen(!mobileMenuOpen);
                addShineEffect(e.currentTarget);
              }}
              className="lg:hidden p-2 rounded-lg transition-colors duration-200 nav-shine-effect"
              style={{ 
                backgroundColor: theme === 'dark' ? '#2a2a2a' : '#f9fafb',
                border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`
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

        {/* Clean Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t" style={{ borderColor: theme === 'dark' ? '#374151' : '#e5e7eb' }}>
            <div className="flex flex-col space-y-2">
              <Link 
                href="/" 
                className={`px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-md nav-shine-effect ${isActiveLink('/') ? 'nav-active' : ''}`} 
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
                className={`px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-md nav-shine-effect ${isActiveLink('/Tasks') ? 'nav-active' : ''}`} 
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
                className={`px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-md nav-shine-effect ${isActiveLink('/Tools') ? 'nav-active' : ''}`} 
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
                className={`px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-md nav-shine-effect ${isActiveLink('/About') ? 'nav-active' : ''}`} 
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
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-md nav-shine-effect"
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
                      className="block px-4 py-3 text-sm font-semibold text-center transition-colors duration-200 rounded-lg text-white nav-shine-effect" 
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
                      className="block px-4 py-3 text-sm font-semibold text-center transition-colors duration-200 rounded-lg nav-shine-effect" 
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
