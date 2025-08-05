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
  role: UserRole;
  company: string;
  phone?: string;
  location?: string;
  joinDate?: string;
  subscription: {
    plan: string;
    status: string;
    startDate: string;
    endDate: string;
    price: string;
  };
  permissions: string[];
  menuItems: MenuItem[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to transform Laravel user data to frontend format
const transformUserData = (laravelUser: LoginResponse['user']): User => {
  return {
    id: laravelUser.id,
    email: laravelUser.email,
    name: laravelUser.name,
    role: laravelUser.role,
    company: laravelUser.company,
    phone: laravelUser.phone,
    location: laravelUser.location,
    joinDate: laravelUser.join_date,
    subscription: {
      plan: laravelUser.subscription.plan,
      status: laravelUser.subscription.status,
      startDate: laravelUser.subscription.start_date,
      endDate: laravelUser.subscription.end_date,
      price: laravelUser.subscription.price,
    },
    permissions: laravelUser.permissions,
    menuItems: laravelUser.menu_items,
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
          const response = await apiClient.getProfile();
          if (response.success && response.data) {
            setUser(transformUserData(response.data));
          } else {
            // Token is invalid, clear it
            apiClient.logout();
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // Clear invalid token
        apiClient.logout();
      } finally {
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
        const transformedUser = transformUserData(response.data.user);
        setUser(transformedUser);
        setIsLoading(false);
        return { success: true, message: response.message || 'Login successful!' };
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

  const logout = async () => {
    try {
      await apiClient.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
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