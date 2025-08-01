'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'admin' | 'tenant';

// Dummy user data with detailed permissions
const dummyUsers = [
  {
    id: 1,
    email: 'admin@analyticspro.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    company: 'Analytics Pro',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    joinDate: '2023-01-15',
    subscription: {
      plan: 'Enterprise',
      status: 'Active',
      startDate: '2024-01-01',
      endDate: '2025-12-31',
      price: '$299/month'
    },
    permissions: ['all'],
    menuItems: [
      { id: 'dashboard', label: 'Dashboard Admin', icon: 'BarChart3', path: '/dashboard' },
      { id: 'crm', label: 'Menu ke CRM', icon: 'Users', path: '/crm' },
      { id: 'ai-chat', label: 'Menu ke AI Chat', icon: 'MessageSquare', path: '/ai-chat' },
      { id: 'crud-modules', label: 'CRUD Modules', icon: 'Database', path: '/admin/modules' },
      { id: 'crud-permissions', label: 'CRUD Permission', icon: 'Shield', path: '/admin/permissions' },
      { id: 'crud-roles', label: 'CRUD Roles', icon: 'UserCheck', path: '/admin/roles' },
      { id: 'crud-plans', label: 'CRUD Plans', icon: 'CreditCard', path: '/admin/plans' },
      { id: 'settings', label: 'Menu Settings', icon: 'Settings', path: '/admin/settings' }
    ]
  },
  {
    id: 2,
    email: 'tenant@startup.com',
    password: 'tenant123',
    name: 'Tenant User',
    role: 'tenant',
    company: 'Startup Ventures',
    phone: '+1 (555) 987-6543',
    location: 'San Francisco, CA',
    joinDate: '2024-08-01',
    subscription: {
      plan: 'Basic',
      status: 'Active',
      startDate: '2024-08-01',
      endDate: '2025-02-28',
      price: '$49/month'
    },
    permissions: ['dashboard', 'crm', 'ai-chat'],
    menuItems: [
      { id: 'dashboard', label: 'Dashboard Tenant', icon: 'BarChart3', path: '/dashboard' },
      { id: 'crm', label: 'Menu ke CRM', icon: 'Users', path: '/crm' },
      { id: 'ai-chat', label: 'Menu ke AI Chat', icon: 'MessageSquare', path: '/ai-chat' }
    ]
  }
];

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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = dummyUsers.find(
      user => user.email === email && user.password === password
    );

    if (foundUser) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword as User);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      setIsLoading(false);
      return { success: true, message: 'Login successful!' };
    } else {
      setIsLoading(false);
      return { success: false, message: 'Invalid email or password' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
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