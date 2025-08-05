'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiClient, type LoginResponse } from '../services/api';

export type UserRole = 'admin' | 'tenant';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

interface User {
  id: number;
  email: string;
  name: string;
  roles: string[];
  permissions: string[];
  tenant: {
    id: string;
    name: string;
    domains: string[];
  };
  profile?: any;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to transform Laravel user data to frontend format
const transformUserData = (laravelUser: LoginResponse): User => {
  // Add null check to prevent errors
  if (!laravelUser) {
    throw new Error('User data is undefined or null');
  }

  return {
    id: laravelUser.id,
    email: laravelUser.email,
    name: laravelUser.name,
    roles: laravelUser.roles || [],
    permissions: laravelUser.permissions || [],
    tenant: laravelUser.tenant,
    profile: laravelUser.profile,
  };
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in and token exists
    const checkAuthStatus = async () => {
      try {
        if (apiClient.isAuthenticated()) {
          // For now, use dummy user data for testing
          const dummyUser: User = {
            id: 1,
            email: 'admin@example.com',
            name: 'Admin User',
            roles: ['admin'],
            permissions: ['dashboard.view', 'user-management.view', 'settings.view'],
            tenant: {
              id: 'dummy-tenant-id',
              name: 'Dummy Company',
              domains: ['example.com']
            },
            profile: null
          };
          setUser(dummyUser);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // Clear invalid token
        apiClient.logout();
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const response = await apiClient.login({ email, password });
      
      if (response.success && response.data) {
        try {
          const transformedUser = transformUserData(response.data);
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
      return { 
        success: false, 
        message: 'Network error occurred. Please check your connection.' 
      };
    }
  };

  const logout = () => {
    console.log('Logout called'); // Debug log
    
    // Clear token using apiClient
    apiClient.logout();
    
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