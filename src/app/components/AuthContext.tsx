'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService, User } from '../services/api';

export type UserRole = 'admin' | 'tenant';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to transform API user data to frontend format
const transformUserData = (apiUser: any): User => {
  // Add null check to prevent errors
  if (!apiUser) {
    throw new Error('User data is undefined or null');
  }

  // Handle different possible response structures
  const userData = apiUser.user || apiUser;
  
  return {
    id: userData.id?.toString() || '1',
    email: userData.email || '',
    name: userData.name || '',
    roles: userData.roles || ['user'],
    permissions: userData.permissions || [],
    avatar: userData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name || 'User')}&background=0D9488&color=fff`,
    company_id: userData.company_id?.toString() || '1',
  };
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in and token exists
    const checkAuthStatus = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
        if (token) {
          // For now, use dummy user data for testing
          const dummyUser: User = {
            id: '1',
            email: 'admin@example.com',
            name: 'Admin User',
            roles: ['admin'],
            permissions: ['dashboard.view', 'user-management.view', 'settings.view'],
            avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=0D9488&color=fff',
            company_id: '1'
          };
          setUser(dummyUser);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // Clear invalid token
        apiService.logout();
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const response = await apiService.login({ email, password });
      
      if (response.success && response.data) {
        try {
          // Handle different possible response structures
          const userData = response.data.user || response.data;
          const transformedUser = transformUserData(userData);
          setUser(transformedUser);
          setIsLoading(false);
          return { success: true, message: response.message || 'Login successful!' };
        } catch (transformError) {
          console.error('Error transforming user data:', transformError);
          setIsLoading(false);
          return { 
            success: false, 
            message: 'Invalid user data received from server' 
          };
        }
      } else {
        setIsLoading(false);
        return { 
          success: false, 
          message: response.message || 'Invalid email or password' 
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      
      // Development fallback for testing
      if (process.env.NODE_ENV === 'development' && error instanceof Error && error.message.includes('Network error')) {
        console.log('Using development fallback login');
        
        // Create a dummy user for development testing
        const dummyUser: User = {
          id: '1',
          email: email,
          name: email.split('@')[0],
          roles: email.includes('admin') ? ['admin'] : ['user'],
          permissions: email.includes('admin') 
            ? ['dashboard.view', 'user-management.view', 'settings.view', 'admin.view']
            : ['dashboard.view'],
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}&background=0D9488&color=fff`,
          company_id: '1'
        };
        
        setUser(dummyUser);
        return { 
          success: true, 
          message: 'Development mode: Using dummy login (API not available)' 
        };
      }
      
      // Provide more specific error messages
      let errorMessage = 'Network error occurred. Please check your connection.';
      
      if (error instanceof Error) {
        if (error.message.includes('Network error: Unable to connect to the server')) {
          errorMessage = 'Cannot connect to the server. Please check if the backend is running at http://192.168.137.130:8000';
        } else if (error.message.includes('HTTP 401')) {
          errorMessage = 'Invalid email or password';
        } else if (error.message.includes('HTTP 422')) {
          errorMessage = 'Invalid input data. Please check your email and password format.';
        } else if (error.message.includes('HTTP 500')) {
          errorMessage = 'Server error. Please try again later.';
        } else {
          errorMessage = error.message;
        }
      }
      
      return { 
        success: false, 
        message: errorMessage
      };
    }
  };

  const logout = () => {
    console.log('Logout called'); // Debug log
    
    // Clear token using apiService
    apiService.logout();
    
    // Clear user state
    setUser(null);
    
    console.log('User state cleared, redirecting...'); // Debug log
    
    // Redirect to login page
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 