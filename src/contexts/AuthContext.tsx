import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  initials: string;
  memberSince: string;
  rating: number;
  reviewCount: number;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Mock user for demonstration
  const mockUser: User = {
    id: '1',
    name: 'John Silva',
    email: 'john.silva@example.com',
    initials: 'JS',
    memberSince: 'January 2024',
    rating: 4.8,
    reviewCount: 24
  };

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('toolntask_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (_email: string, _password: string): Promise<void> => {
    // Mock login - in a real app, this would be an API call
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, any email/password combination will work
      setUser(mockUser);
      setIsLoggedIn(true);
      localStorage.setItem('toolntask_user', JSON.stringify(mockUser));
    } catch (_error) {
      throw new Error('Login failed');
    }
  };

  const signup = async (name: string, _email: string, _password: string): Promise<void> => {
    // Mock signup - in a real app, this would be an API call
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        ...mockUser,
        name,
        email: _email,
        initials: name.split(' ').map(n => n[0]).join('').toUpperCase()
      };
      
      setUser(newUser);
      setIsLoggedIn(true);
      localStorage.setItem('toolntask_user', JSON.stringify(newUser));
    } catch (_error) {
      throw new Error('Signup failed');
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('toolntask_user');
  };

  const value = {
    user,
    isLoggedIn,
    login,
    logout,
    signup
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
