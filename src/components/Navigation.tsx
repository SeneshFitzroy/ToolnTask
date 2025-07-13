import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { Menu, X, Plus, Wrench, ClipboardList, ChevronDown, User as UserIcon, LogOut, Bell, Bookmark } from 'lucide-react';
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
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [notificationCount, setNotificationCount] = useState(3); // Mock notification count

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
      if (!target.closest('.notifications-dropdown')) {
        setShowNotifications(false);
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
      setShowNotifications(false);
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
              className="px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-md shine-effect" 
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
              className="px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-md shine-effect" 
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
              className="px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-md shine-effect" 
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
                  className="px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 shine-effect"
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
                <div className="flex items-center space-x-3">
                  {/* Notification Button */}
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        setShowNotificationDropdown(!showNotificationDropdown);
                        addShineEffect(e.currentTarget);
                      }}
                      className="shine-effect relative p-2 rounded-lg transition-all duration-200 border"
                      style={{
                        backgroundColor: theme === 'dark' ? '#2a2a2a' : '#f9fafb',
                        borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
                        color: theme === 'dark' ? '#e5e7eb' : '#374151'
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
                      <div className="relative">
                        <Bell className="h-4 w-4" />
                        {notificationCount > 0 && (
                          <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                            {notificationCount > 9 ? '9+' : notificationCount}
                          </span>
                        )}
                      </div>
                    </button>

                    {/* Notification Dropdown */}
                    {showNotificationDropdown && (
                      <div className="absolute right-0 top-full mt-2 w-80 rounded-lg shadow-lg border z-50 overflow-hidden"
                           style={{ 
                             backgroundColor: theme === 'dark' ? '#1f1f1f' : '#FFFFFF',
                             borderColor: theme === 'dark' ? '#374151' : '#e5e7eb'
                           }}>
                        <div className="p-4 border-b" style={{ 
                          borderColor: theme === 'dark' ? '#374151' : '#e5e7eb'
                        }}>
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg" style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}>
                              Notifications
                            </h3>
                            {notificationCount > 0 && (
                              <button 
                                className="text-xs px-2 py-1 rounded-md hover:bg-opacity-80 transition-colors"
                                style={{ color: '#FF5E14', backgroundColor: 'rgba(255, 94, 20, 0.1)' }}
                              >
                                Mark all read
                              </button>
                            )}
                          </div>
                        </div>
                        
                        <div className="max-h-80 overflow-y-auto">
                          {/* AI/ML Generated Notifications */}
                          <div className="p-4 border-b hover:bg-opacity-50 transition-colors cursor-pointer"
                               style={{ 
                                 borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
                                 backgroundColor: 'transparent'
                               }}
                               onMouseEnter={(e) => {
                                 e.currentTarget.style.backgroundColor = theme === 'dark' ? '#2a2a2a' : '#f9fafb';
                               }}
                               onMouseLeave={(e) => {
                                 e.currentTarget.style.backgroundColor = 'transparent';
                               }}>
                            <div className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              <div className="flex-1">
                                <p className="text-sm font-medium" style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}>
                                  🤖 AI Tool Match Found
                                </p>
                                <p className="text-xs mt-1" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                                  Based on your recent search, we found a power drill available nearby that matches your criteria.
                                </p>
                                <p className="text-xs mt-1 font-medium" style={{ color: '#FF5E14' }}>
                                  View recommendation →
                                </p>
                                <p className="text-xs mt-1" style={{ color: theme === 'dark' ? '#64748b' : '#9ca3af' }}>
                                  5 minutes ago
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="p-4 border-b hover:bg-opacity-50 transition-colors cursor-pointer"
                               style={{ 
                                 borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
                                 backgroundColor: 'transparent'
                               }}
                               onMouseEnter={(e) => {
                                 e.currentTarget.style.backgroundColor = theme === 'dark' ? '#2a2a2a' : '#f9fafb';
                               }}
                               onMouseLeave={(e) => {
                                 e.currentTarget.style.backgroundColor = 'transparent';
                               }}>
                            <div className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                              <div className="flex-1">
                                <p className="text-sm font-medium" style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}>
                                  🎯 Smart Task Suggestion
                                </p>
                                <p className="text-xs mt-1" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                                  AI detected demand for house cleaning services in your area. Consider posting a task!
                                </p>
                                <p className="text-xs mt-1 font-medium" style={{ color: '#FF5E14' }}>
                                  Create task →
                                </p>
                                <p className="text-xs mt-1" style={{ color: theme === 'dark' ? '#64748b' : '#9ca3af' }}>
                                  1 hour ago
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="p-4 border-b hover:bg-opacity-50 transition-colors cursor-pointer"
                               style={{ 
                                 borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
                                 backgroundColor: 'transparent'
                               }}
                               onMouseEnter={(e) => {
                                 e.currentTarget.style.backgroundColor = theme === 'dark' ? '#2a2a2a' : '#f9fafb';
                               }}
                               onMouseLeave={(e) => {
                                 e.currentTarget.style.backgroundColor = 'transparent';
                               }}>
                            <div className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                              <div className="flex-1">
                                <p className="text-sm font-medium" style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}>
                                  📩 New Request
                                </p>
                                <p className="text-xs mt-1" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                                  Someone is interested in renting your lawn mower for this weekend.
                                </p>
                                <p className="text-xs mt-1 font-medium" style={{ color: '#FF5E14' }}>
                                  View request →
                                </p>
                                <p className="text-xs mt-1" style={{ color: theme === 'dark' ? '#64748b' : '#9ca3af' }}>
                                  2 hours ago
                                </p>
                              </div>
                            </div>
                          </div>

                          {notificationCount === 0 && (
                            <div className="p-8 text-center">
                              <Bell className="h-12 w-12 mx-auto mb-3 opacity-30" style={{ color: theme === 'dark' ? '#94a3b8' : '#9ca3af' }} />
                              <p className="text-sm" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                                No new notifications
                              </p>
                              <p className="text-xs mt-1" style={{ color: theme === 'dark' ? '#64748b' : '#9ca3af' }}>
                                We&apos;ll notify you when something important happens
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* User Profile Button */}
                  <div className="relative profile-dropdown">
                  <button
                    onClick={(e) => {
                      setShowProfileDropdown(!showProfileDropdown);
                      addShineEffect(e.currentTarget);
                    }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 shine-effect" 
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
                        <span className="font-medium text-sm">Profile & Settings</span>
                      </Link>

                      {/* Notifications Button */}
                      <div className="relative notifications-dropdown">
                        <button
                          onClick={() => {
                            setShowNotifications(!showNotifications);
                            setNotificationCount(0); // Clear count when opened
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 transition-colors duration-200 border-b"
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
                        >
                          <div className="relative">
                            <Bell className="h-4 w-4" />
                            {notificationCount > 0 && (
                              <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                {notificationCount}
                              </span>
                            )}
                          </div>
                          <span className="font-medium text-sm">Notifications</span>
                        </button>

                        {/* Notifications Dropdown */}
                        {showNotifications && (
                          <div className="absolute right-0 top-0 mt-0 mr-56 w-80 rounded-lg shadow-lg border z-50 overflow-hidden"
                               style={{ 
                                 backgroundColor: theme === 'dark' ? '#1f1f1f' : '#FFFFFF',
                                 borderColor: theme === 'dark' ? '#374151' : '#e5e7eb'
                               }}>
                            <div className="p-4 border-b" style={{ 
                              borderColor: theme === 'dark' ? '#374151' : '#e5e7eb'
                            }}>
                              <h3 className="font-semibold text-lg" style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}>
                                Notifications
                              </h3>
                            </div>
                            
                            <div className="max-h-64 overflow-y-auto">
                              {/* Mock notifications */}
                              <div className="p-4 border-b hover:bg-opacity-50 transition-colors"
                                   style={{ 
                                     borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
                                     backgroundColor: 'transparent'
                                   }}
                                   onMouseEnter={(e) => {
                                     e.currentTarget.style.backgroundColor = theme === 'dark' ? '#2a2a2a' : '#f9fafb';
                                   }}
                                   onMouseLeave={(e) => {
                                     e.currentTarget.style.backgroundColor = 'transparent';
                                   }}>
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                  <div>
                                    <p className="text-sm font-medium" style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}>
                                      New tool rental request
                                    </p>
                                    <p className="text-xs" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                                      Someone is interested in your power drill
                                    </p>
                                    <p className="text-xs mt-1" style={{ color: theme === 'dark' ? '#64748b' : '#9ca3af' }}>
                                      5 minutes ago
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="p-4 border-b hover:bg-opacity-50 transition-colors"
                                   style={{ 
                                     borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
                                     backgroundColor: 'transparent'
                                   }}
                                   onMouseEnter={(e) => {
                                     e.currentTarget.style.backgroundColor = theme === 'dark' ? '#2a2a2a' : '#f9fafb';
                                   }}
                                   onMouseLeave={(e) => {
                                     e.currentTarget.style.backgroundColor = 'transparent';
                                   }}>
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                  <div>
                                    <p className="text-sm font-medium" style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}>
                                      Task completed successfully
                                    </p>
                                    <p className="text-xs" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                                      Your house cleaning task has been completed
                                    </p>
                                    <p className="text-xs mt-1" style={{ color: theme === 'dark' ? '#64748b' : '#9ca3af' }}>
                                      1 hour ago
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="p-4 hover:bg-opacity-50 transition-colors"
                                   style={{ 
                                     backgroundColor: 'transparent'
                                   }}
                                   onMouseEnter={(e) => {
                                     e.currentTarget.style.backgroundColor = theme === 'dark' ? '#2a2a2a' : '#f9fafb';
                                   }}
                                   onMouseLeave={(e) => {
                                     e.currentTarget.style.backgroundColor = 'transparent';
                                   }}>
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                                  <div>
                                    <p className="text-sm font-medium" style={{ color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}>
                                      New message received
                                    </p>
                                    <p className="text-xs" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                                      AI assistant has suggestions for your request
                                    </p>
                                    <p className="text-xs mt-1" style={{ color: theme === 'dark' ? '#64748b' : '#9ca3af' }}>
                                      2 hours ago
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <Link 
                        href="/saved-gigs"
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
                        <Bookmark className="h-4 w-4" />
                        <span className="font-medium text-sm">Saved Gigs</span>
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
                </div>
              ) : (
                // User is not logged in - Premium Account Button
                <div className="relative profile-dropdown">
                  <button
                    onClick={(e) => {
                      setShowProfileDropdown(!showProfileDropdown);
                      addShineEffect(e.currentTarget);
                    }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 shine-effect"
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
              className="lg:hidden p-2 rounded-lg transition-colors duration-200 shine-effect"
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
                className="px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-md shine-effect" 
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
                className="px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-md shine-effect" 
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
                className="px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-md shine-effect" 
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
                className="px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-md shine-effect" 
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
